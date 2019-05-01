import defaultState, {
  workflow as defaultWorkflow,
  user as defaultUser,
} from 'config/defaultState';

const { data, apiFetch } = wp;
const { registerStore } = data;

const actions = {
  requestWorkflows(path) {
    return {
      type: 'REQUEST_WORKFLOWS',
      path,
    };
  },
  receiveWorkflows(workflows) {
    return {
      type: 'RECEIVE_WORKFLOWS',
      workflows,
    };
  },
  requestUser(path) {
    return {
      type: 'REQUEST_USER',
      path,
    };
  },
  receiveUser(user) {
    return {
      type: 'RECEIVE_USER',
      user,
    };
  },
  beginLoading() {
    return { type: 'BEGIN_LOADING' };
  },
};

const mercuryStore = registerStore('mercury/workflows', {
  reducer(state = defaultState, action) {
    switch (action.type) {
      case 'BEGIN_LOADING':
        return {
          ...state,
          loading: true,
        };

      case 'RECEIVE_WORKFLOWS':
        return {
          ...state,
          loading: false,
          workflows: action.workflows,
        };

      case 'RECEIVE_USER':
        return {
          ...state,
          loading: false,
          user: action.user,
        };

      default:
        return state;
    }
  },

  actions,

  selectors: {
    requestWorkflows(state) {
      const { workflows } = state;
      return workflows;
    },
    getWorkflow(state, slug) {
      const { workflows } = state;

      const selectedWorkflow = workflows
        .find((workflow) => workflow.slug === slug);

      if (! selectedWorkflow) {
        return defaultWorkflow;
      }

      return selectedWorkflow;
    },
    requestUser(state) {
      const { user } = state;

      if (user.id) {
        return user;
      }

      return defaultUser;
    },
    getLoading(state) {
      const { loading } = state;
      return loading;
    },
  },

  controls: {
    REQUEST_WORKFLOWS(action) {
      return apiFetch({ path: action.path });
    },
    REQUEST_USER(action) {
      return apiFetch({ path: action.path });
    },
  },

  resolvers: {
    * requestWorkflows() {
      wp.data.dispatch('mercury/workflows').beginLoading();
      const workflows = yield actions.requestWorkflows(
        '/mercury/v1/workflows/'
      );
      return actions.receiveWorkflows(workflows);
    },
    * requestUser() {
      wp.data.dispatch('mercury/workflows').beginLoading();
      const user = yield actions.requestUser(
        '/wp/v2/users/me?context=edit'
      );
      return actions.receiveUser(user);
    },
  },
});

export default mercuryStore;

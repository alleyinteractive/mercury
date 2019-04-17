const { data, apiFetch } = wp;
const { registerStore } = data;

const actions = {
  setWorkflows(workflows) {
    return {
      type: 'SET_WORKFLOWS',
      workflows,
    };
  },
  receiveWorkflows(path) {
    return {
      type: 'RECEIVE_WORKFLOWS',
      path,
    };
  },
  setUser(user) {
    return {
      type: 'SET_USER',
      user,
    };
  },
  receiveUser(path) {
    return {
      type: 'RECEIVE_USER',
      path,
    };
  },
};

registerStore('mercury/workflows', {
  reducer(state = { workflows: [], user: {} }, action) {
    switch (action.type) {
      case 'SET_WORKFLOWS':
        return {
          ...state,
          workflows: action.workflows,
        };
      case 'SET_USER':
        return {
          ...state,
          user: action.user,
        };

      default:
        return state;
    }
  },

  actions,

  selectors: {
    receiveWorkflows(state) {
      const { workflows } = state;
      return workflows;
    },
    receiveUser(state) {
      const { user } = state;
      return user;
    },
  },

  controls: {
    RECEIVE_WORKFLOWS(action) {
      return apiFetch({ path: action.path });
    },
    RECEIVE_USER(action) {
      return apiFetch({ path: action.path });
    },
  },

  resolvers: {
    * receiveWorkflows() {
      const workflows = yield actions.receiveWorkflows(
        '/mercury/v1/workflows/'
      );
      return actions.setWorkflows(workflows);
    },
    * receiveUser() {
      const user = yield actions.receiveUser(
        '/wp/v2/users/me?context=edit'
      );
      return actions.setUser(user);
    },
  },
});

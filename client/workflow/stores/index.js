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
};

registerStore('mercury/workflows', {
  reducer(state = { workflows: [] }, action) {
    switch (action.type) {
      case 'SET_WORKFLOWS':
        return {
          ...state,
          workflows: action.workflows,
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
  },

  controls: {
    RECEIVE_WORKFLOWS(action) {
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
  },
});

export const workflow = {
  name: '',
  slug: '',
  tasks: [],
};

export const assignees = {
  defaultAssignee: 'none',
  defaultUser: null,
  defaultGroup: null,
  enableAssigneeSelection: false,
  assigneeOptions: [],
  assigneeSelectionPermissions: {
    roles: [],
  },
  assigneeSelection: {},
};

export const task = {
  assignees,
  fields: [],
  name: '',
  nextTasks: [],
  slug: '',
  postStatus: '',
};

export const user = {
  capabilities: {},
  id: 0,
  meta: [],
  name: '',
  roles: [],
  username: '',
};

const defaultState = {
  loading: false,
  workflows: [],
  user,
};

export default defaultState;

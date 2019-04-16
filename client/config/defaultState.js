export const workflow = {
  name: '',
  slug: '',
  tasks: [],
};

export const assignees = {
  defaultAssignee: 'none',
  defaultUser: null,
  enableAssigneeSelection: false,
  assigneeOptions: [],
  assigneeSelectionPermissions: {
    roles: [],
  },
  assigneeSelection: {},
  enableAskReject: false,
  askReject: {},
};

export const task = {
  assignees,
  fields: [],
  name: '',
  nextTasks: [],
  slug: '',
  postStatus: '',
};

const initialState = {
  edit_mode: 'inner', //modal//inner
  name_format: 'single', //single//first//last//first_last
  list_item_click_action: 'overview', //overview//editview
  users: {
    list_item_click_action: 'overview',
  },
};

export default {
  namespace: 'settings',

  state: initialState,

  subscriptions: {
    setup({ dispatch, history }) {
      // eslint-disable-line
    },
  },

  effects: {},

  reducers: {},
};

const INITIAL_STATE = {
  emailList: [],
  selectedId: false,
};

const emailReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "FETCH_EMAIL": {
      return Object.assign({}, state, {
        emailList: action.email,
      });
    }
    case "FETCH_ID": {
      return Object.assign({}, state, {
        selectedId: action.id,
      });
    }
    default:
      return state;
  }
};

export default emailReducer;

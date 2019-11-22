import ACTIONS from "./action";
import _ from "lodash";

const defaultState = {
  user: {}
};

const appReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ACTIONS.Types.ADD_USER: {
      console.log(action);

      let user = action.payload.data.createUser.user;
      let newState = _.cloneDeep(state);
      newState.user = user;
      return newState;
    }

    // case ACTIONS.Types.DELETE_ITEM: {
    //   let newState = _.cloneDeep(state);
    //   let index = _.findIndex(newState.items, { id: action.payload });
    //   newState.items.splice(index, 1);
    //   return newState;
    // }

    default:
      return state;
  }
};

export default appReducer;

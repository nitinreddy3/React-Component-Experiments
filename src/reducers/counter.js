import { REDUX_ACTIONS } from '../constants';

const counter = (state = 0, action) => {
  switch (action.type) {
    case REDUX_ACTIONS.INCREMENT:
      return state + action.payload;
    case REDUX_ACTIONS.DECREMENT:
      return state - action.payload;
    default:
      return state;
  }
}

export default counter;
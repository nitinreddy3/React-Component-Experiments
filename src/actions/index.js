import { REDUX_ACTIONS } from '../constants'

export const increment = (count) => {
  return {
    type: REDUX_ACTIONS.INCREMENT,
    payload: count,
  }
}

export const decrement = (count) => {
  return {
    type: REDUX_ACTIONS.DECREMENT,
    payload: count,
  }
}
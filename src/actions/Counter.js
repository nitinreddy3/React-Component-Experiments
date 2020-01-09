import { REDUX_ACTIONS } from '../constants'

export const increment = () => {
  return {
    type: REDUX_ACTIONS.INCREMENT
  }
}

export const decrement = () => {
  return {
    type: REDUX_ACTIONS.DECREMENT
  }
}
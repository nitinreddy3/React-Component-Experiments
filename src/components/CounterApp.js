import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from '../actions';
const CounterApp = () => {
  const counter = useSelector(state => state.counter)
  const dispatch = useDispatch();
  return (
    <div>
      <p>Counter : {counter}</p>
      <button onClick={() => dispatch(increment(2))}>+</button>
      <button onClick={() => dispatch(decrement(1))}>-</button>
    </div>
  )
}

export default CounterApp;
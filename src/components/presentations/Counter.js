import React from 'react'

const Counter = ({counter, onIncrement, onDecrement}) =>
  <div>
    counter:<span>{counter}</span>
    <div>
      <button onClick={() => onIncrement(2)}>+</button>
      <button onClick={() => onDecrement(2)}>-</button>
    </div>
  </div>

export default Counter

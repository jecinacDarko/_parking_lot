import React from 'react';
import PaymentComponent from './PaymentComponent';
import Counter from './Counter';
import './Operations.css'

const Operations = () => {
  return (
    <div className="operations">
			<PaymentComponent />
			<Counter />
    </div>
  )
}

export default Operations;
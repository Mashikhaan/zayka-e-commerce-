import React from 'react'

function Payment() {
  return (
    <div className='bg-gray-100 px-12 py-20 rounded-lg shadow-md h-fit flex flex-col gap-6'>
        <h1 className='text-6xl '>💳Easy Payments</h1>
        <p className='text-4xl py-4'>Enjoy a smooth, secure, and hassle-free payment experience with our PCI-compliant, fully encrypted checkout system, designed to protect your financial data at every step. Whether you prefer UPI, debit/credit cards, net banking, or digital wallets, our platform supports all major payment options, ensuring complete flexibility and convenience.


With one-tap payments, transactions are completed instantly, giving you real-time confirmations without delays. In case you change your mind or cancel an order, our system processes quick refunds automatically—no long waits, no complicated procedures. Every payment is protected with advanced fraud detection, ensuring your shopping experience remains smooth, safe, and worry-free.
</p>
<button className='bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-6  rounded-2xl w-fit active:scale-95 cursor-pointer' onClick={() => window.history.back()}>
          Back to Home
        </button>
    </div>
  )
}

export default Payment
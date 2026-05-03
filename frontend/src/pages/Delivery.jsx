import React from 'react'

function Delivery() {
  return (
    <div className='bg-gray-100 px-12 py-20 rounded-lg shadow-md h-fit flex flex-col gap-6'>
        <h1 className='text-6xl '>🚚Free Delivery</h1>
        <p className='text-4xl py-4'>Experience the convenience of fast, free doorstep delivery across all serviceable locations, designed to make your shopping smoother and stress-free. The moment you place an order, our system assigns the nearest delivery partner to ensure minimum wait time and maximum freshness, especially for perishable items. With real-time order tracking, you can follow your package step-by-step—from packing, dispatch, and transit, all the way to your doorstep..


We also offer same-day delivery slots on eligible orders, ensuring that your essentials reach you exactly when you need them. There are no hidden charges, no unexpected fees, and no minimum purchase tricks—just simple, transparent, and reliable service. Whether it's groceries, farm-fresh produce, or daily-use items, our delivery network ensures speed, safety, and complete convenience.

Browse, buy, and enjoy the ease of free delivery right to your home—freshness and convenience, delivered.
</p>
<button className='bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-6  rounded-2xl w-fit active:scale-95 cursor-pointer' onClick={() => window.history.back()}>
          Back to Home
        </button>
    </div>
  )
}

export default Delivery
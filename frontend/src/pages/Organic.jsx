import React from 'react'

function Organic() {
  return (
    <div className='bg-gray-100 px-12 py-20 rounded-lg shadow-md h-fit flex flex-col gap-6'>
        <h1 className='text-6xl '>🌿Fresh and Organic</h1>
        <p className='text-4xl py-4'>We take pride in delivering farm-fresh, naturally grown produce directly to your home. Our journey begins with certified organic farms, where crops are cultivated using sustainable methods—free from harmful pesticides, synthetic fertilizers, and chemical preservatives. Each fruit and vegetable is harvested only when naturally ripe, ensuring it retains its full flavor, nutritional value, and vibrant color..


To maintain the highest freshness standards, we minimize transportation time by partnering with local seasonal growers, reducing storage delays and preserving the natural crispness of every product. Our sourcing process is completely transparent: no artificial ripening agents, no cold-storage manipulation, and no unhealthy shortcuts. Every batch undergoes weekly quality audits, guaranteeing safety, purity, and exceptional quality for your family’s health.


Browse, buy, and enjoy produce that’s as close to nature as it gets—fresh, clean, and truly organic.

</p>
<button className='bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-6  rounded-2xl w-fit active:scale-95 cursor-pointer' onClick={() => window.history.back()}>
          Back to Home
        </button>
    </div>
  )
}

export default Organic
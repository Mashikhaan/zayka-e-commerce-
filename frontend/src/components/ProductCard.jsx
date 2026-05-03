export default function ProductCard({ title, price, img, description, unit, onAddToCart }) {
  return (
    <div className="bg-white border rounded-3xl p-6 text-center shadow-sm hover:scale-95 hover:bg-neutral-secondary-medium  transition duration-300 flex h-full flex-col items-center justify-between ">

      <img
        src={img}
        alt={title}
        className="mx-auto h-44 w-full max-w-[`240px`] object-contain mb-4 hover:scale-95 transition duration-300"
      />

      <div className="space-y-3 flex-1 flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            {title}
          </h2>

          <p className="text-gray-600 text-sm leading-5 mb-3 h-16 overflow-hidden">
            {description}
          </p>
        </div>

        <div>
          <p className="text-gray-500 text-lg mb-4">₹ {price}/{unit || 'Kg'}</p>

          <div className="text-orange-500 mb-4 text-xl">★★★★☆</div>

          <button
            onClick={onAddToCart}
            className="border border-indigo-900 text-indigo-900 px-4 py-2 rounded-full hover:bg-amber-500 hover:text-white transition cursor-pointer"
          >
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
}
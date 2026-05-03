export default function ReviewCard({ title,comment, name, img }) {
  return (
    <div className=" border hover:bg-amber-100/50 px-8 py-6 max-h-90  text-center shadow-sm hover:shadow-md transition mt-10 hover:scale-95  duration-300 cursor-grab active:cursor-grabbing rounded-2xl ">
      
      <img
        src={img}
        alt={title}
        className="mx-auto border w-16 h-16 md:w-28 md:h-28  object-contain mb-4 rounded-full"
      />
      <p className="text-gray-700 text-[14px]">{comment}</p>

      <h2 className="text-3xl font-bold text-gray-800 mb-2 mt-6">
        {name}
      </h2>


      

      {/* ⭐ Rating */}
      <div className="text-orange-500 mb-4 text-2xl">
        ★★★★☆
      </div>

  
    </div>
  );
}
import { Link } from "react-router-dom";


export function Features() {
  return (
    <section id="features" className="px-12 pt-32 bg-gray-100 font-bold">
      <h1 className="text-center text-4xl">OUR
        <span   className="bg-orange-500 text-white inline-block px-12 py-2"
  style={{
    clipPath:
      "polygon(100% 0, 93% 50%, 100% 99%, 0% 100%, 7% 50%, 0% 0%)",
  }}>Features</span>
      </h1>
      {/* //cards wrapper */}
     <div className="grid sm:grid-cols-2 md:grid-cols-3 mt-10 gap-10 px-12">
      {/* 1st card  */}
      <div className="border flex flex-col items-center text-center gap-4 px-4 py-8 bg-zinc-50 hover:-translate-y-2 hover:scale-[1.03] 
transition-all duration-300 ease-in-out rounded-2xl hover:rounded-none">
        <img src="../public/feature-img-1.png" alt="" 
        className="w-50"/>
        <h1 className="capitalize  text-3xl font-medium">fresh and organic</h1>
        <p className="font-medium">Fresh, organic produce picked at peak ripeness for better taste and nutrition!</p>
        <Link 
  to="/organic" 
  className="bg-transparent border px-8 py-2 hover:bg-amber-400 cursor-pointer transition-colors duration-500 inline-block"
>
  Read More
</Link>
      </div >
      {/* 2nd card */}
      <div className="border flex flex-col items-center text-center gap-4 px-4 py-10 bg-zinc-50 hover:-translate-y-2 hover:scale-[1.03] 
transition-all duration-300 ease-in-out rounded-2xl hover:rounded-none">
        <img src="../public/feature-img-2.png" alt="" 
        className="w-54"/>
        <h1 className="capitalize  text-3xl font-medium">free delivery</h1>
        <p className="font-medium">Fast, free doorstep delivery with real‑time order updates.!</p>
        <Link 
  to="/delivery" 
  className="bg-transparent border px-8 py-2 hover:bg-amber-400 cursor-pointer transition-colors duration-500 inline-block"
>
  Read More
</Link>
      </div >
      {/* 3rd card */}
      <div className="border flex flex-col items-center text-center gap-4 px-4 py-8 bg-zinc-50 hover:-translate-y-2 hover:scale-[1.03] 
transition-all duration-300 ease-in-out rounded-2xl hover:rounded-none">
        <img src="../public/feature-img-3.png" alt="" 
        className="w-50"/>
        <h1 className="capitalize  text-3xl font-medium">easy payments</h1>
        <p className="font-medium">Secure checkout with cards, UPI, and popular wallets!</p>
    <Link 
  to="/payment" 
  className="bg-transparent border px-8 py-2 hover:bg-amber-400 cursor-pointer transition-colors duration-500 inline-block"
>
  Read More
</Link>
      </div >
      
    

     </div>
    </section>
  );
}

import CategoryCard from "../components/CategoryCard";


export function Categories() {
  const cats = ["Vegetables", "Fruits", "Dairy", "Meat"];

  return (
    <section id="categories" className="px-12 pt-32 bg-gray-100 font-bold  ">
      <h1 className="text-center text-4xl">OUR
        <span   className="bg-orange-500 text-white inline-block px-12 py-2"
  style={{
    clipPath:
      "polygon(100% 0, 93% 50%, 100% 99%, 0% 100%, 7% 50%, 0% 0%)",
  }}>Categories</span>
      </h1>
      {/* //cards wrapper */}
     <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-8 md:gap-10 px-12 ">
      {/* 1st card  */}
      <CategoryCard img={'../public/cat-1.png'} title={"Fresh Vegetables"} discount={'Upto 45'} link={'/vegCategory'}/>
      {/* 2nd card */}
      <CategoryCard img={'../public/cat-2.png'} title={"Fresh Fruits"} discount={'Upto 40'} link={'/fruitCategory'}/>
      {/* 3rd card */}
      <CategoryCard img={'../public/cat-3.png'} title={"Dairy Products"} discount={'Upto 30'} link={'/dairyCategory'}/>
      {/* 4th card */}
      <CategoryCard img={'../public/cat-4.png'} title={"Fresh Meats"} discount={'Upto 35'} link={'/meatCategory'}/>
      
     </div>
    </section>
  );
}
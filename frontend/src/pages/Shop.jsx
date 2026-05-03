import React, { useState, useMemo, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useProducts } from '../features/productsSlice/products.context'
import { useCart } from '../features/hooks/useCart'
import AllProductsCard from '../components/AllProductsCard'

function Shop() {
  const { products, loading, error } = useProducts()
  const { handleAddToCart } = useCart()
  const [selectedCategory, setSelectedCategory] = useState('all')
  const location = useLocation()

  // Scroll to product if navigated from search
  useEffect(() => {
    if (location.state?.productId && products.length > 0) {
      const element = document.getElementById(location.state.productId)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    }
  }, [products, location.state])

  // Get unique categories from products
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(products.map(product => product.category))]
    return uniqueCategories
  }, [products])

  // Filter products based on selected category
  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'all') {
      return products
    }
    return products.filter(product => product.category === selectedCategory)
  }, [products, selectedCategory])

  if (loading) {
    return (
      <div className="min-h-screen p-8">
        <h1 className="text-4xl font-bold text-center mb-8">Shop All Products</h1>
        <div className="text-center">Loading products...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen p-8">
        <h1 className="text-4xl font-bold text-center mb-8">Shop All Products</h1>
        <div className="text-center text-red-500">Error: {error}</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-4xl font-bold text-center mb-8">Shop All Products</h1>

      {/* Category Filter */}
      <div className="mb-8 flex flex-wrap justify-center gap-4">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            selectedCategory === 'all'
              ? 'bg-orange-500 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300 cursor-pointer'
          }`}
        >
          All Categories
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedCategory === category
                ? 'bg-orange-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300 cursor-pointer'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Results Count */}
      <div className="text-center mb-6 text-gray-600">
        Showing {filteredProducts.length} of {products.length} products
        {selectedCategory !== 'all' && ` in ${selectedCategory}`}
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center text-gray-500">
          {selectedCategory === 'all'
            ? 'No products available yet. Create some products as admin first!'
            : `No products found in ${selectedCategory} category.`
          }
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ">
          {filteredProducts.map((product) => (
            <AllProductsCard
              key={product._id}
              item={{
                ...product,
                unit: product.unit || 'Kg'
              }}
              addToCart={() => handleAddToCart(product._id)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default Shop
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import './index.css'
import { router } from '../routes'

import { AuthProvider } from './features/auth/auth.context'
import { CartProvider } from './features/cartSlice/cart.context'
import { ProductsProvider } from './features/productsSlice/products.context'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <CartProvider>
        <ProductsProvider>
          <RouterProvider router={router} />
        </ProductsProvider>
      </CartProvider>
    </AuthProvider>
  </StrictMode>,
)
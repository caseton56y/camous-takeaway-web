
import { Routes, Route } from 'react-router-dom'
import { CartProvider } from './store/CartContext'
import Layout from './components/Layout'
import Home from './pages/Home'
import Cart from './pages/Cart'
import OrderPage from './pages/Order'
import Mine from './pages/Mine'
import ShopDetail from './pages/ShopDetail'
import ProductDetail from './pages/product-detail'
import ConfirmOrder from './pages/confirm-order'
import Address from './pages/address'

function App() {
  return (
    <CartProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="order" element={<OrderPage />} />
          <Route path="mine" element={<Mine />} />
          <Route path="shop/:id" element={<ShopDetail />} />
        </Route>
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/confirm-order" element={<ConfirmOrder />} />
        <Route path="/address" element={<Address />} />
      </Routes>
    </CartProvider>
  )
}

export default App

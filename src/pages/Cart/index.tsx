import React from 'react'
import { useNavigate } from 'react-router-dom'
import CartItem from '@/components/CartItem'
import { useCart } from '@/store/CartContext'
import { shops } from '@/data/shops'
import styles from './index.module.scss'

const Cart: React.FC = () => {
  const { items, totalPrice, shopId } = useCart()
  const navigate = useNavigate()
  const shop = shops.find(s => s.id === shopId)

  const handleCheckout = () => {
    if (items.length === 0) return
    navigate('/confirm-order')
  }

  if (items.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.emptyState}>
          <span className={styles.emptyIcon}>🛒</span>
          <p className={styles.emptyText}>购物车是空的，快去选点美食吧～</p>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.cartList}>
        {shop && (
          <div className={styles.shopInfo}>
            <h3 className={styles.shopName}>{shop.name}</h3>
          </div>
        )}
        {items.map(item => (
          <CartItem key={item.product.id} item={item} />
        ))}
      </div>

      <div className={styles.bottomBar}>
        <div className={styles.priceSection}>
          <span className={styles.priceLabel}>合计：</span>
          <span className={styles.totalPrice}>¥{totalPrice.toFixed(2)}</span>
        </div>
        <button 
          className={`${styles.checkoutButton} ${items.length === 0 ? styles.disabled : ''}`}
          onClick={handleCheckout}
          disabled={items.length === 0}
        >
          去结算
        </button>
      </div>
    </div>
  )
}

export default Cart

import React from 'react'
import { CartItem as CartItemType } from '@/types/cart'
import { useCart } from '@/store/CartContext'
import styles from './index.module.scss'

interface CartItemProps {
  item: CartItemType
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity } = useCart()

  return (
    <div className={styles.item}>
      <img 
        src={item.product.image} 
        alt={item.product.name} 
        className={styles.productImage} 
      />
      <div className={styles.productInfo}>
        <h4 className={styles.productName}>{item.product.name}</h4>
        <div className={styles.bottomRow}>
          <span className={styles.price}>¥{item.product.price}</span>
          <div className={styles.quantityControl}>
            <button 
              className={styles.quantityButton} 
              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
            >
              -
            </button>
            <span className={styles.quantityText}>{item.quantity}</span>
            <button 
              className={styles.quantityButton} 
              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartItem

import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Product } from '@/types/product'
import { useCart } from '@/store/CartContext'
import styles from './index.module.scss'

interface ProductCardProps {
  product: Product
  shopId: number
}

const ProductCard: React.FC<ProductCardProps> = ({ product, shopId }) => {
  const { addItem, updateQuantity, getItemQuantity } = useCart()
  const navigate = useNavigate()
  const quantity = getItemQuantity(product.id)

  const handleProductClick = (e: React.MouseEvent) => {
    // 如果点击的是按钮区域，不跳转
    if ((e.target as HTMLElement).closest('button')) {
      return
    }
    navigate(`/product/${product.id}`)
  }

  return (
    <div className={styles.card} onClick={handleProductClick}>
      <img src={product.image} alt={product.name} className={styles.productImage} />
      <div className={styles.productInfo}>
        <h4 className={styles.productName}>{product.name}</h4>
        <p className={styles.productDesc}>{product.description}</p>
        <div className={styles.bottomRow}>
          <div>
            <div className={styles.priceSection}>
              <span className={styles.price}>¥{product.price}</span>
              {product.originalPrice && (
                <span className={styles.originalPrice}>¥{product.originalPrice}</span>
              )}
            </div>
            <span className={styles.sales}>月售{product.sales}</span>
          </div>
          {quantity === 0 ? (
            <button 
              className={styles.addButton} 
              onClick={(e) => {
                e.stopPropagation()
                addItem(product, shopId)
              }}
            >
              +
            </button>
          ) : (
            <div className={styles.quantityControl}>
              <button 
                className={styles.quantityButton} 
                onClick={(e) => {
                  e.stopPropagation()
                  updateQuantity(product.id, quantity - 1)
                }}
              >
                -
              </button>
              <span className={styles.quantityText}>{quantity}</span>
              <button 
                className={styles.quantityButton} 
                onClick={(e) => {
                  e.stopPropagation()
                  updateQuantity(product.id, quantity + 1)
                }}
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductCard

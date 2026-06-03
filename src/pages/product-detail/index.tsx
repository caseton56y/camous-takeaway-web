import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useCart } from '@/store/CartContext'
import { products } from '@/data/products'
import { shops } from '@/data/shops'
import { Product } from '@/types/product'
import { Shop } from '@/types/shop'
import styles from './index.module.scss'

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { addItem, getItemQuantity, updateQuantity } = useCart()

  const product = products.find((p: Product) => p.id === Number(id))
  const shop = shops.find((s: Shop) => product && s.id === product.shopId)
  const quantity = product ? getItemQuantity(product.id) : 0

  if (!product || !shop) {
    return (
      <div className={styles.container}>
        <div className={styles.emptyState}>
          <span>商品不存在</span>
        </div>
      </div>
    )
  }

  const handleAddToCart = () => {
    addItem(product, shop.id)
  }

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity <= 0) {
      navigate('/cart')
    } else {
      updateQuantity(product.id, newQuantity)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button className={styles.backButton} onClick={() => navigate(-1)}>
          ←
        </button>
        <h1 className={styles.title}>商品详情</h1>
      </div>

      <img src={product.image} alt={product.name} className={styles.productImage} />

      <div className={styles.content}>
        <div className={styles.productInfo}>
          <h2 className={styles.productName}>{product.name}</h2>
          {product.tags && product.tags.length > 0 && (
            <div className={styles.tags}>
              {product.tags.map((tag: string, index: number) => (
                <span key={index} className={styles.tag}>{tag}</span>
              ))}
            </div>
          )}
          <p className={styles.description}>{product.description}</p>
          <div className={styles.priceRow}>
            <div className={styles.priceInfo}>
              <span className={styles.price}>¥{product.price}</span>
              {product.originalPrice && (
                <span className={styles.originalPrice}>¥{product.originalPrice}</span>
              )}
            </div>
            <span className={styles.sales}>月售{product.sales}份</span>
          </div>
        </div>

        <div className={styles.shopInfo}>
          <img src={shop.image} alt={shop.name} className={styles.shopLogo} />
          <div className={styles.shopDetails}>
            <div className={styles.shopName}>{shop.name}</div>
            <div className={styles.shopMeta}>
              <span className={styles.rating}>★ {shop.rating}</span>
              <span>月售{shop.monthSales}</span>
              <span>配送费¥{shop.deliveryFee}</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.bottomBar}>
        {quantity === 0 ? (
          <button className={styles.addButton} onClick={handleAddToCart}>
            加入购物车
          </button>
        ) : (
          <div className={styles.quantityControl}>
            <button
              className={styles.quantityButton}
              onClick={() => handleQuantityChange(quantity - 1)}
            >
              -
            </button>
            <span className={styles.quantityText}>{quantity}</span>
            <button
              className={styles.quantityButton}
              onClick={() => handleQuantityChange(quantity + 1)}
            >
              +
            </button>
            <button className={styles.goCartButton} onClick={() => navigate('/cart')}>
              去购物车
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductDetail

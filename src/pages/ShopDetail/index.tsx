import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import ProductCard from '@/components/ProductCard'
import { useCart } from '@/store/CartContext'
import { shops } from '@/data/shops'
import { getProductsByShopId } from '@/data/products'
import styles from './index.module.scss'

const ShopDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { items, totalPrice } = useCart()
  
  const shop = shops.find(s => s.id === Number(id))
  const products = shop ? getProductsByShopId(shop.id) : []
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0)

  if (!shop) {
    return (
      <div className={styles.container}>
        <div className={styles.emptyState}>
          <p>商家不存在</p>
        </div>
      </div>
    )
  }

  const handleGoBack = () => {
    navigate(-1)
  }

  const handleGoToCart = () => {
    navigate('/cart')
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button className={styles.backButton} onClick={handleGoBack}>
          ←
        </button>
        <h1 className={styles.pageTitle}>{shop.name}</h1>
      </div>

      <div className={styles.shopHeader}>
        <img src={shop.image} alt={shop.name} className={styles.shopImage} />
        <div className={styles.shopInfo}>
          <h2 className={styles.shopName}>{shop.name}</h2>
          <div className={styles.shopMeta}>
            <span className={styles.rating}>★ {shop.rating}</span>
            <span>月售{shop.monthSales}</span>
            <span>{shop.deliveryTime}</span>
          </div>
          <div className={styles.shopTags}>
            {shop.tags.map((tag, index) => (
              <span key={index} className={styles.tag}>{tag}</span>
            ))}
          </div>
          {shop.announcement && (
            <p className={styles.announcement}>📢 {shop.announcement}</p>
          )}
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.categorySidebar}>
          <div className={`${styles.categoryItem} ${true ? styles.active : ''}`}>
            全部商品
          </div>
        </div>
        <div className={styles.productList}>
          {products.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              shopId={shop.id} 
            />
          ))}
        </div>
      </div>

      {items.length > 0 && (
        <div className={styles.bottomBar}>
          <div className={styles.cartSection} onClick={handleGoToCart}>
            <div className={styles.cartIcon}>
              🛒
              {totalQuantity > 0 && (
                <span className={styles.cartBadge}>{totalQuantity > 99 ? '99+' : totalQuantity}</span>
              )}
            </div>
            <div className={styles.priceInfo}>
              <span className={styles.totalPrice}>¥{totalPrice.toFixed(2)}</span>
              <span className={styles.deliveryTip}>另需配送费¥{shop.deliveryFee}</span>
            </div>
          </div>
          <button 
            className={styles.submitButton}
            onClick={handleGoToCart}
          >
            去结算
          </button>
        </div>
      )}
    </div>
  )
}

export default ShopDetail

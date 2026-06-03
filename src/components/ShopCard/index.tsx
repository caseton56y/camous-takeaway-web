import React from 'react'
import { Link } from 'react-router-dom'
import { Shop } from '@/types/shop'
import styles from './index.module.scss'

interface ShopCardProps {
  shop: Shop
}

const ShopCard: React.FC<ShopCardProps> = ({ shop }) => {
  return (
    <Link to={`/shop/${shop.id}`} className={styles.card}>
      <img src={shop.image} alt={shop.name} className={styles.shopImage} />
      <div className={styles.shopInfo}>
        <h3 className={styles.shopName}>{shop.name}</h3>
        <div className={styles.meta}>
          <span className={styles.rating}>★ {shop.rating}</span>
          <span>月售{shop.monthSales}</span>
          <span>{shop.distance}km</span>
        </div>
        <div className={styles.tags}>
          {shop.tags.map((tag, index) => (
            <span key={index} className={styles.tag}>{tag}</span>
          ))}
        </div>
      </div>
      <div className={styles.footer}>
        <div className={styles.deliveryInfo}>
          <span>{shop.deliveryTime}</span>
          <span>配送费¥{shop.deliveryFee}</span>
          <span>¥{shop.minOrderAmount}起送</span>
        </div>
      </div>
    </Link>
  )
}

export default ShopCard

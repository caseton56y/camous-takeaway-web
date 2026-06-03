import React from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './index.module.scss'

const Mine: React.FC = () => {
  const navigate = useNavigate()

  const menuItems = [
    { icon: '📍', label: '我的地址', action: () => navigate('/address') },
    { icon: '🎫', label: '优惠券', action: () => alert('优惠券功能开发中...') },
    { icon: '⭐', label: '我的收藏', action: () => alert('收藏功能开发中...') },
    { icon: '💬', label: '帮助与反馈', action: () => alert('帮助与反馈功能开发中...') },
    { icon: '⚙️', label: '设置', action: () => alert('设置功能开发中...') },
  ]

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.userInfo}>
          <div className={styles.avatar}>👤</div>
          <div className={styles.userDetails}>
            <h2 className={styles.userName}>同学</h2>
            <p className={styles.userPhone}>138****8888</p>
          </div>
        </div>
      </div>

      <div className={styles.statsSection}>
        <div className={styles.statItem}>
          <span className={styles.statNumber}>12</span>
          <span className={styles.statLabel}>订单</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statNumber}>5</span>
          <span className={styles.statLabel}>优惠券</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statNumber}>256</span>
          <span className={styles.statLabel}>积分</span>
        </div>
      </div>

      <div className={styles.menuSection}>
        {menuItems.map((item, index) => (
          <div
            key={index}
            className={styles.menuItem}
            onClick={item.action}
          >
            <div className={styles.menuLeft}>
              <span className={styles.menuIcon}>{item.icon}</span>
              <span className={styles.menuLabel}>{item.label}</span>
            </div>
            <span className={styles.menuArrow}>&gt;</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Mine

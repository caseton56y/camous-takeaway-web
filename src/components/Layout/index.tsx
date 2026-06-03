import React from 'react'
import { Outlet, NavLink, useLocation } from 'react-router-dom'
import { useCart } from '@/store/CartContext'
import styles from './index.module.scss'

const Layout: React.FC = () => {
  const { items } = useCart()
  const location = useLocation()
  const isShopDetail = location.pathname.startsWith('/shop/')
  
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0)
  
  const navItems = [
    { path: '/', label: '首页' },
    { path: '/cart', label: '购物车', badge: totalQuantity > 0 ? totalQuantity : null },
    { path: '/order', label: '订单' },
    { path: '/mine', label: '我的' },
  ]
  
  return (
    <div className={styles.layout}>
      <main className={styles.main}>
        <Outlet />
      </main>
      
      {!isShopDetail && (
        <nav className={styles.nav}>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `${styles.navItem} ${isActive ? styles.active : ''}`
              }
            >
              <span className={styles.navLabel}>{item.label}</span>
              {item.badge && (
                <span className={styles.badge}>{item.badge > 99 ? '99+' : item.badge}</span>
              )}
            </NavLink>
          ))}
        </nav>
      )}
    </div>
  )
}

export default Layout

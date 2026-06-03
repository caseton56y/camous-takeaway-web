import React, { useState } from 'react'
import { Order as OrderType, OrderStatus } from '@/types/order'
import styles from './index.module.scss'

const statusMap: Record<OrderStatus, string> = {
  pending: '待接单',
  accepted: '已接单',
  preparing: '备餐中',
  delivering: '配送中',
  completed: '已完成',
  cancelled: '已取消'
}

type TabType = 'all' | 'pending' | 'delivering' | 'completed'

const mockOrders: OrderType[] = [
  {
    id: 'ORD001',
    shopName: '重庆小面',
    shopImage: 'https://picsum.photos/id/292/300/300',
    items: [
      {
        product: {
          id: 1,
          name: '招牌小面',
          image: 'https://picsum.photos/id/292/300/300',
          price: 15,
          description: '正宗重庆小面',
          sales: 567,
          stock: 100,
          categoryId: 1,
          shopId: 1
        },
        quantity: 2,
        shopId: 1
      }
    ],
    totalPrice: 33,
    deliveryFee: 3,
    status: 'delivering',
    createTime: '2024-01-15 12:30:00',
    estimatedDeliveryTime: '2024-01-15 13:00:00'
  },
  {
    id: 'ORD002',
    shopName: '奶茶工坊',
    shopImage: 'https://picsum.photos/id/326/300/300',
    items: [
      {
        product: {
          id: 5,
          name: '珍珠奶茶',
          image: 'https://picsum.photos/id/431/300/300',
          price: 12,
          description: 'Q弹珍珠',
          sales: 1234,
          stock: 200,
          categoryId: 3,
          shopId: 3
        },
        quantity: 1,
        shopId: 3
      }
    ],
    totalPrice: 14,
    deliveryFee: 2,
    status: 'completed',
    createTime: '2024-01-14 15:20:00'
  }
]

const OrderPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('all')

  const filteredOrders = mockOrders.filter(order => {
    if (activeTab === 'all') return true
    if (activeTab === 'pending') return ['pending', 'accepted', 'preparing'].includes(order.status)
    if (activeTab === 'delivering') return order.status === 'delivering'
    if (activeTab === 'completed') return order.status === 'completed'
    return true
  })

  const handleOrderAction = (_orderId: string, action: string) => {
    alert(`${action}功能开发中...`)
  }

  return (
    <div className={styles.container}>
      <div className={styles.tabs}>
        {[
          { key: 'all' as const, label: '全部' },
          { key: 'pending' as const, label: '待接单' },
          { key: 'delivering' as const, label: '配送中' },
          { key: 'completed' as const, label: '已完成' }
        ].map(tab => (
          <div
            key={tab.key}
            className={`${styles.tab} ${activeTab === tab.key ? styles.active : ''}`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </div>
        ))}
      </div>

      <div className={styles.orderList}>
        {filteredOrders.length === 0 ? (
          <div className={styles.emptyState}>
            <span className={styles.emptyIcon}>📋</span>
            <p className={styles.emptyText}>暂无订单</p>
          </div>
        ) : (
          filteredOrders.map(order => (
            <div key={order.id} className={styles.orderCard}>
              <div className={styles.orderHeader}>
                <span className={styles.shopName}>{order.shopName}</span>
                <span className={styles.orderStatus}>{statusMap[order.status]}</span>
              </div>

              <div className={styles.orderItems}>
                {order.items.slice(0, 3).map((item, index) => (
                  <img
                    key={index}
                    src={item.product.image}
                    alt={item.product.name}
                    className={styles.itemImage}
                  />
                ))}
              </div>

              <div className={styles.orderFooter}>
                <span className={styles.orderPrice}>
                  共{order.items.reduce((sum, item) => sum + item.quantity, 0)}件商品，
                  合计<span className={styles.priceHighlight}>¥{order.totalPrice}</span>
                </span>
                {order.status === 'delivering' && (
                  <button
                    className={`${styles.actionButton} ${styles.primary}`}
                    onClick={() => handleOrderAction(order.id, '联系骑手')}
                  >
                    联系骑手
                  </button>
                )}
                {order.status === 'completed' && (
                  <button
                    className={styles.actionButton}
                    onClick={() => handleOrderAction(order.id, '再来一单')}
                  >
                    再来一单
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default OrderPage

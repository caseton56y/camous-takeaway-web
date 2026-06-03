import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '@/store/CartContext'
import { shops } from '@/data/shops'
import { Shop } from '@/types/shop'
import { Address } from '@/types/order'
import styles from './index.module.scss'

// 模拟地址数据
const mockAddresses: Address[] = [
  {
    id: 1,
    name: '张三',
    phone: '138****8888',
    province: '北京市',
    city: '北京市',
    district: '朝阳区',
    detail: '建国路88号SOHO现代城A座1201室',
    isDefault: true
  }
]

const ConfirmOrder: React.FC = () => {
  const { items, totalPrice, clearCart } = useCart()
  const navigate = useNavigate()
  const [selectedAddress] = useState<Address | null>(mockAddresses[0])
  const [remarks, setRemarks] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('wechat')

  const shop = shops.find((s: Shop) => items.length > 0 && s.id === items[0]?.shopId)
  const deliveryFee = shop?.deliveryFee || 0
  const finalPrice = totalPrice + deliveryFee

  const handleSubmitOrder = () => {
    if (!selectedAddress) {
      alert('请选择收货地址')
      return
    }
    alert('订单提交成功！')
    clearCart()
    navigate('/order')
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button className={styles.backButton} onClick={() => navigate(-1)}>
          ←
        </button>
        <h1 className={styles.title}>确认订单</h1>
      </div>

      <div className={styles.content}>
        {/* 地址 */}
        <div className={styles.section}>
          <div className={styles.sectionTitle}>收货地址</div>
          {selectedAddress ? (
            <div className={styles.addressCard} onClick={() => navigate('/address')}>
              <div className={styles.addressInfo}>
                <div className={styles.addressHeader}>
                  <span className={styles.userName}>{selectedAddress.name}</span>
                  <span className={styles.phone}>{selectedAddress.phone}</span>
                </div>
                <div className={styles.addressDetail}>
                  {selectedAddress.province}
                  {selectedAddress.city}
                  {selectedAddress.district}
                  {selectedAddress.detail}
                </div>
              </div>
              <span className={styles.arrow}>›</span>
            </div>
          ) : (
            <div className={styles.addAddress} onClick={() => navigate('/address')}>
              <span>+ 添加收货地址</span>
            </div>
          )}
        </div>

        {/* 商家和商品 */}
        {shop && (
          <div className={styles.section}>
            <div className={styles.shopHeader}>
              <img src={shop.image} alt={shop.name} className={styles.shopLogo} />
              <span className={styles.shopName}>{shop.name}</span>
            </div>
            <div className={styles.productList}>
              {items.map((item) => (
                <div key={item.product.id} className={styles.productItem}>
                  <img src={item.product.image} alt={item.product.name} className={styles.productImage} />
                  <div className={styles.productInfo}>
                    <div className={styles.productName}>{item.product.name}</div>
                    <div className={styles.productPrice}>¥{item.product.price}</div>
                  </div>
                  <div className={styles.productQuantity}>x{item.quantity}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 备注 */}
        <div className={styles.section}>
          <div className={styles.remarkRow}>
            <span className={styles.remarkLabel}>备注</span>
            <input
              type="text"
              className={styles.remarkInput}
              placeholder="口味、规格等要求"
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
            />
          </div>
        </div>

        {/* 支付方式 */}
        <div className={styles.section}>
          <div className={styles.sectionTitle}>支付方式</div>
          <div className={styles.paymentMethods}>
            <div
              className={`${styles.paymentMethod} ${paymentMethod === 'wechat' ? styles.active : ''}`}
              onClick={() => setPaymentMethod('wechat')}
            >
              <span className={styles.paymentIcon}>💬</span>
              <span className={styles.paymentName}>微信支付</span>
              <span className={styles.radio}></span>
            </div>
            <div
              className={`${styles.paymentMethod} ${paymentMethod === 'alipay' ? styles.active : ''}`}
              onClick={() => setPaymentMethod('alipay')}
            >
              <span className={styles.paymentIcon}>💳</span>
              <span className={styles.paymentName}>支付宝</span>
              <span className={styles.radio}></span>
            </div>
          </div>
        </div>

        {/* 费用明细 */}
        <div className={styles.section}>
          <div className={styles.feeRow}>
            <span className={styles.feeLabel}>商品小计</span>
            <span className={styles.feeValue}>¥{totalPrice.toFixed(2)}</span>
          </div>
          <div className={styles.feeRow}>
            <span className={styles.feeLabel}>配送费</span>
            <span className={styles.feeValue}>¥{deliveryFee.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className={styles.bottomBar}>
        <div className={styles.totalInfo}>
          <span className={styles.totalLabel}>合计：</span>
          <span className={styles.totalPrice}>¥{finalPrice.toFixed(2)}</span>
        </div>
        <button className={styles.submitButton} onClick={handleSubmitOrder}>
          提交订单
        </button>
      </div>
    </div>
  )
}

export default ConfirmOrder

import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Address } from '@/types/order'
import styles from './index.module.scss'

// 模拟地址数据
const initialAddresses: Address[] = [
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

const AddressPage: React.FC = () => {
  const navigate = useNavigate()
  const [addresses, setAddresses] = useState<Address[]>(initialAddresses)
  const [isAdding, setIsAdding] = useState(false)
  const [editingAddress, setEditingAddress] = useState<Address | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    province: '',
    city: '',
    district: '',
    detail: '',
    isDefault: false
  })

  const handleEdit = (address: Address) => {
    setEditingAddress(address)
    setFormData(address)
    setIsAdding(true)
  }

  const handleDelete = (id: number) => {
    if (confirm('确定要删除这个地址吗？')) {
      setAddresses(addresses.filter(a => a.id !== id))
    }
  }

  const handleSubmit = () => {
    if (!formData.name || !formData.phone || !formData.detail) {
      alert('请填写完整的地址信息')
      return
    }

    if (editingAddress) {
      // 编辑
      setAddresses(addresses.map(a => 
        a.id === editingAddress.id ? { ...formData, id: editingAddress.id } : a
      ))
    } else {
      // 新增
      const newAddress: Address = {
        ...formData,
        id: Date.now(),
        isDefault: addresses.length === 0 ? true : formData.isDefault
      }
      setAddresses([...addresses, newAddress])
    }

    setIsAdding(false)
    setEditingAddress(null)
    setFormData({
      name: '',
      phone: '',
      province: '',
      city: '',
      district: '',
      detail: '',
      isDefault: false
    })
  }

  const handleSelectAddress = (_address: Address) => {
    navigate(-1)
  }

  if (isAdding) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <button className={styles.backButton} onClick={() => {
            setIsAdding(false)
            setEditingAddress(null)
          }}>
            ←
          </button>
          <h1 className={styles.title}>{editingAddress ? '编辑地址' : '新增地址'}</h1>
        </div>
        <div className={styles.form}>
          <div className={styles.formItem}>
            <label className={styles.label}>收货人</label>
            <input
              type="text"
              className={styles.input}
              placeholder="请输入收货人姓名"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          <div className={styles.formItem}>
            <label className={styles.label}>手机号</label>
            <input
              type="text"
              className={styles.input}
              placeholder="请输入手机号"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>
          <div className={styles.formItem}>
            <label className={styles.label}>所在地区</label>
            <div className={styles.regionRow}>
              <input
                type="text"
                className={styles.input}
                placeholder="省"
                value={formData.province}
                onChange={(e) => setFormData({ ...formData, province: e.target.value })}
              />
              <input
                type="text"
                className={styles.input}
                placeholder="市"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              />
              <input
                type="text"
                className={styles.input}
                placeholder="区"
                value={formData.district}
                onChange={(e) => setFormData({ ...formData, district: e.target.value })}
              />
            </div>
          </div>
          <div className={styles.formItem}>
            <label className={styles.label}>详细地址</label>
            <input
              type="text"
              className={styles.input}
              placeholder="请输入详细地址"
              value={formData.detail}
              onChange={(e) => setFormData({ ...formData, detail: e.target.value })}
            />
          </div>
          <div className={styles.formItem}>
            <div className={styles.switchRow}>
              <span className={styles.switchLabel}>设为默认地址</span>
              <div
                className={`${styles.switch} ${formData.isDefault ? styles.active : ''}`}
                onClick={() => setFormData({ ...formData, isDefault: !formData.isDefault })}
              >
                <div className={styles.switchDot}></div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.bottomBar}>
          <button className={styles.submitButton} onClick={handleSubmit}>
            保存
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button className={styles.backButton} onClick={() => navigate(-1)}>
          ←
        </button>
        <h1 className={styles.title}>管理收货地址</h1>
      </div>
      <div className={styles.content}>
        {addresses.length === 0 ? (
          <div className={styles.emptyState}>
            <span className={styles.emptyIcon}>📍</span>
            <p className={styles.emptyText}>暂无收货地址</p>
          </div>
        ) : (
          <div className={styles.addressList}>
            {addresses.map((address) => (
              <div
                key={address.id}
                className={styles.addressCard}
                onClick={() => handleSelectAddress(address)}
              >
                <div className={styles.addressInfo}>
                  <div className={styles.addressHeader}>
                    <span className={styles.userName}>{address.name}</span>
                    <span className={styles.phone}>{address.phone}</span>
                    {address.isDefault && <span className={styles.defaultTag}>默认</span>}
                  </div>
                  <div className={styles.addressDetail}>
                    {address.province}
                    {address.city}
                    {address.district}
                    {address.detail}
                  </div>
                </div>
                <div className={styles.actions}>
                  <button
                    className={styles.actionButton}
                    onClick={(e) => {
                      e.stopPropagation()
                      handleEdit(address)
                    }}
                  >
                    编辑
                  </button>
                  <button
                    className={styles.actionButton}
                    onClick={(e) => {
                      e.stopPropagation()
                      handleDelete(address.id)
                    }}
                  >
                    删除
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className={styles.bottomBar}>
        <button
          className={styles.addButton}
          onClick={() => setIsAdding(true)}
        >
          + 新增地址
        </button>
      </div>
    </div>
  )
}

export default AddressPage

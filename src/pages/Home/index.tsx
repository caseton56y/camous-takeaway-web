import React, { useState, useMemo } from 'react'
import ShopCard from '@/components/ShopCard'
import { shops } from '@/data/shops'
import { categories } from '@/data/categories'
import { products } from '@/data/products'
import { Shop } from '@/types/shop'
import styles from './index.module.scss'

type SortType = 'default' | 'sales' | 'rating' | 'distance'

const Home: React.FC = () => {
  const [sortType, setSortType] = useState<SortType>('default')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null)
  const [showSearchResults, setShowSearchResults] = useState(false)

  // 筛选和排序商家
  const filteredAndSortedShops: Shop[] = useMemo(() => {
    let result = [...shops]

    // 分类筛选
    if (selectedCategory) {
      result = result.filter(shop => shop.categoryId === selectedCategory)
    }

    // 关键词搜索
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      result = result.filter(shop => 
        shop.name.toLowerCase().includes(query) ||
        shop.tags.some(tag => tag.toLowerCase().includes(query))
      )
    }

    // 排序
    result.sort((a, b) => {
      switch (sortType) {
        case 'sales':
          return b.monthSales - a.monthSales
        case 'rating':
          return b.rating - a.rating
        case 'distance':
          return a.distance - b.distance
        default:
          return 0
      }
    })

    return result
  }, [sortType, searchQuery, selectedCategory])

  // 搜索商品（也可以显示在搜索结果中）
  const searchProducts = useMemo(() => {
    if (!searchQuery.trim()) return []
    const query = searchQuery.toLowerCase()
    return products.filter(product =>
      product.name.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query)
    )
  }, [searchQuery])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
    setShowSearchResults(e.target.value.length > 0)
  }

  const handleCategoryClick = (categoryId: number) => {
    setSelectedCategory(selectedCategory === categoryId ? null : categoryId)
  }

  const clearSearch = () => {
    setSearchQuery('')
    setShowSearchResults(false)
  }

  return (
    <div className={styles.container}>
      <div className={styles.searchBar}>
        <div className={styles.searchInputWrapper}>
          <span className={styles.searchIcon}>🔍</span>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="搜索商家或商品"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          {searchQuery && (
            <button className={styles.clearButton} onClick={clearSearch}>
              ✕
            </button>
          )}
        </div>
      </div>

      {!showSearchResults && (
        <>
          <div className={styles.banner}>
            <img 
              src="https://picsum.photos/id/292/800/400" 
              alt="Banner" 
              className={styles.bannerImage}
            />
          </div>

          <div className={styles.categorySection}>
            <div className={styles.categoryGrid}>
              <div 
                className={`${styles.categoryItem} ${selectedCategory === null ? styles.active : ''}`}
                onClick={() => setSelectedCategory(null)}
              >
                <div className={styles.categoryIcon}>🏠</div>
                <span className={styles.categoryName}>全部</span>
              </div>
              {categories.map(category => (
                <div 
                  key={category.id} 
                  className={`${styles.categoryItem} ${selectedCategory === category.id ? styles.active : ''}`}
                  onClick={() => handleCategoryClick(category.id)}
                >
                  <div className={styles.categoryIcon}>{category.icon}</div>
                  <span className={styles.categoryName}>{category.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              {selectedCategory 
                ? categories.find(c => c.id === selectedCategory)?.name + '推荐' 
                : '附近商家'}
            </h2>
          </div>

          <div className={styles.filterTabs}>
            {[
              { key: 'default' as const, label: '综合排序' },
              { key: 'sales' as const, label: '销量最高' },
              { key: 'rating' as const, label: '评分最高' },
              { key: 'distance' as const, label: '距离最近' },
            ].map(tab => (
              <div 
                key={tab.key} 
                className={`${styles.filterTab} ${sortType === tab.key ? styles.active : ''}`}
                onClick={() => setSortType(tab.key)}
              >
                {tab.label}
              </div>
            ))}
          </div>
        </>
      )}

      {showSearchResults ? (
        <div className={styles.searchResults}>
          {searchProducts.length > 0 && (
            <div className={styles.resultSection}>
              <h3 className={styles.resultTitle}>相关商品</h3>
              <div className={styles.productResults}>
                {searchProducts.map(product => {
                  const shop = shops.find(s => s.id === product.shopId)
                  return (
                    <div key={product.id} className={styles.productResult}>
                      <img src={product.image} alt={product.name} className={styles.productImage} />
                      <div className={styles.productInfo}>
                        <div className={styles.productName}>{product.name}</div>
                        <div className={styles.productShop}>{shop?.name}</div>
                        <div className={styles.productPrice}>¥{product.price}</div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          <div className={styles.resultSection}>
            <h3 className={styles.resultTitle}>相关商家</h3>
            {filteredAndSortedShops.length > 0 ? (
              <div className={styles.shopResults}>
                {filteredAndSortedShops.map(shop => (
                  <ShopCard key={shop.id} shop={shop} />
                ))}
              </div>
            ) : (
              <div className={styles.emptyState}>
                <span className={styles.emptyIcon}>🔍</span>
                <p>未找到相关商家或商品</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className={styles.shopList}>
          {filteredAndSortedShops.length > 0 ? (
            filteredAndSortedShops.map(shop => (
              <ShopCard key={shop.id} shop={shop} />
            ))
          ) : (
            <div className={styles.emptyState}>
              <span className={styles.emptyIcon}>🏪</span>
              <p>该分类暂无商家</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Home

# 校园外卖 - 网页版

一个基于 React + Vite 开发的校园外卖网页应用，支持快速部署到任何静态托管服务。

## 功能特性

- 🏠 **首页**：商家列表、分类导航、搜索功能、排序筛选
- 🏪 **商家详情**：商品浏览、加入购物车
- 🛒 **购物车**：商品管理、数量调整、价格计算
- 📋 **订单管理**：订单列表、状态跟踪
- 👤 **个人中心**：用户信息、功能入口

## 技术栈

- **前端框架**：React 18
- **构建工具**：Vite 5
- **路由管理**：React Router 6
- **样式方案**：SCSS + CSS Modules
- **开发语言**：TypeScript

## 快速开始

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:3000 查看应用

### 构建生产版本

```bash
npm run build
```

构建产物将生成在 `dist` 目录

### 预览生产版本

```bash
npm run preview
```

## 部署指南

### 方案一：Vercel（推荐，免费）

1. 将代码推送到 GitHub 仓库
2. 访问 [vercel.com](https://vercel.com) 并使用 GitHub 账号登录
3. 点击 "New Project"，选择您的仓库
4. 点击 "Deploy"，等待部署完成
5. 获得一个类似 `https://your-project.vercel.app` 的访问地址

### 方案二：Netlify（免费）

1. 将代码推送到 GitHub 仓库
2. 访问 [netlify.com](https://www.netlify.com) 并注册
3. 点击 "New site from Git"，选择 GitHub
4. 选择您的仓库，点击 "Deploy site"
5. 部署完成后获得访问地址

### 方案三：传统服务器

1. 执行 `npm run build` 构建项目
2. 将 `dist` 目录的所有文件上传到服务器
3. 配置 Nginx 或其他 Web 服务器

## 项目结构

```
campus-takeaway-web/
├── src/
│   ├── components/       # 公共组件
│   │   ├── Layout/       # 布局组件（底部导航）
│   │   ├── ShopCard/     # 商家卡片
│   │   ├── ProductCard/  # 商品卡片
│   │   └── CartItem/     # 购物车项
│   ├── pages/            # 页面组件
│   │   ├── Home/         # 首页
│   │   ├── Cart/         # 购物车
│   │   ├── Order/        # 订单
│   │   ├── Mine/         # 个人中心
│   │   └── ShopDetail/   # 商家详情
│   ├── store/            # 状态管理
│   │   └── CartContext/  # 购物车状态
│   ├── data/             # 模拟数据
│   ├── types/            # TypeScript 类型定义
│   ├── styles/           # 全局样式
│   ├── App.tsx           # 应用组件
│   └── main.tsx          # 入口文件
├── index.html
├── package.json
├── vite.config.ts
└── tsconfig.json
```

## 下一步开发建议

### 后端开发

- 用户认证系统
- 商家管理后台
- 商品管理
- 订单系统
- 支付接口（微信支付、支付宝）
- 文件上传（商品图片）

### 功能完善

- 用户登录/注册
- 地址管理
- 商品搜索
- 优惠券系统
- 评价系统
- 营销活动

## License

MIT

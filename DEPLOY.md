# 小兔鲜电商网站 - 部署指南

## 方案一：Vercel + Railway（推荐，免费）

### 1. 部署后端到 Railway

1. 访问 [railway.app](https://railway.app) 注册账号（用GitHub登录）
2. 点击 "New Project" → "Deploy from GitHub repo"
3. 选择你的仓库，或直接上传代码
4. Railway会自动检测Node.js并部署

5. 配置环境变量：
   - `NODE_ENV` = `production`
   - `PORT` = `3000`
   - `DB_HOST` = 你的PostgreSQL主机
   - `DB_PORT` = `5432`
   - `DB_NAME` = `ecommerce`
   - `DB_USER` = 你的数据库用户
   - `DB_PASSWORD` = 你的数据库密码
   - `JWT_SECRET` = 随机密钥
   - `JWT_EXPIRES_IN` = `7d`

6. 等待部署完成，记下生成的URL（如：`https://mall-api-xxxx.up.railway.app`）

### 2. 部署前端到 Vercel

1. 访问 [vercel.com](https://vercel.com) 注册账号
2. 点击 "New Project" → 导入前端项目
3. 修改 `vercel.json` 中的后端地址：
   ```json
   {
     "rewrites": [
       { "source": "/api/(.*)", "destination": "https://你的Railway URL/api/$1" }
     ]
   }
   ```
4. 点击 Deploy

### 3. 数据库准备

使用 Railway PostgreSQL（免费）：
1. 在 Railway 项目中点击 "New" → "Database" → "PostgreSQL"
2. 创建后会提供连接信息
3. 在本地执行 `sql/ecommerce_schema.sql` 创建表
4. 在本地执行 `sql/test_data.sql` 插入测试数据

---

## 方案二：Docker部署（适合有自己的服务器）

### 快速启动

```bash
cd vue-project/server

# 复制并编辑生产环境配置
cp .env.production .env
# 编辑 .env 填入你的数据库信息

# 启动所有服务
docker-compose up -d
```

### 访问服务

- 前端：http://localhost
- 后端API：http://localhost:3000

---

## 方案三：阿里云/腾讯云服务器

### 1. 前端部署

```bash
# 在服务器上安装 Nginx
sudo apt install nginx

# 构建前端
cd vue-project
npm install
npm run build

# 复制到 Nginx 目录
sudo cp -r dist/* /var/www/html/

# 配置 Nginx
sudo nano /etc/nginx/sites-available/default
```

Nginx配置：
```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /var/www/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api/ {
        proxy_pass http://localhost:3000/api/;
    }
}
```

### 2. 后端部署

```bash
cd vue-project/server

# 安装依赖
npm install --production

# 配置环境变量
cp .env.production .env
nano .env  # 填入生产环境配置

# 使用 PM2 运行
npm install -g pm2
pm2 start src/index.js --name mall-api

# 设置开机自启
pm2 save
pm2 startup
```

---

## 生产环境检查清单

### 必填项
- [ ] 数据库PostgreSQL已创建
- [ ] JWT_SECRET已设置为强密码
- [ ] CORS已配置正确的域名
- [ ] HTTPS已配置（Let's Encrypt免费）

### 安全建议
- [ ] 数据库密码强度足够
- [ ] 不要提交 `.env` 文件到Git
- [ ] 定期更新依赖 `npm audit fix`
- [ ] 配置防火墙，只开放80/443端口

---

## 常见问题

### 1. 跨域错误
确保后端 `.env` 中 `FRONTEND_URL` 设置为你的前端域名

### 2. 数据库连接失败
检查 `DB_HOST`、`DB_PORT`、`DB_USER`、`DB_PASSWORD` 是否正确

### 3. 静态资源404
前端路由需要配置 `try_files $uri $uri/ /index.html`

---

## 域名配置（可选）

1. 购买域名（如：example.com）
2. DNS解析到服务器IP
3. Nginx配置server_name为你的域名
4. 申请SSL证书（Let's Encrypt免费）：
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d your-domain.com
   ```
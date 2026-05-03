-- 电商网站数据库设计（参考Pagila设计思路）
-- PostgreSQL

-- 1. 用户表 (参考Pagila的customer)
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    phone VARCHAR(20),
    real_name VARCHAR(50),
    gender CHAR(1),
    birthday DATE,
    avatar VARCHAR(255),
    points INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. 地址表 (参考Pagila的address)
CREATE TABLE addresses (
    address_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
    receiver_name VARCHAR(50) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    province VARCHAR(50) NOT NULL,
    city VARCHAR(50) NOT NULL,
    district VARCHAR(50) NOT NULL,
    detail_address VARCHAR(255) NOT NULL,
    postal_code VARCHAR(10),
    is_default BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. 商品分类表 (参考Pagila的category)
CREATE TABLE categories (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    parent_id INTEGER REFERENCES categories(category_id),
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. 商品表 (参考Pagila的film)
CREATE TABLE products (
    product_id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    subtitle VARCHAR(500),
    price DECIMAL(10, 2) NOT NULL,
    original_price DECIMAL(10, 2),
    cost DECIMAL(10, 2),
    stock INTEGER DEFAULT 0,
    sold_count INTEGER DEFAULT 0,
    view_count INTEGER DEFAULT 0,
    rating DECIMAL(2, 1) DEFAULT 5.0,
    category_id INTEGER REFERENCES categories(category_id),
    description TEXT,
    main_image VARCHAR(255),
    images TEXT[], -- 数组存储多张图片
    is_on_sale BOOLEAN DEFAULT TRUE,
    is_hot BOOLEAN DEFAULT FALSE,
    is_new BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. 商品属性表 (存储商品规格如颜色、尺码)
CREATE TABLE product_attributes (
    attribute_id SERIAL PRIMARY KEY,
    product_id INTEGER REFERENCES products(product_id) ON DELETE CASCADE,
    name VARCHAR(50) NOT NULL, -- 如"颜色"、"尺码"
    value VARCHAR(100) NOT NULL -- 如"红色"、"XL"
);

-- 6. SKU库存表 (参考Pagila的inventory)
CREATE TABLE skus (
    sku_id SERIAL PRIMARY KEY,
    product_id INTEGER REFERENCES products(product_id) ON DELETE CASCADE,
    attributes JSONB, -- 存储属性组合，如 {"颜色": "红色", "尺码": "XL"}
    price DECIMAL(10, 2),
    stock INTEGER DEFAULT 0,
    sku_code VARCHAR(50) UNIQUE
);

-- 7. 购物车表 (参考Pagila的rental)
CREATE TABLE carts (
    cart_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
    session_id VARCHAR(100), -- 游客会话ID
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 8. 购物车商品表 (参考Pagila的inventory)
CREATE TABLE cart_items (
    cart_item_id SERIAL PRIMARY KEY,
    cart_id INTEGER REFERENCES carts(cart_id) ON DELETE CASCADE,
    product_id INTEGER REFERENCES products(product_id),
    sku_id INTEGER REFERENCES skus(sku_id),
    quantity INTEGER DEFAULT 1,
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 9. 订单表 (参考Pagila的rental)
CREATE TABLE orders (
    order_id SERIAL PRIMARY KEY,
    order_no VARCHAR(50) UNIQUE NOT NULL,
    user_id INTEGER REFERENCES users(user_id),
    status VARCHAR(20) DEFAULT 'pending', -- pending, paid, shipped, received, completed, cancelled
    total_amount DECIMAL(10, 2) NOT NULL,
    discount_amount DECIMAL(10, 2) DEFAULT 0,
    freight DECIMAL(10, 2) DEFAULT 0,
    payment_method VARCHAR(20),
    payment_no VARCHAR(100),
    paid_at TIMESTAMP,
    address_id INTEGER REFERENCES addresses(address_id),
    receiver_name VARCHAR(50),
    phone VARCHAR(20),
    province VARCHAR(50),
    city VARCHAR(50),
    district VARCHAR(50),
    detail_address VARCHAR(255),
    buyer_message VARCHAR(500),
    shipped_at TIMESTAMP,
    delivered_at TIMESTAMP,
    completed_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 10. 订单商品表 (参考Pagila的payment)
CREATE TABLE order_items (
    order_item_id SERIAL PRIMARY KEY,
    order_id INTEGER REFERENCES orders(order_id) ON DELETE CASCADE,
    product_id INTEGER REFERENCES products(product_id),
    product_name VARCHAR(200) NOT NULL,
    sku_id INTEGER REFERENCES skus(sku_id),
    sku_attributes JSONB,
    price DECIMAL(10, 2) NOT NULL,
    quantity INTEGER NOT NULL,
    subtotal DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 11. 商品收藏表 (参考Pagila的film_actor)
CREATE TABLE favorites (
    favorite_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
    product_id INTEGER REFERENCES products(product_id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, product_id)
);

-- 12. 商品评价表 (参考Pagila的review，但Pagila没有，我们新增)
CREATE TABLE reviews (
    review_id SERIAL PRIMARY KEY,
    product_id INTEGER REFERENCES products(product_id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
    order_id INTEGER REFERENCES orders(order_id),
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    content TEXT,
    images TEXT[],
    is_anonymous BOOLEAN DEFAULT FALSE,
    like_count INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 13. 收货地址表扩展
ALTER TABLE addresses ADD COLUMN label VARCHAR(20); -- 如"家里"、"公司"

-- 14. 用户积分记录表
CREATE TABLE point_logs (
    log_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
    type VARCHAR(20) NOT NULL, -- earn, redeem
    points INTEGER NOT NULL,
    balance INTEGER NOT NULL,
    description VARCHAR(200),
    order_id INTEGER REFERENCES orders(order_id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 15. 操作日志表 (参考Pagila的staff)
CREATE TABLE operation_logs (
    log_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id),
    action VARCHAR(50) NOT NULL,
    target_type VARCHAR(30),
    target_id INTEGER,
    details JSONB,
    ip_address VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 索引
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_is_on_sale ON products(is_on_sale);
CREATE INDEX idx_products_is_hot ON products(is_hot);
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created_at ON orders(created_at);
CREATE INDEX idx_cart_items_cart_id ON cart_items(cart_id);
CREATE INDEX idx_cart_items_product_id ON cart_items(product_id);
CREATE INDEX idx_reviews_product_id ON reviews(product_id);
CREATE INDEX idx_reviews_user_id ON reviews(user_id);

-- 触发器：更新updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
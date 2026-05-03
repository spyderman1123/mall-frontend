-- 测试数据
-- 密码是 '123456' (bcrypt加密)

-- 插入分类
INSERT INTO categories (name, parent_id, sort_order, is_active) VALUES
('生鲜', NULL, 1, true),
('美食', NULL, 2, true),
('餐厨', NULL, 3, true),
('电器', NULL, 4, true),
('居家', NULL, 5, true),
('洗护', NULL, 6, true),
('孕婴', NULL, 7, true),
('服装', NULL, 8, true);

-- 插入商品
INSERT INTO products (name, subtitle, price, original_price, stock, sold_count, rating, category_id, description, main_image, is_on_sale, is_hot, is_new) VALUES
('KN95级莫兰迪色防护口罩', '时尚又实用，多层过滤防护', 79.00, 99.00, 1000, 5200, 4.8, 6, 'KN95级防护口罩，莫兰迪色系，时尚又实用。多层过滤，有效防护飞沫和颗粒物。', '/src/assets/uploads/goods1.png', true, true, false),
('紫米全自动保温杯', '316不锈钢，12小时保温', 59.00, 79.00, 500, 3200, 4.9, 3, '紫米全自动保温杯，316不锈钢内胆，12小时保温保冷。一键开盖，方便快捷。', '/src/assets/uploads/goods2.png', true, false, false),
('大容量多功能收纳箱', '透明可视，多规格可选', 129.00, 159.00, 300, 1800, 4.7, 5, '大容量收纳箱，多规格可选，透明可视，便于分类整理。', '/src/assets/uploads/goods3.png', true, false, false),
('智能颈椎按摩仪', '多种模式，缓解疲劳', 299.00, 399.00, 200, 8900, 4.9, 4, '智能颈椎按摩仪，多种按摩模式，缓解颈椎疲劳。', '/src/assets/uploads/goods4.png', true, true, true),
('新疆阿克苏苹果', '皮薄肉厚，甜脆多汁', 39.00, 49.00, 2000, 12000, 4.9, 1, '新疆阿克苏冰糖心苹果，皮薄肉厚，甜脆多汁。', '/src/assets/uploads/fresh1.png', true, true, false),
('进口智利车厘子', 'JJ级大果，新鲜饱满', 89.00, 129.00, 500, 9800, 4.8, 1, '进口智利车厘子，JJ级大果，新鲜饱满，甜度高。', '/src/assets/uploads/fresh2.png', true, true, false),
('有机西兰花', '绿色健康，营养丰富', 19.00, 25.00, 1000, 4500, 4.7, 1, '有机西兰花，绿色健康，营养丰富。', '/src/assets/uploads/fresh3.png', true, false, false),
('新鲜三文鱼', '挪威进口，刺身级', 99.00, 139.00, 300, 6700, 4.8, 1, '挪威进口三文鱼，新鲜刺身级，肉质细腻。', '/src/assets/uploads/fresh4.png', true, false, false),
('不粘锅炒锅', '麦饭石涂层，少油烟', 199.00, 299.00, 400, 4500, 4.7, 3, '麦饭石不粘锅，少油烟，易清洗。', '/src/assets/uploads/kitchen1.png', true, true, false),
('陶瓷餐具套装', '简约设计，安全健康', 159.00, 199.00, 300, 3200, 4.8, 3, '简约陶瓷餐具套装，釉色均匀，美观大方。', '/src/assets/uploads/kitchen2.png', true, false, false),
('纯棉四件套', '100%纯棉，柔软舒适', 299.00, 399.00, 200, 5600, 4.8, 5, '100%纯棉四件套，柔软舒适，亲肤透气。', '/src/assets/uploads/home1.png', true, false, false),
('乳胶枕头', '泰国乳胶，颈椎呵护', 199.00, 269.00, 300, 7800, 4.9, 5, '泰国天然乳胶枕头，贴合颈椎，助眠舒适。', '/src/assets/uploads/home2.png', true, true, false),
('女士纯棉T恤', '简约百搭，舒适透气', 89.00, 119.00, 1000, 11000, 4.7, 8, '纯棉女士T恤，简约百搭，舒适透气。', '/src/assets/uploads/hot3.png', true, true, false),
('婴儿纯棉连体衣', '柔软亲肤，安全无刺激', 79.00, 99.00, 500, 6500, 4.9, 7, '婴儿纯棉连体衣，柔软亲肤，舒适透气。', '/src/assets/uploads/hot5.png', true, false, false),
('家用多功能电火锅', '多档调温，一锅多用', 199.00, 259.00, 400, 8900, 4.8, 4, '家用多功能电火锅，多档调温，一锅多用。', '/src/assets/uploads/hot1.png', true, true, false),
('无线蓝牙耳机', '主动降噪，超长续航', 299.00, 399.00, 600, 12000, 4.8, 4, '无线蓝牙耳机，主动降噪，超长续航。', '/src/assets/uploads/hot2.png', true, true, true);

-- 插入测试用户 (密码是 123456)
-- bcrypt hash for '123456': $2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi
INSERT INTO users (username, password, email, phone, real_name, is_active) VALUES
('testuser', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'test@example.com', '13800138000', '测试用户', true);

-- 为测试用户创建购物车
INSERT INTO carts (user_id) VALUES (1);

-- 插入测试收货地址
INSERT INTO addresses (user_id, receiver_name, phone, province, city, district, detail_address, label, is_default) VALUES
(1, '张三', '13800138000', '北京市', '市辖区', '朝阳区', '某某街道某某小区1号楼101', '家里', true),
(1, '李四', '13900139000', '上海市', '市辖区', '浦东新区', '某某路某某花园2栋202', '公司', false);
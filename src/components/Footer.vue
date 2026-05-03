<template>
  <footer class="footer">
    <div class="footer-service w">
      <ul>
        <li>
          <span class="iconfont icon-processing"></span>
          <div>
            <h5>新鲜出炉</h5>
            <p>品质靠谱</p>
          </div>
        </li>
        <li>
          <span class="iconfont icon-clock"></span>
          <div>
            <h5>准时到达</h5>
            <p>下单即发货</p>
          </div>
        </li>
        <li>
          <span class="iconfont icon-money"></span>
          <div>
            <h5>无忧退款</h5>
            <p>拒绝套路</p>
          </div>
        </li>
        <li>
          <span class="iconfont icon-service"></span>
          <div>
            <h5>在线客服</h5>
            <p>全天在线</p>
          </div>
        </li>
      </ul>
    </div>
    <div class="footer-nav w">
      <div class="nav-left">
        <dl>
          <dt>购物指南</dt>
          <dd><router-link to="/">购物流程</router-link></dd>
          <dd><router-link to="/">会员介绍</router-link></dd>
          <dd><router-link to="/">生活旅行</router-link></dd>
          <dd><router-link to="/">常见问题</router-link></dd>
          <dd><router-link to="/">联系客服</router-link></dd>
        </dl>
        <dl>
          <dt>配送方式</dt>
          <dd><router-link to="/">上门自提</router-link></dd>
          <dd><router-link to="/">配送说明</router-link></dd>
          <dd><router-link to="/">配送规则</router-link></dd>
        </dl>
        <dl>
          <dt>支付方式</dt>
          <dd><router-link to="/">在线支付</router-link></dd>
          <dd><router-link to="/">货到付款</router-link></dd>
          <dd><router-link to="/">分期付款</router-link></dd>
        </dl>
        <dl>
          <dt>售后服务</dt>
          <dd><router-link to="/">售后政策</router-link></dd>
          <dd><router-link to="/">退款说明</router-link></dd>
          <dd><router-link to="/">返修记录</router-link></dd>
        </dl>
        <dl>
          <dt>特色服务</dt>
          <dd><router-link to="/">会员权益</router-link></dd>
          <dd><router-link to="/">礼品卡</router-link></dd>
          <dd><router-link to="/">兑换码</router-link></dd>
        </dl>
      </div>
      <div class="nav-right">
        <div class="qrcode">
          <img src="../assets/images/app.png" alt="扫码下载APP">
          <p>扫描下载小兔鲜APP</p>
        </div>
        <div class="qrcode">
          <img src="../assets/images/wechat.png" alt="关注微信公众号">
          <p>关注小兔鲜公众号</p>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <div class="w">
        <p class="copyright">
          © 2026 小兔鲜儿 版权所有 | ICP备案号：XXXXXXXX号 | 电子营业执照
        </p>
        <div class="links">
          <router-link to="/">关于我们</router-link>
          <router-link to="/">帮助中心</router-link>
          <router-link to="/">售后服务</router-link>
          <router-link to="/">配送与验收</router-link>
          <router-link to="/">商务合作</router-link>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
</script>

<style scoped>
.w {
  width: 1240px;
  margin: 0 auto;
}

.footer {
  background-color: #333;
  color: #fff;
  margin-top: 60px;
}

.footer-service {
  padding: 60px 0;
  border-bottom: 1px solid #444;
}

.footer-service ul {
  display: flex;
  justify-content: space-around;
}

.footer-service li {
  display: flex;
  align-items: center;
  gap: 15px;
}

.footer-service .iconfont {
  font-size: 50px;
  color: #5EB69C;
}

.footer-service h5 {
  font-size: 18px;
  margin-bottom: 5px;
}

.footer-service p {
  font-size: 14px;
  color: #999;
}

.footer-nav {
  display: flex;
  justify-content: space-between;
  padding: 40px 0;
}

.nav-left {
  display: flex;
  gap: 100px;
}

.nav-left dl dt {
  font-size: 18px;
  margin-bottom: 20px;
}

.nav-left dl dd {
  margin-bottom: 10px;
}

.nav-left dl dd a,
.footer .nav-left dl dd .router-link {
  color: #999;
  font-size: 14px;
  text-decoration: none;
}

.nav-left dl dd a:hover,
.footer .nav-left dl dd .router-link:hover {
  color: #5EB69C;
}

.nav-right {
  display: flex;
  gap: 80px;
}

.qrcode {
  text-align: center;
}

.qrcode img {
  width: 120px;
  height: 120px;
  background-color: #fff;
  padding: 10px;
  margin-bottom: 10px;
}

.qrcode p {
  font-size: 14px;
  color: #999;
}

.footer-bottom {
  background-color: #222;
  padding: 20px 0;
}

.footer-bottom .w {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.copyright {
  font-size: 14px;
  color: #999;
}

.links {
  display: flex;
  gap: 30px;
}

.links a {
  color: #999;
  font-size: 14px;
}

.links a:hover {
  color: #5EB69C;
}
</style>
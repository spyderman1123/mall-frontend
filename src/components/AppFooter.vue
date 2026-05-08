<template>
  <footer class="footer">
    <div class="w">
      <div class="slogan">
        <ul>
          <li>
            <h5 class="one"></h5>
            <p>价格亲民</p>
          </li>
          <li>
            <h5 class="two"></h5>
            <p>物流快捷</p>
          </li>
          <li>
            <h5 class="three"></h5>
            <p>品质新鲜</p>
          </li>
          <li>
            <h5 class="four"></h5>
            <p>售后无忧</p>
          </li>
        </ul>
      </div>

      <div class="service">
        <div class="service-left">
          <dl>
            <dt>购物指南</dt>
            <dd><a href="#">购物指南</a></dd>
            <dd><a href="#">支付方式</a></dd>
            <dd><a href="#">售后规则</a></dd>
          </dl>
          <dl>
            <dt>配送方式</dt>
            <dd><a href="#">配送运费</a></dd>
            <dd><a href="#">配送范围</a></dd>
            <dd><a href="#">配送时间</a></dd>
          </dl>
          <dl>
            <dt>关于我们</dt>
            <dd><a href="#">平台规则</a></dd>
            <dd><a href="#">联系我们</a></dd>
            <dd><a href="#">问题反馈</a></dd>
          </dl>
          <dl>
            <dt>售后服务</dt>
            <dd><a href="#">售后政策</a></dd>
            <dd><a href="#">退款说明</a></dd>
            <dd><a href="#">取消订单</a></dd>
          </dl>
          <dl>
            <dt>服务热线</dt>
            <dd><a href="#">在线客服 <i class="iconfont icon-customer-service"></i></a></dd>
            <dd><a href="#">客服电话 400-0000-000</a></dd>
            <dd><a href="#">工作时间 周一至周日 8:00-18:00</a></dd>
          </dl>
        </div>

        <div class="service-right">
          <ul>
            <li>
              <img src="/images/app.png" alt="">
              <p>微信公众号</p>
            </li>
            <li>
              <img src="/images/app.png" alt="">
              <p>APP下载二维码</p>
            </li>
          </ul>
        </div>
      </div>

      <div class="copyright">
        <p>
          <a href="#">关于我们</a>
          <a href="#">帮助中心</a>
          <a href="#">售后服务</a>
          <a href="#">配送与验收</a>
          <a href="#">商务合作</a>
          <a href="#">搜索推荐</a>
          <a href="#">友情链接</a>
        </p>
        <p>CopyRight © 小兔鲜</p>
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
  background-color: #f5f5f5;
}
.slogan {
  height: 178px;
  border-bottom: 1px solid #e8e8e8;
}
.slogan ul {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 178px;
}
.slogan ul li {
  display: flex;
  align-items: center;
}
.slogan ul li h5 {
  width: 58px;
  height: 58px;
  background: url('/images/sprite.png') no-repeat;
}
.slogan ul li .two {
  background-position: 0 -58px;
}
.slogan ul li .three {
  background-position: 0 -116px;
}
.slogan ul li .four {
  background-position: 0 -174px;
}
.slogan ul li p {
  font-size: 14px;
  margin-left: 20px;
  color: #333;
}

.service {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 60px;
}
.service-left {
  display: flex;
  gap: 84px;
}
.service-left dl dt {
  font-size: 18px;
  margin-bottom: 30px;
  color: #333;
}
.service-left dd {
  margin-bottom: 10px;
}
.service-left dd a {
  color: #969696;
}
.service-left dd a:hover {
  color: #00BE9A;
}

.service-right ul {
  display: flex;
  gap: 55px;
  text-align: center;
}
.service-right ul li {
  color: #969696;
}
.service-right ul li p {
  margin-top: 10px;
}

.copyright {
  text-align: center;
  margin-top: 60px;
  line-height: 30px;
  color: #A1A1A1;
}
.copyright a {
  color: #A1A1A1;
  margin: 0 10px;
}
.copyright a:hover {
  color: #00BE9A;
}

.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  color: #00BE9A;
}

@media (max-width: 768px) {
  .w {
    width: 100%;
    padding: 0 10px;
  }
  .slogan {
    height: auto;
    padding: 20px 0;
  }
  .slogan ul {
    flex-direction: column;
    gap: 20px;
    height: auto;
  }
  .service {
    flex-direction: column;
    gap: 30px;
    margin-top: 30px;
  }
  .service-left {
    flex-wrap: wrap;
    gap: 20px;
  }
  .service-left dl {
    width: 45%;
  }
  .service-left dl dt {
    font-size: 14px;
    margin-bottom: 10px;
  }
  .service-left dd a {
    font-size: 12px;
  }
  .service-right ul {
    gap: 20px;
  }
  .service-right ul li img {
    width: 80px;
    height: 80px;
  }
  .copyright {
    margin-top: 30px;
    padding-bottom: 20px;
  }
  .copyright a {
    display: block;
    margin: 5px 0;
  }
}
</style>

riot.tag('menu', '<div class="swiper-container"> <div class="swiper-wrapper"> <div class="swiper-slide" each="{arr, i in mappedKeys}"> <div class="vendor-wrapper" each="{item, j in arr}"> <div class="vendor-name">{item}</div> <div class="product-wrapper" each="{prd, k in window.menuInfo.form_json[item]}"> <div class="content-wrapper"> <div class="img-wrapper" riot-style="background-image: url(\'{prd.link}\')"> <div class="{ prd.qty? \'img-qty-cover visible\':\'img-qty-cover\'}">{prd.qty}</div> </div> <div class="product-desc"> <h3 class="product-name">{prd.name}</h3> <span class="product-price">Rs. {prd.price}</span> </div> <div class="submit-btn" onclick="{ add }">ADD</div> <div class="{ prd.qty? \'btn-group show\':\'btn-group\'}"> <input type="button" class="counter minus" value="-" onclick="{ minus }" disabled = {isSubmitted?\'disabled\':\'\'}></input> <input type="button" class="counter plus" value="+" onclick="{ add }" disabled = {isSubmitted?\'disabled\':\'\'}></input> </div> </div> </div> </div> </div> </div> <div class="swiper-pagination"></div> <div class="{isSubmitted? \'cart-container visible\':\'cart-container\'}" id="cart"> <i class="fa fa-shopping-cart shopping-card-icon"></i> <img src="./images/cart.png"> <div class="cart-count" id="count">{window.count}</div> <span class="submit">{isSubmitted? \'SUBMITTED\':\'SUBMIT\'}</span> </div> </div>', function(opts) {

  this.data = window.menuInfo.form_json;
  this.keys = Object.keys(this.data);
  window.count = 0;
  window.keys = this.keys;
  this.mappedKeys = [];
  this.mappedKeys.push(this.keys);
  var self = this;
  this.keys.forEach(function(key){
    var temp = [key];
    self.mappedKeys.push(temp);
  });

  this.isSubmitted = !!(window.menuInfo.state == 'SUBMITTED');

  (function getCount(){
    var arr = self.mappedKeys[0];
    arr.forEach(function(key){
      var vendor = self.data[key];
      vendor.forEach(function(item){
        window.count += item.qty;
      });
    });
  })();

  this.add = function(e) {
    if(isSubmitted) return;
    var vendor = e.item.prd.vendor;
    var name = e.item.prd.name;
    var location = null;
    var list = window.menuInfo.form_json[vendor];
    list.forEach(function(item, index){
      if(item.name == name) location = index;
    });
    window.menuInfo.form_json[vendor][location].qty += 1;
    window.count +=1;

    var classList = document.getElementById('cart').className;
    if(classList.indexOf('visible') <= -1){
      document.getElementById('cart').className += ' visible';
      document.querySelector('.swiper-slide-active .vendor-wrapper:last-child').style.marginBottom = '95px';
    };

    return true;
  }.bind(this);

  this.minus = function(e) {
    if(isSubmitted) return;
    var vendor = e.item.prd.vendor;
    var name = e.item.prd.name;
    var location = null;
    var list = window.menuInfo.form_json[vendor];
    list.forEach(function(item, index){
      if(item.name == name) location = index;
    });

    if(!window.menuInfo.form_json[vendor][location].qty) return;
    window.menuInfo.form_json[vendor][location].qty -= 1;
    window.count -=1;

    var classList = document.getElementById('cart').className;

    if(!window.count){
      document.getElementById('cart').className = 'cart-container';
      document.querySelector('.swiper-slide-active .vendor-wrapper:last-child').style.marginBottom = '40px';
      return true;
    }

    if(classList.indexOf('visible') <= -1){
      document.getElementById('cart').className += ' visible';
    };

    document.getElementById('count').innerHTML = window.count;
    return true;
  }.bind(this);

});
function updateValueMinicart(t){t>0?($(".j-minicart-content.x-group-products footer").fadeIn(),$(".j-minicart-content.x-group-products header").fadeIn(),$(".j-minicart-content").removeClass("mx-empty_mn")):($(".j-minicart-content").addClass("mx-empty_mn"),$(".j-miniCart-box-wrapper .j-content-minicart").html('<div class="mx-cart-empty">Seu carrinho estÃ¡ vazio!</div>'))}floatToCurrency=function(t){for(var e=t.toString().replace(",","").split("."),a=e[1]||"",n=e[0].split(""),r=[],i=n.length,o=0;0!=i;i--,o++)o%3==0&&0!=o&&(r[r.length]="."),r[r.length]=n[i-1];return 1==a.length?a+="0":0==a.length?a="00":a.length>2&&(a=Math.floor(parseInt(a,10)/Math.pow(10,a.length-2)).toString()),"$ "+r.reverse().join("")+","+a};var cartValue=0;!function(){var t=function(t){var e=jQuery.extend({container:".j-minicart-content .j-content-minicart",items:".j-amount-itens",list:".cart-list",price_label:"$ ",total_price_currency:"",total_price_container:".j-sub ul li.j-value",total_price_label:"",cart_conclude:null,remove_btn:!1,finish_order_btn:".finish-order-btn",finish_order_btn_link:"/Site/Carrinho.aspx",finish_order_btn_text:"Finalizar compra",empty_cart_message:"Carrinho vazio",items_text:["nenhum item","item","itens"],hover:".tpl-cart",callback:null,cart_empty_cb:null,quantity:!0,total_price_class:".j-sub",total_price_label_class:".total-price-label",dropdown:!0,show_images:!0},t),a={checkoutURL:"/api/checkout/pub/orderForm/",temp:null,total_itens:0,total:"0,00",empty_cart:null,itens:0,data:null,init:function(t){a.get.cart.update(t)},checkoutUpdateURL:function(){return a.checkoutURL+a.orderFormId+"/items/update/"},get:{cart:{update:function(t){$(".j-minicart-content .j-sub").addClass("loading");var n,r={expectedOrderFormSections:["items","paymentData","totalizers"]};t?($.extend(r,t),n=a.checkoutUpdateURL()):n=a.checkoutURL,$.ajax({url:n,data:JSON.stringify(r),dataType:"json",contentType:"application/json; charset=utf-8",type:"POST",success:function(t){a.total_itens=t.items.length,$(".menu-entrar .item .qty").text(t.items.length),a.total_itens>0?(a.orderFormId=t.orderFormId,a.data=t.items,a.set.cart.items(),a.total=_.intAsCurrency(t.value),$(".menu-entrar .valor .vl").text(_.intAsCurrency(t.value)),a.set.cart.total(),e.dropdown&&a.mount.cart.dropdown()):a.set.cart.empty(),updateValueMinicart(a.total_itens),cartValue=t.value,$(".j-amount-items").text(a.total_itens),vtexjs.checkout.getOrderForm().done(function(t){console.log(t)})}})},text:function(){var t=e.items_text.length-1,n=e.items_text.length-1==2?1:0,r=void 0===e.items_text[t]?"":" ",i=void 0===e.items_text[n]?"":" ";return parseInt(a.total_itens)>1?a.total_itens+r+e.items_text[t]:0==a.total_itens?e.items_text[0]:a.total_itens+i+e.items_text[n]}}},mount:{cart:{dropdown:function(){var t,n,r,i,o=0,s=e.list.split(".")[1]||"",c=jQuery("<ul/>").addClass(s);for(var l in a.data){if("function"==typeof a.data[l])break;var d=a.data[l].productId,u=a.data[l].productCategories;for(var p in u){var m=u[p].replace("Ã§","c").toLowerCase();break}var _=jQuery("<li>").addClass("row").addClass("row-"+o).attr("sku",d).addClass(m);t=jQuery("<div>").addClass("col").addClass("col-0"),_span_img=jQuery("<div>").addClass("_qc-img").addClass("_qc-img-"+o).attr("sku",d),_span_product=jQuery("<div>").addClass("_qc-product").addClass("_qc-product-"+o),jQuery(_span_product).text(a.data[l].name),jQuery(t).append(_span_img.html('<img src="'+a.data[l].imageUrl.replace('http','https')+'" />')),e.show_images&&jQuery(t).append(_span_product),n=jQuery("<div>").addClass("col").addClass("col-1"),productLinkItem=jQuery("<a>").attr("href",a.data[l].detailUrl),t=productLinkItem.append(t);var v=a.data[l].quantity,y=jQuery('<input type="text" value="'+v+'" maxlength="2" />').attr("ndx",o).addClass("_qty").addClass("_qty-"+o).attr("sku",d),j=jQuery("<a>",{ndx:o}).addClass("_add").addClass("_add-"+o).html('<svg enable-background="new 0 0 24 24" version="1.0" viewBox="0 0 24 24" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><polyline fill="none" points="3,15.5 12,6.5 21,15.5 " stroke="#ffffff" stroke-miterlimit="10" stroke-width="2" /></svg>'),h=jQuery("<a>",{ndx:o}).addClass("_remove").addClass("_remove-"+o).html('<svg enable-background="new 0 0 24 24" version="1.0" viewBox="0 0 24 24" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><polyline fill="none" points="21,8.5 12,17.5 3,8.5 " stroke="#ffffff" stroke-miterlimit="10" stroke-width="2" /></svg>');jQuery(n).append(y).append(j).append(h);var f=(a.data[l].sellingPrice/100).formatMoney();r=jQuery("<div>").addClass("col").addClass("col-2").html(f);var x=a.data[l].id;_remove_btn=jQuery("<span>").addClass("remove-link").addClass("remove-link-"+o).attr({sku:x,index:o}).html("x"),i=jQuery("<div>").addClass("col").addClass("col-3"),jQuery(i).append(_remove_btn),jQuery(_).append(t).append(n).append(r).append(i),jQuery(c).append(_),o++}jQuery(e.container).html(c),a.set.events(),a.set.cart.conclusion(),a.set.cart.active(),e.show_images}}},set:{cart:{items:function(){var t=a.get.cart.text();jQuery(e.items).html(t)},total:function(){var t=e.total_price_currency+a.total;jQuery(e.total_price_container).html(t.replace(".","|").replace(",",".").replace("|",","))},empty:function(){jQuery(e.hover).unbind().removeClass("active").addClass("empty");var t=a.get.cart.text();a.set.cart.items(t),jQuery(e.container).length>0&&jQuery(e.container).html(""),"function"==typeof e.cart_empty_cb&&e.cart_empty_cb()},conclusion:function(){t=jQuery("<div/>").addClass("cart_conclude");if(jQuery(e.cart_conclude).length>0)var t=jQuery(e.cart_conclude);var n=e.finish_order_btn.substring(1)||"",r=jQuery("<a/>").addClass(n).attr("href",e.finish_order_btn_link).html(e.finish_order_btn_text);jQuery(t).append(r);var i=e.total_price_currency+a.total.replace(".","|").replace(",",".").replace("|",",");$('<div class="mx-finish"><div class="mx-total"><div class="mx-valorTotal">'+i+'</div><div class="mx-actions"><div class="mx-tocart"><a href="/checkout/#/cart">Finalizar compra</a></div></div></div></div>').appendTo("#quickCartDropdown")},active:function(){jQuery(e.hover).removeClass("empty").addClass("available"),"function"==typeof e.callback&&e.callback()}},events:function(){var t=function(t){a.init({orderItems:[{index:t,quantity:0}]})},n=function(t,n){jQuery(e.container).find("._qty,._add,._remove").removeClass("active").removeClass("keydown_binding"),jQuery(e.container).find("._qty").attr("readonly",!0),a.init({orderItems:[{index:t,quantity:n}]})};jQuery(e.hover).hover(function(){jQuery(this).addClass("active")},function(){jQuery(e.hover).removeClass("active")}),jQuery(e.container).find(".remove-link").click(function(e){e.preventDefault(),t($(this).attr("index"))}),jQuery(e.container).find('._qty:not(".keydown_binding")').addClass("keydown_binding").keydown(function(t){var e=t.charCode||t.keyCode||0;return 8==e||9==e||46==e||e>=37&&40>=e||e>=48&&57>=e||e>=96&&105>=e}),jQuery(e.container).find('._add:not(".active")').addClass("active").click(function(){return _ndx=jQuery(this).attr("ndx"),_val=parseInt(jQuery("._qty-"+_ndx).val()),_val=_val>=99?99:_val+1,jQuery("._qty-"+_ndx).val(_val).change(),!1}),jQuery(e.container).find('._remove:not(".active")').addClass("active").click(function(){return _ndx=jQuery(this).attr("ndx"),_val=parseInt(jQuery("._qty-"+_ndx).val()),_val=1>=_val?1:_val-1,jQuery("._qty-"+_ndx).val(_val).change(),!1}),jQuery(e.container).find('._qty:not(".active")').addClass("active").keyup(function(){jQuery(this).val()<1?jQuery(this).val(1):jQuery(this).val()>99&&jQuery(this).val(99)}).change(function(){n(jQuery(this).attr("ndx"),jQuery(this).val())})}},refresh:function(){a.init()}};return a.init(),{refresh:a.refresh}};jQuery.vtex_quick_cart=function(e){return new t(e)}}(jQuery);var optionsMiniCart={items_text:['<em class="#j-header .j-cart .j-amount-items">0</em>',"",""],callback:function(){vtexjs.checkout.getOrderForm().done(function(t){updateValueMinicart(t.items.length)})}};jQuery.vtex_quick_cart(optionsMiniCart),$(document).ajaxStop(function(){0!=cartValue&&(vtexjs.checkout.orderForm.value!=cartValue?($(".j-minicart-content .j-sub").addClass("loading"),jQuery.vtex_quick_cart(optionsMiniCart)):$(".j-minicart-content .j-sub").removeClass("loading"))});

!function(w){var Elektra=w.Elektra||{};Elektra.Limit={init:function(){$(w).on("orderFormUpdated.vtex",function(evt,orderForm){Elektra.Limit.validate(orderForm)}),void 0===window.vtex.checkout&&Elektra.Limit.vtexPolyfill(),$('<div class="vtex-front-messages-placeholder"><button type="button" class="vtex-front-messages-close-all close">Ã—</button></div>').appendTo("body"),$(".vtex-front-messages-close-all").on("click",function(){Elektra.Limit.closeMessage()})},messages:{},closeMessage:function(){$(".vtex-front-messages-placeholder").fadeOut("slow",function(){$(".vtex-front-messages-template").remove()}),Elektra.Limit.messages={}},vtexPolyfill:function(){var time=0;window.vtex.checkout={MessageUtils:{messageFromAPIMessage:function(obj){return{type:obj.status,content:{detail:obj.text,html:!1},close:"Cerrar"}}}},$(window).on("addMessage.vtex",function(b,c){if(clearTimeout(time),void 0===Elektra.Limit.messages[c.content.detail]){var messageHtml='<div class="vtex-front-messages-template vtex-front-message-23 vtex-front-messages-instance vtex-front-messages-type-'+c.type+' vtex-front-messages-template-opened"><span class="vtex-front-messages-separator" style="display: none;"> - </span><span class="vtex-front-messages-detail">'+c.content.detail+"</span></div>";$(".vtex-front-messages-placeholder").append(messageHtml),$(".vtex-front-messages-placeholder:hidden").fadeIn("slow"),Elektra.Limit.messages[c.content.detail]=!0}time=setTimeout(function(){Elektra.Limit.closeMessage()},5e3)})},generalLimit:3,config:{1371676:1,1371760:4,1371766:4,1371822:4},validate:function(orderForm){for(var items=orderForm.items,categories=null,toUpdate=[],i=0;i<items.length;i++){categories=Object.getOwnPropertyNames(items[i].productCategories);for(var j=0;j<categories.length;j++){var limit=Elektra.Limit.config[categories[j]]||Elektra.Limit.generalLimit;items[i].quantity>limit&&(toUpdate.push({index:i,quantity:limit}),$(window).trigger("addMessage.vtex",vtex.checkout.MessageUtils.messageFromAPIMessage({code:null,fields:{},status:"info",text:"La compra esta limitada a "+limit+" unidades del producto "+items[i].name+" en tu carrito de compra."})))}$("input[sku="+items[i].refId+"]").val(items[i].quantity)}toUpdate.length&&vtexjs.checkout.updateItems(toUpdate,null,!1)}},w.Elektra=Elektra,w.Elektra.Limit.init()}(window);
function showArtistMasonryTiles(){if(artistLoaded++,artistLoaded==artistTotal){$(".artist .next-results").hide();var e=$($(".artist .hide-offset").html()).clone();$(".artist .hide-offset").empty();$(".artist .books");e.each(function(e,t){if(t=$(t),t.text().trim()){var a=t.data("datepub");parseInt(a)?$(".artist .books .regular-grid").append(t):$(".artist .photographs .regular-grid").append(t)}}),artistBatchMax>artistBatchLoaded?(getArtistNextResults(),artistBatchLoaded+=artistBatchSize):artistBatchLoaded=0}}function getArtistNextResults(){if(!artistAllLoaded){var e=$(".artist .next-results");e.is(":visible")||(e.show(),$.ajax({url:"/bookstore/artist/results",data:{subject:$("#artist-full-name").val(),skip:artistSkip,take:artistTake,width:artistWidth},method:"GET",success:function(t,a,i){artistSkip+=artistTake,$(".hide-offset").append($(t)),$(".hide-offset .thumbs img").length||(artistAllLoaded=!0),artistTotal+=$(".hide-offset .thumbs img").length,$(".hide-offset img").load(function(){showArtistMasonryTiles()}).error(function(){showArtistMasonryTiles()}).each(function(){var e=$(this);e.data("catalog");!e.attr("src")&&e.data("catalog")&&$.ajax({url:"/bookstore/load-images",data:{catalog:e.data("catalog"),hard_isbn:e.data("hard-isbn"),soft_isbn:e.data("soft-isbn"),width:artistWidth},method:"GET",success:function(t,a,i){if(t){console.log(t);var s=e.data("use-local-image"),o=t.img_s3_300||t.img_s3_original;s||(o=t.img_amazon||t.img_s3_300||t.img_s3_original),o?(e.show(),loadImage(e,o)):e.attr({src:"/images/no-preview.jpg","data-no-preview":!0}),t.booktease&&t.booktease.length&&(artistMainImage||(artistMainImage=t.booktease[0]),$(".top-info .hidden-image").load(function(){$(".top-info .main-image").css("background",'url("'+$(".top-info .hidden-image").attr("src")+'") center center no-repeat'),setTimeout(function(){$(".top-info .default-panel").fadeOut()},0)}).attr("src",artistMainImage))}}})}),0===t.trim().length&&e.hide()},error:function(t,a,i){e.hide()}}))}}function initBookstoreSlider(){var e=$(".slider-365-a-day .slider").slick({centerMode:!0,centerPadding:"300px",slidesToShow:5,infinite:!1,responsive:[{breakpoint:4095,settings:{slidesToShow:5}},{breakpoint:2881,settings:{slidesToShow:3}},{breakpoint:2400,settings:{slidesToShow:3,centerPadding:"100px"}},{breakpoint:2e3,settings:{slidesToShow:1,centerPadding:"550px"}},{breakpoint:1700,settings:{slidesToShow:1,centerPadding:"420px"}},{breakpoint:1450,settings:{slidesToShow:1,centerPadding:"350px"}},{breakpoint:1300,settings:{slidesToShow:1,centerPadding:"300px"}},{breakpoint:1200,settings:{slidesToShow:1,centerPadding:"200px"}},{breakpoint:991,settings:{slidesToShow:1,centerPadding:"10px"}}]});return e.on("afterChange",function(t,a,i){i>$todays_slide?setTimeout(function(){e.slick("slickGoTo",$todays_slide)},0):($(".slider-365-a-day .slider .slick-track > .slick-slide .box-current").removeClass("box-current"),$slide=$(".slider-365-a-day .slider .slick-track > .slick-slide")[i],$($slide).find(".box").addClass("box-current"))}),e.on("beforeChange",function(e,t,a,i){$todays_slide>i?$(".slider-365-a-day .slider .slick-next").show():$(".slider-365-a-day .slider .slick-next").hide()}),e}function reInitBookstoreSlider(){var e=$slider_bookstore.slick("slickCurrentSlide");$slider_bookstore.slick("unslick"),$slider_bookstore=initBookstoreSlider(),$slider_bookstore.slick("slickGoTo",e,!0)}function setBookstoreGridTilesHeight(){$(".bookstore .masonry").find(".item .item-content").height("auto");var e=Math.max.apply(Math,$(".bookstore .masonry").find(".item.bestsellers .item-content, .item.book-of-the-week .item-content").map(function(){return $(this).height()})),t=2*Math.max.apply(Math,$(".bookstore .masonry").find(".item:not(.bestsellers,.book-of-the-week) .item-content").map(function(){return $(this).height()})),a=t;window.innerWidth>768&&(a=Math.max(e,t),$(".bookstore .masonry").find(".item.bestsellers .item-content, .item.book-of-the-week .item-content").height(a+12)),$(".bookstore .masonry").find(".item:not(.bestsellers,.book-of-the-week) .item-content").height(a/2),$(".bookstore .masonry").one("layoutComplete",function(){$(".bookstore .loader").hide(),$(".bookstore .masonry").removeClass("hide-offset")}),$(".bookstore .masonry").masonry("layout")}function bookstoreImageLoaded(){bookstoreLoadedImages++,bookstoreLoadedImages==bookstoreTotalImages&&setBookstoreGridTilesHeight()}function loadBookstoreImages(){$(".bookstore img").each(function(){var e=$(this);e.data("catalog");!e.attr("src")&&e.data("catalog")&&$.ajax({url:"/bookstore/load-images",data:{catalog:e.data("catalog"),hard_isbn:e.data("hard-isbn"),soft_isbn:e.data("soft-isbn"),width:bookstoreWidth},method:"GET",success:function(t,a,i){if(t){var s=e.data("use-local-image"),o=t.img_s3_300||t.img_s3_original;s||(o=t.img_amazon||t.img_s3_300||t.img_s3_original),o?(e.show(),loadImage(e,o)):e.attr({src:"/images/no-preview.jpg","data-no-preview":!0})}}})})}function initBookteaseSlider(){var e=$(".citation .slider"),t=!1;$("#booktease-modal").on("show.bs.modal",function(e){$("#booktease-modal .modal-body").height(window.innerHeight-150)}),$("#booktease-modal").on("shown.bs.modal",function(a){t||(t=!0,e.show(),e.slick({slidesToShow:1,autoplay:!1,infinite:!0,lazyLoad:"progressive"}),$(".slick-slide").height($(".slick-slider").height()))})}function setSliderHomeHeight(){var e=$(".home .slider-wrap").height(),t=window.innerHeight-220;console.log(window.innerHeight<e),window.innerHeight<e&&($(".home .slider").height(t),$(".home .slider-wrap").height(t)),console.log((window.innerHeight-t)/2),$(".home .slider-wrap").css("margin-top",(window.innerHeight-e)/2-75)}function loadImages(){$(".content img").load(function(){var e=$(this);(e.data("src")||e.data("catalog"))&&(e.fadeIn("slow"),e.closest(".image-wrap").find(".image-loader-wrap").remove(),e.unwrap())}).error(function(){var e=$(this);e.data("toggle-image")?(e.hide(),$('[data-toggle-image="true"]').hide()):e.attr({src:"/images/no-preview.jpg","data-no-preview":!0})}).each(function(){var e=$(this);e.attr("src")||!e.data("src")&&!e.data("catalog")||(e.wrap('<div class="image-wrap"></div>'),e.closest(".image-wrap").append($('<div class="image-loader-wrap"><div class="loader"></div></div>'))),!e.attr("src")&&e.data("src")&&e.attr("src",e.data("src"))})}function loadImage(e,t){$(e).load(function(){$(this).fadeIn("slow"),$(this).closest(".image-wrap").find(".image-loader-wrap").fadeOut(),window.location.href.indexOf("loadall=1")>-1&&pageLoader()}).error(function(){$(this).attr({src:"/images/no-preview.jpg","data-no-preview":!0})}).each(function(){var e=$(this);e.attr("src")||e.attr("src",t||e.data("src"))})}function calculateCartTotals(){var e=$('.cart #shipping-options input[type="radio"]:checked'),t=parseFloat($(".cart #cart-subtotal").val()).toFixed(2)||0,a=parseFloat($(".cart #shipping-options #tax-value").val()).toFixed(2)||0,i=parseFloat(e.data("cost"))||0;parseFloat(a)>0?($(".cart #tax-total").html(a),$(".cart #tax-info").show()):($(".cart #tax-total").html(0),$(".cart #tax-info").hide());var s=parseFloat($("#shipping-photographs").val());s&&(i+=s),$("#shipping-info").show(),"CPU"==e.val()?($("#shipping-info #shipping-info-text").hide(),$("#shipping-info #customer-pickup-info").show(),i=0):($("#shipping-info #shipping-info-text").show(),$("#shipping-info #customer-pickup-info").hide());var o=parseFloat(parseFloat(t)+parseFloat(a)+i).toFixed(2);$(".cart #shipping-name").html(e.data("name")),$(".cart #shipping-cost").html(parseFloat(i).toFixed(2)),$(".cart #final-cost").html(o),$("#shipping-method").val(e.data("name")),$("#shipping-mom").val(e.val()),$("#shipping-price").val(i),$("#tax-price").val(a),$("#total-price").val(o)}function initializeCartButtons(){$(".cart table .quantity").change(function(){var e=$(this).val(),t=$(this).data("number");getCartContent(e,t)}),$(".cart table .add-to-wishlist").click(function(){var e=$(this).data("number");addToWishListFromCart(e)}),$(".cart table .remove-from-cart").click(function(){var e=0,t=$(this).data("number");getCartContent(e,t)})}function initializeWishListButtons(){$(".cart table .add-to-cart").click(function(){var e={};e.number=$(this).data("number"),e.catalog=$(this).data("catalog"),e.title2x=$(this).data("title2x"),e.wishlistid=$(this).data("wishlistid"),e[$(this).data("binding-name")]=$(this).data("binding-value"),e[$(this).data("saleprice-name")]=$(this).data("saleprice-value"),e[$(this).data("listprice-name")]=$(this).data("listprice-value"),e[$(this).data("recordid-name")]=$(this).data("recordid-value"),e[$(this).data("additional-handling-name")]=$(this).data("additional-handling-value"),e[$(this).data("ingram-name")]=$(this).data("ingram-value"),addToCartFromWishList(e)}),$(".cart table .remove-from-wishlist").click(function(){var e=$(this).data("number");removeFromWishList(e)}),$(".cart .make-public-private").click(function(){var e=$(this).data("type");switchWishListType(e)}),$(".cart .send-invitation").click(function(){sendInvitation()}),$(".cart #search-wish-list-btn").click(function(){findWishList()}),$(".cart #search-wish-list").keydown(function(e){13==e.keyCode&&(e.preventDefault(),findWishList())}),$(".cart #wish-list-select").change(function(){loadWishList()})}function initializeSpecialRequestButtons(){$(".cart .add-new-request-btn").click(function(){$('[name="request_id"]').val(""),$('[name="request_title"]').val(""),$('[name="request_title_cl"][value="2"]').prop("checked",!0),$('[name="request_subtitle"]').val(""),$('[name="request_subtitle_cl"][value="2"]').prop("checked",!0),$('[name="request_photographer"]').val(""),$('[name="request_photographer_cl"][value="2"]').prop("checked",!0),$('[name="request_author"]').val(""),$('[name="request_author_cl"][value="2"]').prop("checked",!0),$('[name="request_publisher"]').val(""),$('[name="request_publisher_cl"][value="2"]').prop("checked",!0),$('[name="request_pub_date"]').val(""),$('[name="request_pub_date_cl"][value="2"]').prop("checked",!0),$('[name="request_country"]').val("0"),$('[name="request_country_cl"][value="2"]').prop("checked",!0),$('[name="request_isbn"]').val(""),$('[name="request_isbn_cl"][value="2"]').prop("checked",!0),$('[name="request_oop"]').val("0"),$('[name="request_oop_cl"][value="2"]').prop("checked",!0),$('[name="request_first_edition_only"]').val(""),$('[name="request_signed_only"]').val(""),$('[name="request_binding"]').val("1"),$('[name="request_comments"]').val(""),$(".cart .add-new-request").is(":visible")||$(".cart .add-new-request").slideToggle()}),$(".cart .save-new-request").click(function(){var e={};e.request_id=$('[name="request_id"]').val(),e.request_title=$('[name="request_title"]').val(),e.request_title_cl=$('[name="request_title_cl"]:checked').val(),e.request_subtitle=$('[name="request_subtitle"]').val(),e.request_subtitle_cl=$('[name="request_subtitle_cl"]:checked').val(),e.request_photographer=$('[name="request_photographer"]').val(),e.request_photographer_cl=$('[name="request_photographer_cl"]:checked').val(),e.request_author=$('[name="request_author"]').val(),e.request_author_cl=$('[name="request_author_cl"]:checked').val(),e.request_publisher=$('[name="request_publisher"]').val(),e.request_publisher_cl=$('[name="request_publisher_cl"]:checked').val(),e.request_pub_date=$('[name="request_pub_date"]').val(),e.request_pub_date_cl=$('[name="request_pub_date_cl"]:checked').val(),e.request_country=$('[name="request_country"]').val(),e.request_country_cl=$('[name="request_country_cl"]:checked').val(),e.request_isbn=$('[name="request_isbn"]').val(),e.request_isbn_cl=$('[name="request_isbn_cl"]:checked').val(),e.request_oop=$('[name="request_oop"]').val(),e.request_oop_cl=$('[name="request_oop_cl"]:checked').val(),e.request_first_edition_only=$('[name="request_first_edition_only"]:checked').val(),e.request_signed_only=$('[name="request_signed_only"]:checked').val(),e.request_binding=$('[name="request_binding"]').val(),e.request_comments=$('[name="request_comments"]').val(),saveSpecialRequest(e)}),$(".cart .remove-from-requests").click(function(){var e=$(this).data("requestid");removeFromSpecialRequests(e)}),$(".cart .edit-request").click(function(){var e=$(this).data("requestid");editSpecialRequest(e)})}function sendInvitation(){if(!$("#invitation_email").val().trim()||!validate.email($("#invitation_email").val().trim()))return void $(".invitation-status").show().html("Valid e-mail address is required");if(!$("#invitation_subject").val().trim())return void $(".invitation-status").show().html("The subject is required");$(".cart .send-invitation").html('<i class="fa fa-spinner fa-spin"></i> &nbsp; Sending...').attr("disabled","disabled");var e=$(".invitation-intro").html();$("#invitation_message").val().trim()&&(e+="<br><br>---------------------------------------------------<br>Personal message:<br>---------------------------------------------------<br>"+$("#invitation_message").val().trim().replace(/\n/g,"<br>")),$.ajax({url:"/order/cart/send-invitation",data:{email:$("#invitation_email").val(),subject:$("#invitation_subject").val(),message:e},method:"POST",success:function(e,t,a){if($(".cart .send-invitation").html("Send Invitation").removeAttr("disabled"),e){if(e.not_authenticated)return;e.error?$(".invitation-status").show().html("Invitation is not sent please try again"):e.success&&$(".invitation-status").show().html("Invitation is successfully sent!")}},error:function(){$(".invitation-status").show().html("Invitation is not sent please try again"),$(".cart .send-invitation").html("Send Invitation").removeAttr("disabled")}})}function setShippingAccountNumber(){var e=$('.cart #shipping-options input[type="radio"]:checked').val();"PRI"==e||"BK"==e||"CPU"==e||"PMI"==e||"FCI"==e?$("#shipping-account").hide():$("#shipping-account").show()}function initializeShippingRadiobox(){$('.cart #shipping-options input[type="radio"]').change(function(){calculateCartTotals(),setShippingAccountNumber()}),setShippingAccountNumber()}function getCartContent(e,t){$(".cart #cart-content").append($('<div class="loader-wrap"><div class="loader"></div></div>')),$.ajax({url:"/order/cart/update-quantity",data:{quantity:e,number:t,confirm_order:confirm_order},method:"POST",success:function(e,t,a){e&&($(".cart #cart-content .loader-wrap").remove(),$(".cart #cart-content").html(e.cart),$(".cart #cart-totals").html(e.totals),confirm_order&&($(".cart #shipping-options").html(e.shipping),initializeShippingRadiobox()),loadImages(),loadCartImages(),initializeCartButtons(),getShippingRates())}})}function addToWishListFromCart(e){$(".cart #cart-content").append($('<div class="loader-wrap"><div class="loader"></div></div>')),$.ajax({url:"/order/cart/add-to-wishlist-from-cart",data:{number:e},method:"POST",success:function(e,t,a){if(e){if($(".cart #cart-content .loader-wrap").remove(),e.not_authenticated)return void(window.location="/account/login?fromwl=1");$(".cart #cart-content").html(e.cart),$(".cart #cart-totals").html(e.totals),$(".cart #wishlist-content").html(e.wishlist),$(".cart .tab-panel a[href=#wishlist]").tab("show"),loadImages(),loadCartImages(),initializeCartButtons(),initializeWishListButtons(),getShippingRates()}}})}function removeFromWishList(e){$(".cart #wishlist-content").append($('<div class="loader-wrap"><div class="loader"></div></div>')),$.ajax({url:"/order/cart/remove-wishlist",data:{number:e},method:"POST",success:function(e,t,a){if(e){if($(".cart #wishlist-content .loader-wrap").remove(),e.not_authenticated)return;$(".cart #wishlist-content").html(e.wishlist),loadImages(),loadCartImages(),initializeWishListButtons()}}})}function addToCartFromWishList(e){$(".cart #wishlist-content").append($('<div class="loader-wrap"><div class="loader"></div></div>')),$.ajax({url:"/order/cart/add-to-cart-from-wishlist",data:e,method:"POST",success:function(e,t,a){if(e){if($(".cart #wishlist-content .loader-wrap").remove(),e.not_authenticated)return;$(".cart #cart-content").html(e.cart),$(".cart #cart-totals").html(e.totals),$(".cart #wishlist-content").html(e.wishlist),$(".cart .tab-panel a[href=#order]").tab("show"),loadImages(),loadCartImages(),initializeCartButtons(),initializeWishListButtons(),getShippingRates()}}})}function switchWishListType(e){$(".cart #wishlist-content").append($('<div class="loader-wrap"><div class="loader"></div></div>')),$.ajax({url:"/order/cart/wishlist-type",data:{type:e},method:"POST",success:function(e,t,a){if(e){if($(".cart #wishlist-content .loader-wrap").remove(),e.not_authenticated)return;$(".cart #wishlist-content").html(e.wishlist),loadImages(),loadCartImages(),initializeWishListButtons()}}})}function findWishList(){var e=$("#search-wish-list").val();return e.trim()&&validate.email(e.trim())?($(".cart #wishlist-content").append($('<div class="loader-wrap"><div class="loader"></div></div>')),void $.ajax({url:"/order/cart/find-wishlist",data:{email:e},method:"POST",success:function(e,t,a){if(e){if($(".cart #wishlist-content .loader-wrap").remove(),e.not_authenticated)return;$(".cart #wishlist-content").html(e.wishlist),loadImages(),loadCartImages(),initializeWishListButtons()}}})):void $(".find-wish-list-error").show().html("Valid e-mail address is required.")}function loadWishList(){$(".cart #wishlist-content").append($('<div class="loader-wrap"><div class="loader"></div></div>')),$.ajax({url:"/order/cart/load-wishlist",data:{custnumber:$(".cart #wish-list-select").val()},method:"POST",success:function(e,t,a){if(e){if($(".cart #wishlist-content .loader-wrap").remove(),e.not_authenticated)return;$(".cart #wishlist-content").html(e.wishlist),loadImages(),loadCartImages(),initializeWishListButtons()}}})}function getShippingRates(){return confirm_order?void calculateCartTotals():($(".cart #shipping-options").html($('<div class="loader"></div>')),void $.ajax({url:"/order/shipping",data:{country_code:$(".cart #country-code").val(),zip:$(".cart #zip-code").val()},method:"GET",success:function(e,t,a){e&&($(".cart #shipping-options").html(e),"001"==$("#country-code").val()?$("#international-notice").removeClass("show"):$("#international-notice").addClass("show"),initializeShippingRadiobox(),calculateCartTotals())}}))}function saveSpecialRequest(e){return e.request_title.trim()?e.request_pub_date.trim()&&(e.request_pub_date.trim().length<4||parseInt(e.request_pub_date.trim())<0||parseInt(e.request_pub_date.trim())>9999)?void $(".cart .new-request-error").show().html("The publication date must be a four-digit year in the form <em>1999</em>."):($(".cart #requests-content").append($('<div class="loader-wrap"><div class="loader"></div></div>')),void $.ajax({url:"/order/cart/save-special-request",data:e,method:"POST",success:function(e,t,a){if(e){if($(".cart #requests-content .loader-wrap").remove(),e.not_authenticated)return;if(e.special_requests_status&&e.special_requests_status.already_in_requests)return void $(".cart .new-request-error").show().html("You already have a record with this title in your Special Request List.");$(".cart #requests-content").html(e.special_requests),initializeSpecialRequestButtons()}}})):void $(".cart .new-request-error").show().html("The title field is required.")}function removeFromSpecialRequests(e){$(".cart #requests-content").append($('<div class="loader-wrap"><div class="loader"></div></div>')),$.ajax({url:"/order/cart/remove-special-request",data:{requestid:e},method:"POST",success:function(e,t,a){if(e){if($(".cart #requests-content .loader-wrap").remove(),e.not_authenticated)return;$(".cart #requests-content").html(e.special_requests),initializeSpecialRequestButtons()}}})}function editSpecialRequest(e){$(".cart #requests-content").append($('<div class="loader-wrap"><div class="loader"></div></div>')),$.ajax({url:"/order/cart/get-special-request",data:{requestid:e},method:"POST",success:function(e,t,a){if(e){if($(".cart #requests-content .loader-wrap").remove(),e.not_authenticated)return;$(".cart #requests-content").html(e.special_requests),$(".cart .add-new-request").slideToggle(),initializeSpecialRequestButtons()}}})}function loadCartImages(){$(".cart img").load(function(){showSectionPageMasonryTiles()}).error(function(){showSectionPageMasonryTiles()}).each(function(){var e=$(this);e.data("catalog");!e.attr("src")&&e.data("catalog")&&$.ajax({url:"/bookstore/load-images",data:{catalog:e.data("catalog"),hard_isbn:e.data("hard-isbn"),soft_isbn:e.data("soft-isbn"),width:cartWidth},method:"GET",success:function(t,a,i){if(t){var s=e.data("use-local-image"),o=t.img_s3_300||t.img_s3_original;s||(o=t.img_amazon||t.img_s3_300||t.img_s3_original),o?(e.show(),loadImage(e,o)):e.attr({src:"/images/no-preview.jpg","data-no-preview":!0})}}})})}function pageLoader(){setTimeout(function(){$("#page-loader").fadeOut()},250)}function getShippingMethods(e){$.ajax({url:"/order/country-shipping",data:{foreign:"001"!=e},method:"GET",success:function(e,t,a){if(e){$("#country-shipping-methods").html(e.shipping);var i=$("#shipping-shipvia").val(),s=$("#shipping-tpshipacct").val();i?$("#payment-shipping-method").val(i):$("#payment-shipping-method").val(e.order.shipping.mom),$("#payment-shipping-number").val(s)}}})}function showPublisherMasonryTiles(){if(publisherLoaded++,publisherLoaded==publisherTotal){$(".publisher .next-results").hide();var e=$($(".publisher .hide-offset").html()).clone();$(".publisher .hide-offset").empty();var t=$(".publisher .books");e.each(function(e,a){if(a=$(a),a.text().trim())if("1"==a.data("nyp"))$(".publisher .regular-grid#forthcoming").length||t.append($('<h3>Forthcoming</h3><div class="regular-grid clearfix" id="forthcoming"></div>')),$(".publisher .regular-grid#forthcoming").append(a);else{var i=a.data("datepub");$(".publisher .regular-grid#"+i).length||t.append($("<h3>"+i+'</h3><div class="regular-grid clearfix" id="'+i+'"></div>')),$(".publisher .regular-grid#"+i).append(a)}}),publisherBatchMax>publisherBatchLoaded?(getPublisherNextResults(),publisherBatchLoaded+=publisherBatchSize):publisherBatchLoaded=0}}function getPublisherNextResults(){if(!publisherAllLoaded){var e=$(".publisher .next-results");e.is(":visible")||(e.show(),$.ajax({url:"/bookstore/publisher/results",data:{pub_title:$("#publisher-title").val(),skip:publisherSkip,take:publisherTake,width:publisherWidth},method:"GET",success:function(t,a,i){publisherSkip+=publisherTake,$(".hide-offset").append($(t)),$(".hide-offset .thumbs img").length||(publisherAllLoaded=!0),publisherTotal+=$(".hide-offset .thumbs img").length,$(".hide-offset img").load(function(){showPublisherMasonryTiles()}).error(function(){showPublisherMasonryTiles()}).each(function(){var e=$(this);e.data("catalog");!e.attr("src")&&e.data("catalog")&&$.ajax({url:"/bookstore/load-images",data:{catalog:e.data("catalog"),hard_isbn:e.data("hard-isbn"),soft_isbn:e.data("soft-isbn"),width:publisherWidth},method:"GET",success:function(t,a,i){if(t){var s=e.data("use-local-image"),o=t.img_s3_300||t.img_s3_original;s||(o=t.img_amazon||t.img_s3_300||t.img_s3_original),o?(e.show(),loadImage(e,o)):e.attr({src:"/images/no-preview.jpg","data-no-preview":!0}),t.booktease&&t.booktease.length&&(publisherMainImage||(publisherMainImage=t.booktease[0]),$(".top-info .hidden-image").load(function(){$(".top-info .main-image").css("background",'url("'+$(".top-info .hidden-image").attr("src")+'") center center no-repeat'),setTimeout(function(){$(".top-info .default-panel").fadeOut()},0)}).attr("src",publisherMainImage))}}})}),0===t.trim().length&&e.hide()},error:function(t,a,i){e.hide()}}))}}function showSearchMasonryTiles(e){if("undefined"==typeof searchLoaded[e]&&(searchLoaded[e]=0),searchLoaded[e]++,searchLoaded[e]==searchTotal[e]){$(e+" .next-results").hide();var t=$($(e+" .hide-offset").html()).clone();$(e+" .hide-offset").empty(),$(e+" .regular-grid").append(t),searchBatchMax>searchBatchLoaded?(getSearchNextResults(e),searchBatchLoaded+=searchBatchSize):searchBatchLoaded=0}}function getSearchNextResults(e){var t=$(e+" .next-results");t.is(":visible")||(t.show(),"undefined"==typeof searchSkip[e]&&(searchSkip[e]=0),$.ajax({url:"/bookstore/search/results",data:{query:$("#search-query").val(),start:searchSkip[e],rows:searchTake,width:searchWidth,tab:e.substring(1)},method:"GET",success:function(a,i,s){searchSkip[e]+=searchTake,$(e+" .hide-offset").append($(a)),"undefined"==typeof searchTotal[e]&&(searchTotal[e]=0),searchTotal[e]+=$(e+" .hide-offset .thumbs img").length,$(e+" .hide-offset img").load(function(){showSearchMasonryTiles(e)}).error(function(){showSearchMasonryTiles(e)}).each(function(){var e=$(this);e.data("catalog");!e.attr("src")&&e.data("catalog")&&$.ajax({url:"/bookstore/load-images",data:{catalog:e.data("catalog"),hard_isbn:e.data("hard-isbn"),soft_isbn:e.data("soft-isbn"),width:searchWidth},method:"GET",success:function(t,a,i){if(t){var s=e.data("use-local-image"),o=t.img_s3_300||t.img_s3_original;s||(o=t.img_amazon||t.img_s3_300||t.img_s3_original),o?(e.show(),loadImage(e,o)):e.attr({src:"/images/no-preview.jpg","data-no-preview":!0})}}})}),0===a.trim().length&&t.hide()},error:function(e,a,i){t.hide()}}))}function showSectionPageMasonryTiles(){if(sectionPageLoaded++,sectionPageLoaded==sectionPageTotal){$(".section-page .next-results").hide();var e=$($(".section-page .hide-offset").html()).clone();$(".section-page .hide-offset").empty(),$(".section-page .masonry").append(e).masonry("appended",e,!0),sectionBatchMax>sectionBatchLoaded?(getSectionPageNextResults(),sectionBatchLoaded+=sectionBatchSize):sectionBatchLoaded=0}}function loadSectionPageImage(e){var t=$(e);t.data("catalog");!t.attr("src")&&t.data("catalog")&&$.ajax({url:"/bookstore/load-images",data:{catalog:t.data("catalog"),hard_isbn:t.data("hard-isbn"),soft_isbn:t.data("soft-isbn"),width:sectionPageWidth},method:"GET",success:function(e,a,i){if(e){var s=t.data("use-local-image"),o=e.img_s3_300||e.img_s3_original;s||(o=e.img_amazon||e.img_s3_300||e.img_s3_original),o?(t.show(),loadImage(t,o)):t.attr({src:"/images/no-preview.jpg","data-no-preview":!0})}}})}function loadSectionPageImagesInRows(){var e=$($(".section-page .hide-offset").html()).clone();$(".section-page .hide-offset").empty(),$(".section-page .regular-grid").append(e),$(".section-page .regular-grid img").load(function(){showSectionPageMasonryTiles()}).error(function(){showSectionPageMasonryTiles()}).each(function(){loadSectionPageImage(this)})}function loadSectionPageImages(){$(".hide-offset img").load(function(){showSectionPageMasonryTiles()}).error(function(){showSectionPageMasonryTiles()}).each(function(){loadSectionPageImage(this)})}function getSectionPageNextResults(){var e=$(".section-page .next-results");e.is(":visible")||(e.show(),$.ajax({url:"/bookstore/"+$(".section-page #page-url").val()+"/results",data:{skip:sectionPageSkip,take:sectionPageTake,featured_book:$("#featured-book").val()},method:"GET",success:function(t,a,i){sectionPageSkip+=sectionPageTake,$(".hide-offset").append($(t)),$(".section-page .hide-offset img").hide(),sectionPageTotal+=$(".hide-offset .thumbs img").length,window.location.href.indexOf("new-arrivals2")>-1?loadSectionPageImagesInRows():loadSectionPageImages(),0===t.trim().length&&e.hide()},error:function(t,a,i){e.hide()}}))}function isScrolledIntoView(e,t){var a=e.getBoundingClientRect().top-(t||0),i=(e.getBoundingClientRect().bottom,a<=window.innerHeight);return i}var artistSkip=0,artistTake=10,artistLoaded=0,artistTotal=0,artistWidth=300,artistBatchSize=10,artistBatchMax=100,artistBatchLoaded=0,artistMainImage=null,artistAllLoaded=!1;$(window).scroll(function(){var e=$(".artist .results-end").get(0);e&&isScrolledIntoView(e,5*window.innerHeight)&&getArtistNextResults()}),$(".artist").length&&($(window).scroll(),$(".artist-info .read-more").click(function(){$(".desc-info p[data-read-more]").css("max-height","none"),$(this).hide()}));var $slider_bookstore=initBookstoreSlider(),$todays_slide=$(".slider-365-a-day .slider .slick-track > .slick-slide:not(.future)").length-1,$slide=$(".slider-365-a-day .slider .slick-track > .slick-slide")[$todays_slide];$slider_bookstore.slick("slickGoTo",$todays_slide,!0),$($slide).find(".box").addClass("box-current"),$(".slider-365-a-day .slider .slick-next").hide(),$(".slider-365-a-day .slider .slick-track > .slick-slide:not(.future) .box  > .disabled-overlay").click(function(e){e.preventDefault(),e.stopPropagation();$slider_bookstore.slick("slickCurrentSlide");$slide=$(this).closest(".slick-slide").get(0);var t=$(".slider-365-a-day .slider .slick-track .slick-slide").index($slide);$slider_bookstore.slick("slickGoTo",t)}),window.addEventListener("orientationchange",function(e){setTimeout(function(){reInitBookstoreSlider()},2e3),setTimeout(function(){reInitBookstoreSlider()},5e3)});var bookstoreWidth=300,bookstoreLoadedImages=0,bookstoreTotalImages=0;if($(".bookstore").length&&(bookstoreTotalImages=$(".bookstore .masonry .item img").length,$(".bookstore .masonry .item img").load(function(){bookstoreImageLoaded()}).error(function(){bookstoreImageLoaded()}),setTimeout(function(){setBookstoreGridTilesHeight()},5e3),$(window).resize(function(){setBookstoreGridTilesHeight()}),loadBookstoreImages(),$.ajax({url:"/bookstore/todays-bookshelf",method:"GET",success:function(e,t,a){if(e){e=$(e.replace(/\s+src/gi," data-src"));var i=[];if(e.each(function(e,t){if(t=$(t),t.hasClass("TodaysBS_Tip")){var a=$(this);i.push({catalog:a.attr("id").substring(0,5).trim(),title:a.find("h1 a").text().trim(),author:a.clone().find("h1").remove().end().text().trim()})}}),i.length)for(var s=0;s<i.length;s++){var o='<a href="/bookstore/citation/'+i[s].catalog+'"><img data-catalog="'+i[s].catalog+'" data-hard-isbn="" data-soft-isbn="" data-use-local-image="" data-toggle="tooltip" data-placement="top" title="<h6>'+i[s].title+"</h6>"+i[s].author+'" alt="'+i[s].author+" - "+i[s].title+'" /></a>';$(".bookshelf-list").append($(o))}$('[data-toggle="tooltip"]').tooltip({html:!0}),loadImages(),loadBookstoreImages()}}})),$("a#how-we-choose").click(function(){$("p.how-we-choose").toggle()}),$(".citation").length){var has_selected=!1;$('.order-form input[type="radio"]').each(function(e,t){$(t).is(":checked")&&(has_selected=!0)}),has_selected||$($('.order-form input[type="radio"]')[0]).prop("checked",!0),$.ajax({url:"/bookstore/load-images",data:{catalog:$("#citation-catalog").val(),hard_isbn:$("#citation-hard-isbn").val(),soft_isbn:$("#citation-soft-isbn").val(),width:null},method:"GET",success:function(e,t,a){if(e){var i=$("#citation-use-local-image").val(),s=e.img_s3_original;if("false"==i&&(s=e.img_amazon||e.img_s3_original),s?($(".pub-image").show(),loadImage($(".pub-image img"),s)):($(".citation .left-side").hide(),$(".citation .right-side").css("width","100%")),e.email_image){if($(".book-tease").show(),loadImage($(".book-tease img"),e.email_image),e.booktease&&e.booktease.length){for(var o="",r=0;r<e.booktease.length;r++)o+='<div><div class="box clearfix"><img data-lazy="'+e.booktease[r]+'" /></div></div>';$("#booktease-modal .slider").append($(o)),initBookteaseSlider()}}else $('[data-target="#booktease-modal"]').removeAttr("data-target")}}})}if($(".credit-card").length){var card_type=$(".credit-card #card-type").val();card_type&&$(".credit-card #"+card_type).addClass("detected"),$("#payment-card-number").keyup(function(e){switch($(".credit-card label").removeClass("detected"),parseInt($(this).val()[0])){case 3:$(".credit-card #AX").addClass("detected");break;case 4:$(".credit-card #VI").addClass("detected");break;case 5:$(".credit-card #MC").addClass("detected");break;case 6:$(".credit-card #DS").addClass("detected")}})}if($(".home").length){window.addEventListener("orientationchange",function(e){setTimeout(function(){setSliderHomeHeight()},2e3),setTimeout(function(){setSliderHomeHeight()},5e3)}),$(window).resize(function(){setSliderHomeHeight()}),setSliderHomeHeight();var $slider_home=$(".home .slider").slick({slidesToShow:1,autoplay:!0,autoplaySpeed:5e3,pauseOnHover:!1,dots:!0,infinite:!0,speed:1e3,fade:!0,cssEase:"linear"});$(".slider.slick-initialized .slick-dots").before($(".slider-navigation")),
$(".slick-dots button").click(function(){$slider_home.slick("slickPause"),$slider_home.slick("slickPause")}),$slider_home.on("afterChange",function(e,t,a){var i=$(".home .slider-navigation a");i.removeClass("bold");var s=parseInt($(".slick-dots .slick-active button").text());$(i[s-1]).addClass("bold")}),$(".home .box .desc-info .info-link").click(function(e){e.preventDefault(),$(this).closest(".box").find(".overlay").toggle()});var repeat=setInterval(function(){setSliderHomeHeight()},10);setTimeout(function(){clearInterval(repeat)},5e3)}loadImages();var $grid=$(".masonry").masonry({itemSelector:".item",columnWidth:".grid-sizer",isInitLayout:!1});$grid.on("layoutComplete",function(){}),setTimeout(function(){$grid.masonry("layout")},500);var confirm_order=$(".confirm-order").length;$(".cart .btn.order-bottom").click(function(e){$("#international-checkbox").is(":checked")||"001"==$("#country-code").val()||(e.preventDefault(),$("#international-notice").addClass("orange"),alert("Please accept the international shipping policies by checking the box."))});var cartWidth=300;if($(".cart").length&&(loadCartImages(),$(".cart #get-rates").click(function(){getShippingRates()}),initializeCartButtons(),initializeWishListButtons(),initializeSpecialRequestButtons(),initializeShippingRadiobox(),getShippingRates()),-1==window.location.href.indexOf("loadall=1")&&pageLoader(),$(".payment").length){$("#input-billing-country").change(function(){$('.same-as-billing input[type="checkbox"]').is(":checked")&&getShippingMethods($(this).val())}),$("#input-shipping-country").change(function(){getShippingMethods($(this).val())}),$('.same-as-billing input[type="checkbox"]').change(function(){$("#shipping-info").find("input[id^=input-shipping], select");$(this).is(":checked")?($("#shipping-info .row").hide(),getShippingMethods($("#input-billing-country").val())):($("#shipping-info .row").show(),getShippingMethods($("#input-shipping-country").val()))}),$('.same-as-billing input[type="checkbox"]').change();var shipping_country=$("#shipping-country").val();shipping_country&&getShippingMethods(shipping_country)}var popUp=function(e,t,a,i,s,o){var r=(screen.width-a)/2-5,n=(screen.height-i)/2-40;screen.width<a&&(a=screen.width-20,s="yes"),screen.height<i&&(i=screen.height-60,s="yes");var l="height="+i+",width="+a+",top="+n+",left="+r+", resizable=no,menu="+o+", scrollbars="+s,c=window.open(e,t,l);c.focus()},publisherSkip=0,publisherTake=10,publisherLoaded=0,publisherTotal=0,publisherWidth=300,publisherBatchSize=10,publisherBatchMax=100,publisherBatchLoaded=0,publisherMainImage=null,publisherAllLoaded=!1;$(window).scroll(function(){var e=$(".publisher .results-end").get(0);e&&isScrolledIntoView(e,5*window.innerHeight)&&getPublisherNextResults()}),$(".publisher").length&&($(window).scroll(),$(".publisher-info .read-more").click(function(){$(".desc-info p[data-read-more]").css("max-height","none"),$(this).hide()}));var searchSkip={},searchTake=10,searchLoaded={},searchTotal={},searchWidth=300,searchBatchSize=10,searchBatchMax=100,searchBatchLoaded=0,search_active_tab="#artworks";$('.search .tab-panel a[data-toggle="tab"]').on("shown.bs.tab",function(e){search_active_tab=$(e.target).attr("href"),0===$(search_active_tab+" .regular-grid .item").length&&getSearchNextResults(search_active_tab)}),$('a[href="'+search_active_tab+'"]').tab("show"),$(".filter-dropdowns .dropdown-menu a").click(function(){var e=$(this).text(),t=$(this).data("value");console.log(t),$(this).closest(".dropdown").find("> a .selected").html(e)}),$(window).scroll(function(){var e=$(search_active_tab+" .results-end").get(0);e&&isScrolledIntoView(e,5*window.innerHeight)&&getSearchNextResults(search_active_tab)});var sectionPageSkip=0,sectionPageTake=10,sectionPageLoaded=0,sectionPageTotal=0,sectionPageWidth=300,sectionBatchSize=10,sectionBatchMax=100,sectionBatchLoaded=0;$(window).scroll(function(){var e=$(".section-page .results-end").get(0);e&&isScrolledIntoView(e,5*window.innerHeight)&&getSectionPageNextResults()}),$(".section-page").length&&(loadSectionPageImage($(".featured-book .thumb img")),$(window).scroll());var url=window.location.toString();if(url.match("#"))try{$(".nav-tabs a[href=#"+url.split("#")[1]+"]").tab("show"),setTimeout(function(){window.scrollTo(0,0)},0)}catch(err){}$(".nav-tabs a").on("shown.bs.tab",function(e){history.pushState?history.pushState(null,null,location.origin+location.pathname+e.target.hash):location.hash=e.target.hash}),$("header .navbar ul.nav li.dropdown").hover(function(){$(this).addClass("open fade-in")},function(){$(this).removeClass("open fade-in")});var $menu_items=$("header .navbar ul.nav li");$menu_items.click(function(){window.location=$(this).find("> a").attr("href")});try{$($menu_items).siblings().removeClass("selected");var l=window.location.toString(),item=l.substring(l.lastIndexOf("/")+1,l.lastIndexOf("."));$menu_items.find('a[href^="'+item+'"]').parent().addClass("selected")}catch(err){}$("#mobile-search-btn").click(function(){$(this).find("i.fa").toggleClass("fa-close"),$("#mobile-search").toggleClass("search-open")});var validate={email:function(e){return/(?:[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(e)}};
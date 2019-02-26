var productLists, productStockCount, productSuggestions;
var pc, pd, ppad;

const API_URL = 'https://us-central1-retail-future.cloudfunctions.net/api/';

function loadProductDetail(productId) {

  $("#data_00, #data_2, #data_3, #data_4, #data_5_0, #data_5, #data_6, #data_7, #data_8, #data_9, #data_10, #data_11, #data_12").html('');

  var productIdval = productId;
  var global_product_images = [];
  var product_imgs = [];
  var productflavourstatus;
  console.log(productId);

  // get product stock data
  /* $.getJSON('product_data/product_stock.json', function (data1) {
    productStockCount = data1;
    var data_4 = "<p class='product_stock_div'> <span class='product_stock_count'>" + data1.quantity + "</span> <span class='product_stock_status'>In stock</span></p>"
    $(data_4).appendTo("#data_4");

  }); */

  // get product stock data from Firebase API
  $.getJSON(API_URL + 'product/' + productId + '/productstock/', function (data1) {
    console.log("data coming from firebase api for product stock is for product id", productId, data1);
    productStockCount = data1;
    window.sessionStorage.setItem('stock_' + productId, data1.quantity);
    var data_4 = "<p class='product_stock_div'> <span class='product_stock_count'>" + data1.quantity + "</span> <span class='product_stock_status'>In stock</span></p>"
    $(data_4).appendTo("#data_4");
  });

  // get product suggestions data
  $.getJSON('product_data/product-suggestions.json', function (data2) {
    productSuggestions = data2;
    $.each(data2.suggestions, function (i, productYouMayLike) {
      var data_12 = "<div class='col-lg-12 col-md-12 col-sm-12 col-sm-12 display_flex wow fadeInUp' data-wow-duration='1.8s' data-wow-offset='10'> <div class='you_may_like_div'> <img class='img-responsive' src='assets/images/product" + productIdval + "/" + productYouMayLike.images + "' alt=''/> </div><div class='you_may_like_detail_div'> <p class='may_like_product_name'>" + productYouMayLike.name + "</p><p class='may_like_product_price'>" + productYouMayLike.price + "</p></div></div>"
      $(data_12).appendTo("#data_12");

    });
  });

  // get product detail data
  $.getJSON('product_data/product.json', function (data) {

    productLists = data;
    var product_index = data[productIdval - 1];

    // product image slider
    $.each(product_index.imageUrl, function (i, imageUrl) {
      product_imgs[i] = imageUrl;
    });
    global_product_images.push(product_imgs);
    var data_00 = "<img id='product_zoom' src='assets/images/product" + productIdval + "/medium/" + global_product_images[0][0] + "' data-zoom-image='assets/images/product" + productIdval + "/large/" + global_product_images[0][0] + "'/><div id='product_gallery'><a class='list_img_' href='#' data-image='assets/images/product" + productIdval + "/medium/" + global_product_images[0][0] + "' data-zoom-image='assets/images/product" + productIdval + "/large/" + global_product_images[0][0] + "'> <img id='product_zoom' src='assets/images/product" + productIdval + "/small/" + global_product_images[0][0] + "'/> </a> <a href='#' data-image='assets/images/product" + productIdval + "/medium/" + global_product_images[0][1] + "' data-zoom-image='assets/images/product" + productIdval + "/large/" + global_product_images[0][1] + "'> <img id='product_zoom' src='assets/images/product" + productIdval + "/small/" + global_product_images[0][1] + "'/> </a> <a href='#' data-image='assets/images/product" + productIdval + "/medium/" + global_product_images[0][2] + "' data-zoom-image='assets/images/product" + productIdval + "/large/" + global_product_images[0][2] + "'> <img id='product_zoom' src='assets/images/product" + productIdval + "/small/" + global_product_images[0][2] + "'/> </a></div><div class='productflavour'><img src='assets/images/" + product_index.productflavour + ".png' /></div>"
    $(data_00).appendTo("#data_00");

    // product name
    var data_2 = "<p class='product_name'>" + product_index.name + "</p><p class='product_name_sub'>" + product_index.title + "</p><p class='product_rating'> <img class='img-responsive' src='assets/images/" + product_index.productRatingImg + "' alt='rating'/> <span class='product_review'>" + product_index.productReviewCount + " Reviews</span> </p>"
    $(data_2).appendTo("#data_2");

    // product price and discount price
    pc = product_index.cost;
    pd = product_index.productPromotionPercentage;
    ppad = (parseFloat(pc) - (parseFloat(pc) * parseFloat(pd) / 100)).toFixed(2);

    var data_3 = "<p class='product_price_div'> <span class='product_price'>$" + ppad + "</span> <span class='product_price_diff'> | </span> <span class='product_weight'>" + product_index.productWeight + "</span></p><p class='offer_price main_product'><span class='cancel_price'>$" + product_index.cost + "</span> " + product_index.productPromotionPercentage + "% Off</p><p class='product_best_before_div'> <span class='product_best_before_text'>Best Before: </span> <span class='product_best_before_date'>" + product_index.productBestBefore + "</span></p><p class='product_manufacture_div'> <span class='product_manufacture_text'>Manufactured: </span> <span class='product_manufacture_date'>" + product_index.productManufactureDate + "</span></p>"
    $(data_3).appendTo("#data_3");

    // product dimension
    var data_5_0 = "<p class='product_dimension'>" + product_index.productDimension + "</p>"
    $(data_5_0).appendTo("#data_5_0");

    // globe video
    if (product_index.productLocationCity == "Aurora" && product_index.productLocationCounty == "USA") {
      var globevid = "globe_usa.mp4";
      var globevidpopup = "globe_usa_p1.mp4";
    }
    else if (product_index.productLocationCity == "Florida" && product_index.productLocationCounty == "USA") {
      var globevid = "globe_usa.mp4";
      var globevidpopup = "globe_usa_p3.mp4";
    }
    else {
      var globevid = "globe_ind.mp4";
      var globevidpopup = "globe_ind_p2.mp4";
    }
    var data_globe = "<source src='assets/videos/" + globevid + "' width='100%' height='100%' type='video/mp4'>"
    $(data_globe).appendTo("#video-map");

    // globe popup video
    var data_globe_popup = "<source src='assets/videos/" + globevidpopup + "' width='100%' height='100%' type='video/mp4'>"
    $(data_globe_popup).appendTo("#video");

    // product summary
    var data_5 = "<p class='product_summary_div'> <span class='product_summary_title'>Description: </span> <span class='product_summary'>" + product_index.description + "</span></p>"
    $(data_5).appendTo("#data_5");

    // product nutrients
    $.each(product_index.productNutrients, function (i, productNutrients) {

      var data_6 = "<p class='product_nutrients inline-flex wow fadeInUp' data-wow-duration='1.8s' data-wow-offset='100'><span class='product_nutrients_name'>" + productNutrients.value + productNutrients.unit + " " + productNutrients.name + " </span><span class='product_nutrients_percentage'>" + productNutrients.percentage + "</span></p>"
      $(data_6).appendTo("#data_6");

    });
    if (productIdval == 2) {
      $(".flex_end1, #data_6").hide();
    }
    else if (productIdval == 3) {
      $("#data_6 .product_nutrients_name").css('padding-right', '50px');
      $(".inline-flex .product_nutrients_percentage").addClass("line_small");
    }
    else {

    }

    // product productDailyValueFeatures1
    $.each(product_index.productDailyValueFeatures1, function (i, productDailyValueFeatures1) {

      var data_7 = "<p class='product_nutrients1 wow fadeInUp' data-wow-duration='1.8s' data-wow-offset='0'><span class='product_nutrients1_quantity'>" + productDailyValueFeatures1.value + "<span class='product_nutrients1_unit'>" + productDailyValueFeatures1.unit + "</span></span><span class='product_nutrients1_name'>" + productDailyValueFeatures1.name + "</span></p>"
      $(data_7).appendTo("#data_7");

      if (productDailyValueFeatures1.name == "") {
        $(".product_nutrients1_div").hide();
        $('.product_nutrients2_div').css('width', '100%');
        $('.product_nutrients2').addClass("no_icon");
        $('.product_nutrients2.no_icon').css('margin-top', '0px');
        $('.product_nutrients2_div').css('padding-left', '0px');
        $('.product_nutrients2_name').css('width', '70%');
      }
      else {
      }

    });

    // product productDailyValueFeatures2
    $.each(product_index.productDailyValueFeatures2, function (i, productDailyValueFeatures2) {
      var data_8 = "<p class='product_nutrients2 wow fadeInUp' data-wow-duration='1.8s' data-wow-offset='40'><span class=''><img class='img-responsive' src='assets/images/product" + productIdval + "/" + productDailyValueFeatures2.images + "' alt='icons'/></span><span class='product_nutrients2_name'>" + productDailyValueFeatures2.name + "</span></p>"
      $(data_8).appendTo("#data_8");

    });

    // product productDailyValueFeatures3
    $.each(product_index.productDailyValueFeatures3, function (i, productDailyValueFeatures3) {
      //TODO check for null/undefined/empty values everywhere
      var data_9 = "<p class='product_nutrients3 wow fadeInUp' data-wow-duration='1.8s' data-wow-offset='0'><span><img class='img-responsive' src='assets/images/product" + productIdval + "/" + productDailyValueFeatures3.images + "' alt='icons'/></span><span class='product_nutrients3_name'>" + productDailyValueFeatures3.name + "</span></p>"
      $(data_9).appendTo("#data_9");

      if (productDailyValueFeatures3.name == "") {
        //$(".productDailyValueFeatures3").css('opacity', '0');
      }
      else {
      }
      if (productDailyValueFeatures3.images == "") {
        $(".product_nutrients3 img").css('opacity', '0');
      }
      else {
      }

    });

    // product productDailyValueFeatures4
    $.each(product_index.productDailyValueFeatures4, function (i, productDailyValueFeatures4) {

      var data_10 = "<p class='product_nutrients4 wow fadeInUp' data-wow-duration='1.8s' data-wow-offset='40'><span class=''><img class='' src='assets/images/product" + productIdval + "/" + productDailyValueFeatures4.images + "' alt='icons'/></span><span class='product_nutrients4_name'>" + productDailyValueFeatures4.name + "</span></p>"
      $(data_10).appendTo("#data_10");

      if (productIdval == 3) {
        $(".product_nutrients4").css('width', '100%');
      }
      else {

      }

    });

    // product how_to_use
    $.each(product_index.productHowToUse, function (i, productHowToUse) {

      var data_11 = "<div class='how_to_use_div'><img class='img-responsive' src='assets/images/product" + productIdval + "/" + productHowToUse.images + "' alt=''/> <p class='how_to_use_content'>" + productHowToUse.content + "</p></div>"
      $(data_11).appendTo("#data_11");

    });

    loadProductImgSlider();
    loadHowToUse();

    var data_popup_0 = "<img src='assets/images/product" + productIdval + "/medium/" + global_product_images[0][0] + "' class='img-responsive'><div class='productflavour'><img src='assets/images/" + product_index.productflavour + ".png' /></div>"
    $(data_popup_0).appendTo("#data_popup_0");
    if (product_index.productflavour == "") {
      $(".productflavour").hide();
    }
    else {
      $(".productflavour").show();
    }

    var data_popup_1 = "<p class='product_name'>" + product_index.name + "</p><p class='product_name_sub'>" + product_index.title + "</p><p class='product_rating'><img class='img-responsive' src='assets/images/" + product_index.productRatingImg + "' alt='rating'/><span class='product_review'>" + product_index.productReviewCount + " Reviews</span></p><p class='product_price_div'><span class='product_price'>$" + ppad + "</span><span class='product_price_diff'> | </span><span class='product_weight'>" + product_index.productWeight + "</span></p>"

  });
};


function loadProductImgSlider() {

  //initiate the plugin and pass the id of the div containing gallery images
  $("#product_zoom").elevateZoom({
    gallery: 'product_gallery',
    cursor: 'pointer',
    galleryActiveClass: 'active',
    imageCrossfade: true,
    loadingIcon: ''
  });

  //pass the images to Fancybox
  $("#product_zoom").bind("click", function (e) {
    var ez = $('#product_zoom').data('elevateZoom');
    $.fancybox(ez.getGalleryList());
    return false;
  });

  var currentSlide = 1;
  setInterval(function () {
    $("#product_gallery a:nth-child(" + currentSlide + ") #product_zoom").click();
    if (currentSlide < 3) {
      currentSlide++;
    } else {
      currentSlide = 1;
    }
  }, 5000);

}

function loadHowToUse() {
  $('.data_11').slick({
    dots: true,
    speed: 4000,
    slidesToShow: 1,
    centerMode: true,
    autoplay: true
  });
}

// load cart data
function loadCartScreen() {

  $.getJSON(API_URL + 'sales/', function (cartData) {
    $('#checkout_count').html('');
    if (cartData.products.length > 0) {
      $('#checkout_count').html("Checkout (" + cartData.products.cartDetails.length + ")");
      $('.check_out_btn').show();
    }
    else {
      $('.check_out_btn').hide();
    }

    $('#cart_productLists').html('');
    var amount = 0;
    $.each(cartData.products.cartDetails, function (i, getCartData) {

      var productIdcheck = getCartData.productId - 1;
      //calculating actual cart amount
      amount += (productLists[productIdcheck].cost) * (getCartData.quantity);
      var stock = window.sessionStorage.getItem('stock_' + getCartData.productId);
      console.log("stockk", stock);
      var productStock;
      if (stock != null) {
        productStock = stock;
      }
      else {
        productStock = productLists[productIdcheck].productstock;
      }

      var cart_productLists = "<li><div class='cart_product_img'> <img src='assets/images/product" + getCartData.productId + "/medium/1.png' class='img-responsive'> </div><div class='cart_product_content'> <div class='titles_stock_content'> <h4 class='cart_product_title'> " + productLists[productIdcheck].name + " </h4> <p class='cart_dec'> " + productLists[productIdcheck].title + " <span class='btn_stock'>" + /* productLists[productIdcheck].productstock */productStock + " IN STOCK</span> </p></div><div class='quantity_and_price'> <div class='quantity_drop'> <label>Quantity :</label> <select class='form-control' id='sel1'> <option value='1'>1</option> <option value='2'>2</option> <option value='3'>3</option> <option value='4'>4</option> </select> </div><div class='cart_price'> <p class='product_price_div'> <span class='product_price'>$" + productLists[productIdcheck].cost /* getCartData.price */ + "</span> <span class='product_price_diff'></span> <span class='product_weight'>" + productLists[productIdcheck].productWeight + "</span></p><p class='offer_price'><span class='cancel_price'>$" + productLists[productIdcheck].cost + "</span> " + productLists[productIdcheck].productPromotionPercentage + "% Off</p></div></div></div><div class='close_icon'> <img src='assets/images/close-icon.png' class='img-responsive'> </div></li>"
      $(cart_productLists).appendTo("#cart_productLists");

      var index = getCartData.quantity - 1;
      $("select>option:eq(" + index + ")").attr('selected', true);
    });
    var cart_productListsTotal = "<p class='total_text'>Subtotal (" + cartData.products.cartDetails.length + " items): <span class='total_price'>$" + amount.toFixed(2) + "</span></p>"
    $(cart_productListsTotal).appendTo("#cart_productListTotal");
  });
};


// complete checkout click show success msg
$("#complete_purchase").click(function () {
  $("#checkout_div").hide();
  $("#clickSuccess").show();
});

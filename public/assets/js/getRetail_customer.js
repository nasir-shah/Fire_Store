const API_URL = 'https://us-central1-retail-future.cloudfunctions.net/api/';
var meter_percentage;
var sentimentLabel = [];
var sentimentValues = [];
var footfallPeakHourLabel = [];
var footfallPeakHourValues = [];

function loadRetailCustomer() {

  $("#footfall_data0, #sale_target_meter, #productCategory_data, #catproductListing_data, .cat_0 .productlisting_data1, #promotion_data, #complains_data, #customerBehavior_data, #specialOffers_data, #footfall_data1, #age_range_data").html('');

  $.getJSON('product_data/store_customer.json', function (customer_data) {

    // SALES TARGET graph data
    $.each(customer_data[0].salesTarget, function (i, salesTarget_data) {

      var currentSales;
      meter_percentage = (salesTarget_data.current / salesTarget_data.max) * 100;
      var salesTarget_data_display = "<p class='progress_text_color'>" + salesTarget_data.day + "</p><p id='current_sales' class='value_text_span'>$" + salesTarget_data.current + "</p><p id='meter_percent' class='value_text_span' style='display:none'><span>" + meter_percentage + "</span>%</p><p class='progress_text_white'>" + salesTarget_data.status + "</p>"
      $(salesTarget_data_display).appendTo("#sale_target_meter");
    });

    // SALES TARGET category data
    $.each(customer_data[0].productCategory, function (i, productCategory_data) {

      if (i == 0) {
        var productCategory_data_display = "<li class='active'> <a href='#cat_" + i + "' data-toggle='pill'> <div class='inner_inline_style'> <div class='left_side_img'> <img src='assets/images/retail/" + productCategory_data.catImg + "' class='img-responsive' alt='health'> </div><div class='right_side_content'> <h5 class='nav_inner_title'>" + productCategory_data.catName + "</h5> <p class='nav_inner_price'>$" + productCategory_data.amount + "</p></div></div></a> </li>"

        var productCategory_data_display1 = "<div class='tab-pane active cat_" + i + "' id='#cat_" + i + "'><div class='overflow_scroll productlisting_data1' id=''></div></div>"

      }
      else {
        var productCategory_data_display = "<li class=''> <a href='#cat_" + i + "' data-toggle='pill'> <div class='inner_inline_style'> <div class='left_side_img'> <img src='assets/images/retail/" + productCategory_data.catImg + "' class='img-responsive' alt='health'> </div><div class='right_side_content'> <h5 class='nav_inner_title'>" + productCategory_data.catName + "</h5> <p class='nav_inner_price'>$" + productCategory_data.amount + "</p></div></div></a> </li>"

        var productCategory_data_display1 = "<div class='tab-pane cat_" + i + "' id='#cat_" + i + "'><div class='overflow_scroll productlisting_data1' id=''></div></div>"
      }
      $(productCategory_data_display).appendTo("#productCategory_data");
      $(productCategory_data_display1).appendTo("#catproductListing_data");

    });

    // SALES TARGET product data
    $.each(customer_data, function (i, customer_data1) {
      $.each(customer_data1.productCategory, function (j, customer_data2) {
        $.each(customer_data2.catSellingProduct, function (k, customer_data3) {

          var total_cost = customer_data3.soldCount * customer_data3.pricePerProduct;
          var customer_data_display = "<div class='product_inline'> <div class='inner_inline_style'> <div class='left_side_img'><img src='assets/images/retail/" + customer_data3.productImg + "' class='img-responsive' alt='health'> </div><div class='right_side_content'> <h5 class='nav_inner_title'>" + customer_data3.sellingStatus + "</h5> <p class='nav_inner_sold'>" + customer_data3.productName + " (" + customer_data3.soldCount + " Sold)</p><p class='nav_inner_price'>$" + total_cost + "</p></div></div></div>"
          $(".cat_" + j).find('.productlisting_data1').append(customer_data_display);

        });
      });
    });

    // PROMOTION  data
    $.each(customer_data[0].promotions, function (i, promotions_data) {

      var promotion_data_display = "<div class='first_slide slides_div'> <div class='innner_flex_inline inline_flex'> <div class='ease_calcd inline_flex'> <div class='aside_icon'> <img src='assets/images/retail/" + promotions_data.icon_image + "' class='img-responsive'> </div><div class='aside_content'> <h4 class='promotion_ease_title'>" + promotions_data.name + "</h4> </div></div><div class='start_date_end_date inline_flex'> <div class='start_date'> <p class='para_text_color'>Start Date: </p><p class='para_text_normal'>" + promotions_data.startDate + "</p></div><div class='end_date'> <p class='para_text_color'>End Date: </p><p class='para_text_normal'>" + promotions_data.endDate + "</p></div></div></div></div><div class='sec_slide slides_div'> <ul class='inline_flex justify_beetween'> <li> <div class='buyers_content'> <h4 class='count_buyers'>" + promotions_data.salesTarget + "</h4> <p class='buyers_text'>Sales targets</p></div></li><li> <div class='buyers_content'> <h4 class='count_buyers'>" + promotions_data.footfallTarget + "</h4> <p class='buyers_text'>Footfall Target</p></div></li><li> <div class='buyers_content'> <h4 class='count_buyers'>" + promotions_data.groupTarget + "</h4> <p class='buyers_text'>Target Group</p></div></li></ul> </div>"
      $(promotion_data_display).appendTo("#promotion_data");

    });
    $('.slide_calandr').slick({
      dots: false,
      infinite: true,
      autoplay: true,
      autoplaySpeed: 4000,
      speed: 1000,
      slidesToShow: 1,
      adaptiveHeight: false
    });
    // $('.slide_calandr .slick-slide').length;
    // var calwidth = $('.slide_calandr .slick-slide').length * 100;
    // console.log(calwidth);
    // $('.slide_calandr.slick-slider .slick-track').css('width', calwidth);

    // COMPLAINTS  data
    $.each(customer_data[0].complains, function (i, complains_data) {

      var complains_data_display = "<li><p class='para_text_color'>" + complains_data.name + ".</p></li>"
      $(complains_data_display).appendTo("#complains_data");

    });

    // CUSTOMER BEHAVIOR  data
    $.each(customer_data[0].customerBehavior, function (i, customerBehavior_data) {
      var customerBehavior_data_display = "<div class='buyers_div inline_flex justify_beetween'> <div class='buyers_content'> <h4 class='count_buyers'>" + customerBehavior_data.actualBuyer + "</h4> <p class='buyers_text'>actual buyers</p></div><div class='buyers_content'> <h4 class='count_buyers'>" + customerBehavior_data.nonBuyers + "</h4> <p class='buyers_text'>non buyers</p></div></div><div class='behavior_list'> <ul class='behvior_list'> <li> <p class='para_text_normal'>Purchase to Walk-in Ratio</p><p class='para_text_color'>" + customerBehavior_data.workingRatio + "</p></li><li> <p class='para_text_normal'>Avg. Sale Price Per Customer</p><p class='para_text_color' id='avgSalePerCustomer'>" + customerBehavior_data.avgSalesPurchase + "</p></li><li> <p class='para_text_normal'>Items per purchase</p><p class='para_text_color' id='itemPerPurchase'>" + customerBehavior_data.itemPerPurchase + "</p></li><li> <p class='para_text_normal'>Purchase to Walk-in Ratio</p><p class='para_text_color'>" + customerBehavior_data.walkInRatio + "</p></li></ul> </div>"
      $(customerBehavior_data_display).appendTo("#customerBehavior_data");

    });


    // SPECIAL OFFER  data
    $.each(customer_data[0].specialOffers, function (i, specialOffers_data) {

      var specialOffers_data_display = "<div class='product_items'> <div class='product_img'> <img src='assets/images/retail/" + specialOffers_data.icon_image + "' class='img-responsive'> </div><div class='product_content'> <p class='para_text_color'>" + specialOffers_data.name + "</p><p class='para_text_normal'>" + specialOffers_data.offerMsg + "</p></div></div>"
      $(specialOffers_data_display).appendTo("#specialOffers_data");

    });
    $('.offer_slider').slick({
      dots: true,
      infinite: true,
      autoplay: true,
      autoplaySpeed: 5000,
      speed: 1000,
      slidesToShow: 1,
      adaptiveHeight: false
    });

    // CUSTOMER SENTIMENT  data
    sentimentLabel = [];
    sentimentValues = [];
    $.each(customer_data[0].customerSentiments, function (i, customerSentiments_data) {
      sentimentLabel.push(customerSentiments_data.time);
      sentimentValues.push(customerSentiments_data.values);
    });

    // TODAY'S FOOTFALL  data
    $.each(customer_data[0].todaysFootfall, function (i, todaysFootfall_data) {
      $.getJSON(API_URL + 'storevisit/?calculate=footfall', function (footfallData) {
        var female = parseInt(footfallData.femaleCount);
        var male = parseInt(footfallData.maleCount);
        var others = parseInt(footfallData.other);
        var total = female + male + others;

        var footfall_data_display = "<h3 class='panel_title'>Today&apos;s FOOTFALL</h3> <p class='para_text_normal'> Week: <span class='para_text_color'>" + todaysFootfall_data.week + "</span> </p><p class='para_text_normal'> Month: <span class='para_text_color'>" + todaysFootfall_data.month + "</span> </p><p class='para_text_normal'> Year: <span class='para_text_color'>" + todaysFootfall_data.year + "</span> </p>"
        $(footfall_data_display).appendTo("#footfall_data0");

        var todaysFootfall_data_display = "<div class='total_footfall inline_flex'> <div class='footfall_number_one inline_flex'> <div class='buyers_content'> <h4 class='count_buyers'>" + /* todaysFootfall_data.totalFootfall */ total + "</h4> <p class='buyers_text'>Total Footfall</p></div><div class='buyers_content'> <h4 class='count_buyers'>" + todaysFootfall_data.recurringConsumers + "</h4> <p class='buyers_text'>Recurring Customers</p></div></div><div class='gender_counts inline_flex'> <div class='count_female'> <div class='inner_inline_style'> <div class='left_side_img'> <img src='assets/images/retail/footfall_female_icon.png' class='img-responsive' alt='health'> </div><div class='right_side_content'> <h5 class='count_buyers'>" + /* todaysFootfall_data.female */ female + "</h5> <p class='para_text_color'>Female</p></div></div></div><div class='count_male'> <div class='inner_inline_style'> <div class='left_side_img'> <img src='assets/images/retail/footfall_male_icon.png' class='img-responsive' alt='health'> </div><div class='right_side_content'> <h5 class='count_buyers'>" + /* todaysFootfall_data.male */ male + "</h5> <p class='para_text_color'>Male</p></div></div></div><div class='count_other'> <div class='inner_inline_style'> <div class='left_side_img'> <img src='assets/images/retail/footfall_other_icon.png' class='img-responsive' alt='health'> </div><div class='right_side_content'> <h5 class='count_buyers'>" + /* todaysFootfall_data.others */ others + "</h5> <p class='para_text_color'>Other</p></div></div></div></div></div>"
        $(todaysFootfall_data_display).appendTo("#footfall_data1");
      });
    });

    // TODAY'S FOOTFALL  age range data
    $.each(customer_data[0].todaysFootfallAgeRange, function (i, todaysFootfallAgeRange_data) {

      var todaysFootfallAgeRange_data_display = "<li><h4 class='count_number_title'>" + todaysFootfallAgeRange_data.values + "</h4><p class='para_text_normal'>" + todaysFootfallAgeRange_data.age + "</p></li>"
      $(todaysFootfallAgeRange_data_display).appendTo("#age_range_data");

    });
    $('.age_range_slide').slick({
      dots: false,
      infinite: true,
      autoplay: true,
      autoplaySpeed: 8000,
      speed: 1000,
      slidesToShow: 1,
      adaptiveHeight: false
    });

    // TODAY'S FOOTFALL peaktime graph
    footfallPeakHourLabel = [];
    footfallPeakHourValues = [];
    $.each(customer_data[0].todaysFootfallPeakHourData, function (i, todaysFootfallPeakHourData_data) {
      footfallPeakHourLabel.push(todaysFootfallPeakHourData_data.time);
      footfallPeakHourValues.push(todaysFootfallPeakHourData_data.values);
    });
    createGraphs();

  });

};

function loadAlertMsg() {
  $("#data_alert").html('');
  // get product stock data
  $.getJSON('product_data/store_alert.json', function (alert_data) {

    $.each(alert_data, function (i, alert_data1) {
      var data_alert = "<li class='sidebar_item inline_flex'><div class='alert_msg inline_flex'><div class='list_icon'><img src='assets/images/retail/" + alert_data1.status + ".png' class='img-responsive'></div><p class='para_text_normal'>" + alert_data1.name + "</p></div><p class='para_text_normal'>" + alert_data1.time + "</p></li>"
      $(data_alert).appendTo("#data_alert");
    });

  });
}

function getAverageSaleData() {
  //getSalesData from Firebase API for today sales so far value, avg sale price per customer and items per purchase metrics
  $.getJSON(API_URL + 'sales/today/averagesale', function (avgSaleData) {
    setAverageSaleData(avgSaleData);
  });
}

function setAverageSaleData(avgSaleData) {
  if (avgSaleData != null) {
    document.getElementById('avgSalePerCustomer').innerHTML = avgSaleData.averageSalePerCustomer;
    document.getElementById('itemPerPurchase').innerHTML = Math.round(avgSaleData.itemsPerPurchase);
    $.getJSON('product_data/store_customer.json', function (customer_data) {
      // SALES TARGET graph data
      $.each(customer_data[0].salesTarget, function (i, salesTarget_data) {
        var meter_percent = ((parseInt(salesTarget_data.current) + Math.round(avgSaleData.saleAmountToday)) / salesTarget_data.max) * 100;
        // console.log("meter percent",meter_percent);
        // console.log("sale",parseInt(salesTarget_data.current) + Math.round(avgSaleData.saleAmountToday));
        document.getElementById('current_sales').innerHTML = parseInt(salesTarget_data.current) + Math.round(avgSaleData.saleAmountToday);
        document.getElementById('meter_percent').innerHTML = meter_percent;
      });
    });
  }
}
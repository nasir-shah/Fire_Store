function loadRetailInventory() {

  $("#shelft_stock_data, #misplacement_data, #store_data, #warehouse_data, #issue_stack_data,  #top_selling_data, #recorders_data, #upcoming_event_data").html('');

  $.getJSON('product_data/store_inventory.json', function (inventory_data) {

    var inventory_data_list = inventory_data[0];
    // SHELF STOCK data
    $.getJSON('https://us-central1-retail-future.cloudfunctions.net/api/videoconfig', function (config) {
      var shelf_ip = config.shelf;
      $("#shelf_feed").attr("src", shelf_ip);
      var shelft_stock_data_display = "<img style='width:75%;transform:scaleX(1.35);transform-origin:left' class='img-responsive' src='" + shelf_ip + "'/>"
      $(shelft_stock_data_display).appendTo("#shelft_stock_data");
    });

    // MISPLACEMENT data
    $.each(inventory_data_list.misplaced, function (i, misplaced_data) {

      var misplacement_data_display = "<div class='misplace_products inline_flex'> <div class='product_side_img'> <img src='assets/images/retail/" + misplaced_data.productImg + "' class='img-responsive'> </div><div class='misplace_content'> <div class='inline_flex'> <div class='bottle_icon pr_10'> <img src='assets/images/retail/" + misplaced_data.status + ".png' class='img-responsive'> </div><p class='para_text_normal'>" + misplaced_data.productName + "</p></div><p class='para_text_normal'> <span class='para_text_color'>Current Location :</span> " + misplaced_data.currentLocation + " </p><p class='para_text_normal'> <span class='para_text_color'>Move To :</span> " + misplaced_data.moveTo + " </p></div></div>"
      $(misplacement_data_display).appendTo("#misplacement_data");

    });

    // STORE data
    $.each(inventory_data_list.store, function (i, store_data) {

      var store_data_display = "<li> <p class='para_text_normal'>" + store_data.name + "</p><p class='para_text_normal'> <span class='para_text_color'>" + store_data.count + "</span> " + store_data.containerType + "</p></li>"
      $(store_data_display).appendTo("#store_data");

    });

    // WAREHOUSE data
    $.each(inventory_data_list.warehouse, function (i, warehouse_data) {

      var warehouse_data_display = "<li> <p class='para_text_normal'>" + warehouse_data.name + "</p><p class='para_text_normal'> <span class='para_text_color'>" + warehouse_data.count + "</span> " + warehouse_data.containerType + "</p></li>"
      $(warehouse_data_display).appendTo("#warehouse_data");

    });

    // ISSUE STACK data
    $.each(inventory_data_list.issueStack, function (i, issueStack_data) {

      var issue_stack_data_display = "<li> <div class='first_content'> <p class='para_text_normal'>" + issueStack_data.name + "</p><p class='para_text_color'>" + issueStack_data.detail + "</p></div><p class='para_text_normal'>" + issueStack_data.summary + "</p><button class='inform_btn'>" + issueStack_data.info_msg + "</button> </li>"
      $(issue_stack_data_display).appendTo("#issue_stack_data");

    });

    // TOP SELLING data
    $.each(inventory_data_list.topSelling, function (i, topSelling_data) {

      var top_selling_data_display = "<div class='slide'> <div class='inner_slide_products inline_flex'> <div class='selling_product_img'> <img src='assets/images/retail/" + topSelling_data.img + "' class='img-responsive'> </div><div class='inner_selling_content'> <h4 class='para_text_normal'>" + topSelling_data.name + "</h4> <p class='para_text_color'>" + topSelling_data.position + "</p></div></div></div>"
      $(top_selling_data_display).appendTo("#top_selling_data");

    });
    $('.top_selling').slick({
      dots: true,
      autoplay: true,
      autoplaySpeed: 3000,
      infinite: true,
      speed: 1000,
      slidesToShow: 1,
    });

    // RECORDERS data
    $.each(inventory_data_list.reorders, function (i, reorders_data) {

      var recorders_data_display = "<li> <p class='para_text_normal'>" + reorders_data.name + "</p><p class='para_text_color'>" + reorders_data.time + "</p><p class='para_text_color inline_flex'> <img src='assets/images/retail/" + reorders_data.statusIcon + ".png' class='img-responsive pr_10'> <span class='para_text_color'>" + reorders_data.statusIcon + "</span> </p></li>"
      $(recorders_data_display).appendTo("#recorders_data");

    });

    // UPCOMING EVENTS data
    $.each(inventory_data_list.upcomingEvents, function (i, upcomingEvents_data) {

      var upcoming_event_data_display = "<li> <p class='para_text_normal'>" + upcomingEvents_data.name + "</p><p class='para_text_color'>" + upcomingEvents_data.time + "</p><p class='para_text_color inline_flex'> <img src='assets/images/retail/" + upcomingEvents_data.icon + "' class='img-responsive pr_10'> <span class='para_text_color'>" + upcomingEvents_data.summary + "</span> </p></li>"
      $(upcoming_event_data_display).appendTo("#upcoming_event_data");

    });


  });
};

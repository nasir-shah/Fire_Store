var infraData;
var minNumber;
var maxNumber;

function loadRetailInfra() {

  $("#active_non_active_data .active_text, #active_non_active_data .on_break_text, #active_non_active_data .onleave_text, #camaras_list_data, #camaras_type_data, #camaras_type_img_data, #network_value_data, #clarity_status_data").html('');

  $.getJSON('product_data/store_infra.json', function (infra_data) {
    infraData = infra_data[0];

    // active_non_active_data data
    $.each(infraData.activeNonActive, function (i, activeNonActive_data) {
      var active_non_active_data_display = "<span>" + activeNonActive_data.active + "</span>"
      $(active_non_active_data_display).appendTo("#active_non_active_data .active_text");

      var active_non_active_data_display1 = "<span>" + activeNonActive_data.inactive + "</span>"
      $(active_non_active_data_display1).appendTo("#active_non_active_data .on_break_text");

      var active_non_active_data_display2 = "<span>" + activeNonActive_data.underService + "</span>"
      $(active_non_active_data_display2).appendTo("#active_non_active_data .onleave_text");
    });

    // camaras_list_data
    $.each(infraData.heavyDutyCameras, function (i, heavyDutyCameras_data) {
      var heavyDutyCameras_data_display = "<li><p class='para_text_normal'>" + heavyDutyCameras_data.name + "</p><p class='para_text_normal " + heavyDutyCameras_data.status + "_text'>" + heavyDutyCameras_data.status + "</p><p class='para_text_color'>" + heavyDutyCameras_data.count + "</p></li>"
      $(heavyDutyCameras_data_display).appendTo("#camaras_list_data");
    });

    // camaras_type_data
    $.each(infraData.camerasTypes, function (i, camerasTypes_data) {
      var camerasTypes_data_display = "<div class='camera_" + i + " cameras_info'> <h5 class='para_text_normal'>" + camerasTypes_data.count + "</h5> <p class='para_text_color'>" + camerasTypes_data.name + "</p><img src='assets/images/retail/" + camerasTypes_data.image + ".png' class='img-responsive camera_" + i + "'> </div>"
      $(camerasTypes_data_display).appendTo("#camaras_type_data");
    });

    // camaras_type_img_data
    $.getJSON('https://us-central1-retail-future.cloudfunctions.net/api/videoconfig', function (config) {
      var store_ip = config.store;
      $("#store_feed").attr("src", store_ip);
      var camaras_type_img_data_display = "<img src='" + store_ip + "' class='img-responsive' style='width:75%;transform:scaleX(1.35);transform-origin:left'>"
      $(camaras_type_img_data_display).appendTo("#camaras_type_img_data");
    });

    // network_value_data

    var specialStaffCampaign_data_display = "<span>" + infraData.networkValueStart + "</span><sub class='para_text_color sub_text'>" + infraData.networkUnit + "</sub>"
    $(specialStaffCampaign_data_display).appendTo("#network_value_data");

    // clarity_status_data
    $.each(infraData.clarityStatus, function (i, clarityStatus_data) {
      var clarityStatus_data_display = "<div class='focused_1 focused_div'> <p class='para_text_normal active_text'>" + clarityStatus_data.count + "</p><p class='para_text_color'>" + clarityStatus_data.name + "</p></div>"
      $(clarityStatus_data_display).appendTo("#clarity_status_data");
    });

  });
};

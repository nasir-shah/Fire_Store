var staffData;
var upcomingStaffLabel = [];
var upcomingStaffValues = [];
function loadRetailStaff() {

  $("#daily_target_meter, #daily_target_data, #staff_of_the_week_data, #breakup_associates_data, #staff_for_campaign_data, #staff_issue_data, #returning_customer_ratio, #engagement_period_graph").html('');

  $.getJSON('product_data/store_staff.json', function (staff_data) {
    staffData = staff_data[0];
    console.log("staff data original",staffData);

    // daily TARGET graph data
    $.each(staffData.dailyTarget, function (i, dailyTarget_data) {

      meter_percentage = (dailyTarget_data.current / dailyTarget_data.max) * 100;
      var dailyTarget_data_display = "<p class='value_text_span'>$<span>" + dailyTarget_data.current + "</span></p><p class='progress_text_white'>" + dailyTarget_data.status + "</p><p class='progress_text_color'>" + dailyTarget_data.status2 + "</p>"
      $(dailyTarget_data_display).appendTo("#daily_target_meter");
    });

    // daily_target_data data
    var daily_target_data_display = "<h4 class='big_number_title'>" + staffData.totalAssociate + " </h4><p class='para_text_color'>total <br/> associates</p>"
    $(daily_target_data_display).appendTo("#daily_target_data");

    // staff_of_the_week_data
    $.each(staffData.staffofTheWeek, function (i, staffofTheWeek_data) {
      var staffofTheWeek_data_display = "<h3 class='panel_title'>Staff Of the week</h3> <div class='inline_flex h_100 align_items_start pt_18'> <div class='staff_of_the_week_img'> <img src='assets/images/retail/" + staffofTheWeek_data.photo + ".png' class='img-responsive'> </div><div class='staff_of_the_week_content'> <div class='best_employee'> <h5 class='para_text_color inline_flex'> <img src='assets/images/retail/" + staffofTheWeek_data.type + ".png' class='img-responsive best_employee_icon'> <span class='para_text_color'>" + staffofTheWeek_data.typeText + "</span> </h5> </div><div class='about_staff_profile'> <p class='para_text_color staff_name'>" + staffofTheWeek_data.name + "</p><p class='para_text_normal staff_designation'>" + staffofTheWeek_data.designation + "</p><p class='staff_rating'> <img src='assets/images/retail/rating" + staffofTheWeek_data.rating + ".png' class='img-responsive'> </p></div></div></div>"
      $(staffofTheWeek_data_display).appendTo("#staff_of_the_week_data");
    });

    // breakup_associates_data
    $.each(staffData.breakupAssociates, function (i, breakupAssociates_data) {
      var breakupAssociates_data_display = "<h3 class='panel_title'>Breakup of Associates</h3><div class='inline_flex justify_beetween pt_18'> <div class='active_associates'> <h5 class='caption_text active_text'>" + breakupAssociates_data.active + "</h5> <p class='para_text_color'>active</p></div><div class='onleave_associates'> <h5 class='caption_text onleave_text'>" + breakupAssociates_data.onLeave + "</h5> <p class='para_text_color'>On Leave</p></div><div class='onbreak_associates'> <h5 class='caption_text on_break_text'>" + breakupAssociates_data.onBreak + "</h5> <p class='para_text_color'>On Break</p></div></div>"
      $(breakupAssociates_data_display).appendTo("#breakup_associates_data");
    });

    // staff Strength Graph
    upcomingStaffLabel = [];
    upcomingStaffValues = [];
    $.each(staffData.upcomingStaffStrength, function (i, upcomingStaffStrength_data) {
      upcomingStaffLabel.push(upcomingStaffStrength_data.date);
      upcomingStaffValues.push(upcomingStaffStrength_data.count);
    });
    loadRetailstaffStrengthGraph();

    // customer engagament Graph
    console.log("staff data",staffData);
    var calculatePercentage = (staffData.returningCustomerRatioCount / staffData.returningCustomerRatioTotal) * 100;
    var customerEngagaments_data_display = "<div class='circle_progress_ratio circle' data-percent='" + calculatePercentage + "'><div class='middle_content_circle'><span class='value_tag'>" + staffData.returningCustomerRatioCount + "/" + staffData.returningCustomerRatioTotal + "<span><strong class='value_tag' style='display:none;'></strong><span class='value_text'>" + staffData.returningCustomerRatioType + "</span></div></div>"
    $(customerEngagaments_data_display).appendTo("#returning_customer_ratio");

    setTimeout(function () {
      customerRatio();
      $(window).scroll(customerRatio);
    }, 300);


    // engagement period graph
    var calculatePercentage2 = (staffData.engagementPeriodStarts / staffData.engagementPeriodEnds) * 100;
    var engagement_period_data_display = "<div class='circle_progress_ratio circle' data-percent='" + calculatePercentage2 + "'><div class='middle_content_circle'><span class='value_tag'>" + staffData.engagementPeriodStarts + "-" + staffData.engagementPeriodEnds + " <div class='minsdiv'>Mins</div><span><strong class='value_tag' style='display:none;'></strong><span class='value_text'>/ Customers</span></div></div>"
    $(engagement_period_data_display).appendTo("#engagement_period_graph");

    setTimeout(function () {
      customerEngagementRatio();
      $(window).scroll(customerEngagementRatio);
    }, 300);


    // staff_for_campaign_data
    $.each(staffData.specialStaffCampaign, function (i, specialStaffCampaign_data) {
      var specialStaffCampaign_data_display = "<h3 class='panel_title'>Special Staff For Campaign</h3><div class='inline_flex pt_18'> <div class='left_campaign_img'> <img src='assets/images/retail/" + specialStaffCampaign_data.img + "' class='img-responsive'> </div><div class='right_campaign_content'> <div class='active_associates pb_10'> <h5 class='caption_text active_text'>" + specialStaffCampaign_data.active + "</h5> <p class='para_text_color'>active</p></div><div class='onleave_associates pb_10'> <h5 class='caption_text onleave_text'>" + specialStaffCampaign_data.onLeave + "</h5> <p class='para_text_color'>On Leave</p></div><div class='onbreak_associates'> <h5 class='caption_text onleave_text'>" + specialStaffCampaign_data.onBreak + "</h5> <p class='para_text_color'>On Break</p></div></div></div>"
      $(specialStaffCampaign_data_display).appendTo("#staff_for_campaign_data");
    });



    // staff_issue_data
    $.each(staffData.staffIssues, function (i, staffIssues_data) {
      var staffIssues_data_display = "<li> <p class='para_text_color'>" + staffIssues_data.msg + "</p></li>"
      $(staffIssues_data_display).appendTo("#staff_issue_data");
    });

  });
};

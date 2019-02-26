function createGraphs(){

	// SelectTarget   customer
	$(".Semiprogress").each(function(){
	  var $bar = $(this).find(".bar");
	  var $val = $(this).find("span");
	  //var $val1 = $(this).find(".current_data");
	  var perc = parseInt( $val.text(), 10);

	  $({p:0}).animate({p:perc}, {
		duration: 3000,
		easing: "swing",
		step: function(p) {
		  $bar.css({
			transform: "rotate("+ (45+(p*1.8)) +"deg)", // 100%=180° so: ° = % * 1.8
			// 45 is to add the needed rotation to have the green borders at the bottom
		  });
		  $val.text(p|0);
		}
	  });
	});

	 // customer sentiments
	var chartsentiment_graph_data = {
	  timelabel : ['Very Sad', 'Sad', 'Netural', 'Happy', 'Vey Happy'],
	  labels: sentimentLabel,
	  series: [
		sentimentValues
	  ]
	};
	// We are setting a few options for our chart and override the defaults
	var options = {
		fullWidth: true,
  	chartPadding: {
    	left: 15
		},
		low: 0,
  	showArea: false,
	  showPoint: true, // Don't draw the line chart points
	  lineSmooth: true, // Disable line smoothing
	  // X-Axis specific configuration
	  axisX: {
		offset: 30,
		showGrid: true, // We can disable the grid for this axis
		showLabel: true // and also don't show the label
	  },
	  // Y-Axis specific configuration
	  axisY: {
			showGrid: true, // We can disable the grid for this axis
			showLabel: false, // and also don't show the label
			offset: 0, // Lets offset the chart a bit from the labels
		// The label interpolation function enables you to modify the values
		// used for the labels on each axis. Here we are converting the
		// values into million pound.
		labelInterpolationFnc: function(timelabel) {
		  return timelabel;
		}
	  }
	};

	setTimeout(function(){
		$chartsentiment_obj = new Chartist.Line('#chartsentiment', chartsentiment_graph_data, options, {
			distributeSeries: true
		});
	}, 300);

	// todays footfall peak time graph
	var footfall_peak_time_graph_data = {
	  labels: footfallPeakHourLabel,
	  series: [
		footfallPeakHourValues
	  ]
	};

	// We are setting a few options for our chart and override the defaults
	var options1 = {
	  showPoint: true, // Don't draw the line chart points
	  lineSmooth: true, // Disable line smoothing
	  // X-Axis specific configuration
	  axisX: {
		offset: 20,
		showGrid: true, // We can disable the grid for this axis
		showLabel: true // and also don't show the label
	  },
	  // Y-Axis specific configuration
	  axisY: {
			showGrid: false, // We can disable the grid for this axis
			showLabel: false, // and also don't show the label
		offset: 0, // Lets offset the chart a bit from the labels
		// The label interpolation function enables you to modify the values
		// used for the labels on each axis. Here we are converting the
		// values into million pound.
		labelInterpolationFnc: function(labels) {
		  return labels;
		}
	  }
	};

	setTimeout(function(){
		$footfall_peak_time_graph_obj =  new Chartist.Bar('#footfall_peak_time_graph', footfall_peak_time_graph_data, options1, {
			distributeSeries: true
		});
	}, 300);

	/*
	new Chartist.Bar('#chartsentiment', {
	  labels: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
	  series: [20, 60, 120, 200, 180, 20, 10]
	}, {
	  distributeSeries: true
	}); */

}

function loadRetailstaffStrengthGraph() {

	// staff strength graph
	var staff_strength_graph_data = {
	  labels: upcomingStaffLabel,
	  series: [
		upcomingStaffValues
	  ]
	};

	// We are setting a few options for our chart and override the defaults
	var options2 = {
	  showPoint: true, // Don't draw the line chart points
	  lineSmooth: true, // Disable line smoothing
	  // X-Axis specific configuration
	  axisX: {
		offset: 40,
		showGrid: true, // We can disable the grid for this axis
		showLabel: true // and also don't show the label
	  },
	//   // Y-Axis specific configuration
	   axisY: {
		offset: 40, // Lets offset the chart a bit from the labels
		// The label interpolation function enables you to modify the values
		// used for the labels on each axis. Here we are converting the
		// values into million pound.
		labelInterpolationFnc: function(labels) {
		  return labels;
		}
	},
	plugins: [
	    //Chartist.plugins.ctBarLabels(),
			//Chartist.plugins.legend()
	  ]
	};
    setTimeout(function(){
		$staff_strength_graph_obj = new Chartist.Bar('#staff_strength_graph', staff_strength_graph_data, options2, {
			distributeSeries: true
		});
	}, 300);

}

// 1. Customer engagement Ratio
function customerRatio(){
	var percent = $('.returning_ratio .circle').attr('data-percent');
	$('.returning_ratio .circle').circleProgress({
		value: percent / 100,
		size : 400,
		thickness: 20,
		emptyFill: '#3e4148',
		fill: {
			color: '#00e6ce'
		}
	});
	/*$('.returning_ratio').each(function () {
		var elementPos = $(this).offset().top;
		var topOfWindow = $(window).scrollTop();
		var percent = $(this).find('.circle').attr('data-percent');
		var animate = $(this).data('animate');
		if (elementPos < topOfWindow + $(window).height() - 30 && !animate) {
			$(this).data('animate', true);
			$(this).find('.circle').circleProgress();
			$(this).find('.circle').circleProgress({
				// startAngle: -Math.PI / 2,
				value: percent / 100,
				size : 400,
				thickness: 20,
				fill: {
					color: '#00e6ce'
				}
			}).on('circle-animation-progress', function (event, progress, stepValue) {
				$(this).find('strong').text((stepValue*100).toFixed(0) + "%");
			}).stop();
		}
	}); */

	//$('.circle').circleProgress({ value: 0.5 });
}

// 1. Customer engagement Ratio
function customerEngagementRatio(){

	var percent = $('.engagement_period .circle').attr('data-percent');
	$('.engagement_period .circle').circleProgress({
		value: percent / 100,
		size : 400,
		thickness: 20,
		emptyFill: '#3e4148',
		fill: {
			color: '#00e6ce'

		}
	});

	/*$('.engagement_period').each(function () {
		var elementPos = $(this).offset().top;
		var topOfWindow = $(window).scrollTop();
		var percent = $(this).find('.circle').attr('data-percent');
		var animate = $(this).data('animate');
		if (elementPos < topOfWindow + $(window).height() - 30 && !animate) {
			$(this).data('animate', true);
			$(this).find('.circle').circleProgress({
				// startAngle: -Math.PI / 2,
				value: percent / 100,
				size : 400,
				thickness: 20,
				fill: {
					color: '#00e6ce'
				}
			}).on('circle-animation-progress', function (event, progress, stepValue) {
				$(this).find('strong').text((stepValue*100).toFixed(0) + "%");
			}).stop();
		}
	});	*/
}

// Electricity status
function electricityStatus(){

	var percent = $('.electricity_status .circle').attr('data-percent');
	$('.electricity_status .circle').circleProgress({
		value: percent / 100,
		size : 400,
		thickness: 20,
		emptyFill: '#3e4148',
		fill: {
			color: '#00e6ce'
		}
	}).on('circle-animation-progress', function (event, progress, stepValue) {
		$(this).find('span').text((stepValue*100).toFixed(0) + "%");
	}).stop();

	/*$('.electricity_status').each(function () {
		var elementPos = $(this).offset().top;
		var topOfWindow = $(window).scrollTop();
		var percent = $(this).find('.circle').attr('data-percent');
		var animate = $(this).data('animate');
		if (elementPos < topOfWindow + $(window).height() - 30 && !animate) {
			$(this).data('animate', true);
			$(this).find('.circle').circleProgress({
				// startAngle: -Math.PI / 2,
				value: percent / 100,
				size : 400,
				thickness: 10,
				fill: {
					color: '#00e6ce'
				}
			}).on('circle-animation-progress', function (event, progress, stepValue) {
				$(this).find('span').text((stepValue*100).toFixed(0) + "%");
			}).stop();
		}
	});	*/
}

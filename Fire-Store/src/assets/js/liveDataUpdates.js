function liveDataUpdates() {
	

	setInterval(function(){ 
		$("#active_non_active_data .active_text, #active_non_active_data .on_break_text, #active_non_active_data .onleave_text").html('');
		
		$.getJSON('product_data/liveData_activeInactive.json', function (infra_data) {
			infraData = infra_data[0];
			
			$.each(infraData.activeNonActive, function (i, activeNonActive_data) {
				var active_non_active_data_display = "<span>" + activeNonActive_data.active + "</span>"
				$(active_non_active_data_display).appendTo("#active_non_active_data .active_text");
				
				var active_non_active_data_display1 = "<span>" + activeNonActive_data.inactive + "</span>"
				$(active_non_active_data_display1).appendTo("#active_non_active_data .on_break_text");
				
				var active_non_active_data_display2 = "<span>" + activeNonActive_data.underService + "</span>"
				$(active_non_active_data_display2).appendTo("#active_non_active_data .onleave_text");
				
			});						
		});					
	}, 1000);
}


function networkValueRandom() {	
		
	setInterval(function(){ 
		$("#network_value_data").html('');
		
		var minNumber = 40;
		var maxNumber = 60;
		var randomNumber = randomNumberFromRange(minNumber, maxNumber);

		function randomNumberFromRange(min,max){
			return Math.floor(Math.random()*(max-min+1)+min);
		}
		
		$.getJSON('product_data/store_infra.json', function (infra_data) {
			infraData = infra_data[0];
			
			//$.each(infraData.activeNonActive, function (i, activeNonActive_data) {
			var active_non_active_data_display = "<span>" +randomNumber + "</span><sub class='para_text_color sub_text'>" + infraData.networkUnit + "</sub>"
			$(active_non_active_data_display).appendTo("#network_value_data");
					
		});					
	}, 2000);
}
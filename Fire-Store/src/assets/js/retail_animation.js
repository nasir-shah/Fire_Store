function loadRetailAnimation() {
	
	$(function(){
		var tickerLength1 = $('.complaints_list ul li').length;
		var tickerHeight1 = $('.complaints_list ul li').outerHeight();
		$('.complaints_list ul li:last-child').prependTo('.complaints_list ul');
		$('.complaints_list ul').css('marginTop',-tickerHeight1);
		function moveTop(){
		$('.complaints_list ul').animate({
		  top : -tickerHeight1
		},1000, function(){
		  $('.complaints_list ul li:first-child').appendTo('.complaints_list ul');
		  $('.complaints_list ul').css('top','');
		});
		}
		setInterval( function(){
		  moveTop();
		}, 5000);
	  });

	  $(function(){
		var tickerLength2 = $('#customerBehavior_data .behvior_list li').length;
		var tickerHeight2 = $('#customerBehavior_data .behvior_list li').outerHeight();
		$('#customerBehavior_data .behvior_list li:last-child').prependTo('#customerBehavior_data .behvior_list');
		$('#customerBehavior_data .behvior_list').css('marginTop',-tickerHeight2);
		function moveTop(){
		$('#customerBehavior_data .behvior_list').animate({
		  top : -tickerHeight2
		},1500, function(){
		  $('#customerBehavior_data .behvior_list li:first-child').appendTo('#customerBehavior_data .behvior_list');
		  $('#customerBehavior_data .behvior_list').css('top','');
		});
		}
		setInterval( function(){
		  moveTop();
		}, 6000);
	  });


	  /*$(function(){
		var tickerLength3 = $('#catproductListing_data .productlisting_data1 .product_inline').length;
		var tickerHeight3 = $('#catproductListing_data .productlisting_data1 .product_inline').outerHeight();
		$('#catproductListing_data .productlisting_data1 .product_inline:last-child').prependTo('#catproductListing_data .productlisting_data1');
		$('#catproductListing_data .productlisting_data1').css('marginTop',-tickerHeight3);
		function moveTop(){
		$('#catproductListing_data .productlisting_data1').animate({
		  top : -tickerHeight3
		},1500, function(){
		  $('#catproductListing_data .productlisting_data1 .product_inline:first-child').appendTo('#catproductListing_data .productlisting_data1');
		  $('#catproductListing_data .productlisting_data1').css('top','');
		});
		}
		setInterval( function(){
		  moveTop();
		}, 10000);
	  }); */
		  
};

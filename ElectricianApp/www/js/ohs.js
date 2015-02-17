var base_url = "http://leoregis.com/thanuja/electrician/";
var clickedqute;

$(document).ready(function() {

	var data = new Object();

	data.auth = localStorage.getItem('auth');
	data.user_id = localStorage.getItem('user_id');
 	data.user_type = localStorage.getItem('user_type');	

 	
	if(data.user_type == 'admin') {
 		$('#my-icon-tabs').html(
				 // class mytab is custom default ui-block-a 
				'<li class="mytab" id="link-home">'+
					'<a href="#" class="ui-btn ui-btn-inline ui-icon-home ui-btn-icon-top" >Home</a>'+
				'</li>'+
				'<li class="mytab" id="link-quotes">'+
					'<a href="#" class="ui-btn ui-btn-inline ui-icon-edit ui-btn-icon-top" >Quotes</a>'+
				'</li>'+
				'<li class="mytab" id="link-ohs">'+
					'<a href="#" class="ui-btn ui-btn-inline ui-icon-bars ui-btn-icon-top">Invoices</a>'+
				'</li>'+
				'<li class="mytab" id="link-shedule">'+
					'<a href="#" class="ui-btn ui-btn-inline ui-icon-calendar ui-btn-icon-top">Scheduler</a>'+
				'</li>'+
				'<li class="mytab" id="link-customers">'+
					'<a href="" class="ui-btn ui-btn-inline ui-icon-user ui-btn-icon-top">Customers</a>'+
				'</li>'+	
				'<li class="mytab" id="link-">'+
					'<a href="#" class="ui-btn ui-btn-inline ui-icon-shop ui-btn-icon-top">Documents</a>'+
				'</li>');
 	}

 	else {
		$('#my-icon-tabs').html(
				 // class mytab is custom default ui-block-a 
				'<li class="ui-block-a" id="link-home">'+
					'<a href="#" class="ui-btn ui-btn-inline ui-icon-home ui-btn-icon-top">Home</a>'+
				'</li>'+

				'<li class="ui-block-b" id="link-quotes">'+
					'<a href="#" class="ui-btn ui-btn-inline ui-icon-edit ui-btn-icon-top">Quotes</a>'+
				'</li>'+

				'<li class="ui-block-c" id="link-ohs">'+
					'<a href="#" class="ui-btn ui-btn-inline ui-icon-calendar ui-btn-icon-top">Scheduler</a>'+
				'</li>'+

				'<li class="ui-block-d" id="link-customers">'+
					'<a href="#"	class="ui-btn ui-btn-inline ui-icon-user ui-btn-icon-top">Customers</a>'+
				'</li>'+	

				'<li class="ui-block-e" id="link-">'+
					'<a href="#" class="ui-btn ui-btn-inline ui-icon-shop ui-btn-icon-top">Documents</a>'+
				'</li>'); 		
 	}


	getqute();

	$( "#link-customers" ).bind( "click", function(event, ui) {
		window.location = "viewcustomer.html";
	});

	$( "#link-quotes" ).bind( "click", function(event, ui) {
		window.location = "newquotes.html";
	});

	$( "#link-viewproduct" ).bind( "click", function(event, ui) {
		window.location = "viewproduct.html";
	});	

	$( "#link-ohs" ).bind( "click", function(event, ui) {
		window.location = "ohs.html";
	});	

	$( "#link-home" ).bind( "click", function(event, ui) {
		window.location = "homeadmin.html";
	});	


	$("#link-shedule").bind("click", function(event, ui) {
		window.location = "alocatesedule.html";
	});


	$( "#btn-logout" ).bind("click", function(event, ui) {
	
		window.localStorage.removeItem("auth");
		window.localStorage.removeItem("user_id");
		window.localStorage.removeItem("user_type");

		window.location = "login.html";
	});

	$("#back-btn").bind("click", function(event, ui) {
		window.location = "homeadmin.html";
	});	
	


	$( "#selectcustomers").on( "click", "li", function() {

		var href = $(this).attr('href');
		clickedqute = $(this).attr('data-name');

		var dataqute = new Object();

		dataqute.auth = localStorage.getItem('auth');
		dataqute.user_id = localStorage.getItem('user_id');
	 	dataqute.user_type = localStorage.getItem('user_type');
	 	dataqute.qute_id = clickedqute;

	 	$.post(base_url+"ohs/getselected_qute", dataqute, function(data_out) {
	 		obj = JSON.parse(data_out);

	 		$.each(obj, function(ohs, quteval) {

	 			$('#electrician-name').html(quteval.electrician_name);
	 			$('#qute-id').html(quteval.quotation_id);
	 			$('#customer-name').html(quteval.customer_first_name);

	 			$('#quotation-date').html(quteval.quotation_preferred_date);
	 			$('#quote-estimate').html(quteval.quotation_estimated_duration);
	 			$('#quote-total').html(quteval.quotation_total);

	 		});
	 	});


	 	$.post(base_url+"ohs/getslected_quteproduct", dataqute, function(data_out) {
	 		obj = JSON.parse(data_out);

	 		$.each(obj, function(ohs, product) {
	 			$('#prduct-table').append('<tr><td>'+product.product_name+'</td><td>'+product.product_description+'</td><td>'+product.product_sup_cost+'</td><td>'+product.quote_product_unite_price+'</td><td>'+product.quote_product_quantity+'</td><td><button class="ui-btn ui-mini">Remove</button></td></tr>');
	 		});

	 	});
	});


	$("#btn-reviewd").bind("click", function(event, ui) {
		var data = new Object();

		data.auth = localStorage.getItem('auth');
		data.user_id = localStorage.getItem('user_id');
	 	data.user_type = localStorage.getItem('user_type');
	 	data.qute_id = clickedqute;

		$.post(base_url+"ohs/reviewqutecall", data, function(data_out) {

		});
	});

	$("#btn-accept").bind("click", function(event, ui) {
		var data = new Object();

		data.auth = localStorage.getItem('auth');
		data.user_id = localStorage.getItem('user_id');
	 	data.user_type = localStorage.getItem('user_type');
	 	data.qute_id = clickedqute;

		$.post(base_url+"ohs/accseptqutecall", data, function(data_out) {

				$.each(obj, function(ohs, statvalue) {
					
				});
		});		
	});

});

function getqute() {
	var datacuslist = new Object();

	datacuslist.auth = localStorage.getItem('auth');
	datacuslist.user_id = localStorage.getItem('user_id');
 	datacuslist.user_type = localStorage.getItem('user_type');

	$.post(base_url+"spinners/set_resent_qute", datacuslist, function(data_out) {

		obj = JSON.parse(data_out);

		$.each(obj, function(ohs, quteval) {
			$('#selectcustomers').append('<li class="ui-li-static ui-body-inherit ui-first-child" data-name="'+quteval.quotation_id+'">Q'+quteval.quotation_id + '</li>');
		});

		$('#selectcustomers').listview('refresh');

	});
}

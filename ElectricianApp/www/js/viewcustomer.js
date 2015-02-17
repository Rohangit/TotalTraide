var base_url = "http://leoregis.com/thanuja/electrician/";
var statvalus;


$(document).ready(function(){

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

				'<li class="ui-block-c" id="link-shedule">'+
					'<a href="#" class="ui-btn ui-btn-inline ui-icon-calendar ui-btn-icon-top">Scheduler</a>'+
				'</li>'+

				'<li class="ui-block-d" id="link-customers">'+
					'<a href="#"	class="ui-btn ui-btn-inline ui-icon-user ui-btn-icon-top">Customers</a>'+
				'</li>'+	

				'<li class="ui-block-e" id="link-">'+
					'<a href="#" class="ui-btn ui-btn-inline ui-icon-shop ui-btn-icon-top">Documents</a>'+
				'</li>'); 		
 	}

	getcustomerlist();

	$( "#link-addcustomer" ).bind( "click", function(event, ui) {
		window.location = "addcustomer.html";
	});

	$( "#btn-to-editcutomer" ).bind( "click", function(event, ui) {

	 	var customer_idsend = $("#hiddn-customer-id").val();

	 	window.localStorage["customerid"] = customer_idsend;

	 	window.location = "editcutomers.html";

	});


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



	$( "#ulcutomers").on( "click", "li", function() {
		// console.log($(this).attr('data-name'));
		var href = $(this).attr('href');

		var datacuslist = new Object();

		datacuslist.auth = localStorage.getItem('auth');
		datacuslist.user_id = localStorage.getItem('user_id');
	 	datacuslist.user_type = localStorage.getItem('user_type');

	 	datacuslist.customer_id = $(this).attr('data-name');

	 	$.post(base_url+"customers/selected_customer", datacuslist, function(data_out) {

	 		obj = JSON.parse(data_out);

	 		$.each(obj, function(viewcustomer, customer_data) {
	 			$('#hedden-value').html('<input type="hidden" id="hiddn-customer-id" name="hiddn-customer-id" value="'+customer_data.customer_id+'"/>');

	 			$('#setcustomer-values').html('<div class="ui-field-contain"><label for="text-1">First Name</label><label for="text-1">'+customer_data.customer_first_name+
	 				'</label></div><div class="ui-field-contain"><label for="text-1">Last Name</label><label for="text-1">'+customer_data.customer_last_name
	 				+'</label></div><div class="ui-field-contain"><label for="text-1">Company Name</label><label for="text-1">'+customer_data.customer_company_name+
	 				'</label></div>	<div class="ui-field-contain"><label for="text-1">Street Address</label><label for="text-1">'+customer_data.customer_street_address+
	 				'</label></div>');

	 			$('#addcustomer-conatact').html('<div class="ui-field-contain"><label for="text-1">Email</label><label for="text-1">'+customer_data.customer_email
	 				+'</label></div>	<div class="ui-field-contain"><label for="text-1">Mobile</label><label for="text-1">'+customer_data.customer_mobile
	 				+'</label></div>	<div class="ui-field-contain"><label for="text-1">Partners Name</label><label for="text-1">'+customer_data.customer_site_partners_name
	 				+'</label></div>');

	 			var getrate = customer_data.customer_rating;

	 			switch(getrate)  {
	 				case "1": //<span class="star-rating-control"><div class="rating-cancel"><a title="Cancel Rating"></a></div><div class="star-rating rater-1 star star-rating-applied star-rating-live star-rating-on" aria-label="on" role="text"><a title="on">on</a></div><div class="star-rating rater-1 star star-rating-applied star-rating-live star-rating-on" aria-label="on" role="text"><a title="on">on</a></div><div class="star-rating rater-1 star star-rating-applied star-rating-live star-rating-on" aria-label="on" role="text"><a title="on">on</a></div><div class="star-rating rater-1 star star-rating-applied star-rating-live" aria-label="on" role="text"><a title="on">on</a></div><div class="star-rating rater-1 star star-rating-applied star-rating-live" aria-label="on" role="text"><a title="on">on</a></div></span>
	 					$('#set-rate').html('<label for="text-1">Rate</label><span class="star-rating-control"><div class="rating-cancel"><a title="Cancel Rating"></a></div><div class="star-rating rater-1 star star-rating-applied star-rating-live star-rating-on" aria-label="on" role="text"><a title="on">on</a></div><div class="star-rating rater-1 star star-rating-applied star-rating-live" aria-label="on" role="text"><a title="on">on</a></div><div class="star-rating rater-1 star star-rating-applied star-rating-live" aria-label="on" role="text"><a title="on">on</a></div><div class="star-rating rater-1 star star-rating-applied star-rating-live" aria-label="on" role="text"><a title="on">on</a></div><div class="star-rating rater-1 star star-rating-applied star-rating-live" aria-label="on" role="text"><a title="on">on</a></div></span>');
	 				break; 

	 				case "2":
	 					$('#set-rate').html('<label for="text-1">Rate</label><span class="star-rating-control"><div class="rating-cancel"><a title="Cancel Rating"></a></div><div class="star-rating rater-1 star star-rating-applied star-rating-live star-rating-on" aria-label="on" role="text"><a title="on">on</a></div><div class="star-rating rater-1 star star-rating-applied star-rating-live star-rating-on" aria-label="on" role="text"><a title="on">on</a></div><div class="star-rating rater-1 star star-rating-applied star-rating-live" aria-label="on" role="text"><a title="on">on</a></div><div class="star-rating rater-1 star star-rating-applied star-rating-live" aria-label="on" role="text"><a title="on">on</a></div><div class="star-rating rater-1 star star-rating-applied star-rating-live" aria-label="on" role="text"><a title="on">on</a></div></span>');
	 				break;

	 				case "3":
	 					$('#set-rate').html('<label for="text-1">Rate</label><span class="star-rating-control"><div class="rating-cancel"><a title="Cancel Rating"></a></div><div class="star-rating rater-1 star star-rating-applied star-rating-live star-rating-on" aria-label="on" role="text"><a title="on">on</a></div><div class="star-rating rater-1 star star-rating-applied star-rating-live star-rating-on" aria-label="on" role="text"><a title="on">on</a></div><div class="star-rating rater-1 star star-rating-applied star-rating-live star-rating-on" aria-label="on" role="text"><a title="on">on</a></div><div class="star-rating rater-1 star star-rating-applied star-rating-live" aria-label="on" role="text"><a title="on">on</a></div><div class="star-rating rater-1 star star-rating-applied star-rating-live" aria-label="on" role="text"><a title="on">on</a></div></span>');
	 				break;
	 				case "4":
	 					$('#set-rate').html('<label for="text-1">Rate</label><span class="star-rating-control"><div class="rating-cancel"><a title="Cancel Rating"></a></div><div class="star-rating rater-1 star star-rating-applied star-rating-live star-rating-on" aria-label="on" role="text"><a title="on">on</a></div><div class="star-rating rater-1 star star-rating-applied star-rating-live star-rating-on" aria-label="on" role="text"><a title="on">on</a></div><div class="star-rating rater-1 star star-rating-applied star-rating-live star-rating-on" aria-label="on" role="text"><a title="on">on</a></div><div class="star-rating rater-1 star star-rating-applied star-rating-live star-rating-on" aria-label="on" role="text"><a title="on">on</a></div><div class="star-rating rater-1 star star-rating-applied star-rating-live" aria-label="on" role="text"><a title="on">on</a></div></span>');
	 				break;
	 				case "5":
	 					$('#set-rate').html('<label for="text-1">Rate</label><span class="star-rating-control"><div class="rating-cancel"><a title="Cancel Rating"></a></div><div class="star-rating rater-1 star star-rating-applied star-rating-live star-rating-on" aria-label="on" role="text"><a title="on">on</a></div><div class="star-rating rater-1 star star-rating-applied star-rating-live star-rating-on" aria-label="on" role="text"><a title="on">on</a></div><div class="star-rating rater-1 star star-rating-applied star-rating-live star-rating-on" aria-label="on" role="text"><a title="on">on</a></div><div class="star-rating rater-1 star star-rating-applied star-rating-live star-rating-on" aria-label="on" role="text"><a title="on">on</a></div><div class="star-rating rater-1 star star-rating-applied star-rating-live star-rating-on" aria-label="on" role="text"><a title="on">on</a></div></span>');
	 				break;
	 			}
	 		});
	 	});

	 	$.post(base_url+"customers/selected_customer_note", datacuslist, function(data_out) {
			
			$('#cutomer-note-id').html('');
	 		objtwo = JSON.parse(data_out);

	 		$.each(objtwo, function(viewcustomer, customer_note_data) {
	 			$('#cutomer-note-id').html('<p>Note on '+': '+customer_note_data.note_text+'</p><a href="#">View More</a>');
	 		});
	 	});

	});

	$('#selectcustomerdiv ul').children('li').bind('touchstart mousedown', function(e) {
		alert('Selected Name=' + $(this).attr('data-name'));
	});


	$( "#link-addcustomer" ).bind( "vclick", function(event, ui) {
		window.location = "addcustomer.html";
	});


	$( "#btn-to-editcutomer").bind("vclick", function(event, ui) {
		window.location = "editcutomers.html";
	});



	
});

function getcustomerlist() {
	$('#ulcutomers').html('');

	var datacuslist = new Object();

	datacuslist.auth = localStorage.getItem('auth');
	datacuslist.user_id = localStorage.getItem('user_id');
 	datacuslist.user_type = localStorage.getItem('user_type'); 

	$.post(base_url+"spinners/set_customers", datacuslist, function(data_out) {

	obj = JSON.parse(data_out);

	$.each(obj, function(viewcustomer, statvalue) {
		$('#ulcutomers').append('<li data-name="'+statvalue.customer_id+'" class="ui-li-static ui-body-inherit ui-first-child">' + statvalue.customer_first_name + '</li>');
	});

	$('#ulcutomers').listview('refresh');
	});
}
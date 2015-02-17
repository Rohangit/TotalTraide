
var base_url = "http://leoregis.com/thanuja/electrician/";
var statvalus;

var custvalus, state_values, state_company_values;
var rating_value;

var globle_state_my;
var globle_state_site;
var customerid;


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

	$( "#btn-logout" ).bind( "click", function(event, ui) {
	
		window.localStorage.removeItem("auth");
		window.localStorage.removeItem("user_id");
		window.localStorage.removeItem("user_type");

		window.location = "login.html";
	});	

	$("#back-btn").bind("click", function(event, ui) {
		window.location = "viewcustomer.html";
	});
 	


	 customerid = localStorage.getItem('customerid');

	//console.log(customerid);

		var datacuslist = new Object();

		datacuslist.auth = localStorage.getItem('auth');
		datacuslist.user_id = localStorage.getItem('user_id');
	 	datacuslist.user_type = localStorage.getItem('user_type');

	 	datacuslist.customer_id = customerid;

	 	$.post(base_url+"customers/selected_customer", datacuslist, function(data_out) {

	 		obj = JSON.parse(data_out);

	 		$.each(obj, function(viewcustomer, customer_data) {
	 			//<div class="ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset">
	 			
	 			$('#set-first-name').html('<label for="text-1">First Name</label> <div class="ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset"><input type="text" value="'+customer_data.customer_first_name+'" id="txt_firstname" name="txt_firstname" placeholder="First Name" maxlength="45"></div><div id="firstname_error" class="error_message"></div>');
	 			$('#set-last-name').html('<label for="text-1">Last Name</label><div class="ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset"><input type="text" value="'+customer_data.customer_last_name+'" id="txt_lname" name="txt_lname" placeholder="Last Name" maxlength="45"></div><div id="lastname_error" class="error_message"></div>');
	 			$('#set-company-name').html('<label for="text-1">Company Name</label><div class="ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset"><input type="text" value="'+customer_data.customer_company_name+'" id="txt_company" name="txt_company" placeholder="Company Name" maxlength="100"></div><div id="company_error" class="error_message"></div>');
	 			$('#set-street-address').html('<label for="text-1">Street Address</label><div class="ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset"><input type="text" value="'+customer_data.customer_street_address+'" id="txt_saddress" name="txt_saddress" placeholder="Street Address" maxlength="300"></div> <label for="text-1" style="font-size:12px;">(If different to above)</label><div id="streetaddress_error" class="error_message"></div>');
	 			$('#set-street-address').html('<label for="text-1">Street Address</label><div class="ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset"><input type="text" value="'+customer_data.customer_street_address+'" id="txt_saddress" name="txt_saddress" placeholder="Street Address" maxlength="300"></div> <label for="text-1" style="font-size:12px;">(If different to above)</label><div id="streetaddress_error" class="error_message"></div>');
	 			$('#set-suburb').html('<label for="text-1">Suburb</label><div class="ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset"><input type="text" value="'+customer_data.customer_suburb+'" id="txt_suburb" name="txt_suburb" placeholder="Suburb" maxlength="50"></div><div id="suburb_error" class="error_message"></div>');
	 			$('#set-postcode').html('<label for="text-1">Postcode</label><div class="ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset"><input type="text" value="'+customer_data.customer_postcode+'" id="txt_postcode" name="txt_postcode" placeholder="Postcode" maxlength="50"></div><div id="postcode_error" class="error_message"></div>');
	 			$('#set-site-address').html('<label for="text-1">Site Address</label><div class="ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset"><input type="text" value="'+customer_data.customer_site_address+'" id="txt_siteaddress" name="txt_siteaddress" placeholder="Site Address" maxlength="300"></div>');
	 			$('#set-company-suburb').html('<label for="text-1">Suburb</label><div class="ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset"><input type="text" value="'+customer_data.customer_site_suburb+'" id="txt_site_suburb" name="txt_site_suburb" placeholder="Suburb"></div>');
	 			$('#set-company-suburb').html('<label for="text-1">Suburb</label><div class="ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset"><input type="text" value="'+customer_data.customer_site_suburb+'" id="txt_site_suburb" name="txt_site_suburb" placeholder="Suburb"></div>');
	 			$('#set-postcode-compny').html('<label for="text-1">Postcode</label><div class="ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset"><input type="text" value="'+customer_data.customer_site_postcode+'" id="txt-site-postcode-company" name="txt-site-postcode-company" placeholder="Postcode"></div>');
	 			$('#set-email').html('<label for="text-1">Email</label><div class="ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset"><input type="email" value="'+customer_data.customer_email+'" id="txt_email" name="txt_email" data-clear-btn="false" placeholder="Email" maxlength="100"></div><div id="email_error" class="error_message"></div>');
	 			$('#set-mobile').html('<label for="text-1">Mobile</label><div class="ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset"><input type="tel" value="'+customer_data.customer_mobile+'" id="txt_phone" name="txt_phone" data-clear-btn="false" placeholder="Mobile"maxlength="10"></div><div id="mobile_error" class="error_message"></div>');
	 			$('#set-partners-name').html('<label for="text-1">Partners Name</label><div class="ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset"><input type="text" value="'+customer_data.customer_site_partners_name+'" id="txt_partnersname" name="txt_partnersname" placeholder="Partners Name"></div><div id="txt_partnersname" class="error_message"></div>');

	 			/* $('#set-suburb').html('<label for="text-1">State</label><select name="select_state"  id="select_state">'+
	 				+'<option value="standard">Select</option></select><div id="state_error" class="error_message"></div>');
	 			*/

	 			globle_state = customer_data.customer_state_id;
 				globle_state_site = customer_data.customer_site_state_id;
	 		});

			

			$.post(base_url+"customers/selected_customer_note", datacuslist, function(data_out) {

				obj = JSON.parse(data_out);

				$.each(obj, function(viewcustomer, customer_data_note) {
					$('#set-note').html('<label for="text-1">Note</label><textarea placeholder="Add a note" id="txt_note" name="txt_note" rows="8" cols="40" class="ui-input-text ui-shadow-inset ui-body-inherit ui-corner-all ui-textinput-autogrow" style="height: 52px;">'+customer_data_note.note_text +'</textarea><div id="txt_note" class="error_message"></div>');
				});
			});
	});

	getcustomerlist();
	get_sitestatespiner();
	get_statespiner();

	//window.localStorage.removeItem("customerid");

	console.log(localStorage.getItem('customerid'));

	$( "#btn-upadte-customer" ).bind( "click", function(event, ui) {

			var data = new Object();

			data.auth = localStorage.getItem('auth');
			data.user_id = localStorage.getItem('user_id');
		 	data.user_type = localStorage.getItem('user_type');

			data.firstname = $("#txt_firstname").val();
			data.lastname = $("#txt_lname").val();

			data.companyname = $("#txt_company").val();
			data.street_address = $("#txt_saddress").val();

			data.your_suburb = $("#txt_suburb").val();
			data.your_state = $("#select_state").val();
			data.your_postcode = $("#txt_postcode").val();

			data.site_address = $("#txt_siteaddress").val();
			data.site_suburb = $("#txt_site_suburb").val();
			data.site_state = $("#select_site_state").val();
			data.site_postcode = $("#txt_site_postcode").val();

			data.email = $("#txt_email").val();
			data.mobile = $("#txt_phone").val();
			data.partners_name = $("#txt_partnersname").val();
			data.note = $("#txt_note").val();
			data.customerid = customerid;

			jQuery.noConflict();
			rating_value = jQuery('#starVin input[name="rate"]:checked').val();
			
			data.rate = rating_value;

			$('#firstname_error, #email_error, #mobile_error, #lastname_error, #streetaddress_error, #suburb_error, #state_error, #rate_error' ).html('');

			var validation = true;

			if (data.firstname == '' || data.firstname == null) 
			{
				validation = false;
				$('#firstname_error').html('Enter your first name.');
			}

			if (data.lastname == '' || data.lastname == null) 
			{
				validation = false;
				$('#lastname_error').html('Enter your last name.');
			}

			if (data.street_address == '' || data.street_address == null) 
			{
				validation = false;
				$('#streetaddress_error').html('Enter your address.');
			}

			if (data.your_suburb == '' || data.your_suburb == null) 
			{
				validation = false;
				$('#suburb_error').html('Enter your suburb.');
			}

			if (data.site_state == '' || data.site_state == null) 
			{
				validation = false;
				$('#state_error').html('Enter your sate.');
			}

			if (rating_value == '' || rating_value == null) 
			{
				validation = false;
				$('#rate_error').html('Enter your rate.');
			}

			if (data.email == '' || data.email == null) 
			{
				validation = false;
				$('#email_error').html('Enter your email.');
			}
			else {
				if(!validateEmail(data.email)) {
					validation = false;
					$('#email_error').html('Enter valid email.');
				}					
			}


			if(data.mobile == '' || data.mobile == null) {
				validation = false;
				$('#mobile_error').html('Enter your mobile number.');
			}
			else {
				if(!validatemobile(data.mobile)) {
					validation = false;
					$('#mobile_error').html('Enter valid mobile number.');
				}					
			}


			// post request
			if(validation) {
				try{
					$.post(base_url+"customers/update_customer", data ,function(data_out) {
						obj = JSON.parse(data_out);
					});	
					window.localStorage.removeItem("customerid");
				}
				catch(err) {
					alert('Error on server');
				}
			}
			return false;
		});

	});

function validateEmail(email) { 
	var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email);
}

function validatemobile(number) { 
	var re = /^\d{10}$/;
	return re.test(number);
}

function getcustomerlist() {
	$('#ulcutomers').html('');

	var datacuslist = new Object();

	datacuslist.auth = localStorage.getItem('auth');
	datacuslist.user_id = localStorage.getItem('user_id');
 	datacuslist.user_type = localStorage.getItem('user_type');

	$.post(base_url+"spinners/set_customers", function(data_out) {

	obj = JSON.parse(data_out);

	$.each(obj, function(addcustomer, custvalue) {
		$('#ulcutomers').append('<li class="ui-li-static ui-body-inherit ui-first-child">'+ custvalue.customer_first_name + '</li>');
		});
	});
}

function get_sitestatespiner() {

	$.post(base_url+"spinners/set_state", function(data_out) {

	obj = JSON.parse(data_out);
	console.log(globle_state);

	$.each(obj, function(addcustomer, state_company_value) {

		$('#select_state').append('<option value="'+state_company_value.state_id+'">'+state_company_value.state_name+'</option>');
	
	});

	$('#select_state option[value="'+globle_state+'"]').attr("selected",true);
	$('#select_state-button span').html($('#select_state option[value="'+globle_state+'"]').text());

	//$('#ulcutomers').listview('refresh');
	});
}

function get_statespiner() {

	$.post(base_url+"spinners/set_state", function(data_out) {

	obj = JSON.parse(data_out);

	console.log(globle_state_site);

	$.each(obj, function(addcustomer, state_value) {

		$('#select_site_state').append('<option value="'+state_value.state_id+'">'+state_value.state_name+'</option>');

	});

	$('#select_site_state option[value="'+globle_state_site+'"]').attr("selected",true);
	$('#select_site_state-button span').html($('#select_site_state option[value="'+globle_state_site+'"]').text());

});

} 
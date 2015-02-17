
var base_url = "http://leoregis.com/thanuja/electrician/";
var custvalus, state_values, state_company_values;
var rating_value;

$(document).ready(function() {

	var dataset = new Object();

	dataset.auth = localStorage.getItem('auth');
	dataset.user_id = localStorage.getItem('user_id');
 	dataset.user_type = localStorage.getItem('user_type');	

 	if(dataset.user_type == 'admin') {
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

	$("#back-btn").bind("click", function(event, ui) {
		window.location = "viewcustomer.html";
	});


	$( "#btn-logout" ).bind( "click", function(event, ui) {
	
		window.localStorage.removeItem("auth");
		window.localStorage.removeItem("user_id");
		window.localStorage.removeItem("user_type");

		window.location = "login.html";
	});

	getcustomerlist();
	get_sitestatespiner();
	get_statespiner();

	$( "#btn_addcustomer" ).bind( "click", function(event, ui) {

		$('#example-line-container').html('');
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
				$('#electrions_error').html('Enter your last name.');
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

			if (data.your_state == '' || data.your_state == null) 
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

			if(validation) {

				var circle = new ProgressBar.Circle('#example-line-container', {
				    color: '#FCB03C',
				    strokeWidth: 5,
				    trailWidth: 1,
				    duration: 1500, 
				    text: {
				        value: '0'
				    },
				    step: function(state, bar) {
				        bar.setText((bar.value() * 100).toFixed(0));
				    }
				});

				$('#status-msg').html('<h4>Please wait...</h4>');

				try{
					$.post(base_url+"customers/add_customer", data , function(data_out) {
						obj = JSON.parse(data_out);

						$.each(obj, function(addcustomer, statvalue) {

							if(statvalue.validation) {

									circle.animate(1, function() {
										//circle.animate(0);
										$('#status-msg').html('');
										window.localStorage["auth"] = statvalue.auth;
										alert("Customer has been saved.");
										window.location = "viewcustomer.html";
									});
							}
							else {
								window.localStorage["auth"] = statvalue.auth;
								$('#status-msg').html('Please try again.');
							}
						});
					});	
				}
				catch(err) {
					alert('Error on server, please check internet connection');
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
		$('#ulcutomers').append('<li class="ui-li-static ui-body-inherit ui-first-child">' + custvalue.customer_first_name + '</li>');
	});

	//$('#ulcutomers').listview('refresh');

	});

}

function get_sitestatespiner() {

	$.post(base_url+"spinners/set_state", function(data_out) {

	obj = JSON.parse(data_out);

	$.each(obj, function(addcustomer, state_company_value) {

		$('#select_site_state').append('<option value="'+state_company_value.state_id+'">'+state_company_value.state_name+'</option>');
		
	});

});
}

function get_statespiner() {

	$.post(base_url+"spinners/set_state", function(data_out) {

	obj = JSON.parse(data_out);

	$.each(obj, function(addcustomer, state_value) {
		$('#select_state').append('<option value="'+state_value.state_id+'">'+state_value.state_name+'</option>');
		});

		$('#select_state option[value=1]').attr("selected",true);
		$('#select_state-button span').html($('#select_state option[value=1]').text());
	});
} 
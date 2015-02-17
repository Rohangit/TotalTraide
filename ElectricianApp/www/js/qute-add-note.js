
var base_url = "http://leoregis.com/thanuja/electrician/";

var custvalus, state_values, state_company_values;
var rating_value;

$(document).ready(function(){

	$( "#btn-add-note" ).bind( "click", function(event, ui) {

		var data = new Object();

		data.auth = localStorage.getItem('auth');
		data.user_id = localStorage.getItem('user_id');
	 	data.user_type = localStorage.getItem('user_type');

		data.note = $("#qutenote").val();

		try{
			$.post(base_url+"customers/add_customer", data ,function(data_out) {
				obj = JSON.parse(data_out);
			});	
		}
		catch(err) {
			alert('Error on server');
		}
		
	});

});
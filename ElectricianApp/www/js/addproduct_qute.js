var base_url = "http://leoregis.com/thanuja/electrician/";
var productvalues;
var poduct_cost;
var quteid, gauthid;

$(document).ready(function(){

	get_product();

	quteid = localStorage.getItem('globle_qute_id');
	gauthid =localStorage.getItem('auth');


	console.log(quteid+" "+gauthid);

	$("#back-btn").bind("click", function(event, ui) {
		window.location = "newquotes.html";
	});	


	//TODO
	$( "#btnadd-product" ).bind( "click", function(event, ui) {


			var data = new Object();

			data.auth = localStorage.getItem('auth');
			data.user_id = localStorage.getItem('user_id');
		 	data.user_type = localStorage.getItem('user_type');
		 	data.customer_id = localStorage.getItem('customer_id');

		 	data.quotation_id = quteid;

			data.productid = $("#filter-menu").val();
			data.qty = $("#product-qty").val();
			data.productcost = poduct_cost;

			if($("#product-qty").val() =='' || $("#product-qty").val() == null) {
				alert("Please provide quntity");
			}
			else if($("#filter-menu").val() == '' || $("#filter-menu").val() == null) {
				alert("Please select product");
			}
			else {	

			var circle = new ProgressBar.Circle('#status-dispaly', {
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
				try {
					$.post(base_url+"product/insert_product", data ,function(data_out) {
						obj = JSON.parse(data_out);

						$.each(obj, function(addanewproduct, insert_status){
							if(insert_status.validation) {
								window.localStorage["auth"] = insert_status.auth;
								window.location = "newquotes.html";				
							}
							else {
								window.localStorage["auth"] = insert_status.auth;
								alert("Error on adding product");
							}
						});
					});
				}
				catch(err) {
					alert('Error on server');				
				}
			}
	});
});

function get_product() {

	$.post(base_url+"product/get_products", function(data_out) {

		obj = JSON.parse(data_out);

		$.each(obj, function(addanewproduct , product_value) {
			$('#filter-menu').append('<option value="'+product_value.product_id+'">'+product_value.product_name+'</option>');
			poduct_cost = product_value.product_sup_cost;
		});

		$('#filter-menu').filterable('refresh');
	});
} 
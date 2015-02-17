var base_url = "http://leoregis.com/thanuja/electrician/";
var cutomervalues;

var customer_fullname, cutomer_street_address,qute_date,qute_id;
var date_obj = new Date();
var gst, total, profit, totalchargess;
var subtotal = 0;


var hourlyrate,total_withcarges;

$(document).ready(function(){

	var data = new Object();

	data.auth = localStorage.getItem('auth');
	data.user_id = localStorage.getItem('user_id');
 	data.user_type = localStorage.getItem('user_type');	

 	var actuvalmonth =  date_obj.getMonth() +1;

 		qute_date = date_obj.getFullYear() +"-"+actuvalmonth+"-"+date_obj.getDate();

		$('#set-date').html(qute_date);




 	if(data.user_type == 'admin') {
 		$('#my-icon-tabs').html(
				'<li class="mytab" id="link-home">'+
					'<a href="#" class="ui-btn ui-btn-inline ui-icon-home ui-btn-icon-top" >Home</a>'+
				'</li>'+
				'<li class="mytab" id="link-quotes">'+
					'<a href="#" class="ui-btn ui-btn-inline ui-icon-edit ui-btn-icon-top" >Quotes</a>'+
				'</li>'+
				'<li class="mytab"  id="link-ohs">'+
					'<a href="#" class="ui-btn ui-btn-inline ui-icon-bars ui-btn-icon-top">Invoices</a>'+
				'</li>'+
				'<li class="mytab" id="link-shedule"">'+
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

	get_cutomers();
	getqutelist();
	get_product();


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

	if(localStorage.getItem('globle_qute_id') == null || localStorage.getItem('globle_qute_id') == '') {
		
	}
	else {
		get_quote_product(localStorage.getItem('globle_qute_id'));
		get_customer_details();
		get_qute_id();
	}

	//TODO
	$( "#addnewproductbtn" ).bind( "click", function(event, ui) {
		if(qute_id==null||qute_id=='') {
			alert("Please select customer");
		}
		else {
			window.location = "addanewproduct.html";
		}
	});

	$("#btnnew-qute").bind("click", function(event, ui) {
		window.localStorage.removeItem("customerid");
		window.localStorage.removeItem("globle_qute_id");
		window.location = "newquotes.html";
	});


	$( "#select-customer").on( "change", function() {
		
		//var $this = $(this),
		//cutomer_id   = $this.val();
		 cutomer_id = $("#select-customer").val();

		 window.localStorage["customer_id"] = cutomer_id;

		 get_customer_details();
		 get_qute_id();

	});


	$( "#selectquts").on( "click", "li", function() {
		var href = $(this).attr('data-name');
		window.localStorage["globle_qute_id"] = href;
		window.location = "newquotes.html";
	});


	$( "#btn-qute-save" ).bind( "click", function(event, ui) {
		//TODO
		var data = new Object();

		data.auth = localStorage.getItem('auth');
		data.user_id = localStorage.getItem('user_id');
	 	data.user_type = localStorage.getItem('user_type');	

	 	data.customer_id = localStorage.getItem('customer_id');
	 	data.starting_date = $("#starting-date").val();
	 	data.estimate_duration = $("#estimte-duration").val();
		data.labor_chages = totalchargess;
		data.quotation_id = localStorage.getItem('globle_qute_id');
		data.quotation_total = total;

		if(localStorage.getItem('globle_qute_id')==null || localStorage.getItem('globle_qute_id')=='') {
			alert("Please select customer");
		}
		else if(total<0) {
			alert("Please select product");
		}
		else if(data.estimate_duration == null || data.estimate_duration =='') {
			alert("Please input estimate duration ");
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

			$('#status-msg').html('<h4>Please wait...</h4><br/><br/>');


			try{
				$.post(base_url+"newqute/save_qute", data ,function(data_out) {
					obj = JSON.parse(data_out);

					$.each(obj, function(newquotes, insert_status){

						if(insert_status.validation) {
								window.localStorage["auth"] = insert_status.auth;
								window.localStorage.removeItem("customerid");
								window.localStorage.removeItem("globle_qute_id");
								
								$('#status-msg').html('');
								alert("Qute has been saved..");
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

	$("#btn-qute-email").bind("click", function(event, ui) {
		var data = new Object();

		data.auth = localStorage.getItem('auth');
		data.user_id = localStorage.getItem('user_id');
	 	data.user_type = localStorage.getItem('user_type');	

	 	data.customer_id = $("#filter-menu").val();
	 	data.starting_date = $("#starting-date").val();
	 	data.estimate_duration = $("#estimte-duration").val();
		data.labor_chages = $("#labor-charges").val();
		data.quotation_id = localStorage.getItem('globle_qute_id');
		data.quotation_total = total;

		if(localStorage.getItem('globle_qute_id')==null || localStorage.getItem('globle_qute_id')=='') {
			alert("Please select customer");
		}
		else if(total<0) {
			alert("Please select product");
		}
		else if(data.estimate_duration == null || data.estimate_duration =='') {
			alert("Please input estimate duration ");
		}
		else if(data.labor_chages == null || data.labor_chages =='') {
			alert("Please input estimate duration ");
		}
		else {

			try{
				$.post(base_url+"newqute/email_qute", data ,function(data_out) {
					obj = JSON.parse(data_out);

					if(obj.validation) {

					//TODO

						window.localStorage.removeItem("customerid");
						window.localStorage.removeItem("globle_qute_id");
						window.location = "newquotes.html";
					}
					else {

					}
				});	
			}
			catch(err) {
				alert('Error on server');
			}
		}
	});

	$('#btn-qute-allocate').bind("click", function(event, ui){
		
	});



	$( "#btnadd-product" ).bind( "click", function(event, ui) {

			quteid = localStorage.getItem('globle_qute_id');
			gauthid =localStorage.getItem('auth');

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
								circle.animate(1, function() {
									window.localStorage["auth"] = insert_status.auth;
									window.location = "newquotes.html";	
								});
			
							}
							else {
								circle.animate(1, function() {
									window.localStorage["auth"] = insert_status.auth;
									alert("Error on adding product");
								});	
							}
						});
					});
				}
				catch(err) {
					alert('Error on server');				
				}
			}
	});

	$( "#remove-ul").on( "click", "li", function() {

		var del_conform = confirm("Are you sure delete this product");

		if(del_conform== true) {
			var href = $(this).attr('data-name');

			var datapass = new Object();

			datapass.auth = localStorage.getItem('auth');
			datapass.user_id = localStorage.getItem('user_id');
		 	datapass.user_type = localStorage.getItem('user_type');			
			datapass.quotation_id = localStorage.getItem('globle_qute_id');
			datapass.pro_id = href;

			$.post(base_url+"newqute/remove_product", datapass, function(data_out) {

				obj = JSON.parse(data_out);

				$.each(obj, function(newquotes , remove_val) {
					if(remove_val.validation) {
						window.location = "newquotes.html";
					}
				});
			});
		}
	});



	$("#estimte-duration" ).keyup(function( event ) {

	 	var duration = $("#estimte-duration").val();

		set_hourrate();

		var labor_chages = hourlyrate;

		var duration_in_hours = duration * 8;

		totalchargess = labor_chages * duration_in_hours;

		console.log(totalchargess);



	try {
		var dataqute = new Object();

		dataqute.auth = localStorage.getItem('auth');
		dataqute.user_id = localStorage.getItem('user_id');
	 	dataqute.user_type = localStorage.getItem('user_type');

	 	dataqute.quotation_id = qute_id;

		$.post(base_url+"newqute/get_total_val", dataqute, function(data_out) {
			obj = JSON.parse(data_out);
			var tt = 0;
			$.each(obj, function(newquotes, qute_totals) {

				var unitprice = qute_totals.quote_product_unite_price;
				var qty = qute_totals.quote_product_quantity;

				var unitpriceval = parseInt(unitprice);
				var qtyval = parseInt(qty);

				var tt = unitpriceval * qtyval;

				subtotal = tt + subtotal;
				gst = subtotal * 0.1;
				total = subtotal + gst;
				total_withcarges = totalchargess + total;
				profit = total - subtotal;

			});

			$('#total-panel').html('<span>$'+parseFloat(subtotal).toFixed(2)+
				'</span><br/><span> $'+parseFloat(gst).toFixed(2)+
				'</span><br/><span> $'+parseFloat(totalchargess).toFixed(2)+
				'</span><br/><span> $'+parseFloat(total_withcarges).toFixed(2)+
				'</span><br/><span> $'+parseFloat(profit).toFixed(2)+'</span><br/>');
		});
	} catch(err) {

	}		
});


//redy state end
});




function get_cutomers() {

	$.post(base_url+"spinners/set_customers", function(data_out) {

		obj = JSON.parse(data_out);

		$.each(obj, function(newquotes , cutomer_value) {
			$('#select-customer').append('<option value="'+cutomer_value.customer_id+'">'+cutomer_value.customer_first_name+'</option>');
		});

		$('#select-customer').filterable('refresh');
	});
} 

function getqutelist() {

		var datacuslist = new Object();

		datacuslist.auth = localStorage.getItem('auth');
		datacuslist.user_id = localStorage.getItem('user_id');
	 	datacuslist.user_type = localStorage.getItem('user_type');

	$.post(base_url+"newqute/get_qutepending", datacuslist, function(data_out) {

	obj = JSON.parse(data_out);

	$.each(obj, function(newquotes, quteval) {
		$('#selectquts').append('<li data-name="'+quteval.quotation_id+'" class="ui-li-static ui-body-inherit ui-first-child">Q'+quteval.quotation_id + '</li>');
		});

	$('#selectquts').listview('refresh');
	});
}


function get_quote_product(qute_id) {

		var dataqute_prodcut = new Object();

		dataqute_prodcut.auth = localStorage.getItem('auth');
		dataqute_prodcut.user_id = localStorage.getItem('user_id');
	 	dataqute_prodcut.user_type = localStorage.getItem('user_type');

	 	dataqute_prodcut.quotation_id = qute_id;	

	$.post(base_url+"newqute/get_qoute_product", dataqute_prodcut, function(data_out) {

		obj = JSON.parse(data_out);

		$.each(obj, function(newquotes, product) { 

			if(product.quote_product_id == "wronguser") {
				window.localStorage.removeItem("customerid");
				window.localStorage.removeItem("globle_qute_id");
				window.location = "newquotes.html";			
			}
			else {
				$('#prduct-table').append('<tr><td>'+product.product_name+'</td><td>'+product.product_description+'</td><td>'+product.product_sup_cost+'</td><td>'+product.quote_product_unite_price+'</td><td>'+product.quote_product_quantity+'</td><td><li class="ui-btn ui-mini" style="background-color:#FF3F31;color:#FFFFFF;" data-name="'+product.quote_product_id+'">Remove</li></td></tr>');			
			}
		});	
	});
}

function get_customer_details() {
		var data = new Object();
		data.auth = localStorage.getItem('auth');
		data.user_id = localStorage.getItem('user_id');
	 	data.user_type = localStorage.getItem('user_type');	
	 	data.customer_id = localStorage.getItem('customer_id');	

			try{
				$.post(base_url+"customers/selected_customer", data ,function(data_out) {
					obj = JSON.parse(data_out);

					$.each(obj, function(newquotes, customer_data) {
						customer_fullname =  customer_data.customer_first_name +" "+customer_data.customer_last_name;
						cutomer_street_address = customer_data.customer_site_address;
						$('#set-fullname').html(customer_fullname);
						$('#set-address').html(cutomer_street_address);
						$('#set-email').html(customer_data.customer_email);
					});
				});
			} catch(err) { }
}

function get_qute_id() {
	try{
		$.post(base_url+"newqute/get_quteid", function(data_out) {

			obj = JSON.parse(data_out);

			$.each(obj, function(newquotes, qute_id_data) {		
				qute_id = qute_id_data.qoute_id;
				var qval = parseInt(qute_id) +1;
				if(localStorage.getItem('globle_qute_id') == null || localStorage.getItem('globle_qute_id') == '') {
					window.localStorage["globle_qute_id"] = qval;
					$('#set-quteid').html(qval);
				}
				else {
					$('#set-quteid').html(localStorage.getItem('globle_qute_id'));
				}
			});			
		});

	} catch(err) { }
}

function set_total_values(qute_id) {
	try {
		var dataqute = new Object();

		dataqute.auth = localStorage.getItem('auth');
		dataqute.user_id = localStorage.getItem('user_id');
	 	dataqute.user_type = localStorage.getItem('user_type');

	 	dataqute.quotation_id = qute_id;

		$.post(base_url+"newqute/get_total_val", dataqute, function(data_out) {
			obj = JSON.parse(data_out);
			var tt = 0;
			$.each(obj, function(newquotes, qute_totals) {

				var unitprice = qute_totals.quote_product_unite_price;
				var qty = qute_totals.quote_product_quantity;

				var unitpriceval = parseInt(unitprice);
				var qtyval = parseInt(qty);

				var tt = unitpriceval * qtyval;

				subtotal = tt + subtotal;
				gst = subtotal * 0.1;
				total = subtotal + gst;
				profit = total - subtotal;

			});

			$('#total-panel').html('<span>$'+parseFloat(subtotal).toFixed(2)+
				'</span><br/><span> $'+parseFloat(gst).toFixed(2)+
				'</span><br/><div id="l-charges"></div>'+
				'<span> $'+parseFloat(total).toFixed(2)+
				'</span><br/><span> $'+parseFloat(profit).toFixed(2)+'</span><br/>');
		});
	} catch(err) {

	}
}

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

function set_hourrate() {

	var data = new Object();

	data.auth = localStorage.getItem('auth');
	data.user_id = localStorage.getItem('user_id');
 	data.user_type = localStorage.getItem('user_type');	

	try {
		$.ajax({url:base_url+"newqute/hourrate",type: "POST", data: data, async: false, success:function(data_out) {

			obj = JSON.parse(data_out);

			$.each(obj, function(homeadmin, getrate) {
				hourlyrate = getrate.admin_hourly_rate;
			});
		}});
	}
	catch(err) {

	}		
}
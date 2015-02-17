var base_url = "http://leoregis.com/thanuja/electrician/";
	
	var quteid;
	var preferreddate, duration;

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
				'<li class="mytab" id="link-viewproduct">'+
					'<a href="#" class="ui-btn ui-btn-inline ui-icon-shop ui-btn-icon-top">Products</a>'+
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

				'<li class="ui-block-e" id="link-viewproduct">'+
					'<a href="#" class="ui-btn ui-btn-inline ui-icon-shop ui-btn-icon-top">Products</a>'+
				'</li>'); 		
 	}


	get_recent_qutes();
	get_electrician();

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
		window.location = "homeadmin.html";
	});	


	$('#selectqutes').on( "click", "li", function() {
		quteid = $(this).attr('data-name');

		getselectedqute_details(quteid);
		getavailable_electianc();
	});

	$("#sedule-submit").on( "click", function(event, ui) {

		var data = new Object();


		data.auth = localStorage.getItem('auth');
		data.user_id = localStorage.getItem('user_id');
	 	data.user_type = localStorage.getItem('user_type');

		data.esitmated_time = localStorage.getItem('duration'); //$("#txt_estimate").val();
		data.prefered_date = localStorage.getItem('preferreddate'); //$("#txt_preferred_date").val();
		data.quteid = quteid;

		var validation = true;
		//get_checkedvalues();

		var checked_electricians = [];

		var data_electrician = new Object();

		data_electrician.auth = localStorage.getItem('auth');
		data_electrician.user_id = localStorage.getItem('user_id');
	 	data_electrician.user_type = localStorage.getItem('user_type');

		$.post(base_url+"alocateelectrician/getelectrician", data_electrician, function(data_out) {	
			obj = JSON.parse(data_out);

			$.each(obj, function(newquotes, electvar) {
				var val = $("#pre-rendered-cb-"+electvar.electrician_id).prop("checked");
				//console.log(val);

				if(val) {
					console.log($("#pre-rendered-cb-"+electvar.electrician_id).val());
					checked_electricians.push(""+$("#pre-rendered-cb-"+electvar.electrician_id).val());
				}
			});
		});


			if(quteid == null) {
				validation = false;
				alert("Please select qute.");			
			}

			if(validation) {

				alert("Successfuly Sheduled...!");

				var success;
				try {
					for (var i = 0; i < checked_electricians.length; i++) {
						console.log(checked_electricians[i]);
						data.electrician_id = checked_electricians[i];

						$.post(base_url+"alocateelectrician/insertavailability", data, function(data_out) {

						obj = JSON.parse(data_out);

						});

						$.post(base_url+"alocateelectrician/insertsedule", data, function(data_out) {

						obj = JSON.parse(data_out);

							$.each(obj, function(alocateelectrician, availability) {
								if(availability.validation) {
									
								}
							});				
						});								
					}
					success = true;
				}
				catch(err) {
					success = false;
				}

				if(success) {
					var result = confirm("Goto home page..!");
					if (result==true) {
					    window.location = "homeadmin.html";
					}
				}
				else {
					alert("Error on sheduling... Please try again.");
				}
		}
	});
});

	function get_recent_qutes() {
		var datacuslist = new Object();

		datacuslist.auth = localStorage.getItem('auth');
		datacuslist.user_id = localStorage.getItem('user_id');
	 	datacuslist.user_type = localStorage.getItem('user_type');

		$.post(base_url+"alocateelectrician/set_resent_qute", datacuslist, function(data_out) {

		obj = JSON.parse(data_out);

		$.each(obj, function(newquotes, quteval) {
			$('#selectqutes').append('<li class="ui-li-static ui-body-inherit ui-first-child" data-name="'+quteval.quotation_id+'">Q'+quteval.quotation_id + '</li>');
			});

		//$('#selectcustomers').listview('refresh');

		});
	}

	function get_electrician() {
		$('#electricians-values').html('');
		var data_electrician = new Object();

		data_electrician.auth = localStorage.getItem('auth');
		data_electrician.user_id = localStorage.getItem('user_id');
	 	data_electrician.user_type = localStorage.getItem('user_type');

		$.post(base_url+"alocateelectrician/getelectrician", data_electrician, function(data_out) {	
			obj = JSON.parse(data_out);

			$.each(obj, function(newquotes, electvar) {
				$('#electricians-values').append('<label for="pre-rendered-cb-'+electvar.electrician_id+'" class="ui-first-child">'+electvar.electrician_name+'</label><input type="checkbox" id="pre-rendered-cb-'+electvar.electrician_id+'" name="pre-rendered-cb-'+electvar.electrician_id+'" value="'+electvar.electrician_id+'">');
			});
			$("#electricians-values").trigger('create');
		});
	}

	function get_checkedvalues() {

		var data_electrician = new Object();

		data_electrician.auth = localStorage.getItem('auth');
		data_electrician.user_id = localStorage.getItem('user_id');
	 	data_electrician.user_type = localStorage.getItem('user_type');

		$.post(base_url+"alocateelectrician/getelectrician", data_electrician, function(data_out) {	
			obj = JSON.parse(data_out);

			$.each(obj, function(newquotes, electvar) {
				var val = $("#pre-rendered-cb-"+electvar.electrician_id).prop("checked");
				//console.log(val);

				if(val) {
					console.log($("#pre-rendered-cb-"+electvar.electrician_id).val());
					checked_electricians.push($("#pre-rendered-cb-"+electvar.electrician_id).val());
				}
			});
		});
	}

	function getselectedqute_details(quteid) {

		var sub_total =0; 
		var cost = 0;
		var total = 0;
		var profit = 0;

		$('#prduct-table').html("");
		var data_qute = new Object();

		data_qute.auth = localStorage.getItem('auth');
		data_qute.user_id = localStorage.getItem('user_id');
	 	data_qute.user_type = localStorage.getItem('user_type');

	 	data_qute.quteid = quteid;

		$.post(base_url+"alocateelectrician/getqutedetails", data_qute, function(data_out) {	
			obj = JSON.parse(data_out);	

			$.each(obj, function(newquotes, dateval) {
				window.localStorage["preferreddate"] = dateval.quotation_preferred_date;
				window.localStorage["duration"] = dateval.quotation_estimated_duration;
				//TODO

				$('#prduct-table').append('<tr><td>'+dateval.product_name+'</td><td>'+dateval.product_description+'</td><td>'+dateval.product_sup_cost+'</td><td>'+dateval.quote_product_unite_price+'</td><td>'+dateval.quote_product_quantity+'</td></tr>');
			

				sub_total = sub_total + parseFloat(dateval.quote_product_unite_price);
				cost = cost + parseFloat(dateval.product_sup_cost);
				total = sub_total +  sub_total * 10/100;

				profit = total - sub_total;
			
				$('#qute-id').html(dateval.quotation_id);
				$('#name').html("dateval.");
				$('#email').html("dateval.");
				$('#quote-date').html(dateval.quotation_preferred_date);
				$('#est-date').html(dateval.quotation_estimated_duration);
				$('#charges').html(dateval.quotation_labour_charges);
				$('#s-total').html(sub_total);



				$('#total').html(total);


				$('#porfit').html(profit);
				

			});
		}); 	
	}

	function getavailable_electianc() {
		$('#electricians-values').html('');
		var data_avalable_electrician = new Object();

		data_avalable_electrician.auth = localStorage.getItem('auth');
		data_avalable_electrician.user_id = localStorage.getItem('user_id');
	 	data_avalable_electrician.user_type = localStorage.getItem('user_type');
	 	data_avalable_electrician.assing_date = localStorage.getItem('preferreddate');
	 	data_avalable_electrician.duration = localStorage.getItem('duration');

	 	$.post(base_url+"alocateelectrician/set_available_electritions", data_avalable_electrician, function(data_out) {
	 		obj = JSON.parse(data_out);	

			$.each(obj, function(newquotes, electvar) {
				$('#electricians-values').append('<label for="pre-rendered-cb-'+electvar.electrician_id+'" class="ui-first-child">'+electvar.electrician_name+'</label><input type="checkbox" id="pre-rendered-cb-'+electvar.electrician_id+'" name="pre-rendered-cb-'+electvar.electrician_id+'" value="'+electvar.electrician_id+'">');
			});

			$("#electricians-values").trigger('create');
	 	});	
	}




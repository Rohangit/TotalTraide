var base_url = "http://leoregis.com/thanuja/electrician/";

$(document).ready(function(){

/*    var orientation = window.orientation;
    var new_orientation = (orientation) ? 0 : 90 + orientation;
    $('body').css({
        "-webkit-transform": "rotate(" + new_orientation + "deg)"
    });*/

	$( "#loginbuttonid" ).bind( "click", function(event, ui) {

				var data = new Object();
				data.username = $("#usernameid").val();
				data.password = $("#passwordid").val();
				$('#usernam_error, #password_error').html('');

				var validation = true;

				if (data.username == '' || data.username == null) 
				{
					validation = false;
					$('#usernam_error').html('Enter your Username.');
				}
				if (data.password == '' || data.password == null) 
				{
					validation = false;
					$('#password_error').html('Enter your Password.');
				}

				if (validation) 
				{
					$('#login-progrss').html("<h3>Lodding.. Please wait</h3>");

					var line = new ProgressBar.Line('#login-progrss', {
					    color: '#FCB03C',
					});

					line.animate(1,  function() {

					});

					data.loginkey = Math.floor((Math.random() * 100) + 1);

					$.post(base_url+"user/login", data ,function(data_out) {
						//console.log(data_out);

						obj = JSON.parse(data_out);

						if (obj.validation == true) 
						{
							window.localStorage["auth"] = obj.auth;
							window.localStorage["user_type"] = obj.user_type; 
							window.localStorage["user_id"] = obj.user_id;

								window.location = "homeadmin.html";

						}
						else if (obj.validation == false)
						{
							alert("Please provide valid information..!");
							window.location = "login.html";
						}
						else
						{
							//error
						}

						
					});
				}
				return false;
			});
		}); 
/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.	See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.	The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.	You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.	See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
		// Application Constructor
	initialize: function() {
			this.bindEvents();
	},
	// Bind Event Listeners
	//
	// Bind any events that are required on startup. Common events are:
	// 'load', 'deviceready', 'offline', and 'online'.
	bindEvents: function() {
			document.addEventListener('deviceready', this.onDeviceReady, true);
	//window.location.assign("file:///C:/xampp/htdocs/ElectricianApp/ElectricianApp/www/homeadmin.html");
	},
	// deviceready Event Handler
	//
	// The scope of 'this' is the event. In order to call the 'receivedEvent'
	// function, we must explicitly call 'app.receivedEvent(...);'
	onDeviceReady: function() {
			app.receivedEvent('deviceready');
	},
	// Update DOM on a Received Event
	receivedEvent: function(id) {
		var parentElement = document.getElementById(id);
		var listeningElement = parentElement.querySelector('.listening');
		var receivedElement = parentElement.querySelector('.received');

		listeningElement.setAttribute('style', 'display:none;');
		receivedElement.setAttribute('style', 'display:block;');

		console.log('Received Event: ' + id);
	}
};

app.initialize();

var base_url = "http://leoregis.com/thanuja/electrician/";



$(document).ready(function() {

/*	var orientation = window.orientation;
    var new_orientation = (orientation) ? 0 : 90 + orientation;
    $('body').css({
        "-webkit-transform": "rotate(" + new_orientation + "deg)"
    });*/

	var data = new Object();

    data.auth = localStorage.getItem('auth');
    data.user_id = localStorage.getItem('user_id');
    data.user_type = localStorage.getItem('user_type');


    $.post(base_url+"user/auth_check", data ,function(data_out) {

        obj = JSON.parse(data_out);

        if(obj.validation) {
        	window.localStorage["auth"] = obj.auth;
        	window.localStorage["user_type"] = obj.user_type; 
        	window.localStorage["user_id"] = obj.user_id;
            
                window.location = "homeadmin.html";
        }
        else {
            window.location = "login.html";
        }
    });
});
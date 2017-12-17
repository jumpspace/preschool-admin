// ***********************************************
// WITH OUR OWN TWO HANDS Student Lookup Page
// 
// Filename: student.js
// Purpose: Javascript companion to student
//   lookup page 
// Version: 1.0.0
// Notes: 
// - Connect to Firebase backend
// - Switch to JQuery
// - Set up Student Lookup
// - Moved initialization outside callback
// - Added Class List
// ***********************************************

'use strict';

// initialize page
var config = {
  apiKey: "AIzaSyA57f4qbD7aJRUaDW-Iq6FbARXJ7mZaylA",
  authDomain: "preschool-register.firebaseapp.com",
  databaseURL: "https://preschool-register.firebaseio.com",
  storageBucket: "preschool-register.appspot.com",
};
firebase.initializeApp(config);
	
var root = firebase.database().ref();
var scheduleRef = root.child("schedule");
var output_morn;
var output_aftr;

function processMaster(dayOfWeek)
{
	'use strict';
	
	scheduleRef.once("value", function (schedSnapshot) {
		if (schedSnapshot.hasChildren()) {
			output_morn = '';
			output_aftr = '';
			
			schedSnapshot.forEach(function (studentDay) {
				var name = studentDay.key;
				var schedList = studentDay.val();

				for (var dayName in schedList) {
					if (dayName == dayOfWeek) {
						if (schedList[dayOfWeek] == 'Morning') {
							output_morn += name + '<br />';
						}
						else if (schedList[dayOfWeek] == 'Afternoon') {
							output_aftr += name + '<br />';
						}
						else { // schedList[dayOfWeek] == 'AllDay'
							output_aftr += name + '<br />';
							output_morn += name + '<br />';
						}
					}
				}
			});
			
			$('#classlist-morning').html(output_morn);
			$('#classlist-afternoon').html(output_aftr);
		}
	});
}

function init()
{
	'use strict';
	
	var dayOfWeek;
	
	$('select').change(function () {
		dayOfWeek = $('select option:selected').val(); 
		processMaster(dayOfWeek);
	});
	//
}

$(document).ready(init);
// ***********************************************
// WITH OUR OWN TWO HANDS Student Lookup Page
// 
// Filename: student.js
// Purpose: Javascript companion to student
//   lookup page 
// Version: 0.9.7
// Notes: 
// - Connect to Firebase backend
// - Switch to JQuery
// - Set up Student Lookup
// - Moved initialization outside callback
// ***********************************************

'use strict';

$(document).ready(function () { 
    // initialize page
	var config = {
		apiKey: "AIzaSyA57f4qbD7aJRUaDW-Iq6FbARXJ7mZaylA",
		authDomain: "preschool-register.firebaseapp.com",
		databaseURL: "https://preschool-register.firebaseio.com",
		storageBucket: "preschool-register.appspot.com",
	};
	firebase.initializeApp(config);

	var root = firebase.database().ref();
	var studentRef = root.child("student");
	var scheduleRef = root.child("schedule");
	
	$('button[name="details"]').click(function () { 
		var studentName = $('#studentName').val();
		
		// capitalize first letter of name
		studentName = studentName.toLowerCase().charAt(0).toUpperCase() + studentName.slice(1);
		
		var studentDetails = studentRef.child(studentName);
		var studentSchedule = scheduleRef.child(studentName);
		
		// student information
		var dateOfBirth;
		var firstName;
		var lastName;
		
		// student schedule
		var mondaySchedule;
		var tuesdaySchedule;
		var wednesdaySchedule;
		var thursdaySchedule;
		var fridaySchedule;
		
		studentDetails.once("value", function (studentSnapshot) { 
			if (studentSnapshot.hasChildren()) { 
			  dateOfBirth = studentSnapshot.child("dateofbirth").val();
			  firstName = studentSnapshot.child("firstName").val();
			  lastName = studentSnapshot.child("lastName").val();
			  
			  $('#studentRecord').html( 
				'<h2>' + firstName + ' ' + lastName + '</h2>' + 
				'Date Of Birth: ' + dateOfBirth
			  );
			}
			else { 
				$('#studentRecord').text('Student does not exist. Please enter another name.');
			}
		});
		
		studentSchedule.once("value", function (scheduleSnapshot) { 
			if (scheduleSnapshot.hasChildren()) { 
				mondaySchedule = scheduleSnapshot.child("monday").val();
				if (!mondaySchedule) { 
					mondaySchedule = '';
				}
				
				tuesdaySchedule = scheduleSnapshot.child("tuesday").val();
				if (!tuesdaySchedule) { 
					tuesdaySchedule = '';
				}
				
				wednesdaySchedule = scheduleSnapshot.child("wednesday").val();
				if (!wednesdaySchedule) { 
					wednesdaySchedule = '';
				}
				
				thursdaySchedule = scheduleSnapshot.child("thursday").val();
				if (!thursdaySchedule) { 
					thursdaySchedule = '';
				}
				
				fridaySchedule = scheduleSnapshot.child("friday").val();
				if (!fridaySchedule) {
					fridaySchedule = '';
				}
				
				$('#studentSchedule').html( 
					'Monday: ' + mondaySchedule + '<br />' + 
					'Tuesday: ' + tuesdaySchedule + '<br />' + 
					'Wednesday: ' + wednesdaySchedule + '<br />' + 
					'Thursday: ' + thursdaySchedule + '<br />' + 
					'Friday: ' + fridaySchedule 
				);
			}
			else { 
				$('#studentSchedule').text('This student has no schedule yet');
			}
		});
	});
 });
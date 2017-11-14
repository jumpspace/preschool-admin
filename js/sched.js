// ***********************************************
// WITH OUR OWN TWO HANDS Scheduling Page
// 
// Filename: sched.js
// Purpose: Javascript companion to scheduling page 
// Version: 0.9.7
// Notes: 
// - Connect to Firebase backend
// - Set up scheduling
// - Switch to JQuery
// ***********************************************

// global - schedref: handle to schedule portion of firebase app
//var schedref = new Firebase('https://preschool-register.firebaseIO.com/schedule');
var config = {
  apiKey: "AIzaSyA57f4qbD7aJRUaDW-Iq6FbARXJ7mZaylA",
  authDomain: "preschool-register.firebaseapp.com",
  databaseURL: "https://preschool-register.firebaseio.com",
  storageBucket: "preschool-register.appspot.com",
};
firebase.initializeApp(config);

var schedref = firebase.database().ref("schedule");

// retrieve schedule of all students from firebase 
// and display in a table
function getSchedule(dbsnapshot)
{
	'use strict';
	
	if (dbsnapshot.hasChildren()) 
	{
		var tableoutput;
		var weekNames = ["monday","tuesday","wednesday","thursday","friday"];
		var weekTotals = [0,0,0,0,0];
		var morningTotals = [0,0,0,0,0];
		var afternoonTotals = [0,0,0,0,0];
		var studentCount = 0; 
		var weekdayCount = [0,0,0,0,0];
		var subtotals;
		
		// top of table
		tableoutput = '<table border="1">';
		
		// table header
		tableoutput += '<tr><th>Student</th><th>Monday</th><th>Tuesday</th>';
		tableoutput += '<th>Wednesday</th><th>Thursday</th><th>Friday</th>';
		tableoutput += '</tr>';
		
		// fetch and display students and their schedules
		dbsnapshot.forEach(function (studentWeek) { 
		  var studentName = studentWeek.key;
		  var studentSchedule = studentWeek.val();
		  
		  // table body
		  tableoutput += '<tr>';
		
		  // student name
		  tableoutput += '<td>' + studentName + '</td>';
		  studentCount++;
		  
		  // weekly schedule
		  for (var counter = 0; counter < weekNames.length; counter++)
		  {
			  var dayOfWeek = weekNames[counter];
			  if (dayOfWeek in studentSchedule)
			  {
				  tableoutput += '<td>' + studentSchedule[dayOfWeek] + '</td>';
				  weekTotals[counter]++;
				  if (studentSchedule[dayOfWeek] == 'Morning' || studentSchedule[dayOfWeek] == 'AllDay')
				  {
					  morningTotals[counter]++;
				  }
				  
				  if (studentSchedule[dayOfWeek] == 'Afternoon' || studentSchedule[dayOfWeek] == 'AllDay')
				  {
					  afternoonTotals[counter]++;
				  }
			  }
			  else
			  {
				  tableoutput+= '<td></td>';
			  }
		  }
		  
		  // end of body
		  tableoutput += '</tr>';
		});
		
		// bottom of table
		tableoutput += '</table>';
		$('#stdrost').html(tableoutput); 
		
		subtotals = "Total students: " + studentCount + '<br /><br />';
		
		for (var counter = 0; counter < weekTotals.length; counter++)
		{
			subtotals += weekNames[counter] + ": " + weekTotals[counter] + "<br />";
		}
		
		subtotals += "<br />";
		
		for (var counter2 = 0; counter2 < weekTotals.length; counter2++)
		{
			subtotals += weekNames[counter2] + " morning: " + morningTotals[counter2] + "<br />";
			subtotals += weekNames[counter2] + " afternoon: " + afternoonTotals[counter2] + "<br /><br />";
		}
		
		$('#totals').html(subtotals);
	}
	else 
	{
		('#stdrost').text('You have no students!');
	}
}

function init()
{
	'use strict';
	
	schedref.on("value", getSchedule, function (err) { 
	  console.log(err); 
	});
}

$(document).ready(init);
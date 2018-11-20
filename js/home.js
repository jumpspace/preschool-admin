// ***********************************************
// WITH OUR OWN TWO HANDS Main Page
// 
// Filename: home.js
// Purpose: Javascript companion to main page 
// Version: 0.9.7
// Notes: 
// - Main Page
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

// initialize
var root = firebase.database().ref();
var scheduleref = root.child("schedule");
var studentref = root.child("student");
var sysref = root.child("system");

function GetDayOfWeekName(dayNum)
{
	var dayText;
	
	switch (dayNum)
	{
		case 0: dayText = 'Sunday'; break;
		case 1: dayText = 'Monday'; break;
		case 2: dayText = 'Tuesday'; break;
		case 3: dayText = 'Wednesday'; break;
		case 4: dayText = 'Thursday'; break;
		case 5: dayText = 'Friday'; break;
		case 6: dayText = 'Saturday'; break;
		default: dayText = 'Unknown'; break;
	}
	
	return dayText;
}

function GetMonthName(monthNum)
{
	var monthText;
	
	switch (monthNum)
	{
		case 0: monthText = 'January'; break;
		case 1: monthText = 'February'; break;
		case 2: monthText = 'March'; break;
		case 3: monthText = 'April'; break;
		case 4: monthText = 'May'; break;
		case 5: monthText = 'June'; break;
		case 6: monthText = 'July'; break;
		case 7: monthText = 'August'; break;
		case 8: monthText = 'September'; break;
		case 9: monthText = 'October'; break;
		case 10: monthText = 'November'; break;
		case 11: monthText = 'December'; break;
		default: monthText = 'Unknown'; break;
	}
	
	return monthText;
}

$(document).ready(function () {
	'use strinct';
	
	var now = new Date();
	var dateline;
	
	dateline = GetDayOfWeekName(now.getDay()) + ", " + GetMonthName(now.getMonth()) + " " + now.getDate() + ", " + now.getFullYear(); 
	$('#todaysDate').text(dateline);
});
// ***********************************************
// WITH OUR OWN TWO HANDS Configuration Page
// 
// Filename: sys.js
// Purpose: Javascript companion to configuration
//   page 
// Version: 0.9.7
// Notes: 
// - Set up Configuration/Setup Page
// ***********************************************

// Initialize Firebase configuration
var config = {
  apiKey: "AIzaSyA57f4qbD7aJRUaDW-Iq6FbARXJ7mZaylA",
  authDomain: "preschool-register.firebaseapp.com",
  databaseURL: "https://preschool-register.firebaseio.com",
  storageBucket: "preschool-register.appspot.com",
};
firebase.initializeApp(config);

// initialize
var root = firebase.database().ref();
var sysroot = root.child("system");
var startOfSchool;

$(document).ready(function () { 
  'use strict';
  
  // retrieve current start date
  sysroot.on("value", function (datasnapshot) { 
    $('#output').text('Current Start Date: ' + datasnapshot.child("schoolYear").val()); 
  });
  $('#frmConfig').submit(function () { 
    
	// get new start date from user and display
	startOfSchool = $('#schoolYear').val();
	$('#output').text('Current School Year: ' + startOfSchool);
	$('#schoolYear').val('');
	
	// write new start date to storage
	sysroot.set({ schoolYear: startOfSchool });
	return false;
  });
 });
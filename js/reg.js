// ***************************************************
// WITH OUR OWN TWO HANDS Registration Page
// 
// Filename: reg.js
// Purpose: Javascript companion to registration page 
// Version: 0.9.7
// Notes: 
// - Connect to Firebase backend
// - Register student and assign days
// - Switch to JQuery
// ***************************************************

// connect to firebase and set up structure
// var root = new Firebase('https://preschool-register.firebaseIO.com/');

// Initialize Firebase configuration
var config = {
  apiKey: "AIzaSyA57f4qbD7aJRUaDW-Iq6FbARXJ7mZaylA",
  authDomain: "preschool-register.firebaseapp.com",
  databaseURL: "https://preschool-register.firebaseio.com",
  storageBucket: "preschool-register.appspot.com",
};
firebase.initializeApp(config);

var root = firebase.database().ref();
var studentref = root.child('student');
var schedref = root.child('schedule');
var sysref = root.child('system');

var schoolYearRef = sysref.child('schoolYear');
var regVal;     // registration date

function setSchoolStart()
{
  'use strict';
  
  schoolYearRef.on('value', function (dataSnapShot) {
    regVal = dataSnapShot.val();
    $('.school-start').text(dataSnapShot.val());
  });
}

// determine whether student birthdate is greater than registration date
function checkDate()
{
  'use strict';
  
  var dobval;     // value of dob user input (string)
  var dobDate;    // date of birth from user input
  var regDate;    // date of start of school
  
  dobval = $('#dob').val();

  if (dobval)
  {
		dobDate = new Date(dobval);
    regDate = new Date(regVal);	
	
    if (dobDate.getTime()) // valid date
    { 
	  if ((regDate.getFullYear() - dobDate.getFullYear()) < 3.00)
      {
		$('#errMsg').text('Child too young.');
		$('#submit').prop('disabled', true);
      }
      else if ((regDate.getFullYear() - dobDate.getFullYear()) > 5.00)
      {
		$('#errMsg').text('Child too old.');
		$('#submit').prop('disabled', true);
      }
	  else // correct age range
	  {
		$('#errMsg').text(' ');
	    $('#submit').prop('disabled', false);
	  }
    }
    else // invalid date
    {
	  $('#errMsg').text('Invalid Date!');
	  $('#submit').prop('disabled', true);
    }  // end if
  }
  else // invalid input
  {
	$('#errMsg').text('Invalid Date!');
	$('#submit').prop('disabled', true);
  }
} // end checkDate()

// set schedule for student
function setSchedule(stdnt)
{
  'use strict';
  
  // store student schedule by first name
  if ($('#monday').prop('checked'))
  {
	  schedref.child(stdnt).child($('#monday').val()).set($('#sched_mon').val());
  }
  
  if ($('#tuesday').prop('checked'))
  {
	  schedref.child(stdnt).child($('#tuesday').val()).set($('#sched_tue').val());
  }
  
  if ($('#wednesday').prop('checked'))
  {
	  schedref.child(stdnt).child($('#wednesday').val()).set($('#sched_wed').val());
  }
  
  if ($('#thursday').prop('checked'))
  {
	  schedref.child(stdnt).child($('#thursday').val()).set($('#sched_thu').val());
  }
  
  if ($('#friday').prop('checked'))
  {
	  schedref.child(stdnt).child($('#friday').val()).set($('#sched_fri').val());
  }
}

// process form data
function process()
{
  'use strict';
  
  var fname = $('#firstName').val();
  var lname = $('#lastName').val();
  var dobval = $('#dob').val();
  
  var onComplete = function (error) { 
		if (error) 
		{ 
			$('#output2').text('not successful'); 
		} 
		else 
		{ 
			$('#output2').text('successful'); 
		} 
  }; 
  
  studentref.child(fname).set({ firstName: fname, lastName: lname, dateofbirth: dobval });
  setSchedule(fname);
  
  // return false;   // prevent page from refreshing
}  // end process()

function init()
{
  'use strict';
  
  setSchoolStart();
  $('#frmReg').submit(process);
  $('#dob').blur(checkDate);
}

$(document).ready(init);
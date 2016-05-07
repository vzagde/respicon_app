/*
* push notification
*/
document.addEventListener("deviceready", onDeviceReady, false);
var regID = '';
function onDeviceReady() {
    // alert('in deviceready');
    var push = PushNotification.init({ "android": {"senderID": "909048204516"},
    "ios": {"alert": "true", "badge": "true", "sound": "true"}, "windows": {} } );

    push.on('registration', function(data) {
        // alert(data.registrationId);
        regID = data.registrationId;
        localStorage.setItem('regID', data.registrationId);
        $.ajax({
            url: 'http://casaestilo.in/respicon_app/respicon_admin/index.php/api/addPush',
            type: 'POST',
            dataType: 'JSON',
            data: {registrationId: data.registrationId},
        })
        .done(function() {
            console.log("success");
            // alert('success');
        })
        .fail(function() {
            console.log("error");
            // alert('error');
        })
        .always(function() {
            console.log("complete");
            // alert('complete');
        });
    });

    push.on('notification', function(data) {
        document.addEventListener("resume", onResume(data.title,data.message), false);
    });

    push.on('error', function(e) {
        // alert(e.message);
    });
}

$(document).ready(function() {

   $('.menu-btn').click(function(){
      console.log('fadein');
      $('.menu-detail').show();
   }); 
   $('.menu-btn-rotate').click(function(){
        console.log('fadeout');
        $('.menu-detail').hide();
   });
    var tabs = '';
    for (var i = 1; i < 4; i++) {
    	console.log(i);
    	tabs = tabs + '#tab' + i + ','; 
    }
    tabs = tabs.substring(0,(tabs.length-1));
    $(tabs).change(function() {
  	// console.log('hi');
  	for (i=1;i<4; i++) {
  		if ($("#tab"+i).is(":checked")) {
  			$('#label'+i).css('border-bottom', '2px solid #000');
  		} else {
  			$('#label'+i).css('border-bottom', 'none');
  		}
  	}
  });

   for (var i = 1; i < 6; i++) {
    	//console.log(i);
    	tabs = tabs + '#tab' + i + i + ','; 
    }
    tabs = tabs.substring(0,(tabs.length-1));
    $(tabs).change(function() {
  	// console.log('hi');
  	for (i=1;i<6; i++) {
  		if ($("#tab"+i+i).is(":checked")) {
  			$('#inner-label'+i).css('border-bottom', '2px solid #000');
  		} else {
  			$('#inner-label'+i).css('border-bottom', 'none');
  		}
  	}
  });

});

var base_url = 'http://casaestilo.in/respicon_app/respicon_admin/api/';
var base_img_url = 'http://casaestilo.in/respicon_app/respicon_admin/assets/uploads/profile_pic/';
var app_history = []; 

function loadView (argument) {
  app_history.push(argument);
  console.log('in loadview: '+app_history);

  $.ajax({
    url: argument,
    type: 'GET',
    dataType: 'html',
    async: false,
  })
  .done(function(data) {
    console.log("success:");
    $('.container').html(data);
  })
  .fail(function() {
    console.log("error");
  })
  .always(function() {
    console.log("complete");
  });
}

function backView () {
  app_history.pop();
  var argument = app_history.pop();
  console.log('backView: '+argument);

  $.ajax({
    url: argument,
    type: 'GET',
    dataType: 'html',
    async: false,
  })
  .done(function(data) {
    console.log("success:");
    $('.container').html(data);
  })
  .fail(function() {
    console.log("error");
  })
  .always(function() {
    console.log("complete");
  });
}

document.addEventListener("backbutton", function () {
  if (app_history.length>1) {
    backView();
  } else {
    navigator.notification.confirm(
       'Do you want to quit', 
       function (argument) {
        if (argument=='1') {
          navigator.app.exitApp(); 
        }
       }, 
       'QUIT TITLE', 
       'OK,Cancel'  
    );
  }
}, false);


function open_email (argument) {
  console.log('in mail:'+argument);
  window.open('mailto:'+argument, '_system');
}

function open_call (argument) {
  window.open('tel:'+argument, '_system');
}

function alertDismissed() {
    // do something
}

function add_to_contact (name, phone) {

  // create a new contact object
  var contact = navigator.contacts.create();
  contact.displayName = name;
  contact.nickname = name;            // specify both to support all devices

  // populate some fields
  var name = new ContactName();
  name.givenName = "name";
  name.familyName = "";
  contact.name = name;

  // store contact phone numbers in ContactField[]
  var phoneNumbers = [];
  phoneNumbers[0] = new ContactField('work', phone, true);
  contact.phoneNumbers = phoneNumbers;

  // save to device
  contact.save(onSuccessContatct, onErrorContatct);
}

function onSuccessContatct (contact) {
    // alert("Save Success");
    navigator.notification.alert(
          'Save Success',  // message
          alertDismissed,         // callback
          'Success',            // title
          'Ok'                  // buttonName
    );
}

function onErrorContatct (contactError) {
    alert("Error = " + contactError.code);
    navigator.notification.alert(
      'Save Fail',        // message
      alertDismissed,     // callback
      'Error',            // title
      'Ok'                // buttonName
    );
}


loadView('home.html');

setTimeout(function(){
  go_home();
}, 5000);

function go_home () {
  var registered = Lockr.get('registered');
  console.log('registered: '+registered);
  if (registered=='true') {
    loadView('brochure.html');
  } else {
    loadView('register.html');
  }
}

function toggle () {
  // $('.sub-mennu').css('display', 'block');
  $('.sub-menu').toggle();
  // console.log('deg: '+$('.sub-menu-icon').css('transform'));
  // $('.sub-menu-icon').css('transform', 'rotate(180deg)');
  $('.sub-menu-icon').toggleClass('rotate');
}



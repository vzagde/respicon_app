(function () {

myHTMLInclude();

function myHTMLInclude() {
  var z, i, a, file, xhttp;
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
    if (z[i].getAttribute("w3-include-html")) {
      a = z[i].cloneNode(false);
      file = z[i].getAttribute("w3-include-html");
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
          a.removeAttribute("w3-include-html");
          a.innerHTML = xhttp.responseText;
          z[i].parentNode.replaceChild(a, z[i]);
          var registered = Lockr.get('registered');
          console.log('registered: '+registered);
          if (registered=='true') {
            console.log('registered succees');
            var name = Lockr.get('name');
            console.log('name: '+name);
            // xhttp.responseText.replace("Hello", "Hello "+name);
            // console.log('responseText: '+xhttp.responseText);
            $('.user-logo-name').html('hello '+name);
            $('#register_menu').hide();
          }
          myHTMLInclude();
        }
      }      
      xhttp.open("GET", file, false);
      xhttp.send();
      return;
    }
  }
}

})();
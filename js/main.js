
$(document).ready(function () {
  var rndmApiCall = 'https://randomuser.me/api/?format=json&results=12&inc=gender,email,location,phone,dob,name,picture&nat=US';
  function displayEmpCards(response){
    var empCard = '<div id="empList">';
    $.each(response.results, function(idx, emp){
      empCard += '<div class="empCard">';
      empCard += '<section class="imgwrapper">';
      empCard += '<img src="' + emp.picture.large + '">';
      empCard += '</section>';
      empCard += '<section class="empInfo">';
      empCard += '<h2>' + emp.name.first + ' ' + emp.name.last +'</h2>';
      empCard += '<p>' + emp.email + '</p>';
      empCard += '<p>' + emp.location.city + '</p>';
      empCard += '</section>';
      empCard += '<section class="addtlInfo">';
      empCard += '<p>' + emp.phone + '</p>';
      empCard += '<p>' + emp.location.street +' '+ emp.location.city +', '+ emp.location.state + '</p>';
      var dob = emp.dob.date.split('');
      var dobfrmtd= dob[5] + dob[6] + '/' + dob[8]+ dob[9] + '/' + dob[2] + dob[3];
      empCard += '<p>' + dobfrmtd + '</p>';
      empCard += '</section>';
      empCard += '</div>';

    });
    console.log(empCard);
      empCard += '</div>';
      $('main').html(empCard);
      $('main').click(function(){
        alert("Triggered by a " + event.target.nodeName + " element.");
      });
  }
  $.getJSON(rndmApiCall, displayEmpCards); // end getJSON

  //Modal



}); // end ready

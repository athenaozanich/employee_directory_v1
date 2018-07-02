
$(document).ready(function () {
  var rndmApiCall = 'https://randomuser.me/api/?format=json&results=12&inc=gender,email,location,phone,dob,name,picture&nat=US';
  function displayEmpCards(response){
    var empCard = '<div id="empList">';
    $.each(response.results, function(idx, emp){
      empCard += '<div class="empCard--'+ idx +'">';
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
      empCard += '</div>';
      $('main').html(empCard);

  }
  $.getJSON(rndmApiCall, displayEmpCards); // end getJSON
  //Modal
  $('main').on( "click", '[class*="empCard--"]', function(){
    $('#overlay [class*="empCard--"]').remove();
    $('#overlay').css({"display":"block"});
    var cards = document.querySelectorAll('[class*="empCard--"]');
    for (var i = 0; i < cards.length; i++) {

      if (cards[i] === this) {
        var currIdx = i;
        $('#overlay').on( "click", '#close',function(){
            $('#overlay').css({"display":"none"});
        });
          $('#overlay').on( "click", '#prev',function(){
            currIdx--;
            $('#overlay [class*="empCard--"]').remove();
            $('.empCard--'+currIdx).clone().appendTo( '#overlay' );
            $('#overlay .empCard--'+currIdx ).addClass("modal");
            $('#overlay .empCard--'+currIdx+' .imgwrapper').css({"display":"block"});
            $('#overlay .empCard--'+currIdx+' .empInfo').css({"text-align":"center"});
            $('#overlay .empCard--'+currIdx+' .addtlInfo').css({"display":"block"});
            console.log(currIdx);
            if (currIdx < 0) {
              $('#overlay').css({"display":"none"});
              currIdx = 0;
            }
          });
          $('#overlay').on( "click", '#next',function(){
              $('#overlay [class*="empCard--"]').remove();
              currIdx++;
              $('.empCard--'+currIdx).clone().appendTo( '#overlay' );
              $('#overlay .empCard--'+currIdx ).addClass("modal");
              $('#overlay .empCard--'+currIdx+' .imgwrapper').css({"display":"block"});
              $('#overlay .empCard--'+currIdx+' .empInfo').css({"text-align":"center"});
              $('#overlay .empCard--'+currIdx+' .addtlInfo').css({"display":"block"});
              console.log(currIdx);
              if (currIdx > 11) {
                $('#overlay').css({"display":"none"});
                  currIdx = 0;
              }
          });
        var cardsIdx = cards[i];
        $('.empCard--'+currIdx).clone().appendTo( '#overlay' );
        $('#overlay .empCard--'+currIdx ).addClass("modal");
        $('#overlay .empCard--'+currIdx+' .imgwrapper').css({"display":"block"});
        $('#overlay .empCard--'+currIdx+' .empInfo').css({"text-align":"center"});
        $('#overlay .empCard--'+currIdx+' .addtlInfo').css({"display":"block"});


      }
    }




  });


}); // end ready

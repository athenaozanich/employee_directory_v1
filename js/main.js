
$(document).ready(function () {
  var rndmApiCall = 'https://randomuser.me/api/?format=json&results=12&inc=gender,email,location,phone,dob,name,picture&nat=US';
  function displayEmpCards(response){
    var empCard = '<div id="empList">';
    $.each(response.results, function(idx, emp){
          empCard += `<div class="empCard--${idx}">
          <section class="imgwrapper">
          <img src="${emp.picture.large}">
          </section>
          <section class="empInfo">
          <h2 class="empName">${emp.name.first} ${emp.name.last}</h2>
          <p>${emp.email}</p>
          <p>${emp.location.city}</p>
          </section>
          <section class="addtlInfo">
          <p>${emp.phone}</p>
          <p>${emp.location.street.name} ${emp.location.city} ${emp.location.state}</p>`;
          var dob = emp.dob.date.split("");
          var dobfrmtd = `${dob[5]}${dob[6]}/${dob[8]}${dob[9]}/${dob[2]}${dob[3]}`;
          empCard += `<p>${dobfrmtd}</p>
          </section>
          </div>`;
    });
      empCard += '</div>';
      (function myLoop (i) {
        setTimeout(function () {      //  your code here
          $('main').html(empCard);
          if (--i) myLoop(i);      //  decrement i and call myLoop again if i > 0
        }, 100)
      })(response.results.length);

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
            console.log(currIdx);
            if (currIdx < 0) {
              currIdx = 11;
            }
            $('#overlay [class*="empCard--"]').remove();
            $('.empCard--'+currIdx).clone().appendTo( '#overlay' );
            $('#overlay .empCard--'+currIdx ).addClass("modal");
            $('#overlay .empCard--'+currIdx+' .imgwrapper').css({"display":"block"});
            $('#overlay .empCard--'+currIdx+' .empInfo').css({"text-align":"center"});
            $('#overlay .empCard--'+currIdx+' .addtlInfo').css({"display":"block"});
          });
          $('#overlay').on( "click", '#next',function(){
            currIdx++;
            if (currIdx > 11) {
                currIdx = 0;
            }
            $('#overlay [class*="empCard--"]').remove();
            $('.empCard--'+currIdx).clone().appendTo( '#overlay' );
            $('#overlay .empCard--'+currIdx ).addClass("modal");
            $('#overlay .empCard--'+currIdx+' .imgwrapper').css({"display":"block"});
            $('#overlay .empCard--'+currIdx+' .empInfo').css({"text-align":"center"});
            $('#overlay .empCard--'+currIdx+' .addtlInfo').css({"display":"block"});
          });
          $('.empCard--'+currIdx).clone().appendTo( '#overlay' );
          $('#overlay .empCard--'+currIdx ).addClass("modal");
          $('#overlay .empCard--'+currIdx+' .imgwrapper').css({"display":"block"});
          $('#overlay .empCard--'+currIdx+' .empInfo').css({"text-align":"center"});
          $('#overlay .empCard--'+currIdx+' .addtlInfo').css({"display":"block"});


      }
    }




  });

  $('#search').bind('input', function() {
       var searchStr = $(this).val().toLowerCase();
       $('.empName').each(function() {

            var str = $(this).text().toLowerCase();
            console.log(this);
            if(str.indexOf(searchStr) > -1) {
                 $(this).parent().parent().show();
            }else {
                 $(this).parent().parent().hide();
            }
       });
  });


}); // end ready



$(document).ready(function(){
  $('.flash').delay(2500).fadeOut(1000);

  $('nav').hide()
  $('nav').delay(2000).appendTo('header').fadeIn(1000);

// diffs
  var button = $('#btn');
  var output = document.getElementById("result");
  button.on('click', function(){
    var original = $('#original').val();
    var revised = $('#revised').val();
    w = new WebDiff(original, revised);
    output.innerHTML="<div class='result-info'>Implied edits: <br/><br/><br/></div>" + w.compare();
  })


//memory game
  var num = 8; // number of card types
  play(num);
  $('#reset').on('click', function(){reset(num)})
  $('#memory-btn').on('click', function(){
   num = $('#pickNumber').val();
   reset(num);
  })

});

  
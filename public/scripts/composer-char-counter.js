/* global $ */
/* global document */

$(document).ready(function() {
  // let counter = $('#counter');
  // console.log('composer-char-counter is loaded into indexed.html');  //not showing on console!!!
  
  $("#tweet-text").on("input", function() {
    const maxLength = 140;
    const tweetLength = $(this).val().length;
    const textRemaining = maxLength - tweetLength;

    let counter = $('.maxCounter');
    counter.html(textRemaining);
    let currentCount = $('.currentCounter');
    currentCount.html(maxLength);

    // how do I do this in a css file?
    if (textRemaining < 0) {
      counter.css('color', '#FF0000');
      currentCount.css('color', '#FF0000');
    } else {
      counter.css('color', '#000000');
      currentCount.css('color', '#000000');
    }

  });


});
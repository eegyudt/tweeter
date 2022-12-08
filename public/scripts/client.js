/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

/* global $ */
/* global document */


$(document).ready(function() {

  // console.log('hello');

  // const $tweetSection = $('.tweet-container');


  const createTweet = function(tweet) {
    tweet.content.text = $("<div>").text(tweet.content.text).html();
    const $tweet = $(`
  
      <article class="tweet">
          <header class="tweet-header">
            <div class="name-avatar">
              <img name=avatarPic src=${tweet.user.avatars}>
              <div class="client-name" name="name">${tweet.user.name}</div>
            </div>
            <div class="handle" name="handle">${tweet.user.handle}</div>
          </header>
          <div class="tweet-text" name="tweetText">${tweet.content.text}</div>
          <footer>
          <div>${timeago.format(tweet.created_at)}</div>
            <div class="image-class">
              <i class="fa-solid fa-flag"></i>
              <i class="fas fa-retweet"></i>
              <i class="fa-solid fa-heart"></i>
            </div>
          </footer>
        </article>
  
      `);

    return $tweet;
  };

  const renderTweets = function(tweets) {
    $('.tweet-container').empty();
    for (const tweet of tweets) {
      const $tweet = createTweet(tweet);
      // const $tweetSection = $('.tweet-container');
      $('.tweet-container').prepend($tweet);
    }
  };




  $('#form').submit(function(event) {
    event.preventDefault();
    $('#error-print').slideUp(400).empty();
    // $('#error-print').empty();
    // const text = $("<div>").text($("#tweet-text").val());
    const text2 = $("#tweet-text").val();
    // get the data from the form (urlencoded data)
    const data = $(this).serialize();
    // console.log(data);


    //!!!!!!!!!!!!check how I can use the text constans instead!!!
    // !!!!!!!!!!!check how I can make the textbox stop from getting stuck during first slide down
    // check alignment of navbar message
    // should the page have a border around it?

    if (!text2) {
      $('#error-print').empty();
      const $errorMessage = "⚠ Please enter something before pressing the button! ⚠";
      $('#error-print').text($errorMessage).slideDown();
      $('#error-print').css('border-style', 'dotted');
      return;
    } else if (text2.length > 140) {
      $('#error-print').empty();
      const $errorMessage = "⚠ Your tweet is too long, you can only enter 140 characters! ⚠";
      $('#error-print').text($errorMessage).slideDown();
      $('#error-print').css('border-style', 'dotted');
      return;
    }


    // make a post request to the server
    $("#form")[0].reset();
    $.ajax({
      method: 'post',
      url: '/tweets',
      data
    }).then(loadTweets);

    // $.post('/tweets', data, (response) => {
    //   console.log(response);
    // fetchTweets(); // GET
  });

  const loadTweets = function() {
    $.ajax({
      method: 'get',
      url: '/tweets',
    }).then(renderTweets);
    // $.get('/tweets', function(tweets) {
    //   // console.log(tweets);
    //   renderTweets(tweets);
    // });
  };


  loadTweets();

});






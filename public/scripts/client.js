/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

/* global $ */
/* global document */


$(document).ready(function() {

  // Create tweet
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

  // Render tweets
  const renderTweets = function(tweets) {
    $('.tweet-container').empty();
    for (const tweet of tweets) {
      const $tweet = createTweet(tweet);
      $('.tweet-container').prepend($tweet);
    }
  };

  // Get tweet from the form
  $('#form').submit(function(event) {
    event.preventDefault();
    $('#error-print').slideUp(400).empty();
    const text = $("#tweet-text").val();
    const data = $(this).serialize();

    // Check if tweet text is empty or longer than 140 characters
    if (!text) {
      $('#error-print').empty();
      const $errorMessage = "⚠ Please enter something before pressing the button!";
      $('#error-print').text($errorMessage).slideDown();
      return;
    } else if (text.length > 140) {
      $('#error-print').empty();
      const $errorMessage = "⚠ Your tweet is too long, you can only enter 140 characters!";
      $('#error-print').text($errorMessage).slideDown();
      return;
    }

    // Make a post request to the server
    $("#form")[0].reset();
    $.ajax({
      method: 'post',
      url: '/tweets',
      data
    }).then(loadTweets);
    $('.maxCounter').text('140');
  });

  // Render tweets on the website
  const loadTweets = function() {
    $.ajax({
      method: 'get',
      url: '/tweets',
    }).then(renderTweets);
  };

  // Compose button on navigation bar
  $('.right-nav').click(function(event) {
    event.preventDefault();
    $('#tweet-text').focus();
  });

  loadTweets();
});
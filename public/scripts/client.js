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
    console.log(tweet);
    const $tweet = $(`
  
      <article class="tweet">
          <header class="tweet-header">
            <div class="name-avatar">
              <img name=avatarPic src=${tweet.user.avatars}>
              <div class="client-name" name="name">${tweet.user.name}</div>
            </div>
            <div class="handle" name="handle">${tweet.user.handle}</div>
          </header>
          <p>
            <content class="tweet-text" name="tweetText">${tweet.content.text}</content>
          </p>
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
    // get the data from the form (urlencoded data)
    const data = $(this).serialize();
    // make a post request to the server
    $("#form")[0].reset();
    $.ajax({
      method: 'post',
      url: '/tweets',
      data
    }).then(fetchTweets);

    // $.post('/tweets', data, (response) => {
    //   console.log(response);
    // fetchTweets(); // GET
  });

  const fetchTweets = function() {
    $.ajax({
      method: 'get',
      url: '/tweets',
    }).then(renderTweets);
    // $.get('/tweets', function(tweets) {
    //   // console.log(tweets);
    //   renderTweets(tweets);
    // });
  };


  fetchTweets();

});






/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

/* global $ */
/* global document */


$(() => {

  // console.log('hello');

  const $tweetSection = $('.tweet-container');


  const createTweet = (tweet) => {
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

  const renderTweets = (tweets) => {
    for (const tweet of tweets) {
      const $tweet = createTweet(tweet);
      const $tweetSection = $('.tweet-container');
      $tweetSection.append($tweet);
    }
  };


  const fetchTweets = () => {
    $.get('/tweets', (tweets) => {
      // console.log(tweets);
      renderTweets(tweets);
    });
  };

  fetchTweets();

 
});
<template>

</template>

<script>
  const uuidV4 = require("uuid/v4");

  const TEST_URL = 'http://localhost:8028/'
  const FLY_URL = 'https://www.hasyou.cn:8028/'

  const COMMON_URL = TEST_URL

  // short book
  const SHORT_BOOK_PREFIX = 'shortbook/'
  const SHORT_BOOK_URL = COMMON_URL + SHORT_BOOK_PREFIX

  // douban book
  const DOUBAN_BOOK = 'book/'
  const BOOK_URL = COMMON_URL + DOUBAN_BOOK
  // douban short comment
  const BOOK_SHORT_COMMENT_URL = COMMON_URL + DOUBAN_BOOK + 'comment'

  const BOOK_REVIEW_URL = COMMON_URL + DOUBAN_BOOK + "review/"

  // group
  const GROUP = COMMON_URL + 'group/'

  // douban_book_tag
  const DOUBAN_BOOK_TAG_URL = COMMON_URL + 'tag/'

  // movie
  const DOUBAN_MOVIE = COMMON_URL + 'movie/'
  const MOVIE_SHORT_COMMENT_URL = DOUBAN_MOVIE + "comments/"
  const MOVIE_REVIEW_URL = DOUBAN_MOVIE + "reviews/"
  const MOVIE_GENRE_URL = DOUBAN_MOVIE + "tag/genres"

  // v2 post
  const POST_URL = COMMON_URL + 'v2/'

  // v2 node
  const NODE_URL = COMMON_URL + 'node/'

  // v2 comment
  const COMMENT_URL = POST_URL + "comment/";

  // event
  const EVENT_URL = COMMON_URL + 'event/'

  // music
  const DOUBAN_MUSIC_URL = COMMON_URL + 'music/'

  // file
  const FILE_URL = "https://image.hasyou.cn:8048/file/";
  // const FILE_URL = "https://localhost:8048/file/";

  // note
  const NOTE_URL = COMMON_URL + "note/";

  // global function
  let getUuid = function () {
    return uuidV4().replace(/-/g, "");
  }

  let getBid = function () {
    let bid = localStorage.getItem("bid");
    if (!bid) {
      bid = getUuid();
      localStorage.setItem("bid", bid);
    }
    return bid;
  }

  let request = function (reqUrl, result, params, method, headers) {
    if (!reqUrl) {
      alert("url must not be empty!");
      return;
    }

    if (!method) {
      method = "get";
    }

    if (!headers) {
      headers = getBid();
    }

    if (!params) {
      params = {};
    }

    axios.request({
      url: reqUrl,
      method: method,
      headers: {"bid":headers},
      params:params,
      transformResponse:[function (data) {
        // if (data.code !== 200) {
        //   alert("数据获取失败!");
        //   console.log(data);
        //   alert(2);
        //   return;
        // }
        alert(1);
        result = data;
      }]
     });
  }

  const URLS = {
    TEST_URL,
    FLY_URL,
    COMMON_URL,

    /* dou ban */
    BOOK_URL,
    BOOK_SHORT_COMMENT_URL,
    DOUBAN_BOOK_TAG_URL,
    DOUBAN_MOVIE,
    EVENT_URL,
    DOUBAN_MUSIC_URL,
    BOOK_REVIEW_URL,
    MOVIE_REVIEW_URL,
    MOVIE_SHORT_COMMENT_URL,

    /* v2 */
    COMMENT_URL,
    POST_URL,
    NODE_URL,

    /* file */
    FILE_URL,

    /* short book */
    SHORT_BOOK_URL,

    /* note */
    NOTE_URL,

    /* other */
    GROUP,
  }

  const FUNC = {
    getUuid,
    getBid,
    request
  }

  export default {
    URLS,
    FUNC
  }
</script>

<style scoped>

</style>

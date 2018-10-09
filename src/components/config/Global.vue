<template>

</template>

<script>
  const TEST_URL = 'http://localhost:8028/'
  const FLY_URL = 'http://www.hasyou.cn:8028/'

  const COMMON_URL = TEST_URL

  // short book
  const SHORT_BOOK_PREFIX = 'shortbook/'
  const SHORT_BOOK_URL = COMMON_URL + SHORT_BOOK_PREFIX

  // douban book
  const DOUBAN_BOOK = 'book/'
  const BOOK_URL = COMMON_URL + DOUBAN_BOOK
  // douban short comment
  const SHORT_COMMENT_URL = COMMON_URL + DOUBAN_BOOK + 'comment'

  // group
  const GROUP = COMMON_URL + 'group/'

  // douban_book_tag
  const DOUBAN_BOOK_TAG_URL = COMMON_URL + 'tag/'

  // movie
  const DOUBAN_MOVIE = COMMON_URL + 'movie/'

  // post
  const POST_URL = COMMON_URL + 'v2/'

  // node
  const NODE_URL = COMMON_URL + 'node/'

  // event
  const EVENT_URL = COMMON_URL + 'event/'

  // music
  const DOUBAN_MUSIC_URL = COMMON_URL + 'music/'

  const URLS = {
    TEST_URL,
    FLY_URL,
    COMMON_URL,
    SHORT_BOOK_URL,
    BOOK_URL,
    SHORT_COMMENT_URL,
    GROUP,
    DOUBAN_BOOK_TAG_URL,
    DOUBAN_MOVIE,
    POST_URL,
    NODE_URL,
    EVENT_URL,
    DOUBAN_MUSIC_URL
  }

  export default {
    URLS
  }
</script>

<style scoped>

</style>

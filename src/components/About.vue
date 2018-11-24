<template>
  <div class="row">
    <div class="col-lg-2"></div>
    <div class="col-lg-7 col-xs-12">
      <div class="row img">
        <a target="_blank" href="/static/image/youni.png"><img src="/static/image/youni.png"></a>
      </div>
      <div class="title col-lg-12 col-xs-12">
        <span>关于有你</span>
      </div>
      <div class="col-lg-12 col-xs-12">
        <p class="about-content">
          本网站是利用个人所学的微末技术,
          实现一个自己实用的小网页(可能目前还未体现这点,
          &emsp;David会一直努力想这个方向靠拢)，
          旨在一边提高自己的文学修养，一边锻炼自己的专业技术。
          有你的所有数据全部来自网上爬虫--豆瓣以及
          V2EX，详情条目中跳转到原网页的链接箭头，若访客觉得本站数据不全,可能点击跳转到原网页进行浏览。
        </p>
        <p class="about-content">
          David非常热忱的希望,各位认识的不认识留下你们的脚印和宝贵的意见,如对logo更好的推荐,
          或者页面布局等,再或者使用过程中出现Bug等
          都可以在留言板进行留言.也希望大家没事都可以来留言板留言, 聊聊天(虽然目前人不多..!).
        </p>
        <p class="about-content">
          本站读书方面不会像某些小说网站一样,开启在线长篇小说阅读功能,本站后会退出短篇美文(不仅限于中文,
          可能是David阅读的比较好的文章,也可能是名著里的经典语录,当然也是希望各位游客能提供素材)阅读功能,
          敬请期待.
          另外,还请大家留言时需要言辞,切莫谈论些敏感词.在下敬谢!
        </p>
      </div>
    </div>
    <div class="col-lg-3"></div>
  </div>
</template>

<script>
    export default {
        name: ""
    }
</script>

<style scoped>
  div.img {
    margin: 20px 0 50px 0;
  }

  p.about-content {
    text-indent: 2em;
    color: #4d5256;
    font-size: 16px;
  }

  div.title {
    margin: 20px 0;
    font-size: 30px;
    color: #666666;
    background-color: #f2fbf2;
  }
</style>

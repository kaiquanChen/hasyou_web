<template>
  <footer id="footer">
    <div class="row">
      <div class="col-xs-6 col-lg-6 left">
        <router-link tag="span" to="/note">留言板</router-link>
      </div>
      <div class="col-xs-6 col-lg-6 right">
        <router-link tag="span" to="/about">关于有你</router-link>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'davidfooter'
}
</script>

<style scoped>
  #footer {
    background-color: #e7e7e7;
    clear: both;
    bottom: 0;
  }
  .row {
    margin: 10px 0 0 0;
    padding: 0;
    text-align: center;
  }

  .left span, .right span {
    color: #333;
    text-align: center;
    font-size: 18px;
  }

  .left span, .right span:hover {
    cursor: pointer;
  }

  @media screen and (max-width: 415px) {
    .left span, .right span {
      font-size: 12px;
    }
  }

</style>

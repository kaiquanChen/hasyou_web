<template>
  <div>
    <davidheader></davidheader>
    <div class="article_list">
      <ul>
        <li v-for="i in list" :key="i.id">
          <time v-text="i.publish_time"></time>
          <span v-text="i.name"></span>
          <span v-for="author in i.authors" :key="author.id">
            <span v-text="author"></span>
          </span>
          <a target="_blank" v-bind:href="i.image_url"><img style="height: 30px;" v-bind:src="i.image_url"/></a>
        </li>
      </ul>
    </div>
    <davidfooter></davidfooter>
  </div>
</template>
<script>
import davidheader from '../components/Header.vue'
import davidfooter from '../components/Footer.vue'
export default {
  components: { davidheader: davidheader, davidfooter: davidfooter },
  data () {
    return {
      list: []
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      this.$api.get('/subjects?p=1', null, res => {
        this.list = res.data.body
      })
    }
  }
}
</script>

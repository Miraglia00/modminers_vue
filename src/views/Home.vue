<template>
<b-container class="noscroll">
  <div class="image-viewer" v-if="show" @click="closeImage">
    <div class="d-flex align-items-center justify-content-center w-100 h-100">
      <b-img :src="image" fluid alt="Fluid-grow image" class=""></b-img>
    </div>
  </div>
  <b-card bg-variant="secondary" text-variant="white" v-for="(post, index) in posts" :key="index" class="mt-5">
      <template class="text-center" v-slot:header>
        <div align-v="center" class="d-flex align-items-center justify-content-between">
          Létrehozva: {{new Date(post.created_time).toLocaleString()}} <a :href="post.permalink_url" target="_blank"> Megtekintés facebookon! </a>
        </div>
      </template>
      <b-card-text>
      <b-row>
        <b-col lg="10" offset-lg="1" cols="12" offset="0">
          {{post.message}}
        </b-col>
      </b-row>
      </b-card-text>
      <template v-slot:footer v-if="getLinks(index)">
        <b-row>
          <b-col col  v-for="(link, index) in getLinks(index)" :key="index*10" class="text-center">
            <b-img :src="link" style="width:100px; height: 100px;" @click="openImage(link)">Kép</b-img>
          </b-col>
        </b-row>
      </template>
    </b-card>
    <b-row>
      <b-col cols="12" class="mt-5 mb-5">
         <b-button squared variant="outline-primary" class="p-10 w-100" href="https://www.facebook.com/ModMiners/" target="_blank">További bejegyzések a Facebookon...</b-button>
      </b-col>
    </b-row>
</b-container>
</template>

<script>

import PageFunctions from '../api/PageFunctions'

export default {
  inject: ['loadingSpinner'],
    data() {
        return {
          posts: null,
          image: "",
          show: false,
          styleTag: document.createElement('style'),
          remove: ""
        }
    },
    mounted() {
      this.$nextTick(async function () {
        this.loadingSpinner.val = true;
        PageFunctions.getPosts()
        .then(res => {
          this.posts = res.data.data
          this.loadingSpinner.val = false;
        })
        .catch(err => {
          console.log(err)
        })
      })
    },
  destroyed() {
    this.styleTag.remove();
  },
    methods: {
      getLinks(post) {
        if(this.posts[post].attachments != undefined) {
          const links = []
          //console.log(this.posts[post])
          if(this.posts[post].attachments.data[0].subattachments != undefined) {
            let array = this.posts[post].attachments.data[0].subattachments.data
            for(var i = 0; i < Object.keys(array).length; i++)
              links.push(array[i].media.image.src)
          }else{
            links.push(this.posts[post].attachments.data[0].media.image.src)
          }

          return links
        }else return false
      },
      openImage(image) {
        this.show = true;
        const css = `
          body {
            overflow-y:hidden !important
          }
        `;
        this.styleTag.appendChild(document.createTextNode(css));
        document.head.appendChild(this.styleTag);

        this.image = image

      },
      closeImage() {
        this.show = false
        this.styleTag.remove(); 

      }
    },
    computed: {
    }
}
</script>
<style lang="scss" scoped>

a {
  color: #4d7db0
}

.image-viewer {
  top:0;
  left: 0;
  height:100% !important;
  width:100% !important;
  background-color:rgba(0, 0, 0, 0.4);
  position: fixed;
  z-index: 9999;
}
</style>

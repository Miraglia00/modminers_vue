<template>
<div class="spin" v-if="pageSpinner.val">
    <div class="ring">
        <div class="lds-facebook">
            <div></div>
            <div></div>
            <div></div>
        </div>

        <div v-if="pageSpinner.text">{{pageSpinner.text}}</div>
    </div> 
</div>
</template>

<script>
export default {
    props: ['start'],
    inject: ['pageSpinner'],

    mounted() {    
      setTimeout(() => {
        if(this.pageSpinner.timeout === true) {
          this.pageSpinner.val = false;
        }       
      }, 1500);
    }
}
</script>

<style lang="scss" scoped>
.ring {
    display:flex !important;
    justify-content: center;
    align-items: center;
    height: 100vh;
    flex-direction: column
}
.spin {
    z-index: 10;
    height: 100%;
    width: 100%;
    background-color:rgb(34,34,34);
    position:fixed;
}
.lds-facebook {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.lds-facebook div {
  display: inline-block;
  position: absolute;
  left: 8px;
  width: 16px;
  background: #fff;
  animation: lds-facebook 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;
}
.lds-facebook div:nth-child(1) {
  left: 8px;
  animation-delay: -0.24s;
}
.lds-facebook div:nth-child(2) {
  left: 32px;
  animation-delay: -0.12s;
}
.lds-facebook div:nth-child(3) {
  left: 56px;
  animation-delay: 0;
}
@keyframes lds-facebook {
  0% {
    top: 8px;
    height: 64px;
  }
  50%, 100% {
    top: 24px;
    height: 32px;
  }
}
</style>
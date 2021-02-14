<template>
<div class="spin" v-if="loadingSpinner.val">
    <div class="ring">
        <div class="lds-facebook">
            <div></div>
            <div></div>
            <div></div>
        </div>
    </div> 
</div>
</template>

<script>
export default {
    props: ['start'],
    inject: ['loadingSpinner']
}
</script>

<style lang="scss" scoped>
.ring {
    display:flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}
.spin {
    z-index: 9999;
    height: 100%;
    width: 100%;
    background-color: rgba(0,0,0,0.5);
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
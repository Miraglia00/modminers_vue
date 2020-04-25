<template>
<div></div>
</template>

<script>
export default {
    props:['message'],
    data() {
        return {

        }
    },
    methods: {
        makeToast(message) {
            this.$bvToast.toast(message.message, {
                title: message.title,
                variant: message.variant,
                solid: true
            })
        }
    }, 
}
</script>

<style lang="scss" scoped>

</style>
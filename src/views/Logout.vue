<template>
    <div></div>
</template>

<script>
export default {
    inject: ['navBar'],
    created() {
        this.$store.dispatch('LOGOUT')
        .then(res => {
            this.navBar.val = false;
            this.$router.push('/login')
        })
        .catch(e => {
            this.navBar.val = false;
            this.$router.push('/login')
        })
    }
}
</script>

<style>

</style>
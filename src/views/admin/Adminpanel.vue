<template>
    <div>
        <b-tabs content-class="mt-3" fill>
            <b-tab title="Felhasználók" active><router-view v-on:showMessage="showMessage" name="users" ></router-view></b-tab>
            <b-tab title="Regisztrációk"><router-view v-on:showMessage="showMessage" name="verify_users" ></router-view></b-tab>
            <b-tab title="Kódok" disabled><p>I'm a disabled tab!</p></b-tab>
        </b-tabs>
    </div>
</template>

<script>
export default {
    methods: {
        showMessage(message) {
            this.$emit('showMessage', message)
        }
    },
}
</script>

<style>

</style>
<template>
    <div>
        <b-tabs content-class="mt-3" fill>
            <b-tab active>
                <template v-slot:title>
                    <span>Felhasználók</span>
                    <span><b-badge v-if="notificationCounts.admin && notificationCounts.admin.users > 0" variant="danger">{{notificationCounts.admin.users}}</b-badge></span>
                </template>
                <router-view v-on:showMessage="showMessage" @deletedUser="deletedUser" name="users" ></router-view></b-tab>
            <b-tab>
                <template v-slot:title>
                    <span>Regisztrációk</span>
                    <span><b-badge v-if="notificationCounts.admin && notificationCounts.admin.regs > 0" variant="danger">{{notificationCounts.admin.regs}}</b-badge></span>
                </template>
                <router-view v-on:showMessage="showMessage" :deletedUser="deleted" name="verify_users" ></router-view>
            </b-tab>
            <b-tab title="Kódok" disabled></b-tab>
            <b-tab title="Beállítások">
                <router-view v-on:showMessage="showMessage" name="page_settings"></router-view>
            </b-tab>
        </b-tabs>
    </div>
</template>

<script>

export default {
    data() {
        return {
           deleted: 0
        }
    },
    mounted() {
        if(this.$store.getters.isAdmin){
            this.$store.dispatch('GET_ALL_PLAYER')
        }
    },
    methods: {
        showMessage(message) {
            this.$emit('showMessage', message)
        },
        deletedUser(state) {
            this.deleted = !this.deleted
        }
    },
    computed: {
        notificationCounts() {
            return this.$store.getters.notificationCount
        }
    }
}
</script>

<style>

</style>
<template>
  <b-modal id="admin-log-modal" hide-footer title="AdminLog" size="xl">
      <div class="d-block text-center">
        <b-list-group v-if="formattedLogs">
          <b-list-group-item class="d-flex justify-content-between align-items-center" :variant="(log.variant == '') ? 'warning' : log.variant" v-for="log in formattedLogs" :key="log._id">
            [{{log.created}}] {{log.message}}  <b-badge v-if="log.seen" class="d-flex align-items-center bg-transparent" pill><b-icon class="h5" icon="eye" variant="dark"></b-icon></b-badge>
          </b-list-group-item>
        </b-list-group>
      </div>
  </b-modal>
</template>

<script>
import _ from 'lodash';
export default {
  inject: ['adminLogs'],

  data() {
    return {
    }
  },
  computed: {
    formattedLogs() {
      if(Object.keys(this.adminLogs.val) != 0) {
        return _.orderBy(this.adminLogs.val, 'created', 'desc')
      }else return false
    },
  }
}
</script>

<style>

</style>
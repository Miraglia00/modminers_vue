<template>
  <b-modal id="log-modal" hide-footer title="Log" size="xl">
      <div class="d-block text-center">
        <b-list-group v-if="formattedLogs">
          <b-list-group-item :variant="(log.variant == '') ? 'warning' : log.variant" v-for="log in formattedLogs" :key="log.message">[{{log.created}}] {{log.message}}</b-list-group-item>
        </b-list-group>
      </div>
    </b-modal>
</template>

<script>
import _ from 'lodash';
export default {
  inject: ['userLogs'],

  data() {
    return {
    }
  },
  computed: {
    formattedLogs() {
      if(Object.keys(this.userLogs.val) != 0) {
        return _.orderBy(this.userLogs.val, 'created')
      }else return false
    },
  }
}
</script>

<style>

</style>
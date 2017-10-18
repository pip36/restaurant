<template>

  <article v-show="visible" class="message is-warning">
    <div class="message-header">
      <p>Warning</p>
      <button @click="visible = false" class="delete" aria-label="delete"></button>
    </div>
    <div class="message-body">
      <slot> </slot>
    </div>
  </article>

</template>

<script>
import firebase from 'firebase'
export default {
  name: 'warningmessage',
  data () {
    return {
      visible: true
    }
  }
}
</script>

<style scoped>

</style>

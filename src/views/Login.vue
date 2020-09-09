<template>
  <comp-login></comp-login>
</template>

<script>

import CompLogin from '@/components/CompLogin';

export default {
  name: 'Login',


  props: {
    source: String,
  },

  components: {
    CompLogin
  }
}
</script>
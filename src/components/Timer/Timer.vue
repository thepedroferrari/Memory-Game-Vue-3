<template>
  <time>{{ seconds }} s</time>
</template>

<script>
import { watch, ref } from "vue"
export default {
  name: "Timer",
  props: {
    addSecond: {
      type: Function,
      required: true,
    },
    seconds: {
      type: Number,
      required: true,
    },
    isGameOver: {
      type: Boolean,
      required: true,
    },
  },

  setup(props) {
    const timerStarted = ref(false)
    const interval = ref()
    watch(props, () => {
      if (!props.isGameOver) {
        if (!timerStarted.value) {
          timerStarted.value = true
          interval.value = setInterval(() => {
            props.addSecond()
          }, 1000)
        }
      } else {
        clearInterval(interval.value)
        timerStarted.value = false
      }
    })
  },
}
</script>

<template>
  <time
    ><svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="-40 0 512 512"
      class="undefined icon icon-svg"
    >
      <g stroke="none" stroke-width="1" fill-rule="evenodd">
        <path
          d="M382.9 157.4l20-20.1a20 20 0 10-28.2-28.2l-20 20c-33.8-28-74.7-45-118.3-49V40h19.3a20 20 0 000-39.9H177a20 20 0 100 40h19.3V80a216.3 216.3 0 0020 431.9 216.3 216.3 0 00166.5-354.6zM216.4 472A176.6 176.6 0 0139.9 295.6c0-97.3 79.2-176.4 176.5-176.4s176.4 79.1 176.4 176.4c0 97.3-79.1 176.5-176.4 176.5zm92.5-269a20 20 0 010 28.2l-78.4 78.4a20 20 0 11-28.2-28.2l78.4-78.4a20 20 0 0128.2 0zm0 0"
          fill-rule="nonzero"
          style="fill: var(--color-white)"
        ></path>
      </g></svg
    >{{ seconds }} s</time
  >
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

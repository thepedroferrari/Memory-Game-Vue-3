<template>
  <div class="card" :class="flippedStyles" @click="selectCard">
    <div
      class="card-face is-front"
      :style="`background-image: url('/images/${value}.jpg')`"
    ></div>
    <div class="card-face is-back"></div>
  </div>
</template>

<script>
import { computed } from "@vue/runtime-core"
import "./card-styles.scss"
export default {
  emits: ["select-card"],
  props: {
    value: {
      type: String,
      required: true,
    },
    visible: {
      type: Boolean,
      default: false,
    },
    position: {
      type: Number,
      required: true,
    },
    matched: {
      type: Boolean,
      default: false,
    },
  },

  setup(props, context) {
    const flippedStyles = computed(() => {
      if (props.visible) return "is-flipped"
    })
    const selectCard = () => {
      context.emit("select-card", {
        position: props.position,
        faceValue: props.value,
        isFlipped: props.visible,
      })
    }

    return { flippedStyles, selectCard }
  },
}
</script>

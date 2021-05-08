<script>
import { computed } from "@vue/runtime-core"
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
      })
    }

    return { flippedStyles, selectCard }
  },
}
</script>

<template>
  <div class="card" :class="flippedStyles" @click="selectCard">
    <div
      class="card-face is-front"
      :style="`background-image: url('/images/${value}.jpg`"
    ></div>
    <div class="card-face is-back"></div>
  </div>
</template>

<style>
.card {
  position: relative;
  transition: 350ms transform ease-in;
  transform-style: preserve-3d;
}

.card.is-flipped {
  transform: rotateY(180deg);
}

.card-face {
  width: 100%;
  height: 100%;
  position: absolute;
  background-size: cover;
  border-radius: 10px;
  backface-visibility: hidden;
}

.card-face.is-back {
  background-image: url("/images/AvalancheLogo.jpg");
}
.card-face.is-front {
  transform: rotateY(180deg);
}
</style>

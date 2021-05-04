<script>
export default {
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
    const selectCard = () => {
      context.emit("select-card", {
        position: props.position,
        faceValue: props.value,
      });
    };

    return { selectCard };
  },
};
</script>


<template>
  <div class="card" @click="selectCard">
    <div
      v-if="visible"
      class="card-face is-front"
      :style="`background-image: url('/images/${value}.jpg`"
    ></div>
    <div v-else class="card-face is-back"></div>
  </div>
</template>



<style>
.card {
  border: 1px solid var(--color-violet-light);
  position: relative;
}

.card-face {
  width: 100%;
  height: 100%;
  position: absolute;
  background-size: cover;
}

.card-face.is-front {
}
.card-face.is-back {
  background-image: url("/images/AvalancheLogo.jpg");
}
</style>
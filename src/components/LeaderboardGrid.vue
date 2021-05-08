<script>
export default {
  props: {
    leaderboardResults: {
      type: Array,
      default: [],
      required: true,
    },
  },

  setup({ leaderboardResults }) {
    const leaderboardResults = leaderboard.map(
      ({ id, name, device, score, clicks }, i) => (
        <template>
          <ul key={id}>
            <li>
              <span>
                {i + 1}. {name}
              </span>
              <span>{device}</span>
              <span>{clicks}</span>
              <span>{score}s</span>
            </li>
          </ul>
        </template>
      ),
    )
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
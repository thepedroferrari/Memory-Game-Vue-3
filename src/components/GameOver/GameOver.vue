<template>
  <div v-if="isScoreSaved">
    <h4>Score saved to the leaderboard!</h4>

    <button @click="restartGame">Start New Game</button>
  </div>
  <div v-else>Saved</div>
</template>

<script>
import { ref, watch } from "vue"
import { getDeviceType } from "../../utils"
import { leaderboardRef } from "../../firebase"

export default {
  name: "GameOver",
  props: {
    seconds: {
      type: Number,
      required: true,
    },
    clicks: {
      type: Number,
      required: true,
    },
    isGameOver: {
      type: Boolean,
      required: true,
    },
    restartGame: {
      type: Function,
      required: true,
    },
  },

  setup() {
    const isScoreSaved = ref(false)
    const name = ref("Player")

    const updateLeaderboard = async () => {
      isScoreSaved.value = true
      const id = Date.now()
      const device = getDeviceType()
      const stats = { id, name, device, clicks, score: seconds }
      await leaderboardRef.add(stats).catch((error) => {
        throw new Error(`Error adding document: ${error}`)
      })
    }

    watch(() => {}, { deep: true })

    return {
      isScoreSaved,
      name,
      updateLeaderboard,
    }
  },
}
</script>

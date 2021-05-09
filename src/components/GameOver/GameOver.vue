<template>
  <section class="game-over">
    <div v-if="isScoreSaved">
      <h4>Score saved to the leaderboard!</h4>
      <button class="default-button" @click="restartGame">
        Start New Game
      </button>
    </div>
    <div v-else>
      <h4>You finished in {{ seconds }} seconds with {{ clicks }} clicks!</h4>
      <p>Save your score to the leaderboard</p>
      <label for="leaderboardName">
        <p>Your name</p>
        <input
          id="leaderboardName"
          name="leaderboardName"
          placeholder="Player"
          maxlength="20"
          v-model="name"
        />
      </label>

      <button class="default-button" type="button" @click="updateLeaderboard">
        Save score to Leaderboard
      </button>

      <button class="default-button" type="button" @click="restartGame">
        New Game without saving
      </button>
    </div>
  </section>
</template>

<script>
import { ref } from "vue"
import { getDeviceType } from "../../utils"
import { leaderboardRef } from "../../firebase"

import "./gameover-styles.scss"

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

  setup(props) {
    const isScoreSaved = ref(false)
    const name = ref("")

    const updateLeaderboard = async () => {
      isScoreSaved.value = true
      const id = Date.now()
      const device = getDeviceType()
      const stats = {
        id,
        name: name.value,
        device,
        clicks: props.clicks,
        score: props.seconds,
      }

      await leaderboardRef.add(stats).catch((error) => {
        throw new Error(`Error adding document: ${error}`)
      })
    }

    return {
      isScoreSaved,
      name,
      updateLeaderboard,
    }
  },
}
</script>

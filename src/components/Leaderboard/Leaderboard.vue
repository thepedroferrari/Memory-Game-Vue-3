<template>
  <section class="leaderboard-modal">
    <button @click="toggleLeaderboard(false)">X</button>
    <h3 class="title">Leaderboard</h3>
    <ul class="leaderboard-results">
      <li>
        <span class="name">
          <strong>Name</strong>
        </span>
        <span class="device">
          <strong>Device</strong>
        </span>
        <span class="clicks">
          <strong>Clicks</strong>
        </span>
        <span class="score">
          <strong>Time</strong>
        </span>
      </li>
      <li
        v-for="(entry, index) in leaderboard"
        :key="entry.id"
        :name="entry.name"
        :device="entry.device"
        :clicks="entry.clicks"
      >
        <span class="name"
          ><span class="position">{{ index + 1 }}.</span> {{ entry.name }}</span
        >
        <span class="device">{{ entry.device }}</span>
        <span class="clicks">{{ entry.clicks }}</span>
        <span class="score">{{ entry.score }}s</span>
      </li>
    </ul>
  </section>
</template>

<script>
import { ref } from "vue"
import { leaderboardRef } from "../../firebase"
import { sortNumbersBy } from "../../utils"
import "./leaderboard-styles.scss"

export default {
  name: "Leaderboard",
  props: {
    toggleLeaderboard: {
      type: Function,
      required: true,
    },
  },

  setup() {
    const leaderboard = ref([])
    const getLeaderboard = async () => {
      await leaderboardRef.get().then((res) => {
        const data = res.docs.map((doc) => doc.data())
        leaderboard.value = data
        if (data.length > 0) {
          const newLeaderboard = sortNumbersBy(
            "score",
            Object.values(data),
            "asc",
          )
          leaderboard.value = newLeaderboard
        }
      })
    }

    getLeaderboard()

    return { leaderboard }
  },
}
</script>

<template>
  <h1 class="title">Vue Memory Game</h1>
  <transition-group tag="section" class="game-board" name="shuffle-card ">
    <Card
      v-for="card in deck"
      :key="card.id"
      :matched="card.matched"
      :value="card.value"
      :visible="card.visible"
      :position="card.position"
      @select-card="flipCard"
    />
  </transition-group>
  <Leaderboard />
  {{ status }}
  <button v-if="isNewPlayer" class="default-button" @click="startGame">
    Start Game
  </button>
  <button v-else class="default-button" @click="restartGame">
    Restart Game
  </button>
</template>

<script>
import { computed, ref, watch } from "vue"

import Card from "./components/Card"
import Leaderboard from "./components/Leaderboard/Leaderboard"

import _shuffle from "lodash.shuffle"
import { cardsDeck } from "./cardsDeck"
import "./assets/theme.css"
import "./assets/classes.css"

export default {
  name: "App",
  components: {
    Card,
    Leaderboard,
  },

  setup() {
    const deck = ref([])
    const matches = ref([])
    const isNewPlayer = ref(true)
    console.log(process.env.VUE_APP_APIKEY)
    const status = computed(() => {
      console.log("Read")
      if (remainingPairs.value === 0) {
        return "Player Wins!"
      } else {
        return `Remaining Pairs: ${remainingPairs.value}`
      }
    })

    const remainingPairs = computed(
      () => deck.value.filter((c) => c.matched === false).length / 2,
    )

    const shuffleCards = () => {
      deck.value = _shuffle(deck.value)
    }

    const startGame = () => {
      isNewPlayer.value = false
      restartGame()
    }

    const restartGame = () => {
      shuffleCards()

      deck.value = deck.value.map((card, index) => ({
        ...card,
        matched: false,
        visible: false,
        position: index,
      }))
      matches.value.length = 0
    }

    cardsDeck.forEach((card, index) => {
      deck.value.push({
        id: card,
        value: card.split("-")[0],
        position: index,
        visible: true,
        matched: false,
      })
    })

    const flipCard = (payload) => {
      if (
        matches.value.find((card) => {
          console.log(card, payload)
          return (
            card.position === payload.position &&
            card.faceValue === payload.faceValue
          )
        })
      ) {
        // user clicked twice in the same card
        // console.log(payload, matches);
        return
      }

      deck.value[payload.position].visible = true

      if (matches.value[0]) {
        matches.value[1] = payload
      } else {
        matches.value[0] = payload
      }
    }

    watch(
      matches,
      (cards) => {
        if (cards.length === 2) {
          const [card1, card2] = cards

          if (card1.faceValue === card2.faceValue) {
            deck.value[card1.position].matched = true
            deck.value[card2.position].matched = true
          } else {
            setTimeout(() => {
              deck.value[card1.position].visible = false
              deck.value[card2.position].visible = false
            }, 500)
          }

          matches.value.length = 0
        }
      },
      { deep: true },
    )

    shuffleCards()

    return {
      deck,
      flipCard,
      matches,
      remainingPairs,
      status,
      restartGame,
      startGame,
      isNewPlayer,
    }
  },
}
</script>

<style>
#app {
  text-align: center;

  margin-top: 60px;
}
</style>

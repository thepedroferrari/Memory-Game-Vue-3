<template>
  <header class="main-header">
    <Timer
      :seconds="seconds"
      :add-second="addSecond"
      :is-game-over="isGameOver"
    />
    <button class="default-button" @click="toggleLeaderboard(true)">
      Show Leaderboard
    </button>
    <h1 class="title"><span>!!!</span> MATCH-IT <span>!!!</span></h1>
    <p>
      A memory game made in Vue 3. <br />Checkout the source code at
      <a href="https://github.com/thepedroferrari/Memory-Game-Vue-3">GitHub</a>
    </p>
  </header>
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
  <Leaderboard
    v-if="shouldShowLeaderboard"
    :toggle-leaderboard="toggleLeaderboard"
  />
  <GameOver
    v-if="isGameOver"
    :seconds="seconds"
    :clicks="clicks"
    :is-game-over="isGameOver"
    :restart-game="restartGame"
  />
  {{ status }}
  <button v-if="isNewGame" class="default-button" @click="startGame">
    Start Game
  </button>
  <button v-else class="default-button" @click="restartGame">
    Restart Game
  </button>
</template>

<script>
import { computed, ref, watch } from "vue"

import Card from "../Card/Card"
import Leaderboard from "../Leaderboard/Leaderboard"
import Timer from "../Timer/Timer"
import GameOver from "../GameOver/GameOver"

import _shuffle from "lodash.shuffle"
import { cardsDeck } from "../../cardsDeck"
import "../../assets/theme.css"
import "../../assets/classes.css"
import "./app.styles.scss"

export default {
  name: "App",
  components: {
    Card,
    Leaderboard,
    Timer,
    GameOver,
  },

  setup() {
    // References
    const deck = ref([])
    const matches = ref([])
    const isNewGame = ref(true)
    const shouldShowLeaderboard = ref(false)
    const clicks = ref(0)
    const seconds = ref(0)
    const isGameOver = ref(true)

    // Methods
    const setGameOver = () => {
      isGameOver.value = true
    }

    const toggleLeaderboard = (status) =>
      status
        ? (shouldShowLeaderboard.value = status)
        : (shouldShowLeaderboard.value = !shouldShowLeaderboard.value)

    const status = computed(() => {
      if (remainingPairs.value === 0) {
        setGameOver()
        return "Player Wins!"
      } else {
        return `Remaining Pairs: ${remainingPairs.value}`
      }
    })

    const remainingPairs = computed(
      () => deck.value.filter((c) => c.matched === false).length / 2,
    )

    const shuffleCards = () => {
      if (false) {
        deck.value = _shuffle(deck.value)
      }
    }

    const startGame = () => {
      isNewGame.value = false
      restartGame()
    }

    const addSecond = () => {
      seconds.value += 1
    }

    const restartGame = () => {
      // Shuffle cards again. We have to shuffle them first and then re-assign
      // the position of the cards otherwise they will have indexes in wrong the
      // positions.
      shuffleCards()

      // reset references
      isGameOver.value = false
      clicks.value = 0
      seconds.value = 0
      matches.value.length = 0
      deck.value = deck.value.map((card, index) => ({
        ...card,
        matched: false,
        visible: false,
        position: index,
      }))
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
      // Do not continue if the card is already flipped.
      if (payload.isFlipped) return false

      // The user clicked on a new card, we want to record that action
      clicks.value += 1

      // If the position and value of the card matches a card on our matches
      // array, we return true.
      if (
        matches.value.find((card) => {
          return (
            card.position === payload.position &&
            card.faceValue === payload.faceValue
          )
        })
      ) {
        // user clicked twice in the same card
        // console.log(payload, matches);
        return false
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
            }, 750)
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
      isNewGame,
      shouldShowLeaderboard,
      toggleLeaderboard,
      addSecond,
      seconds,
      isGameOver,
      clicks,
    }
  },
}
</script>

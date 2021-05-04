<template>
  <h1 class="title">Vue Memory Game</h1>
  <section class="game-board">
    <Card
      v-for="card in deck"
      :key="card.id"
      :matched="card.matched"
      :value="card.value"
      :visible="card.visible"
      :position="card.position"
      @select-card="flipCard"
    />
  </section>
  {{ status }}
  <button class="default-button" @click="restartGame">Restart Game</button>
</template>

<script>
import { computed, ref, watch } from "vue";

import Card from "./components/Card";
import _shuffle from "lodash.shuffle";
import "./assets/theme.css";
import "./assets/classes.css";

export default {
  name: "App",
  components: {
    Card,
  },

  setup() {
    const deck = ref([]);
    const matches = ref([]);

    const status = computed(() => {
      console.log("Read");
      if (remainingPairs.value === 0) {
        return "Player Wins!";
      } else {
        return `Remaining Pairs: ${remainingPairs.value}`;
      }
    });

    const remainingPairs = computed(
      () => deck.value.filter((c) => c.matched === false).length / 2
    );

    const shuffleCards = () => {
      deck.value = _shuffle(deck.value);
    };

    const restartGame = () => {
      shuffleCards();

      deck.value = deck.value.map((card, index) => ({
        ...card,
        matched: false,
        visible: false,
        position: index,
      }));
      matches.value.length = 0;
    };

    [
      "GenZ-card1",
      "GenZ-card2",
      "JustCause3-card1",
      "JustCause3-card2",
      "JustCause4-card1",
      "JustCause4-card2",
      "MadMax-card1",
      "MadMax-card2",
      "Rage2-card1",
      "Rage2-card2",
      "SecondExtinction-card1",
      "SecondExtinction-card2",
      "theHunter-card1",
      "theHunter-card2",
      "TheHunter2-card1",
      "TheHunter2-card2",
    ].forEach((card, index) => {
      deck.value.push({
        id: card,
        value: card.split("-")[0],
        position: index,
        visible: false,
        matched: false,
      });
    });

    const flipCard = (payload) => {
      deck.value[payload.position].visible = true;
      console.log(payload);
      if (
        matches.value.find(
          (card) =>
            card.position === payload.position &&
            card.faceValue === payload.faceValue
        )
      ) {
        console.log("THEY ARE EQUAL", matches.value, payload);
        return;
      }

      if (matches.value[0]) {
        matches.value[1] = payload;
      } else {
        matches.value[0] = payload;
      }
    };

    watch(
      matches,
      (cards) => {
        if (cards.length === 2) {
          const [card1, card2] = cards;

          if (card1.faceValue === card2.faceValue) {
            deck.value[card1.position].matched = true;
            deck.value[card2.position].matched = true;
          } else {
            setTimeout(() => {
              deck.value[card1.position].visible = false;
              deck.value[card2.position].visible = false;
            }, 500);
          }

          matches.value.length = 0;
        }
      },
      { deep: true }
    );

    return {
      deck,
      flipCard,
      matches,
      remainingPairs,
      status,
      restartGame,
    };
  },
};
</script>

<style>
#app {
  text-align: center;

  margin-top: 60px;
}
</style>

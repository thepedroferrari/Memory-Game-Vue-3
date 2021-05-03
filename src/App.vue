<template>
  <h1>Vue Memory Game</h1>
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
  <button @click="restartGame">Restart Game</button>
</template>

<script>
import { computed, ref, watch } from "vue";
import Card from "./components/Card";
import _shuffle from "lodash.shuffle";
// import genZ from "./assets/images/GenZ.jpg";
// import justCause3 from "./assets/images/JustCause3.jpg";
// import justCause4 from "./assets/images/JustCause4.jpg";
// import madMax from "./assets/images/MadMax.jpg";
// import rage2 from "./assets/images/Rage2.jpg";
// import secondExtinction from "./assets/images/SecondExtinction.jpg";
// import theHunter from "./assets/images/theHunter.jpg";
// import theHunter2 from "./assets/images/TheHunter2.jpg";

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
    };

    for (let i = 0; i < 16; i += 1) {
      deck.value.push({
        id: i,
        value: i,
        position: i,
        visible: false,
        matched: false,
      });
    }

    const flipCard = (payload) => {
      deck.value[payload.position].visible = true;

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
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.game-board {
  display: grid;
  grid-template-columns: repeat(4, 100px);
  grid-template-rows: repeat(4, 100px);
  gap: 20px;
  justify-content: center;
}
</style>

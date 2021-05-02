<template>
  <h1>Vue Memory Game</h1>
  <section class="game-board">
    <Card
      v-for="card in deck"
      :key="`${card.id}`"
      :value="`${card.value}`"
      :visible="card.visible"
      :position="card.position"
      @select-card="flipCard"
    />
  </section>
</template>

<script>
import Card from "./components/Card";
// import genZ from "./assets/images/GenZ.jpg";
// import justCause3 from "./assets/images/JustCause3.jpg";
// import justCause4 from "./assets/images/JustCause4.jpg";
// import madMax from "./assets/images/MadMax.jpg";
// import rage2 from "./assets/images/Rage2.jpg";
// import secondExtinction from "./assets/images/SecondExtinction.jpg";
// import theHunter from "./assets/images/theHunter.jpg";
// import theHunter2 from "./assets/images/TheHunter2.jpg";

import { ref } from "vue";

export default {
  name: "App",
  components: {
    Card,
  },

  setup() {
    const deck = ref([]);

    for (let i = 0; i < 16; i += 1) {
      deck.value.push({
        id: i,
        value: i,
        position: i,
        visible: false,
      });
    }

    const flipCard = (payload) => {
      deck.value[payload.position].visible = true;
    };

    return {
      deck,
      flipCard,
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

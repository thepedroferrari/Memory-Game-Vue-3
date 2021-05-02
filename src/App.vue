<template>
  <h1>Vue Memory Game</h1>
  <section class="game-board">
    <Card
      v-for="card in deck"
      :key="`${card.id}`"
      :id="`${card.id}`"
      :src="`${card.src}`"
    />
  </section>
</template>

<script>
import Card from "./components/Card";
import genZ from "./assets/images/GenZ.jpg";
import justCause3 from "./assets/images/JustCause3.jpg";
import justCause4 from "./assets/images/JustCause4.jpg";
import madMax from "./assets/images/MadMax.jpg";
import rage2 from "./assets/images/Rage2.jpg";
import secondExtinction from "./assets/images/SecondExtinction.jpg";
import theHunter from "./assets/images/theHunter.jpg";
import theHunter2 from "./assets/images/TheHunter2.jpg";

export default {
  name: "App",
  components: {
    Card,
  },

  setup() {
    const deck = [
      {
        src: genZ,
        id: "genZ-card1",
      },
      {
        src: justCause3,
        id: "justCause3-card1",
      },
      {
        src: justCause4,
        id: "justCause4-card1",
      },
      {
        src: madMax,
        id: "madMax-card1",
      },
      {
        src: rage2,
        id: "rage2-card1",
      },
      {
        src: secondExtinction,
        id: "secondExtinction-card1",
      },
      {
        src: theHunter,
        id: "theHunter-card1",
      },
      {
        src: theHunter2,
        id: "theHunter2-card1",
      },

      {
        src: genZ,
        id: "genZ-card2",
      },
      {
        src: justCause3,
        id: "justCause3-card2",
      },
      {
        src: justCause4,
        id: "justCause4-card2",
      },
      {
        src: madMax,
        id: "madMax-card2",
      },
      {
        src: rage2,
        id: "rage2-card2",
      },
      {
        src: secondExtinction,
        id: "secondExtinction-card2",
      },
      {
        src: theHunter,
        id: "theHunter-card2",
      },
      {
        src: theHunter2,
        id: "theHunter2-card2",
      },
    ];

    return {
      deck,
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

.card {
  border: 5px solid #ccc;
}

.game-board {
  display: grid;
  grid-template-columns: repeat(4, 100px);
  grid-template-rows: repeat(4, 100px);
  gap: 20px;
  justify-content: center;
}
</style>

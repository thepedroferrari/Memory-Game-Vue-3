import { createApp } from "vue"
import App from "./components/App/App.vue"

const app = createApp(App)

app.config.performance = true
app.mount("#app")

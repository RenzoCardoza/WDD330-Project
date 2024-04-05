import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  root: "src/",

  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        pokemonListing: resolve(__dirname, "src/pokemon/index.html"),
        pokemonDetails: resolve(__dirname, "src/pokemon_pages/index.html"),
        pokeBuilder: resolve(__dirname, "src/pokebuilder/index.html"),
      },
    },
  },
});

import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
	base: process.env.NODE_ENV === "production" ? "/star-wars-d6/" : "/",
	plugins: [vue()],
	resolve: {
		extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".vue"],
		alias: {
			"@": fileURLToPath(new URL("./src", import.meta.url)),
		},
	},
});

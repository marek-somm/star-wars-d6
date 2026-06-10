<template>
	<CharacterSheets />
</template>

<script>
import CharacterSheets from "@/components/CharacterSheets";

export default {
	name: "App",
	components: {
		CharacterSheets,
	},
};
</script>

<style>
#app {
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	min-height: 100vh;
}
</style>

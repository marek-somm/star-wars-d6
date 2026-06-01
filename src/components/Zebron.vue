<template>
	<div class="container">
		<Dicer />
		<CharacterPdfExport character-name="Zebron Kebino" />
		<Navbar />
	</div>
</template>

<script>
import CharacterPdfExport from "./CharacterPdfExport.vue";
import Dicer from "./Dicer.vue";
import Navbar from "./Navbar.vue";

export default {
	components: {
		CharacterPdfExport,
		Dicer,
		Navbar,
	},
	setup() {
		return {};
	},
};
</script>

<style lang="scss" scoped>
.container {
	width: min(1440px, 100%);
	min-height: 100vh;
	margin: 0 auto;
	padding: 1.25rem var(--page-gutter) 3rem;
}

@media (max-width: 560px) {
	.container {
		padding: 0.75rem 0.7rem 2rem;
	}
}
</style>

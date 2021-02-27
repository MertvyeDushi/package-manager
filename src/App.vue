<template lang="pug">

	#app
		router-view

		a.git-hub-link(class="link link--black" href="https://github.com/MertvyeDushi/" target="_blank") designed by mark

</template>

<style lang="scss">
@import '~@/assets/styles/abstracts/_variables.scss';


#app {
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;

	min-height: 100vh;
}


.git-hub-link {
	position: fixed;

	right: 2rem;
	bottom: 2rem;


	@media screen and (max-width: $phone) {
		right: unset;
		left: 1rem;
		bottom: 1.2rem;
	}
}

</style>

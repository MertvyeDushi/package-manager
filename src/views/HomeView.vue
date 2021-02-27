<template lang="pug">

	.home-page(class="u-df-column-center-center")

		.home-page__inner-container
			SearchComponent
			TableComponent

</template>

<script>
import SearchComponent from '@/components/common/SearchComponent.vue'
import TableComponent from '@/components/common/TableComponent.vue'

export default {
	name: 'HomeView',

	components: {
		SearchComponent,
		TableComponent
	}
}
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/abstracts/_variables.scss';


.home-page {
	min-width: 31.5rem;
	width: 100%;

	background: $color_primary;


	&__inner-container {
		margin: 2% 0;
		padding: 5rem 2%;

		width: 75rem;
		min-height: 100vh;

		box-shadow: 2rem 2rem 6rem #cccccc, -2rem -2rem 6rem #ffffff;
		border: 1px solid darken(rgba($color_primary, .5), 1%);
		border-radius: 5rem;
		background: $color_primary;


		@media screen and (max-width: $phone) {
			min-width: 31rem;
			width: 100%;

			border-radius: 0;
			box-shadow: unset;

			padding: 5rem 4%;
		}
	}
}

</style>

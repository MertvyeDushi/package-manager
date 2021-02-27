<template lang="pug">
	
	.input__wrapper(class="u-df-center")
		
		input.input__field(class="input" placeholder="Just search it..." :value="queryString" @input="startSearch" autofocus="true")
		.input__remove(class="remove-btn" @mousedown="clearInputValue")


</template>

<script>
import { mapActions } from 'vuex'

export default {
	
	name: 'SearchComponent',

	data() {
		return {
			queryString: ''
		}
	},

	methods: {
		...mapActions([ 'getPackages' ]),

		startSearch(e) {

			window.scrollTo(0, -1000)

			this.queryString = e.target.value

			const data = {
				string: e.target.value
			}
			
			this.getPackages(data)
			
		},

		clearInputValue() {
			window.scrollTo(0, -1000)
			this.queryString = ''
			this.$store.commit('SET_QUERY_STRING', this.queryString)
		}
	}

}
</script>

<style scoped lang="scss">
@import '~@/assets/styles/abstracts/_variables.scss';


.active {
	background: $color_blue;
}


.input__wrapper {
	position: sticky;
	top: 0;

	z-index: 2;
}

.input__remove {
	position: absolute;

	right: 1.4%;
	top: 30%;

	z-index: 1;


	@media screen and (max-width: $phone) {
		right: 3.7%;
		top: 36%;
	}
}


</style>

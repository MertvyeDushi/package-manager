<template lang="pug">

	.table__wrapper

		TablePaginationComponent

		h1.table__title(class="secondary-title") {{ tableTitle }}


		.table__body(v-if="POPULAR_PACKAGES.length")


			TableRowComponent(v-for="item in tableItems" :key="item.objectID" :item="item")


</template>

<script>
import TablePaginationComponent from '@/components/table/TablePaginationComponent.vue'
import TableRowComponent from '@/components/table/TableRowComponent.vue'
import { mapActions, mapGetters } from 'vuex'

export default {
	name: 'TableComponent',

	components: {
		TablePaginationComponent,
		TableRowComponent
	},

	created() {
		this.fetchPopularPackages()
	},

	computed: {
		...mapGetters([ 'PACKAGES', 'POPULAR_PACKAGES', 'QUERY_STRING' ]),

		tableTitle() {
			return this.QUERY_STRING ? 'Searching results:' : 'The most popular packages:'
		},
		tableItems() {
			return this.QUERY_STRING ? this.PACKAGES : this.POPULAR_PACKAGES
		}
	},

	methods: {
		...mapActions([ 'getPackages', 'setErrorMessage' ]),

		fetchPopularPackages() {
			this.getPackages()
		}
	}

}
</script>

<style scoped lang="scss">
@import '~@/assets/styles/abstracts/_variables.scss';


.table {

	
	&__wrapper {
		padding: 0 .1rem;
		position: relative;
	}


	&__title {
		margin: 3rem 0;
		cursor: pointer;
	}

}

</style>

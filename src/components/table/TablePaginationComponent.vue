<template lang="pug">
	
	.pagination

		.pagination__inner-wrapper

			ul.pagination__list(class="u-df-column-flex-start")

				li.pagination__list-item(v-if="showFirstIndex" @click="getClickedPage(1)") 1
				li.pagination__list-item.pagination__list-item--separator(v-if="showFirstIndex") |

				li.pagination__list-item(v-for="index in pages" :key="index" @click="getClickedPage(index)") {{ index }}
					span.left-arrow(v-if="CURRENT_PAGE === index" v-html="'&#8592;'")

				li.pagination__list-item.pagination__list-item--separator(v-if="showLastIndex") |
				li.pagination__list-item(v-if="showLastIndex" @click="getClickedPage(NUMBER_OF_PAGES)") {{ NUMBER_OF_PAGES }}


</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {

	name: 'TablePaginationComponent',

	computed: {
		...mapGetters([ 'NUMBER_OF_PAGES', 'QUERY_STRING', 'CURRENT_PAGE' ]),

		showFirstIndex() {
			return this.pages[0] !== 1 && this.NUMBER_OF_PAGES > 0
		},

		showLastIndex() {
			return this.pages[this.pages.length - 1] !== this.NUMBER_OF_PAGES && this.NUMBER_OF_PAGES > 0
		},

		pages() {
			let pages = []

			for(let i = this.getStartPage; i <= this.getEndPage; i++) {
				pages.push(i)
			}

			return pages
		},

		getStartPage() {
			let index = this.CURRENT_PAGE - this.range

			if (index > 0) return index
			else return 1
		},

		getEndPage() {
			let index = this.CURRENT_PAGE + this.range

			if (index < this.NUMBER_OF_PAGES) return index
			else return this.NUMBER_OF_PAGES
		}
	},

	data() {
		return {
			range: 2
		}
	},

	methods: {
		...mapActions([ 'getPackages', 'setErrorMessage' ]),

		getClickedPage(index) {
			window.scrollTo(0, -1000)

			const data = {
				string: this.QUERY_STRING,
				page: index - 1
			}

			this.getPackages(data)
		}
	}

}
</script>

<style scoped lang="scss">
@import '~@/assets/styles/abstracts/_variables.scss';


.pagination {
	position: absolute;

	right: -13rem;
	top: 0;

	height: 100%;


	@media screen and (max-width: $phone) {
		position: fixed;

		right: unset;
		bottom: 4rem;
		top: unset;

		height: fit-content;
		width: 95vw;
	}


	&__inner-wrapper {
		position: sticky;
		top: 7rem;


		@media screen and (max-width: $phone) {
			position: unset;
			top: unset;
		}
	}


	&__list {


		@media screen and (max-width: $phone) {
			flex-direction: unset;
			width: 100%;
		}


		&:hover > * {
			opacity: .5;
		}


		&-item {
			position: relative;
			display: inline-block;
			cursor: pointer;

			width: 100%;

			opacity: .2;
			transition: all .3s;


			@media screen and (max-width: $phone) {
				opacity: 1;
			}


			&:hover {
				opacity: 1;
			}


			&:not(:last-child) {
				margin-bottom: 2rem;


				@media screen and (max-width: $phone) {
					margin-bottom: unset;
				}
			}


			.left-arrow {
				margin-left: 1rem;

				position: relative;
				top: -.2rem;


				@media screen and (max-width: $phone) {
					display: none;
				}
			}


			&--separator {
				padding-left: .2rem;

				font-size: $bigger_font_size;
				color: rgba($color_black_light, .85);


				@media screen and (max-width: $phone) {
					font-size: initial;
				}
			}
		}
	}
}

</style>
<template lang="pug">

	.table__row

		PackageModal(v-if="isNotEmpty" :packageObject="chosenPackage" @close="closeModal")

		.table__row-top-block(class="u-df-between")

			.table__row-inner.table__row-inner--left

				.table__row-name(class="article-title" @click="showPackageModal") {{ item.name }}

					span.table__row-name--version(class="description-text") v{{ item.version }}

					a.table__row-owner(class="link link--default" :href="item.owner.link" target="_blank")
						span(class="description-text") by
						| {{ item.owner.name }}

				.table__row-description(class="description-text") {{ item.description }}


		.table__row-bottom-block

			.table__row-keys-container(class="u-df-row-wrap-start")
			
				.table__row-key-words(class="caption-text" v-for="(keyword, index) in item.keywords" :key="index") \#{{ keyword }}


</template>

<script>
import PackageModal from '@/components/modals/PackageModal.vue'

export default {

	name: 'TableRowComponent',

	components: {
		PackageModal
	},

	props: {
		item: {
			type: Object,
			required: true
		}
	},

	computed: {
		getDefaultImg() {
			return `this.onerror=null;this.src='${ this.altImg }';`
		},
		isNotEmpty() {
			return Object.keys(this.chosenPackage).length !== 0
		}
	},

	data() {
		return {
			altImg: require('@/assets/img/hotpng.png'),
			chosenPackage: {}
		}
	},

	methods: {
		showPackageModal() {
			this.chosenPackage = this.item
		},
		closeModal() {
			this.chosenPackage = {}
		}
	}

}
</script>

<style scoped lang="scss">
@import '~@/assets/styles/abstracts/_variables.scss';


.table__row {
	min-height: 7rem;

	padding: 2rem 0;


	&:not(:last-child) {
		border-bottom: 1px solid rgba($color_blue, .11);
	}


	&-top-block {
		align-items: stretch;
	}


	&-inner {


		&--left {
			flex-basis: 88%;
			max-width: 88%;

			margin-right: 2%;
		}


		&--right {
			flex-basis: 10%;
			max-width: 10%;

			align-items: stretch;
		}
	}


	&-name, &-description {
		max-width: 100%;
		margin-bottom: .7rem;
	}


	&-name {
		cursor: pointer;


		&--version {
			margin-left: 1rem;
		}
	}


	&-owner {
		margin-left: 1rem;


		span {
			margin-right: 1rem;
		}
	}


	&-description {
		margin-left: 2rem;
	}


	&-key-words {
		margin-left: 2rem;
	}


	&-avatar {
		object-fit: contain;
		object-position: top;
		width: 100%;
	}

}

</style>
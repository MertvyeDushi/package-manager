<template lang="pug">

	.modal__container

		.modal
			
			.hide__btn(@click="close")


			section.modal__header-block(class="u-df-between")

				.modal__package-box(class="u-df-center")
					a.modal__package-name(class="article-title link link--default" :href="getLink" target="_blank") {{ packageObject.name }}
					.modal__package-version(class="description-text") v{{ packageObject.version }}


				.modal__package-owner-box(class="u-df-center")

					a.modal__package-owner(class="link link--default" :href="packageObject.owner.link" target="_blank")
						span(class="description-text") by
						| {{ packageObject.owner.name }}

					a.modal__package-avatar-box(class="u-df-center" :href="packageObject.owner.link" target="_blank")
						img.modal__package-avatar(:src="packageObject.owner.avatar" :onerror="getDefaultImg")


			section.modal__stats-block

				ul.modal__package-stats
					li.modal__package-stats-item(class="description-text") NPM: {{ npmStats.rank }} rank, {{ npmStats.total }} total stats.
					li.modal__package-stats-item(class="description-text") GitHub: {{ ghStats.rank }} rank, {{ ghStats.total }} total stats.


			section.modal__description-block

				p.modal__package-description(class="description-text description-text--main") {{ packageObject.description }}


			section.modal__keywords-block

				ul.modal__package-keywords(class="u-df-row-wrap-start")
					li.modal__package-keyword(class="caption-text" v-for="(keyword, index) in packageObject.keywords" :key="index") \#{{ keyword }}


			section.modal__files-block

				ul.modal__package-files-list {{ packageObject.name }} CDN Files

					li.modal__package-file(:class="getFileType(file)" v-for="(file, index) in filesList" :key="index") /npm/{{ packageObject.name }}@{{ packageObject.version }}/{{ file.name }}

				.modal__button-container
					button.modal__button(class="btn btn--default" v-if="showButton" @click="showAll = true") show all


</template>

<script>
import { mapActions } from 'vuex'

export default {

	name: 'PackageModal',

	created() {
		this.getFiles()
		this.hideScrollBar()
		this.getStats()
	},

	props: {
		packageObject: {
			type: Object,
			required: true
		}
	},

	computed: {
		getLink() {
			return this.packageObject.homepage ? this.packageObject.homepage : `https://github.com/${ this.packageObject.githubRepo.user }/${ this.packageObject.githubRepo.project }`
		},
		filesList() {
			return this.showAll ? this.highFilesList[0] : this.lowFilesList[0]
		},
		getDefaultImg() {
			return `this.onerror=null;this.src='${ this.altImg }';`
		},
		showButton() {
			if (this.highFilesList.length) return Boolean(!this.showAll && this.highFilesList[0].length !== this.lowFilesList[0].length)
			else return false
		}
	},

	data() {
		return {
			highFilesList: [],
			lowFilesList: [],
			showAll: false,
			ghStats: '',
			npmStats: '',
			altImg: require('@/assets/img/hotpng.png'),
		}
	},

	beforeDestroy() {
		this.showScrollBar()
	},

	methods: {
		...mapActions([ 'getListPackageFiles', 'getUsageGHStats', 'getUsageNPMStats' ]),

		getFiles() {
			const data = {
				name: this.packageObject.name,
				version: this.packageObject.version
			}
			this.getListPackageFiles(data)
				.then( result => {
					this.highFilesList.push(result.data.files)
					this.lowFilesList.push(this.highFilesList[0].slice(0, 9))
				})
		},

		getStats() {
			const ghData = {
				user: this.packageObject.githubRepo.user,
				repo: this.packageObject.githubRepo.project
			}

			const npmData = {
				name: this.packageObject.name,
			}

			this.getUsageGHStats(ghData)
				.then( result => this.ghStats = result.data )

			this.getUsageNPMStats(npmData)
				.then( result => this.npmStats = result.data )
		},

		getFileType(file) {
			return file.type === 'file' ? 'file' : 'folder'
		},

		hideScrollBar() {
			let body = document.getElementsByTagName('body')[0]
			body.setAttribute('style', 'overflow: hidden')
		},

		showScrollBar() {
			let body = document.getElementsByTagName('body')[0]
			body.removeAttribute('style')
		},

		close() {
			this.$emit('close')
		}

	}

}
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/abstracts/_variables.scss';


.hide__btn {
	position: absolute;
	top: 2rem;
	right: 2rem;
}


.folder, .file {
	position: relative;
	margin-left: 2rem;


	&::before {
		content: "";

		height: 2.5rem;
		width: 2.5rem;

		position: absolute;

		top: 50%;
		left: -2.5rem;

		transform: translate(0, -50%);
	}
}


.folder::before { 
	background: url(~@/assets/img/folder-icon.svg) no-repeat center / contain;
}


.file::before { 
	background: url(~@/assets/img/file-icon.svg) no-repeat center / contain;
}


section:not(:last-child) {
	margin-bottom: 2rem;
}


.modal__container {
	position: fixed;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;

	overflow: auto;
	display: block;

	background-color: rgba($color_black, .5);

	z-index: 3000;
}


.modal {
	position: relative;

	margin: 10% auto;

	max-width: 85rem;
	padding: 4rem 8rem 3rem;

	background: $color_white;
	border: 1px solid $color_white_grey;
	border-radius: .5rem;

	background-color: $color_white;


	@media screen and (max-width: $phone) {
		position: absolute;

		top: 0;
		left: 0;
		right: 0;

		min-width: unset;
		max-width: unset;

		border: none;
		border-radius: 0;

		padding: 0 5rem 4rem;
		margin: 0;
	}


	@media screen and (max-width: $iphone_plus) {
		padding: 0 2rem 4rem;
	}


	&__package-box, &__package-owner-box {
		align-items: flex-end;
	}


	&__package-name,
	&__package-owner,
	&__package-owner span {
		line-height: 1;
	}


	&__package-version {
		line-height: 1.2;
	}


	&__package-version {
		margin-left: 1rem;
	}


	&__package-owner {


		span {
			margin-right: .5rem;
		}
	}


	&__package-avatar {
		margin-left: 1rem;

		height: 1.7rem;
		width: 1.7rem;
	}


	&__package-stats-item {
		display: inline-block;


		&:not(:first-child)	{
			margin-left: .5rem;
		}
	}


	&__package-keyword {
		display: inline-block;
		margin-right: 2rem;

		font-size: 90%;
	}


	&__package-file {
		display: block;
		font-size: 90%;

		margin-bottom: .1rem;


		&:first-child {
			margin-top: 1rem;
		}
	}


	&__package-files-list {
		margin-bottom: 2rem;
	}


	&__button-container {
		text-align: center;
	}


	&__button {
		padding: .2rem 4rem;
	}
}

</style>
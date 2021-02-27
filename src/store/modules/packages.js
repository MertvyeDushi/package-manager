import algoliasearch from 'algoliasearch'
import axios from 'axios'
			
const algolia = algoliasearch(process.env.VUE_APP_APPLICATION_ID, process.env.VUE_APP_PUBLIC_API_KEY, { protocol: 'http:' })
const index = algolia.initIndex('npm-search')

export const packages = {

	state: {
		apiUrl: process.env.VUE_APP_API_URL,
		packages: [],
		queryString: '',
		popular: [],
		numberOfPages: 1,
		currentPage: 0
	},

	mutations: {
		SET_RESULT: (state, data) => state.packages = data,
		SET_POPULAR_RESULT: (state, data) => state.popular = data,
		SET_NUMBER_OF_PAGES: (state, data) => state.numberOfPages = data,
		SET_QUERY_STRING: (state, data) => state.queryString = data,
		SET_CURRENT_PAGE: (state, data) => state.currentPage = data + 1
	},

	actions: {

		getPackages: ({ commit }, data = { string: '' }) => {

			return new Promise( (resolve, reject) => {

				let options = {
					page: data.page || 0,
					hitsPerPage: data.hitsPerPage || 10,
					attributesToHighlight: [],
					attributesToRetrieve: [ 'deprecated', 'description', 'githubRepo', 'homepage', 'keywords', 'license', 'name', 'owner', 'version' ]
				}
				
				index.search(data.string, options)
					.then( response => {
						response.hits.sort( (a, b) => {
							return a.name === data.string ? -1 : b.name === data.string
						})

						if (data.string) commit('SET_RESULT', response.hits)
						else commit('SET_POPULAR_RESULT', response.hits)

						commit('SET_QUERY_STRING', data.string)
						commit('SET_NUMBER_OF_PAGES', response.nbPages)
						commit('SET_CURRENT_PAGE', response.page)

						resolve(response)
					})
					.catch( err => { console.log(err); reject(err); } )

			})

		},


		getUsageGHStats: ({ state }, data) => {

			return new Promise( (resolve, reject) => {
				const config = {
					url: `${ state.apiUrl }/v1/package/gh/${ data.user }/${ data.repo }/stats`
				}

				axios(config)
					.then( response => resolve(response) )
					.catch( err => { console.log(err); reject(err); } )
			}

		)},


		getUsageNPMStats: ({ state }, data) => {

			return new Promise( (resolve, reject) => {
				const config = {
					url: `${ state.apiUrl }/v1/package/npm/${ data.name }/stats`
				}

				axios(config)
					.then( response => resolve(response) )
					.catch( err => { console.log(err); reject(err); } )
			}

		)},


		getListPackageFiles: ({ state }, data) => {

			return new Promise( (resolve, reject) => {
				const config = {
					url: `${ state.apiUrl }/v1/package/npm/${ data.name }@${ data.version }`
				}

				axios(config)
					.then( response => resolve(response) )
					.catch( err => { console.log(err); reject(err); } )
			}

		)}

	},

	getters: {
		PACKAGES: state => state.packages,
		POPULAR_PACKAGES: state => state.popular,
		NUMBER_OF_PAGES: state => state.numberOfPages,
		QUERY_STRING: state => state.queryString,
		CURRENT_PAGE: state => state.currentPage
	}
}
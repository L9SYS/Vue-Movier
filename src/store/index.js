import Vue from 'vue'
import Vuex from 'vuex'
import api from './api'
import * as types from './types'
import storage from './storage'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		imgSrc: 'https://image.tmdb.org/t/p/w500',
		genres: [],
		genresOrder: [],
		favs: [],
		favsOrder: [],
		dMovie: {},
		fId: 0,
		dId: 0,
		movies: {},
		total: 0,
		options: {
			language: 'ru-RU',
			page: 1,
			query: ''
		},
		itemsOrder: [],
		lines: [],
		config: {},
		movieRecommendedOrder: [],
		movieRecommendedTotal: 0,
		movieRecommendeds: []
	},

	actions: {
		[types.GET_GENRES]:({ commit, state }) => {
			const opts = state.options
			api.getGenres(opts, genres => {
				commit(types.RECEIVE_GENRES, genres)
			})
		},
		[types.GET_POPULAR_MOVIES_BY_PAGE]:({ commit, state }, p=1) => {
			state.options.page = p
			const opts = state.options
			api.getPopularMovies(opts, movies => {
				commit(types.RECEIVE_MOVIES_BY_PAGE, movies)
			})
		},
		[types.GET_SEARCH_MOVIES_BY_PAGE]:({ commit, state }, {page=1, query=''}) => {
			state.options.page = page
			state.options.query = query
			const opts = state.options
			api.getSearchMovies(opts, movies => {
				commit(types.RECEIVE_MOVIES_BY_PAGE, movies)
			})
		},
		[types.GET_MOVE_DETAIL]:({ commit, state }) => {
			const opts = state.options,
			move_id = state.dId
			api.getMoveDetail(move_id, opts, dMovie => {
				commit(types.RECEIVE_MOVE_DETAIL, dMovie)
			})
		},
		[types.GET_MOVE_RECOMMENDED]:({ commit, state }) => {
			const opts = state.options,
			move_id = state.dId
			api.getMoveRecommended(move_id, opts, movieRecommendeds => {
				commit(types.RECEIVE_MOVE_RECOMMENDED, movieRecommendeds)
			})
		}
	},

	mutations: {
		[types.RECEIVE_MOVIES_BY_PAGE]: (state, data) => {
			if(data){
				state.itemsOrder = []
				state.total = data.total_results
				data.results.forEach(result => {
					state.itemsOrder.push(result.id)
					Vue.set(state.movies, result.id, result)
				})
			}
		},
		[types.RECEIVE_GENRES]: (state, data) => {
			data.genres.forEach(result => {
				Vue.set(state.genres, result.id, result.name)
			})
		},
		[types.RECEIVE_MOVE_DETAIL]: (state, data) => {
			state.dMovie = data
		},
		[types.RECEIVE_MOVE_RECOMMENDED]: (state, data) => {
			state.movieRecommendedOrder = []
			state.movieRecommendedTotal = data.total_results 			
			data.results.forEach(result => {
				state.movieRecommendedOrder.push(result.id)
				Vue.set(state.movieRecommendeds, result.id, result)
			})
		},
		[types.SET_FAV]: (state,obj) => {
			console.log(obj.id,'**********************');
			console.log(obj,'<<<<<<<<<<<<<<<<');
			let favs = storage.get('favs') || []
			let favsOrder = storage.get('favsOrder') || []
			if(obj.id){
				if (favsOrder.length) {
					if(favsOrder.indexOf(obj.id) === 0||favsOrder.indexOf(obj.id) > 0){
						favs.splice(favs.indexOf(obj.id), 1)
						favsOrder.splice(favs.indexOf(obj.id), 1)
					}else{
						favs.push(obj.id);
						favsOrder.push(obj.id);
						favs[obj.id] = JSON.parse(JSON.stringify(obj))
					}
				}else{
					favs.push(obj.id);
					favsOrder.push(obj.id);
					favs[obj.id] = JSON.parse(JSON.stringify(obj))
				}
				storage.set('favs',favs) 
				storage.set('favsOrder',favsOrder)
			}
			state.favs = storage.get('favs') || []
			state.favsOrder = storage.get('favsOrder') || []
		},
		[types.CLEAR_FAV]: (state, data) => {
			state.favs = []
			state.favsOrder = []
			storage.remove('favs') 
			storage.remove('favsOrder')
		},
		[types.SET_MOVE_DETAIL_ID]: (state, data) => {
			state.dId =  data
		},
	},

	getters: {
		getMovies(state) {
			return state.itemsOrder.map(id => state.movies[id])
		},
		getGenresById: (state) => (id) => {
			return state.genres[id]
		},
		getImage: (state) => (path) => {
			return `${state.imgSrc}${path}`
		},
		getDetail(state) {
			return state.dMovie
		},
		getTotalPages(state) {
			return state.total
		},
		getFavs(state) {
			return state.favsOrder.map(id => state.favs[id])
		},
		getFavsOrder(state) {
			return state.favsOrder
		},
		getMoviesRecommendeds(state) {
			return state.movieRecommendedOrder.map(id => state.movieRecommendeds[id])
		},
	},
})

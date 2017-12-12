import Vue from 'vue'
import Router from 'vue-router'

import Movies from './../components/Movies'
import Movie from './../components/Movie'
import Favorites from './../components/Favorites'
Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '/',
			name: 'Movies',
			component: Movies,
		},
		{
			path: '/movie/:movie_id',
			name: 'Movie',
			component: Movie,
		},
		{
			path: '/favs',
			name: 'favs',
			component: Favorites,
		}
	],
})

const encode = data => {
	const encoded = Object.keys(data).map(key => {
		const value = encodeURIComponent(data[key].toString())
		return `${key}=${value}`
	})
	return encoded.join('&')
}

const host = 'https://api.themoviedb.org/3'
const api_key = '{{API_KEY}}'

class Api {
	
	getPopularMovies(options,cb) {
		//* Get a list of the current popular movies on TMDb. This list updates daily. *//
		return fetch(`${host}/movie/popular?api_key=${api_key}&${encode(options)}`).then(resp => resp.json()).then(data => cb(data))
	}

	getGenres(options,cb) {
		//* Get the list of official genres for movies. *//
		return fetch(`${host}/genre/movie/list?api_key=${api_key}&${encode(options)}`).then(resp => resp.json()).then(data => cb(data))
	}

	getMoveDetail(movie_id,options,cb) {
		//* Get the primary information about a movie. *//
		return fetch(`${host}/movie/${movie_id}?api_key=${api_key}&${encode(options)}`).then(resp => resp.json()).then(data => cb(data))
	}

	getMoveRecommended(movie_id,options,cb) {
		//* Get a list of recommended movies for a movie. *//
		return fetch(`${host}/movie/${movie_id}/recommendations?api_key=${api_key}&${encode(options)}`).then(resp => resp.json()).then(data => cb(data))
	}

	getSearchMovies(options,cb) {
		//* Search for movies. *//
		return fetch(`${host}/search/movie?api_key=${api_key}&${encode(options)}`).then(resp => resp.json()).then(data => cb(data))
	}
}

const api = new Api()

export default api

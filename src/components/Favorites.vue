<template>
	<div class="Movies">
		<b-badge v-on:click.stop.prevent="goEmptyFavs" variant="danger">🗑️</b-badge>
		<ul class="nav d-inline-flex">
			<li v-for="movie in mf" :key="movie.id" class="media">
				<b-card :title="movie.title"
								:img-src="getImage(movie.poster_path)"
								:img-alt="movie.title"
								img-top
								tag="article">
					<h5>
						<b-badge v-on:click.stop.prevent="goTo(movie.id)" variant="primary">👁</b-badge>
						<b-badge v-on:click.stop.prevent="addFav(movie)"
						:class="isFav(movie.id) ? 'inFav': ''" variant="secondary">❤︎</b-badge>
					</h5>			
					<div class="media-genre">
					<b-badge v-for="genre_id in movie.genre_ids" :key="genre_id"
						variant="info">{{getGenresById(genre_id)}}</b-badge>
					<b-badge v-for="genre in movie.genres" :key="genre.id"
						variant="info">{{getGenresById(genre.id)}}</b-badge>
					</div>
				</b-card>
			</li>
		</ul>
	</div>
</template>

<script>
import * as types from '../store/types'

export default {
	components: {  },
	data() {
		return {
			currentPage: 1,
			qryStr: '',
			mode: 'POPULAR',
		}
	},
	created () {
		this.$store.commit(types.SET_FAV, '')
		this.$store.dispatch(types.GET_GENRES)
	},
	computed: {
		mf() {
			return this.$store.getters.getFavs
		}
	},
	methods: {
		getImage(img) {
			return this.$store.getters.getImage(img)
		},
		addFav(obj){
			this.$store.commit(types.SET_FAV, obj)
		},
		isFav(id) {
			return this.$store.getters.getFavsOrder.indexOf(id) >= 0 ? true : false
		},
		getGenresById(id) {
			return this.$store.getters.getGenresById(id)
		},
		goTo(id){
			this.$store.commit(types.SET_MOVE_DETAIL_ID, id)
			this.$router.push({ path: `movie/${id}` })
		},
		goEmptyFavs(){
			this.$store.commit(types.CLEAR_FAV, '')
		}
	}
}
</script>

<style lang="scss" scoped>
.card-title{
	font-size: 14px;
}
.media {
	width: 10%;
	min-width: 120px;
	h5 {
		&> span{
		cursor: pointer;
		color: transparent;
		text-shadow: 0 0 0  white;
		&.inFav{
			background-color:#28a745;
		}
		&:hover {
			text-shadow: 0 0 2px white;
		}
	}
	& > a {
		cursor: pointer;
	}
	}
	.media-genre {
		span {
			margin-right: 8px; 
		}
	}
}
</style>

<template>
	<div class="Movies">
		<b-input-group>
			<b-form-input v-model="qryStr"></b-form-input>
			<b-input-group-button slot="right">
				<b-btn v-on:click.stop.prevent="goSearch" variant="primary">🔍</b-btn>
			</b-input-group-button>
		</b-input-group>
		<ul class="nav d-inline-flex">
			<li v-for="movie in movies" :key="movie.id" class="media">
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
					</div>
				</b-card>
			</li>
		</ul>
		<b-pagination size="md" :total-rows="totalPages" v-model="currentPage" :per-page="20">
    </b-pagination>
	</div>
</template>

<script>
import * as types from '../store/types'

export default {
	components: {  },
	data() {
		return {
			searchVal: '',
			currentPage: 1,
			qryStr: '',
			mode: 'POPULAR',
		}
	},
	created () {
		this.$store.commit(types.SET_FAV, '')
		this.$store.dispatch(types.GET_GENRES)
		this.$store.dispatch(types.GET_POPULAR_MOVIES_BY_PAGE,1)
	},
	computed: {
		movies() {
			return this.$store.getters.getMovies
		},
		totalPages() {
			return this.$store.getters.getTotalPages
		},
	},
	watch: {
		currentPage(e){
			switch (this.mode) {
				case 'POPULAR':
					this.$store.dispatch(types.GET_POPULAR_MOVIES_BY_PAGE,e)
					break
				case 'SEARCH':             
					this.$store.dispatch(types.GET_SEARCH_MOVIES_BY_PAGE, { page: e, query:this.qryStr })
					break;
				default:
					this.$store.dispatch(types.GET_POPULAR_MOVIES_BY_PAGE,e)
			}
		}
	},
	methods: {
		goSearch(){
			this.$store.dispatch(types.GET_SEARCH_MOVIES_BY_PAGE, { page: 1, query:this.qryStr })
			this.mode = 'SEARCH'
		},
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
	}
}
</script>

<style lang="scss" scoped>
.input-group{
	margin-bottom: 18px;
}
.card-title{
	font-size: 14px;
}
.media {
	width: 10%;
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

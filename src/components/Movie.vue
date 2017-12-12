<template>
	<div class="hello">
		<div class="movie-content">
			<b-img :src="getImage(m.backdrop_path)"
			:alt="m.original_title"
			fluid rounded
			class="d-flex mr-3"/>
			<h5 class="d-flex mr-3">
			<b-badge v-on:click.stop.prevent="addFav(m)"
			:class="isFav(m.id) ? 'inFav': ''" variant="secondary">❤︎</b-badge> 
			{{m.title}}
			</h5>
			<div class="media-genre">
				<b-badge v-for="genre in m.genres" :key="genre.id"
				variant="info">{{getGenresById(genre.id)}}</b-badge>
			</div>
			{{m.overview}}
		</div>
	<ul class="nav d-inline-flex">
		<li v-for="m in movieR" :key="m.id" class="card">
			<a src='/movie' v-on:click.stop.prevent="goTo(m.id)">
				<b-img rounded thumbnail class="card-img-top" :src="getImage(m.poster_path)" :alt="m.title"/>
			</a>
		</li>
	</ul>
			
	</div>
</template>

<script>
import * as types from '../store/types'

export default {
	components: { },
	data() {
		return {
			msg: 'Move',
		}
	},
	created () {
		this.$store.commit(types.SET_MOVE_DETAIL_ID, this.$route.params.movie_id)
		this.$store.commit(types.SET_FAV, '')
		this.$store.dispatch(types.GET_MOVE_DETAIL)
		this.$store.dispatch(types.GET_MOVE_RECOMMENDED)
	},
	watch: {
			currentPage(newPage, oldPage) {
					this.items = [];
					var self = this;
			},
	},
	computed: {
		m() {
			return this.$store.getters.getDetail
		},
		movieR() {
			return this.$store.getters.getMoviesRecommendeds
		},
	},
	methods: {
		addFav(obj){
			this.$store.commit(types.SET_FAV, obj)
		},
		isFav(id) {
			return this.$store.getters.getFavsOrder.indexOf(id) >= 0 ? true : false
		},
		getImage(img) {
			return this.$store.getters.getImage(img)
		},
		getGenresById(id) {
			return this.$store.getters.getGenresById(id)
		},
		goTo(id){
			this.$store.commit(types.SET_MOVE_DETAIL_ID, id)
			this.$router.push({ path: `/movie/${id}` })
			this.$store.commit(types.SET_MOVE_DETAIL_ID, this.$route.params.movie_id)
			this.$store.dispatch(types.GET_MOVE_DETAIL)
			this.$store.dispatch(types.GET_MOVE_RECOMMENDED)
		}
	}
}
</script>

<style lang="scss" scoped>
.card{
	width: 8vh;
}

.multiselect{
	margin-bottom: 16px;
}

.movie-content {
	margin-bottom: 16px;
	overflow: hidden;
	&:hover{
		height: 100% !important;
	}
	img {
		height: 30vw;
	}
	h5 > span{
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

	h5 > a {
		cursor: pointer;
	}
	.media-genre {
		span {
			margin-right: 8px; 
		}
	}
}
</style>
<template>
	<div class="container body">
		<header class="mv2 mh0">
			<div>
				<b-nav>
					<b-nav-item><router-link :to="'/'">🏠</router-link></b-nav-item>
					<b-nav-item><router-link :to="'/favs'">❤︎</router-link></b-nav-item>
				</b-nav>
			</div>
		</header>
		<main>
			<router-view></router-view>
		</main>
		<footer class="pv2 ph0 mv2 mh0">
			<span>footer</span>
		</footer>
	</div>
</template>

<script>
import * as types from './store/types'

export default {
	name: 'app',
	components: { },
}
</script>

<style lang="scss" scoped>
.container.body {
	display: flex;
	flex-direction: column;
	min-height: 100vh;
	box-sizing: border-box;
	max-width: 78rem;
}
main {
	flex: 1;
}
</style>

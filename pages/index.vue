<template lang="pug">
#main.noselect
	#home
		logo
</template>

<script>
import Logo from '../components/Logo'
import axios from 'axios'
import { mapMutations } from 'vuex'

export default {
	components: { Logo },
	mounted() {
		this.isLoadingComplete = true
	},

	methods: {
		...mapMutations({
			setProjects: 'setProjects'
		})
	},

	data() {
		return {}
	}
}
</script>

<style lang="scss" scoped>
#main {
	height: 100%;
	#home {
		width: 100%;
		margin-bottom: 120px;
	}
}
</style>
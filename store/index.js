export const state = () => ({
	projects: null,
	filter: 'use'
})

export const mutations = {
	setProjects(state, projects) {
		state.projects = projects
	},

	setFilter(state, filter) {
		state.filter = filter
	}
}

export const getters = {
	getProjects(state) {
		return state.projects
	},

	getFilter(state) {
		return state.filter
	}
}

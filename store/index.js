export const state = () => ({
	projects: null,
	currentProject: -1,
	filter: 'use'
})

export const mutations = {
	setProjects(state, projects) {
		state.projects = projects
	},

	setCurrentProject(state, currentProject) {
		state.currentProject = currentProject
	},

	setFilter(state, filter) {
		state.filter = filter
	}
}

export const getters = {
	getProjects(state) {
		return state.projects
	},

	getCurrentProject(state) {
		return state.currentProject
	},

	getFilter(state) {
		return state.filter
	}
}

export const state = () => ({
	projects: null,
	currentProject: 0,
	currentSection: 'gallery-time',
	filter: 'use'
})

export const mutations = {
	setProjects(state, projects) {
		state.projects = projects
	},

	setCurrentProject(state, currentProject) {
		state.currentProject = currentProject
	},

	setCurrentSection(state, currentSection) {
		state.currentSection = currentSection
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

	getCurrentSection(state) {
		return state.currentSection
	},

	getFilter(state) {
		return state.filter
	}
}

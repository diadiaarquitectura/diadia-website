export const state = () => ({
	projects: null,
	currentProject: 0,
	currentSection: 'gallery-custom', // time, use, archive, custom
	filter: 'custom',
	studioInfo: null
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
	},

	setStudioInfo(state, info) {
		state.studioInfo = info
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
	},

	getStudioInfo(state) {
		return state.studioInfo
	}
}

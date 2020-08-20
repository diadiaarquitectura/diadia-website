export const state = () => ({
	projects: null,
	currentProject: 0,
	currentSection: 'gallery-work',
	filter: 'custom',
	studioInfo: null,
	contactInfo: null,
	basesInfo: null
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
	},

	setContactInfo(state, info) {
		state.contactInfo = info
	},

	setBasesInfo(state, info) {
		state.basesInfo = info
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
	},

	getContactInfo(state) {
		return state.contactInfo
	},

	getBasesInfo(state) {
		return state.basesInfo
	}
}

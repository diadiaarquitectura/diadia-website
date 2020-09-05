export const state = () => ({
	projects: null,
	currentProject: 0,
	currentBase: 0,
	currentSection: 'gallery-default',
	filter: 'custom',
	studioInfo: null,
	contactInfo: null,
	basesInfo: null,
	homeInfo: null
})

export const mutations = {
	setProjects(state, projects) {
		state.projects = projects
	},

	setCurrentProject(state, currentProject) {
		state.currentProject = currentProject
	},

	setCurrentBase(state, currentBase) {
		state.currentBase = currentBase
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
	},

	setHomeInfo(state, info) {
		state.homeInfo = info
	}
}

export const getters = {
	getProjects(state) {
		return state.projects
	},

	getCurrentProject(state) {
		return state.currentProject
	},

	getCurrentBase(state) {
		return state.currentBase
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
	},

	getHomeInfo(state) {
		return state.homeInfo
	}
}

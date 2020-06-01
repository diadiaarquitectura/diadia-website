export const state = () => ({
	filter: 'chronology'
})

export const mutations = {
	setFilter(state, filter) {
		state.filter = filter
		console.log(filter)
	}
}

export const getters = {
	getFilter(state) {
		return state.filter
	}
}

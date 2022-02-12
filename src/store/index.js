import Vue from 'vue'
import Vuex, {createStore, Store} from 'vuex'
Vue.use(Vuex)
const state = {
	text: '默认值'
}

const getters = {
	getText(state) {
		return state.text
	}
}
const actions = {
	setText: ({ commit }, text) => {
        // { commit } 调用dispatch()时，函数内部会把store 作为第一个参数调用
        // var res = handler.call(store, {
        //     dispatch: local.dispatch,
        //     commit: local.commit,
        //     getters: local.getters,
        //     state: local.state,
        //     rootGetters: store.getters,
        //     rootState: store.state
        //   }, payload);
		return commit('setText', text)
	}
}
const mutations = {
	setText: (state, text) => {
		state.text = text
	}
}

export default new Vuex.Store({
	state,
	actions,
	mutations,
	getters
})


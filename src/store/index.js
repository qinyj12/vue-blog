import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        currentUserName: '',
        currentUserAvatar: '',
        currentUserId: ''
    },
    mutations: {
        getCurrentUserInfo(state, value) {
            state.currentUserId = value.id;
            state.currentUserAvatar = value.avatar;
            state.currentUserName = value.nickname;
        }
    },
    actions: {},
    modules: {}
})

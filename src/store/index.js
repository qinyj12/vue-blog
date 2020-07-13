import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        currentUserName: '未登录',
        currentUserAvatar: 'img/avatar0.54e2a03d.png',
        currentUserId: null
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

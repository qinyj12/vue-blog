import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        currentUserName: '',
        currentUserAvatar: ''
    },
    mutations: {
        getCurrentUserInfo(state) {
            // this.axios.defaults.withCredentials = true;
            Vue.axios.post('http://127.0.0.1:5000/getsession')
                .then(response => {
                    console.log(response);
                    state.currentUserAvatar = response.data.result.avatar
              })
        }
    },
    actions: {},
    modules: {}
})

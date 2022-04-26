
export default {
  namespaced: true,
  state: {
    toasts: [],
  },
  mutations: {
    UPDATE_TOAST_MESSAGE(state, payload) {
      state.toastMessage = payload;
    }, 
    UPDATE_TOAST_ALERT_TYPE(state, payload){
      state.toastAlertyType = payload
    }, 
    UPDATE_TOAST_STATUS(state, payload){
      state.showToast = payload;
    }, 
    ADD_TOAST(state, payload){
      state.toasts.push(payload)
    },
    REMOVE_ITEM(state){
      state.toasts.shift();
    }

  },
  actions: {
    triggerToast ({commit},  {message, type}) {
      commit('ADD_TOAST', {
        message, type,id: Date.now()
      })

      setTimeout(() => {
        commit('REMOVE_ITEM')
      }, 1000);
      

    },
  },
  getters: {
    toastMessageWithSmile(state){
      return state.toastMessage + ' ^_^';
    }
  },
}
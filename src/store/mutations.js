export default {
    'CHANGE_STATE_MENU' (state, payload) {
        state.navigation.menu = payload
    },
    'CHANGE_STATE_TRILHOS' (state, payload) {
        state.navigation.trilhos_hidden = payload
    },
    'CHANGE_STATE_OVERLAY' (state, payload) {
        state.navigation.box_overlay = payload
    },
}
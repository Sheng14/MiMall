/**
 * @description 商城的mutations
 * @author Sheng14
 */
export default {
    saveUsername(state, username) {
        state.username = username
    },
    saveCartCount(state, count) {
        state.cartCount = count
    }
}
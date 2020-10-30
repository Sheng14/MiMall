/**
 * @description 商城的actions
 * @author Sheng14
 */
export default {
    saveUsername(context, username) {
        context.commit('saveUsername', username)
    },
    saveCartCount(context, count) {
        context.commit('saveCartCount', count)
    }
}
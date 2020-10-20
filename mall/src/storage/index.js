/**
 * @description 封装storage
 * @author Sheng14
 */

const STORAGE_KEY = 'mall'

export default {
    // 储存特定的值
    setItem(key, value, module_name) {
        if (module_name) { // 按模块储存
            let val = this.getItem(module_name)
            val[key] = value
            this.setItem(module_name, val)
        } else { // 直接储存值
            let val = this.getStorage()
            val[key] = value
            window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(val)) // 同样的需要保存因为只是拿了数据出来修改，改完肯定还是要放回去。
        }
    },

    // 获取特定的值
    getItem(key, module_name) {
        if (module_name) { // 取模块中的key值
            let val = this.getStorage[module_name]
            if (val) {
                return val[key]
            }
        }
        return this.getStorage()[key] // 直接取key值
    },

    // 获取全部sessionStorage里面的值并且json化
    getStorage() {
        return JSON.parse(window.sessionStorage.getItem(STORAGE_KEY) || '{}')
    },

    // 清除某个值
    clear(key, module_name) {
        let val = this.getStorage() // 拿到全部的值来进行操作，相当于抽出来一个对象并不是直接在内存中改故最后要保留
        if (module_name) { // 删除模块的话
            if (!val[module_name]) {
                return
            }
            delete val[module_name] // 模块存在则直接删除对应模块（整体下一级就是模块再下一级就是具体的值）
        } else { // 删除单个值（不一定所有值都有模块）
            delete val[key]
        }
        window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(val)) // 删除完肯定是要保存删除后的结果啊
    }
}
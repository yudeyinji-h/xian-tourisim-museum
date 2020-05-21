import { museums } from "~/assets/js/shaanxi-museums";
export const state = () => ({
    museums: []
})

export const mutations = {
    // 添加selected属性
    // map() 方法返回一个由原数组中的每个元素调用一个指定方法后的返回值组成的新数组
    addSelect(state) {
        state.museums = museums.map(current => {
            current["selected"] = false
            return current
        })
    },
    // 点击之后，改变selected状态
    changeSelected(state, id) {
        state.museums[id].selected = !state.museums[id].selected
    }
}
export const actions = {

}
export const getters = {
    // 将已选数据格式化
    addressArr(state) {
        let res = [];
        let goneAdress = state.museums.filter(item => {
            return item.selected;
        })
        for (let i = 0; i < goneAdress.length; i++) {
            res.push({
                name: goneAdress[i].museum,
                value: [goneAdress[i].position.lng, goneAdress[i].position.lat, 1]
            })
        }
        return res;
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}

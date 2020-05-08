import { museums } from "~/assets/js/shaanxi-museums";
export const state = () => ({
    museums:[]
})

export const mutations = {
    // 添加selected属性
    addSelect(state) {
       // for (let index in state.museums){
         //   state.museums[index]["selected"]=false
        //}
         museums.map(current => {
            current["selected"] = false
            state.museums.push(current)
        })


    },
    // 点击之后，改变selected状态
    changeSelected(state, id) {
        //let choosedMuseum = state.museums.find((item, index) => { item.id === id })
        //choosedMuseum.selected = !choosedMuseum.selected
        state.museums[id].selected=!state.museums[id].selected
    }

}

export const actions = {

}
export const getters = {

}

export default {
    state,
    mutations,
    actions,
    getters
}

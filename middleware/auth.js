export default function ({ store, redirect }) {
    if (store.getters.addressArr.length === 0) {
        return redirect('/museumList');
    }
}



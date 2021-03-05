const initialStore = {
    products: [],
}

const lastProducts = (store = initialStore, action) => {
    switch (action.type) {
        case 'SET_TO_LAST_PRODUCTS': {
            let alreadyExist = false
            store.products.forEach((elem) => {
                if (elem._id === action.payload._id) {
                    alreadyExist = true
                }
            })
            if (!alreadyExist) {
                store.products.push(action.payload)
            }
            return { ...store, products: [...store.products] }
        }
        default:
            return store
    }
}

export default lastProducts
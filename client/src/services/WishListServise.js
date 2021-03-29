import Ajax from "./Ajax";

const {get} = Ajax


class WishListService {


    checkIfProductInWishList(currentProduct_id, setFunction, valueForSet) {
        let cleanupFunction = false;
        get('/wishlist')
            .then(wishlist => {
                if (!cleanupFunction) {
                    if (wishlist !== null) {
                        const filteredList = wishlist.products.filter(product => product._id === currentProduct_id);
                        if (filteredList.length > 0)
                            setFunction(valueForSet)
                    }
                }
            })
        return () => cleanupFunction = true
    }
}


export default new WishListService();
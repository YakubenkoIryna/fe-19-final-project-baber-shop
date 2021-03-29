import { updateCart } from '../store/cart/actionCart'
import Ajax from './Ajax'

const { get, put, post } = Ajax
export const cartMerging = (products, dispatch) => {

  async function fetch () {
    const existingCart = await get('/cart')
    const mergedArr = []
    if (existingCart === null) {
      products.forEach(item => {mergedArr.push(item)})
    } else {
      products.forEach(item => {mergedArr.push(item)})
      existingCart.products.forEach(item => {mergedArr.push(item)})
    }
    const uniq = {}
    const arrFiltered = mergedArr.filter(obj => !uniq[obj.product._id] && (uniq[obj.product._id] = true))
    const items = arrFiltered.map(product => {
      return { product: product.product._id, cartQuantity: product.cartQuantity }
    })
    existingCart
      ? await put('/cart', '', { products: [...items] })
      : await post('/cart', { products: [...items] })
    dispatch(updateCart(arrFiltered))
  }

  fetch()

}
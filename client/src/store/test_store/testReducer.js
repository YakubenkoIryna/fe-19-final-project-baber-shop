import {TEST_STORE} from '../actionTypes'

const initialValue = {
  name: 'new product for testing purposes',
  currentPrice: 199.99,
  previousPrice: 250,
  categories: 'men',
  imageUrls: ['img/products/men/001.png', 'img/products/men/002.png'],
  quantity: 100,
  color: 'red',
  productUrl: '/men',
  brand: 'braaaand',
  myCustomParam: 'some string or json for custom param',
}

const testReducer = (state = initialValue, action) => {
  switch (action.type) {
    case TEST_STORE:
      return {
        ...state,
        name: 'new Name',
      }
    default:
      return state
  }
}

export default testReducer

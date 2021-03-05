import Ajax from "./Ajax";

class ProductService {
  async getProductsForBanner (category = { id: "razor" }) {
    const response = await Ajax.get(`/products/filter?categories=${category.name}`);
    if (response.productsQuantity > 0) {
      return response.products.splice(0, 4);
    } else {
      return null;
    }
  }

  async createProduct (product) {
    return await Ajax.post("/products", product);
  }

  async getProductsListForAdminPageByFiletr (query) {
    const response = await Ajax.get(`/products/filter${query}`);
    if (response?.products.length > 0) {
      return response;
    } else {
      return null;
    }
  }

  async deleteProduct (id) {
    return await Ajax.deleteRequest(`/products`, id);
  }

}

export default new ProductService();
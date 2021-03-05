import Ajax from "./Ajax";

class CategoryService {
  async getRandomCategories (count) {
    const allCategories = await Ajax.get("/catalog");

    if (allCategories && allCategories.length > 0) {
      const slice = allCategories.filter(c => +c.level === 3).sort(() => .5 - Math.random()).slice(0, count);
      return Promise.all(slice.map(async cat => {
        const lowest = await this.getLowestPrice(cat);
        return {
          ...cat,
          price: Number.isFinite(lowest) ? lowest : null
        };
      }));
    } else {
      return null;
    }
  }

  async getLowestPrice (category = { id: "razor" }) {
    const { products } = await Ajax.get(`/products/filter?categories=${category.name}`);
    return Math.min.apply(Math, (products || []).map(p => p.currentPrice));
  }

  async getCategories () {
    return await Ajax.get("/catalog");
  }

  async getCategory (id) {
    return await Ajax.get(`/catalog/${id}`);
  }

  async getUniqIdCategoriesWithLevel (level) {
    const allCategories = await this.getCategories();
    if (allCategories && allCategories.length > 0) {
      const uniq = allCategories
        .filter(cat => cat.level === level)
        .map(cat => cat.id);
      return [...new Set(uniq)];
    } else {
      return null;
    }
  }

  async createCategory (category) {
    return await Ajax.post("/catalog", category);
  }

  async getCategoriesSortedPerLevels () {
    const allCategories = await this.getCategories();
    const sortedCategories = {};
    if (allCategories && allCategories.length > 0) {
      const levels = [...new Set(allCategories.map(cat => cat.level))];
      for (const key of levels) {
        const uniq = allCategories
          .filter((cat, index) => cat.level === key)
        sortedCategories[key] = [...new Set(uniq)];
      }
      return sortedCategories;
    } else {
      return null;
    }
  }

  async updateCategory (id, updates) {
    return await Ajax.put(`/catalog`, id, JSON.stringify(updates));
  }

  async deleteCategory (id) {
    return await Ajax.deleteRequest(`/catalog`, id);
  }

  async getCategoriesNestedByLevels() {
    const allCategories = await this.getCategories();
    return allCategories.filter(topLevel => {
      allCategories.map(subLevel => {
        if (subLevel.parentId === topLevel.id) {
          const e = topLevel.childLevel || [];
          e.push(subLevel);
          topLevel.childLevel = e;
        }
        return subLevel
      })
      return topLevel.level === '1';
    });
  }
}

export default new CategoryService();
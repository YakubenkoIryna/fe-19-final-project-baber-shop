import Ajax from "./Ajax";

class FilterServices {

  async getListByFilterType (filterTypes) {
    const requestedFilters = {};
    for (const filter of filterTypes) {
      const res = await Ajax.get(`/filters/${filter}`);
      if (res?.length > 0) requestedFilters[filter] = res;
    }
    return Object.entries(requestedFilters) === 0 ? null : requestedFilters;
  }

}

export default new FilterServices();

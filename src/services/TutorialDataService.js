import http from "../http-common";

class TutorialDataService {
  getAll() {
    return http.get("/products/es-search/*/");
  }

  get(id) {
    return http.get(`/products/id-es-search/${id}/`);
  }

  create(data) {
    return http.post("/products/api/", data);
  }

  update(id, data) {
    return http.put(`/products/api/${id}/`, data);
  }

  delete(id) {
    return http.delete(`/products/api/${id}/`);
  }

  // deleteAll() {
  //   return http.delete(`/tutorials`);
  // }

  findByTitle(title) {
    return http.get(`/products/es-search/${title}/`);
  }
}

export default new TutorialDataService();

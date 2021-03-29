import Ajax from "./Ajax";

class CloudinaryService {

  async imageUpload (data) {
    return await Ajax.post("/cloudinary/uploadimages", data);
  }

  async imageRemove (public_id) {
    return await Ajax.post("/cloudinary/removeimage", public_id);
  }

}

export default new CloudinaryService();
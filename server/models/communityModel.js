// models/communityModel.js
const { ObjectId } = require("mongodb");
class Community {
    constructor(formData) {
      this._id = new ObjectId(formData._id);;
      this.name = formData.name || "";
      this.status = formData.status || 1;
      this.address = formData.address || "";
      this.createdat = formData.createdat || Date.now();
      this.updatedat = formData.updatedat || Date.now();
    }
  }
  
  module.exports = Community;
  
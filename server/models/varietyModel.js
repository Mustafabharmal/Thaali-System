const { ObjectId } = require("mongodb");

class Variety {
    constructor(formData) {
        this._id = new ObjectId(formData._id);
        this.name = formData.name || "";
        this.calories = formData.calories || 0;
        // this.quantity = formData.quantity || 0;
        this.gujaratiName = formData. gujaratiName || "";
        this.communityid = formData.communityid || "";
        this.description = formData.description || "";
        this.status = formData.status || 1;
        this.createdat = formData.createdat || Date.now();
        this.updatedat = formData.updatedat || Date.now();
    }
}

module.exports = Variety;

const { ObjectId } = require("mongodb");

class Menu {
    constructor(formData) {
        this._id = new ObjectId(formData._id);
        this.date = formData.date || new Date();
        this.name = formData.name || "";
        this.gujaratiName = formData.gujaratiName || "";
        this.description = formData.description || "";
        this.communityid = formData.communityid || "";
        this.calories = formData.calories || 0;
        this.quantity = formData.quantity || 0;
        this.status = formData.status || 1;
        this.createdat = formData.createdat || new Date();
        this.updatedat = formData.updatedat || new Date();
    }
}

module.exports = Menu;

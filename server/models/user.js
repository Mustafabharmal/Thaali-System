const { ObjectId } = require("mongodb");

class User {
    constructor(formData) {
        // Map form data to the User model
        this._id = new ObjectId(formData._id); // You might want to generate a new ObjectId if it's not provided
        this.name = formData.name || "";
        this.communityid = formData.communityid || "0";
        this.thaaliuser = formData.thaaliuser || "1";
        this.email = formData.email || "";
        this.role = formData.role || "0";
        this.password = formData.password || "";
        this.headcount = formData.headcount || "1";
        this.phoneno = formData.phoneno || "";
        this.status = formData.status || 1;
        this.address = formData.address || "";
        this.createdat = formData.createdat || Date.now();
        this.updatedat = formData.updatedat || Date.now();
    }
}

module.exports = User;

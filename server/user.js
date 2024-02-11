// const mongoose = require('mongoose');

// const unitSchema = new mongoose.Schema({
//   unit: { type: Number, required: true },
//   starting: { type: Date, required: true },
//   validity: { type: Date, required: true },
//   createdAt: { type: Date, default: Date.now },
//   updatedAt: { type: Date, default: Date.now },
// });

// const userSchema = new mongoose.Schema({
//   id: { type: Number, required: true },
//   name: { type: String, required: true },
//   address: { type: String, required: true },
//   role: { type: Number, required: true },
//   status: { type: Number, required: true },
//   email: { type: String, required: true },
//   phoneNo: { type: String, required: true },
//   communityId: { type: Number, required: true },
//   password: { type: String, required: true },
//   headCount: { type: Number, required: true },
//   units: [unitSchema],
//   createdAt: { type: Date, default: Date.now },
//   updatedAt: { type: Date, default: Date.now },
//   thaaliUser: { type: Number, required: true },
// });

// const User = mongoose.model('User', userSchema);

// module.exports = User;
// Assuming you have mongoose already set up
// user.model.js
const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
  name: String,
  address: String,
  role: Number,
  status: { type: Number, default: 1 }, // Add default value for status if not provided
  email: String,
  phoneNo: String,
  communityId: Number,
  password: String,
  headCount: Number,
  units: Array,
  thaaliUser: Number,
  createdat: { type: Date, default: Date.now },
  updatedat: { type: Date, default: Date.now },
});

// Create the User model using Mongoose
const User = mongoose.model('User', userSchema);

module.exports = User;
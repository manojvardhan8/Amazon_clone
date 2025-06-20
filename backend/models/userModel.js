// backend/models/userModel.js
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // No two users can have the same email
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false, // Default new users to be non-admins
  },
}, {
  timestamps: true, // Automatically add createdAt and updatedAt
});

// TEACHING MOMENT: Hashing the password BEFORE saving to the database
// We use a mongoose "middleware" that runs before the 'save' event.
userSchema.pre('save', async function (next) {
  // We only want to hash the password if it has been modified (or is new)
  if (!this.isModified('password')) {
    return next();
  }
  // A "salt" is random data that is used as an additional input to a one-way function that "hashes" a password.
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Add a method to our schema to compare an entered password with the hashed password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;
import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/\S+@\S+\.\S+/, 'is invalid'],
  },
  password: {
    type: String,
    required: true,
  },
  followers: {
    type: Array,
    default: [],
  },
  following: {
    type: Array,
    default: [],
  },
  bookmarks: {
    type: [Schema.Types.ObjectId],  // Ensure it's an array of ObjectIds
    default: [],
  },
}, {
  timestamps: true,
});

const User = mongoose.model('User', userSchema);

export default User;

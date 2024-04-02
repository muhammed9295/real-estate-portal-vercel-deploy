import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const agentSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },

    lastName: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: [true, "Password is required"],
    },

    companyName: {
      type: String,
    },

    phone: {
      type: String,
    },

    avatar: {
      type: String,
    },

    properties: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Property",
      },
    ],

    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

//encrypting password
agentSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
});
//encrypting password

// comparing password
agentSchema.methods.isPasswordValid = async function (password) {
  return await bcrypt.compare(password, this.password);
};
// comparing password

// generating access token
agentSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};
// generating access token

// generating refresh token
agentSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    { _id: this._id }, 
    process.env.REFRESH_TOKEN_SECRET, 
    {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
  }
  );
};
// generating refresh token

export const Agent = mongoose.model("Agent", agentSchema);

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  method: {
    type: String,
    enum: ["local", "google", "facebook"],
    required: true
  },
  local: {
    full_name: {
      type: String
    },
    email: {
      type: String,
      lowercase: true
    },
    password: {
      type: String
    },
    birthday: {
      type: Date
    },
    phone_number: {
      type: String
    },
    country: {
      type: String
    },
    level: {
      type: String
    },
    verified: {
      type: String,
      enum: ["yes", "no"]
    },
    status: {
      type: String,
      enum: ["on", "off"]
    }
  },
  google: {
    id: {
      type: String
    },
    email: {
      type: String,
      lowercase: true
    }
  },
  facebook: {
    id: {
      type: String
    },
    email: {
      type: String,
      lowercase: true
    }
  }
});

userSchema.pre("save", async function(next) {
  try {
    if (this.method !== "local") {
      next();
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.local.password, salt);
    this.local.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.isValidPassword = async function(newPassword) {
  try {
    return await bcrypt.compare(newPassword, this.local.password);
  } catch (error) {
    throw new Error(error);
  }
};

const User = mongoose.model("user", userSchema);

module.exports = User;

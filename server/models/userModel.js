const mongoose = require("mongoose");
const zxcvbn = require("zxcvbn");

// Create a Mongoose schema
const userSchema = new mongoose.Schema({
  // Common for all
  userType: {
    type: String,
    required: true,
    enum: ["donor", "organization", "hospital", "admin"],
  },

  // required for donor
  name: {
    type: String,
    required: function () {
      if (this.userType == "admin" || this.userType == "donor") {
        return true;
      }
      return false;
    }
  },

  // required for hospital
  hospitalName: {
    type: String,
    required: function () {
      if (this.userType == "hospital") {
        return true;
      }
      return false;
    }
  },

  // required for organization
  organizationName: {
    type: String,
    required: function () {
      if (this.userType == "organization") {
        return true;
      }
      return false;
    }
  },

  // required for hospital or organization
  website: {
    type: String,
    required: function () {
      if (this.userType == "organization" || this.userType == "hospital") {
        return true;
      }
      return false;
    }
  },

  // required for hospital or organization
  address: {
    type: String,
    required: function () {
      if (this.userType == "organization" || this.userType == "hospital" || this.userType == "donor" || this.userType == "admin") {
        return true;
      }
      return false;
    }
  },

  // common for all
  email: {
    type: String,
    required: [true, "Please provide your email"],
    unique: true,
    lowercase: true,
  },

  // common for all
  password: {
    type: String,
    required: [true, "Please provide a password"],
    validate: [
      {
        validator: function (value) {
          const passwordStrength = zxcvbn(value).score;
          return passwordStrength >= 3; // Require a minimum strength of 3 out of 4
        },
        message: "Password is too weak",
      },
      {
        validator: function (value) {
          return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/.test(
            value
          );
        },
        message:
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      },
    ],
  },

  // common for all
  phone: {
    type: String,
    required: [true, "Please provide your phone number"],
  },
},
{
  timestamps: true
},
);

module.exports = mongoose.model("users", userSchema);

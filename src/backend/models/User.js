const mongoose = require ('mongoose')
// Định nghĩa cho User
    const userChema = new mongoose.Schema(
        {
            name: {type: String, required: true},
            email: {type: String, required: true,unique: true},
            password: {type: String, required: true},
            isAdmin: {type: Boolean, default: false, required: true},
            phone: {type: Number, required: true},
            access_token: {type: String, required: true},
            refresh_token: {type: String, required: true},
       },
       {
       timestamps: true
       }
    );
const User = mongoose.model("User",userChema)
module.exports = User;

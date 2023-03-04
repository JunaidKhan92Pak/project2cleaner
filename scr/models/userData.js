const mongoose = require("mongoose");
const jwt  = require("jsonwebtoken")

//--------------Creation of Schema ---------->
const dataSchema = mongoose.Schema(
    {
         firstname: {
            type: String
        },
        lastName: {
            type: String
        },
        email: {
            type: String,
        },
        phone: {
            type: Number
        },
        password: {
            type: String,
            minLength: 6,
            description: "Password mustof at least 12 characters, and is required"
        },
        Address: {
            type: String,
        },
        JobTitel: {
            type: String,
        },
        dob: {
            type: String,
        },
        Token:[String]
    }
);

//--------------------------------->
// dataSchema.methods.genrateToken = async function(){
//     try{
//         const token = jwt.sign({_id:this._id.toString()} , "qwertyuiopasdfghjklzxcvbnmqwertyuiop")
//         this.tokens = this.tokens.concat({token:token})
//         await this.save();
//         console.log(token);
//         return token;
//     }
//     catch{(err)=>{
//       res.send("Error Due to" + err);
//       console.log("Error Due to" + err);
//     }}
// }
const userSaveData =  new mongoose.model("mydata", dataSchema);
module.exports = userSaveData;


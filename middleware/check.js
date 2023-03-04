const jwt = require('jsonwebtoken')
const userSaveData = require("../scr/models/userData");
const check = async (req, res, next) => {
   if (!req.cookies.jwt) {
      res.redirect("/login")
   }
   else{
      const userToken = req.cookies.jwt;
      const playload = await jwt.verify(userToken, "qwertyuiop");
      const TokenData = await userSaveData.findOne({_id:playload._id})
      if (TokenData.Token.includes(userToken)){
         req.User = TokenData;
         next();
      }
      else {
         res.redirect("/login")
      }
   }
}
const dataCheck = async (req, res, next) => {
   if (!req.cookies.jwt) {
      next()
   }
   else{
      const userToken = req.cookies.jwt;
      const playload = await jwt.verify(userToken, "qwertyuiop");
      const TokenData = await userSaveData.findOne({_id:playload._id})
      if (TokenData.Token.includes(userToken)){
         req.User = TokenData;
         next();
      }
      else {
         next();
      }
   }
}
module.exports = {check , dataCheck};  


const mongoose = require("mongoose"); 
const Uri = 'mongodb+srv://juniad:junaid@project2db.ahdyt3l.mongodb.net/?retryWrites=true&w=majority';

mongoose.set('strictQuery', false);

//-------------Conection with server----------->
mongoose.connect(Uri)
.then(
   console.log('Connection with DataBase succesful')
)
.catch((err)=>{
    console.log(`Error Error === ${err}`) 
});
///------------------------------>
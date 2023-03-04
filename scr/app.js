const express = require("express");
const app = express();
const hbs = require("hbs")
const path = require("path");
const router = require("../router/router");
const jwt = require("jsonwebtoken");
const port = process.env.PORT || 3000;

//------------------[require the path]----------------
const publicPath=(path.join(__dirname,"../public"));
const viewspath=(path.join(__dirname,"../templates/views"));
const partialPath=(path.join(__dirname,"../templates/partials"));

//------------------------------------------------->

//----------------[Middleware]----------------------
app.use("/" , router);
app.use(express.static(publicPath));
hbs.registerPartials(partialPath);
app.set('view engine', 'hbs'); 
app.set('views',viewspath);
//-------------------------------------------------->

//--------------[Listing to server] ----------------
app.listen(port, (err)=>{ 
    if(err){
        console.log(`Error Errro == ${err}`); 
    }
    else{  
        console.log(`The Server is running at Port ${port}`); 
    }
});
//-------------------------------------------->
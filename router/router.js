
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
require("../scr/db/conn")
const userSaveData = require("../scr/models/userData");
const Blog = require("../scr/models/BlogData");
const { check, dataCheck } = require("../middleware/check");
const { create } = require("hbs");
const cookieParser = require('cookie-parser')

//----------MiddleWare------------------------>
router.use(express.json())
router.use(express.urlencoded({ extended: false }));
router.use(cookieParser())
//--------------------->

//---------------[Routing]------------>

router.get("/", dataCheck, async (req, res) => {
    const BlogData = await Blog.find({}).lean();
    if (req.User) {
        const UserData = req.User;
        res.render("index", { FName: UserData.firstname, Titel: BlogData })
    }
    else {
        res.render("index", { Titel: BlogData })
    }
});

router.get("/about", dataCheck, (req, res) => {
    if (req.User) {
        const UserData = req.User; 
        res.render("about", { FName: UserData.firstname })
    }
    else {
        res.render("about")

    }
});

router.get("/contact", dataCheck, (req, res) => {
    if (req.User) {
        const UserData = req.User;
        res.render("contact", { FName: UserData.firstname })
    }
    else {
        res.render("contact")
    }
});

router.get("/services", dataCheck, (req, res) => {
    if (req.User) {
        const UserData = req.User;
        res.render("services", { FName: UserData.firstname })
    }
    else {
        res.render("services")

    }
});
router.get("/login", dataCheck, (req, res) => {

    if (req.User) {
        res.redirect("/profile")
    }
    else {
    }
    res.render("login")
});

router.post("/", async (req, res) => {
    const currentEmail = req.body.email;
    const UsedEmail = await userSaveData.findOne({ email: currentEmail });
    if (UsedEmail) {
        res.send(`${currentEmail} is also register`)
    }
    else {
        try {
            const insertData = new userSaveData({
                firstname: req.body.firstname,
                lastName: req.body.lastname,
                email: req.body.email,
                phone: req.body.phone,
                password: req.body.password,
                Confrimpassword: req.body.cpassword
            })

            const ID = insertData._id;
            const signToken = jwt.sign({ _id: ID }, "qwertyuiop")
            res.cookie("jwt", signToken, { maxAge: "20000000" })
            insertData.Token = [signToken, ...insertData.Token]
            const userData = await insertData.save();
            res.redirect("/profile").sendStatus(200)
        }
        catch {
            (err) => {
                res.sendStatus(403)
                console.log(`Error Due to ==> ${err}`);
            }
        }
    }

});

router.post("/login", async (req, res) => {

    const Password = req.body.password;
    const currentEmail = req.body.email;
    const UserData = await userSaveData.findOne({ email: currentEmail });
    if (UserData) {
        if (Password === UserData.password) {
            try {
                const ID = UserData._id
                const signToken = jwt.sign({ _id: ID }, "qwertyuiop")
                res.cookie("jwt", signToken, { maxAge: "20000000" })
                UserData.Token = [signToken, ...UserData.Token]
                await UserData.save();
                res.redirect("/profile").sendStatus(200)
            }
            catch {
                (err) => {
                    
                    console.log("Error Error" + err);
                }
            };
        }
        else {
            res.send("<h2>Invaild Email Password</h2>")
        }
    }
    else { 
        res.send("<h2>Invaild Email Password</h2>")
    }

});
router.get("/profile", check, async (req, res) => {
    const UserData = req.User;
    const ID = UserData._id;
    const BlogData = await Blog.find({ CreatedBy: ID }).lean();
    res.render("profile", { UserData: UserData, Titel: BlogData });

});

router.get("/logout", check, async (req, res) => {
    const currentCookies = req.cookies.jwt;
    const currentUser = req.User;

    let otherTokken = currentUser.Token.filter((currentTokkens) => {
        return currentTokkens !== currentCookies;
    });
    res.clearCookie("jwt");
    currentUser.Token = otherTokken;
    await currentUser.save();
    res.redirect('/');
});

router.post("/message", async (req, res) => {
    res.send(`User Name : ${req.body.Name}<br></br> User Email : ${req.body.Email} <br></br> Message : ${req.body.Message}`)
});

router.get("/editProfile", check, (req, res) => {
    const UserData = req.User;
    res.render("editprofile", {
        FName: UserData.firstname, LastName: UserData.lastName, EMAIL: UserData.email, Phone: UserData.phone, Address: UserData.Address
        , dob: UserData.dob, JobTitel: UserData.JobTitel
    })
});
router.post("/editProfile", check, async (req, res) => {
    try {
        const UserData = req.User;
        const ID = UserData._id;
        const updateData = await userSaveData.findOneAndUpdate({ _id: ID }, {
            $set: {
                firstname: req.body.firstname,
                lastName: req.body.lastname,
                email: req.body.email,
                phone: req.body.phone,
                Address: req.body.address,
                dob: req.body.dob,
                JobTitel: req.body.JobTitel
            }
        }
        );
        const currentCookies = req.cookies.jwt;
        let otherTokken = updateData.Token.filter((currentTokkens) => {
            return currentTokkens !== currentCookies;
        });
        res.clearCookie("jwt");
        updateData.Token = otherTokken;
        await updateData.save();
        res.redirect("/profile")
    }
    catch {
        (err) => {
            console.log("Error Error" + err);
        }
    }
});

router.post("/profile", check, async (req, res) => {
    try {
        const UserData = req.User;
        const ID = UserData._id;
        const insertBlog = new Blog({
            CreatedBy: ID,
            blogTitle: req.body.blogTitle,
            shortDescri: req.body.shortDescri,
            description: req.body.descri,
        })
        await insertBlog.save();
        res.redirect("/profile"); 
    }
    catch {
        (err) => {
            console.log(err);
        }
    }
});

router.post("/editBlog", async (req, res) => {
    const BlogId = req.body.id;
    const updateblog = await Blog.findOneAndUpdate({ _id: BlogId }, {
        $set: {
            blogTitle: req.body.blogTitle,
            shortDescri: req.body.shortDescri,
            description: req.body.descri,
        }
    })
    await updateblog.save();
    res.redirect('/profile')
})

router.post('/blogs', (req, res) => {
    const BlogId = req.body.name;
    Blog.findOne({ _id: BlogId }).lean().then(msg => {
        res.render("blogs", { BlogData: msg })
    })
})
router.post('/deleteBlog', (req, res) => {
    const BlogId = req.body.id;
    Blog.deleteOne({ _id: BlogId }).lean().then(msg => {
        res.redirect("/profile")
    })
});
//------------------[Routing]------------------------------->

//---[Export the router]------------>
module.exports = router
//------------------>


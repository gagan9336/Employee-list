const express = require("express"),
    methodOverride = require("method-override"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    Employe = require("./models/employer");

const Port = process.env.PORT || 2000;

mongoose.connect("mongodb://localhost:27017/employer1", { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true });


app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));

app.get('/', (req, res) => {
    Employe.find({}, (err, cred) => {
        if (err) {
            console.log(err);
        } else {
            res.render('index', { cred: cred });
        }
    })
})

app.post('/', (req, res) => {
    const credentials = {
        email: req.body.email,
        username: req.body.username,
        phone: req.body.phone,
        age: req.body.age
    }
    Employe.create(credentials, (err) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/');
        }
    })
});

app.get("/emp/:id", (req, res) => {
    Employe.findById((req.params.id), (err, cred) => {
        if (err) {
            console.log(err);
        } else {
            res.render("edit", { cred: cred });
        }
    });
});

app.put("/emp/:id", (req, res) => {
    Employe.findByIdAndUpdate(req.params.id, req.body.cred, (err, cred) => {
        if (err) {
            res.send('error');
        } else {
            res.redirect('/emp/' + cred._id);
        }
    });
});

app.delete("/emp/:id", (req, res) => {
    Employe.findByIdAndDelete(req.params.id, (err) => {
        if (err) {
            res.redirect("/campGround");
        } else {
            res.redirect("/");
        }
    })
});

app.listen(Port, (req, res) => {
    console.log(`Your server is running in a port ${Port}`);
})


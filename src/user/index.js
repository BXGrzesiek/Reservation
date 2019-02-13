const {Router} = require ('Express')

app.post("/", (req, res) => {
    session.login = null;
    session.subject = null;
    res.sendFile(`${__dirname}/index.html`);
})
app.get("/", (req, res) => {
    if (session.login === null) {
        res.sendFile(`${__dirname}/index.html`);
    } else {
        res.render("student", {
            login: session.login,
            subject: session.subject
        });
    }
})
app.post("/change", perser, (req, res) => {
    console.log(req.body);
    res.redirect("/login");
    return res.render("student", {
        login: session.login,
        subject: session.subject
    });
})
app.get("/register", perser, (req, res) => {
    if (session.login === null) {
        return res.sendFile(`${__dirname}/register.html`);
    } else {

        return res.render("student", {
            login: session.login,
            subject: session.subject
        });
    }

})
app.post("/register", perser, (req, res) => {
    res.sendFile(`${__dirname}/register.html`);
})
app.get("/confirm", perser, (req, res) => {
    if (session.login === null) {
        res.redirect("/")
        res.sendFile(`${__dirname}/index.html`);
    } else {
        res.render("student", {
            login: session.login,
            subject: session.subject
        });
    }
})
app.post("/confirm", perser, (req, res) => {

    const tempArray=req.body.subject.split(",");
    const array=[];
    tempArray.forEach(element => {
        array.push({
            sub:element,
            rating:0
        })
    });
    const person = new MongoDB({
        login: req.body.login,
        password: req.body.password,
        subject: array
    });
    person.save((err, data) => {
        console.log(data);
    })
    res.sendFile(`${__dirname}/confirm.html`);
})
app.get("/login", (req, res) => {
    res.redirect("/")
})
app.post("/login", perser, (req, res) =>
{
    MongoDB.findOne({
        login: req.body.login,
        password: req.body.password
    }, (err, user) => {
        if (err) {
            console.log("error")
            return res.status(404).send();
        }
        if (!user) {
            console.log(req.body.login);
            res.redirect("/");
            return res.sendFile(`${__dirname}/index.html`);
        } else {
            session.login = user.login;
            session.subject = user.subject;
            return res.render("student", {
                login: session.login,
                subject: session.subject
            });
        }
    })
})

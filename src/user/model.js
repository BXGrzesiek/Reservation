

const MongoDB = mongoose.model("Study", User);

app.use(express.static("public"));
session.login = null;
session.subject = null;

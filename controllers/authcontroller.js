const User = require("../model/user");
const bcrypt = require("bcryptjs");

exports.getRegister = (req, res) => {
  res.render("registration.ejs");
};

exports.postRegister = async (req, res) => {
  const { name, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 12);

  await User.create({
    name,
    email,
    password: hashedPassword
  });

  res.redirect("/login");
};

exports.getLogin = (req, res) => {
  res.render("login.ejs", {msg : false});
};

exports.postLogin = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.render("login.ejs",{msg : "user does nor exist"});
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.render("login.ejs", {msg: "incorrect password"});
  }

  req.session.isLoggedIn = true;
  req.session.user = user;

  res.redirect("/products");
};

exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
};
exports.welcome = (req,res,next) =>{
    res.render('welcome.ejs');
}
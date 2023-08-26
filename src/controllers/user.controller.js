const login = async (req, res) => {
  if (!req.user)
    return res
      .status(400)
      .send({ status: error, error: "Invalid credencials" });
  //aca es donde en base al req.user puedo hacer esta valicacion para permitirle el ingreso al usuario solicitante
  req.session.user = {
    first_name: req.user.first_name,
    last_name: req.user.last_name,
    age: req.user.age,
    email: req.user.email,
    role: req.user.role,
  };
  res.send({ status: "success", message: "Login success" });
};

const register = async (req, res) => {
  res.send({ status: "success", message: "User registered" });
};

const failRegister = async (req, res) => {
  res.send({ status: "error", message: "Register Failed" });
};

const failLogin = async (req, res) => {
  res.send({ status: "error", message: "Login Failed" });
};

const github = async (req, res) => {
  res.send({ status: "success", message: "User registered" });
};

const githubCallback = async (req, res) => {
  req.session.user = req.user;
  res.redirect("/");
};

const reset = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res
        .status(400)
        .send({ status: error, error: "Incompelte values" });

    const user = await userModel.findOne({ email });

    if (!user)
      return res.status(400).send({ status: error, error: "User not found" });

    user.password = createHash(password);

    await userModel.updateOne({ email }, user);

    res.send({ status: "success", message: "Password reseted" });
  } catch (error) {
    return res.status(500).send({ status: "error", error: error.message });
  }
};

const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err)
      return res.status(500).send({ status: "error", error: "Logout fail" });
    res.redirect("/");
  });
};

export {
  login,
  register,
  failLogin,
  failRegister,
  github,
  githubCallback,
  reset,
  logout,
};

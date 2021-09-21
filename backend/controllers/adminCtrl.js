const Admins = require("../models/adminModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const adminCtrl = {
  register: async (req, res) => {
    try {
      const { name, email, password } = req.body;

      const admin = await Admins.findOne({ email });
      if (admin)
        return res
          .status(400)
          .json({ msg: "Este correo electronico ya existe" });

      if (password.length < 6)
        return res
          .status(400)
          .json({ msg: "La contraseña al menos debe de tener 6 caracteres" });

      //password encryption
      const passwordHash = await bcrypt.hash(password, 10);

      const newAdmin = new Admins({
        name,
        email,
        password: passwordHash,
      });

      //save mongodb
      await newAdmin.save();

      //the create jsonwebtoken to authentication
      const accesstoken = createAccessToken({ id: newAdmin._id });
      //const refreshtoken = createRefreshToken({ id: newAdmin._id });

      /*res.cookie("refreshtoken", refreshtoken, {
        httpOnly: true,
        path: "/admin/refresh_token",
      });*/

      res.json({ accesstoken });
    } catch (error) {
      return res.status(500).json({ msg: err.message });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const admin = await Admins.findOne({ email });
      if (!admin)
        return res.status(400).json({ msg: "No existe este administrador" });

      const isMatch = await bcrypt.compare(password, admin.password);
      if (!isMatch)
        return res.status(400).json({ msg: "Contraseña incorrecta" });

      //if login success, create access tokan
      const accesstoken = createAccessToken({ id: admin._id });
      //(const refreshtoken = createRefreshToken({ id: admin._id });

      /*res.cookie("refreshtoken", refreshtoken, {
        httpOnly: true,
        path: "/admin/refresh_token",
      });*/

      res.json({ accesstoken });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  /*logout: async (req, res) => {
    try {
      res.clearCookie("refreshtoken", { path: "/admin/refresh_token" });
      return res.json({ msg: "Logged out" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },*/
  /*refreshToken: (req, res) => {
    try {
      const rf_token = req.cookies.refreshtoken;

      if (!rf_token)
        return res.status(400).json({ msg: "Please Login or Register" });

      jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, admin) => {
        if (err)
          return res.status(400).json({ msg: "Please Login or Register" });

        const accesstoken = createAccessToken({ id: admin.id });

        res.json({ accesstoken });
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },*/
  getAdmin: async (req, res) => {
    try {
      const token = req.header("Authorization");
      if (!token) return res.send(false);

      jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        async (err, verified) => {
          if (err)
            return res
              .status(400)
              .json({ msg: "Por favor inicia sesion o registrate" });

          const admin = await Admins.findById(verified.id);
          if (!admin) return res.send(false);

          return res.send(true);
        }
      );

      /*const admin = await Admins.findById(req.admin.id).select("-password");
      if (!admin) return res.status(400).json({ msg: "Admin does not exist." });*/

      //res.json(admin); //id of admin
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

const createAccessToken = (admin) => {
  return jwt.sign(admin, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1d" });
};

/*const createRefreshToken = (admin) => {
  return jwt.sign(admin, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
};*/

module.exports = adminCtrl;

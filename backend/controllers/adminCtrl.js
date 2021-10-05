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

      res.json({ msg: "El registro fue correcto" });
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

      res.json({ accesstoken });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

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
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

const createAccessToken = (admin) => {
  return jwt.sign(admin, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1d" });
};

module.exports = adminCtrl;

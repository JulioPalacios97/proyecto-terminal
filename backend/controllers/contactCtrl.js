const Contacts = require("../models/contactModel");
const { transporter } = require("../middleware/nodemailer");

const contactCtrl = {
  getContacts: async (req, res) => {
    try {
      const contacts = await Contacts.find();

      res.json(contacts);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  createContact: async (req, res) => {
    try {
      const { username, email, phone, service, content } = req.body;

      const contact = await Contacts.findOne({ email });
      if (contact)
        return res.status(400).json({ msg: "Este correo ya existe" });

      const newContact = new Contacts({
        username,
        email,
        phone,
        service,
        content,
      });

      //senEmail
      await transporter.sendMail({
        from: '"Solicitud de cotización" <julpal97@gmail.com>', // sender address
        to: process.env.USER_EMAIL_GMAIL, // list of receivers
        subject: "Solicitud de cotización", // Subject line
        html: `<p>Nombre: ${username}</p>
          <p>Email: ${email}</p>
          <p>Telefono: ${phone}</p>
          <p>Servicio: ${service}</p>
          <p>Texto: ${content}</p>`, // html body
      });

      await newContact.save();

      res.json({ msg: "Mensaje enviado" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteContact: async (req, res) => {
    try {
      await Contacts.findByIdAndDelete(req.params.id);
      res.json({ msg: "Cliente eliminado" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = contactCtrl;

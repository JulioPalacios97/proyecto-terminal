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
      const { username, lastname, email, phone, service, content } = req.body;

      const contact = await Contacts.findOne({ email });
      if (contact)
        return res.status(400).json({ msg: "This email already exists" });

      const newContact = new Contacts({
        username,
        lastname,
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
        html: `<p>nombre: ${username}</p>
          <p>apellido: ${lastname}</p>
          <p>email: ${email}</p>
          <p>telefono: ${phone}</p>
          <p>servicio: ${service}</p>
          <p>texto: ${content}</p>`, // html body
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

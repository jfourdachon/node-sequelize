const User = require('../models').User;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class AuthController {
  async login(req, res) {
      console.log(req.body)
    try {
      const { email, password } = req.body;
      const user = await User.findOne({
        where: {
          email,
        },
      });

      if (!user) {
        res.status(404).json({ message: `Incorrect email or password` });
        return;
      }

      const isValid = bcrypt.compare(password, user.password);
      if (!isValid) {
        res.status(404).json({ message: `Incorrect email or password` });
        return;
      }

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION });

      res.status(201).json({ token });
    } catch (error) {}
  }

  async signup(req, res) {
    try {
      const { email, password, role } = req.body;

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await User.create({
        email,
        password: hashedPassword,
        role,
      });

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION });

      res.status(201).json({ token });
    } catch (error) {}
  }
}

module.exports = new AuthController();

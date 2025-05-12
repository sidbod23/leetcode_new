const jwt = require('jsonwebtoken');

const admins = [
  { username: 'admin', password: 'pict@123' },
  { username: 'sachinpande@gmail.com', password: 'Ssp@123123' },
  { username: 'amrutaawati@gmail.com', password: 'Aap@123123' },
];

const login = (req, res) => {
  const { username, password } = req.body;

  const admin = admins.find(
    (u) => u.username === username && u.password === password
  );

  if (!admin) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ username }, process.env.JWT_SECRET, {
    expiresIn: '2h',
  });

  res.json({ token });
};

const verify = (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json({ valid: true, user: decoded });
  } catch (err) {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};

module.exports = { login, verify };

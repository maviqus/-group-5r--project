let users = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' }
];
let nextId = 3;

exports.getUsers = (req, res) => {
  res.status(200).json({ success: true, count: users.length, data: users });
};

exports.createUser = (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ success: false, message: 'Vui lòng cung cấp name và email' });
  }

  const exists = users.find(u => u.email === email);
  if (exists) {
    return res.status(400).json({ success: false, message: 'Email đã tồn tại' });
  }

  const user = { id: nextId++, name, email };
  users.push(user);
  res.status(201).json({ success: true, data: user });
};

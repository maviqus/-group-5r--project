const express = require('express');
const userRoutes = require('./routes/user');
const app = express();

app.use(express.json());

// Mount API routes
app.use('/api', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT} - server.js:11`));

module.exports = app;

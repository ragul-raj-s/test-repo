const express = require('express');
const app = express();
const jenkinsRoutes = require('./routes/jenkins');

app.use(express.json());

// Routes
app.use('/jenkins', jenkinsRoutes);

// Start server
const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});

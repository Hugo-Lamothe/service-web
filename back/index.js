const express = require('express');
const app = express();
const filmRoutes = require('./routes/filmRoutes');

app.use('/film', filmRoutes);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});
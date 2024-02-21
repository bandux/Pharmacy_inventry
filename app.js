const express = require('express');
const bodyParser = require('body-parser');

const userRoutes = require('./routes/userRoutes');
const medicineRoutes = require('./routes/medicineRoute');
const customerRoutes = require('./routes/customerRoute');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());



app.use('/api', userRoutes);
app.use('/api', medicineRoutes);
app.use('/api', customerRoutes);



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

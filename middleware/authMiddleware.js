const db = require('../dbConfig/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
exports.authenticateUser = (req, res, next) => {
    // console.log(req.header)
     const authHeader = req.headers['authorization'];
 
     if (!authHeader) {
         return res.status(401).json({ message: 'Authorization header is required' });
     }
 
     const encodedCredentials = authHeader.split(' ')[1];
     const decodedCredentials = Buffer.from(encodedCredentials, 'base64').toString('ascii');
     const [username, password] = decodedCredentials.split(':');
     // Retrieve the user from the database by username
     db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
         if (err) {
             console.error('Error retrieving user:', err);
             return res.status(500).json({ message: 'Internal Server Error' });
         }
 
         if (results.length === 0) {
             return res.status(401).json({ message: 'Invalid username or password' });
         }
 
         const user = results[0];
 
         // Compare the provided password with the hashed password from the database
         bcrypt.compare(password, user.password, (err, result) => {
             if (err || !result) {
                 return res.status(401).json({ message: 'Invalid username or password' });
             }
 
             // If the password matches, generate a JWT token
             const token = jwt.sign({ username: user.username }, 'your_secret_key');
             req.token = token;
             req.user = user
             next();
         });
     });
 };
 
exports.autherizeUser = (requiredRoles) => {
    return (req, res, next) => {
        const { role } = req.user; // Assuming the user object is attached to the request
        if (!requiredRoles.includes(role)) {
            return res.status(403).json({ message: 'Forbidden' });
        }
        next();
    };
  };
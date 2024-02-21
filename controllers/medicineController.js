const db = require('../dbConfig/db');

exports.insert = (req, res) => {
    const sql = 'INSERT INTO medicine (name, description, quantity) VALUES (?, ?, ?)';
        db.query(sql, [req.body.name, req.body.description, req.body.quantity], (err, result) => {
            if (err) {
                console.error('Error inserting medicine:', err);
                return res.status(500).json({ message: 'Internal Server Error' });
            }
            res.status(201).json({ message: 'Medicine inserted successfully' });
        });
};

exports.getAll = (req, res) => {
    db.query('SELECT * FROM medicines', (error, results) => {
        if (error) {
            console.error('Error fetching medicines:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
        res.status(200).json(results);
    });
};

exports.updateById = (req, res) => {
    const { id } = req.params;
    const { name, description, price } = req.body;

    db.query(
        'UPDATE medicines SET name = ?, description = ?, price = ? WHERE id = ?',
        [name, description, price, id],
        (error, results) => {
            if (error) {
                console.error('Error updating medicine:', error);
                return res.status(500).json({ message: 'Internal Server Error' });
            }
            res.status(200).json({ message: 'Medicine updated successfully' });
        }
    );
};

exports.hardDeleteById = (req, res) => {
    const { id } = req.params;

    db.query('DELETE FROM medicines WHERE id = ?', [id], (error, results) => {
        if (error) {
            console.error('Error deleting medicine:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
        res.status(200).json({ message: 'Medicine deleted successfully' });
    });
};

exports.softDeleteById = (req, res) => {
    const { id } = req.params;

    db.query(
        'UPDATE medicines SET deletedAt = NOW() WHERE id = ?',
        [id],
        (error, results) => {
            if (error) {
                console.error('Error soft deleting medicine:', error);
                return res.status(500).json({ message: 'Internal Server Error' });
            }
            res.status(200).json({ message: 'Medicine soft deleted successfully' });
        }
    );
};

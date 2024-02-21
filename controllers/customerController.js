const db = require('../dbConfig/db');

exports.insert = (req, res) => {
    const sql = 'INSERT INTO customer (name, address) VALUES (?, ?)';
        db.query(sql, [req.body.name, req.body.address], (err, result) => {
            if (err) {
                console.error('Error inserting customer:', err);
                return res.status(500).json({ message: 'Internal Server Error' });
            }
            res.status(201).json({ message: 'Customer inserted successfully' });
        });
};

exports.getAll = (req, res) => {
    db.query('SELECT * FROM customer', (error, results) => {
        if (error) {
            console.error('Error fetching customer:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
        res.status(200).json(results);
    });
};

exports.updateById = (req, res) => {
    const { id } = req.params;
    const { name, address } = req.body;

    db.query(
        'UPDATE customer SET name = ?, address = ? WHERE id = ?',
        [name, address, id],
        (error, results) => {
            if (error) {
                console.error('Error updating customer:', error);
                return res.status(500).json({ message: 'Internal Server Error' });
            }
            res.status(200).json({ message: 'Customer updated successfully' });
        }
    );
};

exports.hardDeleteById = (req, res) => {
    const { id } = req.params;

    db.query('DELETE FROM customer WHERE id = ?', [id], (error, results) => {
        if (error) {
            console.error('Error deleting medicine:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
        res.status(200).json({ message: 'Customer deleted successfully' });
    });
};

exports.softDeleteById = (req, res) => {
    const { id } = req.params;

    db.query(
        'UPDATE customer SET deletedAt = NOW() WHERE id = ?',
        [id],
        (error, results) => {
            if (error) {
                console.error('Error soft deleting customer:', error);
                return res.status(500).json({ message: 'Internal Server Error' });
            }
            res.status(200).json({ message: 'Customer soft deleted successfully' });
        }
    );
};

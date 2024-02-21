const express = require('express');
const router = express.Router();
const { authenticateUser, autherizeUser} = require('../middleware/authMiddleware');
const { insert, getAll,updateById,hardDeleteById,softDeleteById } = require('../controllers/customerController');

router.post('/customer', authenticateUser, autherizeUser(['Owner']) ,  insert);
router.get('/customer',authenticateUser, autherizeUser(['Owner','Manager','Cahier']), getAll);
router.put('/customer/:id',authenticateUser, autherizeUser(['Owner','Manager','Cahier']), updateById);
router.delete('/customer/:id',authenticateUser, autherizeUser(['Owner']), hardDeleteById);
router.post('/customer/:id',authenticateUser, autherizeUser(['Owner','Manager','Cahier']), softDeleteById);


module.exports = router;

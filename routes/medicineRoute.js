const express = require('express');
const router = express.Router();
const { authenticateUser, autherizeUser} = require('../middleware/authMiddleware');
const { insert, getAll,updateById,hardDeleteById,softDeleteById } = require('../controllers/medicineController');

router.post('/medicine', authenticateUser, autherizeUser(['Owner']), insert);
router.get('/medicine',authenticateUser, autherizeUser(['Owner','Manager','Cahier']), getAll);
router.put('/medicine/:id',authenticateUser, autherizeUser(['Owner','Manager','Cahier']), updateById);
router.delete('/medicine/:id',authenticateUser, autherizeUser(['Owner']), hardDeleteById);
router.post('/medicine/:id',authenticateUser, autherizeUser(['Owner','Manager','Cahier']), softDeleteById);


module.exports = router;

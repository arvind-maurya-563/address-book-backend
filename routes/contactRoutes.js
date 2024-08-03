const express = require('express');
const {
  createContact,
  getContacts,
  getContactById,
  updateContact,
  deleteContact
} = require('../controllers/contactController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, createContact);
router.get('/', authMiddleware, getContacts);
router.patch('/', authMiddleware, updateContact);
router.delete('/', authMiddleware, deleteContact);

module.exports = router;

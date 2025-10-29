const express = require('express');
const router = express.Router();
const {
  registerStudent,
  getStudents,
  getStudent
} = require('../controllers/studentController');
const upload = require('../middleware/upload');

// Register student with file uploads
router.post(
  '/',
  upload.fields([
    { name: 'studentPhoto', maxCount: 1 },
    { name: 'parentPhoto', maxCount: 1 },
    { name: 'tenthCertificate', maxCount: 1 },
    { name: 'paymentReceipt', maxCount: 1 }
  ]),
  registerStudent
);

// Get all students with search and filter
router.get('/', getStudents);

// Get single student
router.get('/:id', getStudent);

module.exports = router;

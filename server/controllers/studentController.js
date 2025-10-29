const Student = require('../models/Student');
const path = require('path');

// @desc    Register a new student
// @route   POST /api/students
// @access  Public
exports.registerStudent = async (req, res) => {
  try {
    const studentData = req.body;
    
    // Handle file paths
    if (req.files) {
      if (req.files.studentPhoto) {
        studentData.studentPhoto = req.files.studentPhoto[0].filename;
      }
      if (req.files.parentPhoto) {
        studentData.parentPhoto = req.files.parentPhoto[0].filename;
      }
      if (req.files.tenthCertificate) {
        studentData.tenthCertificate = req.files.tenthCertificate[0].filename;
      }
      if (req.files.paymentReceipt) {
        studentData.paymentReceipt = req.files.paymentReceipt[0].filename;
      }
    }

    const student = await Student.create(studentData);
    
    res.status(201).json({
      success: true,
      data: student
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Get all students with search and filter
// @route   GET /api/students
// @access  Public
exports.getStudents = async (req, res) => {
  try {
    const { search, branch, paymentStatus, page = 1, limit = 20 } = req.query;
    const query = {};

    // Search by name
    if (search) {
      query.studentName = { $regex: search, $options: 'i' };
    }

    // Filter by branch
    if (branch) {
      query.branch = branch;
    }

    // Filter by payment status
    if (paymentStatus) {
      query.paymentStatus = paymentStatus;
    }

    const students = await Student.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .select('studentName phone branch paymentStatus rollNumber');

    const count = await Student.countDocuments(query);

    res.status(200).json({
      success: true,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      count: students.length,
      data: students
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Get single student
// @route   GET /api/students/:id
// @access  Public
exports.getStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    
    if (!student) {
      return res.status(404).json({
        success: false,
        error: 'Student not found'
      });
    }

    res.status(200).json({
      success: true,
      data: student
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

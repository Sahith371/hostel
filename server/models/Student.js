const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  studentName: { type: String, required: true },
  fatherName: { type: String, required: true },
  motherName: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  gender: { type: String, required: true, enum: ['Male', 'Female', 'Other'] },
  branch: { type: String, required: true },
  year: { type: String, required: true, enum: ['1st Year', '2nd Year', '3rd Year', '4th Year'] },
  rollNumber: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  parentName: { type: String, required: true },
  parentPhone: { type: String, required: true },
  parentEmail: { type: String, required: true },
  parentOccupation: { type: String, required: true },
  roomSharing: { type: String, required: true, enum: ['2 Sharing', '3 Sharing', '4 Sharing'] },
  feeAmount: { type: Number, required: true },
  bloodGroup: { type: String, required: true },
  allergies: { type: String, default: 'None' },
  medicalConditions: { type: String, default: 'None' },
  emergencyContact: { type: String, required: true },
  paymentStatus: { type: String, required: true, enum: ['Done', 'Not Done'], default: 'Not Done' },
  studentPhoto: { type: String },
  parentPhoto: { type: String },
  tenthCertificate: { type: String },
  paymentReceipt: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Student', studentSchema);

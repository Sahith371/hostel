import React, { useState, useEffect } from 'react';
import { Camera, User, FileText, CreditCard, CheckCircle2, Clock, ChevronRight, ChevronLeft, Upload, Heart, Home, GraduationCap, Users, AlertCircle, Loader2, X } from 'lucide-react';

const StudentRegister = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const [formData, setFormData] = useState({
    studentName: '',
    fatherName: '',
    motherName: '',
    dateOfBirth: '',
    gender: '',
    branch: '',
    year: '',
    rollNumber: '',
    email: '',
    phone: '',
    address: '',
    parentName: '',
    parentPhone: '',
    parentEmail: '',
    parentOccupation: '',
    roomSharing: '',
    feeAmount: 0,
    bloodGroup: '',
    allergies: '',
    medicalConditions: '',
    emergencyContact: '',
    paymentStatus: 'Not Done',
    hasHealthIssues: '',
    healthIssuesDescription: ''
  });

  const [files, setFiles] = useState({
    studentPhoto: null,
    parentPhoto: null,
    tenthCertificate: null,
    paymentReceipt: null
  });

  const [previewUrls, setPreviewUrls] = useState({
    studentPhoto: null,
    parentPhoto: null,
    tenthCertificate: null,
    paymentReceipt: null
  });

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const branches = [
    'Computer Science Engineering',
    'Information Technology',
    'Electronics & Communication',
    'Mechanical Engineering',
    'Civil Engineering',
    'Electrical Engineering',
    'Biotechnology',
    'Chemical Engineering'
  ];

  const years = ['1st Year', '2nd Year', '3rd Year', '4th Year'];
  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  const roomOptions = ['2 Sharing', '3 Sharing', '4 Sharing'];

  const feeStructure = {
    '2 Sharing': 15000,
    '3 Sharing': 12000,
    '4 Sharing': 10000
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (name === 'roomSharing') {
      setFormData(prev => ({
        ...prev,
        feeAmount: feeStructure[value] || 0
      }));
    }
  };

  const handleFileChange = (e) => {
    const { name, files: selectedFiles } = e.target;
    const file = selectedFiles[0];

    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('File size should be less than 5MB');
        return;
      }

      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
      if (!allowedTypes.includes(file.type)) {
        alert('Only JPG, PNG, and PDF files are allowed');
        return;
      }

      setFiles(prev => ({
        ...prev,
        [name]: file
      }));

      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setPreviewUrls(prev => ({
            ...prev,
            [name]: e.target.result
          }));
        };
        reader.readAsDataURL(file);
      } else {
        setPreviewUrls(prev => ({
          ...prev,
          [name]: null
        }));
      }
    }
  };

  const validateStep1 = () => {
    const requiredFields = [
      'studentName', 'fatherName', 'motherName', 'dateOfBirth', 'gender',
      'branch', 'year', 'rollNumber', 'email', 'phone', 'address',
      'parentName', 'parentPhone', 'parentEmail', 'parentOccupation'
    ];

    for (let field of requiredFields) {
      if (!formData[field]) {
        alert(`Please fill in ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
        return false;
      }
    }

    if (!files.studentPhoto || !files.parentPhoto || !files.tenthCertificate) {
      alert('Please upload all required documents');
      return false;
    }

    return true;
  };

  const validateStep2 = () => {
    const requiredFields = ['roomSharing', 'bloodGroup', 'emergencyContact', 'paymentStatus'];

    for (let field of requiredFields) {
      if (!formData[field]) {
        alert(`Please fill in ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
        return false;
      }
    }

    if (formData.paymentStatus === 'Done' && !files.paymentReceipt) {
      alert('Please upload payment receipt');
      return false;
    }

    return true;
  };

  const nextStep = () => {
    if (validateStep1()) {
      setCurrentStep(2);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    setCurrentStep(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleClosePopup = () => {
    setShowSuccessPopup(false);
    // Redirect to home page
    window.location.href = '/';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateStep2()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Create FormData object to send files and form data
      const formDataToSend = new FormData();
      
      // Add all form data to FormData
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });
      
      // Add files to FormData if they exist
      if (files.studentPhoto) {
        formDataToSend.append('studentPhoto', files.studentPhoto);
      }
      if (files.parentPhoto) {
        formDataToSend.append('parentPhoto', files.parentPhoto);
      }
      if (files.tenthCertificate) {
        formDataToSend.append('tenthCertificate', files.tenthCertificate);
      }
      if (files.paymentReceipt) {
        formDataToSend.append('paymentReceipt', files.paymentReceipt);
      }

      // Send data to backend API
      const response = await fetch('/api/students', {
        method: 'POST',
        body: formDataToSend,
        // Don't set Content-Type header, let the browser set it with the correct boundary
      });

      if (!response.ok) {
        throw new Error('Failed to register student');
      }

      // Show success popup
      setShowSuccessPopup(true);

      // Reset form after successful submission
      setTimeout(() => {
        setFormData({
          studentName: '', fatherName: '', motherName: '', dateOfBirth: '',
          gender: '', branch: '', year: '', rollNumber: '', email: '',
          phone: '', address: '', parentName: '', parentPhone: '',
          parentEmail: '', parentOccupation: '', roomSharing: '',
          feeAmount: 0, bloodGroup: '', allergies: '', medicalConditions: '',
          emergencyContact: '', paymentStatus: 'Not Done'
        });
        setFiles({
          studentPhoto: null, parentPhoto: null,
          tenthCertificate: null, paymentReceipt: null
        });
        setPreviewUrls({
          studentPhoto: null, parentPhoto: null,
          tenthCertificate: null, paymentReceipt: null
        });
        setCurrentStep(1);
        setSubmitStatus(null);
        setShowSuccessPopup(false);
      }, 3000);

    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus({
        type: 'error',
        message: 'Registration failed. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Success Popup Component
  const SuccessPopup = () => (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
      backdropFilter: 'blur(4px)',
    }}>
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '16px',
        padding: '40px',
        maxWidth: '500px',
        width: '90%',
        textAlign: 'center',
        position: 'relative',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
        animation: 'popIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards',
      }}>
        <button 
          onClick={handleClosePopup}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: '#64748b',
            transition: 'color 0.2s ease',
          }}
          aria-label="Close popup"
        >
          <X size={24} />
        </button>
        <div style={{ marginBottom: '24px' }}>
          <div style={{
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            display: 'inline-flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#f0fdf4',
            color: '#22c55e',
            margin: '0 auto 20px',
            animation: 'scaleIn 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both',
          }}>
            <CheckCircle2 size={64} style={{
              animation: 'checkmark 0.5s cubic-bezier(0.4, 0, 0.2, 1) 0.3s both',
              transform: 'scale(0)',
              transformOrigin: 'center',
            }} />
          </div>
        </div>
        <h2 style={{
          fontSize: '24px',
          fontWeight: '700',
          color: '#1e293b',
          marginBottom: '16px',
        }}>Registration Successful!</h2>
        <p style={{
          fontSize: '16px',
          color: '#475569',
          lineHeight: '1.6',
          marginBottom: '32px',
        }}>
          Welcome to SAHE Hostelers family. Your registration has been completed successfully.
        </p>
        <button 
          onClick={handleClosePopup}
          style={{
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            padding: '12px 32px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = '#2563eb';
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(37, 99, 235, 0.2)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = '#3b82f6';
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}
          onMouseDown={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          Back to Home
        </button>
      </div>
    </div>
  );

  return (
    <div style={styles.container}>
      {showSuccessPopup && <SuccessPopup />}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .fade-in {
          animation: fadeIn 0.6s ease-out forwards;
        }

        input, select, textarea {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }

        input[type="date"]::-webkit-calendar-picker-indicator {
          filter: brightness(0) saturate(100%) invert(45%) sepia(8%) saturate(719%) hue-rotate(183deg) brightness(92%) contrast(87%);
          cursor: pointer;
        }

        input:focus, select:focus, textarea:focus {
          outline: none;
        }
      `}</style>

      {/* Hero Section */}
      <div style={styles.hero}>
        <div style={styles.heroOverlay} />
        <div style={styles.heroContent} className={isVisible ? 'fade-in-up' : ''}>
          <h1 style={styles.heroTitle}>
            Student <span style={styles.gradient}>Registration</span>
          </h1>
          <p style={styles.heroSubtitle}>Join the SAHE Hostelers Family</p>
          <p style={styles.heroDescription}>
            Complete the registration process in just two simple steps and become part of our vibrant community
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div style={styles.mainContent}>
        <div style={styles.formContainer}>
          {/* Progress Indicator */}
          <div style={styles.progressSection} className={isVisible ? 'fade-in-up' : ''}>
            <div style={styles.progressBar}>
              <div style={{...styles.progressFill, width: `${(currentStep / 2) * 100}%`}} />
            </div>
            <div style={styles.progressSteps}>
              <div style={{...styles.stepItem, ...(currentStep >= 1 ? styles.stepActive : {})}}>
                <div style={{...styles.stepCircle, ...(currentStep >= 1 ? styles.stepCircleActive : {})}}>
                  <User size={20} />
                </div>
                <span style={styles.stepLabel}>Personal Details</span>
              </div>
              <div style={{...styles.stepItem, ...(currentStep >= 2 ? styles.stepActive : {})}}>
                <div style={{...styles.stepCircle, ...(currentStep >= 2 ? styles.stepCircleActive : {})}}>
                  <Home size={20} />
                </div>
                <span style={styles.stepLabel}>Room & Health</span>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} style={styles.form}>
            {currentStep === 1 && (
              <div style={styles.formStep} className={isVisible ? 'fade-in-up' : ''}>
                <div style={styles.stepHeader}>
                  <h2 style={styles.stepTitle}>Personal & Academic Details</h2>
                  <p style={styles.stepDescription}>Please provide your personal information and academic details</p>
                </div>

                {/* Student Information */}
                <div style={styles.section}>
                  <div style={styles.sectionHeader}>
                    <GraduationCap size={22} style={styles.sectionIcon} />
                    <h3 style={styles.sectionTitle}>Student Information</h3>
                  </div>

                  <div style={styles.grid}>
                    <div style={styles.inputGroup}>
                      <label style={styles.label}>Full Name *</label>
                      <input
                        type="text"
                        name="studentName"
                        value={formData.studentName}
                        onChange={handleInputChange}
                        style={styles.input}
                        required
                      />
                    </div>

                    <div style={styles.inputGroup}>
                      <label style={styles.label}>Father's Name *</label>
                      <input
                        type="text"
                        name="fatherName"
                        value={formData.fatherName}
                        onChange={handleInputChange}
                        style={styles.input}
                        required
                      />
                    </div>

                    <div style={styles.inputGroup}>
                      <label style={styles.label}>Mother's Name *</label>
                      <input
                        type="text"
                        name="motherName"
                        value={formData.motherName}
                        onChange={handleInputChange}
                        style={styles.input}
                        required
                      />
                    </div>

                    <div style={styles.inputGroup}>
                      <label style={styles.label}>Date of Birth *</label>
                      <input
                        type="date"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleInputChange}
                        style={styles.input}
                        required
                      />
                    </div>

                    <div style={styles.inputGroup}>
                      <label style={styles.label}>Gender *</label>
                      <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                        style={styles.select}
                        required
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div style={styles.inputGroup}>
                      <label style={styles.label}>Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        style={styles.input}
                        required
                      />
                    </div>

                    <div style={styles.inputGroup}>
                      <label style={styles.label}>Phone Number *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        style={styles.input}
                        required
                      />
                    </div>

                    <div style={styles.inputGroup}>
                      <label style={styles.label}>Roll Number</label>
                      <input
                        type="text"
                        name="rollNumber"
                        value={formData.rollNumber}
                        onChange={handleInputChange}
                        style={styles.input}
                        placeholder="Optional"
                      />
                    </div>
                  </div>

                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Complete Address *</label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      style={styles.textarea}
                      rows="3"
                      required
                    />
                  </div>
                </div>

                {/* Academic Information */}
                <div style={styles.section}>
                  <div style={styles.sectionHeader}>
                    <GraduationCap size={22} style={styles.sectionIcon} />
                    <h3 style={styles.sectionTitle}>Academic Information</h3>
                  </div>

                  <div style={styles.grid}>
                    <div style={styles.inputGroup}>
                      <label style={styles.label}>Branch *</label>
                      <select
                        name="branch"
                        value={formData.branch}
                        onChange={handleInputChange}
                        style={styles.select}
                        required
                      >
                        <option value="">Select Branch</option>
                        {branches.map(branch => (
                          <option key={branch} value={branch}>{branch}</option>
                        ))}
                      </select>
                    </div>

                    <div style={styles.inputGroup}>
                      <label style={styles.label}>Year *</label>
                      <select
                        name="year"
                        value={formData.year}
                        onChange={handleInputChange}
                        style={styles.select}
                        required
                      >
                        <option value="">Select Year</option>
                        {years.map(year => (
                          <option key={year} value={year}>{year}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Parent Information */}
                <div style={styles.section}>
                  <div style={styles.sectionHeader}>
                    <Users size={22} style={styles.sectionIcon} />
                    <h3 style={styles.sectionTitle}>Parent Information</h3>
                  </div>

                  <div style={styles.grid}>
                    <div style={styles.inputGroup}>
                      <label style={styles.label}>Parent/Guardian Name *</label>
                      <input
                        type="text"
                        name="parentName"
                        value={formData.parentName}
                        onChange={handleInputChange}
                        style={styles.input}
                        required
                      />
                    </div>

                    <div style={styles.inputGroup}>
                      <label style={styles.label}>Parent Phone *</label>
                      <input
                        type="tel"
                        name="parentPhone"
                        value={formData.parentPhone}
                        onChange={handleInputChange}
                        style={styles.input}
                        required
                      />
                    </div>

                    <div style={styles.inputGroup}>
                      <label style={styles.label}>Parent Email *</label>
                      <input
                        type="email"
                        name="parentEmail"
                        value={formData.parentEmail}
                        onChange={handleInputChange}
                        style={styles.input}
                        required
                      />
                    </div>

                    <div style={styles.inputGroup}>
                      <label style={styles.label}>Parent Occupation *</label>
                      <input
                        type="text"
                        name="parentOccupation"
                        value={formData.parentOccupation}
                        onChange={handleInputChange}
                        style={styles.input}
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Document Upload */}
                <div style={styles.section}>
                  <div style={styles.sectionHeader}>
                    <Upload size={22} style={styles.sectionIcon} />
                    <h3 style={styles.sectionTitle}>Document Upload</h3>
                  </div>

                  <div style={styles.uploadGrid}>
                    <label style={styles.uploadBox}>
                      <input
                        type="file"
                        name="studentPhoto"
                        onChange={handleFileChange}
                        accept="image/*"
                        style={styles.fileInput}
                        required
                      />
                      {previewUrls.studentPhoto ? (
                        <img src={previewUrls.studentPhoto} alt="Student" style={styles.previewImage} />
                      ) : (
                        <div style={styles.uploadContent}>
                          <Camera size={32} style={styles.uploadIcon} />
                          <span style={styles.uploadTitle}>Student Photo</span>
                          <span style={styles.uploadSubtitle}>JPG, PNG (Max 5MB)</span>
                        </div>
                      )}
                    </label>

                    <label style={styles.uploadBox}>
                      <input
                        type="file"
                        name="parentPhoto"
                        onChange={handleFileChange}
                        accept="image/*"
                        style={styles.fileInput}
                        required
                      />
                      {previewUrls.parentPhoto ? (
                        <img src={previewUrls.parentPhoto} alt="Parent" style={styles.previewImage} />
                      ) : (
                        <div style={styles.uploadContent}>
                          <User size={32} style={styles.uploadIcon} />
                          <span style={styles.uploadTitle}>Parent Photo</span>
                          <span style={styles.uploadSubtitle}>JPG, PNG (Max 5MB)</span>
                        </div>
                      )}
                    </label>

                    <label style={styles.uploadBox}>
                      <input
                        type="file"
                        name="tenthCertificate"
                        onChange={handleFileChange}
                        accept="image/*,.pdf"
                        style={styles.fileInput}
                        required
                      />
                      <div style={styles.uploadContent}>
                        <FileText size={32} style={styles.uploadIcon} />
                        <span style={styles.uploadTitle}>10th Certificate</span>
                        <span style={styles.uploadSubtitle}>PDF, JPG, PNG (Max 5MB)</span>
                        {files.tenthCertificate && (
                          <span style={styles.fileName}>{files.tenthCertificate.name}</span>
                        )}
                      </div>
                    </label>
                  </div>
                </div>

                <div style={styles.actions}>
                  <button type="button" onClick={nextStep} style={styles.btnPrimary}>
                    <span>Next Step</span>
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div style={styles.formStep} className={isVisible ? 'fade-in-up' : ''}>
                <div style={styles.stepHeader}>
                  <h2 style={styles.stepTitle}>Room & Health Details</h2>
                  <p style={styles.stepDescription}>Choose your room preference and provide health information</p>
                </div>

                {/* Room Selection */}
                <div style={styles.section}>
                  <div style={styles.sectionHeader}>
                    <Home size={22} style={styles.sectionIcon} />
                    <h3 style={styles.sectionTitle}>Room Selection</h3>
                  </div>

                  <div style={styles.roomGrid}>
                    {roomOptions.map(option => (
                      <label
                        key={option}
                        style={{
                          ...styles.roomCard,
                          ...(formData.roomSharing === option ? styles.roomCardSelected : {})
                        }}
                      >
                        <input
                          type="radio"
                          name="roomSharing"
                          value={option}
                          checked={formData.roomSharing === option}
                          onChange={handleInputChange}
                          style={styles.radioInput}
                        />
                        <div style={styles.roomContent}>
                          <Home size={28} style={styles.roomIcon} />
                          <h4 style={styles.roomType}>{option}</h4>
                          <div style={styles.roomPrice}>₹{feeStructure[option]}<span style={styles.priceUnit}>/month</span></div>
                          <div style={styles.roomFeatures}>
                            <span style={styles.feature}>Attached Bathroom</span>
                            <span style={styles.feature}>Study Table</span>
                            <span style={styles.feature}>Storage Space</span>
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>

                  {formData.roomSharing && (
                    <div style={styles.feeSummary}>
                      <div style={styles.feeRow}>
                        <span style={styles.feeLabel}>Monthly Fee</span>
                        <span style={styles.feeValue}>₹{formData.feeAmount}</span>
                      </div>
                      <div style={styles.feeRow}>
                        <span style={styles.feeLabel}>Security Deposit</span>
                        <span style={styles.feeValue}>₹5,000</span>
                      </div>
                      <div style={styles.feeDivider} />
                      <div style={styles.feeRow}>
                        <span style={styles.feeLabelTotal}>Total Amount</span>
                        <span style={styles.feeValueTotal}>₹{formData.feeAmount + 5000}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Health Information */}
                <div style={styles.section}>
                  <div style={styles.sectionHeader}>
                    <Heart size={22} style={styles.sectionIcon} />
                    <h3 style={styles.sectionTitle}>Health Information</h3>
                  </div>

                  <div style={styles.grid}>
                    <div style={styles.inputGroup}>
                      <label style={styles.label}>Blood Group *</label>
                      <select
                        name="bloodGroup"
                        value={formData.bloodGroup}
                        onChange={handleInputChange}
                        style={styles.select}
                        required
                      >
                        <option value="">Select Blood Group</option>
                        {bloodGroups.map(group => (
                          <option key={group} value={group}>{group}</option>
                        ))}
                      </select>
                    </div>

                    <div style={styles.inputGroup}>
                      <label style={styles.label}>Any health issues? *</label>
                      <div style={styles.radioGroup}>
                        <label style={styles.radioLabel}>
                          <input
                            type="radio"
                            name="hasHealthIssues"
                            checked={formData.hasHealthIssues === 'yes'}
                            onChange={() => setFormData(prev => ({ ...prev, hasHealthIssues: 'yes' }))}
                            style={styles.radioInput}
                            required
                          />
                          <span style={styles.radioCustom}></span>
                          <span style={styles.radioText}>Yes</span>
                        </label>
                        <label style={styles.radioLabel}>
                          <input
                            type="radio"
                            name="hasHealthIssues"
                            checked={formData.hasHealthIssues === 'no'}
                            onChange={() => setFormData(prev => ({ ...prev, hasHealthIssues: 'no', healthIssuesDescription: '' }))}
                            style={styles.radioInput}
                            required
                          />
                          <span style={styles.radioCustom}></span>
                          <span style={styles.radioText}>No</span>
                        </label>
                      </div>
                      {formData.hasHealthIssues === 'yes' && (
                        <div style={{ width: '100%', marginTop: '12px' }}>
                          <label style={{...styles.label, marginBottom: '8px', display: 'block'}}>Please describe the health issues *</label>
                          <textarea
                            name="healthIssuesDescription"
                            value={formData.healthIssuesDescription || ''}
                            onChange={handleInputChange}
                            style={styles.textarea}
                            rows="3"
                            placeholder="Please provide details about your health issues"
                            required={true}
                          />
                        </div>
                      )}
                    </div>

                    <div style={styles.inputGroup}>
                      <label style={styles.label}>Emergency Contact *</label>
                      <input
                        type="tel"
                        name="emergencyContact"
                        value={formData.emergencyContact}
                        onChange={handleInputChange}
                        style={styles.input}
                        required
                        placeholder="+91 XXXXXXXXXX"
                      />
                    </div>
                  </div>
                </div>

                {/* Payment Information */}
                <div style={styles.section}>
                  <div style={styles.sectionHeader}>
                    <CreditCard size={22} style={styles.sectionIcon} />
                    <h3 style={styles.sectionTitle}>Payment Information</h3>
                  </div>

                  <div style={styles.paymentGrid}>
                    <label
                      style={{
                        ...styles.paymentCard,
                        ...(formData.paymentStatus === 'Done' ? styles.paymentCardSelected : {})
                      }}
                    >
                      <input
                        type="radio"
                        name="paymentStatus"
                        value="Done"
                        checked={formData.paymentStatus === 'Done'}
                        onChange={handleInputChange}
                        style={styles.radioInput}
                      />
                      <CheckCircle2 size={32} style={styles.paymentIcon} />
                      <span style={styles.paymentLabel}>Payment Completed</span>
                    </label>

                    <label
                      style={{
                        ...styles.paymentCard,
                        ...(formData.paymentStatus === 'Not Done' ? styles.paymentCardSelected : {})
                      }}
                    >
                      <input
                        type="radio"
                        name="paymentStatus"
                        value="Not Done"
                        checked={formData.paymentStatus === 'Not Done'}
                        onChange={handleInputChange}
                        style={styles.radioInput}
                      />
                      <Clock size={32} style={styles.paymentIcon} />
                      <span style={styles.paymentLabel}>Payment Pending</span>
                    </label>
                  </div>

                  {formData.paymentStatus === 'Done' && (
                    <label style={styles.receiptUpload}>
                      <input
                        type="file"
                        name="paymentReceipt"
                        onChange={handleFileChange}
                        accept="image/*,.pdf"
                        style={styles.fileInput}
                        required
                      />
                      <div style={styles.uploadContent}>
                        <FileText size={32} style={styles.uploadIcon} />
                        <span style={styles.uploadTitle}>Upload Payment Receipt</span>
                        <span style={styles.uploadSubtitle}>PDF, JPG, PNG (Max 5MB)</span>
                        {files.paymentReceipt && (
                          <span style={styles.fileName}>{files.paymentReceipt.name}</span>
                        )}
                      </div>
                    </label>
                  )}
                </div>

                {submitStatus && (
                  <div style={{
                    ...styles.statusMessage,
                    ...(submitStatus.type === 'success' ? styles.statusSuccess : styles.statusError)
                  }}>
                    {submitStatus.type === 'success' ? (
                      <CheckCircle2 size={20} />
                    ) : (
                      <AlertCircle size={20} />
                    )}
                    <span>{submitStatus.message}</span>
                  </div>
                )}

                <div style={styles.actions}>
                  <button type="button" onClick={prevStep} style={styles.btnSecondary}>
                    <ChevronLeft size={20} />
                    <span>Previous Step</span>
                  </button>
                  <button type="submit" disabled={isSubmitting} style={styles.btnPrimary}>
                    {isSubmitting ? (
                      <>
                        <Loader2 size={20} style={styles.spinner} />
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle2 size={20} />
                        <span>Complete Registration</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f8f9fa',
  },
  hero: {
    position: 'relative',
    background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
    padding: '100px 20px 80px',
    textAlign: 'center',
    overflow: 'hidden',
  },
  heroOverlay: {
    position: 'absolute',
    inset: 0,
    backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)',
  },
  heroContent: {
    position: 'relative',
    zIndex: 1,
    maxWidth: '800px',
    margin: '0 auto',
  },
  heroTitle: {
    fontSize: '48px',
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: '16px',
    lineHeight: '1.2',
  },
  gradient: {
    background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  heroSubtitle: {
    fontSize: '20px',
    fontWeight: '500',
    color: '#94a3b8',
    marginBottom: '12px',
  },
  heroDescription: {
    fontSize: '16px',
    color: '#cbd5e1',
    lineHeight: '1.6',
    maxWidth: '600px',
    margin: '0 auto',
  },
  mainContent: {
    padding: '60px 20px',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  formContainer: {
    backgroundColor: '#ffffff',
    borderRadius: '24px',
    padding: '48px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  },
  progressSection: {
    marginBottom: '48px',
  },
  progressBar: {
    height: '4px',
    backgroundColor: '#e2e8f0',
    borderRadius: '999px',
    overflow: 'hidden',
    marginBottom: '32px',
  },
  progressFill: {
    height: '100%',
    background: 'linear-gradient(90deg, #3b82f6 0%, #8b5cf6 100%)',
    transition: 'width 0.4s ease',
  },
  progressSteps: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '24px',
  },
  stepItem: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '12px',
    opacity: 0.5,
    transition: 'opacity 0.3s ease',
  },
  stepActive: {
    opacity: 1,
  },
  stepCircle: {
    width: '56px',
    height: '56px',
    borderRadius: '50%',
    backgroundColor: '#e2e8f0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#64748b',
    transition: 'all 0.3s ease',
  },
  stepCircleActive: {
    background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
    color: '#ffffff',
    transform: 'scale(1.05)',
  },
  stepLabel: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#475569',
    textAlign: 'center',
  },
  form: {
    width: '100%',
  },
  formStep: {
    width: '100%',
  },
  stepHeader: {
    textAlign: 'center',
    marginBottom: '48px',
  },
  stepTitle: {
    fontSize: '32px',
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: '12px',
  },
  stepDescription: {
    fontSize: '16px',
    color: '#64748b',
  },
  section: {
    marginBottom: '40px',
    padding: '32px',
    backgroundColor: '#f8fafc',
    borderRadius: '16px',
    border: '1px solid #e2e8f0',
  },
  sectionHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '24px',
  },
  sectionIcon: {
    color: '#3b82f6',
  },
  sectionTitle: {
    fontSize: '20px',
    fontWeight: '600',
    color: '#1e293b',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '20px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  label: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#334155',
  },
  input: {
    padding: '12px 16px',
    fontSize: '15px',
    border: '1px solid #cbd5e1',
    borderRadius: '10px',
    backgroundColor: '#ffffff',
    transition: 'all 0.2s ease',
    color: '#0f172a',
  },
  select: {
    padding: '12px 16px',
    fontSize: '15px',
    border: '1px solid #cbd5e1',
    borderRadius: '10px',
    cursor: 'pointer',
  },
  textarea: {
    padding: '12px 16px',
    fontSize: '15px',
    border: '1px solid #cbd5e1',
    borderRadius: '10px',
    backgroundColor: '#ffffff',
    transition: 'all 0.2s ease',
    color: '#0f172a',
    resize: 'vertical',
    minHeight: '100px',
    width: '100%',
    boxSizing: 'border-box',
  },
  radioGroup: {
    display: 'flex',
    gap: '24px',
    margin: '8px 0 16px',
    flexWrap: 'wrap',
  },
  radioLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    cursor: 'pointer',
    position: 'relative',
    paddingLeft: '32px',
    margin: '4px 0',
    minHeight: '24px',
  },
  radioInput: {
    position: 'absolute',
    opacity: 0,
    cursor: 'pointer',
    height: 0,
    width: 0,
    display: 'none',
  },
  radioCustom: {
    position: 'absolute',
    left: 0,
    height: '20px',
    width: '20px',
    backgroundColor: '#ffffff',
    borderRadius: '50%',
    border: '2px solid #94a3b8',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  'input[type="radio"]:checked + span': {
    backgroundColor: '#3b82f6',
    borderColor: '#3b82f6',
  },
  'input[type="radio"]:checked + span::before': {
    content: '""',
    display: 'block',
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    backgroundColor: 'white',
  },
  'input[type="radio"]:checked + span::after': {
    content: '""',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    background: 'white',
  },
  radioText: {
    fontSize: '15px',
    color: '#334155',
    userSelect: 'none',
    fontFamily: 'inherit',
  },
  uploadGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '20px',
  },
  uploadBox: {
    position: 'relative',
    aspectRatio: '1',
    border: '2px dashed #cbd5e1',
    borderRadius: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    backgroundColor: '#ffffff',
    overflow: 'hidden',
  },
  fileInput: {
    display: 'none',
  },
  uploadContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px',
    padding: '20px',
    textAlign: 'center',
  },
  uploadIcon: {
    color: '#3b82f6',
  },
  uploadTitle: {
    fontSize: '15px',
    fontWeight: '500',
    color: '#334155',
  },
  uploadSubtitle: {
    fontSize: '13px',
    color: '#64748b',
  },
  fileName: {
    fontSize: '12px',
    color: '#3b82f6',
    marginTop: '4px',
    fontWeight: '500',
    wordBreak: 'break-all',
  },
  previewImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  roomGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
    marginBottom: '24px',
  },
  roomCard: {
    position: 'relative',
    padding: '24px',
    border: '2px solid #e2e8f0',
    borderRadius: '16px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    backgroundColor: '#ffffff',
  },
  roomCardSelected: {
    borderColor: '#3b82f6',
    backgroundColor: '#eff6ff',
    transform: 'translateY(-4px)',
    boxShadow: '0 8px 16px -4px rgba(59, 130, 246, 0.2)',
  },
  roomContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '12px',
  },
  roomIcon: {
    color: '#3b82f6',
    marginBottom: '4px',
  },
  roomType: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#1e293b',
  },
  roomPrice: {
    fontSize: '28px',
    fontWeight: '700',
    color: '#3b82f6',
  },
  priceUnit: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#64748b',
  },
  roomFeatures: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    marginTop: '8px',
    alignItems: 'center',
  },
  feature: {
    fontSize: '13px',
    color: '#475569',
  },
  feeSummary: {
    padding: '24px',
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    border: '1px solid #e2e8f0',
  },
  feeRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 0',
  },
  feeLabel: {
    fontSize: '15px',
    color: '#64748b',
  },
  feeValue: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#334155',
  },
  feeDivider: {
    height: '1px',
    backgroundColor: '#e2e8f0',
    margin: '12px 0',
  },
  feeLabelTotal: {
    fontSize: '17px',
    fontWeight: '600',
    color: '#1e293b',
  },
  feeValueTotal: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#3b82f6',
  },
  paymentGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '20px',
    marginBottom: '24px',
  },
  paymentCard: {
    padding: '32px 24px',
    border: '2px solid #e2e8f0',
    borderRadius: '16px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    backgroundColor: '#ffffff',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '12px',
  },
  paymentCardSelected: {
    borderColor: '#3b82f6',
    backgroundColor: '#eff6ff',
    transform: 'translateY(-4px)',
    boxShadow: '0 8px 16px -4px rgba(59, 130, 246, 0.2)',
  },
  paymentIcon: {
    color: '#3b82f6',
  },
  paymentLabel: {
    fontSize: '16px',
    fontWeight: '500',
    color: '#334155',
  },
  receiptUpload: {
    display: 'block',
    padding: '32px',
    border: '2px dashed #cbd5e1',
    borderRadius: '16px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    backgroundColor: '#ffffff',
  },
  statusMessage: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '16px 20px',
    borderRadius: '12px',
    marginBottom: '24px',
    fontSize: '15px',
    fontWeight: '500',
  },
  statusSuccess: {
    backgroundColor: '#dcfce7',
    color: '#166534',
    border: '1px solid #86efac',
  },
  statusError: {
    backgroundColor: '#fee2e2',
    color: '#991b1b',
    border: '1px solid #fca5a5',
  },
  actions: {
    display: 'flex',
    gap: '16px',
    justifyContent: 'flex-end',
    marginTop: '32px',
  },
  btnPrimary: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '14px 32px',
    fontSize: '16px',
    fontWeight: '600',
    color: '#ffffff',
    background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
  },
  btnSecondary: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '14px 32px',
    fontSize: '16px',
    fontWeight: '600',
    color: '#475569',
    backgroundColor: '#f1f5f9',
    border: '1px solid #cbd5e1',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  spinner: {
    animation: 'spin 1s linear infinite',
  },
};

export default StudentRegister;
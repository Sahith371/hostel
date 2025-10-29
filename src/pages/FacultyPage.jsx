import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Search, Filter, ChevronLeft, ChevronRight, X } from 'lucide-react';

const FacultyPage = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    branch: '',
    paymentStatus: ''
  });
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 1
  });
  const [selectedStudent, setSelectedStudent] = useState(null);
  const navigate = useNavigate();

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const { page, limit } = pagination;
      const params = new URLSearchParams({
        page,
        limit,
        ...(searchTerm && { search: searchTerm }),
        ...(filters.branch && { branch: filters.branch }),
        ...(filters.paymentStatus && { paymentStatus: filters.paymentStatus })
      });

      const response = await axios.get(`/api/students?${params}`);
      const { data, totalPages, currentPage, count } = response.data;

      setStudents(data);
      setPagination(prev => ({
        ...prev,
        total: count,
        totalPages,
        page: currentPage
      }));
    } catch (error) {
      console.error('Error fetching students:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [pagination.page, filters]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchStudents();
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= pagination.totalPages) {
      setPagination(prev => ({ ...prev, page: newPage }));
    }
  };

  const viewStudentDetails = async (id) => {
    try {
      const response = await axios.get(`/api/students/${id}`);
      setSelectedStudent(response.data.data);
    } catch (error) {
      console.error('Error fetching student details:', error);
    }
  };

  const closeModal = () => {
    setSelectedStudent(null);
  };

  // Branch options - you can fetch these from your backend
  const branchOptions = [
    'Computer Science Engineering',
    'Information Technology',
    'Electronics & Communication',
    'Mechanical Engineering',
    'Civil Engineering',
    'Electrical Engineering',
    'Biotechnology',
    'Chemical Engineering'
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Student Records</h1>
          <p className="mt-2 text-sm text-gray-600">
            View and manage student registrations
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white shadow rounded-lg p-4 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <form onSubmit={handleSearch} className="flex-1">
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 pr-12 sm:text-sm border-gray-300 rounded-md p-2 border"
                  placeholder="Search by name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="absolute inset-y-0 right-0 flex items-center">
                  <button
                    type="submit"
                    className="px-4 h-full bg-indigo-600 text-white rounded-r-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Search
                  </button>
                </div>
              </div>
            </form>

            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Filter className="h-4 w-4 text-gray-400" />
                </div>
                <select
                  name="branch"
                  value={filters.branch}
                  onChange={handleFilterChange}
                  className="pl-10 pr-10 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="">All Branches</option>
                  {branchOptions.map((branch) => (
                    <option key={branch} value={branch}>
                      {branch}
                    </option>
                  ))}
                </select>
              </div>

              <select
                name="paymentStatus"
                value={filters.paymentStatus}
                onChange={handleFilterChange}
                className="pl-3 pr-10 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="">All Payments</option>
                <option value="Done">Payment Done</option>
                <option value="Not Done">Payment Pending</option>
              </select>
            </div>
          </div>
        </div>

        {/* Students Table */}
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Roll No.
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Branch
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Phone
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Payment Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-4 text-center">
                      Loading...
                    </td>
                  </tr>
                ) : students.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                      No students found
                    </td>
                  </tr>
                ) : (
                  students.map((student) => (
                    <tr
                      key={student._id}
                      className="hover:bg-gray-50 transition-colors duration-150"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            {student.studentPhoto ? (
                              <img
                                className="h-10 w-10 rounded-full"
                                src={`/uploads/${student.studentPhoto}`}
                                alt={student.studentName}
                              />
                            ) : (
                              <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                                {student.studentName.charAt(0).toUpperCase()}
                              </div>
                            )}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {student.studentName}
                            </div>
                            <div className="text-sm text-gray-500">
                              {student.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {student.rollNumber}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {student.branch}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {student.phone}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            student.paymentStatus === 'Done'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {student.paymentStatus === 'Done' ? 'Paid' : 'Pending'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => viewStudentDetails(student._id)}
                          className="text-indigo-600 hover:text-indigo-900 mr-4"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Showing <span className="font-medium">{(pagination.page - 1) * pagination.limit + 1}</span> to{' '}
                    <span className="font-medium">
                      {Math.min(pagination.page * pagination.limit, pagination.total)}
                    </span>{' '}
                    of <span className="font-medium">{pagination.total}</span> results
                  </p>
                </div>
                <div>
                  <nav
                    className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                    aria-label="Pagination"
                  >
                    <button
                      onClick={() => handlePageChange(pagination.page - 1)}
                      disabled={pagination.page === 1}
                      className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
                        pagination.page === 1
                          ? 'text-gray-300 cursor-not-allowed'
                          : 'text-gray-500 hover:bg-gray-50'
                      }`}
                    >
                      <span className="sr-only">Previous</span>
                      <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                    </button>
                    {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                      let pageNum;
                      if (pagination.totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (pagination.page <= 3) {
                        pageNum = i + 1;
                      } else if (pagination.page >= pagination.totalPages - 2) {
                        pageNum = pagination.totalPages - 4 + i;
                      } else {
                        pageNum = pagination.page - 2 + i;
                      }
                      return (
                        <button
                          key={pageNum}
                          onClick={() => handlePageChange(pageNum)}
                          className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                            pagination.page === pageNum
                              ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                              : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                    <button
                      onClick={() => handlePageChange(pagination.page + 1)}
                      disabled={pagination.page === pagination.totalPages}
                      className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
                        pagination.page === pagination.totalPages
                          ? 'text-gray-300 cursor-not-allowed'
                          : 'text-gray-500 hover:bg-gray-50'
                      }`}
                    >
                      <span className="sr-only">Next</span>
                      <ChevronRight className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Student Details Modal */}
      {selectedStudent && (
        <div className="fixed z-50 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
              onClick={closeModal}
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">
                        Student Details
                      </h3>
                      <button
                        type="button"
                        className="text-gray-400 hover:text-gray-500 focus:outline-none"
                        onClick={closeModal}
                      >
                        <span className="sr-only">Close</span>
                        <X className="h-6 w-6" />
                      </button>
                    </div>
                    
                    <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-md font-medium text-gray-900 mb-3 border-b pb-2">
                          Personal Information
                        </h4>
                        <div className="space-y-2">
                          <p className="text-sm">
                            <span className="font-medium text-gray-500">Name:</span>{' '}
                            {selectedStudent.studentName}
                          </p>
                          <p className="text-sm">
                            <span className="font-medium text-gray-500">Date of Birth:</span>{' '}
                            {new Date(selectedStudent.dateOfBirth).toLocaleDateString()}
                          </p>
                          <p className="text-sm">
                            <span className="font-medium text-gray-500">Gender:</span>{' '}
                            {selectedStudent.gender}
                          </p>
                          <p className="text-sm">
                            <span className="font-medium text-gray-500">Email:</span>{' '}
                            {selectedStudent.email}
                          </p>
                          <p className="text-sm">
                            <span className="font-medium text-gray-500">Phone:</span>{' '}
                            {selectedStudent.phone}
                          </p>
                          <p className="text-sm">
                            <span className="font-medium text-gray-500">Address:</span>{' '}
                            {selectedStudent.address}
                          </p>
                        </div>

                        <h4 className="text-md font-medium text-gray-900 mt-6 mb-3 border-b pb-2">
                          Academic Information
                        </h4>
                        <div className="space-y-2">
                          <p className="text-sm">
                            <span className="font-medium text-gray-500">Roll No:</span>{' '}
                            {selectedStudent.rollNumber}
                          </p>
                          <p className="text-sm">
                            <span className="font-medium text-gray-500">Branch:</span>{' '}
                            {selectedStudent.branch}
                          </p>
                          <p className="text-sm">
                            <span className="font-medium text-gray-500">Year:</span>{' '}
                            {selectedStudent.year}
                          </p>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-md font-medium text-gray-900 mb-3 border-b pb-2">
                          Parent Information
                        </h4>
                        <div className="space-y-2">
                          <p className="text-sm">
                            <span className="font-medium text-gray-500">Parent Name:</span>{' '}
                            {selectedStudent.parentName}
                          </p>
                          <p className="text-sm">
                            <span className="font-medium text-gray-500">Parent Phone:</span>{' '}
                            {selectedStudent.parentPhone}
                          </p>
                          <p className="text-sm">
                            <span className="font-medium text-gray-500">Parent Email:</span>{' '}
                            {selectedStudent.parentEmail}
                          </p>
                          <p className="text-sm">
                            <span className="font-medium text-gray-500">Occupation:</span>{' '}
                            {selectedStudent.parentOccupation}
                          </p>
                        </div>

                        <h4 className="text-md font-medium text-gray-900 mt-6 mb-3 border-b pb-2">
                          Hostel & Health
                        </h4>
                        <div className="space-y-2">
                          <p className="text-sm">
                            <span className="font-medium text-gray-500">Room Type:</span>{' '}
                            {selectedStudent.roomSharing}
                          </p>
                          <p className="text-sm">
                            <span className="font-medium text-gray-500">Fee Amount:</span>{' '}
                            ₹{selectedStudent.feeAmount?.toLocaleString()}
                          </p>
                          <p className="text-sm">
                            <span className="font-medium text-gray-500">Payment Status:</span>{' '}
                            <span
                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                selectedStudent.paymentStatus === 'Done'
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-yellow-100 text-yellow-800'
                              }`}
                            >
                              {selectedStudent.paymentStatus === 'Done' ? 'Paid' : 'Pending'}
                            </span>
                          </p>
                          <p className="text-sm">
                            <span className="font-medium text-gray-500">Blood Group:</span>{' '}
                            {selectedStudent.bloodGroup}
                          </p>
                          <p className="text-sm">
                            <span className="font-medium text-gray-500">Allergies:</span>{' '}
                            {selectedStudent.allergies || 'None'}
                          </p>
                          <p className="text-sm">
                            <span className="font-medium text-gray-500">Medical Conditions:</span>{' '}
                            {selectedStudent.medicalConditions || 'None'}
                          </p>
                          <p className="text-sm">
                            <span className="font-medium text-gray-500">Emergency Contact:</span>{' '}
                            {selectedStudent.emergencyContact}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Documents Section */}
                    <div className="mt-6">
                      <h4 className="text-md font-medium text-gray-900 mb-3 border-b pb-2">
                        Documents
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="border rounded-md p-3">
                          <p className="text-sm font-medium text-gray-700 mb-2">Student Photo</p>
                          {selectedStudent.studentPhoto ? (
                            <img
                              src={`/uploads/${selectedStudent.studentPhoto}`}
                              alt="Student"
                              className="h-32 w-auto object-cover rounded"
                            />
                          ) : (
                            <div className="h-32 bg-gray-100 rounded flex items-center justify-center text-gray-400">
                              No photo uploaded
                            </div>
                          )}
                        </div>
                        <div className="border rounded-md p-3">
                          <p className="text-sm font-medium text-gray-700 mb-2">Parent Photo</p>
                          {selectedStudent.parentPhoto ? (
                            <img
                              src={`/uploads/${selectedStudent.parentPhoto}`}
                              alt="Parent"
                              className="h-32 w-auto object-cover rounded"
                            />
                          ) : (
                            <div className="h-32 bg-gray-100 rounded flex items-center justify-center text-gray-400">
                              No photo uploaded
                            </div>
                          )}
                        </div>
                        <div className="border rounded-md p-3">
                          <p className="text-sm font-medium text-gray-700 mb-2">10th Certificate</p>
                          {selectedStudent.tenthCertificate ? (
                            <div className="h-32 bg-gray-100 rounded flex items-center justify-center">
                              <a
                                href={`/uploads/${selectedStudent.tenthCertificate}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-indigo-600 hover:text-indigo-800"
                              >
                                View Certificate
                              </a>
                            </div>
                          ) : (
                            <div className="h-32 bg-gray-100 rounded flex items-center justify-center text-gray-400">
                              No certificate uploaded
                            </div>
                          )}
                        </div>
                        <div className="border rounded-md p-3">
                          <p className="text-sm font-medium text-gray-700 mb-2">Payment Receipt</p>
                          {selectedStudent.paymentReceipt ? (
                            <div className="h-32 bg-gray-100 rounded flex items-center justify-center">
                              <a
                                href={`/uploads/${selectedStudent.paymentReceipt}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-indigo-600 hover:text-indigo-800"
                              >
                                View Receipt
                              </a>
                            </div>
                          ) : (
                            <div className="h-32 bg-gray-100 rounded flex items-center justify-center text-gray-400">
                              No receipt uploaded
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={closeModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FacultyPage;

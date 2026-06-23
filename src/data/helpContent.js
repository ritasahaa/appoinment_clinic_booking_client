/**
 * Help Content for all pages
 * Page-specific task guides for interview/training
 */

export const helpContent = {
  login: {
    title: 'Login Page',
    task: 'Implement user login functionality that authenticates users against the backend API and stores the session.',
    endpoints: [
      {
        method: 'POST',
        url: '/api/auth/login',
        description: 'Authenticate user with email and password'
      }
    ],
    params: {
      requestBody: {
        email: 'string (required)',
        password: 'string (required)'
      },
      response: {
        success: 'boolean',
        message: 'string',
        data: {
          user: '{ id, fullName, email, role }',
          token: 'string'
        }
      }
    },
    steps: [
      'Capture form input (email and password)',
      'Validate inputs before submitting',
      'Make POST request to /api/auth/login',
      'On success, store user and token using AuthContext',
      'Redirect to dashboard',
      'On error, display error message to user',
      'Handle loading state during API call'
    ],
    notes: 'Demo credentials: admin@example.com / admin123 or receptionist@example.com / receptionist123'
  },

  signup: {
    title: 'Signup Page',
    task: 'Implement user registration that creates a new account via the backend API.',
    endpoints: [
      {
        method: 'POST',
        url: '/api/auth/signup',
        description: 'Register a new user account'
      }
    ],
    params: {
      requestBody: {
        fullName: 'string (required)',
        email: 'string (required)',
        password: 'string (required, min 6 chars)',
        role: 'string (optional: admin/receptionist)'
      },
      response: {
        success: 'boolean',
        message: 'string',
        data: '{ user object without password }'
      }
    },
    steps: [
      'Capture form inputs (fullName, email, password, confirmPassword)',
      'Validate all inputs (email format, password length, password match)',
      'Make POST request to /api/auth/signup',
      'On success, redirect to login page with success message',
      'On error (e.g., duplicate email), display error message',
      'Handle loading state during API call'
    ],
    notes: 'Email must be unique. Password must be at least 6 characters.'
  },

  forgotPassword: {
    title: 'Forgot Password Page',
    task: 'Implement password reset request that sends a reset token to the user.',
    endpoints: [
      {
        method: 'POST',
        url: '/api/auth/forgot-password',
        description: 'Request password reset token'
      }
    ],
    params: {
      requestBody: {
        email: 'string (required)'
      },
      response: {
        success: 'boolean',
        message: 'string',
        data: {
          resetToken: 'string (mock token for testing)'
        }
      }
    },
    steps: [
      'Capture email input',
      'Validate email format',
      'Make POST request to /api/auth/forgot-password',
      'On success, show success message with mock reset token',
      'On error (email not found), display error message',
      'Provide link to reset password page'
    ],
    notes: 'This is a mock implementation. In production, the token would be sent via email.'
  },

  resetPassword: {
    title: 'Reset Password Page',
    task: 'Implement password reset using the token received from forgot password.',
    endpoints: [
      {
        method: 'POST',
        url: '/api/auth/reset-password',
        description: 'Reset password with token'
      }
    ],
    params: {
      requestBody: {
        token: 'string (required)',
        newPassword: 'string (required, min 6 chars)'
      },
      response: {
        success: 'boolean',
        message: 'string'
      }
    },
    steps: [
      'Capture token and new password inputs',
      'Validate password (length, confirmation match)',
      'Make POST request to /api/auth/reset-password',
      'On success, redirect to login with success message',
      'On error (invalid/expired token), display error message',
      'Handle loading state during API call'
    ],
    notes: 'Token expires after 1 hour. Password must be at least 6 characters.'
  },

  dashboard: {
    title: 'Dashboard Page',
    task: 'Fetch and display dashboard statistics from the backend API.',
    endpoints: [
      {
        method: 'GET',
        url: '/api/dashboard/stats',
        description: 'Get dashboard statistics'
      }
    ],
    params: {
      response: {
        success: 'boolean',
        message: 'string',
        data: {
          totalDoctors: 'number',
          availableDoctors: 'number',
          totalPatients: 'number',
          activePatients: 'number',
          totalAppointments: 'number',
          todayAppointments: 'number',
          scheduledAppointments: 'number',
          completedAppointments: 'number',
          cancelledAppointments: 'number',
          noShowAppointments: 'number'
        }
      }
    },
    steps: [
      'Make GET request to /api/dashboard/stats on component mount',
      'Display loading state while fetching',
      'Update stat cards with fetched data',
      'Handle errors gracefully with error message',
      'Consider adding refresh functionality'
    ],
    notes: 'Use useEffect to fetch data on component mount. Consider using a loading skeleton for better UX.'
  },

  doctorList: {
    title: 'Doctor List Page',
    task: 'Fetch, display, filter, and paginate the doctors list from the backend API.',
    endpoints: [
      {
        method: 'GET',
        url: '/api/doctors',
        description: 'Get all doctors with filters'
      }
    ],
    params: {
      queryParams: {
        search: 'string (search by name/email)',
        specialty: 'string (filter by specialty)',
        availability: 'string (available/unavailable/on-leave)',
        page: 'number (default: 1)',
        limit: 'number (default: 10)',
        sortBy: 'string (default: fullName)',
        order: 'string (asc/desc)'
      },
      response: {
        success: 'boolean',
        data: '[...doctors]',
        pagination: '{ total, page, limit, totalPages, hasNextPage, hasPrevPage }'
      }
    },
    steps: [
      'Fetch doctors list on component mount',
      'Implement search functionality with debouncing',
      'Implement specialty filter dropdown',
      'Implement availability filter buttons/chips',
      'Implement pagination controls',
      'Handle loading, error, and empty states',
      'Navigate to doctor details on row click'
    ],
    notes: 'Use URL query params or component state to manage filters. Debounce search input to avoid excessive API calls.'
  },

  doctorDetails: {
    title: 'Doctor Details Page',
    task: 'Fetch and display detailed information for a specific doctor.',
    endpoints: [
      {
        method: 'GET',
        url: '/api/doctors/:id',
        description: 'Get doctor by ID'
      }
    ],
    params: {
      urlParams: {
        id: 'string (doctor ID from URL)'
      },
      response: {
        success: 'boolean',
        data: '{ id, fullName, email, specialty, qualification, experienceYears, fee, status, availableDays, availableSlots }'
      }
    },
    steps: [
      'Extract doctor ID from URL params',
      'Fetch doctor details on component mount',
      'Display loading state while fetching',
      'Display doctor information in a clean layout',
      'Handle 404 error (doctor not found)',
      'Add back navigation button'
    ],
    notes: 'Use useParams() from react-router-dom to get the ID. Handle cases where doctor is not found.'
  },

  patientList: {
    title: 'Patient List Page',
    task: 'Fetch, display, filter, and paginate the patients list from the backend API.',
    endpoints: [
      {
        method: 'GET',
        url: '/api/patients',
        description: 'Get all patients with filters'
      }
    ],
    params: {
      queryParams: {
        search: 'string (search by name/email/phone)',
        gender: 'string (male/female)',
        status: 'string (active/inactive)',
        page: 'number (default: 1)',
        limit: 'number (default: 10)',
        sortBy: 'string (default: fullName)',
        order: 'string (asc/desc)'
      },
      response: {
        success: 'boolean',
        data: '[...patients]',
        pagination: '{ total, page, limit, totalPages, hasNextPage, hasPrevPage }'
      }
    },
    steps: [
      'Fetch patients list on component mount',
      'Implement search functionality',
      'Implement gender filter',
      'Implement status filter (active/inactive)',
      'Implement pagination controls',
      'Handle loading, error, and empty states',
      'Navigate to patient details on row click'
    ],
    notes: 'Similar implementation to doctor list. Consider reusable table/filter components.'
  },

  patientDetails: {
    title: 'Patient Details Page',
    task: 'Fetch and display detailed information for a specific patient.',
    endpoints: [
      {
        method: 'GET',
        url: '/api/patients/:id',
        description: 'Get patient by ID'
      }
    ],
    params: {
      urlParams: {
        id: 'string (patient ID from URL)'
      },
      response: {
        success: 'boolean',
        data: '{ id, fullName, email, phone, age, gender, status, address, bloodGroup, lastVisitAt }'
      }
    },
    steps: [
      'Extract patient ID from URL params',
      'Fetch patient details on component mount',
      'Display loading state while fetching',
      'Display patient information in a clean layout',
      'Handle 404 error (patient not found)',
      'Add back navigation button'
    ],
    notes: 'Use useParams() from react-router-dom to get the ID. Format dates appropriately for display.'
  },

  appointmentList: {
    title: 'Appointment List Page',
    task: 'Fetch, display, filter, and manage appointments. Implement create, update status, and delete functionality.',
    endpoints: [
      {
        method: 'GET',
        url: '/api/appointments',
        description: 'Get all appointments with filters'
      },
      {
        method: 'POST',
        url: '/api/appointments',
        description: 'Create new appointment'
      },
      {
        method: 'PATCH',
        url: '/api/appointments/:id/status',
        description: 'Update appointment status'
      },
      {
        method: 'DELETE',
        url: '/api/appointments/:id',
        description: 'Delete appointment'
      }
    ],
    params: {
      queryParams: {
        search: 'string',
        doctorId: 'string',
        patientId: 'string',
        status: 'string (scheduled/completed/cancelled/no-show)',
        date: 'string (YYYY-MM-DD)',
        page: 'number',
        limit: 'number'
      },
      createBody: {
        doctorId: 'string (required)',
        patientId: 'string (required)',
        appointmentDate: 'string YYYY-MM-DD (required)',
        appointmentTime: 'string HH:MM (required)',
        type: 'string consultation/follow-up/checkup (required)',
        notes: 'string (optional)'
      }
    },
    steps: [
      'Fetch appointments list on component mount',
      'Implement filters (status, date, doctor, patient)',
      'Implement search and pagination',
      'Implement "New Appointment" form/modal',
      'Implement status update with confirmation',
      'Implement delete with confirmation modal',
      'Handle all loading, error, and empty states'
    ],
    notes: 'Creating appointment validates doctor availability and slot conflicts. Show appropriate error messages for conflicts.'
  },

  appointmentDetails: {
    title: 'Appointment Details Page',
    task: 'Fetch and display appointment details. Implement update and cancel functionality.',
    endpoints: [
      {
        method: 'GET',
        url: '/api/appointments/:id',
        description: 'Get appointment by ID'
      },
      {
        method: 'PUT',
        url: '/api/appointments/:id',
        description: 'Update appointment'
      },
      {
        method: 'PATCH',
        url: '/api/appointments/:id/status',
        description: 'Update status'
      },
      {
        method: 'DELETE',
        url: '/api/appointments/:id',
        description: 'Delete appointment'
      }
    ],
    params: {
      urlParams: {
        id: 'string (appointment ID)'
      },
      updateBody: {
        appointmentDate: 'string (optional)',
        appointmentTime: 'string (optional)',
        type: 'string (optional)',
        notes: 'string (optional)'
      },
      statusBody: {
        status: 'string (scheduled/completed/cancelled/no-show)'
      }
    },
    steps: [
      'Extract appointment ID from URL params',
      'Fetch appointment details on mount',
      'Display appointment info with doctor and patient details',
      'Implement edit form for rescheduling',
      'Implement status update buttons',
      'Implement cancel/delete with confirmation',
      'Handle errors and redirect after delete'
    ],
    notes: 'Rescheduling should validate for slot conflicts. Show confirmation dialog before cancellation or deletion.'
  }
};

export default helpContent;

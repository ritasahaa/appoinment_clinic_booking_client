/**
 * Forgot Password Page Component
 * 
 * ⚠️ INTERVIEW/TRAINING PROJECT
 * API integration is intentionally incomplete.
 * Candidate must implement the forgot password functionality.
 */

import { useState } from 'react';
import { Link } from 'react-router-dom';
import HelpDrawer from '../components/HelpDrawer';
import { helpContent } from '../data/helpContent';

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '20px',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: '16px',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
    width: '100%',
    maxWidth: '420px',
    padding: '40px',
  },
  logo: {
    textAlign: 'center',
    marginBottom: '32px',
  },
  logoIcon: {
    width: '60px',
    height: '60px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    borderRadius: '12px',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '28px',
    marginBottom: '12px',
  },
  logoText: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#1a1a2e',
    margin: 0,
  },
  logoSubtext: {
    fontSize: '14px',
    color: '#6b7280',
    margin: '4px 0 0',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  label: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#374151',
  },
  input: {
    padding: '12px 16px',
    border: '2px solid #e5e7eb',
    borderRadius: '10px',
    fontSize: '15px',
    transition: 'border-color 0.2s ease',
    outline: 'none',
  },
  inputError: {
    borderColor: '#ef4444',
  },
  errorText: {
    fontSize: '12px',
    color: '#ef4444',
  },
  button: {
    padding: '14px 24px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: '#fff',
    border: 'none',
    borderRadius: '10px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
  },
  buttonDisabled: {
    opacity: 0.7,
    cursor: 'not-allowed',
  },
  alert: {
    padding: '12px 16px',
    borderRadius: '10px',
    fontSize: '14px',
    marginBottom: '16px',
  },
  alertError: {
    backgroundColor: '#fee2e2',
    color: '#dc2626',
    border: '1px solid #fecaca',
  },
  alertSuccess: {
    backgroundColor: '#dcfce7',
    color: '#166534',
    border: '1px solid #bbf7d0',
  },
  links: {
    textAlign: 'center',
    marginTop: '24px',
    paddingTop: '24px',
    borderTop: '1px solid #e5e7eb',
  },
  link: {
    color: '#667eea',
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: '500',
  },
  tokenBox: {
    backgroundColor: '#f0f9ff',
    border: '1px solid #bae6fd',
    borderRadius: '10px',
    padding: '16px',
    marginTop: '16px',
    fontSize: '13px',
    color: '#0369a1',
    wordBreak: 'break-all',
  },
};

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const [success, setSuccess] = useState(false);
  const [resetToken, setResetToken] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setError('Email is required');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email');
      return;
    }
    
    setLoading(true);
    setApiError('');
    setError('');

    // TODO: Implement forgot password API call
    // 1. Import forgotPassword function from authService
    // 2. Call forgot password API with email
    // 3. On success, show the reset token (mock implementation)
    // 4. On error (email not found), setApiError with the error message

    try {
      // TODO: Replace this mock implementation with actual API call
      // const response = await authService.forgotPassword(email);
      // setResetToken(response.data.resetToken);
      // setSuccess(true);

      // Temporary mock - Remove this after implementing API
      setTimeout(() => {
        setResetToken('reset-mock123-' + Date.now());
        setSuccess(true);
      }, 1000);
    } catch (error) {
      setApiError(error.response?.data?.message || 'Failed to process request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.logo}>
          <div style={styles.logoIcon}>🔑</div>
          <h1 style={styles.logoText}>Forgot Password</h1>
          <p style={styles.logoSubtext}>Enter your email to reset password</p>
        </div>

        {apiError && (
          <div style={{ ...styles.alert, ...styles.alertError }}>
            {apiError}
          </div>
        )}

        {success && (
          <div style={{ ...styles.alert, ...styles.alertSuccess }}>
            ✓ Password reset link sent! Check your email.
          </div>
        )}

        {!success ? (
          <form style={styles.form} onSubmit={handleSubmit}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError('');
                }}
                placeholder="Enter your registered email"
                style={{
                  ...styles.input,
                  ...(error ? styles.inputError : {}),
                }}
                onFocus={(e) => e.target.style.borderColor = '#667eea'}
                onBlur={(e) => e.target.style.borderColor = error ? '#ef4444' : '#e5e7eb'}
              />
              {error && <span style={styles.errorText}>{error}</span>}
            </div>

            <button
              type="submit"
              style={{
                ...styles.button,
                ...(loading ? styles.buttonDisabled : {}),
              }}
              disabled={loading}
            >
              {loading ? 'Sending...' : 'Send Reset Link'}
            </button>
          </form>
        ) : (
          <div>
            <div style={styles.tokenBox}>
              <strong>🔐 Mock Reset Token:</strong>
              <br />
              <code>{resetToken}</code>
              <br /><br />
              <small>In production, this token would be sent via email. Use this token on the reset password page.</small>
            </div>
            <Link 
              to="/reset-password" 
              style={{
                ...styles.button,
                display: 'block',
                textAlign: 'center',
                textDecoration: 'none',
                marginTop: '16px',
              }}
            >
              Go to Reset Password
            </Link>
          </div>
        )}

        <div style={styles.links}>
          Remember your password? <Link to="/login" style={styles.link}>Sign In</Link>
        </div>
      </div>

      <HelpDrawer content={helpContent.forgotPassword} />
    </div>
  );
};

export default ForgotPassword;

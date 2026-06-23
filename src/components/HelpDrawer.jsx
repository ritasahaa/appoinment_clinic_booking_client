/**
 * HelpDrawer Component
 * Glassmorphism styled drawer showing page-specific help content
 */

import { useState } from 'react';

const styles = {
  helpButton: {
    position: 'fixed',
    bottom: '24px',
    right: '24px',
    padding: '12px 20px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: '#fff',
    border: 'none',
    borderRadius: '50px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    zIndex: 1000,
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  },
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    backdropFilter: 'blur(4px)',
    zIndex: 1001,
    opacity: 0,
    visibility: 'hidden',
    transition: 'opacity 0.3s ease, visibility 0.3s ease',
  },
  overlayOpen: {
    opacity: 1,
    visibility: 'visible',
  },
  drawer: {
    position: 'fixed',
    top: 0,
    right: 0,
    width: '420px',
    maxWidth: '90vw',
    height: '100vh',
    background: 'rgba(255, 255, 255, 0.85)',
    backdropFilter: 'blur(20px)',
    boxShadow: '-10px 0 40px rgba(0, 0, 0, 0.15)',
    zIndex: 1002,
    transform: 'translateX(100%)',
    transition: 'transform 0.3s ease',
    display: 'flex',
    flexDirection: 'column',
  },
  drawerOpen: {
    transform: 'translateX(0)',
  },
  drawerHeader: {
    padding: '24px',
    borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  drawerTitle: {
    margin: 0,
    fontSize: '20px',
    fontWeight: '700',
    color: '#1a1a2e',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  closeButton: {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    border: 'none',
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    color: '#666',
    fontSize: '20px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background-color 0.2s ease',
  },
  drawerContent: {
    flex: 1,
    padding: '24px',
    overflowY: 'auto',
  },
  section: {
    marginBottom: '24px',
  },
  sectionTitle: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#667eea',
    marginBottom: '8px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  sectionContent: {
    fontSize: '14px',
    color: '#374151',
    lineHeight: '1.7',
  },
  codeBlock: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    padding: '12px 16px',
    borderRadius: '8px',
    fontFamily: 'Monaco, Consolas, monospace',
    fontSize: '13px',
    marginTop: '8px',
    overflowX: 'auto',
  },
  badge: {
    display: 'inline-block',
    padding: '4px 10px',
    borderRadius: '4px',
    fontSize: '12px',
    fontWeight: '600',
    marginRight: '8px',
    marginBottom: '4px',
  },
  badgeGet: {
    backgroundColor: '#dcfce7',
    color: '#166534',
  },
  badgePost: {
    backgroundColor: '#dbeafe',
    color: '#1d4ed8',
  },
  badgePut: {
    backgroundColor: '#fef3c7',
    color: '#92400e',
  },
  badgePatch: {
    backgroundColor: '#e0e7ff',
    color: '#4338ca',
  },
  badgeDelete: {
    backgroundColor: '#fee2e2',
    color: '#dc2626',
  },
  list: {
    listStyle: 'none',
    padding: 0,
    margin: '8px 0',
  },
  listItem: {
    padding: '8px 0',
    borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
    fontSize: '14px',
    color: '#374151',
  },
  note: {
    backgroundColor: 'rgba(102, 126, 234, 0.1)',
    border: '1px solid rgba(102, 126, 234, 0.2)',
    borderRadius: '8px',
    padding: '12px 16px',
    fontSize: '13px',
    color: '#4338ca',
    marginTop: '16px',
  },
};

const HelpDrawer = ({ content }) => {
  const [isOpen, setIsOpen] = useState(false);

  const getMethodBadge = (method) => {
    const methodStyles = {
      GET: styles.badgeGet,
      POST: styles.badgePost,
      PUT: styles.badgePut,
      PATCH: styles.badgePatch,
      DELETE: styles.badgeDelete,
    };
    return { ...styles.badge, ...methodStyles[method] };
  };

  return (
    <>
      <button
        style={styles.helpButton}
        onClick={() => setIsOpen(true)}
        onMouseOver={(e) => {
          e.target.style.transform = 'scale(1.05)';
          e.target.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.5)';
        }}
        onMouseOut={(e) => {
          e.target.style.transform = 'scale(1)';
          e.target.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.4)';
        }}
      >
        💡 Task Help
      </button>

      <div
        style={{
          ...styles.overlay,
          ...(isOpen ? styles.overlayOpen : {}),
        }}
        onClick={() => setIsOpen(false)}
      />

      <div
        style={{
          ...styles.drawer,
          ...(isOpen ? styles.drawerOpen : {}),
        }}
      >
        <div style={styles.drawerHeader}>
          <h2 style={styles.drawerTitle}>
            📋 {content?.title || 'Task Guide'}
          </h2>
          <button
            style={styles.closeButton}
            onClick={() => setIsOpen(false)}
            onMouseOver={(e) => e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.1)'}
            onMouseOut={(e) => e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.05)'}
          >
            ✕
          </button>
        </div>

        <div style={styles.drawerContent}>
          {content?.task && (
            <div style={styles.section}>
              <div style={styles.sectionTitle}>📌 Task</div>
              <div style={styles.sectionContent}>{content.task}</div>
            </div>
          )}

          {content?.endpoints && content.endpoints.length > 0 && (
            <div style={styles.section}>
              <div style={styles.sectionTitle}>🔗 API Endpoints</div>
              {content.endpoints.map((endpoint, idx) => (
                <div key={idx} style={{ marginBottom: '16px' }}>
                  <span style={getMethodBadge(endpoint.method)}>
                    {endpoint.method}
                  </span>
                  <code style={{ fontSize: '13px', color: '#1a1a2e' }}>
                    {endpoint.url}
                  </code>
                  {endpoint.description && (
                    <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#6b7280' }}>
                      {endpoint.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}

          {content?.params && (
            <div style={styles.section}>
              <div style={styles.sectionTitle}>📝 Parameters</div>
              <div style={styles.codeBlock}>
                <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>
                  {JSON.stringify(content.params, null, 2)}
                </pre>
              </div>
            </div>
          )}

          {content?.steps && content.steps.length > 0 && (
            <div style={styles.section}>
              <div style={styles.sectionTitle}>✅ Implementation Steps</div>
              <ul style={styles.list}>
                {content.steps.map((step, idx) => (
                  <li key={idx} style={styles.listItem}>
                    {idx + 1}. {step}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {content?.notes && (
            <div style={styles.note}>
              <strong>💡 Note:</strong> {content.notes}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default HelpDrawer;

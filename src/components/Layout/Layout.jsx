/**
 * Main Layout Component
 * Wraps protected pages with sidebar and header
 */

import Sidebar from './Sidebar';
import Header from './Header';

const styles = {
  layout: {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: '#f5f7fa',
  },
  main: {
    flex: 1,
    marginLeft: '260px',
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: 1,
    padding: '24px',
    overflowY: 'auto',
  },
};

const Layout = ({ children }) => {
  return (
    <div style={styles.layout}>
      <Sidebar />
      <div style={styles.main}>
        <Header />
        <main style={styles.content}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;

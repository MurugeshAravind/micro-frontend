import React from 'react';
import ProductCatalog from './components/ProductCatalog';

const App = () => {
  return (
    <div className="container">
      <header style={{
        backgroundColor: '#2196F3',
        color: 'white',
        padding: '20px',
        borderRadius: '4px',
        marginBottom: '20px'
      }}>
        <h1>📱 App B - Product Catalog Service (REMOTE)</h1>
        <p>This is the remote application running on port 3001</p>
        <p style={{ fontSize: '14px', margin: '10px 0 0 0' }}>
          This app can run independently OR be consumed by other apps via Module Federation
        </p>
      </header>

      <div style={{
        backgroundColor: '#e1f5fe',
        padding: '15px',
        borderRadius: '4px',
        marginBottom: '20px'
      }}>
        <h3>🔌 Exposed Modules</h3>
        <p>This app exposes the following components for consumption:</p>
        <ul>
          <li><code>./ProductCatalog</code> - Product listing component</li>
        </ul>
      </div>

      <ProductCatalog />

      <footer style={{
        marginTop: '30px',
        padding: '15px',
        backgroundColor: '#f5f5f5',
        borderRadius: '4px',
        fontSize: '14px'
      }}>
        <p><strong>App B can be used in two ways:</strong></p>
        <ol>
          <li><strong>Standalone:</strong> Access directly at localhost:3001 (what you're seeing now)</li>
          <li><strong>Federated Module:</strong> Components consumed by App A via Module Federation</li>
        </ol>
      </footer>
    </div>
  );
};

export default App;

import React, { Suspense, lazy } from 'react';

// Dynamically import the ProductCatalog from App B (Remote)
const ProductCatalog = lazy(() => import('appBRemote/ProductCatalog'));

const App = () => {
  return (
    <div className="container">
      <header style={{
        backgroundColor: '#4CAF50',
        color: 'white',
        padding: '20px',
        borderRadius: '4px',
        marginBottom: '20px'
      }}>
        <h1>🛒 App A - Main Shopping Platform (HOST)</h1>
        <p>This is the host application running on port 3000</p>
      </header>

      <div style={{
        backgroundColor: '#e3f2fd',
        padding: '15px',
        borderRadius: '4px',
        marginBottom: '20px',
        border: '2px dashed #2196F3'
      }}>
        <h2>📦 Remote Module from App B (PORT 3001)</h2>
        <p>The product catalog below is loaded from App B using Module Federation:</p>
        
        <Suspense fallback={
          <div style={{
            padding: '40px',
            textAlign: 'center',
            backgroundColor: '#fff3cd',
            borderRadius: '4px'
          }}>
            <p>⏳ Loading Product Catalog from App B...</p>
          </div>
        }>
          <ProductCatalog />
        </Suspense>
      </div>

      <footer style={{
        marginTop: '30px',
        padding: '15px',
        backgroundColor: '#f5f5f5',
        borderRadius: '4px',
        fontSize: '14px'
      }}>
        <p><strong>How it works:</strong></p>
        <ul>
          <li>App A (Host) runs on <strong>localhost:3000</strong></li>
          <li>App B (Remote) runs on <strong>localhost:3001</strong></li>
          <li>App A dynamically loads ProductCatalog component from App B</li>
          <li>Both apps share React dependencies (singleton pattern)</li>
        </ul>
      </footer>
    </div>
  );
};

export default App;

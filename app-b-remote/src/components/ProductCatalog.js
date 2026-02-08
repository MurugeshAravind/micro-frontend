import React, { useState } from 'react';

const ProductCatalog = () => {
  const [products] = useState([
    {
      id: 1,
      name: 'Wireless Headphones',
      price: '$99.99',
      category: 'Electronics',
      stock: 15
    },
    {
      id: 2,
      name: 'Smart Watch',
      price: '$249.99',
      category: 'Electronics',
      stock: 8
    },
    {
      id: 3,
      name: 'Running Shoes',
      price: '$79.99',
      category: 'Sports',
      stock: 23
    },
    {
      id: 4,
      name: 'Coffee Maker',
      price: '$149.99',
      category: 'Home',
      stock: 12
    },
  ]);

  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart([...cart, product]);
    alert(`${product.name} added to cart!`);
  };

  return (
    <div style={{
      backgroundColor: 'white',
      padding: '20px',
      borderRadius: '8px'
    }}>
      <div style={{
        backgroundColor: '#2196F3',
        color: 'white',
        padding: '15px',
        borderRadius: '4px',
        marginBottom: '20px'
      }}>
        <h2 style={{ margin: 0 }}>🏪 Product Catalog (From App B)</h2>
        <p style={{ margin: '5px 0 0 0', fontSize: '14px' }}>
          This component is running from App B on port 3001
        </p>
      </div>

      {cart.length > 0 && (
        <div style={{
          backgroundColor: '#4CAF50',
          color: 'white',
          padding: '10px',
          borderRadius: '4px',
          marginBottom: '15px'
        }}>
          🛒 Cart: {cart.length} item(s)
        </div>
      )}

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: '20px'
      }}>
        {products.map(product => (
          <div
            key={product.id}
            style={{
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: '15px',
              backgroundColor: '#fafafa',
              transition: 'transform 0.2s',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <h3 style={{ margin: '0 0 10px 0', color: '#333' }}>
              {product.name}
            </h3>
            <p style={{ margin: '5px 0', color: '#666', fontSize: '14px' }}>
              Category: {product.category}
            </p>
            <p style={{ margin: '5px 0', fontSize: '20px', fontWeight: 'bold', color: '#2196F3' }}>
              {product.price}
            </p>
            <p style={{ margin: '5px 0', fontSize: '12px', color: product.stock > 10 ? '#4CAF50' : '#FF9800' }}>
              Stock: {product.stock} units
            </p>
            <button
              onClick={() => addToCart(product)}
              style={{
                marginTop: '10px',
                width: '100%',
                padding: '10px',
                backgroundColor: '#2196F3',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 'bold'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#1976D2'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#2196F3'}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      <div style={{
        marginTop: '20px',
        padding: '15px',
        backgroundColor: '#fff3cd',
        borderRadius: '4px',
        fontSize: '14px'
      }}>
        <strong>💡 Note:</strong> This component is independently developed and deployed 
        in App B, but consumed by App A through Module Federation!
      </div>
    </div>
  );
};

export default ProductCatalog;

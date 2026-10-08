import React, { useState } from 'react';

const NodeBuilder = ({ onAddNode }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleAdd = (e) => {
    e.preventDefault();
    if (name.trim()) {
      onAddNode({ name, email, imageUrl });
      setName('');
      setEmail('');
      setImageUrl('');
    }
  };

  return (
    <div className="connection-builder" style={{
      background: 'rgba(15, 23, 42, 0.6)',
      padding: '2rem',
      borderRadius: '20px',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(10px)',
      maxWidth: '900px',
      margin: '2rem auto',
      boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
      animation: 'fadeIn 0.5s ease'
    }}>
      <h2 style={{ marginBottom: '1.5rem', color: '#818cf8', textAlign: 'center' }}>Add a Person to Your Circle</h2>
      <form onSubmit={handleAdd} style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
        
        <input 
          className="search-input" 
          style={{ maxWidth: '220px' }}
          type="text"
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
        <input 
          className="search-input" 
          style={{ maxWidth: '220px' }}
          type="email"
          placeholder="Email (optional)"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input 
          className="search-input" 
          style={{ maxWidth: '220px' }}
          type="text"
          placeholder="Image URL (optional)"
          value={imageUrl}
          onChange={e => setImageUrl(e.target.value)}
        />

        <button 
          type="submit" 
          style={{
            padding: '1rem 2.5rem',
            borderRadius: '50px',
            border: 'none',
            background: 'linear-gradient(to right, #818cf8, #c084fc)',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '1.1rem',
            cursor: 'pointer',
            boxShadow: '0 4px 15px rgba(139, 92, 246, 0.4)',
            transition: 'all 0.3s'
          }}
          onMouseEnter={e => {
            e.target.style.transform = 'translateY(-2px) scale(1.05)';
            e.target.style.boxShadow = '0 6px 20px rgba(139, 92, 246, 0.6)';
          }}
          onMouseLeave={e => {
            e.target.style.transform = 'translateY(0) scale(1)';
            e.target.style.boxShadow = '0 4px 15px rgba(139, 92, 246, 0.4)';
          }}
        >
          Add Person
        </button>
      </form>
    </div>
  );
};

export default NodeBuilder;

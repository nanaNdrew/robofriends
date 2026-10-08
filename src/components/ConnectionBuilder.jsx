import React, { useState } from 'react';

const relationshipTypes = [
  "Best Friend", "Coworker", "College Roommate", "Sibling", 
  "Childhood Friend", "Met at a Party", "Gym Buddy", 
  "Cousin", "Neighbor", "Book Club", "Mentor"
];

const ConnectionBuilder = ({ members, onAddConnection }) => {
  const [person1, setPerson1] = useState('');
  const [person2, setPerson2] = useState('');
  const [relationship, setRelationship] = useState(relationshipTypes[0]);

  const handleConnect = (e) => {
    e.preventDefault();
    if (person1 !== '' && person2 !== '' && person1 !== person2) {
      onAddConnection(parseInt(person1), parseInt(person2), relationship);
      setPerson2(''); // Reset second person to easily add more
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
      <h2 style={{ marginBottom: '1.5rem', color: '#c084fc', textAlign: 'center' }}>Build a Connection</h2>
      <form onSubmit={handleConnect} style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
        
        <select 
          className="search-input" 
          style={{ maxWidth: '220px', cursor: 'pointer' }}
          value={person1} 
          onChange={e => setPerson1(e.target.value)}
          required
        >
          <option value="" disabled>Select Person 1</option>
          {members.map((m, i) => <option key={i} value={i}>{m.name}</option>)}
        </select>

        <span style={{ color: '#818cf8', fontWeight: 'bold' }}>is a</span>

        <select 
          className="search-input" 
          style={{ maxWidth: '200px', cursor: 'pointer' }}
          value={relationship} 
          onChange={e => setRelationship(e.target.value)}
        >
          {relationshipTypes.map(r => <option key={r} value={r}>{r}</option>)}
        </select>

        <span style={{ color: '#818cf8', fontWeight: 'bold' }}>of</span>

        <select 
          className="search-input" 
          style={{ maxWidth: '220px', cursor: 'pointer' }}
          value={person2} 
          onChange={e => setPerson2(e.target.value)}
          required
        >
          <option value="" disabled>Select Person 2</option>
          {members.map((m, i) => (
             <option key={i} value={i} disabled={person1 === i.toString()}>{m.name}</option>
          ))}
        </select>

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
          Connect!
        </button>
      </form>
    </div>
  );
};

export default ConnectionBuilder;

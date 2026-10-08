import React from 'react';
import GraphView from './GraphView';

const LandingPage = ({ robots, onLogin }) => {
  return (
    <div className="tc" style={{ paddingBottom: '4rem', animation: 'fadeIn 0.5s ease' }}>
      <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 10, position: 'relative' }}>
        <h1 className="header-title" style={{ fontSize: '5rem', marginBottom: '0.5rem' }}>Circle of Friends</h1>
        <p style={{ color: '#94a3b8', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto 2rem', lineHeight: '1.6' }}>
          Visualize your network, map your friendships, and discover the connections that matter most.
        </p>
        <button 
          onClick={onLogin}
          style={{
            padding: '1.2rem 3rem',
            borderRadius: '50px',
            border: 'none',
            background: 'linear-gradient(to right, #6366f1, #c084fc)',
            color: 'white',
            fontWeight: '800',
            fontSize: '1.2rem',
            cursor: 'pointer',
            boxShadow: '0 10px 25px rgba(99, 102, 241, 0.5)',
            transition: 'all 0.3s',
            marginBottom: '1rem',
          }}
          onMouseEnter={e => {
            e.target.style.transform = 'scale(1.05) translateY(-2px)';
            e.target.style.boxShadow = '0 15px 35px rgba(99, 102, 241, 0.7)';
          }}
          onMouseLeave={e => {
             e.target.style.transform = 'scale(1) translateY(0)';
             e.target.style.boxShadow = '0 10px 25px rgba(99, 102, 241, 0.5)';
          }}
        >
          Build Your Circle
        </button>
      </div>
      <div style={{ marginTop: '-4rem' }}>
        <GraphView members={robots} searchfield="" />
      </div>
    </div>
  );
};

export default LandingPage;

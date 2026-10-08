import React from 'react';
import SearchBox from './SearchBox';
import GraphView from './GraphView';
import ConnectionBuilder from './ConnectionBuilder';

const Dashboard = ({ robots, searchfield, onSearchChange, onAddConnection, onLogout }) => {
  return (
    <div className="tc" style={{ paddingBottom: '4rem', animation: 'fadeIn 0.5s ease' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 3rem' }}>
         <h1 className="header-title" style={{ fontSize: '3rem', margin: '0' }}>Your Circle</h1>
         <button onClick={onLogout} style={{
             padding: '0.8rem 1.5rem', borderRadius: '50px', border: '1px solid rgba(255,255,255,0.2)',
             background: 'rgba(15, 23, 42, 0.6)', color: '#f8fafc', cursor: 'pointer', transition: 'all 0.3s',
             fontWeight: 'bold', backdropFilter: 'blur(10px)'
         }}
         onMouseEnter={e => e.target.style.background = 'rgba(255,255,255,0.15)'}
         onMouseLeave={e => e.target.style.background = 'rgba(15, 23, 42, 0.6)'}
         >Sign Out</button>
      </div>
      
      <SearchBox searchChange={onSearchChange} value={searchfield} />
      <GraphView members={robots} searchfield={searchfield} />
      <ConnectionBuilder members={robots} onAddConnection={onAddConnection} />
    </div>
  );
};

export default Dashboard;

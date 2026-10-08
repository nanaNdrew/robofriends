import React from 'react';
import SearchBox from './SearchBox';
import GraphView from './GraphView';
import ConnectionBuilder from './ConnectionBuilder';
import NodeBuilder from './NodeBuilder';

const Dashboard = ({ robots, searchfield, onSearchChange, onAddConnection, onAddNode, onLogout }) => {
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
         >Go Back</button>
      </div>
      
      {robots.length > 0 && <SearchBox searchChange={onSearchChange} value={searchfield} />}
      
      {robots.length === 0 ? (
        <div style={{ padding: '6rem 2rem', color: '#94a3b8', fontSize: '1.2rem', fontWeight: 'bold' }}>
           Your circle is empty! Start adding people below.
        </div>
      ) : (
        <GraphView members={robots} searchfield={searchfield} />
      )}
      
      <NodeBuilder onAddNode={onAddNode} />
      {robots.length >= 2 && <ConnectionBuilder members={robots} onAddConnection={onAddConnection} />}
    </div>
  );
};

export default Dashboard;

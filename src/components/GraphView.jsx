import React, { useState } from 'react';

const GraphView = ({ members, searchfield, onRemoveNode }) => {
  const [hoveredNode, setHoveredNode] = useState(null);
  
  // Sizing properties
  const radius = 280;
  const center = { x: 350, y: 350 };
  const size = 700; 

  // Position nodes in a circle
  const nodes = members.map((member, i) => {
    const angle = (i / members.length) * 2 * Math.PI - Math.PI / 2;
    const matchesSearch = member.name.toLowerCase().includes(searchfield.toLowerCase());
    return {
      ...member,
      x: center.x + radius * Math.cos(angle),
      y: center.y + radius * Math.sin(angle),
      index: i,
      matchesSearch
    };
  });

  // Calculate maximum connections for scaling node size (Degree Centrality)
  const maxFriends = Math.max(...nodes.map(n => n.friends.length), 1);

  return (
    <div className="graph-container" style={{ position: 'relative', width: '100%', maxWidth: size, aspectRatio: '1/1', margin: '2rem auto' }}>
      {/* Edges */}
      <svg viewBox={`0 0 ${size} ${size}`} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', overflow: 'visible' }}>
        {nodes.map((node, i) => 
          node.friends.map(friend => {
            const friendIndex = friend.index;
            // Draw each edge only once
            if (i < friendIndex) {
              const target = nodes[friendIndex];
              const isHovered = hoveredNode !== null && (hoveredNode === i || hoveredNode === friendIndex);
              
              // Only highlight edges if both nodes match the search (or search is empty)
              const searchActive = searchfield.length > 0;
              const matchesSearch = !searchActive || (node.matchesSearch && target.matchesSearch);
              
              let opacity = 0.05;
              if (isHovered) opacity = 0.8;
              else if (hoveredNode === null && matchesSearch) opacity = 0.3;
              
              const color = isHovered ? '#c084fc' : '#818cf8';
              const strokeWidth = isHovered ? 4 : 2;
              
              const midX = (node.x + target.x) / 2;
              const midY = (node.y + target.y) / 2;
              
              return (
                <g key={`${i}-${friendIndex}`} style={{ transition: 'all 0.3s ease', opacity }}>
                  <line 
                    x1={node.x} 
                    y1={node.y} 
                    x2={target.x} 
                    y2={target.y} 
                    stroke={color} 
                    strokeWidth={strokeWidth} 
                    style={{ filter: isHovered ? 'drop-shadow(0 0 8px rgba(192, 132, 252, 0.8))' : 'none' }}
                  />
                  {isHovered && (
                    <text 
                      x={midX} 
                      y={midY} 
                      fill="#f8fafc" 
                      fontSize="14" 
                      textAnchor="middle" 
                      dominantBaseline="middle"
                      style={{
                        textShadow: '0 2px 4px rgba(0,0,0,0.9), 0 0 10px rgba(139,92,246,1), 0 0 20px rgba(139,92,246,0.5)',
                        fontWeight: '700',
                        pointerEvents: 'none',
                        fontFamily: 'Outfit, sans-serif',
                        letterSpacing: '1px'
                      }}
                    >
                      {friend.relationship}
                    </text>
                  )}
                </g>
              );
            }
            return null;
          })
        )}
      </svg>

      {/* Nodes */}
      {nodes.map((node, i) => {
        const isHovered = hoveredNode === i;
        const isConnected = hoveredNode !== null && node.friends.some(f => f.index === hoveredNode);
        const isActive = isHovered || isConnected;
        
        const searchActive = searchfield.length > 0;
        
        let opacity = 1;
        if (hoveredNode !== null) {
           opacity = isActive ? 1 : 0.2;
        } else if (searchActive && !node.matchesSearch) {
           opacity = 0.2;
        }

        // Scale nodes dynamically based on Graph Theory (Degree Centrality)
        const baseScale = 1 + (node.friends.length / maxFriends) * 0.4; 
        const scale = isHovered ? baseScale * 1.3 : (isConnected ? baseScale * 1.1 : baseScale);

        return (
          <div 
            key={node.id}
            className="graph-node"
            onMouseEnter={() => setHoveredNode(i)}
            onMouseLeave={() => setHoveredNode(null)}
            style={{
              position: 'absolute',
              left: `${(node.x / size) * 100}%`,
              top: `${(node.y / size) * 100}%`,
              transform: `translate(-50%, -50%) scale(${scale})`,
              opacity: opacity,
              zIndex: isActive ? 10 : 1,
              transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
            }}
          >
            <div className="node-img-wrapper" style={{
               width: '70px', height: '70px', borderRadius: '50%', padding: '4px',
               background: isHovered ? 'linear-gradient(to right, #818cf8, #c084fc)' : 'rgba(255,255,255,0.1)',
               boxShadow: isActive ? '0 0 20px rgba(139, 92, 246, 0.6)' : '0 4px 6px rgba(0,0,0,0.3)',
               transition: 'all 0.3s',
               cursor: 'pointer',
               position: 'relative'
            }}>
              <img 
                src={node.imageUrl || `./images/person_${(node.id - 1) % 10 + 1}.jpg`} 
                alt={node.name} 
                style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover', display: 'block' }}
              />
              
              {isHovered && onRemoveNode && (
                <button 
                  onClick={(e) => { 
                    e.stopPropagation(); 
                    setHoveredNode(null); 
                    onRemoveNode(i); 
                  }}
                  style={{
                    position: 'absolute',
                    top: '-5px', right: '-5px',
                    background: '#ef4444', color: 'white',
                    border: 'none', borderRadius: '50%',
                    width: '24px', height: '24px',
                    cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontWeight: 'bold', fontSize: '12px', zIndex: 30,
                    boxShadow: '0 2px 5px rgba(0,0,0,0.5)',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={e => e.target.style.transform = 'scale(1.1)'}
                  onMouseLeave={e => e.target.style.transform = 'scale(1)'}
                  title="Remove from Circle"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        )
      })}
      
      {/* Fixed Info Panel */}
      {hoveredNode !== null && (
        <div className="info-panel" style={{
          position: 'absolute',
          bottom: '-20px',
          right: '-40px',
          background: 'rgba(15, 23, 42, 0.95)',
          padding: '1.5rem',
          borderRadius: '16px',
          border: '1px solid rgba(139, 92, 246, 0.4)',
          backdropFilter: 'blur(10px)',
          pointerEvents: 'none',
          boxShadow: '0 15px 40px rgba(0,0,0,0.7)',
          zIndex: 20,
          textAlign: 'left',
          minWidth: '260px',
          animation: 'fadeIn 0.3s ease'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
            <img 
              src={nodes[hoveredNode].imageUrl || `./images/person_${(nodes[hoveredNode].id - 1) % 10 + 1}.jpg`} 
              alt={nodes[hoveredNode].name} 
              style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover' }}
            />
            <div>
              <div style={{ fontWeight: '800', color: '#f8fafc', fontSize: '1.2rem' }}>{nodes[hoveredNode].name}</div>
              <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>{nodes[hoveredNode].email}</div>
            </div>
          </div>
          <div style={{ 
             display: 'inline-block',
             background: 'rgba(139, 92, 246, 0.2)', 
             color: '#c084fc', 
             padding: '4px 10px', 
             borderRadius: '20px',
             fontSize: '0.85rem',
             fontWeight: 'bold',
             marginBottom: '15px'
          }}>
             {nodes[hoveredNode].friends.length} Connections
          </div>
          
          <div style={{ fontSize: '0.85rem', color: '#cbd5e1' }}>
            {nodes[hoveredNode].friends.map(f => (
              <div key={f.index} style={{ margin: '6px 0', display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '4px' }}>
                <span style={{ fontWeight: '600' }}>{nodes[f.index].name}</span>
                <span style={{ color: '#818cf8', opacity: 0.9 }}>{f.relationship}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default GraphView;

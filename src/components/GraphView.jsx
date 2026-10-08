import React, { useState } from 'react';

const GraphView = ({ members, searchfield }) => {
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
          node.friends.map(friendIndex => {
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
              
              return (
                <line 
                  key={`${i}-${friendIndex}`}
                  x1={node.x} 
                  y1={node.y} 
                  x2={target.x} 
                  y2={target.y} 
                  stroke={color} 
                  strokeWidth={strokeWidth} 
                  strokeOpacity={opacity}
                  style={{ transition: 'all 0.3s ease', filter: isHovered ? 'drop-shadow(0 0 8px rgba(192, 132, 252, 0.8))' : 'none' }}
                />
              );
            }
            return null;
          })
        )}
      </svg>

      {/* Nodes */}
      {nodes.map((node, i) => {
        const isHovered = hoveredNode === i;
        const isConnected = hoveredNode !== null && node.friends.includes(hoveredNode);
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
               cursor: 'pointer'
            }}>
              <img 
                src={`/images/person_${(node.id - 1) % 10 + 1}.jpg`} 
                alt={node.name} 
                style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover', display: 'block' }}
              />
            </div>
            
            <div className="node-tooltip" style={{
              position: 'absolute',
              top: '100%',
              left: '50%',
              transform: 'translateX(-50%)',
              marginTop: '15px',
              background: 'rgba(15, 23, 42, 0.95)',
              padding: '0.75rem 1.25rem',
              borderRadius: '12px',
              border: '1px solid rgba(139, 92, 246, 0.3)',
              backdropFilter: 'blur(10px)',
              pointerEvents: 'none',
              opacity: isHovered ? 1 : 0,
              visibility: isHovered ? 'visible' : 'hidden',
              transition: 'all 0.2s ease',
              whiteSpace: 'nowrap',
              textAlign: 'center',
              boxShadow: '0 10px 30px rgba(0,0,0,0.6)'
            }}>
              <div style={{ fontWeight: '800', color: '#f8fafc', fontSize: '1.1rem', marginBottom: '4px' }}>{node.name}</div>
              <div style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '6px' }}>{node.email}</div>
              <div style={{ 
                 display: 'inline-block',
                 background: 'rgba(139, 92, 246, 0.2)', 
                 color: '#c084fc', 
                 padding: '2px 8px', 
                 borderRadius: '20px',
                 fontSize: '0.8rem',
                 fontWeight: 'bold'
              }}>
                 {node.friends.length} Connections
              </div>
            </div>
          </div>
        )
      })}
    </div>
  );
};

export default GraphView;

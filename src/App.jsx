import React, { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import './index.css';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [landingRobots, setLandingRobots] = useState([]);
  const [userRobots, setUserRobots] = useState([]);
  const [searchfield, setSearchfield] = useState('');

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(users => {
        const relationshipTypes = ["Coworker", "College Roommate", "Sibling", "Childhood Friend", "Met at a Party", "Gym Buddy", "Cousin", "Neighbor", "Book Club"];
        
        // Construct the random connections for the landing page showcase
        const connections = Array.from({ length: users.length }, () => new Map());
        users.forEach((_, i) => {
          const numFriends = Math.floor(Math.random() * 4) + 1;
          while(connections[i].size < numFriends) {
             const randomFriend = Math.floor(Math.random() * users.length);
             if (randomFriend !== i && !connections[i].has(randomFriend)) {
                const relationship = relationshipTypes[Math.floor(Math.random() * relationshipTypes.length)];
                connections[i].set(randomFriend, relationship);
                connections[randomFriend].set(i, relationship); 
             }
          }
        });

        const formattedUsers = users.map((user, i) => {
          const names = user.name.split(' ');
          const firstName = names[0].toLowerCase();
          const lastName = names.length > 1 ? names[names.length - 1].toLowerCase() : 'smith';
          return {
            ...user,
            email: `${firstName}.${lastName}@gmail.com`,
          };
        });

        const lRobots = formattedUsers.map((user, i) => ({
           ...user,
           friends: Array.from(connections[i].entries()).map(([index, rel]) => ({ index, relationship: rel }))
        }));

        const uRobots = formattedUsers.map(user => ({
           ...user,
           friends: []
        }));

        setLandingRobots(lRobots);
        setUserRobots(uRobots);
      });
  }, []);

  const onSearchChange = (event) => {
    setSearchfield(event.target.value);
  };

  const handleAddConnection = (idx1, idx2, relationship) => {
    setUserRobots(prevRobots => {
      const newRobots = [...prevRobots];
      if (newRobots[idx1].friends.some(f => f.index === idx2)) return prevRobots;
      
      newRobots[idx1] = { ...newRobots[idx1], friends: [...newRobots[idx1].friends, { index: idx2, relationship }] };
      newRobots[idx2] = { ...newRobots[idx2], friends: [...newRobots[idx2].friends, { index: idx1, relationship }] };
      return newRobots;
    });
  };

  return !landingRobots.length ?
    <h1 className="tc loading">Loading Network...</h1> :
    (
      <div className="app-container">
        {!isLoggedIn ? (
          <LandingPage 
            robots={landingRobots} 
            onLogin={() => setIsLoggedIn(true)} 
          />
        ) : (
          <Dashboard 
            robots={userRobots} 
            searchfield={searchfield} 
            onSearchChange={onSearchChange} 
            onAddConnection={handleAddConnection} 
            onLogout={() => {
              setIsLoggedIn(false);
              setSearchfield('');
            }}
          />
        )}
      </div>
    );
};

export default App;

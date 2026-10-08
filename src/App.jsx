import React, { useState, useEffect } from 'react';
import SearchBox from './components/SearchBox';
import GraphView from './components/GraphView';
import './index.css';

const App = () => {
  const [robots, setRobots] = useState([]);
  const [searchfield, setSearchfield] = useState('');

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(users => {
        const relationshipTypes = ["Coworker", "College Roommate", "Sibling", "Childhood Friend", "Met at a Party", "Gym Buddy", "Cousin", "Neighbor", "Book Club"];
        
        // Construct a realistic social network graph using an adjacency list
        const connections = Array.from({ length: users.length }, () => new Map());
        users.forEach((_, i) => {
          // Each member knows between 1 to 4 random people
          const numFriends = Math.floor(Math.random() * 4) + 1;
          while(connections[i].size < numFriends) {
             const randomFriend = Math.floor(Math.random() * users.length);
             if (randomFriend !== i && !connections[i].has(randomFriend)) {
                const relationship = relationshipTypes[Math.floor(Math.random() * relationshipTypes.length)];
                connections[i].set(randomFriend, relationship);
                connections[randomFriend].set(i, relationship); // Undirected graph connection
             }
          }
        });

        const updatedUsers = users.map((user, i) => {
          const names = user.name.split(' ');
          const firstName = names[0].toLowerCase();
          const lastName = names.length > 1 ? names[names.length - 1].toLowerCase() : 'smith';
          
          const friendsList = Array.from(connections[i].entries()).map(([index, rel]) => ({
             index,
             relationship: rel
          }));
          
          return {
            ...user,
            email: `${firstName}.${lastName}@gmail.com`,
            friends: friendsList // Assign the generated connections with types
          };
        });
        setRobots(updatedUsers);
      });
  }, []);

  const onSearchChange = (event) => {
    setSearchfield(event.target.value);
  };

  return !robots.length ?
    <h1 className="tc loading">Loading Network...</h1> :
    (
      <div className="tc" style={{ paddingBottom: '4rem' }}>
        <h1 className="header-title">Best Friends Circle</h1>
        <SearchBox searchChange={onSearchChange} />
        <GraphView members={robots} searchfield={searchfield} />
      </div>
    );
};

export default App;

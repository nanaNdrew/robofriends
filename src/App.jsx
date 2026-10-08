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
        // Construct a realistic social network graph using an adjacency list
        const connections = Array.from({ length: users.length }, () => new Set());
        users.forEach((_, i) => {
          // Each member knows between 1 to 4 random people
          const numFriends = Math.floor(Math.random() * 4) + 1;
          while(connections[i].size < numFriends) {
             const randomFriend = Math.floor(Math.random() * users.length);
             if (randomFriend !== i) {
                connections[i].add(randomFriend);
                connections[randomFriend].add(i); // Undirected graph connection
             }
          }
        });

        const updatedUsers = users.map((user, i) => {
          const names = user.name.split(' ');
          const firstName = names[0].toLowerCase();
          const lastName = names.length > 1 ? names[names.length - 1].toLowerCase() : 'smith';
          return {
            ...user,
            email: `${firstName}.${lastName}@gmail.com`,
            friends: Array.from(connections[i]) // Assign the generated connections
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

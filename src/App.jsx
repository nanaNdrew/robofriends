import React, { useState, useEffect } from 'react';
import CardList from './components/CardList';
import SearchBox from './components/SearchBox';
import Scroll from './components/Scroll';
import './index.css'; // Vite uses index.css

const App = () => {
  const [robots, setRobots] = useState([]);
  const [searchfield, setSearchfield] = useState('');

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(users => {
        const updatedUsers = users.map(user => {
          const names = user.name.split(' ');
          const firstName = names[0].toLowerCase();
          const lastName = names.length > 1 ? names[names.length - 1].toLowerCase() : 'smith';
          return {
            ...user,
            email: `${firstName}.${lastName}@gmail.com`
          };
        });
        setRobots(updatedUsers);
      });
  }, []);

  const onSearchChange = (event) => {
    setSearchfield(event.target.value);
  };

  const filteredRobots = robots.filter(robot => {
    return robot.name.toLowerCase().includes(searchfield.toLowerCase());
  });

  return !robots.length ?
    <h1 className="tc loading">Loading Robots...</h1> :
    (
      <div className="tc">
        <h1 className="header-title">Best Friends Circle</h1>
        <SearchBox searchChange={onSearchChange} />
        <Scroll>
          <CardList robots={filteredRobots} />
        </Scroll>
      </div>
    );
};

export default App;

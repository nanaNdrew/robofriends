import React from 'react';

const Card = ({ name, email, id }) => {
  return (
    <div className="robo-card">
      <div className="card-img-container">
        <img alt="friend" src={`/images/person_${(id - 1) % 10 + 1}.jpg`} style={{ borderRadius: '50%', objectFit: 'cover' }} />
      </div>
      <div className="card-info">
        <h2>{name}</h2>
        <p>{email}</p>
        <span className="card-badge">Member {id}</span>
      </div>
    </div>
  );
};

export default Card;

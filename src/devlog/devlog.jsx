import React from 'react';
import './devlog.css';

export function Devlog() {
  return (
    <main className='devlogPage'>
        <h2>DevLog</h2>
        <button className="devButton">Add Post</button>
        
        <section className = "logs">

          <div className="log">
            <h3>Log 1</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.</p>
            <button className="like">👍</button>
            <button className="devButton">Edit</button>
          </div>
          <div className="log">
            <h3>Log 2</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.</p>
            <button className="like">👍</button>
            <button className="devButton">Edit</button>
          </div>
          <div className="log">
            <h3>Log 3</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.</p>
            <button className="like">👍</button>
            <button className="devButton">Edit</button>
          </div>
        </section>

    </main>
  );
}
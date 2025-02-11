import React from 'react';
import './devlog.css';

export function Devlog() {
  return (
    <main className='devlogPage'>
        <h2>DevLog</h2>
        
        <section className = "logs">
          <a className="devButton" hidden><button>Add Post</button></a>

          <div className="log">
            <h3>Log 1</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.</p>
            <a href=""><button className="like">👍</button></a>
            <a className="devButton" hidden><button>Edit</button></a>
          </div>
          <div className="log">
            <h3>Log 2</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.</p>
            <a href=""><button className="like">👍</button></a>
            <a className="devButton" hidden><button>Edit</button></a>
          </div>
          <div className="log">
            <h3>Log 3</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.</p>
            <a href=""><button className="like">👍</button></a>
            <a className="devButton" hidden><button>Edit</button></a>
          </div>
        </section>

    </main>
  );
}
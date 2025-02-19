import React from 'react';
import './devlog.css';

export function Devlog() {
  const [logs, setLogs] = React.useState([]);
  const logRows = [];

  function addNewPost()
  {
    logRows.push(
      <div className="log">
        <input type="text" id="logTitle" placeholder='Title'></input>
        <textarea type="textarea" id="logDescription" placeholder="Enter description here"></textarea>
        <button className="devButton" onClick={savePost(document.getElementById(logTitle).value, document.getElementById(logDescription).value)}>Post</button>
      </div>
    );
  }

  function savePost(title, description)
  {
    const newPost = {"logTitle": title, 'logDescription': description, "logLikes": 0};
    logs.push(newPost);
    localStorage.setItem('devLogs', logs);
  }

  function likePost()
  {
    
  }

  return (

    <main className='devlogPage'>
        <h2>DevLog</h2>
        <button className="devButton" onClick={addNewPost}>Add Post</button>
        
        <section className = "logs">

          <div className="log">
            <h3>Log 1</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.</p>
            <div className="likeCounter">
              <p><b>0</b></p>
              <button className="like">👍</button>
            </div>
            <button className="devButton">Edit</button>
          </div>
          <div className="log">
            <h3>Log 2</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.</p>
            <div className="likeCounter">
              <p><b>0</b></p>
              <button className="like">👍</button>
            </div>
            <button className="devButton">Edit</button>
          </div>
          <div className="log">
            <h3>Log 3</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.</p>
            <div className="likeCounter">
              <p><b>0</b></p>
              <button className="like">👍</button>
            </div>
            <button className="devButton">Edit</button>
          </div>
        </section>

    </main>
  );
}
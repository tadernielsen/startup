import React, { useEffect } from 'react';
import './devlog.css';

import { DevlogPost } from './devlogpost.jsx';

export function Devlog({user, isDeveloper}) {
  const [logs, setLogs] = React.useState([]);
  const [newPost, setNewPost] = React.useState(false);

  useEffect(() => {
    fetch('/api/data/Devlog')
      .then((res) => res.json())
      .then((log) => setLogs(log));
  }, []);

  function addNewPost()
  {
    setNewPost(!newPost);
  }

  async function savePost(title, description)
  {
    const newPost = new DevlogPost(title, description);

    await fetch('/api/data/Devlog', {
      method: 'POST',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify(newPost.returnJson()),
    })
  
    const savedDevLogs = logs;
    savedDevLogs.push(newPost);

    setLogs(savedDevLogs);

    setNewPost(false);
  }

  async function updateLikes(ID, likeAccounts)
  {
    await fetch('/api/data/Devlog', {
      method: 'PUT',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify({ID: ID, likedAccounts: likeAccounts})
    });

    const updatedlogs = logs.map(log => log._id === ID ? { ...log, "likedAccounts": likeAccounts } : log);

    setLogs(updatedlogs);
  }

  async function deletePost(ID) {
    await fetch('/api/data/Devlog', {
      method: 'DELETE',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify({ID: ID})
    });
    
    const updatedPosts = logs.filter(log => log._id !== ID);

    setLogs(updatedPosts);
  }

  const savedDevLogs = []
  if (logs.length)
  {
    for (const [i, log] of logs.entries())
    {
      const post = new DevlogPost(log.title, log.description, log.likedAccounts, log._id);
      savedDevLogs.push(post.initilizePost(isDeveloper, user, updateLikes, deletePost));
    }
  }

  return (

    <main className='devlogPage'>
        <h2>DevLog</h2>
        <button className="devButton" onClick={addNewPost} hidden={!isDeveloper}>Add Post</button>
        
        <section className = "logs">
          {newPost ? (
            <div className="log newlog">
              <input type="text" id="editLogTitle" placeholder='Title' maxLength={15}></input>
              <textarea type="textarea" id="editLogDescription" placeholder="Enter description here"></textarea>
              <button className="saveButton" onClick={() => savePost(document.getElementById('editLogTitle').value, document.getElementById('editLogDescription').value)}>Post</button>
            </div>
            ) : (null)
          }

          {savedDevLogs}

          {/* <div className="log">
            <h3>Log 1</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.</p>
            <div className="likeCounter">
              <p><b>0</b></p>
              <button className="like">👍</button>
            </div>
            <button className="devButton">Edit</button>
          </div> */}
        </section>

    </main>
  );
}
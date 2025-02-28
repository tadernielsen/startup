import React, { useEffect } from 'react';
import './devlog.css';

import { DevlogPost } from './devlogpost.jsx';

export function Devlog({user, isDeveloper}) {
  const [logs, setLogs] = React.useState([]);
  const [newPost, setNewPost] = React.useState(false);

  useEffect(() => {
    const savedLogs = localStorage.getItem('devLogs')
    if (savedLogs)
    {
      setLogs(JSON.parse(savedLogs))
    }
  }, []);

  function addNewPost()
  {
    setNewPost(!newPost);
  }

  function savePost(title, description)
  {
    const newPost = new DevlogPost(Date.now(), title, description);
    const updatedLogs = [...logs, newPost.returnJson()];
    localStorage.setItem('devLogs', JSON.stringify(updatedLogs));
    setLogs(updatedLogs)
    setNewPost(false);
  }

  function updateLikes(ID, likeAccounts)
  {
    const updatedLogs = logs.map(log => log.ID === ID ? { ...log, "likedAccounts": likeAccounts } : log);
    localStorage.setItem('devLogs', JSON.stringify(updatedLogs));
    setLogs(updatedLogs);
  }

  function deletePost(ID) {
    const updatedLogs = logs.filter(log => log.ID !== ID);
    localStorage.setItem('devLogs', JSON.stringify(updatedLogs));
    setLogs(updatedLogs);
  }

  const savedDevLogs = []
  if (logs.length)
  {
    for (const log of logs.entries())
    {
      const post = new DevlogPost(log[1].ID, log[1].title, log[1].description, log[1].likedAccounts);
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
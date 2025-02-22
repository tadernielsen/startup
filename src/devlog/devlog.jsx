import React, { useEffect } from 'react';
import './devlog.css';

class DevlogPost
{
  #liked = false;

  constructor(title, description, likeCount = 0)
  {
    this.title = title
    this.description = description
    this.likeCount = likeCount
  }

  likeButton()
  {
    if (this.#liked)
    {
      this.likeCount -= 1;
      this.#liked = false;
    }
    else
    {
      this.likeCount += 1;
      this.#liked = true;
    }
  }

  initilizePost()
  {
    return (
      <div className="log">
            <h3>{this.title}</h3>
            <p>{this.description}</p>
            <div className="likeCounter">
              <p><b>{this.likeCount}</b></p>
              <button className="like" onClick={this.likeButton}>👍</button>
            </div>
            <button className="devButton">Edit</button>
      </div>
    )
  }

  returnJson()
  {
    return {"title": this.title, "description": this.description, "likeCount": this.likeCount}
  }
}

export function Devlog() {
  const [logs, setLogs] = React.useState([]);
  const [newPost, setNewPost] = React.useState(false);

  useEffect(() => {
    const savedLogs = localStorage.getItem('devLogs')
    if (savedLogs)
    {
      console.log("e" + savedLogs)
      console.log("ea"+JSON.parse(savedLogs))
      setLogs(JSON.parse(savedLogs))
    }
  }, []);

  useEffect(() => {
    console.log("working");
    localStorage.setItem('devLogs', JSON.stringify(logs));
  }, [logs.push()]);

  function addNewPost()
  {
    if (!newPost)
    {
      setNewPost(true)
    }
    else
    {
      setNewPost(false)
    }
  }

  function savePost(title, description)
  {
    const newPost = new DevlogPost(title, description);
    console.log(newPost.returnJson())
    logs.push(newPost.returnJson());
    setNewPost(false);
  }

  const savedDevLogs = []
  if (logs.length)
  {
    for (const log of logs.entries())
    {
      console.log("log " +log);
      const post = new DevlogPost(log.title, log.description)
      savedDevLogs.push(post.initilizePost());
    }
  }
  console.log(savedDevLogs);

  return (

    <main className='devlogPage'>
        <h2>DevLog</h2>
        <button className="devButton" onClick={addNewPost}>Add Post</button>
        
        <section className = "logs">
          {newPost ? (
            <div className="log newlog">
              <input type="text" id="logTitle" placeholder='Title'></input>
              <textarea type="textarea" id="logDescription" placeholder="Enter description here"></textarea>
              <button className="saveButton" onClick={() => savePost(document.getElementById('logTitle').value, document.getElementById('logDescription').value)}>Post</button>
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
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
            <h3 className="logTitle">{this.title}</h3>
            <p className="logDescription">{this.description}</p>
            <div className="RightSide">
              <div className="likeCounter">
                <b>{this.likeCount}</b>
                <button className="like" onClick={this.likeButton}>👍</button>
              </div>
              <button className="devButton">Edit</button>
            </div>
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
    if (savedLogs) // Use breakpoints to fix this
    {
      console.log("savedLogs " + savedLogs)
      console.log("parsedLogs "+JSON.parse(savedLogs))
      setLogs(JSON.parse(savedLogs))
    }
  }, []);

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
    localStorage.setItem('devLogs', JSON.stringify(logs));
    setNewPost(false);
  }

  const savedDevLogs = []
  if (logs.length)
  {
    for (const log of logs.entries())
    {
      console.log("log " +log);
      const post = new DevlogPost(log[1].title, log[1].description)
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
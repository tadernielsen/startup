import React from 'react';
import './home.css';

import { event, client } from '../userClient.js';

export function Home({isDeveloper}) {
  const [announcement, setAnnouncement] = React.useState('Loading announcement...');
  const [editing, setEditing] = React.useState(false);

  const [messages, setMessages] = React.useState([]);

  const editClick = () => {
    setEditing(true);
  }

  const saveClick = async () => {
    const newAnnouncement = await fetch('/api/data/Announcement', {
      method: 'PUT',
      body: JSON.stringify({announcement: document.getElementById('announcement').value}),
      headers: {
        'Content-type': 'application/json',
      },
    })

    const body = await newAnnouncement.json();

    if (newAnnouncement?.status === 200)
    {
      setAnnouncement(body.announcement)

      client.sendMessage('', event.announcement, {});
    }
    else
    {
      alert(body.msg);
    }

    setEditing(false);
  }

  function createMessages() {
    const rederedMessages = [];
    for (const [i, message] of messages.entries()) {
      let msg = 'error';
      if (message.type === event.System)
      {
        msg = message.data.msg;
      }
      else if (message.type === event.announcement)
      {
        msg = "A new announcement has been posted!";
      }
      else if (message.type === event.newDevLog)
      {
        msg = `${message.from} just posted a new devlog post titled "${message.data.title}"`;
      }
      else if (message.type === event.newGame)
      {
        msg = `${message.from} just released a new game called "${message.data.title}"!`;
      }
      else if (message.type === event.like)
      {
        msg = `${message.from} liked the ${message.data.type}: ${message.data.title}`
      }
      else if (message.type === event.favorite)
      {
        msg = `${message.from} favorited the game: ${message.data.title}`;
      }
      else if (message.type === event.login)
      {
        msg = `${message.from} logged in!`;
      }
      else if (message.type === event.logout)
      {
        msg = `${message.from} logged out :(`;
      }

      rederedMessages.push(<div key={i} className="message">{msg}</div>);
    }

    return rederedMessages;
  }

  function handleEvent(message) {
    setMessages([...messages, message]);

    if (messages.length >= 6)
    {
      setMessages(messages.shift());
    }
  }

  React.useEffect(() => {
    fetch('/api/data/Announcement')
    .then((res) => res.json())
    .then((res) => setAnnouncement(res.announcement));
  }, []);

  React.useEffect(() => {
    client.addHandler(handleEvent);

    return () => {
      client.removeHandler(handleEvent);
    }
  });

  return (
    <main className="home">
        <h2>Home</h2>
        
        <section className="latestAnnouncement">
            <h3>Latest Announcement</h3>
            {editing ? (
              <div>
                <div><textarea type="textarea" id="announcement" placeholder="Enter announcement" style={{width: '100%', height: 'auto'}}></textarea></div>
                <button className="devButton" onClick={saveClick}>Save</button>
              </div>
            ) : (
              <div>
                <p>{announcement}</p>
                <button className="devButton" onClick={editClick} hidden={!isDeveloper}>Edit</button>
              </div>
            )}
        </section>
        
        <section className="welcome">
            <h3>Welcome</h3>
            <p>Welcome to TN-Games! This website is designed for you to view and download my games in the <b>Games</b> tab. You can also view devlog posts in the <b>DevLog</b> Page. If you <b>Login</b>, you will be able to like devlog posts and favorite games</p>
            <p>This website was created for my CS260 class. It is currently still in development. Development started <b>January 9th, 2025</b></p>

        </section>
        
        <section className="activity">
            <h3>Recent Activity</h3>
            {createMessages()}
        </section>
    </main>
  );
}
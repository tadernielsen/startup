import React from 'react';
import './home.css';

import { event, client } from '../userClient.js';

export function Home({isDeveloper}) {
  const [announcement, setAnnouncement] = React.useState('Loading announcement...');
  const [editing, setEditing] = React.useState(false);

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

  

  React.useEffect(() => {
    fetch('/api/data/Announcement')
    .then((res) => res.json())
    .then((res) => setAnnouncement(res.announcement));
  }, []);

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
            <p>thing1</p>
            <p>thing2</p>
            <p>thing3</p>
            <p>thing4</p>
        </section>
    </main>
  );
}
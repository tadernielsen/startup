import React from 'react';
import './home.css';

export function Home() {
  return (
    <main className="home">
        <h2>Home</h2>
        
        <section className="latestAnnouncement">
            <h3>Latest Announcement</h3>
            <p className="latestAnouncement">No current announcements</p>
            <a className="devButton"><button>Edit</button></a>
        </section>
        
        <section className="welcome">
            <h3>Welcome</h3>
            <p>Welcome to TN-Games! This website is designed for you to view and download my games in the <b>Games</b> tab. You can also view devlog posts in the <b>DevLog</b> Page. If you <b>Login</b>, you will be able to like devlog posts and favorite games</p>
        </section>
        
        <section className="about">
            <h3>About</h3>
            <p>This website was created for my CS260 class. It is currently still in development. Development started <b>January 9th, 2025</b></p>
        </section>
    </main>
  );
}
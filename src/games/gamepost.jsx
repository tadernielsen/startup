import React from 'react';

import { event, client } from '../userClient.js';

export class GamePost
{
  constructor(image, title, description, install = "", user, likedAccounts = [], favoritedAccounts = [], ID = 0)
  {
    this.image = image;
    this.title = title;
    this.description = description;
    this.likedAccounts = likedAccounts;
    this.likeCount = likedAccounts.length;
    this.favoritedAccounts = favoritedAccounts;
    this.favorited = favoritedAccounts.includes(user);
    this.installURL = install;
    this.ID = ID;
  }

  likeButton(username, updatePost)
  {
    if (!username)
    {
      alert("Please Log in or Create Account");
      return;
    }

    if (this.likedAccounts.includes(username))
    {
      this.likedAccounts = this.likedAccounts.filter(account => account !== username);
      this.likeCount = this.likedAccounts.length;
    }
    else
    {
      this.likedAccounts.push(username);
      this.likeCount = this.likedAccounts.length;

      client.sendMessage(username, event.like, {type: "game", title: this.title})
    }
    updatePost(this.ID, this.likedAccounts, this.favoritedAccounts);
  }

  favoriteButton(username, updatePost)
  {
    if (!username)
    {
      alert("Please Log in or Create Account");
      return;
    }

    if (this.favoritedAccounts.includes(username))
      {
        this.favoritedAccounts = this.favoritedAccounts.filter(account => account !== username);
        this.favorited = false;
      }
      else
      {
        this.favoritedAccounts.push(username);
        this.favorited = true;
        
        client.sendMessage(username, event.favorite, {title: this.title});
      }
      updatePost(this.ID, this.likedAccounts, this.favoritedAccounts);
  }

  downloadButton()
  {
    window.open(this.installURL);
  }

  favoriteTag()
  {
    return this.favorited ? "⭐" : "☆";
  }

  initilizePost(isDeveloper, username, updatePost, deletePost)
  {
    return (
      <div className="game" key={this.ID}>
        <div className="gameInfo">
          <img src={this.image}/>
          <h3>{this.title}</h3>
          <p>{this.description}</p>
        </div>
        <div className="gameButtons">
          <div className="likeCounter">
              <b>{this.likeCount}</b>
              <button className="like" onClick={() => this.likeButton(username, updatePost)}>👍</button>
          </div>
          <button className="favorite" onClick={() => this.favoriteButton(username, updatePost)}>{this.favoriteTag()}</button>
          <button className="download" onClick={() => this.downloadButton()}>Download</button>
        </div>
        <button className="devButton" hidden={!isDeveloper} onClick={() => deletePost(this.ID)}>Delete</button>
      </div>
    )
  }

  returnJson()
  {
    return {"image": this.image, "title": this.title, "description": this.description, "likedAccounts": this.likedAccounts, "favoritedAccounts": this.favoritedAccounts, "installURL": this.installURL}
  }
}
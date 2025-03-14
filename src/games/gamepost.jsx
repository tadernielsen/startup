import React from 'react';

export class GamePost
{
  constructor(ID, image, title, description, install = "", user, likedAccounts = [], favoritedAccounts = [])
  {
    this.ID = ID;
    this.image = image;
    this.title = title;
    this.description = description;
    this.likedAccounts = likedAccounts;
    this.likeCount = likedAccounts.length;
    this.favoritedAccounts = favoritedAccounts;
    this.favorited = favoritedAccounts.includes(user);
    this.installURL = install;
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
    return {"ID": this.ID, "image": this.image, "title": this.title, "description": this.description, "likedAccounts": this.likedAccounts, "favoritedAccounts": this.favoritedAccounts, "installURL": this.installURL}
  }
}
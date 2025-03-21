import React from 'react';

export class DevlogPost
{
  constructor(title, description, likedAccounts = [], ID = 0)
  {
    this.title = title;
    this.description = description;
    this.likedAccounts = likedAccounts;
    this.likeCount = likedAccounts.length;
    this.ID = ID
  }

  likeButton(username, updateLikes)
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
    updateLikes(this.ID, this.likedAccounts);
  }

  initilizePost(isDeveloper, username, updateLikes, deletePost)
  {
    return (
      <div className="log" key={this.ID}>
            <h3 className="logTitle">{this.title}</h3>
            <p className="logDescription">{this.description}</p>
            <div className="RightSide">
              <div className="likeCounter">
                <b>{this.likeCount}</b>
                <button className="like" onClick={() => this.likeButton(username, updateLikes)}>👍</button>
              </div>
              <button className="devButton" hidden={!isDeveloper} onClick={() => deletePost(this.ID)}>Delete</button>
            </div>
      </div>
    )
  }

  returnJson()
  {
    return {"title": this.title, "description": this.description, "likedAccounts": this.likedAccounts}
  }
}
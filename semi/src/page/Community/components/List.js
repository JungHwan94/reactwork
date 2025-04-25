import React from "react";
import { Link } from "react-router-dom";
import './List.css';

const List = ({ posts }) => {
  return (
    <div className="list-container">
      {posts.map((post) => (
        <div key={post.id} className="list-item"> 
          <Link to={`/detail/${post.id}`} className="post-link">
            <h2>{post.title}</h2>
          </Link>

          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
};

export default List;
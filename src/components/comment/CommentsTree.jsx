import React from "react";
import Comment from "./Comment";

const CommentsTree = ({ comments }) => {
  
  return (
    <div style={{ marginLeft: "10px" }}>
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  );
};

export default CommentsTree;

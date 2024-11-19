import React, { useState } from "react";

const Comment = ({ comment }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div style={{ marginBottom: "15px", marginLeft: "20px" }}>
      <div>
        <strong>{comment.author}</strong>
        <button
          onClick={() => setCollapsed(!collapsed)}
          style={{
            marginLeft: "10px",
            cursor: "pointer",
            border: "none",
            background: "transparent",
            color: "blue",
          }}
        >
          {collapsed ? "Показать" : "Скрыть"}
        </button>
      </div>
      {!collapsed && (
        <>
          <p dangerouslySetInnerHTML={{ __html: comment.text }} />
          {comment.children && comment.children.length > 0 && (
            <div>
              {comment.children.map((child) => (
                <Comment key={child.id} comment={child} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Comment;

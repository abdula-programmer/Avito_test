import React, { useEffect, useState } from "react";
import CommentsTree from "./CommentsTree";
import { useDispatch } from "react-redux";
import { clearNewsState } from "../../slices/activeNewsSlice";

const Comments = ({ id }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalComment, setTotalComment] = useState(0);


  useEffect(() => {
    const fetchCommentsTree = async (postId) => {
      const BASE_URL = "https://hacker-news.firebaseio.com/v0/item/";

      const fetchItem = async (id) => {
        const response = await fetch(`${BASE_URL}${id}.json`);
        return response.ok ? await response.json() : null;
      };

      const buildTree = async (id) => {
        const item = await fetchItem(id);
        if (!item || item.type !== "comment") return null;

        const children = item.kids
          ? await Promise.all(item.kids.map((kid) => buildTree(kid)))
          : [];

        const totalComments =
          1 +
          children.reduce((sum, child) => sum + (child.totalComments || 0), 0);
        return {
          id: item.id,
          text: item.text || "[deleted]",
          author: item.by || "anonymous",
          children,
          totalComments,
        };
      };

      const root = await fetchItem(postId);
      if (!root || !root.kids) return [];

      const tree = await Promise.all(root.kids.map((id) => buildTree(id)));
      const count = tree.reduce(
        (sum, node) => sum + (node.totalComments || 0),
        0
      );

      return { tree, count };
    };

    const loadComments = async () => {
      const { tree, count } = await fetchCommentsTree(id);
      setComments(tree);
      setLoading(false);
      setTotalComment(count);
    };

    loadComments();
  }, []);

  return (
    <div>
      Комментарии:
      {<CommentsTree comments={comments} />}
    </div>
  );
};

export default Comments;
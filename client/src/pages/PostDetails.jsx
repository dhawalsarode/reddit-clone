import { useParams } from "react-router-dom";

function PostDetails() {
  const { postId } = useParams();

  return <div>Post ID: {postId}</div>;
}

export default PostDetails;
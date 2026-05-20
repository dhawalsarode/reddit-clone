import { useParams } from "react-router-dom";

function Community() {
  const { communityName } = useParams();

  return <div>Community: {communityName}</div>;
}

export default Community;
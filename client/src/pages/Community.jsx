import { useParams } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

function Community() {
  const { communityName } = useParams();

  return (
    <MainLayout>
      <h1 className="text-3xl font-bold mb-6">
        r/{communityName}
      </h1>

      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
        Community Page
      </div>
    </MainLayout>
  );
}

export default Community;
import MainLayout from "../layouts/MainLayout";
import PostCard from "../components/PostCard";

function Home() {
  return (
    <MainLayout>
      <div>
        <h1 className="text-3xl font-bold mb-6">
          Home Feed
        </h1>

        <PostCard />
        <PostCard />
        <PostCard />
      </div>
    </MainLayout>
  );
}

export default Home;
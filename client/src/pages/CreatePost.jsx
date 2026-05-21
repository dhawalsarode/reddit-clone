import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import {
  createPost,
} from "../api/postApi";

import {
  getAllCommunities,
} from "../api/communityApi";

function CreatePost() {

  const navigate =
    useNavigate();

  const [title, setTitle] =
    useState("");

  const [content, setContent] =
    useState("");

  const [imageUrl, setImageUrl] =
    useState("");

  const [videoUrl, setVideoUrl] =
    useState("");

  const [
    communityId,
    setCommunityId,
  ] = useState("");

  const [
    communities,
    setCommunities,
  ] = useState([]);

  useEffect(() => {

    const fetchCommunities =
      async () => {

        try {

          const response =
            await getAllCommunities();

          setCommunities(
            response.data
          );

        } catch (error) {

          console.log(error);
        }
      };

    fetchCommunities();

  }, []);

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        await createPost({
          title,
          content,
          imageUrl,
          videoUrl,
          communityId,
        });

        navigate("/");

      } catch (error) {

        console.log(error);

        alert("Failed to create post");
      }
    };

  return (
    <MainLayout>

      <div className="max-w-2xl mx-auto">

        <h1 className="text-4xl font-bold mb-8">
          Create Post
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <input
            type="text"
            placeholder="Post title"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-4"
            required
          />

          <textarea
            placeholder="Post content"
            value={content}
            onChange={(e) =>
              setContent(e.target.value)
            }
            className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-4 h-40"
            required
          />

          <input
            type="text"
            placeholder="Image URL (optional)"
            value={imageUrl}
            onChange={(e) =>
              setImageUrl(e.target.value)
            }
            className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-4"
          />

          <input
            type="text"
            placeholder="Video URL (.mp4) (optional)"
            value={videoUrl}
            onChange={(e) =>
              setVideoUrl(e.target.value)
            }
            className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-4"
          />

          <select
            value={communityId}
            onChange={(e) =>
              setCommunityId(e.target.value)
            }
            className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-4"
            required
          >

            <option value="">
              Select Community
            </option>

            {
              communities.map(
                (community) => (
                  <option
                    key={community.id}
                    value={community.id}
                  >
                    r/{community.name}
                  </option>
                )
              )
            }

          </select>

          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 transition px-6 py-3 rounded-lg"
          >
            Create Post
          </button>

        </form>

      </div>

    </MainLayout>
  );
}

export default CreatePost;
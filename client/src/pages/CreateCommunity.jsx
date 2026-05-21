import {
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import {
  createCommunity,
} from "../api/communityApi";

function CreateCommunity() {

  const navigate =
    useNavigate();

  const [name, setName] =
    useState("");

  const [
    description,
    setDescription,
  ] = useState("");

  const [loading, setLoading] =
    useState(false);

  const handleSubmit =
    async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      await createCommunity({
        name,
        description,
      });

      navigate(
        `/r/${name}`
      );

    } catch (error) {

      console.log(error);

      alert(
        "Failed to create community"
      );

    } finally {

      setLoading(false);
    }
  };

  return (
    <MainLayout>

      <div className="max-w-2xl mx-auto">

        <h1 className="text-4xl font-bold mb-8">
          Create Community
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          <div>

            <label className="block mb-2 text-zinc-300">
              Community Name
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) =>
                setName(
                  e.target.value
                )
              }
              placeholder="reactjs"
              className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 outline-none focus:border-orange-500"
              required
            />

          </div>

          <div>

            <label className="block mb-2 text-zinc-300">
              Description
            </label>

            <textarea
              value={description}
              onChange={(e) =>
                setDescription(
                  e.target.value
                )
              }
              placeholder="Community description..."
              rows="5"
              className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 outline-none focus:border-orange-500"
            />

          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-orange-500 hover:bg-orange-600 transition px-6 py-3 rounded-xl font-semibold"
          >

            {
              loading
                ? "Creating..."
                : "Create Community"
            }

          </button>

        </form>

      </div>

    </MainLayout>
  );
}

export default CreateCommunity;
const prisma = require("../config/prisma");

const createPost = async (req, res) => {

  try {

      const {
        title,
        content,
        imageUrl,
        videoUrl,
        communityId,
      } = req.body;

    const post =
      await prisma.post.create({

        data: {
          title,
          content,
          communityId,
          imageUrl,
          videoUrl,

          authorId:
            req.user.userId,
        },

        include: {

          author: {
            select: {
              id: true,
              username: true,
            },
          },

          community: true,
        },
      });

    res.status(201).json(post);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

const getAllPosts = async (req, res) => {

  try {
    const { sort } = req.query;
    const posts =
      await prisma.post.findMany({

        include: {

          author: {
            select: {
              id: true,
              username: true,
            },
          },

          community: true,

          votes: true,

          _count: {
            select: {
              comments: true,
            },
          },
        },
      });

      const formattedPosts =
        posts.map((post) => {

          const voteScore =
            post.votes.reduce(
              (sum, vote) =>
                sum + vote.value,
              0
            );

          return {
            ...post,
            voteScore,
          };
        });

      if (sort === "top") {

        formattedPosts.sort(
          (a, b) =>
            b.voteScore - a.voteScore
        );

      } else {

        formattedPosts.sort(
          (a, b) =>
            new Date(b.createdAt) -
            new Date(a.createdAt)
        );
      }

      res.status(200).json(
        formattedPosts
      );
        } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

const getSinglePost = async (req, res) => {

  try {

    const { id } = req.params;

    const post =
      await prisma.post.findUnique({

        where: {
          id,
        },

        include: {

          author: {
            select: {
              id: true,
              username: true,
            },
          },

          community: true,

          votes: true,

          comments: {

            include: {

              author: {
                select: {
                  id: true,
                  username: true,
                },
              },
            },

            orderBy: {
              createdAt: "desc",
            },
          },

          _count: {
            select: {
              comments: true,
            },
          },
        },
      });

    if (!post) {

      return res.status(404).json({
        message: "Post not found",
      });
    }

    const voteScore =
      post.votes.reduce(
        (sum, vote) =>
          sum + vote.value,
        0
      );

    const formattedPost = {
      ...post,
      voteScore,
    };

    res.status(200).json(
      formattedPost
    );

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

const getPostsByCommunity = async (req, res) => {

  try {

    const { name } = req.params;

    const community =
      await prisma.community.findUnique({

        where: {
          name,
        },
      });

    if (!community) {

      return res.status(404).json({
        message: "Community not found",
      });
    }

    const posts =
      await prisma.post.findMany({

        where: {
          communityId:
            community.id,
        },

        include: {

          author: {
            select: {
              id: true,
              username: true,
            },
          },

          community: true,

          votes: true,

          _count: {
            select: {
              comments: true,
            },
          },
        },

        orderBy: {
          createdAt: "desc",
        },
      });

    const formattedPosts =
      posts.map((post) => {

        const voteScore =
          post.votes.reduce(
            (sum, vote) =>
              sum + vote.value,
            0
          );

        return {
          ...post,
          voteScore,
        };
      });

    res.status(200).json(
      formattedPosts
    );

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports = {
  createPost,
  getAllPosts,
  getSinglePost,
  getPostsByCommunity,
};
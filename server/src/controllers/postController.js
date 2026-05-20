const prisma = require("../config/prisma");

const createPost = async (req, res) => {
  try {
    const {
      title,
      content,
      communityName,
    } = req.body;

    const community =
      await prisma.community.findUnique({
        where: {
          name: communityName,
        },
      });

    if (!community) {
      return res.status(404).json({
        message: "Community not found",
      });
    }

    const post = await prisma.post.create({
      data: {
        title,
        content,

        authorId: req.user.userId,

        communityId: community.id,
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
    const posts = await prisma.post.findMany({
      include: {
        author: {
          select: {
            id: true,
            username: true,
          },
        },

        community: true,

        _count: {
          select: {
            comments: true,
            votes: true,
          },
        },
      },

      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json(posts);

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

    const post = await prisma.post.findUnique({
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
            votes: true,
          },
        },
      },
    });

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    res.status(200).json(post);

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

    const posts = await prisma.post.findMany({
      where: {
        communityId: community.id,
      },

      include: {
        author: {
          select: {
            id: true,
            username: true,
          },
        },

        community: true,

        _count: {
          select: {
            comments: true,
            votes: true,
          },
        },
      },

      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json(posts);

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
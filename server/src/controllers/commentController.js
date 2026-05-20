const prisma = require("../config/prisma");

const createComment = async (req, res) => {
  try {
    const {
      content,
      postId,
    } = req.body;

    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    const comment =
      await prisma.comment.create({
        data: {
          content,

          authorId: req.user.userId,

          postId,
        },

        include: {
          author: {
            select: {
              id: true,
              username: true,
            },
          },

          post: {
            select: {
              id: true,
              title: true,
            },
          },
        },
      });

    res.status(201).json(comment);

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

const getCommentsByPost = async (req, res) => {
  try {
    const { postId } = req.params;

    const comments =
      await prisma.comment.findMany({
        where: {
          postId,
        },

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
      });

    res.status(200).json(comments);

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports = {
  createComment,
  getCommentsByPost,
};
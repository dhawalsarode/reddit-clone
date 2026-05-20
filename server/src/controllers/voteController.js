const prisma = require("../config/prisma");

const votePost = async (req, res) => {
  try {
    const {
      postId,
      value,
    } = req.body;

    if (value !== 1 && value !== -1) {
      return res.status(400).json({
        message: "Vote value must be 1 or -1",
      });
    }

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

    const existingVote =
      await prisma.vote.findUnique({
        where: {
          userId_postId: {
            userId: req.user.userId,
            postId,
          },
        },
      });

    // CASE 1:
    // No existing vote → create vote
    if (!existingVote) {

      const newVote =
        await prisma.vote.create({
          data: {
            value,

            userId: req.user.userId,

            postId,
          },
        });

      return res.status(201).json({
        message: "Vote added",
        vote: newVote,
      });
    }

    // CASE 2:
    // Same vote clicked again → remove vote
    if (existingVote.value === value) {

      await prisma.vote.delete({
        where: {
          id: existingVote.id,
        },
      });

      return res.status(200).json({
        message: "Vote removed",
      });
    }

    // CASE 3:
    // Opposite vote → update vote
    const updatedVote =
      await prisma.vote.update({
        where: {
          id: existingVote.id,
        },

        data: {
          value,
        },
      });

    return res.status(200).json({
      message: "Vote updated",
      vote: updatedVote,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports = {
  votePost,
};
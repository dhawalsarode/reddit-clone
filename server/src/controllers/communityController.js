const prisma = require("../config/prisma");

const createCommunity = async (req, res) => {
  try {
    const { name, description } = req.body;

    const existingCommunity =
      await prisma.community.findUnique({
        where: {
          name,
        },
      });

    if (existingCommunity) {
      return res.status(400).json({
        message: "Community already exists",
      });
    }

    const community =
      await prisma.community.create({
        data: {
          name,
          description,
        },
      });

    res.status(201).json(community);

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

const getAllCommunities = async (req, res) => {
  try {
    const communities =
      await prisma.community.findMany({
        orderBy: {
          createdAt: "desc",
        },
      });

    res.status(200).json(communities);

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

const getSingleCommunity = async (req, res) => {
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

    res.status(200).json(community);

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports = {
  createCommunity,
  getAllCommunities,
  getSingleCommunity,
};
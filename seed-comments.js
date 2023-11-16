// stuff to seed fake data to MongoDB

const mongoose = require("mongoose");
const { faker } = require("@faker-js/faker");
require("dotenv").config();

const { DB_HOST } = process.env;
const Comment = require("./models/comment");
const User = require("./models/user");

const connectDB = async () => {
  try {
    await mongoose.connect(DB_HOST);
    console.log("connected to db");
  } catch (error) {
    console.error(error);
  }
};
connectDB();

const insertComments = async () => {
  try {
    const getUsers = async () => {
      try {
        const users = User.find({}, "-password");
        return users;
      } catch (error) {
        console.log(error.message);
      }
    };
    const users = await getUsers();

    const generateComments = (number) => {
      const comments = [];

      for (let index = 0; index < number; index++) {
        const text = faker.lorem.lines({ min: 1, max: 4 });
        const randomUser = Math.floor(Math.random() * users.length);
        const owner = users[randomUser]._id;

        comments.push({
          text,
          owner,
        });
      }
      return comments;
    };

    const commentsData = generateComments(50); // change number of comments to be genereted here

    Comment.insertMany(commentsData)
      .then((docs) =>
        console.log(
          `${docs.length} comments have been inserted into the database.`
        )
      )
      .catch((error) => {
        console.error(error);
        console.error(
          `${
            error.writeErrors?.length ?? 0
          } errors occurred during the insertMany operation.`
        );
      });
  } catch (error) {
    console.log(error.message);
  }
};

insertComments();

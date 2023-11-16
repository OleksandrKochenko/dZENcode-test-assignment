// stuff to seed fake data to MongoDB

const mongoose = require("mongoose");
const { faker } = require("@faker-js/faker");
require("dotenv").config();

const { DB_HOST } = process.env;
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

const generateUsers = (number) => {
  const users = [];

  for (let index = 0; index < number; index++) {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const name = firstName + " " + lastName;
    const email = faker.internet.email({
      firstName,
      lastName,
    });
    const uniqueEmail = users.find((el) => el.email === email)
      ? faker.internet.email({ firstName, lastName: lastName + index })
      : email;
    const password = faker.internet.password({ length: 8 });
    const avatarBaseUrl = "https://eu.ui-avatars.com/api/";
    const avatarSettings = "&size=250&rounded=true";
    const avatar =
      avatarBaseUrl + `?name=${name.replace(/ /g, "+")}` + avatarSettings;

    users.push({
      name,
      email: uniqueEmail,
      password,
      avatar,
    });
  }
  return users;
};

const usersData = generateUsers(10); // change number of users to be genereted here

User.insertMany(usersData)
  .then((docs) =>
    console.log(`${docs.length} users have been inserted into the database.`)
  )
  .catch((error) => {
    console.error(error);
    console.error(
      `${
        error.writeErrors?.length ?? 0
      } errors occurred during the insertMany operation.`
    );
  });

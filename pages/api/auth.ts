import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../lib/mongodb";
import UserModel from "../../models/User";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // GET - Query string to log in a user
  // POST - To create new user to database
  // PUT - Change user password
  let client;
  client = await clientPromise;

  if (req.method === "GET") {
    const { username, password } = req.query;

    // Log in a user
    const user = await client.db("sitestats-db").collection("users").findOne({
      username: username,
    });
    if (!user) {
      return res.status(404).json({
        message: "User does not exist",
      });
    }

    // check password
    if (user.password !== password) {
      return res.status(401).json({
        message: "Invalid password provided",
      });
    } else {
      return res.status(200).json({
        message: "Logged in successfully",
        user: user,
      });
    }
  } else if (req.method === "POST") {
    // Creating a new account
    const { username, email, password } = req.body;

    const user = await client
      .db("sitestats-db")
      .collection("users")
      .find({
        username: username,
        email: email,
      })
      .toArray();
    if (user.length !== 0) {
      return res.status(404).json({
        message: "User already exist",
      });
    }

    const newUser = UserModel({
      username: username,
      email: email,
      password: password,
    });
    console.trace(newUser);
    const resp = await client
      .db("sitestats-db")
      .collection("users")
      .insertOne(newUser);

    return res.status(200).json({
      message: "New user created",
      data: resp,
    });
  } else if (req.method === "PUT") {
    const { username, oldPass, newPass } = req.body;

    const user = await client.db("sitestats-db").collection("users").findOne({
      username: username,
    });
    if (!user) {
      return res.status(404).json({
        message: "User does not exist",
      });
    }

    if (user?.password !== oldPass) {
      return res.status(401).json({
        message: "Wrong user old password",
      });
    }

    await client
      .db("sitestats-db")
      .collection("users")
      .updateOne(
        {
          username: username,
        },
        {
          $set: {
            password: newPass,
          },
        }
      );

    return res.status(200).json({
      message: "Password updated successfully",
    });
  } else {
    return res.status(425).end(`Method ${req.method} is not allowed.`);
  }
}

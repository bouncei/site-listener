import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../lib/mongodb";
import { ObjectId } from "bson";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let client;

  switch (req.method) {
    case "GET":
      client = await clientPromise;
      const { userId } = req.query;

      let response;

      if (userId) {
        // Fetch Single User
        response = await client
          .db("sitestats-db")
          .collection("users")
          .findOne({
            _id: new ObjectId(userId as string),
          });
      } else {
        // Fetch All Existing Users
        response = await client
          .db("sitestats-db")
          .collection("users")
          .find({isAdmin: false})
          .toArray();
      }

      return res.status(200).json({
        message: "Fetch Successful",
        data: response,
      });

    case "PUT":
      client = await clientPromise;
      //   Update user
      try {
        const { userId } = req.query;

        const isExist = await client
          .db("sitestats-db")
          .collection("users")
          .findOne({
            _id: new ObjectId(userId as string),
          });
        if (!isExist) {
          return res
            .status(422)
            .json({ message: "User doesn't exist", status: false });
        } else {
          await client
            .db("sitestats-db")
            .collection("users")
            .updateOne(
              {
                _id: new ObjectId(userId as string),
              },
              {
                $set: req.body,
              }
            );

          res.status(200).json({
            message: `User Updated!`,
          });
          return res.end();
        }
      } catch (error) {
        console.warn(error);
        return res.status(401).json({
          message: "Error occurred while uploading edits",
          error: error,
        });
      }

    case "DELETE":
      client = await clientPromise;
      //   Delete user
      try {
        const { userId } = req.query;

        const isExist = await client
          .db("sitestats-db")
          .collection("users")
          .findOne({
            _id: new ObjectId(userId as string),
          });
        if (!isExist) {
          return res
            .status(422)
            .json({ message: "User doesn't exist", status: false });
        } else {
          await client
            .db("sitestats-db")
            .collection("users")
            .deleteOne({
              _id: new ObjectId(userId as string),
            });

          res.status(200).json({
            message: `User Deleted!`,
          });
          return res.end();
        }
      } catch (error) {
        console.warn(error);
        return res.status(401).json({
          message: "An Error occurred",
          error: error,
        });
      }

    default:
      return res.status(405).json({ message: "Invalid Request" });
  }
}

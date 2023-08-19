import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../lib/mongodb";
import Company from "../../models/Company";
import { ObjectId } from "bson";
import corsMiddleware from "./middleware/cors";

export  async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let client;
  // POST: Adds a new website to the db
  // GET: Gets websites (options: userId, and websiteId)
  switch (req.method) {
    case "POST":
      // Creating a new company
      client = await clientPromise;
      try {
        const { name, icon, website, userId } = req.body; 

        // Check if the company exists
        const isExist = await client
          .db("sitestats-db")
          .collection("companies")
          .findOne({
            name: name,
          });
        if (isExist) {
          
          return res
            .status(422)
            .json({ message: "Company already exists", data: isExist });
        }

        // Else Create a new company
        const company = await new Company({
          name,
          icon,
          website,
          userId,
        });

        await client
          .db("sitestats-db")
          .collection("companies")
          .insertOne(company);

        return res.status(200).json({
          message: "New company added",
          status: true,
        });
      } catch (error) {
        console.warn(error);

        return res.status(401).json({
          status: false,
          message: "Create Operation Failed",
          error: error,
        });
      }

    case "GET":
      client = await clientPromise;
      const { companyId, userId } = req.query;

      let response;

      if (companyId) {
        // Fetch Single Product
        response = await client
          .db("sitestats-db")
          .collection("companies")
          .findOne({
            _id: new ObjectId(companyId as string),
          });
      }else if (userId) {
        // Fetch all websites that belongs to a user
        response = await client
        .db("sitestats-db")
        .collection("companies")
        .find({
          userId: userId as string
        }).toArray()
      } else {
        // Fetch All Existing Companies
        response = await client
          .db("sitestats-db")
          .collection("companies")
          .find({})
          .toArray();
      }

      return res.status(200).json({
        message: "Fetch Successful",
        data: response,
      });

    case "PUT":
      client = await clientPromise;
      //   Update company
      try {
        const { companyId } = req.query;

        const isExist = await client
          .db("sitestats-db")
          .collection("companies")
          .findOne({
            _id: new ObjectId(companyId as string),
          });
        if (!isExist) {
          return res
            .status(422)
            .json({ message: "Company doesn't exist", status: false });
        } else {
          await client
            .db("sitestats-db")
            .collection("companies")
            .updateOne(
              {
                _id: new ObjectId(companyId as string),
              },
              {
                $set: req.body,
              }
            );

          res.status(200).json({
            message: `Company Updated!`,
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
      //   Update company
      try {
        const { companyId } = req.query;

        const isExist = await client
          .db("sitestats-db")
          .collection("companies")
          .findOne({
            _id: new ObjectId(companyId as string),
          });
        if (!isExist) {
          return res
            .status(422)
            .json({ message: "Company doesn't exist", status: false });
        } else {
          await client
            .db("sitestats-db")
            .collection("companies")
            .deleteOne({
              _id: new ObjectId(companyId as string),
            });

          res.status(200).json({
            message: `Company Deleted!`,
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

export default corsMiddleware(handler);
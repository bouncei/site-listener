import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../lib/mongodb";
import Company from "../../models/Company";
import { ObjectId } from "bson";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let client;

  switch (req.method) {
    case "POST":
      // Creating a new company
      client = await clientPromise;
      try {
        const { name, icon, website } = req.body;

        // Check if the company exists
        const isExist = await client
          .db("sitestats-db")
          .collection("companies")
          .findOne({
            name: name,
          });
        if (isExist) {
          console.log(isExist);
          return res
            .status(422)
            .json({ message: "Company already exists", data: isExist });
        }

        // Else Create a new company
        const company = await Company({
          name,
          icon,
          website,
        });

        await client
          .db("sitestats-db")
          .collection("companies")
          .insertOne(company);

        return res.status(200).json({
          message: "New company created",
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
      const { companyId } = req.query;

      let response;

      if (companyId) {
        // Fetch Single Product
        response = await client
          .db("sitestats-db")
          .collection("companies")
          .findOne({
            _id: new ObjectId(companyId as string),
          });
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
            .db("troctowork")
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

    default:
      return res.status(405).json({ message: "Invalid Request" });
  }
}

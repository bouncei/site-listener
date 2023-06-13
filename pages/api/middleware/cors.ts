import type { NextApiRequest, NextApiResponse } from "next";

// CORS MIDDLEWARE
export const setCors = (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With, Content-Type"
  );
  res.setHeader("Access-Control-Allow-Credentials", "true");
};

export default function corsMiddleware(handler: any) {
  return (req: NextApiRequest, res: NextApiResponse) => {
    setCors(req, res);
    if (req.method === "OPTIONS") {
      return res.status(200).end();
    }
    return handler(req, res);
  };
}

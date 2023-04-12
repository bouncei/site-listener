// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const client = new MongoClient(
  "mongodb+srv://bouncey:ZFHxbCY12tTigQnF@cluster0.v60ksyd.mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

async function getConnection() {
  // Connect to the MongoDB database
  await client.connect();
  return client.db("sitestats-db").collection("companies");
}

async function closeConnection() {
  await client.close();
}

function checkSiteActive(url, ssl) {
  return new Promise((resolve, reject) => {
    let request = https;
    if (!ssl) {
      request = http;
    }
    request
      .get(url, (res) => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve({
            sucess: true,
            message: null,
          });
        } else {
          resolve({
            sucess: false,
            message: res.statusMessage,
          });
        }
      })
      .on("error", (err) => {
        resolve({
          sucess: false,
          message: err.message,
        });
      });
  });
}

function checkSite(url) {
  return new Promise((resolve, reject) => {
    const httpUrl = url.replace(/^https:/i, "http:");
    checkSiteActive(httpUrl, false)
      .then((active) => {
        if (active.sucess) {
          const httpsUrl = url.replace(/^http:/i, "https:");
          checkSiteActive(httpsUrl, true)
            .then((active) => {
              if (active.sucess) {
                resolve({
                  sslEnabled: true,
                  active: true,
                  message: active.message,
                });
              } else {
                resolve({
                  sslEnabled: false,
                  active: true,
                  message: active.message,
                });
              }
            })
            .catch((err) => {
              resolve({
                sslEnabled: false,
                active: true,
                message: err.message,
              });
            });
        } else {
          const httpsUrl = url.replace(/^http:/i, "https:");
          checkSiteActive(httpsUrl, true)
            .then((active) => {
              if (active.sucess) {
                resolve({
                  sslEnabled: true,
                  active: true,
                  message: active.message,
                });
              } else {
                resolve({
                  sslEnabled: false,
                  active: true,
                  message: active.message,
                });
              }
            })
            .catch((err) => {
              resolve({
                sslEnabled: false,
                active: false,
                message: err.message,
              });
            });
        }
      })
      .catch((err) => {
        resolve({
          sslEnabled: false,
          active: false,
          message: err.message,
        });
      });
  });
}

async function readData() {
  return new Promise(async (resolve, reject) => {
    try {
      const collection = await getConnection();
      // Find all documents in the collection
      const cursor = collection.find({});

      // Iterate over the cursor and print each document to the console
      resolve(cursor.toArray());
      // await client.close();
    } catch (err) {
      reject(err);
      // await client.close();
    }
  });
}

async function updateData(id, updatedDocument) {
  return new Promise(async (resolve, reject) => {
    try {
      const collection = await getConnection();
      // Update the document in the collection
      const filter = { _id: id };
      await collection.replaceOne(filter, updatedDocument);
      resolve(true);
    } catch (err) {
      reject(err);
    }
  });
}

export default async function handler(req, res) {
  const stites = await readData().catch((err) =>
    console.log("Mongobd err", err)
  );

  console.log("runing check on ", stites.length, "items");
  for (let index = 0; index < stites.length; index++) {
    const element = stites[index];
    console.log(element._id, 1);
    const status = await checkSite(element.website);
    console.log(element._id, 2);

    //TODO: set ssl to true and active to true and message to null
    const updatedDocument = {
      ...element,
      ssl: status.sslEnabled,
      active: status.active,
      message: status.message,
      date: new Date(),
    };
    console.log(element._id, 3);

    await updateData(element._id, updatedDocument);
    console.log(element._id, 4);

    // await closeConnection();
  }

  res.status(200).json({ messasge: "Cron job has started" });
}

import mongoose from "mongoose";

const rawMongoUri = process.env.MONGODB_URI || "";
// eslint-disable-next-line no-console
console.log("Raw MONGODB_URI from env:", rawMongoUri ? "present" : "missing");
const MONGODB_URI = rawMongoUri.trim().replace(/^"(.*)"$/, "$1");

type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined;
}

const cached: MongooseCache = global.mongooseCache ?? {
  conn: null,
  promise: null,
};

global.mongooseCache = cached;

export async function connectToDatabase() {
  if (!MONGODB_URI) {
    throw new Error(
      "Missing MONGODB_URI environment variable. Add it to .env.local (and .env.example).",
    );
  }

  // Log masked URI for debugging
  const maskedUri = MONGODB_URI.replace(/:([^:@]{4})[^:@]*@/, ":$1****@");
  // eslint-disable-next-line no-console
  console.log("Attempting MongoDB connection to:", maskedUri);

  if (cached.conn) {
    // eslint-disable-next-line no-console
    console.log("Using cached MongoDB connection");
    return cached.conn;
  }

  if (!cached.promise) {
    mongoose.set("strictQuery", false);

    cached.promise = mongoose
      .connect(MONGODB_URI, {
        // Helpful for Atlas / serverless environments
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 8000,
        connectTimeoutMS: 10000,
        // Add buffer commands to prevent issues in serverless
        bufferCommands: false,
      })
      .then((m) => {
        // eslint-disable-next-line no-console
        console.log("MongoDB connected successfully to database:", m.connection.db?.databaseName || "unknown");
        return m;
      });
  }

  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("MongoDB connection error:", err);
    // Log more details for debugging
    if (err instanceof Error) {
      // eslint-disable-next-line no-console
      console.error("Error name:", err.name);
      // eslint-disable-next-line no-console
      console.error("Error message:", err.message);
      // eslint-disable-next-line no-console
      console.error("Error stack:", err.stack);
    }
    cached.promise = null;
    throw err;
  }
}

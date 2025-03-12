// this file push many json data in the nonfaculties collection in the dataabase
// to run this go to the helper folder and type node insertN.js

import { MongoClient } from "mongodb";

// MongoDB Connection URI
const uri = "mongodb+srv://group:7xzqlJfpVtaBR1LB@cluster0.aozrc.mongodb.net"; // Update if necessary

// Database and Collection Name
const dbName = "Aiml-Department";
const collectionName = "nonfaculties";

const facultyData = [
  {
    fullname: "Ms. Sarla Ghule",
    qualification: "Industrial Elec. Diploma",
    designation: "AI & ML Lab Assist.",
    profileImage: "/Photos/default-avatar.png",
  },
  {
    fullname: "Ms. Komal S. Tawde",
    qualification: "Comp. Diploma",
    designation: "AI & ML Lab Assist.",
    profileImage: "/Photos/default-avatar.png",
  },
  {
    fullname: "Mr. Aditya D. Ekhare",
    qualification: "BSC IT",
    designation: "AI & ML Lab Assist.",
    profileImage: "/Photos/default-avatar.png",
  },
  {
    fullname: "Mr. Gangaprasad Dubey",
    qualification: "S.S.C",
    designation: "Peon",
    profileImage: "/Photos/default-avatar.png",
  },
];

async function insertOrUpdateFacultyData() {
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    console.log("✅ Connected to MongoDB");

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // Bulk upsert (Insert or Update)
    const bulkOps = facultyData.map((faculty) => ({
      updateOne: {
        filter: { fullname: faculty.fullname }, // Using fullname as unique key
        update: { $set: faculty },
        upsert: true, // Insert if not exists
      },
    }));

    const result = await collection.bulkWrite(bulkOps);
    console.log(`✅ Inserted: ${result.upsertedCount}, Updated: ${result.modifiedCount}`);
  } catch (error) {
    console.error("❌ Error inserting/updating faculty data:", error);
  } finally {
    await client.close();
    console.log("🔌 Connection closed");
  }
}

insertOrUpdateFacultyData();

import { MongoClient, ObjectId } from "mongodb";
// MongoDB Connection URI
const uri = "mongodb+srv://group:7xzqlJfpVtaBR1LB@cluster0.aozrc.mongodb.net"; // Update if necessary
//IMP//
// this file push many json data in the faculties collection in the dataabase
// to run this go to the helper folder and type node insert.js


// Database and Collection Name
const dbName = "Aiml-Department";
const collectionName = "faculties";

// Faculty Data (Limited to explicitly mentioned faculty members)
const facultyData = [
  {
    _id: new ObjectId("67d130f949c65b003339661d"),
    name: "Dr. Chaitrali Chaudhari",
    profileImage: "",
    qualification: "Ph.D",
    designation: "Assistant Professor (H.O.D.)",
    experience: 14,
    email: "chaitrali.chaudhari@ltce.in",
  },
  {
    _id: new ObjectId("67d1326449c65b0033396620"),
    name: "Dr. Sanjivani Deokar",
    profileImage: "",
    qualification: "Ph.D",
    designation: "Assistant Professor",
    experience: 10,
    email: "sanjivani.deokar@ltce.in",
  },
  {
    _id: new ObjectId("67d1326449c65b0033396621"),
    name: "Prof. Sheshmal Shingne",
    profileImage: "https://res.cloudinary.com/demo/image/upload/v1610000000/sample.jpg",
    qualification: "M.Tech",
    designation: "Assistant Professor",
    experience: 8,
    email: "sheshmal.shingne@ltce.in",
  },
  {
    _id: new ObjectId("67d1326449c65b0033396622"),
    name: "Prof. Arti Ochani",
    profileImage: "",
    qualification: "M.E.",
    designation: "Assistant Professor",
    experience: 11,
    email: "arti.ochani@ltce.in",
  },
  {
    _id: new ObjectId("67d1326449c65b0033396623"),
    name: "Prof. Divya Tiwari",
    profileImage: "https://res.cloudinary.com/demo/image/upload/v1610000000/sample.jpg",
    qualification: "M.E.",
    designation: "Assistant Professor",
    experience: 7,
    email: "divya.tiwari@ltce.in",
  },
  {
    _id: new ObjectId("67d1326449c65b0033396624"),
    name: "Prof. Snehal Junnarkar",
    profileImage: "",
    qualification: "M.E, Ph.D. (Pursuing)",
    designation: "Assistant Professor",
    experience: 6,
    email: "snehal.junnarkar@ltce.in",
  },
  {
    _id: new ObjectId("67d1326449c65b0033396625"),
    name: "Prof. Ujjwala Pandharkar",
    profileImage: "https://res.cloudinary.com/demo/image/upload/v1610000000/sample.jpg",
    qualification: "M.E, Ph.D. (Pursuing)",
    designation: "Assistant Professor",
    experience: 5,
    email: "ujjawalap@ltce.in",
  },
  {
    _id: new ObjectId("67d1326449c65b0033396626"),
    name: "Prof. Smita Ganjare",
    profileImage: "",
    qualification: "M.E, Ph.D. (Pursuing)",
    designation: "Assistant Professor",
    experience: 13,
    email: "smita.ganjare@ltce.in",
  },
  {
    _id: new ObjectId("67d1326449c65b0033396627"),
    name: "Prof. Kanchan Talekar",
    profileImage: "",
    qualification: "M.Tech, Ph.D. (Pursuing)",
    designation: "Assistant Professor",
    experience: 9,
    email: "kanchan.talekar@ltce.in",
  },
  {
    _id: new ObjectId("67d1326449c65b0033396628"),
    name: "Prof. Ashwini Pawar",
    profileImage: "",
    qualification: "M.Tech, Ph.D. (Pursuing)",
    designation: "Assistant Professor",
    experience: 8,
    email: "ashwini.sangolkar@ltce.in",
  },
  {
    _id: new ObjectId("67d1326449c65b0033396629"),
    name: "Prof. Kumudbala Saxena",
    profileImage: "https://res.cloudinary.com/demo/image/upload/v1610000000/sample.jpg",
    qualification: "M.Tech",
    designation: "Assistant Professor",
    experience: 6,
    email: "kumud.bala@ltce.in",
  },
  {
    _id: new ObjectId("67d1326449c65b003339662A"),
    name: "Prof. Yugandhara Pande",
    profileImage: "",
    qualification: "M.E.",
    designation: "Assistant Professor",
    experience: 7,
    email: "yugandhara.dhepe@ltce.in",
  },
  {
    _id: new ObjectId("67d1326449c65b003339662B"),
    name: "Prof. Varsha Mashoria",
    profileImage: "",
    qualification: "M.Tech, Ph.D. (Pursuing)",
    designation: "Assistant Professor",
    experience: 8,
    email: "varsha.mashoria@ltce.in",
  },
  {
    _id: new ObjectId("67d1326449c65b003339662C"),
    name: "Prof. Saranya Vinod",
    profileImage: "",
    qualification: "M.E.",
    designation: "Assistant Professor",
    experience: 6,
    email: "saranya@ltce.in",
  },
  {
    _id: new ObjectId("67d1326449c65b003339662D"),
    name: "Prof. Himali Patil",
    profileImage: "https://res.cloudinary.com/demo/image/upload/v1610000000/sample.jpg",
    qualification: "M.E.",
    designation: "Assistant Professor",
    experience: 1,
    email: "himali@ltce.in",
  },
  {
    _id: new ObjectId("67d1326449c65b003339662E"),
    name: "Prof. Shilpa Wankhade",
    profileImage: "",
    qualification: "M.E.",
    designation: "Assistant Professor",
    experience: 5,
    email: "shilpa@ltce.in",
  },
  {
    _id: new ObjectId("67d1326449c65b003339662F"),
    name: "Prof. Ankita Bargat",
    profileImage: "",
    qualification: "M.Tech",
    designation: "Assistant Professor",
    experience: 4,
    email: "asbargat@ltce.in",
  },
];

// Function to insert or update faculty data
async function insertOrUpdateFacultyData() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // Bulk upsert (insert or update existing records)
    const bulkOps = facultyData.map((faculty) => ({
      updateOne: {
        filter: { _id: faculty._id },
        update: { $set: faculty },
        upsert: true, // Insert if not exists
      },
    }));

    const result = await collection.bulkWrite(bulkOps);
    console.log(`Inserted: ${result.upsertedCount}, Updated: ${result.modifiedCount}`);

  } catch (error) {
    console.error("Error inserting/updating faculty data:", error);
  } finally {
    await client.close();
    console.log("Connection closed");
  }
}

insertOrUpdateFacultyData();

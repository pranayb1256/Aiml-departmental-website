import Result from "../models/result.models.js"


app.post("/api/results", async (req, res) => {
    try {
      const newResult = new Result(req.body);
      await newResult.save();
      res.status(201).json({ message: "Result added successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error adding result", error });
    }
  });
  
  // API to get results by year or semester
  app.get("/api/results", async (req, res) => {
    try {
      const { year, semester } = req.query;
      let filter = {};
      if (year) filter.year = year;
      if (semester) filter.semester = semester;
  
      const results = await Result.find(filter);
      res.status(200).json(results);
    } catch (error) {
      res.status(500).json({ message: "Error fetching results", error });
    }
  });
  
  // API to get overall department topper
  app.get("/api/results/topper", async (req, res) => {
    try {
      const topper = await Result.find().sort({ "overallTopper.percentage": -1 }).limit(1);
      res.status(200).json(topper);
    } catch (error) {
      res.status(500).json({ message: "Error fetching topper", error });
    }
  });
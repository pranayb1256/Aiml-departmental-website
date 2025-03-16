import Timetable from '../models/timetable.models.js';


//upload timetable
export const uploadTimetable = async (req, res) => {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

    try {
        //Fetch formdata
        const { year, semester } = req.body;
        const urlPath = req.file.path;
        const publicId = req.file.filename;

        if (!year || !semester) {
            return res.status(400).json({ message: 'Year and semester are required' });
        }

        //deleting existing timetable from DB if it exists
        const existingTimetable = await Timetable.findOne({ year, semester });
        if (existingTimetable) {
            const oldPublicId = existingTimetable.url.split('/').slice(-2).join('/').replace('.pdf', '');
            await cloudinary.uploader.destroy(oldPublicId, { resource_type: "raw" });

            // Delete the old record from DB
            await Timetable.deleteOne({ year, semester });
        }


        // Save new timetable
        const newTimetable = new Timetable({
            url: urlPath,
            year,
            semester,
            publicId
        });
        await newTimetable.save();

        res.json({ newTimetable, message: 'Timetable updated successfully' });
    } catch (error) {
        console.error("Controller : uploadTimetable : Error: ", error);
        res.status(500).json({ message: 'Failed to upload timetable' });
    }
};

// Fetch the latest timetable
export const getTimetable = async (req, res) => {
    try {
        const { year, semester } = req.params;
        const timetable = await Timetable.findOne({ year, semester });

        if (!timetable) return res.status(404).json({ message: 'No timetable found for given year and sem' });

        res.status(200).json({ url: timetable.url });
    } catch (error) {
        console.error("Controller : getLatestTimetable : Error: ", error);
        res.status(500).json({ message: 'Failed to fetch timetable' });
    }
};

// Delete the timetable
export const deleteTimetable = async (req, res) => {
    try {
        const { year, semester } = req.params;

        const timetable = await Timetable.findOne({ year, semester })
        if (!timetable) {
            return res.status(404).json({ message: 'No timetable found for the given year and semester.' });
        }

        // Extract public ID and delete from Cloudinary
        const publicId = timetable.url.split('/').pop().split('.')[0];
        await cloudinary.uploader.destroy(timetable.publicId, { resource_type: "raw" });

        //deleting document from db
        await Timetable.deleteOne({ year, semester });

        res.json({ message: 'Timetable deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to delete timetable' });
    }
};

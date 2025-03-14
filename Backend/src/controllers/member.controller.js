import Member from "../models/members.model.js";

// Get all members of a specific club
export const getMembersByClub = async (req, res) => {
  try {
    const { clubName } = req.params; // Using club name as a string
    const members = await Member.find({ club: clubName }); // No need to populate since it's a string
    res.json({ success: true, members });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Add a new member
export const addMember = async (req, res) => {
  try {
    const { name, yearBranch, position, photo, linkedin, instagram, github, club } = req.body;
    const newMember = new Member({ name, yearBranch, position, photo, linkedin, instagram, github, club });
    await newMember.save();
    res.json({ success: true, member: newMember });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to add member" });
  }
};

// Update a member
export const updateMember = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedMember = await Member.findByIdAndUpdate(id, req.body, { new: true });
    res.json({ success: true, member: updatedMember });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to update member" });
  }
};

// Delete a member
export const deleteMember = async (req, res) => {
  try {
    const { id } = req.params;
    await Member.findByIdAndDelete(id);
    res.json({ success: true, message: "Member deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to delete member" });
  }
};

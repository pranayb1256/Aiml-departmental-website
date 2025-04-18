import { useState, useEffect } from "react";
import axios from "axios";
import { FaLinkedin, FaInstagram, FaGithub, FaTrash } from "react-icons/fa";
import { Typography } from "@mui/material";
import toast from "react-hot-toast";

const Member = () => {
  const [members, setMembers] = useState([]);
  const [selectedClub, setSelectedClub] = useState("AIMSA");
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    yearBranch: "",
    position: "",
    photo: "",
    linkedin: "",
    instagram: "",
    github: "",
  });

  useEffect(() => {
    fetchMembers(selectedClub);
  }, [selectedClub]);

  const fetchMembers = async (club) => {
    const apiUrl = import.meta.env.VITE_API_URL;
    try {
      const res = await axios.get(`${apiUrl}/member/${club}`);
      setMembers(res.data.members);
    } catch (error) {
      toast.error("Failed to fetch members.");
      console.error("Error fetching members:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addMember = async (e) => {
    e.preventDefault();
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const res = await axios.post(`${apiUrl}/member`, { ...formData, club: selectedClub });
      setMembers([...members, res.data.member]);
      toast.success("Member added successfully!");
      setFormData({
        name: "",
        yearBranch: "",
        position: "",
        photo: "",
        linkedin: "",
        instagram: "",
        github: "",
      });
    } catch (error) {
      toast.error("Error adding member.");
      console.error("Error adding member:", error);
    }
  };

  const editMember = (member) => {
    setFormData({
      name: member.name,
      yearBranch: member.yearBranch,
      position: member.position,
      photo: member.photo,
      linkedin: member.linkedin || "",
      instagram: member.instagram || "",
      github: member.github || "",
    });
    setIsEditing(true);
    setEditingId(member._id);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const res = await axios.put(`${apiUrl}/member/${editingId}`, { ...formData, club: selectedClub });
      const updatedList = members.map((m) => (m._id === editingId ? res.data.member : m));
      setMembers(updatedList);
      toast.success("Member updated successfully!");
      setFormData({
        name: "",
        yearBranch: "",
        position: "",
        photo: "",
        linkedin: "",
        instagram: "",
        github: "",
      });
      setIsEditing(false);
      setEditingId(null);
    } catch (error) {
      toast.error("Error updating member.");
      console.error("Error updating member:", error);
    }
  };

  const deleteMember = async (id) => {
    if (window.confirm("Are you sure you want to delete this member?")) {
      try {
      const apiUrl = import.meta.env.VITE_API_URL;
        await axios.delete(`${apiUrl}/member/${id}`);
        setMembers(members.filter((m) => m._id !== id));
        toast.success("Member deleted successfully!");
      } catch (error) {
        toast.error("Error deleting member.");
        console.error("Error deleting member:", error);
      }
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <Typography variant="h4" align="center" gutterBottom>
        Manage Member
      </Typography>

      {/* Club Selection */}
      <div className="flex justify-center mb-6">
        <select 
          onChange={(e) => setSelectedClub(e.target.value)} 
          value={selectedClub} 
          className="border p-2 rounded-lg shadow-md bg-white"
        >
          <option value="AIMSA">AIMSA</option>
          <option value="CSI">CSI</option>
          <option value="ISTE">ISTE</option>
        </select>
      </div>

      {/* Member Form */}
      <form onSubmit={isEditing ? handleUpdate : addMember} className="bg-white p-6 rounded-lg shadow-md mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required className="border p-2 rounded w-full" />
          <input type="text" name="yearBranch" placeholder="Year & Branch" value={formData.yearBranch} onChange={handleChange} required className="border p-2 rounded w-full" />
          <input type="text" name="position" placeholder="Position" value={formData.position} onChange={handleChange} required className="border p-2 rounded w-full" />
          <input type="text" name="photo" placeholder="Photo URL" value={formData.photo} onChange={handleChange} required className="border p-2 rounded w-full" />
          <input type="text" name="linkedin" placeholder="LinkedIn URL" value={formData.linkedin} onChange={handleChange} className="border p-2 rounded w-full" />
          <input type="text" name="instagram" placeholder="Instagram URL" value={formData.instagram} onChange={handleChange} className="border p-2 rounded w-full" />
          <input type="text" name="github" placeholder="GitHub URL" value={formData.github} onChange={handleChange} className="border p-2 rounded w-full" />
        </div>
        <button type="submit" className="mt-4 bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700 transition">
          {isEditing ? "Update Member" : "Add Member"}
        </button>
      </form>

      {/* Members Table */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <table className="w-full border-collapse border text-left">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Photo</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Position</th>
              <th className="border p-2">Links</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member) => (
              <tr key={member._id} className="hover:bg-gray-100">
                <td className="border p-2">
                  <img src={member.photo} alt={member.name} className="w-12 h-12 rounded-full object-cover" />
                </td>
                <td className="border p-2 font-semibold">{member.name}</td>
                <td className="border p-2">{member.position}</td>
                <td className="border p-2 flex gap-3">
                  {member.linkedin && <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800"><FaLinkedin size={20} /></a>}
                  {member.instagram && <a href={member.instagram} target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:text-pink-700"><FaInstagram size={20} /></a>}
                  {member.github && <a href={member.github} target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-black"><FaGithub size={20} /></a>}
                </td>
                <td className="border p-2 flex gap-2">
                  <button onClick={() => editMember(member)} className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition">Edit</button>
                  <button onClick={() => deleteMember(member._id)} className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"><FaTrash /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {members.length === 0 && <p className="text-center text-gray-600 mt-4">No members found for this club.</p>}
      </div>
    </div>
  );
};

export default Member;

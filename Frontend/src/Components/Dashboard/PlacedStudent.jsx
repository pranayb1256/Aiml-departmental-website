import { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useDropzone } from "react-dropzone";

const PlacedStudent = () => {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({ name: "", company: "", image: null });
  const [editingStudentId, setEditingStudentId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/placed-student");
      setStudents(response.data);
    } catch (error) {
      toast.error("Failed to fetch students.");
    }
    setLoading(false);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Drag & Drop Image Upload
  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setFormData({ ...formData, image: file });
      setPreviewImage(URL.createObjectURL(file)); // Show preview
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/*",
    multiple: false,
  });

  const handleSubmit = async () => {
    if (!formData.name || !formData.company || !formData.image) {
      toast.error("All fields are required!");
      return;
    }

    setLoading(true);
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("company", formData.company);
      formDataToSend.append("image", formData.image); // Append image

      if (editingStudentId) {
        await axios.put(`/api/placed-student/${editingStudentId}`, formDataToSend, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Student updated successfully!");
      } else {
        await axios.post("/api/placed-student", formDataToSend, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Student added successfully!");
      }

      setFormData({ name: "", company: "", image: null });
      setPreviewImage(null);
      setEditingStudentId(null);
      fetchStudents();
    } catch (error) {
      toast.error("Error saving student.");
    }
    setLoading(false);
  };

  const handleEdit = (student) => {
    setFormData({ name: student.name, company: student.company, image: null });
    setEditingStudentId(student._id);
    setPreviewImage(student.image); // Set preview for existing student image
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this student?")) return;

    setLoading(true);
    try {
      await axios.delete(`/api/placed-student/${id}`);
      toast.success("Student deleted successfully!");
      fetchStudents();
    } catch (error) {
      toast.error("Error deleting student.");
    }
    setLoading(false);
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <Toaster position="top-center" reverseOrder={false} />
      <h2 className="text-2xl font-bold text-blue-600 mb-4">🎓 Manage Placed Students</h2>

      {/* Form for Adding/Updating Students */}
      <div className="mb-6 flex flex-wrap gap-2">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleInputChange}
          className="border p-2 rounded w-full sm:w-auto"
        />
        <input
          type="text"
          name="company"
          placeholder="Company"
          value={formData.company}
          onChange={handleInputChange}
          className="border p-2 rounded w-full sm:w-auto"
        />

        {/* Drag and Drop Image Upload */}
        <div {...getRootProps()} className="border-dashed border-2 p-4 w-full sm:w-auto text-center cursor-pointer rounded-lg">
          <input {...getInputProps()} />
          {isDragActive ? (
            <p className="text-blue-500">Drop the image here...</p>
          ) : (
            <p className="text-gray-500">Drag & drop an image or click to select</p>
          )}
        </div>

        {/* Image Preview */}
        {previewImage && (
          <div className="w-24 h-24 mt-2">
            <img src={previewImage} alt="Preview" className="w-full h-full object-cover rounded-lg" />
          </div>
        )}

        <button
          onClick={handleSubmit}
          className={`px-4 py-2 text-white rounded ${editingStudentId ? "bg-yellow-500" : "bg-green-500"} ${loading && "opacity-50 cursor-not-allowed"}`}
          disabled={loading}
        >
          {editingStudentId ? "Update" : "Add"}
        </button>
      </div>

      {/* Student List */}
      {loading ? (
        <p className="text-gray-500">Loading students...</p>
      ) : students.length > 0 ? (
        <table className="w-full border-collapse border rounded-lg shadow-md">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Company</th>
              <th className="border px-4 py-2">Image</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student._id} className="text-center border hover:bg-gray-100">
                <td className="border px-4 py-2">{student.name}</td>
                <td className="border px-4 py-2">{student.company}</td>
                <td className="border px-4 py-2">
                  <img src={student.image} alt={student.name} className="w-12 h-12 rounded-full object-cover mx-auto" />
                </td>
                <td className="border px-4 py-2">
                  <button onClick={() => handleEdit(student)} className="bg-yellow-500 text-white px-3 py-1 rounded mr-2">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(student._id)} className="bg-red-500 text-white px-3 py-1 rounded">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-500">No placed students found.</p>
      )}
    </div>
  );
};

export default PlacedStudent;

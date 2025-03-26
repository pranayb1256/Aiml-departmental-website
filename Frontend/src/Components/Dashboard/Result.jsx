import { useState, useEffect } from "react";
import { Table, Button, Modal, Input, Select, message, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";

const { Option } = Select;

const Results = () => {
  const [results, setResults] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newResult, setNewResult] = useState({
    year: "FE",
    semester: 1,
    passPercentage: "",
    totalStudents: "",
    passedStudents: "",
    failedStudents: "",
    topper: { name: "", percentage: "", image: null },
    overallTopper: { name: "", percentage: "" },
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("/api/result");
      setResults(data);
    } catch (error) {
      message.error("Failed to fetch results");
    }
    setLoading(false);
  };

  const handleAddResult = async () => {
    console.log("Submitting Result:", newResult); // Debugging line
    
    try {
      await axios.post("/api/result", newResult);
      message.success("Result added successfully");
      fetchResults();
      setIsModalOpen(false);
    } catch (error) {
      message.error("Error adding result");
    }
  };
  
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/result/${id}`);
      message.success("Result deleted successfully");
      fetchResults();
    } catch (error) {
      message.error("Error deleting result");
    }
  };

  const handleImageUpload = async ({ topperImage }) => {
    const formData = new FormData();
    formData.append("file", topperImage);
    formData.append("upload_preset", "your_upload_preset");
  
    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/your_cloud_name/image/upload",
        formData
      );
  
      setNewResult((prev) => ({
        ...prev,
        topper: { ...prev.topper, image: response.data.secure_url },
      }));
    } catch (error) {
      message.error("Image upload failed!");
    }
  };
  
  

  const columns = [
    { title: "Year", dataIndex: "year", key: "year" },
    { title: "Semester", dataIndex: "semester", key: "semester" },
    { title: "Pass %", dataIndex: "passPercentage", key: "passPercentage" },
    { title: "Total Students", dataIndex: "totalStudents", key: "totalStudents" },
    { title: "Passed", dataIndex: "passedStudents", key: "passedStudents" },
    { title: "Failed", dataIndex: "failedStudents", key: "failedStudents" },
    { title: "Topper", dataIndex: ["topper", "name"], key: "topper" },
    {
      title: "Image",
      dataIndex: ["topper", "image"],
      key: "image",
      render: (image) =>
        image ? (
          <img src={image} alt="Topper" style={{ width: 50, height: 50, borderRadius: "50%" }} />
        ) : (
          "No Image"
        ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button onClick={() => handleDelete(record._id)} danger>
          Delete
        </Button>
      ),
    },
  ];
  

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Results Management</h2>
      <Button type="primary" onClick={() => setIsModalOpen(true)}>Add Result</Button>
      <Table columns={columns} dataSource={results} loading={loading} rowKey="_id" className="mt-4" />

      <Modal title="Add New Result" visible={isModalOpen} onOk={handleAddResult} onCancel={() => setIsModalOpen(false)}>
        <Select value={newResult.year} onChange={(value) => setNewResult({ ...newResult, year: value })} className="w-full mb-2">
          <Option value="FE">FE</Option>
          <Option value="SE">SE</Option>
          <Option value="TE">TE</Option>
          <Option value="BE">BE</Option>
        </Select>
        <Input type="number" placeholder="Semester" value={newResult.semester} onChange={(e) => setNewResult({ ...newResult, semester: e.target.value })} className="mb-2" />
        <Input type="number" placeholder="Pass Percentage" value={newResult.passPercentage} onChange={(e) => setNewResult({ ...newResult, passPercentage: e.target.value })} className="mb-2" />
        <Input type="number" placeholder="Total Students" value={newResult.totalStudents} onChange={(e) => setNewResult({ ...newResult, totalStudents: e.target.value })} className="mb-2" />
        <Input type="number" placeholder="Passed Students" value={newResult.passedStudents} onChange={(e) => setNewResult({ ...newResult, passedStudents: e.target.value })} className="mb-2" />
        <Input type="number" placeholder="Failed Students" value={newResult.failedStudents} onChange={(e) => setNewResult({ ...newResult, failedStudents: e.target.value })} className="mb-2" />
        <Input placeholder="Topper Name" value={newResult.topper.name} onChange={(e) => setNewResult({ ...newResult, topper: { ...newResult.topper, name: e.target.value } })} className="mb-2" />
        <Input type="number" placeholder="Topper Cgpa" value={newResult.topper.percentage} onChange={(e) => setNewResult({ ...newResult, topper: { ...newResult.topper, percentage: e.target.value } })} className="mb-2" />
        <Upload beforeUpload={() => false} onChange={handleImageUpload} className="mb-2">
          <Button icon={<UploadOutlined />}>Upload Topper Image</Button>
        </Upload>
      </Modal>
    </div>
  );
};

export default Results;

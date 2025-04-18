import { useState, useEffect } from "react";
import { Table, Button, Modal, Input, Select, message, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";

const { Option } = Select;

const Results = () => {
    const [results, setResults] = useState([]);
    const [isImgUploaded, setIsImgUploaded] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newResult, setNewResult] = useState({
        topperImage: "",
        topperName: "",
        topperCgpa: "",
        year: "FE",
        semester: 1,
        passPercentage: "",
        totalStudents: "",
        passedStudents: "",
        failedStudents: "",
        avgCgpa: "",
    });
    const [loading, setLoading] = useState(false);

    // Fetch results
    useEffect(() => {
        const fetchResults = async () => {
            setLoading(true);
            try {
                const { data } = await axios.get("api/result");
                setResults(data);
            } catch (error) {
                message.error("Failed to fetch results");
            }
            setLoading(false);
        };

        fetchResults();
    }, []);

    // Handle adding new result
    const handleAddResult = async () => {
        if (!isImgUploaded) {
            message.error("Please upload an image before adding the result.");
            return;
        }

        try {
            await axios.post("api/result", newResult);
            message.success("Result added successfully");
            setIsModalOpen(false);
            setIsImgUploaded(false);
        } catch (error) {
            message.error("Error adding result");
        }
    };

    // Handle deleting a result
    const handleDelete = async (id) => {
        try {
            await axios.delete(`api/result/${id}`);
            message.success("Result deleted successfully");
            setResults((prev) => prev.filter((result) => result._id !== id));
        } catch (error) {
            message.error("Error deleting result");
        }
    };

    // Handle image upload to Cloudinary
    const handleImageUpload = async ({ file }) => {
        if (!file) return console.error("No file selected");

        const actualFile = file.originFileObj || file;

        const formData = new FormData();
        formData.append("file", actualFile);
        formData.append("upload_preset", "demo1234"); // Your Cloudinary upload preset

        try {
            const response = await axios.post(
                "https://api.cloudinary.com/v1_1/dzydycrjo/image/upload",
                formData
            );

            setNewResult((prev) => ({
                ...prev,
                topperImage: response.data.secure_url, // Save image URL
            }));

            setIsImgUploaded(true);
            message.success("Image uploaded successfully!");
        } catch (error) {
            message.error("Image upload failed!");
        }
    };

    // Define table columns
    const columns = [
        { title: "Year", dataIndex: "year", key: "year" },
        { title: "Semester", dataIndex: "semester", key: "semester" },
        { title: "Topper", dataIndex: "topperName", key: "topperName" },
        { title: "Topper CGPA", dataIndex: "topperCgpa", key: "topperCgpa" },
        { title: "Pass %", dataIndex: "passPercentage", key: "passPercentage" },
        { title: "Avg CGPA", dataIndex: "avgCgpa", key: "avgCgpa" },
        { title: "Total Students", dataIndex: "totalStudents", key: "totalStudents" },
        { title: "Passed", dataIndex: "passedStudents", key: "passedStudents" },
        { title: "Failed", dataIndex: "failedStudents", key: "failedStudents" },
        {
            title: "Topper Image",
            dataIndex: "topperImage",
            key: "topperImage",
            render: (topperImage) =>
                topperImage ? (
                    <img src={topperImage} alt="Topper" style={{ width: 50, height: 50, borderRadius: "50%" }} />
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

            <Modal
                title="Add New Result"
                open={isModalOpen}
                onOk={handleAddResult}
                onCancel={() => setIsModalOpen(false)}
                okButtonProps={{ disabled: !isImgUploaded }}
            >
                <Input placeholder="Topper Name" value={newResult.topperName} onChange={(e) => setNewResult({ ...newResult, topperName: e.target.value })} className="mb-2" />
                <Input type="number" placeholder="Topper CGPA" value={newResult.topperCgpa} onChange={(e) => setNewResult({ ...newResult, topperCgpa: Number(e.target.value) })} className="mb-2" />
                
                <Select value={newResult.year} onChange={(value) => setNewResult({ ...newResult, year: value })} className="w-full mb-2">
                    <Option value="FE">FE</Option>
                    <Option value="SE">SE</Option>
                    <Option value="TE">TE</Option>
                    <Option value="BE">BE</Option>
                </Select>

                <Input type="number" placeholder="Semester" value={newResult.semester} onChange={(e) => setNewResult({ ...newResult, semester: Number(e.target.value) })} className="mb-2" />
                <Input type="number" placeholder="Pass Percentage" value={newResult.passPercentage} onChange={(e) => setNewResult({ ...newResult, passPercentage: Number(e.target.value) })} className="mb-2" />
                <Input type="number" placeholder="Avg CGPA" value={newResult.avgCgpa} onChange={(e) => setNewResult({ ...newResult, avgCgpa: Number(e.target.value) })} className="mb-2" />
                <Input type="number" placeholder="Total Students" value={newResult.totalStudents} onChange={(e) => setNewResult({ ...newResult, totalStudents: Number(e.target.value) })} className="mb-2" />
                <Input type="number" placeholder="Passed Students" value={newResult.passedStudents} onChange={(e) => setNewResult({ ...newResult, passedStudents: Number(e.target.value) })} className="mb-2" />
                <Input type="number" placeholder="Failed Students" value={newResult.failedStudents} onChange={(e) => setNewResult({ ...newResult, failedStudents: Number(e.target.value) })} className="mb-2" />

                <Upload customRequest={handleImageUpload} showUploadList={false}>
                    <Button icon={<UploadOutlined />}>Upload Topper Image</Button>
                </Upload>
            </Modal>
        </div>
    );
};

export default Results;

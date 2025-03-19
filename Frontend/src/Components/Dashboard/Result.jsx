import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Select, Input, Card, Row, Col } from "antd";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import "jspdf-autotable";

const { Option } = Select;

const Result = () => {
  const [results, setResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [year, setYear] = useState("");
  const [semester, setSemester] = useState("");
  const [search, setSearch] = useState("");
  const [toppers, setToppers] = useState({});
  const [overallPassPercentage, setOverallPassPercentage] = useState(0);

  useEffect(() => {
    axios.get("/api/results").then((res) => {
      setResults(res.data);
      setFilteredResults(res.data);
      calculateToppers(res.data);
      calculateOverallPassPercentage(res.data);
    });
  }, []);

  const handleFilter = () => {
    let filtered = results;
    if (year) {
      filtered = filtered.filter((res) => res.year === year);
    }
    if (semester) {
      filtered = filtered.filter((res) => res.semester === semester);
    }
    if (search) {
      filtered = filtered.filter((res) =>
        res.studentName.toLowerCase().includes(search.toLowerCase())
      );
    }
    setFilteredResults(filtered);
  };

  const calculateToppers = (data) => {
    const topperByYear = {};
    ["FE", "SE", "TE", "BE"].forEach((year) => {
      const students = data.filter((res) => res.year === year);
      if (students.length > 0) {
        topperByYear[year] = students.reduce((max, student) =>
          student.percentage > max.percentage ? student : max
        );
      }
    });
    setToppers(topperByYear);
  };

  const calculateOverallPassPercentage = (data) => {
    const passedStudents = data.filter((res) => res.percentage >= 40).length;
    const totalStudents = data.length;
    setOverallPassPercentage(((passedStudents / totalStudents) * 100).toFixed(2));
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Result Analysis Report", 10, 10);
    doc.autoTable({
      head: [["Student Name", "Year", "Semester", "Percentage"]],
      body: filteredResults.map((res) => [
        res.studentName,
        res.year,
        res.semester,
        res.percentage,
      ]),
    });
    doc.save("result_analysis.pdf");
  };

  const columns = [
    { title: "Student Name", dataIndex: "studentName", key: "studentName" },
    { title: "Year", dataIndex: "year", key: "year" },
    { title: "Semester", dataIndex: "semester", key: "semester" },
    { title: "Percentage", dataIndex: "percentage", key: "percentage" },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Result Analysis Dashboard</h1>
      <div className="flex space-x-4 mb-4">
        <Select placeholder="Select Year" className="w-40" onChange={setYear} allowClear>
          <Option value="FE">FE</Option>
          <Option value="SE">SE</Option>
          <Option value="TE">TE</Option>
          <Option value="BE">BE</Option>
        </Select>
        <Select placeholder="Select Semester" className="w-40" onChange={setSemester} allowClear>
          {[...Array(8)].map((_, i) => (
            <Option key={i + 1} value={`Sem-${i + 1}`}>{`Sem-${i + 1}`}</Option>
          ))}
        </Select>
        <Input placeholder="Search by Student Name" className="w-60" onChange={(e) => setSearch(e.target.value)} />
        <Button type="primary" onClick={handleFilter}>Filter</Button>
        <Button type="default" onClick={exportToPDF}>Export PDF</Button>
      </div>

      <Row gutter={[16, 16]} className="mb-6">
        {Object.entries(toppers).map(([year, topper]) => (
          <Col key={year} span={6}>
            <Card title={`${year} Topper`} bordered={false} className="shadow-md">
              <img src={topper.image} alt={topper.studentName} className="w-20 h-20 rounded-full mx-auto mb-2" />
              <p className="text-center font-semibold">{topper.studentName}</p>
              <p className="text-center text-gray-500">{topper.percentage}%</p>
            </Card>
          </Col>
        ))}
      </Row>

      <Card title="Overall Passing Percentage" className="shadow-md text-center mb-6">
        <h2 className="text-3xl font-bold text-blue-600">{overallPassPercentage}%</h2>
      </Card>

      <Table columns={columns} dataSource={filteredResults} rowKey="id" />
    </div>
  );
};

export default Result;

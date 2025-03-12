import { motion } from "framer-motion";
import { Accordion, AccordionItem } from "../Components/ui/accordion";
import { Button } from "../Components/index";
import { useState } from "react";
import { FaTrophy, FaBook, FaChalkboardTeacher, FaDownload, FaUserGraduate, FaLaptopCode, FaCalendarAlt } from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const toppers = {
  FE: [
    { name: "Alice Johnson", image: "/images/alice.jpg", percentage: "92%" },
    { name: "Bob Smith", image: "/images/bob.jpg", percentage: "91%" },
  ],
  SE: [
    { name: "Charlie Brown", image: "/images/charlie.jpg", percentage: "93%" },
    { name: "David Lee", image: "/images/david.jpg", percentage: "90%" },
  ],
  TE: [
    { name: "Eva Green", image: "/images/eva.jpg", percentage: "95%" },
    { name: "Frank White", image: "/images/frank.jpg", percentage: "94%" },
  ],
  BE: [
    { name: "Grace Hall", image: "/images/grace.jpg", percentage: "96%" },
    { name: "Henry Ford", image: "/images/henry.jpg", percentage: "95%" },
  ],
};

const syllabus = {
  FE: "https://muquestionpapers.com/syllabus/fe",
  SE: "https://muquestionpapers.com/syllabus/se",
  TE: "https://muquestionpapers.com/syllabus/te",
  BE: "https://muquestionpapers.com/syllabus/be",
};

const subjects = {
  FE: ["Mathematics-I", "Physics", "Programming Fundamentals", "Engineering Mechanics"],
  SE: ["Data Structures", "Computer Networks", "Object-Oriented Programming", "Database Systems"],
  TE: ["Machine Learning", "Cloud Computing", "Operating Systems", "Software Engineering"],
  BE: ["Deep Learning", "Blockchain Technology", "Cyber Security", "AI Ethics"],
};

const faculty = [
  { name: "Dr. John Doe", designation: "Professor & HOD", specialization: "Artificial Intelligence" },
  { name: "Ms. Jane Smith", designation: "Assistant Professor", specialization: "Machine Learning" },
  { name: "Dr. Robert Brown", designation: "Associate Professor", specialization: "Cyber Security" },
];

const Academics = () => {
  const [selectedYear, setSelectedYear] = useState("FE");

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <motion.h1
        className="text-center text-4xl font-bold mb-8 text-gray-800"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Academics - <span className="text-blue-500">AIML</span>
      </motion.h1>

      {/* Topper Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4 flex items-center">
          <FaTrophy className="text-yellow-500 mr-2" /> Toppers
        </h2>
        <div className="flex space-x-4 mb-4">
          {Object.keys(toppers).map((year) => (
            <Button
              key={year}
              className={`px-4 py-2 rounded ${selectedYear === year ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"}`}
              onClick={() => setSelectedYear(year)}
            >
              {year}
            </Button>
          ))}
        </div>
        <Slider {...sliderSettings}>
          {toppers[selectedYear].map((topper, index) => (
            <div key={index} className="text-center">
              <img src={topper.image} alt={topper.name} className="mx-auto w-40 h-40 rounded-full shadow-md" />
              <h3 className="mt-2 text-lg font-semibold text-gray-800">{topper.name}</h3>
              <p className="text-gray-600">{topper.percentage}</p>
            </div>
          ))}
        </Slider>
      </div>

      {/* Subjects and Downloads */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4 flex items-center">
          <FaBook className="text-green-500 mr-2" /> Subjects & Downloads
        </h2>
        <ul className="list-disc pl-6 text-gray-700 mb-4">
          {subjects[selectedYear].map((subject, index) => (
            <li key={index}>{subject}</li>
          ))}
        </ul>
        <Button as="a" href={syllabus[selectedYear]} target="_blank" rel="noopener noreferrer" className="bg-blue-500 text-white px-4 py-2 rounded flex items-center">
          <FaDownload className="mr-2" /> Download Syllabus PDF
        </Button>
      </div>

      {/* Faculty Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4 flex items-center">
          <FaChalkboardTeacher className="text-red-500 mr-2" /> Faculty
        </h2>
        <ul className="list-disc pl-6 text-gray-700">
          {faculty.map((member, index) => (
            <li key={index}>{member.name} - {member.designation} ({member.specialization})</li>
          ))}
        </ul>
      </div>

      {/* Student Activities */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4 flex items-center">
          <FaUserGraduate className="text-purple-500 mr-2" /> Student Activities & Research
        </h2>
        <p>Our department encourages student participation in AI projects, hackathons, and research conferences.</p>
      </div>

      {/* Events */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4 flex items-center">
          <FaCalendarAlt className="text-orange-500 mr-2" /> Upcoming Events
        </h2>
        <p>Stay updated with departmental seminars, workshops, and guest lectures.</p>
      </div>
    </div>
  );
};

export default Academics;
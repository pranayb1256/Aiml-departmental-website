import { motion } from "framer-motion";
import { Accordion, AccordionItem } from "../Components/ui/accordion";
import { Button } from "../Components/index";
import { useState } from "react";
import { FaTrophy, FaBook, FaChalkboardTeacher, FaDownload, FaUserGraduate, FaLaptopCode, FaCalendarAlt, FaAward, FaBriefcase, FaClipboardList } from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const data = {
  toppers: {
    FE: [{ name: "Alice Johnson", image: "/images/alice.jpg", percentage: "92%" }],
    SE: [{ name: "Charlie Brown", image: "/images/charlie.jpg", percentage: "93%" }],
    TE: [{ name: "Eva Green", image: "/images/eva.jpg", percentage: "95%" }],
    BE: [{ name: "Grace Hall", image: "/images/grace.jpg", percentage: "96%" }],
  },
  syllabus: {
    FE: "/syllabus/fe.pdf",
    SE: "/syllabus/se.pdf",
    TE: "/syllabus/te.pdf",
    BE: "/syllabus/be.pdf",
  },
  subjects: {
    FE: ["Mathematics-I", "Physics", "Programming Fundamentals"],
    SE: ["Data Structures", "Computer Networks"],
    TE: ["Machine Learning", "Cloud Computing"],
    BE: ["Deep Learning", "Cyber Security"],
  },
  faculty: [
    { name: "Dr. John Doe", designation: "Professor & HOD", specialization: "Artificial Intelligence" },
    { name: "Ms. Jane Smith", designation: "Assistant Professor", specialization: "Machine Learning" },
  ],
  exams: [
    { subject: "Machine Learning", date: "April 20, 2025", time: "10:00 AM" },
    { subject: "Cyber Security", date: "April 25, 2025", time: "2:00 PM" },
  ],
  achievements: [
    { name: "Alice Johnson", award: "Winner - AI Hackathon 2024", image: "/images/alice.jpg" },
  ],
  resources: [
    { title: "Data Structures Notes", link: "/notes/dsa.pdf" },
    { title: "ML Question Paper", link: "/papers/ml.pdf" },
  ],
  testimonials: [
    { name: "John Doe", batch: "2023", review: "Great faculty and learning environment!" },
  ],
  placements: [
    { company: "Google", role: "Software Engineer", student: "Alice Johnson", batch: "2024" },
  ],
  faqs: [
    { question: "How to apply for an internship?", answer: "Contact faculty coordinators." },
  ],
  projects: [
    { title: "AI Chatbot", desc: "Mental health chatbot", github: "https://github.com/user/chatbot" },
  ],
};

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
};

const Academics = () => {
  const [selectedYear, setSelectedYear] = useState("FE");

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

      {/* Year Selector */}
      <div className="flex justify-center space-x-4 mb-8">
        {Object.keys(data.toppers).map((year) => (
          <Button
            key={year}
            className={`px-4 py-2 rounded ${selectedYear === year ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"}`}
            onClick={() => setSelectedYear(year)}
          >
            {year}
          </Button>
        ))}
      </div>

      {/* Toppers */}
     {/* Toppers */}
        <Section title="Toppers" icon={<FaTrophy className="text-yellow-500" />}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.toppers[selectedYear].map((topper, index) => (
              <div key={index} className="text-center p-4 bg-white shadow-md rounded-lg">
                <img src={topper.image} alt={topper.name} className="mx-auto w-32 h-32 rounded-full shadow-md" />
                <h3 className="mt-2 text-lg font-semibold">{topper.name}</h3>
                <p className="text-gray-600">{topper.percentage}</p>
              </div>
            ))}
          </div>
</Section>


      {/* Exam Schedule */}
      <Section title="Exam Schedule" icon={<FaCalendarAlt className="text-blue-500" />}>
        <ul className="list-disc pl-6 text-gray-700">
          {data.exams.map((exam, index) => (
            <li key={index}>
              <strong>{exam.subject}</strong> - {exam.date} ({exam.time})
            </li>
          ))}
        </ul>
      </Section>

      {/* Study Resources */}
      <Section title="Study Resources" icon={<FaBook className="text-green-500" />}>
        <ul className="list-disc pl-6 text-gray-700">
          {data.resources.map((res, index) => (
            <li key={index}>
              <a href={res.link} className="text-blue-500 hover:underline" download>
                {res.title}
              </a>
            </li>
          ))}
        </ul>
      </Section>

      {/* Student Testimonials */}
      <Section title="Student Testimonials" icon={<FaUserGraduate className="text-purple-500" />}>
        <Slider {...sliderSettings}>
          {data.testimonials.map((test, index) => (
            <div key={index} className="text-center">
              <p className="italic text-gray-700">"{test.review}"</p>
              <h3 className="mt-2 text-lg font-semibold">{test.name} - {test.batch}</h3>
            </div>
          ))}
        </Slider>
      </Section>

      {/* Research & Projects */}
      <Section title="Research & Projects" icon={<FaLaptopCode className="text-orange-500" />}>
        <ul className="list-disc pl-6 text-gray-700">
          {data.projects.map((proj, index) => (
            <li key={index}>
              <strong>{proj.title}</strong> - {proj.desc} (<a href={proj.github} className="text-blue-500 hover:underline">GitHub</a>)
            </li>
          ))}
        </ul>
      </Section>
    </div>
  );
};

const Section = ({ title, icon, children }) => (
  <div className="mb-8">
    <h2 className="text-2xl font-semibold flex items-center text-gray-700 mb-4">
      {icon} <span className="ml-2">{title}</span>
    </h2>
    {children}
  </div>
);

export default Academics;

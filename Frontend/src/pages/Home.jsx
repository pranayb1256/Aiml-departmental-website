import { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import "swiper/css";
import "swiper/css/pagination";
import { motion } from "framer-motion";
import {
  BrandSlider,
  ImageGallery,
  ImageCarousel,
  Notice,
  Announce,
  AlumniSection,
  PlacedStudents,
} from "../Components/index";

function Home() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  // Student Statistics Data
  const [stats, setStats] = useState({
    "Total Students": 0,
    "First Year": 0,
    "Second Year": 0,
    "Third Year": 0,
    "Fourth Year": 0,
  });

  useEffect(() => {
    const studentData = {
      "First Year": 120,
      "Second Year": 150,
      "Third Year": 120,
      "Fourth Year": 120,
    };
    studentData["Total Students"] = Object.values(studentData).reduce((a, b) => a + b, 0);

    setTimeout(() => {
      setStats(studentData);
    }, 1000);
  }, []);

  const statsRef = useRef(null);
  const isStatsInView = useInView(statsRef, { amount: 0.3, once: true });

  function animateCounter(id, start, end, duration) {
    const element = document.getElementById(id);
    if (!element) return;

    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      element.textContent = Math.floor(progress * (end - start) + start);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }

  useEffect(() => {
    if (isStatsInView) {
      Object.entries(stats).forEach(([title, number], index) => {
        animateCounter(`stat-${index}`, 0, number, 2000);
      });
    }
  }, [isStatsInView, stats]);

  return (
    <div className="bg-white font-sans text-black">
      {/* Hero Section */}
      <div className="relative bg-white text-black py-28 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-700 opacity-10 blur-3xl"></div>
        <motion.div
          className="max-w-4xl mx-auto relative z-10"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <motion.h1
            className="text-5xl md:text-7xl font-extrabold leading-tight tracking-wide"
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          >
            Welcome to the <span className="text-blue-600">AI & ML Department</span>
          </motion.h1>
          <motion.p
            className="mt-6 text-lg md:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
          >
            Pioneering <strong>education</strong> and <strong>research</strong> in
            <span className="text-blue-600 font-semibold"> Artificial Intelligence </span>
            and
            <span className="text-blue-600 font-semibold"> Machine Learning </span>
            at Lokmanya Tilak College of Engineering.
          </motion.p>
        </motion.div>
      </div>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2
            className="text-4xl font-extrabold text-center text-gray-800 mb-12"
            data-aos="fade-up"
          >
            About the Department
          </h2>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
            {/* Text */}
            <div
              className="text-gray-700 text-lg space-y-6"
              data-aos="fade-right"
            >
              <p className="leading-relaxed">
                The{" "}
                <strong>
                  Department of Computer Science & Engineering (Artificial
                  Intelligence & Machine Learning)
                </strong>{" "}
                was established in the academic year <strong>2020-21</strong>{" "}
                with an intake of <strong>60 students</strong>. The department
                is committed to excellence in teaching and research, equipping
                students with cutting-edge skills in AI and ML.
              </p>
              <p className="leading-relaxed">
                Our department boasts{" "}
                <strong>highly qualified and experienced faculty</strong>{" "}
                dedicated to providing an engaging and industry-relevant
                curriculum. With state-of-the-art laboratories, modern
                infrastructure, and hands-on learning opportunities, we aim to
                nurture future AI & ML leaders.
              </p>
            </div>

            {/* Image */}
            <div className="relative group">
              <img
                src="/dept_photo/new.jpg"
                alt="AI & ML Department"
                className="rounded-2xl shadow-xl w-full transform group-hover:scale-105 transition duration-500 ease-in-out"
                data-aos="fade-left"
              />
              <div className="absolute bottom-4 left-4 bg-blue-600 text-white px-5 py-2 text-sm rounded-lg shadow-md">
                🎓 Established in 2020
              </div>
            </div>
          </div>

          {/* Section 2: Academic Programs (Image Left, Text Right) */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
            {/* Image */}
            <div className="relative group">
              <img
                src="/dept_photo/new.jpg"
                alt="AI & ML Department"
                className="rounded-2xl shadow-xl w-full transform group-hover:scale-105 transition duration-500 ease-in-out"
                data-aos="fade-right"
              />
            </div>

            {/* Text */}
            <div
              className="text-gray-700 text-lg space-y-6"
              data-aos="fade-left"
            >
              <p className="leading-relaxed">
                The{" "}
                <strong>
                  B.E. program in Computer Science & Engineering (AI & ML)
                </strong>{" "}
                offers a balanced curriculum integrating{" "}
                <strong>computer science fundamentals</strong> with cutting-edge
                AI and ML technologies.
              </p>
              <p className="leading-relaxed">
                Our courses cover a broad spectrum of topics, including:
              </p>
              <ul className="grid grid-cols-2 gap-4 text-gray-900">
                {[
                  "Machine Learning 🤖",
                  "Deep Learning 🧠",
                  "Big Data Analytics 📊",
                  "Natural Language Processing 🗣️",
                  "Computer Vision 📷",
                  "Robotics 🤖",
                  "Statistics & Probability 📈",
                  "Reinforcement Learning 🎯",
                  "Fuzzy Logic & AI Systems 🧩",
                  "Genetic Algorithms 🧬",
                ].map((tech, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <span className="text-blue-600 text-lg">✔</span>
                    <span>{tech}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <motion.div
        className="bg-white flex justify-center px-4 py-4"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: isStatsInView ? 1.1 : 0.8, opacity: isStatsInView ? 1 : 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.video autoPlay muted loop className="rounded-lg shadow-lg w-3/4">
          <source src="/videos/intro.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </motion.video>
      </motion.div>

      {/* Other Sections */}
      <PlacedStudents />

    
      <div className="p-6 sm:p-12">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Notices & <span className="text-blue-500">Announcements</span>
        </h1>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/2"><Notice /></div>
          <div className="w-full md:w-1/2"><Announce /></div>
        </div>
      </div>

      {/* Statistics Section */}
      <section ref={statsRef} className="py-10 bg-white text-center">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Student <span className="text-blue-500">Statistics</span>
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 max-w-5xl mx-auto">
          {Object.entries(stats).map(([title, number], index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold">{title}</h2>
              <p id={`stat-${index}`} className="text-2xl font-bold text-blue-600">0</p>
            </div>
          ))}
        </div>
      </section>

      <BrandSlider />
      <AlumniSection />
      <ImageCarousel />
      <ImageGallery />
    </div>
  );
}

export default Home;
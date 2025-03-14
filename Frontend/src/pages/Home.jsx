import { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import "swiper/css";
import "swiper/css/pagination";
import {BrandSlider,ImageGallery,ImageCarousel,Notice,Announce} from "../Components/index";
import { motion } from 'framer-motion';
import { FaLinkedin, FaTwitter, FaGithub } from "react-icons/fa";

function Home() {
useEffect(() => {
AOS.init({ duration: 1000 });
}, []);
const alumniData = [
  {
    name: "John Doe",
    batch: "Batch of 2020",
    bio: "Software Engineer at Google.",
    image: "https://via.placeholder.com/150",
    linkedin: "#",
    twitter: "#",
    github: "#",
  },
  {
    name: "Jane Smith",
    batch: "Batch of 2019",
    bio: "AI Researcher at OpenAI.",
    image: "https://via.placeholder.com/150",
    linkedin: "#",
    twitter: "#",
    github: "#",
  },
  {
    name: "Michael Lee",
    batch: "Batch of 2018",
    bio: "Product Manager at Microsoft.",
    image: "https://via.placeholder.com/150",
    linkedin: "#",
    twitter: "#",
    github: "#",
  },
];
const [stats, setStats] = useState({
"Total Students": 0,
"First Year": 0,
"Second Year": 0,
"Third Year": 0,
"Fourth Year": 0,
});

useEffect(() => {
const studentData = {
"First Year": 100,
"Second Year": 160,
"Third Year": 140,
"Fourth Year": 60,
};
studentData["Total Students"] = Object.values(studentData).reduce((a, b) => a + b, 0);
setTimeout(() => {
setStats(studentData);
}, 1000);
}, []);

useEffect(() => {
Object.entries(stats).forEach(([title, number], index) => {
animateCounter(`stat-${index}`, 0, number, 2000);
});
}, [stats]);

function animateCounter(id, start, end, duration) {
const element = document.getElementById(id);
if (!element) return;

let startTimestamp = null;
const step = (timestamp) => {
if (!startTimestamp) startTimestamp = timestamp;
const progress = Math.min((timestamp - startTimestamp) / duration, 1);
element.textContent = Math.floor(progress * (end - start) + start);
if (progress
< 1) { window.requestAnimationFrame(step); } }; window.requestAnimationFrame(step); } const ref=useRef(null); const isInView=useInView(ref, { amount: 0.5, once: false }); return ( <div className="bg-white font-sans text-black">
    <div className="relative bg-white text-black py-28 px-6 text-center overflow-hidden">
      {/* Background Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-700 opacity-10 blur-3xl"></div>
      <motion.div
        className="max-w-4xl mx-auto relative z-10"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        {/* Heading */}
        <motion.h1
          className="text-5xl md:text-7xl font-extrabold leading-tight tracking-wide"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
        >
          Welcome to the <span className="text-blue-600">AI & ML Department</span>
        </motion.h1>

        {/* Subtext */}
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

      {/* Floating Dots Decoration */}
      <motion.div
        className="absolute top-10 left-10 w-32 h-32 bg-blue-400 rounded-full opacity-20 blur-3xl"
        initial={{ scale: 0 }}
        animate={{ scale: 1.2 }}
        transition={{ duration: 2, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
      />
      <motion.div
        className="absolute bottom-10 right-10 w-24 h-24 bg-indigo-400 rounded-full opacity-20 blur-3xl"
        initial={{ scale: 0 }}
        animate={{ scale: 1.2 }}
        transition={{ duration: 2.5, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
      />
    </div>

  <section id="about" className="py-20 bg-white">
  <div className="max-w-6xl mx-auto px-6">
    <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-12" data-aos="fade-up">
      About the Department
    </h2>

    <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
      {/* Text */}
      <div className="text-gray-700 text-lg space-y-6" data-aos="fade-right">
        <p className="leading-relaxed">
          The <strong>Department of Computer Science & Engineering (Artificial Intelligence & Machine Learning)</strong> was established in the academic year <strong>2020-21</strong> with an intake of <strong>60 students</strong>.  
          The department is committed to excellence in teaching and research, equipping students with cutting-edge skills in AI and ML.
        </p>
        <p className="leading-relaxed">
          Our department boasts <strong>highly qualified and experienced faculty</strong> dedicated to providing an engaging and industry-relevant curriculum. With state-of-the-art laboratories, modern infrastructure, and hands-on learning opportunities, we aim to nurture future AI & ML leaders.
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
          src="/images/new.jpg" 
          alt="AI & ML Department" 
          className="rounded-2xl shadow-xl w-full transform group-hover:scale-105 transition duration-500 ease-in-out"
          data-aos="fade-right"
        />
      </div>

      {/* Text */}
      <div className="text-gray-700 text-lg space-y-6" data-aos="fade-left">
        <p className="leading-relaxed">
          The <strong>B.E. program in Computer Science & Engineering (AI & ML)</strong> offers a balanced curriculum integrating <strong>computer science fundamentals</strong> with cutting-edge AI and ML technologies.
        </p>
        <p className="leading-relaxed">
          Our courses cover a broad spectrum of topics, including:
        </p>
        <ul className="grid grid-cols-2 gap-4 text-gray-900">
          {["Machine Learning 🤖", "Deep Learning 🧠", "Big Data Analytics 📊", "Natural Language Processing 🗣️", "Computer Vision 📷", "Robotics 🤖", "Statistics & Probability 📈", "Reinforcement Learning 🎯", "Fuzzy Logic & AI Systems 🧩", "Genetic Algorithms 🧬"].map((tech, index) => (
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

  <motion.div ref={ref} className="bg-white flex justify-center px-4 py-4" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: isInView ? 1.1 : 0.8, opacity: isInView ? 1 : 0 }} transition={{ duration: 0.8, ease: "easeOut" }}>
      <motion.video autoPlay muted loop className="rounded-lg shadow-lg w-3/4" initial={{ scale: 0.9 }} animate={{ scale: isInView ? 1 : 0.9 }} transition={{ duration: 0.6, ease: "easeOut" }}>
      <source src="/videos/intro.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </motion.video>
  </motion.div>
  <div className="p-6 sm:p-12">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Notices & <span className="text-blue-500">Announcements</span>
      </h1>

      {/* Flexbox Layout for Side-by-Side Display */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left: Notices Section */}
        <div className="w-full md:w-1/2">
          <Notice />
        </div>

        {/* Right: Announcements Section */}
        <div className="w-full md:w-1/2">
          <Announce />
        </div>
      </div>
    </div>

  <BrandSlider />

  <section className="py-10 bg-white text-center">
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

  <div className="px-4 md:px-8 lg:px-16">
        <ImageCarousel />
      </div>

   <section className="bg-white py-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-extrabold text-gray-700 mb-4">
            Alumni <span className="text-blue-600">Corner</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-12">
            Meet our accomplished alumni who continue to excel in various fields.
          </p>
  
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            {alumniData.map((alumnus, index) => (
              <div
                key={index}
                className="bg-white border border-blue-200 rounded-3xl shadow-md hover:shadow-lg transition duration-300 p-6 text-center"
              >
                <img
                  src={alumnus.image}
                  alt={alumnus.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-blue-600 shadow-md"
                />
                <h3 className="text-xl font-semibold text-blue-800">{alumnus.name}</h3>
                <p className="text-sm text-gray-500">{alumnus.batch}</p>
                <p className="mt-3 text-gray-700">{alumnus.bio}</p>
                <div className="flex justify-center space-x-5 mt-4">
                  <a href={alumnus.linkedin} className="text-blue-600 hover:text-blue-800 transition">
                    <FaLinkedin size={22} />
                  </a>
                  <a href={alumnus.twitter} className="text-blue-400 hover:text-blue-600 transition">
                    <FaTwitter size={22} />
                  </a>
                  <a href={alumnus.github} className="text-gray-700 hover:text-gray-900 transition">
                    <FaGithub size={22} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <div className="px-4 md:px-8 lg:px-16">
        <ImageGallery />
      </div>
  </div>
  );
  }

  export default Home;
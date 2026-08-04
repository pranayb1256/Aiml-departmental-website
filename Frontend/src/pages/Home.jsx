import { useEffect, useState, useRef } from "react";
import { useInView, motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import "swiper/css";
import "swiper/css/pagination";
import {
  BrandSlider,
  ImageGallery,
  ImageCarousel,
  Notice,
  Announce,
  AlumniSection,
  PlacedStudents,
  Achivements,
} from "../Components/index";
import EventCountdown from "../Components/Events/EventCountdown";

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
    <div className="bg-slate-50 text-slate-900 min-h-screen font-sans selection:bg-blue-500/20 selection:text-blue-900">
      {/* Hero Section */}
      <div className="relative pt-32 pb-20 px-6 text-center overflow-hidden flex flex-col items-center justify-center min-h-[90vh]">
        {/* Animated Background Gradients */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400/20 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-400/20 rounded-full blur-[100px] pointer-events-none" />
        
        <motion.div
          className="max-w-5xl mx-auto relative z-10"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 text-blue-600 text-sm font-semibold mb-8 shadow-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
            </span>
            Pioneering the Future of Technology
          </motion.div>

          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-extrabold leading-tight tracking-tight text-slate-900"
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          >
            AI & ML <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Department</span>
          </motion.h1>
          <motion.p
            className="mt-8 text-lg md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-light"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          >
            Empowering students with cutting-edge education and research in 
            <span className="text-slate-900 font-medium"> Artificial Intelligence </span> 
            and 
            <span className="text-slate-900 font-medium"> Machine Learning </span> 
            at Lokmanya Tilak College of Engineering.
          </motion.p>
        </motion.div>
      </div>

      {/* Event Countdown */}
      <div className="relative z-20 -mt-10 mb-20 px-4">
        <EventCountdown 
          eventName="AIML National Hackathon 2026" 
          targetDate="2026-11-15T09:00:00" 
        />
      </div>

      {/* About Section */}
      <section id="about" className="py-24 relative bg-white border-y border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6">
          <h2
            className="text-4xl md:text-5xl font-extrabold text-center text-slate-900 mb-16 tracking-tight"
            data-aos="fade-up"
          >
            About the <span className="text-blue-600">Department</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
            {/* Text */}
            <div
              className="text-slate-600 text-lg space-y-6 font-light leading-relaxed"
              data-aos="fade-right"
            >
              <p>
                The <strong className="text-slate-900 font-medium">Department of Computer Science & Engineering (Artificial Intelligence & Machine Learning)</strong> was established in the academic year <strong className="text-blue-600 font-medium">2020-21</strong> with an intake of 60 students. We are committed to excellence in teaching and research, equipping students with cutting-edge skills in the rapidly evolving AI landscape.
              </p>
              <p>
                Our department boasts highly qualified faculty and state-of-the-art infrastructure. With modern laboratories and hands-on learning opportunities, we nurture future technology leaders capable of solving complex real-world problems using machine intelligence.
              </p>
            </div>

            {/* Image */}
            <div className="relative group" data-aos="fade-left">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative rounded-2xl overflow-hidden bg-white shadow-xl">
                <img
                  src="/dept_photo/new.jpg"
                  alt="AI & ML Department"
                  className="w-full transform group-hover:scale-105 transition duration-700 ease-in-out opacity-95 group-hover:opacity-100"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                  <div className="inline-flex items-center gap-2 bg-white/95 backdrop-blur-sm text-blue-700 px-4 py-2 text-sm rounded-lg font-semibold shadow-lg">
                    🎓 Established 2020
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Academic Programs */}
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Image */}
            <div className="relative group order-2 md:order-1" data-aos="fade-right">
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative rounded-2xl overflow-hidden bg-white shadow-xl">
                <img
                  src="/dept_photo/new.jpg"
                  alt="Academics"
                  className="w-full transform group-hover:scale-105 transition duration-700 ease-in-out opacity-95 group-hover:opacity-100"
                />
              </div>
            </div>

            {/* Text */}
            <div
              className="text-slate-600 text-lg space-y-8 order-1 md:order-2"
              data-aos="fade-left"
            >
              <div className="space-y-4">
                <h3 className="text-3xl font-bold text-slate-900 tracking-tight">Core Curriculum</h3>
                <p className="font-light leading-relaxed">
                  The B.E. program integrates <strong className="text-slate-900 font-medium">computer science fundamentals</strong> with advanced AI architectures. Our comprehensive curriculum covers a broad spectrum of cutting-edge technologies:
                </p>
              </div>
              <ul className="grid grid-cols-2 gap-4">
                {[
                  "Machine Learning",
                  "Deep Learning",
                  "Big Data Analytics",
                  "NLP Systems",
                  "Computer Vision",
                  "Robotics",
                  "Probability Theory",
                  "Reinforcement Learning",
                ].map((tech, index) => (
                  <li key={index} className="flex items-center space-x-3 bg-slate-50 border border-gray-100 rounded-lg px-4 py-3 hover:bg-white hover:shadow-sm hover:border-blue-200 transition-all group">
                    <span className="w-2 h-2 rounded-full bg-blue-500 group-hover:shadow-[0_0_8px_rgba(59,130,246,0.6)] transition-shadow"></span>
                    <span className="text-sm font-medium text-slate-700 group-hover:text-blue-700">{tech}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <motion.div
        className="py-16 flex justify-center px-6 relative bg-slate-50"
        initial={{ scale: 0.9, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-50/50 to-transparent pointer-events-none"></div>
        <div className="relative w-full max-w-5xl rounded-2xl overflow-hidden bg-white shadow-2xl border border-gray-100">
          <video autoPlay muted loop className="w-full h-auto">
            <source src="/videos/intro.mp4" type="video/mp4" />
          </video>
        </div>
      </motion.div>

      {/* Other Sections */}
      <div className="py-12 bg-white">
        <PlacedStudents />
      </div>
    
      {/* Notices & Announcements */}
      <div className="py-20 px-6 sm:px-12 max-w-7xl mx-auto">
        <h2 className="text-4xl font-extrabold text-center text-slate-900 mb-16 tracking-tight">
          Notices & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Announcements</span>
        </h2>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-1/2 rounded-2xl bg-white shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
            <Notice />
          </div>
          <div className="w-full lg:w-1/2 rounded-2xl bg-white shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
            <Announce />
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <section ref={statsRef} className="py-24 relative overflow-hidden bg-white border-y border-gray-100">
        <div className="absolute inset-0 bg-blue-50/50"></div>
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <h2 className="text-4xl font-extrabold text-center text-slate-900 mb-16 tracking-tight">
            Department <span className="text-blue-600">Statistics</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {Object.entries(stats).map(([title, number], index) => (
              <div key={index} className="bg-white border border-gray-100 shadow-sm p-6 rounded-2xl text-center hover:shadow-lg transition-all hover:-translate-y-1 group">
                <p id={`stat-${index}`} className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-blue-600 to-indigo-600 mb-3 drop-shadow-sm">
                  0
                </p>
                <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-widest">{title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="space-y-24 py-12 bg-slate-50">
        <BrandSlider />
        <AlumniSection />
        <ImageCarousel />
        <Achivements/>
        <ImageGallery />
      </div>
    </div>
  );
}

export default Home;
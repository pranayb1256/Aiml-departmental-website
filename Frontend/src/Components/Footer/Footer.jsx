import {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
  FaYoutube,
  FaUser,
} from "react-icons/fa";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="relative bg-[#050816] border-t border-white/10 text-gray-300 py-16 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-blue-600/10 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          
          {/* Brand & Socials */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <img
              src="https://res.cloudinary.com/dzydycrjo/image/upload/v1745004394/cvnwsfj2a6bwqvupvky8.jpg"
              className="h-10 md:h-12 w-auto object-contain"
              alt="LTCE Logo"
            />
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed font-light">
              Pioneering education and research in Artificial Intelligence & Machine Learning.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-blue-600 hover:border-blue-500 transition-all duration-300"><FaFacebook size={18} /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-sky-500 hover:border-sky-400 transition-all duration-300"><FaTwitter size={18} /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-blue-700 hover:border-blue-600 transition-all duration-300"><FaLinkedin size={18} /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-pink-600 hover:border-pink-500 transition-all duration-300"><FaInstagram size={18} /></a>
              <a href="https://youtube.com/@ltceofficial8789?si=MKZTp3wosa8xsEq3" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-red-600 hover:border-red-500 transition-all duration-300"><FaYoutube size={18} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3 font-light text-sm">
              <li><Link to="/" className="hover:text-blue-400 transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-blue-400 transition-colors">About Us</Link></li>
              <li><Link to="/Event" className="hover:text-blue-400 transition-colors">Events</Link></li>
              <li><Link to="/Academics" className="hover:text-blue-400 transition-colors">Academics</Link></li>
              <li><Link to="/Placements" className="hover:text-blue-400 transition-colors">Placements</Link></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="text-white font-semibold mb-6">Contact Us</h3>
            <div className="space-y-3 font-light text-sm text-gray-400">
              <p className="hover:text-white transition-colors cursor-pointer">+91-022-27541005</p>
              <p className="hover:text-white transition-colors cursor-pointer">+91-022-27541006</p>
              <a href="mailto:chaitrali.chaudhari@ltce.in" className="block hover:text-blue-400 transition-colors">chaitrali.chaudhari@ltce.in</a>
              <a href="mailto:principal.ltce@gmail.com" className="block hover:text-blue-400 transition-colors">principal.ltce@gmail.com</a>
            </div>
            
            <h3 className="text-white font-semibold mt-8 mb-4">Developed By</h3>
            <ul className="space-y-2 font-light text-sm text-gray-400">
              {["Pranay Bhoir","Hrishikesh Dongre", "Pratham Harer", "Aditya Bhosale"].map((name, index) => (
                <li key={index} className="flex items-center gap-2">
                  <FaUser className="text-blue-500" size={12} /> {name}
                </li>
              ))}
            </ul>
          </div>

          {/* Location / Map */}
          <div className="space-y-6">
            <h3 className="text-white font-semibold">Location</h3>
            <div className="w-full h-32 rounded-xl overflow-hidden border border-white/10">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.044364423099!2d73.00467317520611!3d19.10570958210503!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c0da59d0a01b%3A0x56642a54a185f894!2sLokmanya%20Tilak%20College%20of%20Engineering!5e0!3m2!1sen!2sin!4v1741023131647!5m2!1sen!2sin"
                className="w-full h-full"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <p className="text-sm font-light text-gray-400 leading-relaxed">
              C-Building, 4th Floor, Lokmanya Tilak College of Engineering, Sector 4, Vikas Nagar, Koparkhairane, Navi Mumbai, 400709
            </p>
          </div>

        </div>

        {/* Footer Bottom */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm font-light text-gray-500">
            &copy; {new Date().getFullYear()} Lokmanya Tilak College of Engineering. All rights reserved.
          </p>
          <p className="text-sm font-light text-gray-500 flex items-center gap-2">
            Under Guidance of <span className="text-blue-400 font-medium">Prof. Ashwini Pawar</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

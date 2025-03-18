import {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
  FaYoutube,
  FaUser,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8 w-full">
    {/* Footer Content */}
    <div className="flex flex-col md:flex-row justify-between items-start px-10 space-y-8 md:space-y-0 w-full">
      
      {/* Left Section: Socials & Contact */}
      <div className="flex flex-col items-center md:items-start text-left w-full md:w-1/3">
        <img src="logo.png" alt="College Logo" className="w-24 h-auto mb-4" />
        <p className="text-sm">Let's connect with our socials</p>
        <div className="flex space-x-4 mt-2">
          <a href="#" className="text-blue-400 hover:text-blue-500"><FaFacebook size={20} /></a>
          <a href="#" className="text-blue-300 hover:text-blue-400"><FaTwitter size={20} /></a>
          <a href="#" className="text-blue-600 hover:text-blue-700"><FaLinkedin size={20} /></a>
          <a href="#" className="text-pink-400 hover:text-pink-500"><FaInstagram size={20} /></a>
          <a href="https://youtube.com/@ltceofficial8789?si=MKZTp3wosa8xsEq3" className="text-red-500 hover:text-red-600"><FaYoutube size={20} /></a>
        </div>
        <div className="mt-4">
          <p className="font-semibold">Contact Us</p>
          <p>+91-022-27541005</p>
          <p>+91-022-27541006</p>
          <p>chaitrali.chaudhari@ltce.in</p>
          <p>principal.ltce@gmail.com</p>
        </div>
      </div>
  
      {/* Middle Section: Quick Links */}
      <div className="text-center md:text-left w-full md:w-1/3">
        <ul className="space-y-2">
          <li className="font-bold uppercase">Quick Links</li>
          <li>
            <a href="/" className="hover:text-gray-400">HOME</a>
          </li>
          {["ABOUT","Club","Event","Academics","Placements",].map((item, index) => (
            <li key={index}>
              <a href={`/${item.toLowerCase().replace(/\s+/g, "-")}`} className="hover:text-blue-500">{item}</a>
            </li>
          ))}
        </ul>
      </div>

  
      {/* Right Section: Team, Map & Address */}
      <div className="w-full md:w-1/3 flex flex-col items-center md:items-end text-center md:text-right space-y-6">
        <div>
          <p className="font-bold uppercase">Designed and Developed by</p>
          {["Aditya Bhosale", "Hrishikesh Dongre", "Pratham Harer", "Pranay Bhoir"].map((name, index) => (
            <p key={index} className="flex items-center justify-center md:justify-end">
              <FaUser className="mr-2" /> {name}
            </p>
          ))}
          <p className="font-bold uppercase mt-4">Under Guidance of</p>
          <p className="flex items-center justify-center md:justify-end">
            <FaUser className="mr-2" /> Prof. Ashwini Pawar
          </p>
        </div>

        {/* Map Section */}
        <div className="w-full md:w-64 h-48">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.044364423099!2d73.00467317520611!3d19.10570958210503!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c0da59d0a01b%3A0x56642a54a185f894!2sLokmanya%20Tilak%20College%20of%20Engineering!5e0!3m2!1sen!2sin!4v1741023131647!5m2!1sen!2sin"
            className="w-full h-full rounded-lg"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        {/* Address Section */}
        <div className="text-left md:text-right">
          <h3 className="font-bold uppercase text-lg">Address:</h3>
          <p className="text-sm leading-relaxed">
            C-Building, 4th Floor, Lokmanya Tilak<br />
            College of Engineering, Sector 4,<br />
            Vikas Nagar, Koparkhairane,<br />
            Navi Mumbai, Maharashtra, India, 400709
          </p>
        </div>
      </div>
    </div>
  
    {/* Footer Bottom */}
    <div className="mt-6 border-t border-gray-700 pt-4 text-center">
      <p>&copy; 2024 Lokmanya Tilak College of Engineering. All rights reserved.</p>
    </div>
  </footer>

  );
}

export default Footer;

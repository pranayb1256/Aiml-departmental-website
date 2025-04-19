import { Card, CardContent } from "../Components/ui/card";
import { motion } from "framer-motion";

export default function HodDesk() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-white p-6">
      {/* HOD Photo */}
      <motion.img
        src="https://res.cloudinary.com/dzydycrjo/image/upload/v1745039183/ys2jmhw2owz96ni48i3j.jpg"
        alt="HOD"
        className="w-48 h-48 rounded-full border-4 border-gray-300 shadow-xl hover:shadow-2xl transition-shadow duration-300"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />

      {/* HOD Information */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
      >
        <Card className="mt-6 w-full max-w-3xl text-center shadow-xl border-none bg-white rounded-2xl p-6 hover:scale-[1.02] transition-transform duration-300">
          <CardContent>
            <h2 className="text-3xl font-extrabold text-gray-900">Dr. Chaitrali Chaudhari</h2>
            <p className="text-gray-600 mt-2 font-medium">Head of AIML Department</p>
            <p className="text-gray-500 mt-2">PhD in Artificial Intelligence & Machine Learning</p>
            <p className="text-gray-500 mt-1">Specialization: Deep Learning, NLP</p>
            <p className="text-gray-500 mt-1">
              Email: 
              <a href="mailto:chaitrali.chaudhari@ltce.in" className="text-blue-600 hover:underline">
              chaitrali.chaudhari@ltce.in
              </a>
            </p>
          </CardContent>
        </Card>
      </motion.div>

      {/* HOD Message Section */}
      <motion.div
        className="mt-10 w-full max-w-4xl bg-white p-6 rounded-2xl shadow-xl border-l-8 border-blue-600 hover:shadow-2xl transition-shadow duration-300"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.5 }}
      >
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          HOD's <span className="text-blue-600">Message</span>
        </h3>
        <p className="text-gray-600 leading-relaxed">
          Welcome to the AIML Department. Our mission is to nurture innovative minds, equip students with cutting-edge
          knowledge, and prepare them for the future of Artificial Intelligence and Machine Learning. We believe in
          fostering a collaborative learning environment that bridges academia and industry. I encourage all students
          to explore, learn, and push the boundaries of AI for the betterment of society.
        </p>
      </motion.div>
    </div>
  );
}

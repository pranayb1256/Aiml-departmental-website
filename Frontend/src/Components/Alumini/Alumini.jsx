import { useState, useEffect } from "react";
import { FaLinkedin, FaGithub } from "react-icons/fa";

const AlumniSection = () => {
  const [alumniData, setAlumniData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAlumniData = async () => {
      try {
        const response = await fetch("/api/alumini/"); // Change URL for production
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setAlumniData(data);
      } catch (err) {
        console.error("Error fetching alumni data:", err);
        setError(err.message);
      }
    };

    fetchAlumniData();
  }, []);

  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }

  return (
    <section className="bg-white py-16 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-extrabold text-gray-700 mb-4">
          Alumni <span className="text-blue-600">Corner</span>
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-12">
          Meet our accomplished alumni who continue to excel in various fields.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 justify-center items-center mx-auto">
          {alumniData.map((alumnus) => (
            <div
              key={alumnus._id}
              className="bg-white border border-blue-200 rounded-3xl shadow-md hover:shadow-lg transition duration-300 p-6 text-center"
            >
              <img
                src={alumnus.photo}
                alt={alumnus.name}
                className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-blue-600 shadow-md object-cover"
              />
              <h3 className="text-xl font-semibold text-blue-800">{alumnus.name}</h3>
              <p className="text-sm text-gray-500">{alumnus.jobTitle || "No Job Title"}</p>
              <div className="flex justify-center space-x-5 mt-4">
                {alumnus.linkedIn && (
                  <a
                    href={alumnus.linkedIn}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 transition"
                  >
                    <FaLinkedin size={22} />
                  </a>
                )}
                {alumnus.github && (
                  <a
                    href={alumnus.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-700 hover:text-gray-900 transition"
                  >
                    <FaGithub size={22} />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AlumniSection;

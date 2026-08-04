import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "../Components/ui/card";
import { Button } from "../Components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "../Components/ui/dialog";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  EffectCoverflow,
  Autoplay,
  Navigation,
  Pagination,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";
import axios from "axios";
import { io } from "socket.io-client";
import EventCountdown from "../Components/Events/EventCountdown";
import { Trophy, Medal, Star, ExternalLink } from "lucide-react";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL; // Update as needed

const mockPastWinners = [
  {
    id: 1,
    teamName: "Neural Ninjas",
    projectTitle: "AI-Powered Early Cancer Detection",
    event: "AIML National Hackathon 2024",
    prize: "1st Place - ₹50,000",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    members: ["Alice J.", "Bob S.", "Charlie D."]
  },
  {
    id: 2,
    teamName: "Visionaries",
    projectTitle: "Smart Traffic Management System",
    event: "AI Tech Symposium 2024",
    prize: "2nd Place - ₹30,000",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    members: ["Diana P.", "Evan W."]
  }
];

const Event = () => {
  const [selectedClub, setSelectedClub] = useState("AIMSA");
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    const socket = io(SOCKET_URL, { transports: ["websocket"] });

    const fetchEvents = async () => {
      const apiUrl = import.meta.env.VITE_API_URL;
      try {

        const response = await axios.get(`${apiUrl}/events`);
        setEvents(response.data.events || []);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();

    // Listen for new event additions
    socket.on("new-event", (event) => {
      setEvents((prevEvents) => [event, ...prevEvents]);
    });

    // Listen for event deletions
    socket.on("delete-event", (deletedId) => {
      setEvents((prevEvents) =>
        prevEvents.filter((event) => event._id !== deletedId)
      );
    });

    // Cleanup on component unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  const filteredEvents = events.filter(
    (event) => event.clubName === selectedClub
  );

  return (
    <div className={`py-12 px-6 sm:px-12 bg-slate-50 min-h-screen font-sans ${isDialogOpen ? "overflow-hidden" : ""}`}>
      <motion.h1
        className="text-center text-5xl font-extrabold mb-10 text-slate-900 tracking-tight"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Events</span>
      </motion.h1>

      <EventCountdown 
        eventName="AIML National Hackathon 2026" 
        targetDate="2026-11-15T09:00:00" 
      />

      {/* Club Filter Buttons */}
      <motion.div
        className={`flex justify-center text-gray-100 gap-6 mb-10 transition-opacity duration-300 ${isDialogOpen ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {["AIMSA", "CSI", "ISTE"].map((club) => (
          <Button
            key={club}
            onClick={() => setSelectedClub(club)}
            className={`px-6 py-3 rounded-lg text-lg text-gray-700 font-medium transition shadow-md 
              ${selectedClub === club
                ? "bg-blue-600 text-white"
                : "bg-gray-300 hover:bg-gray-400"
              }`}
          >
            {club}
          </Button>
        ))}
      </motion.div>

      {/* Event Cards Grid */}
      <motion.div
        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 transition-opacity duration-300 ${isDialogOpen ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        {filteredEvents.map((event) => (
          <motion.div
            key={event._id}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <Card
              className="p-6 cursor-pointer shadow-lg bg-white rounded-2xl transform transition hover:shadow-xl"
              onClick={() => {
                setSelectedEvent(event);
                setIsDialogOpen(true);
              }}
            >
              <CardContent className="p-0">
                <Swiper
                  slidesPerView={1}
                  loop={true}
                  autoplay={{ delay: 2000 }}
                  pagination={{ clickable: true }}
                  className="w-full h-56 rounded-xl overflow-hidden"
                >
                  {event.images.map((src, index) => (
                    <SwiperSlide key={index}>
                      <img
                        src={src}
                        alt={`Event ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
                <div className="p-5 text-center space-y-3">
                  <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                    {event.clubName}
                  </h3>
                  <p className="text-blue-600 font-medium text-sm">
                    {new Date(event.dateTime).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })} | {event.venue}
                  </p>
                  <p className="text-slate-600 text-sm line-clamp-3 leading-relaxed">
                    {event.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Past Winners Showcase Section */}
      <motion.div
        className={`mt-24 transition-opacity duration-300 ${isDialogOpen ? "opacity-0 pointer-events-none" : "opacity-100"}`}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-gray-900">
            Hall of <span className="text-yellow-500">Fame</span>
          </h2>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            Celebrating the brilliance and innovation of our past hackathon and symposium winners.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
          {mockPastWinners.map((winner, idx) => (
            <motion.div
              key={winner.id}
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 flex flex-col sm:flex-row group"
            >
              <div className="sm:w-2/5 h-48 sm:h-auto relative overflow-hidden">
                <img 
                  src={winner.image} 
                  alt={winner.teamName}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-3 left-3 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full flex items-center shadow-md">
                  <Trophy className="w-3 h-3 mr-1" /> {winner.prize.split(' - ')[0]}
                </div>
              </div>
              <div className="sm:w-3/5 p-6 flex flex-col justify-between">
                <div>
                  <div className="text-sm text-blue-600 font-semibold mb-1 uppercase tracking-wider">{winner.event}</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{winner.teamName}</h3>
                  <p className="text-gray-700 font-medium line-clamp-2 mb-4">"{winner.projectTitle}"</p>
                </div>
                <div>
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <span className="font-semibold text-gray-700 mr-2">Team:</span>
                    {winner.members.join(", ")}
                  </div>
                  <div className="inline-block bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-md">
                    Prize: {winner.prize.split(' - ')[1]}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Event Dialog (Modal) */}
      {selectedEvent && (
        <Dialog
          open={isDialogOpen}
          onOpenChange={(open) => setIsDialogOpen(open)}
        >
          <DialogContent className="max-w-4xl p-8 bg-white rounded-xl shadow-xl transform scale-95 transition-all duration-300">
            <DialogTitle className="text-3xl font-bold text-center mb-5 text-gray-900">
              {selectedEvent.clubName}
            </DialogTitle>

            {/* Swiper for Event Images */}
            <Swiper
              effect="coverflow"
              grabCursor={true}
              centeredSlides={true}
              slidesPerView={1.2}
              spaceBetween={20}
              loop={true}
              autoplay={{ delay: 2500, disableOnInteraction: false }}
              initialSlide={selectedImageIndex} // Start from the selected image
              coverflowEffect={{
                rotate: 0,
                stretch: 40,
                depth: 150,
                modifier: 1,
                slideShadows: false,
              }}
              navigation
              pagination={{ clickable: true }}
              modules={[EffectCoverflow, Autoplay, Navigation, Pagination]}
              className="w-full h-96 rounded-lg shadow-lg mb-6" // Increased height
            >
              {selectedEvent.images.map((src, index) => (
                <SwiperSlide key={index} className="h-full">
                  <div className="h-full overflow-hidden rounded-lg">
                    <img
                      src={src}
                      alt={`Event ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Event Details */}
            <div className="text-left space-y-4">
              <p className="text-lg font-medium text-slate-700">
                <strong className="text-blue-600">Date:</strong>{" "}
                {new Date(selectedEvent.dateTime).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
              </p>
              <p className="text-lg font-medium text-slate-700">
                <strong className="text-blue-600">Venue:</strong>{" "}
                {selectedEvent.venue}
              </p>
              <p className="text-lg font-medium">
                <strong className="text-blue-600">Guest Speaker:</strong>{" "}
                {selectedEvent.guestSpeaker}
              </p>
              <p className="mt-4 text-gray-700 text-lg leading-relaxed">
                {selectedEvent.description}
              </p>
            </div>

            {/* Close Button */}
            <Button
              onClick={() => setIsDialogOpen(false)}
              className="mt-6 w-full bg-gray-700 text-white py-3 rounded-lg hover:bg-red-600 transition"
            >
              Close
            </Button>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default Event;

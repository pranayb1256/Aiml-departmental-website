import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useState } from "react";
import { Card, CardContent } from "../Components/ui/card";
import { Button } from "../Components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "../Components/ui/dialog";

const events = [
  {
    id: 1,
    club: "AIMSA",
    title: "AI Innovation Conference",
    date: "2025-03-15",
    time: "10:00 AM",
    description: "A deep dive into AI innovations with experts and hands-on sessions.",
    venue: "Auditorium",
    images: ["/images/Student_Image/IMG_5030.jpg", "/images/Student_Image/IMG_5031.jpg","/images/Student_Image/IMG_5032.jpg"],
  },
  {
    id: 2,
    club: "CSI",
    title: "Hackathon 2025",
    date: "2025-04-10",
    time: "9:00 AM",
    description: "A 24-hour intense coding competition to build real-world solutions.",
    venue: "Lab 5",
    images: ["/Photos/Hackathon.jpg", "/Photos/Hackathon_Team.jpg"],
  },
  {
    id: 3,
    club: "LTCE",
    title: "Cybersecurity Workshop",
    date: "2025-05-20",
    time: "11:00 AM",
    description: "Learn the latest cybersecurity trends, tools, and ethical hacking techniques.",
    venue: "Room 101",
    images: ["/Photos/Cybersecurity_Workshop.jpg", "/Photos/Cybersecurity_Talk.jpg"],
  },
];

const Event = () => {
  const [selectedClub, setSelectedClub] = useState("AIMSA");
  const [selectedEvent, setSelectedEvent] = useState(null);

  const filteredEvents = events.filter((event) => event.club === selectedClub);

  return (
    <div className="p-10 bg-gray-100 min-h-screen">
      <motion.h1 
        className="text-center text-5xl font-extrabold mb-10 text-gray-900 tracking-wide" 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Our <span className="text-blue-600">Events</span>
      </motion.h1>

      <motion.div 
        className="flex justify-center text-gray-100 gap-6 mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {["AIMSA", "CSI", "LTCE"].map((club) => (
          <Button
            key={club}
            onClick={() => setSelectedClub(club)}
            className={`px-6 py-3 rounded-lg text-lg text-gray-700 font-medium transition shadow-md 
              ${selectedClub === club ? "bg-blue-600 text-white" : "bg-gray-300 hover:bg-gray-400"}`}
          >
            {club}
          </Button>
        ))}
      </motion.div>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        {filteredEvents.map((event) => (
          <motion.div key={event.id} whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
            <Card 
              className="p-6 cursor-pointer shadow-lg bg-white rounded-2xl transform transition hover:shadow-xl"
              onClick={() => setSelectedEvent(event)}
            >
              <CardContent className="p-0">
                <div className="w-full h-56 overflow-hidden rounded-xl shadow-md">
                  <img src={event.images[0]} alt={event.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-5 text-center">
                  <h3 className="text-2xl font-semibold text-gray-900">{event.title}</h3>
                  <p className="text-sm text-gray-500">{event.date} | {event.time}</p>
                  <p className="mt-3 text-gray-700">{event.description}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {selectedEvent && (
        <Dialog open={true} onOpenChange={() => setSelectedEvent(null)}>
          <DialogContent className="max-w-3xl p-8 bg-white rounded-xl shadow-xl">
            <DialogTitle className="text-3xl font-bold text-center mb-5 text-gray-900">
              {selectedEvent.title}
            </DialogTitle>

            <div className="w-full">
              <Swiper
                effect="coverflow"
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={1.2}
                spaceBetween={20}
                loop={true}
                autoplay={{ delay: 2500, disableOnInteraction: false }}
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
                className="w-full h-72 rounded-lg shadow-lg mb-6"
              >
                {selectedEvent.images.map((src, index) => (
                  <SwiperSlide key={index} className="h-full">
                    <div className="h-full overflow-hidden rounded-lg">
                      <img src={src} alt={`Event ${index + 1}`} className="w-full h-full object-cover" />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            <div className="text-left space-y-3">
              <p className="text-lg font-medium"><strong className="text-blue-600">Club:</strong> {selectedEvent.club}</p>
              <p className="text-lg font-medium"><strong className="text-blue-600">Date & Time:</strong> {selectedEvent.date} at {selectedEvent.time}</p>
              <p className="text-lg font-medium"><strong className="text-blue-600">Venue:</strong> {selectedEvent.venue}</p>
              <p className="mt-4 text-gray-700 text-lg leading-relaxed">{selectedEvent.description}</p>
            </div>

            <Button 
              onClick={() => setSelectedEvent(null)} 
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
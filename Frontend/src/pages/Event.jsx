import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "../Components/ui/card";
import { Button } from "../Components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "../Components/ui/dialog";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";
import axios from "axios";

const Event = () => {
  const [selectedClub, setSelectedClub] = useState("AIMSA");
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const fetchEvents = async () => {
    try {
      const response = await axios.get("/api/events/");
      setEvents(response.data.events || []);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const filteredEvents = events.filter((event) => event.clubName === selectedClub);

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
        {["AIMSA", "CSI", "ISTCE"].map((club) => (
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
          <motion.div key={event._id} whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
            <Card 
              className="p-6 cursor-pointer shadow-lg bg-white rounded-2xl transform transition hover:shadow-xl"
              onClick={() => setSelectedEvent(event)}
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
                      <img src={src} alt={`Event ${index + 1}`} className="w-full h-full object-cover" />
                    </SwiperSlide>
                  ))}
                </Swiper>
                <div className="p-5 text-center">
                  <h3 className="text-2xl font-semibold text-gray-900">{event.clubName}</h3>
                  <p className="text-sm text-gray-500">{event.date} | {event.venue}</p>
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
              {selectedEvent.clubName}
            </DialogTitle>

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

            <div className="text-left space-y-3">
              <p className="text-lg font-medium"><strong className="text-blue-600">Date:</strong> {selectedEvent.date}</p>
              <p className="text-lg font-medium"><strong className="text-blue-600">Venue:</strong> {selectedEvent.venue}</p>
              <p className="text-lg font-medium"><strong className="text-blue-600">description:</strong> {selectedEvent.description}</p>
              <p className="text-lg font-medium"><strong className="text-blue-600">guestSpeaker:</strong> {selectedEvent.guestSpeaker}</p>
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

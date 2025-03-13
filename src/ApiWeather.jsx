import React, { useState, useEffect } from "react";
import { FaSearch, FaBell, FaUser, FaBars, FaTimes } from "react-icons/fa";
import { FiSettings } from "react-icons/fi";
import { MdOutlineDashboard } from "react-icons/md";
import { WiDayCloudy } from "react-icons/wi";
import { BsBarChart } from "react-icons/bs";

const ApiWeather = () => {
  const [city, setCity] = useState("Los Angeles");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activePage, setActivePage] = useState("home");

  const API_KEY = "f1cd4cd2f9b540728aa225225251203";

  useEffect(() => {
    fetchWeather();
  }, [city]); // يتم التحديث عند تغيير المدينة

  const fetchWeather = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=no`
      );
      const data = await response.json();
      setWeather(data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
    setLoading(false);
  };

  return (
    <div className="flex h-screen bg-gray-100 text-gray-900">
      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 text-white w-64 p-5 flex flex-col justify-between z-50 md:relative md:translate-x-0`}
        style={{
          background: "linear-gradient(135deg, #0093E9 0%, #80D0C7 100%)",
        }}
      >
        <div className="flex justify-between items-center mb-5">
          <h1 className="text-2xl font-bold tracking-wide">WeatherApp</h1>
          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden p-2 text-white"
          >
            <FaTimes size={20} />
          </button>
        </div>

        <nav>
          <ul className="space-y-4">
            {[
              { name: "Home", icon: <MdOutlineDashboard />, id: "home" },
              { name: "Forecast", icon: <WiDayCloudy />, id: "forecast" },
              { name: "Analytics", icon: <BsBarChart />, id: "analytics" },
              { name: "Settings", icon: <FiSettings />, id: "settings" },
            ].map((item) => (
              <li
                key={item.id}
                className={`flex items-center cursor-pointer p-2 rounded-lg transition duration-300 ${
                  activePage === item.id
                    ? "bg-white text-blue-600"
                    : "hover:bg-blue-300"
                }`}
                onClick={() => {
                  setActivePage(item.id);
                  setSidebarOpen(false);
                }}
              >
                <span className="mr-3">{item.icon}</span> {item.name}
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center space-x-4 mt-5">
          <FaBell className="cursor-pointer hover:scale-110 transition" />
          <FaUser className="cursor-pointer hover:scale-110 transition" />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="flex justify-between items-center">
          {/* Sidebar Toggle */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden p-3 bg-blue-600 text-white rounded-md"
          >
            {sidebarOpen ? <FaTimes /> : <FaBars />}
          </button>

          {/* Search Box */}
          <div className="relative w-1/2 max-w-xs">
            <input
              type="text"
              placeholder="Enter city name..."
              className="w-full p-3 rounded-full border bg-white shadow-md outline-none focus:ring-2 focus:ring-blue-500 transition"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && fetchWeather()}
            />
            <button
              onClick={fetchWeather}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-blue-600 text-white rounded-full"
            >
              <FaSearch />
            </button>
          </div>
        </div>

        {/* Page Content */}
        <div className="mt-8">
          {activePage === "home" && (
            <>
              <h2 className="text-2xl font-bold">Current Weather</h2>
              {loading ? (
                <p className="text-center mt-5 text-lg font-semibold">
                  Fetching data...
                </p>
              ) : weather ? (
                <div className="mt-5 bg-white shadow-md rounded-xl p-6 flex flex-col items-center">
                  <h2 className="text-2xl font-bold text-blue-600">
                    {weather.location.name}, {weather.location.country}
                  </h2>
                  <p className="text-lg">
                    {weather.current.temp_c}°C - {weather.current.condition.text}
                  </p>
                  <img
                    src={weather.current.condition.icon}
                    alt="Weather icon"
                    className="w-20 h-20"
                  />

                  {/* Weather Cards */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 w-full">
                    {[
                      { label: "Humidity", value: `${weather.current.humidity}%` },
                      { label: "Wind", value: `${weather.current.wind_kph} km/h` },
                      { label: "Precipitation", value: `${weather.current.precip_mm} mm` },
                      { label: "Feels Like", value: `${weather.current.feelslike_c}°C` },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="p-4 rounded-lg shadow-md text-white text-center transition transform hover:-translate-y-2 duration-500 cursor-pointer"
                        style={{
                          background:
                            "linear-gradient(135deg, #8BC6EC 0%, #9599E2 100%)",
                        }}
                      >
                        <p className="text-lg font-semibold">{item.label}</p>
                        <p className="text-xl font-bold">{item.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <p className="text-center mt-5">No weather data available.</p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApiWeather;

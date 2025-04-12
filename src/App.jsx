import React, { useState } from "react";
import ImageGallery from "./Components/ImageGallery";
import CanvasEditor from "./Components/CanvasEditor";
import axios from "axios";
import { Search, MoveLeft } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 
import './App.css';

const App = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const searchImages = async () => {
    if (!query.trim()) {
      toast.warn("Please enter a search term!");
      return;
    }

    // const API_KEY = import.meta.env.VITE_API_KEY;
  const API_KEY="49708221-4dd73b09ff9a84bccdc0b0606&q"

    try {
      setLoading(true);
      const response = await axios.get(
        `https://pixabay.com/api/?key=${API_KEY}=${encodeURIComponent(
          query
        )}&image_type=photo`
      );
      setImages(response.data.hits);
      setSelectedImage(null);

      if (response.data.hits.length === 0) {
        toast.info("No images found for your search.");
      } else {
        toast.success("Images loaded successfully!");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="p-12 bg-gray-100 min-h-screen">
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar />

        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <h6 className="font-bold text-gray-700">
            Name: <span className="text-gray-500">Tapswi Yadav</span>
          </h6>
          <a
            href="mailto:sytapswi@gmail.com"
            className="font-bold text-gray-700"
          >
            Email: <span className="text-gray-500">sytapswi@gmail.com</span>
          </a>
        </div>

        <div className="flex relative gap-1 mb-3.5" style={{ width: "400px" }}>
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <Search size={18} />
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && searchImages()}
            placeholder="Enter your search term"
            className="border ps-10 p-1 rounded flex-grow"
          />
          <button
            onClick={searchImages}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </div>

        {!selectedImage &&
          (images.length > 0 ? (
            <ImageGallery images={images} onSelect={setSelectedImage} />
          ) : (
            <p className="text-center text-gray-500 mt-6 text-lg">
              {/* No Data Found */}
            </p>
          ))}

        {selectedImage && (
          <div className="mt-6  gap-3">
            <button
              onClick={() => setSelectedImage(null)}
              className="mb-4 bg-gray-400 px-4 py-2 rounded"
            >
              <MoveLeft size={18} /> 
            </button>
            <span className=" ms-7 text-1xl font-bold mb-6 text-center">
              ADD CAPTION PAGE
            </span>
            <CanvasEditor image={selectedImage} />
          </div>
        )}
      </div>
    </>
  );
};

export default App;

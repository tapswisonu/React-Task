
import React from "react";
import { CopyPlus, Plus } from "lucide-react"; 

const ImageGallery = ({ images, onSelect }) => {
  return (
    <>
        {/* <h1 className="text-1xl font-bold mb-6 text-center">
         Searched image Result
        </h1> */}
      
    <div className="grid grid-cols-1 m-7 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {images.map((img) => (
        <div
          key={img.id}
          className="bg-white rounded-2xl shadow hover:shadow-lg transition-all duration-300 overflow-hidden"
        >
          <img
            src={img.previewURL}
            alt="preview"
            className="w-full h-48 object-cover cursor-pointer hover:scale-105 transition-transform duration-300"
            onClick={() => {
              console.log("Selected:", img.largeImageURL);
              onSelect(img.largeImageURL);
            }}
          />

          <div className="p-3 border-t">
            <button
              onClick={() => onSelect(img.largeImageURL)}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md font-medium flex items-center justify-center gap-2 transition duration-200"
            >
              <CopyPlus  size={18} />
              Add Caption
            </button>
          </div>
        </div>
      ))}
    </div>
    </>
  );
};

export default ImageGallery;

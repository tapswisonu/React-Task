import React from "react";

const DownloadButton = ({ canvasRef }) => {
  const handleDownload = () => {
    const canvas = canvasRef.current;
    const dataURL = canvas.toDataURL({
      format: "png",
      quality: 1,
    });

    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "edited-image.png";
    link.click();
  };

  return (
    <button
      onClick={handleDownload}
      className="bg-indigo-600 text-white px-4 py-2 rounded"
    >
      Download Image
    </button>
  );
};

export default DownloadButton;

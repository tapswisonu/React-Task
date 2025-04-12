import React from "react";

const DownloadButton = ({ canvasRef }) => {
    const [loading, setLoading] = React.useState(false);
  
  const handleDownload = () => {
    const canvas = canvasRef.current;
     setLoading(true);
    const dataURL = canvas.toDataURL({
      format: "png",
      quality: 1,
    });

    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "edited-image.png";
    link.click();
     setLoading(false);
  };

  return (
    <button
      onClick={handleDownload}
      className="bg-indigo-600 text-white px-4 py-2 rounded"
    >
      {loading ? "Downloading..." : "Download Image"}
    </button>
  );
};

export default DownloadButton;

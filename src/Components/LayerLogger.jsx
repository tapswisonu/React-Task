import React from 'react';

const LayerLogger = ({ canvasRef }) => {
  const logLayers = () => {
    const canvas = canvasRef.current;
    const objects = canvas.getObjects().map((obj) => ({
      type: obj.type,
      left: obj.left,
      top: obj.top,
      width: obj.width || obj.radius * 2,
      height: obj.height || obj.radius * 2,
      fill: obj.fill,
      text: obj.text || null,
    }));
    console.log(objects);
    alert('Check console for layer info.');
  };

  return (
    <button onClick={logLayers} className="bg-gray-500 text-white px-4 py-2 rounded">
      Log Layers
    </button>
  );
};

export default LayerLogger;
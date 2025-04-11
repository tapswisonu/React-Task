import React from "react";
import * as fabric from "fabric";
import { Type, Square, Circle, Triangle, Pentagon } from "lucide-react";

const Toolbar = ({ canvasRef }) => {
  const addText = () => {
    const canvas = canvasRef.current;
    const text = new fabric.IText("Your text here", {
      left: 100,
      top: 100,
      fontSize: 20,
      fill: "black",
    });
    canvas.add(text);
    reorderLayers(canvas);
  };

  const addShape = (type) => {
    const canvas = canvasRef.current;
    let shape;

    switch (type) {
      case "rect":
        shape = new fabric.Rect({
          left: 150,
          top: 150,
          fill: "red",
          width: 60,
          height: 60,
        });
        break;
      case "circle":
        shape = new fabric.Circle({
          left: 200,
          top: 150,
          fill: "blue",
          radius: 30,
        });
        break;
      case "triangle":
        shape = new fabric.Triangle({
          left: 250,
          top: 150,
          fill: "green",
          width: 60,
          height: 60,
        });
        break;
      case "polygon":
        shape = new fabric.Polygon(
          [
            { x: 0, y: 0 },
            { x: 50, y: 0 },
            { x: 25, y: 50 },
          ],
          {
            left: 300,
            top: 150,
            fill: "purple",
          }
        );
        break;
    }

    canvas.add(shape);
    reorderLayers(canvas);
  };

  const reorderLayers = (canvas) => {
    const objects = canvas.getObjects();
    const shapes = [];
    const texts = [];

    objects.forEach((obj) => {
      if (obj.type === "i-text") {
        texts.push(obj);
      } else {
        shapes.push(obj);
      }
    });

    // Background image already set via setBackgroundImage and stays below
    canvas._objects = [...shapes, ...texts];
    canvas.requestRenderAll();
  };

  return (



<div className="flex gap-2 mb-4 flex-wrap">
  <button
    onClick={addText}
    className="flex items-center gap-2 bg-gray-700 text-white px-3 py-1.5 rounded-md hover:bg-gray-800 transition"
  >
    <Type size={16} />
    Add Text
  </button>

  <button
    onClick={() => addShape("rect")}
    className="flex items-center gap-2 bg-gray-700 text-white px-3 py-1.5 rounded-md hover:bg-gray-800 transition"
  >
    <Square size={16} />
    Rectangle
  </button>

  <button
    onClick={() => addShape("circle")}
    className="flex items-center gap-2 bg-gray-700 text-white px-3 py-1.5 rounded-md hover:bg-gray-800 transition"
  >
    <Circle size={16} />
    Circle
  </button>

  <button
    onClick={() => addShape("triangle")}
    className="flex items-center gap-2 bg-gray-700 text-white px-3 py-1.5 rounded-md hover:bg-gray-800 transition"
  >
    <Triangle size={16} />
    Triangle
  </button>

  <button
    onClick={() => addShape("polygon")}
    className="flex items-center gap-2 bg-gray-700 text-white px-3 py-1.5 rounded-md hover:bg-gray-800 transition"
  >
    <Pentagon size={16} />
    Polygon
  </button>
</div>

  );
};

export default Toolbar;

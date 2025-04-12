import React, { useEffect, useRef } from "react";
import * as fabric  from "fabric";
// import { Canvas } from "fabric";
// import { FabricImage } from "fabric";
import Toolbar from "./Toolbar";
import DownloadButton from "./DownloadButton";
import LayerLogger from "./LayerLogger";

const CanvasEditor = ({ image }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvasEl = document.getElementById("fabric-canvas");

    // Dispose previous canvas instance if exists
    if (canvasRef.current) {
      canvasRef.current.dispose();
    }

    const canvas = new fabric.Canvas(canvasEl, {
      width: 800,
      height: 500,
      backgroundColor: "#fff",
    });

    canvasRef.current = canvas;

    if (image) {
      console.log("🔍 Loading image:", image);

      const imgEl = new Image();
      imgEl.crossOrigin = "anonymous";
      imgEl.src = image;

      // imgEl.onload = () => {
      //   const imgInstance = new fabric.Image(imgEl, {
      //     selectable: false,
      //     scaleX: canvas.width / imgEl.width,
      //     scaleY: canvas.height / imgEl.height,
      //     originX: "left",
      //     originY: "top",
      //   });

      //   canvas.setBackgroundImage(imgInstance, () => {
      //     console.log("✅ Background image set and rendered.");
      //     canvas.requestRenderAll();
      //   });
      // };
      imgEl.onload = () => {
        const bgImg = new fabric.Image(imgEl, {
          selectable: false,
        });

        // Scale to canvas
        bgImg.scaleToWidth(canvas.getWidth());
        bgImg.scaleToHeight(canvas.getHeight());

        // ✅ Set background like this:
        canvas.backgroundImage = bgImg;
        canvas.requestRenderAll();
      };
    

      imgEl.onerror = () => {
        alert("❌ Image failed to load.");
      };
    }

    canvasRef.current = canvas;

    return () => {
      canvas.dispose();
    };
  }, [image]);


   

  return (
    <>
      {/* 
        <div className="flex gap-6">

          <div className="flex-1 border p-2">
            <canvas id="fabric-canvas" className="border"></canvas>
          </div>

          <div className=" border p-4 flex flex-col justify-between">
            <Toolbar canvasRef={canvasRef} />

            <div className="flex flex-col gap-2">
              <DownloadButton canvasRef={canvasRef} />
            </div>
          </div>

        </div> */}
      <div className="flex gap-8 p-6 bg-gray-50 min-h-screen">
        {/* Left: Canvas Area */}
        <div className="flex-1 bg-white border border-gray-300 rounded-2xl shadow-sm p-4">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">
            Design Canvas
          </h2>
          <canvas
            id="fabric-canvas"
            className="border border-dashed border-gray-400 rounded-md w-full h-[500px]"
          ></canvas>
        </div>

        {/* Right: Tools Panel */}
        <div className="w-[320px] bg-white border border-gray-300 rounded-2xl shadow-sm p-6 flex flex-col justify-between">
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-gray-800">Tools Panel</h2>
            <Toolbar canvasRef={canvasRef} />
          </div>

          {/* Bottom Buttons */}
          <div className="mt-8 space-y-3">
            <DownloadButton canvasRef={canvasRef} />
            {/* <LayerLogger canvasRef={canvasRef} /> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default CanvasEditor;

"use client";

import Button from "@mui/joy/Button";
import { useCallback, useRef } from "react";
import { useDropzone } from "react-dropzone";

export const Home = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const handleFile = (file: File) => {
    if (!file) return;

    const reader = new FileReader();

    const width = 100;
    const height = 100;

    reader.onload = function (ev) {
      const img = new Image();

      img.onload = function (e) {
        if (!canvasRef?.current) return;

        const ctx = canvasRef.current.getContext("2d");

        ctx?.clearRect(0, 0, width, height);

        canvasRef.current.width = width;
        canvasRef.current.height = height;

        ctx?.drawImage(img, 0, 0, 100, height);
      };

      if (ev.target?.result) {
        img.src = ev.target.result.toString();
      }
    };

    reader.readAsDataURL(file);
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    for (let acceptedFile of acceptedFiles) {
      handleFile(acceptedFile);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
    <div {...getRootProps()} className="bg-gray-200 p-10">
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag 'n' drop some files here, or click to select files</p>
      )}
      <canvas
        ref={canvasRef}
        onClick={() => {
          if (canvasRef.current) {
            const dataURL = canvasRef.current.toDataURL("image/png");
            const link = document.createElement("a");
            link.href = dataURL;
            link.download = "test.png";
            link.click();
            link.parentNode?.removeChild(link);
          }
        }}
      />
    </div>
  );
};

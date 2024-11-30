"use client";
import React, { useState, useEffect } from "react";
import Masonry from "react-masonry-css";
import { CldImage } from "next-cloudinary";
const getStableHeight = (publicId) => {
  // Create a simple hash from the public_id string
  const hash = publicId.split("").reduce((acc, char) => {
    return char.charCodeAt(0) + ((acc << 5) - acc);
  }, 0);

  // Use the hash to generate a height between 250-300
  return 250 + (Math.abs(hash) % 51);
};
export default function MasonryGallery() {
  const [columns, setColumns] = useState(5);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imageHeights, setImageHeights] = useState({});
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const fetchImages = async () => {
      try {
        const response = await fetch("/api/cloudinary");
        const data = await response.json();

        const heights = {};
        data.forEach((image) => {
          heights[image.public_id] = getStableHeight(image.public_id);
        });

        setImageHeights(heights);
        setImages(data);
      } catch (error) {
        console.error("Error fetching images:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const updateColumns = () => {
      const width = window.innerWidth;
      if (width <= 640) setColumns(2);
      else if (width <= 768) setColumns(3);
      else if (width <= 1024) setColumns(5);
      else if (width <= 1440) setColumns(7);
      else setColumns(9);
    };

    updateColumns();
    window.addEventListener("resize", updateColumns);
    return () => window.removeEventListener("resize", updateColumns);
  }, [isMounted]);

  if (loading) {
    const skeletonHeights = Array(20)
      .fill(0)
      .map((index) => 250 + (index % 3) * 25); // Deterministic heights

    return (
      <div className="container mx-auto px-4 mt-24">
        <div className="h-10 w-72 bg-gray-200 rounded-lg animate-pulse mb-8"></div>
        <div className="px-2">
          <Masonry
            breakpointCols={columns}
            className="flex -ml-4 w-auto"
            columnClassName="pl-4 bg-clip-padding"
          >
            {skeletonHeights.map((height, index) => (
              <div
                key={index}
                className="mb-4 rounded-xl overflow-hidden w-full"
                style={{
                  height: `${height}px`,
                  backgroundColor: "#f3f4f6",
                }}
              >
                <div className="w-full h-full animate-pulse"></div>
              </div>
            ))}
          </Masonry>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 mt-24">
      <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
        Explore Our Gallery
      </h2>
      <div className="px-2">
        <Masonry
          breakpointCols={columns}
          className="flex -ml-4 w-auto"
          columnClassName="pl-4 bg-clip-padding"
        >
          {images.map((image) => (
            <div
              key={image.public_id}
              className="group mb-4 rounded-xl overflow-hidden w-full shadow-[0_3px_10px_rgb(0,0,0,0.2)] hover:shadow-[rgba(0,_0,_0,_0.24)_0px_12px_24px] transition-all duration-300 transform hover:-translate-y-1"
              style={{
                height: `${imageHeights[image.public_id]}px`,
              }}
            >
              <CldImage
                width={800}
                height={600}
                src={image.public_id}
                sizes="(max-width: 640px) 50vw,
                       (max-width: 768px) 33vw,
                       (max-width: 1024px) 20vw,
                       (max-width: 1440px) 14vw,
                       11vw"
                alt={image.alt || "Gallery image"}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                style={{ height: "100%" }}
              />
            </div>
          ))}
        </Masonry>
      </div>
    </div>
  );
}

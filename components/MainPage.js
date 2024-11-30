"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";

const galleryImages = Array.from({ length: 29 }, (_, index) => ({
  id: index + 1,
  src: `/images/cropped/fashion-${index + 1}.webp`, // Assuming your images are named sequentially
  alt: `Fashion style ${index + 1}`,
}));

// Rest of the components remain the same
const CurvedGrid = ({ children }) => {
  const [windowWidth, setWindowWidth] = useState(0);
  const columns = 7;
  const maxRowsPerColumn = 4;
  const columnWrapper = {};
  const result = [];

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  for (let i = 0; i < columns; i++) {
    columnWrapper[`column${i}`] = [];
  }

  for (let i = 0; i < columns * maxRowsPerColumn && i < children.length; i++) {
    const columnIndex = i % columns;
    columnWrapper[`column${columnIndex}`].push(
      <div key={i} className="mb-4">
        {children[i]}
      </div>
    );
  }

  const getMarginTop = (index) => {
    const middleIndex = Math.floor((columns - 1) / 2);
    const distance = Math.abs(index - middleIndex);
    const margins = {
      sm: 150,
      md: 190,
      lg: 300,
    };

    const getMaxMargin = () => {
      if (typeof window !== "undefined") {
        if (window.innerWidth < 768) return margins.sm;
        if (window.innerWidth < 1024) return margins.md;
        return margins.lg;
      }
      return margins.lg;
    };

    const maxMargin = getMaxMargin();
    const step = maxMargin / middleIndex;
    return maxMargin - distance * step;
  };

  for (let i = 0; i < columns; i++) {
    result.push(
      <div
        key={i}
        className="flex-1"
        style={{
          marginLeft: i > 0 ? "16px" : "0",
          marginTop: `${getMarginTop(i)}px`,
        }}
      >
        {columnWrapper[`column${i}`]}
      </div>
    );
  }

  return (
    <div
      className="flex mx-auto"
      style={{
        width: "100%",
        maxWidth: windowWidth < 768 ? "100%" : "1400px",
        padding: windowWidth < 768 ? "0 16px" : "0",
      }}
    >
      {result}
    </div>
  );
};

const AnimatedPin = ({ image: initialImage, columnIndex }) => {
  const [currentImage, setCurrentImage] = useState(initialImage);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const totalColumns = 7;
  const cycleInterval = totalColumns * 1000 + 1000;
  const columnDelay = 1000;

  useEffect(() => {
    const delay = columnIndex * 200;
    setTimeout(() => setIsVisible(true), delay);

    const columnImages = galleryImages.filter(
      (_, index) => index % totalColumns === columnIndex
    );
    let currentImageIndex = columnImages.findIndex(
      (img) => img.id === currentImage.id
    );

    const interval = setInterval(() => {
      setTimeout(() => {
        setIsAnimating(true);
        setTimeout(() => {
          currentImageIndex = (currentImageIndex + 1) % columnImages.length;
          setCurrentImage(columnImages[currentImageIndex]);
          setIsAnimating(false);
        }, 500);
      }, columnIndex * columnDelay);
    }, cycleInterval);

    return () => clearInterval(interval);
  }, [columnIndex, currentImage.id]);

  return (
    <div
      className={`rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 transform
       ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"}`}
      style={{
        transitionDelay: `${columnIndex * 200}ms`,
      }}
    >
      <div className="aspect-[3/4] relative">
        <div
          className={`transform transition-all duration-500 ${
            isAnimating
              ? "opacity-0 scale-110 blur-sm"
              : "opacity-100 scale-100 blur-0"
          }`}
        >
          <Image
            src={currentImage.src}
            alt={currentImage.alt}
            width={400}
            height={600}
            className="object-cover hover:scale-110 transition-transform duration-500"
            priority={columnIndex < 2}
          />
        </div>
      </div>
    </div>
  );
};

export default function MainPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    "Fashion, ready for listing",
    "Boost your  ecommerce sales",
    "Gen-AI For Fashion",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen mt-8 bg-white mx-auto">
      <main className="overflow-hidden">
        <div className="max-w-[1400px] mx-auto text-center space-y-8">
          <h1 className="text-3xl md:text-5xl font-bold px-4 pb-8 mt-8">
            Your Photoshoot, Simplified
            <div className="text-blue-500 mt-2">{slides[currentSlide]}</div>
          </h1>

          <div
            className="mt-[100px] overflow-hidden"
            style={{ margin: "0 auto", width: "100%", maxWidth: "1400px" }}
          >
            <div
              style={{
                width: "1400px",
                marginLeft: "50%",
                transform: "translateX(-50%)",
              }}
            >
              <CurvedGrid>
                {galleryImages.map((image, index) => (
                  <AnimatedPin
                    key={image.id}
                    image={image}
                    columnIndex={index % 7}
                  />
                ))}
              </CurvedGrid>
            </div>
          </div>
        </div>
      </main>

      <style jsx global>{`
        @keyframes fadeInFromBottom {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

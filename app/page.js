"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Cpu, Shirt, Wand2, ChevronDown } from "lucide-react";
import Testimonials from "@/components/testimonials";
import MainPage from "@/components/MainPage";
import AnimatedBeamMultipleOutputDemo from "@/components/HowItWork";
import ImageCustomizer from "@/components/experiment";

const features = [
  {
    icon: <Cpu className="w-8 h-8 text-purple-600" />,
    title: "AI Avatar Creation",
    description:
      "Generate unique and realistic AI models with advanced machine learning.",
  },
  {
    icon: <Shirt className="w-8 h-8 text-pink-600" />,
    title: "Custom Clothing",
    description:
      "Upload and apply your own clothing designs to your AI avatars.",
  },
  {
    icon: <Wand2 className="w-8 h-8 text-purple-600" />,
    title: "Easy Customization",
    description:
      "Intuitive tools for tweaking and perfecting your AI model's appearance.",
  },
];

export default function Component() {
  const contentRef = useRef(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToContent = () => {
    contentRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative w-full">
      <section className="relative h-screen mt-16">
        <MainPage />

        <div
          className="absolute bottom-0 left-0 w-full "
          style={{
            background:
              "linear-gradient(rgba(255, 255, 255, 0) 0%, rgb(255, 255, 255) 70%)",
            height: "200px",
          }}
        >
          <div className="flex flex-col items-center justify-center h-full">
            <div className="flex flex-col items-center gap-4">
              <motion.div
                animate={{
                  y: [0, -20, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <button
                  onClick={scrollToContent}
                  className="bg-purple-600 hover:bg-purple-700 text-white rounded-full p-3 shadow-lg transition-all duration-300"
                  aria-label="Scroll to content"
                >
                  <ChevronDown className="w-6 h-6" />
                </button>
              </motion.div>

              <div
                className="flex items-center gap-2 cursor-pointer pb-4"
                onClick={scrollToContent}
              >
                <span className="text-lg font-semibold text-purple-600">
                  Here&apos;s how it works
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div
        ref={contentRef}
        className="relative bg-gradient-to-b from-purple-50 to-pink-100"
      >
        <section id="features" className="py-16 flex items-center">
          {" "}
          {/* Changed from py-24 to py-12 and removed min-h-screen */}
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-16 text-purple-600">
              {" "}
              {/* Changed mb-16 to mb-8 */}
              Features
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className="relative flex flex-col items-center text-center p-8 rounded-2xl bg-white/50 backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center mb-6">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                  <p className="text-zinc-600">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        {/* <AnimatedBeamMultipleOutputDemo /> */}
        {/* //<Testimonials /> */}
        <ImageCustomizer />
        <div className="w-full flex flex-col md:flex-row items-center justify-center gap-4 pb-16 px-4">
          <p className="text-lg text-gray-700 text-center md:text-left">
            Want to see our full collection?
          </p>
          <button
            onClick={() => (window.location.href = "/gallery")}
            className="bg-purple-600 hover:bg-purple-700 text-white font-medium px-6 py-3 rounded-lg shadow-lg transition-all duration-300"
          >
            Explore More
          </button>
        </div>
      </div>
    </div>
  );
}

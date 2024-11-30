"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Menu, ArrowRight } from "lucide-react";
import Link from "next/link";

import { Check } from "lucide-react";

const VisuallyHidden = ({ children }) => (
  <span className="sr-only">{children}</span>
);
const DemoForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    designation: "",
    companyName: "",
    preferredDate: "",
    timeFrom: "",
    timeTo: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center py-8 space-y-4">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
          <Check className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-xl font-semibold text-center">
          Request Submitted!
        </h3>
        <p className="text-gray-600 text-center">
          {formData.preferredDate && formData.timeFrom && formData.timeTo
            ? `We'll get back to you on ${formData.preferredDate} between ${formData.timeFrom} and ${formData.timeTo}`
            : "We'll get back to you within 24 hours"}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className=" space-y-4 mt-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">
          Full Name <span className="text-red-500">*</span>
        </label>
        <input
          required
          type="text"
          className="w-full p-2 border rounded-md"
          onChange={(e) =>
            setFormData({ ...formData, fullName: e.target.value })
          }
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">
          Designation <span className="text-red-500">*</span>
        </label>
        <input
          required
          type="text"
          className="w-full p-2 border rounded-md"
          onChange={(e) =>
            setFormData({ ...formData, designation: e.target.value })
          }
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">
          Company Name <span className="text-red-500">*</span>
        </label>
        <input
          required
          type="text"
          className="w-full p-2 border rounded-md"
          onChange={(e) =>
            setFormData({ ...formData, companyName: e.target.value })
          }
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Preferred Date (Optional)</label>
        <div className="relative flex items-center">
          <input
            type="date"
            min={new Date().toISOString().split("T")[0]}
            className="w-full pl-10 p-2 border rounded-md"
            onChange={(e) =>
              setFormData({ ...formData, preferredDate: e.target.value })
            }
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">
          Preferred Time Range (Optional)
        </label>
        <div className="grid grid-cols-2 gap-4">
          <div className="relative flex items-center">
            <input
              type="time"
              className="w-full pl-10 p-2 border rounded-md"
              onChange={(e) =>
                setFormData({ ...formData, timeFrom: e.target.value })
              }
              placeholder="From"
            />
          </div>
          <input
            type="time"
            className="w-full p-2 border rounded-md"
            onChange={(e) =>
              setFormData({ ...formData, timeTo: e.target.value })
            }
            placeholder="To"
          />
        </div>
      </div>

      <Button
        type="submit"
        className="w-full bg-[#7B68EE] text-white hover:bg-[#7B68EF]"
      >
        Submit Request
      </Button>
    </form>
  );
};

const Header = () => {
  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md">
      <div className="container mx-auto px-4">
        <div className="h-16 flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link
              href="/"
              className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
            >
              Ohraya
            </Link>
            <div className="hidden md:flex space-x-6">
              <Link
                href="/#features"
                className="text-sm font-medium hover:text-purple-600 transition-colors"
              >
                Features
              </Link>
              <Link
                href="/#how-it-works"
                className="text-sm font-medium hover:text-purple-600 transition-colors"
              >
                How It Works
              </Link>
              <Link
                href="/gallery"
                className="text-sm font-medium hover:text-purple-600 transition-colors"
              >
                Gallery
              </Link>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-[#7B68EE] text-white hover:bg-[#7B68EF] rounded-md px-6 py-3 transition-all duration-300 hover:scale-95 shadow-md hover:shadow-xl flex items-center">
                  Request A Demo
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Request a Demo</DialogTitle>
                </DialogHeader>
                <DemoForm />
              </DialogContent>
            </Dialog>
          </div>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <VisuallyHidden>
                <SheetTitle>Menu</SheetTitle>
              </VisuallyHidden>
              <div className="flex flex-col space-y-4 mt-8">
                <Link
                  href="/"
                  className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4"
                >
                  Ohraya
                </Link>
                <Link
                  href="#features"
                  className="text-sm font-medium hover:text-purple-600 transition-colors"
                >
                  Features
                </Link>
                <Link
                  href="#how-it-works"
                  className="text-sm font-medium hover:text-purple-600 transition-colors"
                >
                  How It Works
                </Link>
                <Link
                  href="/gallery"
                  className="text-sm font-medium hover:text-purple-600 transition-colors"
                >
                  Gallery
                </Link>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-[#7B68EE] text-white hover:bg-[#7B68EF] rounded-md px-6 py-3 transition-all duration-300 hover:scale-95 shadow-md hover:shadow-xl flex items-center">
                      Request A Demo
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Request a Demo</DialogTitle>
                    </DialogHeader>
                    <DemoForm />
                  </DialogContent>
                </Dialog>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Header;

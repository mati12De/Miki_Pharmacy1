import {
  Pill,
  HeartPulse,
  Sparkles,
  Baby,
  MonitorSmartphone,
  Leaf,
} from "lucide-react";

export const categories = [
  {
    name: "Medicines",
    path: "/category/medicines",
    icon: Pill,
    bg: "bg-blue-100",
    color: "text-blue-600",
  },
  {
    name: "Health Care",
    path: "/category/health-care",
    icon: HeartPulse,
    bg: "bg-pink-100",
    color: "text-red-500",
  },
  {
    name: "Personal Care",
    path: "/category/personal-care",
    icon: Sparkles,
    bg: "bg-purple-100",
    color: "text-purple-600",
  },
  {
    name: "Baby Care",
    path: "/category/baby-care",
    icon: Baby,
    bg: "bg-orange-100",
    color: "text-orange-500",
  },
  {
    name: "Devices",
    path: "/category/devices",
    icon: MonitorSmartphone,
    bg: "bg-blue-100",
    color: "text-blue-500",
  },
  {
    name: "Wellness",
    path: "/category/wellness",
    icon: Leaf,
    bg: "bg-green-100",
    color: "text-green-600",
  },
];

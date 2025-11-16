// src/services/learningSessionApi.js
import axios from "axios";

const API_BASE =
  "https://8080-afbbcbdcdbeddeaeaafeabcfedbbfadbaeaab.premiumproject.examly.io/api/learningSessions";

// ===========================
// BACKEND FETCH FUNCTIONS
// ===========================

// Fetch all sessions (from backend)
export const getAllSessions = async () => {
  const res = await axios.get(`${API_BASE}/all`);
  return res.data;
};

// Fetch sessions by category (from backend)
export const getSessionsByCategory = async (category) => {
  const res = await axios.get(`${API_BASE}/skill/${category}`);
  return res.data;
};

// ===========================
// STATIC CATEGORY LIST
// ===========================
export const categories = [
  "Music",
  "Technology",
  "Arts",
  "Language",
  "Business",
  "Cooking",
  "Sport",
];

// ===========================
// MOCK SESSION DATA
// (Use when backend is unavailable)
// ===========================
export const getLearningSessions = () => {
  const sessions = [
    {
      id: "music",
      title: "Music",
      description: "Join jam sessions and learn instruments.",
      meetLink: "https://meet.google.com/music-session",
    },
    {
      id: "technology",
      title: "Technology",
      description: "Explore coding, AI, and tech talks.",
      meetLink: "https://meet.google.com/tech-session",
    },
    {
      id: "arts",
      title: "Arts",
      description: "Sketch, paint, and explore creative skills.",
      meetLink: "https://meet.google.com/art-session",
    },
    {
      id: "language",
      title: "Language",
      description: "Learn new languages with peers.",
      meetLink: "https://meet.google.com/lang-session",
    },
    {
      id: "business",
      title: "Business",
      description: "Entrepreneurship and marketing sessions.",
      meetLink: "https://meet.google.com/business-session",
    },
    {
      id: "cooking",
      title: "Cooking",
      description: "Cook delicious recipes together.",
      meetLink: "https://meet.google.com/cook-session",
    },
    {
      id: "sport",
      title: "Sport",
      description: "Fitness and teamwork live sessions.",
      meetLink: "https://meet.google.com/sport-session",
    },
  ];

  // ✅ Return as a Promise (so `.then()` works)
  return Promise.resolve(sessions);
};

// ===========================
// SIMULATED NETWORK DELAY MOCK
// (Optional – for testing loading states)
// ===========================
export const getSessions = () => {
  const sessions = [
    {
      id: "music",
      title: "Music",
      description: "Join jam sessions and learn instruments.",
      meetLink: "https://meet.google.com/music-session",
    },
    {
      id: "technology",
      title: "Technology",
      description: "Explore coding, AI, and tech talks.",
      meetLink: "https://meet.google.com/tech-session",
    },
    {
      id: "arts",
      title: "Arts",
      description: "Sketch, paint, and explore creative skills.",
      meetLink: "https://meet.google.com/art-session",
    },
  ];

  return new Promise((resolve) => {
    setTimeout(() => resolve(sessions), 500);
  });
};

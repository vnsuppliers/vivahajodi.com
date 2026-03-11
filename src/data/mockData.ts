// Mock data for the matrimony app

export interface Profile {
  id: string;
  name: string;
  age: number;
  gender: string;
  location: string;
  religion: string;
  education: string;
  occupation: string;
  height: string;
  about: string;
  avatar: string;
  photos: string[];
  maritalStatus: string;
  motherTongue: string;
  caste: string;
  income: string;
  diet: string;
  smoking: string;
  drinking: string;
  familyType: string;
  fatherOccupation: string;
  motherOccupation: string;
  partnerPreferences: {
    ageRange: string;
    religion: string;
    location: string;
    education: string;
  };
}

const avatars = [
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face",
];

export const mockProfiles: Profile[] = [
  {
    id: "1", name: "Ananya Reddy", age: 26, gender: "Female", location: "Hyderabad, India",
    religion: "Hindu", education: "MBA", occupation: "Marketing Manager", height: "5'5\"",
    about: "A cheerful and ambitious woman who loves traveling and cooking. Looking for a partner who values family and growth.",
    avatar: avatars[0], photos: [avatars[0]], maritalStatus: "Never Married", motherTongue: "Telugu",
    caste: "Reddy", income: "₹12-15 LPA", diet: "Vegetarian", smoking: "No", drinking: "No",
    familyType: "Nuclear", fatherOccupation: "Business", motherOccupation: "Teacher",
    partnerPreferences: { ageRange: "27-32", religion: "Hindu", location: "Any", education: "Graduate+" }
  },
  {
    id: "2", name: "Rahul Mehta", age: 29, gender: "Male", location: "Mumbai, India",
    religion: "Hindu", education: "B.Tech", occupation: "Software Engineer", height: "5'10\"",
    about: "An easy-going tech enthusiast who enjoys cricket and reading. Seeking a life partner with shared values.",
    avatar: avatars[1], photos: [avatars[1]], maritalStatus: "Never Married", motherTongue: "Gujarati",
    caste: "Mehta", income: "₹18-22 LPA", diet: "Non-Vegetarian", smoking: "No", drinking: "Occasionally",
    familyType: "Joint", fatherOccupation: "Engineer", motherOccupation: "Homemaker",
    partnerPreferences: { ageRange: "24-28", religion: "Hindu", location: "Metro cities", education: "Graduate+" }
  },
  {
    id: "3", name: "Fatima Khan", age: 25, gender: "Female", location: "Delhi, India",
    religion: "Muslim", education: "MBBS", occupation: "Doctor", height: "5'4\"",
    about: "A compassionate doctor who loves art and poetry. Looking for someone kind and supportive.",
    avatar: avatars[2], photos: [avatars[2]], maritalStatus: "Never Married", motherTongue: "Urdu",
    caste: "Khan", income: "₹10-14 LPA", diet: "Non-Vegetarian", smoking: "No", drinking: "No",
    familyType: "Nuclear", fatherOccupation: "Professor", motherOccupation: "Doctor",
    partnerPreferences: { ageRange: "26-32", religion: "Muslim", location: "Delhi NCR", education: "Post Graduate" }
  },
  {
    id: "4", name: "Arjun Nair", age: 31, gender: "Male", location: "Bangalore, India",
    religion: "Hindu", education: "M.Tech", occupation: "Data Scientist", height: "5'11\"",
    about: "A data-driven thinker who enjoys hiking and music. Seeking a partner who is curious and adventurous.",
    avatar: avatars[3], photos: [avatars[3]], maritalStatus: "Never Married", motherTongue: "Malayalam",
    caste: "Nair", income: "₹25-30 LPA", diet: "Non-Vegetarian", smoking: "No", drinking: "Socially",
    familyType: "Nuclear", fatherOccupation: "Retired Army", motherOccupation: "Homemaker",
    partnerPreferences: { ageRange: "25-30", religion: "Any", location: "South India", education: "Graduate+" }
  },
  {
    id: "5", name: "Sneha Iyer", age: 27, gender: "Female", location: "Chennai, India",
    religion: "Hindu", education: "CA", occupation: "Chartered Accountant", height: "5'3\"",
    about: "A detail-oriented CA with a passion for classical dance. Believes in balance between career and family.",
    avatar: avatars[4], photos: [avatars[4]], maritalStatus: "Never Married", motherTongue: "Tamil",
    caste: "Iyer", income: "₹15-18 LPA", diet: "Vegetarian", smoking: "No", drinking: "No",
    familyType: "Joint", fatherOccupation: "Bank Manager", motherOccupation: "Teacher",
    partnerPreferences: { ageRange: "28-34", religion: "Hindu", location: "Tamil Nadu", education: "Professional" }
  },
  {
    id: "6", name: "Vikram Singh", age: 30, gender: "Male", location: "Jaipur, India",
    religion: "Hindu", education: "MBA", occupation: "Entrepreneur", height: "6'0\"",
    about: "A self-made entrepreneur who values traditions. Looking for a partner who shares family values.",
    avatar: avatars[5], photos: [avatars[5]], maritalStatus: "Never Married", motherTongue: "Hindi",
    caste: "Rajput", income: "₹30+ LPA", diet: "Non-Vegetarian", smoking: "No", drinking: "Occasionally",
    familyType: "Joint", fatherOccupation: "Business", motherOccupation: "Homemaker",
    partnerPreferences: { ageRange: "24-28", religion: "Hindu", location: "Rajasthan", education: "Graduate+" }
  },
];

export interface Interest {
  id: string;
  profileId: string;
  status: "pending" | "accepted" | "rejected";
  date: string;
}

export const mockReceivedInterests: Interest[] = [
  { id: "i1", profileId: "2", status: "pending", date: "2026-03-10" },
  { id: "i2", profileId: "4", status: "pending", date: "2026-03-09" },
  { id: "i3", profileId: "6", status: "accepted", date: "2026-03-07" },
];

export const mockSentInterests: Interest[] = [
  { id: "s1", profileId: "1", status: "pending", date: "2026-03-10" },
  { id: "s2", profileId: "3", status: "accepted", date: "2026-03-08" },
  { id: "s3", profileId: "5", status: "rejected", date: "2026-03-05" },
];

export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  status: "sent" | "delivered" | "read";
}

export interface ChatThread {
  id: string;
  profileId: string;
  messages: Message[];
  unreadCount: number;
}

export const mockChatThreads: ChatThread[] = [
  {
    id: "c1", profileId: "3", unreadCount: 2,
    messages: [
      { id: "m1", senderId: "3", text: "Hi! I liked your profile 😊", timestamp: "2026-03-10T10:00:00", status: "read" },
      { id: "m2", senderId: "me", text: "Thank you! Your profile is lovely too.", timestamp: "2026-03-10T10:05:00", status: "read" },
      { id: "m3", senderId: "3", text: "Would love to know more about you!", timestamp: "2026-03-10T10:10:00", status: "delivered" },
      { id: "m4", senderId: "3", text: "What are your hobbies?", timestamp: "2026-03-10T10:12:00", status: "delivered" },
    ]
  },
  {
    id: "c2", profileId: "6", unreadCount: 0,
    messages: [
      { id: "m5", senderId: "me", text: "Hello Vikram, nice to connect!", timestamp: "2026-03-09T14:00:00", status: "read" },
      { id: "m6", senderId: "6", text: "Hello! Glad to connect. Tell me about yourself.", timestamp: "2026-03-09T14:30:00", status: "read" },
    ]
  },
];

export interface Notification {
  id: string;
  type: "interest" | "message" | "view" | "match" | "like";
  title: string;
  description: string;
  time: string;
  read: boolean;
}

export const mockNotifications: Notification[] = [
  { id: "n1", type: "interest", title: "New Interest", description: "Rahul Mehta sent you an interest", time: "2h ago", read: false },
  { id: "n2", type: "message", title: "New Message", description: "Fatima Khan sent you a message", time: "3h ago", read: false },
  { id: "n3", type: "view", title: "Profile Viewed", description: "Arjun Nair viewed your profile", time: "5h ago", read: true },
  { id: "n4", type: "match", title: "New Match!", description: "You and Vikram Singh are a mutual match", time: "1d ago", read: true },
  { id: "n5", type: "like", title: "Profile Liked", description: "Sneha Iyer liked your profile", time: "2d ago", read: true },
];

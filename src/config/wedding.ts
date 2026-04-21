// 💌 ALL WEDDING DETAILS — edit here to update the entire site
export const wedding = {
  bride: "Dhriti",
  groom: "Monil",
  poeticLine: "Two souls, one journey — woven in love, blessed by tradition.",
  mainDate: "25th June 2026",
  hashtag: "#DhritiWedsMonil",
  events: [
    {
      name: "Mehndi",
      emoji: "🌿",
      date: "22nd June 2026",
      time: "5:00 PM onwards",
      venue: "The Grand Lawn, Surat",
      mapUrl: "https://maps.google.com/?q=Surat",
      color: "emerald",
    },
    {
      name: "Mandap",
      emoji: "🏵️",
      date: "24th June 2026",
      time: "9:00 AM onwards",
      venue: "Shubh Banquet Hall, Surat",
      mapUrl: "https://maps.google.com/?q=Surat",
      color: "gold",
    },
    {
      name: "Haldi",
      emoji: "💛",
      date: "24th June 2026",
      time: "11:00 AM onwards",
      venue: "Shubh Banquet Hall, Surat",
      mapUrl: "https://maps.google.com/?q=Surat",
      color: "gold",
    },
    {
      name: "Mameru",
      emoji: "🎁",
      date: "24th June 2026",
      time: "4:00 PM onwards",
      venue: "Shubh Banquet Hall, Surat",
      mapUrl: "https://maps.google.com/?q=Surat",
      color: "peach",
    },
    {
      name: "Sangeet",
      emoji: "🎶",
      date: "24th June 2026",
      time: "7:30 PM onwards",
      venue: "Royal Garden Resort, Surat",
      mapUrl: "https://maps.google.com/?q=Surat",
      color: "maroon",
    },
    {
      name: "Wedding",
      emoji: "❤️",
      date: "25th June 2026",
      time: "8:00 PM onwards",
      venue: "Heritage Palace Grounds, Surat",
      mapUrl: "https://maps.google.com/?q=Surat",
      color: "maroon",
    },
  ],
  // Optional: replace with your own hosted audio URL
  musicUrl: "https://cdn.pixabay.com/download/audio/2022/10/30/audio_347a7869a4.mp3",
};

export type WeddingEvent = (typeof wedding.events)[number];

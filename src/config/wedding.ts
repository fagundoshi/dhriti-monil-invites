// 💌 ALL WEDDING DETAILS — edit here to update the entire site
export const wedding = {
  bride: "Dhriti",
  groom: "Monil",
  brideParents: "D/o Nisha & Kalpesh Shah",
  groomParents: "S/o Nisha & Kalpesh Shah",
  poeticLine: "Two souls, one journey — woven in love, blessed by tradition.",
  mainDate: "25th June 2026",
  // Date parts for the three-circle scratch reveal
  dateParts: {
    day: "25",
    month: "JUN",
    year: "2026",
  },
  hashtag: "#DhritiWedsMonil",
  events: [
    {
      name: "Mehndi",
      emoji: "🌿",
      date: "22nd June 2026",
      time: "5:00 PM onwards",
      venue: "The Grand Lawn, Surat",
      mapUrl: "https://maps.google.com/?q=Surat",
      blurb: "Henna, laughter and the first whispers of celebration.",
    },
    {
      name: "Mandap",
      emoji: "🏵️",
      date: "24th June 2026",
      time: "9:00 AM onwards",
      venue: "Shubh Banquet Hall, Surat",
      mapUrl: "https://maps.google.com/?q=Surat",
      blurb: "The sacred canopy is raised — rituals begin.",
    },
    {
      name: "Haldi",
      emoji: "💛",
      date: "24th June 2026",
      time: "11:00 AM onwards",
      venue: "Shubh Banquet Hall, Surat",
      mapUrl: "https://maps.google.com/?q=Surat",
      blurb: "Golden turmeric blessings for a radiant beginning.",
    },
    {
      name: "Mameru",
      emoji: "🎁",
      date: "24th June 2026",
      time: "4:00 PM onwards",
      venue: "Shubh Banquet Hall, Surat",
      mapUrl: "https://maps.google.com/?q=Surat",
      blurb: "A heartfelt tradition of love from the maternal family.",
    },
    {
      name: "Sangeet",
      emoji: "🎶",
      date: "24th June 2026",
      time: "7:30 PM onwards",
      venue: "Royal Garden Resort, Surat",
      mapUrl: "https://maps.google.com/?q=Surat",
      blurb: "An evening of music, dance and joyful chaos.",
    },
    {
      name: "Wedding",
      emoji: "❤️",
      date: "25th June 2026",
      time: "8:00 PM onwards",
      venue: "Heritage Palace Grounds, Surat",
      mapUrl: "https://maps.google.com/?q=Surat",
      blurb: "Two hearts. Seven vows. A forever begins.",
    },
  ],
  musicUrl: "https://cdn.pixabay.com/download/audio/2022/10/30/audio_347a7869a4.mp3",
  // EmailJS — replace these with your real keys from emailjs.com
  emailjs: {
    serviceId: "YOUR_SERVICE_ID",
    templateId: "YOUR_TEMPLATE_ID",
    publicKey: "YOUR_PUBLIC_KEY",
    toEmail: "your@email.com",
  },
};

export type WeddingEvent = (typeof wedding.events)[number];

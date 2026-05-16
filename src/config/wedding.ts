// 💌 ALL WEDDING DETAILS — edit here to update the entire site
export const wedding = {
  bride: "Dhriti",
  groom: "Monil",
  brideParents: "D/o Nisha & Kalpesh Shah",
  groomParents: "S/o Anjana & Rajesh Shah",
  poeticLine: "Two souls, one journey — woven in love, blessed by tradition.",
  mainDate: "25/06/2026",
  // Date parts for the three-circle tap-to-reveal
  dateParts: {
    day: "25",
    month: "06",
    year: "2026",
  },
  hashtag: "#DhritiWedsMonil",
  events: [
    {
      name: "Mehndi",
      emoji: "🌿",
      date: "22nd June 2026",
      time: "5:00 PM onwards",
      venue: "A-702 Aaryam Apartments",
      mapUrl: "https://maps.app.goo.gl/fZajX8yAmUpLJf4PA",
      blurb: "Henna, laughter and the first whispers of celebration.",
    },
    {
      name: "Mandap",
      emoji: "🏵️",
      date: "24th June 2026",
      time: "9:00 AM onwards",
      venue: "Le Meridien,Ahmedabad",
      mapUrl: "https://maps.app.goo.gl/WtWZctiiYFhW3QKY9",
      blurb: "The sacred canopy is raised — rituals begin.",
    },
    {
      name: "Haldi",
      emoji: "💛",
      date: "24th June 2026",
      time: "11:00 AM onwards",
      venue: "Le Meridien,Ahmedabad",
      mapUrl: "https://maps.app.goo.gl/WtWZctiiYFhW3QKY9",
      blurb: "Golden turmeric blessings for a radiant beginning.",
    },
    {
      name: "Mameru",
      emoji: "🎁",
      date: "24th June 2026",
      time: "4:00 PM onwards",
      venue: "Le Meridien,Ahmedabad",
      mapUrl: "https://maps.app.goo.gl/WtWZctiiYFhW3QKY9",
      blurb: "A heartfelt tradition of love from the maternal family.",
    },
    {
      name: "Sangeet",
      emoji: "🎶",
      date: "24th June 2026",
      time: "7:30 PM onwards",
      venue: "Jubilation Restaurant & Banquet,Ahmedabad",
      mapUrl: "https://maps.app.goo.gl/5TihpkP8kFy73voc6",
      blurb: "An evening of music, dance and joyful chaos.",
    },
    {
      name: "Wedding",
      emoji: "❤️",
      date: "25th June 2026",
      time: "8:00 PM onwards",
      venue: "Le Meridien,Ahmedabad",
      mapUrl: "https://maps.app.goo.gl/WtWZctiiYFhW3QKY9",
      blurb: "Two hearts. Seven vows. A forever begins.",
    },
  ],
  musicUrl: "/public/wedding.mp3",
  // EmailJS — replace these with your real keys from emailjs.com
  emailjs: {
    serviceId: "service_djsebv3",
    templateId: "YOUR_TEMPLATE_ID",
    publicKey: "YOUR_PUBLIC_KEY",
    toEmail: "your@email.com",
  },
};

export type WeddingEvent = (typeof wedding.events)[number];

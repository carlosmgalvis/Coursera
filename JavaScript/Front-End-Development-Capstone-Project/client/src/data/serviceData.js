export const serviceCards = [
  {
    id: "instant-consultation",
    title: "Instant Consultation",
    icon: "💬",
    description: "Talk to a doctor quickly and get guidance for urgent concerns.",
    route: "/instant-consultation",
    ctaLabel: "Start Consultation",
  },
  {
    id: "book-appointment",
    title: "Book an Appointment",
    icon: "🗓",
    description: "Choose a speciality, compare doctors, and schedule with ease.",
    route: "/booking-consultation",
    ctaLabel: "Book Now",
  },
  {
    id: "self-checkup",
    title: "Self Checkup",
    icon: "🩺",
    description: "Follow easy wellness checklists to stay aware of your health.",
    route: "/service/self-checkup",
    ctaLabel: "View Checklist",
  },
  {
    id: "health-tips-guidance",
    title: "Health Tips and Guidance",
    icon: "📋",
    description: "Explore simple habits, nutrition support, and preventive care tips.",
    route: "/service/health-tips-guidance",
    ctaLabel: "Read Tips",
  },
];

export const serviceDetails = {
  "self-checkup": {
    title: "Self Checkup",
    summary:
      "A simple at-home wellness routine to help you notice early signs and stay proactive.",
    sections: [
      {
        heading: "Daily Health Markers",
        items: [
          "Track sleep quality and energy level each morning.",
          "Notice hydration, appetite, and any unusual discomfort.",
          "Check temperature or blood pressure if you feel unwell.",
        ],
      },
      {
        heading: "Weekly Self Review",
        items: [
          "Record exercise minutes and stress level for the week.",
          "Review whether symptoms are recurring or getting worse.",
          "Schedule a consultation if pain or fatigue is persistent.",
        ],
      },
    ],
    tips: [
      "Use a health notebook or notes app for quick tracking.",
      "Do not ignore sudden breathing issues, chest pain, or dizziness.",
      "Reach out to a clinician whenever symptoms feel unusual.",
    ],
  },
  "health-tips-guidance": {
    title: "Health Tips and Guidance",
    summary:
      "Practical lifestyle guidance with dummy content for nutrition, movement, and prevention.",
    sections: [
      {
        heading: "Nutrition Basics",
        items: [
          "Start meals with vegetables or fruit when possible.",
          "Choose balanced plates with protein, grains, and fiber.",
          "Limit sugary drinks and keep water nearby through the day.",
        ],
      },
      {
        heading: "Movement and Recovery",
        items: [
          "Aim for at least 20 to 30 minutes of walking most days.",
          "Stretch shoulders, back, and hips after long sitting periods.",
          "Protect your recovery with a regular sleep schedule.",
        ],
      },
    ],
    tips: [
      "Small consistent habits matter more than one perfect day.",
      "Book a visit if you want a more personalized plan.",
      "Keep routines realistic so they actually stick.",
    ],
  },
};

export const healthBlogPosts = [
  {
    id: 1,
    title: "5 Small Habits That Support Better Heart Health",
    category: "Preventive Care",
    excerpt:
      "From walking after meals to tracking sleep, these easy habits help build a healthier routine.",
  },
  {
    id: 2,
    title: "How to Prepare for a Doctor Appointment",
    category: "Appointments",
    excerpt:
      "Bring your symptoms, medication list, questions, and any previous reports to make the visit smoother.",
  },
  {
    id: 3,
    title: "When an Online Consultation Is a Good First Step",
    category: "Telehealth",
    excerpt:
      "Virtual care can be helpful for quick advice, follow-ups, and non-emergency symptoms.",
  },
];

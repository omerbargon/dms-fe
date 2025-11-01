export type FAQItem = {
  question: string;
  answer: string;
};

export type FAQSection = {
  id: string;
  title: string;
  data: FAQItem[];
};

export const Faqs: FAQSection[] = [
  {
    id: '1',
    title: 'General Information',
    data: [
      {
        question: 'What is this app about?',
        answer: 'This is a demo FAQ section for testing. It shows how questions and answers will look in the app.',
      },
      {
        question: 'Is this real content?',
        answer: 'No, these are dummy questions and answers added for testing purposes only.',
      },
      {
        question: 'Can I replace these later?',
        answer: 'Yes. You can easily update or replace these items with real FAQs anytime.',
      },
    ],
  },
  {
    id: '2',
    title: 'Using the App',
    data: [
      {
        question: 'How do I log in?',
        answer: 'Use your registered email and password to log in. If you don’t have an account, you can create one from the sign-up screen.',
      },
      {
        question: 'Can I reset my password?',
        answer: 'Yes. Use the "Forgot Password" option on the login screen to reset your password.',
      },
      {
        question: 'Does the app work offline?',
        answer: 'Some basic features may work offline, but you will need an internet connection for most services.',
      },
    ],
  },
  {
    id: '3',
    title: 'Support',
    data: [
      {
        question: 'How do I contact support?',
        answer: 'You can reach out through the in-app chat, by sending an email to support@example.com, or by calling our hotline.',
      },
      {
        question: 'What are your support hours?',
        answer: 'Support is available 24/7 for urgent issues and during business hours for general inquiries.',
      },
      {
        question: 'Can I send feedback?',
        answer: 'Yes, we appreciate feedback. You can submit it directly through the app or via our website.',
      },
    ],
  },
];

//GET ALL FAQS: https://mobile.taminet.app/api/faqs
export const getFaqs = (): FAQSection[] => {
  return Faqs;
};

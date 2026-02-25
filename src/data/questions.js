export const ANIMAL_LOGOS = [
  { id: 'lion', name: 'LION', icon: 'Lion' },
  { id: 'tiger', name: 'TIGER', icon: 'Cat' },
  { id: 'wolf', name: 'WOLF', icon: 'Dog' },
  { id: 'eagle', name: 'EAGLE', icon: 'Bird' },
  { id: 'BUG', name: 'BUG', icon: 'bug' }, // Lucide doesn't have a great snake, Snail or Bug might work or I'll just use strings for now
];

export const QUESTION_SETS = {
  'one': [
    {
      id: 1,
      question: "I have 1024 voices but cannot speak. I store your thoughts in a silicon cell. I am fast and volatile, lost when the spark dies. What am I?",
      answer: "RAM"
    },
    {
      id: 2,
      question: "I am a path with no end, a loop that never breaks. I look for the truth in a sea of zeros and ones. If you don't give me a condition to stop, I will consume your time forever. What am I?",
      answer: "INFINITE LOOP"
    },
    {
      id: 3,
      question: "I am the gatekeeper of your secrets. I am often shared but never spoken. I grow stronger with length and complexity, but a simple '123' makes me useless. What am I?",
      answer: "PASSWORD"
    }
  ],
  'five': [
    {
      id: 4,
      question: "I connect millions yet stay in one place. I use protocols instead of laws. I have a 'Web' but no spider. What am I?",
      answer: "INTERNET"
    },
    {
      id: 5,
      question: "I am a tiny insect that lives in your thoughts and your machine. I hide in plain sight and cause havoc when you least expect it. My name is synonymous with an error. What am I?",
      answer: "BUG"
    },
    {
      id: 6,
      question: "I am the language of the machine, composed of only two souls. I am the foundation of every pixel you see. What am I?",
      answer: "BINARY"
    }
  ],
  'twelve': [
    {
      id: 7,
      question: "I am the brain that never thinks for itself. I follow instructions without question. I am measured in Hertz, and my speed determines your power. What am I?",
      answer: "CPU"
    },
    {
      id: 8,
      question: "I am a collection of data, organized and structured. I have tables but no chairs, and primary keys but no locks. What am I?",
      answer: "DATABASE"
    },
    {
      id: 9,
      question: "I keep your data safe by making it unreadable to the naked eye. I hold the key to the treasure, and without me, your signals are just noise. What am I?",
      answer: "ENCRYPTION"
    }
  ]
};

export const NUMERIC_WORDS = ['one', 'five', 'six','twelve'];

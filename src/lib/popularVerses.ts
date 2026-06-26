/**
 * A short list of the most-loved, most-memorized verses, offered as one-tap
 * suggestions in the dashboard memory flashcard. Text is World English Bible
 * (public domain) so it's free to display.
 */
export type PopularVerse = { ref: string; text: string };

export const POPULAR_VERSES: PopularVerse[] = [
  { ref: "John 3:16", text: "For God so loved the world, that he gave his one and only Son, that whoever believes in him should not perish, but have eternal life." },
  { ref: "Jeremiah 29:11", text: "For I know the thoughts that I think toward you, says the Lord, thoughts of peace, and not of evil, to give you hope and a future." },
  { ref: "Philippians 4:13", text: "I can do all things through Christ, who strengthens me." },
  { ref: "Psalm 23:1", text: "The Lord is my shepherd; I shall lack nothing." },
  { ref: "Romans 8:28", text: "We know that all things work together for good for those who love God, to those who are called according to his purpose." },
  { ref: "Joshua 1:9", text: "Haven't I commanded you? Be strong and courageous. Don't be afraid, neither be dismayed, for the Lord your God is with you wherever you go." },
  { ref: "Proverbs 3:5-6", text: "Trust in the Lord with all your heart, and don't lean on your own understanding. In all your ways acknowledge him, and he will make your paths straight." },
  { ref: "Isaiah 41:10", text: "Don't be afraid, for I am with you. Don't be dismayed, for I am your God. I will strengthen you. Yes, I will help you." },
  { ref: "Philippians 4:6", text: "In nothing be anxious, but in everything, by prayer and petition with thanksgiving, let your requests be made known to God." },
  { ref: "Psalm 46:1", text: "God is our refuge and strength, a very present help in trouble." },
  { ref: "Matthew 6:33", text: "But seek first God's Kingdom and his righteousness; and all these things will be given to you as well." },
  { ref: "2 Timothy 1:7", text: "For God didn't give us a spirit of fear, but of power, love, and self-control." },
];

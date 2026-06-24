/**
 * "This Day in His Story" — a daily moment from the 2,000-year story of the
 * Church. Real, well-documented history (facts aren't copyrightable) retold in
 * original wording. Rotates automatically by date. No third-party text copied.
 */
export type HistoryMoment = {
  year: string;
  title: string;
  story: string;
  takeaway: string;
};

export const HISTORY_MOMENTS: HistoryMoment[] = [
  { year: "c. AD 33", title: "The Church is born", story: "On a crowded festival morning in Jerusalem, the Holy Spirit fell on a frightened handful of Jesus' followers. Peter — who had denied Jesus weeks earlier — stood and preached, and about three thousand people believed in a single day. A movement that would reach the whole world began with ordinary people and a borrowed upper room.", takeaway: "God still starts world-changing things with unlikely, ordinary people." },
  { year: "313", title: "The persecution ends", story: "After nearly three centuries of believers being hunted, imprisoned, and killed, the Roman emperors Constantine and Licinius issued the Edict of Milan, granting Christians the freedom to worship openly. Faith that had survived in catacombs and house churches could finally step into the light.", takeaway: "What the world tried to bury, God kept alive underground." },
  { year: "367", title: "The 27 books named", story: "In a yearly Easter letter, Bishop Athanasius listed exactly the twenty-seven books we now call the New Testament — the first time the collection was named in full. The library you read from today was recognized, not invented, by the early church.", takeaway: "The Bible in your hands has a long, carefully-kept story." },
  { year: "c. 405", title: "Scripture in the common tongue", story: "After decades of painstaking work, the scholar Jerome finished the Vulgate — the Bible translated into Latin, the everyday language of his world. For a thousand years it would be how the West heard the Word.", takeaway: "From the start, God's heart was to be understood, not just admired." },
  { year: "c. 432", title: "Patrick goes back", story: "Kidnapped as a teenager and enslaved in Ireland, Patrick escaped home — then felt God call him back to the very people who had captured him. He returned as a missionary, and a whole nation came to faith.", takeaway: "God can send you back to the place of your pain as a place of purpose." },
  { year: "1382", title: "The Bible speaks English", story: "John Wycliffe and his friends produced the first complete English Bible, copied painstakingly by hand so ordinary people could finally read it themselves. They called him the “Morning Star of the Reformation” — the light before the dawn.", takeaway: "Some seeds you plant won't bloom until long after you're gone." },
  { year: "c. 1455", title: "The press changes everything", story: "Johannes Gutenberg printed the Bible using movable type — the first major book ever mass-produced. What once took a monk a year to copy could now be made in days, and Scripture began spreading faster than anyone could stop.", takeaway: "God has a way of meeting each new age with a new open door." },
  { year: "1517", title: "A door in Wittenberg", story: "A monk named Martin Luther, troubled that grace was being sold for money, posted ninety-five points for debate on a church door. He only meant to spark a conversation; he sparked the Reformation, and the rediscovery that we are saved by grace through faith.", takeaway: "One honest stand for the truth can change history." },
  { year: "1526", title: "Tyndale's New Testament", story: "William Tyndale printed the first English New Testament translated straight from the Greek, smuggling copies into England in bales of cloth. It cost him his life — but his dying prayer, that God would open the king's eyes, was answered within years.", takeaway: "What you give your life to for God is never wasted." },
  { year: "1611", title: "The King James Bible", story: "Forty-seven scholars, working for years, produced an English Bible of such beauty that its phrases still echo in everyday speech four hundred years later. For generations it would be the Book in nearly every home.", takeaway: "God's Word has outlasted every empire that ever doubted it." },
  { year: "1738", title: "A heart strangely warmed", story: "John Wesley, an exhausted, rule-keeping minister who felt his faith was cold, reluctantly went to a small meeting on Aldersgate Street. As someone read aloud about faith in Christ, he felt his “heart strangely warmed” — and that quiet moment lit a revival that swept nations.", takeaway: "God can reignite a faith that's gone cold — sometimes in the most ordinary room." },
  { year: "1780", title: "Sunday School begins", story: "Robert Raikes, grieved by poor children with no schooling and no hope, opened a school on Sundays to teach them to read — using the Bible as the textbook. Within decades the idea had reached millions of children.", takeaway: "Compassion for one overlooked group can grow into a movement." },
  { year: "1793", title: "“Attempt great things”", story: "William Carey, a shoemaker who taught himself languages, sailed for India convinced the gospel was for every nation. “Expect great things from God; attempt great things for God,” he said — and the modern missionary movement was born.", takeaway: "Ordinary work plus holy ambition can reach the ends of the earth." },
  { year: "1807", title: "The chains break", story: "After twenty years of relentless campaigning, driven by his Christian conviction that every person bears God's image, William Wilberforce watched Britain vote to abolish the slave trade. He had been told it was impossible.", takeaway: "Faith that refuses to quit can dismantle what looked permanent." },
  { year: "1865", title: "Inland to China", story: "Hudson Taylor founded a mission that went where others wouldn't — deep into inland China — even adopting local dress to remove barriers. He trusted God for every need and never made a public appeal for funds.", takeaway: "Sometimes loving people means laying down your own comfort and pride." },
  { year: "1906", title: "Revival on Azusa Street", story: "In a humble building in Los Angeles, under the leadership of William Seymour, a revival broke out that crossed racial and class lines almost unheard of for its day. From that small mission, a movement spread around the globe.", takeaway: "God loves to pour out His Spirit in the places the world overlooks." },
  { year: "1945", title: "Bonhoeffer's last words", story: "Dietrich Bonhoeffer, a pastor who chose to resist the Nazis rather than stay silent, was executed days before the war's end. As they led him away he said, “This is the end — for me, the beginning of life.”", takeaway: "Some convictions are worth everything — because death isn't the end." },
  { year: "1949", title: "A tent in Los Angeles", story: "A young preacher named Billy Graham held a tent crusade meant to last three weeks. It ran for eight, the crowds kept coming, and it launched a ministry that would share the gospel with more people, face to face, than anyone in history.", takeaway: "You rarely know which faithful “yes” God plans to multiply." },
];

function dayOfYearPT(): number {
  const d = new Date(
    new Date().toLocaleString("en-US", { timeZone: "America/Los_Angeles" })
  );
  const start = new Date(d.getFullYear(), 0, 0);
  return Math.floor((d.getTime() - start.getTime()) / 86400000);
}

/** Today's history moment (rotates daily, deterministic by date). */
export function getHistoryMoment(): HistoryMoment {
  const n = HISTORY_MOMENTS.length;
  // offset from Word of the Day's rotation so the two features stay varied together
  return HISTORY_MOMENTS[(dayOfYearPT() - 1 + n * 999 + 7) % n];
}

import "server-only";
import fs from "node:fs";
import path from "node:path";

/**
 * Original Daily Walk study-guide content (12 fields per day). Authored entries
 * live in AUTHORED; any day without one falls back to a warm template built from
 * the reading plan, so every day renders. All wording is original to The Daily Walk.
 */
export type KeyWord = { word: string; meaning: string };
export type SideVerse = { ref: string; text: string; meaning: string };

export type StudyDay = {
  day: number;
  reading: string;
  arc: string;
  context: string;
  plainEnglish: string;
  aboutGod: string;
  aboutPeople: string;
  realLife: string;
  verse: string;
  reflection: string;
  prayer: string;
  step: string;
  /** side cards: 1–2 key words explained, 1–2 healing verses, a gentle reflection */
  keyWords: KeyWord[];
  verses: SideVerse[];
  sideReflection: string;
  authored: boolean;
};

type PlanRow = { day: number; arc: string; theme: string; reading: string };

let planCache: PlanRow[] | null = null;
function plan(): PlanRow[] {
  if (!planCache) {
    const file = path.join(
      process.cwd(),
      "reading-plan",
      "bible-in-a-year.json"
    );
    planCache = JSON.parse(fs.readFileSync(file, "utf8")) as PlanRow[];
  }
  return planCache;
}

const AUTHORED: Record<number, Omit<StudyDay, "day" | "reading" | "arc" | "authored">> = {
  1: {
    context:
      "Most stories about Jesus start with a baby in a manger. John doesn't. He rewinds all the way past the manger, past history, past the very first sunrise — back to before there was a “before.”\n\nThis was written by John: one of Jesus' closest friends, the guy who literally leaned on Him at dinner. He's not handing you a rulebook or a religion. He's introducing you to a Person — like a friend grabbing your shoulder and saying, “Before you decide what you think about Jesus, let me actually show you who He is.”\n\nThat's why we start here. Not with rules. Not with “try harder.” With Him.",
    plainEnglish:
      "John reaches for the biggest word he can find and calls Jesus “the Word” — the voice behind everything. The same voice that said “let there be light” and a whole universe showed up. Now picture that voice… in sandals. Getting tired. Eating breakfast with fishermen. The God who spoke galaxies into existence didn't stay safely far away — He stepped into the room.\n\nAnd John keeps using one picture: light. Not a lecture about light — light itself, walking into a pitch-black room. Here's the thing about a dark room: you don't have to fix the dark, argue with it, or tidy up before the light comes. You just stop blocking the window.\n\nJohn says most people kept the curtains shut and walked right past Him. But some didn't. Some let the light in — and it rewrote who they were allowed to become: not God's employees earning a paycheck, but God's actual kids who already belong.",
    aboutGod: "He didn't stay distant. He moved into the neighborhood.",
    aboutPeople:
      "We're prone to miss God even when He's standing right in front of us — and grace comes looking anyway.",
    realLife:
      "You don't have to clean yourself up first. Day 1 isn't “try harder.” It's “come closer.”",
    verse:
      "“The light shines in the darkness, and the darkness hasn't overcome it.” — John 1:5",
    reflection:
      "Which part of your life feels most like a dark room right now — and what would letting a little light in look like?",
    prayer:
      "Jesus, before I try to be good enough, just meet me here. Be the light in the rooms I keep shut. Amen.",
    step: "Tell one person, “I started reading about Jesus today.” Naming it makes it real.",
    keyWords: [
      {
        word: "The Word",
        meaning:
          "When John calls Jesus “the Word,” he means God making Himself known — the invisible God you can finally see and hear. Jesus isn't a message about God; He is God, speaking, close enough to know.",
      },
      {
        word: "Light",
        meaning:
          "Not a soft glow you admire from far away — the kind that fills a room and changes what you can see. Light here means God's nearness and truth, showing up in the very places fear told you to keep dark.",
      },
    ],
    verses: [
      {
        ref: "Isaiah 9:2",
        text: "The people who walked in darkness have seen a great light.",
        meaning:
          "You don't have to manufacture your own hope. The light comes to you. However dark this season feels, God has a way of finding people right where they are.",
      },
      {
        ref: "Matthew 11:28",
        text: "Come to me, all you who labor and are heavily burdened, and I will give you rest.",
        meaning:
          "Notice He doesn't say “fix yourself first.” The invitation is to come tired, come heavy, come as you are — and let Him carry what you can't.",
      },
    ],
    sideReflection:
      "Where am I keeping the curtains shut — trying to handle life in my own strength — and what would it look like to let a little of God's light in there today?",
  },

  2: {
    context:
      "Jesus' very first miracle isn't a dramatic rescue — it's keeping a wedding party from embarrassment. He turns water into wine because the hosts ran out. It tells you something: He cares about the ordinary, human moments most people would call “not a big deal.”",
    plainEnglish:
      "At a wedding in Cana, the wine runs out. Jesus' mom basically says, “Do something.” He has servants fill huge jars with plain water — and it becomes the best wine of the night. Later He walks into the temple and flips tables over people turning worship into a marketplace.\n\nTwo scenes, one Jesus: gentle with people's small embarrassments, fiercely protective of what's sacred.",
    aboutGod: "He meets you in the everyday — and He's not indifferent to what cheapens your heart.",
    aboutPeople: "We invite Jesus to the big crises but forget He wants the ordinary days too.",
    realLife: "Bring Him the small thing today — the awkward, low-stakes thing you'd never think to pray about.",
    verse:
      "“His mother said to the servants, ‘Whatever he says to you, do it.’” — John 2:5",
    reflection: "What's a small, ordinary worry you've been carrying alone that you could simply hand to Jesus today?",
    prayer: "Jesus, You care about my ordinary days, not just my emergencies. Come into the small things with me. Amen.",
    step: "Pray about one tiny, ordinary thing today — out loud — like it matters to Him. Because it does.",
    keyWords: [
      { word: "Sign", meaning: "John never calls Jesus' miracles “tricks” — he calls them signs. They aren't the point; they point. Each one is an arrow saying, “Look who this is.”" },
      { word: "Glory", meaning: "Not showing off. It's Jesus quietly letting His true nature peek through — goodness so real it makes people trust Him." },
    ],
    verses: [
      { ref: "Philippians 4:6", text: "In nothing be anxious, but in everything, by prayer and petition with thanksgiving, let your requests be made known to God.", meaning: "“In everything” means nothing is too small or too silly to pray about. The ordinary worry counts. Hand it over." },
      { ref: "1 Peter 5:7", text: "casting all your worries on him, because he cares for you.", meaning: "You're not bothering God with your small stuff. He actually wants it — because He actually cares about you." },
    ],
    sideReflection: "What ordinary part of my life have I been keeping God out of, as if it's too small to matter to Him?",
  },

  3: {
    context:
      "A respected religious leader named Nicodemus sneaks to Jesus at night — too important to be seen asking questions in daylight. This is the chapter that holds the most famous verse in the Bible, but it starts with a successful man quietly admitting he doesn't have it figured out.",
    plainEnglish:
      "Nicodemus comes by night. Jesus tells him he must be “born again” — start over, brand new, from the inside. Nicodemus is confused: how do you restart your life? Jesus says it's not something you achieve; it's something God does in you.\n\nThen comes John 3:16 — the whole thing in one line: God loved, God gave, you believe, you live.",
    aboutGod: "God's plan was never “try harder.” It was “let me make you new.”",
    aboutPeople: "Even the people who look most put-together are quietly hoping there's more than performing.",
    realLife: "You can stop auditioning for God's approval. He's offering a fresh start, not a performance review.",
    verse:
      "“For God so loved the world, that he gave his one and only Son, that whoever believes in him should not perish, but have eternal life.” — John 3:16",
    reflection: "Where are you still trying to earn what God is offering as a gift?",
    prayer: "God, I'm tired of performing. Make me new from the inside — I can't do that myself. Thank You for loving me first. Amen.",
    step: "Name one way you've been trying to “earn” God's love, and let it go today.",
    keyWords: [
      { word: "Born again", meaning: "Not turning over a new leaf — getting a new life. It's God doing in you what you could never do for yourself: a clean, real start." },
      { word: "Believe", meaning: "More than agreeing it's true. It's trusting Him with your actual weight — leaning the way you lean back into a chair you trust to hold you." },
    ],
    verses: [
      { ref: "2 Corinthians 5:17", text: "Therefore if anyone is in Christ, he is a new creation. The old things have passed away. Behold, all things have become new.", meaning: "Whatever you've done or been, in Christ you're not patched up — you're remade. The old story doesn't get the final word." },
      { ref: "Ephesians 2:8", text: "for by grace you have been saved through faith, and that not of yourselves; it is the gift of God.", meaning: "You can exhale. This was never something to earn. It's a gift — and gifts are received, not deserved." },
    ],
    sideReflection: "If God's love is a gift and not a paycheck, what would change in how I come to Him today?",
  },

  4: {
    context:
      "Jesus goes out of His way to sit with a woman everyone else avoided — at a well, in the heat of noon, when she came alone to dodge the crowds. He crosses every line of His culture to do it. This is what Jesus moving toward you looks like.",
    plainEnglish:
      "A Samaritan woman comes to draw water alone. Jesus, a Jewish man, talks to her — which He “wasn't supposed” to do. He gently names her painful story without shaming her, then offers her “living water” — a life that doesn't run dry. She leaves her water jar and runs to tell her whole town.",
    aboutGod: "He pursues the very people the world writes off — on purpose, in person.",
    aboutPeople: "We hide our story out of shame, sure that being fully known would mean being rejected.",
    realLife: "The thing you're most afraid God knows about you is exactly where He wants to meet you with grace.",
    verse:
      "“but whoever drinks of the water that I will give him will never thirst again.” — John 4:14",
    reflection: "What part of your story do you assume would make God turn away — and what if it's where He wants to sit down with you?",
    prayer: "Jesus, You know all of it and You still came to the well for me. Meet me in the parts I hide. Amen.",
    step: "Tell God honestly about one thing you usually keep hidden. He already knows — let yourself be known.",
    keyWords: [
      { word: "Living water", meaning: "Not a one-time drink but a spring that keeps welling up inside you — the kind of deep-down satisfaction nothing else has ever quite filled." },
      { word: "Worship", meaning: "Jesus says it's not about the right building or ritual. It's “in spirit and truth” — honest, real, from the inside. Worship is your true self meeting a real God." },
    ],
    verses: [
      { ref: "Psalm 139:1", text: "Yahweh, you have searched me, and you know me.", meaning: "Being fully known can feel terrifying. But the One who knows everything is the One who loves you most. You are not too much for Him." },
      { ref: "Isaiah 55:1", text: "Come, everyone who thirsts, to the waters!", meaning: "The invitation has no fine print. Thirsty, empty, tired — you qualify. Come as you are and drink." },
    ],
    sideReflection: "Where have I been trying to satisfy a deep thirst with something that always leaves me empty?",
  },

  5: {
    context:
      "A man has been sick for thirty-eight years, lying by a pool everyone believed could heal — but he could never get in fast enough. Jesus walks up and asks a strange question: “Do you want to be made well?” Sometimes the hardest part of healing is actually wanting it.",
    plainEnglish:
      "By the pool of Bethesda, a long-disabled man waits with no one to help him in. Jesus doesn't use the pool at all — He just says, “Get up.” And the man walks. It causes an uproar because it happened on the Sabbath, and the religious leaders care more about the rule than the miracle.",
    aboutGod: "He heals on His terms, not the system's — and He's not impressed by religion that has no room for mercy.",
    aboutPeople: "We can get so used to our brokenness that we stop believing change is possible.",
    realLife: "If you've been stuck so long you've quit hoping, hear the question gently: do you want to be made well?",
    verse:
      "“Jesus said to him, ‘Arise, take up your mat, and walk.’” — John 5:8",
    reflection: "Where have you stopped expecting things to change — and what would it mean to hope again?",
    prayer: "Jesus, I've been stuck so long I almost gave up hoping. Yes — I want to be made well. Help me get up. Amen.",
    step: "Take one small “get up” step today in an area you've felt stuck — one phone call, one honest admission, one move.",
    keyWords: [
      { word: "Made well", meaning: "More than fixing a body. It's wholeness — the kind of healing that reaches the parts of you that gave up a long time ago." },
      { word: "Sabbath", meaning: "God's gift of rest, twisted by some into a cage of rules. Jesus shows rest was always meant to free people, not trap them." },
    ],
    verses: [
      { ref: "Isaiah 41:10", text: "Don't be afraid, for I am with you. Don't be dismayed, for I am your God. I will strengthen you.", meaning: "You don't have to find the strength to get up alone. The God who says “rise” also says “I'll hold you up while you do.”" },
      { ref: "Psalm 30:2", text: "Yahweh my God, I cried to you, and you have healed me.", meaning: "Healing often starts with a cry, not a strategy. Telling God the truth about your pain is already a step toward wholeness." },
    ],
    sideReflection: "Have I quietly accepted something as “just how it is” that God might actually want to heal?",
  },

  6: {
    context:
      "Jesus feeds thousands with a kid's small lunch, then says something that thins the crowd fast: “I am the bread of life.” Turns out a lot of people wanted the free meal more than they wanted Him. This chapter asks what you're really after.",
    plainEnglish:
      "Five thousand-plus people, one boy's five loaves and two fish — and everyone eats with leftovers. The crowd loves it and wants to make Jesus king (free food forever!). But Jesus says He's not here to be a vending machine; He's the bread that actually feeds your soul. Many walk away disappointed.",
    aboutGod: "He gives generously — and He loves you too much to let you settle for His gifts instead of Him.",
    aboutPeople: "We often want what God can do for us more than we want God.",
    realLife: "When the “free meal” of life runs out, He's still the one thing that genuinely fills you.",
    verse:
      "“I am the bread of life. Whoever comes to me will not be hungry.” — John 6:35",
    reflection: "Be honest: are you chasing God's gifts, or God Himself?",
    prayer: "Jesus, forgive me for wanting Your hands full of gifts more than Your face. Be my bread — fill the hunger nothing else can. Amen.",
    step: "Spend two quiet minutes today wanting God for who He is, not for what He can give you.",
    keyWords: [
      { word: "Bread of life", meaning: "The deepest hunger you have isn't for food, success, or even answers — it's for Him. He's saying: I'm the thing you've actually been starving for." },
      { word: "Remain", meaning: "Not a one-time taste but a staying-close. Real nourishment comes from abiding with Jesus daily, not snacking on Him in a crisis." },
    ],
    verses: [
      { ref: "Matthew 5:6", text: "Blessed are those who hunger and thirst after righteousness, for they shall be filled.", meaning: "The very emptiness you feel might be holy. Spiritual hunger isn't a flaw — it's the appetite that leads you home." },
      { ref: "Psalm 107:9", text: "For he satisfies the longing soul. He fills the hungry soul with good.", meaning: "That longing that nothing seems to fill? God isn't annoyed by it. He's the answer to it." },
    ],
    sideReflection: "What “free meal” have I been chasing, hoping it would fill a hunger only God can satisfy?",
  },

  7: {
    context:
      "Jesus shows up at a big festival and the whole crowd is arguing about Him — is He a good man, a fraud, the Messiah? Everybody has an opinion. Some things never change. This chapter is about the noise of public opinion versus the quiet invitation of Jesus.",
    plainEnglish:
      "At the Festival of Tabernacles, the city is buzzing about Jesus — divided, whispering, taking sides. Religious leaders try to arrest Him; even the guards come back empty-handed, saying no one ever spoke like Him. In the middle of the chaos, Jesus stands up and shouts a simple invitation: if you're thirsty, come to me.",
    aboutGod: "He doesn't win you with arguments; He invites you with living water.",
    aboutPeople: "We waste so much energy debating Jesus from a distance instead of coming close to Him.",
    realLife: "You don't have to settle every question before you come to Jesus thirsty.",
    verse:
      "“If anyone is thirsty, let him come to me and drink!” — John 7:37",
    reflection: "What questions about faith have kept you analyzing from a distance instead of just coming close?",
    prayer: "Jesus, I've debated You long enough. I'm thirsty. I'm coming. Meet me here. Amen.",
    step: "Stop waiting to have it all figured out. Come to Jesus today with one honest, unfinished question.",
    keyWords: [
      { word: "Thirsty", meaning: "Jesus' invitation isn't for people who have it together — it's for the parched, the unsure, the running-on-empty. Thirst is the only ticket you need." },
      { word: "Rivers", meaning: "Not a trickle. Jesus promises that what He pours in doesn't just fill you — it overflows out of you to others. Healing that becomes a current." },
    ],
    verses: [
      { ref: "Revelation 22:17", text: "He who is thirsty, let him come. He who desires, let him take the water of life freely.", meaning: "The very last invitation in the Bible is the same as this one: just come. No cost. No prerequisites. Freely." },
      { ref: "John 7:38", text: "He who believes in me, as the Scripture has said, from within him will flow rivers of living water.", meaning: "What God fills, He intends to flow. Your healing isn't only for you — it becomes hope someone else gets to drink from." },
    ],
    sideReflection: "Am I standing at a distance debating Jesus when He's simply inviting me to come close and drink?",
  },

  8: {
    context:
      "Men drag a woman caught in adultery in front of Jesus, ready to stone her, using her shame as a trap. What Jesus does next is one of the most stunning pictures of grace and dignity in the whole Bible.",
    plainEnglish:
      "The religious leaders throw a humiliated woman at Jesus' feet and demand judgment. Jesus kneels, writes in the dirt, and says, “Whoever has never sinned, throw the first stone.” One by one, they leave. Then He tells her: “I don't condemn you either. Go, and leave your old life.” Later He says, “I am the light of the world.”",
    aboutGod: "He refuses to define you by your worst moment — and He loves you too much to leave you in it.",
    aboutPeople: "We're quick to throw stones at others to feel better about ourselves.",
    realLife: "Grace and a fresh direction come together: you're not condemned, and you're not stuck.",
    verse:
      "“Neither do I condemn you. Go your way. From now on, sin no more.” — John 8:11",
    reflection: "Is there a moment you're still letting define you — that Jesus already refuses to condemn you for?",
    prayer: "Jesus, thank You for not picking up a stone. Lift the shame I keep carrying, and walk me into a new way. Amen.",
    step: "Forgive yourself for one thing today that Jesus has already refused to condemn you for.",
    keyWords: [
      { word: "Condemn", meaning: "To declare someone guilty and finished. Jesus does the opposite — He names the truth without crushing the person. Honest about the sin, gentle with the soul." },
      { word: "Light of the world", meaning: "Light exposes, yes — but it also guides and warms. Jesus' light doesn't shame you into hiding; it shows you the way out." },
    ],
    verses: [
      { ref: "Romans 8:1", text: "There is therefore now no condemnation to those who are in Christ Jesus.", meaning: "Sit with that word: none. Not “less,” not “after you make up for it.” In Christ, the verdict over your life is already love." },
      { ref: "Psalm 103:12", text: "As far as the east is from the west, so far has he removed our transgressions from us.", meaning: "God doesn't file your failures away to bring up later. He removes them — out of sight, out of reach. You can stop carrying what He let go." },
    ],
    sideReflection: "What shame am I still holding that Jesus has already set down on my behalf?",
  },

  9: {
    context:
      "Jesus heals a man born blind — and the religious experts spend the whole chapter interrogating the miracle instead of celebrating it. The man can't explain the theology. He just says the line that's carried doubters for centuries: “I was blind, now I see.”",
    plainEnglish:
      "Jesus heals a man who'd never seen anything. Instead of joy, the leaders launch an investigation, even grilling his parents. They want it to not be true. The healed man can't win the argument, so he just tells his story: “One thing I know — I was blind, and now I see.” Sometimes your testimony is stronger than any debate.",
    aboutGod: "He opens eyes that were never meant to stay closed — and your story becomes His evidence.",
    aboutPeople: "We can be so committed to being right that we miss God working right in front of us.",
    realLife: "You don't need all the answers to share what God has done in you.",
    verse:
      "“One thing I do know: that though I was blind, now I see.” — John 9:25",
    reflection: "What's one “I was blind, now I see” moment in your own life you could name today?",
    prayer: "Jesus, open my eyes to what I've been missing — and give me courage to share what You've already done. Amen.",
    step: "Write down one way God has changed you. That's your testimony — keep it where you'll see it.",
    keyWords: [
      { word: "Sight", meaning: "In John, seeing is never just about eyes — it's about finally perceiving who Jesus is. Some people with perfect vision are the blindest in the room." },
      { word: "Testimony", meaning: "Not a polished argument — just your honest before-and-after. “Here's what He did for me” is something no one can debate away." },
    ],
    verses: [
      { ref: "Psalm 40:2", text: "He brought me up also out of a horrible pit, out of the miry clay. He set my feet on a rock.", meaning: "If God has lifted you out of anything, that rescue is real — even on days the feeling fades. Your feet are on the Rock now." },
      { ref: "1 Peter 2:9", text: "you may proclaim the excellence of him who called you out of darkness into his marvelous light.", meaning: "You were called out of the dark for a reason — to shine a little of that light back for the next person still stuck in it." },
    ],
    sideReflection: "What has God done in me that I could simply, honestly tell someone about — without needing to explain it perfectly?",
  },

  10: {
    context:
      "Jesus calls Himself the Good Shepherd — and in a world full of voices telling you who to be and what to chase, He says His sheep know His voice. This is a chapter about belonging, safety, and being personally known.",
    plainEnglish:
      "Jesus describes a shepherd who knows each sheep by name, leads them to safe pasture, and would die to protect them — unlike hired hands who run when wolves come. Then He says it plainly: “I am the good shepherd. I lay down my life for the sheep.” You're not part of an anonymous flock. You're known.",
    aboutGod: "He knows your name, leads you gently, and lays His life down rather than abandon you.",
    aboutPeople: "We follow a hundred louder voices and wonder why we feel lost.",
    realLife: "In the noise, you can learn to recognize the one Voice that always leads you toward life.",
    verse:
      "“I am the good shepherd. The good shepherd lays down his life for the sheep.” — John 10:11",
    reflection: "Whose voices are loudest in your life right now — and which ones are actually leading you toward peace?",
    prayer: "Good Shepherd, quiet the noise so I can hear You. Lead me — I want to follow Your voice, not the loudest one. Amen.",
    step: "Turn down one loud “voice” today (a feed, a worry, a critic) and make a little space to listen for God's.",
    keyWords: [
      { word: "Good Shepherd", meaning: "Not a distant boss but a present protector who knows you by name. The kind of love that runs toward danger for you, not away from it." },
      { word: "Voice", meaning: "Jesus says His sheep know His voice — gentle, never frantic, always leading toward life. You can learn to tell it apart from fear and shame." },
    ],
    verses: [
      { ref: "Psalm 23:1", text: "Yahweh is my shepherd; I shall lack nothing.", meaning: "The most beloved verse in the Bible is a quiet promise: with God leading you, you have enough. You are cared for, even today." },
      { ref: "John 10:28", text: "I give eternal life to them. They will never perish, and no one will snatch them out of my hand.", meaning: "On the days you can barely hold on to God, remember — He's the one holding on to you. And nothing can pry you loose." },
    ],
    sideReflection: "Which loud voice have I been following lately, and what would it look like to follow the Shepherd's instead?",
  },

  11: {
    context:
      "Jesus' close friend Lazarus dies, and Jesus arrives “too late” — on purpose. Before the most powerful miracle in John, He does something tender: He weeps. This chapter holds both God's power over death and His nearness in grief.",
    plainEnglish:
      "Lazarus is sick; his sisters send for Jesus; Jesus waits two days, and Lazarus dies. When Jesus arrives, Martha is heartbroken and honest: “If you'd been here…” Jesus weeps with them — then calls Lazarus out of the tomb, alive. He says, “I am the resurrection and the life.” He's both Lord over death and present in tears.",
    aboutGod: "He's powerful enough to raise the dead and tender enough to cry at the graveside first.",
    aboutPeople: "We assume God's silence means He doesn't care, when sometimes He's working on a bigger timeline.",
    realLife: "It's okay to be honest with God about “where were You?” — He can hold your grief and your faith at once.",
    verse:
      "“Jesus wept.” — John 11:35",
    reflection: "Where have you felt like God showed up “too late” — and could you tell Him honestly how that felt?",
    prayer: "Jesus, You weep with me before You fix anything — thank You. I'll trust You with the timing I don't understand. Amen.",
    step: "Tell God one honest “where were You?” today. Honesty is not the opposite of faith.",
    keyWords: [
      { word: "Resurrection", meaning: "Jesus doesn't just do resurrection — He is it. Where He is, death doesn't get the last word, and neither do your dead-end situations." },
      { word: "Wept", meaning: "The shortest verse in the Bible may be the most comforting. God doesn't rush your grief or shame your tears. He cries with you first." },
    ],
    verses: [
      { ref: "Psalm 34:18", text: "The Lord is near to those who have a broken heart, and saves those who have a crushed spirit.", meaning: "God is not distant from your pain. He draws closest in the very places you feel most shattered and alone." },
      { ref: "Revelation 21:4", text: "He will wipe away every tear from their eyes. Death will be no more.", meaning: "There's a coming day with no more funerals, no more goodbyes. Your grief is real — and it is not the end of the story." },
    ],
    sideReflection: "What loss or delay am I still quietly angry at God about — and can I bring Him the honest truth of it?",
  },

  12: {
    context:
      "A woman named Mary pours a year's wages of perfume on Jesus' feet and wipes them with her hair — and gets criticized for “wasting” it. Days before the cross, this chapter is about extravagant love versus careful calculation.",
    plainEnglish:
      "At dinner, Mary breaks open expensive perfume and anoints Jesus, filling the room with the scent. Judas complains it was wasteful. Jesus defends her: she gets what's coming and is loving Him while she can. Then He rides into Jerusalem to crowds shouting praise — the same city that will turn on Him in days.",
    aboutGod: "He receives lavish, “impractical” love and calls it beautiful.",
    aboutPeople: "We hold back our devotion, always doing the math on what it'll cost us.",
    realLife: "Love that looks “wasteful” to the world is often exactly what God calls worship.",
    verse:
      "“The house was filled with the fragrance of the ointment.” — John 12:3",
    reflection: "Where have you been cautious with God when He's inviting you to be wholehearted?",
    prayer: "Jesus, I don't want to give You leftovers or do the math. Have my whole heart — even the parts that feel like too much. Amen.",
    step: "Do one “impractical,” wholehearted act of love for God or someone else today, no strings attached.",
    keyWords: [
      { word: "Worship", meaning: "Mary's worship cost her something and held nothing back. Real worship isn't the safe, leftover bit of your life — it's the poured-out, undignified, all-in kind." },
      { word: "Fragrance", meaning: "Devotion has a way of spreading. One person's wholehearted love for Jesus fills the whole room — others can't help but notice." },
    ],
    verses: [
      { ref: "Romans 12:1", text: "present your bodies a living sacrifice, holy, acceptable to God, which is your spiritual service.", meaning: "God isn't after a slice of your life. He's gently asking for all of it — not to take from you, but to make you fully alive." },
      { ref: "Mark 12:30", text: "You shall love the Lord your God with all your heart, all your soul, all your mind, and all your strength.", meaning: "Wholehearted isn't a high bar to clear — it's the freedom of finally not holding back from the One who never held back from you." },
    ],
    sideReflection: "Where am I doing the math with God — measuring the cost — instead of simply loving Him with everything?",
  },

  13: {
    context:
      "On His last night, knowing He'd be betrayed within hours, Jesus does the job of the lowest servant: He washes His friends' dirty feet — including the feet of the man about to betray Him. This is what God's love looks like with a towel in His hands.",
    plainEnglish:
      "At the last supper, Jesus gets up, wraps a towel around His waist, and washes each disciple's feet — the task no one wanted. Peter is horrified. Jesus says, “If I've done this, you do it for each other.” Then He gives a new command: love one another the way I've loved you. He even serves Judas, knowing.",
    aboutGod: "The God of the universe kneels at your feet — that's the kind of love He's after among us.",
    aboutPeople: "We want to be served and noticed; Jesus flips the whole scoreboard.",
    realLife: "Greatness in God's kingdom looks like a towel, not a throne.",
    verse:
      "“A new commandment I give to you, that you love one another, just as I have loved you.” — John 13:34",
    reflection: "Who in your life needs you to “pick up the towel” — to serve them quietly, without applause?",
    prayer: "Jesus, You knelt for me. Make me the kind of person who serves without keeping score. Give me the towel. Amen.",
    step: "Do one quiet act of service today that no one will applaud — and let that be enough.",
    keyWords: [
      { word: "Wash", meaning: "Jesus turns the lowest job into the highest love. Letting Him wash you means letting Him near the parts of you that feel dirty — and serving others means doing the same for them." },
      { word: "New command", meaning: "Not “love” in general — love “as I have loved you.” The standard isn't your feelings; it's His self-giving. That changes everything." },
    ],
    verses: [
      { ref: "Galatians 5:13", text: "through love be servants to one another.", meaning: "Freedom in Christ isn't about getting your way — it's being free enough to put someone else first without losing yourself." },
      { ref: "1 John 4:19", text: "We love him, because he first loved us.", meaning: "You don't have to manufacture love from an empty tank. We love because we were loved first — His love is the source you draw from." },
    ],
    sideReflection: "Where am I waiting to be served when Jesus is inviting me to pick up the towel?",
  },

  14: {
    context:
      "Jesus' friends are scared — He's just told them He's leaving. So He gives them some of the most comforting words ever spoken: don't let your heart be troubled, I'm preparing a place, and I won't leave you alone. This chapter is a balm for an anxious heart.",
    plainEnglish:
      "Sensing their fear, Jesus reassures them: there's room in the Father's house, He's the way there, and He'll send the Helper — the Holy Spirit — so they're never alone. He leaves them a peace the world can't give or take. Less a lecture, more a Father calming a frightened child.",
    aboutGod: "He doesn't dismiss your fear — He meets it with His presence and His peace.",
    aboutPeople: "Our hearts get troubled fast; we need to be told, gently and often, not to be afraid.",
    realLife: "The peace Jesus gives isn't the absence of problems — it's His steadiness in the middle of them.",
    verse:
      "“Peace I leave with you. My peace I give to you... Don't let your heart be troubled, neither let it be fearful.” — John 14:27",
    reflection: "What's troubling your heart today that you could let Jesus' peace settle?",
    prayer: "Jesus, my heart is troubled and You know it. Give me Your peace — the kind that doesn't depend on everything being fixed. Amen.",
    step: "When anxiety spikes today, pause and say, “I'm not alone — His peace is here,” and breathe.",
    keyWords: [
      { word: "Peace", meaning: "Not just calm feelings or a problem-free day, but the steadiness God gives when life still feels unsettled. His peace is a Person near you, not a circumstance going right." },
      { word: "Helper", meaning: "Jesus' name for the Holy Spirit — the constant, with-you presence of God. You were never meant to do faith, or life, on your own." },
    ],
    verses: [
      { ref: "Philippians 4:7", text: "And the peace of God, which surpasses all understanding, will guard your hearts and your thoughts in Christ Jesus.", meaning: "This peace doesn't always make sense — it shows up even when the math says you should be falling apart. That's the point. It guards you." },
      { ref: "Isaiah 26:3", text: "You will keep whoever's mind is steadfast in perfect peace, because he trusts in you.", meaning: "Peace follows your gaze. When your mind keeps turning back to God instead of the fear, steadiness comes — not because life is easy, but because He's trustworthy." },
    ],
    sideReflection: "What am I trying to control today that I could instead trust to a God who offers me His peace?",
  },

  15: {
    context:
      "Jesus uses a picture any of His listeners would know: a grapevine. He's the vine, we're the branches, and the whole secret of a fruitful, non-exhausting life is one word — remain. This is the cure for burnout, faith-style.",
    plainEnglish:
      "Jesus says a branch can't produce grapes by gritting its teeth and trying harder — it just stays connected to the vine, and fruit happens naturally. “Remain in me,” He says, “and you'll bear much fruit. Apart from me you can do nothing.” The Christian life isn't striving harder; it's staying close.",
    aboutGod: "He doesn't want your frantic effort — He wants your connection.",
    aboutPeople: "We burn out trying to produce in our own strength what only closeness to Him can grow.",
    realLife: "Stop white-knuckling your faith. Fruit comes from abiding, not striving.",
    verse:
      "“Remain in me, and I in you... apart from me you can do nothing.” — John 15:4-5",
    reflection: "Where are you trying to produce fruit by sheer willpower instead of staying close to Jesus?",
    prayer: "Jesus, I'm tired of striving. Teach me to remain in You and trust that closeness is what grows real fruit. Amen.",
    step: "Build one small “remaining” habit today — a few minutes with God before you start performing for the world.",
    keyWords: [
      { word: "Remain", meaning: "Also translated “abide” — to stay, settle in, make your home. It's the opposite of hustling for God. You don't earn fruit; you stay close and it grows." },
      { word: "Fruit", meaning: "Not religious achievements you rack up, but the natural overflow of a life connected to Jesus — love, patience, kindness showing up without you forcing it." },
    ],
    verses: [
      { ref: "Jeremiah 17:8", text: "For he will be as a tree planted by the waters, who spreads out its roots by the river... and will not be anxious in the year of drought.", meaning: "Roots into the right source mean you can stay green even in a dry season. Closeness to God is what carries you when life withers." },
      { ref: "Matthew 11:30", text: "For my yoke is easy, and my burden is light.", meaning: "If your faith feels like crushing pressure, that's not the yoke Jesus offers. His way is connection, not exhaustion. You can lay the heavy version down." },
    ],
    sideReflection: "Am I striving to produce a life I'm meant to simply grow — by staying close to the Vine?",
  },

  16: {
    context:
      "Jesus is honest with His friends about what's coming: it's going to be hard. But He doesn't end on the hard part. He ends with a promise that has steadied believers through every storm since: “I have overcome the world.”",
    plainEnglish:
      "Jesus tells the disciples He's leaving, but the Holy Spirit will come and guide them. He warns that following Him will bring real trouble — but says their grief will turn to joy, like the pain of childbirth giving way to new life. His closing line: in this world you'll have trouble, but take heart — I've already won.",
    aboutGod: "He never promised an easy road, but He guarantees the ending.",
    aboutPeople: "We expect faith to remove all our problems and get rattled when it doesn't.",
    realLife: "You can be honest that life is hard and still hold on to the fact that Jesus has overcome.",
    verse:
      "“In the world you have trouble; but cheer up! I have overcome the world.” — John 16:33",
    reflection: "What “trouble” are you facing — and how does it change things to know Jesus has already overcome?",
    prayer: "Jesus, life is hard right now and You said it would be. But You've overcome — so I'll take heart and keep walking. Amen.",
    step: "Name your current “trouble” out loud, then say, “but He has overcome.” Let both be true today.",
    keyWords: [
      { word: "Trouble", meaning: "Jesus never sugarcoats it — following Him doesn't exempt you from pain. But He frames it: trouble is real, and temporary, and already outmatched." },
      { word: "Overcome", meaning: "Past tense. Jesus doesn't say “I might win” — He says it's already done. Whatever you're facing, you're living inside a story that's already been won." },
    ],
    verses: [
      { ref: "Romans 8:37", text: "No, in all these things we are more than conquerors through him who loved us.", meaning: "Not “you'll avoid hard things,” but “you'll come through them held.” In Christ, the struggle doesn't get to define you — His love does." },
      { ref: "2 Corinthians 4:17", text: "For our light affliction, which is for the moment, works for us more and more exceedingly an eternal weight of glory.", meaning: "Your pain is real — and from heaven's view, it's not wasted or final. God is doing something lasting in the middle of what feels unbearable." },
    ],
    sideReflection: "What hard thing am I carrying that I can hold honestly — while still trusting the One who's already overcome?",
  },

  17: {
    context:
      "This whole chapter is Jesus praying — out loud, hours before the cross. And He's not just praying for His disciples. He prays for everyone who would ever believe. That means, two thousand years later, He prayed for you by name-in-spirit. Let that land.",
    plainEnglish:
      "Jesus prays for Himself, then His disciples, then “those who will believe in me through their message” — future believers. He asks the Father to protect them, fill them with joy, and make them one. The last night before His death, His heart is full of the people He's about to die for. Including you.",
    aboutGod: "Before you ever knew Him, you were on His mind and in His prayers.",
    aboutPeople: "We feel forgotten and overlooked, never imagining we're prayed for by Jesus Himself.",
    realLife: "You are not an afterthought to God. You were specifically wanted.",
    verse:
      "“I pray not for these alone, but for those also who believe in me through their word.” — John 17:20",
    reflection: "How does it change your day to know that Jesus prayed for you — for your joy, your protection, your belonging?",
    prayer: "Jesus, You prayed for me before I knew Your name. I'm not forgotten. Thank You for wanting me. Amen.",
    step: "Whenever you feel overlooked today, remember: Jesus prayed for you specifically. Walk in that.",
    keyWords: [
      { word: "One", meaning: "Jesus' deepest prayer for His people is unity — that we'd belong to each other the way He belongs to the Father. You were made for connection, not isolation." },
      { word: "Kept", meaning: "Jesus asks the Father to “keep” us — guard, hold, watch over. You're not white-knuckling your faith alone; you're being kept by Someone stronger." },
    ],
    verses: [
      { ref: "Romans 8:34", text: "Christ Jesus... who is at the right hand of God, who also makes intercession for us.", meaning: "Jesus didn't just pray for you once — He's still doing it, right now. There is a voice in heaven speaking up for you today." },
      { ref: "Zephaniah 3:17", text: "He will rejoice over you with joy. He will calm you in his love. He will rejoice over you with singing.", meaning: "You're not tolerated by God — you're delighted in. He sings over you. Read that again on the days you feel unwanted." },
    ],
    sideReflection: "If I truly believed Jesus prayed for me and delights in me, what fear would lose its grip today?",
  },

  18: {
    context:
      "Jesus is betrayed by a friend and arrested — and quietly, in the same hours, His closest follower Peter denies even knowing Him. Three times. This chapter sits with the painful reality of failure, and sets up the grace that's coming.",
    plainEnglish:
      "Judas leads soldiers to arrest Jesus. Jesus doesn't fight or run; He steps forward willingly. Peter, who swore he'd never abandon Jesus, panics and denies Him three times by a fire. The rooster crows. It's a devastating low — and yet not the end of Peter's story. Hold that thought; it matters for later.",
    aboutGod: "He walks toward the cross on purpose — no one takes His life; He gives it.",
    aboutPeople: "Even our most sincere promises crack under fear; we let people down, and ourselves.",
    realLife: "Your worst failure is not your final word — Jesus already knew and came anyway.",
    verse:
      "“Jesus therefore... went out, and said to them, ‘Who are you looking for?’” — John 18:4",
    reflection: "Where have you “denied” what you believe out of fear — and can you receive that Jesus saw it coming and still loves you?",
    prayer: "Jesus, like Peter, I've failed You when I was afraid. Thank You that my failure isn't the end of my story with You. Amen.",
    step: "Name one fear-driven failure and refuse to let it define you today. Grace is coming — it always is.",
    keyWords: [
      { word: "Denied", meaning: "Peter's collapse reminds us that loving Jesus and failing Him can happen in the same person, the same night. Failure doesn't disqualify you from grace — it's the soil grace grows in." },
      { word: "Willingly", meaning: "Jesus isn't a victim here. He steps forward. The cross isn't something that happens to Him — it's something He chooses, for love of you." },
    ],
    verses: [
      { ref: "Lamentations 3:22", text: "It is because of the Lord's loving kindnesses that we are not consumed, because his compassion doesn't fail.", meaning: "On the mornings after your worst nights, His mercy is already there — fresh, undeserved, waiting. You are not consumed by your failure." },
      { ref: "Psalm 145:14", text: "The Lord upholds all who fall, and raises up all those who are bowed down.", meaning: "Falling isn't the same as being finished. God specializes in lifting the people who can't lift themselves. Let Him." },
    ],
    sideReflection: "What failure am I letting define me, when Jesus saw it all and chose to love me anyway?",
  },

  19: {
    context:
      "This is the hardest chapter — the crucifixion. But don't look away. Everything in John has been building to this moment, and to three words Jesus says from the cross that change everything: “It is finished.”",
    plainEnglish:
      "Jesus is beaten, mocked, and crucified between two criminals. He cares for His mother even while dying. Then He says, “It is finished” — not “I am finished,” but “the work is done.” The debt is paid in full. He gives up His spirit. The worst day in history is also the day your rescue was completed.",
    aboutGod: "He loved you enough to pay a price you could never pay yourself.",
    aboutPeople: "We keep trying to finish a work that's already finished — to earn what's already been bought.",
    realLife: "You can stop striving to pay a debt Jesus already marked “paid in full.”",
    verse:
      "“When Jesus therefore had received the vinegar, he said, ‘It is finished.’” — John 19:30",
    reflection: "What are you still trying to “finish” or earn that Jesus already completed on the cross?",
    prayer: "Jesus, You said “it is finished,” so I don't have to finish it myself. Thank You for paying what I never could. Amen.",
    step: "Let one thing go today that you've been trying to earn from God. It's already paid.",
    keyWords: [
      { word: "It is finished", meaning: "One Greek word — “tetelestai” — stamped on paid bills to mean “paid in full.” Jesus isn't gasping defeat; He's declaring the debt over. Nothing left for you to add." },
      { word: "Lamb", meaning: "Back in chapter 1, John called Jesus “the Lamb of God who takes away sin.” Here it comes true — the sacrifice that ends all sacrifices, given for you." },
    ],
    verses: [
      { ref: "Isaiah 53:5", text: "But he was pierced for our transgressions. He was crushed for our iniquities... and by his wounds we are healed.", meaning: "Your healing was bought at a real cost. The wounds Jesus carried were the ones meant for you — so that mercy, not punishment, would meet you." },
      { ref: "Romans 5:8", text: "But God commends his own love toward us, in that while we were yet sinners, Christ died for us.", meaning: "He didn't wait for you to be worthy. He proved His love at your worst. That's the kind of love holding you right now." },
    ],
    sideReflection: "What am I still trying to pay for that Jesus already stamped “paid in full”?",
  },

  20: {
    context:
      "The tomb is empty. This is the morning everything turns. And notice how the risen Jesus shows up — not to crowds or kings, but to a weeping woman who couldn't find His body, and to a doubter who needed to see. He comes gently, personally.",
    plainEnglish:
      "Mary Magdalene finds the tomb open and breaks down, thinking someone stole the body. Jesus is standing right there; she doesn't recognize Him until He says her name. Later, Thomas refuses to believe until he sees the wounds — and Jesus shows up just for him. The resurrection isn't a rumor; it's personal.",
    aboutGod: "The risen Jesus meets you by name — in your tears and in your doubts.",
    aboutPeople: "We grieve and doubt; Jesus doesn't scold us for it, He meets us in it.",
    realLife: "He still calls people by name. Your doubt doesn't disqualify you from an encounter with Him.",
    verse:
      "“Jesus said to her, ‘Mary.’ She turned and said to him, ‘Rabboni!’” — John 20:16",
    reflection: "Where do you need the risen Jesus to meet you — in grief, in doubt, or just by name?",
    prayer: "Risen Jesus, say my name. Meet me in my doubt and my tears like You met Mary and Thomas. I believe — help my unbelief. Amen.",
    step: "Tell God honestly about one doubt today. He met Thomas in his — He can meet you in yours.",
    keyWords: [
      { word: "Name", meaning: "Mary doesn't recognize the risen Jesus until He speaks her name. That's how personal this is — He knows you not as a face in the crowd, but by name." },
      { word: "Doubt", meaning: "Thomas gets a bad rap, but Jesus didn't reject him for needing proof — He came and offered His hands. Honest doubt brought to Jesus becomes faith." },
    ],
    verses: [
      { ref: "Isaiah 43:1", text: "Don't be afraid, for I have redeemed you. I have called you by your name. You are mine.", meaning: "Long before the empty tomb, God was already saying it: you're known, you're claimed, you're His. The resurrection just proves He meant it." },
      { ref: "Psalm 30:5", text: "Weeping may stay for the night, but joy comes in the morning.", meaning: "Mary's worst night gave way to the best morning. Whatever night you're in, morning is part of God's pattern. Tears are not the final scene." },
    ],
    sideReflection: "Where am I weeping or doubting right now — and could I let the risen Jesus meet me there by name?",
  },

  21: {
    context:
      "John's last chapter is breakfast on a beach. The risen Jesus cooks for the friends who abandoned Him — and gently restores Peter, the one who denied Him three times, with three chances to say “I love You.” This is what grace does with our failures.",
    plainEnglish:
      "The disciples go back to fishing, catch nothing, and a stranger on the shore tells them where to cast — suddenly the nets are full. It's Jesus, with breakfast ready. Then He takes Peter aside and asks three times, “Do you love me?” — one for each denial — and recommissions him: “Feed my sheep.” No lecture. Just restoration.",
    aboutGod: "He doesn't just forgive your failure — He gives you your purpose back.",
    aboutPeople: "We assume failure benches us for good; Jesus puts us back in the game.",
    realLife: "Your worst moment doesn't end your calling — Jesus restores and sends.",
    verse:
      "“Jesus said to him, ‘Feed my sheep.’” — John 21:17",
    reflection: "Where have you counted yourself out because of a failure that Jesus is ready to restore?",
    prayer: "Jesus, You made breakfast for the ones who ran. Restore me like You restored Peter — and give me my purpose back. Amen.",
    step: "Step back into one thing you quit on after a failure. Grace is an invitation to begin again.",
    keyWords: [
      { word: "Restore", meaning: "Jesus doesn't just pardon Peter — He rebuilds him and hands his calling back. With God, forgiveness and a fresh purpose come together." },
      { word: "Do you love me?", meaning: "Three questions to undo three denials. Jesus heals our failures not by replaying our shame, but by inviting us to love Him again, today." },
    ],
    verses: [
      { ref: "Joel 2:25", text: "I will restore to you the years that the swarming locust has eaten.", meaning: "God is in the business of giving back what shame, sin, and time stole. The wasted years are not beyond His reach to redeem." },
      { ref: "Philippians 1:6", text: "being confident of this very thing, that he who began a good work in you will complete it.", meaning: "God doesn't start things in you and quit. Your failures don't cancel His project — He finishes what He begins, and that includes you." },
    ],
    sideReflection: "What have I counted myself out of that Jesus might be standing on the shore, ready to restore?",
  },

  22: {
    context:
      "After the gospels showed you who Jesus is, Romans explains why it all matters — written by Paul, a man so changed by grace he went from hunting Christians to dying for the faith. Chapter 1 opens with his bold thesis: this good news is God's power to rescue anyone.",
    plainEnglish:
      "Paul says he's “not ashamed” of the gospel — because it's not advice, it's power. Then he describes what happens when people push God out: they don't become free, they just trade the Creator for cheaper things and slowly come apart. It's less a finger-wag and more a doctor's honest diagnosis.",
    aboutGod: "He's strong enough to save anyone — no past is too far gone for His power.",
    aboutPeople: "We're all wired to worship something; when it's not God, it quietly runs us into the ground.",
    realLife: "Whatever you've made “god” in your life, it can't carry the weight only God can.",
    verse:
      "“For I am not ashamed of the Good News... for it is the power of God for salvation for everyone who believes.” — Romans 1:16",
    reflection: "What have you been looking to — besides God — to give you worth, safety, or peace?",
    prayer: "God, I've handed Your place to smaller things. Take it back. Be the One I actually build my life on. Amen.",
    step: "Name one “small g” god you've been leaning on, and consciously hand that spot back to God today.",
    keyWords: [
      { word: "Gospel", meaning: "Literally “good news” — not “try harder,” but an announcement of what God already did. It's the power that rescues, not a to-do list that exhausts." },
      { word: "Righteousness", meaning: "Being made right with God — not by your performance, but received as a gift. It's a standing you're given, not a score you earn." },
    ],
    verses: [
      { ref: "2 Timothy 1:7", text: "For God didn't give us a spirit of fear, but of power, love, and self-control.", meaning: "Whatever fear is loud in you today, it didn't come from God. He hands you power, love, and a steady mind instead." },
      { ref: "Psalm 62:5", text: "My soul, wait in silence for God alone, for my expectation is from him.", meaning: "Rest comes when your hope stops bouncing between lesser things and settles on God alone. He's a foundation that holds." },
    ],
    sideReflection: "Where am I quietly ashamed of my faith — and what would it look like to stop hiding it today?",
  },

  23: {
    context:
      "Romans 2 is uncomfortable in a good way: Paul turns to the religious crowd — the people sure they're fine — and says judgment isn't just for “those sinners.” The point isn't to crush you. It's to level the ground so everyone needs the same grace.",
    plainEnglish:
      "Paul warns the self-righteous: don't judge others for what you secretly do too. God sees the heart, not the highlight reel. And here's the surprise — it's God's kindness, not His anger, that actually melts people and turns them around.",
    aboutGod: "He's perfectly fair, and stunningly kind — His goodness is what draws hearts home.",
    aboutPeople: "We're quick to spot others' sin and slow to see our own.",
    realLife: "You don't get changed by being shamed — you get changed by being loved.",
    verse:
      "“...not knowing that the kindness of God leads you to repentance?” — Romans 2:4",
    reflection: "Where have you believed God is mostly disappointed in you — when His kindness is what's been pursuing you?",
    prayer: "God, thank You that Your kindness — not Your anger — is what's been drawing me. Soften the places I've gone hard. Amen.",
    step: "Drop the judgment you've been holding toward one person today. Extend the grace you've been given.",
    keyWords: [
      { word: "Kindness", meaning: "Not God overlooking wrong, but God being gentle enough with us that we finally feel safe to turn around. His kindness disarms what His anger never could." },
      { word: "Repentance", meaning: "Not groveling — just turning. A change of direction, walking back toward the God who's been kind to you the whole time." },
    ],
    verses: [
      { ref: "Joel 2:13", text: "Tear your heart and not your garments... for he is gracious and merciful, slow to anger, and abundant in loving kindness.", meaning: "God isn't after a dramatic performance of sorrow. He wants your real heart — and He's far more patient and tender than you fear." },
      { ref: "Matthew 7:1", text: "Don't judge, so that you won't be judged.", meaning: "The grace you withhold from others has a way of hardening you. Letting people off the hook keeps your own heart soft." },
    ],
    sideReflection: "Who am I judging right now — and have I forgotten how much grace I've been handed myself?",
  },

  24: {
    context:
      "This is the great leveler of the whole Bible: everyone has fallen short, and everyone is offered the same free grace. If you've ever felt “too far gone” or secretly “better than most,” Romans 3 meets you both in the same place.",
    plainEnglish:
      "Paul lands the verdict: no one is good enough on their own — “all have sinned.” But he doesn't stop at bad news. The very next breath is the best news: we're “justified freely by his grace” through Jesus. The gap we could never close, God closed Himself.",
    aboutGod: "He's both perfectly just and the one who justifies — He didn't lower the standard, He met it for us.",
    aboutPeople: "We swing between “I'm fine” and “I'm hopeless” — the truth is we're all loved sinners.",
    realLife: "You can stop pretending you've earned it. It was always a gift.",
    verse:
      "“for all have sinned, and fall short of the glory of God; being justified freely by his grace through the redemption that is in Christ Jesus.” — Romans 3:23-24",
    reflection: "Are you exhausted from trying to be “good enough”? What if it's already been handled?",
    prayer: "God, I've been striving to earn what You freely give. I receive it today — grace, not a grade. Thank You. Amen.",
    step: "Each time you catch yourself “earning” God's love today, pause and whisper: “freely given.”",
    keyWords: [
      { word: "Justified", meaning: "A courtroom word: declared “not guilty” — and even “in right standing.” Not because you're innocent, but because Jesus took your place. The gavel already fell, in your favor." },
      { word: "Redemption", meaning: "To buy back, to set free. You were bought back at a price — not because you were cheap, but because to God you were worth everything." },
    ],
    verses: [
      { ref: "Ephesians 2:8", text: "for by grace you have been saved through faith, and that not of yourselves; it is the gift of God.", meaning: "Read it slowly: a gift. Not wages, not a reward. You receive it the way you receive any gift — with open hands, not a résumé." },
      { ref: "Titus 3:5", text: "not by works of righteousness which we did ourselves, but according to his mercy, he saved us.", meaning: "Your salvation never rested on your performance. It rests on His mercy — which means a bad week can't undo it." },
    ],
    sideReflection: "Where am I still trying to be “good enough” for God instead of receiving what's free?",
  },

  25: {
    context:
      "Paul reaches way back to Abraham to prove grace isn't a New Testament invention — God has always counted faith, not flawless behavior, as what makes us right with Him. This chapter is for anyone who thinks faith means having it all figured out.",
    plainEnglish:
      "Abraham simply believed God's promise, and God “credited it to him as righteousness” — before he'd done anything to deserve it. Paul's point: it was never about rule-keeping. It's about trusting the God who keeps promises, even when the math doesn't add up yet.",
    aboutGod: "He counts your trust as treasure — He'd rather have your faith than your flawless record.",
    aboutPeople: "We think God wants our performance; He wants our trust.",
    realLife: "Faith isn't certainty about everything — it's trusting the One who promised.",
    verse:
      "“He didn't waver through unbelief... being fully assured that what he had promised, he was also able to perform.” — Romans 4:20-21",
    reflection: "What promise of God's are you struggling to trust because you can't yet see how it works out?",
    prayer: "God, I don't have it all figured out, but I trust You. Count my shaky faith as enough, the way You did Abraham's. Amen.",
    step: "Name one area you've been trying to control, and choose to trust God with it for today.",
    keyWords: [
      { word: "Credited", meaning: "An accounting term — God “deposits” righteousness into your account on the basis of faith. You didn't earn the balance; He put it there." },
      { word: "Faith", meaning: "Not pretending to feel certain — trusting a trustworthy God with what you can't yet see. Abraham's faith wasn't tidy; it just kept leaning on God." },
    ],
    verses: [
      { ref: "Proverbs 3:5", text: "Trust in Yahweh with all your heart, and don't lean on your own understanding.", meaning: "You don't have to understand the whole plan to trust the One who does. Leaning on Him is the rest your over-thinking has been missing." },
      { ref: "Hebrews 11:1", text: "Now faith is assurance of things hoped for, proof of things not seen.", meaning: "Faith isn't the absence of unknowns — it's confidence in God in the middle of them. You can hold trust and questions at the same time." },
    ],
    sideReflection: "Where am I leaning on my own understanding instead of trusting the God who keeps His promises?",
  },

  26: {
    context:
      "Romans 5 holds one of the most staggering sentences in the Bible about how and when God loved us — and then it does something surprising with our suffering. This is a chapter for weary, struggling people.",
    plainEnglish:
      "Because we're made right with God, we have peace with Him — the war is over. Then Paul says the line that levels everyone: Christ died for us “while we were still sinners,” not after we cleaned up. He even reframes suffering: it's not wasted; God grows perseverance, character, and hope out of it.",
    aboutGod: "He loved you at your worst — His love was never a response to your performance.",
    aboutPeople: "We assume love must be earned; God proved His before we'd done a thing.",
    realLife: "Your hard season isn't pointless — God is growing something durable in it.",
    verse:
      "“But God commends his own love toward us, in that while we were yet sinners, Christ died for us.” — Romans 5:8",
    reflection: "Can you believe God loved you at your worst — not the cleaned-up version, but the real you?",
    prayer: "Jesus, You died for me before I deserved a thing. Let that love settle the fight in me. Use even this hard season. Amen.",
    step: "When suffering tempts you to despair today, name one thing God might be growing in you through it.",
    keyWords: [
      { word: "Peace with God", meaning: "Not just calm feelings — the war is actually over. You're no longer on the outs with God, striving to get back in His good graces. You're already in." },
      { word: "Perseverance", meaning: "The strength that only grows under weight. God doesn't waste your hard seasons; He's forging something in you that comfort never could." },
    ],
    verses: [
      { ref: "James 1:2", text: "Count it all joy, my brothers, when you fall into various temptations.", meaning: "Not “fake happiness about pain,” but trust that the hard thing isn't meaningless. God is doing real work in the middle of it." },
      { ref: "Romans 5:5", text: "and hope doesn't disappoint us, because God's love has been poured out into our hearts.", meaning: "Hope in God won't leave you embarrassed. His love isn't a trickle into your heart — it's poured out, more than enough for today." },
    ],
    sideReflection: "What suffering am I tempted to call pointless that God might be using to grow something in me?",
  },

  27: {
    context:
      "If grace is really free, won't people just abuse it? Paul tackles that head-on in Romans 6. Spoiler: grace doesn't make you want to sin more — it sets you free from the thing that was killing you.",
    plainEnglish:
      "Paul says when you came to Jesus, your old self “died” and you were raised to a brand-new life — so why crawl back into the grave? Sin isn't a fun freedom you're missing out on; it's a slavery Jesus broke you out of. Grace isn't permission to stay stuck. It's the power to walk out.",
    aboutGod: "He doesn't just forgive your sin — He breaks its grip so it's no longer your master.",
    aboutPeople: "We confuse our chains for freedom and our freedom for loss.",
    realLife: "You're not who you used to be — you don't have to keep living like it.",
    verse:
      "“For the wages of sin is death, but the free gift of God is eternal life in Christ Jesus our Lord.” — Romans 6:23",
    reflection: "What old pattern keeps pulling you back to a “grave” Jesus already raised you out of?",
    prayer: "Jesus, I'm not who I was — help me stop living like it. Break sin's grip and walk me into the new life You bought. Amen.",
    step: "Identify one “old self” habit and take one concrete step today to walk in your new life instead.",
    keyWords: [
      { word: "Dead to sin", meaning: "Not that you'll never be tempted, but that sin no longer owns you. You can finally say no to what used to call the shots." },
      { word: "New life", meaning: "Not a tidied-up version of the old you — a genuinely new self, raised with Christ. Your past doesn't get to define your present." },
    ],
    verses: [
      { ref: "Galatians 5:1", text: "Stand firm therefore in the liberty by which Christ has made us free, and don't be entangled again with a yoke of bondage.", meaning: "Jesus didn't free you so you'd crawl back into chains. The freedom is real — you're allowed to live like it." },
      { ref: "2 Corinthians 5:17", text: "if anyone is in Christ, he is a new creation. The old things have passed away.", meaning: "When shame whispers “you'll never change,” this is your answer: in Christ, you already have. The old is gone." },
    ],
    sideReflection: "What chain have I mistaken for freedom — and what would walking in my new life actually look like?",
  },

  28: {
    context:
      "Romans 7 is the most honest chapter about the war inside every believer. If you've ever thought “why do I keep doing the thing I hate?” — Paul wrote this one for you. You're not crazy, and you're not alone.",
    plainEnglish:
      "Paul, an apostle, openly confesses the struggle: “I don't do the good I want to do — I do the very thing I hate.” He names the exhausting tug-of-war between knowing what's right and actually living it. Then, at his lowest cry — “who will rescue me?” — he answers his own question: Jesus.",
    aboutGod: "He's not shocked by your struggle — and He's already the rescue you keep needing.",
    aboutPeople: "We're all fighting battles inside that we'd be embarrassed to admit.",
    realLife: "The struggle doesn't disqualify you. The struggle is proof you're alive and fighting.",
    verse:
      "“What a wretched man I am! Who will deliver me...? Thanks be to God through Jesus Christ our Lord!” — Romans 7:24-25",
    reflection: "What's the inner battle you keep losing — and have you brought it honestly to Jesus, or just hidden it?",
    prayer: "Jesus, I keep doing what I hate and it wears me out. Thank You that You're my rescue, not my judge. Help me. Amen.",
    step: "Stop hiding one private struggle. Confess it honestly to God — and, if you can, one safe person.",
    keyWords: [
      { word: "Wretched", meaning: "Paul's raw word for the exhaustion of trying and failing. Naming the struggle honestly isn't weakness — it's the doorway to grace." },
      { word: "Deliver", meaning: "To rescue someone who can't rescue themselves. The answer to your inner war was never “try harder” — it's a Person who pulls you out." },
    ],
    verses: [
      { ref: "Psalm 40:1", text: "I waited patiently for Yahweh. He turned to me, and heard my cry.", meaning: "Your honest cry doesn't annoy God — it moves Him. He turns toward the struggling, not away from them." },
      { ref: "Hebrews 4:16", text: "Let's therefore draw near with boldness to the throne of grace, that we may receive mercy and find grace for help in time of need.", meaning: "You don't have to clean up before you come. Come mid-struggle, boldly — mercy is exactly what's waiting." },
    ],
    sideReflection: "What battle am I hiding out of shame, when honesty is the very thing that lets grace in?",
  },

  29: {
    context:
      "This is the mountaintop of Romans — maybe of the whole New Testament. Romans 8 begins with “no condemnation” and ends with “nothing can separate you from God's love.” If you only memorize one chapter all year, let it be this one.",
    plainEnglish:
      "Paul declares there is now zero condemnation for those in Christ — the guilty verdict is gone. The Spirit lives in you, helps you, even prays for you when you have no words. And he ends with a promise that has carried people through every dark night: nothing — not failure, fear, or death — can separate you from God's love.",
    aboutGod: "His love for you is unbreakable, unloseable, and stronger than anything that scares you.",
    aboutPeople: "We live braced for rejection; God says nothing can pull you out of His hand.",
    realLife: "On your worst day, the verdict over your life is still: loved, kept, not condemned.",
    verse:
      "“For I am persuaded that neither death, nor life... will be able to separate us from God's love which is in Christ Jesus our Lord.” — Romans 8:38-39",
    reflection: "What have you feared could separate you from God's love — and can you believe today that nothing can?",
    prayer: "God, there is no condemnation for me and nothing can separate me from Your love. Let that truth go all the way down. Amen.",
    step: "Write Romans 8:1 — “no condemnation” — somewhere you'll see it, and read it whenever shame speaks.",
    keyWords: [
      { word: "No condemnation", meaning: "Not “less” condemnation — none. The case against you is closed. You can stop living braced for God's disappointment." },
      { word: "More than conquerors", meaning: "Not that you avoid hard things, but that you come through them held. The struggle doesn't get the last word — His love does." },
    ],
    verses: [
      { ref: "Romans 8:28", text: "We know that all things work together for good for those who love God.", meaning: "Not that everything is good — but that nothing is wasted. God weaves even the hard threads into something good you can't see yet." },
      { ref: "Zephaniah 3:17", text: "He will rejoice over you with joy. He will calm you in his love. He will rejoice over you with singing.", meaning: "You're not merely tolerated by God — you're delighted in. He sings over you. Let that be louder than the shame today." },
    ],
    sideReflection: "What fear keeps telling me I could lose God's love — and what changes if I believe nothing can separate me from it?",
  },

  30: {
    context:
      "Romans 9 is a heavier chapter — Paul wrestles with God's sovereignty and grieves for people he loves who don't yet know Jesus. It's okay if some of it is hard to understand. The heart underneath it is mercy.",
    plainEnglish:
      "Paul is heartbroken over his own people who've missed Jesus — he'd trade his own salvation for theirs. He wrestles with the big question of why God chooses and shows mercy as He does, and lands on this: salvation rests on God's mercy, not human effort or merit. We're all here by grace.",
    aboutGod: "He is sovereign and merciful — both bigger than we can grasp and kinder than we deserve.",
    aboutPeople: "We want to earn our place; mercy means we never could and never had to.",
    realLife: "If you're in, it's mercy. So carry that mercy gently toward everyone still outside.",
    verse:
      "“So then it is not of him who wills, nor of him who runs, but of God who has mercy.” — Romans 9:16",
    reflection: "Who do you carry a heavy heart for — and have you brought them honestly to God?",
    prayer: "God, Your ways are bigger than mine. Thank You for the mercy I didn't earn. Soften my heart for those who don't know You yet. Amen.",
    step: "Pray by name today for one person you long to see come to know God's mercy.",
    keyWords: [
      { word: "Mercy", meaning: "Not getting the bad we've earned. Everything good in your standing with God traces back to mercy — which is exactly why it can't be bragged about, only shared." },
      { word: "Sovereign", meaning: "God is in charge in ways we can't fully map. That can feel heavy — but a sovereign God who is also merciful is the safest place your story could land." },
    ],
    verses: [
      { ref: "Lamentations 3:22", text: "It is because of Yahweh's loving kindnesses that we are not consumed, because his compassion doesn't fail.", meaning: "The reason you're still standing isn't your strength — it's His mercy, fresh again this morning, never running out." },
      { ref: "2 Peter 3:9", text: "The Lord is... patient with us, not wishing that any should perish, but that all should come to repentance.", meaning: "God's patience with the people you're praying for is even greater than yours. He's not done pursuing them." },
    ],
    sideReflection: "Whose name do I need to keep bringing to a merciful God — including, maybe, my own?",
  },

  31: {
    context:
      "After the heavy questions of chapter 9, Romans 10 opens the door wide: the same Lord is generous to everyone who calls on Him. No insider status required. This is one of the clearest “how do I actually come to God?” chapters in the Bible.",
    plainEnglish:
      "Paul says salvation isn't earned by religious effort — it's as close as your own mouth and heart: believe Jesus is Lord, trust that God raised Him, and call on Him. “Everyone who calls” — no exceptions, no fine print. And faith grows by hearing the good news, which is why telling it matters.",
    aboutGod: "He's near and generous — close enough to call on, rich enough for everyone.",
    aboutPeople: "We assume there's a secret password; the door is simply “call on Him.”",
    realLife: "Whatever your background, you qualify. The invitation includes you.",
    verse:
      "“For ‘whoever will call on the name of the Lord will be saved.’” — Romans 10:13",
    reflection: "Is there a part of you that still believes you don't quite qualify for God's grace?",
    prayer: "Lord, thank You that “whoever” includes me. I call on You today — no password, no résumé. Just You. Amen.",
    step: "Say a simple, out-loud prayer today, “Jesus, I'm calling on You” — and share the invitation with someone.",
    keyWords: [
      { word: "Whoever", meaning: "The most inclusive word in the gospel. Not the qualified, the polished, or the deserving — whoever. That word was put there on purpose to include you." },
      { word: "Confess", meaning: "To say out loud what you believe — “Jesus is Lord.” Faith isn't only private; speaking it makes it real and roots it deeper." },
    ],
    verses: [
      { ref: "Acts 2:21", text: "It will be that whoever will call on the name of the Lord will be saved.", meaning: "The very first sermon of the church said the same thing: just call. The door God opened has never once been shut on the honest." },
      { ref: "Isaiah 55:1", text: "Come, everyone who thirsts, to the waters!", meaning: "God's invitation has no entry fee. If you're thirsty, you're invited — that's the whole requirement." },
    ],
    sideReflection: "What lie tells me I don't quite qualify — and what would it mean to simply call on God today?",
  },

  32: {
    context:
      "Romans 11 ends Paul's deep section on God's plan with worship instead of answers. After chapters of wrestling, he basically throws up his hands and says: God's wisdom is too deep to fully figure out — and that's good news.",
    plainEnglish:
      "Paul shows that God's mercy is wider than anyone expected — He “grafts in” outsiders like a wild branch onto a healthy tree, and He's not finished with anyone. Then Paul stops explaining and starts praising: God's wisdom and ways are deeper than we can trace. Sometimes worship is the wisest response to mystery.",
    aboutGod: "His plans are deeper than your understanding — and that depth is a comfort, not a threat.",
    aboutPeople: "We want every answer; peace often comes from trusting the One who has them.",
    realLife: "You don't have to figure everything out to worship the God who has.",
    verse:
      "“Oh the depth of the riches both of the wisdom and the knowledge of God! How unsearchable are his judgments...” — Romans 11:33",
    reflection: "What unanswered question are you holding — and could you bring it to God as worship instead of worry?",
    prayer: "God, I don't understand everything, and I don't have to. You're deeper and wiser than my questions. I trust You. Amen.",
    step: "Take one nagging “why?” today and turn it into a moment of worship instead of anxiety.",
    keyWords: [
      { word: "Grafted in", meaning: "A picture of being joined to God's family even though you started as an outsider. You don't belong because of your roots — you belong because of His mercy." },
      { word: "Unsearchable", meaning: "Some of God's ways are too deep to fully map — and that's a comfort. A God you could completely figure out would be too small to trust with your life." },
    ],
    verses: [
      { ref: "Isaiah 55:9", text: "For as the heavens are higher than the earth, so are my ways higher than your ways.", meaning: "When God's plan doesn't match yours, it isn't a flaw — it's a sign He sees more. Higher ways are exactly what you'd want from God." },
      { ref: "Proverbs 3:6", text: "In all your ways acknowledge him, and he will make your paths straight.", meaning: "You don't have to see the whole road. Keep turning to Him, and He straightens the path one faithful step at a time." },
    ],
    sideReflection: "What question am I demanding an answer to that God might be inviting me to simply trust Him with?",
  },

  33: {
    context:
      "Romans shifts here from “what God did” to “so how do I live?” Chapter 12 is the hinge — and it doesn't start with rules. It starts with offering your whole self to God in response to His mercy. Everything practical flows from that.",
    plainEnglish:
      "Paul says: in light of all that mercy, offer your everyday life to God as worship. Don't let the world squeeze you into its mold — let God reshape how you think from the inside out. Then comes a rapid-fire list of what love actually looks like: serve, bless, forgive, don't repay evil with evil.",
    aboutGod: "He wants your real, daily self — not a religious performance once a week.",
    aboutPeople: "We get quietly conformed to the world's thinking without noticing.",
    realLife: "Transformation starts in the mind — guard what's renewing it.",
    verse:
      "“Don't be conformed to this world, but be transformed by the renewing of your mind.” — Romans 12:2",
    reflection: "What's been shaping your thinking most lately — and is it forming you into who God made you to be?",
    prayer: "God, renew my mind. Reshape the way I think so my everyday life becomes worship back to You. Amen.",
    step: "Swap one mind-shaping input today (a feed, a show, a worry-spiral) for something that renews you in God.",
    keyWords: [
      { word: "Living sacrifice", meaning: "Not a one-time dramatic gesture but a daily yielding — your ordinary life, offered up. The hard part of a living sacrifice is that it keeps wanting to climb off the altar; grace keeps inviting you back." },
      { word: "Renewing", meaning: "Real change starts upstream, in how you think. God reshapes your mind, and your life follows — which is why what you feed your mind matters so much." },
    ],
    verses: [
      { ref: "Philippians 4:8", text: "whatever things are true... noble... pure... lovely... think about these things.", meaning: "Your mind becomes what it keeps chewing on. Aim your attention at what's good, and watch your inner world slowly heal." },
      { ref: "2 Corinthians 10:5", text: "bringing every thought into captivity to the obedience of Christ.", meaning: "You're not at the mercy of every thought that storms in. You get to take the lie captive and hand the mic back to truth." },
    ],
    sideReflection: "What thought pattern keeps forming me into the world's mold — and what truth could renew it?",
  },

  34: {
    context:
      "Romans 13 covers how faith touches the public square — government, neighbors, daily conduct — and then pulls it all back to one word that fulfills everything: love. It's about living wide awake in how you treat people.",
    plainEnglish:
      "Paul says to live with integrity toward those in authority and to owe no one anything except love. Why? Because love already fulfills every command — you can't truly love your neighbor and harm them at the same time. He ends with a wake-up call: live in the light, “put on” Christ like clothing.",
    aboutGod: "He measures a faithful life less by what we avoid and more by how we love.",
    aboutPeople: "We can keep all the rules and still miss the whole point: love.",
    realLife: "If love is the goal, your faith gets tested in how you treat the person in front of you.",
    verse:
      "“Owe no one anything, except to love one another; for he who loves his neighbor has fulfilled the law.” — Romans 13:8",
    reflection: "Where is your faith strong on “rules” but weak on actually loving someone in front of you?",
    prayer: "God, I don't want to just avoid wrong — I want to love well. Make my love the proof of my faith today. Amen.",
    step: "Do one concrete act of love today for someone it'd be easier to ignore.",
    keyWords: [
      { word: "Love", meaning: "Paul's shorthand for the whole point. You can technically keep the rules and still wound people — but you can't genuinely love someone and harm them. Love is the rule under all the rules." },
      { word: "Put on Christ", meaning: "Like getting dressed each morning, you choose to “wear” His character — His patience, His kindness — into the day. It's a daily decision, not a one-time download." },
    ],
    verses: [
      { ref: "1 Corinthians 13:4", text: "Love is patient and is kind... doesn't seek its own way, is not provoked.", meaning: "When “love” feels fuzzy, this is the checklist. Patient, kind, slow to take offense — that's the love you've been given, and the love you get to give." },
      { ref: "1 John 3:18", text: "let's not love in word only, or with the tongue only, but in deed and truth.", meaning: "Love that stays theoretical isn't quite love yet. The smallest concrete act of kindness says more than the most beautiful words." },
    ],
    sideReflection: "Who in my life needs love in action from me today — not just in theory?",
  },

  35: {
    context:
      "Romans 14 is about how we treat fellow believers who see secondary things differently. In a divided, opinion-loud world, this chapter is a gentle masterclass in holding your convictions without crushing other people.",
    plainEnglish:
      "Some early Christians argued over food and special days. Paul's counsel is striking: stop judging each other over disputable matters. We each answer to God, not to one another's preferences. Make the goal peace and building people up, not winning the argument.",
    aboutGod: "He's the only true Judge — which frees us from playing that role with each other.",
    aboutPeople: "We elevate our preferences into tests of who's really faithful.",
    realLife: "You can hold a conviction firmly and still treat someone gently who disagrees.",
    verse:
      "“So who are you who judge another's servant?... Therefore let's not judge one another anymore.” — Romans 14:4,13",
    reflection: "Where have you let a secondary issue become a wall between you and another believer?",
    prayer: "God, You're the Judge, not me. Help me hold my convictions with humility and treat those who differ with grace. Amen.",
    step: "Choose peace over being right in one conversation today. Build the person up instead of winning.",
    keyWords: [
      { word: "Disputable", meaning: "Matters Scripture doesn't nail down, where sincere believers land differently. Paul says: hold these loosely, and hold people gently." },
      { word: "Build up", meaning: "The goal isn't to win — it's to leave the other person stronger. Ask not “am I right?” but “did that help them?”" },
    ],
    verses: [
      { ref: "Romans 14:19", text: "So then, let's follow after things which make for peace, and things by which we may build one another up.", meaning: "Aim at peace on purpose. Most arguments aren't worth the closeness they cost — choose the relationship over the win." },
      { ref: "Colossians 3:13", text: "bearing with one another, and forgiving each other... Even as Christ forgave you, so you also do.", meaning: "The grace you've received sets the bar for the grace you give. Bear with people the patient way God has borne with you." },
    ],
    sideReflection: "Where am I making a secondary issue a wall — and could I choose peace and grace instead?",
  },

  36: {
    context:
      "As Romans winds down, Paul lands on the heart of community: accept one another the way Christ accepted you. And he leaves them with a blessing so warm it's worth memorizing — a benediction of hope, joy, and peace.",
    plainEnglish:
      "Paul urges the strong to carry the weak, and everyone to welcome each other the way Jesus welcomed them — no merit test. He shares his mission heart, then prays one of Scripture's most beautiful blessings: that the God of hope would fill them with joy and peace so they'd overflow with hope by the Spirit's power.",
    aboutGod: "He's the God of hope — and He means to fill you, not just inform you.",
    aboutPeople: "We accept others conditionally; Christ accepted us before we earned it.",
    realLife: "Welcome someone the way you've been welcomed — fully, freely, first.",
    verse:
      "“Now may the God of hope fill you with all joy and peace in believing, that you may abound in hope...” — Romans 15:13",
    reflection: "Who needs to be “welcomed” by you — fully accepted — the way Christ welcomed you?",
    prayer: "God of hope, fill me with joy and peace as I trust You, until I overflow with hope onto everyone around me. Amen.",
    step: "Welcome one person today — really welcome them — without making them earn it first.",
    keyWords: [
      { word: "Accept", meaning: "To fully welcome, not merely tolerate. Christ didn't wait for you to be impressive before He took you in — and that's the bar for how we receive each other." },
      { word: "Hope", meaning: "Not wishful thinking, but confident expectation rooted in God. He's literally called “the God of hope” — He's the source you keep refilling from." },
    ],
    verses: [
      { ref: "Romans 15:7", text: "Therefore accept one another, as Christ also accepted you, to the glory of God.", meaning: "The way you were received by Jesus — fully, before you cleaned up — is exactly how He's asking you to receive the people around you." },
      { ref: "Jeremiah 29:11", text: "‘For I know the thoughts that I think toward you,’ says Yahweh, ‘thoughts of peace, and not of evil, to give you hope and a future.’", meaning: "God's thoughts toward you are good. Whatever this season holds, His intention is a future and a hope — not your harm." },
    ],
    sideReflection: "Where am I making someone earn my acceptance, when Christ gave me His for free?",
  },

  37: {
    context:
      "Romans ends not with theology but with a long list of names — the ordinary people behind the mission. It's a quiet reminder that the gospel travels on real, everyday people, and that you're one of them.",
    plainEnglish:
      "Paul greets dozens of friends and co-workers by name — men and women, well-known and unknown — thanking them for their part. It's a love letter to the unglamorous, faithful people who carried the early church. Then he ends with grace, the same way he began: it's all grace, start to finish.",
    aboutGod: "He builds His kingdom through ordinary, named, noticed people — including you.",
    aboutPeople: "We think we're too small to matter; God writes our names into the story.",
    realLife: "Your quiet faithfulness counts more than you know — God sees and names it.",
    verse:
      "“Now to him who is able to establish you according to my Good News... to the only wise God, through Jesus Christ, to whom be the glory forever.” — Romans 16:25,27",
    reflection: "Do you believe your small, faithful part actually matters to God's bigger story?",
    prayer: "God, thank You that You know my name and use ordinary people like me. Make my quiet faithfulness count for You. Amen.",
    step: "Thank one “behind-the-scenes” person in your life today — and take heart that your own hidden faithfulness matters.",
    keyWords: [
      { word: "Greet", meaning: "Paul's long roll-call of names shows the gospel isn't carried by celebrities but by everyday, faithful people. God notices the ones the world overlooks." },
      { word: "Grace", meaning: "Romans opens and closes with it — because it's the whole story. You started in grace, you stand in grace, and you'll finish in grace." },
    ],
    verses: [
      { ref: "Hebrews 6:10", text: "For God is not unrighteous, so as to forget your work and the love which you showed toward his name.", meaning: "God doesn't overlook your quiet, unseen faithfulness. The things no one claps for, He remembers and treasures." },
      { ref: "1 Corinthians 15:58", text: "be steadfast, immovable, always abounding in the Lord's work, because you know that your labor is not in vain.", meaning: "On the days it feels like your small efforts don't matter — they do. Nothing done in love for God is ever wasted." },
    ],
    sideReflection: "Where have I felt too small to matter — and how does it change things that God knows my name and my work?",
  },

  38: {
    context:
      "Welcome to the Psalms — the Bible's prayer book and song book. After the gospels and Romans gave you the foundation, here's where faith learns to feel. Psalm 1 opens the whole collection with a simple picture: two ways to live.",
    plainEnglish:
      "Psalm 1 says the person who soaks in God's word is like a tree planted by water — steady, fruitful, not blown over by every storm. Psalm 3 is David praying while his own son hunts him down, and he still calls God “a shield around me.” That's the Psalms: real life, real prayer.",
    aboutGod: "He's a shield around you — protection that surrounds, not just stands in front.",
    aboutPeople: "What we plant our roots in decides whether we stand or topple.",
    realLife: "You become like whatever you stay near. Stay near God.",
    verse:
      "“He will be like a tree planted by the streams of water, that produces its fruit in its season...” — Psalm 1:3",
    reflection: "What are you currently rooted in — and is it deep enough to hold you when life shakes?",
    prayer: "God, plant me by Your streams. Let my roots go deep into You so I'm steady when storms come. Be the shield around me. Amen.",
    step: "Pick one short Psalm to “soak in” this week — read it slowly each morning instead of rushing past.",
    keyWords: [
      { word: "Planted", meaning: "Not a wildflower that blew in by chance — deliberately placed by water. God roots you on purpose, in the one place you'll actually thrive." },
      { word: "Shield", meaning: "David's word for God surrounding him on every side. Not a wall in front of you, but protection all the way around — even when the threat is close." },
    ],
    verses: [
      { ref: "Jeremiah 17:8", text: "For he will be as a tree planted by the waters... and will not fear when heat comes... neither will cease from yielding fruit.", meaning: "Roots near God mean you don't dry up when the heat comes. You can keep bearing fruit even in a hard season — the source isn't the weather, it's the water." },
      { ref: "Psalm 3:5", text: "I laid myself down and slept. I awakened, for Yahweh sustains me.", meaning: "David slept soundly while being hunted — because he trusted who was holding him. You can rest tonight; God stays awake on your behalf." },
    ],
    sideReflection: "What have I been planting my life beside — and is it a stream, or will it run dry on me?",
  },

  39: {
    context:
      "Psalms 4–6 are evening, morning, and tear-soaked prayers. They give you permission to bring God your sleeplessness, your mornings, and your weeping — nothing is off-limits in honest prayer.",
    plainEnglish:
      "Psalm 4 ends with David lying down in peace because his safety is in God, not his circumstances. Psalm 5 is a morning prayer — laying the day before God first thing. Psalm 6 is raw: David is worn out from crying, and he prays right through the tears instead of waiting to feel better first.",
    aboutGod: "He's near in your sleepless nights and your soaked-pillow mornings alike.",
    aboutPeople: "We think we have to compose ourselves before we pray; we don't.",
    realLife: "You can pray honestly while you're still crying. That IS the prayer.",
    verse:
      "“In peace I will both lay myself down and sleep, for you, Yahweh alone, make me live in safety.” — Psalm 4:8",
    reflection: "What are you carrying to bed at night that you could hand to God instead?",
    prayer: "God, I bring You my real self — tired, teary, unsettled. Let me lie down in Your peace and wake up in Your care. Amen.",
    step: "Tonight, name one worry out loud to God before you sleep, and physically open your hands as you let it go.",
    keyWords: [
      { word: "Lament", meaning: "Honest prayer that complains, weeps, and questions — and still talks to God. The Psalms are full of it because God can handle your real feelings, not just your polished ones." },
      { word: "Safety", meaning: "Not the absence of trouble, but being held by God in the middle of it. David sleeps in peace not because the threat is gone, but because God isn't." },
    ],
    verses: [
      { ref: "Psalm 6:8", text: "Yahweh has heard the voice of my weeping.", meaning: "Your tears aren't ignored — they're heard. God doesn't wait for you to compose yourself; He listens to the crying itself." },
      { ref: "Psalm 56:8", text: "You count my wanderings. You put my tears into your container.", meaning: "Not one tear of yours has been wasted or missed. God treasures them, bottles them, remembers every one." },
    ],
    sideReflection: "What would change if I prayed before I had it together, instead of waiting until after?",
  },

  40: {
    context:
      "In the middle of Psalms 7–9 sits one of the most wonder-filled questions in the Bible: when David looks at the stars, he asks why God would even think about someone as small as us. The answer is staggering.",
    plainEnglish:
      "Psalm 8 has David gazing at the night sky, feeling tiny — and instead of feeling worthless, he's floored that the God who made all of it actually cares about him. Psalm 9 answers with thanksgiving and trust: God doesn't forget the ones the world overlooks.",
    aboutGod: "The Maker of galaxies knows your name and thinks about you on purpose.",
    aboutPeople: "We swing between feeling too big and too small; the truth is we're small and treasured.",
    realLife: "Your sense of worth isn't measured against the universe — it's measured by who made you.",
    verse:
      "“What is man, that you think of him? What is the son of man, that you care for him?” — Psalm 8:4",
    reflection: "When you feel small or forgotten, can you believe the God of the stars is thinking of you?",
    prayer: "God, You made the heavens and You still think of me. Let that truth quiet the voice that says I don't matter. Amen.",
    step: "Tonight, step outside and look up — and let the size of the sky remind you how intentionally you were made.",
    keyWords: [
      { word: "Mindful", meaning: "To hold someone in mind, to think of them on purpose. The God who didn't need to notice you chooses to — you're not an afterthought to Him." },
      { word: "Refuge", meaning: "A safe place to run when you're overwhelmed. Psalm 9 calls God a stronghold for the oppressed — the smaller and weaker you feel, the more He's for you." },
    ],
    verses: [
      { ref: "Psalm 9:9", text: "Yahweh will also be a high tower for the oppressed; a high tower in times of trouble.", meaning: "When life is crushing you, God isn't distant — He's the high place you run to. The harder the trouble, the closer the refuge." },
      { ref: "Luke 12:7", text: "But the very hairs of your head are all numbered. Therefore don't be afraid.", meaning: "God's attention to you is detailed down to the strands of your hair. You are known that closely — so fear loses its grip." },
    ],
    sideReflection: "Where do I feel overlooked — and what shifts if the Maker of the stars is mindful of me?",
  },

  41: {
    context:
      "Psalms 10–12 don't pretend everything is fine. They ask the hard question out loud — why does God sometimes feel far away when things are wrong? This is faith brave enough to be honest.",
    plainEnglish:
      "Psalm 10 opens bluntly: “Why do you stand far off, Lord?” It's a prayer about injustice and feeling abandoned — and it's right there in the Bible. By the end, David remembers that God does see, does hear the helpless, and won't let it stand forever. Honest doubt and deep trust can live in the same prayer.",
    aboutGod: "He sees the wrong you think He's missing — and He defends the helpless.",
    aboutPeople: "We're afraid our doubts disqualify us; God invited them into His own song book.",
    realLife: "You're allowed to ask God “why” and “how long.” That's not the opposite of faith — it's faith talking.",
    verse:
      "“Yahweh, you have heard the desire of the humble. You will prepare their heart. You will cause your ear to hear.” — Psalm 10:17",
    reflection: "What honest question or frustration have you been afraid to bring to God?",
    prayer: "God, sometimes You feel far and I don't understand. But I'm bringing it to You instead of away from You. You see. You hear. I trust that. Amen.",
    step: "Write God one honest sentence about something that doesn't feel fair — and trust Him with it.",
    keyWords: [
      { word: "Humble", meaning: "The ones at the end of their strength, who can't fix it themselves. God leans toward exactly these people — your weakness is what draws His ear." },
      { word: "Honest prayer", meaning: "Prayer that doesn't fake it — that brings the doubt, the anger, the “why.” The Psalms prove God would rather have your real questions than your polite silence." },
    ],
    verses: [
      { ref: "Psalm 10:14", text: "But you do see trouble and grief, to repay it with your hand. The helpless commits himself to you.", meaning: "What you think God is missing, He actually sees. You can hand Him the unfair thing — He's the defender of the helpless." },
      { ref: "Psalm 34:18", text: "Yahweh is near to those who have a broken heart, and saves those who have a crushed spirit.", meaning: "Feeling far from God doesn't mean He's far from you. He draws closest to the broken — nearness you feel most when you need it most." },
    ],
    sideReflection: "What “why” have I been swallowing — and what would it mean to actually pray it?",
  },

  42: {
    context:
      "Psalm 13 famously asks “How long, Lord?” four times in a row. If you've ever felt stuck in a season that won't end, this is your prayer. Psalm 15 then paints the kind of life that gets to dwell close to God.",
    plainEnglish:
      "David is exhausted from waiting and says so — “How long will you forget me?” But watch the turn: by the end of the same short psalm, he's choosing to trust God's unfailing love anyway. He didn't wait to feel better to worship; he worshiped his way back to trust.",
    aboutGod: "His love doesn't run out while you wait — even when the waiting feels endless.",
    aboutPeople: "We assume long waits mean God forgot us; usually they're growing our trust.",
    realLife: "You can be honest about how long it's been AND choose to trust. Both, at once.",
    verse:
      "“But I trust in your loving kindness. My heart rejoices in your salvation.” — Psalm 13:5",
    reflection: "What have you been waiting on so long you've started to wonder if God forgot?",
    prayer: "God, I'm tired of waiting and I'll say so honestly. But I still trust Your love. Carry me through the “how long.” Amen.",
    step: "Name your “how long” to God today — then say out loud, like David, “but I trust in Your love.”",
    keyWords: [
      { word: "How long", meaning: "The honest cry of the waiting. The Bible never scolds this question — it sanctifies it. You can ask it and still be a person of deep faith." },
      { word: "Loving kindness", meaning: "God's steadfast, covenant love that doesn't quit. The Hebrew word is *hesed* — loyal love that stays when feelings and circumstances don't." },
    ],
    verses: [
      { ref: "Lamentations 3:25", text: "Yahweh is good to those who wait for him, to the soul who seeks him.", meaning: "Waiting on God is never wasted. He's good to the ones still seeking Him in the delay — the wait itself is doing something in you." },
      { ref: "Isaiah 40:31", text: "But those who wait for Yahweh will renew their strength. They will mount up with wings like eagles.", meaning: "Waiting isn't passive collapse — it's where new strength is given. The ones who wait on God don't run out; they rise." },
    ],
    sideReflection: "Can I hold both my honest “how long” and my trust in God's love in the same breath?",
  },

  43: {
    context:
      "Psalms 16–18 overflow with the joy and security of being close to God. Psalm 16 gives one of the most beautiful lines about God's presence; Psalm 18 piles up image after image of God as rescuer.",
    plainEnglish:
      "Psalm 16 says the fullest joy and the deepest pleasures are found in God's presence — not somewhere else we keep chasing. Psalm 18 opens, “I love you, Lord, my strength,” and calls God a rock, fortress, and deliverer. This is what it sounds like when someone has tasted that God is truly enough.",
    aboutGod: "His presence is where real, lasting joy actually lives.",
    aboutPeople: "We keep hunting joy in things that can't hold it.",
    realLife: "The joy you've been chasing has an address: nearness to God.",
    verse:
      "“You will show me the path of life. In your presence is fullness of joy. In your right hand there are pleasures forever more.” — Psalm 16:11",
    reflection: "Where have you been looking for joy that only God's presence can actually give?",
    prayer: "God, I've chased joy everywhere but Your presence. Lead me back. Be my rock, my strength, my fullness of joy. Amen.",
    step: "Spend five quiet minutes simply being with God today — no agenda, no asking, just presence.",
    keyWords: [
      { word: "Fullness", meaning: "Not a sip of joy but the whole cup, overflowing. The Psalms locate it in one place — God's presence — so you can stop searching everywhere else." },
      { word: "Rock", meaning: "David's go-to picture for God: solid, unmovable, something to stand on when everything else shifts. A rock doesn't change when your circumstances do." },
    ],
    verses: [
      { ref: "Psalm 18:2", text: "Yahweh is my rock, my fortress, and my deliverer; my God, my rock, in whom I take refuge.", meaning: "When everything feels like sand, God is the rock under your feet. He's not one of many supports — He's the one that holds when the others give way." },
      { ref: "Psalm 16:8", text: "I have set Yahweh always before me. Because he is at my right hand, I shall not be moved.", meaning: "Keep God in front of you, and the things that used to topple you lose their power. He's right beside you — steady enough to keep you standing." },
    ],
    sideReflection: "What have I been chasing for joy — and what would it look like to seek it in God's presence instead?",
  },

  44: {
    context:
      "Psalm 19 is a two-part masterpiece: first the skies preach a silent sermon about God, then God's word is praised as more precious than gold. It ends with a prayer so good people still pray it before they speak.",
    plainEnglish:
      "David says creation itself declares God's glory — the sunrise is a daily sermon without words. Then he turns to Scripture, calling it sweeter than honey and worth more than gold. He closes asking God to make even his words and thoughts pleasing — a prayer for an honest inside, not just a clean outside.",
    aboutGod: "He speaks — through the skies above you and the Scriptures in front of you.",
    aboutPeople: "We miss the sermon creation preaches every single morning.",
    realLife: "God is communicating all the time; the question is whether we're listening.",
    verse:
      "“Let the words of my mouth and the meditation of my heart be acceptable in your sight, Yahweh, my rock and my redeemer.” — Psalm 19:14",
    reflection: "Where might God be speaking to you that you've been too busy to notice?",
    prayer: "God, open my eyes to see You in creation and Your word. Make my words and even my private thoughts pleasing to You. Amen.",
    step: "Watch one sunrise or sunset this week without your phone — and let it preach to you.",
    keyWords: [
      { word: "Meditation", meaning: "Not emptying your mind, but filling it — slowly turning God's truth over like food, until it nourishes you. The opposite of skimming." },
      { word: "Redeemer", meaning: "One who buys back and restores. David ends on it because even his best efforts need redeeming — and God is the one who does it." },
    ],
    verses: [
      { ref: "Psalm 19:1", text: "The heavens declare the glory of God. The expanse shows his handiwork.", meaning: "Every sky is a sermon. You don't have to read to hear from God today — just look up and let creation point you back to its Maker." },
      { ref: "Romans 1:20", text: "For the invisible things of him since the creation of the world are clearly seen, being perceived through the things that are made.", meaning: "Creation isn't random — it's a fingerprint. The world around you is constant evidence of a God who is really there." },
    ],
    sideReflection: "What sermon has creation been preaching to me that I've been too rushed to hear?",
  },

  45: {
    context:
      "This day holds two of the most famous psalms in the world: Psalm 22, which Jesus quoted from the cross, and Psalm 23, the Shepherd psalm. Together they hold both the darkest cry and the deepest comfort.",
    plainEnglish:
      "Psalm 22 begins, “My God, my God, why have you forsaken me?” — the exact words Jesus prayed while dying. It shows God isn't scared of our most abandoned moments; He entered them. Then Psalm 23 answers with the gentlest picture in Scripture: God as a shepherd who leads, feeds, and walks with us even through the darkest valley.",
    aboutGod: "He's the Shepherd who walks WITH you through the valley — not around it.",
    aboutPeople: "We fear the dark valleys most; the promise isn't no valley, but His presence in it.",
    realLife: "Even in the worst stretch, you are not walking alone.",
    verse:
      "“Even though I walk through the valley of the shadow of death, I will fear no evil, for you are with me.” — Psalm 23:4",
    reflection: "What “valley” are you walking through — and can you sense the Shepherd walking it with you?",
    prayer: "Shepherd, lead me. Even in this dark valley, You're beside me, so I won't be afraid. Restore my soul. Amen.",
    step: "Read Psalm 23 slowly, out loud, putting your own name and situation into it.",
    keyWords: [
      { word: "Shepherd", meaning: "Not a distant boss but a hands-on caretaker who knows each sheep, leads to food and water, and goes after the one that strays. That's how God tends you." },
      { word: "Forsaken", meaning: "To feel utterly abandoned. Jesus prayed Psalm 22's opening line on the cross — so He could meet you in your most forsaken moment, having been there Himself." },
    ],
    verses: [
      { ref: "Psalm 23:6", text: "Surely goodness and loving kindness shall follow me all the days of my life.", meaning: "You're not just being led forward — goodness and mercy are pursuing you from behind. You're surrounded by God's care, coming and going." },
      { ref: "Isaiah 41:10", text: "Don't be afraid, for I am with you. Don't be dismayed, for I am your God. I will strengthen you.", meaning: "The cure for fear in the valley isn't a way out — it's a Person with you. “I am with you” is the promise that quiets the dread." },
    ],
    sideReflection: "What valley am I in right now — and what changes when I remember the Shepherd is walking it beside me?",
  },

  46: {
    context:
      "Psalms 25–27 are prayers for guidance and courage. Psalm 27 contains a famous declaration of fearlessness and one beautiful “one thing” David asks of God above everything else.",
    plainEnglish:
      "Psalm 25 keeps lifting the soul to God and asking to be taught His ways. Psalm 27 declares, “The Lord is my light and my salvation — whom shall I fear?” and then narrows everything down to a single desire: just to be with God. When you know God is your light, the dark gets a lot less scary.",
    aboutGod: "He's your light — the One who makes the unknown walkable.",
    aboutPeople: "We let fear shrink our lives; nearness to God expands them.",
    realLife: "Fear gets quieter the closer you get to the Light.",
    verse:
      "“Yahweh is my light and my salvation. Whom shall I fear? Yahweh is the strength of my life. Of whom shall I be afraid?” — Psalm 27:1",
    reflection: "What fear has been running your decisions — and how would God being your “light” change it?",
    prayer: "God, be my light in what feels dark and uncertain. Teach me Your way. The “one thing” I want is more of You. Amen.",
    step: "Name one fear-driven decision you've been making, and ask God to lead it instead of fear.",
    keyWords: [
      { word: "Light", meaning: "What makes the next step visible. You don't need the whole road lit — just enough to take the step in front of you, and God is that light." },
      { word: "One thing", meaning: "David's life boiled down to a single desire: to be near God. When the main thing is settled, a thousand smaller fears lose their grip." },
    ],
    verses: [
      { ref: "Psalm 27:4", text: "One thing I have asked of Yahweh, that I will seek after: that I may dwell in Yahweh's house all the days of my life.", meaning: "When your deepest “one thing” is God Himself, everything else finds its proper size. Simplify your wanting down to Him." },
      { ref: "Psalm 27:14", text: "Wait for Yahweh. Be strong, and let your heart take courage. Yes, wait for Yahweh.", meaning: "Courage and waiting aren't opposites. Sometimes the bravest, strongest thing you can do is keep waiting on God." },
    ],
    sideReflection: "What fear would shrink if I truly believed God is my light and the strength of my life?",
  },

  47: {
    context:
      "Psalms 28–30 move from crying out to bursting with thanks. Psalm 30 gives one of Scripture's most hope-filled lines about grief: it doesn't get the final word.",
    plainEnglish:
      "Psalm 30 is David's testimony after God lifted him out of a pit. He says weeping may camp out for the night, but joy arrives in the morning — and that God turned his mourning into dancing. It's not a denial of grief; it's a promise that grief has an expiration date in God's hands.",
    aboutGod: "He's in the business of turning mourning into dancing.",
    aboutPeople: "In the long night we forget morning is coming; it always is.",
    realLife: "This season of weeping is real — and it is not the end of your story.",
    verse:
      "“Weeping may stay for the night, but joy comes in the morning.” — Psalm 30:5",
    reflection: "What grief are you in the “night” of right now — and can you trust that morning is coming?",
    prayer: "God, this night of weeping is heavy. Thank You that You turn mourning into dancing. Bring my morning in Your time. Amen.",
    step: "If you're grieving, let yourself feel it honestly today — and write down one hope you're holding onto for the morning.",
    keyWords: [
      { word: "Mourning to dancing", meaning: "God's specialty isn't erasing your grief but transforming it. The same God who holds you in the weeping is preparing the dancing." },
      { word: "Morning", meaning: "In the Psalms, morning is a promise — the night of sorrow has a limit. Whatever you're in, it is a chapter, not the whole book." },
    ],
    verses: [
      { ref: "Psalm 30:11", text: "You have turned my mourning into dancing for me. You have removed my sackcloth, and clothed me with gladness.", meaning: "God doesn't just comfort grief — He reverses it. The same hands that hold you in sorrow will one day trade your mourning clothes for joy." },
      { ref: "Revelation 21:4", text: "He will wipe away every tear from their eyes. Death will be no more; neither will there be mourning, nor crying.", meaning: "There's a morning coming with no more night at all. Every tear personally wiped away — that's where your story is headed." },
    ],
    sideReflection: "What night am I in — and what would it mean to trust that God has a morning planned for me?",
  },

  48: {
    context:
      "Psalms 31–33 include Psalm 32, David's relief after finally confessing sin he'd been hiding. If guilt has been quietly weighing on you, this day is pure good news.",
    plainEnglish:
      "Psalm 32 describes how keeping sin hidden was wearing David down physically — until he came clean with God and felt the weight lift. He calls the forgiven person “blessed.” This is the freedom of stopping the pretending: confession isn't God shaming you, it's God unburdening you.",
    aboutGod: "He's not waiting to shame you — He's waiting to lift the weight off you.",
    aboutPeople: "We think hiding sin protects us; it just quietly crushes us.",
    realLife: "What you bring into the light with God loses its power to weigh you down.",
    verse:
      "“I acknowledged my sin to you. I didn't hide my iniquity... and you forgave the iniquity of my sin.” — Psalm 32:5",
    reflection: "What have you been hiding from God — that He's actually inviting you to bring into the light?",
    prayer: "God, I'm done hiding. I bring it all to You. Thank You that confession leads to freedom, not shame. Lift the weight. Amen.",
    step: "Name one thing you've been carrying in secret — confess it honestly to God today and receive the relief.",
    keyWords: [
      { word: "Confession", meaning: "Simply agreeing with God about what's true — no spin, no hiding. It feels scary but it's the doorway out of the weight you've been carrying alone." },
      { word: "Blessed", meaning: "Deeply, settledly happy — the word David uses for the forgiven. Not because they're sinless, but because they're free of the burden of pretending." },
    ],
    verses: [
      { ref: "1 John 1:9", text: "If we confess our sins, he is faithful and righteous to forgive us the sins, and to cleanse us from all unrighteousness.", meaning: "Confession isn't a gamble — God's response is guaranteed. Bring it honestly and forgiveness is certain, every time." },
      { ref: "Psalm 32:7", text: "You are my hiding place. You will preserve me from trouble. You will surround me with songs of deliverance.", meaning: "When you stop hiding from God, you discover He's the place to hide in. Honesty doesn't expose you to danger — it surrounds you with safety." },
    ],
    sideReflection: "What am I keeping in the dark that would finally feel lighter if I brought it to God?",
  },

  49: {
    context:
      "Psalms 34–36 are full of invitations to experience God's goodness firsthand. Psalm 34 holds a tender promise specifically for the brokenhearted and crushed.",
    plainEnglish:
      "Psalm 34 says, “Taste and see that the Lord is good” — faith isn't just an idea to agree with, it's something to experience. And it makes a promise to the hurting: God is close to the brokenhearted and saves the crushed in spirit. Your broken heart doesn't push God away; it's exactly where He draws near.",
    aboutGod: "He's nearest to the brokenhearted — not despite the breaking, but in it.",
    aboutPeople: "We hide our brokenness; God is drawn to it.",
    realLife: "Being crushed doesn't disqualify you from God — it's where He meets you.",
    verse:
      "“Yahweh is near to those who have a broken heart, and saves those who have a crushed spirit.” — Psalm 34:18",
    reflection: "Where are you broken right now — and can you believe that's exactly where God is closest?",
    prayer: "God, my heart is broken in places. Thank You that this is where You come close. Save me, hold me, let me taste Your goodness. Amen.",
    step: "Stop hiding one broken place today. Bring it openly to God and let Him near it.",
    keyWords: [
      { word: "Taste and see", meaning: "Faith you experience, not just believe. God invites you to test His goodness in real life — to find out He's good by living it, like tasting food rather than reading the menu." },
      { word: "Brokenhearted", meaning: "The ones whose hearts are shattered by loss or pain. Far from being kept at arm's length, they're the very people God draws closest to." },
    ],
    verses: [
      { ref: "Psalm 34:8", text: "Oh taste and see that Yahweh is good. Blessed is the man who takes refuge in him.", meaning: "Don't just study God from a distance — try Him. The goodness you doubt becomes real the moment you actually run to Him." },
      { ref: "Matthew 5:4", text: "Blessed are those who mourn, for they shall be comforted.", meaning: "Jesus calls the grieving “blessed” — not because mourning is good, but because comfort is coming, straight from the heart of God." },
    ],
    sideReflection: "What broken place have I been hiding that God might want to come close to?",
  },

  50: {
    context:
      "Psalms 37–39 wrestle with a question we all face: why do people who do wrong seem to do just fine? Psalm 37 answers with one of the calmest, most freeing commands in Scripture.",
    plainEnglish:
      "Psalm 37 repeats: don't fret, don't envy people who get ahead by doing wrong — it doesn't last. Instead, “delight yourself in the Lord,” trust Him, and “be still” before Him. It's a prescription for the anxious, comparing, scrolling heart: stop fretting, start trusting.",
    aboutGod: "He's worth delighting in more than anything you're tempted to envy.",
    aboutPeople: "We exhaust ourselves comparing and fretting over what others have.",
    realLife: "Most of your peace is stolen by fretting over things God already has handled.",
    verse:
      "“Also delight yourself in Yahweh, and he will give you the desires of your heart.” — Psalm 37:4",
    reflection: "What have you been fretting over or envying that's quietly stealing your peace?",
    prayer: "God, I let go of the comparing and the fretting. Help me delight in You instead. Reshape what my heart even wants. Amen.",
    step: "Notice one moment of envy or fretting today — and consciously turn it into a prayer of trust instead.",
    keyWords: [
      { word: "Delight", meaning: "To take real pleasure in God Himself. As you delight in Him, He doesn't just grant your wishes — He reshapes what you want until it lines up with what's truly good." },
      { word: "Be still", meaning: "To stop striving, comparing, and scrambling — and rest in God's hands. Stillness isn't laziness; it's trust with its hands open." },
    ],
    verses: [
      { ref: "Psalm 37:7", text: "Rest in Yahweh, and wait patiently for him. Don't fret because of him who prospers in his way.", meaning: "Someone else getting ahead unfairly isn't your burden to carry. Rest, wait, and let God handle what you can't control." },
      { ref: "Matthew 6:33", text: "But seek first God's Kingdom and his righteousness; and all these things will be given to you as well.", meaning: "Put God first and the things you're anxiously chasing fall into place. The cure for fretting is reordering what you seek first." },
    ],
    sideReflection: "What am I fretting over or envying — and what would delighting in God instead actually look like today?",
  },

  51: {
    context:
      "Psalms 40–42 hold the rescue-from-the-pit testimony and the famous “as the deer pants” cry of a thirsty soul. Psalm 42 is a masterclass in talking to yourself when your heart is downcast.",
    plainEnglish:
      "Psalm 40 testifies: God lifted David out of the mud and set his feet on a rock. Psalm 42 captures the spiritual thirst we all feel — “as the deer pants for water, so my soul pants for you” — and then does something powerful: David preaches to his own downcast heart, telling it to put its hope in God.",
    aboutGod: "He lifts people out of the pit and sets them on solid ground.",
    aboutPeople: "Our souls get thirsty and downcast; we can either feed the despair or preach hope to it.",
    realLife: "You don't have to just believe your feelings — you can talk back to them with truth.",
    verse:
      "“Why are you in despair, my soul? Why are you disturbed within me? Hope in God!” — Psalm 42:5",
    reflection: "What has your soul been thirsty for — and have you been feeding your despair or preaching hope to it?",
    prayer: "God, my soul is thirsty and sometimes downcast. I choose to preach hope to myself: I will yet praise You. Lift me to the rock. Amen.",
    step: "When discouragement hits today, talk back to it like David: “Why so downcast? Hope in God.”",
    keyWords: [
      { word: "Downcast", meaning: "Bowed down, heavy, discouraged. The Psalms model not ignoring this feeling but speaking truth to it — you can address your own soul instead of just obeying it." },
      { word: "Pant / thirst", meaning: "A deep, physical longing — the soul's craving for God. That restlessness you feel isn't a flaw; it's a thirst only God can satisfy." },
    ],
    verses: [
      { ref: "Psalm 40:2", text: "He brought me up also out of a horrible pit, out of the miry clay. He set my feet on a rock.", meaning: "God doesn't just visit you in the pit — He lifts you out and gives you solid ground. The mud you're stuck in is not your final address." },
      { ref: "Psalm 42:8", text: "Yahweh will command his loving kindness in the daytime. In the night his song shall be with me.", meaning: "God's love covers your daylight hours, and His song stays with you through the night. You're held around the clock." },
    ],
    sideReflection: "What is my soul truly thirsty for — and how can I preach hope to myself instead of believing the despair?",
  },

  52: {
    context:
      "Psalms 43–45 include a prayer that's perfect for confusing seasons: “Send me your light and your truth — let them lead me.” It's a prayer for direction when you can't see the way.",
    plainEnglish:
      "Psalm 43 picks up Psalm 42's downcast theme and asks God to send out His light and truth as guides home. It's a humble admission: I can't find my own way — lead me. Psalm 45 then lifts into a royal wedding song that the New Testament applies to Christ the King.",
    aboutGod: "He sends light and truth to lead you when you can't see the path.",
    aboutPeople: "We try to navigate by feelings; we need His light and truth to guide.",
    realLife: "When you're lost, the prayer isn't “show me everything” — it's “lead me.”",
    verse:
      "“Oh, send out your light and your truth. Let them lead me. Let them bring me to your holy hill...” — Psalm 43:3",
    reflection: "Where do you feel directionless — and have you asked God to lead, instead of figuring it out alone?",
    prayer: "God, send Your light and truth to lead me. I can't navigate this alone. Bring me back to You. Amen.",
    step: "Name one decision you feel lost in, and pray specifically: “God, send Your light and truth to lead me here.”",
    keyWords: [
      { word: "Light", meaning: "God's guidance that makes the path visible. You ask not for the whole journey lit at once, but for enough light to follow Him one step at a time." },
      { word: "Lead me", meaning: "A prayer of surrender — admitting you can't find the way yourself. Real direction starts with letting God go first." },
    ],
    verses: [
      { ref: "Psalm 119:105", text: "Your word is a lamp to my feet, and a light for my path.", meaning: "God's word is a lamp, not a stadium floodlight — it shows the next step, not the whole map. That's enough to keep walking with Him." },
      { ref: "John 8:12", text: "I am the light of the world. He who follows me will not walk in the darkness, but will have the light of life.", meaning: "Jesus is the light David prayed for. Follow Him and you won't be left fumbling in the dark — He lights the way as you go." },
    ],
    sideReflection: "Where am I trying to navigate by my own feelings instead of asking God to lead with His light and truth?",
  },

  53: {
    context:
      "Psalms 46–48 are bold declarations that God is our refuge and stronghold. Psalm 46 holds one of the most quoted lines in the whole Bible — words for the overwhelmed.",
    plainEnglish:
      "Psalm 46 says even if the earth gives way and mountains fall into the sea, God is our refuge and strength — a very present help in trouble. Then it gives the famous command: “Be still, and know that I am God.” When everything's shaking, the call isn't to scramble harder; it's to stop and remember who God is.",
    aboutGod: "He's a refuge that holds even when everything else is collapsing.",
    aboutPeople: "Our instinct in chaos is to scramble; God's invitation is to be still.",
    realLife: "You don't have to fix everything right now. You can be still and trust who God is.",
    verse:
      "“Be still, and know that I am God.” — Psalm 46:10",
    reflection: "What's shaking in your life right now — and what would it look like to “be still” in the middle of it?",
    prayer: "God, things feel like they're falling apart. Help me stop scrambling and be still. You are my refuge and my very present help. Amen.",
    step: "Take 60 seconds of literal stillness today — breathe, and repeat: “Be still, and know that I am God.”",
    keyWords: [
      { word: "Refuge", meaning: "A shelter you run into when the storm hits. God isn't a last resort — He's the first place to run, the stronghold that holds when everything shakes." },
      { word: "Be still", meaning: "Literally “let go, cease striving.” The command in chaos isn't to try harder but to stop, breathe, and remember God is still God." },
    ],
    verses: [
      { ref: "Psalm 46:1", text: "God is our refuge and strength, a very present help in trouble.", meaning: "Not a help that arrives eventually — a *very present* one, here now, in the trouble itself. God doesn't show up after the storm; He's with you inside it." },
      { ref: "Exodus 14:14", text: "Yahweh will fight for you, and you shall be still.", meaning: "Sometimes the most faith-filled thing you can do is stop fighting and let God fight for you. Stillness can be the bravest move." },
    ],
    sideReflection: "What am I scrambling to control that God is inviting me to be still and trust Him with?",
  },

  54: {
    context:
      "Psalms 49–51 climax in Psalm 51 — David's raw prayer of repentance after his worst failure. If you've ever wondered whether you've gone too far, this psalm is for you.",
    plainEnglish:
      "After a devastating moral failure, David doesn't hide or excuse it — he pours out Psalm 51: “Create in me a clean heart, O God.” He asks not just for forgiveness but for renewal from the inside. And he discovers God wants a broken, honest heart far more than a polished performance.",
    aboutGod: "He can create a clean heart in anyone honest enough to ask.",
    aboutPeople: "We think our worst failures put us out of reach; David proves they don't.",
    realLife: "No failure is too big for a God who creates clean hearts from scratch.",
    verse:
      "“Create in me a clean heart, O God. Renew a right spirit within me.” — Psalm 51:10",
    reflection: "Is there a failure you've believed put you beyond God's reach? What if it didn't?",
    prayer: "God, create in me a clean heart. I bring You my broken, honest self — not a performance. Renew me from the inside. Amen.",
    step: "Bring one failure you've been carrying to God honestly, and ask Him to create a clean heart in you.",
    keyWords: [
      { word: "Create", meaning: "The same word used for God making the world from nothing. He doesn't just patch up your heart — He can make a brand-new clean one out of nothing." },
      { word: "Broken and contrite", meaning: "A heart that's honest about its failure, not defending itself. David learned this is the “sacrifice” God treasures most — your realness over your performance." },
    ],
    verses: [
      { ref: "Psalm 51:17", text: "The sacrifices of God are a broken spirit. A broken and contrite heart, O God, you will not despise.", meaning: "You don't have to clean up before coming to God — a broken, honest heart is exactly what He welcomes. He never turns that away." },
      { ref: "Ezekiel 36:26", text: "I will give you a new heart, and I will put a new spirit within you.", meaning: "God's promise isn't behavior modification — it's a heart transplant. He gives you a new heart, not just a fresh set of rules." },
    ],
    sideReflection: "What failure have I believed I'm beyond forgiveness for — and what if God is ready to create a clean heart in me?",
  },

  55: {
    context:
      "Psalms 52–54 are wartime prayers — David surrounded by enemies, trusting God as his helper. Psalm 54 distills the whole thing into a simple, steadying confidence.",
    plainEnglish:
      "Psalm 52 contrasts those who trust in wealth and power with David, who trusts in God's unfailing love “forever and ever.” Psalm 54 is short and certain: “Behold, God is my helper.” When opposition closes in, David doesn't size up the threat — he sizes up his Helper.",
    aboutGod: "He's your helper — present and on your side when you're outnumbered.",
    aboutPeople: "We measure our problems; faith measures our Helper.",
    realLife: "It's not about how big the threat is — it's about how big your God is.",
    verse:
      "“Behold, God is my helper. The Lord is the one who sustains my soul.” — Psalm 54:4",
    reflection: "What are you facing that feels bigger than you — and have you sized up your Helper, or just the threat?",
    prayer: "God, You are my helper. Whatever's against me, You're for me and You sustain me. I trust Your unfailing love. Amen.",
    step: "Write down one thing that feels too big for you, then under it write: “But God is my helper.”",
    keyWords: [
      { word: "Helper", meaning: "One who comes alongside to do what you can't do alone. God isn't a distant supervisor — He rolls up His sleeves and helps." },
      { word: "Sustains", meaning: "To hold up, to keep from collapsing. On the days you feel like you can't carry on, God is the one quietly holding your soul together." },
    ],
    verses: [
      { ref: "Psalm 52:8", text: "But as for me, I am like a green olive tree in God's house. I trust in God's loving kindness forever and ever.", meaning: "While others wither chasing power, the one rooted in God's love stays green and thriving. Trust in His love is what keeps you flourishing." },
      { ref: "Hebrews 13:6", text: "So that with good courage we say, 'The Lord is my helper. I will not fear.'", meaning: "Because God helps you, fear loses its authority. You can face what's ahead with courage borrowed from your Helper." },
    ],
    sideReflection: "Am I sizing up the threat in front of me, or the God who is my helper?",
  },

  56: {
    context:
      "Psalms 55–57 are prayers from real distress — betrayal, fear, hiding in a cave. They hand us two of the most comforting promises in Scripture: cast your cares on God, and He keeps your tears.",
    plainEnglish:
      "Psalm 55 says, “Cast your burden on the Lord, and he will sustain you.” Psalm 56, written when David was seized by enemies, pictures God collecting every tear in a bottle and writing them in His book. Your burdens aren't meant to be carried alone, and your tears aren't unnoticed.",
    aboutGod: "He carries your burdens and treasures every tear you cry.",
    aboutPeople: "We white-knuckle our worries instead of handing them over.",
    realLife: "The weight you're carrying was never meant to be yours alone.",
    verse:
      "“Cast your burden on Yahweh and he will sustain you. He will never allow the righteous to be moved.” — Psalm 55:22",
    reflection: "What burden have you been gripping that God is asking you to actually hand over?",
    prayer: "God, I cast this burden on You — I've carried it alone too long. Thank You that You hold it, and that You keep every tear. Amen.",
    step: "Name the heaviest thing you're carrying, and pray a deliberate “handing-over” of it to God today.",
    keyWords: [
      { word: "Cast", meaning: "To throw, to hurl off your shoulders onto God's. Not set it down gently and pick it back up — actually release it to the One strong enough to carry it." },
      { word: "Tears in a bottle", meaning: "An image of God treasuring your sorrows. Not one of your tears is wasted or unseen — He keeps them like something precious." },
    ],
    verses: [
      { ref: "1 Peter 5:7", text: "casting all your worries on him, because he cares for you.", meaning: "The reason you can hand God your worries is simple: He actually cares. You're not bothering Him — you're trusting Someone who wants the weight off you." },
      { ref: "Psalm 56:8", text: "You count my wanderings. You put my tears into your container. Aren't they in your book?", meaning: "God keeps a record of your sorrows because they matter to Him. Nothing you've cried over has gone unnoticed by heaven." },
    ],
    sideReflection: "What burden have I refused to cast on God — and what would it feel like to finally let it go?",
  },

  57: {
    context:
      "Psalms 58–60 are prayers in times of trouble. Psalm 59, written while David's house was being watched by men sent to kill him, turns fear into a song about God as a fortress.",
    plainEnglish:
      "Psalm 59 is composed under literal threat — and David's response is to sing about God being his fortress and refuge in times of trouble. He resolves to “sing of your strength in the morning.” He doesn't deny the danger; he just keeps a bigger truth in view: God is a stronghold nothing can breach.",
    aboutGod: "He's a fortress — a high, safe place when trouble surrounds you.",
    aboutPeople: "In trouble we fixate on the threat; faith sings about the fortress.",
    realLife: "Praise in the middle of trouble isn't denial — it's defiance.",
    verse:
      "“But I will sing of your strength. Yes, I will sing aloud of your loving kindness in the morning... for you are my high tower, a refuge in the day of my distress.” — Psalm 59:16",
    reflection: "What trouble is surrounding you — and could you choose to sing about God's strength in the middle of it?",
    prayer: "God, You're my fortress in this trouble. I won't just stare at the threat — I'll sing about Your strength. You are my refuge. Amen.",
    step: "Play or sing one worship song today in the middle of whatever's troubling you — make praise your defiance.",
    keyWords: [
      { word: "Fortress", meaning: "A fortified, high place no enemy can storm. When trouble surrounds you, God is the unbreachable safety you run up into." },
      { word: "Sing in the morning", meaning: "Choosing praise before the trouble lifts. David sings about God's strength while still in danger — worship that defies the circumstances instead of waiting on them." },
    ],
    verses: [
      { ref: "Proverbs 18:10", text: "Yahweh's name is a strong tower: the righteous run to him, and are safe.", meaning: "God's name itself is a tower you can run into. Safety isn't a feeling you manufacture — it's a Person you run to." },
      { ref: "Psalm 59:17", text: "To you, my strength, I will sing praises. For God is my high tower, the God of my mercy.", meaning: "When you're weak, God is your strength — and the right response is to sing. Praise turns your eyes from the danger to the fortress." },
    ],
    sideReflection: "What would it look like to sing about God's strength while I'm still in the trouble, not after?",
  },

  58: {
    context:
      "Psalms 61–63 are some of the most intimate in the whole book — written from the wilderness, longing for God. They contain the famous “my soul finds rest in God alone.”",
    plainEnglish:
      "Psalm 61 prays, “Lead me to the rock that is higher than I.” Psalm 62 declares that the soul finds rest in God alone — not in people, success, or circumstances. Psalm 63 is David thirsting for God in a dry desert, saying His love is “better than life.” These psalms keep narrowing it down: God alone.",
    aboutGod: "He alone is the resting place the soul keeps searching for.",
    aboutPeople: "We look for rest in a dozen places that can't provide it.",
    realLife: "Real rest isn't found in more — it's found in God alone.",
    verse:
      "“My soul rests in God alone. My salvation is from him.” — Psalm 62:1",
    reflection: "Where have you been seeking rest that only God can truly give?",
    prayer: "God, my soul rests in You alone. Not in success, not in people's approval — in You. Lead me to the rock higher than I. Amen.",
    step: "Identify one thing you've been leaning on for rest, and intentionally bring that need to God instead today.",
    keyWords: [
      { word: "Alone", meaning: "God isn't one rest among many — He's the only one that holds. The word strips away every backup plan and points your soul to its true home." },
      { word: "Rock higher than I", meaning: "A vantage point above your circumstances, beyond your own strength. When you're overwhelmed, you don't need more effort — you need lifting to higher ground." },
    ],
    verses: [
      { ref: "Psalm 63:3", text: "Because your loving kindness is better than life, my lips shall praise you.", meaning: "God's love is worth more than life itself — so even on your hardest day, you have a reason to praise. His love outweighs everything else on the scale." },
      { ref: "Matthew 11:28", text: "Come to me, all you who labor and are heavily burdened, and I will give you rest.", meaning: "The rest your soul keeps hunting for is a Person, and He's inviting you. Stop searching everywhere else — come to Jesus." },
    ],
    sideReflection: "What am I leaning on for rest that can't hold me — and what would resting in God alone feel like?",
  },

  59: {
    context:
      "Psalms 64–66 turn toward gratitude and testimony. Psalm 65 celebrates God's abundant provision, and Psalm 66 invites everyone to “come and see what God has done.”",
    plainEnglish:
      "Psalm 65 praises God for crowning the year with goodness — the rains, the harvest, the overflowing provision. Psalm 66 is a call to come and see God's works and to tell others what He's done in your own life. Gratitude here isn't private; it overflows into testimony.",
    aboutGod: "He's generous — crowning ordinary years with quiet, daily goodness.",
    aboutPeople: "We rush past blessings without naming them.",
    realLife: "Naming what God has done turns a normal day into worship.",
    verse:
      "“You crown the year with your bounty. Your carts overflow with abundance.” — Psalm 65:11",
    reflection: "What good in your life have you been treating as ordinary that's actually God's provision?",
    prayer: "God, thank You for the goodness I've rushed past. Open my eyes to Your provision. I'll come and see — and tell others — what You've done. Amen.",
    step: "Write down three specific things God has provided this year, and thank Him for each by name.",
    keyWords: [
      { word: "Bounty", meaning: "Overflowing, generous provision. God doesn't just meet the minimum — He crowns ordinary years with goodness we often forget to notice." },
      { word: "Come and see", meaning: "Gratitude that becomes testimony. What God has done in your life isn't meant to stay private — it's meant to be shared so others see Him too." },
    ],
    verses: [
      { ref: "Psalm 66:16", text: "Come and hear, all you who fear God. I will declare what he has done for my soul.", meaning: "Your story of what God has done is worth telling out loud. Someone's faith may grow just from hearing what He did for you." },
      { ref: "James 1:17", text: "Every good gift and every perfect gift is from above, coming down from the Father of lights.", meaning: "Trace every good thing in your life back far enough and you find God. The ordinary blessings you overlook are gifts from His hand." },
    ],
    sideReflection: "What everyday goodness have I failed to call what it is — God's provision worth thanking Him for?",
  },

  60: {
    context:
      "Psalms 67–69 hold a tender picture of who God is for the overlooked: a father to the fatherless, a defender of the lonely. Psalm 69 is also a raw cry from someone drowning in trouble.",
    plainEnglish:
      "Psalm 68 calls God “a father to the fatherless” and the one who “sets the lonely in families.” Psalm 69 is David crying out as the floodwaters rise around him — “save me, the waters have come up to my neck.” Together they say: God specially defends the alone, and you can cry out to Him when you're going under.",
    aboutGod: "He's a father to the fatherless and a home for the lonely.",
    aboutPeople: "We feel most forgotten when we're alone; that's where God draws nearest.",
    realLife: "If you feel alone, you have God's special attention, not His absence.",
    verse:
      "“A father of the fatherless, and a defender of the widows, is God in his holy habitation. God sets the lonely in families.” — Psalm 68:5-6",
    reflection: "Where do you feel alone or unprotected — and can you receive God as your defender there?",
    prayer: "God, You're a father to the fatherless and a home for the lonely. Where I feel alone, be near. Where I'm sinking, save me. Amen.",
    step: "If you know someone who's lonely, reach out today — be part of how God “sets the lonely in families.”",
    keyWords: [
      { word: "Father to the fatherless", meaning: "God personally takes up the cause of those with no one to protect them. The places in your life where support is missing, He steps in to fill." },
      { word: "Sets the lonely in families", meaning: "God's heart is to bring the isolated into belonging. Loneliness isn't where He leaves you — it's where He goes to work." },
    ],
    verses: [
      { ref: "Psalm 68:6", text: "God sets the lonely in families. He brings out the prisoners with singing.", meaning: "God moves the lonely into belonging and the trapped into freedom — and there's singing involved. He's writing your isolation into community." },
      { ref: "Psalm 27:10", text: "When my father and my mother forsake me, then Yahweh will take me up.", meaning: "Even if the people who should have been there weren't, God picks you up. His care fills the gap that human love left empty." },
    ],
    sideReflection: "Where do I feel alone — and how might God be wanting to father me, or use me to reach someone else who is?",
  },

  61: {
    context:
      "Psalms 70–72 include a moving prayer about aging and lifelong faithfulness. Psalm 71 is the voice of someone who has walked with God since youth and refuses to stop now.",
    plainEnglish:
      "Psalm 71 prays, “Do not cast me away when I am old.” It's the testimony of someone who learned to trust God young and is still leaning on Him in gray-haired years. The takeaway: God is faithful across an entire lifetime — He doesn't lose interest as we age, and our job is to keep declaring His goodness to the next generation.",
    aboutGod: "He's faithful from your first breath to your last — He never ages out of caring.",
    aboutPeople: "We fear being forgotten as we grow older; God never forgets.",
    realLife: "Whatever season of life you're in, God's faithfulness reaches the whole way.",
    verse:
      "“You have taught me from my youth. Until now, I have declared your wondrous works.” — Psalm 71:17",
    reflection: "Can you look back and trace God's faithfulness across the seasons of your life so far?",
    prayer: "God, You've been faithful all my life — from my youth until now. Stay close as I age, and let me keep declaring Your goodness. Amen.",
    step: "Tell someone younger one specific story of how God has been faithful in your life.",
    keyWords: [
      { word: "Lifelong", meaning: "God's faithfulness isn't a season — it spans your whole life. The God who held you at the beginning will hold you all the way through." },
      { word: "Declare", meaning: "To tell out loud what God has done. Faith grows when one generation passes its stories to the next — your testimony is a gift to those behind you." },
    ],
    verses: [
      { ref: "Isaiah 46:4", text: "Even to old age I am he, and even to gray hairs I will carry you.", meaning: "God doesn't hand you off as you age — He carries you the whole way, all the way to gray hairs. His care has no retirement date." },
      { ref: "Psalm 71:18", text: "Yes, even when I am old and gray-haired, God, don't forsake me, until I have declared your strength to the next generation.", meaning: "Your purpose doesn't expire — there's always a next generation who needs to hear what God has done. Your story still matters." },
    ],
    sideReflection: "Where can I trace God's faithfulness across my own story — and who needs to hear it from me?",
  },

  62: {
    context:
      "Psalm 73 is brutally honest about a faith crisis: David's friend Asaph nearly lost his faith watching wicked people prosper — until he stepped into God's presence and everything reframed.",
    plainEnglish:
      "Asaph admits he almost slipped: the arrogant seemed to have it all while he, trying to do right, kept struggling. It nearly broke him — “until I entered God's sanctuary.” In God's presence he remembered what lasts, and landed on a line of pure devotion: even if everything else fails, God is the strength of his heart forever.",
    aboutGod: "He's the one possession that can never be lost — the strength of your heart forever.",
    aboutPeople: "We almost lose faith comparing our lot to people who seem to cheat and win.",
    realLife: "Perspective changes everything — and it's found in God's presence, not in the comparison.",
    verse:
      "“My flesh and my heart fails, but God is the strength of my heart and my portion forever.” — Psalm 73:26",
    reflection: "Whose “success” has nearly shaken your faith — and what would change if you saw it from God's presence?",
    prayer: "God, I've nearly slipped comparing my life to others. Bring me back into Your presence, where I remember You are enough — forever. Amen.",
    step: "When comparison hits today, step away for a moment of prayer — let God's presence reframe what you're seeing.",
    keyWords: [
      { word: "Portion", meaning: "Your share, your inheritance, what you get to keep. Asaph realized God Himself is his portion — and unlike everything else, that can never be taken away." },
      { word: "Sanctuary", meaning: "God's presence, where perspective gets restored. The crisis didn't resolve through more analysis but through worship — proximity to God changed how he saw everything." },
    ],
    verses: [
      { ref: "Psalm 73:25", text: "Whom do I have in heaven? There is no one on earth whom I desire besides you.", meaning: "When God becomes your deepest desire, the things you envied lose their pull. Nothing on earth compares to having Him." },
      { ref: "Psalm 73:28", text: "But it is good for me to come close to God. I have made the Lord Yahweh my refuge.", meaning: "The answer to a shaken faith isn't distance — it's drawing near. Closeness to God is where everything gets steady again." },
    ],
    sideReflection: "Whose life have I been envying — and what shifts when I view it from inside God's presence?",
  },

  63: {
    context:
      "Psalms 76–78 are about remembering. Psalm 77 models what to do when you're too distressed to feel God — and Psalm 78 retells God's faithfulness so the next generation won't forget.",
    plainEnglish:
      "In Psalm 77, the writer can't sleep and feels like God has forgotten him — until he deliberately starts remembering: “I will remember the deeds of the Lord.” Recalling God's past faithfulness pulls him out of the spiral. Psalm 78 then urges telling the next generation, so they'll put their hope in God too.",
    aboutGod: "His track record of faithfulness is your evidence when feelings say otherwise.",
    aboutPeople: "We forget what God has done and panic as if He's never come through.",
    realLife: "When you can't feel God, remember Him — recall what He's already done.",
    verse:
      "“I will remember Yah's deeds; for I will remember your wonders of old.” — Psalm 77:11",
    reflection: "When did God come through for you before — and have you forgotten it in this current worry?",
    prayer: "God, when I can't feel You, help me remember You. Bring to mind every time You came through. I'll put my hope in You again. Amen.",
    step: "Make a short “remember” list of times God has been faithful to you, and revisit it when doubt creeps in.",
    keyWords: [
      { word: "Remember", meaning: "Actively recalling God's past faithfulness as a weapon against present fear. Memory is a spiritual discipline — it preaches truth to your panicking heart." },
      { word: "Next generation", meaning: "The people coming after us who need to know what God has done. Faith is passed down by retelling — your remembering becomes their foundation." },
    ],
    verses: [
      { ref: "Lamentations 3:21", text: "This I recall to my mind; therefore I have hope.", meaning: "Hope is often a choice to recall the right things. What you deliberately bring to mind shapes whether you sink or rise." },
      { ref: "Psalm 77:14", text: "You are the God who does wonders. You have made your strength known among the peoples.", meaning: "The God who did wonders before is the same God now. His past faithfulness is your reason to trust Him with what's ahead." },
    ],
    sideReflection: "What past faithfulness of God have I forgotten that I need to deliberately remember right now?",
  },

  64: {
    context:
      "Psalms 79–81 are prayers for restoration. Psalm 80 repeats a beautiful refrain three times — a cry for God to restore us and let His face shine on us again.",
    plainEnglish:
      "Psalm 80 is a community in a rough season pleading, “Restore us, O God; let your face shine, that we may be saved.” It's the prayer for a comeback — for God's favor and nearness to return. The repeated refrain teaches us it's okay to keep asking God for the same thing until restoration comes.",
    aboutGod: "His shining face — His favor and nearness — is what truly restores us.",
    aboutPeople: "We settle for getting our circumstances fixed; what we really need is His face.",
    realLife: "Restoration isn't mainly about your situation changing — it's about God's presence returning.",
    verse:
      "“Turn us again, God. Cause your face to shine, and we will be saved.” — Psalm 80:3",
    reflection: "What part of your life needs God's restoration — and are you asking for His presence, or just a fix?",
    prayer: "God, restore me. Let Your face shine on me again. I don't just want my circumstances fixed — I want You near. Amen.",
    step: "Pray Psalm 80's refrain over one area of your life that feels like it needs a comeback.",
    keyWords: [
      { word: "Restore", meaning: "To bring back to wholeness what was broken or lost. God isn't only in the business of fixing — He restores, returning things to better than mere repair." },
      { word: "Face shine", meaning: "A picture of God's favor and warm attention turned toward you. The deepest restoration isn't a changed situation — it's God's presence returning to you." },
    ],
    verses: [
      { ref: "Joel 2:25", text: "I will restore to you the years that the swarming locust has eaten.", meaning: "God can give back even what felt permanently lost. The wasted years aren't beyond His power to redeem and restore." },
      { ref: "Numbers 6:25", text: "Yahweh make his face to shine on you, and be gracious to you.", meaning: "This is God's heart for you: His face turned toward you, full of grace. You're not under His frown — you're meant to live under His smile." },
    ],
    sideReflection: "What needs restoring in my life — and am I asking God for His presence, not just a quick fix?",
  },

  65: {
    context:
      "Psalms 82–84 include one of the most love-soaked psalms about longing for God's presence. Psalm 84 says a single day near God beats a thousand anywhere else.",
    plainEnglish:
      "Psalm 84 aches with homesickness for God's house: “Better is one day in your courts than a thousand elsewhere.” It calls blessed the people whose strength is in God, who go “from strength to strength.” This is the heart that has discovered there's no better place to be than near God.",
    aboutGod: "His presence is so good that one day there outweighs a thousand anywhere else.",
    aboutPeople: "We pour our longing into a hundred lesser places.",
    realLife: "Nothing this world offers can match a day spent near God.",
    verse:
      "“For a day in your courts is better than a thousand. I would rather be a doorkeeper in God's house than dwell in the tents of wickedness.” — Psalm 84:10",
    reflection: "What are you longing for most right now — and how does it compare to longing for God's presence?",
    prayer: "God, one day with You is better than a thousand anywhere else. Make my heart homesick for You. Be my strength. Amen.",
    step: "Protect a little “courts” time today — an unhurried space just to be with God, and notice how it compares.",
    keyWords: [
      { word: "Courts", meaning: "The space of God's presence — where His people gather near Him. The psalmist would rather have the lowest spot there than the best seat anywhere else." },
      { word: "Strength to strength", meaning: "Growing stronger as you go, not weaker. The journey toward God doesn't drain you — drawing near to Him renews you step by step." },
    ],
    verses: [
      { ref: "Psalm 84:5", text: "Blessed are those whose strength is in you, who have set their hearts on a pilgrimage.", meaning: "When your strength comes from God, the journey itself becomes blessed. You're not running on your own reserves — you're drawing on His." },
      { ref: "Psalm 84:11", text: "For Yahweh God is a sun and a shield. Yahweh will give grace and glory. He withholds no good thing from those who walk blamelessly.", meaning: "God is both your warmth and your protection, and He holds back no good thing from those who walk with Him. You can trust His generosity." },
    ],
    sideReflection: "What am I longing for most — and have I tasted that one day near God outshines it all?",
  },

  66: {
    context:
      "Psalms 85–87 include Psalm 86, where David asks God for one of the most needed gifts: an undivided heart — a heart that isn't pulled in a hundred directions.",
    plainEnglish:
      "Psalm 86 praises God as “compassionate and gracious, slow to anger, abounding in love,” and then asks for something deeply honest: “Give me an undivided heart, that I may fear your name.” David knows his heart gets split between God and a dozen other loyalties — and he asks God to make it whole and single again.",
    aboutGod: "He's compassionate and gracious — and able to unify a divided heart.",
    aboutPeople: "Our hearts get split between God and countless competing loves.",
    realLife: "Peace comes from a unified heart, not one pulled in every direction.",
    verse:
      "“Teach me your way, Yahweh. I will walk in your truth. Make my heart undivided to fear your name.” — Psalm 86:11",
    reflection: "What's dividing your heart right now — pulling your devotion in competing directions?",
    prayer: "God, my heart is so divided. Make it whole. Unite it to love and trust You above everything pulling at me. Amen.",
    step: "Name the main thing competing with God for your heart, and ask Him today to make your heart undivided.",
    keyWords: [
      { word: "Undivided heart", meaning: "A heart unified around one love instead of split among many. So much of our anxiety comes from a divided heart — wholeness is found in singular devotion to God." },
      { word: "Slow to anger", meaning: "How David describes God — patient, not quick to give up on us. The God you're asking to unify your heart is gentle and abounding in love." },
    ],
    verses: [
      { ref: "Psalm 86:15", text: "But you, Lord, are a merciful and gracious God, slow to anger, and abundant in loving kindness and truth.", meaning: "When you come to God with your divided, messy heart, this is who meets you — merciful, gracious, patient, overflowing with love." },
      { ref: "Matthew 6:24", text: "No one can serve two masters... You can't serve both God and Mammon.", meaning: "A divided heart eventually tears you apart. Jesus is honest: peace requires choosing one master — and only One is worthy of it all." },
    ],
    sideReflection: "What is dividing my heart — and what would an undivided devotion to God feel like?",
  },

  67: {
    context:
      "Psalms 88–90 include the Bible's darkest psalm and one of its most sobering. Psalm 88 ends without resolution — proof that even unanswered grief belongs in prayer. Psalm 90 teaches us to treasure our days.",
    plainEnglish:
      "Psalm 88 is striking: it's a prayer of deep depression that never resolves into a happy ending — and God put it in the Bible anyway, validating the seasons where the darkness doesn't lift on cue. Psalm 90 zooms out on how short life is and prays, “teach us to number our days,” so we live them wisely and fully.",
    aboutGod: "He's big enough to hold your prayers even when they don't resolve.",
    aboutPeople: "We feel ashamed of unresolved grief; God put a whole psalm of it in Scripture.",
    realLife: "Faith doesn't require a tidy ending — sometimes it's just keeping the conversation with God open.",
    verse:
      "“So teach us to count our days, that we may gain a heart of wisdom.” — Psalm 90:12",
    reflection: "Is there a grief that hasn't resolved — and can you keep praying through it without a tidy ending?",
    prayer: "God, even when the darkness doesn't lift, I'll keep talking to You. Teach me to number my days and live them well. Amen.",
    step: "If you're in an unresolved season, keep praying anyway today — honesty without a happy ending is still faith.",
    keyWords: [
      { word: "Number our days", meaning: "To live aware that life is short and precious. Counting your days isn't morbid — it's what makes you spend them on what truly matters." },
      { word: "Unresolved", meaning: "Psalm 88 ends in darkness with no neat resolution — and that's okay. God includes the prayers that don't tie up neatly, so you know yours belong too." },
    ],
    verses: [
      { ref: "Psalm 90:14", text: "Satisfy us in the morning with your loving kindness, that we may rejoice and be glad all our days.", meaning: "Even Psalm 90's sober look at life's brevity ends in hope: God's love can satisfy you and bring gladness to the days you have." },
      { ref: "Psalm 88:1", text: "Yahweh, the God of my salvation, I have cried day and night before you.", meaning: "Even the darkest psalm is still addressed to God. As long as you keep crying out to Him, your faith is alive — direction matters more than resolution." },
    ],
    sideReflection: "Can I keep talking honestly to God through a grief that hasn't lifted — and number my days as a gift?",
  },

  68: {
    context:
      "Psalms 91–93 are some of the most quoted promises of protection in Scripture. Psalm 91 paints God as a shelter, a refuge, a covering of wings.",
    plainEnglish:
      "Psalm 91 promises that whoever “dwells in the shelter of the Most High” will rest in His shadow. It piles up images of safety — refuge, fortress, covering wings — for the person who makes God their dwelling place. It's not a magic charm against all hardship, but a deep assurance that you are held by God through it.",
    aboutGod: "He's a shelter you can actually live in — not just visit in emergencies.",
    aboutPeople: "We treat God as an emergency exit instead of a dwelling place.",
    realLife: "Safety isn't the absence of danger — it's dwelling in God through it.",
    verse:
      "“He who dwells in the secret place of the Most High will rest in the shadow of the Almighty.” — Psalm 91:1",
    reflection: "Do you visit God in crisis, or actually “dwell” in Him as your everyday shelter?",
    prayer: "God, be my dwelling place, not just my emergency exit. I rest in Your shelter, under the shadow of Your wings. Amen.",
    step: "Build one small daily rhythm of “dwelling” with God this week — same time, same quiet, returning to your shelter.",
    keyWords: [
      { word: "Dwell", meaning: "To live somewhere, not just visit. God offers to be your permanent home, not a place you run to only when things fall apart." },
      { word: "Shadow of the Almighty", meaning: "An image of intimate closeness — near enough to be in His shade, under His wings. Real safety is found in nearness, not distance." },
    ],
    verses: [
      { ref: "Psalm 91:4", text: "He will cover you with his feathers. Under his wings you will take refuge.", meaning: "God's protection is tender, like a bird sheltering its young. You're not just defended — you're gently covered and kept close." },
      { ref: "Psalm 91:2", text: "I will say of Yahweh, 'He is my refuge and my fortress; my God, in whom I trust.'", meaning: "Notice the personal words — *my* refuge, *my* God. Safety becomes real when God isn't just powerful in general, but yours in particular." },
    ],
    sideReflection: "Am I treating God as an emergency exit or as the shelter I actually live in?",
  },

  69: {
    context:
      "Psalms 94–96 call us to worship with fresh wonder. Psalm 96 commands a “new song” — a reminder that gratitude shouldn't go stale.",
    plainEnglish:
      "Psalm 95 invites us to come before God with thanksgiving and bow down before our Maker. Psalm 96 says, “Sing to the Lord a new song” — not because the old songs were bad, but because God is doing new things worth fresh praise. Worship is meant to stay alive, not become a routine you sleepwalk through.",
    aboutGod: "He's always doing new things worthy of fresh praise.",
    aboutPeople: "Our worship goes stale and routine if we let it.",
    realLife: "Find a “new song” — a fresh reason to thank God — today.",
    verse:
      "“Sing to Yahweh a new song! Sing to Yahweh, all the earth.” — Psalm 96:1",
    reflection: "Has your gratitude gone stale — and what's a fresh, specific reason to praise God today?",
    prayer: "God, keep my worship alive. Give me a new song today — fresh wonder at who You are and what You're doing. Amen.",
    step: "Thank God for one brand-new thing today — something you've never specifically thanked Him for before.",
    keyWords: [
      { word: "New song", meaning: "Fresh praise for fresh mercies. God's faithfulness shows up in new ways daily, so worship is meant to stay alive, never a stale routine." },
      { word: "Worship", meaning: "Bowing your heart before your Maker. It's not about feeling impressive but about rightly responding to the One who is — gratitude, awe, surrender." },
    ],
    verses: [
      { ref: "Lamentations 3:23", text: "They are new every morning. Great is your faithfulness.", meaning: "God's mercies arrive fresh each morning — which means there's always a new reason to praise. Today's grace isn't yesterday's leftovers." },
      { ref: "Psalm 95:2", text: "Let's come before his presence with thanksgiving. Let's extol him with songs.", meaning: "Thanksgiving is the doorway into God's presence. Gratitude isn't just polite — it's how you draw near to Him." },
    ],
    sideReflection: "Has my gratitude gone on autopilot — and what fresh “new song” could I sing to God today?",
  },

  70: {
    context:
      "Psalms 97–99 declare a steadying truth for anxious times: “The Lord reigns.” Whatever the headlines say, God is still on the throne.",
    plainEnglish:
      "These psalms repeat that the Lord reigns — He is King, holy, and in control. Psalm 99 emphasizes His holiness, calling people to worship. When the world feels chaotic and out of control, these psalms re-anchor us: there is a good God on the throne, and He hasn't been voted out.",
    aboutGod: "He reigns — holy, sovereign, and unshaken by the chaos that shakes us.",
    aboutPeople: "We panic as if no one's in charge; God is, always.",
    realLife: "You can face uncertain times steady, because God still reigns.",
    verse:
      "“Yahweh reigns! Let the earth rejoice! Let the multitude of islands be glad!” — Psalm 97:1",
    reflection: "What feels out of control in your life or the world — and does it change things that God still reigns?",
    prayer: "God, You reign. When everything feels chaotic, I anchor here: You're holy, You're King, and You're in control. I can rest. Amen.",
    step: "When anxious news or worry hits today, pause and say: “The Lord reigns” — and let it re-anchor you.",
    keyWords: [
      { word: "Reigns", meaning: "God is actively King right now — not retired, not overthrown. However out of control things feel, the throne is occupied by a good God." },
      { word: "Holy", meaning: "God is utterly pure, set apart, in a category by Himself. His holiness means He's perfectly good — so His reign is something to celebrate, not fear." },
    ],
    verses: [
      { ref: "Psalm 93:1", text: "Yahweh reigns! He is clothed with majesty!... The world also is established. It can't be moved.", meaning: "The world rests on the rule of a God who can't be toppled. When your footing feels shaky, His reign is the ground that doesn't move." },
      { ref: "Daniel 4:34", text: "His dominion is an everlasting dominion, and his kingdom from generation to generation.", meaning: "Earthly powers rise and fall, but God's reign never ends. The One in charge today will still be in charge for every generation to come." },
    ],
    sideReflection: "What feels out of control right now — and how does “the Lord reigns” steady me in it?",
  },

  71: {
    context:
      "Psalms 100–102 swing from pure thanksgiving to deep affliction — and that range is the point. Psalm 100 is exuberant praise; Psalm 102 is a prayer of the afflicted. Both are real worship.",
    plainEnglish:
      "Psalm 100 bursts with joy: “Enter his gates with thanksgiving!” Psalm 102 is titled “a prayer of the afflicted when overwhelmed.” Putting them side by side shows that worship has room for both the mountaintop and the valley — you can come to God with thanks AND with your overwhelm.",
    aboutGod: "He welcomes both your thanksgiving and your overwhelm — both are worship.",
    aboutPeople: "We think only happy prayers count; God receives the overwhelmed too.",
    realLife: "Thanksgiving is the way in, even on the days you're barely holding on.",
    verse:
      "“Enter into his gates with thanksgiving, and into his courts with praise. Give thanks to him, and bless his name.” — Psalm 100:4",
    reflection: "Whether you're on a high or barely holding on, what can you thank God for as you come to Him today?",
    prayer: "God, on my good days and my overwhelmed days, I come to You. Thank You that both are welcome. I enter Your gates with thanks. Amen.",
    step: "Begin your prayer time today with thanksgiving — name three things — no matter how you're feeling.",
    keyWords: [
      { word: "Thanksgiving", meaning: "The doorway into God's presence, available on any kind of day. You don't have to feel grateful to start being grateful — and it opens the gate." },
      { word: "Afflicted", meaning: "Crushed, overwhelmed, worn down. Psalm 102 shows even this state is welcome in prayer — God doesn't only take your highlight reel." },
    ],
    verses: [
      { ref: "1 Thessalonians 5:18", text: "In everything give thanks, for this is the will of God in Christ Jesus toward you.", meaning: "Not thanks *for* everything, but *in* everything — gratitude you can practice even mid-struggle. There's always something to thank God for." },
      { ref: "Psalm 102:17", text: "He has responded to the prayer of the destitute, and has not despised their prayer.", meaning: "When you're at your lowest and your prayer feels weak, God doesn't despise it — He responds. The desperate prayer is heard just as clearly." },
    ],
    sideReflection: "Whether I'm grateful or overwhelmed today, what can I thank God for as I come to Him?",
  },

  72: {
    context:
      "Psalm 103 is one of the most beloved chapters in the Bible — a soul-stirring list of God's benefits, including the most freeing picture of forgiveness ever written.",
    plainEnglish:
      "David tells his own soul to “bless the Lord” and not forget His benefits: He forgives all your sins, heals your diseases, redeems your life, crowns you with love. Then the stunner — He removes our sins “as far as the east is from the west.” Not east from west (which meet), but east from west — a distance with no end. Your forgiven sins are gone for good.",
    aboutGod: "He removes your sins so far they can never be counted against you again.",
    aboutPeople: "We keep re-reading our old failures; God has already filed them away forever.",
    realLife: "What God has forgiven, you're allowed to stop carrying.",
    verse:
      "“As far as the east is from the west, so far has he removed our transgressions from us.” — Psalm 103:12",
    reflection: "What forgiven failure are you still carrying that God has already removed “as far as the east is from the west”?",
    prayer: "God, thank You that my sins are removed as far as east from west. Help me stop carrying what You've already taken away. Bless Your name. Amen.",
    step: "Name one old failure you keep replaying, and choose to leave it where God put it — gone.",
    keyWords: [
      { word: "Benefits", meaning: "The everyday gifts of being God's — forgiveness, healing, redemption, love. David lists them to remind his soul not to take grace for granted." },
      { word: "As far as east from west", meaning: "An infinite distance — east and west never meet, unlike north and south. It's God's way of saying your forgiven sin is gone with no limit, never to return." },
    ],
    verses: [
      { ref: "Psalm 103:13", text: "Like a father has compassion on his children, so Yahweh has compassion on those who fear him.", meaning: "God isn't a harsh judge tallying your faults — He's a compassionate Father. He relates to you with the tenderness of the best dad imaginable." },
      { ref: "Micah 7:19", text: "He will again have compassion on us. He will tread our iniquities under foot; and you will cast all their sins into the depths of the sea.", meaning: "God throws your sins into the deep sea — not the shallows where they wash back up. What He forgives, He disposes of completely." },
    ],
    sideReflection: "What forgiven failure am I still dragging around that God has already removed beyond reach?",
  },

  73: {
    context:
      "Psalms 106–108 retell God's repeated rescues. Psalm 107 has a refrain inviting the “redeemed of the Lord” to tell their story — and a beautiful line about God healing with His word.",
    plainEnglish:
      "Psalm 107 calls on “the redeemed of the Lord” to say so — to tell about the times God brought them out of trouble. It describes people in every kind of distress crying out and being rescued, including one who “sent his word and healed them.” Your rescue story isn't just yours to keep — it's meant to be told.",
    aboutGod: "He rescues, redeems, and heals — and loves when His people tell about it.",
    aboutPeople: "We stay quiet about what God's done; He invites us to say so.",
    realLife: "Your testimony of God's rescue could be exactly what someone else needs to hear.",
    verse:
      "“Let the redeemed by Yahweh say so, whom he has redeemed from the hand of the adversary.” — Psalm 107:2",
    reflection: "What's a “rescue story” in your life that God might want you to actually tell someone?",
    prayer: "God, You've rescued me more times than I can count. Give me courage to say so — to tell my story and point others to You. Amen.",
    step: "Tell one person this week about a time God rescued or came through for you.",
    keyWords: [
      { word: "Redeemed", meaning: "Bought back, rescued, set free. If God has brought you out of any pit, this word is your identity — and your story is worth telling." },
      { word: "Say so", meaning: "Speak up about what God has done. Your testimony isn't bragging — it's evidence that points others to the God who rescues." },
    ],
    verses: [
      { ref: "Psalm 107:20", text: "He sends his word, and heals them, and delivers them from their graves.", meaning: "God's word carries healing power. The same word that spoke the world into being can speak life into your deepest places." },
      { ref: "Revelation 12:11", text: "They overcame him because of the Lamb's blood, and because of the word of their testimony.", meaning: "Your testimony is a weapon. Telling what God has done doesn't just encourage others — it defeats the lies the enemy whispers." },
    ],
    sideReflection: "What rescue story has God written in my life that someone else needs to hear me say out loud?",
  },

  74: {
    context:
      "Psalms 109–111 move toward awe. Psalm 111 ends with a foundational truth repeated throughout Scripture: reverence for God is where real wisdom begins.",
    plainEnglish:
      "Psalm 111 praises God's works as great, gracious, and trustworthy, then closes with the famous line: “The fear of the Lord is the beginning of wisdom.” This “fear” isn't being scared — it's awe, reverence, taking God seriously. And it's the starting point for living wisely; everything good begins by rightly honoring God.",
    aboutGod: "He's worthy of awe — and honoring Him is where wisdom starts.",
    aboutPeople: "We chase wisdom everywhere but its actual starting point: reverence for God.",
    realLife: "A wise life doesn't start with information — it starts with awe of God.",
    verse:
      "“The fear of Yahweh is the beginning of wisdom. All those who do his work have a good understanding.” — Psalm 111:10",
    reflection: "Where do you need wisdom right now — and does it start with seeking God or just seeking answers?",
    prayer: "God, You're worthy of all my awe. Give me a reverent heart, because that's where real wisdom begins. Teach me to take You seriously. Amen.",
    step: "Before your next big decision, pause to honor God first — invite His wisdom before you weigh the options.",
    keyWords: [
      { word: "Fear of the Lord", meaning: "Not terror, but reverent awe — taking God seriously as God. It's the respect that reorients your whole life and opens the door to real wisdom." },
      { word: "Wisdom", meaning: "Skill at living well, not just knowing facts. It begins not with information but with rightly honoring God — everything wise flows from there." },
    ],
    verses: [
      { ref: "Proverbs 9:10", text: "The fear of Yahweh is the beginning of wisdom. The knowledge of the Holy One is understanding.", meaning: "Real understanding starts with knowing God, not just knowing things. Put Him first, and the rest of life comes into focus." },
      { ref: "James 1:5", text: "But if any of you lacks wisdom, let him ask of God, who gives to all liberally without reproach.", meaning: "When you need wisdom, you don't have to figure it out alone — just ask. God gives it generously, without making you feel foolish for asking." },
    ],
    sideReflection: "Where am I seeking answers without first seeking the God who is the beginning of wisdom?",
  },

  75: {
    context:
      "Psalms 112–114 describe the settled, fearless life of someone who trusts God. Psalm 112 contains a striking promise about facing bad news.",
    plainEnglish:
      "Psalm 112 describes the person who delights in God: they're gracious, generous, and — remarkably — they “will have no fear of bad news” because their heart is steadfast, trusting in the Lord. Psalm 113 celebrates a God who lifts the poor from the dust. The picture is a heart so anchored in God it can face hard news without being shaken apart.",
    aboutGod: "He's a steady anchor that lets you face bad news unshaken.",
    aboutPeople: "We brace for the worst; a heart anchored in God can stay steady.",
    realLife: "You can't always control the news — but you can be anchored before it comes.",
    verse:
      "“He will not be afraid of evil tidings. His heart is steadfast, trusting in Yahweh.” — Psalm 112:7",
    reflection: "What “bad news” are you bracing for — and how anchored in God is your heart for it?",
    prayer: "God, anchor my heart in You so deeply that even bad news can't shake me apart. I trust You — steady me before it comes. Amen.",
    step: "Strengthen your anchor today: spend time in God's word now, before the hard news of life arrives.",
    keyWords: [
      { word: "Steadfast", meaning: "Firmly fixed, not easily shaken. A heart anchored in God ahead of time can meet bad news without being knocked over by it." },
      { word: "No fear of bad news", meaning: "Not that hard news never comes, but that it can't destroy you. When your trust is settled in God, you face the worst from a place of stability." },
    ],
    verses: [
      { ref: "Psalm 112:8", text: "His heart is established. He will not be afraid in the end.", meaning: "A heart established in God isn't ruled by what-ifs. You can live with an inner steadiness that fear can't override." },
      { ref: "John 16:33", text: "In the world you have trouble; but cheer up! I have overcome the world.", meaning: "Jesus doesn't promise a trouble-free life — He promises He's bigger than the trouble. You can have peace because He's already overcome it." },
    ],
    sideReflection: "What bad news am I bracing for — and is my heart anchored enough in God to face it unshaken?",
  },

  76: {
    context:
      "Psalms 115–117 include the deeply personal Psalm 116 (“I love the Lord, because he hears me”) and the shortest chapter in the whole Bible, Psalm 117.",
    plainEnglish:
      "Psalm 116 is intimate: “I love the Lord, because he has heard my voice.” The writer was at death's door, cried out, and God listened — and now love pours out in response. Psalm 117, just two verses, calls all nations to praise God for His great love. Being heard by God is enough to make a heart fall in love with Him.",
    aboutGod: "He actually listens — He bends down to hear your voice.",
    aboutPeople: "We feel unheard by people and assume God's the same; He isn't.",
    realLife: "Being truly heard by God is one of the deepest comforts there is.",
    verse:
      "“I love Yahweh, because he listens to my voice, and my cries for mercy.” — Psalm 116:1",
    reflection: "When did God hear you in a moment you felt unheard by everyone else?",
    prayer: "God, thank You that You actually listen — that You bend down to hear my voice. I love You because You hear me. Amen.",
    step: "Pray honestly today, fully believing God is listening — then notice the comfort of simply being heard.",
    keyWords: [
      { word: "He hears", meaning: "God genuinely listens to your voice and your cries. In a world where you often feel unheard, this is the comfort that turns into love." },
      { word: "Inclined his ear", meaning: "A picture of God bending down to listen, the way you lean toward someone you care about. He doesn't hear you from a distance — He draws close to listen." },
    ],
    verses: [
      { ref: "Psalm 116:2", text: "Because he has turned his ear to me, therefore I will call on him as long as I live.", meaning: "Knowing God turns His ear toward you changes everything about prayer. Why stay silent when the God of the universe leans in to listen?" },
      { ref: "1 John 5:14", text: "This is the boldness which we have toward him, that if we ask anything according to his will, he listens to us.", meaning: "You can pray with confidence, not hesitation. God isn't half-listening — He hears you, and that's reason to come boldly." },
    ],
    sideReflection: "Where have I felt unheard — and what changes when I believe God truly listens to my voice?",
  },

  77: {
    context:
      "Psalm 118 is the joyful centerpiece here — it holds the famous “this is the day the Lord has made” and a prophecy about Jesus as “the stone the builders rejected.”",
    plainEnglish:
      "Psalm 118 repeatedly declares that God's love “endures forever,” recounts being rescued, and celebrates with “this is the day the Lord has made; let us rejoice and be glad in it.” It also predicts the rejected stone becoming the cornerstone — which the New Testament applies to Jesus, rejected by people but made the foundation of everything.",
    aboutGod: "His love endures forever, and He makes something foundational out of the rejected.",
    aboutPeople: "We wait for a “better day” to rejoice; God gives us today.",
    realLife: "This day — the actual one you're in — is a gift to rejoice in, not endure.",
    verse:
      "“This is the day that Yahweh has made. We will rejoice and be glad in it.” — Psalm 118:24",
    reflection: "Are you waiting for a “better day” to be glad — when this day is the one God made for you?",
    prayer: "God, this is the day You made — help me rejoice in it instead of wishing it away. Thank You that Your love endures forever. Amen.",
    step: "Find one specific thing to rejoice in TODAY — not someday — and thank God for this exact day.",
    keyWords: [
      { word: "This is the day", meaning: "Today — not a hypothetical better one — is God's gift to rejoice in. Gladness isn't reserved for ideal circumstances; it's available in the day you actually have." },
      { word: "Cornerstone", meaning: "The foundational stone that everything is built on and aligned to. Jesus was rejected by people but became the cornerstone — what others discard, God can make essential." },
    ],
    verses: [
      { ref: "Psalm 118:22", text: "The stone which the builders rejected has become the cornerstone.", meaning: "God specializes in making the rejected essential. What the world tossed aside — including, sometimes, you — He builds His work upon." },
      { ref: "Psalm 118:1", text: "Give thanks to Yahweh, for he is good, for his loving kindness endures forever.", meaning: "God's love has no expiration date — it endures forever. Whatever today holds, that steady, unending love is the ground under your feet." },
    ],
    sideReflection: "Am I postponing joy for a “better day” when God made this one for me to rejoice in?",
  },

  78: {
    context:
      "Psalms 121–123 are “songs of ascents” — sung by travelers heading up to worship. Psalm 121 is the beloved one that lifts our eyes to where our help truly comes from.",
    plainEnglish:
      "Psalm 121 begins, “I lift up my eyes to the hills — where does my help come from? My help comes from the Lord.” It promises a God who watches over you and never sleeps on the job — your keeper, your shade, watching your coming and going. It's the prayer of someone who looked up and remembered where real help is.",
    aboutGod: "He's your keeper — watching over you and never once falling asleep.",
    aboutPeople: "We look everywhere for help before we look up.",
    realLife: "When you don't know where help will come from, look up first.",
    verse:
      "“I will lift up my eyes to the hills. Where does my help come from? My help comes from Yahweh, who made heaven and earth.” — Psalm 121:1-2",
    reflection: "Where have you been looking for help — and have you looked up to God first?",
    prayer: "God, I lift my eyes to You. My help comes from You — the maker of heaven and earth, who never sleeps. Watch over me. Amen.",
    step: "Today, when you feel stuck or helpless, physically look up and pray: “My help comes from the Lord.”",
    keyWords: [
      { word: "Lift up my eyes", meaning: "A deliberate shift of focus — from the problem down here to the God up there. Help begins when you stop staring at the trouble and look to Him." },
      { word: "Keeper", meaning: "One who guards and watches over you. God isn't a distant overseer — He's your personal keeper, attentive to your every coming and going." },
    ],
    verses: [
      { ref: "Psalm 121:3", text: "He who keeps you will not slumber. Behold, he who keeps Israel will neither slumber nor sleep.", meaning: "God never dozes off on watch. While you sleep tonight, He's wide awake, keeping you — you're never unguarded." },
      { ref: "Psalm 121:8", text: "Yahweh will keep your going out and your coming in, from this time forward, and forever more.", meaning: "God's watch over you covers every direction and every season — going out, coming in, now and always. You're never outside His care." },
    ],
    sideReflection: "Where have I been searching for help on my own instead of lifting my eyes to God first?",
  },

  79: {
    context:
      "Psalms 124–126 celebrate God's deliverance. Psalm 126 holds a tender promise for anyone in a season of tears: the planting won't be wasted.",
    plainEnglish:
      "Psalm 126 remembers a time God restored His people and their mouths were “filled with laughter.” Then comes the promise for the still-grieving: “Those who sow in tears will reap with songs of joy.” The tears you're sowing now aren't pointless — they're seeds, and a harvest of joy is coming.",
    aboutGod: "He turns tearful sowing into a harvest of joy.",
    aboutPeople: "We feel our tears are wasted; God treats them as seeds.",
    realLife: "The grief you're carrying isn't the end — it's seed for a coming joy.",
    verse:
      "“Those who sow in tears will reap in joy.” — Psalm 126:5",
    reflection: "What “tears” are you sowing right now that feel wasted — but might be seeds of a coming harvest?",
    prayer: "God, these tears feel wasted, but You call them seeds. I trust You're growing a harvest of joy I can't see yet. Amen.",
    step: "Keep showing up faithfully in your hard season today — trust you're sowing seeds, not just shedding tears.",
    keyWords: [
      { word: "Sow in tears", meaning: "Faithfully doing the hard, painful work even while grieving. Your tears aren't wasted — they're seeds, and God promises a harvest from them." },
      { word: "Reap in joy", meaning: "The harvest that follows faithful, tearful sowing. The grief isn't the final word — joy is what's coming up from the ground you watered with tears." },
    ],
    verses: [
      { ref: "Psalm 126:6", text: "He who goes out weeping, carrying seed for sowing, will assuredly come again with joy, carrying his sheaves.", meaning: "The one who plants through tears comes home celebrating, arms full of harvest. Your weeping today is connected to a coming joy you'll carry home." },
      { ref: "Galatians 6:9", text: "Let's not be weary in doing good, for we will reap in due season, if we don't give up.", meaning: "Don't quit in the hard season — the harvest comes to those who keep going. Faithfulness now has a payoff you can't yet see." },
    ],
    sideReflection: "What tears am I sowing that feel wasted — and can I trust God is growing a harvest from them?",
  },

  80: {
    context:
      "Psalms 127–129 include a short, life-changing truth in Psalm 127: without God, all our striving is exhausting and empty. It's a word for the over-worked and anxious.",
    plainEnglish:
      "Psalm 127 says, “Unless the Lord builds the house, the builders labor in vain” — and that God “gives sleep to his beloved,” even while the anxious work themselves to exhaustion. It's not anti-work; it's anti-striving-without-God. The invitation is to stop white-knuckling your life and let God be the builder.",
    aboutGod: "He's the true builder — and He gives rest to those He loves.",
    aboutPeople: "We exhaust ourselves building lives God never asked us to carry alone.",
    realLife: "Effort without God is just exhausting; invite Him into the building.",
    verse:
      "“Unless Yahweh builds the house, they who build it labor in vain... for he gives sleep to his loved ones.” — Psalm 127:1-2",
    reflection: "What are you striving to build on your own that you've never really invited God into?",
    prayer: "God, I'm tired of building alone. Be the builder of my life. Help me work from rest, not anxiety. Thank You for the sleep You give. Amen.",
    step: "Identify one thing you've been anxiously striving at, and invite God to be the builder of it today.",
    keyWords: [
      { word: "In vain", meaning: "Wasted effort, striving that goes nowhere. Work without God at the center exhausts you without truly building — He has to be the foundation." },
      { word: "Gives sleep to his beloved", meaning: "God's gift of rest to those He loves. You don't have to earn your worth through endless striving — He invites you to rest in being loved." },
    ],
    verses: [
      { ref: "Matthew 11:29", text: "Take my yoke upon you and learn from me... and you will find rest for your souls.", meaning: "Jesus offers a different way to carry your load — yoked to Him. The striving that wears you out can be traded for a rest that holds." },
      { ref: "Psalm 127:2", text: "It is vain for you to rise up early, to stay up late, eating the bread of toil, for he gives sleep to his loved ones.", meaning: "Burning the candle at both ends won't build what only God can. He'd rather give you rest than watch you strive yourself empty." },
    ],
    sideReflection: "What am I striving to build alone that I need to hand to God, the true builder?",
  },

  81: {
    context:
      "Psalms 130–132 include two gems: Psalm 130's cry “out of the depths,” and Psalm 131's picture of a soul quieted like a contented child.",
    plainEnglish:
      "Psalm 130 cries to God “out of the depths” and marvels that if God kept a record of sins, no one could stand — but “with you there is forgiveness.” Psalm 131 is tiny and tender: David calms his striving soul “like a weaned child with its mother,” no longer fussing for what it can't have. From the depths to deep peace, in two short psalms.",
    aboutGod: "He keeps no record of forgiven sins — and quiets the soul that trusts Him.",
    aboutPeople: "We either drown in the depths or fuss like restless children; God meets both.",
    realLife: "You can cry from the depths AND learn to rest like a contented child — both with God.",
    verse:
      "“If you, Yah, kept a record of sins, Lord, who could stand? But there is forgiveness with you...” — Psalm 130:3-4",
    reflection: "Are you crying from the depths, or fussing restlessly — and can you let God quiet your soul today?",
    prayer: "God, out of the depths I cry — and You meet me with forgiveness, not a record of wrongs. Quiet my soul like a content child. Amen.",
    step: "Practice Psalm 131 today: when your soul gets restless and fussy, consciously calm it and rest in God.",
    keyWords: [
      { word: "Out of the depths", meaning: "Crying to God from your lowest point. The depths aren't too deep for God to hear — His forgiveness reaches all the way down." },
      { word: "Weaned child", meaning: "A child past fussing for milk, content just to be held. It's a picture of a soul that has stopped demanding and learned to rest in God's presence." },
    ],
    verses: [
      { ref: "Psalm 131:2", text: "Surely I have stilled and quieted my soul, like a weaned child with his mother. My soul is like a weaned child within me.", meaning: "Peace is something you can cultivate — stilling your soul on purpose. Like a content child, you can rest in God without needing to have it all figured out." },
      { ref: "Psalm 130:7", text: "Israel, hope in Yahweh, for there is loving kindness with Yahweh. Abundant redemption is with him.", meaning: "However deep your pit, God's redemption is more abundant still. There's always more grace in Him than there is mess in you." },
    ],
    sideReflection: "Is my soul crying from the depths or fussing restlessly — and how can I let God quiet it today?",
  },

  82: {
    context:
      "Psalms 133–135 celebrate the goodness of God's people living together in unity. Psalm 133 is short but rich — a picture of how good community can be.",
    plainEnglish:
      "Psalm 133 opens, “How good and pleasant it is when brothers live together in unity!” and compares it to precious oil and refreshing dew. In a world full of division, this psalm celebrates the rare beauty of real togetherness among God's people — and ties God's blessing to it. We're not meant to walk with God in isolation.",
    aboutGod: "He pours out blessing where His people live in genuine unity.",
    aboutPeople: "We drift toward isolation and division; God designed us for togetherness.",
    realLife: "Walking with God was never meant to be done alone.",
    verse:
      "“See how good and how pleasant it is for brothers to live together in unity!” — Psalm 133:1",
    reflection: "Are you trying to walk with God in isolation — and who could you walk alongside instead?",
    prayer: "God, thank You for the gift of others to walk with. Help me pursue real unity and community, not isolation. Bless us as we do. Amen.",
    step: "Reach out to one fellow believer this week — coffee, a call, a message — and invest in walking together.",
    keyWords: [
      { word: "Unity", meaning: "People genuinely together, not just in the same room. It's rare and precious — and Scripture says God's blessing flows where it's found." },
      { word: "Pleasant", meaning: "Delightful, refreshing, life-giving. Real Christian community isn't a duty — at its best it's one of the sweetest gifts of walking with God." },
    ],
    verses: [
      { ref: "Hebrews 10:25", text: "not forsaking our own assembling together, as the custom of some is, but exhorting one another.", meaning: "You're not meant to go it alone. Gathering with others isn't optional extra — it's how faith stays warm and encouraged." },
      { ref: "Ecclesiastes 4:10", text: "For if they fall, the one will lift up his fellow; but woe to him who is alone when he falls.", meaning: "Everyone falls sometimes — and that's when company matters most. Walking with others means someone's there to help you back up." },
    ],
    sideReflection: "Where have I been isolating in my faith — and who could I intentionally walk alongside?",
  },

  83: {
    context:
      "Psalms 136–138 anchor in God's never-ending love. Psalm 136 hammers one refrain 26 times: “his love endures forever” — until it's impossible to forget.",
    plainEnglish:
      "Psalm 136 recounts creation, rescue, and provision, and after every single line repeats: “His love endures forever.” The relentless repetition is the point — God wants this truth burned into us. Psalm 138 adds the confidence that when we walk through trouble, God preserves us. His love isn't a mood; it's a constant.",
    aboutGod: "His love is a constant — it endures forever, through everything.",
    aboutPeople: "We treat God's love as conditional and fluctuating; it never changes.",
    realLife: "God's love for you doesn't rise and fall with your day — it endures forever.",
    verse:
      "“Give thanks to Yahweh, for he is good, for his loving kindness endures forever.” — Psalm 136:1",
    reflection: "Do you believe God's love for you endures forever — or does it feel like it depends on your performance?",
    prayer: "God, Your love endures forever — it doesn't rise and fall with my performance. Burn that truth into me until I stop doubting it. Amen.",
    step: "Say “His love endures forever” after naming several things today — let the repetition sink in like the psalm intends.",
    keyWords: [
      { word: "Endures forever", meaning: "God's love has no end and no off-switch. Repeated 26 times in one psalm so the truth can't be missed — His love is a permanent constant, not a passing mood." },
      { word: "Refrain", meaning: "A line repeated on purpose so it sinks deep. God knows we forget His love, so He had it sung over and over until it lodges in the heart." },
    ],
    verses: [
      { ref: "Psalm 138:7", text: "Though I walk in the middle of trouble, you will revive me.", meaning: "God doesn't always remove the trouble, but He revives you inside it. His love walks you through the middle, not just around it." },
      { ref: "Psalm 138:8", text: "Yahweh will fulfill that which concerns me. Your loving kindness, Yahweh, endures forever.", meaning: "God doesn't abandon what He started in you. His enduring love guarantees He'll finish the good work He's doing in your life." },
    ],
    sideReflection: "Does God's love feel conditional to me — and what would it mean to believe it truly endures forever?",
  },

  84: {
    context:
      "Psalm 139 is one of the most intimate chapters in all of Scripture — the prayer of someone overwhelmed that God knows them completely and still stays close.",
    plainEnglish:
      "Psalm 139 marvels that God knows everything about David — when he sits, what he'll say, every thought — and that he can never go anywhere beyond God's presence. Then the famous line: “I am fearfully and wonderfully made.” To be fully known by God and still fully loved is the deepest security a human heart can have.",
    aboutGod: "He knows you completely — and stays close anyway.",
    aboutPeople: "We fear that if we were truly known, we'd be rejected; God proves otherwise.",
    realLife: "You are fully known by God and fully loved — at the same time.",
    verse:
      "“I will give thanks to you, for I am fearfully and wonderfully made. Your works are wonderful. My soul knows that very well.” — Psalm 139:14",
    reflection: "Do you believe you're “fearfully and wonderfully made” — or have you believed lies about your worth?",
    prayer: "God, You know me completely and stay close anyway. Thank You that I'm fearfully and wonderfully made. Heal the lies I've believed about myself. Amen.",
    step: "When a critical thought about yourself surfaces today, replace it with: “I am fearfully and wonderfully made.”",
    keyWords: [
      { word: "Fully known", meaning: "God knows every thought, word, and moment of your life — nothing hidden. And the wonder is He stays close anyway; being known by Him doesn't risk rejection." },
      { word: "Fearfully and wonderfully made", meaning: "You were crafted with awe and care, on purpose. Your worth isn't an accident or up for debate — it's woven into how God made you." },
    ],
    verses: [
      { ref: "Psalm 139:7", text: "Where could I go from your Spirit? Or where could I flee from your presence?", meaning: "There's no place too far, too low, or too dark for God to be with you. Wherever you go, His presence is already there." },
      { ref: "Psalm 139:17", text: "How precious to me are your thoughts, God! How vast is the sum of them!", meaning: "God thinks about you more than you can count, and His thoughts toward you are precious. You're not on the edge of His mind — you're central to it." },
    ],
    sideReflection: "What lies about my worth have I believed that Psalm 139 directly contradicts?",
  },

  85: {
    context:
      "Psalms 142–144 are wilderness prayers — David in a cave, surrounded, desperate. They model running to God as your refuge and asking Him to teach you His way forward.",
    plainEnglish:
      "Psalm 142 is David in a cave, crying out, “You are my refuge.” Psalm 143 prays one of the most useful prayers in the Bible: “Teach me to do your will,” and “let me hear of your loving kindness in the morning.” When you're cornered and unsure what to do, the move is to make God your refuge and ask Him to lead the way.",
    aboutGod: "He's your refuge in the cave — and your teacher when you don't know the way.",
    aboutPeople: "We hide in caves of fear; God invites us to make Him the refuge instead.",
    realLife: "When you don't know what to do, ask God to teach you His way.",
    verse:
      "“Teach me to do your will, for you are my God. Your Spirit is good. Lead me in the land of uprightness.” — Psalm 143:10",
    reflection: "What “cave” are you in right now — and have you asked God to teach you the way out?",
    prayer: "God, You're my refuge in this cave. I don't know the way forward — teach me to do Your will. Lead me by Your good Spirit. Amen.",
    step: "Pray “teach me to do Your will” over one specific decision today, and stay open to how God leads.",
    keyWords: [
      { word: "Refuge", meaning: "A safe place to run when you're cornered. Even in the cave — the lowest, most desperate spot — God is the shelter you can flee to." },
      { word: "Teach me your will", meaning: "A prayer of humble surrender for guidance. When you don't know the way forward, you don't have to figure it out alone — you can ask God to lead." },
    ],
    verses: [
      { ref: "Psalm 143:8", text: "Cause me to hear your loving kindness in the morning, for I trust in you. Cause me to know the way in which I should walk.", meaning: "Start the day listening for God's love and asking for direction. He's willing to show you the way one morning at a time." },
      { ref: "Proverbs 3:6", text: "In all your ways acknowledge him, and he will make your paths straight.", meaning: "Bring God into every decision, not just the big ones. As you acknowledge Him, He straightens the path you couldn't map on your own." },
    ],
    sideReflection: "What cave am I hiding in — and have I asked God to be my refuge and teach me the way out?",
  },

  86: {
    context:
      "Psalms 145–147 build toward the grand finale of praise. Psalm 145 says God is near to all who call; Psalm 147 reveals a God who tends the brokenhearted and counts the stars.",
    plainEnglish:
      "Psalm 145 declares God is near to everyone who calls on Him and faithful in all He does. Psalm 147 holds a stunning pairing: the God who “heals the brokenhearted and binds up their wounds” is the same God who “counts the number of the stars” and names each one. The cosmic and the tender meet in one God.",
    aboutGod: "He counts the stars AND binds up your wounds — both, with the same hands.",
    aboutPeople: "We assume a God that big can't be bothered with our small wounds; He is.",
    realLife: "The God who runs the universe is gentle enough to bandage your heart.",
    verse:
      "“He heals the broken in heart, and binds up their wounds. He counts the number of the stars; he calls them all by their names.” — Psalm 147:3-4",
    reflection: "What wound are you carrying — and can you trust the God of the stars to gently bind it up?",
    prayer: "God, You count the stars and still bind up my wounds. Bring Your healing to the broken places in me. You're near when I call. Amen.",
    step: "Name one wound you've been minimizing, and bring it to God for healing instead of pretending it's fine.",
    keyWords: [
      { word: "Binds up wounds", meaning: "The image of a gentle healer carefully bandaging an injury. God's power isn't only cosmic — it's tender enough to nurse your broken heart." },
      { word: "Counts the stars", meaning: "God knows and names every star in the universe. The same infinite attention He gives the cosmos, He gives to you and your wounds." },
    ],
    verses: [
      { ref: "Psalm 145:18", text: "Yahweh is near to all those who call on him, to all who call on him in truth.", meaning: "Nearness to God isn't earned by status — it's available to anyone who calls honestly. The God of the stars is only a sincere prayer away." },
      { ref: "Psalm 147:5", text: "Great is our Lord, and mighty in power. His understanding is infinite.", meaning: "There's no limit to what God understands — including everything about your situation. The One healing you grasps it more fully than you do." },
    ],
    sideReflection: "What wound have I been minimizing that the God of the stars wants to gently bind up?",
  },

  87: {
    context:
      "The Psalms end the only way they could — in pure, exuberant praise. Psalms 148–150 call everything that exists to praise God, building to the final, breathless command.",
    plainEnglish:
      "These last psalms summon all of creation — sun, moon, mountains, oceans, animals, young and old — to praise God. Psalm 150 ends the entire book with the climactic line: “Let everything that has breath praise the Lord.” After 150 psalms of honest prayer through every emotion, it all resolves into praise. The journey through the Psalms ends in worship.",
    aboutGod: "He's worthy of the praise of every living thing — including your every breath.",
    aboutPeople: "We were made to praise; it's the truest use of the breath we're given.",
    realLife: "Every breath you have is a reason — and an invitation — to praise God.",
    verse:
      "“Let everything that has breath praise Yah! Praise Yah!” — Psalm 150:6",
    reflection: "After walking through all the honest seasons of the Psalms, what does praise look like for you today?",
    prayer: "God, after all the honest prayers, it all comes back to this: You are worthy. With every breath You've given me, I praise You. Amen.",
    step: "Use your literal breath today — sing, speak, or whisper praise to God, the way the Psalms end.",
    keyWords: [
      { word: "Everything that has breath", meaning: "The widest possible invitation to worship — if you're breathing, you qualify. Praise isn't for the gifted few; it's the birthright of every living thing." },
      { word: "Praise", meaning: "The destination of the whole book of Psalms. After every honest emotion — grief, fear, doubt, joy — it all resolves here, in worship of a God who is worthy." },
    ],
    verses: [
      { ref: "Psalm 150:2", text: "Praise him for his mighty acts! Praise him according to his excellent greatness!", meaning: "There are endless reasons to praise God — His acts and His greatness never run dry. The well of worship never empties." },
      { ref: "Revelation 5:13", text: "I heard every created thing... saying, 'To him who sits on the throne, and to the Lamb be the blessing, the honor, the glory.'", meaning: "One day all creation will praise God together. The worship the Psalms call for is where the whole story is headed — and you get to join it now." },
    ],
    sideReflection: "After walking through every honest season with God, what does it look like for me to praise Him today?",
  },
  88: {
    context: "Solomon opens his collection of wise sayings by telling us exactly why they exist: to help ordinary people live skillfully. Right away he sets up a choice — listen and grow, or brush it off and pay for it later.",
    plainEnglish: "Wisdom isn't hiding in some ivory tower; she's out in the street shouting for anyone to come and learn. Solomon says the whole journey starts with respecting God, and warns that ignoring wisdom — or running with the wrong crowd — leads somewhere you don't want to go.",
    aboutGod: "God isn't stingy with wisdom; He makes it loud and available to anyone willing to listen.",
    aboutPeople: "We can be invited toward a good life and still wander off after the crowd that's heading the other way.",
    realLife: "Who you listen to and who you run with quietly shapes the entire direction of your life.",
    verse: "“The fear of Yahweh is the beginning of knowledge; but the foolish despise wisdom and instruction.” — Proverbs 1:7",
    reflection: "Whose voices are you actually letting steer your decisions right now?",
    prayer: "God, I want my life built on respect for You, not on whoever happens to be loudest. Teach me to listen for wisdom. Amen.",
    step: "Notice one voice or influence pulling you the wrong way today, and choose not to follow it.",
    keyWords: [
      { word: "Fear of the Lord", meaning: "Not being scared of God — it's a deep respect and awe that takes Him seriously. It's the starting point that makes everything else make sense." },
    ],
    verses: [
      { ref: "Psalm 111:10", text: "The fear of Yahweh is the beginning of wisdom. All those who do his work have a good understanding.", meaning: "Real understanding doesn't start with being clever; it starts with honoring God. That posture opens the door to a life that actually works." },
    ],
    sideReflection: "Am I genuinely teachable right now, or have I quietly decided I already know best?",
  },
  89: {
    context: "Here a father pleads with his child to chase wisdom like buried treasure, because the payoff is a life that actually holds together. Solomon knows wisdom won't fall into anyone's lap — it has to be wanted.",
    plainEnglish: "Solomon says wisdom doesn't drop on you; you go after it — asking, searching, digging like you would for silver. And when you do, God Himself hands it over, guarding your path and steering you clear of dead-end roads and people who'll wreck you.",
    aboutGod: "He's the source of real wisdom, and He becomes a shield to those who walk honestly with Him.",
    aboutPeople: "We want shortcuts, but wisdom comes to people willing to go looking for it.",
    realLife: "A life that works isn't stumbled into — it's built on wisdom you went after on purpose.",
    verse: "“For Yahweh gives wisdom. Out of his mouth comes knowledge and understanding.” — Proverbs 2:6",
    reflection: "Where do you need wisdom right now — and have you actually stopped to ask God for it?",
    prayer: "God, I want Your wisdom more than quick fixes. Help me seek it like treasure, and thank You for giving it freely. Amen.",
    step: "Bring one decision you're facing to God today and ask specifically for wisdom before you act.",
    keyWords: [
      { word: "Understanding", meaning: "The ability to see how things really fit together, not just to collect facts. It's wisdom with its eyes open." },
    ],
    verses: [
      { ref: "James 1:5", text: "But if any of you lacks wisdom, let him ask of God, who gives to all liberally without reproach, and it will be given to him.", meaning: "When you're unsure, you don't have to fake having it figured out — just ask. God gives wisdom generously and never makes you feel foolish for needing it." },
    ],
    sideReflection: "What am I trying to figure out on my own that I haven't yet handed to God?",
  },
  90: {
    context: "This is one of the most loved chapters in the whole book, full of lines people frame on their walls. Solomon hands his child practical promises about trust, generosity, and the quiet strength of a life anchored in God.",
    plainEnglish: "Don't lean on your own limited view of things — trust God with the whole map and He'll keep your path straight. Solomon adds that honoring God with your money, accepting correction, and treating people generously all lead to a steadier, fuller life.",
    aboutGod: "He can be trusted with the parts of your life you can't see or control.",
    aboutPeople: "We're wired to trust our own understanding even when it can't see around the corner.",
    realLife: "Peace doesn't come from having every answer — it comes from trusting the One who does.",
    verse: "“Trust in Yahweh with all your heart, and don't lean on your own understanding.” — Proverbs 3:5",
    reflection: "What part of your future are you white-knuckling instead of trusting to God?",
    prayer: "God, I don't have the whole picture, but You do. Help me trust You with the parts I can't see, and walk where You lead. Amen.",
    step: "Name one worry you've been carrying and consciously hand it to God before you sleep tonight.",
    keyWords: [
      { word: "Trust", meaning: "Leaning your full weight on God instead of on your own ability to figure it out. It's choosing to rest in His character even when you can't see the outcome." },
    ],
    verses: [
      { ref: "Psalm 37:5", text: "Commit your way to Yahweh. Trust also in him, and he will do this:", meaning: "Handing your plans to God isn't losing control — it's putting them in stronger hands. He takes what you surrender and works on your behalf." },
    ],
    sideReflection: "Where am I leaning on my own understanding because trusting God feels too risky?",
  },
  91: {
    context: "Solomon shares wisdom he received from his own father, passing the torch one more generation down. He's making the case that the path you choose now sets the trajectory for everything ahead.",
    plainEnglish: "Get wisdom — protect it like it's the most valuable thing you own, because it is. Solomon says to guard your heart above all else, since everything you do flows out of it, and to keep your eyes fixed forward on the path that leads to life.",
    aboutGod: "He cares about the direction of your whole life, not just isolated good moments.",
    aboutPeople: "We tend to guard our money and image far more carefully than we guard our hearts.",
    realLife: "What you let into your heart today quietly writes the story of who you become.",
    verse: "“Keep your heart with all diligence, for out of it is the wellspring of life.” — Proverbs 4:23",
    reflection: "What have you been letting into your heart that's shaping you in ways you don't like?",
    prayer: "God, help me guard my heart — to be careful what I feed it, because it shapes everything I do. Keep me on the path of life. Amen.",
    step: "Cut out one thing you take in daily (a feed, a show, a conversation) that's been souring your heart.",
    keyWords: [
      { word: "Heart", meaning: "In the Bible, the heart is the control center of your life — your thoughts, desires, and choices all flow from it. Guard it, and you guard everything." },
    ],
    verses: [
      { ref: "Luke 6:45", text: "The good man out of the good treasure of his heart brings out that which is good.", meaning: "What fills your heart eventually comes out in how you live and speak. Tending what's inside isn't optional — it's where real change begins." },
    ],
    sideReflection: "What am I regularly feeding my heart, and is it leading me where I actually want to go?",
  },
  92: {
    context: "Solomon turns to a frank, fatherly talk about sex, attraction, and the wreckage of affairs. He's not being prudish — he's protecting his child from a heartbreak that looks sweet at first and turns bitter fast.",
    plainEnglish: "The thrill of crossing a line outside your marriage can taste like honey, but it ends in regret and ruin. Solomon's tender counter-message is to find joy and delight in your own marriage instead, because God sees every path we walk.",
    aboutGod: "He designed intimacy to be safe and good, and He cares enough to warn us before we hurt ourselves.",
    aboutPeople: "We're easily fooled by what looks sweet up close while ignoring where it actually leads.",
    realLife: "Guarding faithfulness — in mind and body — protects the people you love most from deep wounds.",
    verse: "“Rejoice in the wife of your youth.” — Proverbs 5:18",
    reflection: "Where are you letting something that looks sweet pull you toward a path you'd regret?",
    prayer: "God, protect my heart and choices around intimacy. Help me delight in what's truly mine and walk in faithfulness. Amen.",
    step: "Set one honest boundary today around something that's been tempting you down a path you'd regret.",
    keyWords: [
      { word: "Faithfulness", meaning: "Staying true and loyal — keeping your promises to the people you love even when feelings tug elsewhere. It's love that holds its ground." },
    ],
    verses: [
      { ref: "Hebrews 13:4", text: "Let marriage be held in honor among all, and let the bed be undefiled.", meaning: "God treats marriage and intimacy as something precious worth protecting. Honoring it isn't restriction — it's guarding something genuinely good." },
    ],
    sideReflection: "Is there a small compromise I'm tolerating that's quietly leading me somewhere I don't want to go?",
  },
  93: {
    context: "Solomon stacks up a series of street-smart warnings about debt, laziness, and the kind of person who stirs up trouble. It reads like a wise mentor walking you past the potholes he's watched others fall into.",
    plainEnglish: "Don't co-sign your way into a trap, and don't sleepwalk through life like the ant's lazy opposite — go watch the ant, who works without anyone forcing her. Then Solomon lists the things God genuinely hates, like lies, pride, and stirring up conflict, and closes with another warning against affairs.",
    aboutGod: "He hates the things that quietly tear people and communities apart.",
    aboutPeople: "We drift toward ease and shortcuts unless we deliberately choose diligence.",
    realLife: "Small habits — how you work, what you say, how you treat people — add up to the life you end up living.",
    verse: "“Go to the ant, you sluggard. Consider her ways, and be wise.” — Proverbs 6:6",
    reflection: "Where have you been hitting snooze on something you know needs your effort?",
    prayer: "God, give me the diligence to do the work in front of me and the honesty to live cleanly. Keep me from the things You hate. Amen.",
    step: "Tackle one task today you've been avoiding instead of putting it off again.",
    keyWords: [
      { word: "Sluggard", meaning: "An old word for someone chronically lazy — always finding a reason to delay. Solomon uses it as a gentle warning, not an insult, to wake us up." },
    ],
    verses: [
      { ref: "Colossians 3:23", text: "And whatever you do, work heartily, as for the Lord, and not for men.", meaning: "Your everyday work matters to God, even the unglamorous parts. Doing it well becomes a quiet way of honoring Him." },
    ],
    sideReflection: "What am I avoiding that, if I just started today, would lift a weight off me?",
  },
  94: {
    context: "Solomon tells a vivid little story — almost a scene from a window — of a young man walking straight into temptation he could have avoided. It's a cautionary tale meant to make wisdom feel urgent, not abstract.",
    plainEnglish: "A naive young man wanders toward trouble at night and gets swept up by smooth, flattering words into a choice that costs him everything. Solomon's point is blunt: temptation rarely announces its real price tag, so don't even stroll near it.",
    aboutGod: "He warns us honestly because He'd rather protect us than watch us get hurt.",
    aboutPeople: "We overestimate our own willpower and underestimate how persuasive temptation can be.",
    realLife: "The smartest move against temptation is often avoiding the situation long before willpower is tested.",
    verse: "“Don't let your heart turn to her ways. Don't go astray in her paths.” — Proverbs 7:25",
    reflection: "What situation do you keep walking up to, hoping this time you'll resist?",
    prayer: "God, give me the wisdom to see traps before I'm in them, and the strength to walk away early. Guard my steps. Amen.",
    step: "Identify one tempting situation you can simply avoid this week, and make a plan to steer clear.",
    keyWords: [
      { word: "Naive", meaning: "Not stupid — just inexperienced and easily fooled, missing the warning signs. Wisdom is what turns naivety into discernment over time." },
    ],
    verses: [
      { ref: "1 Corinthians 10:13", text: "God is faithful, who will not allow you to be tempted above what you are able, but will with the temptation also make the way of escape.", meaning: "Temptation is never a dead end with God; He always builds in a door out. Part of wisdom is looking for that escape early." },
    ],
    sideReflection: "Where am I overestimating my willpower instead of just avoiding the trap?",
  },
  95: {
    context: "In a beautiful shift, wisdom is pictured as a person calling out in the city square, and she describes her own ancient role beside God. This chapter lifts wisdom from helpful advice to something woven into the fabric of creation itself.",
    plainEnglish: "Wisdom stands at the busiest crossroads and offers herself to anyone, rich or poor, plain-spoken and true. Then she reveals she was there at the very beginning, delighting beside God as He shaped the world — so listening to her is tuning into how reality actually works.",
    aboutGod: "Wisdom is part of who God is, present from before the world began.",
    aboutPeople: "We can have this God-rooted wisdom freely if we'll simply listen and choose it.",
    realLife: "Living wisely means aligning your life with the very grain of how God built the world.",
    verse: "“For whoever finds me finds life, and will obtain favor from Yahweh.” — Proverbs 8:35",
    reflection: "What would change if you treated God's wisdom as the way the world actually works, not just nice advice?",
    prayer: "God, Your wisdom was there before anything existed. Help me trust it and live with the grain of how You made things. Amen.",
    step: "Make one decision today by asking what the wise path is, not just the easy or quick one.",
    keyWords: [
      { word: "Favor", meaning: "God's kindness and goodwill resting on your life. Finding wisdom isn't just smart — it draws you into a life God smiles on." },
    ],
    verses: [
      { ref: "Colossians 2:3", text: "In whom are all the treasures of wisdom and knowledge hidden.", meaning: "The New Testament reveals that the wisdom of Proverbs ultimately points to Jesus. To know Him is to find the source of all real wisdom." },
    ],
    sideReflection: "Am I treating wisdom as optional advice, or as the way life is actually built to work?",
  },
  96: {
    context: "Solomon stages a memorable contrast: two women, Wisdom and Folly, both hosting a dinner and calling out to passersby. It's a picture of the daily invitations competing for your attention.",
    plainEnglish: "Wisdom builds a house and lays out a real feast, inviting you to grow up and truly live. Folly is loud and lazy, offering stolen, secret thrills that seem exciting but lead straight to death — and the difference between them comes down to whether you'll take correction.",
    aboutGod: "He sets a genuine feast before us and invites us into real, lasting life.",
    aboutPeople: "We're drawn to whatever shouts loudest, even when the quieter voice is the one offering life.",
    realLife: "Every day you're choosing which voice to dine with — and those small choices shape your future.",
    verse: "“The fear of Yahweh is the beginning of wisdom. The knowledge of the Holy One is understanding.” — Proverbs 9:10",
    reflection: "Which voice — wisdom's or folly's — have you been accepting more invitations from lately?",
    prayer: "God, help me recognize the difference between what merely sounds good and what's truly good. Seat me at wisdom's table. Amen.",
    step: "Turn down one ‘folly invitation' today and say yes to something that genuinely builds your life.",
    keyWords: [
      { word: "Folly", meaning: "Foolishness that isn't just silly but self-destructive — choosing the path that feels good now and wrecks you later. Wisdom is its opposite and its rescue." },
    ],
    verses: [
      { ref: "Matthew 7:24", text: "Everyone therefore who hears these words of mine and does them, I will liken him to a wise man who built his house on a rock.", meaning: "Jesus echoes Proverbs: wisdom isn't just hearing truth but building your life on it. A life founded on His words can weather any storm." },
    ],
    sideReflection: "Which table am I choosing most days — the one that builds me or the one that just entertains me?",
  },
  97: {
    context: "Here the book shifts gears into the short, punchy two-line sayings most people picture when they think of Proverbs. Each verse stands alone, contrasting the wise and the foolish, the honest and the deceitful, in everyday terms.",
    plainEnglish: "Solomon rapid-fires comparisons: the diligent thrive while the lazy go hungry, hatred stirs up fights but love covers offenses, and careful words bring life while careless ones cause harm. It's a stream of small, sturdy truths about how character plays out day to day.",
    aboutGod: "He notices the quiet integrity that the world often overlooks.",
    aboutPeople: "Our daily words and habits reveal who we really are more than our big speeches do.",
    realLife: "Choosing love over score-keeping defuses more conflict than winning the argument ever could.",
    verse: "“Hatred stirs up strife, but love covers all wrongs.” — Proverbs 10:12",
    reflection: "Is there an offense you're keeping alive that love could finally let go of?",
    prayer: "God, help me cover wrongs with love instead of fueling them. Let my words bring life to the people around me. Amen.",
    step: "Choose to let go of one small offense today instead of holding onto it.",
    keyWords: [
      { word: "Strife", meaning: "Ongoing conflict and friction — the bickering and grudges that wear relationships down. Love is what quiets it." },
    ],
    verses: [
      { ref: "1 Peter 4:8", text: "And above all things be earnest in your love among yourselves, for love covers a multitude of sins.", meaning: "Love doesn't ignore wrong, but it refuses to keep a scoreboard. Choosing to cover an offense is one of the most powerful things you can do for a relationship." },
    ],
    sideReflection: "What offense am I keeping on file that love is asking me to finally release?",
  },
  98: {
    context: "More short sayings, this time circling around honesty, generosity, and the way pride and humility play out. Solomon keeps showing how integrity quietly pays off while crookedness eventually collapses.",
    plainEnglish: "God loves honest scales and hates rigged ones — integrity guides you while dishonesty destroys you. Solomon notes that generous people somehow end up richer, not poorer, and that pride goes before a fall while humility brings wisdom.",
    aboutGod: "He cares about fairness and honesty even in the small, unseen transactions of life.",
    aboutPeople: "We assume holding tight makes us secure, when generosity is what actually enriches us.",
    realLife: "Open-handed people tend to live fuller lives than those who grip everything tightly.",
    verse: "“There is one who scatters, and increases yet more. There is one who withholds more than is appropriate, but gains poverty.” — Proverbs 11:24",
    reflection: "Where is fear making you hold tightly to something you could open your hands and share?",
    prayer: "God, loosen my grip and make me generous. Help me trust that what I give in Your name is never truly lost. Amen.",
    step: "Give something away today — money, time, or help — without expecting anything back.",
    keyWords: [
      { word: "Generosity", meaning: "An open-handed way of living that gives freely instead of clutching. Proverbs promises it actually enriches the giver, not just the receiver." },
    ],
    verses: [
      { ref: "2 Corinthians 9:7", text: "Let each man give according as he has determined in his heart, not grudgingly or under compulsion, for God loves a cheerful giver.", meaning: "God cares less about the amount you give and more about the heart behind it. Generosity given gladly becomes a joy, not a loss." },
    ],
    sideReflection: "What am I gripping tightly out of fear that I could actually hold with open hands?",
  },
  99: {
    context: "Solomon keeps the spotlight on everyday character, especially the power of our words and how we treat both people and animals. The contrasts here are sharp and practical, built for real life.",
    plainEnglish: "Reckless words cut like a sword, but wise words bring healing — and the truth lasts while lies are exposed over time. Solomon also notes that a righteous person even cares for their animals, and that honest work and patience beat shortcuts and hot tempers.",
    aboutGod: "He values truthful, healing speech and sees how we treat even the voiceless.",
    aboutPeople: "Our words have the power to wound or to heal, often more than we realize.",
    realLife: "Learning to speak with care can repair relationships that careless words have damaged.",
    verse: "“There is one who speaks rashly like the piercing of a sword, but the tongue of the wise heals.” — Proverbs 12:18",
    reflection: "Have your recent words been more like a sword or more like medicine?",
    prayer: "God, tame my tongue. Help me use words that heal instead of harm, and choose truth even when it's hard. Amen.",
    step: "Speak one healing, encouraging word to someone today, especially someone you've been short with.",
    keyWords: [
      { word: "Rash words", meaning: "Things blurted out without thinking — the quick, cutting remarks we later regret. Wisdom slows us down enough to speak life instead." },
    ],
    verses: [
      { ref: "Ephesians 4:29", text: "Let no corrupt speech proceed out of your mouth, but only what is good for building up as the need may be, that it may give grace to those who hear.", meaning: "Every word is a chance to either tear down or build up. Choosing words that give grace is a daily way to love the people around you." },
    ],
    sideReflection: "When I replay my words from today, did they wound or did they heal?",
  },
  100: {
    context: "This chapter weaves together sayings about hope, honest effort, and the company we keep. Solomon keeps returning to the long game — how patient, wise living pays off in ways that impatience never can.",
    plainEnglish: "Hope deferred makes the heart sick, but a longing fulfilled is a tree of life — so don't give up too soon. Solomon adds that the company you keep rubs off on you, that money gained slowly lasts, and that loving discipline is part of genuine care.",
    aboutGod: "He understands the ache of waiting and the deep gladness of hope finally fulfilled.",
    aboutPeople: "We become like the people we spend the most time with, for better or worse.",
    realLife: "Choosing your closest friends carefully shapes who you'll be a few years from now.",
    verse: "“Hope deferred makes the heart sick, but when longing is fulfilled, it is a tree of life.” — Proverbs 13:12",
    reflection: "Who are the people closest to you nudging you to become?",
    prayer: "God, surround me with people who pull me toward You, and sustain my hope when the waiting is long. Amen.",
    step: "Reach out to one person who makes you wiser, and plan time with them this week.",
    keyWords: [
      { word: "Hope deferred", meaning: "The heavy ache of waiting for something good that hasn't come yet. Solomon names it honestly — and points to the joy waiting on the other side." },
    ],
    verses: [
      { ref: "1 Corinthians 15:33", text: "Don't be deceived! Evil companionships corrupt good morals.", meaning: "Who you spend time with quietly shapes who you become. Choosing wise, life-giving friends is one of the most important decisions you make." },
    ],
    sideReflection: "Who am I becoming because of the people I spend the most time with?",
  },
  101: {
    context: "Solomon contrasts the wise and the foolish across home life, emotions, and how we treat the vulnerable. It's a chapter that quietly insists how we treat the poor is tied to how we relate to God.",
    plainEnglish: "There's a way that seems right to us but ends badly, so we shouldn't just trust our gut blindly. Solomon also says that mocking the poor insults their Maker, while being kind to the needy actually honors God.",
    aboutGod: "He takes personally how we treat people the world overlooks.",
    aboutPeople: "We can feel completely sure of a path that's quietly leading us off a cliff.",
    realLife: "How you treat people who can do nothing for you reveals what's truly in your heart.",
    verse: "“He who oppresses the poor shows contempt for his Maker, but he who is kind to the needy honors him.” — Proverbs 14:31",
    reflection: "How do you treat people who can't do anything for you in return?",
    prayer: "God, give me a heart for people the world overlooks. Let my kindness to them be a way of honoring You. Amen.",
    step: "Do one kind thing today for someone who can't pay you back.",
    keyWords: [
      { word: "The needy", meaning: "People in real hardship — financial, physical, or otherwise. Proverbs ties our treatment of them directly to our honoring of God." },
    ],
    verses: [
      { ref: "Matthew 25:40", text: "Most certainly I tell you, because you did it to one of the least of these my brothers, you did it to me.", meaning: "Jesus said kindness to the overlooked is kindness shown to Him personally. How you treat the least powerful person reveals your real heart toward God." },
    ],
    sideReflection: "How do I treat the people who can do absolutely nothing for me in return?",
  },
  102: {
    context: "This well-loved chapter zeroes in on words, the heart behind them, and the quiet contentment that beats outward success. Solomon shows how a gentle answer and a thankful heart can change the whole atmosphere of a life.",
    plainEnglish: "A gentle answer turns away anger, while a harsh word stirs it up — small choices in tone change everything. Solomon adds that a cheerful, content heart is its own kind of feast, and that a little with peace beats a lot with turmoil.",
    aboutGod: "He sees past our polished words straight to the heart behind them.",
    aboutPeople: "We often reach for the harsh reply when the gentle one would actually defuse things.",
    realLife: "How you respond in a tense moment can either calm a conflict or pour gasoline on it.",
    verse: "“A gentle answer turns away wrath, but a harsh word stirs up anger.” — Proverbs 15:1",
    reflection: "In your next tense conversation, will you reach for the gentle answer or the sharp one?",
    prayer: "God, help me respond with gentleness when I'd rather snap back. Let my words cool conflict instead of feeding it. Amen.",
    step: "The next time someone provokes you today, pause and choose a gentle answer on purpose.",
    keyWords: [
      { word: "Gentle answer", meaning: "A soft, calm response chosen on purpose instead of a sharp comeback. It's one of the simplest, most powerful peacemakers there is." },
    ],
    verses: [
      { ref: "James 1:19", text: "So, then, my beloved brothers, let every man be swift to hear, slow to speak, and slow to anger.", meaning: "Slowing down before you speak gives gentleness a chance to win. Most regretted words come from reacting fast instead of listening first." },
    ],
    sideReflection: "When I'm provoked, do I reach for the gentle answer or the one that wins the moment?",
  },
  103: {
    context: "Solomon turns toward the mystery of God's involvement in our plans and steps. This chapter holds the beautiful tension between our planning and God's quiet, sovereign guiding.",
    plainEnglish: "We make our plans, but God is the one who directs how they actually unfold — so commit your work to Him and let Him steady it. Solomon also reminds us that humility comes before honor and that a patient temper is stronger than raw power.",
    aboutGod: "He's actively, gently involved in guiding the steps of those who trust Him.",
    aboutPeople: "We love to map out every detail, forgetting how little of the outcome we truly control.",
    realLife: "You can plan wisely and still hold your plans loosely, trusting God with the results.",
    verse: "“A man's heart plans his course, but Yahweh directs his steps.” — Proverbs 16:9",
    reflection: "What plan are you holding so tightly that you've left no room for God to redirect you?",
    prayer: "God, I'll plan as wisely as I can and then trust You with the outcome. Direct my steps where I can't see the way. Amen.",
    step: "Make a plan you've been working on, then pray over it and hand the outcome to God.",
    keyWords: [
      { word: "Directs his steps", meaning: "God's quiet way of guiding the path even as we plan it. It means you can plan with effort and still rest, knowing He's steering." },
    ],
    verses: [
      { ref: "James 4:15", text: "For you ought to say, “If the Lord wills, we will both live, and do this or that.”", meaning: "Planning is good, but holding plans with open hands is wisdom. It keeps you humble and ready for God to lead a better way." },
    ],
    sideReflection: "What plan am I gripping so tightly that I've left God no room to redirect me?",
  },
  104: {
    context: "Solomon shifts from grand themes to the small, daily friction of living with other people. This chapter zeros in on the home and the heart — how peace, loyalty, and a calm spirit outshine wealth and drama.",
    plainEnglish: "He says a quiet meal with peace beats a feast in a house full of fighting, and a true friend sticks with you when things fall apart. He also warns that stirring up conflict and chasing offense will wreck relationships, while a cheerful heart actually heals you.",
    aboutGod: "God values peace and steady love over riches and impressive appearances.",
    aboutPeople: "We often trade peace for things that look good but leave us anxious and alone.",
    realLife: "A calm, loyal, forgiving home is worth more than any upgrade you could buy.",
    verse: "“A cheerful heart is good medicine, but a crushed spirit dries up the bones.” — Proverbs 17:22",
    reflection: "Where are you choosing winning an argument over keeping the peace with someone you love?",
    prayer: "Father, give me a cheerful, peaceful heart and the grace to be a loyal friend. Help me let small offenses go. Amen.",
    step: "Let one small offense go today — drop it completely instead of bringing it up.",
    keyWords: [
      { word: "Cheerful heart", meaning: "An inner gladness that doesn't depend on perfect circumstances. Solomon calls it medicine — it literally helps you heal and carry life better." },
    ],
    verses: [
      { ref: "Proverbs 17:17", text: "A friend loves at all times; and a brother is born for adversity.", meaning: "Real friendship isn't only for the easy seasons. The people who show up when life gets hard are the ones worth holding onto — and worth being." },
    ],
    sideReflection: "What grudge am I still carrying that's quietly drying up my joy?",
  },
  105: {
    context: "Here Solomon turns a microscope on the mouth — our words, our listening, and the loneliness of isolating ourselves. It's a chapter about how what we say shapes whether we're surrounded by life or cut off from it.",
    plainEnglish: "He warns that loners who shut everyone out are really just chasing their own way, and that answering before you've actually listened is foolish and embarrassing. Words, he says, carry the power of life and death — and a true friend can be closer than family.",
    aboutGod: "God designed us for honest connection, not self-protective isolation.",
    aboutPeople: "We tend to talk before we listen and pull away when we most need others.",
    realLife: "The way you use your words today can either build people up or quietly tear them down.",
    verse: "“Death and life are in the power of the tongue; those who love it will eat its fruit.” — Proverbs 18:21",
    reflection: "When was the last time you really listened to someone before forming your reply?",
    prayer: "Lord, help me listen first and speak words that give life. Keep me from isolating when I'm hurting. Amen.",
    step: "In one conversation today, fully hear the person out before you respond.",
    keyWords: [
      { word: "The tongue", meaning: "A picture of all our words — spoken and typed. Small as it is, it can wound deeply or heal powerfully, so it's worth handling with care." },
    ],
    verses: [
      { ref: "James 1:19", text: "So, then, my beloved brothers, let every man be swift to hear, slow to speak, and slow to anger.", meaning: "God's order is simple: listen a lot, talk a little, stay calm. Most conflicts shrink the moment we actually do this." },
    ],
    sideReflection: "Whose voice have I been talking over instead of truly hearing?",
  },
  106: {
    context: "This chapter mixes hard truths about poverty, patience, and family with a tender reminder that God notices the overlooked. Solomon writes honestly about how money and status change how people treat us — and how God doesn't play that game.",
    plainEnglish: "He observes that wealth attracts friends while poverty scatters them, but warns against valuing people by their bank balance. He praises patience over a hot temper, and says kindness to the poor is actually a loan to God Himself, who repays it.",
    aboutGod: "God treats the poor as people worth defending, and He keeps account of every kindness.",
    aboutPeople: "We're quick to judge by appearances and slow to be patient.",
    realLife: "How you treat someone who can't repay you reveals what's really in your heart.",
    verse: "“He who has pity on the poor lends to Yahweh; he will reward him.” — Proverbs 19:17",
    reflection: "Do you treat people differently based on what they can do for you?",
    prayer: "God, soften my heart toward people the world overlooks. Make me patient and generous, like You. Amen.",
    step: "Do one kind thing today for someone who can't pay you back.",
    keyWords: [
      { word: "Patience", meaning: "The strength to slow down instead of reacting in the heat of the moment. Solomon says it's actually a sign of good sense, not weakness." },
    ],
    verses: [
      { ref: "Matthew 25:40", text: "The King will answer them, ‘Most certainly I tell you, because you did it to one of the least of these my brothers, you did it to me.’", meaning: "Jesus takes our kindness to the overlooked personally. When you help someone forgotten, you're caring for Him." },
    ],
    sideReflection: "Who in my life can do nothing for me — and how have I been treating them?",
  },
  107: {
    context: "Solomon takes aim at the things that quietly sabotage a life: drunkenness, dishonest business, laziness, and revenge. It reads like a steady older voice warning a younger one about the traps that look harmless until they aren't.",
    plainEnglish: "He says wine and strong drink mock the people they fool, fair scales matter to God, and the lazy person who won't plow will beg at harvest and find nothing. Instead of taking revenge, he says, wait on the Lord to set things right.",
    aboutGod: "God cares about honesty in the ordinary details, even the weights on a scale.",
    aboutPeople: "We're tempted to cut corners and pay people back ourselves.",
    realLife: "Integrity in small, unseen choices is what builds a life you can stand on.",
    verse: "“Don't say, ‘I will pay back evil.’ Wait for Yahweh, and he will save you.” — Proverbs 20:22",
    reflection: "Where are you tempted to even the score instead of trusting God with it?",
    prayer: "Lord, make me honest when no one's watching, and help me hand my grudges to You instead of repaying them. Amen.",
    step: "Choose honesty today in one small thing you'd normally let slide.",
    keyWords: [
      { word: "Integrity", meaning: "Being the same person in private that you are in public. It's letting your hidden choices match your honest words." },
    ],
    verses: [
      { ref: "Romans 12:19", text: "Don't seek revenge yourselves, beloved, but give place to God's wrath.", meaning: "You don't have to carry the heavy job of payback. You can release it to God, who sees everything and judges fairly." },
    ],
    sideReflection: "What small compromise have I been telling myself doesn't really count?",
  },
  108: {
    context: "The chapter weighs the heart against the appearance, again and again. Solomon insists that God looks past what we do to why we do it — and that righteousness and kindness matter more than religious performance.",
    plainEnglish: "He says every path seems right to the person walking it, but God weighs the heart behind it, and that doing what's right pleases Him more than offering sacrifices. He also notes that controlling your mouth keeps you out of a world of trouble.",
    aboutGod: "God weighs our motives, not just our actions, and prefers honest goodness over religious show.",
    aboutPeople: "We're good at justifying ourselves and missing our own blind spots.",
    realLife: "Living rightly toward people matters to God more than looking spiritual.",
    verse: "“To do righteousness and justice is more acceptable to Yahweh than sacrifice.” — Proverbs 21:3",
    reflection: "Is there a path you're sure is right that you've never honestly asked God about?",
    prayer: "Father, search my heart and my motives. Help me do what's right toward people, not just look the part. Amen.",
    step: "Ask God to show you one blind spot, and listen honestly for the answer.",
    keyWords: [
      { word: "Justice", meaning: "Treating people fairly and standing up for what's right, especially for those who get overlooked. God connects it tightly to truly loving Him." },
    ],
    verses: [
      { ref: "1 Samuel 16:7", text: "For man looks at the outward appearance, but Yahweh looks at the heart.", meaning: "You can stop performing for God. He already sees past the image to who you really are, and He loves you there." },
    ],
    sideReflection: "What am I doing to look good that God already sees right through?",
  },
  109: {
    context: "A new collection begins here, opening with a line that has comforted parents for centuries about the words they pour into a child. The chapter also champions the poor and warns the powerful not to exploit them.",
    plainEnglish: "Solomon says a good name is worth more than great riches, and that the rich and poor share one Maker who stands over both. He urges teaching children well, paying workers fairly, and never robbing the weak just because you can.",
    aboutGod: "God is the common Maker of rich and poor alike, and He defends the vulnerable.",
    aboutPeople: "We chase money and status when character is the thing that actually lasts.",
    realLife: "What you build into the next generation outlives anything in your bank account.",
    verse: "“A good name is more desirable than great riches, and loving favor is better than silver and gold.” — Proverbs 22:1",
    reflection: "If your reputation and your bank balance traded places, which would you fight harder to protect?",
    prayer: "Lord, help me value character over cash and treat every person as someone You made. Amen.",
    step: "Speak one encouraging, truthful word into a young person's life today.",
    keyWords: [
      { word: "Good name", meaning: "The trust and respect you earn by living with integrity over time. Unlike money, it can't be bought, only built." },
    ],
    verses: [
      { ref: "Proverbs 22:6", text: "Train up a child in the way he should go, and when he is old he will not depart from it.", meaning: "What we patiently pour into a child takes root and lasts. Small, faithful guidance now shapes a whole life later." },
    ],
    sideReflection: "What kind of name am I building day by day, whether I mean to or not?",
  },
  110: {
    context: "This is one of Scripture's most honest chapters about appetite — for food, wealth, and especially alcohol. A father warns his child about cravings that promise pleasure and deliver pain.",
    plainEnglish: "Solomon tells his son not to wear himself out chasing riches that sprout wings and fly away, and to guard his heart on the right road. Then he paints a vivid, almost funny picture of the morning-after misery of too much drink — and tells us to keep our hearts tender toward our parents.",
    aboutGod: "God wants our hearts free, not enslaved to appetites that never satisfy.",
    aboutPeople: "We chase pleasures that overpromise and quietly take more than they give.",
    realLife: "The cravings you don't manage today can run your whole life tomorrow.",
    verse: "“Don't be among ones drinking too much wine, or those who gorge themselves on meat.” — Proverbs 23:20",
    reflection: "What appetite in your life is starting to manage you instead of the other way around?",
    prayer: "God, free my heart from cravings that never satisfy. Teach me to find my fullness in You. Amen.",
    step: "Name one craving that's been controlling you and set one small boundary around it today.",
    keyWords: [
      { word: "Appetite", meaning: "Any strong craving — for food, drink, money, attention. Healthy in its place, but dangerous when it starts steering your choices." },
    ],
    verses: [
      { ref: "1 Corinthians 6:12", text: "All things are lawful for me, but not all things are expedient. All things are lawful for me, but I will not be brought under the power of anything.", meaning: "Freedom isn't just doing whatever you want — it's not being owned by anything. God wants you free, not controlled." },
    ],
    sideReflection: "What am I reaching for to feel full that always leaves me empty again?",
  },
  111: {
    context: "The chapter closes out a major section with grit and grace: don't envy bad people, get back up when you fall, and rescue those being dragged toward harm. It's wisdom for staying steady when life knocks you flat.",
    plainEnglish: "Solomon says a wise person grows strong over time, and that even a good person falls seven times but keeps getting up. He warns against gloating when an enemy stumbles, and tells us to speak up for people being led away to destruction.",
    aboutGod: "God values resilience and intervention — getting up, and lifting others up.",
    aboutPeople: "We all fall, and we're tempted to enjoy it when our rivals do.",
    realLife: "Your comeback matters more than your collapse, and rescue beats revenge.",
    verse: "“For a righteous man falls seven times and rises up again, but the wicked are overthrown by calamity.” — Proverbs 24:16",
    reflection: "What recent fall have you been treating as the end of your story?",
    prayer: "Lord, when I fall, help me get up again in Your strength. Give me courage to rescue, not gloat. Amen.",
    step: "Get back up in one area you've given up on, and take a single step forward today.",
    keyWords: [
      { word: "Resilience", meaning: "The ability to rise after you've fallen. Solomon makes clear that falling isn't what defines you — refusing to get back up is." },
    ],
    verses: [
      { ref: "Micah 7:8", text: "Don't rejoice against me, my enemy. When I fall, I will arise. When I sit in darkness, Yahweh will be a light to me.", meaning: "A setback isn't your final word. With God beside you, the floor you're on now is a place you can rise from." },
    ],
    sideReflection: "Where do I need to stop staying down and let God help me stand back up?",
  },
  112: {
    context: "A fresh batch of Solomon's sayings, copied out by King Hezekiah's scribes generations later, fills this chapter. It's full of word pictures — apples of gold, cold water to a thirsty soul — about timing, restraint, and the power of well-placed words.",
    plainEnglish: "Solomon compares the right word at the right time to gold set in silver, and good news from far away to cold water when you're parched. He praises patience over force, warns against overstaying your welcome, and says feeding a hungry enemy is its own kind of victory.",
    aboutGod: "God notices the kindness and self-control we show even toward people who've wronged us.",
    aboutPeople: "We struggle with timing and restraint, often saying too much, too soon, too harshly.",
    realLife: "The right words spoken at the right moment can refresh someone's whole day.",
    verse: "“A word fitly spoken is like apples of gold in settings of silver.” — Proverbs 25:11",
    reflection: "Who in your life needs a kind, well-timed word from you this week?",
    prayer: "Father, give me the wisdom to say the right thing at the right time, and to bless even those who've hurt me. Amen.",
    step: "Send one encouraging message today to someone who needs to hear it right now.",
    keyWords: [
      { word: "Self-control", meaning: "The quiet strength to hold back — words, anger, impulses — until the right moment. Solomon treats it as far stronger than brute force." },
    ],
    verses: [
      { ref: "Romans 12:20", text: "Therefore ‘If your enemy is hungry, feed him. If he is thirsty, give him a drink.’", meaning: "Kindness can disarm a conflict in a way that retaliation never will. Choosing to bless an enemy is one of the bravest things you can do." },
    ],
    sideReflection: "Is there someone I'd rather get even with whom God is asking me to bless instead?",
  },
  113: {
    context: "With sharp humor, this chapter dissects fools, sluggards, and troublemakers. Solomon uses memorable, even ridiculous images — a dog returning to its mess, a sluggard rolling in bed like a door on its hinge — to make laziness and folly impossible to romanticize.",
    plainEnglish: "He warns against answering a fool on his own terms, mocks the excuses of the lazy who claim there's a lion outside, and exposes the gossip whose words go down like tasty treats but poison from the inside. He also warns that those who dig pits for others tend to fall into them.",
    aboutGod: "God sees through our excuses and the schemes we hide behind charm.",
    aboutPeople: "We're masters of excuses and quietly addicted to gossip.",
    realLife: "The traps you set for others and the laziness you excuse usually circle back to you.",
    verse: "“The words of a whisperer are like dainty morsels; they go down into the innermost parts.” — Proverbs 26:22",
    reflection: "What excuse have you been hiding behind to avoid something you know you need to do?",
    prayer: "Lord, free me from gossip and excuses. Help me be honest about what I'm avoiding and do the next right thing. Amen.",
    step: "Refuse to pass along one piece of gossip today, even if it's juicy.",
    keyWords: [
      { word: "Gossip", meaning: "Talking about people in ways you'd never say to their face. It feels harmless in the moment but quietly damages trust and people." },
    ],
    verses: [
      { ref: "Ephesians 4:29", text: "Let no corrupt speech proceed out of your mouth, but only what is good for building others up.", meaning: "Your words can be a tool for building people up instead of tearing them down. Aim for speech that leaves people better than you found them." },
    ],
    sideReflection: "What excuse am I most comfortable repeating to avoid the thing I'm dodging?",
  },
  114: {
    context: "This chapter is full of warmth about friendship, honesty, and not bragging about tomorrow. Solomon writes about how real friends sharpen each other and tell us the hard truths we need to hear.",
    plainEnglish: "He says not to boast about tomorrow since you don't know what a day will bring, and that open correction from a friend beats hidden love. In his most famous line here, he says we shape each other the way iron sharpens iron — through real, sometimes friction-filled relationship.",
    aboutGod: "God grows us through honest, caring people who refuse to just flatter us.",
    aboutPeople: "We'd rather have comfortable flattery than the loving truth that helps us grow.",
    realLife: "The friends who tell you the truth are sharpening you, even when it stings.",
    verse: "“Iron sharpens iron; so a man sharpens his friend's countenance.” — Proverbs 27:17",
    reflection: "Who in your life loves you enough to tell you the truth — and are you listening?",
    prayer: "Father, thank You for friends who sharpen me. Help me receive honest correction with humility and offer it with love. Amen.",
    step: "Thank one friend today who has told you a hard truth you needed to hear.",
    keyWords: [
      { word: "Iron sharpens iron", meaning: "The picture of two people making each other better through honest friendship. It takes a little friction, but the result is a sharper, stronger you." },
    ],
    verses: [
      { ref: "Proverbs 27:6", text: "The wounds of a friend are faithful, although the kisses of an enemy are profuse.", meaning: "A friend's honest correction may hurt, but it's love. Flattery feels nicer in the moment but often hides empty intentions." },
    ],
    sideReflection: "Am I surrounding myself with people who flatter me or people who sharpen me?",
  },
  115: {
    context: "Money, power, and honesty take center stage as Solomon contrasts the wicked who run when no one's chasing with the righteous who stand bold as lions. The chapter is unusually direct about wealth, debt, and the danger of getting rich the wrong way.",
    plainEnglish: "He says the guilty flee when nobody pursues, while the upright are as confident as a lion, and that hiding your sins keeps you stuck while confessing them brings mercy. He warns that wealth gained by cheating won't last and that ignoring the poor leads to ruin.",
    aboutGod: "God offers mercy the moment we stop hiding and come clean.",
    aboutPeople: "We instinctively hide our failures when honesty is what actually frees us.",
    realLife: "Owning your mistakes is the doorway to the mercy and freedom you're craving.",
    verse: "“He who conceals his sins doesn't prosper, but whoever confesses and renounces them finds mercy.” — Proverbs 28:13",
    reflection: "What have you been hiding that you'd actually find freedom in bringing into the light?",
    prayer: "God, I'm done hiding. Thank You that confession leads to mercy, not condemnation. Help me come clean. Amen.",
    step: "Confess one thing today — to God, and if needed, to a trusted person.",
    keyWords: [
      { word: "Confession", meaning: "Simply telling the truth about what you've done instead of hiding it. With God, it's not a setup for shame — it's the path to mercy." },
    ],
    verses: [
      { ref: "1 John 1:9", text: "If we confess our sins, he is faithful and righteous to forgive us the sins, and to cleanse us from all unrighteousness.", meaning: "You don't have to clean yourself up before coming to God. Honesty is all He asks, and forgiveness is what He gives." },
    ],
    sideReflection: "What am I still trying to hide that God is gently inviting me to bring into the light?",
  },
  116: {
    context: "As the chapter weighs leaders, anger, and the fear of people, Solomon shows how one person's character can lift or crush a whole community. It ends pointing toward the safety found in trusting God over impressing others.",
    plainEnglish: "He says when good people thrive a city rejoices, and a fool vents all his anger while a wise person holds it back. He warns that the fear of what people think becomes a trap, but trusting the Lord keeps you safe and steady.",
    aboutGod: "God offers a security that the approval of people can never give us.",
    aboutPeople: "We let other people's opinions control us far more than we'd like to admit.",
    realLife: "Caring too much what people think will run your life until you root yourself in God.",
    verse: "“The fear of man proves to be a snare, but whoever puts his trust in Yahweh is kept safe.” — Proverbs 29:25",
    reflection: "Whose approval are you chasing so hard that it's quietly running your decisions?",
    prayer: "Lord, free me from the trap of needing everyone's approval. Help me trust You and find my security in You. Amen.",
    step: "Make one decision today based on what's right rather than what people will think.",
    keyWords: [
      { word: "Fear of man", meaning: "Letting worry about people's opinions control your choices. Solomon calls it a snare because it traps you into living for an audience instead of for God." },
    ],
    verses: [
      { ref: "Galatians 1:10", text: "For am I now seeking the favor of men, or of God? Or am I striving to please men? For if I were still pleasing men, I wouldn't be a servant of Christ.", meaning: "You can't fully please people and follow God at the same time. Choosing His approval sets you free from the exhausting work of impressing everyone." },
    ],
    sideReflection: "Whose opinion am I letting steer my life that God never asked me to obey?",
  },
  117: {
    context: "The voice changes to a man named Agur, who speaks with refreshing humility about the limits of his own wisdom. His prayer for just enough — not too rich, not too poor — is one of the most grounded requests in all of Scripture.",
    plainEnglish: "Agur admits he doesn't have it all figured out and that God's word is flawless, a shield to those who trust Him. Then he prays a beautifully balanced prayer: keep me from lies, and give me neither poverty nor riches — just my daily bread — so I'm not tempted to forget You or to steal.",
    aboutGod: "God is trustworthy and His word is a reliable shield for anyone who leans on it.",
    aboutPeople: "We rarely know our own limits, and both wealth and want can pull us from God.",
    realLife: "Contentment with enough guards your heart better than chasing more ever could.",
    verse: "“Give me neither poverty nor riches. Feed me with the food that is needful for me.” — Proverbs 30:8",
    reflection: "Could you honestly pray for just enough — no more, no less — and mean it?",
    prayer: "God, give me what I truly need and a heart content with it. Keep me close to You whether I have much or little. Amen.",
    step: "Name three things you already have that are enough, and thank God for each one.",
    keyWords: [
      { word: "Contentment", meaning: "A settled peace with what you have right now. It's not giving up on growth — it's refusing to let 'more' become the thing you live for." },
    ],
    verses: [
      { ref: "1 Timothy 6:6", text: "But godliness with contentment is great gain.", meaning: "Real wealth isn't having everything — it's being at peace with God and grateful for what you've got. That kind of richness can't be taken from you." },
    ],
    sideReflection: "Where am I telling myself I'll be content once I finally have more?",
  },
  118: {
    context: "Proverbs closes with a soaring poem, often titled the woman of noble character or the woman of valor, taught to King Lemuel by his mother. It's not a checklist to measure up to but a celebration of a life marked by strength, faith, generosity, and dignity.",
    plainEnglish: "The poem honors a woman who works hard, runs a household and a business, opens her hands to the poor, speaks with wisdom, and faces the future without fear. It ends by saying that charm fades and beauty passes, but a person who reverently loves God is worthy of praise.",
    aboutGod: "God celebrates strength, faith, and generosity as the true marks of a beautiful life.",
    aboutPeople: "We measure worth by appearance when God measures it by character and faith.",
    realLife: "A life of quiet strength, kindness, and devotion to God is what truly lasts and shines.",
    verse: "“Charm is deceitful, and beauty is vain; but a woman who fears Yahweh, she shall be praised.” — Proverbs 31:30",
    reflection: "What would it look like to build your life around faith and character instead of appearance?",
    prayer: "Lord, help me value strength, faith, and generosity over image. Build that kind of lasting beauty in me. Amen.",
    step: "Do one thing today that builds inner character rather than outward image.",
    keyWords: [
      { word: "Woman of valor", meaning: "A celebration of a life lived with courage, strength, and faith. It's an honor held up for everyone to admire and aspire to, not a standard meant to shame anyone." },
      { word: "Fears Yahweh", meaning: "A deep, loving respect for God that shapes how you live. Far from being afraid, it means taking God seriously enough to build your whole life around Him." },
    ],
    verses: [
      { ref: "1 Peter 3:4", text: "But in the hidden person of the heart, in the incorruptible adornment of a gentle and quiet spirit, which is in the sight of God very precious.", meaning: "God treasures the beauty growing inside you far more than anything on the surface. That inner character never fades and is precious to Him." },
    ],
    sideReflection: "Am I investing more in how my life looks or in who I'm actually becoming?",
  },
  119: {
    context: "Before Jesus returns to heaven, He gathers His followers for one last conversation and a promise that will change everything. Chapter 1 is the in-between moment — Jesus is gone, the Spirit hasn't come yet, and a small group waits together in prayer.",
    plainEnglish: "Jesus tells His friends to wait in Jerusalem for the Holy Spirit, then He's lifted up into the sky as they watch. The disciples head back to an upstairs room and devote themselves to prayer while they wait for whatever comes next.",
    aboutGod: "God keeps His people in the waiting — He gives a promise to hold onto when the next step isn't here yet.",
    aboutPeople: "We'd rather have the timeline than the promise, but God grows us in the gap between the two.",
    realLife: "When you're stuck in an in-between season, waiting on God isn't wasted time — it's preparation.",
    verse: "“But you will receive power when the Holy Spirit has come upon you. You will be witnesses to me in Jerusalem, in all Judea and Samaria, and to the uttermost parts of the earth.” — Acts 1:8",
    reflection: "What promise of God are you being asked to hold onto while you wait for the next step to appear?",
    prayer: "Father, teach me to wait well. When I can't see the path forward, help me trust Your promise and stay close to You in prayer. Amen.",
    step: "Name one thing you're waiting on God for, and spend two minutes praying about it instead of trying to force it.",
    keyWords: [
      { word: "Ascension", meaning: "The moment Jesus returned to heaven after rising from the dead. He didn't leave us alone — He went to prepare a place for us and to send His Spirit to be with us always." },
    ],
    verses: [
      { ref: "Psalm 27:14", text: "Wait for Yahweh. Be strong, and let your heart take courage. Yes, wait for Yahweh.", meaning: "Waiting on God is an act of courage, not weakness. He meets the heart that keeps trusting Him when the answer is slow to come." },
    ],
    sideReflection: "Where am I demanding a timeline from God when He's asking me to trust His promise instead?",
  },
  120: {
    context: "Luke wrote Acts as the sequel to his gospel — the story of what Jesus kept doing through His followers after He rose. Chapter 2 is the day everything ignites: the Holy Spirit arrives and a handful of nobodies turn into a movement.",
    plainEnglish: "On a crowded festival day, the Spirit comes like wind and fire, and suddenly Jesus' followers are speaking languages they never learned. Peter — the guy who'd recently denied Jesus — stands up and preaches, and three thousand people come to faith in a single afternoon.",
    aboutGod: "He doesn't just save us and leave — He fills us with His own Spirit to live the life He calls us to.",
    aboutPeople: "We feel too ordinary or too failed to be used; God specializes in exactly those people.",
    realLife: "You don't have to muster the strength to follow God on your own — He puts His Spirit inside you.",
    verse: "“They were all filled with the Holy Spirit, and began to speak with other languages, as the Spirit gave them the ability to speak.” — Acts 2:4",
    reflection: "Where have you been trying to live the Christian life on willpower instead of the Spirit's power?",
    prayer: "God, fill me with Your Spirit. I can't do this on my own strength — live Your life through me today. Amen.",
    step: "Before something hard today, pause and ask the Holy Spirit specifically for the power to face it.",
    keyWords: [
      { word: "Holy Spirit", meaning: "God Himself living inside every believer — comforting, guiding, and empowering you. Not a force, but a Person who never leaves your side." },
    ],
    verses: [
      { ref: "Acts 1:8", text: "But you will receive power when the Holy Spirit has come upon you.", meaning: "The power to live and share your faith isn't something you generate — it's something you receive. God supplies what He asks of you." },
    ],
    sideReflection: "Where in my life am I running on empty willpower when the Spirit is offering me His power?",
  },
  121: {
    context: "Peter and John are just walking into the temple to pray, like any ordinary day. At the gate sits a man who has never walked a step in his life — and this ordinary day is about to become the best of his.",
    plainEnglish: "A man crippled from birth asks the two disciples for money, but Peter gives him something better — he heals him in the name of Jesus, and the man jumps up walking and leaping. A crowd gathers, stunned, and Peter tells them plainly that it wasn't his own power but the risen Jesus who did this.",
    aboutGod: "God still does what we'd write off as impossible, and He often does it through ordinary people who simply make themselves available.",
    aboutPeople: "We tend to ask God for small things like spare change when He's ready to give us something far bigger.",
    realLife: "What you have to offer in Jesus' name might matter more than the money or fix someone thinks they need.",
    verse: "“But Peter said, ‘I have no silver or gold, but what I have, that I give you. In the name of Jesus Christ of Nazareth, get up and walk!’” — Acts 3:6",
    reflection: "What might God want to do through what you already have, rather than through what you wish you had?",
    prayer: "Jesus, I don't have everything, but what I have is Yours. Use it — use me — to bring Your healing and hope to someone today. Amen.",
    step: "Offer someone today the thing you actually have to give — your time, attention, prayer, or a kind word — instead of waiting until you have more.",
    keyWords: [
      { word: "In the name of Jesus", meaning: "Acting on Jesus' authority, not your own. It means you're representing Him and relying on His power rather than trying to be impressive yourself." },
    ],
    verses: [
      { ref: "2 Corinthians 12:9", text: "He has said to me, “My grace is sufficient for you, for my power is made perfect in weakness.”", meaning: "You don't need to have it all together for God to work through you. His strength shows up best right where you feel weakest." },
    ],
    sideReflection: "What do I already have in my hands that God might be asking me to give away in His name?",
  },
  122: {
    context: "The healing at the temple drew a crowd, and now it's drawing the attention of the religious authorities who want this Jesus movement shut down. Chapter 4 is the first real pushback — and the disciples' first test of nerve.",
    plainEnglish: "Peter and John are arrested and hauled before the same council that condemned Jesus, but instead of backing down, they boldly point to Jesus as the only true source of rescue. Threatened and ordered to stay silent, they refuse — and the whole church prays not for safety, but for boldness.",
    aboutGod: "God gives ordinary, untrained people a courage that startles the powerful when they belong to Jesus.",
    aboutPeople: "Fear tells us to stay quiet and safe, but the Spirit gives us nerve we didn't know we had.",
    realLife: "When standing for your faith gets costly, God can supply a boldness that surprises even you.",
    verse: "“There is salvation in no one else, for there is no other name under heaven that is given among men, by which we must be saved.” — Acts 4:12",
    reflection: "Where is fear keeping you quiet about something God is asking you to stand for?",
    prayer: "Lord, when I'm tempted to shrink back, give me holy courage. Make me bold and gentle as I represent You. Amen.",
    step: "Take one small, honest step today to be open about your faith where you'd normally stay silent.",
    keyWords: [
      { word: "Boldness", meaning: "Not loudness or arrogance, but the Spirit-given freedom to speak the truth in love without being ruled by fear. It's courage that comes from God, not from your personality." },
    ],
    verses: [
      { ref: "2 Timothy 1:7", text: "For God didn't give us a spirit of fear, but of power, love, and self-control.", meaning: "Fear isn't from God. He's already given you everything you need to face the moment with courage and a steady heart." },
    ],
    sideReflection: "When have I let fear silence me, and what would it look like to trust God with the outcome instead?",
  },
  123: {
    context: "The early church is glowing with generosity and unity — and into that beautiful moment comes a sobering story about honesty before God. Chapter 5 also shows the mission rolling on despite mounting opposition.",
    plainEnglish: "A couple named Ananias and Sapphira lie about a donation to look more generous than they are, and the deception proves deadly serious. Even so, the apostles keep healing and preaching, and when they're arrested again, an angel springs them from jail and they go right back to telling people about Jesus.",
    aboutGod: "God takes the integrity of His people seriously because He's building something real, not a show.",
    aboutPeople: "We're tempted to manage our image and pretend to be more spiritual than we are.",
    realLife: "God would rather have your honest, imperfect heart than an impressive performance.",
    verse: "“We must obey God rather than men.” — Acts 5:29",
    reflection: "Where are you tempted to perform spirituality for others instead of being honest with God?",
    prayer: "Father, I don't want to pretend with You. Help me be honest about who I really am, knowing You love me as I am. Amen.",
    step: "Drop one bit of pretending today — be honest with God or a trusted friend about something you've been hiding behind a polished image.",
    keyWords: [
      { word: "Integrity", meaning: "Being the same person on the inside as you appear on the outside. God isn't after a perfect performance — He's after a heart that's honest with Him." },
    ],
    verses: [
      { ref: "Psalm 51:6", text: "Behold, you desire truth in the inward parts. You teach me wisdom in the inmost place.", meaning: "God cares about what's true deep inside you, not just what shows on the surface. He meets you there with wisdom, not condemnation." },
    ],
    sideReflection: "Where am I more concerned with looking spiritual than actually being honest with God?",
  },
  124: {
    context: "The church is growing fast, and fast growth brings real-world problems — in this case, a group of widows getting overlooked. Chapter 6 shows the first Christians solving a practical conflict with wisdom and grace.",
    plainEnglish: "When some widows are neglected in the daily food distribution, the apostles don't ignore it — they appoint seven trusted, Spirit-filled people to handle it so everyone is cared for. One of them, Stephen, is so full of grace and power that his opponents can't out-argue him, so they start plotting against him instead.",
    aboutGod: "God cares about the practical, unglamorous work of making sure the overlooked are seen and served.",
    aboutPeople: "We need each other — no one person can carry it all, and shared work keeps a community healthy.",
    realLife: "Serving behind the scenes and sharing the load is holy work, not lesser work.",
    verse: "“Therefore select from among you, brothers, seven men of good report, full of the Holy Spirit and of wisdom, whom we may appoint over this business.” — Acts 6:3",
    reflection: "Where could you step in to serve a practical need that others might be overlooking?",
    prayer: "Lord, open my eyes to the people who get overlooked. Make me willing to serve in the quiet, unseen ways that matter to You. Amen.",
    step: "Notice one person who tends to get overlooked around you, and do one small thing today to make them feel seen.",
    keyWords: [
      { word: "Serving", meaning: "Meeting real, everyday needs as an act of love. In God's eyes the humble, behind-the-scenes work is just as valuable as the work everyone sees." },
    ],
    verses: [
      { ref: "Galatians 6:2", text: "Bear one another's burdens, and so fulfill the law of Christ.", meaning: "We're not meant to carry life alone. Sharing each other's loads is one of the clearest ways we live out Jesus' kind of love." },
    ],
    sideReflection: "Who around me is being overlooked, and how might God be inviting me to serve them?",
  },
  125: {
    context: "Stephen stands on trial for his life, and instead of defending himself, he tells the whole story of God's faithfulness through the generations. Chapter 7 is his bold, beautiful final word — and the first Christian to die for his faith.",
    plainEnglish: "Stephen walks the council through Israel's history, showing how God kept moving while His people kept resisting, and then names that they've done the same with Jesus. Enraged, they stone him to death — and he dies forgiving them, exactly the way Jesus did.",
    aboutGod: "God is faithful across every generation, even when His people keep missing or resisting what He's doing.",
    aboutPeople: "We can be religious and still harden our hearts against the very God we claim to serve.",
    realLife: "Forgiveness, even toward people who hurt you deeply, is possible when Jesus is the center of your heart.",
    verse: "“He kneeled down, and cried with a loud voice, ‘Lord, don't hold this sin against them!’ When he had said this, he fell asleep.” — Acts 7:60",
    reflection: "Is there someone you're being invited to forgive, even though they don't deserve it?",
    prayer: "Jesus, You forgave the people who hurt You most. Soften my heart toward the person I'm holding something against, and free me to forgive. Amen.",
    step: "Pray a genuine blessing over one person who has wronged you — even if you have to start small and clumsy.",
    keyWords: [
      { word: "Martyr", meaning: "Someone who suffers or dies for their faith rather than deny Jesus. Stephen's death wasn't a defeat — it planted seeds of faith that kept growing, even in those who watched." },
    ],
    verses: [
      { ref: "Luke 23:34", text: "Jesus said, “Father, forgive them, for they don't know what they are doing.”", meaning: "Jesus forgave the very people crucifying Him. His example shows that forgiveness isn't about excusing wrong — it's about releasing it to God." },
    ],
    sideReflection: "Who am I still holding something against, and what would it free in me to forgive them?",
  },
  126: {
    context: "A wave of persecution scatters the believers out of Jerusalem — and instead of stopping the message, it spreads it. Chapter 8 follows the good news as it crosses old boundaries into Samaria and beyond.",
    plainEnglish: "Philip brings the message to Samaria, a place Jewish people usually avoided, and joy breaks out as people believe. Then God sends Philip to a lonely desert road to explain Scripture to an Ethiopian official, who believes and is baptized on the spot — carrying the good news to a whole new continent.",
    aboutGod: "God's good news is for everyone — no outsider, no foreigner, no one is beyond His reach.",
    aboutPeople: "We draw lines around who belongs; God keeps erasing them.",
    realLife: "The person you'd least expect may be exactly the one God is drawing to Himself through you.",
    verse: "“Philip ran to him, and heard him reading Isaiah the prophet, and said, ‘Do you understand what you are reading?’” — Acts 8:30",
    reflection: "Who have you quietly written off as unlikely to want God — and might God be drawing them?",
    prayer: "Lord, tear down the lines I've drawn around who belongs to You. Make me ready to point anyone toward Your love. Amen.",
    step: "Be available today to one person you'd normally overlook — ask a question, listen, and stay open to where God leads.",
    keyWords: [
      { word: "Baptism", meaning: "A public sign of a new life with Jesus — going under the water pictures the old life buried, and rising up pictures fresh life begun. It's a joyful yes to following Him." },
    ],
    verses: [
      { ref: "Galatians 3:28", text: "There is neither Jew nor Greek, there is neither slave nor free man, there is neither male nor female; for you are all one in Christ Jesus.", meaning: "In Jesus, the dividing lines we live by lose their power. Everyone stands on equal ground as deeply loved by God." },
    ],
    sideReflection: "Who have I written off as unreachable, and how might God be inviting me to see them differently?",
  },
  127: {
    context: "Saul is the church's worst enemy — hunting down believers with a vengeance. Chapter 9 is the stunning story of how Jesus stops him in his tracks and turns history's fiercest persecutor into its greatest missionary.",
    plainEnglish: "On the road to arrest more Christians, Saul is blinded by a light and hears Jesus Himself ask why he's persecuting Him. Days later a nervous believer named Ananias prays for him, Saul's sight returns, and the man who came to destroy the church starts preaching the very faith he tried to crush.",
    aboutGod: "No one is too far gone for God — He can turn the hardest heart and the worst enemy into a friend.",
    aboutPeople: "We tend to write certain people off as hopeless; God sees who they could become.",
    realLife: "The person you've given up on — including maybe yourself — is never beyond God's reach.",
    verse: "“He said, ‘Who are you, Lord?’ The Lord said, ‘I am Jesus, whom you are persecuting.’” — Acts 9:5",
    reflection: "Who have you decided is too far gone for God — and what if He isn't finished with them?",
    prayer: "Jesus, thank You that no one is beyond Your reach — not them, not me. Give me hope for the people I've quietly given up on. Amen.",
    step: "Pray by name today for one person you'd assumed would never turn to God.",
    keyWords: [
      { word: "Conversion", meaning: "A turning of the heart toward God that changes the whole direction of a life. Saul's shows that real change is God's specialty, even when it seems impossible." },
    ],
    verses: [
      { ref: "1 Timothy 1:15", text: "Christ Jesus came into the world to save sinners, of whom I am chief.", meaning: "Paul never forgot how far God reached to save him. If grace could rescue the church's worst enemy, it can certainly reach you." },
    ],
    sideReflection: "Where have I given up hope — on someone else or on myself — that God may not have given up on at all?",
  },
  128: {
    context: "A devout Roman officer and a Jewish apostle would normally never mix — but God is about to bring them together and blow the doors of the church wide open. Chapter 10 is the moment the good news officially breaks past every ethnic boundary.",
    plainEnglish: "God gives the Roman centurion Cornelius a vision to send for Peter, and gives Peter a vision that knocks down his idea of who's clean and unclean. When Peter preaches in Cornelius' house, the Holy Spirit falls on the Gentiles too — proving the gospel was always meant for the whole world.",
    aboutGod: "God shows no favoritism — He welcomes people from every background on the exact same terms.",
    aboutPeople: "We carry hidden prejudices about who's in and who's out; God patiently corrects them.",
    realLife: "There's no one God loves less, and no one you're allowed to treat as beneath His grace.",
    verse: "“Truly I perceive that God doesn't show favoritism; but in every nation he who fears him and works righteousness is acceptable to him.” — Acts 10:34-35",
    reflection: "Is there a group or kind of person you've subtly assumed is less welcome to God than you are?",
    prayer: "Father, search my heart for the prejudices I don't even notice. Help me see every person the way You do. Amen.",
    step: "Reach across one line today — start a genuine conversation with someone whose background is different from yours.",
    keyWords: [
      { word: "Gentiles", meaning: "Everyone who wasn't Jewish — in other words, the rest of the world. Chapter 10 is the moment it becomes undeniable that God's family was always meant to include everyone." },
    ],
    verses: [
      { ref: "Romans 2:11", text: "For there is no partiality with God.", meaning: "God doesn't rank people or play favorites. His love and welcome reach every person equally, no matter their background." },
    ],
    sideReflection: "What hidden bias might God be gently asking me to lay down so I can love people the way He does?",
  },
  129: {
    context: "Peter's visit to a Gentile household stirs up serious controversy back home — some believers think he's crossed a line. Chapter 11 is where the church wrestles with God's surprising new direction and learns to follow it.",
    plainEnglish: "When Peter is criticized for eating with Gentiles, he simply tells the story of what God did, and the critics fall silent and praise God instead. Meanwhile in Antioch, a thriving mixed community of believers springs up, and it's there that followers of Jesus are first called Christians.",
    aboutGod: "God keeps stretching His people beyond their comfort zones to include more than they thought possible.",
    aboutPeople: "We resist change, even good change, until we see God's fingerprints on it.",
    realLife: "When God is clearly at work in something new, the faithful response is to get on board, not dig in.",
    verse: "“If then God gave to them the same gift as us, when we believed in the Lord Jesus Christ, who was I, that I could withstand God?” — Acts 11:17",
    reflection: "Where might God be leading you somewhere new that your instinct is to resist?",
    prayer: "Lord, give me a soft heart toward Your leading, even when it stretches me. Help me say yes to where You're going. Amen.",
    step: "Identify one area where you sense God nudging you toward change, and take a single step toward it instead of resisting.",
    keyWords: [
      { word: "Christian", meaning: "The name first given to Jesus' followers in Antioch — literally, “little Christ.” It means someone whose life is being shaped to look more and more like Jesus." },
    ],
    verses: [
      { ref: "Isaiah 43:19", text: "Behold, I will do a new thing. It springs out now. Don't you know it?", meaning: "God is always doing something fresh. When He opens a new path, He invites you to notice it and step forward rather than cling to the old way." },
    ],
    sideReflection: "Where is God doing something new that I've been resisting because it's unfamiliar?",
  },
  130: {
    context: "King Herod cracks down hard, killing one apostle and jailing Peter to please the crowds. Chapter 12 is a tense night of prison bars, fervent prayer, and a rescue no one quite believed could happen.",
    plainEnglish: "While the church prays through the night, an angel wakes Peter and walks him right out of a heavily guarded prison. When he shows up at the prayer meeting, the believers can hardly believe their prayers were actually answered — God did the very thing they were asking for.",
    aboutGod: "God hears the prayers of His people and acts, sometimes in ways that outrun our own faith.",
    aboutPeople: "We pray for things we half expect God won't do, and He surprises us anyway.",
    realLife: "Keep praying for the thing that feels impossible — God may answer before your faith catches up.",
    verse: "“Peter therefore was kept in the prison, but constant prayer was made by the assembly to God for him.” — Acts 12:5",
    reflection: "What have you stopped praying about because you quietly assumed God wouldn't come through?",
    prayer: "Father, grow my faith to match Your power. Help me keep praying boldly even when the answer seems impossible. Amen.",
    step: "Pick one thing you've given up praying for and bring it back to God today with fresh hope.",
    keyWords: [
      { word: "Intercession", meaning: "Praying earnestly on behalf of someone else. The church's all-night prayer for Peter shows how God works through His people lifting each other up." },
    ],
    verses: [
      { ref: "Ephesians 3:20", text: "Now to him who is able to do exceedingly abundantly above all that we ask or think, according to the power that works in us.", meaning: "God's ability stretches far beyond what you can imagine asking for. Your prayers are never too big for Him." },
    ],
    sideReflection: "What have I quietly stopped praying about, assuming God wouldn't act?",
  },
  131: {
    context: "The church in Antioch is worshiping and praying when the Spirit sets apart two of their best to launch out on mission. Chapter 13 begins the great journeys that will carry the good news across the Roman world.",
    plainEnglish: "The Holy Spirit calls Barnabas and Saul, the church sends them off, and they begin preaching from town to town. In Antioch of Pisidia, Paul preaches a powerful message about Jesus, and while some reject it, many Gentiles rejoice and believe.",
    aboutGod: "God still calls and sends ordinary people on purpose, weaving their willingness into His big plan.",
    aboutPeople: "We're each invited into a mission bigger than ourselves when we make ourselves available to God.",
    realLife: "Your everyday yes to God might be the start of something with far wider ripples than you can see.",
    verse: "“As they served the Lord and fasted, the Holy Spirit said, ‘Separate Barnabas and Saul for me, for the work to which I have called them.’” — Acts 13:2",
    reflection: "What might God be calling you toward that you've been hesitant to say yes to?",
    prayer: "Lord, I make myself available to You. Show me the work You've prepared for me, and give me courage to step into it. Amen.",
    step: "Ask God in prayer today, “What are You calling me to?” and write down whatever comes to mind.",
    keyWords: [
      { word: "Calling", meaning: "God's personal invitation to play your part in His work. It's not just for pastors or missionaries — every follower of Jesus has a unique purpose to live out." },
    ],
    verses: [
      { ref: "Ephesians 2:10", text: "For we are his workmanship, created in Christ Jesus for good works, which God prepared before that we would walk in them.", meaning: "God has good work with your name on it, planned in advance. Your life has purpose that He designed specifically for you." },
    ],
    sideReflection: "What is God calling me toward that I keep hesitating to say yes to?",
  },
  132: {
    context: "Paul and Barnabas press on through new cities, and the mission gets both thrilling and dangerous. Chapter 14 shows the highs of people coming to faith and the very real cost of staying faithful.",
    plainEnglish: "After a miraculous healing, a crowd tries to worship Paul and Barnabas as gods, and they urgently redirect the praise to the living God. Soon after, Paul is stoned and left for dead, yet he gets up, keeps going, and tells the new believers that hardship is part of the road into God's kingdom.",
    aboutGod: "God walks with His people through both the celebrations and the suffering, never abandoning them on the hard stretches.",
    aboutPeople: "We want the wins without the struggle, but real faith is forged through perseverance.",
    realLife: "Hard seasons don't mean you've left God's path — sometimes they're proof you're still on it.",
    verse: "“Confirming the souls of the disciples, exhorting them to continue in the faith, and that through many afflictions we must enter into God's Kingdom.” — Acts 14:22",
    reflection: "How might a hard season you're in actually be part of God's path rather than a detour from it?",
    prayer: "Father, when the road gets hard, remind me You're still with me. Give me the perseverance to keep walking with You. Amen.",
    step: "Name one hardship you're facing and choose one small, faithful next step instead of giving up.",
    keyWords: [
      { word: "Perseverance", meaning: "Keeping going in faith even when it's hard or costly. It's not about gritting your teeth alone — it's about leaning on God to carry you through." },
    ],
    verses: [
      { ref: "James 1:12", text: "Blessed is a person who endures temptation, for when he has been approved, he will receive the crown of life.", meaning: "Endurance isn't wasted. God sees every hard step you take in faith, and there's a reward waiting that outlasts the struggle." },
    ],
    sideReflection: "Where am I tempted to read a hard season as God's absence, when He may actually be right there with me?",
  },
  133: {
    context: "The young church hits its first major crisis — not from outside enemies, but an internal argument over who belongs. As non-Jewish people flood in, some insist they must first follow all the old Jewish laws to be truly saved.",
    plainEnglish: "The leaders gather in Jerusalem to settle the question: do new believers have to earn their place by keeping the old rules? They conclude that people are saved by grace through Jesus alone, not by religious requirements, and they send a warm letter freeing the new converts from that burden.",
    aboutGod: "He welcomes people on the basis of His grace, not their ability to measure up to a list of rules.",
    aboutPeople: "We're quick to add conditions to God's acceptance that He never asked for.",
    realLife: "You don't have to clean yourself up or get the religious rules right before God will have you — grace meets you first.",
    verse: "“But we believe that we are saved through the grace of the Lord Jesus, just as they are.” — Acts 15:11",
    reflection: "What extra requirement have you been quietly adding to God's free acceptance of you?",
    prayer: "Father, thank You that I'm welcomed by Your grace and not by my performance. Help me rest in that and offer the same welcome to others. Amen.",
    step: "Name one rule you've been using to measure your worth before God, and let it go today.",
    keyWords: [
      { word: "Grace", meaning: "God's undeserved kindness — His acceptance given freely, not earned. You can't work your way up to it; you can only receive it." },
    ],
    verses: [
      { ref: "Ephesians 2:8", text: "For by grace you have been saved through faith, and that not of yourselves; it is the gift of God.", meaning: "Your salvation is a gift, never a wage. There's nothing to add to it and nothing to brag about — just something to receive." },
    ],
    sideReflection: "Where am I trying to earn what God has already freely given me?",
  },
  134: {
    context: "Paul sets out on a new journey and the Spirit redirects him toward Europe through a vision. In the city of Philippi, the gospel reaches a businesswoman, a slave girl, and a hardened jailer — three very different lives.",
    plainEnglish: "After being beaten and thrown in prison, Paul and Silas sing hymns at midnight, and an earthquake breaks the doors open. Instead of escaping, they stay and lead the terrified jailer to faith, and his whole household believes that night.",
    aboutGod: "He works even through closed doors and dark cells, turning suffering into someone else's rescue.",
    aboutPeople: "We assume our worst moments disqualify us, when God often uses them to reach others.",
    realLife: "Even in your hardest, most unfair situations, God may be setting up a rescue you can't yet see.",
    verse: "“Believe in the Lord Jesus Christ, and you will be saved, you and your household.” — Acts 16:31",
    reflection: "When life feels like a locked cell, can you trust that God is still working there?",
    prayer: "Lord, help me sing in the midnight seasons, trusting that You are at work even when the doors are shut. Amen.",
    step: "In a hard situation today, choose one act of worship or gratitude instead of complaint.",
    keyWords: [
      { word: "Household", meaning: "In Bible times, a person's whole family and home. God's reach often spreads through relationships — one changed life touching everyone nearby." },
    ],
    verses: [
      { ref: "Romans 8:28", text: "We know that all things work together for good for those who love God, for those who are called according to his purpose.", meaning: "God doesn't waste your pain. He weaves even the unfair, painful parts into something good you couldn't have planned." },
    ],
    sideReflection: "Where in my life might God be turning a hardship into a doorway for someone else?",
  },
  135: {
    context: "Paul arrives in Athens, the intellectual capital of the ancient world, full of philosophers and idols. Rather than condemn them, he finds common ground and points them to the God they've been groping for.",
    plainEnglish: "Standing among countless statues, Paul notices an altar inscribed ‘to an unknown god' and uses it as a bridge. He tells the curious crowd that the God they don't know is the One who made everything and is near to each of them, not far off at all.",
    aboutGod: "He isn't distant or hidden — He made us to seek Him and is closer than we realize.",
    aboutPeople: "We're all reaching for something bigger than ourselves, even when we can't name it.",
    realLife: "The restless searching in people around you — and in you — is really a hunger for God.",
    verse: "“For in him we live, and move, and have our being.” — Acts 17:28",
    reflection: "What have you been searching for that might really be a hunger for God Himself?",
    prayer: "God, thank You that You aren't far away. Help me find You in the searching of my own heart and meet others in theirs. Amen.",
    step: "Have one honest conversation today that starts with curiosity rather than judgment.",
    keyWords: [
      { word: "Idol", meaning: "Anything we put in God's place to give us meaning or security — back then a statue, today often money, image, or success. It's the thing we lean on instead of Him." },
    ],
    verses: [
      { ref: "Jeremiah 29:13", text: "You shall seek me, and find me, when you search for me with all your heart.", meaning: "God isn't playing hide-and-seek. When you genuinely look for Him, He promises to be found." },
    ],
    sideReflection: "What am I really hungry for underneath the things I chase?",
  },
  136: {
    context: "Worn down by opposition, Paul lands in the bustling port city of Corinth and quietly starts over making tents. Just when he's tempted to go silent, God shows up with a personal word of courage.",
    plainEnglish: "Paul finds friends in Aquila and Priscilla and keeps preaching despite hostility. One night the Lord tells him in a vision not to be afraid but to keep speaking, because He has many people in that city — so Paul stays a year and a half.",
    aboutGod: "He sees when we're discouraged and speaks courage right when we're about to quit.",
    aboutPeople: "We need encouragement to keep going, and we're not as alone as fear tells us.",
    realLife: "When you're tired and afraid of being rejected, God's presence is the reason to keep showing up.",
    verse: "“Don't be afraid, but speak and don't be silent; for I am with you.” — Acts 18:9-10",
    reflection: "Where has fear been telling you to go silent and quit?",
    prayer: "Lord, when I'm worn down and afraid, remind me that You are with me. Give me courage to keep going one more day. Amen.",
    step: "Do the one thing fear has been telling you to avoid — send the message, make the call, show up.",
    keyWords: [
      { word: "Vision", meaning: "A way God communicated directly with people, like a waking dream. The heart of it here is simple — God reassuring someone He loves that He's near." },
    ],
    verses: [
      { ref: "Isaiah 41:10", text: "Don't be afraid, for I am with you. Don't be dismayed, for I am your God.", meaning: "Fear shrinks when you remember who is standing with you. God's presence is the steady answer to your worst nerves." },
    ],
    sideReflection: "Where do I most need to hear God say to me, ‘Don't be afraid — I am with you'?",
  },
  137: {
    context: "Ephesus was a city saturated with magic, idol-making, and the famous temple of Artemis. Paul's two years there spark such transformation that it threatens the entire local economy built on false gods.",
    plainEnglish: "The power of God moves so visibly that former sorcerers burn their expensive magic scrolls and turn to Jesus. The silversmiths, watching their idol business dry up, start a riot to protect their profits — proof that the gospel was genuinely changing lives.",
    aboutGod: "His power is greater than any darkness, addiction, or counterfeit we've trusted.",
    aboutPeople: "Real change costs us something, and we have to let go of what we once leaned on.",
    realLife: "Following Jesus means burning a few bridges to old habits — and finding His freedom worth it.",
    verse: "“So the word of the Lord was growing and becoming mighty.” — Acts 19:20",
    reflection: "What ‘scroll' from your old life might God be asking you to finally let burn?",
    prayer: "Jesus, give me courage to let go of the things I've leaned on instead of You. I trust Your freedom more than my old crutches. Amen.",
    step: "Identify one old habit or object that pulls you backward, and take a concrete step to be rid of it today.",
    keyWords: [
      { word: "Repentance", meaning: "A change of direction — turning away from what harms you and toward God. It's not shame, but a hopeful U-turn into a better life." },
    ],
    verses: [
      { ref: "2 Corinthians 5:17", text: "Therefore if anyone is in Christ, he is a new creation. The old things have passed away. Behold, all things have become new.", meaning: "In Jesus you're not just patched up — you're made new. The old version of you no longer gets to define you." },
    ],
    sideReflection: "What am I still holding onto that I know is holding me back?",
  },
  138: {
    context: "Knowing hardship and possibly death await him, Paul gathers the Ephesian church leaders for an emotional goodbye. It's one of the most tender farewell scenes in the whole book.",
    plainEnglish: "Paul reminds them how he served with humility and tears, then warns them to guard the flock after he's gone. He commits them to God's grace, and they weep and pray together on the beach before he sails away.",
    aboutGod: "He shepherds His people through every leader and every parting, never leaving them unguarded.",
    aboutPeople: "We're shaped by the people who love us, and saying goodbye well is part of love.",
    realLife: "Living and serving with an open heart will cost you tears — and it's worth every one.",
    verse: "“It is more blessed to give than to receive.” — Acts 20:35",
    reflection: "Who in your life have you been holding back from, afraid of how much love might cost?",
    prayer: "Father, give me a heart that pours itself out for others the way Paul did. Help me love generously even when it hurts. Amen.",
    step: "Give something away today — your time, your help, or your encouragement — expecting nothing back.",
    keyWords: [
      { word: "Shepherd", meaning: "A leader who protects and cares for people like a flock. It's a picture of patient, sacrificial guidance — the way God cares for you." },
    ],
    verses: [
      { ref: "Acts 20:24", text: "But these things don't count; nor do I hold my life dear to myself, so that I may finish my race.", meaning: "A life poured out for what matters is never wasted. Finishing well means giving yourself fully to the purpose God gave you." },
    ],
    sideReflection: "Am I loving people with an open hand, or protecting myself from the cost of caring?",
  },
  139: {
    context: "Against urgent warnings from friends, Paul is determined to go to Jerusalem, sensing it will bring chains and suffering. His resolve shows what it looks like to follow God even toward pain.",
    plainEnglish: "Believers beg Paul not to go, but he answers that he's ready to be bound and even die for Jesus. When he arrives, a misunderstanding in the temple sparks a mob, and he's arrested — exactly the danger everyone feared.",
    aboutGod: "He gives us peace to walk into hard places, not always around them.",
    aboutPeople: "We naturally want comfort, but love sometimes calls us toward costly obedience.",
    realLife: "Doing the right thing won't always be safe or popular, but God's peace can carry you through it.",
    verse: "“For I am ready not only to be bound, but also to die at Jerusalem for the name of the Lord Jesus.” — Acts 21:13",
    reflection: "Is there a right but difficult path you've been avoiding because it isn't safe?",
    prayer: "Lord, give me the courage Paul had — to follow You even when the road leads through hardship. Let Your will be done in me. Amen.",
    step: "Take one step toward a hard thing you know is right, even if it scares you.",
    keyWords: [
      { word: "Surrender", meaning: "Trusting God enough to say ‘Your will be done,' even when His path is harder than the one you'd choose. It's not defeat — it's deep trust." },
    ],
    verses: [
      { ref: "Luke 22:42", text: "Father, if you are willing, remove this cup from me. Nevertheless, not my will, but yours, be done.", meaning: "Even Jesus prayed for an easier way — and still chose the Father's will. Surrender doesn't mean you stop feeling the cost; it means you trust God with it." },
    ],
    sideReflection: "Where is God asking me to trust Him with an outcome I can't control?",
  },
  140: {
    context: "Standing on the prison steps before the very crowd that wants him dead, Paul asks to speak. Instead of defending himself with arguments, he simply tells the story of how Jesus changed his life.",
    plainEnglish: "Paul recounts how he once violently persecuted Christians until he met the risen Jesus on the road to Damascus and was utterly transformed. His whole defense is just his testimony — the honest before-and-after of an encounter with grace.",
    aboutGod: "He can stop anyone in their tracks and turn an enemy into a friend.",
    aboutPeople: "No one is too far gone for God to reach and remake.",
    realLife: "Your story of how God met you is one of the most powerful things you'll ever share.",
    verse: "“I am Jesus of Nazareth, whom you persecute.” — Acts 22:8",
    reflection: "What's your before-and-after story of meeting God — and who needs to hear it?",
    prayer: "Jesus, thank You for meeting me and changing me. Help me tell my story honestly so others can find You too. Amen.",
    step: "Write down in a few sentences how your life is different because of God, and share it with one person.",
    keyWords: [
      { word: "Testimony", meaning: "Your personal story of what God has done in your life. It doesn't need to be polished — its power is in being true." },
    ],
    verses: [
      { ref: "1 Timothy 1:15", text: "Christ Jesus came into the world to save sinners, of whom I am chief.", meaning: "Paul never forgot how far grace reached for him. Your past doesn't disqualify you — it becomes the proof of how good God is." },
    ],
    sideReflection: "How would I describe, in my own words, the difference God has made in my life?",
  },
  141: {
    context: "Paul stands trial before the religious council, and the situation grows so dangerous that a plot forms to kill him. In the middle of the chaos, God quietly steadies him and arranges his protection.",
    plainEnglish: "After a heated hearing, the Lord stands by Paul at night and tells him to take courage, because he will yet testify in Rome. When over forty men vow to ambush him, Paul's young nephew overhears the plot, and a Roman escort spirits him to safety.",
    aboutGod: "He works behind the scenes through ordinary people and small details to protect His purposes.",
    aboutPeople: "We rarely see all the ways God is guarding our lives.",
    realLife: "Even when threats surround you, God can use an overheard word or an unlikely helper to keep you.",
    verse: "“Cheer up, Paul, for as you have testified about me at Jerusalem, so you must testify also at Rome.” — Acts 23:11",
    reflection: "Can you trust that God is at work in the details of your life even when you can't see it?",
    prayer: "Lord, thank You that You're working behind the scenes for my good. Help me take courage when I'm afraid. Amen.",
    step: "Write down one ‘small' way God has quietly protected or provided for you recently, and thank Him.",
    keyWords: [
      { word: "Providence", meaning: "God's quiet care, guiding events and details for your good even when you don't notice. It's His hand at work behind the ordinary." },
    ],
    verses: [
      { ref: "Psalm 121:7", text: "Yahweh will keep you from all evil. He will keep your soul.", meaning: "God's protection is real and personal. Even in danger, your life is held in His care." },
    ],
    sideReflection: "Where might God be working in my life in ways I haven't noticed yet?",
  },
  142: {
    context: "Paul faces the Roman governor Felix in a formal trial, accused by polished prosecutors. What unfolds shows the difference between hearing the truth and acting on it.",
    plainEnglish: "Paul calmly answers the charges and explains his faith, even speaking about righteousness and self-control until Felix grows uncomfortable. Felix is moved but keeps stalling, hoping for a bribe, and leaves Paul in prison for two years.",
    aboutGod: "He patiently offers truth and gives people room to respond.",
    aboutPeople: "We often delay responding to God, waiting for a ‘convenient' moment that never comes.",
    realLife: "Putting off your response to God is one of the easiest ways to miss Him entirely.",
    verse: "“Go your way for this time, and when it is convenient for me, I will summon you.” — Acts 24:25",
    reflection: "What have you been telling God you'll deal with ‘later'?",
    prayer: "Father, I don't want to keep putting You off. Help me respond to You today instead of someday. Amen.",
    step: "Take one action on something you've felt God nudging you about but kept delaying.",
    keyWords: [
      { word: "Conviction", meaning: "That inner sense that something needs to change — God's gentle, honest nudge toward life. It isn't condemnation; it's an invitation." },
    ],
    verses: [
      { ref: "2 Corinthians 6:2", text: "Behold, now is the acceptable time. Behold, now is the day of salvation.", meaning: "God's invitation is always for today, not someday. The best moment to turn toward Him is the one you're in." },
    ],
    sideReflection: "What am I waiting for a ‘convenient time' to finally do with God?",
  },
  143: {
    context: "After two years in limbo, Paul faces a new governor, Festus, and a fresh round of accusations. Worn but unshaken, he makes a bold move that sets his course toward Rome.",
    plainEnglish: "When pressured to return to Jerusalem where enemies wait, Paul appeals to Caesar, exercising his right as a Roman citizen. Festus, unsure what to write about him, brings in King Agrippa to help sort out the puzzling case.",
    aboutGod: "He can use legal systems, rights, and red tape to move His plans forward.",
    aboutPeople: "We can act wisely and stand up for ourselves while still trusting God with the outcome.",
    realLife: "Faith and good sense aren't opposites — you can use the tools you have and trust God with the rest.",
    verse: "“I appeal to Caesar!” — Acts 25:11",
    reflection: "Where do you need to act wisely while leaving the final outcome in God's hands?",
    prayer: "Lord, give me wisdom to take the steps I can, and faith to trust You with what I can't control. Amen.",
    step: "Take one practical, wise step toward a situation you've only been worrying about.",
    keyWords: [
      { word: "Appeal", meaning: "Paul's legal right as a Roman citizen to have his case heard by the emperor. It shows faith and practical wisdom working hand in hand." },
    ],
    verses: [
      { ref: "Proverbs 16:9", text: "A man's heart plans his course, but Yahweh directs his steps.", meaning: "You're free to plan and act wisely — and God is still steering the bigger story. Your steps and His direction work together." },
    ],
    sideReflection: "Where am I only worrying when I could also be taking a wise, faithful step?",
  },
  144: {
    context: "Given the chance to speak before King Agrippa, Paul doesn't just defend himself — he winsomely shares the gospel. It's a masterclass in turning your own story into an invitation.",
    plainEnglish: "Paul retells his dramatic conversion and his mission to open people's eyes from darkness to light. So compelling is his appeal that Agrippa half-jokingly says Paul is nearly persuading him to become a Christian.",
    aboutGod: "He calls people out of darkness into light, offering forgiveness and a fresh start to anyone.",
    aboutPeople: "We're all somewhere on the road between resisting God and being ‘almost' persuaded.",
    realLife: "‘Almost' following Jesus still leaves you outside the joy of fully knowing Him.",
    verse: "“To open their eyes, that they may turn from darkness to light.” — Acts 26:18",
    reflection: "Are you fully in with God, or hovering at ‘almost'?",
    prayer: "Jesus, I don't want to settle for ‘almost.' Open my eyes and draw me all the way into life with You. Amen.",
    step: "Identify one area where you've been holding back from God, and say yes to Him there today.",
    keyWords: [
      { word: "Conversion", meaning: "The turning point when someone moves from living for themselves to following Jesus. It's a homecoming — being welcomed into a whole new life." },
    ],
    verses: [
      { ref: "1 Peter 2:9", text: "You may proclaim the excellence of him who called you out of darkness into his marvelous light.", meaning: "God's invitation is to step out of the shadows into His light. You were made for that brightness, not the dark." },
    ],
    sideReflection: "Where am I living as an ‘almost' believer instead of fully trusting God?",
  },
  145: {
    context: "Paul's long-awaited voyage to Rome turns into a terrifying ordeal at sea. A violent storm rages for days, and everyone aboard loses hope — except the one man holding onto God's promise.",
    plainEnglish: "As the ship is battered and all hope of survival fades, an angel assures Paul that everyone will live. He encourages the exhausted, starving crew to take heart, and though the ship is destroyed, all 276 people make it safely to shore.",
    aboutGod: "He keeps His promises through the storm, not by removing it but by carrying us through.",
    aboutPeople: "We tend to lose hope in the dark, but God's word steadies us when our circumstances won't.",
    realLife: "When everything is falling apart, God's promise can be the anchor that keeps you from giving up.",
    verse: "“Therefore, sirs, cheer up! For I believe God, that it will be just as it has been spoken to me.” — Acts 27:25",
    reflection: "What storm are you in right now where you need to hold onto God's word instead of your fear?",
    prayer: "Lord, when the storm is loud and hope feels gone, help me believe Your promises. Carry me through to the other side. Amen.",
    step: "Write down one promise of God and read it aloud whenever fear rises today.",
    keyWords: [
      { word: "Hope", meaning: "Confident trust that God will keep His word, even when nothing around you looks promising. It's an anchor, not just a wish." },
    ],
    verses: [
      { ref: "Isaiah 43:2", text: "When you pass through the waters, I will be with you, and through the rivers, they will not overflow you.", meaning: "God doesn't always still the storm, but He goes through it with you. You won't be swept away, because He's holding on." },
    ],
    sideReflection: "What promise of God can I cling to in the storm I'm facing right now?",
  },
  146: {
    context: "Shipwrecked and weary, Paul finally reaches Rome — not as a free man, but as a prisoner who still won't stop sharing Jesus. The book of Acts ends not with a tidy bow, but with an open, unstoppable mission.",
    plainEnglish: "After a kind welcome on the island of Malta and signs of God's power, Paul arrives in Rome and lives under guard. For two whole years he keeps preaching the kingdom of God boldly and freely, and no one stops him.",
    aboutGod: "His mission can't be chained, even when His messengers are.",
    aboutPeople: "We can keep doing what matters most no matter how limited our circumstances feel.",
    realLife: "Wherever you find yourself — even somewhere you'd never choose — God can still use you fully.",
    verse: "“Preaching God's Kingdom and teaching the things concerning the Lord Jesus Christ with all boldness, without hindrance.” — Acts 28:31",
    reflection: "Where do you feel ‘stuck,' and how might God still want to use you right there?",
    prayer: "Father, help me bloom where I'm planted. Even in limits I didn't choose, let my life still point to You. Amen.",
    step: "Do one meaningful thing for God's kingdom today, right where you are, without waiting for better circumstances.",
    keyWords: [
      { word: "Boldness", meaning: "Courage rooted in God rather than confidence in yourself. It's freedom to live and speak your faith even when conditions aren't ideal." },
    ],
    verses: [
      { ref: "Philippians 1:12", text: "Now I desire to have you know, brothers, that the things which happened to me have turned out for the progress of the Good News.", meaning: "Even Paul's imprisonment advanced God's work. Your limitations don't shrink God's plans — He works straight through them." },
    ],
    sideReflection: "Where do I feel stuck, and how might God want to use me right there anyway?",
  },
};

/** The 6 arcs of the plan, for the Reading Plan tab. */
export const ARCS = [
  { name: "Start with Jesus", reading: "John", days: "Days 1–21" },
  { name: "Why Jesus came", reading: "Romans", days: "Days 22–37" },
  { name: "Honest prayer", reading: "Psalms", days: "Days 38–87" },
  { name: "Everyday wisdom", reading: "Proverbs", days: "Days 88–118" },
  { name: "The church in action", reading: "Acts", days: "Days 119–146" },
  { name: "The whole story", reading: "Genesis → Revelation", days: "Days 147–365" },
];

/** First day each Bible book appears, in plan order — for "jump to a book". */
export function getBookStarts(): { book: string; day: number }[] {
  const BOOKS = [
    "Genesis","Exodus","Leviticus","Numbers","Deuteronomy","Joshua","Judges",
    "Ruth","1 Samuel","2 Samuel","1 Kings","2 Kings","1 Chronicles","2 Chronicles",
    "Ezra","Nehemiah","Esther","Job","Psalms","Proverbs","Ecclesiastes",
    "Song of Solomon","Isaiah","Jeremiah","Lamentations","Ezekiel","Daniel","Hosea",
    "Joel","Amos","Obadiah","Jonah","Micah","Nahum","Habakkuk","Zephaniah","Haggai",
    "Zechariah","Malachi","Matthew","Mark","Luke","John","Acts","Romans",
    "1 Corinthians","2 Corinthians","Galatians","Ephesians","Philippians","Colossians",
    "1 Thessalonians","2 Thessalonians","1 Timothy","2 Timothy","Titus","Philemon",
    "Hebrews","James","1 Peter","2 Peter","1 John","2 John","3 John","Jude","Revelation",
  ];
  const rows = plan();
  return BOOKS.map((book) => {
    const re = new RegExp(`(^|[,·]\\s*)${book.replace(/ /g, "\\s")}\\s`);
    const row = rows.find((r) => re.test(r.reading));
    return { book, day: row?.day ?? 1 };
  });
}

export function getStudyDay(day: number): StudyDay {
  const row = plan().find((r) => r.day === day) ?? plan()[0];
  const a = AUTHORED[day];
  if (a) {
    return { day: row.day, reading: row.reading, arc: row.arc, authored: true, ...a };
  }
  // Graceful, original fallback until this day is hand-written.
  return {
    day: row.day,
    reading: row.reading,
    arc: row.arc,
    authored: false,
    context: `Today we're in ${row.reading}. Theme for this stretch: ${row.theme}.`,
    plainEnglish:
      "A plain-English walk-through for this reading is on its way. For now, read slowly and notice one thing that stands out.",
    aboutGod: "Watch for what today's reading reveals about who God is.",
    aboutPeople: "Watch for what it reveals about people — including you.",
    realLife: "Ask: what's one way this could change how I live today?",
    verse: "Pick one verse from today's reading to carry with you.",
    reflection: "What's one thing God might be saying to you here?",
    prayer: "God, open my eyes to see You in what I read today. Amen.",
    step: "Do one small thing today that puts this reading into practice.",
    keyWords: [
      {
        word: "Grace",
        meaning:
          "Not a reward you earn by being good enough, but a gift God keeps giving before you've cleaned anything up. You're met as you are.",
      },
    ],
    verses: [
      {
        ref: "Matthew 11:28",
        text: "Come to me, all you who labor and are heavily burdened, and I will give you rest.",
        meaning:
          "He doesn't ask you to fix yourself first. Come tired, come heavy, come as you are — and let Him carry what you can't.",
      },
    ],
    sideReflection: "Where do I most need God to meet me today?",
  };
}

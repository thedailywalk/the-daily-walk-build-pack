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

// Mocked devotional content per verse × step
// TODO: Replace with real AI responses when live

export type DevotionalStep = "understand" | "liveIt" | "pray";

export type VerseDevotional = {
  reference: string;
  understand: string;
  liveIt: string;
  pray: string;
};

const CONTENT: Record<string, VerseDevotional> = {
  "John 1:3": {
    reference: "John 1:3",
    understand:
      "John 1:3 establishes Jesus Christ as the agent of all creation. Nothing that exists came into being apart from Him. This reveals His divine nature before the incarnation — He is not a created being, but the Creator Himself.",
    liveIt:
      "Pause today and look at something in creation — the sky, a tree, a person you love. Remember that Christ made it. Let that reality shift how you see ordinary moments.",
    pray:
      "God, You are the Creator of all things. Help me see Your fingerprints in the world around me today. Let creation draw me closer to You. Amen.",
  },
  "John 1:5": {
    reference: "John 1:5",
    understand:
      "John 1:5 shows that Jesus is the true light that shines into spiritual darkness. Darkness cannot overcome the light of Christ. This verse gives hope that truth, life, and salvation in Jesus will always prevail.",
    liveIt:
      "Today, choose one area of fear or discouragement and bring it into the light of Christ. Take one practical step of faith instead of letting darkness lead your thinking.",
    pray:
      "Jesus, thank You for being the light that overcomes darkness. Shine Your truth into my heart today and help me walk in faith, hope, and obedience. Amen.",
  },
  "John 8:12": {
    reference: "John 8:12",
    understand:
      "When Jesus says 'I am the light of the world,' He claims to be the source of all spiritual truth and life. To follow Him is to walk out of darkness — confusion, sin, and separation from God — into His clear, sustaining light.",
    liveIt:
      "Identify one decision or relationship in your life that feels unclear. Bring it to Jesus in prayer today and ask Him to light your path forward.",
    pray:
      "Jesus, You are the light of the world. Where I am confused or walking in darkness, guide my steps. I choose to follow You today. Amen.",
  },
  "Ephesians 5:8": {
    reference: "Ephesians 5:8",
    understand:
      "Paul reminds believers that they were once spiritually blind, but in Christ they have become light itself. This is an identity statement — because of Jesus, we carry His light and are called to reflect it.",
    liveIt:
      "Live as light today. In one specific conversation or situation, choose kindness, honesty, or generosity over the easier, darker path.",
    pray:
      "Father, thank You that I am no longer in darkness. Help me live as a child of light today — in my words, my choices, and my love for others. Amen.",
  },
  "1 John 1:5": {
    reference: "1 John 1:5",
    understand:
      "John declares that God is light and in Him there is no darkness at all. This is a statement about God's absolute holiness. There is no shadow, no deception, no evil in Him. Walking with God means walking in truth and openness.",
    liveIt:
      "Is there anything you've been hiding or avoiding in your walk with God? Take one step toward honesty with Him today — confess it, release it, or bring it into the open.",
    pray:
      "God, You are light and in You there is no darkness. Help me walk in that light — honestly, humbly, and openly before You. Thank You for Your grace. Amen.",
  },
  "Romans 8:28": {
    reference: "Romans 8:28",
    understand:
      "Paul assures believers that God is actively working all circumstances — even painful ones — for the good of those who love Him. This is not blind optimism; it is confident trust in a sovereign, loving God.",
    liveIt:
      "Think of one difficult situation in your life right now. Write it down and then write: 'God is working in this.' Choose to trust His plan over your own understanding today.",
    pray:
      "Father, I trust that You are working all things together for my good. Even what I cannot understand, I release into Your hands. Help me rest in Your plan today. Amen.",
  },
  "Psalm 23:1": {
    reference: "Psalm 23:1",
    understand:
      "David opens with a declaration of complete trust: 'The Lord is my shepherd.' A shepherd was responsible for every need of the flock — provision, safety, direction, and restoration. David is saying God takes that role in his life, so he lacks nothing.",
    liveIt:
      "Today, make a list of three things you are anxious about. For each one, say out loud: 'My Shepherd has this.' Let that truth replace fear with peace.",
    pray:
      "God, You are my shepherd and I shall lack nothing. Guide me today, provide for my needs, and help me rest in Your care. I trust You with everything I am carrying. Amen.",
  },
};

export const FALLBACK_DEVOTIONAL: Omit<VerseDevotional, "reference"> = {
  understand:
    "This verse reveals something true and important about God's nature, His love, and His will for your life. Read it slowly. Let it speak to you today.",
  liveIt:
    "Take one step today that reflects the truth of this verse. Ask God to show you what that looks like in a practical, everyday moment.",
  pray: "God, speak to me through this verse. Let it shape how I think, how I love, and how I live today. Amen.",
};

export function getDevotional(reference: string): VerseDevotional {
  // Exact match
  if (CONTENT[reference]) return CONTENT[reference];
  // Partial match — handles "John 1:5 (WEB)" or similar
  const key = Object.keys(CONTENT).find(
    (k) => reference.includes(k) || k.includes(reference.split(" (")[0])
  );
  if (key) return CONTENT[key];
  // Fallback
  return { reference, ...FALLBACK_DEVOTIONAL };
}

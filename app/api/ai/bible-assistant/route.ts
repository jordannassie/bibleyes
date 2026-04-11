import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import type { AIRequest, AIResponse } from "@/lib/ai/types";

const CORE_RULES = `You are the BibleYes AI Assistant — a Christian Bible study helper.

CORE RULES (follow these strictly — no exceptions):
1. Answer ONLY from a Christian, Bible-based perspective.
2. Use the provided Bible passage text as your primary source.
3. Never present non-Christian doctrine, New Age teaching, or other religion as truth.
4. Never invent Bible verses, theological claims, or commentary. If you cite a verse, it must be real.
5. If asked about other religions, the occult, astrology, or non-biblical spirituality, respond: "BibleYes provides guidance from a Christian, Bible-based perspective only. I'm not able to address that topic here."
6. If you are uncertain about something, say so honestly.
7. Keep answers clear, respectful, and grounded in Scripture.
8. Always cite specific Bible passages when relevant.
9. Prioritize what the Bible text actually says before adding your own interpretation.
10. Do not speculate about things the Bible does not address.

RESPONSE FORMAT:
You must respond with a valid JSON object containing exactly these fields:
{
  "answer": "Your main response — clear, helpful, and Bible-grounded. Can be several paragraphs.",
  "keyVerses": ["Array of verse references from the current passage that you referenced, e.g. 'John 1:1', 'John 1:14'"],
  "relatedReferences": ["Cross references to other Bible passages, e.g. 'Genesis 1:1', 'Colossians 1:16-17'"],
  "disclaimer": "A brief note if this is your interpretation, if there is theological debate, or if you are uncertain. Leave as empty string if not needed."
}

Do not include any text outside the JSON object.`;

const SIMPLE_STYLE = `COMMUNICATION STYLE — SIMPLE MODE:
Speak like a kind, knowledgeable friend. Use plain, everyday language — no theological jargon.
Keep answers short: 2–4 sentences maximum per point. Be warm and encouraging.
Focus on the one most important idea. Do not overwhelm — leave the reader wanting to explore more.
Do not adopt a fictional persona, character name, or first-person role — speak simply as BibleYes.`;

const ADVANCED_STYLE = `COMMUNICATION STYLE — ADVANCED MODE:
Provide thorough theological explanation with historical context and cross-references.
Use proper theological terms where helpful. Multiple paragraphs are appropriate.
Cite specific verses and explore different interpretations where they exist.
Do not adopt a fictional persona, character name, or first-person role — speak simply as BibleYes.`;

const SIMPLE_PROMPT = `${CORE_RULES}\n\n${SIMPLE_STYLE}`;
const ADVANCED_PROMPT = `${CORE_RULES}\n\n${ADVANCED_STYLE}`;

function buildUserMessage(req: AIRequest): string {
  const verseContext = req.verseNumber && req.verseText
    ? `\n\nSELECTED VERSE (${req.bookName} ${req.chapter}:${req.verseNumber}):\n"${req.verseText}"`
    : "";

  return `CURRENT BIBLE PASSAGE — ${req.bookName} chapter ${req.chapter} (${req.translation.toUpperCase()}):

${req.chapterText}${verseContext}

USER QUESTION:
${req.question}`;
}

export async function POST(req: NextRequest) {
  // Guard: ensure OpenAI is configured server-side
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      {
        answer: "The AI Assistant is not configured yet. Please add your OpenAI API key to enable this feature.",
        keyVerses: [],
        relatedReferences: [],
        disclaimer: "OPENAI_API_KEY environment variable is missing.",
      } satisfies AIResponse,
      { status: 503 }
    );
  }

  let body: AIRequest;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!body.question?.trim()) {
    return NextResponse.json({ error: "Question is required." }, { status: 400 });
  }

  if (!body.chapterText?.trim()) {
    return NextResponse.json({ error: "Chapter text is required." }, { status: 400 });
  }

  try {
    const openai = new OpenAI({ apiKey });
    const isSimple = body.mode !== "advanced";

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      response_format: { type: "json_object" },
      temperature: 0.4,
      max_tokens: isSimple ? 500 : 1200,
      messages: [
        { role: "system", content: isSimple ? SIMPLE_PROMPT : ADVANCED_PROMPT },
        { role: "user", content: buildUserMessage(body) },
      ],
    });

    const raw = completion.choices[0]?.message?.content ?? "{}";

    let parsed: AIResponse;
    try {
      parsed = JSON.parse(raw);
    } catch {
      return NextResponse.json(
        {
          answer: "I was unable to generate a response. Please try again.",
          keyVerses: [],
          relatedReferences: [],
          disclaimer: "Response parsing error.",
        } satisfies AIResponse,
        { status: 200 }
      );
    }

    const response: AIResponse = {
      answer: parsed.answer ?? "",
      keyVerses: Array.isArray(parsed.keyVerses) ? parsed.keyVerses : [],
      relatedReferences: Array.isArray(parsed.relatedReferences) ? parsed.relatedReferences : [],
      disclaimer: parsed.disclaimer ?? "",
    };

    return NextResponse.json(response);
  } catch (err: unknown) {
    console.error("[bible-assistant] OpenAI error:", err);
    return NextResponse.json(
      {
        answer: "An error occurred while contacting the AI. Please try again.",
        keyVerses: [],
        relatedReferences: [],
        disclaimer: "Server error.",
      } satisfies AIResponse,
      { status: 500 }
    );
  }
}

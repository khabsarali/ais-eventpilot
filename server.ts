import express, { Request, Response } from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";

// Load environment variables from .env if present
dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialization helper for Gemini safely handling missing keys on start
let _aiClient: GoogleGenAI | null = null;
function getAiClient(): GoogleGenAI {
  if (!_aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not defined. Please add it in Settings > Secrets in the AI Studio UI.");
    }
    _aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return _aiClient;
}

// REST route to handle the event planning prompt requests
app.post("/api/generate-plan", async (req: Request, res: Response): Promise<void> => {
  const { eventName, eventDate, venue, audience, theme } = req.body;

  if (!eventName || !eventDate || !venue || !audience || !theme) {
    res.status(400).json({ error: "All fields are required: eventName, eventDate, venue, audience, theme." });
    return;
  }

  try {
    const ai = getAiClient();
    
    const prompt = `
      You are the ultimate AI Executive Event Planner and Campaign Architect for the "UAJK Artificial Intelligence Society" (AIS).
      Your goal is to build a flawless, high-octane campaign kit for an upcoming technology-focused event.
      
      EVENT DETAIL INPUTS:
      - Official Event Name: "${eventName}"
      - Scheduled Date: "${eventDate}"
      - Selected Venue: "${venue}" (Located in/near Muzaffarabad, Azad Jammu & Kashmir)
      - Targeted Campus Audience: "${audience}"
      - Core Focus Theme: "${theme}"

      TONE & STYLE GUIDELINES:
      - Tone: Elegant, intelligent, student-friendly, modern, highly encouraging, and professional.
      - Quality: Ready to deploy immediately with zero boilerplate, placeholder text, or generic summaries.
      - Region: Calibrated beautifully for the University of Azad Jammu and Kashmir (UAJK) context, taking local logistics, internet facilities, power availability, and standard PKR budgets into consideration.

      Please construct the following event-campaign modules in pristine detail:

      1. STAGE SCHEDULE ("schedule" array):
         - Provide a highly professional, step-by-step chronologically ordered roadmap of the entire event day.
         - Must list accurate times (e.g., "09:00 AM - 09:30 AM") detailing the complete timeline from volunteer reporting, guest arrival, recitation of the Holy Quran & National Anthem, keynotes, hands-on session/interactive segment, Q&A / panel debate, souvenir presentation, and refreshments.
         - Ensure activities have specific student-oriented details, named anchors or session leads (e.g. "AIS Tech Lead", "Faculty Advisor"), and precise focus areas.

      2. LOGISTICAL ROADMAP ("logistics" array):
         - Detail exact task categories ("Stage", "Media", "Catering", "Tech", "Reception").
         - Include crucial regional operations checklists such as backup power generator checklist, internet connectivity dongles, DSLR camera charging, flyer banners, printed student participation certificates, catering layout (Samosas, Tea, Biscuits), and guest gift boxes.
         - Map logical student group roles to coordinate each operational asset.

      3. SOCIAL MEDIA CAMPAIGN DECK:
         - WhatsApp Announcement ("whatsappAnnouncement"): An extremely engaging, high-conversion broadcast message formatted with clean spacing, bullet points, friendly professional emojis (🚀, 🧠, 🎓, 📍), and easy-to-read headers. It should look striking and ready to copy directly into student group chats.
         - Instagram Caption ("instagramCaption"): A punchy, modern caption using creative hooks, bullet list highlights of key event benefits, and a call-to-action to register, finalized with highly active university hashtags (e.g., #UAJK #AISociety #EventPilot #AzadKashmir #AIinPK).
         - LinkedIn Post ("linkedinAnnouncement"): A sophisticated, polished corporate announcement highlighting the strategic vision of the theme, student skill development, and community impact, geared towards local software industry leaders, academic faculty, and student developers.

      4. VOLUNTEER SQUAD ALLOCATIONS ("volunteers" array):
         - Craft 3-4 specialized team decks (e.g., "Tech Anchor Desk", "Visual Media Wing", "Guest Care Secretariat").
         - Identify the precise number of students needed for each role.
         - Provide 4-5 actionable sub-tasks per group (e.g., "Manage slide deck transitions", "Facilitate roaming mic during Q&A", "Coordinate high-quality photos for the social handles", "Distribute tea/refreshments smoothly to guests").

      5. FINANCIAL APPROVAL BUDGET ("budget" array):
         - Break down costs into realistic Azad Kashmir campus ranges in Pakistani Rupees (PKR).
         - Include realistic estimates for:
           * Stage backdrop flex banner & printed standees (PKR 5,000 - 15,000 range)
           * Refreshments/Tea setup for students & invited mentors (PKR 10,000 - 40,000 range)
           * Printed certificates & premium shields (PKR 4,000 - 10,000 range)
           * Guest honorariums or transport arrangements (PKR 5,000 - 12,000 range)
           * Miscellaneous decor, high-speed Wi-Fi, and stationery kits (PKR 3,000 - 8,000 range)
         - Provide precise category labels and detail the specific cost inclusions as an array of strings.

      6. POST-EVENT SURVEY & AUDIT FRAMEWORK ("postEventSummaryTemplate"):
         - Formulate a beautiful, ready-to-print Markdown evaluation summary.
         - Structure it with clear headers, key performance indicator tables (e.g., Attendance Count, Student Satisfaction, Tech Benchmarks), feedback questions (e.g., "How would you rate the hands-on ML lab?"), and operational lessons learned to help the next AIS executive committee.

      7. AI POSTER IDEA GENERATOR ("posterIdea" object):
         - Provide professional visual ideas to design the event flyer/poster.
         - Must include:
           * headline: A highly professional, modern main poster header / title aligned with the theme.
           * suggestedColors: An array of 3 or 4 premium HEX/Named styling color specifications (e.g., ["Midnight Navy #050b14", "Cyber Fuchsia #f43f5e", "High-viz Yellow #facc15"]).
           * visualTheme: Elegant graphic background descriptions, icon languages, artwork guidelines, or background visuals.
           * typographyStyle: Suggested font styling combinations to use (such as Space Grotesk pairing).
           * layoutSuggestion: Layout alignment details (such as split grid visual or asymmetrical layout).
           * slogan: A clever marketing catchphrase/slogan to print on the poster to capture maximum student attention.
    `;

    const systemInstruction = `
      You are the Elite Lead Event Architect for the UAJK Artificial Intelligence Society (AIS).
      Your persona is intelligent, highly pragmatic, student-friendly, modern, and professional.
      You generate state-of-the-art event planning logs and marketing copy ready for instant, real-world deployment.
      You strictly adhere to returning JSON output matching the Schema. You ensure all financial estimates are accurately configured in Pakistani Rupees (PKR) and match realistic regional budgets.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            eventName: { type: Type.STRING },
            eventDate: { type: Type.STRING },
            venue: { type: Type.STRING },
            audience: { type: Type.STRING },
            theme: { type: Type.STRING },
            schedule: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  time: { type: Type.STRING, description: "Time of the slot (e.g. 09:30 AM - 10:00 AM)" },
                  activity: { type: Type.STRING, description: "Title of the activity" },
                  details: { type: Type.STRING, description: "Bullet points detailing what happens" }
                },
                required: ["time", "activity", "details"]
              }
            },
            logistics: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  item: { type: Type.STRING, description: "Item name (e.g. Sound mixer or High resolution banner)" },
                  category: { type: Type.STRING, description: "Category (e.g. Media, Catering, Stage, Tech)" },
                  responsible: { type: Type.STRING, description: "Designated coordinator / sub-team" }
                },
                required: ["item", "category", "responsible"]
              }
            },
            whatsappAnnouncement: { type: Type.STRING, description: "Copyable text format with expressive emojis and spacers" },
            instagramCaption: { type: Type.STRING, description: "Cool modern caption with specific hashtags" },
            linkedinAnnouncement: { type: Type.STRING, description: "Corporate and elegant LinkedIn text" },
            volunteers: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  role: { type: Type.STRING, description: "Role title (e.g. Tech Support Anchor)" },
                  tasks: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING }
                  },
                  count: { type: Type.INTEGER, description: "Number of volunteers needed for this role" }
                },
                required: ["role", "tasks", "count"]
              }
            },
            budget: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  category: { type: Type.STRING, description: "Category of expense" },
                  items: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING }
                  },
                  estimatedCost: { type: Type.STRING, description: "Estimated cost string in PKR (e.g. PKR 12,000)" }
                },
                required: ["category", "items", "estimatedCost"]
              }
            },
            postEventSummaryTemplate: { type: Type.STRING, description: "Drafted markdown template for post-event survey and metrics" },
            posterIdea: {
              type: Type.OBJECT,
              description: "A complete visual concept layout structure for an event flyer/poster",
              properties: {
                headline: { type: Type.STRING, description: "The prominent headline for the poster artwork" },
                suggestedColors: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                  description: "Array of 3-4 recommended brand/graphics colors with descriptive details"
                },
                visualTheme: { type: Type.STRING, description: "Descriptions of ambient backgrounds, illustrations and theme graphics" },
                typographyStyle: { type: Type.STRING, description: "Font pairing, weight suggestions, and text treatment styles" },
                layoutSuggestion: { type: Type.STRING, description: "Visual blueprint layout description detailing where components live" },
                slogan: { type: Type.STRING, description: "Memorable marketing / publicity slogan to highlight" }
              },
              required: ["headline", "suggestedColors", "visualTheme", "typographyStyle", "layoutSuggestion", "slogan"]
            }
          },
          required: [
            "eventName",
            "eventDate",
            "venue",
            "audience",
            "theme",
            "schedule",
            "logistics",
            "whatsappAnnouncement",
            "instagramCaption",
            "linkedinAnnouncement",
            "volunteers",
            "budget",
            "postEventSummaryTemplate",
            "posterIdea"
          ]
        }
      }
    });

    const parsedData = JSON.parse(response.text || "{}");
    res.json(parsedData);
  } catch (error: any) {
    console.error("Error in AI Event Pilot planner backend:", error);
    res.status(500).json({
      error: error.message || "An unexpected error occurred while generating plans."
    });
  }
});

// Configure Vite or Static Asset delivery
async function bootstrap() {
  if (process.env.NODE_ENV !== "production") {
    // Serve development build via Vite server
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Serve build directory files in production
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[AIS EventPilot API Server] running client+endpoints on http://localhost:${PORT}`);
  });
}

bootstrap();

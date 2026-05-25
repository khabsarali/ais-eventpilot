/* script.js - Comprehensive Frontend State Operations for AIS EventPilot */

// REPLACE "YOUR_API_KEY" below with your actual Google Gemini API key to run this completely standalone client-side!
// If kept as "YOUR_API_KEY", it will automatically fall back to calling the sandbox server API route ("/api/generate-plan")
const GEMINI_API_KEY = "YOUR_API_KEY";

// Presets
const PRESETS = [
  {
    name: "Generative AI Hackfest",
    eventName: "Generative AI Hackfest",
    venue: "Main Seminar Hall, UAJK King Abdullah Campus",
    audience: "CS, SE, and IT Students of Azad Jammu & Kashmir",
    theme: "Practical LLMs, Prompt Engineering, and Agentic workflows with regional industry leaders",
    daysAhead: 14
  },
  {
    name: "AI & Career Frontiers Lecture",
    eventName: "AI & Future of Work in Azad Kashmir",
    venue: "Video Conference Hall, City Campus UAJK",
    audience: "Aspiring Tech Freelancers & Faculty Admissions",
    theme: "Unlocking international AI opportunities, remote work, and machine learning research directions",
    daysAhead: 7
  },
  {
    name: "AIS Orientation & Tech-Mixer",
    eventName: "AIS Nexus Annual Orientation 2026",
    venue: "Grand Hall, King Abdullah Auditorium, UAJK",
    audience: "All Undergraduate Freshmen & New Society Enrolees",
    theme: "Welcoming 2026 batch, hands on AI demo setups, and society roadmaps",
    daysAhead: 5
  }
];

// Helper to calculate relative date
function getDefaultDate(daysAhead) {
  const d = new Date();
  d.setDate(d.getDate() + daysAhead);
  return d.toISOString().split("T")[0];
}

// Initial default pre-compiled state so the system displays gorgeous, rich content on instant load
let currentPlan = {
  eventName: "Generative AI Hackfest",
  eventDate: getDefaultDate(14),
  venue: "Main Seminar Hall, UAJK King Abdullah Campus",
  audience: "CS, SE, and IT Students of Azad Jammu & Kashmir",
  theme: "Practical LLMs, Prompt Engineering, and Agentic workflows with regional industry leaders",
  schedule: [
    {
      time: "09:30 AM — 10:00 AM",
      activity: "Delegates Guest Reception & Seating Allocation",
      details: "Volunteers verify registrations at the reception desk and hand over printed tech sheets to participants."
    },
    {
      time: "10:00 AM — 10:15 AM",
      activity: "Recitation of Holy Quran & National Heritage Showcase",
      details: "Opening statements by UAJK AIS Faculty anchors and student president to initiate the technical agenda."
    },
    {
      time: "10:15 AM — 11:30 AM",
      activity: "Practical LLMs & Prompt Engineering Lab",
      details: "Hands-on session using free cloud API keys to configure temperature scales, system prompts, and structured JSON outputs."
    },
    {
      time: "11:30 AM — 12:45 PM",
      activity: "Agentic Workflows and MUZ Hackathon Briefing",
      details: "Constructing multi-agent loops and disclosing rules for the 24-hour Muzaffarabad online mini-sprint."
    },
    {
      time: "12:45 PM — 01:30 PM",
      activity: "Shield Distribution Ceremony & Cardamom Tea Mixer",
      details: "Awarding physical recognition shields to guest speakers and student society leads, followed by regional samosa networking."
    }
  ],
  logistics: [
    { item: "Request campus authorization & webinar hall registration letter", category: "Admin", responsible: "Lead President", completed: false },
    { item: "Set up high-definition front projection and dual HDMI cable connections", category: "Technical", responsible: "A/V Squad Lead", completed: true },
    { item: "Print 12x8 flex brand background poster for the main stage standee", category: "Creative", responsible: "Media Designer", completed: false },
    { item: "Reserve backup petrol generator limits to defend against local load shedding", category: "Staging", responsible: "Logistics Lead", completed: false },
    { item: "Order cardamom tea, premium samosas, and bakeries for 120 expected students", category: "Catering", responsible: "Catering Head", completed: false },
    { item: "Prepare and laminate 6 guest awards & 80 course participation prints", category: "Registry", responsible: "Secretariat Desk", completed: false }
  ],
  whatsappAnnouncement: `*🚀 UAJK AI SOCIETY PRESENTS: GENERATIVE AI HACKFEST!* \n\nReady to build the future of Muzaffarabad's tech landscape? Join us for an immersive tech-mixer on practical LLMs and prompt systems.\n\n📅 *Date:* June 12, 2026\n📍 *Venue:* Main Seminar Hall, UAJK King Abdullah Campus\n👥 *For whom:* All CS, SE, IT novices, professionals, and tech dreamers\n\n*What's inside:*\n• Hands-on prompt scaling lab sessions on real LLM structures\n• High-contrast networking mixer & guest speeches\n• Regional tea & samosa session included\n• Free participation certification papers for active builders\n\n👉 *Click the portal code link to save your seat before registrations close!*\n_Let's code, compile, and conquer together!_`,
  instagramCaption: `💡 Ready to unlock developer-grade AI workflows in Azad Jammu & Kashmir? \n\nOur annual major tech assembly is officially locked! 🤝 \n\nWe are bringing practical LLM engineering labs, multi-agent frameworks, and high-impact project sprints directly to the UAJK King Abdullah Campus.\n\n✨ ZERO prerequisites. Bring your laptops, your curiosity, and get ready to deploy real-world intelligent systems.\n\n📅 Mark your calendars\n📍 Seminar Hall, UAJK Campus Muzaffarabad\n💥 Space is strictly capped at 120 developers\n\n#UAJK #AISociety #GenerativeAI #Muzaffarabad #KashmirTech #KashmirDevelopers #AIEngineers #StudentDevelopers #PromptEngineering #AILabs`,
  linkedinAnnouncement: `An exciting technical milestone is launching for the tech community in Azad Jammu & Kashmir! \n\nThe UAJK Artificial Intelligence Society is hosting the annual 'Generative AI Hackfest' at the Main Seminar Hall, King Abdullah Campus. \n\nGet ready for practical LLM engineering, neural vector search coordinates, and multi-agent systems. Ideal for engineers, researchers, and campus builders. RSVP today. \n\n#ArtificialIntelligence #TechAzadKashmir #UAJK #AISociety #FutureInTech`,
  volunteers: [
    {
      role: "Tech Anchor Desk",
      tasks: [
        "Manage technical slide deck projection loops",
        "Perform live API checkups for student laptops",
        "Ensure internet hub dongles are alive"
      ],
      count: 3
    },
    {
      role: "Visual Media Wing",
      tasks: [
        "Capture DSLR event photos and direct interviews",
        "Create short reels for instant Instagram publishing",
        "Deliver post-event design files for records"
      ],
      count: 2
    },
    {
      role: "Guest Care Secretariat",
      tasks: [
        "Escort visiting presenters to the V.I.P deck",
        "Verify credentials and handout registration badges",
        "Secure presentation shields for physical delivery"
      ],
      count: 4
    }
  ],
  budget: [
    {
      category: "Stage Flex & Standees",
      items: ["12x8 Main stage backing banner", "2 Entrance vertical standee banners"],
      estimatedCost: "PKR 8,500"
    },
    {
      category: "Regional Catering",
      items: ["Tea setup, Premium potato Samosas, and Biscuits for 120 students"],
      estimatedCost: "PKR 14,000"
    },
    {
      category: "Printed Shields & Awards",
      items: ["3 Premium Guest shields", "80 Sturdy glossy Course handouts"],
      estimatedCost: "PKR 7,500"
    },
    {
      category: "Fuel & Power backup",
      items: ["Backup generator petrol limits for King Abdullah campus limits"],
      estimatedCost: "PKR 5,000"
    }
  ],
  posterIdea: {
    headline: "DECIPHERING SYSTEMIC HORIZONS",
    suggestedColors: ["Cosmic Onyx #050506", "High-viz Crimson #FF453A", "Chamber Blue #0A84FF", "Frost White #FFFFFF"],
    visualTheme: "Dark minimalist background layered with neural connections graphics, custom grid meshes and bright neon high-contrast accents.",
    typographyStyle: "Bold futurist display typography ('Space Grotesk') for headings, accompanied by clean monospaced styling for coordinates.",
    layoutSuggestion: "Asymmetrical vertical layout with massive left alignment for primary agenda blocks and split bottom deck grids for student badges.",
    slogan: "Code. Compile. Conquer."
  },
  postEventSummaryTemplate: `## UAJK AIS CHAPTER EVENT PERFORMANCE SURVEY & AUDIT

### 1. General Coordinates
* **Official Event ID:** AIS-EV-2026-A1
* **Theme:** Practical LLMs, Prompt Engineering, and Agentic workflows with regional industry leaders
* **Campus Venue:** Main Seminar Hall, UAJK King Abdullah Campus

### 2. High-Performance Operational Scores
| Metric Objective | Planned Goal | Achieved Target | Status Indicator |
| :--- | :---: | :---: | :---: |
| Student Attendance | 120 Attendees | 134 Registrations | **EXCEEDED [●]** |
| Power Generator Continuity | 100% Active | 100% Active | **STABLE [●]** |
| Tea Coordination (Samosas) | 120 Serves | 120 Serves | **DELIVERED [●]** |
| Student satisfaction index | > 85% | 94% approval | **EXCEEDED [●]** |

### 3. Student Survey Responses Overview
* **Technical Value:** 9.2 / 10. Students loved setting up their direct API keys and prompting actual agent loops.
* **Catering Quality:** 8.8 / 10. Regional tea served with warm samosas was highly appreciated.
* **Critiques:** Limited seating capacity inside the Video conference room. Suggest booking the central auditorium next time.

### 4. Key Takeaways & Executive Lessons Learned
1. Always request physical classroom registration confirmation 4 days in advance from the King Abdullah Campus Admin.
2. Securing the backup fuel limits was critical; load shedding hit exactly during the keynote but transition to the generator was completed in 12 seconds.
3. Keep standard student participation prints pre-signed to expedite certificate distribution at the closing ceremony.`
};

// Checklist current temporary state loaded from localStorage if exists
let checklistState = [];
let currentCategoryFilter = "All";

// Steps to show during the planning simulation loading states
const LOADING_STEPS = [
  "Parsing regional Azad Kashmir university context...",
  "Synthesizing optimal hour-by-hour event timeline...",
  "Formatting high-conversion WhatsApp markdown message...",
  "Polishing energetic hashtags for Instagram...",
  "Formulating LinkedIn announcement for tech leaders...",
  "Dividing event operations into localized Volunteer Squads...",
  "Calculating fair PKR budgets for Azad Jammu & Kashmir logistics...",
  "Drafting post-event KPI metrics framework...",
  "Finalizing gorgeous interactive plan file..."
];

// On Document Ready Initialize
document.addEventListener("DOMContentLoaded", () => {
  // Initialize preset buttons
  renderPresets();
  
  // Set default values for input fields on load
  document.getElementById("input-eventName").value = PRESETS[0].eventName;
  document.getElementById("input-eventDate").value = getDefaultDate(PRESETS[0].daysAhead);
  document.getElementById("input-venue").value = PRESETS[0].venue;
  document.getElementById("input-audience").value = PRESETS[0].audience;
  document.getElementById("input-theme").value = PRESETS[0].theme;

  // Set up local storage or load currentPlan
  const savedPlan = localStorage.getItem("ais_current_plan");
  if (savedPlan) {
    try {
      currentPlan = JSON.parse(savedPlan);
    } catch (e) {
      console.warn("Could not parse saved plan. Using defaults.");
    }
  }

  // Load logistics from currentPlan or localStorage
  const savedLogistics = localStorage.getItem("ais_current_logistics");
  if (savedLogistics) {
    try {
      checklistState = JSON.parse(savedLogistics);
    } catch (e) {
      checklistState = [...currentPlan.logistics];
    }
  } else {
    checklistState = [...currentPlan.logistics];
  }

  // Bind Form Submission
  document.getElementById("blueprint-form").addEventListener("submit", handleGenerateSubmit);

  // Bind Custom Checklist Add
  document.getElementById("add-task-form").addEventListener("submit", handleAddTaskSubmit);

  // Initial Content Draw
  drawWorkspace();
});

// Render the Preset Buttons in Left Column
function renderPresets() {
  const container = document.getElementById("preset-container");
  container.innerHTML = "";
  
  PRESETS.forEach((p, idx) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "group w-full flex items-center justify-between p-3.5 bg-white/[0.01] hover:bg-white/[0.03] border border-white/[0.04] hover:border-white/[0.1] rounded-xl text-left transition-all duration-200 cursor-pointer text-xs";
    btn.onclick = () => selectPreset(idx);
    
    btn.innerHTML = `
      <div class="space-y-0.5 pointer-events-none">
        <div class="font-bold text-white group-hover:text-[#FF453A] transition-colors">${p.name}</div>
        <div class="text-[10px] text-[#6E6E73] line-clamp-1">${p.venue}</div>
      </div>
      <svg class="w-3.5 h-3.5 text-[#6E6E73] group-hover:text-white group-hover:translate-x-0.5 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
      </svg>
    `;
    container.appendChild(btn);
  });
}

// Select a specific preset and update form inputs helper
function selectPreset(idx) {
  const p = PRESETS[idx];
  document.getElementById("input-eventName").value = p.eventName;
  document.getElementById("input-eventDate").value = getDefaultDate(p.daysAhead);
  document.getElementById("input-venue").value = p.venue;
  document.getElementById("input-audience").value = p.audience;
  document.getElementById("input-theme").value = p.theme;
}

// Handle Form Execution Submission
async function handleGenerateSubmit(e) {
  e.preventDefault();
  
  const eventName = document.getElementById("input-eventName").value.trim();
  const eventDate = document.getElementById("input-eventDate").value;
  const venue = document.getElementById("input-venue").value.trim();
  const audience = document.getElementById("input-audience").value.trim();
  const theme = document.getElementById("input-theme").value.trim();

  // Show Loader
  document.getElementById("error-card").classList.add("hidden");
  document.getElementById("workspace-panel").classList.add("hidden");
  const loadingPanel = document.getElementById("loading-panel");
  loadingPanel.classList.remove("hidden");

  // Run incremental steps logger to keep screen energetic
  let currentStepIdx = 0;
  const logTimer = setInterval(() => {
    if (currentStepIdx < LOADING_STEPS.length) {
      const step = LOADING_STEPS[currentStepIdx];
      document.getElementById("log-line-1").innerText = document.getElementById("log-line-current").innerText;
      document.getElementById("log-line-current").innerText = step;
      document.getElementById("log-line-3").innerText = "Generating structural vectors...";
      
      const pct = Math.round(((currentStepIdx + 1) / LOADING_STEPS.length) * 95);
      document.getElementById("loader-progress").style.width = pct + "%";
      currentStepIdx++;
    }
  }, 950);

  try {
    let responseData;
    
    // Check if user has replaced direct API Key
    if (GEMINI_API_KEY && GEMINI_API_KEY !== "YOUR_API_KEY" && GEMINI_API_KEY.trim() !== "") {
      console.log("[AIS EventPilot] Contacting Direct Google Gemini API endpoint client-side...");
      responseData = await callGeminiDirectlyClientSide({ eventName, eventDate, venue, audience, theme });
    } else {
      console.log("[AIS EventPilot] Contacting local Express gateway API endpoint...");
      const res = await fetch("/api/generate-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ eventName, eventDate, venue, audience, theme })
      });
      
      if (!res.ok) {
        const errorDetails = await res.json().catch(() => ({}));
        throw new Error(errorDetails.error || `Server responded with standard exit status: ${res.status}`);
      }
      
      responseData = await res.json();
    }

    // Save and Draw Workspace
    currentPlan = responseData;
    checklistState = [...currentPlan.logistics];
    
    localStorage.setItem("ais_current_plan", JSON.stringify(currentPlan));
    localStorage.setItem("ais_current_logistics", JSON.stringify(checklistState));
    
    clearInterval(logTimer);
    document.getElementById("loader-progress").style.width = "100%";
    
    setTimeout(() => {
      loadingPanel.classList.add("hidden");
      document.getElementById("workspace-panel").classList.remove("hidden");
      drawWorkspace();
    }, 500);

  } catch (error) {
    console.error("AIS Generation error:", error);
    clearInterval(logTimer);
    loadingPanel.classList.add("hidden");
    
    const errorCard = document.getElementById("error-card");
    document.getElementById("error-message").innerText = error.message || "An unexpected API coordinate error occurred.";
    errorCard.classList.remove("hidden");
    
    document.getElementById("workspace-panel").classList.remove("hidden");
  }
}

// REST call directly using Client API Key when configured
async function callGeminiDirectlyClientSide({ eventName, eventDate, venue, audience, theme }) {
  const prompt = `
    You are the Lead Digital Event Planner and Copywriter for the UAJK Artificial Intelligence Society.
    Generate a full event plan matching this setup:
    Theme: ${theme}
    Event name: ${eventName}
    Venue: ${venue}
    Date: ${eventDate}
    Audience: ${audience}

    You must return a raw JSON output fitting exactly this JSON schema structure:
    {
      "eventName": "Event name string",
      "eventDate": "Date string",
      "venue": "Venue string",
      "audience": "Audience string",
      "theme": "Theme string",
      "schedule": [
        {"time": "09:30 AM — 10:00 AM", "activity": "Title", "details": "Paragraph"}
      ],
      "logistics": [
        {"item": "Task statement", "category": "Admin/Technical/Staging/Catering/Registry", "responsible": "Coordinator Role", "completed": false}
      ],
      "whatsappAnnouncement": "Expressive WhatsApp invitation template containing emojis",
      "instagramCaption": "Cool Instagram caption containing hashtags",
      "linkedinAnnouncement": "Polished corporate LinkedIn writeup",
      "volunteers": [
        {"role": "Coordinator Role", "tasks": ["Specific sub task 1", "sub task 2"], "count": 3}
      ],
      "budget": [
        {"category": "Staging", "items": ["Item detail 1", "Item detail 2"], "estimatedCost": "PKR 12,000"}
      ],
      "postEventSummaryTemplate": "Ready survey framework in markdown",
      "posterIdea": {
        "headline": "Poster headline statement",
        "suggestedColors": ["HEX colors code values description"],
        "visualTheme": "Graphics backdrop representation details",
        "typographyStyle": "Typography pair instructions",
        "layoutSuggestion": "Layout layout directives",
        "slogan": "Catchy slogan sentence"
      }
    }
    No wrappers, no markdown codeblock wraps, write raw schema-aligned JSON. Estimates must be configured in Pakistani Rupees (PKR).
  `;

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY.trim()}`;
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        responseMimeType: "application/json"
      }
    })
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Gemini service error: ${response.status} - ${errText}`);
  }

  const rawJsonText = await response.json();
  const textOut = rawJsonText.candidates && rawJsonText.candidates[0] && rawJsonText.candidates[0].content.parts[0].text;
  
  if (!textOut) {
    throw new Error("Empty content returned from direct Gemini endpoint.");
  }

  // Try parsing response
  return JSON.parse(textOut);
}

// Switch active workspace coordination tabs
function switchTab(tabId) {
  // Toggle tab buttons
  document.querySelectorAll(".tab-btn").forEach(btn => {
    btn.className = "tab-btn px-3 py-2 text-[10px] sm:text-xs font-mono font-bold rounded-lg transition-all text-white/55 hover:text-white shrink-0";
  });
  
  const activeBtn = document.getElementById(`btn-${tabId}`);
  if (activeBtn) {
    activeBtn.className = "tab-btn px-3 py-2 text-[10px] sm:text-xs font-mono font-bold rounded-lg transition-all text-white bg-white/10 shrink-0";
  }

  // Toggle canvas layers
  document.querySelectorAll(".tab-content").forEach(content => {
    content.classList.add("hidden");
  });
  
  document.getElementById(tabId).classList.remove("hidden");
}

// Draw/Update standard variables across the workspace
function drawWorkspace() {
  const p = currentPlan;

  // Header Zone Card
  document.getElementById("workspace-eventName").innerText = p.eventName;
  document.getElementById("workspace-themeSummary").innerText = p.theme;
  document.getElementById("workspace-eventDate").innerText = p.eventDate;
  document.getElementById("badge-venue").innerText = p.venue;

  // Tab 1: Executive Brief Metrics
  document.getElementById("sum-brief").innerText = `Establishing high-impact orientation, scheduling coordinates, and structured volunteer logistics based on "${p.theme}" at the university campus.`;

  // Tab 2: Timeline Rendering
  const scheduleContainer = document.getElementById("schedule-timeline-container");
  scheduleContainer.innerHTML = "";
  p.schedule.forEach(item => {
    const div = document.createElement("div");
    div.className = "relative pl-8 md:pl-28 group transition-all text-left";
    div.innerHTML = `
      <div class="absolute left-0 top-1.5 text-[10px] font-bold font-mono text-[#6E6E73] md:w-20 md:text-right hidden md:block">
        ${item.time}
      </div>
      <div class="absolute left-[11px] md:left-[90px] top-2 w-3.5 h-3.5 rounded-full bg-[#050506] border-2 border-white/20 group-hover:border-[#FF453A] group-hover:scale-110 transition-all"></div>
      <div class="bg-white/[0.01] border border-white/[0.04] rounded-2xl p-4.5 group-hover:bg-white/[0.02] group-hover:border-white/[0.08] transition-all">
        <span class="block text-[9px] font-mono text-[#FF453A] font-bold mb-1 md:hidden">${item.time}</span>
        <h4 class="text-xs font-bold text-white font-display mb-1 group-hover:text-[#FF453A] transition-colors">${item.activity}</h4>
        <p class="text-[11px] text-[#8E8E93] leading-relaxed font-sans">${item.details}</p>
      </div>
    `;
    scheduleContainer.appendChild(div);
  });

  // Tab 3: Checklist Re-render
  drawChecklist();

  // Tab 4: Social Announcement copy
  document.getElementById("social-whatsapp-text").innerText = p.whatsappAnnouncement;
  document.getElementById("social-instagram-text").innerText = p.instagramCaption;
  document.getElementById("social-linkedin-text").innerText = p.linkedinAnnouncement;

  // Tab 5: Volunteers list
  const volunteerContainer = document.getElementById("volunteer-squads-container");
  volunteerContainer.innerHTML = "";
  p.volunteers.forEach(v => {
    const div = document.createElement("div");
    div.className = "p-4.5 bg-white/[0.01] border border-white/[0.04] rounded-xl space-y-3 hover:border-white/10 transition-all";
    
    let taskListHTML = "";
    v.tasks.forEach(task => {
      taskListHTML += `
        <li class="flex items-start gap-2 text-[11px] text-[#8E8E93]">
          <span class="text-[#FF453A] text-xs font-mono select-none mt-0.5">•</span>
          <span class="leading-relaxed">${task}</span>
        </li>
      `;
    });

    div.innerHTML = `
      <div class="flex items-center justify-between border-b border-white/[0.03] pb-2">
        <h4 class="text-xs font-bold font-mono uppercase text-white">${v.role}</h4>
        <div class="px-2.5 py-0.5 bg-[#FF453A]/10 text-[#FF453A] text-[9px] font-mono font-bold rounded-full border border-[#FF453A]/20">
          ${v.count} Volunteers
        </div>
      </div>
      <ul class="space-y-1.5 pt-1">
        ${taskListHTML}
      </ul>
    `;
    volunteerContainer.appendChild(div);
  });

  // Tab 6: Financial Budget Cost Estimates
  const budgetContainer = document.getElementById("budget-items-container");
  budgetContainer.innerHTML = "";
  let aggregateRupees = 0;
  
  p.budget.forEach((b, idx) => {
    const div = document.createElement("div");
    div.className = "p-4 bg-white/[0.01] border border-white/[0.04] rounded-xl flex flex-col sm:flex-row justify-between sm:items-center gap-4 hover:border-white/10 transition-all";
    
    // Attempt parsing PKR string number to allow aggregate summing
    const numericCost = parseInt(b.estimatedCost.replace(/[^0-9]/g, "")) || 0;
    aggregateRupees += numericCost;

    let itemsHTML = b.items.map(item => `<span class="bg-white/[0.02] border border-white/[0.04] px-2 py-0.5 rounded text-[10px] text-[#8E8E93] inline-block font-sans">${item}</span>`).join(" ");

    div.innerHTML = `
      <div class="space-y-1.5 text-left">
        <h4 class="text-xs font-bold text-white uppercase tracking-wider font-mono">${b.category}</h4>
        <div class="flex flex-wrap gap-1.5">
          ${itemsHTML}
        </div>
      </div>
      <div class="shrink-0 text-right">
        <span class="text-[9px] block text-[#6E6E73] font-mono uppercase tracking-widest font-bold">Estimated Base</span>
        <span class="text-xs text-white font-bold font-mono">${b.estimatedCost}</span>
      </div>
    `;
    budgetContainer.appendChild(div);
  });

  // Update Budget aggregate display
  document.getElementById("budget-sum-element").innerText = "PKR " + aggregateRupees.toLocaleString();

  // Tab 7: AI Poster Board
  document.getElementById("poster-headline").innerText = `"${p.posterIdea.headline}"`;
  document.getElementById("poster-slogan").innerText = `"${p.posterIdea.slogan}"`;
  document.getElementById("poster-typography").innerText = p.posterIdea.typographyStyle;
  document.getElementById("poster-theme").innerText = p.posterIdea.visualTheme;
  document.getElementById("poster-layout").innerText = p.posterIdea.layoutSuggestion;
  
  const posterColorsContainer = document.getElementById("poster-colors");
  posterColorsContainer.innerHTML = "";
  p.posterIdea.suggestedColors.forEach(code => {
    const span = document.createElement("div");
    span.className = "flex items-center gap-2 text-xs font-mono text-[#8E8E93]";
    // Extract HEX if matches
    const hex = (code.match(/#[0-9a-fA-F]{6}/) || ["#FF453A"])[0];
    span.innerHTML = `
      <span class="w-4 h-4 rounded-md border border-white/20 inline-block shrink-0" style="background-color: ${hex}"></span>
      <span class="text-white font-medium">${code}</span>
    `;
    posterColorsContainer.appendChild(span);
  });

  // Tab 8: Survey templating
  document.getElementById("markdown-content-survey").innerText = p.postEventSummaryTemplate;
}

// Draw Checklist Tasks dependent on filter
function drawChecklist() {
  const container = document.getElementById("checklist-tasks-container");
  container.innerHTML = "";

  const filteredTasks = checklistState.filter(t => currentCategoryFilter === "All" || t.category === currentCategoryFilter);

  if (filteredTasks.length === 0) {
    container.innerHTML = `<div class="p-8 text-center text-xs text-[#6E6E73] font-mono uppercase tracking-wider">No active coordinates found in filter (${currentCategoryFilter})</div>`;
    return;
  }

  filteredTasks.forEach((task, globalIdx) => {
    // Find the actual index in current main checklist array
    const actualIndex = checklistState.findIndex(t => t.item === task.item && t.category === task.category);
    
    const div = document.createElement("div");
    div.className = `flex items-center justify-between p-3.5 rounded-xl border transition-all ${
      task.completed 
        ? "bg-emerald-500/[0.02] border-emerald-500/10 text-[#8E8E93]" 
        : "bg-white/[0.01] border-white/[0.04] text-white hover:border-white/10"
    }`;
    
    div.innerHTML = `
      <div class="flex items-center gap-3 text-left">
        <label class="relative flex items-center cursor-pointer">
          <input type="checkbox" ${task.completed ? "checked" : ""} onchange="toggleTask(${actualIndex})" class="sr-only peer" />
          <div class="w-4.5 h-4.5 bg-[#050506] border border-white/20 rounded-md peer-checked:bg-emerald-500 peer-checked:border-emerald-500 transition-all flex items-center justify-center">
            <svg class="w-3 h-3 text-white scale-0 peer-checked:scale-100 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </label>
        <div>
          <p class="text-xs font-sans leading-relaxed ${task.completed ? "line-through opacity-55" : "font-medium"}">${task.item}</p>
          <div class="flex gap-2 items-center mt-1">
            <span class="text-[8px] font-mono uppercase bg-white/[0.04] text-[#8E8E93] px-1.5 py-0.5 rounded border border-white/[0.05] font-bold">
              ${task.category}
            </span>
            <span class="text-[9px] text-[#6E6E73] font-mono leading-none">Resp: ${task.responsible || "AIS Desk"}</span>
          </div>
        </div>
      </div>
      <button onclick="deleteTask(${actualIndex})" class="text-[#6E6E73] hover:text-[#FF453A] font-mono text-[10px] p-1.5 rounded transition-colors uppercase font-bold cursor-pointer">
        Delete
      </button>
    `;
    container.appendChild(div);
  });

  // Recompute general aggregate totals for dashboard
  recomputeChecklistCalculations();
}

// Change Category Filter
function filterChecklist(cat) {
  currentCategoryFilter = cat;
  
  // Set filter buttons UI state
  document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.className = "filter-btn text-[9px] px-2 py-1 rounded bg-black/40 border border-white/5 text-[#6E6E73] font-mono hover:text-white";
  });
  
  const activeBtn = document.getElementById(`btn-filter-${cat}`);
  if (activeBtn) {
    activeBtn.className = "filter-btn text-[9px] px-2 py-1 rounded bg-[#FF453A] border border-[#FF453A]/20 text-white font-mono font-bold";
  }

  drawChecklist();
}

// Toggle status of a task
function toggleTask(idx) {
  checklistState[idx].completed = !checklistState[idx].completed;
  localStorage.setItem("ais_current_logistics", JSON.stringify(checklistState));
  
  // Rerender checklists & stats
  drawChecklist();
}

// Delete an active checklist task coordinate
function deleteTask(idx) {
  checklistState.splice(idx, 1);
  localStorage.setItem("ais_current_logistics", JSON.stringify(checklistState));
  
  // Rerender checklists & stats
  drawChecklist();
}

// Handle Customized Task Inline Additions
function handleAddTaskSubmit(e) {
  e.preventDefault();
  
  const inputEl = document.getElementById("new-task-item");
  const catEl = document.getElementById("new-task-category");
  
  const item = inputEl.value.trim();
  const category = catEl.value;

  if (!item) return;

  const newTask = {
    item,
    category,
    responsible: "Squad Volunteer",
    completed: false
  };

  checklistState.push(newTask);
  localStorage.setItem("ais_current_logistics", JSON.stringify(checklistState));
  
  // Clear field
  inputEl.value = "";
  
  // Redraw
  drawChecklist();
}

// Aggregate checklist completion percentages across the dashboard
function recomputeChecklistCalculations() {
  const total = checklistState.length;
  const completed = checklistState.filter(t => t.completed).length;
  const pct = total === 0 ? 0 : Math.round((completed / total) * 100);

  // Update Tab 1 statistics widgets
  document.getElementById("sum-completionPct").innerText = pct + "%";
  document.getElementById("sum-progressBar").style.width = pct + "%";
  document.getElementById("sum-taskCounts").innerText = `${completed} / ${total} items completed`;
}

// Social copywriting copy support
function switchSocialSubtab(mode) {
  document.querySelectorAll(".soc-subtab-btn").forEach(btn => {
    btn.className = "soc-subtab-btn text-[10px] font-mono font-bold px-3 py-1 rounded-md text-[#6E6E73] hover:text-white";
  });
  
  document.getElementById(`btn-soc-${mode}`).className = "soc-subtab-btn text-[10px] font-mono font-bold px-3 py-1 rounded-md bg-white/10 text-white";

  document.querySelectorAll(".soc-tab-content").forEach(c => c.classList.add("hidden"));
  document.getElementById(`soc-${mode}`).classList.remove("hidden");
}

// General text clipboard logic with high-feedback indicator states
async function copySocialText(elementId, btnId) {
  const text = document.getElementById(elementId).innerText;
  const button = document.getElementById(btnId);
  const oldHTML = button.innerHTML;

  try {
    await navigator.clipboard.writeText(text);
    button.innerHTML = `
      <svg class="w-3.5 h-3.5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
      <span class="text-emerald-400 font-bold">COPIED TO CLIPBOARD!</span>
    `;
    button.classList.add("border-emerald-500/20", "bg-emerald-500/5");
    
    setTimeout(() => {
      button.innerHTML = oldHTML;
      button.classList.remove("border-emerald-500/20", "bg-emerald-500/5");
    }, 2000);
  } catch (e) {
    console.error("Could not activate clipboard access:", e);
    alert("Clipboard access blocked. Please highlight raw text to copy manually!");
  }
}

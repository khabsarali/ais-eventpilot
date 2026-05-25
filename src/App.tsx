import React, { useState, useEffect, useRef } from "react";
import { 
  Sparkles, 
  Calendar, 
  MapPin, 
  Users, 
  Compass, 
  Clock, 
  CheckSquare, 
  Copy, 
  Check, 
  TrendingUp, 
  Plus, 
  UserCheck, 
  Wallet, 
  ChevronRight, 
  RefreshCw, 
  ArrowRight,
  Info,
  Layers,
  FileText,
  MessageSquare,
  Instagram,
  Linkedin,
  Bookmark,
  ChevronLeft
} from "lucide-react";
import { EventInput, EventPlan, EventPreset, ScheduleItem, LogisticsItem, VolunteerRole, BudgetCategory } from "./types";
import { TypewriterText } from "./components/TypewriterText";

// Dynamic loading process statements to keep users excited during generation
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

const PRESETS: EventPreset[] = [
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
    audience: "Aspiring Tech Freelancers & Faculty",
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

const getDefaultDate = (daysAhead: number = 14) => {
  const d = new Date();
  d.setDate(d.getDate() + daysAhead);
  return d.toISOString().split("T")[0];
};

const INITIAL_PLAN: EventPlan = {
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
  whatsappAnnouncement: `*🚀 UAJK AI SOCIETY PRESENTS: GENERATIVE AI HACKFEST!* 

Ready to build the future of Muzaffarabad's tech landscape? Join us for an immersive tech-mixer on practical LLMs and prompt systems.

📅 *Date:* Every student's key to tomorrow
📍 *Venue:* Main Seminar Hall, UAJK King Abdullah Campus
👥 *For whom:* All CS, SE, IT novices, professionals, and tech dreamers

*What's inside:*
• Hands-on prompt scaling lab sessions on real LLM structures
• High-contrast networking mixer & guest speeches
• Regional tea & samosa session included
• Free participation certification papers for active builders

👉 *Click the portal code link to save your seat before registrations close!*
_Let's code, compile, and conquer together!_`,
  instagramCaption: `💡 Ready to unlock developer-grade AI workflows in Azad Jammu & Kashmir? 

Our annual major tech assembly is officially locked! 🤝 

We are bringing practical LLM engineering labs, multi-agent frameworks, and high-impact project sprints directly to the UAJK King Abdullah Campus.

✨ ZERO prerequisites. Bring your laptops, your curiosity, and get ready to deploy real-world intelligent systems.

📅 Mark your calendars
📍 Seminar Hall, UAJK Campus Muzaffarabad
💥 Space is strictly capped at 120 developers

#UAJK #AISociety #GenerativeAI #Muzaffarabad #KashmirTech #KashmirDevelopers #AIEngineers #StudentDevelopers #PromptEngineering #AILabs`,
  linkedinAnnouncement: `An exciting technical milestone is launching for the tech community in Azad Jammu & Kashmir! 

The UAJK Artificial Intelligence Society is hosting the annual 'Generative AI Hackfest' at the Main Seminar Hall, King Abdullah Campus. 

This technical event is specially curated to equip Computer Science, Software Engineering, and IT students with actionable competency in Large Language Models (LLMs), structural prompt design, and autonomous agent loops. Beyond theoretical concepts, participants will engage in hands-on building sprints designed to prepare them for global freelance or corporate AI horizons.

A heartfelt thank you to our university faculty leads, student organizers, and regional mentors for making this tech-mixer possible. 

We look forward to seeing the innovative projects our students construct!

#ArtificialIntelligence #TechOrchestration #GenerativeAI #KashmirTech #UAJK #SoftwareEngineering #FutureOfWork`,
  volunteers: [
    {
      role: "Technical Desk Section",
      tasks: [
        "Align HDMI displays, audio channels, and setup dual-screen presenter consoles.",
        "Ensure server wireless links are active and distribute offline code structures."
      ],
      count: 4
    },
    {
      role: "Creative Media Crew",
      tasks: [
        "Capture professional high-resolution pictures of keynotes and participant teams.",
        "Record native vertical reels for instant publishing to high-engagement handles."
      ],
      count: 3
    },
    {
      role: "Logistics Support Unit",
      tasks: [
        "Coordinate physical shield deliveries and seat allocation layout.",
        "Oversee hot cafeteria tea supply and snack distributions during intervals."
      ],
      count: 4
    }
  ],
  budget: [
    {
      category: "Marketing & Prints",
      items: ["Wooden Backdrop Frame Standee", "High-Resolution Vinyl Custom Poster Design", "80 Certificates Print"],
      estimatedCost: "PKR 12,500"
    },
    {
      category: "Catering Refreshments",
      items: ["Cardamom Traditional Tea", "Crisp Local Samosas", "Premium Shortbread Biscuits"],
      estimatedCost: "PKR 25,000"
    },
    {
      category: "Recognition & Awesomeness",
      items: ["6 Heavy Walnut Appreciation Awards", "Lamination & Stationery Roster Codes"],
      estimatedCost: "PKR 8,500"
    },
    {
      category: "Alternative Fuel Shield",
      items: ["Auxiliary Petrol fuel limits for seminar generator protection"],
      estimatedCost: "PKR 4,000"
    }
  ],
  postEventSummaryTemplate: `### UAJK ARTIFICIAL INTELLIGENCE SOCIETY - POST EVENT REPORT

**Event Name:** Generative AI Hackfest
**Date of Execution:** 2026-06-08 (Simulated target)
**Venue Mapped:** Main Seminar Hall, UAJK King Abdullah Campus

#### 1. Attendance & Participation
- **Total Valid Registrations:** 142 students
- **Actual On-Seat Attendee Count:** 118 students (83% seat velocity)
- **Faculty Anchors Spotted:** 4 Department Representatives

#### 2. Milestone Deliverables Achieved
- [x] All participants completed the Practical LLMs prompt handbook setup.
- [x] Top 3 innovative solutions were recognized with university shield titles.
- [x] Standard local feedback surveys recorded a 94% positive rating sheet.

#### 3. Budget Balancing Audit
- **Predicted Cost Allocation:** PKR 50,000
- **Actual Expended Total:** PKR 48,200
- **Remaining Treasurer Reserve:** PKR 1,800
`,
  posterIdea: {
    headline: "DECODE INTELLIGENCE",
    suggestedColors: ["Deep Amber Onyx (#F5A623)", "High-Contrast Red (#FF453A)", "Pure Titanium (#FFFFFF)"],
    visualTheme: "A high-fidelity minimalist layout with custom ambient neon nodes connecting Muzaffarabad's typography routes.",
    typographyStyle: "Bold sans-serif display headers paired with JetBrains Mono tracking for secondary text lines.",
    layoutSuggestion: "Centered high-contrast emblem at the upper third, key titles set in huge 72pt, dates centered beneath inside a subtle border.",
    slogan: "Building intelligent agents on Kashmir's tech horizons."
  }
};

export default function App() {
  // Input State
  const [inputs, setInputs] = useState<EventInput>({
    eventName: "Generative AI Hackfest",
    eventDate: getDefaultDate(14),
    venue: "Main Seminar Hall, UAJK King Abdullah Campus",
    audience: "CS, SE, and IT Students of Azad Jammu & Kashmir",
    theme: "Practical LLMs, Prompt Engineering, and Agentic workflows with regional industry leaders"
  });

  // Flow State
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingStep, setLoadingStep] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [plan, setPlan] = useState<EventPlan | null>(INITIAL_PLAN);

  // UX Interface States
  const [activeTab, setActiveTab] = useState<string>("overview"); // overview, schedule, logistics, social, volunteers, budget & post
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [socialSubTab, setSocialSubTab] = useState<"whatsapp" | "instagram" | "linkedin">("whatsapp");

  // Local additions to generated data
  const [customLogisticsItem, setCustomLogisticsItem] = useState<string>("");
  const [customLogisticsCategory, setCustomLogisticsCategory] = useState<string>("Stage");
  
  // Sandbox preview tab state
  const [sandboxTab, setSandboxTab] = useState<"timeline" | "finance" | "squads">("timeline");
  
  // Quick notice tracker
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Tab container ref and smooth auto-alignment hooks
  const tabContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (tabContainerRef.current) {
      const activeEl = tabContainerRef.current.querySelector('[data-active="true"]');
      if (activeEl) {
        activeEl.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center"
        });
      }
    }
  }, [activeTab]);

  const slideTabs = (direction: "left" | "right") => {
    if (tabContainerRef.current) {
      const scrollAmount = 260; // scroll by comfortable visual step
      tabContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      });
    }
  };

  // Trigger quick toast
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Preset Applier
  const applyPreset = (preset: EventPreset) => {
    // Generate calculated date
    const d = new Date();
    d.setDate(d.getDate() + preset.daysAhead);
    const dateString = d.toISOString().split("T")[0]; // YYYY-MM-DD

    setInputs({
      eventName: preset.eventName,
      eventDate: dateString,
      venue: preset.venue,
      audience: preset.audience,
      theme: preset.theme
    });
    triggerToast(`Applied preset: ${preset.name}`);
  };

  // Loading Cycle simulator
  useEffect(() => {
    let t: NodeJS.Timeout;
    if (loading) {
      let stepIndex = 0;
      setLoadingStep(LOADING_STEPS[0]);
      t = setInterval(() => {
        stepIndex = (stepIndex + 1) % LOADING_STEPS.length;
        setLoadingStep(LOADING_STEPS[stepIndex]);
      }, 2400);
    }
    return () => clearInterval(t);
  }, [loading]);

  // Request Event Pilot planner from server backend
  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputs.eventName.trim()) return setError("Please enter an event name.");
    if (!inputs.eventDate.trim()) return setError("Please select a date.");
    if (!inputs.venue.trim()) return setError("Please define a venue.");
    if (!inputs.audience.trim()) return setError("Please specify target audience.");
    if (!inputs.theme.trim()) return setError("Please supply a theme or focus area.");

    setLoading(true);
    setError(null);
    setPlan(null);

    try {
      const response = await fetch("/api/generate-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inputs)
      });

      if (!response.ok) {
        const errJson = await response.json().catch(() => ({}));
        throw new Error(errJson.error || "The AI model encountered an error drafting your planning campaign.");
      }

      const responseData: EventPlan = await response.json();
      
      // Initialize completed key on logistics for tracking checked tasks in browser UI
      if (responseData.logistics) {
        responseData.logistics = responseData.logistics.map(item => ({...item, completed: false}));
      }

      setPlan(responseData);
      // Automatically navigate to Overview on success
      setActiveTab("overview");
      triggerToast("Event plan generated successfully!");
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to communicate with local event engine.");
    } finally {
      setLoading(false);
    }
  };

  // Toggle checklist items locally
  const toggleLogisticCompletion = (index: number) => {
    if (!plan) return;
    const updatedLogistics = [...plan.logistics];
    updatedLogistics[index].completed = !updatedLogistics[index].completed;
    setPlan({
      ...plan,
      logistics: updatedLogistics
    });
    triggerToast(`Task marked as ${updatedLogistics[index].completed ? "completed" : "pending"}`);
  };

  // Add custom manual logistic checklist items
  const addCustomLogistic = (e: React.FormEvent) => {
    e.preventDefault();
    if (!plan || !customLogisticsItem.trim()) return;

    const newItem: LogisticsItem = {
      item: customLogisticsItem.trim(),
      category: customLogisticsCategory,
      responsible: "Events Team Coordinator",
      completed: false
    };

    setPlan({
      ...plan,
      logistics: [...plan.logistics, newItem]
    });
    setCustomLogisticsItem("");
    triggerToast("Added logistics task!");
  };

  // Helper tool to copy textual media copies nicely to clipboard
  const copyText = (txt: string, key: string) => {
    navigator.clipboard.writeText(txt);
    setCopiedKey(key);
    triggerToast("Copied to clipboard!");
    setTimeout(() => {
      setCopiedKey(null);
    }, 2000);
  };

  // Pre-calculate aggregate metrics for Overview
  const totalTasks = plan?.logistics.length || 0;
  const completedTasks = plan?.logistics.filter(t => t.completed).length || 0;
  const taskProgressPercent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Format date helper for human reading
  const formatReadableDate = (dateStr: string) => {
    if (!dateStr) return "";
    try {
      const option: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateStr).toLocaleDateString("en-US", option);
    } catch (err) {
      return dateStr;
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#b3b3b3] font-sans relative selection:bg-brand-red/20 selection:text-white pb-12 antialiased">
      
      {/* Dynamic Soft Backglow (With extreme restraint - no intense gaming colors) */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-brand-red/2 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[500px] h-[500px] bg-white/1 rounded-full blur-[120px] pointer-events-none" />

      {/* Floating Interactive Micro-Toast (Premium modern Apple pill) */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 bg-neutral-900/90 border border-white/10 text-white text-xs px-4 py-3 rounded-[16px] shadow-2xl backdrop-blur-xl animate-fade-in">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF453A]" />
          <span className="font-medium tracking-wide">{toastMessage}</span>
        </div>
      )}

      {/* Premium Sleek Header */}
      <header className="border-b border-white/[0.08] bg-[#050505]/60 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-neutral-900 border border-white/10 rounded-xl flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xs sm:text-sm font-bold tracking-tight text-white uppercase font-mono">AIS EventPilot</h1>
                <span className="text-[8px] sm:text-[9px] bg-white/5 text-[#B3B3B3] border border-white/10 font-bold px-1.5 py-0.5 rounded-full shrink-0">v1.2</span>
              </div>
              <p className="text-[10px] text-[#6E6E73] font-mono uppercase tracking-wider hidden sm:block">UAJK Artificial Intelligence Society</p>
              <p className="text-[9px] text-[#FF453A] font-mono uppercase tracking-wider sm:hidden">UAJK AIS</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 bg-white/[0.02] px-3 py-1.5 rounded-full border border-white/[0.06] text-[10px] text-[#6E6E73]">
              <span className="w-1.5 h-1.5 bg-[#FF453A] rounded-full animate-pulse" />
              <span>ACTIVE SESSION SECURED</span>
            </div>
            <a 
              href="#generate-panel"
              className="px-3 sm:px-4 py-1.5 sm:py-2 bg-white text-black hover:bg-neutral-200 rounded-[12px] sm:rounded-[14px] text-[11px] sm:text-xs font-semibold tracking-wide transition-all duration-200 shadow-md font-mono"
            >
              NEW CAMPAIGN
            </a>
          </div>
        </div>
      </header>

      {/* Apple-Style Title Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-10 sm:mt-16 mb-8 sm:mb-12 text-center relative overflow-hidden animate-fade-in">
        
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/[0.02] border border-white/[0.08] rounded-full text-[10px] sm:text-[11px] text-[#B3B3B3] font-mono uppercase tracking-widest mb-4 sm:mb-6">
          <Sparkles className="w-3 h-3 text-[#FF453A]" />
          <span>Intelligent Event Orchestrator</span>
        </div>

        <h1 className="text-clamp-hero font-extrabold tracking-tight text-white max-w-4xl mx-auto mb-4 sm:mb-6 font-display">
          Design High-Impact Events with{" "}
          <span className="bg-gradient-to-b from-white to-[#6E6E73] bg-clip-text text-transparent">
            AIS EventPilot
          </span>
        </h1>

        <p className="text-[#6E6E73] max-w-2xl mx-auto leading-relaxed mb-6 sm:mb-10 text-xs sm:text-sm md:text-base">
          The quiet-luxury planning co-pilot engineered for Azad Jammu &amp; Kashmir&apos;s premier technical society. Instantly compose timed agendas, volunteer assignments, localized PKR balance grids, and social blueprints.
        </p>

        {/* Systems Metric Telemetries - Redesigned to be extremely premium, adaptive, and subtle */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 max-w-3xl mx-auto bg-white/[0.02] border border-white/[0.06] rounded-[24px] p-4 sm:p-5 backdrop-blur-md text-left">
          <div className="py-1 px-2">
            <div className="text-[8px] sm:text-[9px] text-[#6E6E73] font-mono uppercase tracking-widest mb-1">Compute Core</div>
            <div className="text-[11px] sm:text-xs font-bold text-white flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Gemini 3.5 Flash
            </div>
          </div>
          <div className="py-1 px-2 border-l border-white/[0.06]">
            <div className="text-[8px] sm:text-[9px] text-[#6E6E73] font-mono uppercase tracking-widest mb-1">Processing</div>
            <div className="text-[11px] sm:text-xs font-bold text-white font-mono">Real-Time Sync</div>
          </div>
          <div className="py-1 px-2 border-t md:border-t-0 md:border-l border-white/[0.06] col-span-1">
            <div className="text-[8px] sm:text-[9px] text-[#6E6E73] font-mono uppercase tracking-widest mb-1">Localization Focus</div>
            <div className="text-[11px] sm:text-xs font-semibold text-[#FF453A] font-mono">PKR / UAJK MUZ</div>
          </div>
          <div className="py-1 px-2 border-t md:border-t-0 md:border-l border-white/[0.06] col-span-1">
            <div className="text-[8px] sm:text-[9px] text-[#6E6E73] font-mono uppercase tracking-widest mb-1">SOCIETY STATUS</div>
            <div className="text-[11px] sm:text-xs font-bold text-white font-sans truncate">UAJK AIS Approved</div>
          </div>
        </div>
      </div>

      {/* Core Layout Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side: Setup Panel & Inputs (lg:col-span-4) */}
        <div className="lg:col-span-4 space-y-6" id="generate-panel">
          
          {/* Quick-Preset Launcher */}
          <div className="glass-panel p-4 sm:p-6 md:p-8">
            <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase text-[#FF453A] tracking-widest mb-4 font-mono">
              <Bookmark className="w-3.5 h-3.5" />
              <span>AIS Event Templates</span>
            </div>
            <p className="text-xs text-[#6E6E73] mb-6 leading-relaxed">
              Select an AIS event configuration preset to auto-populate the engine instantly.
            </p>
            
            <div className="space-y-3">
              {PRESETS.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => applyPreset(p)}
                  className="w-full text-left p-4 rounded-[16px] bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.06] hover:border-white/[0.12] transition-all duration-200 group flex justify-between items-center animate-fade-in cursor-pointer"
                  type="button"
                >
                  <div className="space-y-1 pr-2">
                    <div className="text-xs font-bold text-white transition-colors">
                      {p.name}
                    </div>
                    <div className="text-[10px] text-[#6E6E73] line-clamp-1">
                      {p.venue}
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[#6E6E73] group-hover:text-white group-hover:translate-x-0.5 transition-all shrink-0" />
                </button>
              ))}
            </div>
          </div>          {/* Core Event Inputs Form */}
          <div className="glass-panel p-4 sm:p-6 md:p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#FF453A]/[0.02] rounded-full blur-2xl pointer-events-none" />
            
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-sm font-bold text-white uppercase tracking-wider font-mono">Event Blueprint</h2>
                <p className="text-xs text-[#6E6E73] mt-0.5">Specify core parameters for the AI model.</p>
              </div>
              <Compass className="w-4 h-4 text-[#FF453A]" />
            </div>

            <form onSubmit={handleGenerate} className="space-y-5">
              {/* Event Name */}
              <div>
                <label className="text-[9px] uppercase tracking-widest text-[#6E6E73] block font-bold mb-2 font-mono">
                  Event Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., AI Summit Azad Kashmir"
                  value={inputs.eventName}
                  onChange={(e) => setInputs({ ...inputs, eventName: e.target.value })}
                  className="w-full bg-[#0d0d0f]/60 text-white border border-white/[0.08] rounded-[14px] px-4 py-3 text-xs focus:border-[#FF453A]/40 focus:outline-none placeholder:text-[#6E6E73] font-medium transition-all"
                />
              </div>

              {/* Grid: Event Date and Venue */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[9px] uppercase tracking-widest text-[#6E6E73] block font-bold mb-2 font-mono">
                     Event Date
                  </label>
                  <input
                    type="date"
                    required
                    value={inputs.eventDate}
                    onChange={(e) => setInputs({ ...inputs, eventDate: e.target.value })}
                    className="w-full bg-[#0d0d0f]/60 text-white border border-white/[0.08] rounded-[14px] px-4 py-3 text-xs focus:border-[#FF453A]/30 focus:outline-none font-medium transition-all"
                  />
                </div>
                <div>
                  <label className="text-[9px] uppercase tracking-widest text-[#6E6E73] block font-bold mb-2 font-mono">
                    Venue
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Seminar Hall, UAJK"
                    value={inputs.venue}
                    onChange={(e) => setInputs({ ...inputs, venue: e.target.value })}
                    className="w-full bg-[#0d0d0f]/60 text-white border border-white/[0.08] rounded-[14px] px-4 py-3 text-xs focus:border-[#FF453A]/30 focus:outline-none placeholder:text-[#6E6E73] font-medium transition-all"
                  />
                </div>
              </div>

              {/* Target Audience */}
              <div>
                <label className="text-[9px] uppercase tracking-widest text-[#6E6E73] block font-bold mb-2 font-mono">
                  Audience Group
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Tech and CS faculty, local developers"
                  value={inputs.audience}
                  onChange={(e) => setInputs({ ...inputs, audience: e.target.value })}
                  className="w-full bg-[#0d0d0f]/60 text-white border border-white/[0.08] rounded-[14px] px-4 py-3 text-xs focus:border-[#FF453A]/30 focus:outline-none placeholder:text-[#6E6E73] font-medium transition-all"
                />
              </div>

              {/* Theme Focus Description */}
              <div>
                <label className="text-[9px] uppercase tracking-widest text-[#6E6E73] block font-bold mb-2 font-mono">
                  Theme / Focus Area
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="e.g., Practical LLM engineering workflows, prompt scaling, cloud startup pitch"
                  value={inputs.theme}
                  onChange={(e) => setInputs({ ...inputs, theme: e.target.value })}
                  className="w-full bg-[#0d0d0f]/60 text-white border border-white/[0.08] rounded-[14px] px-4 py-3 text-xs focus:border-[#FF453A]/30 focus:outline-none placeholder:text-[#6E6E73] font-medium transition-all resize-none"
                />
              </div>

              {/* Prompt Instruction reminder */}
              <div className="bg-white/[0.02] border border-white/[0.06] rounded-[16px] p-4 flex gap-3">
                <Info className="w-4 h-4 text-[#6E6E73] shrink-0 mt-0.5" />
                <p className="text-[11px] text-[#6E6E73] leading-relaxed">
                  Generated variables contain regional context of Muzaffarabad / Azad Kashmir budget ratios, and specialized computer science team squads.
                </p>
              </div>

              {/* Submit Trigger Action Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full btn-premium-red text-white py-3.5 px-6 font-bold text-xs tracking-wider transition-all duration-200 flex items-center justify-center gap-2 mt-4 disabled:opacity-45 cursor-pointer text-center"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-white" />
                    <span className="font-mono text-center">COMPOSED BLUEPRINT PROGRESSING...</span>
                  </>
                ) : (
                  <>
                    <span className="font-mono text-center">RECRUIT CAMPAIGN ENGINE</span>
                    <Sparkles className="w-4 h-4 text-white" />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Regional Information Card */}
          <div className="p-4 bg-white/[0.01] border border-white/[0.06] rounded-[16px] text-center">
            <p className="text-[10px] text-[#6E6E73] italic uppercase font-mono tracking-widest">
              UAJK Artificial Intelligence Society • Muzaffarabad
            </p>
          </div>

        </div>        {/* Right Side: Display Dashboard Content (lg:col-span-8) */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Error Message alert */}
          {error && (
            <div className="p-4 bg-neutral-900 border border-white/10 rounded-[14px] text-[#FF453A] text-xs flex gap-3 animate-fade-in items-center">
              <span className="font-bold uppercase bg-[#FF453A]/10 text-[#FF453A] px-2 py-0.5 rounded-full text-[9px] font-mono border border-[#FF453A]/20">Error</span>
              <p className="font-medium">{error}</p>
            </div>
          )}

          {/* Real loading sequence view with interactive logs */}
          {loading && (
            <div className="glass-panel p-5 sm:p-10 text-center relative overflow-hidden flex flex-col items-center justify-center min-h-[420px] sm:min-h-[480px]">
              <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.01] via-transparent to-white/[0.01] pointer-events-none" />
              <div className="w-16 h-16 relative flex items-center justify-center mb-8">
                <div className="absolute inset-0 border-2 border-white/5 rounded-full" />
                <div className="absolute inset-0 border-2 border-[#FF453A] border-t-transparent rounded-full animate-spin" />
                <Sparkles className="w-5 h-5 text-[#FF453A] animate-pulse" />
              </div>
              
              <h3 className="text-base font-bold text-white uppercase tracking-wider font-mono mb-2">Assembling UAJK Campaign Draft</h3>
              <p className="text-[11px] text-white font-mono tracking-wider max-w-sm bg-white/[0.03] border border-white/[0.08] px-4 py-2 rounded-full mb-4">
                {loadingStep || "Initializing Gemini Engine..."}
              </p>
              
              <p className="text-xs text-[#6E6E73] max-w-md leading-relaxed">
                Preparing calibrated timelines, Muzaffarabad venue checklist validations, custom student committees, and copy schedules.
              </p>

              {/* Simulated terminal lines */}
              <div className="mt-8 font-mono text-[10px] text-[#6E6E73] text-left w-full max-w-lg space-y-2 bg-black/60 p-4 rounded-[14px] border border-white/[0.06]">
                <div className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-white/40 rounded-full" /><span>Calling Generative API model &apos;gemini-3.5-flash&apos;...</span></div>
                <div className="flex items-center gap-2 text-white/40"><span className="w-1.5 h-1.5 bg-[#FF453A] rounded-full animate-ping" /><span>Client verification complete. Injecting parameters...</span></div>
                <div className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-white/40 rounded-full" /><span>Applying PKR capital scaling models for Muzaffarabad...</span></div>
              </div>
            </div>
          )}

          {/* Idle / Welcome state */}
          {!loading && !plan && (
            <div className="space-y-8 animate-fade-in text-left">
              
              {/* Main Landing Welcome Callout */}
              <div className="glass-panel p-5 sm:p-10 relative overflow-hidden flex flex-col items-center justify-center text-center">
                <div className="absolute top-0 right-0 w-80 h-80 bg-white/[0.01] rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#FF453A]/[0.01] rounded-full blur-3xl pointer-events-none" />
                
                <div className="w-12 h-12 bg-neutral-900 border border-white/10 rounded-xl flex items-center justify-center text-white/45 mb-6 relative group">
                  <Compass className="w-5 h-5 text-[#FF453A] group-hover:rotate-45 transition-transform duration-500 hover:cursor-pointer" />
                  <div className="absolute inset-0 border border-white/5 rounded-xl animate-spin" style={{ animationDuration: '8s' }} />
                </div>

                <h2 className="text-sm font-bold text-white uppercase tracking-wider font-mono mb-3">
                  AIS EVENTPILOT PLATFORM
                </h2>
                
                <p className="text-xs sm:text-sm text-[#6E6E73] max-w-lg leading-relaxed mb-8">
                  The central interface for the UAJK Artificial Intelligence Society. Command the system to engineer optimized schedules, localized expense matrices, volunteer delegations, and full copywriting suites instantly.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 w-full max-w-3xl text-left">
                  <div className="p-4 sm:p-5 bg-white/[0.01] hover:bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.12] rounded-[18px] transition-all">
                    <div className="text-xs font-bold text-white mb-2 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[#FF453A]" />
                      Timeline
                    </div>
                    <p className="text-[11px] text-[#6E6E73] leading-relaxed">
                      Detailed hourly schedules calibrated programmatically from guest reception to keynotes.
                    </p>
                  </div>
                  <div className="p-4 sm:p-5 bg-white/[0.01] hover:bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.12] rounded-[18px] transition-all">
                    <div className="text-xs font-bold text-white mb-2 flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-[#FF453A]" />
                      Copywriter Suite
                    </div>
                    <p className="text-[11px] text-[#6E6E73] leading-relaxed">
                      Copywriter-grade copies tailored for WhatsApp student channels and executive lists.
                    </p>
                  </div>
                  <div className="p-4 sm:p-5 bg-white/[0.01] hover:bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.12] rounded-[18px] transition-all">
                    <div className="text-xs font-bold text-white mb-2 flex items-center gap-2">
                      <UserCheck className="w-4 h-4 text-[#FF453A]" />
                      Squad Logistics
                    </div>
                    <p className="text-[11px] text-[#6E6E73] leading-relaxed">
                      Surgical delegation of responsibilities across specialized Technical, Media, and Logistics squads.
                    </p>
                  </div>
                </div>

                <div className="mt-8 flex items-center gap-2.5 text-[9px] text-[#6E6E73] font-mono tracking-widest bg-neutral-900 border border-white/5 px-4 py-2 rounded-full">
                  <span>CHOOSE EVENT PRESIDENCY CODES OR DEFINE SYSTEM INPUTS LEFT</span>
                  <ArrowRight className="w-3 h-3 text-[#FF453A]" />
                </div>
              </div>              {/* SECTION: 100% Interactive Simulation Sandbox Preview */}
              <div className="glass-panel p-4 sm:p-6 md:p-8 relative overflow-hidden space-y-6">
                <div className="absolute top-0 left-0 w-48 h-48 bg-white/[0.01] rounded-full blur-3xl pointer-events-none" />
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.06] pb-5">
                  <div>
                    <h3 className="text-xs font-bold text-white uppercase tracking-widest font-mono flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-[#FF453A]" />
                      Interactive Live Campaign Sandbox
                    </h3>
                    <p className="text-xs text-[#6E6E73] mt-0.5">
                      Toggle controls beneath to instantly pre-visualize custom UAJK AIS schedules.
                    </p>
                  </div>
                  
                  {/* Interactive Tab controllers (Premium Apple pill style) */}
                  <div className="flex flex-wrap sm:flex-nowrap bg-neutral-900 border border-white/5 p-1 rounded-full gap-1">
                    {(["timeline", "finance", "squads"] as const).map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setSandboxTab(tab)}
                        className={`px-4 py-1.5 rounded-full text-[10px] font-mono tracking-wider uppercase font-bold transition-all cursor-pointer ${
                          sandboxTab === tab
                            ? "bg-white text-black shadow-inner"
                            : "text-[#6E6E73] hover:text-white"
                        }`}
                        type="button"
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sandbox Canvas view dependent on tab state */}
                <div className="bg-[#0c0c0e] border border-white/[0.06] rounded-[18px] p-4 sm:p-6 min-h-[220px] transition-all relative">
                  
                  {/* Visual Art Decorators */}
                  <div className="absolute top-3 right-4 text-[8px] font-mono text-[#6E6E73] select-none uppercase tracking-widest">
                    Telemetry Live Feed
                  </div>

                  {sandboxTab === "timeline" && (
                    <div className="space-y-4 animate-fade-in">
                      <div className="text-[9px] font-mono text-white uppercase tracking-widest font-semibold">
                        Sample Hourly Roadmap Plan
                      </div>
                      
                      <div className="relative pl-5 border-l border-white/10 space-y-4 py-1">
                        <div className="relative">
                          <span className="absolute -left-[24.5px] top-1.5 w-2.5 h-2.5 rounded-full bg-white border-2 border-black" />
                          <div className="text-[10px] font-mono text-[#6E6E73]">09:30 AM — 10:00 AM</div>
                          <div className="text-xs font-bold text-white">Delegates Guest Reception & Seating Allocation</div>
                          <p className="text-[11px] text-[#6E6E73] mt-0.5">Volunteers verify registrations and hand over printed tech sheets at the entrance desk.</p>
                        </div>
                        <div className="relative">
                          <span className="absolute -left-[24.5px] top-1.5 w-2.5 h-2.5 rounded-full bg-[#FF453A] border-2 border-black" />
                          <div className="text-[10px] font-mono text-[#6E6E73]">10:00 AM — 10:15 AM</div>
                          <div className="text-xs font-bold text-white">Recitation of Holy Quran & National Emblem Showcase</div>
                          <p className="text-[11px] text-[#6E6E73] mt-0.5">Anchored by Student Secretariat leads with high-contrast LED backdrops.</p>
                        </div>
                        <div className="relative">
                          <span className="absolute -left-[24.5px] top-1.5 w-2.5 h-2.5 rounded-full bg-white border-2 border-black" />
                          <div className="text-[10px] font-mono text-[#6E6E73]">10:15 AM — 11:30 AM</div>
                          <div className="text-xs font-bold text-white">Interactive Large Language Model Hack-Lab</div>
                          <p className="text-[11px] text-[#6E6E73] mt-0.5">Hands-on prompt configuration and system building on student laptops using free cloud credits.</p>
                        </div>
                        <div className="relative">
                          <span className="absolute -left-[24.5px] top-1.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-black" />
                          <div className="text-[10px] font-mono text-[#6E6E73]">11:30 AM — 12:00 PM</div>
                          <div className="text-xs font-bold text-white">Souvenir Award Presentations & Regional Samosa Networking</div>
                          <p className="text-[11px] text-[#6E6E73] mt-0.5">Handing shields to guest instructors and student organizers, followed by tea mixers in the corridor.</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {sandboxTab === "finance" && (
                    <div className="space-y-4 animate-fade-in">
                      <div className="text-[9px] font-mono text-white uppercase tracking-widest font-semibold">
                        PKR Calibrated Expense Estimates
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="p-4 bg-white/[0.01] border border-white/[0.04] rounded-[16px] space-y-1">
                          <div className="flex justify-between items-center bg-transparent">
                            <span className="text-xs font-bold text-white">Backdrop &amp; Print Stands</span>
                            <span className="text-[11px] font-mono text-[#FF453A] font-bold">PKR 9,500</span>
                          </div>
                          <p className="text-[10.5px] text-[#6E6E73] leading-normal font-mono">
                            Includes 12x8 flex banner sheet design + wooden staging framework + local digital photo press prints.
                          </p>
                        </div>

                        <div className="p-4 bg-white/[0.01] border border-white/[0.04] rounded-[16px] space-y-1">
                          <div className="flex justify-between items-center bg-transparent">
                            <span className="text-xs font-bold text-white">Traditional Tea Refreshment</span>
                            <span className="text-[11px] font-mono text-[#FF453A] font-bold">PKR 25,000</span>
                          </div>
                          <p className="text-[10.5px] text-[#6E6E73] leading-normal font-mono">
                            Hot card cardamom tea, crisp local bakeries samosas, premium biscuits for 120 CS enrolees and 6 university mentors.
                          </p>
                        </div>

                        <div className="p-4 bg-white/[0.01] border border-white/[0.04] rounded-[16px] space-y-1">
                          <div className="flex justify-between items-center bg-transparent">
                            <span className="text-xs font-bold text-white">Awards &amp; Shield Logistics</span>
                            <span className="text-[11px] font-mono text-[#FF453A] font-bold">PKR 7,500</span>
                          </div>
                          <p className="text-[10.5px] text-[#6E6E73] leading-normal font-mono">
                            6 heavy custom-engraved wooden recognition awards for guests + 80 gold foil printed course completion papers.
                          </p>
                        </div>

                        <div className="p-4 bg-white/[0.01] border border-white/[0.04] rounded-[16px] space-y-1">
                          <div className="flex justify-between items-center bg-transparent">
                            <span className="text-xs font-bold text-white">Auxiliary Power Grid Backup</span>
                            <span className="text-[11px] font-mono text-[#FF453A] font-bold">PKR 4,000</span>
                          </div>
                          <p className="text-[10.5px] text-[#6E6E73] leading-normal font-mono">
                            Local petrol backup reserves to operate critical stage computer systems in case of city load shedding loops.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {sandboxTab === "squads" && (
                    <div className="space-y-4 animate-fade-in">
                      <div className="text-[9px] font-mono text-white uppercase tracking-widest font-semibold">
                        Specialized Volunteer Squad Structures
                      </div>

                      <div className="space-y-3">
                        <div className="p-4 bg-white/[0.01] border border-white/[0.04] rounded-[16px]">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-xs font-bold text-white flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                              Technical Desk Section (4 Organizers)
                            </span>
                            <span className="text-[10px] font-mono text-[#6E6E73]">Main Lab &amp; A/V</span>
                          </div>
                          <ul className="text-[10.5px] text-[#6E6E73] list-disc list-inside space-y-0.5">
                            <li>Setup hdmi links, projection screens &amp; test audio channels.</li>
                            <li>Ensure server connectivity &amp; distribute offline code packets.</li>
                            <li>Keep backup slides ready on local storage drives.</li>
                          </ul>
                        </div>

                        <div className="p-4 bg-white/[0.01] border border-white/[0.04] rounded-[16px]">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-xs font-bold text-white flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                              Creative Media Crew (3 Organizers)
                            </span>
                            <span className="text-[10px] font-mono text-[#6E6E73]">Photography &amp; Reels</span>
                          </div>
                          <ul className="text-[10.5px] text-[#6E6E73] list-disc list-inside space-y-0.5">
                            <li>Snap professional high-res pictures of key speakers.</li>
                            <li>Record energetic portrait transition reels for social handles.</li>
                            <li>Publish immediate real-time updates to community WhatsApp circles.</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}

                </div>
              </div>

              {/* SECTION: Regional Context Bento Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                
                <div className="glass-panel p-4 sm:p-6 hover:border-white/10 transition-all space-y-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <CheckSquare className="w-4 h-4 shadow-sm" />
                  </div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Load Shedding Grid-Shield</h4>
                  <p className="text-xs text-[#6E6E73] leading-relaxed">
                    Local Muzaffarabad events require power backup security. Our logical checklist auto-includes petrol backups, DSLRs recharge plans, and Wi-fi hotspots tasks.
                  </p>
                </div>

                <div className="glass-panel p-4 sm:p-6 hover:border-white/10 transition-all space-y-3">
                  <div className="w-8 h-8 rounded-lg bg-neutral-900 border border-white/10 flex items-center justify-center text-[#FF453A]">
                    <Wallet className="w-4 h-4 shadow-sm" />
                  </div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">PKR Regional Pricing Metrics</h4>
                  <p className="text-xs text-[#6E6E73] leading-relaxed">
                    Say goodbye to irrelevant Dollar estimates. Every budget item is calibrated to Pakistani university scale bounds to get fast approvals from academic authorities.
                  </p>
                </div>

                <div className="glass-panel p-4 sm:p-6 hover:border-white/10 transition-all space-y-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                    <MessageSquare className="w-4 h-4 shadow-sm" />
                  </div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Viral Social Blast Layouts</h4>
                  <p className="text-xs text-[#6E6E73] leading-relaxed">
                    Custom text kits optimized directly for high-volume WhatsApp group broadcasts, professional LinkedIn outreach, and energetic Instagram Reels hooks.
                  </p>
                </div>

                <div className="glass-panel p-4 sm:p-6 hover:border-white/10 transition-all space-y-3">
                  <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                    <FileText className="w-4 h-4 shadow-sm" />
                  </div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Ready-to-Print Auditing</h4>
                  <p className="text-xs text-[#6E6E73] leading-relaxed">
                    At completion, export structured feedback templates and operational templates. Streamlines records handover for future UAJK committees.
                  </p>
                </div>

              </div>
              
              {/* SECTION: Accomplishments & UAJK AIS Chapter Metric Telemetry */}
              <div className="border border-white/5 bg-white/[0.01] rounded-3xl p-4 sm:p-6">
                <div className="text-center space-y-1 mb-5">
                  <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest block font-bold">UAJK Chapter Performance</span>
                  <p className="text-xs text-[#e1e2ec]">Delivering world-class tech standards in Azad Jammu & Kashmir</p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                  <div className="p-3 rounded-2xl bg-black/40 border border-white/5">
                    <div className="text-lg sm:text-2xl font-black text-white font-display">1,500+</div>
                    <div className="text-[9px] font-mono text-[#a0aec0] uppercase mt-0.5">Students Engaged</div>
                  </div>
                  <div className="p-3 rounded-2xl bg-black/40 border border-white/5">
                    <div className="text-lg sm:text-2xl font-black text-brand-scarlet font-display">12+</div>
                    <div className="text-[9px] font-mono text-[#a0aec0] uppercase mt-0.5">Hackathons Organized</div>
                  </div>
                  <div className="p-3 rounded-2xl bg-black/40 border border-white/5">
                    <div className="text-lg sm:text-2xl font-black text-white font-display">100%</div>
                    <div className="text-[9px] font-mono text-[#a0aec0] uppercase mt-0.5">Timeline Efficiency</div>
                  </div>
                  <div className="p-3 rounded-2xl bg-black/40 border border-white/5">
                    <div className="text-lg sm:text-2xl font-black text-[#e1e2ec] font-display">8+</div>
                    <div className="text-[9px] font-mono text-[#a0aec0] uppercase mt-0.5">Faculty Anchors</div>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* Output Dashboard Plan Display */}
          {plan && !loading && (
            <div className="space-y-8 animate-fade-in">
              
              {/* Event Cover Capsule (Title, theme summary, dates) */}
              <div className="glass-panel p-4 sm:p-6 md:p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/[0.01] rounded-full blur-3xl pointer-events-none" />
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] bg-white/[0.04] text-white border border-white/10 px-2.5 py-1 rounded-full font-mono font-bold tracking-widest uppercase">
                        Active Campaign Plan
                      </span>
                      <span className="text-[9px] bg-[#FF453A]/10 text-[#FF453A] border border-[#FF453A]/20 px-2.5 py-1 rounded-full font-mono font-bold uppercase">
                        UAJK AIS Pilot Version
                      </span>
                    </div>
                    <h2 className="text-xl md:text-2xl font-extrabold text-white tracking-tight leading-tight">
                      {plan.eventName}
                    </h2>
                    
                    <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-2 text-xs text-[#6E6E73]">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4 text-[#FF453A]" />
                        {formatReadableDate(plan.eventDate)}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-4 h-4 text-white" />
                        {plan.venue}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Users className="w-4 h-4 text-white" />
                        {plan.audience}
                      </span>
                    </div>
                  </div>

                  <div className="md:border-l md:border-white/[0.08] md:pl-6 space-y-3 shrink-0 w-full md:w-auto">
                    <button 
                      onClick={() => {
                        const allCopy = `
EVENT: ${plan.eventName}
DATE: ${plan.eventDate}
VENUE: ${plan.venue}
AUDIENCE: ${plan.audience}
THEME: ${plan.theme}

--------------------
SCHEDULE:
${plan.schedule.map(s => `${s.time} - ${s.activity}: ${s.details}`).join("\n")}

--------------------
LOGISTICS CHECKLIST:
${plan.logistics.map(l => `[ ] ${l.item} (${l.category}) - Resp: ${l.responsible}`).join("\n")}

--------------------
WHATSAPP ANNOUNCEMENT:
${plan.whatsappAnnouncement}

--------------------
INSTAGRAM CAPTION:
${plan.instagramCaption}

--------------------
LINKEDIN ANNOUNCEMENT:
${plan.linkedinAnnouncement}

--------------------
VOLUNTEER ROLES:
${plan.volunteers.map(v => `${v.role} (Count: ${v.count})\nTasks:\n${v.tasks.map(t => `- ${t}`).join("\n")}`).join("\n\n")}

--------------------
BUDGET ESTIMATES:
${plan.budget.map(b => `${b.category} (${b.estimatedCost})\nItems:\n${b.items.map(i => `- ${i}`).join("\n")}`).join("\n\n")}
                        `;
                        copyText(allCopy, 'all_bundle');
                      }}
                      className="w-full md:w-auto px-4 py-2.5 bg-white text-black hover:bg-neutral-200 rounded-[14px] text-xs font-semibold tracking-wide transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>{copiedKey === 'all_bundle' ? "COPIED ALL!" : "EXPORT PLAN BUNDLE"}</span>
                    </button>
                    
                    <div className="text-center font-mono text-[9px] text-[#6E6E73] uppercase tracking-widest">
                      Logistics Checklist: {taskProgressPercent}%
                    </div>
                  </div>
                </div>

                {/* Subtitle brief */}
                <div className="mt-5 pt-4 border-t border-white/[0.06] text-xs text-[#6E6E73] leading-relaxed">
                  <strong className="text-white">Society Intent / Focus:</strong> {plan.theme}
                </div>
              </div>

              {/* Navigation Tabs - Apple Inspiration Premium Selector with Slide controls & Auto-Centering */}
              <div id="tab-slider-wrapper" className="relative sticky top-16 z-30 w-full mt-4">
                {/* Left Smooth Slide Trigger */}
                <button 
                  type="button"
                  id="slide-tabs-left"
                  onClick={() => slideTabs('left')}
                  className="absolute left-1.5 top-1/2 -translate-y-1/2 z-40 p-1.5 rounded-full bg-black/80 border border-white/10 text-[#6E6E73] hover:text-white hover:bg-neutral-900 transition-all cursor-pointer backdrop-blur-md shadow-lg"
                  aria-label="Scroll Tabs Left"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>

                {/* Right Smooth Slide Trigger */}
                <button 
                  type="button"
                  id="slide-tabs-right"
                  onClick={() => slideTabs('right')}
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 z-40 p-1.5 rounded-full bg-black/80 border border-white/10 text-[#6E6E73] hover:text-white hover:bg-neutral-900 transition-all cursor-pointer backdrop-blur-md shadow-lg"
                  aria-label="Scroll Tabs Right"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>

                {/* Subtle depth mask layers to hint continuity */}
                <div className="absolute left-7 top-1/2 -translate-y-1/2 z-20 w-8 h-8 pointer-events-none bg-gradient-to-r from-black via-black/40 to-transparent opacity-60" />
                <div className="absolute right-7 top-1/2 -translate-y-1/2 z-20 w-8 h-8 pointer-events-none bg-gradient-to-l from-black via-black/40 to-transparent opacity-60" />

                {/* Actual Scroll bar Container */}
                <div 
                  ref={tabContainerRef}
                  id="tab-slider-scroll-area"
                  className="flex no-scrollbar overflow-x-auto gap-1 bg-[#0d0d0f]/90 p-1 rounded-full border border-white/[0.08] backdrop-blur-xl select-none mx-2 px-8"
                >
                  {[
                    { id: "overview", label: "Overview", icon: Layers },
                    { id: "schedule", label: "Schedule", icon: Clock },
                    { id: "logistics", label: "Checklist", icon: CheckSquare },
                    { id: "social", label: "Social Kit", icon: MessageSquare },
                    { id: "volunteers", label: "Squad Duties", icon: UserCheck },
                    { id: "budget", label: "PKR Budget", icon: Wallet },
                    { id: "poster", label: "Poster Ideas", icon: Sparkles },
                    { id: "post", label: "Post-Event KPI", icon: FileText }
                  ].map((tab) => {
                    const Icon = tab.icon;
                    const isSelected = activeTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        data-active={isSelected ? "true" : "false"}
                        onClick={() => setActiveTab(tab.id)}
                        className={`px-4 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-300 flex items-center gap-1.5 cursor-pointer shrink-0 relative ${
                          isSelected
                            ? "bg-white text-black font-extrabold shadow-[0_3px_10px_rgba(255,255,255,0.15)] scale-[1.01]"
                            : "text-[#6E6E73] hover:text-[#B3B3B7] hover:bg-white/[0.02]"
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5" />
                        <span>{tab.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Selected Tab Area View */}
              
              {/* Tab 1: OVERVIEW */}
              {activeTab === "overview" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in text-left">
                  
                  {/* Executive Brief Status Card */}
                  <div className="glass-panel p-4 sm:p-6 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xs font-bold text-white uppercase tracking-widest font-mono mb-3">
                        Executive Summary
                      </h3>
                      <p className="text-xs text-[#6E6E73] leading-relaxed mb-4">
                        This campaign blueprint is designed exclusively for the <strong className="text-white font-semibold">UAJK AI Society Events Team</strong>. It integrates optimized tech-talk timelines, local regional budget scales calibrated in PKR, and precise volunteer delegation plans.
                      </p>
                    </div>

                    <div className="space-y-3.5 pt-4 border-t border-white/[0.06]">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-[#6E6E73]">Target Audience Profile:</span>
                        <span className="font-bold text-white bg-white/[0.04] px-2.5 py-0.5 rounded-full border border-white/10 text-[10px] uppercase font-mono">
                          {plan.audience || "CS / IT Students"}
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-[#6E6E73]">Operational Venue:</span>
                        <span className="font-semibold text-white">
                          {plan.venue}
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-[#6E6E73]">Milestones Completed:</span>
                        <span className="font-mono text-[11px] font-bold text-white">
                          {completedTasks} / {totalTasks} ({taskProgressPercent}%)
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* micro Snapshot Progress Indicator Widget */}
                  <div className="glass-panel p-4 sm:p-6 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xs font-bold text-white uppercase tracking-widest font-mono mb-3">
                        Checklist Pipeline Progress
                      </h3>
                      <p className="text-xs text-[#6E6E73] leading-relaxed mb-4">
                        Delegate and track tasks among your squad representatives. Click items in the Checklist tab to sync your progress.
                      </p>
                    </div>

                    <div className="space-y-4">
                      {/* Interactive Progress Bar */}
                      <div>
                        <div className="flex justify-between text-xs mb-1.5">
                          <span className="text-white font-bold font-mono text-[10px] uppercase tracking-wider">Campaign Velocity</span>
                          <span className="text-[#6E6E73] font-mono text-[11px] font-bold">{taskProgressPercent}% Complete</span>
                        </div>
                        <div className="w-full bg-neutral-900 h-2 rounded-full overflow-hidden border border-white/5">
                          <div 
                            className="bg-[#FF453A] h-full rounded-full transition-all duration-500"
                            style={{ width: `${taskProgressPercent}%` }}
                          />
                        </div>
                      </div>

                      <div className="bg-white/[0.01] border border-white/[0.04] rounded-[14px] p-3 text-center">
                        <p className="text-[10.5px] text-[#6E6E73] leading-relaxed">
                          Visit the <span className="text-[#FF453A] font-bold underline cursor-pointer" onClick={() => setActiveTab("logistics")}>Logistics Checklist</span> tab to add specialized tasks, campus authorization letters, or power backup records.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Highlights Bullet-Box */}
                  <div className="md:col-span-2 glass-panel p-4 sm:p-6">
                    <h3 className="text-xs font-bold text-white uppercase tracking-widest font-mono mb-4">
                      Core Blueprint Coordinates
                    </h3>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                      <div className="p-4 bg-white/[0.01] border border-white/[0.04] rounded-[16px] space-y-1">
                        <div className="text-[9px] text-[#6E6E73] uppercase font-mono tracking-wider">Event Focus</div>
                        <div className="text-xs text-white font-medium line-clamp-1">{plan.theme}</div>
                      </div>
                      <div className="p-4 bg-white/[0.01] border border-white/[0.04] rounded-[16px] space-y-1">
                        <div className="text-[9px] text-[#6E6E73] uppercase font-mono tracking-wider">Timeline Milestones</div>
                        <div className="text-xs text-white font-bold font-mono">{plan.schedule.length} Timed Slots</div>
                      </div>
                      <div className="p-4 bg-white/[0.01] border border-white/[0.04] rounded-[16px] space-y-1">
                        <div className="text-[9px] text-[#6E6E73] uppercase font-mono tracking-wider">Assigned Members</div>
                        <div className="text-xs text-white font-bold font-mono">{plan.volunteers.length} Active Squads</div>
                      </div>
                      <div className="p-4 bg-white/[0.01] border border-white/[0.04] rounded-[16px] space-y-1">
                        <div className="text-[9px] text-[#6E6E73] uppercase font-mono tracking-wider">Budget Categories</div>
                        <div className="text-xs text-white font-bold font-mono">{plan.budget.length} PKR Cost Centers</div>
                      </div>
                    </div>
                  </div>

                  {/* Local Chapter Dynamics Bento Grid */}
                  <div className="md:col-span-2 pt-6 border-t border-white/[0.06] mt-4">
                    <h3 className="text-xs font-bold text-white uppercase tracking-widest font-mono mb-6">
                      Regional Campaign Dynamics
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      
                      <div className="glass-panel p-4 sm:p-6 hover:border-white/10 transition-all space-y-3">
                        <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                          <CheckSquare className="w-4 h-4 shadow-sm" />
                        </div>
                        <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Load Shedding Grid-Shield</h4>
                        <p className="text-xs text-[#6E6E73] leading-relaxed">
                          Local Muzaffarabad events require power backup security. Our logical checklist auto-includes petrol backups, DSLRs recharge plans, and Wi-fi hotspots tasks.
                        </p>
                      </div>

                      <div className="glass-panel p-4 sm:p-6 hover:border-white/10 transition-all space-y-3">
                        <div className="w-8 h-8 rounded-lg bg-neutral-900 border border-white/10 flex items-center justify-center text-[#FF453A]">
                          <Wallet className="w-4 h-4 shadow-sm" />
                        </div>
                        <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">PKR Regional Pricing Metrics</h4>
                        <p className="text-xs text-[#6E6E73] leading-relaxed">
                          Say goodbye to irrelevant Dollar estimates. Every budget item is calibrated to Pakistani university scale bounds to get fast approvals from academic authorities.
                        </p>
                      </div>

                      <div className="glass-panel p-4 sm:p-6 hover:border-white/10 transition-all space-y-3">
                        <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                          <MessageSquare className="w-4 h-4 shadow-sm" />
                        </div>
                        <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Viral Social Blast Layouts</h4>
                        <p className="text-xs text-[#6E6E73] leading-relaxed">
                          Custom text kits optimized directly for high-volume WhatsApp group broadcasts, professional LinkedIn outreach, and energetic Instagram Reels hooks.
                        </p>
                      </div>

                      <div className="glass-panel p-4 sm:p-6 hover:border-white/10 transition-all space-y-3">
                        <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                          <FileText className="w-4 h-4 shadow-sm" />
                        </div>
                        <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Ready-to-Print Auditing</h4>
                        <p className="text-xs text-[#6E6E73] leading-relaxed">
                          At completion, export structured feedback templates and operational templates. Streamlines records handover for future UAJK committees.
                        </p>
                      </div>

                    </div>
                  </div>

                  {/* Society Accomplishments */}
                  <div className="md:col-span-2 border border-white/5 bg-white/[0.01] rounded-3xl p-4 sm:p-6 mt-4">
                    <div className="text-center space-y-1 mb-5">
                      <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest block font-bold">UAJK Chapter Performance</span>
                      <p className="text-xs text-[#e1e2ec]">Delivering world-class tech standards in Azad Jammu & Kashmir</p>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                      <div className="p-3 rounded-2xl bg-black/40 border border-white/5">
                        <div className="text-lg sm:text-2xl font-black text-white font-display">1,500+</div>
                        <div className="text-[9px] font-mono text-[#6E6E73] uppercase mt-0.5">Students Engaged</div>
                      </div>
                      <div className="p-3 rounded-2xl bg-black/40 border border-white/5">
                        <div className="text-lg sm:text-2xl font-black text-[#FF453A] font-display">12+</div>
                        <div className="text-[9px] font-mono text-[#6E6E73] uppercase mt-0.5">Hackathons Organized</div>
                      </div>
                      <div className="p-3 rounded-2xl bg-black/40 border border-white/5">
                        <div className="text-lg sm:text-2xl font-black text-white font-display">100%</div>
                        <div className="text-[9px] font-mono text-[#6E6E73] uppercase mt-0.5">Timeline Efficiency</div>
                      </div>
                      <div className="p-3 rounded-2xl bg-black/40 border border-white/5">
                        <div className="text-lg sm:text-2xl font-black text-[#e1e2ec] font-display">8+</div>
                        <div className="text-[9px] font-mono text-[#6E6E73] uppercase mt-0.5">Faculty Anchors</div>
                      </div>
                    </div>
                  </div>

                </div>
              )}

              {/* Tab 2: SCHEDULE TIMELINE */}
              {activeTab === "schedule" && (
                <div className="glass-panel p-4 sm:p-6 md:p-8 space-y-6 animate-fade-in relative overflow-hidden">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.06] pb-5">
                    <div>
                      <h3 className="text-xs font-bold text-white uppercase tracking-widest font-mono">Hour-by-Hour Event Schedule</h3>
                      <p className="text-xs text-[#6E6E73] mt-0.5">
                        Streamlined hourly roadmap structured for session flow, guest reception, coding labs, and networking.
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        const scheduleTxt = plan.schedule.map(s => `[${s.time}] ${s.activity}\nDetails: ${s.details}`).join("\n\n");
                        copyText(scheduleTxt, 'sched');
                      }}
                      className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 text-white border border-white/10 rounded-[14px] text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer self-start sm:self-auto"
                    >
                      <Copy className="w-3.5 h-3.5 text-[#FF453A]" />
                      <span>{copiedKey === 'sched' ? "COPIED" : "COPY AGENDA"}</span>
                    </button>
                  </div>

                  {/* Horizontal Timing Timeline */}
                  <div className="space-y-5 relative before:absolute before:inset-y-2 before:left-4 md:before:left-24 before:w-[1px] before:bg-white/10">
                    {plan.schedule.map((item, idx) => (
                      <div key={idx} className="relative pl-9 md:pl-28 group transition-all text-left">
                        {/* Time marker side node */}
                        <div className="absolute left-0 top-1.5 text-[10px] font-bold font-mono text-[#6E6E73] md:w-20 md:text-right hidden md:block">
                          {item.time}
                        </div>

                        {/* Interactive timing circular badge */}
                        <div className="absolute left-2.5 md:left-[90px] top-2 w-3 h-3 rounded-full bg-[#050505] border-2 border-[#6E6E73] group-hover:border-[#FF453A] group-hover:scale-110 transition-all duration-300" />

                        <div className="bg-white/[0.01] border border-white/[0.04] rounded-[18px] p-4 sm:p-5 group-hover:bg-white/[0.02] group-hover:border-white/[0.08] transition-all relative">
                          <span className="block text-[10px] font-mono text-[#FF453A] font-bold mb-1 md:hidden">
                            {item.time}
                          </span>
                          <h4 className="text-xs font-bold text-white group-hover:text-[#FF453A] transition-colors">
                            {item.activity}
                          </h4>
                          <p className="text-xs text-[#6E6E73] mt-2 leading-relaxed">
                            {item.details}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab 3: LOGISTICS CHECKLIST (INTERACTIVE) */}
              {activeTab === "logistics" && (
                <div className="glass-panel p-4 sm:p-6 md:p-8 space-y-6 animate-fade-in text-left">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/[0.06] pb-5">
                    <div>
                      <h3 className="text-xs font-bold text-white uppercase tracking-widest font-mono">Logistics &amp; Stage Checklist</h3>
                      <p className="text-xs text-[#6E6E73] mt-0.5">
                        Interactive task coordinator. Check items to monitor setup pipeline efficiency.
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        const listTxt = plan.logistics.map(l => `[${l.completed ? "x" : " "}] ${l.item} - Category: ${l.category} (Coordinator: ${l.responsible})`).join("\n");
                        copyText(listTxt, 'logis_copy');
                      }}
                      className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 text-white border border-white/10 rounded-[14px] text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
                    >
                      <Copy className="w-3.5 h-3.5 text-[#FF453A]" />
                      <span>COPY CHECKLIST</span>
                    </button>
                  </div>

                  {/* Add Custom Logistics Task Item */}
                  <form onSubmit={addCustomLogistic} className="bg-neutral-950 border border-white/[0.06] rounded-[18px] p-4 flex flex-col md:flex-row gap-3">
                    <div className="flex-1">
                      <input
                        type="text"
                        required
                        placeholder="Add custom logistics item... (e.g., Get campus speaker permission letter)"
                        value={customLogisticsItem}
                        onChange={(e) => setCustomLogisticsItem(e.target.value)}
                        className="w-full bg-[#050505]/40 text-xs text-white border border-white/10 rounded-[14px] px-3.5 py-2.5 focus:ring-1 focus:ring-white focus:outline-none placeholder:text-white/20"
                      />
                    </div>
                    
                    <div className="flex gap-2">
                      <select
                        value={customLogisticsCategory}
                        onChange={(e) => setCustomLogisticsCategory(e.target.value)}
                        className="bg-[#050505]/40 text-xs text-white border border-white/10 rounded-[14px] px-3.5 py-2.5 focus:outline-none cursor-pointer"
                      >
                        <option value="Stage" className="bg-black text-white">Stage Squad</option>
                        <option value="Media" className="bg-black text-white">Media Office</option>
                        <option value="Catering" className="bg-black text-white">Refreshments Desk</option>
                        <option value="Tech" className="bg-black text-white">Technical Panel</option>
                        <option value="Reception" className="bg-black text-white">Invitations Desk</option>
                      </select>

                      <button
                        type="submit"
                        className="px-4 py-2 bg-white hover:bg-neutral-200 text-black text-xs font-bold rounded-[14px] transition-all flex items-center gap-1 whitespace-nowrap cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Task</span>
                      </button>
                    </div>
                  </form>

                  {/* Grid of operational categories list */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {plan.logistics.map((item, idx) => (
                      <div 
                        key={idx}
                        onClick={() => toggleLogisticCompletion(idx)}
                        className={`p-4 rounded-[18px] border transition-all cursor-pointer select-none flex items-start gap-4 ${
                          item.completed 
                            ? "bg-white/[0.01] border-white/5 opacity-50"
                            : "bg-white/[0.01] border-white/[0.05] hover:border-white/20 hover:bg-white/[0.02]"
                        }`}
                      >
                        <div className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                          item.completed 
                            ? "bg-white border-white text-black" 
                            : "border-white/20 text-transparent"
                        }`}>
                          <Check className="w-3.5 h-3.5 stroke-[3.5px]" />
                        </div>

                        <div className="space-y-1">
                          <p className={`text-xs font-bold leading-relaxed ${item.completed ? "line-through text-[#6E6E73]" : "text-white"}`}>
                            {item.item}
                          </p>
                          <div className="flex items-center gap-2">
                            <span className="text-[9px] bg-white/[0.04] text-white px-2 py-0.5 rounded-full font-mono uppercase tracking-widest">
                              {item.category}
                            </span>
                            <span className="text-[9px] text-[#6E6E73] font-mono uppercase">
                              Lead: {item.responsible}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab 4: SOCIAL MEDIA & WHATSAPP CAMPAIGN KIT */}
              {activeTab === "social" && (
                <div className="glass-panel p-4 sm:p-6 md:p-8 space-y-6 animate-fade-in relative text-left">
                  <div className="absolute top-0 right-0 w-36 h-36 bg-white/[0.01] rounded-full blur-2xl pointer-events-none" />
                  
                  <div className="flex justify-between items-center border-b border-white/[0.06] pb-5">
                    <div>
                      <h3 className="text-xs font-bold text-white uppercase tracking-widest font-mono">Social Announcement Suite</h3>
                      <p className="text-xs text-[#6E6E73] mt-0.5">
                        High-engagement formatted posts ready for student WhatsApp lists, Linkedin and Instagram.
                      </p>
                    </div>
                  </div>

                  {/* Platform Sub-tabs Selector */}
                  <div className="flex bg-neutral-900 border border-white/5 p-1 rounded-full max-w-xs gap-1">
                    <button
                      onClick={() => setSocialSubTab("whatsapp")}
                      className={`flex-1 py-1.5 text-[10px] font-mono uppercase tracking-wider font-bold rounded-full flex items-center justify-center gap-1 transition-all cursor-pointer ${
                        socialSubTab === "whatsapp" 
                          ? "bg-white text-black shadow-inner" 
                          : "text-[#6E6E73] hover:text-white"
                      }`}
                    >
                      <MessageSquare className="w-3 h-3" />
                      <span>WhatsApp</span>
                    </button>
                    <button
                      onClick={() => setSocialSubTab("instagram")}
                      className={`flex-1 py-1.5 text-[10px] font-mono uppercase tracking-wider font-bold rounded-full flex items-center justify-center gap-1 transition-all cursor-pointer ${
                        socialSubTab === "instagram" 
                          ? "bg-white text-black shadow-inner" 
                          : "text-[#6E6E73] hover:text-white"
                      }`}
                    >
                      <Instagram className="w-3 h-3" />
                      <span>Instagram</span>
                    </button>
                    <button
                      onClick={() => setSocialSubTab("linkedin")}
                      className={`flex-1 py-1.5 text-[10px] font-mono uppercase tracking-wider font-bold rounded-full flex items-center justify-center gap-1 transition-all cursor-pointer ${
                        socialSubTab === "linkedin" 
                          ? "bg-white text-black shadow-inner" 
                          : "text-[#6E6E73] hover:text-white"
                      }`}
                    >
                      <Linkedin className="w-3 h-3" />
                      <span>LinkedIn</span>
                    </button>
                  </div>

                  {/* Active content block with visual render window & convenient single click copy option */}
                  <div className="space-y-4">
                    {socialSubTab === "whatsapp" && (
                      <div className="space-y-3">
                        <div className="flex justify-between items-center bg-white/[0.01] px-4 py-3 rounded-[14px] border border-white/[0.06]">
                          <span className="text-[10px] font-mono text-white font-bold flex items-center gap-1.5 uppercase tracking-widest">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                            WhatsApp Broadcast Template
                          </span>
                          <button
                            onClick={() => copyText(plan.whatsappAnnouncement, 'wa_copy')}
                            className="text-[11px] font-semibold text-black bg-white hover:bg-neutral-200 px-3.5 py-1.5 rounded-[12px] cursor-pointer transition-colors"
                          >
                            {copiedKey === 'wa_copy' ? "COPIED" : "COPY COPY"}
                          </button>
                        </div>
                        <div className="p-6 bg-[#0c0c0e] border border-white/[0.06] rounded-[18px] text-xs font-mono whitespace-pre-wrap leading-relaxed max-h-96 overflow-y-auto relative">
                          <TypewriterText text={plan.whatsappAnnouncement} mode="word" speed={6} />
                        </div>
                      </div>
                    )}

                    {socialSubTab === "instagram" && (
                      <div className="space-y-3">
                        <div className="flex justify-between items-center bg-white/[0.01] px-4 py-3 rounded-[14px] border border-white/[0.06]">
                          <span className="text-[10px] font-mono text-white font-bold flex items-center gap-1.5 uppercase tracking-widest">
                            <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse"></span>
                            Instagram Caption Post
                          </span>
                          <button
                            onClick={() => copyText(plan.instagramCaption, 'ig_copy')}
                            className="text-[11px] font-semibold text-black bg-white hover:bg-neutral-200 px-3.5 py-1.5 rounded-[12px] cursor-pointer transition-colors"
                          >
                            {copiedKey === 'ig_copy' ? "COPIED" : "COPY COPY"}
                          </button>
                        </div>
                        <div className="p-6 bg-[#0c0c0e] border border-white/[0.06] rounded-[18px] text-xs whitespace-pre-wrap leading-relaxed max-h-96 overflow-y-auto relative">
                          <TypewriterText text={plan.instagramCaption} mode="word" speed={6} />
                        </div>
                      </div>
                    )}

                    {socialSubTab === "linkedin" && (
                      <div className="space-y-3">
                        <div className="flex justify-between items-center bg-white/[0.01] px-4 py-3 rounded-[14px] border border-white/[0.06]">
                          <span className="text-[10px] font-mono text-white font-bold flex items-center gap-1.5 uppercase tracking-widest">
                            <span className="w-2 h-2 rounded-full bg-[#FF453A] animate-pulse"></span>
                            LinkedIn Corporate Post
                          </span>
                          <button
                            onClick={() => copyText(plan.linkedinAnnouncement, 'li_copy')}
                            className="text-[11px] font-semibold text-black bg-white hover:bg-neutral-200 px-3.5 py-1.5 rounded-[12px] cursor-pointer transition-colors"
                          >
                            {copiedKey === 'li_copy' ? "COPIED" : "COPY COPY"}
                          </button>
                        </div>
                        <div className="p-6 bg-[#0c0c0e] border border-white/[0.06] rounded-[18px] text-xs whitespace-pre-wrap leading-relaxed max-h-96 overflow-y-auto w-full relative">
                          <TypewriterText text={plan.linkedinAnnouncement} mode="word" speed={6} />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Tab 5: VOLUNTEER ROLES */}
              {activeTab === "volunteers" && (
                <div className="glass-panel p-4 sm:p-6 md:p-8 space-y-6 animate-fade-in relative text-left">
                  <div className="absolute top-0 right-0 w-36 h-36 bg-white/[0.01] rounded-full blur-3xl pointer-events-none" />
                  
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.06] pb-5">
                    <div>
                      <h3 className="text-xs font-bold text-white uppercase tracking-widest font-mono">UAJK AIS Duty Squads</h3>
                      <p className="text-xs text-[#6E6E73] mt-0.5">
                        Structured tasks delegated cleanly across distinct student society subcommittees.
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        const volsTxt = plan.volunteers.map(v => `ROLE: ${v.role}\nVolunteers Needed: ${v.count}\nTasks:\n${v.tasks.map(t => `- ${t}`).join("\n")}`).join("\n\n");
                        copyText(volsTxt, 'vols_copy');
                      }}
                      className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 text-white border border-white/10 rounded-[14px] text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer self-start sm:self-auto shrink-0"
                    >
                      <Copy className="w-3.5 h-3.5 text-[#FF453A]" />
                      <span>COPY SQUAD ROSTER</span>
                    </button>
                  </div>

                  {/* Grid layout of specialized student groups */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {plan.volunteers.map((v, idx) => (
                      <div key={idx} className="p-5 bg-white/[0.01] border border-white/[0.05] rounded-[18px] hover:border-white/10 transition-all">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                              {v.role}
                            </h4>
                            <span className="text-[9px] text-[#6E6E73] font-mono uppercase tracking-widest">
                              UAJK AIS Subteam
                            </span>
                          </div>
                          
                          <div className="bg-[#0c0c0e] text-[#FF453A] border border-[#FF453A]/10 px-3 py-1 rounded-full text-[10px] font-bold font-mono">
                            {v.count} Member{v.count > 1 ? "s" : ""} Required
                          </div>
                        </div>

                        <ul className="space-y-2.5 mt-2">
                          {v.tasks.map((task, tid) => (
                            <li key={tid} className="flex items-start gap-2 text-xs text-[#6E6E73]">
                              <span className="text-white shrink-0 mt-1">•</span>
                              <span className="leading-relaxed">{task}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab 6: DETAILED PKR BUDGET PLANNER */}
              {activeTab === "budget" && (
                <div className="glass-panel p-4 sm:p-6 md:p-8 space-y-6 animate-fade-in relative text-left">
                  <div className="absolute top-0 right-0 w-36 h-36 bg-white/[0.01] rounded-full blur-3xl pointer-events-none" />
                  
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.06] pb-5">
                    <div>
                      <h3 className="text-xs font-bold text-white uppercase tracking-widest font-mono">Regional Chapter Budget Estimates</h3>
                      <p className="text-xs text-[#6E6E73] mt-0.5">
                        Local Azad Jammu &amp; Kashmir operational limits modeled directly in Pakistani Rupees (PKR) for student club proposals.
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        const budgTxt = plan.budget.map(b => `CATEGORY: ${b.category}\nEstimated Cost: ${b.estimatedCost}\nIncluded Items:\n${b.items.map(i => `- ${i}`).join("\n")}`).join("\n\n");
                        copyText(budgTxt, 'bud_copy');
                      }}
                      className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 text-white border border-white/10 rounded-[14px] text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer self-start sm:self-auto"
                    >
                      <Copy className="w-3.5 h-3.5 text-[#FF453A]" />
                      <span>COPY BUDGET SHEET</span>
                    </button>
                  </div>

                  {/* Financial Grid */}
                  <div className="space-y-4">
                    {plan.budget.map((b, idx) => (
                      <div key={idx} className="p-4 sm:p-5 bg-white/[0.01] border border-white/[0.04] rounded-[18px] flex flex-col sm:flex-row justify-between sm:items-center gap-4 hover:border-white/10 transition-all text-left">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">{b.category}</h4>
                            <span className="text-[9px] bg-white/[0.04] text-[#6E6E73] px-2 py-0.5 rounded-full font-bold uppercase tracking-widest">Estimated</span>
                          </div>
                          
                          <div className="flex flex-wrap gap-1.5 mt-2">
                            {b.items.map((item, idy) => (
                              <span key={idy} className="text-[10px] bg-neutral-900 border border-white/5 text-[#6E6E73] px-2.5 py-0.5 rounded-full">
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="text-left sm:text-right shrink-0">
                          <div className="text-[9px] text-[#6E6E73] uppercase font-mono tracking-widest">SOCIETY COST</div>
                          <div className="text-xs font-mono font-bold text-white mt-1">{b.estimatedCost}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Regional University Sponsorship Notice */}
                  <div className="mt-4 p-5 bg-[#0c0c0e] border border-white/[0.06] rounded-[18px] flex items-center gap-3">
                    <TrendingUp className="w-5 h-5 text-[#FF453A] shrink-0" />
                    <p className="text-xs text-[#6E6E73] leading-relaxed">
                      <strong>Budget Advisory:</strong> EventPilot calculated these figures based on typical Azad Jammu &amp; Kashmir university finance ranges. Submit this printout directly to your treasury lead or staff anchors for smooth approval.
                    </p>
                  </div>
                </div>
              )}

              {/* Tab: AI Poster Idea Generator */}
              {activeTab === "poster" && plan.posterIdea && (
                <div className="glass-panel p-4 sm:p-6 md:p-8 space-y-6 animate-fade-in relative overflow-hidden text-left">
                  <div className="absolute top-0 right-0 w-48 h-48 bg-white/[0.01] rounded-full blur-3xl pointer-events-none" />
                  
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center border-b border-white/[0.06] pb-5 gap-4">
                    <div>
                      <h3 className="text-xs font-bold text-white uppercase tracking-widest font-mono flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-[#FF453A]" />
                        Poster Design Creative Brief
                      </h3>
                      <p className="text-xs text-[#6E6E73] mt-0.5">
                        AI-generated visual direction, copywriting parameters, typography pairings, and layout models.
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        const posterCopy = `
POSTER HEADLINE: ${plan.posterIdea?.headline}
SLOGAN FOR MARKETING: ${plan.posterIdea?.slogan}
SUGGESTED COLORS: ${plan.posterIdea?.suggestedColors.join(", ")}
VISUAL THEME: ${plan.posterIdea?.visualTheme}
TYPOGRAPHY STYLE: ${plan.posterIdea?.typographyStyle}
LAYOUT SUGGESTION: ${plan.posterIdea?.layoutSuggestion}
                        `;
                        copyText(posterCopy, 'poster_all_copy');
                      }}
                      className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 text-white border border-white/10 rounded-[14px] text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer self-start sm:self-auto shrink-0"
                    >
                      <Copy className="w-3.5 h-3.5 text-[#FF453A]" />
                      <span>{copiedKey === 'poster_all_copy' ? "COPIED BRIEF" : "COPY DESIGN BRIEF"}</span>
                    </button>
                  </div>

                  {/* Two Column Layout: Left Poster Visual Preview, Right Detailed Guidelines */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                    
                    {/* Visual Poster Mockup Preview Frame */}
                    <div className="md:col-span-5 flex flex-col space-y-4">
                      <div className="text-[10px] font-bold font-mono text-white/50 uppercase tracking-widest">
                        Interactive Design Preview
                      </div>
                      
                      {/* Artistic preview card simulating the physical poster */}
                      <div className="bg-[#0a0a0c] border border-white/[0.08] rounded-[18px] p-6 relative overflow-hidden aspect-[4/5] flex flex-col justify-between shadow-2xl group/poster">
                        
                        {/* Upper Header info */}
                        <div className="z-10 flex justify-between items-start font-mono text-[9px] text-[#6E6E73] tracking-widest uppercase">
                          <span>UAJK AIS PRESENTS</span>
                          <span>EST. 2026</span>
                        </div>
                        
                        {/* Visual artwork centerpiece mockup */}
                        <div className="z-10 py-4 flex flex-col items-center justify-center grow space-y-3">
                          <div className="w-12 h-12 rounded-full border border-white/10 bg-white/[0.01] flex items-center justify-center relative">
                            <Sparkles className="w-5 h-5 text-[#FF453A]" />
                          </div>
                          
                          <div className="text-center space-y-1">
                            <h4 className="text-[9px] font-bold font-mono text-[#6E6E73] tracking-widest uppercase">
                              Artwork Concept
                            </h4>
                            <p className="text-[10px] text-zinc-400 px-3 leading-relaxed italic line-clamp-2">
                              "{plan.posterIdea.visualTheme}"
                            </p>
                          </div>
                        </div>

                        {/* Text and Campaign details representation */}
                        <div className="z-10 space-y-3 pt-4 border-t border-white/[0.06] mt-auto">
                          <div className="text-center">
                            <div className="text-[#FF453A] font-mono text-[8px] tracking-widest uppercase font-bold">
                              DISPLAY HEADLINE
                            </div>
                            <h3 className="text-sm font-extrabold text-white tracking-tight text-center uppercase leading-tight line-clamp-2 mt-0.5 font-mono">
                              {plan.posterIdea.headline}
                            </h3>
                          </div>

                          <div className="text-center border-t border-white/[0.04] pt-1.5">
                            <p className="text-[11px] text-zinc-400 italic font-medium leading-tight">
                              "{plan.posterIdea.slogan}"
                            </p>
                          </div>

                          {/* Dummy Timing elements */}
                          <div className="flex justify-between items-center text-[8px] font-mono text-[#6E6E73] border-t border-white/[0.04] pt-2 tracking-wider">
                            <span>📅 {plan.eventDate}</span>
                            <span>📍 {plan.venue.split(",")[0]}</span>
                          </div>
                        </div>

                        {/* Top corner alignment crosshairs */}
                        <div className="absolute top-2 left-2 text-[8px] font-mono text-white/5 pointer-events-none select-none">+</div>
                        <div className="absolute top-2 right-2 text-[8px] font-mono text-white/5 pointer-events-none select-none">+</div>
                      </div>
                      
                      <div className="text-[10.5px] text-[#6E6E73] text-center italic leading-relaxed">
                        This mockup illustrates the generated art board coordinates. Apply this guide in Figma or Canva to produce assets.
                      </div>
                    </div>

                    {/* Right Detailed Guidelines */}
                    <div className="md:col-span-7 space-y-4">
                      
                      {/* Section 1: Headline & Slogan */}
                      <div className="p-5 bg-white/[0.01] border border-white/[0.04] rounded-[18px] space-y-3">
                        <div className="flex justify-between items-center pb-2 border-b border-white/[0.06]">
                          <span className="text-xs font-bold text-white uppercase tracking-wider font-mono">Publicity Copywriting</span>
                          <button
                            onClick={() => copyText(`Headline: ${plan.posterIdea?.headline}\nSlogan: ${plan.posterIdea?.slogan}`, 'copy_copy')}
                            className="text-[10px] font-mono text-[#FF453A] hover:underline flex items-center gap-1 cursor-pointer"
                          >
                            <Copy className="w-2.5 h-2.5" />
                            <span>Copy Texts</span>
                          </button>
                        </div>
                        
                        <div className="space-y-4">
                          <div>
                            <span className="text-[9px] text-[#6E6E73] uppercase font-mono tracking-widest">Main Display Headline</span>
                            <div className="text-xs font-bold text-white bg-[#0c0c0e] border border-white/[0.06] rounded-[12px] p-3 mt-1.5 leading-relaxed">
                              {plan.posterIdea.headline}
                            </div>
                          </div>
                          <div>
                            <span className="text-[9px] text-[#6E6E73] uppercase font-mono tracking-widest">Target Social Slogan / Callout</span>
                            <div className="text-xs font-mono font-bold text-[#FF453A] bg-[#0c0c0e] border border-white/[0.06] rounded-[12px] p-3 mt-1.5">
                              "{plan.posterIdea.slogan}"
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Section 2: Color Palette */}
                      <div className="p-5 bg-white/[0.01] border border-white/[0.04] rounded-[18px] space-y-3">
                        <span className="text-xs font-bold text-white uppercase tracking-wider block font-mono">Recommended Color Accents</span>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {plan.posterIdea.suggestedColors.map((color, idx) => {
                            const hexMatch = color.match(/#[a-fA-F0-9]{3,8}/);
                            const bgStyle = hexMatch ? hexMatch[0] : undefined;
                            return (
                              <button 
                                key={idx}
                                onClick={() => copyText(color, `color_${idx}`)}
                                className="flex items-center justify-between p-3 bg-[#0c0c0e] border border-white/[0.06] rounded-[14px] hover:border-white/20 transition-all cursor-pointer group text-left w-full"
                              >
                                <div className="flex items-center gap-2.5 overflow-hidden">
                                  <span 
                                    className="w-4 h-4 rounded border border-white/15 shrink-0" 
                                    style={{ backgroundColor: bgStyle || '#ef4444' }}
                                  />
                                  <span className="text-[11px] font-mono text-white group-hover:text-[#FF453A] transition-all truncate">
                                    {color}
                                  </span>
                                </div>
                                <span className="text-[9px] text-[#6E6E73] font-mono shrink-0 pointer-events-none block group-hover:block sm:hidden">
                                  {copiedKey === `color_${idx}` ? "COPIED" : "COPY"}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Section 3: Visual Theme and Style Guides */}
                      <div className="p-5 bg-white/[0.01] border border-white/[0.04] rounded-[18px] space-y-3">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          
                          <div>
                            <span className="text-[10px] text-[#6E6E73] uppercase font-mono tracking-widest block mb-1">Visual Direction</span>
                            <p className="text-xs text-white leading-relaxed">
                              {plan.posterIdea.visualTheme}
                            </p>
                          </div>
                          
                          <div>
                            <span className="text-[10px] text-[#6E6E73] uppercase font-mono tracking-widest block mb-1">Typography Mapping</span>
                            <p className="text-xs text-white leading-relaxed font-mono">
                              {plan.posterIdea.typographyStyle}
                            </p>
                          </div>

                        </div>
                      </div>

                      {/* Section 4: Grid Layout suggestion */}
                      <div className="p-5 bg-white/[0.01] border border-white/[0.04] rounded-[18px] space-y-2">
                        <span className="text-[9px] text-[#6E6E73] uppercase font-mono tracking-widest block">Structural Layout Suggestion</span>
                        <div className="p-3 bg-[#0c0c0e] border border-white/[0.06] rounded-[12px] text-xs text-zinc-300 leading-normal font-mono">
                          {plan.posterIdea.layoutSuggestion}
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              )}

              {/* Tab 8: POST-EVENT SUMMARY SURVEY REPORT */}
              {activeTab === "post" && (
                <div className="glass-panel p-4 sm:p-6 md:p-8 space-y-6 animate-fade-in relative text-left">
                  <div className="absolute top-0 right-0 w-36 h-36 bg-white/[0.01] rounded-full blur-3xl pointer-events-none" />
                  
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#0c0c0e] pb-5">
                    <div>
                      <h3 className="text-xs font-bold text-white uppercase tracking-widest font-mono">Post-Event Deliverables</h3>
                      <p className="text-xs text-[#6E6E73] mt-0.5">
                        Executive survey template to declare attendee logs, speaker stats, and outcomes.
                      </p>
                    </div>

                    <button
                      onClick={() => copyText(plan.postEventSummaryTemplate, 'post_copy')}
                      className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 text-white border border-white/10 rounded-[14px] text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
                    >
                      <Copy className="w-3.5 h-3.5 text-[#FF453A]" />
                      <span>{copiedKey === 'post_copy' ? "COPIED" : "COPY REPORT LAYOUT"}</span>
                    </button>
                  </div>

                  <div className="p-6 bg-[#0c0c0e] border border-white/[0.06] rounded-[18px] text-xs font-mono leading-relaxed max-h-96 overflow-y-auto whitespace-pre-wrap relative">
                    <TypewriterText text={plan.postEventSummaryTemplate} mode="word" speed={6} />
                  </div>
                  
                  <div className="text-[11px] text-[#6E6E73] leading-relaxed italic bg-white/[0.01] border border-white/[0.05] p-5 rounded-[18px]">
                    Note: Complete your event details above and email the markdown report to standard society anchors inside the CS Faculty for records registration!
                  </div>
                </div>
              )}

            </div>
          )}

        </div>

      </div>

    </div>
  );
}

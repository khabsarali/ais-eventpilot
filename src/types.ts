export interface EventInput {
  eventName: string;
  eventDate: string;
  venue: string;
  audience: string;
  theme: string;
}

export interface ScheduleItem {
  time: string;
  activity: string;
  details: string;
}

export interface LogisticsItem {
  item: string;
  category: string;
  responsible: string;
  completed?: boolean;
}

export interface VolunteerRole {
  role: string;
  tasks: string[];
  count: number;
}

export interface BudgetCategory {
  category: string;
  items: string[];
  estimatedCost: string;
}

export interface PosterIdea {
  headline: string;
  suggestedColors: string[];
  visualTheme: string;
  typographyStyle: string;
  layoutSuggestion: string;
  slogan: string;
}

export interface EventPlan {
  eventName: string;
  eventDate: string;
  venue: string;
  audience: string;
  theme: string;
  schedule: ScheduleItem[];
  logistics: LogisticsItem[];
  whatsappAnnouncement: string;
  instagramCaption: string;
  linkedinAnnouncement: string;
  volunteers: VolunteerRole[];
  budget: BudgetCategory[];
  postEventSummaryTemplate: string;
  posterIdea?: PosterIdea;
}

export interface EventPreset {
  name: string;
  eventName: string;
  venue: string;
  audience: string;
  theme: string;
  daysAhead: number; // e.g., 7 days in future to auto-populate date
}

/* ─── PolicyDen training modules ───
   Each module groups related SOPs (Kyle-style walkthroughs from sops-data.js).
   Shape:
     id          : url slug used in policyden.html?module=<id>
     label       : card title
     description : one-line card copy
     accent      : short tagline on the module page hero ("6 walkthroughs · ~40 min")
     icon        : lucide-style SVG inner paths (no outer <svg>)
     sops        : [{ sopId, title, desc, duration, tag }]
                   · sopId deep-links into window.SOPS via sop.html?id=<sopId>&module=<id>
                   · Leave sops: [] to render a "Coming soon" empty state on the module page.

   To add a new SOP:
     1. Author the walkthrough in sops-data.js under window.SOPS (id prefixed with "policyden-").
     2. Add a row here under the matching module's sops array.
   ═══════════════════════════════════════════════════════════════════════════ */
window.POLICYDEN_MODULES = {

  "getting-started": {
    label: "Getting Started",
    description: "Sign in, tour the app, and take your first actions in PolicyDen.",
    accent: "For new agents",
    icon: '<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>',
    sops: [
      { sopId: "policyden-quickstart", title: "Quickstart", desc: "Your first session, end to end — sign in, set up your profile, and create your first contact, policy, and task in about ten minutes.", duration: "~10 min · 16 steps", tag: "Core" },
      { sopId: "policyden-navigating-the-app", title: "Navigating the App", desc: "A tour of the PolicyDen sidebar, top bar, list views, and keyboard shortcuts — so you can move between contacts, policies, and conversations without thinking about it.", duration: "5 sections", tag: "Core" },
      { sopId: "policyden-welcome", title: "What PolicyDen Is", desc: "A quick orientation to PolicyDen — what the agency operating system does, where each workflow lives, and how to customize it to match your agency.", duration: "Overview", tag: "Core" },
    ],
  },

  "contacts": {
    label: "Contacts",
    description: "Leads and clients — create, import, export, and work the profile.",
    accent: "Every lead and client",
    icon: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
    sops: [
      // First SOP shipped for review. The remaining five are authored in
      // sops-data.js — uncomment as each one is reviewed and approved.
      { sopId: "policyden-contacts-list", title: "Browse the Contact List", desc: "The Contacts page is the master list of every lead and client in your agency's book. Learn the toolbar, the filter and sort controls, the column picker, and how to drop into any contact's profile in two clicks.", duration: "9 steps", tag: "Core" },
      // { sopId: "policyden-contacts-create",       title: "Create a Contact",        desc: "Add a new lead with PolicyDen's duplicate-detection flow. Search by phone first, see if the contact already exists, and only fill in details when you're sure you're not creating a duplicate.", duration: "8 steps", tag: "Core" },
      // { sopId: "policyden-contacts-profile",      title: "The Contact Profile",     desc: "The single view for everything you track against one contact — quick actions in the header, contact details and clinical info on the right, and tabs for Documents, Notes, and History.", duration: "10 steps", tag: "Core" },
      // { sopId: "policyden-contacts-import",       title: "Import Your Book",        desc: "Bring an existing book of business into PolicyDen from a CSV or Excel file. Required fields, column mapping, and how to handle skipped rows.", duration: "8 steps", tag: "Admin" },
      // { sopId: "policyden-contacts-export",       title: "Export Contacts",         desc: "Pull contacts out of PolicyDen as a CSV. Choose between every matching contact or just the rows you've selected, pick which fields to include, and download the file on the fly.", duration: "6 steps", tag: "Core" },
      // { sopId: "policyden-contacts-bulk-actions", title: "Bulk Actions",            desc: "Reassign or archive many contacts at once. Admins see selection checkboxes on every row; the bulk action bar appears as soon as one contact is selected.", duration: "7 steps", tag: "Admin" },
    ],
  },

  "policies": {
    label: "Policies",
    description: "Track every policy your agency has written — from sale to renewal.",
    accent: "Your book of business",
    icon: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><path d="M9 15l2 2 4-4"/>',
    sops: [],
  },

  "pipeline": {
    label: "Pipeline",
    description: "Work your Medicare pipeline on a Kanban board. Drag deals between stages.",
    accent: "Kanban view of your book",
    icon: '<rect x="3" y="3" width="5" height="18" rx="1"/><rect x="10" y="3" width="5" height="10" rx="1"/><rect x="17" y="3" width="5" height="14" rx="1"/>',
    sops: [],
  },

  "tasks": {
    label: "Tasks",
    description: "Follow-ups for you and your team — create, edit, complete, and reassign.",
    accent: "Never miss a callback",
    icon: '<path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>',
    sops: [],
  },

  "meetings": {
    label: "Meetings",
    description: "Keep a record of every meeting with a contact — upcoming, past, attendees, links.",
    accent: "Scheduled with contacts",
    icon: '<rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>',
    sops: [],
  },

  "messages": {
    label: "Messages",
    description: "Text clients from your agency's dedicated number. Every conversation on the record.",
    accent: "SMS with contacts",
    icon: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
    sops: [],
  },

  "calls": {
    label: "Calls",
    description: "Place and receive calls inside PolicyDen. Automatic logging and recordings.",
    accent: "In-app dialing",
    icon: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>',
    sops: [],
  },

  "atlas": {
    label: "Atlas AI",
    description: "Your built-in AI assistant. Ask plain-English questions about your book.",
    accent: "AI assistant",
    icon: '<circle cx="12" cy="12" r="10"/><path d="M12 8a4 4 0 0 1 4 4c0 2-1.5 2.5-2.5 3.5S12 17 12 17"/><line x1="12" y1="20" x2="12.01" y2="20"/>',
    sops: [],
  },

  "dashboard": {
    label: "Dashboard",
    description: "Sales, renewals, agent and carrier performance, and high-risk policies at a glance.",
    accent: "Daily snapshot",
    icon: '<rect x="3" y="3" width="7" height="9"/><rect x="14" y="3" width="7" height="5"/><rect x="14" y="12" width="7" height="9"/><rect x="3" y="16" width="7" height="5"/>',
    sops: [],
  },

  "reports": {
    label: "Reports",
    description: "Break down production by agency, agent, carrier, SEP, state, or date. Save, share, export.",
    accent: "Deeper cuts",
    icon: '<path d="M3 3v18h18"/><path d="M7 14l4-4 4 4 5-5"/>',
    sops: [],
  },

  "customization": {
    label: "Customization",
    description: "Custom fields, documents, notes, comments, and saved filters your agency depends on.",
    accent: "Tailor PolicyDen",
    icon: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h0a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51h0a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v0a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>',
    sops: [],
  },

  "settings": {
    label: "Settings",
    description: "Agency-level configuration — users, roles, products, carriers, templates, billing.",
    accent: "Admin & agency owners",
    icon: '<path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/>',
    sops: [],
  },

};

/* ─── SOPs dataset (Kyle's framework) ───
   Each SOP follows the schema used on kyleproctor.github.io/magnolia-sops/:
   - sections: letter-badged groupings (i: "A", "B", …)
   - steps within each section (numbered globally by id)
     · t    = title
     · d    = short description
     · x    = extended explanation
     · tip  = optional pro-tip callout
     · warn = optional warning callout
     · m    = mockup scene id (matches a key in window.MOCKUPS below, or a
              scene understood by a dynamic renderer registered in
              window.MOCKUP_FNS — set sop.mockupFn to the renderer name)
     · h    = highlight target inside that mockup (matches a data-hl in the
              SVG when using a static mockup)
   - narration (optional): { sectionIndex → audio URL }. Omit for silent SOPs.

   Add new SOPs to the SOPS object keyed by id. The viewer at sop.html
   reads SOPS[new URLSearchParams(location.search).get('id')]. */


/* ═══════════════════════════════════════════════════════════════════════════
   DYNAMIC MOCKUP RENDERERS (Kyle-style — draw highlights inline in the SVG)
   Each renderer is a function (mockupId, highlightId) → svg string.
   Register under a name so a SOP can reference it via top-level `mockupFn`.
   Example:
     window.MOCKUP_FNS["policyden"] = function(m, hl) { return "<svg…"; };
     // Then in the SOP: { title: "...", mockupFn: "policyden", sections: [...] }
   ═══════════════════════════════════════════════════════════════════════════ */
window.MOCKUP_FNS = window.MOCKUP_FNS || {};

/* ─── PolicyDen renderer ───────────────────────────────────────────────────
   Renders a live PolicyDen staging screenshot (PNG) with optional hotspots
   that the SOP viewer's overlay system pulses on top of. Hotspots are defined
   per screenshot in window.POLICYDEN_SHOTS below — each is an {x, y, w, h}
   rectangle in the 1440×900 viewport we captured at.

   Step fields:
     m : screenshot key (e.g. "01-sign-in")  → window.POLICYDEN_SHOTS[m]
     h : hotspot id within that shot (matches a key in shot.hotspots)
   ─────────────────────────────────────────────────────────────────────── */
// Bump when the screenshot set changes so browsers always fetch the fresh PNGs
// instead of serving cached lower-res versions.
window.POLICYDEN_ASSET_VERSION = "2026-04-24-contacts";

window.MOCKUP_FNS["policyden"] = function(m, hl) {
  const shots = window.POLICYDEN_SHOTS || {};
  const shot = shots[m];
  if (!shot) return '';
  const W = shot.w || 1440;
  const H = shot.h || 900;
  const ver = window.POLICYDEN_ASSET_VERSION || '1';
  // Each shot may live under a per-module subdirectory. Defaults to
  // getting-started so historical entries keep working without a `dir` field.
  const dir = shot.dir || 'getting-started';
  const src = `assets/policyden/${dir}/${shot.file || (m + '.png')}?v=${ver}`;
  // Render as a plain <img> inside a wrapper sized by the PNG's intrinsic
  // aspect ratio. Using <img> (instead of SVG <image>) lets the browser render
  // the PNG at its native resolution — crisp on retina + high-DPI displays.
  //
  // Highlight overlays are intentionally OFF for PolicyDen mockups. Hotspot
  // coordinates in POLICYDEN_SHOTS were eyeballed and frequently misalign with
  // the actual UI element on screen, which adds confusion. Re-measure against
  // the live screenshots before re-enabling — flip POLICYDEN_HIGHLIGHTS to
  // true once they're trustworthy.
  const showHighlights = !!window.POLICYDEN_HIGHLIGHTS;
  let overlay = '';
  if (showHighlights) {
    const target = hl && (shot.hotspots || {})[hl];
    if (target) {
      const left = (target.x / W) * 100;
      const top  = (target.y / H) * 100;
      const w    = (target.w / W) * 100;
      const h    = (target.h / H) * 100;
      overlay = `<div class="hl-overlay" data-hl="${hl}" style="position:absolute;left:${left}%;top:${top}%;width:${w}%;height:${h}%;"></div>`;
    }
  }
  return `
    <div class="policyden-mock" style="position:relative;width:100%;aspect-ratio:${W} / ${H};">
      <img src="${src}" alt="" style="display:block;width:100%;height:100%;object-fit:cover;object-position:center top;border-radius:12px;"/>
      ${overlay}
    </div>
  `;
};

/* ─── PolicyDen screenshot registry ─────────────────────────────────────────
   Each entry maps a mockup key → the captured PNG and named hotspots for
   step.h. Coordinates are in the original 1440×900 viewport.
   When new screenshots are added under assets/policyden/<module>/, register
   them here so SOPs can reference them by key.
   ──────────────────────────────────────────────────────────────────────── */
window.POLICYDEN_SHOTS = {
  "01-sign-in": {
    file: "01-sign-in.png", w: 1440, h: 900,
    hotspots: {
      "login-form":     { x: 386, y: 180, w: 250, h: 260 },
      "email-field":    { x: 386, y: 210, w: 250, h: 40  },
      "password-field": { x: 386, y: 256, w: 250, h: 40  },
      "login-btn":      { x: 386, y: 335, w: 250, h: 36  },
      "login-with-code":{ x: 386, y: 390, w: 250, h: 34  },
    },
  },
  "02-app-shell": {
    file: "02-app-shell.png", w: 1440, h: 900,
    hotspots: {
      "agency-switcher": { x: 0,   y: 0,   w: 172, h: 48 },
      "sidebar":         { x: 0,   y: 48,  w: 172, h: 800 },
      "sidebar-main":    { x: 0,   y: 48,  w: 172, h: 240 },
      "sidebar-mgmt":    { x: 0,   y: 320, w: 172, h: 160 },
      "top-bar":         { x: 172, y: 0,   w: 1268, h: 48 },
      "calls-widget":    { x: 1345, y: 8,  w: 80, h: 32 },
      "dashboard-stats": { x: 260, y: 120, w: 1150, h: 110 },
    },
  },
  "05-profile-page": {
    file: "05-profile-page.png", w: 1440, h: 900,
    hotspots: {
      "profile-info":   { x: 585, y: 60,  w: 440, h: 360 },
      "profile-photo":  { x: 600, y: 130, w: 430, h: 60 },
      "name-fields":    { x: 600, y: 205, w: 430, h: 130 },
      "email-field":    { x: 600, y: 335, w: 430, h: 55 },
      "save-profile":   { x: 600, y: 395, w: 120, h: 40 },
      "update-password":{ x: 585, y: 455, w: 440, h: 220 },
    },
  },
  "06-contacts-page": {
    file: "06-contacts-page.png", w: 1440, h: 900,
    hotspots: {
      "sidebar-contacts": { x: 0,    y: 112, w: 172, h: 32 },
      "contacts-toolbar": { x: 180,  y: 40,  w: 1240, h: 40 },
      "search-filter":    { x: 180,  y: 40,  w: 345, h: 28 },
      "add-contact-btn":  { x: 1330, y: 40,  w: 100, h: 28 },
      "contacts-table":   { x: 180,  y: 75,  w: 1240, h: 800 },
    },
  },
  "07-add-contact-modal": {
    file: "07-add-contact-modal.png", w: 1440, h: 900,
    hotspots: {
      "modal":         { x: 298, y: 180, w: 430, h: 260 },
      "modal-header":  { x: 298, y: 180, w: 430, h: 42  },
      "phone-search":  { x: 320, y: 370, w: 380, h: 36  },
      "close-modal":   { x: 695, y: 188, w: 22,  h: 22  },
    },
  },
  "08-contact-profile": {
    file: "08-contact-profile.png", w: 1440, h: 900,
    hotspots: {
      "contacts-table": { x: 180, y: 75, w: 1240, h: 800 },
      "first-row":      { x: 180, y: 100, w: 1240, h: 28 },
    },
  },
  "09-contact-policies-tab": {
    file: "09-contact-policies-tab.png", w: 1440, h: 900,
    hotspots: {
      "sidebar-policies": { x: 0,    y: 136, w: 172, h: 32 },
      "policies-tabs":    { x: 180,  y: 100, w: 1100, h: 30 },
      "filter-tabs":      { x: 180,  y: 100, w: 900, h: 30 },
      "add-policy-btn":   { x: 1330, y: 180, w: 100, h: 28 },
    },
  },
  "10-add-policy-modal": {
    file: "10-add-policy-modal.png", w: 1440, h: 900,
    hotspots: {
      "product-picker":  { x: 336, y: 168, w: 352, h: 290 },
      "select-product":  { x: 336, y: 170, w: 352, h: 40 },
      "medicare-option": { x: 350, y: 215, w: 160, h: 75 },
      "continue-btn":    { x: 600, y: 440, w: 80,  h: 30 },
    },
  },
  "11-contact-tasks-tab": {
    file: "11-contact-tasks-tab.png", w: 1440, h: 900,
    hotspots: {
      "tasks-list":    { x: 180, y: 80, w: 1260, h: 780 },
      "status-tabs":   { x: 180, y: 80, w: 900, h: 40 },
      "add-task-btn":  { x: 1330, y: 80, w: 100, h: 32 },
    },
  },
  "12-add-task-modal": {
    file: "12-add-task-modal.png", w: 1440, h: 900,
    hotspots: {
      "modal":         { x: 400, y: 120, w: 640, h: 640 },
      "title-field":   { x: 420, y: 180, w: 600, h: 40 },
      "due-date":      { x: 420, y: 260, w: 290, h: 40 },
      "assignee":      { x: 730, y: 260, w: 290, h: 40 },
      "save-task":     { x: 920, y: 720, w: 100, h: 36 },
    },
  },
  "13-tasks-page": {
    file: "13-tasks-page.png", w: 1440, h: 900,
    hotspots: {
      "sidebar-tasks": { x: 0,   y: 184, w: 172, h: 32 },
      "status-tabs":   { x: 180, y: 40,  w: 900, h: 40 },
      "tasks-table":   { x: 180, y: 80,  w: 1260, h: 800 },
    },
  },
  "14-sidebar-detail": {
    file: "14-sidebar-detail.png", w: 1440, h: 900,
    hotspots: {
      "sidebar":      { x: 0, y: 0,   w: 172, h: 900 },
      "sidebar-main": { x: 0, y: 48,  w: 172, h: 220 },
      "sidebar-mgmt": { x: 0, y: 288, w: 172, h: 170 },
    },
  },
  "15-top-bar-detail": {
    file: "15-top-bar-detail.png", w: 1440, h: 900,
    hotspots: {
      "top-bar":         { x: 172,  y: 0,  w: 1268, h: 48 },
      "breadcrumbs":     { x: 180,  y: 12, w: 500, h: 24 },
      "agency-switcher": { x: 0,    y: 0,  w: 172, h: 48 },
      "calls-widget":    { x: 1345, y: 8,  w: 80,  h: 32 },
    },
  },
  "16-dashboard": {
    file: "16-dashboard.png", w: 1440, h: 900,
    hotspots: {
      "sidebar-dashboard": { x: 0,   y: 88,  w: 172, h: 32 },
      "dashboard-stats":   { x: 260, y: 120, w: 1150, h: 110 },
      "sales-chart":       { x: 180, y: 245, w: 1260, h: 260 },
      "rankings":          { x: 180, y: 520, w: 1260, h: 380 },
    },
  },

  /* ─── Contacts module ────────────────────────────────────────────────────
     All contacts shots live under assets/policyden/contacts/. They were
     captured headlessly from staging at device_scale_factor=2 (2880×1866),
     which the renderer scales to fit. Hotspot coordinates assume the
     1440×900 design viewport — they're omitted by default; flip
     POLICYDEN_HIGHLIGHTS=true once you re-measure to enable the overlays.
     ─────────────────────────────────────────────────────────────────────── */
  "contacts-list": {
    dir: "contacts", file: "01-contacts-list.png", w: 1440, h: 900,
  },
  "contacts-toolbar": {
    dir: "contacts", file: "02-contacts-toolbar.png", w: 1440, h: 900,
  },
  "contacts-filters": {
    dir: "contacts", file: "03-filters-panel.png", w: 1440, h: 900,
  },
  "contacts-sort": {
    dir: "contacts", file: "04-sort-dialog.png", w: 1440, h: 900,
  },
  "contacts-columns": {
    dir: "contacts", file: "05-column-picker.png", w: 1440, h: 900,
  },
  "contacts-add-search": {
    dir: "contacts", file: "06-add-contact-search.png", w: 1440, h: 900,
  },
  "contacts-add-create": {
    dir: "contacts", file: "07-add-contact-create-form.png", w: 1440, h: 900,
  },
  "contacts-bulk-bar": {
    dir: "contacts", file: "11-bulk-action-bar.png", w: 1440, h: 900,
  },
  "contacts-assign-dialog": {
    dir: "contacts", file: "12-assign-dialog.png", w: 1440, h: 900,
  },
  "contacts-archive-dialog": {
    dir: "contacts", file: "13-archive-dialog.png", w: 1440, h: 900,
  },
  "contacts-date-range": {
    dir: "contacts", file: "14-date-range.png", w: 1440, h: 900,
  },
  "contacts-profile": {
    dir: "contacts", file: "20-contact-profile.png", w: 1440, h: 900,
  },
  "contacts-tab-docs": {
    dir: "contacts", file: "24-tab-docs.png", w: 1440, h: 900,
  },
  "contacts-tab-notes": {
    dir: "contacts", file: "25-tab-notes.png", w: 1440, h: 900,
  },
  "contacts-tab-history": {
    dir: "contacts", file: "27-tab-history.png", w: 1440, h: 900,
  },
};


/* ═══════════════════════════════════════════════════════════════════════════
   SOPs
   ═══════════════════════════════════════════════════════════════════════════ */
window.SOPS = {

  /* ─── Sample Workflow — framework demo only. Delete when first real SOPs
         are authored, or leave as a living schema reference.              ─── */
  "sample-workflow": {
    title: "Sample <em>Workflow</em>",
    description: "A short placeholder SOP that demonstrates every feature of the framework — sections, tips, warnings, visual mockups, and progress tracking. Replace with real content.",
    department: "HR",
    owner: "Operations Team",
    effective: "April 2026",
    version: "1.0",
    sections: [
      { t: "Preparation", i: "A", s: [
        { id:1, t:"Open the internal portal",
          d:"Navigate to the Magnolia team portal.",
          x:"Use Chrome or Edge for best compatibility. Bookmark the URL after your first login.",
          tip:"Single-sign-on is enabled — if you're already logged into Google Workspace, you'll land directly on the dashboard.",
          m:"portal", h:"url-bar" },
        { id:2, t:"Locate the right workspace",
          d:"Click into your department's workspace from the left sidebar.",
          x:"Every Magnolia team has a dedicated workspace. Only workspaces you're assigned to will appear.",
          m:"portal", h:"side-nav" },
      ]},
      { t: "Execution", i: "B", s: [
        { id:3, t:"Start a new task",
          d:"Click the \"New Task\" button at the top right.",
          x:"This opens the task creation dialog. All required fields are marked with a red asterisk.",
          warn:"Never skip the \"Category\" field — tasks without a category are not routed correctly and can delay execution by 24+ hours.",
          m:"task-form", h:"new-task-btn" },
        { id:4, t:"Fill in the required fields",
          d:"Title, Category, and Owner are required.",
          x:"Keep titles under 60 characters. Choose the most specific category — don't default to \"Other\" unless nothing else fits.",
          tip:"If you're unsure who the owner should be, assign it to your team lead — they'll reassign as needed.",
          m:"task-form", h:"form-fields" },
      ]},
      { t: "Review", i: "C", s: [
        { id:5, t:"Submit and verify",
          d:"Click Submit, then confirm the task appears in the active queue.",
          x:"The confirmation banner appears briefly. Take a screenshot if this task is tied to compliance — screenshots are retained in your workspace for 10 years automatically.",
          tip:"Follow up with the assigned owner within 48 hours if the task is time-sensitive.",
          m:"task-form", h:"submit-btn" },
      ]},
    ],
  },

  /* ══════════════════════════════════════════════════════════════════════
     PolicyDen · Getting Started module
     Source: magnoliahealthcare.mintlify.app (quickstart, navigating-the-app, index)
     Mockups: real screenshots from staging.policyden.com captured April 2026.
     ══════════════════════════════════════════════════════════════════════ */

  "policyden-quickstart": {
    title: "Quickstart: <em>Your First Session</em>",
    description: "Sign in, set up your profile, and create your first contact, policy, and task in about ten minutes. Every new agent at Magnolia runs this walkthrough on day one.",
    department: "PolicyDen · Getting Started",
    owner: "PolicyDen Training",
    effective: "April 2026",
    version: "1.0",
    mockupFn: "policyden",
    // Per-section voice narration. Plays the Matilda MP3 if present; otherwise
    // the viewer reads `transcript` with SpeechSynthesis. Generate the MP3s with
    // `python3 scripts/policyden_generate_narration.py quickstart`.
    narration: [
      { audio: "assets/policyden/getting-started/narration/quickstart/section-a.mp3",
        transcript: "First, open PolicyDen in your browser and sign in. Navigate to app.policyden.com, accept your invite if it's your first time, and if you work with more than one agency, pick the right one from the agency switcher in the top-left." },
      { audio: "assets/policyden/getting-started/narration/quickstart/section-b.mp3",
        transcript: "Before you do anything else, set up your profile. Click your avatar and choose Profile. Upload a professional headshot, confirm your name and work email, and set a strong password. Clients see this information on every call log and SMS conversation." },
      { audio: "assets/policyden/getting-started/narration/quickstart/section-c.mp3",
        transcript: "Now create your first contact. Go to Contacts in the sidebar and click Add Contact. PolicyDen always asks you to search by phone number first — this prevents duplicate records when the same lead comes in from two different sources. If no match is found, fill in the required details and save. You'll land on the contact's profile." },
      { audio: "assets/policyden/getting-started/narration/quickstart/section-d.mp3",
        transcript: "Next, log a policy for that contact. Open the Policies tab, click Add Policy, and choose the product type — most of the time that's Medicare. Fill in the carrier, plan details, sale date, and effective date, then save. The sale date drives Magnolia's production reporting, so set it correctly." },
      { audio: "assets/policyden/getting-started/narration/quickstart/section-e.mp3",
        transcript: "Finally, schedule a follow-up task. From the contact's profile, go to Tasks, click Add Task, and enter a specific action-oriented title and a due date. Assign it to yourself or a teammate. Your new task now shows up on the main Tasks page, which is your daily work list." },
    ],
    sections: [
      { t: "Sign In", i: "A", s: [
        { id: 1, t: "Open the app",
          d: "Go to app.policyden.com and sign in with your email and password.",
          x: "PolicyDen works in any modern browser — Chrome, Safari, Firefox, or Edge. Bookmark the URL after your first login so you can jump straight to the dashboard each morning. The staging environment lives at staging.policyden.com; production is app.policyden.com.",
          tip: "If single sign-on is configured for your agency, the \"Login with Google\" button on the right will skip the password entirely.",
          m: "01-sign-in", h: "login-form" },
        { id: 2, t: "Accept your invite",
          d: "If this is your first time, click the link in your invitation email and set a password.",
          x: "Admins invite new agents from Agency settings → Users. The invitation email contains a one-time link that drops you straight onto a password-creation screen. Use a strong password — PolicyDen holds PHI.",
          warn: "Invitation links expire. If yours has lapsed, ask your Admin to re-send rather than using the \"Forgot password\" flow — the flows are different.",
          m: "01-sign-in", h: "login-btn" },
        { id: 3, t: "Pick an agency",
          d: "If you work with more than one agency, choose the one you want to work in from the agency switcher in the top-left.",
          x: "Data is scoped to the active agency — contacts, policies, reports, and settings only show that agency's records. Any change you make (a new contact, a disposition update, an assignment) applies only to the agency you're currently inside.",
          tip: "Most Magnolia agents only have one agency; this step is a no-op. If you ever see unfamiliar contacts, check the agency switcher first before reporting a bug.",
          m: "02-app-shell", h: "agency-switcher" },
      ]},

      { t: "Set Up Your Profile", i: "B", s: [
        { id: 4, t: "Open your profile",
          d: "Click your avatar in the sidebar and choose Profile — or go directly to Settings → Profile.",
          x: "Your profile controls how teammates and clients see you. The name and avatar here show up on call logs, SMS logs, and the agent assignment column in Contacts and Policies. Keep it accurate — Magnolia's compliance team audits this.",
          m: "05-profile-page", h: "profile-info" },
        { id: 5, t: "Add a photo and contact info",
          d: "Upload an avatar and confirm your first name, last name, and work email address.",
          x: "Use a clear, professional headshot — no sunglasses, no group shots. Clients see this next to every message and call log. Name changes sync across the platform immediately, but only an Admin can change the email address on your account after the first save.",
          tip: "If you don't have a headshot, use your Magnolia ID photo. Ask your manager where to download it.",
          m: "05-profile-page", h: "profile-photo" },
        { id: 6, t: "Set your password",
          d: "Under Update Password, set a strong password if you haven't already.",
          x: "PolicyDen requires at least one uppercase letter, one number, and one symbol. Pass phrases (e.g. \"Magnolia-Blue-Jay-42\") are more secure and easier to remember than short complex passwords. Change your password if you suspect it's compromised — don't wait for the next 90-day rotation.",
          warn: "Never share your password with teammates. If an admin needs to act on your behalf, they can impersonate your account — they never need your credentials.",
          m: "05-profile-page", h: "update-password" },
      ]},

      { t: "Create Your First Contact", i: "C", s: [
        { id: 7, t: "Go to Contacts",
          d: "Click Contacts in the sidebar.",
          x: "The Contacts page is the master list of every lead and client your agency works. You can search, filter, sort, and drill into any contact from here. If you've imported a book of business, every row you see started life on this screen.",
          m: "06-contacts-page", h: "sidebar-contacts" },
        { id: 8, t: "Open the new contact form",
          d: "Click Add Contact in the top-right.",
          x: "The blue \"+ Add Contact\" button is always visible in the top-right of the Contacts page. You can also use the quick-add menu in the top bar to create a contact from anywhere in the app without leaving your current screen.",
          tip: "Keyboard shortcut: the quick-add menu in the top bar has contact creation one hover away — useful mid-call.",
          m: "06-contacts-page", h: "add-contact-btn" },
        { id: 9, t: "Search for the phone number first",
          d: "PolicyDen asks you to search by phone before it lets you create a new contact.",
          x: "This is intentional — it prevents duplicate contacts when the same lead comes in from two different sources. Paste the phone number you just spoke to. If a match is found, you'll land on that existing contact's profile instead of creating a new one. Only if no match exists will the full creation form appear.",
          warn: "Never skip the duplicate check. Duplicate contacts split the contact's history across two records and cause assignment and commission errors that are painful to clean up later.",
          m: "07-add-contact-modal", h: "phone-search" },
        { id: 10, t: "Fill in the required details",
          d: "PolicyDen needs First Name, Last Name, Phone, Date of Birth, and Medicare Number to save a new contact.",
          x: "Email, address, and any custom fields your agency has added are optional at creation and can be filled in later from the contact's profile. Double-check the Date of Birth and Medicare Number before saving — these drive eligibility and enrollment-period logic downstream, and editing them later triggers an audit log entry.",
          tip: "If the prospect won't share their Medicare Number on the first call, enter a placeholder like \"pending\" and update it on the next call. Don't leave it blank — the system won't save without it.",
          m: "07-add-contact-modal", h: "modal" },
        { id: 11, t: "Save",
          d: "Click Save. PolicyDen opens the contact's profile so you can start working.",
          x: "The save succeeds immediately if all required fields validate. You land on the contact's profile with the Activities tab open. From there you can log calls, send SMS, add policies, schedule tasks, and upload documents — everything about that person lives in this one view.",
          m: "08-contact-profile", h: "contacts-table" },
      ]},

      { t: "Log a Policy", i: "D", s: [
        { id: 12, t: "Open the Policies tab",
          d: "From the contact's profile, select the Policies tab.",
          x: "Every contact has a tabbed profile — Activities, Policies, Tasks, Documents, Notes, Comments, and History. The Policies tab lists every policy tied to that contact, from applications that never went active all the way through renewals and disenrollments.",
          tip: "You can also add a policy from the main Policies page (sidebar → Policies → Add Policy). Both paths end up at the same form.",
          m: "09-contact-policies-tab", h: "sidebar-policies" },
        { id: 13, t: "Click Add Policy",
          d: "Click Add Policy and choose the product type.",
          x: "PolicyDen supports Medicare, Accident Plan, Critical Illness, Dental, Hospital Indemnity, and Vision as product types. Pick the one that matches the plan you just sold. Medicare is by far the most common at Magnolia — only use the others for the ancillary products (UHOne, hospital indemnity, etc.).",
          warn: "UHOne products go under the product type that matches the coverage (Hospital Indemnity, Dental, etc.), not under \"Medicare\". Never conflate UHOne with United Health Care's MA plans — they're separate product lines with separate commission structures.",
          m: "10-add-policy-modal", h: "product-picker" },
        { id: 14, t: "Fill in the policy details and save",
          d: "Choose the carrier, effective date, and any required plan fields. Click Continue, then Save.",
          x: "The required fields depend on the product and carrier — Medicare Advantage plans ask for plan name, plan ID, effective date, and sale date; ancillary products are simpler. Magnolia's downstream reporting keys off the Sale Date (not Created Date), so set it correctly the first time.",
          m: "10-add-policy-modal", h: "continue-btn" },
      ]},

      { t: "Schedule a Follow-Up", i: "E", s: [
        { id: 15, t: "Open the Tasks tab on the contact",
          d: "From the contact's profile, select Tasks.",
          x: "The Tasks tab on a contact shows every follow-up ever scheduled for that person — open, completed, canceled — so you always have a running record of the work you've done and the work still queued up.",
          m: "11-contact-tasks-tab", h: "tasks-list" },
        { id: 16, t: "Create a task",
          d: "Click Add Task, enter a title and due date, and assign it to yourself or a teammate.",
          x: "Good task titles are specific and action-oriented — \"Call back after AEP, confirm PCP\" beats \"Follow up.\" Include the why, not just the what, so the person picking up the task understands the context without reading the full contact history.",
          tip: "If you're about to go on PTO, reassign your open tasks to your team lead before you leave. A task with no accountable owner is a task that won't get done.",
          m: "12-add-task-modal", h: "modal" },
        { id: 17, t: "See it in your task list",
          d: "The task shows up on the main Tasks page (sidebar → Tasks) and on the contact's timeline.",
          x: "The main Tasks page is your daily to-do list — filter by status (Open, In Progress, Completed, Canceled), by assignee, or by date. Every morning at Magnolia, the first thing an agent should do is sort Tasks by due date ascending and work the list top-down.",
          m: "13-tasks-page", h: "tasks-table" },
      ]},
    ],
  },

  "policyden-navigating-the-app": {
    title: "Navigating <em>the App</em>",
    description: "A tour of the PolicyDen sidebar, top bar, lists, profile layout, and keyboard shortcuts — so you can move between contacts, policies, and conversations without thinking about it.",
    department: "PolicyDen · Getting Started",
    owner: "PolicyDen Training",
    effective: "April 2026",
    version: "1.0",
    mockupFn: "policyden",
    narration: [
      { audio: "assets/policyden/getting-started/narration/navigating-the-app/section-a.mp3",
        transcript: "Let's start with the sidebar on the left. Every page you use daily lives here. Under Main you'll find Atlas, Dashboard, Contacts, Policies, Pipeline, Tasks, and Messages. If you're an admin or agency owner, a separate Management section shows Reporting, Workflows, and the Policy Status Tool. Writing agents only see Main, and that's by design." },
      { audio: "assets/policyden/getting-started/narration/navigating-the-app/section-b.mp3",
        transcript: "Next, the top bar. Every page has the same bar — breadcrumbs, search, quick-add, the calls widget, notifications, and the agency switcher. Learn the top bar before anything else. Every action you need is one hover away without leaving the page you're already on." },
      { audio: "assets/policyden/getting-started/narration/navigating-the-app/section-c.mp3",
        transcript: "Contacts, Policies, and Tasks all share the same list UI. Search narrows by name, email, or phone. Filter chips slice by status, stage, and assigned agent. Column headers sort on click, and the gear icon lets you customize which columns show. Save any filter-sort-columns combo as a Saved View and share it with your team." },
      { audio: "assets/policyden/getting-started/narration/navigating-the-app/section-d.mp3",
        transcript: "Contact and policy profiles share one layout. Identifying info sits on top with quick actions. Below that, tabs for Activities, Policies, Tasks, Documents, Notes, Comments, and History. Use Activities to understand what happened; use History to understand who changed what and when." },
      { audio: "assets/policyden/getting-started/narration/navigating-the-app/section-e.mp3",
        transcript: "Finally, a few shortcuts. A contact's name is always a link — single-click to jump to the profile. A phone number always starts a call. Row-hover reveals inline actions like delete, assign, and archive. And if you work with more than one agency, the agency switcher in the top-left changes context — every contact, policy, and report is scoped to the active agency." },
    ],
    sections: [
      { t: "The Sidebar", i: "A", s: [
        { id: 1, t: "Main navigation",
          d: "The left sidebar is your primary navigation. Every page you use daily lives here.",
          x: "Under \"Main\" you'll find Atlas (the AI assistant), Dashboard (sales and renewals at a glance), Contacts (every lead and client), Policies (every policy the agency has written), Pipeline (the Kanban board), Tasks (your follow-ups), and Messages (SMS conversations). The order is stable — once you memorize it, the sidebar becomes muscle memory.",
          tip: "Hover the left edge of the screen to pop the sidebar open if you've collapsed it. Click the pin icon next to the agency switcher to keep it pinned.",
          m: "14-sidebar-detail", h: "sidebar-main" },
        { id: 2, t: "Management section (admin only)",
          d: "Admins and Agency Owners see extra items under \"Management\" — Reporting, Workflows, and Policy Status Tool.",
          x: "If you're a writing agent, you won't see this section at all, and that's normal. Admins use Reporting for deeper production cuts, Workflows for automations, and the Policy Status Tool for bulk status updates. These live in their own area because they operate across the whole book, not a single contact.",
          m: "14-sidebar-detail", h: "sidebar-mgmt" },
      ]},

      { t: "The Top Bar", i: "B", s: [
        { id: 3, t: "The top bar at a glance",
          d: "Every page has the same top bar — breadcrumbs, search, quick-add, calls widget, notifications, and the agency switcher.",
          x: "The top bar is your always-available control strip. Breadcrumbs tell you where you are and let you jump up one level. The search box jumps to any contact by name, phone, or email. The quick-add (+) menu creates a contact, policy, task, or meeting from anywhere. The calls widget on the right lets you place or receive calls without leaving the page. Notifications bell catches new messages, assignments, and mentions. The agency switcher in the top-left swaps between agencies you belong to.",
          tip: "Learn the top bar before you learn anything else. Every action you need is one hover away without leaving the page you're already on.",
          m: "15-top-bar-detail", h: "top-bar" },
      ]},

      { t: "Lists, Filters & Saved Views", i: "C", s: [
        { id: 4, t: "Every list works the same way",
          d: "Contacts, Policies, and Tasks all share the same table UI — search, filter, sort, customize columns, and save the view.",
          x: "Search at the top narrows by name, email, or phone. Filter chips let you slice by status, stage, assigned Agent, and custom fields. Column headers sort on click. The column picker (gear icon) lets you add or remove columns to see only what matters. Saved filters let you name and share a filter-sort-columns combo with teammates — so your whole team can start the day looking at the same slice of the book.",
          tip: "Create a Saved Filter called \"My Open Deals\" on Pipeline, sorted by stage. It's the single most effective daily view for writing agents.",
          m: "06-contacts-page", h: "contacts-toolbar" },
      ]},

      { t: "The Profile Layout", i: "D", s: [
        { id: 5, t: "Contact and policy profiles share one layout",
          d: "Overview on top with identifying info and quick actions. Tabs below for Activities, Policies, Tasks, Documents, Notes, Comments, and History.",
          x: "The Activities tab is the combined timeline — calls, SMS, policy changes, task completions, notes — everything in chronological order. Per-type tabs (Policies, Tasks, etc.) filter to just that object type. History is the audit log: every field edit, every reassignment, timestamped and attributed. Use Activities to understand what happened; use History to understand who changed what and when.",
          warn: "Notes are internal-only and visible to teammates. Comments attach to specific records (a policy, a task) and show up in context. Don't put client-sensitive info in public-facing fields like Description.",
          m: "09-contact-policies-tab", h: "policies-tabs" },
      ]},

      { t: "Shortcuts & Multi-Agency", i: "E", s: [
        { id: 6, t: "Keyboard & click shortcuts",
          d: "A contact's name is always a link. A phone number always starts a call. Row-hover reveals inline actions.",
          x: "Click a contact's name anywhere in the app — in a table row, in a comment, in a timeline — and you jump to the profile. Click a phone number and the calls widget opens pre-dialing. Hover any row and inline actions (delete, assign, archive) appear on the right without opening the profile. Right-click a column header to customize the column or change sort.",
          tip: "Stop double-clicking contact names. Single-click is a link, not a select. Single-click saves you a click 200 times a day.",
          m: "13-tasks-page", h: "tasks-table" },
        { id: 7, t: "Multi-agency users",
          d: "If you work with more than one agency, use the agency switcher in the top-left to change context.",
          x: "Everything in PolicyDen — contacts, policies, reports, and even your settings — is scoped to the active agency. Changes you make apply only to the agency you're inside. If you open a contact, switch agencies, and come back, the URL will 404 — that contact belongs to the other agency's data.",
          m: "02-app-shell", h: "agency-switcher" },
      ]},
    ],
  },

  "policyden-welcome": {
    title: "What <em>PolicyDen Is</em>",
    description: "A quick orientation to PolicyDen — what Magnolia's agency operating system does, where each workflow lives, and how it ties together. Read this before the Quickstart if you've never worked in a CRM before.",
    department: "PolicyDen · Getting Started",
    owner: "PolicyDen Training",
    effective: "April 2026",
    version: "1.0",
    mockupFn: "policyden",
    narration: [
      { audio: "assets/policyden/getting-started/narration/welcome/section-a.mp3",
        transcript: "PolicyDen is Magnolia's agency operating system. Every lead, client, policy, pipeline deal, text, and call lives here. It's built specifically for health insurance agencies that write Medicare and ACA — so instead of stitching together a separate CRM, dialer, SMS tool, and pipeline board, PolicyDen does all of it in one app." },
      { audio: "assets/policyden/getting-started/narration/welcome/section-b.mp3",
        transcript: "Three objects form the spine of the whole app: Contacts, Policies, and Pipeline. A Contact is a person — a lead or a client. A Policy is a specific plan you've written for that contact. The Pipeline is the Kanban view of contacts grouped by sales stage. Tasks, messages, and calls attach to contacts. If you understand those three objects and how they connect, you understand PolicyDen." },
      { audio: "assets/policyden/getting-started/narration/welcome/section-c.mp3",
        transcript: "Three tools help you work smarter. Atlas is the built-in AI assistant — ask it plain-English questions and it pulls answers from your live data. The Dashboard is the glance view: sales, renewals, top agents, top carriers, at-risk policies. And Reports, which admins use, is where you slice production deeper by state, SEP, carrier, or date range." },
      { audio: "assets/policyden/getting-started/narration/welcome/section-d.mp3",
        transcript: "PolicyDen flexes to how Magnolia actually works. Your admin has added custom fields to contacts and policies for things the default CRM didn't capture. Saved Filters let you lock in your favorite list views and share them with teammates. Documents attach to contacts and policies. Notes and Comments capture the context that doesn't fit into a structured field. Spend your first week learning where these live — they'll save you hours per week." },
    ],
    sections: [
      { t: "What It Is", i: "A", s: [
        { id: 1, t: "PolicyDen is our agency operating system",
          d: "It's the CRM where every lead, client, policy, pipeline deal, text, and call at Magnolia lives.",
          x: "PolicyDen is built specifically for health insurance agencies that write Medicare and ACA. Instead of stitching together a separate CRM, dialer, SMS tool, and pipeline board, PolicyDen does all of it in one app. Every contact's full history — every call you placed, every text you sent, every policy you wrote — is attached to their profile. Nothing gets dropped between systems because there is only one system.",
          m: "16-dashboard", h: "dashboard-stats" },
      ]},

      { t: "Core Workflows", i: "B", s: [
        { id: 2, t: "Contacts, Policies, and Pipeline are the spine",
          d: "Everything else in PolicyDen wraps around these three objects.",
          x: "A Contact is a person (lead or client). A Policy is a specific plan you've written for a contact — a Medicare Advantage plan, a Dental plan, etc. The Pipeline is a Kanban view of contacts grouped by stage (New Lead, Qualified, Enrollment Pending, Active, etc.). Tasks attach to contacts and sit on the main Tasks list. Messages (SMS) and Calls attach to contacts as timeline events. If you understand the contact → policy → pipeline relationship, you understand the whole app.",
          tip: "Think of it this way: Contacts are people, Policies are what you sold them, Pipeline is where they are in the sales process. Everything else is context on one of those three.",
          m: "06-contacts-page", h: "contacts-table" },
      ]},

      { t: "Work Smarter", i: "C", s: [
        { id: 3, t: "Atlas, Dashboard, and Reports",
          d: "Ask Atlas plain-English questions. Watch the Dashboard for the daily pulse. Use Reports for production slicing.",
          x: "Atlas is PolicyDen's built-in AI assistant — ask it \"how many Aetna MAPD sales did I write this month\" and it returns an answer drawn from your live data. The Dashboard is the glance view: sales, renewals, top agents, top carriers, at-risk policies. Reports (admin-only) is where you slice production deeper — by state, SEP, carrier, date range — and save or export the cut. You'll use Atlas daily, Dashboard daily, and Reports a few times a week.",
          m: "16-dashboard", h: "sales-chart" },
      ]},

      { t: "Customize", i: "D", s: [
        { id: 4, t: "Custom fields and saved filters",
          d: "PolicyDen flexes to how Magnolia actually works — not a one-size-fits-all CRM.",
          x: "Your Admin has added custom fields to contacts and policies that match Magnolia's workflow — things the default CRM didn't capture. Saved Filters let you lock in your favorite list views (\"My Open Deals Due This Week\", \"Aetna MAPD Sales This Month\") and share them with teammates. Documents attach to contacts and policies. Notes and Comments capture the stuff that doesn't fit into a structured field. Spend the first week learning where these live — they'll save you hours per week once you do.",
          tip: "If you find yourself re-applying the same filters every morning, you're missing a Saved Filter. Create one.",
          m: "09-contact-policies-tab", h: "policies-tabs" },
      ]},
    ],
  },

  /* ══════════════════════════════════════════════════════════════════════
     PolicyDen · Contacts module
     Source: magnoliahealthcare.mintlify.app/contacts/* (April 2026)
     Mockups: real screenshots from staging.policyden.com under
              assets/policyden/contacts/.
     ══════════════════════════════════════════════════════════════════════ */

  "policyden-contacts-list": {
    title: "Browse the <em>Contact List</em>",
    description: "The Contacts page is the master list of every lead and client in your agency's book. Learn the toolbar, the filter and sort controls, the column picker, and how to drop into any contact's profile in two clicks.",
    department: "PolicyDen · Contacts",
    owner: "PolicyDen Training",
    effective: "April 2026",
    version: "1.0",
    mockupFn: "policyden",
    narration: [
      { audio: "assets/policyden/contacts/narration/list/section-a.mp3",
        transcript: "Click Contacts in the sidebar. You land on the full contact list, sorted by most recently created. Each row is one contact, with the Contact column pinned on the left so the name stays visible as you scroll sideways." },
      { audio: "assets/policyden/contacts/narration/list/section-b.mp3",
        transcript: "The toolbar across the top groups everything you do against the list. Search filters by name, email, or phone as you type. Filters narrows the list by one or more field conditions. Sort lets you order by one or more columns. Table opens the column picker so you can choose which fields are visible and in what order." },
      { audio: "assets/policyden/contacts/narration/list/section-c.mp3",
        transcript: "Most cells are editable in place. Hover any cell — phone, email, date of birth, address fields, Medicare number, even the assigned agent — and click to edit without leaving the list. Click the contact's name to open the full profile." },
      { audio: "assets/policyden/contacts/narration/list/section-d.mp3",
        transcript: "Two more controls live in the toolbar. My Contacts is an Agent-only toggle that filters the list to contacts assigned to you. Pick a date range limits the list to contacts created in the window you choose. Combine these with filters to focus on the work you need to do today." },
      { audio: "assets/policyden/contacts/narration/list/section-e.mp3",
        transcript: "Once you have a filter, sort, and column layout you like, save it as a Saved Filter. The next time you need the same view, it's one click away — and you can share saved views with your team so everyone works the same list." },
    ],
    sections: [
      { t: "Open Contacts", i: "A", s: [
        { id: 1, t: "Click Contacts in the sidebar",
          d: "The Contacts link in the left sidebar opens the full list of every lead and client your agency works with.",
          x: "The list is sorted by most recently created by default — newest contacts at the top — so the leads that just came in are right where you'd expect them. Out of the box you'll see Contact name, Phone, Date of Birth, Medicare Number, Physical State and City, the assigned Agent, and the Agency the contact belongs to.",
          m: "contacts-list", h: "sidebar-contacts" },
      ]},

      { t: "The Toolbar", i: "B", s: [
        { id: 2, t: "Search the list",
          d: "Use the Search box on the left of the toolbar to filter by name, email, or phone as you type.",
          x: "Search is the fastest way to find a specific lead — start typing any portion of the name, email, or phone, and the list narrows immediately. It searches across all the contact's phone numbers (primary and secondary), so you don't need to remember which one you saved.",
          tip: "If you remember only the last four digits, type those — partial matches work.",
          m: "contacts-list", h: "search-filter" },
        { id: 3, t: "Add filters",
          d: "Click Filters to narrow the list by field conditions — name, agent, agency, demographic fields, custom fields, and more.",
          x: "Each filter uses operators that match the field type. Text fields use equals and contains. Dates use before and after. Every field supports is empty / is not empty so you can find missing data on a contact (e.g., \"contacts with no Medicare number\"). Stack as many filters as you need — they all apply together.",
          tip: "Click Reset filters to clear them all in one shot rather than removing them one at a time.",
          m: "contacts-filters", h: "contacts-toolbar" },
        { id: 4, t: "Sort the list",
          d: "Click any column header to sort by that column, or open the Sort menu in the toolbar to sort by multiple columns at once.",
          x: "Single-column sorts are usually enough — sort by Date of Birth ascending to find the next AEP-eligible leads, or by Created Date descending to see the freshest leads first. The multi-column sort is useful when you want a tie-breaker — for example, sort by State and then by Created Date inside each state.",
          m: "contacts-sort", h: "contacts-toolbar" },
        { id: 5, t: "Customize the columns you see",
          d: "Click Table in the toolbar to open the column picker. Toggle columns on or off and drag to reorder.",
          x: "Out of the box you see Contact, Phone, DOB, Medicare Number, Physical State and City, Agent, and Agency. Add columns for Email, Gender, Mailing Address, or any custom fields your agency has defined. Hide columns you don't use — a focused list is faster to scan.",
          tip: "Your column choices are saved per-user, so the layout you set is the layout you get the next time you open Contacts.",
          m: "contacts-columns", h: "contacts-toolbar" },
      ]},

      { t: "Read the Rows", i: "C", s: [
        { id: 6, t: "Edit cells in place",
          d: "Hover any editable cell and click to edit without leaving the list.",
          x: "Phone, email, date of birth, the address fields, Medicare number, and the assigned agent can all be updated inline. This is the fastest way to clean up a list of leads — fix bad phone numbers, set Medicare numbers as you collect them on calls, and reassign agents — without opening every profile.",
          warn: "Inline edits save immediately when you tab out of the cell. There's no \"Cancel\" — if you mistype, fix it on the next keystroke.",
          m: "contacts-list", h: "contacts-table" },
        { id: 7, t: "Open a profile",
          d: "Click the contact's name to open their full profile.",
          x: "The list is for triage — search, filter, batch updates. The profile is where you do real work on one person — log policies, schedule tasks, send messages, drop notes, see history. The Contacts walkthrough \"The Contact Profile\" covers everything you'll find there.",
          m: "contacts-list", h: "contacts-table" },
      ]},

      { t: "Focus the View", i: "D", s: [
        { id: 8, t: "My Contacts (agents only)",
          d: "If you're an Agent, toggle My Contacts to show only the contacts assigned to you.",
          x: "Admins see every contact in the agency. Agents see everything by default but can flip the My Contacts toggle to focus on their own book. This is the right starting point for daily work — your tasks and your follow-ups are tied to your contacts.",
          m: "contacts-list", h: "contacts-toolbar" },
        { id: 9, t: "Pick a date range",
          d: "Click \"Pick a date range\" in the toolbar to limit the list to contacts created within a window.",
          x: "Useful for time-bounded reviews — \"every contact created this week\", \"every contact created during the AEP push\". Combine date range with a Saved Filter for a single-click view of the cohort you care about. The range applies to the contact's Created date, not their birthday.",
          tip: "Set the date range to today's date when triaging this morning's new leads — pair it with sort by Created Date descending to work them top-down.",
          m: "contacts-date-range", h: "contacts-toolbar" },
      ]},
    ],
  },

  "policyden-contacts-create": {
    title: "Create <em>a Contact</em>",
    description: "Add a new lead with PolicyDen's duplicate-detection flow. Search by phone first, see if the contact already exists, and only fill in details when you're sure you're not creating a duplicate.",
    department: "PolicyDen · Contacts",
    owner: "PolicyDen Training",
    effective: "April 2026",
    version: "1.0",
    mockupFn: "policyden",
    narration: [
      { audio: "assets/policyden/contacts/narration/create/section-a.mp3",
        transcript: "You can start a new contact from a few places. The Add Contact button on the Contacts page is the most direct. The Add new menu in the top bar lets you create from anywhere in PolicyDen — useful mid-call. There's also a plus icon next to the Contact column header in the list." },
      { audio: "assets/policyden/contacts/narration/create/section-b.mp3",
        transcript: "Step one is always a phone search. The first screen of the Add Contact flow asks for a phone number — the number you spoke to the client on. PolicyDen searches every contact in your agency, including their secondary phone numbers, before letting you create a new record. The search needs at least ten digits to run." },
      { audio: "assets/policyden/contacts/narration/create/section-c.mp3",
        transcript: "What happens next depends on what the search returned. If PolicyDen finds a match, you'll see existing contacts with that phone number — click one to open their profile instead of creating a duplicate. If no match is found, PolicyDen opens the create form with the phone field locked to what you searched." },
      { audio: "assets/policyden/contacts/narration/create/section-d.mp3",
        transcript: "Five fields are required to save a new contact: First Name, Last Name, Phone (which carries over from the search step), Date of Birth in MM-slash-DD-slash-YYYY format, and Medicare Number — the contact's MBI. Every other field is optional and can be filled in later from the profile." },
      { audio: "assets/policyden/contacts/narration/create/section-e.mp3",
        transcript: "After you click Add Contact, PolicyDen creates the record with a status of Lead, assigns it to you, shows a confirmation toast, and opens the new contact's profile. From there you can fill in email, address, gender, and custom fields — and start logging policies, tasks, and notes." },
    ],
    sections: [
      { t: "Where to Start", i: "A", s: [
        { id: 1, t: "Add Contact from the Contacts page",
          d: "Click Add Contact in the top-right of the Contacts page.",
          x: "The blue Add Contact button is the most direct path — visible whenever you're on the Contacts list. It opens the same modal regardless of which entry point you use, so you can pick whichever is closest to where you already are in the app.",
          m: "contacts-list", h: "add-contact-btn" },
        { id: 2, t: "Or use the top-bar quick-add",
          d: "The Add new menu in the top bar lets you create a contact from anywhere in PolicyDen.",
          x: "Useful mid-call when you're already deep in someone else's profile or reviewing the pipeline — you don't have to navigate back to Contacts first. The plus icon next to the Contact column header in the list opens the same flow.",
          tip: "When a brand-new lead calls in cold, hit the top-bar quick-add the moment they say their phone number — start the duplicate check before you've even said hello back.",
          m: "contacts-list", h: "contacts-toolbar" },
      ]},

      { t: "Search by Phone", i: "B", s: [
        { id: 3, t: "Enter the phone number",
          d: "Type the phone number you spoke to the client on into the Phone field.",
          x: "This is the number PolicyDen uses to check for an existing contact. Format doesn't matter — PolicyDen normalizes parentheses, dashes, and spaces — but the number must be at least ten digits to trigger the duplicate check.",
          m: "contacts-add-search", h: "phone-search" },
        { id: 4, t: "Run the search",
          d: "Click Search or press Enter.",
          x: "PolicyDen compares the number against every contact in your agency — primary phones AND secondary phones. The search runs against the agencies you belong to only; contacts in other agencies on the same PolicyDen tenant are not checked.",
          warn: "Don't skip the phone search. Duplicate contacts split history across two records and break commission attribution downstream — they're painful to clean up later.",
          m: "contacts-add-search", h: "phone-search" },
      ]},

      { t: "Match or No Match", i: "C", s: [
        { id: 5, t: "If a match is found",
          d: "PolicyDen lists every contact with that phone number. Click a result to open that contact's profile.",
          x: "Each row in the result list shows the contact's name and the status of their most recent policy — enough context to confirm \"yes, that's the same person.\" If you genuinely have two different people sharing a phone (rare but it happens — household member, an old number reassigned), tell your Admin so they can review.",
          m: "contacts-add-search", h: "phone-search" },
        { id: 6, t: "If no match is found",
          d: "PolicyDen opens the create form with the Phone field locked to the number you searched.",
          x: "The lock prevents accidentally typing a different number on the create form than the one you just verified didn't exist. If you really do need to enter a different phone, cancel and start the search over — don't try to work around the lock.",
          m: "contacts-add-create", h: "modal" },
      ]},

      { t: "Required Details", i: "D", s: [
        { id: 7, t: "Fill in the five required fields",
          d: "First Name, Last Name, Phone (locked from the search), Date of Birth, and Medicare Number.",
          x: "Format the Date of Birth as MM/DD/YYYY — type it or pick from the calendar. The Medicare Number is the contact's MBI; PolicyDen uppercases it automatically. Every other field on the contact (email, address, gender, custom fields) is optional at creation and can be added later from the profile.",
          tip: "If the prospect won't share their MBI on the first call, enter \"pending\" as a placeholder. Don't leave it blank — the system won't save without it. Update on the next call.",
          warn: "Double-check the DOB and MBI before saving. These drive eligibility and enrollment-period logic downstream, and editing them later triggers an audit log entry your Admin can see.",
          m: "contacts-add-create", h: "modal" },
      ]},

      { t: "After You Save", i: "E", s: [
        { id: 8, t: "Land on the contact's profile",
          d: "Click Add Contact. PolicyDen creates the record, assigns it to you, and opens the profile.",
          x: "Three things happen automatically: the contact's status is set to Lead, the assigned Agent is set to you, and a confirmation toast confirms the save. The next walkthrough — The Contact Profile — covers what to do with the profile once you're there.",
          m: "contacts-profile", h: null },
      ]},
    ],
  },

  "policyden-contacts-profile": {
    title: "The <em>Contact Profile</em>",
    description: "The single view for everything you track against one contact — quick actions in the header, contact details and clinical info on the right, and tabs for Documents, Notes, and History.",
    department: "PolicyDen · Contacts",
    owner: "PolicyDen Training",
    effective: "April 2026",
    version: "1.0",
    mockupFn: "policyden",
    narration: [
      { audio: "assets/policyden/contacts/narration/profile/section-a.mp3",
        transcript: "Click a contact's name anywhere it appears — in the contact list, in search, on a policy, or on a task — to open their profile. Every profile uses the same two-column layout: a header at the top, a tabbed workspace on the left, and contact details with collapsible sections on the right." },
      { audio: "assets/policyden/contacts/narration/profile/section-b.mp3",
        transcript: "The header has the contact's avatar, name, and a row of quick-action buttons. Add Policy opens the Add Policy modal pre-scoped to this contact. Calls drops into the calls widget. Add Note writes a note attached to this contact. Attachments uploads a document. These are your most-used actions — keep them at your fingertips." },
      { audio: "assets/policyden/contacts/narration/profile/section-c.mp3",
        transcript: "The right column has three collapsible sections. Contact Details holds first name, last name, email, phone, date of birth, gender, both addresses, Medicare number, and any custom fields your agency has defined — every field editable in place. Doctors lists the contact's providers, with an in-network flag on each. Medications lists their prescriptions, with a currently-taking flag." },
      { audio: "assets/policyden/contacts/narration/profile/section-d.mp3",
        transcript: "The left side of the profile has tabs for the per-record types you'll work with most. Documents is for files uploaded to the contact — enrollment forms, scope of appointment, signed paperwork. Notes is for longer, structured write-ups about the contact. History is the audit log — every change ever made to this record." },
      { audio: "assets/policyden/contacts/narration/profile/section-e.mp3",
        transcript: "More tabs are coming as PolicyDen rolls them out — Activities for the combined timeline of every interaction, Policies for the contact's plans, Tasks for follow-ups tied to this person, and Comments for short threaded notes between teammates. For now, the policies and tasks live on their own pages in the sidebar, and you can drill from there back to the contact profile." },
    ],
    sections: [
      { t: "Open a Profile", i: "A", s: [
        { id: 1, t: "Click the contact's name",
          d: "From any list, click the contact's name to open the profile.",
          x: "Profiles are the work surface for one person. The list is for triage; the profile is for action. Every page that mentions the contact — the Contacts list, search results, a policy, a task — has the contact's name as a clickable link straight into the profile.",
          m: "contacts-profile", h: null },
      ]},

      { t: "Header Quick Actions", i: "B", s: [
        { id: 2, t: "Add Policy",
          d: "Click Add Policy in the header to open the Add Policy modal pre-scoped to this contact.",
          x: "The contact's name and ID are already filled in — you only enter policy details. This is the right path to add a sale you just closed; the alternative entry from the main Policies page asks you to look up the contact again, which is slower.",
          m: "contacts-profile", h: null },
        { id: 3, t: "Calls and notes",
          d: "Use the Calls button to dial out from the contact's phone number, or Add Note to write a structured note.",
          x: "Calls opens the in-app dialer scoped to the contact — every call you place from here is automatically logged on the contact's record with a recording attached, so you don't have to remember to log it after the fact. Add Note is for longer write-ups (\"summary of the AEP review call\") that need a title and a body, attributed to whoever wrote it.",
          tip: "Put the why, not just the what, in your notes. \"Client said his wife handles the paperwork — call back after 5 PM\" is more useful to the next agent than \"Followed up.\"",
          m: "contacts-profile", h: null },
      ]},

      { t: "Right Column Details", i: "C", s: [
        { id: 4, t: "Contact Details",
          d: "First name, last name, email, phone, DOB, gender, both addresses, Medicare number, and custom fields.",
          x: "Every field in this section is editable in place — click a value, change it, save. Custom fields your agency has defined sit at the bottom of the section. Anything you can search and filter on in the Contacts list lives here, plus mailing address, gender, and the long-form fields you don't usually want as table columns.",
          warn: "Edits to the Date of Birth and Medicare Number are recorded in the History tab. Don't change them casually — set them right at create time when you can.",
          m: "contacts-profile", h: null },
        { id: 5, t: "Doctors",
          d: "A running list of the contact's providers, with an in-network flag for each.",
          x: "Useful during plan recommendations — when you're checking a Medicare Advantage plan's network, you can see which of the contact's doctors need to stay in-network at a glance. Click Add Doctor to add one. Track providers across plan changes — if a contact switches plans next AEP, this list is the starting point for the network check.",
          m: "contacts-profile", h: null },
        { id: 6, t: "Medications",
          d: "A running list of the contact's prescriptions, with a currently-taking flag.",
          x: "Critical for Part D and MAPD recommendations — formulary checks key off this list. Update it every time a medication changes. The currently-taking flag lets you keep a history (medications the contact USED to be on) without affecting the current formulary calculation.",
          tip: "Whenever a client tells you about a med change on a call, update this list before you hang up. Future-you doing the AEP review next year will thank present-you.",
          m: "contacts-profile", h: null },
      ]},

      { t: "Tabs", i: "D", s: [
        { id: 7, t: "Documents",
          d: "Files uploaded to the contact — enrollment forms, scope of appointment, signed paperwork.",
          x: "Drag and drop a file onto the upload zone, or click to browse. PolicyDen supports the common document types — PDF, DOCX, JPG, PNG. Every document is timestamped and attributed to whoever uploaded it. This is your compliance evidence trail; treat it like a permanent record.",
          m: "contacts-tab-docs", h: null },
        { id: 8, t: "Notes",
          d: "Longer, structured notes about the contact — each with a title and a body.",
          x: "Use Notes for client summaries, discovery call recaps, and context you'll want to find again later. Each note is attributed to whoever wrote it and timestamped. Notes live alongside Comments (short threaded conversations between teammates) — different tools for different jobs.",
          tip: "Title your notes like email subject lines — \"AEP review 2026 — moving to Aetna PPO\" is searchable; \"Notes\" is not.",
          m: "contacts-tab-notes", h: null },
        { id: 9, t: "History",
          d: "A chronological log of every change made to the contact.",
          x: "Who created the contact, who updated which field, when it was reassigned to a different agent, when the status changed — it's all here. Useful for auditing and for seeing what a teammate did without having to ask. If a contact's data looks wrong and you don't know how it got that way, History tells you.",
          m: "contacts-tab-history", h: null },
      ]},

      { t: "Coming Soon", i: "E", s: [
        { id: 10, t: "More tabs are on the way",
          d: "Activities, Policies, Tasks, and Comments are documented in the official guide and will appear here as they roll out.",
          x: "For now, view a contact's policies on the Policies page (filter by contact name) and their tasks on the Tasks page. Activities — the combined timeline of every interaction — is the most-requested addition. Watch the Magnolia release notes for when it lands.",
          m: "contacts-profile", h: null },
      ]},
    ],
  },

  "policyden-contacts-import": {
    title: "Import <em>Your Book</em>",
    description: "Bring an existing book of business into PolicyDen from a CSV or Excel file. Admins only — Agents can request that an Admin run the import for them.",
    department: "PolicyDen · Contacts",
    owner: "PolicyDen Training",
    effective: "April 2026",
    version: "1.0",
    mockupFn: "policyden",
    narration: [
      { audio: "assets/policyden/contacts/narration/import/section-a.mp3",
        transcript: "Imports are Admin-only. If you don't see the upload icon in the Contacts toolbar, ask your Admin to run the import for you. Before you start, make sure you have a CSV or Excel file with one row per contact, a header row, and values for every required field on every row. Six columns are required: First Name, Last Name, DOB, Phone, Medicare Number, and Agent Email." },
      { audio: "assets/policyden/contacts/narration/import/section-b.mp3",
        transcript: "On the Contacts page, click the upload icon in the toolbar to open the importer. If you don't have a file yet, click Download template — that gives you a CSV with the exact column headers PolicyDen expects, so you don't have to guess at field names." },
      { audio: "assets/policyden/contacts/narration/import/section-c.mp3",
        transcript: "Drag your CSV or Excel file onto the upload zone, or click it to browse. Files can be CSV or XLSX. If your Excel file has more than one sheet, choose which one to import from. Then map your columns. PolicyDen auto-matches columns it recognizes by name — for anything that didn't auto-match, pick the right file column for each PolicyDen field. Every required field must be mapped before you can continue." },
      { audio: "assets/policyden/contacts/narration/import/section-d.mp3",
        transcript: "Click Import Contacts. PolicyDen processes the file and shows you a summary when it's done — how many contacts were imported, how many rows were skipped, and per-row error messages for anything that failed. The new contacts appear in the list immediately." },
      { audio: "assets/policyden/contacts/narration/import/section-e.mp3",
        transcript: "If a row was skipped, the most common reasons are a missing required field or an Agent Email that doesn't match a user in your agency. Fix the bad rows in your file and re-upload only those rows. Duplicate detection on import is less strict than the Add Contact flow — if you're loading a list that might overlap with existing contacts, dedupe the file first." },
    ],
    sections: [
      { t: "Before You Start", i: "A", s: [
        { id: 1, t: "Make sure you're an Admin",
          d: "Imports are Admin-only. Agents don't see the upload icon.",
          x: "If you're an Agent and need to bring in a list, send the file to your Admin and let them run the import. Don't try to import contacts one by one through the Add Contact flow — that's tedious and error-prone for anything more than a handful of records.",
          m: "contacts-list", h: "contacts-toolbar" },
        { id: 2, t: "Prepare your file",
          d: "CSV (.csv) or Excel (.xlsx). One row per contact, plus a header row. Every required field filled on every row.",
          x: "Required fields: First Name, Last Name, DOB, Phone, Medicare Number, and Agent Email — six columns. Optional fields: email, gender, physical address, mailing address, plus any custom fields your agency has defined. Agent Email must match an existing PolicyDen user in your agency exactly — you can't import contacts assigned to people who haven't been invited yet.",
          tip: "Add the Agent users in Agency settings → Users BEFORE running the import. Otherwise every row assigned to a missing user will fail with an Agent Email error.",
          m: "contacts-list", h: "contacts-toolbar" },
      ]},

      { t: "Open the Importer", i: "B", s: [
        { id: 3, t: "Click the upload icon",
          d: "On the Contacts page, click the upload icon in the toolbar to open the importer.",
          x: "If you've never run an import for this agency, the first thing to do on the upload screen is click Download template — it gives you a CSV with the exact column headers PolicyDen expects. Use that as the starting point so you don't have to guess at field names. PolicyDen's importer is forgiving on column order, but exact column names match faster.",
          m: "contacts-list", h: "contacts-toolbar" },
      ]},

      { t: "Map Your Columns", i: "C", s: [
        { id: 4, t: "Upload your file",
          d: "Drag your CSV or Excel file onto the upload zone, or click to browse.",
          x: "If you uploaded an Excel file with more than one sheet, you'll be asked to pick which sheet to import from. CSV files skip this step. Files up to a few thousand rows process in seconds; larger files run in batches in the background — don't be alarmed if your full list doesn't appear in the contact list immediately after the import finishes.",
          m: "contacts-list", h: "contacts-toolbar" },
        { id: 5, t: "Map columns to PolicyDen fields",
          d: "PolicyDen auto-matches columns by name. For anything that didn't auto-match, pick the right file column for each PolicyDen field.",
          x: "Every required field must have a mapping before you can continue — Import is greyed out otherwise. Custom fields show up in the dropdown alongside system fields, so any extra columns your agency tracks (member ID, lead source, etc.) can be mapped in too.",
          warn: "Don't map two file columns to the same PolicyDen field. The importer accepts it but the second mapping silently overwrites the first.",
          m: "contacts-list", h: "contacts-toolbar" },
      ]},

      { t: "Run the Import", i: "D", s: [
        { id: 6, t: "Click Import Contacts",
          d: "PolicyDen processes the file and shows you a summary when it's done.",
          x: "Three numbers in the summary: Imported (new contacts created), Skipped (rows we couldn't import), and Issues (per-row error messages). For large files, the imported number ticks up as each batch finishes — don't close the browser tab until the import has visibly completed.",
          m: "contacts-list", h: "contacts-toolbar" },
        { id: 7, t: "Review the results",
          d: "Click Done to close the dialog and return to the Contacts page.",
          x: "The new contacts appear in the list immediately — they're sorted by Created Date so they're at the top. Spot-check a handful of records to make sure addresses, phone numbers, and Agent assignments look right. If anything's off, fix it inline in the list rather than re-running the import.",
          m: "contacts-list", h: null },
      ]},

      { t: "Troubleshooting", i: "E", s: [
        { id: 8, t: "Handle skipped rows",
          d: "Check the Issues list for the row number and reason, fix your file, and re-upload only the bad rows.",
          x: "Most skipped rows are one of two problems. A required field was empty (most often Medicare Number — it's a six-required-fields list and easy to miss) or the Agent Email didn't match a user in your agency. Confirm spelling and add missing users in Agency settings → Users before re-running. Re-importing rows that already imported successfully creates duplicates — only re-upload the bad ones.",
          warn: "Duplicate detection on import isn't as strict as the Add Contact flow. If you're importing a list that might overlap with your existing contacts, dedupe the file first using the existing book as the source of truth.",
          m: "contacts-list", h: null },
      ]},
    ],
  },

  "policyden-contacts-export": {
    title: "Export <em>Contacts</em>",
    description: "Pull contacts out of PolicyDen as a CSV. Choose between every matching contact or just the rows you've selected, pick which fields to include, and download the file on the fly.",
    department: "PolicyDen · Contacts",
    owner: "PolicyDen Training",
    effective: "April 2026",
    version: "1.0",
    mockupFn: "policyden",
    narration: [
      { audio: "assets/policyden/contacts/narration/export/section-a.mp3",
        transcript: "On the Contacts page, click the export icon in the toolbar — to the left of the import and Add Contact buttons. The export dialog opens with the current list scope already detected, so you can see at a glance how many contacts will be included." },
      { audio: "assets/policyden/contacts/narration/export/section-b.mp3",
        transcript: "Pick what to export. The All matching contacts option includes every contact that matches the current search, filters, date range, and My Contacts toggle — the counter shows the exact number. The Selected contacts option exports only the contacts you checked in the list. Selected is disabled until at least one contact is selected." },
      { audio: "assets/policyden/contacts/narration/export/section-c.mp3",
        transcript: "CSV is the only format. Pick the fields you want included. The system fields you see in the Contacts list — First Name, Last Name, Email, Phone, Date of Birth, Medicare Number — are selected by default. Search the field list to find a specific field, click Select All to include every field including custom fields, or Deselect All to start fresh." },
      { audio: "assets/policyden/contacts/narration/export/section-d.mp3",
        transcript: "Click Export. PolicyDen builds the file on the fly and your browser downloads contacts.csv. Each row in the file represents one contact, the columns match the fields you selected in the order you selected them, dates are formatted as MM-slash-DD-slash-YYYY, and empty values render as a single dash." },
    ],
    sections: [
      { t: "Open the Exporter", i: "A", s: [
        { id: 1, t: "Click the export icon",
          d: "On the Contacts page, click the export icon in the toolbar — to the left of the import and Add Contact buttons.",
          x: "The export dialog respects whatever filters and search you have active when you open it. If you change filters with the dialog open, close and reopen it to pick up the new list — this is a common gotcha that causes \"why is my export wrong\" questions.",
          tip: "Apply your filters and check the contact count BEFORE opening Export. The All counter in the dialog confirms how many contacts you're about to export — if it's not what you expected, close, fix the filters, and try again.",
          m: "contacts-list", h: "contacts-toolbar" },
      ]},

      { t: "Pick What to Export", i: "B", s: [
        { id: 2, t: "All matching contacts",
          d: "Exports every contact that matches the current search, filters, date range, and My Contacts toggle.",
          x: "The counter next to All shows exactly how many contacts will be included. This is the right choice for bulk reports — \"every contact in Texas created this year\", \"every contact assigned to me without a Medicare number\". Use filters to narrow first, then export All.",
          m: "contacts-list", h: null },
        { id: 3, t: "Selected contacts",
          d: "Exports only the contacts you've checked in the list (Admin only — Agents don't see selection checkboxes).",
          x: "Useful for cherry-picked exports — \"these five contacts I want to send to a referral partner\". The counter next to Selected shows how many rows you've picked. The option is disabled until at least one contact is selected.",
          m: "contacts-list", h: null },
      ]},

      { t: "Pick the Fields", i: "C", s: [
        { id: 4, t: "Default field set",
          d: "First Name, Last Name, Email, Phone, Date of Birth, and Medicare Number are selected by default.",
          x: "These are the same defaults you see in the Contacts list — enough to identify and contact every record without leaking any extra information. The chosen fields appear as pills above the list; click the × on a pill to remove it.",
          m: "contacts-list", h: null },
        { id: 5, t: "Add or change fields",
          d: "Search the field list to find a specific field. Click Select All to include every field including custom fields. Click Deselect All to start over.",
          x: "Every field your agency has defined as a custom field is available in the export, not only the system ones. The order in the file follows the order you selected them — not alphabetical, not the order they appear in the contact list. Useful when you're exporting for an external system that expects a specific column order.",
          tip: "If you're exporting for an external CRM or marketing tool, check that tool's import column order first, then select fields in PolicyDen in that exact order to skip the post-export reshuffle.",
          m: "contacts-list", h: null },
      ]},

      { t: "Download", i: "D", s: [
        { id: 6, t: "Click Export",
          d: "PolicyDen builds the file and your browser starts the download.",
          x: "The file is named contacts.csv. Each row represents one contact, columns match the fields you selected, dates use MM/DD/YYYY format, and empty values render as a single dash. UTF-8 encoding — open it in Excel, Numbers, Google Sheets, or any text editor without character corruption.",
          warn: "Treat exports as PHI. Never email a contacts.csv as a plain attachment. Use Magnolia's secure file-share for any export that leaves your machine.",
          m: "contacts-list", h: null },
      ]},
    ],
  },

  "policyden-contacts-bulk-actions": {
    title: "Bulk Actions <em>(Admin only)</em>",
    description: "Reassign or archive many contacts at once. Admins see selection checkboxes on every row; the bulk action bar appears as soon as one contact is selected.",
    department: "PolicyDen · Contacts",
    owner: "PolicyDen Training",
    effective: "April 2026",
    version: "1.0",
    mockupFn: "policyden",
    narration: [
      { audio: "assets/policyden/contacts/narration/bulk/section-a.mp3",
        transcript: "Bulk actions are Admin-only. Agents don't see the selection checkboxes or the bulk action bar. On the Contacts page, a checkbox column appears on the left of the table for Admins. Click the checkbox on any row to select that contact, or click the header checkbox to select every contact on screen. The bulk action bar slides up from the bottom as soon as one contact is selected." },
      { audio: "assets/policyden/contacts/narration/bulk/section-b.mp3",
        transcript: "To reassign contacts to a different Agent, click Assign in the bulk action bar. Pick the new Agent from the dropdown — the list includes every user in your agency. Click Assign to confirm. Every selected contact is reassigned, and the Agent column updates in the list. Only the Agent column changes; the contact's agency, status, policies, tasks, and history all stay the same." },
      { audio: "assets/policyden/contacts/narration/bulk/section-c.mp3",
        transcript: "To archive selected contacts, click Archive in the bulk action bar. Review the confirmation text and click Archive Contacts. Archived contacts disappear from the contact list, pipeline, reports, and other places they normally appear — but their policies, tasks, and messages stay on record. Archives can be reversed later. Use Archive when you're cleaning up leads that are no longer in play." },
      { audio: "assets/policyden/contacts/narration/bulk/section-d.mp3",
        transcript: "Don't use bulk archive to fix duplicate records. For one-off mistakes, archive from the individual contact's profile. Bulk archive is for batches — \"every lead from the cold-call campaign that didn't convert in 90 days\" — not for cleanup of a single bad record. Use saved filters to set up the cohort first, then bulk-archive what's left." },
    ],
    sections: [
      { t: "Select Contacts", i: "A", s: [
        { id: 1, t: "Click row checkboxes",
          d: "A checkbox column appears on the left of the table for Admins. Click any checkbox to select that contact.",
          x: "The bulk action bar slides up from the bottom of the screen as soon as one contact is selected. It shows how many contacts are selected and the actions available — Assign and Archive in this build.",
          m: "contacts-bulk-bar", h: null },
        { id: 2, t: "Or select every visible contact",
          d: "Click the checkbox in the table header to select every contact on the current page.",
          x: "If you want a specific cohort, narrow the list with search, filters, and date range first, then click the header checkbox to select what's left. The header checkbox selects only the rows visible on screen — paginate carefully if your filtered list is longer than one page.",
          tip: "Use Saved Filters to standardize cohort definitions across Admins. \"Cold leads, 90 days untouched\" should be one click for everyone, not a fresh filter setup every time.",
          m: "contacts-bulk-bar", h: null },
      ]},

      { t: "Reassign Agent", i: "B", s: [
        { id: 3, t: "Open the Assign dialog",
          d: "Click Assign in the bulk action bar.",
          x: "The Assign To dialog opens with a dropdown of every user in your agency. Pick the user you want the selected contacts reassigned to. The list shows users by name; if you're not sure who's who, hover the dropdown to see emails.",
          m: "contacts-assign-dialog", h: null },
        { id: 4, t: "Confirm the assignment",
          d: "Pick the new Agent and click Assign.",
          x: "Every selected contact is reassigned to that Agent. The Agent column in the contact list updates immediately. Only the Agent column changes — the contact's agency, status, policies, tasks, history, notes, and comments all stay the same. The reassignment is recorded in each contact's History tab so the change is auditable.",
          warn: "Reassigning contacts doesn't reassign their open tasks. If you're handing off an entire book to a new Agent, also reassign their tasks from the Tasks page — same bulk-action workflow.",
          m: "contacts-assign-dialog", h: null },
      ]},

      { t: "Archive", i: "C", s: [
        { id: 5, t: "Open the archive dialog",
          d: "Click Archive in the bulk action bar.",
          x: "The confirmation dialog tells you exactly how many contacts you're about to archive — read it. Archive is reversible (Admins can restore archived contacts), but it removes the contacts from the contact list, pipeline, reports, and other places they normally appear.",
          m: "contacts-archive-dialog", h: null },
        { id: 6, t: "Confirm the archive",
          d: "Review the confirmation text and click Archive Contacts.",
          x: "The selected contacts disappear from the active list immediately. Their policies, tasks, messages, and call logs stay on record — none of that history is deleted. Archive is the right tool when you want a contact off your active list but you're not ready to (or can't legally) delete them.",
          m: "contacts-archive-dialog", h: null },
      ]},

      { t: "When NOT to Use Bulk Archive", i: "D", s: [
        { id: 7, t: "Don't use bulk for one-off cleanup",
          d: "For a single bad record (a duplicate, a typo'd test contact), archive from the contact's profile instead.",
          x: "Bulk archive is for batches with a common reason — \"every lead from the September cold-call list that didn't convert in 60 days\". Setting up a Saved Filter for the cohort makes the bulk action repeatable for the next batch and auditable for compliance.",
          warn: "Never use bulk archive to fix duplicate contacts. Duplicates need a merge, not an archive — ask Magnolia operations for help with merges. Archiving a duplicate hides the problem instead of fixing it.",
          m: "contacts-archive-dialog", h: null },
      ]},
    ],
  },

};


/* ═══════════════════════════════════════════════════════════════════════════
   STATIC MOCKUP SCENES
   Each scene is an SVG string referenced by step.m. Highlight targets use
   data-hl="<id>" so the viewer can overlay a pulsing ring around the matching
   element. The two scenes below are generic enough to reuse across SOPs, but
   most new SOPs will want their own scenes — drop them in this object.
   ═══════════════════════════════════════════════════════════════════════════ */
window.MOCKUPS = {

  portal: `
    <svg viewBox="0 0 800 520" xmlns="http://www.w3.org/2000/svg" class="mockup-svg">
      <rect width="800" height="520" fill="#fafbfb"/>
      <rect width="800" height="44" fill="#f1f3f3"/>
      <circle cx="20" cy="22" r="5.5" fill="#ff5f57"/>
      <circle cx="40" cy="22" r="5.5" fill="#febc2e"/>
      <circle cx="60" cy="22" r="5.5" fill="#28c840"/>
      <rect data-hl="url-bar" x="100" y="12" width="600" height="24" rx="6" fill="#fff" stroke="#e2e5e5"/>
      <text x="116" y="28" font-family="Montserrat,sans-serif" font-size="12" fill="#666">portal.magnoliahealthcare.com/dashboard</text>
      <rect x="0" y="44" width="800" height="52" fill="#002a24"/>
      <text x="24" y="77" font-family="Playfair Display,serif" font-size="16" font-weight="600" fill="#fff" letter-spacing="1">MAGNOLIA <tspan fill="#d198b6">Portal</tspan></text>
      <text x="600" y="77" font-family="Montserrat,sans-serif" font-size="12" fill="rgba(255,255,255,.6)">Dashboard</text>
      <text x="700" y="77" font-family="Montserrat,sans-serif" font-size="12" fill="#fff">My Workspace</text>
      <rect data-hl="side-nav" x="0" y="96" width="200" height="424" fill="#fff" stroke="#eef1f1"/>
      <text x="24" y="128" font-family="Montserrat,sans-serif" font-size="10" font-weight="700" fill="#999" letter-spacing="1.4">WORKSPACES</text>
      <rect x="12" y="140" width="176" height="34" rx="6" fill="#056356" opacity="0.08"/>
      <rect x="12" y="140" width="3" height="34" fill="#056356"/>
      <text x="28" y="161" font-family="Montserrat,sans-serif" font-size="13" font-weight="600" fill="#056356">HR</text>
      <text x="28" y="195" font-family="Montserrat,sans-serif" font-size="13" fill="#444">Compliance</text>
      <text x="28" y="225" font-family="Montserrat,sans-serif" font-size="13" fill="#444">Sales</text>
      <text x="28" y="255" font-family="Montserrat,sans-serif" font-size="13" fill="#444">Customer Support</text>
      <text x="28" y="285" font-family="Montserrat,sans-serif" font-size="13" fill="#444">Operations</text>
      <text x="230" y="138" font-family="Playfair Display,serif" font-size="22" font-weight="700" fill="#111">Good afternoon,</text>
      <text x="230" y="168" font-family="Montserrat,sans-serif" font-size="13" fill="#666">You have 3 tasks assigned to you and 1 pending review.</text>
      <rect x="230" y="190" width="540" height="80" rx="10" fill="#fff" stroke="#eef1f1"/>
      <rect x="230" y="282" width="540" height="80" rx="10" fill="#fff" stroke="#eef1f1"/>
      <rect x="230" y="374" width="540" height="80" rx="10" fill="#fff" stroke="#eef1f1"/>
    </svg>
  `,

  "task-form": `
    <svg viewBox="0 0 800 520" xmlns="http://www.w3.org/2000/svg" class="mockup-svg">
      <rect width="800" height="520" fill="#fafbfb"/>
      <rect width="800" height="44" fill="#f1f3f3"/>
      <circle cx="20" cy="22" r="5.5" fill="#ff5f57"/>
      <circle cx="40" cy="22" r="5.5" fill="#febc2e"/>
      <circle cx="60" cy="22" r="5.5" fill="#28c840"/>
      <rect x="100" y="12" width="600" height="24" rx="6" fill="#fff" stroke="#e2e5e5"/>
      <text x="116" y="28" font-family="Montserrat,sans-serif" font-size="12" fill="#666">portal.magnoliahealthcare.com/hr/tasks/new</text>
      <rect x="0" y="44" width="800" height="52" fill="#002a24"/>
      <text x="24" y="77" font-family="Playfair Display,serif" font-size="16" font-weight="600" fill="#fff" letter-spacing="1">MAGNOLIA <tspan fill="#d198b6">Portal</tspan></text>
      <text x="32" y="136" font-family="Playfair Display,serif" font-size="22" font-weight="700" fill="#111">Tasks</text>
      <text x="32" y="160" font-family="Montserrat,sans-serif" font-size="12" fill="#666">HR workspace · 14 active tasks</text>
      <rect data-hl="new-task-btn" x="640" y="120" width="130" height="40" rx="20" fill="#056356"/>
      <text x="676" y="146" font-family="Montserrat,sans-serif" font-size="13" font-weight="700" fill="#fff">+ New Task</text>
      <rect x="32" y="186" width="738" height="300" rx="12" fill="#fff" stroke="#e8ebeb"/>
      <text x="56" y="220" font-family="Montserrat,sans-serif" font-size="11" font-weight="700" fill="#999" letter-spacing="1">CREATE NEW TASK</text>
      <g data-hl="form-fields">
        <text x="56" y="252" font-family="Montserrat,sans-serif" font-size="11" font-weight="600" fill="#444">TITLE <tspan fill="#c54040">*</tspan></text>
        <rect x="56" y="260" width="690" height="34" rx="6" fill="#f6f8f7" stroke="#e0e4e4"/>
        <text x="68" y="282" font-family="Montserrat,sans-serif" font-size="13" fill="#999">e.g. Onboard new hire paperwork</text>
        <text x="56" y="316" font-family="Montserrat,sans-serif" font-size="11" font-weight="600" fill="#444">CATEGORY <tspan fill="#c54040">*</tspan></text>
        <rect x="56" y="324" width="330" height="34" rx="6" fill="#f6f8f7" stroke="#e0e4e4"/>
        <text x="68" y="346" font-family="Montserrat,sans-serif" font-size="13" fill="#999">Select category…</text>
        <text x="416" y="316" font-family="Montserrat,sans-serif" font-size="11" font-weight="600" fill="#444">OWNER <tspan fill="#c54040">*</tspan></text>
        <rect x="416" y="324" width="330" height="34" rx="6" fill="#f6f8f7" stroke="#e0e4e4"/>
        <text x="428" y="346" font-family="Montserrat,sans-serif" font-size="13" fill="#999">Assign to…</text>
      </g>
      <rect x="56" y="438" width="110" height="36" rx="18" fill="#fff" stroke="#e0e4e4"/>
      <text x="90" y="461" font-family="Montserrat,sans-serif" font-size="12" font-weight="600" fill="#666">Cancel</text>
      <rect data-hl="submit-btn" x="636" y="438" width="110" height="36" rx="18" fill="#056356"/>
      <text x="671" y="461" font-family="Montserrat,sans-serif" font-size="12" font-weight="700" fill="#fff">Submit</text>
    </svg>
  `,

};


/* ══════════════════════════════════════════════════════════════════════
   Customer Service SOPs (CS-001 through CS-007) — appended to SOPS
   ══════════════════════════════════════════════════════════════════════ */
// Append CS SOPs into window.SOPS
Object.assign(window.SOPS, {

  "cs-001-inbound": {
    title: "Inbound <em>Customer Service</em>",
    description: "Two-tier member services call handling — Tier 1 (non-licensed) intake, verification, and routing; Tier 2 (licensed) benefits, claims, provider coordination, and escalation. The single authoritative standard for every inbound CS call.",
    department: "Customer Support",
    owner: "Yanick Bass",
    effective: "April 2026",
    version: "2.0",
    sections: [
      { t: "Call Initiation & Verification", i: "A", s: [
        { id:1, t:"Opening script",
          d:"Answer every call with the approved greeting — no improvisation.",
          x:"\"Good morning/afternoon, thank you for calling MyCareClub. My name is [Your First Name]. May I have your full name please?\" Use \"good morning\" before 12 PM ET, \"good afternoon\" after. Smile — tone carries over the phone.",
          tip:"Speak clearly at a conversational pace. If the caller is hard of hearing, offer to speak louder or more slowly." },
        { id:2, t:"Verify date of birth",
          d:"After obtaining the member's full name, ask for DOB.",
          x:"\"Thank you, [Member Name]. For verification purposes, can you please provide me with your date of birth?\" Request MM/DD/YYYY. Cross-reference against PolicyDen. If no match: \"Can you spell your first and last name for me?\" Do NOT proceed until identity is confirmed.",
          warn:"Never discuss any member information before identity is confirmed — this is a HIPAA requirement, not optional." },
        { id:3, t:"Verify zip code",
          d:"Confirm the zip code on file.",
          x:"\"And can you confirm the zip code on file for your account?\" Cross-reference against PolicyDen. If mismatch: \"Has your address changed recently?\" Update if confirmed." },
        { id:4, t:"Determine caller relationship",
          d:"Ask if the caller is the member or calling on behalf of someone.",
          x:"\"Are you the member, or are you calling on behalf of someone?\" If calling on behalf: \"Is the member available to give verbal authorization for me to discuss their information with you?\" If member is NOT available: \"I'm unable to discuss member information without their authorization. Can you have them call us, or can we schedule a three-way call?\"",
          warn:"A spouse, adult child, or caregiver has NO automatic right to a member's PHI. Never assume authorization based on relationship." },
      ]},
      { t: "Tier 1 Call Handling", i: "B", s: [
        { id:5, t:"Active listening & paraphrase",
          d:"Let the member explain their concern fully, then paraphrase back.",
          x:"After HIPAA verification, allow the member to speak without interruption. Then: \"So just to make sure I understand correctly, you're calling because [paraphrase]. Is that right?\" Wait for confirmation before proceeding.",
          tip:"Examples: \"…you haven't received your welcome packet yet\" / \"…you'd like to change your primary care doctor\" / \"…you have a question about what your plan covers.\"" },
        { id:6, t:"The Cardinal Rule: no benefits interpretation",
          d:"Tier 1 agents CANNOT interpret, explain, or advise on plan benefits. This is non-negotiable.",
          x:"If the member mentions benefits, coverage, copays, deductibles, formulary, claims, network status, or plan comparisons, you MUST transfer to Tier 2. Use this script: \"I want to make sure you get the most accurate information. I'm going to connect you with a licensed agent who can assist you further.\"",
          warn:"Do NOT try to answer benefits questions yourself. Do NOT say \"I think your plan covers…\" or look up benefits and relay them. Even if you find the answer, you are not licensed to interpret or relay it." },
        { id:7, t:"Tier 1 scope — what you CAN handle",
          d:"Welcome packets, ID cards, address updates, callback number updates, general account verification, scheduling callbacks, routing.",
          x:"Tier 1 handles general intake and administrative requests. For anything requiring a licensed response — benefits, claims, provider/network questions, cancellations, or complaints requiring resolution — transfer to Tier 2.",
          tip:"When in doubt, transfer. An unnecessary transfer is far less risky than an unlicensed benefits interpretation." },
      ]},
      { t: "Warm Transfer Protocol", i: "C", s: [
        { id:8, t:"Inform the member",
          d:"Tell the member you're connecting them with a licensed agent.",
          x:"\"I have a licensed agent available right now. I'm going to connect you. Please hold for just a moment.\" Place the member on a brief hold — use the hold button, not mute." },
        { id:9, t:"Deliver the handoff script",
          d:"Brief the Tier 2 agent with the full warm transfer script.",
          x:"\"Hi, this is [Your Tier 1 Name] from Member Services. I have [Member Name] on the line. Member has been HIPAA verified with full name, date of birth, and zip code. They're calling regarding [brief summary of the issue]. No escalation at this time. Can you assist?\" Wait for confirmation.",
          warn:"NEVER cold transfer a member. Cold transfers destroy trust and force the member to repeat their story. Every transfer must be warm with full context." },
        { id:10, t:"Reconnect and hand off",
          d:"Bring the member back and introduce the Tier 2 agent.",
          x:"\"[Member Name], I have [Tier 2 Agent Name] on the line. They'll be able to help you from here.\" Listen for acknowledgment from both parties, then disconnect. If no Tier 2 agent is available, schedule a callback: \"I apologize, but all of our licensed agents are currently assisting other members. I'd like to schedule a callback for you.\"" },
      ]},
      { t: "Tier 2 Call Handling", i: "D", s: [
        { id:11, t:"Tier 2 opening — warm transfer receipt",
          d:"Re-verify DOB even after Tier 1 verification. This is a security requirement.",
          x:"\"Hi [Member Name], thank you for holding. My name is [Your Tier 2 Name]. I understand you're calling about [issue]. Before I continue, I do need to quickly re-verify your information for security purposes. Can you confirm your date of birth?\" If DOB doesn't match, stop and re-verify full identity.",
          tip:"Reference the issue summary from Tier 1's handoff so the member knows you already have context — this builds confidence." },
        { id:12, t:"Benefits questions",
          d:"As a licensed agent, you are authorized to explain benefits, cost-sharing, and coverage details.",
          x:"Identify the specific question. Research using carrier portal or Summary of Benefits. Provide the answer with source: \"Based on your [Plan Name], [answer]. This is listed on your plan's Summary of Benefits document.\" If you cannot find the answer: \"I want to make sure you get the most accurate information on this. Let me connect you directly with [Carrier Name].\"" },
      ]},
      { t: "Claims & Provider Inquiries", i: "E", s: [
        { id:13, t:"Claims data gathering",
          d:"Collect all relevant claim information before contacting the carrier.",
          x:"Ask in sequence: (1) What type of appointment/procedure? (2) In-network or out-of-network? (3) Was any payment collected at time of service? (4) Do you have a bill or EOB — date of service and amount billed? Review the carrier portal for claim status (paid/denied/pending), amount billed, amount allowed, and member responsibility.",
          tip:"For denied claims, note the denial reason code. This is critical information for the carrier call." },
        { id:14, t:"Provider NPI verification",
          d:"When a provider's office calls about a member, confirm the NPI and relationship.",
          x:"\"Can you provide the provider's NPI number, please?\" Then: \"What is the provider's relationship to the member — PCP, specialist, or another type of provider?\" Verify the member's information through normal HIPAA verification before sharing anything.",
          warn:"Always verify the carrier number before dialing. Using the wrong carrier number wastes time and frustrates the member." },
        { id:15, t:"Three-way carrier call",
          d:"Connect the member directly to the carrier — stay on the line.",
          x:"\"Based on what I'm seeing, I'd like to connect you directly with [Carrier Name]'s claims department so they can review this in detail. I'll stay on the line to make sure you're connected properly. Is that okay?\" Call the carrier, stay through the IVR, confirm the member is connected before disconnecting." },
      ]},
      { t: "Documentation & Close", i: "F", s: [
        { id:16, t:"Final offer and closing",
          d:"Ask if there's anything else, then close with the approved statement.",
          x:"\"Is there anything else I can assist you with today?\" If no: \"Thank you for calling MyCareClub. Have a great day.\" If the additional request requires a different tier, follow the appropriate routing." },
        { id:17, t:"CRM documentation within 15 minutes",
          d:"Every single call requires a PolicyDen CRM entry — no exceptions.",
          x:"Document: Date/Time, Caller Name/Phone, DOB, ZIP, HIPAA Verified (Y/N), Call Type, Summary (2-3 sentences), Actions Taken (checkboxes), Outcome, Next Steps, Agent Name. For Tier 2, also include License # and Transfer Source.",
          warn:"100% documentation compliance is audited monthly. Undocumented calls create liability and prevent follow-up." },
      ]},
    ],
  },

  "cs-002-escalation": {
    title: "Escalation & <em>De-Escalation</em> Procedures",
    description: "Complete three-level escalation framework with exact scripts for de-escalation, supervisor takeover, abusive caller protocol, and formal grievance routing. Covers every scenario from simple frustration to CTM complaints.",
    department: "Customer Support",
    owner: "Yanick Bass",
    effective: "April 2026",
    version: "2.0",
    sections: [
      { t: "Recognize Escalation Triggers", i: "A", s: [
        { id:1, t:"Identify escalation trigger",
          d:"Know the six situations that trigger an escalation.",
          x:"An escalation is triggered when the member: (1) Directly requests a supervisor, (2) Expresses dissatisfaction with the resolution offered, (3) Complains about a previous agent's behavior, (4) Uses grievance or CTM language (\"I want to file a complaint,\" \"I'm calling Medicare\"), (5) Has a benefit misunderstanding the agent cannot resolve, (6) Insists on a different outcome after resolution attempt.",
          warn:"If the member uses CTM/grievance language, escalate to Level 3 immediately — do not attempt further Level 2 resolution." },
      ]},
      { t: "Level 1 Resolution Attempt", i: "B", s: [
        { id:2, t:"Acknowledge without defending",
          d:"Lead with empathy — do not defend, minimize, or contradict.",
          x:"\"I understand your concern, and I appreciate you bringing this to my attention. I want to make sure we get this right for you.\" Then attempt resolution: clarify the issue, offer a clear resolution within your authority, and use empathy throughout.",
          tip:"Empathy phrases: \"I can see why that would be frustrating.\" / \"That's a fair concern — let me look into this.\" / \"I want to make sure you're taken care of.\"" },
        { id:3, t:"Attempt save before escalating",
          d:"Offer to resolve before bringing in a supervisor.",
          x:"\"Before I bring in my supervisor, I want to see if I can resolve this right now. Would you be open to that?\" If the member agrees, attempt resolution. If they decline or remain insistent, proceed to Level 2 warm transfer." },
      ]},
      { t: "6-Step De-Escalation Verbiage", i: "C", s: [
        { id:4, t:"Steps 1-3: Acknowledge → Validate → Reassure",
          d:"Use these three steps in order when a member is upset or emotionally elevated.",
          x:"ACKNOWLEDGE: \"I understand your concern.\" / \"I can hear how frustrating that is.\" VALIDATE: \"That's definitely something we want to get clarified.\" / \"You're right to want an answer on this.\" REASSURE: \"I'm going to help get you to the right person.\" / \"Let's make sure this gets handled correctly.\"" },
        { id:5, t:"Steps 4-6: Set Expectation → Control → Transition",
          d:"Reduce uncertainty, steer the conversation, then smoothly hand off.",
          x:"SET EXPECTATION: \"I'm going to connect you with a specialist who can go over this in detail.\" / \"Here's what's going to happen next so you know exactly what to expect.\" CONTROL: \"I want to make sure I fully understand so I can get you the right help.\" / \"Let's take this step by step.\" TRANSITION: \"I'm going to bring in a specialist who can take a deeper look at this.\" / \"Let me connect you with my supervisor — they have the authority to help.\"",
          tip:"Do not skip steps even if the member seems calm. The full sequence builds trust methodically." },
      ]},
      { t: "Level 2 — Supervisor Takeover", i: "D", s: [
        { id:6, t:"Supervisor takeover script",
          d:"Use these exact words when taking over a call from an agent.",
          x:"\"Hi Mr./Ms. [Last Name], this is [Name], the Customer Service supervisor. I understand you've had some concerns about [brief issue]. First, I want to thank you for your patience and for allowing me to step in.\" Pause. Let the greeting land. Then: \"Before we move forward, I want to hear directly from you so I fully understand what happened.\" Let the member speak uninterrupted — do not cut in, correct, or defend.",
          warn:"Talking over the member defeats the purpose of 'hearing directly from you.' Silence is your tool during the takeover." },
      ]},
      { t: "A.C.T. Framework", i: "E", s: [
        { id:7, t:"A — Acknowledge",
          d:"Validate the member's feelings first.",
          x:"\"I can understand how that would be frustrating.\" / \"That makes sense why you'd feel that way.\" / \"I hear you, and I appreciate you explaining that to me.\" If the member doesn't feel heard, add: \"Tell me more about that.\"" },
        { id:8, t:"C — Clarify",
          d:"Repeat the issue back in simple terms. Correct misunderstandings gently.",
          x:"\"So if I understand correctly, the concern is [restate issue]. Is that right?\" If they correct you: \"Help me understand what I'm missing.\" Never argue — restate until they confirm you understand." },
        { id:9, t:"T — Take Ownership",
          d:"Shift to solution mode with clear action statements.",
          x:"\"Here's what I can do for you today.\" / \"Let's focus on getting this resolved.\" / \"I'm going to take personal responsibility for making sure this is handled.\" If the issue can be resolved: provide resolution, confirm satisfaction. If not: escalate to Level 3 or schedule follow-up with timeline.",
          tip:"Always end with: \"Does that address your concern, or is there something else I can help with?\"" },
      ]},
      { t: "Level 3 — Compliance & Grievance", i: "F", s: [
        { id:10, t:"Level 3 trigger language",
          d:"These phrases require immediate Level 3 escalation — no further Level 2 resolution.",
          x:"Immediate triggers: \"I want to file a grievance\" / \"I'm calling Medicare\" / \"I'm reporting you to CMS\" / \"I want this formally documented\" / \"I'm going to call the state insurance commission\" / \"This is a HIPAA violation\" / Any language suggesting a formal regulatory complaint.",
          warn:"Do NOT attempt to talk the member out of filing a grievance. Do NOT minimize the concern, promise a specific outcome, or admit fault or liability." },
        { id:11, t:"Formal handoff to Compliance",
          d:"Transfer to Compliance with full documentation.",
          x:"\"I take this very seriously, and I want to make sure this is handled through our formal process. I'm going to connect you with our compliance team who will ensure your concern is documented and addressed properly.\" Contact Compliance directly — do not email for initial contact. Provide: member name, issue summary, specific trigger language used, all CRM documentation." },
      ]},
      { t: "Abusive Caller Protocol", i: "G", s: [
        { id:12, t:"First warning",
          d:"Issue a clear verbal boundary when profanity, threats, or abusive language begins.",
          x:"\"I want to help you, but I cannot continue the call if profanity or threats continue.\" Document in CRM: \"Verbal abuse warning #1 given at [TIME].\" Continue the call if the member adjusts their behavior." },
        { id:13, t:"Final warning",
          d:"If abusive language continues after the first warning, issue the final warning.",
          x:"\"If the language continues, I will need to disconnect the call.\" Document: \"Final verbal abuse warning given at [TIME].\"" },
        { id:14, t:"Terminate call",
          d:"If behavior continues after two warnings, end the call.",
          x:"\"I'm ending this call now. A supervisor will follow up with you. Goodbye.\" Immediately document: Warning #1 time, Warning #2 time, Call Terminated time, Summary of behavior, Status: Pending Supervisor Review. The supervisor must review the incident within 24 hours — listen to recording, determine if pattern, decide next steps.",
          warn:"Always give TWO warnings before termination. One warning doesn't demonstrate good faith. Protocol is: Warning → Final Warning → Terminate." },
      ]},
      { t: "Documentation", i: "H", s: [
        { id:15, t:"CS Complaint/Escalation Form",
          d:"Every escalation call must generate a completed form.",
          x:"Required fields: Member Name/Phone/DOB/Policy#, Date/Time, Prepared By, Supervisor, Call Type (Member Escalation / Supervisor Call / Formal Grievance / CTM Risk / Abusive Caller), Primary Issue, Outcome (Resolved on Call / Pending Research / Grievance Filed / Transferred to Compliance / Call Terminated), Situation Overview, Member Complaint bullets, Compliance/Risk Notes, Documentation Checklist.",
          tip:"Outcome categories for every escalation: (1) Resolved on Call, (2) Pending Research — callback scheduled, (3) Grievance Filed & Under Investigation — formal process via Compliance." },
        { id:16, t:"CAP — Corrective Action Process",
          d:"CAP is triggered when a pattern of complaints is identified against a specific agent.",
          x:"QA reviews relevant calls → UNFOUNDED (no CAP) or FOUNDED → Compliance Notification Email → Coaching Session (Sales President + Team Lead) → Formal Documentation (deficiencies, targets, timeline, consequences) → Follow-Up Review → Improved (CAP closed) or Not Improved (progressive discipline per HR policy).",
          warn:"All escalation calls must be documented in BOTH CRM (PolicyDen) and Dialer (Convoso). Missing either creates gaps in the audit trail." },
      ]},
    ],
  },

  "cs-003-sms": {
    title: "SMS <em>Communication</em> & Documentation",
    description: "Standard operating procedure for all text-based member interactions — permitted uses, prohibited language, response templates, classification, agent notification, and PolicyDen documentation. SMS is a service channel, not a sales channel.",
    department: "Customer Support",
    owner: "Yanick Bass",
    effective: "April 2026",
    version: "1.0",
    sections: [
      { t: "SMS Basics & Hours", i: "A", s: [
        { id:1, t:"Response window and phone numbers",
          d:"All inbound SMS must receive a same-day response during business hours.",
          x:"Business hours: Monday–Friday, 9:00 AM – 6:00 PM ET. After-hours messages are responded to the next business day by 10:00 AM ET. Phone numbers: MyCareClub CS: 954-902-7248 / Magnolia CS: 954-686-3267. The SMS system is connected directly to member accounts — additional identity verification is NOT required for basic assistance.",
          tip:"Target average SMS response time is ≤30 minutes during business hours." },
        { id:2, t:"Check agent activity first",
          d:"Before responding, check the SMS thread history to see if a licensed agent already replied.",
          x:"If a licensed agent has already replied to the thread: CSR does NOT need to document — the agent owns the thread. Move on. If NO agent has replied: CSR owns the response. Proceed with your reply.",
          warn:"Duplicate responses confuse the member and waste CSR time. Always check thread history first." },
      ]},
      { t: "Permitted vs. Prohibited", i: "B", s: [
        { id:3, t:"Permitted SMS topics",
          d:"CSRs may discuss these topics via text.",
          x:"(1) ID card requests — send digital copy. (2) OTC card status — activation, balance. (3) PCP/network verification. (4) Basic coverage clarification — copays, deductibles, OOP max. (5) Provider list requests. (6) General plan confusion — help member understand what they have. (7) Enrollment change requests — redirect to agent only (do NOT process via SMS). (8) Opt-out requests — process and document." },
        { id:4, t:"Prohibited SMS content",
          d:"These topics are STRICTLY prohibited via SMS — redirect to a phone call with a licensed agent.",
          x:"Plan comparisons (sales activity), Plan recommendations (marketing), Sales discussions, Enrollment completion (requires recorded verbal consent), Plan switching (requires agent-led process), Marketing language (regulatory violation), Persuasive benefit discussions (framing benefits to influence decisions is sales).",
          warn:"Prohibited phrases include: \"You qualify for better benefits,\" \"There are new plans available,\" \"We can get you more coverage,\" \"You should switch,\" \"Your current plan doesn't cover as much as other options.\" Even if well-intentioned, these may be interpreted as marketing by regulators. Zero tolerance." },
      ]},
      { t: "Message Classification", i: "C", s: [
        { id:5, t:"Eight classification categories",
          d:"Classify every inbound SMS before responding — this drives the CRM tag and agent notification.",
          x:"(1) Response — member acknowledging prior outreach. (2) ID Card — needs digital ID copy. (3) Providers — provider list or PCP verification. (4) Coverage — copays, deductibles, OOP max. (5) Enrollment Change — cancellation, plan changes [ALWAYS notify agent]. (6) General — doesn't fit other categories. (7) Urgent — surgery, \"Call me ASAP\" [notify IMMEDIATELY]. (8) PHI — member sent sensitive info via text [redirect to phone].",
          tip:"If unsure between categories, choose the higher-risk one. Enrollment Change and Urgent always require agent notification." },
      ]},
      { t: "Response Templates", i: "D", s: [
        { id:6, t:"PHI received (Template 1)",
          d:"When a member sends sensitive personal information (SSN, bank info, medical records) via text.",
          x:"\"For your protection, we cannot review sensitive information by text. Your licensed agent will contact you directly.\" Follow-up: Notify agent via Slack immediately with Urgent classification." },
        { id:7, t:"Dissatisfied member / complaint filer (Template 2)",
          d:"When a member has filed a formal complaint against the agency.",
          x:"\"Mr./s. ___, I see you've submitted a complaint against our agency, and we are not permitted to contact nor communicate with you anymore. If you want further clarification, you can contact your carrier ___ for assistance. Thank you and have a wonderful day!\" Follow-up: Do NOT continue the conversation. Notify supervisor.",
          warn:"Once a complaint is filed, continued contact could worsen the situation. Send the template and stop all communication." },
        { id:8, t:"Enrollment-related & cancellation (Templates 4-5)",
          d:"Any request requiring a licensed agent, or explicit cancellation request.",
          x:"Enrollment: \"Let's talk, I will need to assist you directly. Please call me at your convenience. [CS Number]\" — Notify agent via Slack. Cancellation: \"[Member], we're sorry to see you go. We have put in the request to cancel the application. Have a great day!\" — Process per SOP-CS-005." },
        { id:9, t:"ID card, urgent callback, file sharing (Templates 7, 6, 8)",
          d:"Common templates for card requests, urgent callbacks, and suspicious links.",
          x:"ID Card: \"Hi [Member Name]. I've attached a digital copy of your Member ID for you to use. If you need anything else, feel free to reply here or reach out to my customer service team — [Agent Name]\" Urgent: \"Your agent will contact you shortly.\" [Notify Slack IMMEDIATELY — 1hr callback SLA] File/Link: \"Hi, thanks for sending that over. For security reasons, I'm unable to open links through this business text line. If you don't mind, please share a brief description of what the link contains.\"",
          warn:"NEVER click links sent by members — potential phishing/malware risk." },
        { id:10, t:"Welcome packet, wrong info, effective date (Templates 9-11)",
          d:"Templates for missing packets, plan discrepancies, and coverage start dates.",
          x:"Welcome Packet (>2 weeks): \"Thanks for letting me know. No problem at all — I'm going to put in a request to resend your documents right away. I've also attached a digital copy of your Member ID.\" Wrong Plan Info: \"Thank you for letting me know. Please call or text me at your convenience so I can review this with you and help correct any discrepancies with [Carrier].\" Effective Date: \"Hello! Your benefits will take effect on the 1st of [Month]. If you need your member ID before then or have any questions, please feel free to call or text me.\"" },
      ]},
      { t: "Agent Notification", i: "E", s: [
        { id:11, t:"Slack notification protocol",
          d:"Post in #mcc-agent-chat for every SMS requiring agent callback or review.",
          x:"Template: \"SMS Message | Member: [Name] Phone Number: [#] Issue: [1 sentence] Action Needed: [Callback/Review/Escalation/No Action] SMS tagged as: [Category]\" Mandatory when: classification is Enrollment Change, Urgent, or PHI; member requests their agent; issue is outside CSR scope.",
          tip:"For Urgent classifications: if no agent response in 15 minutes, @ mention the agent directly. If still no response in 30 minutes, escalate to supervisor." },
      ]},
      { t: "Documentation", i: "F", s: [
        { id:12, t:"PolicyDen note format",
          d:"Tag every CSR-handled SMS with one classification category and add a note.",
          x:"Note format: \"SMS - [Category] - [Action Taken] - Licensed agent notified via Slack on [Date]\" Examples: \"SMS - ID Card - Digital ID sent to member - Licensed agent notified via Slack on 04/27/2026\" / \"SMS - Coverage - Confirmed $0 copay for PCP visits - No agent notification needed\" If a licensed agent already responded before you reviewed, CSR does NOT need to document — agent owns it." },
      ]},
    ],
  },

  "cs-004-hipaa": {
    title: "HIPAA <em>Compliance</em> for Customer Service",
    description: "Protecting member information on every call — PHI identification, two-identifier verification, third-party authorization, minimum necessary rule, physical security, breach response, and QA integration with auto-fail triggers.",
    department: "Customer Support",
    owner: "Yanick Bass",
    effective: "April 2026",
    version: "1.0",
    sections: [
      { t: "What Is PHI", i: "A", s: [
        { id:1, t:"Protected Health Information defined",
          d:"PHI is any information that identifies a member AND relates to their health, treatment, or payment.",
          x:"Both conditions must be true. Examples: Name + Diagnosis = PHI. Member ID + Claims history = PHI. DOB + Medications = PHI. Name alone (no health info) = Not PHI but handle carefully. Critical nuance: Confirming that someone is a member of MyCareClub is itself a form of PHI — it links their identity to a health plan. Never confirm or deny membership to unverified callers.",
          warn:"HIPAA violations carry federal penalties up to $50,000 per incident, criminal prosecution for willful neglect, and CMS audit exposure. Most violations happen during normal, routine conversations." },
        { id:2, t:"Where PHI lives in your workflow",
          d:"PHI appears on your screen, in conversations, in call notes, in emails, and in your headset.",
          x:"PHI is not just in databases. It appears: on your screen (CRM records, carrier portals), in conversations (discussing a member's plan or health status), in call notes (CRM documentation), in emails (any correspondence referencing a member), in your headset (if others can hear). HIPAA applies everywhere, at all times." },
      ]},
      { t: "Identity Verification", i: "B", s: [
        { id:3, t:"The two-identifier rule",
          d:"Before discussing ANY PHI, verify at least TWO identifiers.",
          x:"Approved identifiers: (1) Full Name — \"Can you spell your first and last name for me?\" (2) Date of Birth — \"What is your date of birth?\" (3) Address or ZIP Code — \"What's your ZIP code?\" Script: \"Before I can access any account information, I need to verify your identity. Can you please provide your full name and date of birth?\" After both match: \"Thank you, [NAME]. I've verified your identity.\"",
          warn:"No exceptions. No shortcuts — even if you recognize the caller's voice. No single-identifier verification. No manager overrides. Repeat callers still verify every time." },
        { id:4, t:"Verification failure protocol",
          d:"If two identifiers fail, stop the call and disclose nothing.",
          x:"If ONE fails: ask for the third identifier. If it matches, proceed with caution and document the mismatch. If TWO fail: \"I'm sorry, but I'm unable to verify your identity with the information provided. For the security of our members, I'm not able to share any account details. If you believe this is an error, please call back with your member ID card handy.\" Do NOT hint at what was wrong — \"Your DOB doesn't match\" reveals you have a record.",
          warn:"Do NOT provide any PHI after verification failure. Document: \"Identity verification failed. No PHI disclosed.\"" },
      ]},
      { t: "Third-Party Authorization", i: "C", s: [
        { id:5, t:"Unauthorized third-party callers",
          d:"Family members, caregivers, and friends have no automatic right to PHI.",
          x:"If someone calls on behalf of a member and is NOT listed as an authorized representative: \"I understand you're calling on behalf of [MEMBER NAME], and I appreciate your concern. However, for the privacy and protection of our members, I'm unable to discuss account details without the member present on the call or a written authorization on file. Would you like information on how to set up an authorized representative?\"",
          tip:"Never assume authorization based on relationship. A spouse, adult child, or caregiver must be on file or have the member present to grant verbal permission." },
        { id:6, t:"Verbal authorization (member present)",
          d:"If the member is on the call, they can grant one-time verbal permission.",
          x:"(1) Verify the member's identity first (two identifiers). (2) Ask: \"[MEMBER NAME], can you confirm that you authorize me to discuss your account information with [THIRD-PARTY NAME] who is on the call with you?\" (3) Wait for clear verbal confirmation. (4) Document: \"Member verbally authorized [NAME] to participate in call. Authorization granted [DATE/TIME]. Verbal only — not permanent.\"",
          warn:"Verbal authorization is for THIS CALL ONLY. It does not carry forward unless formalized in writing." },
      ]},
      { t: "Minimum Necessary Rule", i: "D", s: [
        { id:7, t:"Share only what is needed",
          d:"Only access and share the minimum amount of PHI needed to accomplish the task at hand.",
          x:"If caller asks \"What's my deductible?\" → share deductible amount only, NOT claims history, diagnosis codes, or provider names. If caller asks \"Did you receive my enrollment?\" → share enrollment status only, NOT other members' info or internal notes. System access: only open records you're actively working on, close records when the call ends.",
          warn:"Never access your own account, a family member's, or a friend's account — this is a violation even if you don't share the information." },
      ]},
      { t: "Physical Security", i: "E", s: [
        { id:8, t:"Workstation and remote security",
          d:"Screen lock, password protection, headset use, and clean desk policy.",
          x:"Screen lock: auto-lock ≤5 minutes of inactivity, manual lock (Cmd+L / Win+L) when stepping away. Password sharing: NEVER, under any circumstances, including with IT or managers. Screen visibility: position monitor so it cannot be read by passersby. Printed PHI: secure in locked drawer, shred when done. Speakerphone: do NOT use when discussing PHI in shared spaces — use headset. Remote work: same standards apply — household members cannot see screen or hear PHI conversations.",
          tip:"End-of-shift checklist: all CRM records closed, screen locked, no printed PHI on desk, no sticky notes with member info, headset secured." },
      ]},
      { t: "Breach Response", i: "F", s: [
        { id:9, t:"Identify a breach",
          d:"A breach is any unauthorized use, disclosure, or access of PHI.",
          x:"Examples: sharing member's plan details with unauthorized family member, discussing a member's diagnosis with an uninvolved coworker, sending email with PHI to wrong recipient, leaving a member's record open on screen in an open office, looking up your own family member's account, accidentally opening the wrong record.",
          warn:"If you suspect PHI may have been improperly disclosed, treat it as a breach. Better to over-report than under-report." },
        { id:10, t:"Immediate breach response — STOP, don't fix, report",
          d:"Stop the action, do NOT attempt self-remediation, report immediately.",
          x:"Step 1: STOP — do not continue the action. Step 2: Do NOT attempt to fix it yourself — do not call the wrong recipient to ask them to \"forget\" what they heard, do not delete emails or alter records. Step 3: Report immediately to Team Lead AND Privacy Officer within the same shift. Complete the Breach Incident Report: Date/Time, Your Name, Members Affected, What Happened, How Discovered, Actions Taken. Step 4: Privacy Officer handles all next steps.",
          tip:"MyCareClub maintains a strict non-retaliation policy for good-faith breach reporting. You will never be punished for reporting." },
      ]},
      { t: "QA Integration", i: "G", s: [
        { id:11, t:"HIPAA & Authorization scoring (15 pts)",
          d:"The CSR QA Scorecard includes a dedicated HIPAA section worth 15 points.",
          x:"(1) Confirmed authorized representative if applicable — 5 pts. (2) Did NOT disclose PHI improperly — 5 pts. (3) Followed Minimum Necessary Rule — 5 pts." },
        { id:12, t:"Auto-fail triggers",
          d:"Any of these result in automatic failure of the entire QA evaluation regardless of other scores.",
          x:"Auto-fail conditions: (1) No identity verification performed — agent discussed PHI without verifying any identifiers. (2) Only 1 identifier used instead of required two. (3) PHI shared with unauthorized person. (4) Oversharing medical or claims data beyond what the caller requested. An auto-fail requires immediate coaching and re-training before the agent returns to the phones.",
          warn:"A second auto-fail within 90 days triggers a termination discussion with management." },
      ]},
    ],
  },

  "cs-005-cancellation": {
    title: "Policy <em>Cancellation</em> Prevention",
    description: "Supervisor-led save attempts and compliant cancellation processing. Every member who expresses intent to cancel receives a consultative, empathetic conversation — never blocking or pressuring. Carrier transfer protocol with approved terminology.",
    department: "Customer Support",
    owner: "Yanick Bass",
    effective: "April 2026",
    version: "1.0",
    sections: [
      { t: "Identify & Transfer", i: "A", s: [
        { id:1, t:"Recognize cancellation intent",
          d:"The moment a member mentions cancellation, warm-transfer to Supervisor.",
          x:"Trigger phrases: \"I want to cancel my plan\" / \"I need to cancel\" / \"How do I cancel?\" / \"I don't want this plan anymore.\" The moment you hear it, do NOT attempt to save the member yourself — this is a Supervisor-only conversation.",
          warn:"Untrained save attempts increase CTM risk. Agents may pressure, argue, or make promises they can't keep. Always transfer." },
        { id:2, t:"Agent bridge script",
          d:"Acknowledge the intent and explain the transfer.",
          x:"\"I understand you'd like to discuss canceling your plan. I want to make sure you speak with someone who can give you all the information you need. Let me connect you with my supervisor — they'll be able to help you through this. Can you hold for just a moment?\" Execute warm transfer: brief Supervisor with member name, reason, plan/carrier, DOB verified status." },
      ]},
      { t: "Supervisor Opening", i: "B", s: [
        { id:3, t:"Supervisor opening script",
          d:"Warm, professional, non-defensive. Exactly as written.",
          x:"\"Hi, this is [SUPERVISOR NAME]. Thanks for taking a moment to speak with me. I understand you're thinking about canceling your plan, and I just want to make sure you have all the information you need before moving forward.\" Pause. Then: \"Would you mind sharing what's been going on or what's making you consider canceling?\"",
          warn:"CRITICAL: LET THE MEMBER SPEAK. DO NOT INTERRUPT. Allow silence. Allow venting. Allow the full story. Take notes while they speak. Do not jump in with solutions until they have finished." },
        { id:4, t:"Confirm understanding",
          d:"Restate the member's concern to verify you heard correctly.",
          x:"\"Thank you for explaining that. I want to make sure I fully understand — it sounds like your main concern is [RESTATE IN MEMBER'S OWN WORDS]. Is that correct?\" Wait for confirmation. If they correct you, restate again until they agree." },
      ]},
      { t: "Discovery & Clarification", i: "C", s: [
        { id:5, t:"Identify trigger category",
          d:"Classify the reason internally — do not announce the category to the member.",
          x:"Categories: (1) Misinformation/Confusion — \"My agent lied to me,\" \"I didn't know this\" → Correct with facts. (2) Plan Issue (Solvable) — \"My doctor isn't covered,\" \"My card never came\" → Offer fix. (3) Complaint/Trust Broken — \"I want to file a complaint\" → SOP-CS-002 escalation + this SOP. (4) Life Change — \"I'm moving,\" \"I got employer coverage\" → Acknowledge and process. (5) Cost Concern — \"It costs too much\" → Offer alternatives.",
          tip:"Common trigger phrases: \"My agent lied to me,\" \"I didn't know this,\" \"I want to file a complaint.\" If complaint language appears, follow SOP-CS-002 IN ADDITION to this SOP." },
        { id:6, t:"Correct misinformation with facts",
          d:"If confusion is the trigger, provide clear factual correction from the carrier portal.",
          x:"\"I'm glad you brought that up, because I want to make sure you have the correct information before making any changes.\" Pull up Summary of Benefits or provider directory in real time. Walk through the specific area of confusion. After: \"Does that clear things up? I want to make sure you feel confident about what your plan actually covers before you make a decision.\"" },
      ]},
      { t: "Resolution Options", i: "D", s: [
        { id:7, t:"Match resolution to issue",
          d:"Offer concrete fixes: PCP reassignment, provider verification, medication review, carrier escalation.",
          x:"Wrong PCP: \"I can submit a PCP change for you right now. Who would you like?\" Provider not in network: \"Let me search your plan's network right now to verify.\" Medication not covered: \"Let me check your plan's drug formulary. If it's not covered, we can request a coverage exception.\" ID card missing: \"I'll request a replacement card and can text you a digital copy right now.\" Enrollment issue: \"Let me contact the carrier directly to get this corrected.\"",
          tip:"\"Would you like me to help fix this so you can continue using your plan as intended?\" If YES: execute. If NO: proceed to Consequence Disclosure." },
      ]},
      { t: "Consequence Disclosure", i: "E", s: [
        { id:8, t:"Coverage gap, re-enrollment, service interruption",
          d:"Before final cancellation, transparently explain consequences — no scare tactics.",
          x:"\"Before you make a final decision, I do want to share a couple of important things just so there are no surprises.\" Coverage gap: \"If the plan is canceled, there could be a gap in coverage depending on your situation.\" Re-enrollment: \"You may also need a qualifying reason to enroll in another plan right away.\" Service interruption: \"Anything like prescriptions or doctor visits may not be covered after the plan ends.\" Pre-effective-date: \"Since we're canceling before the start date, you will remain with your current plan.\"",
          warn:"Do NOT use scare tactics. \"You'll regret this\" or \"Are you SURE?\" is pressure and creates CTM risk. State facts neutrally, get acknowledgment, respect the decision." },
      ]},
      { t: "Final Decision & Processing", i: "F", s: [
        { id:9, t:"Final confirmation",
          d:"Ask once, then respect the decision.",
          x:"\"Based on everything we reviewed, do you still want to move forward with canceling your plan, or would you like help resolving the issue?\" Two paths: Member keeps plan → execute resolution, confirm contact info, set 7-day follow-up. Member confirms cancellation → proceed to carrier transfer." },
        { id:10, t:"Carrier transfer protocol",
          d:"Connect the member to the carrier via three-way call — never cold transfer.",
          x:"\"The next step is to connect you with your insurance carrier, since they handle the actual cancellation.\" Carrier numbers: Aetna 844-979-3435 / Aetna DSNP 866-409-1221 / Humana 800-285-7197 / UHC 800-711-0646 / UHC DSNP 866-842-4968. When carrier answers: \"Hi, this is [NAME] from MyCareClub. I have [MEMBER] on the line. They need to withdraw the application before the effective date.\"",
          warn:"Use APPROVED TERMINOLOGY: \"withdraw the application before the effective date\" — NOT \"cancel the policy\" or \"terminate coverage.\" Wrong terminology routes to the wrong carrier department." },
        { id:11, t:"CRM documentation",
          d:"Document everything within 15 minutes of call close.",
          x:"Include: Call Type (Cancellation Prevention — RETAINED or CANCELLED), Member name/DOB, Policy/Plan/Carrier, Original Concern, Confusion Present (Y/N), Correction Provided, Resolution Offered (Y/N), Resolution Accepted (Y/N), Consequences Disclosed (Y/N), Member Confirmed Understanding (Y/N), Carrier Transfer details, Outcome. For confirmed cancellations: flag RETENTION_OUTREACH for 30-day winback.",
          tip:"Every confirmed cancellation gets flagged for 30-day winback outreach. Missed flags = missed opportunities to re-engage." },
      ]},
    ],
  },

  "cs-006-qa": {
    title: "CSR <em>Quality Assurance</em> Scorecard",
    description: "100-point weighted scorecard across 7 categories with auto-fail layer, scoring tiers (Green 95-100, Yellow 90-94, Red <90), real evaluation examples, coaching triggers, and corrective action protocols. Every call may be evaluated without advance notice.",
    department: "Customer Support",
    owner: "Yanick Bass",
    effective: "April 2026",
    version: "1.0",
    sections: [
      { t: "Scorecard Overview", i: "A", s: [
        { id:1, t:"100-point evaluation framework",
          d:"Seven weighted categories plus an auto-fail layer. Every point is earned.",
          x:"Categories: (1) Greeting & Verification — 20 pts, (2) Reason for Call — 10 pts, (3) HIPAA & Authorization — 15 pts, (4) Resolution — 20 pts, (5) Documentation — 10 pts, (6) Call Handling & Professionalism — 15 pts, (7) Closing — 10 pts. Total: 100 points. If any auto-fail condition is triggered, final score = 0 regardless of other scores.",
          tip:"Scoring tiers: Green 95-100 = Top Performer. Yellow 90-94 = Meets CMS Standard. Red <90 or Auto-Fail = Non-Compliant." },
      ]},
      { t: "Greeting & Verification (20 pts)", i: "B", s: [
        { id:2, t:"Greeting and identity verification criteria",
          d:"Brand greeting (5 pts), Full Name (5 pts), DOB/2nd identifier (5 pts), Professional tone (5 pts).",
          x:"The greeting MUST include the brand name — \"Hello, how can I help you?\" without \"MyCareClub\" = 0. Both identifiers (name + DOB/2nd) are required — if the CSR only verifies one identifier, this is a Red Flag Auto-Fail. Tone bar: would you feel confident this person is handling your healthcare?",
          warn:"Only verifying ONE identifier is an auto-fail condition, not just a point deduction. This is the most consequential category." },
      ]},
      { t: "Reason for Call (10 pts)", i: "C", s: [
        { id:3, t:"Active listening and paraphrasing criteria",
          d:"No interruption (3 pts), Correctly paraphrased (4 pts), Proper probing questions (3 pts).",
          x:"Paraphrasing is the most commonly missed item. Simply saying \"okay\" and jumping to resolution is NOT paraphrasing. The CSR must restate: \"So what I'm hearing is you haven't received your welcome packet yet — is that right?\" Probing questions should narrow the problem — \"Tell me everything\" is not a probing question.",
          tip:"Paraphrasing was missed in 3 of 4 real evaluations. This is a team-wide training priority." },
      ]},
      { t: "HIPAA & Authorization (15 pts)", i: "D", s: [
        { id:4, t:"HIPAA compliance criteria",
          d:"Authorized rep confirmed (5 pts), No improper PHI disclosure (5 pts), Minimum Necessary Rule (5 pts).",
          x:"If the caller is the member, authorized rep = automatic 5/5. Minimum Necessary: if the caller asks about their deductible and the CSR also reads off their medication list unprompted, that's a violation even if the caller is verified. Any improper PHI disclosure is also an auto-fail." },
      ]},
      { t: "Resolution (20 pts)", i: "E", s: [
        { id:5, t:"Resolution quality criteria",
          d:"Correct resolution (10 pts), Correct process/transfer (5 pts), Explained next steps (5 pts).",
          x:"\"Correct resolution\" is verified against carrier portals. If the CSR says copay is $20 but it's $35, that's a 0. Warm transfers require staying on line, introducing both parties, providing context, and waiting for acknowledgment — anything less is not a warm transfer. Next steps must be specific: \"I'm submitting this to Blue Cross today. You should see it updated in 3-5 business days.\"",
          warn:"\"Someone will call you back\" without a specific timeframe = 0 on next steps. Always provide who, what, and when." },
      ]},
      { t: "Documentation (10 pts)", i: "F", s: [
        { id:6, t:"Documentation accuracy criteria",
          d:"Notes accurate & complete (5 pts), No excessive PHI documented (5 pts).",
          x:"Evaluator MUST review CRM notes in PolicyDen after listening to the call. \"Accurate\" means notes match reality — if CSR documented \"Caller satisfied, issue resolved\" but recording shows caller still confused, that's a 0. Excessive PHI violation: documenting \"Caller has diabetes and takes metformin\" when the call was about an address change." },
      ]},
      { t: "Call Handling (15 pts)", i: "G", s: [
        { id:7, t:"Professionalism and security criteria",
          d:"Customer name usage (3 pts), Professional tone/empathy (4 pts), No HIPAA-risk language (3 pts), No security violations (5 pts).",
          x:"Name usage: 0 times on a 10-minute call is a miss. 15 times is robotic. 2-4 natural uses is the sweet spot. Avoid: \"That's not my department,\" \"I can't help you,\" \"Your claim was denied because of your condition.\" Security: if the evaluator can hear another agent's call or the CSR discussing member info with a neighbor, that's a 0 on security." },
      ]},
      { t: "Closing (10 pts)", i: "H", s: [
        { id:8, t:"Closing criteria",
          d:"Issue resolved effectively (5 pts), Proper closing statement (3 pts), Asked if additional help needed (2 pts).",
          x:"\"Resolved effectively\" means the member knows what's happening next and who owns it — an effective escalation counts. Closing statement: \"Thank you for calling MyCareClub. Have a great day!\" The most commonly missed item is \"Is there anything else I can help you with today?\" — it takes 3 seconds and is worth 2 points.",
          tip:"\"Additional help needed\" was missed in 3 of 4 real evaluations. There is no reason to skip it." },
      ]},
      { t: "Red Flags & Auto-Fail", i: "I", s: [
        { id:9, t:"Auto-fail conditions (-40 pts → score becomes 0)",
          d:"Four red flag conditions override the total score to zero.",
          x:"(1) No identity verification — CSR proceeded without asking for any identifiers. (2) Only 1 identifier used — single-factor is insufficient. (3) PHI shared with unauthorized person — direct HIPAA violation. (4) Oversharing medical/claims data — volunteered details beyond what was requested. Additional triggers: unauthorized system access, documentation failure (no CRM entry), security violation (shared credentials, unlocked systems).",
          warn:"When a Red Flag is identified: evaluator stops, marks AUTO-FAIL, score = 0, immediately notifies CS Supervisor via Slack, incident logged in Red Flag Log, same-day corrective action initiated." },
      ]},
      { t: "Scoring & Coaching", i: "J", s: [
        { id:10, t:"Real evaluation examples",
          d:"Actual QA outcomes showing how the scorecard translates to scores.",
          x:"Absalon Tommy Ortiz — 68 (Red/Critical): missed warm transfer protocol, no closing statement, didn't inform member about transfer. Luis Jimenez — 89 (Red): no paraphrase, no \"additional help\" question, slightly rushed tone. Valeria Perez — 85 (Red): no paraphrase, no customer name usage, missed authorized rep check (near auto-fail). Vanessa Corona — 89 (Red): warm transfer incomplete (disconnected before acknowledgment), documentation gap.",
          tip:"Pattern analysis: paraphrasing missed in 3/4, \"additional help\" missed in 3/4, warm transfer protocol issues in 2/4. These are team-wide training priorities." },
        { id:11, t:"Coaching triggers and timeline",
          d:"The score decides whether coaching happens — no manager discretion required.",
          x:"90-94 (Yellow): verbal coaching within 5 business days. 80-89 (Red moderate): written coaching plan within 5 days, 2-3 focus areas. 70-79 (Red significant): 1:1 within 3 days + written action plan + follow-up eval in 2 weeks. <70 (Red critical): same-day 1:1 + 30-day PIP + daily monitoring. Auto-Fail: same-day meeting + written corrective action. 2 consecutive <90: formal performance review + daily monitoring. 2 auto-fails within 90 days: termination discussion.",
          warn:"Minimum 3 evaluations per CSR per month. New CSRs (first 90 days): weekly. CSRs on PIP: minimum 2 per week. No CSR skips evaluation regardless of track record." },
      ]},
    ],
  },

  "cs-007-scenarios": {
    title: "Call Scenario <em>Training</em> & Risk Assessment",
    description: "Eight pre-mapped call scenarios across three risk levels (Low, Moderate, High/Critical). For each scenario: the member's trigger statement, risk tier, approved response path, exact language to avoid, documentation requirements, and escalation criteria. No CSR should ever wonder what to do.",
    department: "Customer Support",
    owner: "Yanick Bass",
    effective: "April 2026",
    version: "1.0",
    sections: [
      { t: "Risk Framework", i: "A", s: [
        { id:1, t:"Three-tier risk model",
          d:"Every scenario has a risk level that dictates your response authority.",
          x:"LOW (Level 1): CSR has full authority — handle independently, standard documentation. MODERATE (Level 2): Proceed with caution — CTM risk emerging, language precision matters, enhanced documentation with exact language. HIGH (Level 3): CSR cannot resolve — contain, document exact words, escalate to Supervisor immediately. CRITICAL: Stop all discussion, triple escalation (Supervisor + Compliance + Carrier).",
          tip:"When in doubt, escalate UP. An unnecessary escalation costs nothing; a missed one can cost everything." },
      ]},
      { t: "Level 1 — Low Risk", i: "B", s: [
        { id:2, t:"Scenario 1: ID card status",
          d:"\"I haven't received my ID card.\" — LOW risk, handle independently.",
          x:"Verify identity → Check enrollment effective date in PolicyDen → Educate: \"ID cards are mailed by the carrier within 10-14 business days of your effective date.\" → If within timeframe: reassure. If past timeframe: request replacement + offer digital copy. Escalate to Tier 2 ONLY if card missing >21 business days, card has incorrect info, or enrollment can't be verified.",
          warn:"Do NOT say: \"The carrier is slow\" (blames carrier) or \"It should be there by Friday\" (guessing creates liability). Say: \"The standard timeframe is 10-14 business days from [DATE].\"" },
        { id:3, t:"Scenario 2: Transportation benefits",
          d:"\"Do I have transportation benefits?\" — LOW risk, provide general guidance.",
          x:"Verify identity → \"Many Medicare Advantage plans include transportation benefits for medical appointments. Your plan [does/may] include this benefit.\" → Direct to carrier for specifics: \"For the specifics — how many rides, how to schedule, any restrictions — contact your carrier directly. Would you like their number?\" Escalate to MODERATE if member disputes a promised benefit.",
          warn:"Do NOT give exact ride counts you're unsure of. \"You get 24 rides per year\" — what if they get 12? Say: \"Your carrier can confirm the exact number of rides included.\"" },
      ]},
      { t: "Level 2 — Moderate Risk", i: "C", s: [
        { id:4, t:"Scenario 3: Copay confusion",
          d:"\"I was told my visit would be free, but I got charged.\" — MODERATE, CTM risk emerging.",
          x:"Acknowledge WITHOUT admitting fault: \"I understand that's frustrating, and I want to help you get clarity on this.\" Gather details: visit type, date, who told them it would be free. Provide general explanation: \"Copays can vary depending on visit type, provider, and network status. Some visits — like annual wellness — are typically at no cost, while others may have a copay.\" Direct to EOC or carrier for charge review.",
          warn:"Do NOT say: \"The agent told you wrong\" (admits fault — CTM fuel), \"That was a mistake on our end\" (liability), \"You should have read your EOC\" (blames member). MONITOR for trigger phrases: \"I was misled,\" \"I want to file a complaint,\" \"Your agent lied\" → immediately shift to Scenario 7 (HIGH)." },
        { id:5, t:"Scenario 4: Provider not in network",
          d:"\"My doctor isn't covered.\" — MODERATE risk.",
          x:"Acknowledge: \"I understand how important your doctor is to you.\" Explain: \"Provider networks can change from year to year. This doesn't necessarily mean there was an error — networks do shift.\" Offer provider lookup: search directory by specialty and ZIP, provide 2-3 options. Offer carrier connection for verification. MONITOR for: \"I was told they were in-network\" or \"My agent promised this doctor\" → shift to Scenario 7 (HIGH).",
          warn:"Do NOT say: \"The agent should have checked\" (blames agent), \"That doctor was never in-network\" (sounds dismissive), \"There's nothing we can do\" (shuts down conversation)." },
      ]},
      { t: "Level 3 — High Risk", i: "D", s: [
        { id:6, t:"Scenario 5: \"I didn't consent to this plan\"",
          d:"Enrollment dispute — HIGH risk, immediate CTM. Stay neutral, do NOT investigate, escalate.",
          x:"\"I hear your concern, and I want to make sure this is handled properly.\" Do NOT pull up enrollment records, do NOT ask \"Are you sure?\", do NOT attempt to fix by offering a plan change. Escalate immediately: \"This is something I need to bring to my supervisor right away. Can you hold for just a moment?\" Document the member's EXACT WORDS — not a summary, not a paraphrase, their actual language. This is your most important job.",
          warn:"Do NOT say: \"Let me check who enrolled you\" (investigating), \"I see your enrollment right here\" (confrontational), \"Are you sure you didn't agree?\" (leading question — CMS violation risk)." },
        { id:7, t:"Scenario 6: Cancellation request",
          d:"\"I want to cancel my plan.\" — HIGH risk (retention + CTM). Warm transfer to Supervisor always.",
          x:"\"I understand. Before we proceed, I want to make sure you're connected with the right person to help.\" Transfer to Supervisor: \"Cancellation requests are handled by our supervisors to make sure everything is processed correctly.\" Only the Supervisor is authorized to use approved save language — CSRs do NOT attempt retention. If member insists on immediate cancellation: \"I respect your decision. Let me connect you with the carrier.\" Never block or delay.",
          warn:"Do NOT say: \"Can I ask why?\" in a challenging tone (sounds like blocking), \"You'll lose your coverage\" (scare tactic — CTM trigger), \"We can give you a better plan\" (CSR not authorized for retention)." },
        { id:8, t:"Scenario 7: Agent complaint — \"My agent lied to me\"",
          d:"HIGH risk — contain, do NOT validate or dismiss, escalate to Supervisor + Compliance.",
          x:"\"I'm sorry you're feeling that way. I want to make sure your concern is heard and addressed properly.\" Do NOT say \"Yes, that agent has had issues\" (validating) or \"I'm sure the agent didn't mean to\" (dismissing). Do NOT investigate — don't pull up enrollment recordings or ask member to prove their claim. Simply LISTEN if they volunteer info. Escalate: \"I'm going to connect you with my supervisor right now.\" Compliance notification required.",
          warn:"Document the EXACT ALLEGATION in verbatim quotes — \"Member was unhappy\" ≠ \"Member said: 'Your agent lied to me about my copay.'\" The exact words matter for compliance defense. Paraphrasing instead of quoting is the #1 documentation mistake on HIGH RISK calls." },
      ]},
      { t: "Critical Risk", i: "E", s: [
        { id:9, t:"Scenario 8: Unauthorized enrollment",
          d:"\"Someone signed me up without my permission.\" — CRITICAL: legal + CMS violation territory. Maximum response.",
          x:"THIS IS THE HIGHEST-SEVERITY SCENARIO. The moment a member alleges unauthorized enrollment, your ONLY job is to contain and route. \"I take this very seriously. I need to connect you with my supervisor and the carrier right away.\" Do NOT ask any investigative questions — not who, not when, not \"are you sure.\" If member volunteers info, write it down verbatim but do NOT prompt for more. Do NOT offer to cancel, switch, or \"look into it.\"",
          warn:"TRIPLE ESCALATION — ALL THREE MANDATORY: (1) Supervisor → warm transfer immediately. (2) Compliance → notification within 30 MINUTES. (3) Carrier → member MUST be connected to carrier dispute process. Preserve call recording — flag DO NOT DELETE. The only acceptable response: \"I'm connecting you with the people who can help resolve this.\"" },
        { id:10, t:"Risk upgrade monitoring",
          d:"Know when a LOW or MODERATE call becomes HIGH — trigger phrases are your alert system.",
          x:"Trigger phrases that upgrade ANY scenario to HIGH: \"I was misled\" / \"I want to file a complaint\" / \"Your agent lied to me\" / \"I'm going to report this\" / \"I didn't consent\" / \"Someone enrolled me without permission\" / \"I'm calling Medicare\" / \"I'm reporting you to CMS.\" The moment you hear these, STOP your current approach and shift to the HIGH RISK protocol: contain, document exact words, escalate.",
          tip:"Train yourself to hear trigger phrases reflexively. Monthly scenario quizzes test recognition speed. Target: ≥90% on quarterly assessment." },
      ]},
    ],
  },

  /* ═══════════════════════════════════════════════════════════════════════════
     CUSTOMER SUPPORT — QUICK-REFERENCE RESOURCES
     These render in the SOP viewer but are designed as lookup references,
     not procedural walkthroughs. Staff open → find what they need → close.
     ═══════════════════════════════════════════════════════════════════════════ */

  "cs-ref-carrier-contacts": {
    title: "Carrier <em>Contact Directory</em>",
    description: "Direct phone numbers for all Medicare Advantage carriers — member lines, non-member lines, and cancellation-specific numbers.",
    department: "Customer Support",
    owner: "Yanick Bass",
    effective: "April 2026",
    version: "1.0",
    sections: [
      { t: "Aetna", i: "A", s: [
        { id:1, t:"Aetna — Member & Non-Member Lines",
          d:"Member line and non-member line for standard Aetna inquiries.",
          x:"<strong>Members:</strong> 833-570-6670<br><strong>Non-Members:</strong> 833-859-6031" },
        { id:2, t:"Aetna — Cancellation Lines",
          d:"Separate lines for DSNP and standard cancellations.",
          x:"<strong>Aetna DSNP Cancellation:</strong> 866-409-1221<br><strong>Aetna Standard Cancellation:</strong> 844-979-3435<br><br>Use the phrase: <em>\"Withdraw application before the effective date.\"</em>",
          warn:"Never say 'cancel' to the carrier. Always say 'withdraw application before the effective date.'" },
      ]},
      { t: "Amerigroup & Anthem", i: "B", s: [
        { id:3, t:"Amerigroup",
          d:"Member and non-member lines for Amerigroup.",
          x:"<strong>Members:</strong> 833-713-1304<br><strong>Non-Members:</strong> 877-470-4131" },
        { id:4, t:"Anthem",
          d:"Member and non-member lines for Anthem.",
          x:"<strong>Members:</strong> 844-469-6744<br><strong>Non-Members:</strong> 800-238-1143" },
      ]},
      { t: "CarePlus & Centene", i: "C", s: [
        { id:5, t:"CarePlus",
          d:"Member and non-member lines for CarePlus.",
          x:"<strong>Members:</strong> 800-794-5907<br><strong>Non-Members:</strong> 877-831-9406" },
        { id:6, t:"Centene (Ascension)",
          d:"Member and non-member lines for Centene/Ascension.",
          x:"<strong>Members:</strong> 877-831-9406<br><strong>Non-Members:</strong> 877-831-9406" },
      ]},
      { t: "Cigna & Devoted", i: "D", s: [
        { id:7, t:"Cigna / HealthSpring",
          d:"Cigna and HealthSpring member and non-member lines.",
          x:"<strong>Cigna Members:</strong> 800-668-3813<br><strong>Cigna Non-Members:</strong> 855-982-6150<br><br><strong>HealthSpring Members:</strong> 800-668-3813<br><strong>HealthSpring Non-Members:</strong> 877-652-1739" },
        { id:8, t:"Devoted Health",
          d:"Single line for both members and non-members.",
          x:"<strong>Members & Non-Members:</strong> 800-385-0916" },
      ]},
      { t: "Humana", i: "E", s: [
        { id:9, t:"Humana — Member & Non-Member Lines",
          d:"Standard Humana inquiry lines.",
          x:"<strong>Members:</strong> 800-457-4708<br><strong>Non-Members:</strong> 800-833-2364" },
        { id:10, t:"Humana — Cancellation Line",
          d:"Dedicated cancellation line for Humana plans.",
          x:"<strong>Humana Cancellation:</strong> 800-285-7197<br><br>Use the phrase: <em>\"Withdraw application before the effective date.\"</em>",
          warn:"Never say 'cancel' to the carrier. Always say 'withdraw application before the effective date.'" },
      ]},
      { t: "United Healthcare", i: "F", s: [
        { id:11, t:"UHC — Member & Non-Member Lines",
          d:"Standard United Healthcare inquiry line.",
          x:"<strong>Members & Non-Members:</strong> 800-643-4845" },
        { id:12, t:"UHC — Cancellation Lines",
          d:"Separate cancellation lines for standard and DSNP.",
          x:"<strong>UHC Standard Cancellation:</strong> 800-711-0646<br><strong>UHC DSNP Cancellation:</strong> 866-842-4968<br><br>Use the phrase: <em>\"Withdraw application before the effective date.\"</em>",
          warn:"Never say 'cancel' to the carrier. Always say 'withdraw application before the effective date.'" },
      ]},
      { t: "Wellcare & People's Health", i: "G", s: [
        { id:13, t:"Wellcare",
          d:"Single line for Wellcare members and non-members.",
          x:"<strong>Members & Non-Members:</strong> 844-917-0175" },
        { id:14, t:"People's Health",
          d:"Separate lines for standard and DSNP.",
          x:"<strong>People's Health:</strong> 877-369-1907<br><strong>People's Health (D-SNP):</strong> 877-367-1803" },
      ]},
      { t: "Magnolia CS Lines", i: "H", s: [
        { id:15, t:"MyCareClub & Magnolia Internal Numbers",
          d:"Customer service department direct lines.",
          x:"<strong>MyCareClub CS:</strong> 954-902-7248<br><strong>Magnolia CS:</strong> 954-686-3267",
          tip:"Keep these numbers bookmarked. Members and agents both use them for inbound support." },
      ]},
    ],
  },

  "cs-ref-complaint-form": {
    title: "CS Complaint & <em>Escalation Form</em>",
    description: "Standardized documentation template for all escalation calls — fill out every field for Level 2+ escalations.",
    department: "Customer Support",
    owner: "Yanick Bass",
    effective: "April 2026",
    version: "1.0",
    sections: [
      { t: "Call Summary", i: "A", s: [
        { id:1, t:"Member & Call Info",
          d:"Record the member name, date, and who prepared this form.",
          x:"<strong>Member:</strong> [Full Name]<br><strong>Date of Call:</strong> [MM/DD/YYYY]<br><strong>Prepared By:</strong> [Your Name]" },
        { id:2, t:"Call Type",
          d:"Classify the call type.",
          x:"Select one:<br>• Member escalation / customer service supervisor call<br>• Agent behavior complaint<br>• Benefit misunderstanding<br>• Service-related concern" },
        { id:3, t:"Primary & Secondary Issue",
          d:"Document the main issue and any secondary issues.",
          x:"<strong>Primary Issue:</strong> What the call is about — one sentence.<br><strong>Secondary Issue:</strong> (If applicable) — any additional concern raised during the call.<br><strong>Outcome:</strong> The solution presented or action taken." },
      ]},
      { t: "Situation & Complaint", i: "B", s: [
        { id:4, t:"Situation Overview",
          d:"Write a narrative summary of what happened on the call.",
          x:"Write 2-4 sentences summarizing the full context. Include: how the call started, what the member described, what you discovered, and what actions you took.",
          tip:"Write this while the call is fresh. Waiting even 30 minutes degrades accuracy." },
        { id:5, t:"Member Complaint",
          d:"Document the specific complaints in bullet-point format.",
          x:"<strong>Primary Complaint:</strong><br>• [Bullet point — member's exact words when possible]<br>• [Bullet point]<br><br><strong>Secondary Complaint:</strong> (If applicable)<br>• [Bullet point]",
          warn:"Use the member's EXACT words for complaint language. This is critical for CTM defense." },
        { id:6, t:"Key Findings During the Call",
          d:"Document what you discovered while investigating.",
          x:"<strong>Discovery:</strong><br>• What did you find when you checked the account?<br>• Was the member's concern valid or based on a misunderstanding?<br>• Were there any system errors, agent mistakes, or carrier issues?" },
      ]},
      { t: "Resolution & Compliance", i: "C", s: [
        { id:7, t:"Member Decision & Resolution",
          d:"Document the solution presented and the member's choice.",
          x:"What solution was presented and the choice the member made:<br>• Was the issue resolved on the call?<br>• Did the member accept the resolution?<br>• Was a follow-up scheduled?<br>• Was the member transferred to the carrier?" },
        { id:8, t:"Compliance / Risk Notes",
          d:"Flag any compliance concerns or coaching needs.",
          x:"Document any findings that would make the situation a compliance risk:<br>• Did the AOR (Agent of Record) make an error?<br>• Is coaching necessary for the agent?<br>• Does this require a formal CTM report?<br>• Should QA review the original enrollment call?",
          warn:"If you identify a compliance risk, notify the Compliance Department immediately — do not wait for the form to be filed." },
      ]},
    ],
  },

  "cs-ref-qa-scorecard": {
    title: "CSR QA <em>Scorecard</em> 2026",
    description: "100-point weighted scorecard with all 7 categories, point values, auto-fail triggers, and scoring tiers.",
    department: "Customer Support",
    owner: "Yanick Bass",
    effective: "April 2026",
    version: "1.0",
    sections: [
      { t: "Greeting & Verification (20 pts)", i: "A", s: [
        { id:1, t:"Scorecard criteria — 4 items, 20 points total",
          d:"Opening verification is the highest-weighted single category.",
          x:"<strong>Used approved greeting (Brand name):</strong> 5 pts<br><strong>Verified FULL NAME:</strong> 5 pts<br><strong>Verified DOB or 2nd identifier:</strong> 5 pts<br><strong>Professional opening tone:</strong> 5 pts" },
      ]},
      { t: "Reason for Call (10 pts)", i: "B", s: [
        { id:2, t:"Scorecard criteria — 3 items, 10 points total",
          d:"Active listening and issue identification.",
          x:"<strong>Actively listened (no interruption):</strong> 3 pts<br><strong>Correctly paraphrased issue:</strong> 4 pts<br><strong>Proper probing questions asked:</strong> 3 pts" },
      ]},
      { t: "HIPAA & Authorization (15 pts)", i: "C", s: [
        { id:3, t:"Scorecard criteria — 3 items, 15 points total",
          d:"HIPAA compliance is weighted heavily with auto-fail potential.",
          x:"<strong>Confirmed authorized representative (if applicable):</strong> 5 pts<br><strong>Did NOT disclose PHI improperly:</strong> 5 pts<br><strong>Followed Minimum Necessary Rule:</strong> 5 pts",
          warn:"Any HIPAA failure in this section can ALSO trigger an auto-fail Red Flag, resulting in a score of 0 regardless of other points." },
      ]},
      { t: "Resolution (20 pts)", i: "D", s: [
        { id:4, t:"Scorecard criteria — 3 items, 20 points total",
          d:"Providing the correct answer carries the single highest point value (10 pts).",
          x:"<strong>Provided correct resolution:</strong> 10 pts<br><strong>Followed correct process (transfer/callback):</strong> 5 pts<br><strong>Explained next steps clearly:</strong> 5 pts" },
      ]},
      { t: "Documentation (10 pts)", i: "E", s: [
        { id:5, t:"Scorecard criteria — 2 items, 10 points total",
          d:"Notes accuracy and PHI control in documentation.",
          x:"<strong>Notes are accurate & complete:</strong> 5 pts<br><strong>No excessive PHI documented:</strong> 5 pts" },
      ]},
      { t: "Call Handling & Professionalism (15 pts)", i: "F", s: [
        { id:6, t:"Scorecard criteria — 4 items, 15 points total",
          d:"Tone, empathy, and security throughout the call.",
          x:"<strong>Used customer's name appropriately:</strong> 3 pts<br><strong>Professional tone & empathy:</strong> 4 pts<br><strong>Avoided negative/HIPAA-risk language:</strong> 3 pts<br><strong>No security violations observed:</strong> 5 pts" },
      ]},
      { t: "Closing (10 pts)", i: "G", s: [
        { id:7, t:"Scorecard criteria — 3 items, 10 points total",
          d:"Proper wrap-up and offer of additional help.",
          x:"<strong>Resolved issue effectively:</strong> 5 pts<br><strong>Proper closing statement used:</strong> 3 pts<br><strong>Asked if additional help needed:</strong> 2 pts" },
      ]},
      { t: "Red Flag / Auto-Fail (-40 pts)", i: "H", s: [
        { id:8, t:"Auto-fail triggers — ANY of these = score of 0",
          d:"These override all other scoring. One violation = automatic non-compliance.",
          x:"<strong>Auto-Fail Conditions:</strong><br>• No identity verification performed<br>• Only 1 identifier used (must use 2)<br>• PHI shared with unauthorized person<br>• Oversharing medical or claims data<br><br><strong>Additional auto-fail triggers:</strong><br>• Unauthorized access to member account<br>• Documentation failure (no notes at all)<br>• Security violation observed",
          warn:"Auto-fail is CAREER-DEFINING. There is no partial credit — if any of these occur, the score is 0 and immediate coaching is triggered." },
      ]},
      { t: "Scoring Tiers", i: "I", s: [
        { id:9, t:"Performance tiers and what they mean",
          d:"Three tiers determine coaching and recognition actions.",
          x:"<strong>🟢 Green — Top Performer:</strong> 95–100%<br>Recognition, peer mentoring eligibility.<br><br><strong>🟡 Yellow — Meets CMS Standard:</strong> 90–94%<br>On track. Targeted coaching on missed areas.<br><br><strong>🔴 Red — Non-Compliant:</strong> <90% OR Auto-Fail<br>Mandatory coaching session. Corrective Action Plan if pattern continues." },
      ]},
    ],
  },

  "cs-ref-deescalation": {
    title: "De-Escalation <em>Verbiage Card</em>",
    description: "Quick-reference: the 6-step de-escalation framework with exact phrases for each step. Print and keep at your desk.",
    department: "Customer Support",
    owner: "Yanick Bass",
    effective: "April 2026",
    version: "1.0",
    sections: [
      { t: "The 6 Steps", i: "A", s: [
        { id:1, t:"Step 1 — ACKNOWLEDGE (without admitting fault)",
          d:"Show the member you hear them.",
          x:"<em>\"I understand your concern.\"</em><br><em>\"I can hear how frustrating that is.\"</em><br><em>\"I understand why you're calling about this.\"</em>",
          tip:"Match the member's energy level — don't be overly cheerful when they're upset, but don't match anger either." },
        { id:2, t:"Step 2 — VALIDATE (controlled empathy)",
          d:"Affirm their reason for calling without agreeing with accusations.",
          x:"<em>\"That's definitely something we want to get clarified.\"</em><br><em>\"I'm glad you called so we can look into this.\"</em>" },
        { id:3, t:"Step 3 — REASSURE (shift to solution)",
          d:"Move the conversation from problem to resolution path.",
          x:"<em>\"I'm going to help get you to the right person who can review this with you.\"</em><br><em>\"Let's make sure this gets handled correctly.\"</em><br><em>\"I'll make sure this is addressed properly.\"</em>" },
        { id:4, t:"Step 4 — SET EXPECTATION (reduce uncertainty)",
          d:"Tell them what happens next so they don't feel lost.",
          x:"<em>\"I'm going to connect you with a specialist who can go over this in detail.\"</em><br><em>\"They'll be able to review your specific benefits and provide accurate information.\"</em><br><em>\"This may take a few moments, but I'll stay with you while we get you connected.\"</em>" },
        { id:5, t:"Step 5 — CONTROL THE CONVERSATION (when emotions rise)",
          d:"Gently redirect when the member is spiraling or repeating.",
          x:"<em>\"I want to make sure I fully understand so I can get you the right help.\"</em><br><em>\"Let's take this step by step so we can resolve it.\"</em><br><em>\"I'm here to help, and I want to make sure we handle this the right way.\"</em>" },
        { id:6, t:"Step 6 — TRANSITION TO ESCALATION (smooth handoff)",
          d:"Bridge to the specialist or supervisor without making it feel like you're passing them off.",
          x:"<em>\"I'm going to bring in a specialist who can take a deeper look at this.\"</em><br><em>\"I'll connect you now so we can get this resolved.\"</em>" },
      ]},
      { t: "Supervisor A.C.T. Framework", i: "B", s: [
        { id:7, t:"A — Acknowledge",
          d:"Supervisor acknowledges the member's frustration.",
          x:"<em>\"I can understand how that would be frustrating.\"</em><br><em>\"That makes sense why you'd feel that way.\"</em>" },
        { id:8, t:"C — Clarify",
          d:"Repeat the issue back in simple terms and gently correct misunderstandings.",
          x:"Repeat the issue back: <em>\"So what I'm hearing is…\"</em><br>Correct gently: <em>\"Let me clarify what your plan actually covers…\"</em>" },
        { id:9, t:"T — Take Ownership",
          d:"Commit to a resolution path.",
          x:"<em>\"Here's what I can do for you today.\"</em><br><em>\"Let's focus on getting this resolved.\"</em>" },
      ]},
    ],
  },

  "cs-ref-sms-templates": {
    title: "SMS Response <em>Templates</em>",
    description: "All 12 approved SMS templates — copy, customize the bracketed fields, and send.",
    department: "Customer Support",
    owner: "Yanick Bass",
    effective: "April 2026",
    version: "1.0",
    sections: [
      { t: "Safety & Compliance", i: "A", s: [
        { id:1, t:"PHI Received (member sends DOB, SSN, banking info)",
          d:"Redirect immediately to phone — never engage with PHI over text.",
          x:"<em>\"For your protection, we cannot review sensitive information by text. Your licensed agent will contact you directly.\"</em>",
          warn:"All PHI-related SMS interactions MUST be documented in PolicyDen." },
        { id:2, t:"Dissatisfied Member / Complaint Filer",
          d:"Cease contact with members who have filed a formal complaint.",
          x:"<em>\"Mr./Ms. ___, I see you've submitted a complaint against our agency, and we are not permitted to contact nor communicate with you anymore. If you want further clarification, you can contact your carrier ___ for assistance. Thank you and have a wonderful day!\"</em>",
          warn:"Once a member has filed a complaint, you CANNOT communicate with them. Any further contact is a compliance violation." },
        { id:3, t:"File Sharing / Possible Spam Link",
          d:"Never open links sent via SMS — redirect to phone.",
          x:"<em>\"Hi, thanks for sending that over. For security reasons, I'm unable to open links through this business text line. If you don't mind, please share a brief description of what the link contains, or you can contact our customer service team 954-686-3267 directly for further assistance.\"</em>" },
      ]},
      { t: "Member Identity & Enrollment", i: "B", s: [
        { id:4, t:"\"Don't Know You\" Response",
          d:"When a member doesn't recognize who is contacting them.",
          x:"<em>\"Hi [MEMBER], this is [AGENT] — the licensed agent who helped you enroll in your [CARRIER] plan with (My CareClub / Magnolia Health). We spoke on the phone before your [Month] 1st effective date, and I sent your enrollment confirmation code _____. If you'd prefer, you can call our office directly at 954-902-7248 to confirm it's me. I just wanted to make sure your coverage is working well for you.\"</em>" },
        { id:5, t:"Enrollment-Related Texts (plan change, enrollment, benefit mod)",
          d:"Always redirect enrollment actions to phone — never handle over SMS.",
          x:"<em>\"Let's talk, I will need to assist you directly. Please call me at your convenience. [CS Number]\"</em>" },
        { id:6, t:"When Will My Plan Start?",
          d:"Effective date inquiry.",
          x:"<em>\"Hello! Your benefits will take effect on the 1st of [Month]. If you need your member ID before then or have any questions, please feel free to call or text me at [CS Number]. I'm happy to help.\"</em>" },
      ]},
      { t: "Service Requests", i: "C", s: [
        { id:7, t:"Member ID Card Request",
          d:"Attach digital copy and direct to CS team.",
          x:"<em>\"Hi [Member Name]. I've attached a digital copy of your Member ID for you to use. If you need anything else, feel free to reply here or reach out to my customer service team — [Agent Name]\"</em>" },
        { id:8, t:"Welcome Packet Missing (over 2 weeks)",
          d:"Acknowledge, request resend, attach digital ID.",
          x:"<em>\"Thanks for letting me know. No problem at all — I'm going to put in a request to resend your documents right away. I've also attached a digital copy of your Member ID for you to use. If you need anything else, feel free to reply here or reach out to my customer service team — [Agent Name]\"</em>" },
        { id:9, t:"Plan Information Received But Incorrect",
          d:"Redirect to phone/text for review.",
          x:"<em>\"Thank you for letting me know. Please call or text me at your convenience so I can review this with you and help correct any discrepancies with [Carrier].\"</em>" },
      ]},
      { t: "Callbacks & Cancellations", i: "D", s: [
        { id:10, t:"Urgent / Callback Requests",
          d:"Simple acknowledgment — agent will follow up.",
          x:"<em>\"Your agent will contact you shortly.\"</em>" },
        { id:11, t:"Member Tried to Call But Unsuccessful",
          d:"Same as callback — agent will reach out.",
          x:"<em>\"[Agent Name] will contact you shortly.\"</em>" },
        { id:12, t:"Cancellation Confirmation",
          d:"Acknowledge the cancellation request after processing.",
          x:"<em>\"[Member], we're sorry to see you go. We have put in the request to cancel the application. Have a great day!\"</em>",
          tip:"CSRs handle cancellation requests through proper channels and notify agents after completion." },
      ]},
    ],
  },

  "cs-ref-cancellation-script": {
    title: "Cancellation Prevention <em>Script</em>",
    description: "Full supervisor save script — opening through final decision. Supervisor use only.",
    department: "Customer Support",
    owner: "Yanick Bass",
    effective: "April 2026",
    version: "1.0",
    sections: [
      { t: "Opening & Discovery", i: "A", s: [
        { id:1, t:"Supervisor Opening",
          d:"Set the tone — consultative, not defensive.",
          x:"<em>\"Hi, this is [Supervisor Name]. Thanks for taking a moment to speak with me. I understand you're thinking about canceling your plan, and I just want to make sure you have all the information you need before moving forward.\"</em><br><br><em>\"Would you mind sharing what's been going on or what's making you consider canceling?\"</em><br><br><strong>(LET MEMBER SPEAK — DO NOT INTERRUPT)</strong>",
          warn:"NEVER interrupt the member during discovery. Let them speak fully. Interrupting = lost trust = lost member." },
        { id:2, t:"Confirm Understanding",
          d:"Restate the issue to show you listened.",
          x:"<em>\"Thank you for explaining that. I want to make sure I fully understand — it sounds like your main concern is [RESTATE ISSUE]. Is that correct?\"</em><br><br>Common triggers you'll hear:<br>• \"My agent lied to me\"<br>• \"I didn't know this\"<br>• \"I want to file a complaint\"" },
      ]},
      { t: "Clarification & Resolution", i: "B", s: [
        { id:3, t:"If Confusion Is Present — Correct With Facts",
          d:"Provide accurate information before the member decides.",
          x:"<em>\"I'm glad you brought that up, because I want to make sure you have the correct information before making any changes.\"</em><br><br>Then clearly explain: Benefits, Network status, Coverage details, Timelines.<br><br><em>\"Based on what I'm seeing, your plan actually [CLEAR CORRECTION]. Let me walk you through that.\"</em>" },
        { id:4, t:"Offer Resolution Options",
          d:"Give concrete alternatives to cancellation.",
          x:"<em>\"If you'd like, we can try to fix this together so things work the way you expected.\"</em><br><br>Options to offer:<br>• PCP reassignment<br>• Provider verification<br>• Medication review<br>• Carrier escalation<br>• ID card tracking<br><br><em>\"Would you like me to help fix this so you can continue using your plan as intended?\"</em>" },
      ]},
      { t: "Consequence Disclosure", i: "C", s: [
        { id:5, t:"If Member Still Leans Toward Canceling",
          d:"Transparently explain what happens after cancellation.",
          x:"<em>\"Before you make a final decision, I do want to share a couple of important things just so there are no surprises.\"</em><br><br>Then state clearly:<br>• <em>\"If the plan is canceled, there could be a gap in coverage depending on your situation.\"</em><br>• <em>\"You may also need a qualifying reason to enroll in another plan right away.\"</em><br>• <em>\"And anything like prescriptions or doctor visits may not be covered after the plan ends.\"</em><br>• <em>\"Since we're cancelling the plan before the start date you will remain with your current plan moving forward.\"</em><br><br><em>\"Does that make sense?\"</em>",
          warn:"NEVER block or pressure. This is information — the member decides. Blocking = CTM complaint." },
      ]},
      { t: "Final Decision", i: "D", s: [
        { id:6, t:"Ask for Final Decision",
          d:"Give the member the choice — respect either answer.",
          x:"<em>\"Based on everything we reviewed, do you still want to move forward with canceling your plan or would you like help resolving the issue?\"</em>" },
        { id:7, t:"If YES — Process the Cancellation",
          d:"Connect to carrier for processing.",
          x:"<em>\"Thank you for confirming — I'll make a note that we reviewed everything together.\"</em><br><br><em>\"The next step is to connect you with your insurance carrier, since they handle the actual cancellation. I'll stay on the line while I get you connected.\"</em><br><br><strong>Carrier Cancellation Numbers:</strong><br>• Aetna: 844-979-3435<br>• Aetna DSNP: 866-409-1221<br>• Humana: 800-285-7197<br>• UHC: 800-711-0646<br>• UHC DSNP: 866-842-4968<br><br>Document everything in PolicyDen immediately.",
          tip:"Always say 'withdraw application before the effective date' — never 'cancel.'" },
      ]},
    ],
  },

  "cs-ref-hipaa-slides": {
    title: "HIPAA Training <em>Slide Deck</em>",
    description: "17-slide reference covering PHI, verification, authorization, minimum necessary, physical security, and breach response.",
    department: "Customer Support",
    owner: "Yanick Bass",
    effective: "April 2026",
    version: "1.0",
    sections: [
      { t: "HIPAA Foundations (Slides 1–5)", i: "A", s: [
        { id:1, t:"What is HIPAA?",
          d:"Health Insurance Portability and Accountability Act of 1996.",
          x:"A U.S. federal law designed to protect sensitive patient health information from being disclosed without consent. Mandates national standards for privacy, security, and electronic transactions of PHI.<br><br>Violations lead to: Federal fines, Job termination, CMS sanctions.<br><br><strong>Every call you take is a compliance event.</strong>" },
        { id:2, t:"Three Key Frameworks",
          d:"Privacy Rule, Security Rule, and CMS Guidelines.",
          x:"<strong>HIPAA Privacy Rule:</strong> Governs how PHI is used.<br><strong>HIPAA Security Rule:</strong> Protects how PHI is stored and accessed.<br><strong>CMS Guidelines:</strong> Govern how Medicare plans must operate.<br><br>Together, these define how you handle every interaction." },
        { id:3, t:"What is PHI?",
          d:"Any information that identifies a member AND relates to health, treatment, or payment.",
          x:"Examples:<br>• Name + diagnosis<br>• Member ID + claims<br>• Date of birth + medications<br><br><strong>Even confirming someone is a member can be PHI in the wrong situation.</strong>" },
      ]},
      { t: "Verification & Authorization (Slides 6–12)", i: "B", s: [
        { id:4, t:"Identity Verification — Non-Negotiable",
          d:"Two identifiers required before ANY PHI is discussed.",
          x:"Verify at least <strong>TWO</strong> identifiers:<br>• Name<br>• Date of birth<br>• Address / zipcode<br><br><strong>If verification fails — you STOP the call. No exceptions. No shortcuts.</strong>" },
        { id:5, t:"Third-Party Authorization",
          d:"Not everyone can access a member's information.",
          x:"Family members must be:<br>• Authorized on file, OR<br>• Have the member present on the call<br><br>Always check the system. Never assume access based on relationship.<br><br>If not authorized: <em>\"I'm unable to discuss that without the member present or authorization on file.\"</em>" },
        { id:6, t:"Minimum Necessary Rule",
          d:"Only access and share what you need to do your job.",
          x:"Not everything you can see should be shared.<br><br><strong>Tier 1 representatives:</strong> Handle general inquiries, should NOT access or discuss clinical details, must escalate complex cases. Your access is intentionally limited." },
      ]},
      { t: "Security & Breach Response (Slides 13–17)", i: "C", s: [
        { id:7, t:"Physical Security",
          d:"Protect your workstation and member data at all times.",
          x:"• Lock your screen when stepping away<br>• Never share passwords<br>• Protect your access at all times<br>• No PHI visible on your desk — ever" },
        { id:8, t:"Breach Examples & Response",
          d:"Know what a breach looks like and what to do.",
          x:"<strong>Breach examples:</strong> Talking to the wrong person, saying too much, sending PHI incorrectly, accessing accounts without a business reason (even family/friends).<br><br><strong>If a breach happens:</strong> Report it immediately. Do NOT try to fix it yourself. The Privacy Officer handles all incidents.",
          warn:"HIPAA violations often become CMS complaints. These are tracked and audited. Prevention: Verification, Authorization, Proper communication." },
        { id:9, t:"Annual Training Requirement",
          d:"This training is required every year.",
          x:"Key reminders:<br>• Verify identity<br>• Protect PHI<br>• Follow the minimum necessary rule<br>• Report incidents immediately<br><br><strong>If you follow these — you will stay compliant.</strong>" },
      ]},
    ],
  },

  "cs-ref-cap-template": {
    title: "Corrective Action <em>Plan (CAP)</em>",
    description: "Formal CAP template triggered by founded complaints — compliance notification, coaching, and remediation tracking.",
    department: "Customer Support",
    owner: "Yanick Bass",
    effective: "April 2026",
    version: "1.0",
    sections: [
      { t: "When a CAP Is Triggered", i: "A", s: [
        { id:1, t:"CAP Trigger Criteria",
          d:"A CAP is initiated when an agent receives repeated customer service complaints.",
          x:"This Corrective Action Plan (CAP) is established to address identified compliance deficiencies in alignment with Medicare Advantage regulations and the internal policies of MyCareClub, LLC.<br><br>The objective: reduce CTM complaints by resolving member concerns internally whenever possible. Encouraging members to contact our organization directly helps prevent grievances being filed with the carrier or CMS." },
        { id:2, t:"QA Review Process",
          d:"Complaints trigger a QA review before any CAP is issued.",
          x:"When a complaint is received:<br>1. A request is submitted to the Quality Assurance (QA) Department to review the call(s) in question.<br>2. QA evaluates the interaction and determines whether the complaint is valid or unsupported.<br><br><strong>If the complaint is NOT founded:</strong> The finding is documented and no CAP is issued.<br><strong>If the complaint IS founded:</strong> The Corrective Action Plan is initiated." },
      ]},
      { t: "CAP Process Steps", i: "B", s: [
        { id:3, t:"Step 1 — Compliance Notification",
          d:"Formal email notification to Compliance Department.",
          x:"An email notification will be sent to the Compliance Department, with the Operations Manager copied, documenting the issue and CAP initiation.<br><br>This creates the formal record for audit trail purposes." },
        { id:4, t:"Step 2 — Coaching & Remediation",
          d:"Targeted coaching by Sales President and Team Lead.",
          x:"The agent will receive targeted coaching conducted by the Sales President and the Team Lead.<br><br>Coaching covers:<br>• Specific violation identified<br>• Correct procedure review<br>• Role-play of proper handling<br>• Written acknowledgment from the agent" },
        { id:5, t:"Step 3 — Documentation",
          d:"All findings and actions are formally documented.",
          x:"All coaching, findings, and corrective actions will be formally documented for compliance tracking and audit purposes.<br><br>This documentation must be retained and accessible for CMS audit review.",
          warn:"CAP documentation is a compliance requirement. Incomplete documentation = audit failure." },
      ]},
    ],
  },

});

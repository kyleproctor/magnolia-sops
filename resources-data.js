/* ═══════════════════════════════════════════════════════════════════════════
   RESOURCES DATA — Quick-reference docs for the Operations Hub
   Each entry renders in resource.html (clean reference viewer, NOT SOP format).
   Types: "table" (rows + columns), "sections" (rich text blocks), "scorecard"
   ═══════════════════════════════════════════════════════════════════════════ */

window.RESOURCES = window.RESOURCES || {};

Object.assign(window.RESOURCES, {

  /* ─────────────────────────────────────────────────────────────────────────
     CARRIER CONTACT DIRECTORY
     ───────────────────────────────────────────────────────────────────────── */
  "cs-ref-carrier-contacts": {
    title: "Carrier <em>Contact Directory</em>",
    titlePlain: "Carrier Contact Directory",
    description: "Direct phone numbers for all Medicare Advantage carriers — member lines, non-member lines, and cancellation-specific numbers.",
    category: "Quick Reference",
    type: "table",
    groups: [
      { letter:"A", heading:"Aetna", columns:["Line","Phone Number"], rows:[
        { cells:["Members","833-570-6670"] },
        { cells:["Non-Members","833-859-6031"] },
        { cells:["DSNP Cancellation","866-409-1221"], note:"Always say: \"Withdraw application before the effective date.\"" },
        { cells:["Standard Cancellation","844-979-3435"], note:"Always say: \"Withdraw application before the effective date.\"" },
      ]},
      { letter:"B", heading:"Amerigroup", columns:["Line","Phone Number"], rows:[
        { cells:["Members","833-713-1304"] },
        { cells:["Non-Members","877-470-4131"] },
      ]},
      { letter:"C", heading:"Anthem", columns:["Line","Phone Number"], rows:[
        { cells:["Members","844-469-6744"] },
        { cells:["Non-Members","800-238-1143"] },
      ]},
      { letter:"D", heading:"CarePlus", columns:["Line","Phone Number"], rows:[
        { cells:["Members","800-794-5907"] },
        { cells:["Non-Members","877-831-9406"] },
      ]},
      { letter:"E", heading:"Centene (Ascension)", columns:["Line","Phone Number"], rows:[
        { cells:["Members","877-831-9406"] },
        { cells:["Non-Members","877-831-9406"] },
      ]},
      { letter:"F", heading:"Cigna / HealthSpring", columns:["Line","Phone Number"], rows:[
        { cells:["Cigna — Members","800-668-3813"] },
        { cells:["Cigna — Non-Members","855-982-6150"] },
        { cells:["HealthSpring — Members","800-668-3813"] },
        { cells:["HealthSpring — Non-Members","877-652-1739"] },
      ]},
      { letter:"G", heading:"Devoted Health", columns:["Line","Phone Number"], rows:[
        { cells:["Members & Non-Members","800-385-0916"] },
      ]},
      { letter:"H", heading:"Humana", columns:["Line","Phone Number"], rows:[
        { cells:["Members","800-457-4708"] },
        { cells:["Non-Members","800-833-2364"] },
        { cells:["Cancellation","800-285-7197"], note:"Always say: \"Withdraw application before the effective date.\"" },
      ]},
      { letter:"I", heading:"Priority Health", columns:["Line","Phone Number"], rows:[
        { cells:["Members","888-389-6648"] },
        { cells:["Non-Members","888-230-0365"] },
      ]},
      { letter:"J", heading:"Simply Healthcare", columns:["Line","Phone Number"], rows:[
        { cells:["Members","877-577-0115"] },
        { cells:["Non-Members","888-577-0212"] },
      ]},
      { letter:"K", heading:"United Healthcare", columns:["Line","Phone Number"], rows:[
        { cells:["Members & Non-Members","800-643-4845"] },
        { cells:["Standard Cancellation","800-711-0646"], note:"Always say: \"Withdraw application before the effective date.\"" },
        { cells:["DSNP Cancellation","866-842-4968"], note:"Always say: \"Withdraw application before the effective date.\"" },
      ]},
      { letter:"L", heading:"Wellcare", columns:["Line","Phone Number"], rows:[
        { cells:["Members & Non-Members","844-917-0175"] },
      ]},
      { letter:"M", heading:"People's Health", columns:["Line","Phone Number"], rows:[
        { cells:["Standard","877-369-1907"] },
        { cells:["D-SNP","877-367-1803"] },
      ]},
      { letter:"★", heading:"Magnolia Health Care", sub:"Internal CS lines", columns:["Line","Phone Number"], rows:[
        { cells:["MyCareClub CS","954-902-7248"], tip:true },
        { cells:["Magnolia CS","954-686-3267"], tip:true },
      ]},
    ],
  },

  /* ─────────────────────────────────────────────────────────────────────────
     CS COMPLAINT & ESCALATION FORM
     ───────────────────────────────────────────────────────────────────────── */
  "cs-ref-complaint-form": {
    title: "CS Complaint & <em>Escalation Form</em>",
    titlePlain: "CS Complaint & Escalation Form",
    description: "Standardized documentation template for all escalation calls. Required for every Level 2+ escalation.",
    category: "Form Template",
    type: "sections",
    groups: [
      { letter:"1", heading:"Call Summary", items:[
        { title:"Member & Call Info", fields:[
          { label:"Member", value:"[Full Name]" },
          { label:"Date of Call", value:"[MM/DD/YYYY]" },
          { label:"Prepared By", value:"[Your Name]" },
        ]},
        { title:"Call Type", content:"<ul><li>Member escalation / customer service supervisor call</li><li>Agent behavior complaint</li><li>Benefit misunderstanding</li><li>Service-related concern</li></ul>" },
        { title:"Issues & Outcome", fields:[
          { label:"Primary Issue", value:"What the call is about — one sentence." },
          { label:"Secondary Issue", value:"(If applicable) Any additional concern raised during the call." },
          { label:"Outcome", value:"The solution presented or action taken." },
        ]},
      ]},
      { letter:"2", heading:"Situation & Complaint Detail", items:[
        { title:"Situation Overview", desc:"Write 2-4 sentences summarizing the full context.", content:"Include: how the call started, what the member described, what you discovered, and what actions you took.", tip:"Write this while the call is fresh. Waiting even 30 minutes degrades accuracy." },
        { title:"Member Complaint", desc:"Document the specific complaints in bullet-point format.", content:"<strong>Primary Complaint:</strong><ul><li>[Member's exact words]</li><li>[Bullet point]</li></ul><strong>Secondary Complaint:</strong> (If applicable)<ul><li>[Bullet point]</li></ul>", warn:"Use the member's EXACT words for complaint language. This is critical for CTM defense." },
        { title:"Key Findings", desc:"What you discovered during investigation.", content:"<ul><li>What did you find when you checked the account?</li><li>Was the member's concern valid or based on a misunderstanding?</li><li>Were there any system errors, agent mistakes, or carrier issues?</li></ul>" },
      ]},
      { letter:"3", heading:"Resolution & Compliance", items:[
        { title:"Member Decision & Resolution", content:"<ul><li>Was the issue resolved on the call?</li><li>Did the member accept the resolution?</li><li>Was a follow-up scheduled?</li><li>Was the member transferred to the carrier?</li></ul>" },
        { title:"Compliance / Risk Notes", content:"<ul><li>Did the AOR (Agent of Record) make an error?</li><li>Is coaching necessary for the agent?</li><li>Does this require a formal CTM report?</li><li>Should QA review the original enrollment call?</li></ul>", warn:"If you identify a compliance risk, notify the Compliance Department immediately — do not wait for the form to be filed." },
      ]},
    ],
  },

  /* ─────────────────────────────────────────────────────────────────────────
     CSR QA SCORECARD
     ───────────────────────────────────────────────────────────────────────── */
  "cs-ref-qa-scorecard": {
    title: "CSR QA <em>Scorecard</em> 2026",
    titlePlain: "CSR QA Scorecard 2026",
    description: "100-point weighted scorecard with all 7 categories, point values, auto-fail triggers, and scoring tiers.",
    category: "Quality Assurance",
    type: "scorecard",
    groups: [
      { letter:"A", heading:"Greeting & Verification", sub:"20 points", rows:[
        { criteria:"Used approved greeting (Brand name)", points:"5" },
        { criteria:"Verified FULL NAME", points:"5" },
        { criteria:"Verified DOB or 2nd identifier", points:"5" },
        { criteria:"Professional opening tone", points:"5" },
      ]},
      { letter:"B", heading:"Reason for Call", sub:"10 points", rows:[
        { criteria:"Actively listened (no interruption)", points:"3" },
        { criteria:"Correctly paraphrased issue", points:"4" },
        { criteria:"Proper probing questions asked", points:"3" },
      ]},
      { letter:"C", heading:"HIPAA & Authorization", sub:"15 points", rows:[
        { criteria:"Confirmed authorized representative (if applicable)", points:"5" },
        { criteria:"Did NOT disclose PHI improperly", points:"5" },
        { criteria:"Followed Minimum Necessary Rule", points:"5" },
      ], note:"Any HIPAA failure can also trigger an auto-fail Red Flag (score = 0)." },
      { letter:"D", heading:"Resolution", sub:"20 points", rows:[
        { criteria:"Provided correct resolution", points:"10" },
        { criteria:"Followed correct process (transfer/callback)", points:"5" },
        { criteria:"Explained next steps clearly", points:"5" },
      ]},
      { letter:"E", heading:"Documentation", sub:"10 points", rows:[
        { criteria:"Notes are accurate & complete", points:"5" },
        { criteria:"No excessive PHI documented", points:"5" },
      ]},
      { letter:"F", heading:"Call Handling & Professionalism", sub:"15 points", rows:[
        { criteria:"Used customer's name appropriately", points:"3" },
        { criteria:"Professional tone & empathy", points:"4" },
        { criteria:"Avoided negative/HIPAA-risk language", points:"3" },
        { criteria:"No security violations observed", points:"5" },
      ]},
      { letter:"G", heading:"Closing", sub:"10 points", rows:[
        { criteria:"Resolved issue effectively", points:"5" },
        { criteria:"Proper closing statement used", points:"3" },
        { criteria:"Asked if additional help needed", points:"2" },
      ]},
      { letter:"!", heading:"Red Flag / Auto-Fail", sub:"Instant 0 score", rows:[
        { criteria:"No identity verification performed", points:"-ALL", autoFail:true },
        { criteria:"Only 1 identifier used (must use 2)", points:"-ALL", autoFail:true },
        { criteria:"PHI shared with unauthorized person", points:"-ALL", autoFail:true },
        { criteria:"Oversharing medical or claims data", points:"-ALL", autoFail:true },
        { criteria:"Unauthorized access to member account", points:"-ALL", autoFail:true },
        { criteria:"Documentation failure (no notes at all)", points:"-ALL", autoFail:true },
        { criteria:"Security violation observed", points:"-ALL", autoFail:true },
      ], note:"Any single auto-fail = score of 0, regardless of other performance." },
    ],
    tiers: [
      { label:"Top Performer", range:"95–100%", action:"Recognition, peer mentoring eligibility", bg:"rgba(34,197,94,.06)", color:"#16a34a" },
      { label:"Meets CMS Standard", range:"90–94%", action:"On track — targeted coaching on missed areas", bg:"rgba(234,179,8,.06)", color:"#b45309" },
      { label:"Non-Compliant", range:"< 90% or Auto-Fail", action:"Mandatory coaching session, CAP if pattern continues", bg:"rgba(239,68,68,.06)", color:"#dc2626" },
    ],
  },

  /* ─────────────────────────────────────────────────────────────────────────
     DE-ESCALATION VERBIAGE CARD
     ───────────────────────────────────────────────────────────────────────── */
  "cs-ref-deescalation": {
    title: "De-Escalation <em>Verbiage Card</em>",
    titlePlain: "De-Escalation Verbiage Card",
    description: "Quick-reference: the 6-step de-escalation framework with exact phrases for each step. Print and keep at your desk.",
    category: "Quick Reference",
    type: "sections",
    groups: [
      { letter:"1", heading:"The 6-Step Framework", items:[
        { title:"Step 1 — ACKNOWLEDGE", desc:"Show the member you hear them — without admitting fault.", script:"<em>\"I understand your concern.\"</em><br><em>\"I can hear how frustrating that is.\"</em><br><em>\"I understand why you're calling about this.\"</em>", tip:"Match the member's energy level — don't be overly cheerful when they're upset, but don't match anger either." },
        { title:"Step 2 — VALIDATE", desc:"Affirm their reason for calling without agreeing with accusations.", script:"<em>\"That's definitely something we want to get clarified.\"</em><br><em>\"I'm glad you called so we can look into this.\"</em>" },
        { title:"Step 3 — REASSURE", desc:"Move the conversation from problem to resolution path.", script:"<em>\"I'm going to help get you to the right person who can review this with you.\"</em><br><em>\"Let's make sure this gets handled correctly.\"</em><br><em>\"I'll make sure this is addressed properly.\"</em>" },
        { title:"Step 4 — SET EXPECTATION", desc:"Tell them what happens next so they don't feel lost.", script:"<em>\"I'm going to connect you with a specialist who can go over this in detail.\"</em><br><em>\"They'll be able to review your specific benefits and provide accurate information.\"</em><br><em>\"This may take a few moments, but I'll stay with you while we get you connected.\"</em>" },
        { title:"Step 5 — CONTROL THE CONVERSATION", desc:"Gently redirect when the member is spiraling or repeating.", script:"<em>\"I want to make sure I fully understand so I can get you the right help.\"</em><br><em>\"Let's take this step by step so we can resolve it.\"</em><br><em>\"I'm here to help, and I want to make sure we handle this the right way.\"</em>" },
        { title:"Step 6 — TRANSITION TO ESCALATION", desc:"Bridge to the specialist or supervisor.", script:"<em>\"I'm going to bring in a specialist who can take a deeper look at this.\"</em><br><em>\"I'll connect you now so we can get this resolved.\"</em>" },
      ]},
      { letter:"2", heading:"Supervisor A.C.T. Framework", sub:"For supervisors handling escalated calls", items:[
        { title:"A — Acknowledge", script:"<em>\"I can understand how that would be frustrating.\"</em><br><em>\"That makes sense why you'd feel that way.\"</em>" },
        { title:"C — Clarify", desc:"Repeat the issue back and gently correct misunderstandings.", script:"<em>\"So what I'm hearing is…\"</em><br><em>\"Let me clarify what your plan actually covers…\"</em>" },
        { title:"T — Take Ownership", desc:"Commit to a resolution path.", script:"<em>\"Here's what I can do for you today.\"</em><br><em>\"Let's focus on getting this resolved.\"</em>" },
      ]},
    ],
  },

  /* ─────────────────────────────────────────────────────────────────────────
     SMS RESPONSE TEMPLATES
     ───────────────────────────────────────────────────────────────────────── */
  "cs-ref-sms-templates": {
    title: "SMS Response <em>Templates</em>",
    titlePlain: "SMS Response Templates",
    description: "All 12 approved SMS templates — copy, customize the bracketed fields, and send.",
    category: "Templates",
    type: "sections",
    groups: [
      { letter:"A", heading:"Safety & Compliance", sub:"PHI, complaints, file sharing", items:[
        { title:"PHI Received (member sends DOB, SSN, banking info)", desc:"Redirect immediately to phone — never engage with PHI over text.", script:"<em>\"For your protection, we cannot review sensitive information by text. Your licensed agent will contact you directly.\"</em>", warn:"All PHI-related SMS interactions MUST be documented in PolicyDen." },
        { title:"Dissatisfied Member / Complaint Filer", desc:"Cease contact with members who have filed a formal complaint.", script:"<em>\"Mr./Ms. ___, I see you've submitted a complaint against our agency, and we are not permitted to contact nor communicate with you anymore. If you want further clarification, you can contact your carrier ___ for assistance. Thank you and have a wonderful day!\"</em>", warn:"Once a member has filed a complaint, you CANNOT communicate with them. Any further contact is a compliance violation." },
        { title:"File Sharing / Possible Spam Link", desc:"Never open links sent via SMS — redirect to phone.", script:"<em>\"Hi, thanks for sending that over. For security reasons, I'm unable to open links through this business text line. If you don't mind, please share a brief description of what the link contains, or you can contact our customer service team 954-686-3267 directly for further assistance.\"</em>" },
      ]},
      { letter:"B", heading:"Member Identity & Enrollment", sub:"Don't know you, enrollment, effective dates", items:[
        { title:"\"Don't Know You\" Response", desc:"When a member doesn't recognize who is contacting them.", script:"<em>\"Hi [MEMBER], this is [AGENT] — the licensed agent who helped you enroll in your [CARRIER] plan with (My CareClub / Magnolia Health). We spoke on the phone before your [Month] 1st effective date, and I sent your enrollment confirmation code _____. If you'd prefer, you can call our office directly at 954-902-7248 to confirm it's me. I just wanted to make sure your coverage is working well for you.\"</em>" },
        { title:"Enrollment-Related Texts", desc:"Always redirect enrollment actions to phone — never handle over SMS.", script:"<em>\"Let's talk, I will need to assist you directly. Please call me at your convenience. [CS Number]\"</em>" },
        { title:"When Will My Plan Start?", desc:"Effective date inquiry.", script:"<em>\"Hello! Your benefits will take effect on the 1st of [Month]. If you need your member ID before then or have any questions, please feel free to call or text me at [CS Number]. I'm happy to help.\"</em>" },
      ]},
      { letter:"C", heading:"Service Requests", sub:"ID cards, welcome packets, incorrect info", items:[
        { title:"Member ID Card Request", script:"<em>\"Hi [Member Name]. I've attached a digital copy of your Member ID for you to use. If you need anything else, feel free to reply here or reach out to my customer service team — [Agent Name]\"</em>" },
        { title:"Welcome Packet Missing (over 2 weeks)", script:"<em>\"Thanks for letting me know. No problem at all — I'm going to put in a request to resend your documents right away. I've also attached a digital copy of your Member ID for you to use. If you need anything else, feel free to reply here or reach out to my customer service team — [Agent Name]\"</em>" },
        { title:"Plan Information Received But Incorrect", script:"<em>\"Thank you for letting me know. Please call or text me at your convenience so I can review this with you and help correct any discrepancies with [Carrier].\"</em>" },
      ]},
      { letter:"D", heading:"Callbacks & Cancellations", sub:"Urgent requests, missed calls, cancellations", items:[
        { title:"Urgent / Callback Requests", script:"<em>\"Your agent will contact you shortly.\"</em>" },
        { title:"Member Tried to Call But Unsuccessful", script:"<em>\"[Agent Name] will contact you shortly.\"</em>" },
        { title:"Cancellation Confirmation", desc:"Acknowledge the cancellation request after processing.", script:"<em>\"[Member], we're sorry to see you go. We have put in the request to cancel the application. Have a great day!\"</em>", tip:"CSRs handle cancellation requests through proper channels and notify agents after completion." },
      ]},
    ],
  },

  /* ─────────────────────────────────────────────────────────────────────────
     CANCELLATION PREVENTION SCRIPT
     ───────────────────────────────────────────────────────────────────────── */
  "cs-ref-cancellation-script": {
    title: "Cancellation Prevention <em>Script</em>",
    titlePlain: "Cancellation Prevention Script",
    description: "Full supervisor save script — opening through final decision. Supervisor use only.",
    category: "Supervisor Script",
    type: "sections",
    groups: [
      { letter:"1", heading:"Opening & Discovery", items:[
        { title:"Supervisor Opening", desc:"Set the tone — consultative, not defensive.", script:"<em>\"Hi, this is [Supervisor Name]. Thanks for taking a moment to speak with me. I understand you're thinking about canceling your plan, and I just want to make sure you have all the information you need before moving forward.\"</em><br><br><em>\"Would you mind sharing what's been going on or what's making you consider canceling?\"</em><br><br><strong>(LET MEMBER SPEAK — DO NOT INTERRUPT)</strong>", warn:"NEVER interrupt the member during discovery. Let them speak fully. Interrupting = lost trust = lost member." },
        { title:"Confirm Understanding", desc:"Restate the issue to show you listened.", script:"<em>\"Thank you for explaining that. I want to make sure I fully understand — it sounds like your main concern is [RESTATE ISSUE]. Is that correct?\"</em>", content:"<strong>Common triggers you'll hear:</strong><ul><li>\"My agent lied to me\"</li><li>\"I didn't know this\"</li><li>\"I want to file a complaint\"</li></ul>" },
      ]},
      { letter:"2", heading:"Clarification & Resolution", items:[
        { title:"If Confusion Is Present — Correct With Facts", script:"<em>\"I'm glad you brought that up, because I want to make sure you have the correct information before making any changes.\"</em><br><br><em>\"Based on what I'm seeing, your plan actually [CLEAR CORRECTION]. Let me walk you through that.\"</em>", content:"Then clearly explain: Benefits, Network status, Coverage details, Timelines." },
        { title:"Offer Resolution Options", desc:"Give concrete alternatives to cancellation.", script:"<em>\"If you'd like, we can try to fix this together so things work the way you expected.\"</em><br><br><em>\"Would you like me to help fix this so you can continue using your plan as intended?\"</em>", content:"<strong>Options to offer:</strong><ul><li>PCP reassignment</li><li>Provider verification</li><li>Medication review</li><li>Carrier escalation</li><li>ID card tracking</li></ul>" },
      ]},
      { letter:"3", heading:"Consequence Disclosure", sub:"If member still leans toward canceling", items:[
        { title:"Transparent Consequences", desc:"Explain what happens after cancellation — do NOT pressure.", script:"<em>\"Before you make a final decision, I do want to share a couple of important things just so there are no surprises.\"</em><br><br><em>\"If the plan is canceled, there could be a gap in coverage depending on your situation.\"</em><br><em>\"You may also need a qualifying reason to enroll in another plan right away.\"</em><br><em>\"And anything like prescriptions or doctor visits may not be covered after the plan ends.\"</em><br><em>\"Since we're cancelling the plan before the start date you will remain with your current plan moving forward.\"</em><br><br><em>\"Does that make sense?\"</em>", warn:"NEVER block or pressure. This is information — the member decides. Blocking = CTM complaint." },
      ]},
      { letter:"4", heading:"Final Decision", items:[
        { title:"Ask for Final Decision", script:"<em>\"Based on everything we reviewed, do you still want to move forward with canceling your plan or would you like help resolving the issue?\"</em>" },
        { title:"If YES — Process the Cancellation", desc:"Connect to carrier for processing.", script:"<em>\"Thank you for confirming — I'll make a note that we reviewed everything together.\"</em><br><br><em>\"The next step is to connect you with your insurance carrier, since they handle the actual cancellation. I'll stay on the line while I get you connected.\"</em>", content:"<strong>Carrier Cancellation Numbers:</strong><ul><li>Aetna: 844-979-3435</li><li>Aetna DSNP: 866-409-1221</li><li>Humana: 800-285-7197</li><li>UHC: 800-711-0646</li><li>UHC DSNP: 866-842-4968</li></ul>", tip:"Always say \"withdraw application before the effective date\" — never \"cancel.\" Document everything in PolicyDen immediately." },
      ]},
    ],
  },

  /* ─────────────────────────────────────────────────────────────────────────
     HIPAA TRAINING SLIDE DECK
     ───────────────────────────────────────────────────────────────────────── */
  "cs-ref-hipaa-slides": {
    title: "HIPAA Training <em>Reference Guide</em>",
    titlePlain: "HIPAA Training Reference Guide",
    description: "Covers PHI, identity verification, authorization, minimum necessary, physical security, and breach response.",
    category: "Training Reference",
    type: "sections",
    groups: [
      { letter:"1", heading:"HIPAA Foundations", sub:"What it is and why it matters", items:[
        { title:"What is HIPAA?", content:"<strong>Health Insurance Portability and Accountability Act of 1996.</strong><br><br>A U.S. federal law designed to protect sensitive patient health information from being disclosed without consent. Mandates national standards for privacy, security, and electronic transactions of PHI.<br><br><strong>Violations lead to:</strong> Federal fines, job termination, CMS sanctions.<br><br><strong>Every call you take is a compliance event.</strong>" },
        { title:"Three Key Frameworks", content:"<ul><li><strong>HIPAA Privacy Rule</strong> — Governs how PHI is used</li><li><strong>HIPAA Security Rule</strong> — Protects how PHI is stored and accessed</li><li><strong>CMS Guidelines</strong> — Govern how Medicare plans must operate</li></ul>Together, these define how you handle every interaction." },
        { title:"What is PHI?", content:"Any information that identifies a member AND relates to health, treatment, or payment.<br><br><strong>Examples:</strong><ul><li>Name + diagnosis</li><li>Member ID + claims</li><li>Date of birth + medications</li></ul>", warn:"Even confirming someone is a member can be PHI in the wrong situation." },
      ]},
      { letter:"2", heading:"Verification & Authorization", sub:"Non-negotiable procedures", items:[
        { title:"Identity Verification", content:"Verify at least <strong>TWO</strong> identifiers before ANY PHI is discussed:<ul><li>Name</li><li>Date of birth</li><li>Address / zipcode</li></ul>", warn:"If verification fails — you STOP the call. No exceptions. No shortcuts." },
        { title:"Third-Party Authorization", content:"Family members must be:<ul><li>Authorized on file, OR</li><li>Have the member present on the call</li></ul>Always check the system. Never assume access based on relationship.", script:"<em>\"I'm unable to discuss that without the member present or authorization on file.\"</em>" },
        { title:"Minimum Necessary Rule", content:"Only access and share what you need to do your job. Not everything you can see should be shared.<br><br><strong>Tier 1 representatives:</strong> Handle general inquiries, should NOT access or discuss clinical details, must escalate complex cases. Your access is intentionally limited." },
      ]},
      { letter:"3", heading:"Security & Breach Response", items:[
        { title:"Physical Security", content:"<ul><li>Lock your screen when stepping away</li><li>Never share passwords</li><li>Protect your access at all times</li><li>No PHI visible on your desk — ever</li></ul>" },
        { title:"Breach Examples & What To Do", content:"<strong>Breach examples:</strong><ul><li>Talking to the wrong person</li><li>Saying too much</li><li>Sending PHI incorrectly</li><li>Accessing accounts without a business reason (even family/friends)</li></ul>", warn:"If a breach happens: Report it immediately. Do NOT try to fix it yourself. The Privacy Officer handles all incidents." },
        { title:"Annual Training Requirement", content:"<strong>Key reminders:</strong><ul><li>Verify identity</li><li>Protect PHI</li><li>Follow the minimum necessary rule</li><li>Report incidents immediately</li></ul><strong>If you follow these — you will stay compliant.</strong>" },
      ]},
    ],
  },

  /* ─────────────────────────────────────────────────────────────────────────
     CORRECTIVE ACTION PLAN (CAP) TEMPLATE
     ───────────────────────────────────────────────────────────────────────── */
  "cs-ref-cap-template": {
    title: "Corrective Action <em>Plan (CAP)</em>",
    titlePlain: "Corrective Action Plan (CAP)",
    description: "Formal CAP template triggered by founded complaints — compliance notification, coaching, and remediation tracking.",
    category: "Form Template",
    type: "sections",
    groups: [
      { letter:"1", heading:"When a CAP Is Triggered", items:[
        { title:"CAP Trigger Criteria", content:"This Corrective Action Plan (CAP) is established to address identified compliance deficiencies in alignment with Medicare Advantage regulations and the internal policies of MyCareClub, LLC.<br><br><strong>Objective:</strong> Reduce CTM complaints by resolving member concerns internally whenever possible. Encouraging members to contact our organization directly helps prevent grievances being filed with the carrier or CMS." },
        { title:"QA Review Process", content:"When a complaint is received:<ul><li><strong>Step 1:</strong> A request is submitted to the Quality Assurance (QA) Department to review the call(s) in question.</li><li><strong>Step 2:</strong> QA evaluates the interaction and determines whether the complaint is valid or unsupported.</li></ul><strong>If the complaint is NOT founded:</strong> The finding is documented and no CAP is issued.<br><strong>If the complaint IS founded:</strong> The Corrective Action Plan is initiated." },
      ]},
      { letter:"2", heading:"CAP Process Steps", items:[
        { title:"Step 1 — Compliance Notification", desc:"Formal email to Compliance Department.", content:"An email notification will be sent to the Compliance Department, with the Operations Manager copied, documenting the issue and CAP initiation.<br><br>This creates the formal record for audit trail purposes." },
        { title:"Step 2 — Coaching & Remediation", desc:"Targeted coaching by Sales President and Team Lead.", content:"The agent will receive targeted coaching conducted by the Sales President and the Team Lead.<br><br><strong>Coaching covers:</strong><ul><li>Specific violation identified</li><li>Correct procedure review</li><li>Role-play of proper handling</li><li>Written acknowledgment from the agent</li></ul>" },
        { title:"Step 3 — Documentation", content:"All coaching, findings, and corrective actions will be formally documented for compliance tracking and audit purposes.<br><br>This documentation must be retained and accessible for CMS audit review.", warn:"CAP documentation is a compliance requirement. Incomplete documentation = audit failure." },
      ]},
    ],
  },

});

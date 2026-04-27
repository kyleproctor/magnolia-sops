/* ─── Trainings dataset (Trainual-style framework) ───
   Each training follows Subject → Topics → Steps hierarchy:
   - topics: grouped sections of the training
     · t = topic title
     · i = topic index (shown as "1", "2", … in the sidebar)
     · steps: ordered lesson screens
       · id       = unique numeric id
       · t        = step title
       · body     = rich HTML (headings, paragraphs, lists, blockquotes, links)
       · media    = optional { type: "image"|"video"|"loom", url, caption? }
       · takeaway = optional single-sentence summary shown in a green pull-quote
       · quiz     = optional { question, options:[...], answer:index, explain? }

   Add new trainings to TRAININGS keyed by id. The viewer at training.html
   reads TRAININGS[new URLSearchParams(location.search).get('id')]. */

window.TRAININGS = {

  /* ─── Placeholder training demonstrating every feature ─── */
  "new-hire-welcome": {
    title: "New Hire <em>Welcome</em>",
    description: "A short placeholder training that demonstrates every feature of the Trainual-style framework — rich text, images, embedded video, takeaways, and a knowledge check at the end.",
    department: "HR",
    owner: "People Operations",
    duration: "~8 min",
    version: "1.0",
    topics: [
      {
        t: "Welcome to Magnolia",
        i: 1,
        steps: [
          {
            id: 1,
            t: "Hello, and welcome",
            body: `
              <p>Welcome to Magnolia Health Care. This short training introduces you to who we are, how we work, and what we expect from every teammate in their first 30 days.</p>
              <p>You'll move through this at your own pace. Each step is a short read — usually 1–2 minutes. Click <strong>Next</strong> when you're ready, or jump around using the sidebar on the left.</p>
              <h3>What you'll learn</h3>
              <ul>
                <li>Our mission and what makes Magnolia different</li>
                <li>Your first-week checklist</li>
                <li>How we measure performance (spoiler: it's not call count)</li>
                <li>Where to find help when you get stuck</li>
              </ul>
            `,
            takeaway: "This training should take about 8 minutes. Your progress saves automatically.",
          },
          {
            id: 2,
            t: "Our mission",
            body: `
              <p>Magnolia exists to help Medicare beneficiaries choose the plan that fits their life — not the plan that pays the biggest commission. That one sentence drives every decision we make.</p>
              <blockquote>
                <p>"The right plan for the person in front of you. Every time."</p>
              </blockquote>
              <p>This is why we don't use high-pressure sales tactics. It's why we built a verification department that double-checks every enrollment. And it's why our retention numbers are best-in-class.</p>
            `,
            media: {
              type: "image",
              url: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=900&q=80",
              caption: "Magnolia's operations center — where every policy starts.",
            },
          },
        ],
      },
      {
        t: "Your first week",
        i: 2,
        steps: [
          {
            id: 3,
            t: "Day 1 checklist",
            body: `
              <p>Before your first shift ends, these items should be complete. Your team lead will walk through most of them with you, but the ownership is yours.</p>
              <h3>System access</h3>
              <ul>
                <li>Google Workspace account (email, Drive, Calendar)</li>
                <li>Slack + your department channels</li>
                <li>PolicyDen CRM login with your NPN attached</li>
                <li>Convoso dialer credentials and headset test</li>
              </ul>
              <h3>Paperwork</h3>
              <ul>
                <li>W-4 + state tax forms signed in BambooHR</li>
                <li>Direct deposit routing info submitted</li>
                <li>Confidentiality + HIPAA acknowledgement signed</li>
              </ul>
            `,
            takeaway: "If any of these aren't done by end-of-day, ping your team lead — it affects payroll.",
          },
          {
            id: 4,
            t: "How we onboard",
            body: `
              <p>This 90-second video walks through the first 90 days at Magnolia — what to expect each week, who you'll meet, and what your first performance review will cover.</p>
            `,
            media: {
              type: "video",
              url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
              caption: "Replace with your real onboarding overview video.",
            },
          },
        ],
      },
      {
        t: "How we measure success",
        i: 3,
        steps: [
          {
            id: 5,
            t: "Effectuation, not volume",
            body: `
              <p>Most agencies pay on policies <em>written</em>. We pay on policies <em>effectuated</em> — meaning the beneficiary is still enrolled on the effective date and the carrier has paid the premium.</p>
              <p>This one difference shapes everything:</p>
              <ul>
                <li><strong>No chargebacks.</strong> If a policy falls off before effectuation, you were never paid for it — so you don't owe anything back.</li>
                <li><strong>We reward the right sales.</strong> The fit-first approach pays better than the volume-first approach.</li>
                <li><strong>Retention bonus after 90 days.</strong> Policies that stay on the books past 90 days trigger an additional RDR bonus.</li>
              </ul>
            `,
            takeaway: "You can't get fired for a slow day. You can get fired for rushing a bad enrollment.",
          },
          {
            id: 6,
            t: "Knowledge check",
            body: `
              <p>Quick gut-check on what you just read. This isn't graded — it just makes sure the main idea landed before we wrap up.</p>
            `,
            quiz: {
              question: "When does Magnolia pay commission on a Medicare policy?",
              options: [
                "The moment the enrollment is submitted to the carrier",
                "When the policy effectuates — the beneficiary is active on the effective date",
                "After the policy has been on the books for a full year",
                "Only if the customer renews during AEP",
              ],
              answer: 1,
              explain: "Right — effectuation means the policy is actually live and the carrier has paid. That's when you earn commission. No chargebacks if something falls off before effectuation.",
            },
          },
          {
            id: 7,
            t: "You're ready",
            body: `
              <p>That's the short version. From here, your team lead will hand you off to the department-specific onboarding path for whichever team you're joining.</p>
              <p>Need help? Some good first stops:</p>
              <ul>
                <li><strong>Your team lead</strong> — the first-line resource for anything role-specific</li>
                <li><strong>Slack #help-ops</strong> — for system / login / CRM questions</li>
                <li><strong>Slack #help-compliance</strong> — for any TPMO, SOA, or disclosure questions</li>
                <li><strong>The Operations Hub</strong> (this site) — SOPs, trainings, and resources per department</li>
              </ul>
              <p>Welcome to the team.</p>
            `,
            takeaway: "When you mark this step complete, the training shows as 100%.",
          },
        ],
      },
    ],
  },

  /* ─── HIPAA Compliance for Customer Service ─── */
  "cs-hipaa-training": {
    title: "HIPAA <em>Compliance</em> for Customer Service",
    description: "Mandatory HIPAA training covering Protected Health Information, identity verification, third-party authorization, physical security, breach response, and the Minimum Necessary Rule. Based on SOP-CS-004.",
    department: "Customer Support",
    owner: "Yanick Bass",
    duration: "45 min",
    version: "1.0",
    topics: [
      {
        t: "What Is HIPAA & PHI",
        i: 1,
        steps: [
          {
            id: 1,
            t: "HIPAA overview",
            body: `
              <p>The <strong>Health Insurance Portability and Accountability Act (HIPAA)</strong> is a federal law enacted in 1996 that protects sensitive patient health information. For a Medicare-focused agency like MyCareClub, HIPAA compliance is the legal foundation of every member interaction.</p>
              <h3>Three frameworks govern our obligations</h3>
              <ul>
                <li><strong>HIPAA Privacy Rule</strong> — governs how PHI is used, disclosed, and shared</li>
                <li><strong>HIPAA Security Rule</strong> — protects how PHI is stored, accessed, and transmitted electronically</li>
                <li><strong>CMS Guidelines</strong> — govern how Medicare plans must operate; HIPAA violations often trigger CMS complaints and audits</li>
              </ul>
              <blockquote><p>HIPAA violations carry federal penalties up to <strong>$50,000 per incident</strong>, criminal prosecution for willful neglect, and CMS audit exposure. Most violations in call centers happen during normal, routine conversations — not through malicious intent.</p></blockquote>
            `,
            takeaway: "HIPAA isn't optional — it's the legal framework behind every member conversation you'll ever have.",
          },
          {
            id: 2,
            t: "What is Protected Health Information?",
            body: `
              <p>PHI is any information that <strong>identifies a member</strong> AND <strong>relates to their health, treatment, or payment</strong>. Both conditions must be true.</p>
              <h3>PHI examples</h3>
              <ul>
                <li><strong>Name + Diagnosis</strong> = PHI</li>
                <li><strong>Member ID + Claims history</strong> = PHI</li>
                <li><strong>Date of Birth + Medications</strong> = PHI</li>
                <li><strong>Address + Treatment plan</strong> = PHI</li>
                <li><strong>Phone Number + Appointment details</strong> = PHI</li>
                <li><strong>Name alone</strong> (no health info) = Not PHI, but handle carefully</li>
                <li><strong>Diagnosis alone</strong> (no identifier) = Not PHI, but handle carefully</li>
              </ul>
              <blockquote><p><strong>Critical nuance:</strong> Even confirming that someone is a member of MyCareClub is itself a form of PHI — it links their identity to a health plan. Never confirm or deny membership to unverified callers.</p></blockquote>
            `,
            takeaway: "PHI = any info that identifies a member AND relates to their health, treatment, or payment. Both parts must be true.",
          },
          {
            id: 3,
            t: "Where PHI lives in your workflow",
            body: `
              <p>PHI isn't just in databases. It appears everywhere in your daily work:</p>
              <ul>
                <li><strong>On your screen</strong> — CRM records, carrier portals, member lookups</li>
                <li><strong>In conversations</strong> — discussing a member's plan, benefits, claims, or health status</li>
                <li><strong>In call notes</strong> — CRM documentation of member interactions</li>
                <li><strong>In emails</strong> — any correspondence that references a member and their health info</li>
                <li><strong>In your headset</strong> — if others can hear your side of the conversation</li>
              </ul>
              <h3>Tier 1 Representative Boundaries</h3>
              <p>Your access is intentionally limited:</p>
              <ul>
                <li><strong>Handle:</strong> General inquiries, account status, welcome packets, address updates</li>
                <li><strong>Do NOT access or discuss:</strong> Clinical details, specific diagnoses, treatment records, or detailed claims</li>
                <li><strong>Must escalate:</strong> Complex medical questions, clinical authorization requests, detailed claims disputes</li>
              </ul>
              <p>If a member shares clinical details you did not request, do not repeat them back. Acknowledge generally:</p>
              <blockquote><p>"I understand you have a health concern. Let me connect you with someone who can help with that specifically."</p></blockquote>
            `,
            takeaway: "HIPAA applies everywhere — on screen, in conversation, in notes, in email, and through your headset. At all times.",
          },
        ],
      },
      {
        t: "Identity Verification",
        i: 2,
        steps: [
          {
            id: 4,
            t: "The two-identifier rule",
            body: `
              <p><strong>Before discussing ANY PHI, you must verify at least TWO of the following identifiers:</strong></p>
              <ul>
                <li><strong>Full Name</strong> — "Can you spell your first and last name for me?" Match against CRM.</li>
                <li><strong>Date of Birth</strong> — "What is your date of birth?" Match MM/DD/YYYY against CRM.</li>
                <li><strong>Address or ZIP Code</strong> — "What address do we have on file for you?" or "What's your ZIP code?" Match against CRM.</li>
              </ul>
              <h3>Verification script</h3>
              <blockquote><p>"Before I can access any account information, I need to verify your identity. Can you please provide your full name and date of birth?"</p></blockquote>
              <p>After both match:</p>
              <blockquote><p>"Thank you, [NAME]. I've verified your identity. How can I help you today?"</p></blockquote>
              <h3>No exceptions — ever</h3>
              <ul>
                <li>No shortcuts — even if you recognize the caller's voice</li>
                <li>No single-identifier verification — one is never enough</li>
                <li>No manager overrides — verification is a federal requirement, not a policy preference</li>
                <li>Repeat callers still verify every time — trust is not a substitute for compliance</li>
              </ul>
            `,
            takeaway: "Two identifiers, every call, every time. No shortcuts, no overrides, no exceptions.",
          },
          {
            id: 5,
            t: "Failed verification procedure",
            body: `
              <h3>If ONE identifier fails</h3>
              <p>Ask for the third identifier: "Can you also verify the address or ZIP code we have on file?" If the third matches, proceed with caution and document the mismatch.</p>
              <h3>If TWO identifiers fail — STOP THE CALL</h3>
              <blockquote><p>"I'm sorry, but I'm unable to verify your identity with the information provided. For the security of our members, I'm not able to share any account details. If you believe this is an error, please call back with your member ID card handy."</p></blockquote>
              <h3>Critical rules when verification fails</h3>
              <ul>
                <li><strong>Do NOT provide any PHI</strong></li>
                <li><strong>Do NOT hint at what information is wrong</strong> — saying "Your DOB doesn't match" reveals you have a record</li>
                <li><strong>Document in CRM:</strong> "Identity verification failed. No PHI disclosed. Caller advised to call back with member ID."</li>
              </ul>
            `,
            takeaway: "If two identifiers fail, stop immediately. Don't hint at what's wrong — that itself reveals PHI.",
          },
          {
            id: 6,
            t: "Verification knowledge check",
            body: `
              <p>You've learned the two-identifier rule and what happens when verification fails. Let's make sure the key concept landed.</p>
            `,
            quiz: {
              question: "A caller gives you the correct full name but an incorrect date of birth. What should you do?",
              options: [
                "Proceed anyway — one identifier is enough if the name matches",
                "Ask for a third identifier (address or ZIP). If it matches, proceed with caution and document the mismatch",
                "Tell the caller their DOB doesn't match your records and ask them to try again",
                "Transfer to a supervisor to override the verification requirement",
              ],
              answer: 1,
              explain: "When one identifier fails, you request the third. If it matches, proceed cautiously and document. Never tell the caller what failed (that reveals PHI), and there are no manager overrides for identity verification.",
            },
          },
        ],
      },
      {
        t: "Third-Party Authorization",
        i: 3,
        steps: [
          {
            id: 7,
            t: "Who can access member information",
            body: `
              <p>Not everyone who calls about a member is authorized to receive their PHI.</p>
              <h3>Authorization requirements by caller type</h3>
              <ul>
                <li><strong>The member themselves</strong> — verify identity (two identifiers)</li>
                <li><strong>Authorized representative on file</strong> — must be documented in CRM; verify the representative's identity</li>
                <li><strong>Family member (not on file)</strong> — cannot share PHI, even if they're a spouse or adult child</li>
                <li><strong>Family member with member present on call</strong> — member can grant verbal permission for that call only</li>
                <li><strong>Attorney or legal representative</strong> — written authorization required; escalate to Compliance</li>
                <li><strong>Other health plan or provider</strong> — TPO exception may apply; escalate to Team Lead</li>
              </ul>
              <blockquote><p><strong>Never assume authorization based on relationship.</strong> A spouse, adult child, or caregiver has no automatic right to a member's PHI.</p></blockquote>
            `,
            takeaway: "Family relationship does NOT equal authorization. A spouse has no automatic right to PHI.",
          },
          {
            id: 8,
            t: "Verbal permission & unauthorized callers",
            body: `
              <h3>When the member is present on the call</h3>
              <p>If the member wants to authorize a third party on the same call:</p>
              <ol>
                <li>Verify the member's identity first (two identifiers)</li>
                <li>Ask the member directly:
                  <blockquote><p>"[MEMBER NAME], can you confirm that you authorize me to discuss your account information with [THIRD-PARTY NAME] who is on the call with you?"</p></blockquote>
                </li>
                <li>Wait for clear verbal confirmation</li>
                <li>Document immediately in CRM: "Member [NAME] verbally authorized [THIRD-PARTY NAME] to participate in call and receive PHI. Authorization granted [DATE/TIME]. Verbal only — not permanent."</li>
              </ol>
              <p><strong>Verbal authorization is for this call only.</strong> It does not carry forward to future calls unless formalized in writing.</p>
              <h3>When the member is NOT present</h3>
              <blockquote><p>"I understand you're calling on behalf of [MEMBER NAME], and I appreciate your concern. However, for the privacy and protection of our members, I'm unable to discuss account details without the member present on the call or a written authorization on file. Would you like information on how to set up an authorized representative?"</p></blockquote>
            `,
            takeaway: "Verbal authorization is single-call only. No member on the line = no PHI to the third party.",
          },
          {
            id: 9,
            t: "Authorization knowledge check",
            body: `
              <p>Let's test your understanding of the third-party authorization rules.</p>
            `,
            quiz: {
              question: "A woman calls saying she's the wife of a member and needs information about his plan benefits. The member is not on the call. She is NOT listed as an authorized representative in the CRM. What do you do?",
              options: [
                "Share the information — spouses have automatic authorization under HIPAA",
                "Share only basic plan information but not claims or medical details",
                "Decline to share PHI and offer information on setting up authorized representative status",
                "Ask her security questions to verify she's really his wife, then share",
              ],
              answer: 2,
              explain: "Family relationship does not equal authorization. Without the member present or written authorization on file, you cannot share PHI. Offer to help set up authorized representative status for future calls.",
            },
          },
        ],
      },
      {
        t: "Physical Security & Breach Response",
        i: 4,
        steps: [
          {
            id: 10,
            t: "Workstation security rules",
            body: `
              <h3>Daily security requirements</h3>
              <ul>
                <li><strong>Screen lock:</strong> Auto-lock after ≤5 minutes of inactivity. Manual lock (Cmd+L / Win+L) when stepping away for any reason.</li>
                <li><strong>Password sharing:</strong> Never. Under any circumstances. Including with IT support or managers.</li>
                <li><strong>Screen visibility:</strong> Position monitor so it cannot be read by passersby, visitors, or unauthorized staff.</li>
                <li><strong>Printed PHI:</strong> If printed, secure in locked drawer. Shred when no longer needed. Never leave on desk.</li>
                <li><strong>Sticky notes / whiteboards:</strong> Never write member names, DOBs, member IDs, or any PHI.</li>
                <li><strong>Speakerphone:</strong> Do not use when discussing PHI in shared or open spaces. Use headset.</li>
                <li><strong>Remote work:</strong> Same standards apply. Ensure household members cannot see screen or hear PHI conversations.</li>
              </ul>
              <h3>End-of-shift checklist</h3>
              <ul>
                <li>All CRM records closed</li>
                <li>Screen locked or workstation logged out</li>
                <li>No printed PHI on desk — filed securely or shredded</li>
                <li>No PHI on sticky notes, notepads, or whiteboards</li>
                <li>Headset secured</li>
              </ul>
            `,
            takeaway: "Lock your screen, never share passwords, no PHI on sticky notes, use a headset — same rules at home as in the office.",
          },
          {
            id: 11,
            t: "Breach identification & response",
            body: `
              <h3>What constitutes a breach</h3>
              <p>A breach is any unauthorized use, disclosure, or access of PHI:</p>
              <ul>
                <li>Shared member's plan details with an unauthorized family member — <strong>Yes, breach</strong></li>
                <li>Discussed a member's diagnosis with a coworker not on the case — <strong>Yes, breach</strong></li>
                <li>Sent an email with PHI to the wrong recipient — <strong>Yes, breach</strong></li>
                <li>Left a member's record open on screen in an open office — <strong>Yes, breach</strong></li>
                <li>Looked up your own family member's account out of curiosity — <strong>Yes, violation</strong></li>
                <li>Accidentally opened the wrong record and immediately closed it — <strong>Potential breach, document it</strong></li>
              </ul>
              <h3>Immediate breach response — four steps</h3>
              <ol>
                <li><strong>STOP.</strong> Do not continue the action that caused or may have caused the breach.</li>
                <li><strong>Do NOT attempt to fix it yourself.</strong> Do not call the wrong recipient back. Do not delete emails or alter records.</li>
                <li><strong>Report immediately.</strong> Notify your Team Lead and the Privacy Officer within the same shift.</li>
                <li><strong>The Privacy Officer handles all next steps.</strong> Investigation, notification, and remediation are not your responsibility.</li>
              </ol>
              <blockquote><p>MyCareClub maintains a strict <strong>non-retaliation policy</strong> for good-faith breach reporting. You will never be punished for reporting a breach — yours or someone else's. Failure to report is itself a violation.</p></blockquote>
            `,
            takeaway: "Report immediately, don't try to fix it yourself. Over-reporting is always better than under-reporting.",
          },
          {
            id: 12,
            t: "Breach response knowledge check",
            body: `
              <p>Breach response is one of the most critical procedures in this training. Let's make sure you know exactly what to do.</p>
            `,
            quiz: {
              question: "You accidentally emailed a member's claims summary to the wrong email address. What is the correct first action?",
              options: [
                "Email the wrong recipient and ask them to delete it, then pretend it didn't happen",
                "Stop, do NOT try to fix it, and report to your Team Lead and the Privacy Officer within the same shift",
                "Delete the sent email from your outbox so there's no record of it",
                "Wait until your next shift to report it — it's not urgent since it was accidental",
              ],
              answer: 1,
              explain: "Stop immediately and report to your Team Lead and Privacy Officer within the same shift. Never try to fix a breach yourself — don't contact the wrong recipient, don't delete evidence. The Privacy Officer handles investigation and remediation.",
            },
          },
        ],
      },
      {
        t: "HIPAA in Daily Practice",
        i: 5,
        steps: [
          {
            id: 13,
            t: "The Minimum Necessary Rule",
            body: `
              <p>The Minimum Necessary Rule requires that you <strong>only access and share the minimum amount of PHI needed to accomplish the task at hand</strong>. Not everything you can see in the system should be shared with the caller.</p>
              <h3>Applying minimum necessary on calls</h3>
              <ul>
                <li><strong>Caller asks "What's my deductible?"</strong> → Share deductible amount and plan year. Do NOT share claims history, diagnosis codes, or provider names.</li>
                <li><strong>Caller asks "Did you receive my enrollment?"</strong> → Share enrollment status. Do NOT share other members' info or internal processing notes.</li>
                <li><strong>Caller asks "Is Dr. Smith in my network?"</strong> → Share Yes/No and alternatives if no. Do NOT share other providers the member has seen.</li>
              </ul>
              <h3>System access rules</h3>
              <ul>
                <li>Only open member records you are actively working on — do not browse</li>
                <li>Close records when the call ends — do not leave accounts open on screen</li>
                <li><strong>Never access your own account, a family member's account, or a friend's account</strong> — this is a violation even if you don't share the information</li>
                <li>If you accidentally open the wrong record — close it immediately, do not read it, document the incident</li>
              </ul>
            `,
            takeaway: "Share only what is necessary. Access only what you need. If they didn't ask, don't volunteer it.",
          },
          {
            id: 14,
            t: "Annual training & final knowledge check",
            body: `
              <p>HIPAA training is required <strong>every year</strong> for all staff who handle PHI. This is a federal requirement, not a company preference.</p>
              <h3>Key reminders to carry with you</h3>
              <ol>
                <li><strong>Verify identity</strong> — two identifiers, every call, every time</li>
                <li><strong>Protect PHI</strong> — on screen, on paper, in conversation, in email</li>
                <li><strong>Follow the Minimum Necessary Rule</strong> — only what you need, only what they need</li>
                <li><strong>Report incidents immediately</strong> — the Privacy Officer handles it from there</li>
              </ol>
              <h3>QA auto-fail triggers</h3>
              <p>Any of these result in an <strong>automatic failure</strong> of the entire QA evaluation:</p>
              <ul>
                <li>No identity verification performed before sharing PHI</li>
                <li>Only one identifier used instead of two</li>
                <li>PHI shared with an unauthorized person</li>
                <li>Oversharing medical or claims data beyond what was asked</li>
              </ul>
              <blockquote><p>An auto-fail requires immediate coaching and re-training before the agent returns to the phones.</p></blockquote>
            `,
            quiz: {
              question: "Which of the following is NOT a QA auto-fail trigger for HIPAA?",
              options: [
                "No identity verification performed before sharing PHI",
                "Using only one identifier instead of the required two",
                "Taking longer than 12 minutes on a call",
                "Sharing PHI with an unauthorized person",
              ],
              answer: 2,
              explain: "Call handle time is a performance metric, not a HIPAA compliance trigger. The auto-fail triggers are: no verification, single-identifier verification, PHI to an unauthorized person, and oversharing medical/claims data.",
            },
          },
        ],
      },
    ],
  },

  /* ─── Call Scenario Training & Risk Assessment ─── */
  "cs-scenario-training": {
    title: "Call Scenario <em>Training</em> & Risk Assessment",
    description: "Risk-based response framework covering 8 real call scenarios across three risk tiers — Low, Moderate, High, and Critical. Learn to classify, respond, and escalate correctly. Based on SOP-CS-007.",
    department: "Customer Support",
    owner: "Yanick Bass",
    duration: "60 min",
    version: "1.0",
    topics: [
      {
        t: "Risk Assessment Framework",
        i: 1,
        steps: [
          {
            id: 1,
            t: "The three-tier risk model",
            body: `
              <p>Every member call falls into a predictable pattern. This training classifies scenarios into <strong>three risk tiers</strong> that drive your entire response — how much latitude you have, what language is safe, when to escalate, and how to document.</p>
              <h3>Risk levels at a glance</h3>
              <ul>
                <li><strong>LOW (Level 1)</strong> — Full authority. Handle independently. Provide info, document, close. Examples: ID card inquiries, transportation benefits.</li>
                <li><strong>MODERATE (Level 2)</strong> — Limited authority. Proceed with caution. CTM risk is emerging. Watch your language. Examples: copay confusion, provider network issues.</li>
                <li><strong>HIGH (Level 3)</strong> — No authority to resolve. Contain and escalate immediately. Supervisor REQUIRED. Examples: enrollment disputes, cancellation requests, agent complaints.</li>
                <li><strong>CRITICAL</strong> — Maximum response. Stop all discussion. Triple escalation: Supervisor + Compliance + Carrier. Example: unauthorized enrollment allegations.</li>
              </ul>
              <blockquote><p>When in doubt, escalate up. An unnecessary escalation costs nothing; a missed one can cost everything.</p></blockquote>
            `,
            takeaway: "The risk level dictates your response authority. LOW = handle it. MODERATE = careful. HIGH = escalate immediately.",
          },
          {
            id: 2,
            t: "The escalation ladder",
            body: `
              <h3>How scenarios flow through the system</h3>
              <p>Every call starts with classification. The risk tier determines your path:</p>
              <ul>
                <li><strong>Level 1 (Low Risk)</strong> → CSR handles independently → Document standard notes → Monitor for upgrade triggers</li>
                <li><strong>Level 2 (Moderate Risk)</strong> → CSR proceeds with caution → Document with enhanced detail including exact language → Actively monitor for trigger phrases that upgrade to High</li>
                <li><strong>Level 3 (High Risk)</strong> → CSR contains and escalates → Supervisor REQUIRED on every call → Document EXACT member words → Compliance notification as needed</li>
                <li><strong>Critical</strong> → STOP all discussion → Triple escalation mandatory → Preserve all evidence → Maximum documentation</li>
              </ul>
              <h3>The upgrade mechanism</h3>
              <p>Moderate risk calls can <strong>upgrade to High Risk</strong> instantly if the member uses trigger phrases like:</p>
              <ul>
                <li><em>"I was misled"</em></li>
                <li><em>"I want to file a complaint"</em></li>
                <li><em>"Your agent lied to me"</em></li>
                <li><em>"I'm going to report this"</em></li>
              </ul>
              <p>If you hear any of these during a Moderate call, <strong>stop what you're doing and shift to High Risk handling immediately</strong>.</p>
            `,
            takeaway: "Moderate calls can upgrade to High Risk in a single sentence. Know the trigger phrases by heart.",
          },
        ],
      },
      {
        t: "Low Risk Scenarios",
        i: 2,
        steps: [
          {
            id: 3,
            t: "Scenario: ID card status",
            body: `
              <p><strong>Trigger statement:</strong> <em>"I haven't received my ID card."</em></p>
              <p><strong>Risk Level:</strong> LOW — Full authority to resolve</p>
              <h3>Response sequence</h3>
              <ol>
                <li><strong>Verify identity</strong> — confirm name, DOB, callback number</li>
                <li><strong>Check enrollment effective date</strong> in PolicyDen:
                  <blockquote><p>"I can see your plan was approved on [DATE]. Let me check on the status of your card."</p></blockquote>
                </li>
                <li><strong>Educate on mailing timeframe:</strong>
                  <blockquote><p>"ID cards are mailed by the carrier within 10–14 business days of your effective date. Based on your approval date, you should receive yours by [DATE + 14 business days]."</p></blockquote>
                </li>
                <li><strong>Offer resolution:</strong> If within timeframe, reassure. If past timeframe, offer replacement + digital copy.</li>
              </ol>
              <h3>What to avoid</h3>
              <ul>
                <li><strong>Don't say:</strong> "The carrier is slow" → <strong>Say:</strong> "Cards typically arrive within 10–14 business days"</li>
                <li><strong>Don't say:</strong> "It should be there by Friday" → <strong>Say:</strong> "The standard timeframe is 10–14 business days from [DATE]"</li>
                <li><strong>Don't say:</strong> "I don't know why you haven't gotten it" → <strong>Say:</strong> "Let me look into the status for you"</li>
              </ul>
            `,
            takeaway: "ID card inquiries are Low Risk — you can handle them. Never blame the carrier or guess specific dates.",
          },
          {
            id: 4,
            t: "Scenario: Transportation & basic benefits",
            body: `
              <p><strong>Trigger statement:</strong> <em>"Do I have transportation benefits?"</em></p>
              <p><strong>Risk Level:</strong> LOW</p>
              <h3>Response sequence</h3>
              <ol>
                <li>Verify identity</li>
                <li>Provide high-level guidance:
                  <blockquote><p>"Many Medicare Advantage plans include transportation benefits for medical appointments. Your plan [does / may] include this benefit."</p></blockquote>
                </li>
                <li>Direct to carrier for specifics:
                  <blockquote><p>"For the specifics — how many rides per year, how to schedule, and any restrictions — the best next step is to contact your carrier directly. They'll set everything up for you. Would you like their number?"</p></blockquote>
                </li>
              </ol>
              <h3>What to avoid</h3>
              <ul>
                <li><strong>Don't say:</strong> "You get 24 rides per year" — giving exact limits you're unsure of creates liability</li>
                <li><strong>Don't say:</strong> "I can schedule that for you" — CSRs are not carrier representatives</li>
                <li><strong>Don't say:</strong> "All plans have transportation" — not all plans do</li>
              </ul>
              <h3>Escalation trigger</h3>
              <p>If the member says <em>"My agent told me I get unlimited rides"</em> — this is no longer Low Risk. Treat as Moderate or shift to agent complaint handling.</p>
            `,
            takeaway: "Provide general guidance and direct to carrier for specifics. Never guess exact benefit details.",
          },
          {
            id: 5,
            t: "Low Risk knowledge check",
            body: `
              <p>Let's confirm you can handle Low Risk scenarios confidently.</p>
            `,
            quiz: {
              question: "A member asks 'Do I have dental benefits?' Which response is correct?",
              options: [
                "'Yes, your plan includes two dental cleanings per year and $1,000 in coverage.'",
                "'Many Medicare Advantage plans include dental benefits. Your carrier can confirm the specifics for your plan. Would you like their number?'",
                "'I'm not sure — let me transfer you to someone who knows.'",
                "'All Medicare plans include dental, so yes.'",
              ],
              answer: 1,
              explain: "Provide general guidance without committing to specific benefit details you might get wrong. Direct to the carrier for exact coverage. Never guess specifics — that creates liability.",
            },
          },
        ],
      },
      {
        t: "Moderate Risk Scenarios",
        i: 3,
        steps: [
          {
            id: 6,
            t: "Scenario: Copay confusion with CTM risk",
            body: `
              <p><strong>Trigger statement:</strong> <em>"I was told my visit would be free, but I got charged."</em></p>
              <p><strong>Risk Level:</strong> MODERATE — CTM risk is emerging</p>
              <h3>Response sequence</h3>
              <ol>
                <li><strong>Acknowledge without admitting fault:</strong>
                  <blockquote><p>"I understand that's frustrating, and I want to help you get clarity on this."</p></blockquote>
                  <p><em>Do NOT say: "That shouldn't have happened" or "Someone gave you wrong information."</em></p>
                </li>
                <li><strong>Gather details:</strong> Visit type, date, who told them it would be free</li>
                <li><strong>Provide general explanation:</strong>
                  <blockquote><p>"Copays can vary depending on the type of visit, the provider, and whether they're in-network. Some visits — like your annual wellness visit — are typically covered at no cost, while others may have a copay."</p></blockquote>
                </li>
                <li><strong>Direct to authoritative source:</strong> EOC document or carrier connection</li>
              </ol>
              <h3>Listen for trigger phrases that upgrade to HIGH</h3>
              <ul>
                <li><em>"I was misled"</em> → Immediately shift to High Risk agent complaint handling</li>
                <li><em>"I want to file a complaint"</em> → Immediately shift to High Risk</li>
                <li><em>"Your agent lied to me"</em> → Immediately shift to High Risk</li>
                <li><em>"I'm going to report this"</em> → Immediately shift to High Risk</li>
              </ul>
            `,
            takeaway: "Never admit fault. Clarify copay variability and direct to the EOC. Listen for trigger phrases that upgrade the risk.",
          },
          {
            id: 7,
            t: "Scenario: Provider not in network",
            body: `
              <p><strong>Trigger statement:</strong> <em>"My doctor isn't covered."</em></p>
              <p><strong>Risk Level:</strong> MODERATE</p>
              <h3>Response sequence</h3>
              <ol>
                <li><strong>Acknowledge frustration:</strong>
                  <blockquote><p>"I understand how important your doctor is to you, and I'm sorry you're dealing with this."</p></blockquote>
                </li>
                <li><strong>Explain network variability:</strong>
                  <blockquote><p>"Provider networks can change from year to year, and sometimes providers update their participation status. This doesn't necessarily mean there was an error — networks do shift."</p></blockquote>
                </li>
                <li><strong>Offer provider lookup:</strong> Search carrier directory by specialty and ZIP, provide 2–3 alternatives</li>
                <li><strong>Offer carrier connection</strong> for network status confirmation</li>
              </ol>
              <h3>What to avoid vs. what to say</h3>
              <ul>
                <li><strong>Don't say:</strong> "The agent should have checked" → <strong>Say:</strong> "Networks can change — let me help you find a solution"</li>
                <li><strong>Don't say:</strong> "That doctor was never in-network" → <strong>Say:</strong> "Let me verify the current network status for you"</li>
                <li><strong>Don't say:</strong> "There's nothing we can do" → <strong>Say:</strong> "Here are your options…"</li>
              </ul>
              <h3>Escalation triggers</h3>
              <ul>
                <li><em>"I was told they were in-network"</em> → Shift to High Risk immediately</li>
                <li><em>"My agent promised this doctor was covered"</em> → Shift to High Risk immediately</li>
                <li><em>"I picked this plan because of my doctor"</em> → Document carefully; one more signal = HIGH</li>
              </ul>
            `,
            takeaway: "Never say 'there's nothing we can do.' Offer alternatives and watch for phrases that upgrade the risk tier.",
          },
          {
            id: 8,
            t: "Moderate Risk knowledge check",
            body: `
              <p>Moderate Risk calls are where most CTM complaints originate. Let's test your awareness.</p>
            `,
            quiz: {
              question: "During a copay confusion call, the member says 'Your agent lied to me about my copay.' What should you do?",
              options: [
                "Explain that copays vary by visit type and offer to review the EOC document",
                "Apologize and say 'I'm sorry the agent gave you wrong information'",
                "Immediately stop Moderate handling and shift to High Risk — contain, document exact words, escalate to supervisor",
                "Pull up the enrollment call recording to see what the agent actually said",
              ],
              answer: 2,
              explain: "'Your agent lied to me' is a High Risk trigger phrase. The moment you hear it, stop Moderate handling, switch to High Risk protocol: stay neutral, document the member's exact words verbatim, and escalate to a supervisor immediately. Do NOT investigate, admit fault, or defend.",
            },
          },
        ],
      },
      {
        t: "High Risk Scenarios",
        i: 4,
        steps: [
          {
            id: 9,
            t: "Scenario: Enrollment dispute",
            body: `
              <p><strong>Trigger statement:</strong> <em>"I didn't sign up for this" / "I never agreed to this plan"</em></p>
              <p><strong>Risk Level:</strong> HIGH — Immediate CTM risk</p>
              <h3>The High Risk golden rules</h3>
              <ol>
                <li>Stay neutral and calm — your tone is the first line of defense</li>
                <li>Do NOT investigate or attempt to fix the problem on the call</li>
                <li>Do NOT defend the agent, the company, or the enrollment</li>
                <li>Document the member's <strong>EXACT WORDS</strong> — this is your most important job</li>
                <li>Escalate to Supervisor <strong>IMMEDIATELY</strong></li>
              </ol>
              <h3>What to say</h3>
              <blockquote><p>"I hear your concern, and I want to make sure this is handled properly."</p></blockquote>
              <blockquote><p>"This is something I need to bring to my supervisor right away. Can you hold for just a moment while I connect you?"</p></blockquote>
              <h3>What NOT to do</h3>
              <ul>
                <li><strong>Don't say:</strong> "Let me check who enrolled you" — you are not investigating</li>
                <li><strong>Don't say:</strong> "I see your enrollment right here" — confrontational</li>
                <li><strong>Don't say:</strong> "The agent followed the process" — defending before investigation</li>
                <li><strong>Don't say:</strong> "Are you sure you didn't agree?" — leading question, CMS violation risk</li>
                <li><strong>Don't say:</strong> "We can just switch your plan" — unauthorized fix attempt</li>
              </ul>
            `,
            takeaway: "Enrollment disputes are HIGH RISK. Don't investigate, don't defend, don't fix. Contain, document exact words, escalate.",
          },
          {
            id: 10,
            t: "Scenario: Cancellation request",
            body: `
              <p><strong>Trigger statement:</strong> <em>"I want to cancel my plan."</em></p>
              <p><strong>Risk Level:</strong> HIGH — Retention + CTM risk</p>
              <h3>Response sequence</h3>
              <ol>
                <li><strong>Acknowledge without blocking:</strong>
                  <blockquote><p>"I understand. Before we proceed, I want to make sure you're connected with the right person to help."</p></blockquote>
                  <p><em>Do NOT say: "Why would you want to cancel?" or "Are you sure?"</em></p>
                </li>
                <li><strong>Warm transfer to Supervisor:</strong>
                  <blockquote><p>"Cancellation requests are handled by our supervisors to make sure everything is processed correctly and you have all the information you need. Let me connect you now."</p></blockquote>
                </li>
                <li><strong>Only the Supervisor</strong> is authorized to use approved save language. CSRs do NOT attempt retention.</li>
                <li><strong>If member insists on immediate cancellation:</strong>
                  <blockquote><p>"I respect your decision. Let me connect you with the carrier to process the cancellation directly."</p></blockquote>
                  <p><em>Do NOT block or delay the cancellation. Pressuring a member to stay is a CTM trigger.</em></p>
                </li>
              </ol>
            `,
            takeaway: "Never block a cancellation. Acknowledge, transfer to supervisor. Only supervisors attempt retention.",
          },
          {
            id: 11,
            t: "Scenario: Agent complaint",
            body: `
              <p><strong>Trigger statement:</strong> <em>"My agent lied to me" / "I was misled"</em></p>
              <p><strong>Risk Level:</strong> HIGH</p>
              <h3>Response sequence</h3>
              <ol>
                <li><strong>Acknowledge without validating or dismissing:</strong>
                  <blockquote><p>"I'm sorry you're feeling that way. I want to make sure your concern is heard and addressed properly."</p></blockquote>
                </li>
                <li><strong>Stay neutral:</strong>
                  <ul>
                    <li>Don't say "Yes, that agent has had issues before" (validating)</li>
                    <li>Don't say "I'm sure the agent didn't mean to mislead you" (dismissing)</li>
                    <li>Don't say "That's not what happened" (confrontational)</li>
                  </ul>
                  <blockquote><p>"I take this seriously, and I need to get the right person involved."</p></blockquote>
                </li>
                <li><strong>Do NOT investigate:</strong> Don't pull up recordings. Don't ask the member to prove their claim. If they volunteer information, write it down verbatim.</li>
                <li><strong>Escalate to Supervisor + Compliance:</strong>
                  <blockquote><p>"I'm going to connect you with my supervisor right now. They'll make sure your concern is formally documented and reviewed."</p></blockquote>
                </li>
              </ol>
              <p><strong>Document the member's EXACT allegation language.</strong> Not a summary, not a paraphrase — their actual words.</p>
            `,
            takeaway: "Never agree or disagree with the accusation. Stay neutral, document verbatim, escalate to Supervisor + Compliance.",
          },
          {
            id: 12,
            t: "High Risk knowledge check",
            body: `
              <p>High Risk calls are where compliance exposure is highest. This quiz covers the most common mistakes.</p>
            `,
            quiz: {
              question: "A member says 'I want to cancel my plan.' What is the FIRST thing a CSR should say?",
              options: [
                "'Can I ask why you want to cancel? There may be a better plan for you.'",
                "'Are you sure? You'll lose all your coverage.'",
                "'I understand. Let me connect you with the right person to help.'",
                "'Let me pull up your policy and see what options we have.'",
              ],
              answer: 2,
              explain: "Cancellations go straight to the supervisor via warm transfer. CSRs do not ask 'why' in a challenging tone, do not attempt retention ('Are you sure?' is pressure), and do not try to resolve it themselves. Acknowledge and transfer.",
            },
          },
        ],
      },
      {
        t: "Critical Risk: Unauthorized Enrollment",
        i: 5,
        steps: [
          {
            id: 13,
            t: "Scenario: Unauthorized enrollment / POA",
            body: `
              <p><strong>Trigger statement:</strong> <em>"Someone signed me up without my permission" / "I never authorized this"</em></p>
              <p><strong>Risk Level:</strong> CRITICAL — Legal + CMS violation territory</p>
              <p><strong>This is the highest-severity scenario. Treat it accordingly.</strong></p>
              <h3>Immediate response</h3>
              <blockquote><p>"I take this very seriously. I need to connect you with my supervisor and the carrier right away."</p></blockquote>
              <h3>What you must NOT do</h3>
              <ul>
                <li>Do NOT ask "Who signed you up?"</li>
                <li>Do NOT ask "When did this happen?"</li>
                <li>Do NOT ask "Are you sure you didn't authorize it?"</li>
                <li>Do NOT offer to cancel or switch the plan</li>
                <li>Do NOT say "I'm sure it was a misunderstanding"</li>
              </ul>
              <p>If the member volunteers information, <strong>write it down verbatim</strong>. But do NOT prompt for details.</p>
              <h3>Triple escalation — ALL THREE MANDATORY</h3>
              <ol>
                <li><strong>SUPERVISOR</strong> — warm transfer IMMEDIATELY: <em>"CRITICAL: Member alleging unauthorized enrollment. Scenario 8. I need you on this call NOW."</em></li>
                <li><strong>COMPLIANCE</strong> — notify within 30 minutes. Direct contact — do not rely on CRM flag alone.</li>
                <li><strong>CARRIER</strong> — member MUST be connected to carrier's enrollment dispute process.</li>
              </ol>
              <p><strong>Preserve the call recording. Flag DO NOT DELETE.</strong></p>
            `,
            takeaway: "Unauthorized enrollment = maximum response. Stop discussion. Triple escalation. Preserve all evidence.",
          },
          {
            id: 14,
            t: "Critical Risk knowledge check",
            body: `
              <p>This is the most important quiz in this training. Unauthorized enrollment allegations have the highest regulatory exposure.</p>
            `,
            quiz: {
              question: "A member says 'Someone signed me up without my permission.' Which response follows the correct protocol?",
              options: [
                "'Who signed you up? Let me look into what happened.'",
                "'I take this very seriously. I need to connect you with my supervisor and the carrier right away.'",
                "'I'm sure it was just a misunderstanding. Let me pull up your enrollment.'",
                "'Would you like me to cancel the plan for you right now?'",
              ],
              answer: 1,
              explain: "The ONLY acceptable response is to take it seriously and immediately connect to supervisor and carrier. Do NOT investigate ('Who signed you up?'), minimize ('misunderstanding'), or attempt resolution ('cancel for you'). This triggers triple escalation: Supervisor + Compliance + Carrier.",
            },
          },
        ],
      },
    ],
  },

  /* ─── Tier 1 CSR Onboarding ─── */
  "cs-tier1-onboarding": {
    title: "Tier 1 CSR <em>Onboarding</em>",
    description: "Complete onboarding for non-licensed Tier 1 Customer Service Representatives — call opening, HIPAA verification, the Cardinal Rule, warm transfers, closing, and CRM documentation. Based on SOP-CS-001.",
    department: "Customer Support",
    owner: "Yanick Bass",
    duration: "8 modules",
    version: "1.0",
    topics: [
      {
        t: "Your Role at MyCareClub",
        i: 1,
        steps: [
          {
            id: 1,
            t: "The CS department overview",
            body: `
              <p>MyCareClub's Customer Service department is the <strong>primary owner of the member relationship</strong>. Every call is an opportunity to demonstrate three core values:</p>
              <ul>
                <li><strong>Candid Communication</strong> — say what needs to be said, clearly and honestly</li>
                <li><strong>Extreme Ownership</strong> — if the member called you, it's your problem until it's resolved or properly handed off</li>
                <li><strong>Honorable Commitments</strong> — never promise what you can't deliver</li>
              </ul>
              <h3>Business hours & contact numbers</h3>
              <ul>
                <li><strong>Hours:</strong> Monday–Friday, 9:00 AM – 6:00 PM Eastern Time</li>
                <li><strong>MyCareClub CS:</strong> 954-902-7248</li>
                <li><strong>Magnolia CS:</strong> 954-686-3267</li>
              </ul>
            `,
            takeaway: "You own the member relationship. Every call matters. Candid, accountable, and honest — every time.",
          },
          {
            id: 2,
            t: "The two-tier structure",
            body: `
              <p>MyCareClub operates a <strong>two-tier structure</strong> that separates general intake from licensed benefits guidance:</p>
              <h3>Tier 1 (You) — Non-Licensed</h3>
              <ul>
                <li>First point of contact for all inbound calls</li>
                <li>Handles HIPAA verification, call documentation, general assistance, and routing</li>
                <li><strong>NOT required</strong> to hold an insurance license</li>
                <li><strong>CANNOT</strong> interpret or advise on plan benefits under any circumstances</li>
              </ul>
              <h3>Tier 2 — Licensed</h3>
              <ul>
                <li>Holds a <strong>2-15 or 2-40</strong> insurance license, <strong>AHIP certification</strong>, and <strong>Medicare certification</strong></li>
                <li>Can review and explain benefits, cost-sharing, coverage details</li>
                <li>Handles claims inquiries, carrier coordination, and escalations</li>
              </ul>
              <blockquote><p>The Tier 1 → Tier 2 boundary is a <strong>compliance firewall</strong>. You giving benefits advice — even if you think you know the answer — creates regulatory exposure for the entire company.</p></blockquote>
            `,
            quiz: {
              question: "Which of the following can a Tier 1 CSR handle independently?",
              options: [
                "Explaining a member's copay amount for specialist visits",
                "Sending a replacement welcome packet and updating an address",
                "Telling a member which drugs are covered by their formulary",
                "Advising a member that their plan covers dental cleanings",
              ],
              answer: 1,
              explain: "Welcome packets and address updates are administrative tasks within Tier 1 scope. Copays, formulary questions, and benefit coverage are all benefits interpretation — that requires a licensed Tier 2 agent.",
            },
          },
        ],
      },
      {
        t: "Opening the Call",
        i: 2,
        steps: [
          {
            id: 3,
            t: "The greeting script — word for word",
            body: `
              <p>Every call begins the same way. <strong>No improvisation.</strong></p>
              <blockquote><p>"Good morning/afternoon, thank you for calling MyCareClub. My name is [Your First Name]. May I have your full name please?"</p></blockquote>
              <h3>Key points</h3>
              <ul>
                <li><strong>Smile</strong> during the greeting — tone carries over the phone</li>
                <li>Speak <strong>clearly and at a conversational pace</strong> (not rushed)</li>
                <li>Use <em>"good morning"</em> before 12:00 PM ET, <em>"good afternoon"</em> after</li>
                <li>If the caller is hard of hearing, offer to speak louder or more slowly</li>
              </ul>
            `,
            takeaway: "Say it exactly as written. Every time. Smile when you say it — they'll hear the difference.",
          },
          {
            id: 4,
            t: "HIPAA verification sequence",
            body: `
              <p>After getting the member's name, verify identity with three pieces of information — <strong>all three required before discussing any account details</strong>.</p>
              <h3>Step 1: Date of Birth</h3>
              <blockquote><p>"Thank you, [Member Name]. For verification purposes, can you please provide me with your date of birth?"</p></blockquote>
              <ul>
                <li>Request MM/DD/YYYY format</li>
                <li>Cross-reference against PolicyDen account</li>
                <li>If no match: "Can you spell your first and last name for me?"</li>
                <li>If still no match: "I'm not finding your account. Can you verify the name the policy is under?"</li>
              </ul>
              <h3>Step 2: ZIP Code</h3>
              <blockquote><p>"And can you confirm the zip code on file for your account?"</p></blockquote>
              <ul>
                <li>Cross-reference against PolicyDen record</li>
                <li>If mismatch: "Has your address changed recently?" — update if confirmed</li>
              </ul>
              <p><strong>HIPAA is complete when you have confirmed:</strong> ✓ Full name ✓ Date of birth ✓ Zip code</p>
              <p><strong>Do NOT proceed with any information until identity is confirmed.</strong></p>
            `,
            takeaway: "Name, DOB, ZIP — all three confirmed against the CRM before you discuss anything about the account.",
          },
          {
            id: 5,
            t: "Caller relationship check",
            body: `
              <p>After HIPAA verification, determine who you're talking to:</p>
              <blockquote><p>"Are you the member, or are you calling on behalf of someone?"</p></blockquote>
              <h3>If the caller IS the member</h3>
              <p>Proceed to active listening and routing.</p>
              <h3>If the caller is NOT the member</h3>
              <p>You <strong>MUST</strong> get permission from the actual member before discussing any information:</p>
              <blockquote><p>"Is the member available to give verbal authorization for me to discuss their information with you?"</p></blockquote>
              <ul>
                <li><strong>Member available:</strong> Get the member on the line. Ask: "[Member Name], do I have your permission to discuss your account information with [Caller Name]?" Wait for affirmative response. Document in CRM.</li>
                <li><strong>Member unavailable:</strong>
                  <blockquote><p>"I understand, but for HIPAA compliance I'm unable to discuss member information without their authorization. Can you have them call us, or can we schedule a three-way call?"</p></blockquote>
                </li>
              </ul>
            `,
            takeaway: "Always ask. If the member isn't on the call and isn't listed as authorized, you cannot share anything.",
          },
        ],
      },
      {
        t: "The Cardinal Rule",
        i: 3,
        steps: [
          {
            id: 6,
            t: "NO benefits interpretation — ever",
            body: `
              <p><strong>This is the most important rule in your role as a Tier 1 CSR.</strong></p>
              <p>You are <strong>NOT</strong> licensed. You <strong>CANNOT</strong> interpret, explain, or advise on plan benefits — period. This is non-negotiable.</p>
              <h3>If the member mentions ANY of these topics, transfer to Tier 2 immediately</h3>
              <ul>
                <li>Benefits, coverage, or "what does my plan cover?"</li>
                <li>Copays, deductibles, coinsurance, out-of-pocket costs</li>
                <li>Prescription drug coverage or formulary questions</li>
                <li>Claims, billing, or explanation of benefits (EOB)</li>
                <li>Network status of a doctor, hospital, or facility</li>
                <li>Prior authorization or referral requirements</li>
                <li>Plan comparisons or plan changes</li>
              </ul>
              <h3>The redirect script</h3>
              <blockquote><p>"I want to make sure you get the most accurate information. I'm going to connect you with a licensed agent who can assist you further."</p></blockquote>
              <h3>What you must NOT do</h3>
              <ul>
                <li>Try to answer the benefits question yourself</li>
                <li>Say "I think your plan covers..." or "Usually plans cover..."</li>
                <li>Look up benefits information and relay it</li>
                <li>Offer your opinion on coverage</li>
              </ul>
            `,
            takeaway: "The moment benefits come up, say the redirect script and transfer. Even if you think you know the answer — don't.",
          },
          {
            id: 7,
            t: "Cardinal Rule knowledge check",
            body: `
              <p>This rule is so important that violating it is a compliance incident. Let's make sure it's clear.</p>
            `,
            quiz: {
              question: "A member says 'Is my eye doctor covered by my plan?' You happen to know the answer from a previous call with another member on the same plan. What do you do?",
              options: [
                "Share the answer since you already know it — it saves the member time",
                "Say 'I think so, but let me transfer you to confirm'",
                "Say 'I want to make sure you get the most accurate information. I'm going to connect you with a licensed agent who can assist you further.'",
                "Look it up in the carrier portal and read the answer to the member",
              ],
              answer: 2,
              explain: "Provider network status is a benefits question. It doesn't matter if you 'know' the answer — you are not licensed to interpret or relay benefits information. Use the exact redirect script and transfer to Tier 2. Every time.",
            },
          },
        ],
      },
      {
        t: "Warm Transfer Protocol",
        i: 4,
        steps: [
          {
            id: 8,
            t: "Scenario routing: A, B, and C",
            body: `
              <p>After listening and paraphrasing the member's concern, route based on the situation:</p>
              <h3>Scenario A — Licensed agent available</h3>
              <p>Warm transfer immediately.</p>
              <blockquote><p>"I have a licensed agent available right now. I'm going to connect you. Please hold for just a moment."</p></blockquote>
              <h3>Scenario B — Licensed agent busy</h3>
              <p>Schedule a callback.</p>
              <blockquote><p>"I apologize, but all of our licensed agents are currently assisting other members. I'd like to schedule a callback for you so we can make sure you get the help you need. What's the best time and number to reach you?"</p></blockquote>
              <h3>Scenario C — Escalation required</h3>
              <p>The member is upset, hostile, or the situation requires immediate supervisor involvement.</p>
              <blockquote><p>"I completely understand your frustration, and I want to make sure this is handled properly. I'm going to connect you with my supervisor who has the authority to address your concern directly. Can you please hold for just a moment?"</p></blockquote>
            `,
            takeaway: "Three scenarios, three scripts. Agent available = transfer. Agent busy = callback. Upset member = supervisor.",
          },
          {
            id: 9,
            t: "The warm transfer handoff script",
            body: `
              <p>When transferring to a Tier 2 agent, use this <strong>exact handoff format</strong>:</p>
              <blockquote><p>"Hi, this is [Your Tier 1 Name] from Member Services. I have [Member Name] on the line. Member has been HIPAA verified with full name, date of birth, and zip code. They're calling regarding [brief summary of the issue]. No escalation at this time. Can you assist?"</p></blockquote>
              <h3>Then bring the member back</h3>
              <blockquote><p>"[Member Name], I have [Tier 2 Agent Name] on the line. They'll be able to help you from here."</p></blockquote>
              <p>Listen for acknowledgment from both parties, then disconnect.</p>
              <h3>The golden rule</h3>
              <p><strong>Never cold transfer a member.</strong> No context, no handoff, no warm introduction = the member has to start over. That's how you generate complaints.</p>
            `,
            takeaway: "Always warm transfer with the full handoff script. Never, ever cold transfer.",
          },
          {
            id: 10,
            t: "Transfer knowledge check",
            body: `
              <p>Warm transfers are a core competency. Let's check your readiness.</p>
            `,
            quiz: {
              question: "You need to transfer a member to Tier 2, but all licensed agents are busy. What do you do?",
              options: [
                "Cold transfer them to the Tier 2 queue and let them wait",
                "Try to answer their benefits question yourself since no one is available",
                "Schedule a callback — collect preferred date/time, phone number, and a brief summary of the issue",
                "Tell them to call back later when agents are available",
              ],
              answer: 2,
              explain: "When Tier 2 is unavailable, schedule a callback with all the details (date/time, phone, issue summary). Never cold transfer, never attempt benefits yourself, and never tell a member to just 'call back.'",
            },
          },
        ],
      },
      {
        t: "Closing & Documentation",
        i: 5,
        steps: [
          {
            id: 11,
            t: "Closing the call",
            body: `
              <h3>Final offer to help</h3>
              <blockquote><p>"Is there anything else I can assist you with today?"</p></blockquote>
              <ul>
                <li>If yes — handle the additional request (or route to the appropriate Scenario)</li>
                <li>If no — proceed to close</li>
              </ul>
              <h3>Closing statement</h3>
              <blockquote><p>"Thank you for calling MyCareClub. Have a great day."</p></blockquote>
              <p>Short, warm, professional. Don't rush the goodbye.</p>
            `,
            takeaway: "Always offer one more chance to help. Then close with warmth.",
          },
          {
            id: 12,
            t: "CRM documentation requirements",
            body: `
              <p><strong>Every single call requires a CRM entry. No exceptions. Within 15 minutes of call end.</strong></p>
              <h3>Standard Tier 1 call entry template</h3>
              <ul>
                <li><strong>Call Details:</strong> Date/time, caller name, phone, DOB, ZIP, HIPAA verified (Yes/No), calling on behalf (Self or relationship + authorization status)</li>
                <li><strong>Call Type:</strong> Welcome Packet / Address Update / Callback Scheduled / Warm Transfer to Tier 2 / Escalation / Other</li>
                <li><strong>Summary:</strong> 2–3 sentences describing what the call was about and what was resolved</li>
                <li><strong>Actions Taken:</strong> Check all that apply — HIPAA verification completed, warm transfer, callback scheduled, escalated, address updated, etc.</li>
                <li><strong>Outcome:</strong> Resolved / Transferred / Callback Scheduled / Escalated</li>
                <li><strong>Next Steps:</strong> Follow-up required / Awaiting Tier 2 callback / None</li>
              </ul>
              <blockquote><p>Undocumented calls don't exist for compliance purposes. If it's not in the CRM, it didn't happen.</p></blockquote>
            `,
            quiz: {
              question: "How long after a call ends do you have to complete CRM documentation?",
              options: [
                "Before your next shift",
                "Within 1 hour",
                "Within 15 minutes",
                "By end of day",
              ],
              answer: 2,
              explain: "CRM documentation must be completed within 15 minutes of every call. No exceptions. This is a compliance requirement — undocumented calls create liability and audit gaps.",
            },
          },
        ],
      },
    ],
  },

  /* ─── Tier 2 CSR Advanced Training ─── */
  "cs-tier2-advanced": {
    title: "Tier 2 CSR <em>Advanced</em> Training",
    description: "Advanced training for licensed Tier 2 Customer Service Representatives — warm transfer receipt, claims handling, provider inquiries, benefits guidance, and escalation management. Based on SOP-CS-001.",
    department: "Customer Support",
    owner: "Yanick Bass",
    duration: "10 modules",
    version: "1.0",
    topics: [
      {
        t: "Tier 2 Role & Licensing",
        i: 1,
        steps: [
          {
            id: 1,
            t: "Requirements and credentials",
            body: `
              <p>As a Tier 2 CSR, you are the <strong>licensed backbone</strong> of the customer service operation. You handle everything Tier 1 cannot.</p>
              <h3>Required credentials</h3>
              <ul>
                <li><strong>Insurance License:</strong> 2-15 (Life, Health, Variable Annuity) or 2-40 (Health)</li>
                <li><strong>AHIP Certification:</strong> America's Health Insurance Plans — Medicare compliance training</li>
                <li><strong>Medicare Certification:</strong> Current-year carrier-specific certification for all active carriers</li>
              </ul>
              <h3>What you ARE authorized to do (that Tier 1 cannot)</h3>
              <ul>
                <li>Review and explain plan benefits, cost-sharing, and coverage details</li>
                <li>Handle claims inquiries and coordinate with carriers</li>
                <li>Verify provider network status and explain implications</li>
                <li>Process cancellation requests (with supervisor involvement per SOP)</li>
                <li>Manage escalations and three-way carrier calls</li>
              </ul>
              <blockquote><p>Your license means the member can trust your answer. That trust comes with responsibility — if you're unsure, connect to the carrier rather than guessing.</p></blockquote>
            `,
            takeaway: "2-15 or 2-40 + AHIP + Medicare cert — all three required. You're authorized to discuss benefits because you earned it.",
          },
          {
            id: 2,
            t: "Scope of practice",
            body: `
              <h3>What Tier 2 handles</h3>
              <ul>
                <li>Benefits questions: copays, deductibles, coinsurance, OOP maximums</li>
                <li>Prescription drug coverage and formulary lookups</li>
                <li>Claims inquiries: status, denial reasons, appeal paths</li>
                <li>Provider network verification and in-network alternatives</li>
                <li>Prior authorization and referral status</li>
                <li>Plan comparisons and change requests (during eligible periods)</li>
                <li>Cancellation processing (with supervisor per SOP-CS-007)</li>
              </ul>
              <h3>What Tier 2 must still escalate</h3>
              <ul>
                <li><strong>Complaints about agents</strong> → Supervisor + Compliance</li>
                <li><strong>Enrollment disputes</strong> → Supervisor immediately</li>
                <li><strong>Formal grievances / CTM language</strong> → Level 3 (Compliance)</li>
                <li><strong>Unauthorized enrollment allegations</strong> → Triple escalation</li>
                <li><strong>Issues beyond your plan knowledge</strong> → Carrier three-way call</li>
              </ul>
            `,
            takeaway: "You can explain benefits, but you can't resolve complaints or disputes. Know your lane.",
          },
        ],
      },
      {
        t: "Receiving Warm Transfers",
        i: 2,
        steps: [
          {
            id: 3,
            t: "Opening script for warm transfers",
            body: `
              <p>When Tier 1 transfers a member to you, use this script:</p>
              <blockquote><p>"Hi [Member Name], thank you for holding. My name is [Your Tier 2 Name]. I understand you're calling about [issue as described by Tier 1]. Before I continue, I do need to quickly re-verify your information for security purposes. Can you confirm your date of birth?"</p></blockquote>
              <h3>Key points</h3>
              <ul>
                <li><strong>Always re-verify DOB</strong> even though Tier 1 already verified — this is a security requirement, not optional</li>
                <li>Reference the issue summary from Tier 1's handoff so the member knows you have context</li>
                <li>If the DOB does not match, stop and re-verify full identity (name, DOB, ZIP)</li>
              </ul>
              <h3>For direct calls (no transfer)</h3>
              <blockquote><p>"Good morning/afternoon, thank you for calling MyCareClub. My name is [Your Tier 2 Name]. May I have your full name please?"</p></blockquote>
              <p>Then complete full HIPAA verification (name, DOB, ZIP) before proceeding.</p>
            `,
            takeaway: "Always re-verify DOB on a warm transfer. Always do full verification on a direct call. No shortcuts.",
          },
          {
            id: 4,
            t: "Re-verification knowledge check",
            body: `
              <p>Re-verification is a step that's easy to skip — and a step that can never be skipped.</p>
            `,
            quiz: {
              question: "A Tier 1 agent warm transfers a member to you and confirms the member has been HIPAA verified. What must you still do?",
              options: [
                "Nothing — Tier 1 already verified, so you can proceed directly",
                "Re-verify the member's full name, DOB, and ZIP code",
                "Re-verify the member's date of birth before continuing",
                "Ask Tier 1 to stay on the line and confirm the verification",
              ],
              answer: 2,
              explain: "Even after a warm transfer where Tier 1 has verified identity, Tier 2 must re-verify the member's date of birth. This is a security requirement — not optional.",
            },
          },
        ],
      },
      {
        t: "Claims Handling",
        i: 3,
        steps: [
          {
            id: 5,
            t: "The claims question sequence",
            body: `
              <p>When a member calls about a claim ("I got a bill" / "My claim was denied"), gather information systematically before contacting the carrier:</p>
              <h3>Question 1: Type of service</h3>
              <blockquote><p>"Let me gather some information so I can help you with this claim. First, can you tell me about the services you received? What type of appointment or procedure was this?"</p></blockquote>
              <p><em>Wait for response.</em></p>
              <h3>Question 2: Network status</h3>
              <blockquote><p>"Was this with an in-network or out-of-network provider?"</p></blockquote>
              <p><em>Wait for response.</em></p>
              <h3>Question 3: Payment at time of service</h3>
              <blockquote><p>"Were you asked to pay anything at the time of service? Did the provider's office collect any payment from you?"</p></blockquote>
              <p><em>Wait for response.</em></p>
              <h3>Question 4: Documentation</h3>
              <blockquote><p>"Do you have a bill or Explanation of Benefits (EOB) in front of you? If so, can you read me the date of service and the amount billed?"</p></blockquote>
            `,
            takeaway: "Ask all four questions before touching the carrier portal. Complete information prevents back-and-forth.",
          },
          {
            id: 6,
            t: "Carrier connection protocol",
            body: `
              <h3>Review in carrier portal first</h3>
              <ol>
                <li>Open the carrier's member portal</li>
                <li>Search by member ID or MBI number</li>
                <li>Locate the claim — review status (paid, denied, pending), amount billed, amount allowed, member responsibility</li>
                <li>Note any denial reason codes</li>
              </ol>
              <h3>When to connect to carrier</h3>
              <p>If the claim requires carrier intervention (dispute, appeal, reprocessing):</p>
              <blockquote><p>"Based on what I'm seeing, I'd like to connect you directly with [Carrier Name]'s claims department so they can review this in detail. I'll stay on the line to make sure you're connected properly. Is that okay?"</p></blockquote>
              <h3>Three-way call protocol</h3>
              <ol>
                <li>Call the carrier's member services line</li>
                <li><strong>Stay on the line</strong> through the IVR</li>
                <li>When a carrier rep answers, introduce the situation</li>
                <li>Confirm the member is connected before disconnecting</li>
              </ol>
              <p><em>Never drop off until the carrier rep acknowledges the member.</em></p>
            `,
            takeaway: "Check the portal first. If carrier intervention is needed, do a three-way call and stay on the line.",
          },
          {
            id: 7,
            t: "Claims handling knowledge check",
            body: `
              <p>Claims calls are high-stakes for members. Getting the process right matters.</p>
            `,
            quiz: {
              question: "A member says 'My claim was denied.' What should you do FIRST?",
              options: [
                "Immediately call the carrier to dispute the denial",
                "Tell the member to contact the carrier directly since you can't process appeals",
                "Gather information using the claims question sequence (service type, network, payment, documentation) then review in the carrier portal",
                "Look up the member's plan and explain why the claim was likely denied",
              ],
              answer: 2,
              explain: "Always gather complete information first using the four-question sequence, then review in the carrier portal. Only after you understand the full picture do you connect to the carrier if needed. Don't jump to the carrier call or guess at reasons.",
            },
          },
        ],
      },
      {
        t: "Provider Inquiries",
        i: 4,
        steps: [
          {
            id: 8,
            t: "NPI verification & network lookups",
            body: `
              <h3>Member asking about provider network status</h3>
              <ol>
                <li>Ask for the provider's full name and specialty</li>
                <li>Open the carrier's provider directory</li>
                <li>Search by provider name, NPI, or specialty</li>
                <li>Confirm network status for the member's <strong>specific plan</strong> (HMO vs. PPO matters)</li>
              </ol>
              <blockquote><p>"I've checked the [Carrier Name] provider directory, and [Provider Name] is [in-network / out-of-network] for your [Plan Name] plan."</p></blockquote>
              <p>If out-of-network, offer alternatives:</p>
              <blockquote><p>"I can help you find an in-network [specialty] near you. What area or zip code would you prefer?"</p></blockquote>
              <h3>Provider's office calling about a member</h3>
              <ol>
                <li>Confirm the provider's NPI number:
                  <blockquote><p>"Can you provide the provider's NPI number, please?"</p></blockquote>
                </li>
                <li>Confirm the relationship to the member:
                  <blockquote><p>"And what is the provider's relationship to the member? Are they the member's PCP, specialist, or another type of provider?"</p></blockquote>
                </li>
                <li>Verify the member's information through normal HIPAA verification</li>
                <li>Assist with the inquiry or connect to carrier</li>
              </ol>
            `,
            takeaway: "Always verify the specific plan type (HMO/PPO) — network status depends on it. Get the NPI when a provider's office calls.",
          },
          {
            id: 9,
            t: "Benefits questions — the Tier 2 advantage",
            body: `
              <p>Unlike Tier 1, you <strong>ARE</strong> authorized to explain benefits. But always cite your source.</p>
              <h3>Research process</h3>
              <ol>
                <li>Open carrier website or member portal</li>
                <li>Search plan details by member ID</li>
                <li>Review Summary of Benefits or Formulary (for medication questions)</li>
                <li><strong>Verify current plan year</strong> — some callers hold outdated information</li>
              </ol>
              <h3>Answer with source</h3>
              <blockquote><p>"Based on your [Plan Name], [specific answer]. This is listed on your plan's Summary of Benefits document."</p></blockquote>
              <h3>If you can't find the answer</h3>
              <blockquote><p>"I want to make sure you get the most accurate information on this. Let me connect you directly with [Carrier Name] so they can look into this in real time. I'll stay on the line to make sure you're connected. Is that okay?"</p></blockquote>
              <p>When in doubt, connect to the carrier. A wrong answer from you is worse than a brief hold for the right one.</p>
            `,
            takeaway: "You can explain benefits, but always cite the source document. If you're unsure, connect to the carrier.",
          },
        ],
      },
      {
        t: "Escalation Management",
        i: 5,
        steps: [
          {
            id: 10,
            t: "Recognizing escalation triggers",
            body: `
              <p>As a Tier 2 agent, you need to recognize when a call exceeds your authority:</p>
              <h3>Escalate to Supervisor when</h3>
              <ul>
                <li>Member requests to speak with a supervisor</li>
                <li>Member is dissatisfied with your resolution</li>
                <li>Member complains about a previous agent's behavior</li>
                <li>Member uses grievance or CTM language</li>
                <li>Cancellation request (supervisor handles all retention attempts)</li>
              </ul>
              <h3>Compliance flags — immediate Level 3</h3>
              <ul>
                <li><em>"I want to file a grievance"</em></li>
                <li><em>"I'm calling Medicare"</em></li>
                <li><em>"I'm reporting you to CMS"</em></li>
                <li><em>"This is a HIPAA violation"</em></li>
                <li>Any language suggesting a formal regulatory complaint</li>
              </ul>
              <blockquote><p>Do NOT attempt to talk the member out of filing a grievance. Do NOT minimize the concern. Do NOT promise a specific outcome.</p></blockquote>
            `,
            takeaway: "Grievance and CTM language = immediate Level 3. Don't try to resolve formal complaints yourself.",
          },
          {
            id: 11,
            t: "The supervisor handoff",
            body: `
              <h3>Step 1: Acknowledge and inform</h3>
              <blockquote><p>"I understand your concern, and I want to make sure this is handled correctly. I'm going to connect you with a supervisor who can assist further."</p></blockquote>
              <h3>Step 2: Brief the supervisor</h3>
              <p>Place the member on hold. Contact the supervisor with:</p>
              <ul>
                <li>Member name and account details</li>
                <li>Complete summary of the issue</li>
                <li>What you've already attempted</li>
                <li>Member's emotional state (calm, frustrated, angry, threatening)</li>
                <li>Any specific language the member used (grievance, CTM, etc.)</li>
              </ul>
              <h3>Step 3: Warm transfer</h3>
              <blockquote><p>"Hi [Supervisor Name], this is [Your Name] from Tier 2. I have [Member Name] on the line. Member has been HIPAA verified. They're calling regarding [ISSUE]. I've [attempted X, Y, Z]. The member is requesting supervisor assistance. Can you take it from here?"</p></blockquote>
              <p>Wait for acknowledgment. Bring the member back. Introduce. Confirm both parties are connected. Then disconnect.</p>
            `,
            takeaway: "Full briefing before the warm transfer. The supervisor should never be surprised by what the member says.",
          },
          {
            id: 12,
            t: "Escalation knowledge check",
            body: `
              <p>Knowing when to escalate is as important as knowing how to resolve. Let's test both.</p>
            `,
            quiz: {
              question: "A member says 'I'm going to call Medicare about this.' What is the correct response?",
              options: [
                "Try to resolve the issue quickly before they call Medicare",
                "'I understand, but I think I can help you without needing to involve Medicare.'",
                "Recognize this as CTM language, inform the member you're connecting them with the compliance team, and escalate immediately to Level 3",
                "Document it but continue trying to resolve at Tier 2 since you're licensed",
              ],
              answer: 2,
              explain: "'I'm going to call Medicare' is Level 3 trigger language. You do not attempt further resolution — you acknowledge the concern, inform the member you're involving the compliance team, and escalate immediately. CTM/grievance language always goes to Level 3.",
            },
          },
        ],
      },
    ],
  },

  /* ─── De-Escalation & A.C.T. Framework ─── */
  "cs-deescalation": {
    title: "De-Escalation & <em>A.C.T.</em> Framework",
    description: "Master the 6-step de-escalation process, the supervisor A.C.T. framework, and the abusive caller protocol. Exact phrases for every stage of an escalated call. Based on SOP-CS-002.",
    department: "Customer Support",
    owner: "Yanick Bass",
    duration: "30 min",
    version: "1.0",
    topics: [
      {
        t: "Why De-Escalation Matters",
        i: 1,
        steps: [
          {
            id: 1,
            t: "CTM risk and the cost of getting it wrong",
            body: `
              <p>An escalation occurs when any of these triggers are present:</p>
              <ul>
                <li>Member requests to speak with a supervisor</li>
                <li>Member is dissatisfied with the resolution offered</li>
                <li>Member complains about agent behavior</li>
                <li>Member threatens to file a grievance or CTM complaint</li>
                <li>Issue involves misunderstood benefits the agent can't clarify</li>
                <li>Member insists on a different outcome after your resolution attempt</li>
              </ul>
              <h3>Why the words you choose matter</h3>
              <p>Every escalated call is a potential <strong>CTM complaint</strong>. CMS tracks these complaints. A pattern of poorly handled escalations can lead to:</p>
              <ul>
                <li>Plan-level sanctions</li>
                <li>Enrollment freezes</li>
                <li>Financial penalties</li>
                <li>Loss of Medicare contract eligibility</li>
              </ul>
              <blockquote><p>An unnecessary escalation costs nothing. A missed one — or a poorly handled one — can cost everything.</p></blockquote>
            `,
            takeaway: "Every escalated call is a potential CTM complaint. The right words at the right time are your first line of defense.",
          },
          {
            id: 2,
            t: "Building member trust in difficult moments",
            body: `
              <p>De-escalation isn't about winning an argument or proving the member wrong. It's about making them feel heard so they're open to a solution.</p>
              <h3>Three principles</h3>
              <ul>
                <li><strong>Do NOT defend.</strong> Defending the company, the agent, or the process signals that you're on the other side.</li>
                <li><strong>Do NOT minimize.</strong> "It's not that bad" or "That's just how it works" dismisses their experience.</li>
                <li><strong>Lead with empathy.</strong> The member doesn't care about your process — they care about their problem.</li>
              </ul>
              <h3>What never to say</h3>
              <ul>
                <li><strong>"Calm down."</strong> This escalates every situation. Always.</li>
                <li><strong>"That's not my department."</strong> It's your problem until you properly hand it off.</li>
                <li><strong>"There's nothing I can do."</strong> There is always a next step, even if it's connecting them to someone with more authority.</li>
              </ul>
            `,
            takeaway: "Don't defend, don't minimize, don't say 'calm down.' Lead with empathy and offer a path forward.",
          },
        ],
      },
      {
        t: "The 6-Step De-Escalation Framework",
        i: 2,
        steps: [
          {
            id: 3,
            t: "Steps 1–3: Acknowledge, Validate, Reassure",
            body: `
              <h3>Step 1 — ACKNOWLEDGE (without admitting fault)</h3>
              <p>Use one of these exact phrases:</p>
              <ul>
                <li><em>"I understand your concern."</em></li>
                <li><em>"I can hear how frustrating that is."</em></li>
                <li><em>"I appreciate you letting me know about this."</em></li>
              </ul>
              <h3>Step 2 — VALIDATE (controlled empathy)</h3>
              <p>Show the member their feeling is reasonable:</p>
              <ul>
                <li><em>"That's definitely something we want to get clarified."</em></li>
                <li><em>"I'm glad you called so we can look into this."</em></li>
                <li><em>"You're right to want an answer on this."</em></li>
              </ul>
              <h3>Step 3 — REASSURE (shift to solution)</h3>
              <p>Pivot from the problem to the path forward:</p>
              <ul>
                <li><em>"I'm going to help get you to the right person."</em></li>
                <li><em>"Let's make sure this gets handled correctly."</em></li>
                <li><em>"I want to make sure this doesn't happen again."</em></li>
              </ul>
              <blockquote><p>Don't skip steps even if the member seems to be calming down. The sequence builds on itself — each step lowers the temperature a little more.</p></blockquote>
            `,
            takeaway: "Acknowledge → Validate → Reassure. In that order. Don't skip steps, even if the member is already calming.",
          },
          {
            id: 4,
            t: "Steps 4–6: Set Expectation, Control, Transition",
            body: `
              <h3>Step 4 — SET EXPECTATION (reduce uncertainty)</h3>
              <p>Uncertainty fuels anger. Tell them what happens next:</p>
              <ul>
                <li><em>"I'm going to connect you with a specialist who can go over this in detail."</em></li>
                <li><em>"Here's what's going to happen next so you know exactly what to expect."</em></li>
                <li><em>"This is going to get the attention it deserves."</em></li>
              </ul>
              <h3>Step 5 — CONTROL THE CONVERSATION (when emotions rise)</h3>
              <p>If the member is spiraling or talking over you, gently steer:</p>
              <ul>
                <li><em>"I want to make sure I fully understand so I can get you the right help."</em></li>
                <li><em>"Let's take this step by step."</em></li>
                <li><em>"I don't want to rush through this — let me make sure I have everything."</em></li>
              </ul>
              <h3>Step 6 — TRANSITION TO ESCALATION (smooth handoff)</h3>
              <p>If the member still needs more than you can offer:</p>
              <ul>
                <li><em>"I'm going to bring in a specialist who can take a deeper look at this."</em></li>
                <li><em>"Let me connect you with my supervisor — they have the authority to help."</em></li>
                <li><em>"I want to make sure someone with full decision-making ability handles this for you."</em></li>
              </ul>
            `,
            takeaway: "Set expectations to reduce uncertainty, control the pace when emotions rise, then transition smoothly.",
          },
          {
            id: 5,
            t: "6-Step Framework knowledge check",
            body: `
              <p>You've learned all six steps. Let's see if you can apply them in order.</p>
            `,
            quiz: {
              question: "A member is upset about a billing issue. You've acknowledged their concern and validated their frustration. What's the NEXT step in the 6-step framework?",
              options: [
                "Control the conversation by saying 'Let's take this step by step'",
                "Transition to escalation by connecting them with a supervisor",
                "Reassure them by shifting to a solution: 'Let's make sure this gets handled correctly'",
                "Set expectations: 'Here's what's going to happen next'",
              ],
              answer: 2,
              explain: "The sequence is: 1) Acknowledge → 2) Validate → 3) Reassure → 4) Set Expectation → 5) Control → 6) Transition. After validating, the next step is Reassure — shifting from the problem to the path forward.",
            },
          },
        ],
      },
      {
        t: "Supervisor A.C.T. Framework",
        i: 3,
        steps: [
          {
            id: 6,
            t: "A — Acknowledge",
            body: `
              <p>When you take over a call from an agent, start with the <strong>Supervisor Takeover Script</strong>:</p>
              <blockquote><p>"Hi Mr./Ms. [Last Name], this is [Name], the Customer Service supervisor. I understand you've had some concerns about [brief issue]. First, I want to thank you for your patience and for allowing me to step in."</p></blockquote>
              <p><strong>Pause. Let the greeting land.</strong></p>
              <blockquote><p>"Before we move forward, I want to hear directly from you so I fully understand what happened."</p></blockquote>
              <p><strong>Then — the most important thing you do — LISTEN.</strong></p>
              <ul>
                <li>Let the member speak <strong>uninterrupted</strong></li>
                <li>Do not cut in. Do not correct. Do not defend.</li>
                <li>Silence is your tool</li>
              </ul>
              <h3>Acknowledge phrases</h3>
              <ul>
                <li><em>"I can understand how that would be frustrating."</em></li>
                <li><em>"That makes sense why you'd feel that way."</em></li>
                <li><em>"I hear you, and I appreciate you explaining that to me."</em></li>
              </ul>
            `,
            takeaway: "Let the member speak without interruption. Silence is your most powerful de-escalation tool.",
          },
          {
            id: 7,
            t: "C — Clarify & T — Take Ownership",
            body: `
              <h3>C — Clarify</h3>
              <p>After the member finishes, repeat the issue back in simple terms:</p>
              <blockquote><p>"So if I understand correctly, the concern is [restate issue]. Is that right?"</p></blockquote>
              <ul>
                <li>Correct any misunderstandings gently — do not argue</li>
                <li>If the member says "No, that's not it": <em>"Help me understand what I'm missing."</em></li>
              </ul>
              <h3>T — Take Ownership</h3>
              <p>Once the issue is confirmed, own it:</p>
              <ul>
                <li><em>"Here's what I can do for you today."</em></li>
                <li><em>"Let's focus on getting this resolved."</em></li>
                <li><em>"I'm going to take personal responsibility for making sure this is handled."</em></li>
              </ul>
              <h3>Resolve or escalate</h3>
              <ul>
                <li><strong>If resolvable:</strong> Provide a clear resolution with specific next steps. Confirm satisfaction.</li>
                <li><strong>If Level 3 needed:</strong> "I want to make sure this receives the attention it deserves. I'm going to involve our compliance team to ensure this is handled formally and thoroughly."</li>
              </ul>
            `,
            takeaway: "Clarify to make sure you got it right, then take personal ownership. A.C.T. = Acknowledge, Clarify, Take Ownership.",
          },
          {
            id: 8,
            t: "A.C.T. Framework knowledge check",
            body: `
              <p>The A.C.T. framework is used by supervisors during escalated calls. Let's test your understanding.</p>
            `,
            quiz: {
              question: "You've taken over a call and the member has finished explaining their concern. You acknowledged it and said 'I can understand how that would be frustrating.' What should you do next?",
              options: [
                "Immediately offer a resolution to show you're taking action",
                "Apologize for the company's mistake and promise it won't happen again",
                "Clarify by restating the issue: 'So if I understand correctly, the concern is [X]. Is that right?'",
                "Transfer to the compliance team since the member is still upset",
              ],
              answer: 2,
              explain: "After Acknowledge comes Clarify. Restate the issue to confirm you understood correctly. Only after clarification do you Take Ownership and offer a resolution. Don't skip to resolution — the member needs to know you actually understand the problem.",
            },
          },
        ],
      },
      {
        t: "Abusive Caller Protocol",
        i: 4,
        steps: [
          {
            id: 9,
            t: "The 3-step warning process",
            body: `
              <p>This is a behavioral management protocol — not a standard escalation. Follow these steps <strong>exactly</strong>.</p>
              <h3>Step 1 — First Warning</h3>
              <p>When a member uses profanity, threats, or abusive language:</p>
              <blockquote><p>"I want to help you, but I cannot continue the call if profanity or threats continue."</p></blockquote>
              <p><strong>Document in CRM:</strong> "Verbal abuse warning #1 given at [TIME]."</p>
              <p>If the member adjusts behavior → continue the call normally.</p>
              <h3>Step 2 — Final Warning</h3>
              <p>If abusive language continues after the first warning:</p>
              <blockquote><p>"If the language continues, I will need to disconnect the call."</p></blockquote>
              <p><strong>Document in CRM:</strong> "Final verbal abuse warning given at [TIME]."</p>
              <h3>Step 3 — Terminate Call</h3>
              <p>If behavior continues after the final warning:</p>
              <blockquote><p>"I'm ending this call now. A supervisor will follow up with you. Goodbye."</p></blockquote>
              <p><strong>Do not announce a lengthy explanation.</strong> Disconnect after saying the script.</p>
              <h3>Supervisor review required within 24 hours</h3>
              <ul>
                <li>Listen to call recording</li>
                <li>Determine if behavior was isolated or part of a pattern</li>
                <li>Decide: callback with ground rules, do-not-call flag, or compliance referral</li>
              </ul>
            `,
            takeaway: "Two warnings, then terminate. Always two chances. Document the exact time of each warning.",
          },
          {
            id: 10,
            t: "Abusive caller knowledge check",
            body: `
              <p>Knowing the exact protocol protects both you and the member. Let's confirm.</p>
            `,
            quiz: {
              question: "A member has been using profanity. You gave the first warning and they continued. You gave the final warning and they're still using abusive language. What do you say?",
              options: [
                "'I've given you two warnings. You need to calm down or I'll have to end this call.'",
                "'Sir/Ma'am, this is your last chance. If you use one more profanity, I will disconnect.'",
                "'I'm ending this call now. A supervisor will follow up with you. Goodbye.'",
                "Silently hang up without saying anything",
              ],
              answer: 2,
              explain: "After two warnings, use the exact termination script: 'I'm ending this call now. A supervisor will follow up with you. Goodbye.' No lengthy explanation, no additional warnings, no silent hangup. Say the script and disconnect.",
            },
          },
        ],
      },
    ],
  },

  /* ─── SMS Communication Compliance ─── */
  "cs-sms-compliance": {
    title: "SMS Communication <em>Compliance</em>",
    description: "Complete SMS communication protocol covering operating hours, identity verification, permitted and prohibited content, response templates, documentation, and Slack notification workflows. Based on SOP-CS-003.",
    department: "Customer Support",
    owner: "Yanick Bass",
    duration: "25 min",
    version: "1.0",
    topics: [
      {
        t: "SMS Basics",
        i: 1,
        steps: [
          {
            id: 1,
            t: "Operating hours & response expectations",
            body: `
              <h3>Core principle</h3>
              <blockquote><p>SMS is a <strong>service channel</strong>, not a sales channel. Every text must be responsive, helpful, properly tagged, and free of marketing or persuasive language.</p></blockquote>
              <h3>Response requirements</h3>
              <ul>
                <li><strong>During business hours</strong> (Monday–Friday, 9:00 AM – 6:00 PM ET): Respond within <strong>30 minutes</strong></li>
                <li><strong>After hours</strong> (after 6 PM, weekends, holidays): Respond the next business day by <strong>10:00 AM ET</strong></li>
                <li><strong>100%</strong> of inbound SMS must receive a same-day response during business hours</li>
              </ul>
              <h3>Before responding — check the thread</h3>
              <p>Before writing a response, always check: <strong>Has a licensed agent already replied to this thread?</strong></p>
              <ul>
                <li><strong>YES</strong> → CSR does NOT need to respond or document. The agent owns the thread.</li>
                <li><strong>NO</strong> → CSR owns the response. Proceed with your reply.</li>
              </ul>
            `,
            takeaway: "30-minute response window during business hours. Always check if an agent already replied before you respond.",
          },
          {
            id: 2,
            t: "Identity verification rules for SMS",
            body: `
              <p>The SMS system is connected directly to member accounts. <strong>Additional identity verification is NOT required</strong> for basic assistance requests (ID cards, general coverage, PCP info, OTC status).</p>
              <h3>Critical SMS security rule</h3>
              <p>Sensitive information is <strong>NEVER</strong> requested or exchanged via SMS:</p>
              <ul>
                <li>Social Security numbers</li>
                <li>Bank account details</li>
                <li>Full date of birth</li>
                <li>Any PHI beyond what's necessary for the request</li>
              </ul>
              <h3>If a member sends PHI unsolicited</h3>
              <p>Immediately redirect to phone using this exact template:</p>
              <blockquote><p>"For your protection, we cannot review sensitive information by text. Your licensed agent will contact you directly."</p></blockquote>
              <p>Then notify the agent via Slack immediately with Urgent classification.</p>
            `,
            takeaway: "No extra verification needed for basic SMS requests. But NEVER request or discuss sensitive info via text.",
          },
        ],
      },
      {
        t: "What You Can & Cannot Say",
        i: 2,
        steps: [
          {
            id: 3,
            t: "Permitted SMS uses",
            body: `
              <p>CSRs may discuss these topics via SMS:</p>
              <ol>
                <li><strong>ID card requests</strong> — send digital copy of Member ID</li>
                <li><strong>OTC card status</strong> — confirm status, activation, or balance inquiries</li>
                <li><strong>PCP/network verification</strong> — confirm if a provider is in-network</li>
                <li><strong>Basic coverage clarification</strong> — copays, deductibles, out-of-pocket maximums</li>
                <li><strong>Provider list requests</strong> — share provider directories or specific provider info</li>
                <li><strong>General plan confusion</strong> — help member understand what they have</li>
                <li><strong>Enrollment change requests</strong> — redirect to agent only (do not process via SMS)</li>
                <li><strong>Opt-out requests</strong> — process and document</li>
              </ol>
            `,
            takeaway: "ID cards, OTC status, basic coverage, provider info — all OK. Enrollment changes — redirect to phone only.",
          },
          {
            id: 4,
            t: "Prohibited language — zero tolerance",
            body: `
              <p>The following topics are <strong>strictly prohibited</strong> via SMS. If a member raises any of these, redirect to a phone call with a licensed agent.</p>
              <h3>Prohibited topics</h3>
              <ul>
                <li><strong>Plan comparisons</strong> — constitutes sales activity</li>
                <li><strong>Plan recommendations</strong> — any suggestion of a "better" plan is marketing</li>
                <li><strong>Sales discussions</strong> — SMS is a service channel, not a sales channel</li>
                <li><strong>Enrollment completion</strong> — requires recorded verbal consent</li>
                <li><strong>Plan switching</strong> — requires agent-led process with disclosures</li>
                <li><strong>Marketing language</strong> — regulatory violation</li>
                <li><strong>Persuasive benefit framing</strong> — framing benefits to influence decisions is sales</li>
              </ul>
              <h3>Prohibited phrase examples</h3>
              <blockquote>
                <p><em>"You qualify for better benefits."</em></p>
                <p><em>"There are new plans available."</em></p>
                <p><em>"We can get you more coverage."</em></p>
                <p><em>"You should switch."</em></p>
                <p><em>"Your current plan doesn't cover as much as other options."</em></p>
                <p><em>"We have plans with lower copays/premiums."</em></p>
              </blockquote>
              <p><strong>Even if well-intentioned</strong>, these statements may be interpreted as marketing or solicitation by regulators, carriers, or CMS. Zero tolerance.</p>
              <blockquote><p><strong>If you're unsure:</strong> If a response you're drafting could be interpreted as recommending, comparing, or selling a plan — <strong>do not send it.</strong> Redirect the member to call the office.</p></blockquote>
            `,
            takeaway: "If it sounds like marketing, comparing, or selling — don't send it. When in doubt, redirect to phone.",
          },
          {
            id: 5,
            t: "Prohibited language knowledge check",
            body: `
              <p>This quiz covers the most common compliance traps in SMS communication.</p>
            `,
            quiz: {
              question: "A member texts: 'Are there any plans with lower copays?' Which response is compliant?",
              options: [
                "'Yes! There are several plans with lower copays. I can look into options for you.'",
                "'Your current plan has higher copays than some alternatives. Let me compare a few for you.'",
                "'Let's talk, I will need to assist you directly. Please call me at your convenience. 954-902-7248'",
                "'We have plans with $0 copays for primary care. Would you like to switch?'",
              ],
              answer: 2,
              explain: "Plan comparisons and recommendations are prohibited via SMS — they constitute sales activity. The compliant response is to redirect to phone using the approved enrollment template. All three other options involve comparing, recommending, or selling.",
            },
          },
        ],
      },
      {
        t: "Response Templates",
        i: 3,
        steps: [
          {
            id: 6,
            t: "Routine templates",
            body: `
              <p><strong>Use these templates verbatim.</strong> Personalize only the bracketed fields.</p>
              <h3>Member ID Card Request</h3>
              <blockquote><p>"Hi [Member Name]. I've attached a digital copy of your Member ID for you to use. If you need anything else, feel free to reply here or reach out to my customer service team — [Agent Name]"</p></blockquote>
              <h3>Welcome Packet Missing (>2 weeks)</h3>
              <blockquote><p>"Thanks for letting me know. No problem at all — I'm going to put in a request to resend your documents right away. I've also attached a digital copy of your Member ID for you to use. If you need anything else, feel free to reply here or reach out to my customer service team — [Agent Name]"</p></blockquote>
              <h3>Coverage Effective Date</h3>
              <blockquote><p>"Hello! Your benefits will take effect on the 1st of [Month]. If you need your member ID before then or have any questions, please feel free to call or text me at [CS Number]. I'm happy to help."</p></blockquote>
              <h3>"Don't Know You" Response</h3>
              <blockquote><p>"Hi [MEMBER], this is [AGENT] — the licensed agent who helped you enroll in your [CARRIER] plan with (My CareClub/ Magnolia Health). We spoke on the phone before your [Month] 1st effective date, and I sent your enrollment confirmation code _____. If you'd prefer, you can call our office directly at 954-902-7248 to confirm it's me."</p></blockquote>
            `,
            takeaway: "Use templates verbatim. Personalize only the brackets. Don't improvise — consistency protects compliance.",
          },
          {
            id: 7,
            t: "Sensitive & complaint templates",
            body: `
              <h3>PHI Received</h3>
              <p><em>Use when a member sends SSN, bank info, or medical records via text:</em></p>
              <blockquote><p>"For your protection, we cannot review sensitive information by text. Your licensed agent will contact you directly."</p></blockquote>
              <p><strong>Follow-up:</strong> Notify agent via Slack immediately (Urgent classification).</p>
              <h3>Dissatisfied Member / Complaint Filer</h3>
              <p><em>Use when a member has filed a formal complaint against the agency:</em></p>
              <blockquote><p>"Mr./s. ___, I see you've submitted a complaint against our agency, and we are not permitted to contact nor communicate with you anymore. If you want further clarification, you can contact your carrier ___ for assistance. Thank you and have a wonderful day!"</p></blockquote>
              <p><strong>Follow-up:</strong> Do NOT continue the conversation. Document in PolicyDen. Notify supervisor.</p>
              <h3>File Sharing / Suspicious Link</h3>
              <p><em>Use when a member sends a link or attachment:</em></p>
              <blockquote><p>"Hi, thanks for sending that over. For security reasons, I'm unable to open links through this business text line. If you don't mind, please share a brief description of what the link contains, or you can contact our customer service team 954-686-3267 directly for further assistance."</p></blockquote>
              <p><strong>Follow-up:</strong> Do NOT click any links.</p>
            `,
            takeaway: "PHI → redirect to phone. Complaint filer → stop communication. Suspicious links → never click.",
          },
          {
            id: 8,
            t: "Urgent & enrollment templates",
            body: `
              <h3>Urgent / Callback Request</h3>
              <p><em>Use when member says "Call me ASAP," mentions surgery, or has time-sensitive needs:</em></p>
              <blockquote><p>"Your agent will contact you shortly."</p></blockquote>
              <p><strong>Follow-up:</strong> Notify agent via Slack IMMEDIATELY. Agent must call back within 1 hour during business hours.</p>
              <h3>Enrollment-Related Request</h3>
              <p><em>Use when member asks about plan changes or enrollment modifications:</em></p>
              <blockquote><p>"Let's talk, I will need to assist you directly. Please call me at your convenience. [CS Number]"</p></blockquote>
              <p>CS Numbers: MyCareClub <strong>954-902-7248</strong> | Magnolia <strong>954-686-3267</strong></p>
              <h3>Cancellation Request</h3>
              <p><em>Use when member explicitly requests cancellation:</em></p>
              <blockquote><p>"[Member], we're sorry to see you go. We have put in the request to cancel the application. Have a great day!"</p></blockquote>
              <p><strong>Follow-up:</strong> Process cancellation per SOP. Notify agent via Slack.</p>
              <h3>Missed Call</h3>
              <p><em>Use when member texted because they tried calling and couldn't reach anyone:</em></p>
              <blockquote><p>"[Agent Name] will contact you shortly."</p></blockquote>
            `,
            quiz: {
              question: "A member texts 'I need to talk to someone about my upcoming surgery ASAP.' What template do you use and what's the follow-up?",
              options: [
                "Send the Enrollment template and post to Slack when convenient",
                "Send 'Your agent will contact you shortly' and notify the agent via Slack IMMEDIATELY with Urgent classification",
                "Call the member yourself to discuss their surgery needs",
                "Send a detailed response about their surgical benefits coverage via text",
              ],
              answer: 1,
              explain: "Surgery mentions and 'Call me ASAP' are Urgent classification. Send the short template ('Your agent will contact you shortly'), then immediately post to Slack. Agent must call back within 1 hour. Never discuss clinical details or benefits via text.",
            },
          },
        ],
      },
      {
        t: "Documentation & Notification",
        i: 4,
        steps: [
          {
            id: 9,
            t: "Classification categories & CRM tagging",
            body: `
              <p>Every SMS handled by a CSR must be tagged in PolicyDen with <strong>exactly one</strong> classification:</p>
              <ul>
                <li><strong>Response</strong> — member acknowledging or responding to prior outreach</li>
                <li><strong>ID Card</strong> — digital ID card request</li>
                <li><strong>Providers</strong> — provider list or PCP verification request</li>
                <li><strong>Coverage</strong> — insurance coverage question (copays, deductibles, OOP)</li>
                <li><strong>Enrollment Change</strong> — cancellation, plan change, or enrollment modification request</li>
                <li><strong>General</strong> — general questions not fitting other categories</li>
                <li><strong>Urgent</strong> — time-sensitive: surgery, "Call me ASAP," medical emergency</li>
                <li><strong>PHI</strong> — member sent personal/sensitive information via text</li>
              </ul>
              <h3>PolicyDen note template</h3>
              <p>Use this exact format for every CSR-handled SMS interaction:</p>
              <blockquote><p>SMS - [Category] - [Action Taken] - Licensed agent notified via Slack on [Date]</p></blockquote>
              <p><strong>Examples:</strong></p>
              <ul>
                <li><em>SMS - ID Card - Digital ID sent to member - Licensed agent notified via Slack on 04/27/2026</em></li>
                <li><em>SMS - Urgent - Member requesting immediate callback re: upcoming surgery - Licensed agent notified via Slack on 04/27/2026</em></li>
                <li><em>SMS - Coverage - Confirmed $0 copay for PCP visits - No agent notification needed</em></li>
              </ul>
            `,
            takeaway: "One tag per SMS. Use the exact note format. If an agent already replied, you don't need to document.",
          },
          {
            id: 10,
            t: "Slack notification protocol",
            body: `
              <h3>When to notify</h3>
              <p>Agent notification via Slack (#mcc-agent-chat) is <strong>mandatory</strong> when:</p>
              <ul>
                <li>SMS requires agent callback or review</li>
                <li>Message is classified as <strong>Enrollment Change</strong>, <strong>Urgent</strong>, or <strong>PHI</strong></li>
                <li>Member requests to speak with their agent</li>
                <li>Issue is outside CSR scope</li>
              </ul>
              <h3>Slack notification template</h3>
              <blockquote>
                <p>SMS Message | Member: [Name] Phone Number: [#] Issue: [1 sentence]</p>
                <p>Action Needed: [Callback/Review/Escalation/No Action]</p>
                <p>SMS tagged as: [Category]</p>
              </blockquote>
              <h3>Urgency escalation ladder</h3>
              <ol>
                <li>Post Slack notification immediately</li>
                <li>If no agent response within <strong>15 minutes</strong> → @ mention the agent directly</li>
                <li>If no agent response within <strong>30 minutes</strong> → escalate to supervisor</li>
                <li>Document all escalation attempts in PolicyDen</li>
              </ol>
            `,
            quiz: {
              question: "You've posted a Slack notification for an Urgent SMS (member mentions upcoming surgery). It's been 20 minutes with no agent response. What do you do?",
              options: [
                "Wait until 30 minutes to escalate — the protocol says 30 minutes",
                "@ mention the agent directly in Slack since it's been more than 15 minutes without response",
                "Call the member yourself and handle the surgery question",
                "Re-post the same notification — maybe they missed it",
              ],
              answer: 1,
              explain: "The urgency ladder is: immediate post → @ mention at 15 minutes → supervisor escalation at 30 minutes. At 20 minutes, you should have already @ mentioned the agent at the 15-minute mark. The correct action now is to ensure the @ mention was sent and prepare to escalate to the supervisor at 30 minutes.",
            },
          },
        ],
      },
    ],
  },

};

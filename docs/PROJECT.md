# BULBENI Project

This document is the main product source of truth for BULBENI.

## Product overview

BULBENI is a web platform designed primarily to connect teachers with schools. Development is planned in phases so that directory and profile fundamentals are established before recruitment or marketplace workflows are introduced.

## Phase 1 — Teacher & School Directory

Phase 1 creates a searchable pool of credible teacher profiles and informative school profiles.

### Teachers

Teachers should eventually be able to:

- Sign up using Google or email.
- Create and maintain a professional profile and upload or change a profile photo.
- See an interactive profile-completion percentage derived from stored profile data.
- Add basic information, an About Me summary, teaching experience, education, certificates, subjects, languages, student age groups, previous school types, availability, employment status, relocation preferences, and work-permit status.
- Upload a CV, certificate evidence, diplomas, other professional documents, and an introduction video.
- Browse basic school profiles.
- View statistics such as profile views.

The completion system should encourage useful, credible profiles. The introduction video is especially important, but completeness and credential verification remain separate concepts.

### Schools

Schools should eventually be able to:

- Sign up and create a school profile.
- Record school type, location, student age groups, languages of instruction, subjects or departments, work-permit support, and accommodation information.
- Browse and search the teacher pool using basic and advanced filters.
- Save teachers, receive recommendations, and view complete teacher profiles.
- Unlock teacher contact information through a future payment/contact-unlock mechanism.

### Recommendation system

Phase 1 recommendations are initially rule-based, not AI-based. Possible criteria include subject, school-type experience, student age groups, languages, years of experience, certificates, location, and profile completeness. Weights are not finalized and must remain configurable.

## Profile completeness

Current prototype weights:

| Section | Weight |
| --- | ---: |
| Profile photo | 10% |
| Basic information | 10% |
| About me | 5% |
| Teaching experience | 15% |
| Education | 10% |
| Certificates with uploaded evidence | 10% |
| Subjects | 5% |
| Student age groups | 5% |
| Languages | 5% |
| Previous school types | 5% |
| Availability/work preferences | 5% |
| CV | 5% |
| Introduction video | 10% |
| **Total** | **100%** |

Completeness must be calculated from actual stored profile state and must never be presented as a hard-coded percentage.

## Credential verification rule

Completeness and verification are different. A profile may be 100% complete while credentials remain unverified.

A certificate does not earn completion weight from its name alone. At least one certificate must include its required details and supporting evidence. Prototype statuses include:

- Missing document
- Document uploaded
- Pending verification

BULBENI does not currently verify certificates. A future human/admin workflow may add Verified, Rejected, Needs additional evidence, review notes, and an audit trail.

## Current prototype behavior

The current prototype:

- Uses live Supabase data for the school-side teacher directory; other prototype areas still use local/mock data and seeded defaults.
- Persists teacher profile state in browser `localStorage`.
- Calculates interactive completion and checklist state from that profile state.
- Includes profile editing, photo preview, progress animation, and toast feedback.
- Stores small profile images as data URLs and certificate evidence as file metadata only.
- Does not yet use Supabase outside the school-side teacher directory, production file storage, authentication, payments, or real verification.
- Includes a visual school dashboard prototype, but not a functional school directory workflow.

### Current prototype priority

1. Teacher profile creation
2. Interactive profile completion
3. Professional teacher profile
4. Teacher browsing of schools
5. School browsing, filtering, and recommendation of teachers

The goal is to demonstrate both the product idea and an interactive technical implementation.

## Phase 2 — Recruitment

Phase 2 may add school job postings, opportunity feeds, applications, recommended jobs/candidates, application management, notifications, messaging, interview invitations, availability calendars, and interview scheduling/rescheduling.

These are not Phase 1 features. Do not introduce job postings, open roles, applications, messaging, conversations, interview workflows, or recruitment management into Phase 1 interfaces unless explicitly requested.

## Phase 3 — Tutor Marketplace

A possible future expansion may connect learners with tutors, coaches, and instructors across languages, sports, music, coding, gardening, cooking, art, fitness, photography, academic subjects, and professional skills.

Future learners may specify level, location, budget, schedule, and goals; receive recommendations; browse profiles; communicate; book and pay for sessions; and manage lessons. None of this belongs in the Phase 1 prototype.

## Technical direction

Intended production stack:

- Next.js and TypeScript
- Supabase/PostgreSQL
- Google OAuth
- Supabase Storage, Cloudflare R2, or another suitable object store
- Vercel or equivalent hosting
- An external provider for future contact-unlock payments

`localStorage` is a temporary prototype persistence mechanism until Supabase integration begins.

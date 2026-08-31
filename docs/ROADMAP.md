# BULBENI Roadmap

This is a living checklist. Mark an item complete only when it works in the repository, not when a visual placeholder merely exists.

## Prototype — Teacher side

- [x] Teacher dashboard
- [x] Teacher profile page
- [x] Teacher profile edit flow
- [x] Profile completion calculator
- [x] Animated completion progress
- [x] Completion checklist
- [x] `localStorage` persistence
- [x] Toast notifications
- [x] Reset demo profile
- [x] Profile image upload / preview
- [x] Profile image completion weight
- [x] About Me
- [x] Teaching experience
- [x] Education
- [x] Certificates
- [x] Certificate evidence picker and persisted metadata
- [x] Certificate pending-verification state
- [x] Subjects
- [x] Student age groups
- [x] Languages
- [x] Previous school types
- [x] Availability
- [x] Employment preference
- [x] Relocation preference
- [x] Work-permit status
- [ ] Real CV file upload (current control toggles mock metadata)
- [x] Certificate evidence document selection
- [x] Introduction-video URL section
- [ ] Introduction video file upload/playback
- [ ] Teacher school directory
- [ ] Functional View profile as school mode (current button shows a toast)
- [x] Mobile responsiveness

## Prototype — School side

- [x] School dashboard shell
- [x] School profile edit route
- [x] Public school profile view route
- [x] Teacher directory route
- [x] Teacher recommendation cards on dashboard
- [ ] Functional search (current UI is present only)
- [ ] Functional basic filtering
- [x] Advanced filtering prototype UI
- [x] Visual teacher recommendations
- [x] Placeholder match percentages
- [ ] Persisted saved teachers
- [x] Full teacher profile from school context
- [x] Locked-contact UI with locally persisted mock unlock
- [x] Mock school credit packages and connection-request flow
- [x] Mobile-responsive dashboard styling

## File uploads

- [ ] Real document storage
- [x] Prototype certificate evidence picker/metadata
- [ ] Diploma upload
- [ ] Real CV upload
- [x] Prototype profile image upload to localStorage
- [ ] Introduction video upload
- [x] Profile-image type validation through file input
- [x] Maximum profile-image size (450 KB prototype limit)
- [ ] Maximum document size
- [ ] Maximum video size
- [x] Certificate evidence accepts PDF/JPG/PNG
- [ ] Allowed video formats
- [ ] File-name sanitization
- [ ] Duplicate-file handling
- [x] Replace/remove profile image
- [ ] Replace/remove all document types
- [ ] Upload progress UI
- [ ] Failed-upload handling
- [ ] Storage quota rules
- [ ] Malware/security considerations
- [ ] Signed/private file URLs
- [ ] Access-control rules for sensitive documents
- [ ] Decide which documents schools can view
- [ ] Decide which documents are admin-only

## Limitations & validation

- [x] Prototype maximum profile-photo size
- [ ] Profile-photo dimensions/cropping rules
- [ ] Maximum CV size
- [ ] Maximum certificate size
- [ ] Maximum number of certificates
- [ ] Maximum number of education entries
- [ ] Maximum number of experience entries
- [ ] Maximum number of languages
- [ ] Maximum About Me length enforcement
- [ ] Maximum experience-description length
- [ ] Minimum introduction-video length
- [ ] Maximum introduction-video length
- [ ] Video file-size limit
- [ ] Supported video formats
- [ ] Profile fields required for publishing
- [ ] Complete validation-message system
- [ ] Duplicate certificate handling
- [ ] Duplicate experience handling
- [ ] Invalid date-range validation
- [ ] Current job / no end-date logic
- [ ] Controlled language proficiency levels
- [ ] Subject selection rules
- [ ] Structured location model
- [ ] Final relocation options
- [ ] Final work-permit options

## Verification

- [ ] Certificate review workflow
- [ ] Admin verification screen
- [x] Pending verification prototype status
- [ ] Verified status and workflow
- [ ] Rejected status
- [ ] Request additional evidence
- [ ] Verification notes
- [ ] Verification audit trail
- [ ] Verified-profile indicator
- [ ] Decide whether schools can filter by verified credentials

## Supabase / backend

- [x] Read the school-side teacher directory from Supabase
- [x] Read school-facing teacher profiles from Supabase
- [ ] Create Supabase project
- [ ] Database schema
- [ ] Teacher tables
- [ ] School tables
- [ ] Profile tables
- [ ] Experience table
- [ ] Education table
- [ ] Certificates table
- [ ] Languages
- [ ] Subjects
- [ ] Age groups
- [ ] Preferences
- [ ] Documents
- [ ] Storage buckets
- [ ] Authentication
- [ ] Google OAuth
- [ ] Teacher/school roles
- [ ] Row Level Security
- [ ] Storage access policies
- [ ] Replace localStorage with Supabase
- [x] Local seeded/default demo data
- [ ] Production error handling

## Recommendations

- [ ] Define compatibility fields
- [ ] Define configurable weighting rules
- [ ] Subject matching
- [ ] Age-group matching
- [ ] School-type matching
- [ ] Language matching
- [ ] Certificate matching
- [ ] Experience weighting
- [ ] Location matching
- [ ] Relocation compatibility
- [ ] Work-permit compatibility
- [ ] Profile-completion effect on matching
- [ ] Explain why a teacher was recommended
- [ ] Tune recommendation weights
- [ ] Test recommendation edge cases

## School directory

- [ ] School cards
- [ ] School profile
- [ ] School type
- [ ] Location
- [ ] Student age groups
- [ ] Languages of instruction
- [ ] Subjects/departments
- [ ] Work-permit support
- [ ] Accommodation information
- [ ] Teacher ability to browse schools
- [ ] Decide how much school information teachers can see

## Search & filtering

- [ ] Search by name
- [ ] Location
- [ ] Subject
- [ ] Experience
- [ ] Age groups
- [ ] Languages
- [ ] Certificates
- [ ] School-type experience
- [ ] Availability
- [ ] Relocation
- [ ] Work permit
- [ ] Verified credentials
- [ ] Reset filters
- [ ] Empty results
- [ ] Pagination or infinite scroll
- [ ] Sorting
- [ ] Filter persistence

## Privacy & security

- [ ] Decide what teacher information is public
- [ ] Hide email by default
- [ ] Hide phone by default
- [ ] Contact unlock permissions
- [ ] Sensitive-document privacy
- [ ] Data deletion
- [ ] Account deletion
- [ ] User consent
- [ ] Privacy policy
- [ ] Terms
- [ ] KVKK considerations
- [ ] Secure storage policies
- [ ] Rate limiting
- [ ] Abuse prevention

## Contact unlocking / payment

Payment is not part of the current prototype.

- [ ] Define contact-unlock business rule
- [ ] Define what payment unlocks
- [ ] Define whether unlock is permanent
- [ ] Define whether unlock is per teacher
- [ ] Define whether schools receive packages/credits
- [ ] Payment provider requirements
- [ ] Payment callback/webhook
- [ ] Unlock transaction record
- [ ] Failed payment handling
- [ ] Refund behavior
- [ ] Payment history

## Analytics

- [x] Mock teacher profile-view display
- [ ] Persist real profile views
- [ ] Unique school views
- [ ] Saved/favourite count
- [ ] Contact unlock count
- [ ] Recommendation appearances
- [ ] Define which analytics teachers may see
- [ ] Prevent fake/self views

## Deployment

- [x] Git repository initialized
- [ ] Confirm remote GitHub repository and publishing workflow
- [ ] Vercel deployment
- [ ] `bulbeni.invisibleforce.tech`
- [ ] Environment variables
- [ ] Production Supabase environment
- [ ] Staging environment
- [ ] Error monitoring
- [ ] Backup strategy

## Production QA

- [ ] Desktop test pass
- [ ] Tablet test pass
- [ ] Mobile test pass
- [ ] Chrome
- [ ] Edge
- [ ] Safari
- [ ] Form validation
- [ ] Loading states
- [ ] Empty states
- [ ] Error states
- [ ] Accessibility audit
- [ ] Keyboard navigation audit
- [ ] Image optimization
- [ ] Performance audit
- [ ] Security review

## Phase 2 — Future only

- [ ] Job postings
- [ ] Opportunities feed
- [ ] Applications
- [ ] Candidate recommendations
- [ ] Job recommendations
- [ ] Application management
- [ ] Notifications
- [ ] Messaging
- [ ] Interview invitations
- [ ] Availability calendar
- [ ] Interview scheduling
- [ ] Interview rescheduling

## Phase 3 — Future only

- [ ] Learner accounts
- [ ] Tutor accounts
- [ ] Skill categories
- [ ] Tutor discovery
- [ ] Learner goals
- [ ] Budget
- [ ] Scheduling
- [ ] Booking
- [ ] Lesson management
- [ ] Tutor communication
- [ ] Marketplace payment
- [ ] Reviews/ratings

## Open product decisions

- [ ] Can teachers see all schools?
- [ ] Which school fields are public?
- [ ] What determines recommendation weight?
- [ ] How important is profile completeness to matching?
- [ ] Who verifies certificates?
- [ ] What happens when certificate verification fails?
- [ ] Can schools view uploaded certificate files?
- [ ] Which documents are private/admin-only?
- [ ] How does contact unlocking work?
- [ ] Is unlocking permanent?
- [ ] What payment provider will be supplied?
- [ ] Can schools contact teachers before unlocking?
- [ ] What production upload/file limits should apply?
- [ ] How long should uploaded documents be retained?
- [ ] What counts as a profile view?
- [ ] Should certificate evidence metadata survive when its source file is unavailable on another device?
- [ ] Should profile-completion weights be configurable in admin settings or code/config only?

Add new unresolved product questions here rather than inventing permanent behavior during implementation.

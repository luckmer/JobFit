CV_SKILLS_PROMPT = """
Extract technical skills from the CV below.

INCLUDE only: programming languages, frameworks, libraries, and developer tools (including testing tools).

EXCLUDE:
- Built-in language features or types (e.g. BigInt, Promise)
- General concepts, protocols and architectural terms (e.g. REST, CI/CD, microservices)
- Third-party products or services mentioned only as something the candidate integrated, not as a skill (e.g. TradingView, NEAR Intents)
- Soft skills, spoken languages, job titles, company names, project names
- Anything not explicitly named in the CV

RULES:
- Prefer the Skills section. Add a technology from the experience or projects sections only if it is clearly a tool, library or framework the candidate used directly.
- Use canonical names (e.g. "React", not "ReactJS"; "Tailwind CSS", not "TailwindCSS"; "shadcn/ui", not "schadcn").
- Fix obvious typos in the CV when normalizing names.
- No duplicates. Keep the order in which skills appear in the CV.
- Do not infer or add skills that are not written in the CV.
- Do not use any tools and do not read any files.

OUTPUT FORMAT:
Reply with ONLY a valid JSON array of strings. No explanations, no markdown, no code fences, no extra text.

Example of valid output: ["React","TypeScript","Git"]

CV:
{cv_text}
"""

CV_RATE_PROMPT = """
Fetch the job posting from the link below and compare it with my CV. Then rate how well I fit the role.

Job posting URL: {job_url}

My CV:
{cv_text}

Instructions:
- Actually open the link and read the posting. If you can't access it, say so and stop. Don't guess what the posting says.
- Base the rating only on the posting and my CV. Don't assume skills I haven't listed.
- Compare: required tech stack, nice-to-haves, seniority and years of experience, domain experience, languages, location / work mode, and anything that looks like a dealbreaker.
- Rate on a 1-10 scale (one decimal). Be realistic, like a recruiter who has read both documents carefully: not harsh, not generous.

Output format:

Rating: X / 10 — one-line verdict (e.g. "strong fit, apply" / "possible, but with gaps" / "weak fit, skip")

Matches: 3-5 short points, each tied to something concrete from the posting and my CV
Gaps: 3-5 short points, same rule
Dealbreakers: anything that could get me rejected outright, or "none"
What to change in the CV before applying: 2-3 concrete tweaks (what to move up, what to add or cut)

Answer in the same language as my CV. Keep it direct and concrete, no filler.
"""

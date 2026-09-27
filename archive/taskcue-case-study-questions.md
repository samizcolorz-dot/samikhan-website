# TaskCue case study — questions to answer

Notes file. Lives in `archive/`, which is excluded from the deploy rsync, so
it is never published to the site.

**Purpose:** raw material for a `/case-studies/taskcue/` page. The point of
writing it from real answers rather than generated copy is that the target
audience (engineers and PMs searching for "building GenAI products with
Claude Code") can tell the difference immediately.

Answer as briefly or fully as you like — bullet fragments are fine.

---

### 1. Why did you build it?
What were you personally doing before TaskCue that annoyed you enough to
build a product?

>

### 2. Hardest technical decision?
Somewhere you picked one approach over another — and what made you choose.

>

### 3. What broke or surprised you building with Claude Code?
Concrete beats general: a specific bug, a wrong assumption, something that
took three attempts.

>

### 4. What would you do differently starting over?

>

### 5. Any real numbers?
Users, time-to-ship, how long the first working version took — anything
measurable.

>

### 6. Where does the PM side show up?
What did you do as a product manager that a dev building alone wouldn't have?

>

### 7. Who is it for?
And what does it do that a generic to-do app doesn't?

>

---

## Why this matters for search

Ranking for "TPM" alone isn't realistic — that term belongs to LinkedIn,
Indeed, PMI and Wikipedia. Long-tail phrases like "building GenAI products
with Claude Code" or "AI technical product manager case study" are winnable,
and a real case study is the only content on the site that can target them.

## Where it would live

- New page at `/case-studies/taskcue/`
- Linked from the TaskCue project card and from the Community section
- Own `<h1>`, own meta description, `Article` JSON-LD linked to the existing
  Person entity via `author`
- Added to `sitemap.xml` (currently a single URL)

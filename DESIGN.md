# adog.space design notes

## Brief

- Audience: people considering working with or hiring the site owner.
- Job: introduce the owner, show selected work, and make contact easy.
- Constraint: no verified biography, role, location, projects, images, or contact details were provided. Every missing fact is visibly marked in `src/data/site.ts` or on the page.
- Stack: Next.js App Router with TypeScript, managed by pnpm.

## Concept options

1. **Maker's note**: a personal portfolio reads like a short note from its maker, moving from a first-person introduction into real work, a profile card, and contact. Signature: each work entry is introduced by its own image and a plain-language account of the maker's role. Emotion: direct and approachable. Screenshot: the opening introduction above a real project image. Anchor: the user wants a clear personal introduction, work, and contact. Scores (originality / fit / feasibility / portability): 3 / 5 / 5 / 3.
2. **Work index**: projects are the first thing on the page, set as a quiet, image-led index with compact captions. Signature: moving between project covers reveals a consistent title and role treatment. Emotion: focused and visual. Screenshot: the first project cover and its caption. Anchor: portfolio visitors often arrive to see work first. Scores: 3 / 4 / 5 / 4.
3. **Open profile**: the page is organized around an author card, with the introduction, project list, and contact arranged as details around one central identity. Signature: the profile card changes from a short intro into contact details. Emotion: personal and compact. Screenshot: author card with work links. Anchor: the site is for one person. Scores: 2 / 4 / 4 / 4.

**Chosen: Maker's note.** It matches the request to introduce the person and their work in a simple, readable single page.

## Concept card

- Idea: a short first-person introduction leads into the work, then the person behind it, then a clear contact link.
- Metaphor: a personal note with work samples attached.
- Signature: each work sample follows the reference site's image-then-explanation rhythm; missing imagery is shown as an explicit, neutral replacement area.
- Emotion: clear, calm, and human.
- Motion verb: settle; interactions respond with a small lift or arrow shift.
- Screenshot: the short introduction followed by the first project image.

## Art direction

- Reference: [Graker](https://graker.fehey.com/) for its white background, centered narrow reading column, conversational copy, large project imagery, compact author card, and minimal footer. The content and product identity are not reused.
- Palette: white paper `#FFFFFF`, ink `#202124`, body `#34373A`, muted text `#85898D`, rule `#E9E9E7`, soft panel `#F5F5F3`.
- Type: DM Sans for display and body, with system sans-serif fallback. Keep text at a comfortable reading size and use weight and spacing for hierarchy.
- Grid: single centered column capped at 720px; broad image frames within the column. Mobile keeps the same reading order and reduces outer margins.
- Shape: lightly rounded project image frames and profile card; controls use a compact pill.
- Rhythm: concise introduction, image and caption per project, profile card, contact invitation, quiet footer.
- Motion: small button lift and arrow movement; native smooth anchors with reduced-motion override.
- Genericness check: removed the former decorative orbit graphic and high-contrast dark hero. Layout now follows the supplied reference's text-and-work narrative and uses the known site identity and repository evidence without guessing owner details.

## Content status

Known content: the site is `adog.space`; the Git history contains an earlier space-themed homepage with animated planets and a rocket. Unknown content still marked for follow-up: the owner's name and profession, biography, contact email, location, the prior project's dates, the owner's specific role, project outcomes, and real showcase images. The old `index.html` and `assets/` files remain deleted in the working tree.

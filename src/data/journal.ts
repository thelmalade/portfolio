export type JournalPost = {
  slug: string;
  title: string;
  image: string;
  readTime: string;
  date: string;
  excerpt: string;
  /** Body paragraphs. Lines beginning with "## " render as subheadings. */
  content: string[];
};

export const JOURNAL_POSTS: JournalPost[] = [
  {
    slug: "building-motion-that-feels-alive",
    title: "On building motion that feels alive",
    image:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&q=80",
    readTime: "5 min read",
    date: "Mar 2026",
    excerpt:
      "Most animation on the web is decoration. The kind that sticks with you is the kind you barely notice — here's how I try to get there.",
    content: [
      "The first time I added an animation to a site, I was proud of it for all the wrong reasons. It was a hero heading that flew in from the left, bounced twice, and settled. I thought it looked expensive. A week later I couldn't look at it without wincing. It wasn't moving for any reason — it was moving because I'd learned how to make things move.",
      "That's the trap, I think. Once you know GSAP or Framer Motion, everything starts begging for a transition. But motion isn't a feature you sprinkle on at the end. It's a way of explaining what just happened, or what's about to.",
      "## Motion should answer a question",
      "When something animates well, it's usually answering a question the user didn't know they were asking. Where did this panel come from? What's connected to what? Did my click actually register? A menu that slides down from the button I pressed tells me, wordlessly, that the two belong together. The same menu fading in from nowhere leaves me guessing.",
      "So before I write a single tween now, I ask what the movement is supposed to say. If I can't answer that, the honest move is to cut it.",
      "## Borrow from the physical world, then ease off",
      "Real objects don't start and stop instantly, and they don't move at a constant speed — they accelerate and settle. That's why a linear ease almost always feels cheap, and why something like power3.out feels right without anyone being able to explain why. It mimics weight.",
      "But I've learned not to over-egg it. Long durations and big bouncy springs feel alive in a demo and exhausting on the tenth visit. These days I keep most things between 0.3 and 0.8 seconds, with easing doing the heavy lifting instead of distance. The best compliment a piece of motion can get is that nobody mentions it at all.",
      "If you take one thing from this: animate less, but mean it more. The site I'm proudest of has maybe five real animations in it. They're invisible until you take them away.",
    ],
  },
  {
    slug: "the-quiet-craft-of-micro-interactions",
    title: "The quiet craft of micro-interactions",
    image:
      "https://images.unsplash.com/photo-1545235617-9465d2a55698?w=1200&q=80",
    readTime: "7 min read",
    date: "Feb 2026",
    excerpt:
      "A button that confirms it heard you. A field that fixes itself. The small stuff is where an interface earns trust.",
    content: [
      "I spend an embarrassing amount of time on things most people will never consciously see. The way a button dips a pixel when you press it. The half-second a toggle takes to slide. Whether a form tells you your password is wrong before or after you've typed all of it.",
      "None of these will end up in a case study. But together they're the difference between an interface that feels considered and one that feels like a form someone bolted onto a database.",
      "## Feedback is a promise",
      "Every time a user does something, they're quietly asking: did that work? A micro-interaction is how the interface answers. A spinner that appears the instant you submit. A little checkmark that replaces the 'Copy' label for a moment. A row that briefly highlights after you edit it.",
      "Leave that gap empty and people fill it with doubt. They click twice. They refresh. They assume it's broken. I'd rather spend an afternoon on a 300ms confirmation state than lose someone at the last step because they weren't sure.",
      "## The details that respect people's time",
      "My favourite micro-interactions are the ones that quietly do work for you. Inputs that format a phone number as you type. A search box that focuses itself when the page loads so you can just start typing. Disabled buttons that explain why they're disabled instead of sitting there grey and silent.",
      "Accessibility lives here too, and it's not optional. Focus states that are actually visible. Motion that respects prefers-reduced-motion. Touch targets big enough for a thumb on a moving train. Getting these right doesn't make the work flashier — it makes it usable by more people, which is the whole point.",
      "I think of micro-interactions as manners. You don't notice good manners; you only notice their absence. That's the bar I'm aiming for — a thousand tiny courtesies that add up to something that just feels right.",
    ],
  },
  {
    slug: "designing-systems-not-screens",
    title: "Designing systems, not screens",
    image:
      "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=1200&q=80",
    readTime: "4 min read",
    date: "Jan 2026",
    excerpt:
      "Pixel-perfect mockups are a great way to ship something that falls apart on the second screen. I'd rather build the rules.",
    content: [
      "Early on, I built screens. A client would send a Figma file, I'd rebuild it pixel for pixel, and I'd feel great until they asked for a page that wasn't in the file. Then I'd be back in the weeds, hardcoding another one-off layout that looked almost-but-not-quite like the others.",
      "The shift that changed everything for me was small: stop building screens, start building the rules that screens come from.",
      "## Tokens before components, components before pages",
      "Now I start at the bottom. A handful of design tokens — colour, spacing, type scale, radius — defined once as variables. Then a small set of components that only ever reference those tokens, never raw values. By the time I'm assembling actual pages, I'm mostly arranging pieces that already agree with each other.",
      "The payoff shows up the first time someone asks for a change. 'Can the brand blue be a touch darker?' used to mean hunting through twenty files. Now it's one variable. The whole site shifts at once, and nothing falls out of step.",
      "## Consistency you don't have to think about",
      "The quiet magic of a system is that consistency becomes the default instead of a thing you maintain by willpower. When every card pulls its padding from the same scale, you physically can't end up with one that's slightly off. The system catches it for you.",
      "It feels slower at the start — you're building scaffolding before you build anything visible. But by the third or fourth page, you're flying, and the thing holds together in a way hand-built screens never quite do. I haven't regretted it once.",
    ],
  },
  {
    slug: "why-constraints-make-better-interfaces",
    title: "Why constraints make better interfaces",
    image:
      "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=1200&q=80",
    readTime: "6 min read",
    date: "Dec 2025",
    excerpt:
      "A blank canvas is the hardest brief there is. The limits — a tiny palette, a strict grid, a slow phone — are what make the work good.",
    content: [
      "Give me a project with no constraints and I'll give you my worst work. Total freedom sounds like a gift, but a blank canvas is paralysing. Every decision is up for grabs, so none of them feel anchored to anything, and you end up second-guessing forever.",
      "The projects I'm proudest of all had a wall I had to work against. A two-colour palette. A fixed grid I wasn't allowed to break. A budget that ruled out the fancy library I wanted. Those limits did half the design thinking for me.",
      "## Limits force you to find the real idea",
      "When you can only use two colours, you stop hiding behind decoration and have to make the layout itself do the work. When the type scale only has five sizes, your hierarchy gets clearer because you can't fudge it with a slightly-bigger heading. Constraints strip away the easy answers and push you toward the one that actually holds up.",
      "## Performance is a constraint worth keeping",
      "The constraint I never want to lose is the slow phone on a bad connection. It's the most honest test there is. It kills the 900KB hero video, the five web fonts, the animation library you imported to fade in one element. What survives is usually what mattered.",
      "I keep an old mid-range Android around for exactly this. If the site feels good there, it'll feel great everywhere else. If it doesn't, no amount of desktop polish will save it for the person trying to use it on the bus.",
      "So I've stopped seeing constraints as the enemy of good design. They're the brief doing its job. The trick isn't to wish them away — it's to find the limits early, and let them point you at the work that was worth making all along.",
    ],
  },
];

export function getPost(slug: string): JournalPost | undefined {
  return JOURNAL_POSTS.find((post) => post.slug === slug);
}

import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState, type FormEvent } from "react";
import {
  ArrowRight,
  BadgeCheck,
  CalendarDays,
  Check,
  ChevronRight,
  Menu,
  MessageCircle,
  Phone,
  ShieldCheck,
  Sparkles,
  Star,
  X,
} from "lucide-react";

import oracleCard from "@/assets/numerology-oracle.jpg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AstroNumero Clarity | Numerology & Kundli Guidance" },
      { name: "description", content: "Discover your life path, receive a free Kundli audit, and choose personalized numerology guidance." },
      { property: "og:title", content: "AstroNumero Clarity | Numerology & Kundli Guidance" },
      { property: "og:description", content: "Discover your life path and receive a free personalized Kundli audit." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const whatsapp = "https://wa.me/919999999999";
const traits: Record<number, { title: string; copy: string; lucky: string }> = {
  1: { title: "The Pioneer", copy: "Independent, inventive and born to lead.", lucky: "1, 10, 19" },
  2: { title: "The Diplomat", copy: "Intuitive, gentle and gifted at bringing harmony.", lucky: "2, 11, 20" },
  3: { title: "The Creator", copy: "Expressive, optimistic and naturally magnetic.", lucky: "3, 12, 21" },
  4: { title: "The Builder", copy: "Grounded, loyal and devoted to lasting foundations.", lucky: "4, 13, 22" },
  5: { title: "The Explorer", copy: "Adaptable, curious and energized by freedom.", lucky: "5, 14, 23" },
  6: { title: "The Nurturer", copy: "Compassionate, responsible and family-centered.", lucky: "6, 15, 24" },
  7: { title: "The Seeker", copy: "Analytical, spiritual and drawn to hidden wisdom.", lucky: "7, 16, 25" },
  8: { title: "The Achiever", copy: "Ambitious, resilient and skilled with material success.", lucky: "8, 17, 26" },
  9: { title: "The Humanitarian", copy: "Generous, idealistic and here to uplift others.", lucky: "9, 18, 27" },
  11: { title: "The Intuitive", copy: "Visionary, sensitive and spiritually illuminating.", lucky: "11, 20, 29" },
  22: { title: "The Master Builder", copy: "Practical visionary with extraordinary potential.", lucky: "4, 22, 31" },
};

const packages = [
  ["Quick Clarity", "₹999", "One focused question", "15-minute consultation"],
  ["Complete Life Blueprint", "₹2,499", "Career, wealth & relationships", "Detailed numerology report"],
  ["Name Correction", "₹3,999", "Personal name analysis", "Optimized spelling options"],
  ["Business & Brand", "₹5,999", "Launch & partnership audit", "Name and date alignment"],
];

function lifePath(date: string) {
  if (!date) return null;
  let n = date.replaceAll("-", "").split("").reduce((sum, d) => sum + Number(d), 0);
  while (n > 9 && n !== 11 && n !== 22) n = String(n).split("").reduce((sum, d) => sum + Number(d), 0);
  return n;
}

function Index() {
  const [menu, setMenu] = useState(false);
  const [birthDate, setBirthDate] = useState("");
  const [submitted, setSubmitted] = useState<{ name: string; date: string } | null>(null);
  const [aura, setAura] = useState("Gold");
  const number = useMemo(() => lifePath(birthDate), [birthDate]);

  function submitAudit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setSubmitted({ name: String(data.get("name")), date: String(data.get("birthDate")) });
  }

  return (
    <main className="min-h-screen bg-background text-foreground celestial-grid pb-20 md:pb-0">
      <header className="fixed inset-x-0 top-0 z-40 border-b border-border bg-background/85 backdrop-blur-xl">
        <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 lg:px-8">
          <a href="#top" className="flex items-center gap-3" aria-label="AstroNumero Clarity home">
            <span className="grid size-9 place-items-center rounded-full border border-primary text-primary"><Sparkles className="size-4" /></span>
            <span className="font-display text-lg text-primary sm:text-xl">AstroNumero <i className="font-normal text-foreground">Clarity</i></span>
          </a>
          <nav className="hidden items-center gap-7 text-sm text-muted-foreground md:flex" aria-label="Main navigation">
            <a className="transition-colors hover:text-primary" href="#calculator">Life Path</a>
            <a className="transition-colors hover:text-primary" href="#audit">Free Audit</a>
            <a className="transition-colors hover:text-primary" href="#packages">Packages</a>
            <a className="transition-colors hover:text-primary" href="#faq">FAQ</a>
          </nav>
          <Button asChild className="hidden h-11 rounded-full px-5 md:inline-flex"><a href="#audit">Book consultation</a></Button>
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMenu(!menu)} aria-label="Toggle menu">{menu ? <X /> : <Menu />}</Button>
        </div>
        {menu && <nav className="grid gap-4 border-t border-border bg-background p-5 text-sm md:hidden"><a href="#calculator" onClick={() => setMenu(false)}>Life Path Calculator</a><a href="#audit" onClick={() => setMenu(false)}>Free Audit</a><a href="#packages" onClick={() => setMenu(false)}>Packages</a><a href="#faq" onClick={() => setMenu(false)}>FAQ</a></nav>}
      </header>

      <section id="top" className="relative min-h-[94svh] overflow-hidden pt-18">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,color-mix(in_oklab,var(--color-primary)_13%,transparent),transparent_38%)]" />
        <div className="relative mx-auto grid min-h-[calc(94svh-4.5rem)] max-w-7xl items-center gap-10 px-5 py-12 lg:grid-cols-[1fr_.8fr] lg:px-8">
          <div className="z-10 max-w-3xl text-center lg:text-left">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-4 py-2 text-xs font-semibold uppercase text-primary"><Star className="size-3 fill-current" /> Ancient wisdom. Modern clarity.</div>
            <h1 className="text-5xl leading-[1.05] sm:text-6xl lg:text-8xl">Your numbers hold<br /><span className="text-primary italic">the answer.</span></h1>
            <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-muted-foreground lg:mx-0 lg:text-lg">Decode your birth date, align your name and move forward with practical guidance rooted in Numerology and Kundli analysis.</p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
              <Button asChild size="lg" className="h-13 rounded-full px-7 text-base"><a href="#audit"><Sparkles /> Get your free Kundli audit</a></Button>
              <Button asChild size="lg" variant="outline" className="h-13 rounded-full bg-card/50 px-7 text-base"><a href="#calculator">Calculate life path <ArrowRight /></a></Button>
            </div>
            <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground lg:justify-start"><span className="flex items-center gap-2"><ShieldCheck className="size-4 text-primary" /> Birth details stay private</span><span className="flex items-center gap-2"><BadgeCheck className="size-4 text-primary" /> Personal guidance</span></div>
          </div>
          <div className="relative mx-auto flex w-full max-w-sm justify-center lg:max-w-md">
            <div className="absolute inset-8 rounded-full border border-primary/30 shadow-[0_0_80px_color-mix(in_oklab,var(--color-primary)_18%,transparent)]" />
            <div className="float-card relative w-[74%] overflow-hidden rounded-[2rem] border-2 border-primary/60 bg-card p-2 shadow-2xl rotate-2">
              <img src={oracleCard} width={1024} height={1536} alt="Golden numerology oracle card featuring number seven" className="aspect-[2/3] w-full rounded-[1.55rem] object-cover" />
            </div>
            <div className="absolute -bottom-4 left-0 rounded-2xl border border-border bg-card/90 p-4 backdrop-blur"><p className="text-xs text-muted-foreground">Today’s energy</p><p className="mt-1 font-display text-xl text-primary">Intuition • 7</p></div>
          </div>
        </div>
      </section>

      <section id="calculator" className="border-y border-border bg-card/45 py-20">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 lg:grid-cols-2 lg:px-8">
          <div><p className="text-xs font-bold uppercase text-accent">Your birth code</p><h2 className="mt-3 text-4xl sm:text-5xl">Meet your Life Path number.</h2><p className="mt-4 max-w-lg leading-7 text-muted-foreground">Enter your birth date to reveal the core energy that shapes your strengths, lessons and direction.</p></div>
          <div className="gold-surface rounded-2xl border border-border p-6 sm:p-8">
            <label htmlFor="life-date" className="text-sm font-semibold">Date of birth</label>
            <Input id="life-date" type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} className="mt-3 h-12 bg-background/60" />
            {number && <div className="mt-6 flex items-center gap-5 border-t border-border pt-6"><span className="grid size-20 shrink-0 place-items-center rounded-full border border-primary text-4xl font-display text-primary">{number}</span><div><h3 className="text-2xl">{traits[number]?.title}</h3><p className="mt-1 text-sm leading-6 text-muted-foreground">{traits[number]?.copy}</p><p className="mt-2 text-xs text-primary">Lucky numbers: {traits[number]?.lucky}</p></div></div>}
            {!number && <p className="mt-6 border-t border-border pt-6 text-sm text-muted-foreground">Your result will appear here instantly.</p>}
          </div>
        </div>
      </section>

      <section id="audit" className="py-20">
        <div className="mx-auto max-w-6xl px-5 lg:px-8"><div className="mb-10 max-w-2xl"><p className="text-xs font-bold uppercase text-primary">Complimentary first step</p><h2 className="mt-3 text-4xl sm:text-5xl">Free Kundli & Destiny Audit</h2><p className="mt-4 leading-7 text-muted-foreground">Tell us where you feel stuck. We’ll review your details and share the most useful next step.</p></div>
          <form onSubmit={submitAudit} className="navy-surface grid gap-5 rounded-2xl border border-border p-5 sm:grid-cols-2 sm:p-8">
            <Field label="Full name"><Input name="name" required placeholder="Your full name" className="h-12 bg-background/50" /></Field>
            <Field label="WhatsApp number"><div className="flex"><span className="grid h-12 place-items-center rounded-l-md border border-r-0 border-input bg-background/70 px-3 text-sm text-muted-foreground">+91</span><Input name="phone" type="tel" required pattern="[0-9]{10}" placeholder="10-digit number" className="h-12 rounded-l-none bg-background/50" /></div></Field>
            <Field label="Birth date"><Input name="birthDate" type="date" required className="h-12 bg-background/50" /></Field>
            <Field label="Aura colour">
              <div className="flex h-12 items-center gap-3">
                {["Gold", "Blue", "White", "Rose"].map((color) => <Button key={color} type="button" variant={aura === color ? "default" : "outline"} size="icon" onClick={() => setAura(color)} aria-label={`${color} aura`} title={color} className="rounded-full"><span className={color === "Gold" ? "size-3 rounded-full bg-primary" : color === "Blue" ? "size-3 rounded-full bg-accent" : color === "White" ? "size-3 rounded-full bg-foreground" : "size-3 rounded-full bg-destructive"} /></Button>)}
                <span className="text-sm text-muted-foreground">{aura}</span>
              </div>
            </Field>
            <Field label="What would you like clarity on?" wide><Textarea name="concern" required placeholder="Career, relationships, marriage, health, money or another concern…" className="min-h-28 bg-background/50" /></Field>
            <div className="sm:col-span-2"><Button type="submit" size="lg" className="h-13 w-full rounded-full sm:w-auto">Request my free audit <ChevronRight /></Button><p className="mt-3 text-xs text-muted-foreground">By submitting, you agree to be contacted about your audit.</p></div>
          </form>
        </div>
      </section>

      <section id="packages" className="border-y border-border bg-card/45 py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8"><div className="text-center"><p className="text-xs font-bold uppercase text-accent">Choose your depth</p><h2 className="mt-3 text-4xl sm:text-5xl">Guidance for every turning point.</h2></div>
          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">{packages.map((pack, index) => <article key={pack[0]} className={`relative flex min-h-72 flex-col rounded-2xl border p-6 ${index === 1 ? "gold-surface border-primary/60" : "bg-card border-border"}`}>{index === 1 && <span className="absolute right-4 top-4 rounded-full bg-primary px-3 py-1 text-[10px] font-bold uppercase text-primary-foreground">Most chosen</span>}<p className="text-xs text-muted-foreground">0{index + 1}</p><h3 className="mt-6 text-2xl">{pack[0]}</h3><p className="mt-3 text-3xl font-bold text-primary">{pack[1]}</p><ul className="mt-6 space-y-3 text-sm text-muted-foreground"><li className="flex gap-2"><Check className="size-4 text-primary" />{pack[2]}</li><li className="flex gap-2"><Check className="size-4 text-primary" />{pack[3]}</li></ul><Button asChild variant={index === 1 ? "default" : "outline"} className="mt-auto rounded-full"><a href="#audit">Choose package</a></Button></article>)}</div>
        </div>
      </section>

      <section className="py-20"><div className="mx-auto max-w-6xl px-5 lg:px-8"><div className="grid gap-5 md:grid-cols-3">{[
        ["Priya M.", "The name correction gave me confidence and a clear direction for my new venture."],
        ["Arjun K.", "The reading was practical, specific and surprisingly accurate about my career phase."],
        ["Neha S.", "I felt heard, never judged. The guidance helped me make a difficult decision calmly."],
      ].map(([name, copy]) => <figure key={name} className="rounded-2xl border border-border bg-card p-6"><div className="flex gap-1 text-primary">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="size-4 fill-current" />)}</div><blockquote className="mt-5 leading-7 text-muted-foreground">“{copy}”</blockquote><figcaption className="mt-5 flex items-center gap-2 text-sm font-semibold"><BadgeCheck className="size-4 text-accent" />{name} <span className="font-normal text-muted-foreground">Verified client</span></figcaption></figure>)}</div></div></section>

      <section id="faq" className="border-t border-border bg-card/45 py-20"><div className="mx-auto grid max-w-5xl gap-10 px-5 md:grid-cols-[.7fr_1.3fr] lg:px-8"><div><p className="text-xs font-bold uppercase text-primary">Questions, answered</p><h2 className="mt-3 text-4xl">Before your reading.</h2></div><Accordion type="single" collapsible className="border-t border-border">{[
        ["How does name correction work?", "We study the vibration of your current name alongside your birth numbers, then recommend practical spelling options that preserve your identity."],
        ["What details do you need?", "Your full name, birth date, WhatsApp number and the area where you want clarity are enough for the initial audit."],
        ["Are my birth details private?", "Yes. Your details are used only to prepare and communicate your consultation, and are never displayed publicly."],
      ].map(([q, a]) => <AccordionItem key={q} value={q}><AccordionTrigger className="py-6 text-base hover:no-underline">{q}</AccordionTrigger><AccordionContent className="leading-7 text-muted-foreground">{a}</AccordionContent></AccordionItem>)}</Accordion></div></section>

      <footer className="px-5 py-10 text-center text-sm text-muted-foreground"><p className="font-display text-xl text-primary">AstroNumero Clarity</p><p className="mt-3">Guidance illuminates the path. Your choices shape the journey.</p></footer>

      <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 border-t border-border bg-background/95 p-2 backdrop-blur md:hidden"><Button asChild className="h-12 rounded-r-none"><a href="#audit"><Sparkles /> Free Audit</a></Button><Button asChild variant="outline" className="h-12 rounded-l-none border-l-0"><a href={whatsapp} target="_blank" rel="noreferrer"><MessageCircle /> WhatsApp</a></Button></div>

      <Dialog open={Boolean(submitted)} onOpenChange={(open) => !open && setSubmitted(null)}><DialogContent className="max-w-md rounded-2xl border-border bg-card"><DialogHeader><div className="mb-3 grid size-12 place-items-center rounded-full bg-primary text-primary-foreground"><Sparkles /></div><DialogTitle className="text-3xl font-display">Your audit is reserved.</DialogTitle><DialogDescription className="pt-2 leading-6">Thank you, {submitted?.name}. We’ll review the birth details for {submitted?.date} and continue privately on WhatsApp.</DialogDescription></DialogHeader><Button asChild className="mt-3 h-12 rounded-full"><a href={`${whatsapp}?text=${encodeURIComponent(`Hello, I submitted a free Kundli audit for ${submitted?.name}.`)}`} target="_blank" rel="noreferrer"><MessageCircle /> Continue on WhatsApp</a></Button></DialogContent></Dialog>
    </main>
  );
}

function Field({ label, children, wide = false }: { label: string; children: React.ReactNode; wide?: boolean }) {
  return <label className={wide ? "grid gap-2 sm:col-span-2" : "grid gap-2"}><span className="text-sm font-semibold">{label}</span>{children}</label>;
}
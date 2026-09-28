import { useEffect, useState, type FormEvent } from 'react';
import { ArrowDown, ArrowRight, ArrowUpRight, Check, ChevronDown, Compass, Menu, MessageCircle, MoonStar, ShieldCheck, Sparkles, Star, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import heroImage from '@/assets/astronumero-celestial.jpg';
import './astro.css';

type Audit = { name: string; phone: string; code: string; email: string; birth: string; aura: string; concern: string };
const initial: Audit = { name: '', phone: '', code: '+91', email: '', birth: '', aura: '', concern: '' };
const colors = [
  { name: 'Gold', value: '#D4AF37' }, { name: 'Deep Blue', value: '#1C2541' },
  { name: 'Emerald Green', value: '#10B981' }, { name: 'Royal Violet', value: '#7C3AED' },
  { name: 'Ruby Red', value: '#EF4444' }, { name: 'Silver', value: '#E2E8F0' },
];
const paths: Record<number, { title: string; traits: string[]; lucky: string }> = {
  1: { title: 'The Pioneer', traits: ['Independent', 'Ambitious', 'Original'], lucky: '1, 10, 19' },
  2: { title: 'The Diplomat', traits: ['Intuitive', 'Patient', 'Harmonious'], lucky: '2, 11, 20' },
  3: { title: 'The Creator', traits: ['Expressive', 'Optimistic', 'Imaginative'], lucky: '3, 12, 21' },
  4: { title: 'The Builder', traits: ['Grounded', 'Loyal', 'Disciplined'], lucky: '4, 13, 22' },
  5: { title: 'The Explorer', traits: ['Adaptable', 'Curious', 'Free-spirited'], lucky: '5, 14, 23' },
  6: { title: 'The Nurturer', traits: ['Caring', 'Responsible', 'Creative'], lucky: '6, 15, 24' },
  7: { title: 'The Seeker', traits: ['Analytical', 'Reflective', 'Perceptive'], lucky: '7, 16, 25' },
  8: { title: 'The Visionary', traits: ['Driven', 'Practical', 'Resilient'], lucky: '8, 17, 26' },
  9: { title: 'The Humanitarian', traits: ['Compassionate', 'Wise', 'Idealistic'], lucky: '9, 18, 27' },
  11: { title: 'The Illuminator', traits: ['Inspired', 'Sensitive', 'Visionary'], lucky: '11, 2, 29' },
  22: { title: 'The Master Builder', traits: ['Purposeful', 'Resourceful', 'Visionary'], lucky: '22, 4, 13' },
};
function lifePath(date: string) {
  if (!date) return null;
  let n = date.replace(/\D/g, '').split('').reduce((sum, digit) => sum + Number(digit), 0);
  while (n > 9 && n !== 11 && n !== 22) n = String(n).split('').reduce((sum, digit) => sum + Number(digit), 0);
  return n;
}
const packages = [
  { num: '01', title: 'Free Kundli & Dasha Voice Analysis', price: '₹0', details: 'A personal introduction to your chart, delivered as a short voice note.', features: ['Kundli & Dasha overview', '2-minute WhatsApp voice analysis'], action: 'Claim free audit' },
  { num: '02', title: 'Name & Mobile Alignment', price: '₹499', details: 'A closer look at the numbers you carry every day.', features: ['Name spelling review', 'Mobile number alignment', 'Personalized PDF report'], action: 'Enquire now' },
  { num: '03', title: '1-on-1 Personal Consultation', price: '₹1,999', details: 'A focused conversation about where you are and where you could go.', features: ['30-minute private call', 'Name correction guidance', 'Custom remedies'], action: 'Enquire now', popular: true },
  { num: '04', title: 'Business, Brand & Logo Numerology', price: '₹5,999', details: 'For the next big decision you make together.', features: ['Corporate brand launch audit', 'Partnership alignment', 'Logo numerology'], action: 'Enquire now' },
];
const faqs = [
  { q: 'How does a name correction work?', a: 'We review the numerological value of your current name alongside your birth details, then discuss suggested spelling adjustments. You decide whether any change feels right for you.' },
  { q: 'What details do I need for a Kundli audit?', a: 'Start with your name, date of birth, contact details, and the question you would like to explore. Accurate birth time and place may be requested later for a more detailed Kundli reading.' },
  { q: 'Are my birth details kept private?', a: 'Please share only information you are comfortable sending. This preview prepares your request for WhatsApp; no details are transmitted until you choose to send them there.' },
  { q: 'When will I hear back?', a: 'The intended turnaround for the free voice analysis is within 2 hours after your request has been sent and acknowledged on WhatsApp. Availability may vary.' },
];

export function AstroPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [audit, setAudit] = useState<Audit>(initial);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitted, setSubmitted] = useState<Audit | null>(null);
  const [birthDate, setBirthDate] = useState('');
  const [result, setResult] = useState<number | null>(null);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const setField = (field: keyof Audit, value: string) => setAudit(prev => ({ ...prev, [field]: value }));
  const errors: Record<string, string> = {
    name: audit.name.trim().length < 2 || audit.name.length > 100 ? 'Please enter your full name.' : '',
    phone: audit.phone.replace(/\D/g, '').length < 7 || audit.phone.length > 20 ? 'Please enter a valid mobile number.' : '',
    email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(audit.email) || audit.email.length > 255 ? 'Please enter a valid email address.' : '',
    birth: !audit.birth || audit.birth > new Date().toISOString().slice(0, 10) ? 'Please enter a valid birth date.' : '',
    aura: !audit.aura ? 'Choose an aura color.' : '',
    concern: audit.concern.trim().length < 10 || audit.concern.length > 1000 ? 'Please share a little more about your concern.' : '',
  };
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setTouched(Object.fromEntries(Object.keys(errors).map(key => [key, true])));
    const first = Object.keys(errors).find(key => errors[key]);
    if (first) { document.getElementById(first)?.focus(); return; }
    setSubmitted({ ...audit });
  }
  const whatsappMessage = submitted
    ? `Hello AstroNumero Clarity, I would like to submit my Free Kundli details for ${submitted.name}. Looking forward to my audio report!\nName: ${submitted.name}\nMobile: ${submitted.code} ${submitted.phone}\nEmail: ${submitted.email}\nDate of birth: ${submitted.birth}\nAura color: ${submitted.aura}\nMy concern: ${submitted.concern}`
    : 'Hello AstroNumero Clarity, I would like to enquire about a consultation.';
  const whatsAppUrl = `https://wa.me/?text=${encodeURIComponent(whatsappMessage)}`;
  const anchor = (id: string) => { setMenuOpen(false); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); };
  return <div className="astro-site">
    <header className={`astro-header ${scrolled ? 'astro-header-scrolled' : ''}`}>
      <a href="#top" className="astro-logo" aria-label="AstroNumero Clarity home" onClick={() => setMenuOpen(false)}><span className="astro-logo-mark"><Sparkles size={25} strokeWidth={1.2}/></span><span>ASTRONUMERO<span className="astro-logo-sub">CLARITY · EST. IN THE STARS</span></span></a>
      <nav className={`astro-nav ${menuOpen ? 'astro-nav-open' : ''}`} aria-label="Main navigation">
        <a href="#audit" onClick={() => setMenuOpen(false)}>Free Checkup</a><a href="#services" onClick={() => setMenuOpen(false)}>Services</a><a href="#calculator" onClick={() => setMenuOpen(false)}>Life Path Calculator</a><a href="#reviews" onClick={() => setMenuOpen(false)}>Reviews</a>
      </nav>
      <Button asChild className="astro-header-cta"><a href="#services">Book 1-on-1 <ArrowUpRight size={15}/></a></Button>
      <Button variant="ghost" size="icon" className="astro-menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen}>{menuOpen ? <X/> : <Menu/>}</Button>
    </header>

    <main id="top">
      <section className="astro-hero" aria-labelledby="hero-title">
        <img className="astro-hero-image" src={heroImage} width={1536} height={1024} alt="Golden celestial astrolabe within an ancient observatory beneath the night sky" fetchPriority="high" />
        <div className="astro-hero-shade"/>
        <div className="astro-hero-content">
          <div className="astro-kicker"><span className="astro-kicker-dot"/> ASTRONUMERO CLARITY · THE ART OF KNOWING YOURSELF <span className="astro-kicker-rule"/> 01 / 04</div>
          <h1 id="hero-title">Discover your life's <em>hidden blueprint</em><span className="astro-hero-h1-tail"> through Numerology &amp; Kundli Insights.</span></h1>
          <p>Through numerology & Kundli insights, find a new perspective on career, wealth, marriage and the choices that shape your future.</p>
          <div className="astro-hero-actions"><Button asChild className="astro-primary-button"><a href="#audit">Get Free Kundli Checkup <ArrowUpRight/></a></Button><Button asChild variant="outline" className="astro-outline-button"><a href="#services">View service packages <ArrowRight/></a></Button></div>
        </div>
        <div className="astro-hero-bottom"><span>YOUR STORY IS WRITTEN IN MORE THAN WORDS</span><a href="#intro" aria-label="Explore the page"><ArrowDown size={18}/></a><span>SCROLL TO EXPLORE</span></div>
      </section>

      <section id="intro" className="astro-intro astro-section">
        <div className="astro-section-label"><span>01</span> / A DIFFERENT PERSPECTIVE</div>
        <div className="astro-intro-grid"><h2>The numbers know<br/><em>another side of you.</em></h2><div><p>Every birth date carries a rhythm. Every name holds a pattern. We bring together Vedic Kundli insights and numerology to help you look at life's most important questions with fresh eyes.</p><button className="astro-text-link" onClick={() => anchor('calculator')}>Begin with your life path <ArrowUpRight size={18}/></button></div></div>
        <div className="astro-stat-row"><div><span>01 /</span><strong>Discover</strong><small>Find your underlying patterns</small></div><div><span>02 /</span><strong>Understand</strong><small>Explore what they may mean</small></div><div><span>03 /</span><strong>Move forward</strong><small>Choose your next step with intention</small></div></div>
      </section>

      <section id="calculator" className="astro-calculator astro-section">
        <div className="astro-section-label"><span>02</span> / THE LIFE PATH</div>
        <div className="astro-calculator-grid"><div className="astro-calculator-copy"><div className="astro-orbit" aria-hidden="true"><div className="astro-orbit-inner"><span>✧</span></div></div><h2>One date.<br/><em>A world of insight.</em></h2><p>Your Life Path Number offers a small glimpse into the energies that make you, you. Begin with your date of birth.</p></div><div className="astro-calculator-tool"><span className="astro-mini-label">A MOMENT OF DISCOVERY <span>✦</span></span><h3>Find your Life Path Number</h3><label htmlFor="life-birth">YOUR DATE OF BIRTH</label><div className="astro-date-row"><input id="life-birth" type="date" value={birthDate} max={new Date().toISOString().slice(0,10)} onChange={e => { setBirthDate(e.target.value); setResult(null); }}/><Button className="astro-primary-button" onClick={() => setResult(lifePath(birthDate))} disabled={!birthDate || birthDate > new Date().toISOString().slice(0,10)}>Reveal <ArrowRight/></Button></div>{result && <div className="astro-result" aria-live="polite"><div className="astro-result-number">{String(result).padStart(2,'0')}</div><div><span>YOUR LIFE PATH</span><h4>{paths[result]?.title}</h4><p>{paths[result]?.traits.join(' · ')}</p><small>Lucky numbers: {paths[result]?.lucky}</small></div></div>}<p className="astro-tool-note">A starting point, not a prediction. Explore the fuller picture with a personal reading.</p></div></div>
      </section>

      <section id="services" className="astro-services astro-section"><div className="astro-section-label"><span>03</span> / WAYS TO EXPLORE</div><div className="astro-section-head"><h2>Clarity, at your<br/><em>own pace.</em></h2><p>From a first conversation to a deeper look at your path, choose what feels right for where you are.</p></div><div className="astro-package-grid">{packages.map(pkg => <article className={`astro-package ${pkg.popular ? 'astro-package-featured' : ''}`} key={pkg.num}><div className="astro-package-top"><span>{pkg.num} / 04</span>{pkg.popular && <span className="astro-popular"><Star size={12} fill="currentColor"/> MOST POPULAR</span>}</div><div className="astro-package-icon"><MoonStar size={26} strokeWidth={1.2}/></div><h3>{pkg.title}</h3><p>{pkg.details}</p><div className="astro-price">{pkg.price}<span>{pkg.price === '₹0' ? ' / complimentary' : ' / one-time'}</span></div><ul>{pkg.features.map(f => <li key={f}><Check size={16}/>{f}</li>)}</ul><Button asChild variant={pkg.popular ? 'default' : 'outline'} className={pkg.popular ? 'astro-primary-button' : 'astro-package-button'}><a href={pkg.price === '₹0' ? '#audit' : `https://wa.me/?text=${encodeURIComponent(`Hello AstroNumero Clarity, I am interested in ${pkg.title}. Please share how to book.`)}`} target={pkg.price === '₹0' ? undefined : '_blank'} rel={pkg.price === '₹0' ? undefined : 'noopener noreferrer'}>{pkg.action}<ArrowUpRight size={17}/></a></Button></article>)}</div></section>

      <section id="audit" className="astro-audit astro-section"><div className="astro-section-label"><span>04</span> / YOUR FIRST STEP</div><div className="astro-audit-grid"><div className="astro-audit-copy"><span className="astro-symbol">✳</span><h2>It starts with<br/><em>one question.</em></h2><p>Tell us a little about yourself and what is on your mind. Your free Kundli & Destiny Audit begins here.</p><div className="astro-audit-aside"><Compass size={26}/><span>A personal voice analysis, made for your journey.</span></div></div><form className="astro-form" onSubmit={submit} noValidate><div className="astro-form-top"><span>COMPLIMENTARY CONSULTATION</span><span>✦ FREE AUDIT</span></div><h3>Free Kundli & Destiny Audit</h3><p>Share your details to prepare your personal reading.</p><div className="astro-form-grid"><div className="astro-field"><label htmlFor="name">FULL NAME <b>*</b></label><input id="name" name="name" maxLength={100} autoComplete="name" placeholder="e.g. Rahul Sharma" value={audit.name} aria-invalid={!!(touched['name'] && errors['name'])} aria-describedby={touched['name'] && errors['name'] ? 'name-error' : undefined} onBlur={() => setTouched(v => ({...v, name:true}))} onChange={e => setField('name',e.target.value)}/>{touched['name'] && errors['name'] && <small id="name-error" className="astro-error">{errors['name']}</small>}</div><div className="astro-field"><label htmlFor="phone">MOBILE NUMBER <b>*</b></label><div className="astro-phone"><select value={audit.code} onChange={e => setField('code',e.target.value)} aria-label="Country code"><option value="+91">India +91</option><option value="+1">US +1</option><option value="+44">UK +44</option><option value="+971">UAE +971</option><option value="+61">AU +61</option></select><input id="phone" name="phone" maxLength={20} type="tel" inputMode="tel" autoComplete="tel-national" placeholder="98765 43210" value={audit.phone} aria-invalid={!!(touched['phone'] && errors['phone'])} aria-describedby={touched['phone'] && errors['phone'] ? 'phone-error' : undefined} onBlur={() => setTouched(v => ({...v, phone:true}))} onChange={e => setField('phone',e.target.value)}/></div>{touched['phone'] && errors['phone'] && <small id="phone-error" className="astro-error">{errors['phone']}</small>}</div><div className="astro-field"><label htmlFor="email">EMAIL ADDRESS <b>*</b></label><input id="email" name="email" maxLength={255} type="email" autoComplete="email" placeholder="rahul@example.com" value={audit.email} aria-invalid={!!(touched['email'] && errors['email'])} aria-describedby={touched['email'] && errors['email'] ? 'email-error' : undefined} onBlur={() => setTouched(v => ({...v, email:true}))} onChange={e => setField('email',e.target.value)}/>{touched['email'] && errors['email'] && <small id="email-error" className="astro-error">{errors['email']}</small>}</div><div className="astro-field"><label htmlFor="birth">DATE OF BIRTH <b>*</b></label><input id="birth" name="birth" type="date" max={new Date().toISOString().slice(0,10)} value={audit.birth} aria-invalid={!!(touched['birth'] && errors['birth'])} aria-describedby={touched['birth'] && errors['birth'] ? 'birth-error' : undefined} onBlur={() => setTouched(v => ({...v, birth:true}))} onChange={e => setField('birth',e.target.value)}/>{touched['birth'] && errors['birth'] && <small id="birth-error" className="astro-error">{errors['birth']}</small>}</div></div><fieldset className="astro-field astro-swatches"><legend>CHOOSE YOUR AURA COLOR <b>*</b></legend><div className="astro-swatch-grid">{colors.map(color => <Button type="button" key={color.name} variant="ghost" className={`astro-swatch ${audit.aura === color.name ? 'astro-swatch-active' : ''}`} onClick={() => {setField('aura',color.name); setTouched(v=>({...v,aura:true}));}} aria-label={`Select ${color.name} aura color`} aria-pressed={audit.aura === color.name}><span className="astro-swatch-color" style={{ backgroundColor: color.value }}>{audit.aura === color.name && <Check size={17}/>}</span><span>{color.name}</span></Button>)}</div>{touched['aura'] && errors['aura'] && <small id="aura-error" className="astro-error">{errors['aura']}</small>}</fieldset><div className="astro-field"><label htmlFor="concern">WHAT'S ON YOUR MIND? <b>*</b></label><textarea id="concern" name="concern" maxLength={1000} rows={4} placeholder="Share your primary concern or goal — career growth, relationships, name alignment, or something else..." value={audit.concern} aria-invalid={!!(touched['concern'] && errors['concern'])} aria-describedby={touched['concern'] && errors['concern'] ? 'concern-error' : undefined} onBlur={() => setTouched(v => ({...v, concern:true}))} onChange={e => setField('concern',e.target.value)}/>{touched['concern'] && errors['concern'] && <small id="concern-error" className="astro-error">{errors['concern']}</small>}</div><Button type="submit" className="astro-primary-button astro-submit">Claim My Free Kundli & Destiny Audit <ArrowRight/></Button><p className="astro-form-foot"><ShieldCheck size={15}/> Your details stay on this page until you choose to send your request via WhatsApp.</p></form></div></section>

      <section id="reviews" className="astro-reviews astro-section"><div className="astro-section-label"><span>05</span> / YOUR TRUST MATTERS</div><div className="astro-reviews-grid"><div><h2>Guidance begins<br/><em>with trust.</em></h2><p>Personal questions deserve thoughtful answers. We believe in a private, considered conversation—not a one-size-fits-all prediction.</p></div><div className="astro-trust-items"><div><ShieldCheck/><div><strong>Your story is yours</strong><span>Share only what you are comfortable sharing.</span></div></div><div><MessageCircle/><div><strong>A human conversation</strong><span>Real questions, thoughtfully explored.</span></div></div><div><Sparkles/><div><strong>Room to reflect</strong><span>Insight to support your decisions, not make them for you.</span></div></div></div></div><p className="astro-reviews-note">Verified client reviews will appear here when available.</p></section>

      <section className="astro-faq astro-section"><div className="astro-section-label"><span>06</span> / GOOD TO KNOW</div><div className="astro-faq-grid"><h2>A few things<br/><em>you might wonder.</em></h2><div className="astro-faq-list">{faqs.map((faq,i) => <div className="astro-faq-item" key={faq.q}><Button type="button" variant="ghost" aria-expanded={activeFaq === i} aria-controls={`faq-answer-${i}`} onClick={() => setActiveFaq(activeFaq === i ? null : i)}><span>{String(i+1).padStart(2,'0')}</span>{faq.q}<ChevronDown size={20} className={activeFaq === i ? 'astro-chevron-open' : ''}/></Button>{activeFaq === i && <p id={`faq-answer-${i}`}>{faq.a}</p>}</div>)}</div></div></section>
    </main>
    <footer className="astro-footer"><div className="astro-footer-main"><div><span className="astro-footer-star">✳</span><h2>Your next chapter<br/><em>starts here.</em></h2></div><Button asChild className="astro-primary-button"><a href="#audit">Begin your free audit <ArrowUpRight/></a></Button></div><div className="astro-footer-bottom"><span>✦ ASTRONUMERO CLARITY</span><span>NUMEROLOGY · KUNDLI · PERSPECTIVE</span><a href="#top">BACK TO TOP ↑</a></div></footer>
    <div className="astro-mobile-bar"><Button asChild className="astro-primary-button"><a href="#audit"><Sparkles size={15}/> Free Kundli Audit</a></Button><Button asChild variant="outline"><a href={whatsAppUrl} target="_blank" rel="noopener noreferrer"><MessageCircle size={15}/> WhatsApp Us</a></Button></div>
    <Dialog open={!!submitted} onOpenChange={open => {if (!open) setSubmitted(null);}}><DialogContent className="astro-dialog"><div className="astro-success-icon"><Check size={25}/></div><DialogTitle>Your Free Destiny Audit is Ready to Send! 🎉</DialogTitle><DialogDescription asChild><div><p>Thank you, <strong>{submitted?.name}</strong>!</p><p>You've prepared your birth details and your concern regarding: “{submitted?.concern}”. Your chosen aura code is <strong>{submitted?.aura}</strong>.</p><p>Continue on WhatsApp to send your request. A customized 2-minute voice analysis is intended within 2 hours after your request is received.</p><p className="astro-dialog-note">Your request has not been sent yet. You will choose the recipient and send it in WhatsApp.</p></div></DialogDescription><Button asChild className="astro-primary-button"><a href={whatsAppUrl} target="_blank" rel="noopener noreferrer">Connect directly on WhatsApp Now <ArrowUpRight/></a></Button><Button variant="ghost" className="astro-dialog-close" onClick={() => setSubmitted(null)}>Close window</Button></DialogContent></Dialog>
  </div>;
}

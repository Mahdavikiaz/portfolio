import { useState, useEffect, useRef } from 'react';

const NAV_LINKS = [
  'About',
  'Skills',
  'Projects',
  'Experience',
  'Certifications',
  'Contact',
];

const SKILLS = {
  'Web Development': [
    'Laravel',
    'Express.js',
    'Hapi.js',
    'PHP',
    'JavaScript',
    'HTML/CSS',
  ],
  'Mobile Development': [
    'Android (Kotlin)',
    'Material Design 3',
    'Retrofit',
    'Room Database',
  ],
  'Database & Backend': [
    'MySQL',
    'MongoDB',
    'PostgreSQL',
    'REST API',
    'Swagger',
    'JWT Auth',
  ],
  'UI/UX Design': [
    'Figma',
    'Wireframing',
    'Prototyping',
    'User Research',
    'Usability Testing',
  ],
  'Project Management': [
    'UML Diagrams',
    'Use Case Modeling',
    'SRS Documentation',
    'Agile',
  ],
  'Tools & Design': [
    'VS Code',
    'GitHub',
    'Postman',
    'Figma',
    'Trello',
    'Google Workspace',
  ],
};

const PROJECTS = [
  {
    title: 'SIMANIS',
    subtitle: 'IT Asset Management System',
    description:
      'Internal web-based system for managing IT assets, inspections, repair tracking, and reporting dashboard. Built from scratch at BPS DKI Jakarta.',
    tags: ['Laravel', 'MySQL', 'Fullstack'],
    icon: '🖥️',
    color: '#3B82F6',
  },
  {
    title: 'SuCare',
    subtitle: 'Sugar Tracker App',
    description:
      'Health-focused platform with personalized meal recommendations, sugar consumption reminders, and nutritious recipes for healthier dietary habits.',
    tags: ['UI/UX', 'Project Manager', 'Health'],
    icon: '🍎',
    color: '#10B981',
  },
  {
    title: 'Querizz',
    subtitle: 'AI Quiz Generator App',
    description:
      'Android app that summarizes educational materials and auto-generates quizzes from uploaded PDF/DOCX files using AI APIs.',
    tags: ['Kotlin', 'Android', 'API Integration'],
    icon: '📱',
    color: '#8B5CF6',
  },
  {
    title: 'Inventory Management API',
    subtitle: 'REST API',
    description:
      'Full-featured inventory API with Express.js & MongoDB, CRUD operations, Swagger docs, error handling middleware, and flexible schema design.',
    tags: ['Express.js', 'MongoDB', 'Swagger'],
    icon: '📦',
    color: '#F59E0B',
  },
  {
    title: 'Parking App API',
    subtitle: 'REST API',
    description:
      'Parking management system with JWT-based auth, MySQL backend, secure CRUD for parking tickets, and optimized relational schema.',
    tags: ['Express.js', 'MySQL', 'JWT'],
    icon: '🅿️',
    color: '#EF4444',
  },
  {
    title: 'Bookshelf API',
    subtitle: 'REST API',
    description:
      'RESTful API built with Hapi.js for managing digital bookshelves — create, read, update, delete books with persistent storage.',
    tags: ['Hapi.js', 'REST', 'Backend'],
    icon: '📚',
    color: '#06B6D4',
  },
];

const EXPERIENCES = [
  {
    period: 'Dec 2025 – Present',
    role: 'Information Technology Intern',
    company: 'Badan Pusat Statistik Provinsi DKI Jakarta',
    location: 'Jakarta',
    type: 'Internship',
    points: [
      'Developed internal IT Asset Management System (SIMANIS) from scratch using Laravel & MySQL',
      'Designed and implemented LAN infrastructure: cable crimping, device config, network troubleshooting',
      'Performed data scraping & preparation of business/entity data for statisticians',
      'IT support: OS installation, PC assembly, printer/network configuration',
      'Technical operations for official events: Zoom, OBS Studio live streaming, video documentation',
    ],
  },
  {
    period: 'Feb 2024 – Jun 2024',
    role: 'Web Programming Laboratory Assistant',
    company: 'Faculty of Computer Science, Brawijaya University',
    location: 'Malang',
    type: 'Part-time',
    points: [
      'Taught web system design fundamentals and backend data flow using Laravel',
      'Assisted students in debugging and optimizing database-driven systems',
      'Strengthened analytical and troubleshooting skills in practical development',
    ],
  },
  {
    period: 'Sep 2023 – Dec 2023',
    role: 'ADSI Laboratory Assistant',
    company: 'Faculty of Computer Science, Brawijaya University',
    location: 'Malang',
    type: 'Part-time',
    points: [
      'Guided 40+ students in transforming user needs into structured system requirements using UML',
      'Reviewed and validated system documentation for logical consistency',
      'Evaluated information systems based on functionality and usability criteria',
    ],
  },
];

const CERTS = [
  { name: 'Backend – Node.JS', issuer: 'MySkill', year: 'Oct 2024' },
  {
    name: 'Belajar Membuat Aplikasi Back-End untuk Pemula',
    issuer: 'Dicoding',
    year: 'Aug 2024',
  },
  {
    name: 'Belajar Pengembangan Aplikasi Android Intermediate',
    issuer: 'Dicoding',
    year: 'Jun 2024',
  },
  {
    name: 'Belajar Fundamental Aplikasi Android',
    issuer: 'Dicoding',
    year: 'Mar 2024',
  },
  {
    name: 'Bangkit Academy - Mobile Development',
    issuer: 'Google, GoTo, Traveloka',
    year: 'Jul 2024',
  },
];

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setInView(true);
      },
      { threshold },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function FadeIn({ children, delay = 0, className = '' }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(28px)',
        transition: `opacity 0.65s ease ${delay}s, transform 0.65s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

function TypeWriter({ words }) {
  const [index, setIndex] = useState(0);
  const [sub, setSub] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[index];
    const speed = deleting ? 50 : 100;
    const timer = setTimeout(() => {
      if (!deleting && sub < word.length) {
        setSub(sub + 1);
      } else if (!deleting && sub === word.length) {
        setTimeout(() => setDeleting(true), 1400);
      } else if (deleting && sub > 0) {
        setSub(sub - 1);
      } else {
        setDeleting(false);
        setIndex((index + 1) % words.length);
      }
    }, speed);
    return () => clearTimeout(timer);
  }, [sub, deleting, index, words]);

  return (
    <span className="text-blue-400">
      {words[index].substring(0, sub)}
      <span className="animate-pulse">|</span>
    </span>
  );
}

export default function Portfolio() {
  const [activeNav, setActiveNav] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeExp, setActiveExp] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => {
    document
      .getElementById(id.toLowerCase())
      ?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <div
      style={{
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        background: '#0a0a0f',
        color: '#e2e8f0',
        minHeight: '100vh',
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Space+Mono:wght@400;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #0a0a0f; }
        ::-webkit-scrollbar-thumb { background: #3B82F6; border-radius: 4px; }
        .nav-link { position: relative; color: #94a3b8; text-decoration: none; font-size: 0.875rem; font-weight: 500; transition: color 0.2s; padding: 4px 0; }
        .nav-link::after { content: ''; position: absolute; bottom: -2px; left: 0; width: 0; height: 1.5px; background: #3B82F6; transition: width 0.3s; }
        .nav-link:hover { color: #e2e8f0; }
        .nav-link:hover::after { width: 100%; }
        .skill-tag { background: rgba(59,130,246,0.1); border: 1px solid rgba(59,130,246,0.25); color: #93c5fd; padding: 6px 14px; border-radius: 999px; font-size: 0.8rem; font-weight: 500; transition: all 0.2s; cursor: default; }
        .skill-tag:hover { background: rgba(59,130,246,0.2); border-color: rgba(59,130,246,0.5); }
        .card-hover { transition: transform 0.25s, border-color 0.25s, box-shadow 0.25s; }
        .card-hover:hover { transform: translateY(-4px); border-color: rgba(59,130,246,0.4) !important; box-shadow: 0 8px 32px rgba(59,130,246,0.08); }
        .btn-primary { background: #3B82F6; color: white; border: none; padding: 12px 28px; border-radius: 8px; font-size: 0.9rem; font-weight: 600; cursor: pointer; transition: all 0.2s; font-family: inherit; }
        .btn-primary:hover { background: #2563EB; transform: translateY(-1px); box-shadow: 0 4px 16px rgba(59,130,246,0.35); }
        .btn-outline { background: transparent; color: #e2e8f0; border: 1px solid rgba(255,255,255,0.2); padding: 12px 28px; border-radius: 8px; font-size: 0.9rem; font-weight: 600; cursor: pointer; transition: all 0.2s; font-family: inherit; }
        .btn-outline:hover { border-color: rgba(255,255,255,0.5); background: rgba(255,255,255,0.05); }
        .exp-btn { background: transparent; border: 1px solid rgba(255,255,255,0.08); border-radius: 10px; padding: 16px 20px; cursor: pointer; text-align: left; transition: all 0.2s; width: 100%; font-family: inherit; }
        .exp-btn.active { border-color: #3B82F6; background: rgba(59,130,246,0.08); }
        .exp-btn:hover:not(.active) { border-color: rgba(255,255,255,0.18); background: rgba(255,255,255,0.03); }
        .grid-bg { background-image: linear-gradient(rgba(59,130,246,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.03) 1px, transparent 1px); background-size: 60px 60px; }
        .mono { font-family: 'Space Mono', monospace; }
        .glow-blue { box-shadow: 0 0 40px rgba(59,130,246,0.15); }
        input, textarea { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; color: #e2e8f0; padding: 12px 16px; font-size: 0.9rem; font-family: inherit; width: 100%; outline: none; transition: border-color 0.2s; }
        input:focus, textarea:focus { border-color: #3B82F6; }
        input::placeholder, textarea::placeholder { color: #475569; }
        @media (max-width: 768px) {
          .hero-inner { flex-direction: column-reverse !important; align-items: center !important; text-align: center !important; }
          .hero-photo { width: 220px !important; height: 220px !important; margin-bottom: 8px; }
          .hero-stats { justify-content: center !important; }
          .hero-btns { justify-content: center !important; }
          .hidden-mobile { display: none !important; }
          .menu-btn { display: block !important; }
        }
      `}</style>

      {/* NAV */}
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          background: scrolled ? 'rgba(10,10,15,0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none',
          transition: 'all 0.3s',
          padding: '0 5%',
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: 68,
          }}
        >
          <span
            className="mono"
            style={{ fontSize: '1.1rem', fontWeight: 700, color: '#e2e8f0' }}
          >
            <span style={{ color: '#3B82F6' }}>{'<'}</span>Zidan Mahdavikia
            <span style={{ color: '#3B82F6' }}>{'/>'}</span>
          </span>
          <div
            style={{ display: 'flex', gap: 32, alignItems: 'center' }}
            className="hidden-mobile"
          >
            {NAV_LINKS.map((l) => (
              <a
                key={l}
                className="nav-link"
                href={`#${l.toLowerCase()}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo(l);
                }}
              >
                {l}
              </a>
            ))}
          </div>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              display: 'none',
              background: 'none',
              border: 'none',
              color: '#e2e8f0',
              cursor: 'pointer',
              fontSize: 22,
            }}
            className="menu-btn"
          >
            ☰
          </button>
        </div>
        {menuOpen && (
          <div
            style={{
              background: 'rgba(10,10,15,0.98)',
              padding: '16px 5%',
              borderTop: '1px solid rgba(255,255,255,0.06)',
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
            }}
          >
            {NAV_LINKS.map((l) => (
              <a
                key={l}
                className="nav-link"
                href={`#${l.toLowerCase()}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo(l);
                }}
                style={{ fontSize: '1rem' }}
              >
                {l}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section
        className="grid-bg"
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          padding: '100px 5% 80px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '15%',
            right: '8%',
            width: 380,
            height: 380,
            background:
              'radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)',
            borderRadius: '50%',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '10%',
            left: '5%',
            width: 240,
            height: 240,
            background:
              'radial-gradient(circle, rgba(139,92,246,0.07) 0%, transparent 70%)',
            borderRadius: '50%',
            pointerEvents: 'none',
          }}
        />

        <div
          className="hero-inner"
          style={{
            maxWidth: 1200,
            margin: '0 auto',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 40,
          }}
        >
          <div style={{ flex: 1 }}>
            <div
              className="mono"
              style={{
                color: '#3B82F6',
                fontSize: '0.85rem',
                marginBottom: 16,
                letterSpacing: '0.15em',
              }}
            >
              // Hello, world!
            </div>
            <h1
              style={{
                fontSize: 'clamp(2.6rem, 6vw, 5rem)',
                fontWeight: 800,
                lineHeight: 1.08,
                marginBottom: 20,
                letterSpacing: '-0.02em',
              }}
            >
              I'm <span style={{ color: '#3B82F6' }}>Zidan</span>{' '}
              <span style={{ display: 'block' }}>Mahdavikia</span>
            </h1>
            <div
              style={{
                fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
                fontWeight: 500,
                marginBottom: 24,
                minHeight: 40,
              }}
            >
              <TypeWriter
                words={[
                  'Fullstack Developer',
                  'IT Support Specialist',
                  'Backend Engineer',
                  'Android Developer',
                  'UI/UX Designer',
                ]}
              />
            </div>
            <p
              style={{
                color: '#64748b',
                maxWidth: 560,
                lineHeight: 1.75,
                marginBottom: 40,
                fontSize: '1rem',
              }}
            >
              Information Technology Graduate from Brawijaya University.
              Building reliable digital solutions with a passion for clean code
              and impactful systems.
            </p>
            <div
              classname="hero-btns"
              style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}
            >
              <button
                className="btn-primary"
                onClick={() => scrollTo('Projects')}
              >
                Explore Projects
              </button>
              <button
                className="btn-outline"
                onClick={() => scrollTo('Contact')}
              >
                Get In Touch
              </button>
            </div>

            <div
              classname="hero-stats"
              style={{ display: 'flex', gap: 40, marginTop: 56 }}
            >
              {[
                { value: '3.81', label: 'GPA / 4.00' },
                { value: '6+', label: 'Projects Built' },
                { value: '5', label: 'Certifications' },
              ].map((s) => (
                <div key={s.label}>
                  <div
                    className="mono"
                    style={{
                      fontSize: '2rem',
                      fontWeight: 700,
                      color: '#3B82F6',
                    }}
                  >
                    {s.value}
                  </div>
                  <div
                    style={{
                      color: '#475569',
                      fontSize: '0.8rem',
                      marginTop: 2,
                    }}
                  >
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Kolom kanan - foto */}
          <div
            style={{
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              className="hero-photo glow-blue"
              style={{
                width: 320,
                height: 320,
                borderRadius: '50%',
                border: '3px solid #3B82F6',
                padding: 4,
                background:
                  'linear-gradient(135deg, rgba(59,130,246,0.3), rgba(139,92,246,0.1))',
                boxShadow: '0 0 60px rgba(59,130,246,0.25)',
              }}
            >
              <img
                src="/foto.jpeg"
                alt="Zidan Mahdavikia"
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  objectPosition: 'top',
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section
        id="about"
        style={{ padding: '100px 5%', background: 'rgba(255,255,255,0.015)' }}
      >
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <FadeIn>
            <div
              className="mono"
              style={{
                color: '#3B82F6',
                fontSize: '0.8rem',
                letterSpacing: '0.12em',
                marginBottom: 12,
              }}
            >
              01. ABOUT
            </div>
            <h2
              style={{
                fontSize: 'clamp(1.8rem, 4vw, 3rem)',
                fontWeight: 800,
                marginBottom: 48,
                letterSpacing: '-0.02em',
              }}
            >
              Here's a bit about me
            </h2>
          </FadeIn>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 40,
              alignItems: 'start',
            }}
          >
            <FadeIn delay={0.1}>
              <p
                style={{ color: '#94a3b8', lineHeight: 1.8, marginBottom: 20 }}
              >
                Information Technology Graduate from{' '}
                <strong style={{ color: '#e2e8f0' }}>
                  Brawijaya University
                </strong>{' '}
                with hands-on experience in fullstack development, IT support,
                and system implementation.
              </p>
              <p style={{ color: '#94a3b8', lineHeight: 1.8 }}>
                Experienced in building real-world applications and supporting
                technical operations. Skilled in system design, database
                management, troubleshooting, and network configuration —
                adaptable and always eager to learn.
              </p>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                {[
                  { label: 'Education', value: 'Brawijaya University' },
                  { label: 'Major', value: 'Information Technology' },
                  { label: 'GPA', value: '3.81 / 4.00' },
                  { label: 'Graduation', value: 'December 2025' },
                  { label: 'Location', value: 'Tangerang, Banten' },
                  { label: 'Email', value: 'zidan3677@gmail.com' },
                ].map((item, i) => (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      padding: '14px 0',
                      borderBottom: '1px solid rgba(255,255,255,0.06)',
                    }}
                  >
                    <span style={{ color: '#475569', fontSize: '0.9rem' }}>
                      {item.label}
                    </span>
                    <span
                      style={{
                        color: '#e2e8f0',
                        fontSize: '0.9rem',
                        fontWeight: 500,
                      }}
                    >
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" style={{ padding: '100px 5%' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <FadeIn>
            <div
              className="mono"
              style={{
                color: '#3B82F6',
                fontSize: '0.8rem',
                letterSpacing: '0.12em',
                marginBottom: 12,
              }}
            >
              02. SKILLS
            </div>
            <h2
              style={{
                fontSize: 'clamp(1.8rem, 4vw, 3rem)',
                fontWeight: 800,
                marginBottom: 12,
                letterSpacing: '-0.02em',
              }}
            >
              Skills & Expertise
            </h2>
            <p style={{ color: '#475569', marginBottom: 56 }}>
              Technical skills spanning web, mobile, backend, and design
            </p>
          </FadeIn>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: 20,
            }}
          >
            {Object.entries(SKILLS).map(([cat, items], i) => (
              <FadeIn key={cat} delay={i * 0.08}>
                <div
                  className="card-hover"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: 16,
                    padding: '28px',
                  }}
                >
                  <h3
                    style={{
                      color: '#e2e8f0',
                      fontWeight: 700,
                      marginBottom: 20,
                      fontSize: '1rem',
                    }}
                  >
                    {cat}
                  </h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {items.map((s) => (
                      <span key={s} className="skill-tag">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={0.3}>
            <div
              style={{
                marginTop: 20,
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 16,
                padding: '24px 28px',
                display: 'flex',
                gap: 12,
                flexWrap: 'wrap',
                alignItems: 'center',
              }}
            >
              <span
                style={{
                  color: '#475569',
                  fontSize: '0.85rem',
                  marginRight: 4,
                }}
              >
                Languages:
              </span>
              {['Indonesian (Native)', 'English (Conversational)'].map((l) => (
                <span
                  key={l}
                  className="skill-tag"
                  style={{
                    background: 'rgba(139,92,246,0.1)',
                    borderColor: 'rgba(139,92,246,0.25)',
                    color: '#c4b5fd',
                  }}
                >
                  {l}
                </span>
              ))}
              <span
                style={{
                  color: '#475569',
                  fontSize: '0.85rem',
                  marginRight: 4,
                  marginLeft: 8,
                }}
              >
                Programming:
              </span>
              {['JavaScript', 'PHP', 'SQL', 'NoSQL', 'Java', 'Kotlin'].map(
                (l) => (
                  <span key={l} className="skill-tag">
                    {l}
                  </span>
                ),
              )}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* PROJECTS */}
      <section
        id="projects"
        style={{ padding: '100px 5%', background: 'rgba(255,255,255,0.015)' }}
      >
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <FadeIn>
            <div
              className="mono"
              style={{
                color: '#3B82F6',
                fontSize: '0.8rem',
                letterSpacing: '0.12em',
                marginBottom: 12,
              }}
            >
              03. WORKS
            </div>
            <h2
              style={{
                fontSize: 'clamp(1.8rem, 4vw, 3rem)',
                fontWeight: 800,
                marginBottom: 12,
                letterSpacing: '-0.02em',
              }}
            >
              Featured Projects
            </h2>
            <p style={{ color: '#475569', marginBottom: 56 }}>
              Real-world applications built from design to deployment
            </p>
          </FadeIn>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: 20,
            }}
          >
            {PROJECTS.map((p, i) => (
              <FadeIn key={p.title} delay={i * 0.07}>
                <div
                  className="card-hover"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: 16,
                    overflow: 'hidden',
                    height: '100%',
                  }}
                >
                  <div
                    style={{
                      height: 120,
                      background: `linear-gradient(135deg, ${p.color}15 0%, ${p.color}05 100%)`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '2.8rem',
                      borderBottom: `1px solid ${p.color}20`,
                    }}
                  >
                    {p.icon}
                  </div>
                  <div style={{ padding: '24px' }}>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        marginBottom: 8,
                      }}
                    >
                      <div>
                        <h3
                          style={{
                            fontWeight: 700,
                            fontSize: '1.05rem',
                            marginBottom: 2,
                          }}
                        >
                          {p.title}
                        </h3>
                        <span style={{ color: '#475569', fontSize: '0.8rem' }}>
                          {p.subtitle}
                        </span>
                      </div>
                    </div>
                    <p
                      style={{
                        color: '#94a3b8',
                        fontSize: '0.88rem',
                        lineHeight: 1.65,
                        margin: '12px 0 20px',
                      }}
                    >
                      {p.description}
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                      {p.tags.map((t) => (
                        <span
                          key={t}
                          style={{
                            background: `${p.color}15`,
                            border: `1px solid ${p.color}30`,
                            color: p.color,
                            padding: '4px 10px',
                            borderRadius: 999,
                            fontSize: '0.75rem',
                            fontWeight: 500,
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" style={{ padding: '100px 5%' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <FadeIn>
            <div
              className="mono"
              style={{
                color: '#3B82F6',
                fontSize: '0.8rem',
                letterSpacing: '0.12em',
                marginBottom: 12,
              }}
            >
              04. EXPERIENCE
            </div>
            <h2
              style={{
                fontSize: 'clamp(1.8rem, 4vw, 3rem)',
                fontWeight: 800,
                marginBottom: 12,
                letterSpacing: '-0.02em',
              }}
            >
              The path I've taken
            </h2>
            <p style={{ color: '#475569', marginBottom: 56 }}>
              Key moments in my career journey
            </p>
          </FadeIn>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: 40,
            }}
          >
            <FadeIn delay={0.1}>
              <div
                style={{ display: 'flex', flexDirection: 'column', gap: 10 }}
              >
                {EXPERIENCES.map((e, i) => (
                  <button
                    key={i}
                    className={`exp-btn${activeExp === i ? ' active' : ''}`}
                    onClick={() => setActiveExp(i)}
                  >
                    <div
                      className="mono"
                      style={{
                        fontSize: '0.72rem',
                        color: '#475569',
                        marginBottom: 6,
                      }}
                    >
                      {e.period}
                    </div>
                    <div
                      style={{
                        fontWeight: 600,
                        fontSize: '0.9rem',
                        color: activeExp === i ? '#3B82F6' : '#e2e8f0',
                      }}
                    >
                      {e.role}
                    </div>
                    <div
                      style={{
                        color: '#64748b',
                        fontSize: '0.8rem',
                        marginTop: 2,
                      }}
                    >
                      {e.company}
                    </div>
                  </button>
                ))}
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div
                className="glow-blue"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 16,
                  padding: '32px',
                }}
              >
                <div
                  className="mono"
                  style={{
                    fontSize: '0.72rem',
                    color: '#3B82F6',
                    marginBottom: 12,
                    letterSpacing: '0.1em',
                  }}
                >
                  {EXPERIENCES[activeExp].period} •{' '}
                  {EXPERIENCES[activeExp].type}
                </div>
                <h3
                  style={{
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    marginBottom: 4,
                  }}
                >
                  {EXPERIENCES[activeExp].role}
                </h3>
                <div
                  style={{
                    color: '#60a5fa',
                    fontSize: '0.9rem',
                    marginBottom: 4,
                  }}
                >
                  {EXPERIENCES[activeExp].company}
                </div>
                <div
                  style={{
                    color: '#475569',
                    fontSize: '0.82rem',
                    marginBottom: 24,
                  }}
                >
                  📍 {EXPERIENCES[activeExp].location}
                </div>
                <ul
                  style={{
                    listStyle: 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 12,
                  }}
                >
                  {EXPERIENCES[activeExp].points.map((pt, i) => (
                    <li
                      key={i}
                      style={{
                        display: 'flex',
                        gap: 12,
                        color: '#94a3b8',
                        fontSize: '0.88rem',
                        lineHeight: 1.6,
                      }}
                    >
                      <span
                        style={{
                          color: '#3B82F6',
                          marginTop: 2,
                          flexShrink: 0,
                        }}
                      >
                        ▹
                      </span>
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          </div>

          {/* Education */}
          <FadeIn delay={0.1}>
            <div
              style={{
                marginTop: 60,
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 16,
                padding: '32px',
              }}
            >
              <h3
                style={{
                  fontWeight: 700,
                  marginBottom: 24,
                  color: '#94a3b8',
                  fontSize: '0.9rem',
                  letterSpacing: '0.05em',
                }}
              >
                🎓 EDUCATION
              </h3>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                  gap: 24,
                }}
              >
                <div>
                  <div style={{ fontWeight: 700, marginBottom: 4 }}>
                    Brawijaya University
                  </div>
                  <div style={{ color: '#94a3b8', fontSize: '0.88rem' }}>
                    Bachelor of Computer Science — Information Technology
                  </div>
                  <div
                    style={{
                      color: '#3B82F6',
                      fontSize: '0.82rem',
                      marginTop: 4,
                    }}
                  >
                    GPA 3.81/4.00 &nbsp;·&nbsp; Aug 2021 – Jul 2025
                  </div>
                </div>
                <div>
                  <div style={{ fontWeight: 700, marginBottom: 4 }}>
                    Bangkit Academy led by Google, GoTo, & Traveloka
                  </div>
                  <div style={{ color: '#94a3b8', fontSize: '0.88rem' }}>
                    Android Learning Path — Batch 1 2024
                  </div>
                  <div
                    style={{
                      color: '#3B82F6',
                      fontSize: '0.82rem',
                      marginTop: 4,
                    }}
                  >
                    Feb 2024 – Jul 2024
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CERTIFICATIONS */}
      <section
        id="certifications"
        style={{ padding: '100px 5%', background: 'rgba(255,255,255,0.015)' }}
      >
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <FadeIn>
            <div
              className="mono"
              style={{
                color: '#3B82F6',
                fontSize: '0.8rem',
                letterSpacing: '0.12em',
                marginBottom: 12,
              }}
            >
              05. CERTIFICATIONS
            </div>
            <h2
              style={{
                fontSize: 'clamp(1.8rem, 4vw, 3rem)',
                fontWeight: 800,
                marginBottom: 12,
                letterSpacing: '-0.02em',
              }}
            >
              Certifications & Training
            </h2>
            <p style={{ color: '#475569', marginBottom: 56 }}>
              Continuous learning and professional development
            </p>
          </FadeIn>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: 16,
            }}
          >
            {CERTS.map((c, i) => (
              <FadeIn key={c.name} delay={i * 0.07}>
                <div
                  className="card-hover"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: 12,
                    padding: '22px 24px',
                    display: 'flex',
                    gap: 16,
                    alignItems: 'flex-start',
                  }}
                >
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 10,
                      background: 'rgba(59,130,246,0.15)',
                      border: '1px solid rgba(59,130,246,0.25)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      fontSize: '1.2rem',
                    }}
                  >
                    🏅
                  </div>
                  <div>
                    <div
                      style={{
                        fontWeight: 600,
                        fontSize: '0.9rem',
                        marginBottom: 4,
                      }}
                    >
                      {c.name}
                    </div>
                    <div style={{ color: '#60a5fa', fontSize: '0.8rem' }}>
                      {c.issuer}
                    </div>
                    <div
                      className="mono"
                      style={{
                        color: '#475569',
                        fontSize: '0.72rem',
                        marginTop: 4,
                      }}
                    >
                      {c.year}
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ padding: '100px 5% 120px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <FadeIn>
            <div
              className="mono"
              style={{
                color: '#3B82F6',
                fontSize: '0.8rem',
                letterSpacing: '0.12em',
                marginBottom: 12,
              }}
            >
              06. CONTACT
            </div>
            <h2
              style={{
                fontSize: 'clamp(1.8rem, 4vw, 3rem)',
                fontWeight: 800,
                marginBottom: 12,
                letterSpacing: '-0.02em',
              }}
            >
              Let's work together
            </h2>
            <p style={{ color: '#475569', marginBottom: 56 }}>
              Ready to build something great? Let's connect!
            </p>
          </FadeIn>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 40,
            }}
          >
            <FadeIn delay={0.1}>
              <div
                style={{ display: 'flex', flexDirection: 'column', gap: 14 }}
              >
                {[
                  {
                    icon: '📧',
                    label: 'Email',
                    value: 'zidan3677@gmail.com',
                    href: 'mailto:zidan3677@gmail.com',
                  },
                  {
                    icon: '📱',
                    label: 'Phone',
                    value: '+62 821 1268 4859',
                    href: 'tel:+6282112684859',
                  },
                  {
                    icon: '📍',
                    label: 'Location',
                    value: 'Tangerang City, Banten, ID',
                    href: null,
                  },
                  {
                    icon: '💼',
                    label: 'LinkedIn',
                    value: 'Zidan Mahdavikia',
                    href: 'https://www.linkedin.com/in/zidan-mahdavikia-0a77a3217/',
                  },
                  {
                    icon: '🐙',
                    label: 'GitHub',
                    value: 'github.com/Mahdavikiaz',
                    href: 'https://github.com/Mahdavikiaz',
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    style={{
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: 12,
                      padding: '16px 20px',
                      display: 'flex',
                      gap: 16,
                      alignItems: 'center',
                    }}
                  >
                    <div
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: 10,
                        background: 'rgba(59,130,246,0.1)',
                        border: '1px solid rgba(59,130,246,0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.2rem',
                        flexShrink: 0,
                      }}
                    >
                      {item.icon}
                    </div>
                    <div>
                      <div
                        style={{
                          color: '#475569',
                          fontSize: '0.75rem',
                          marginBottom: 2,
                        }}
                      >
                        {item.label}
                      </div>
                      {item.href ? (
                        <a
                          href={item.href}
                          style={{
                            color: '#e2e8f0',
                            fontSize: '0.9rem',
                            fontWeight: 500,
                            textDecoration: 'none',
                          }}
                          onMouseEnter={(e) =>
                            (e.target.style.color = '#60a5fa')
                          }
                          onMouseLeave={(e) =>
                            (e.target.style.color = '#e2e8f0')
                          }
                        >
                          {item.value}
                        </a>
                      ) : (
                        <div
                          style={{
                            color: '#e2e8f0',
                            fontSize: '0.9rem',
                            fontWeight: 500,
                          }}
                        >
                          {item.value}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div
                className="glow-blue"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 16,
                  padding: '36px',
                }}
              >
                <h3 style={{ fontWeight: 700, marginBottom: 8 }}>
                  Ready to start a project?
                </h3>
                <p
                  style={{
                    color: '#64748b',
                    fontSize: '0.9rem',
                    marginBottom: 28,
                    lineHeight: 1.6,
                  }}
                >
                  Whether you need fullstack development, IT support, or mobile
                  app solutions — I'm here to help bring your ideas to life.
                </p>
                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                  <a
                    href="mailto:zidan3677@gmail.com"
                    className="btn-primary"
                    style={{ textDecoration: 'none', display: 'inline-block' }}
                  >
                    Send Email
                  </a>
                  <a
                    href="https://www.linkedin.com/in/zidan-mahdavikia-0a77a3217/"
                    className="btn-outline"
                    style={{ textDecoration: 'none', display: 'inline-block' }}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    LinkedIn
                  </a>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        style={{
          borderTop: '1px solid rgba(255,255,255,0.06)',
          background: '#0a0a0f',
        }}
      >
        {/* Footer Main */}
        <div
          style={{
            maxWidth: 1200,
            margin: '0 auto',
            padding: '48px 5%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 32,
          }}
        >
          {/* Kiri - Nama & Title */}
          <div>
            <div
              style={{ fontWeight: 800, fontSize: '1.3rem', marginBottom: 6 }}
            >
              Zidan Mahdavikia
            </div>
            <div style={{ color: '#475569', fontSize: '0.875rem' }}>
              Fullstack Developer & IT Support Specialist
            </div>
          </div>

          {/* Tengah - Nav Links */}
          <div style={{ display: 'flex', gap: 28, flexWrap: 'wrap' }}>
            {NAV_LINKS.map((l) => (
              <a
                key={l}
                href={`#${l.toLowerCase()}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo(l);
                }}
                style={{
                  color: '#475569',
                  textDecoration: 'none',
                  fontSize: '0.875rem',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={(e) => (e.target.style.color = '#e2e8f0')}
                onMouseLeave={(e) => (e.target.style.color = '#475569')}
              >
                {l}
              </a>
            ))}
          </div>

          {/* Kanan - Social Icons */}
          <div style={{ display: 'flex', gap: 12 }}>
            {[
              { href: 'https://linkedin.com', label: 'LinkedIn', icon: 'in' },
              { href: 'mailto:zidan3677@gmail.com', label: 'Email', icon: '✉' },
              { href: 'tel:+6282112684859', label: 'Phone', icon: '✆' },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  border: '1px solid rgba(255,255,255,0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#64748b',
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  fontWeight: 700,
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#3B82F6';
                  e.currentTarget.style.color = '#3B82F6';
                  e.currentTarget.style.background = 'rgba(59,130,246,0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)';
                  e.currentTarget.style.color = '#64748b';
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Footer Bottom */}
        <div
          style={{
            borderTop: '1px solid rgba(255,255,255,0.06)',
            padding: '18px 5%',
          }}
        >
          <div
            style={{
              maxWidth: 1200,
              margin: '0 auto',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <span
              className="mono"
              style={{ color: '#334155', fontSize: '0.78rem' }}
            >
              © 2026 Zidan Mahdavikia. All rights reserved.
            </span>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              style={{
                background: 'none',
                border: 'none',
                color: '#475569',
                cursor: 'pointer',
                fontSize: '0.8rem',
                fontFamily: 'inherit',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => (e.target.style.color = '#e2e8f0')}
              onMouseLeave={(e) => (e.target.style.color = '#475569')}
            >
              Back to Top ↑
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

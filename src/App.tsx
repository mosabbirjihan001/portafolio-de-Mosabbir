import { type FormEvent, useState } from 'react'
import {
  ArrowUpRight,
  BookOpen,
  BrainCircuit,
  BriefcaseBusiness,
  Check,
  Clipboard,
  Code2,
  Download,
  GraduationCap,
  Link,
  Mail,
  MapPin,
  Phone,
  Rocket,
  Server,
  Sparkles,
  Terminal,
} from 'lucide-react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { profile } from './profile'
import './App.css'

const iconMap = [Code2, Server, BrainCircuit, Terminal, Sparkles]
const reveal = {
  hidden: { opacity: 0, y: 56, filter: 'blur(8px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
}

function App() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 26,
    restDelta: 0.001,
  })

  const [copied, setCopied] = useState(false)

  const handleEmailSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const name = String(formData.get('name') || '').trim()
    const email = String(formData.get('email') || '').trim()
    const message = String(formData.get('message') || '').trim()
    const subject = encodeURIComponent(`Portfolio message from ${name || 'a visitor'}`)
    const body = encodeURIComponent(
      [`Name: ${name}`, `Email: ${email}`, '', message].join('\n'),
    )

    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
  }

  const handleCopyEmail = async () => {
    await navigator.clipboard.writeText(profile.email)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1800)
  }

  return (
    <main className="site-shell">
      <div className="ambient-bg" aria-hidden="true" />
      <motion.div className="scroll-progress" style={{ scaleX }} aria-hidden="true" />
      <nav className="nav" aria-label="Primary navigation">
        <a className="brand" href="#top" aria-label={`${profile.name} home`}>
          <span>{profile.initials}</span>
          <strong>{profile.name}</strong>
        </a>
        <div className="nav-links">
          <a href="#skills">Skills</a>
          <a href="#achievements">Achievements</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      <section className="hero-section" id="top">
        <div className="hero-copy">
          <motion.p
            className="eyebrow"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <GraduationCap size={18} />
            {profile.role}
          </motion.p>
          <motion.h1
            className="hero-title"
            aria-label={profile.headline}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.08 }}
          >
            {profile.headline.split(' ').map((word, index) => (
              <motion.span
                className="word"
                aria-hidden="true"
                key={`${word}-${index}`}
                initial={{ opacity: 0, y: 28, filter: 'blur(10px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{
                  duration: 0.58,
                  delay: 0.08 + index * 0.05,
                  ease: 'easeOut',
                }}
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>
          <motion.p
            className="hero-summary"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.16 }}
          >
            {profile.summary}
          </motion.p>

          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.24 }}
          >
            <a className="button primary" href="#projects">
              <Rocket size={18} />
              View Projects
            </a>
            <a className="button secondary" href={profile.resumeUrl} download>
              <Download size={18} />
              Resume
            </a>
          </motion.div>
        </div>

        <motion.aside
          className="profile-panel"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.12 }}
        >
          <div className="photo-frame">
            <img
              src={profile.photo}
              alt={`${profile.name} portrait`}
              onError={(event) => {
                event.currentTarget.style.display = 'none'
              }}
            />
            <span>{profile.initials}</span>
          </div>
          <div>
            <h2>{profile.name}</h2>
            <p>{profile.availability}</p>
          </div>
          <div className="quick-info">
            <span>
              <MapPin size={16} />
              {profile.location}
            </span>
            <span>
              <Mail size={16} />
              {profile.email}
            </span>
          </div>
        </motion.aside>
      </section>

      <motion.section
        className="stats-band"
        aria-label="Profile highlights"
        variants={reveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.78, ease: 'easeOut' }}
      >
        {profile.stats.map((stat) => (
          <div className="stat" key={stat.label}>
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </div>
        ))}
      </motion.section>

      <motion.section
        className="section"
        id="skills"
        variants={reveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.18 }}
        transition={{ duration: 0.78, ease: 'easeOut' }}
      >
        <div className="section-heading">
          <p className="eyebrow">
            <BookOpen size={18} />
            Skills
          </p>
          <h2>Tools I use to build reliable software</h2>
        </div>
        <div className="skill-grid">
          {profile.skills.map((skill, index) => {
            const Icon = iconMap[index % iconMap.length]
            return (
              <article className="skill-card" key={skill.group}>
                <div className="card-icon">
                  <Icon size={22} />
                </div>
                <h3>{skill.group}</h3>
                <div className="tags">
                  {skill.items.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </article>
            )
          })}
        </div>
      </motion.section>

      <motion.section
        className="section achievements-section"
        id="achievements"
        variants={reveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.78, ease: 'easeOut' }}
      >
        <div className="section-heading">
          <p className="eyebrow">
            <Sparkles size={18} />
            Achievements
          </p>
          <h2>Milestones that show consistent growth</h2>
        </div>
        <div className="achievement-grid">
          {profile.achievements.map((achievement, index) => (
            <motion.article
              className="achievement-card"
              key={achievement.title}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.58, delay: index * 0.1, ease: 'easeOut' }}
            >
              <strong>{achievement.highlight}</strong>
              <h3>{achievement.title}</h3>
              <p>{achievement.result}</p>
            </motion.article>
          ))}
        </div>
      </motion.section>

      <motion.section
        className="section split-section"
        id="projects"
        variants={reveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.16 }}
        transition={{ duration: 0.78, ease: 'easeOut' }}
      >
        <div className="section-heading sticky-heading">
          <p className="eyebrow">
            <BriefcaseBusiness size={18} />
            Projects
          </p>
          <h2>Selected work for CSE, web, and MERN development</h2>
        </div>
        <div className="project-list">
          {profile.projects.map((project) => (
            <article className="project-card" key={project.title}>
              <div>
                <p>{project.type}</p>
                <h3>{project.title}</h3>
                <span>{project.description}</span>
              </div>
              <div className="project-footer">
                <div className="tags">
                  {project.stack.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
                <a href={project.link} aria-label={`Open ${project.title}`}>
                  <ArrowUpRight size={20} />
                </a>
              </div>
            </article>
          ))}
        </div>
      </motion.section>

      <motion.section
        className="section timeline-section"
        variants={reveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.18 }}
        transition={{ duration: 0.78, ease: 'easeOut' }}
      >
        <div className="section-heading">
          <p className="eyebrow">
            <GraduationCap size={18} />
            Journey
          </p>
          <h2>Learning, building, and improving every semester</h2>
        </div>
        <div className="timeline">
          {profile.experience.map((item) => (
            <article key={`${item.title}-${item.period}`}>
              <time>{item.period}</time>
              <div>
                <h3>{item.title}</h3>
                <p>{item.org}</p>
                <span>{item.details}</span>
              </div>
            </article>
          ))}
        </div>
      </motion.section>

      <motion.section
        className="contact-section"
        id="contact"
        variants={reveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.24 }}
        transition={{ duration: 0.78, ease: 'easeOut' }}
      >
        <div>
          <p className="eyebrow">
            <Mail size={18} />
            Contact
          </p>
          <h2>Have an opportunity or project?</h2>
          <p>{profile.availability}</p>
        </div>
        <div className="contact-actions">
          <button className="copy-button" type="button" onClick={handleCopyEmail}>
            {copied ? <Check size={18} /> : <Clipboard size={18} />}
            {copied ? 'Copied' : 'Copy Email'}
          </button>
          <a href={profile.resumeUrl} download>
            <Download size={18} />
            Resume
          </a>
          <a href={`tel:${profile.phone.replace(/\s/g, '')}`}>
            <Phone size={18} />
            Call
          </a>
          <a href={profile.socials.github} target="_blank" rel="noreferrer">
            <Code2 size={18} />
            GitHub
          </a>
          <a href={profile.socials.linkedin} target="_blank" rel="noreferrer">
            <Link size={18} />
            LinkedIn
          </a>
        </div>
        <form className="contact-form" onSubmit={handleEmailSubmit}>
          <input name="name" type="text" placeholder="Your name" required />
          <input name="email" type="email" placeholder="Your email" required />
          <textarea name="message" placeholder="Write your message" rows={4} required />
          <button type="submit">
            <Mail size={18} />
            Send Email
          </button>
        </form>
      </motion.section>
    </main>
  )
}

export default App

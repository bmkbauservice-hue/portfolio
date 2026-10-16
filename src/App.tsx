import { LazyMotion, MotionConfig, domAnimation } from 'motion/react'
import { useState } from 'react'
import { Intro } from './components/Intro'
import { shouldShowIntro } from './components/introStorage'
import { BackgroundFx } from './components/effects/BackgroundFx'
import { Footer } from './components/layout/Footer'
import { Header } from './components/layout/Header'
import { About } from './components/sections/About'
import { Contact } from './components/sections/Contact'
import { Hero } from './components/sections/Hero'
import { Projects } from './components/sections/Projects'
import { Skills } from './components/sections/Skills'
import { ThemeProvider } from './theme/ThemeProvider'

export default function App() {
  const [introActive, setIntroActive] = useState(shouldShowIntro)

  return (
    <ThemeProvider>
      <LazyMotion features={domAnimation} strict>
        <MotionConfig reducedMotion="user">
          <a
            href="#inhalt"
            className="sr-only z-[200] rounded-full bg-accent px-4 py-2 font-semibold text-on-accent focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
          >
            Zum Inhalt springen
          </a>
          {introActive && <Intro onDone={() => setIntroActive(false)} />}
          <BackgroundFx />
          <div inert={introActive || undefined}>
            <Header />
            <main id="inhalt" tabIndex={-1} className="outline-none">
              <Hero ready={!introActive} />
              <Projects />
              <Skills />
              <About />
              <Contact />
            </main>
            <Footer />
          </div>
        </MotionConfig>
      </LazyMotion>
    </ThemeProvider>
  )
}

<template>
  <div class="landing">
    <!-- Hero -->
    <section
      class="hero"
      @mousemove="onHeroMouseMove"
      @mouseleave="resetHeroMouse"
    >
      <div class="hero__bg">
        <div
          class="hero__orb hero__orb--1"
          :style="{ transform: `translate(${mouse.x * 0.03}px, ${mouse.y * 0.03}px)` }"
        />
        <div
          class="hero__orb hero__orb--2"
          :style="{ transform: `translate(${mouse.x * -0.02}px, ${mouse.y * -0.04}px)` }"
        />
        <div
          class="hero__spotlight"
          :style="{ left: `${mouse.px}%`, top: `${mouse.py}%` }"
        />
        <div class="hero__grid" />
      </div>

      <v-container class="hero__content">
        <v-row align="center" justify="center">
          <v-col cols="12" md="10" lg="8" class="text-center">
            <v-chip
              color="primary"
              variant="flat"
              class="hero__badge mb-6"
              prepend-icon="mdi-lightning-bolt"
            >
              Built for modern teams
            </v-chip>

            <h1 class="hero__title">
              Ship faster with
              <span class="hero__title-accent">{{ typedText }}</span
              ><span class="hero__cursor">|</span>
            </h1>

            <p class="hero__subtitle">
              MTech gives you the tools to design, build, and launch products your users love —
              with interactive workflows, real-time insights, and zero friction.
            </p>

            <div class="hero__actions">
              <v-btn
                size="x-large"
                rounded="pill"
                color="primary"
                class="hero__cta"
                prepend-icon="mdi-rocket-launch"
                @click="scrollTo('cta')"
              >
                Start building free
              </v-btn>
              <v-btn
                size="x-large"
                rounded="pill"
                variant="outlined"
                class="hero__cta-secondary"
                prepend-icon="mdi-play-circle-outline"
                @click="scrollTo('how-it-works')"
              >
                See how it works
              </v-btn>
            </div>

            <div class="hero__stats">
              <div v-for="stat in heroStats" :key="stat.label" class="hero__stat">
                <div class="hero__stat-value">{{ stat.value }}</div>
                <div class="hero__stat-label">{{ stat.label }}</div>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-container>

      <div class="hero__scroll-hint" @click="scrollTo('features')">
        <v-icon icon="mdi-chevron-down" size="28" />
      </div>
    </section>

    <!-- Features -->
    <section id="features" class="section section--features">
      <v-container>
        <div class="section__header reveal" :class="{ 'reveal--visible': revealed.features }">
          <p class="section__eyebrow">Features</p>
          <h2 class="section__title">Everything you need to move fast</h2>
          <p class="section__desc">
            Hover over each card to explore — every feature is designed for speed and clarity.
          </p>
        </div>

        <v-row>
          <v-col
            v-for="(feature, i) in features"
            :key="feature.title"
            cols="12"
            sm="6"
            lg="4"
          >
            <div
              class="feature-card reveal"
              :class="{ 'reveal--visible': revealed.features }"
              :style="{ transitionDelay: `${i * 80}ms` }"
              @mousemove="onCardTilt($event, i)"
              @mouseleave="resetCardTilt(i)"
            >
              <div
                class="feature-card__inner"
                :style="cardTransforms[i]"
              >
                <div class="feature-card__icon" :style="{ background: feature.gradient }">
                  <v-icon :icon="feature.icon" size="28" color="white" />
                </div>
                <h3 class="feature-card__title">{{ feature.title }}</h3>
                <p class="feature-card__desc">{{ feature.description }}</p>
                <v-chip size="small" variant="tonal" color="primary" class="mt-4">
                  {{ feature.tag }}
                </v-chip>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- Stats -->
    <section class="section section--stats">
      <v-container>
        <v-row>
          <v-col
            v-for="(stat, i) in stats"
            :key="stat.label"
            cols="6"
            md="3"
            class="text-center"
          >
            <div
              class="stat-block reveal"
              :class="{ 'reveal--visible': revealed.stats }"
              :style="{ transitionDelay: `${i * 100}ms` }"
            >
              <div class="stat-block__value">
                {{ animatedStats[i].prefix }}{{ animatedStats[i].value }}{{ animatedStats[i].suffix }}
              </div>
              <div class="stat-block__label">{{ stat.label }}</div>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- How it works -->
    <section id="how-it-works" class="section section--steps">
      <v-container>
        <div class="section__header reveal" :class="{ 'reveal--visible': revealed.steps }">
          <p class="section__eyebrow">How it works</p>
          <h2 class="section__title">Three steps to launch</h2>
          <p class="section__desc">Click each step to see what happens at every stage.</p>
        </div>

        <v-row align="center">
          <v-col cols="12" md="5">
            <div class="steps-nav">
              <button
                v-for="(step, i) in steps"
                :key="step.title"
                class="steps-nav__item"
                :class="{ 'steps-nav__item--active': activeStep === i }"
                @click="activeStep = i"
              >
                <span class="steps-nav__num">{{ i + 1 }}</span>
                <span class="steps-nav__text">
                  <strong>{{ step.title }}</strong>
                  <small>{{ step.subtitle }}</small>
                </span>
              </button>
            </div>
          </v-col>
          <v-col cols="12" md="7">
            <v-card class="steps-panel" elevation="0" rounded="xl">
              <Transition name="step-fade" mode="out-in">
                <div :key="activeStep" class="steps-panel__content">
                  <div class="steps-panel__icon">
                    <v-icon :icon="steps[activeStep].icon" size="48" color="primary" />
                  </div>
                  <h3>{{ steps[activeStep].title }}</h3>
                  <p>{{ steps[activeStep].description }}</p>
                  <v-list density="compact" class="bg-transparent pa-0 mt-4">
                    <v-list-item
                      v-for="point in steps[activeStep].points"
                      :key="point"
                      prepend-icon="mdi-check-circle"
                      class="px-0"
                    >
                      {{ point }}
                    </v-list-item>
                  </v-list>
                </div>
              </Transition>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- Testimonials -->
    <section class="section section--testimonials">
      <v-container>
        <div class="section__header reveal" :class="{ 'reveal--visible': revealed.testimonials }">
          <p class="section__eyebrow">Testimonials</p>
          <h2 class="section__title">Loved by builders everywhere</h2>
        </div>

        <v-carousel
          v-model="carouselIndex"
          height="320"
          hide-delimiter-background
          show-arrows="hover"
          cycle
          interval="5000"
          class="testimonial-carousel reveal"
          :class="{ 'reveal--visible': revealed.testimonials }"
        >
          <v-carousel-item v-for="t in testimonials" :key="t.name">
            <v-card class="testimonial-card mx-auto" max-width="640" elevation="0" rounded="xl">
              <v-card-text class="text-center pa-8">
                <div class="testimonial-card__stars mb-4">
                  <v-icon v-for="n in 5" :key="n" icon="mdi-star" color="warning" size="20" />
                </div>
                <p class="testimonial-card__quote">"{{ t.quote }}"</p>
                <div class="testimonial-card__author">
                  <v-avatar color="primary" size="44" class="me-3">
                    <span class="text-white font-weight-bold">{{ t.initials }}</span>
                  </v-avatar>
                  <div class="text-start">
                    <strong>{{ t.name }}</strong>
                    <div class="text-medium-emphasis text-caption">{{ t.role }}</div>
                  </div>
                </div>
              </v-card-text>
            </v-card>
          </v-carousel-item>
        </v-carousel>
      </v-container>
    </section>

    <!-- CTA -->
    <section id="cta" class="section section--cta">
      <v-container>
        <v-card class="cta-card" rounded="xl" elevation="0">
          <v-card-text class="text-center pa-10 pa-md-14">
            <h2 class="cta-card__title">Ready to build something great?</h2>
            <p class="cta-card__desc mb-8">
              Join thousands of teams already using MTech. No credit card required.
            </p>
            <div class="d-flex flex-wrap justify-center ga-4">
              <v-btn
                size="x-large"
                rounded="pill"
                color="white"
                class="text-primary font-weight-bold"
                @click="goTo('/login')"
              >
                Create free account
              </v-btn>
              <v-btn
                size="x-large"
                rounded="pill"
                variant="outlined"
                color="white"
                @click="goTo('/contact')"
              >
                Talk to sales
              </v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-container>
    </section>

    <!-- Footer -->
    <footer class="footer">
      <v-container>
        <v-row align="center">
          <v-col cols="12" md="6">
            <div class="footer__brand">
              <span class="footer__logo">M</span>
              MTech
            </div>
            <p class="footer__tagline">Build. Ship. Repeat.</p>
          </v-col>
          <v-col cols="12" md="6" class="text-md-end">
            <v-btn variant="text" @click="goTo('/about')">About</v-btn>
            <v-btn variant="text" @click="goTo('/services')">Services</v-btn>
            <v-btn variant="text" @click="goTo('/contact')">Contact</v-btn>
          </v-col>
        </v-row>
        <v-divider class="my-6" />
        <p class="text-center text-medium-emphasis text-caption">
          © {{ new Date().getFullYear() }} MTech. All rights reserved.
        </p>
      </v-container>
    </footer>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const phrases = ['smart workflows', 'real-time data', 'seamless UX', 'powerful APIs']
const typedText = ref('')
const phraseIndex = ref(0)
const charIndex = ref(0)
const isDeleting = ref(false)
let typeTimer = null

const mouse = reactive({ x: 0, y: 0, px: 50, py: 50 })
const cardTransforms = ref({})
const activeStep = ref(0)
const carouselIndex = ref(0)

const revealed = reactive({
  features: false,
  stats: false,
  steps: false,
  testimonials: false,
})

const heroStats = [
  { value: '10k+', label: 'Active users' },
  { value: '99.9%', label: 'Uptime' },
  { value: '4.9★', label: 'Rating' },
]

const features = [
  {
    icon: 'mdi-flash',
    title: 'Lightning Deploy',
    description: 'Push to production in seconds with automated pipelines and instant rollbacks.',
    tag: 'DevOps',
    gradient: 'linear-gradient(135deg, #6200ee, #7c4dff)',
  },
  {
    icon: 'mdi-chart-line',
    title: 'Live Analytics',
    description: 'Track every click, conversion, and cohort in a real-time dashboard.',
    tag: 'Insights',
    gradient: 'linear-gradient(135deg, #03dac6, #00bfa5)',
  },
  {
    icon: 'mdi-shield-check',
    title: 'Enterprise Security',
    description: 'SOC 2 compliant with end-to-end encryption and role-based access control.',
    tag: 'Security',
    gradient: 'linear-gradient(135deg, #4b0082, #6200ee)',
  },
  {
    icon: 'mdi-puzzle',
    title: 'Integrations',
    description: 'Connect with Slack, GitHub, Figma, and 200+ tools out of the box.',
    tag: 'Ecosystem',
    gradient: 'linear-gradient(135deg, #ff4081, #f50057)',
  },
  {
    icon: 'mdi-account-group',
    title: 'Team Collaboration',
    description: 'Comment, assign, and review in one shared workspace with live cursors.',
    tag: 'Teams',
    gradient: 'linear-gradient(135deg, #2196f3, #03dac6)',
  },
  {
    icon: 'mdi-cellphone-link',
    title: 'Mobile Ready',
    description: 'Responsive components and native-feeling interactions on every device.',
    tag: 'Mobile',
    gradient: 'linear-gradient(135deg, #fb8c00, #ff4081)',
  },
]

const stats = [
  { target: 50, suffix: 'K+', prefix: '', label: 'Projects launched' },
  { target: 120, suffix: '+', prefix: '', label: 'Countries served' },
  { target: 3, suffix: 'x', prefix: '', label: 'Faster delivery' },
  { target: 98, suffix: '%', prefix: '', label: 'Customer satisfaction' },
]

const animatedStats = ref(stats.map(() => ({ value: 0, prefix: '', suffix: '' })))

const steps = [
  {
    icon: 'mdi-account-plus',
    title: 'Sign up & connect',
    subtitle: 'Under 2 minutes',
    description: 'Create your workspace and connect your existing tools with one-click integrations.',
    points: ['Free tier with no credit card', 'Import from GitHub or Figma', 'Invite your team instantly'],
  },
  {
    icon: 'mdi-palette',
    title: 'Design & configure',
    subtitle: 'Visual builder',
    description: 'Use our drag-and-drop builder to configure workflows, dashboards, and automations.',
    points: ['Pre-built templates', 'Custom branding', 'Real-time preview'],
  },
  {
    icon: 'mdi-rocket-launch',
    title: 'Launch & scale',
    subtitle: 'Go live today',
    description: 'Deploy with confidence using built-in monitoring, alerts, and auto-scaling infrastructure.',
    points: ['One-click deploy', 'Auto-scaling', '24/7 support'],
  },
]

const testimonials = [
  {
    quote: 'MTech cut our release cycle from weeks to hours. The interactive dashboards alone saved us countless meetings.',
    name: 'Sarah Chen',
    role: 'CTO, NovaLabs',
    initials: 'SC',
  },
  {
    quote: 'The onboarding was seamless. Our entire team was productive on day one — something we never achieved with other tools.',
    name: 'Marcus Rivera',
    role: 'Product Lead, Stackflow',
    initials: 'MR',
  },
  {
    quote: 'Best developer experience I have seen. The API docs, SDK, and integrations just work.',
    name: 'Aisha Patel',
    role: 'Engineering Manager, CloudNine',
    initials: 'AP',
  },
]

function goTo(path) {
  router.push(path)
}

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

function onHeroMouseMove(e) {
  const rect = e.currentTarget.getBoundingClientRect()
  mouse.x = e.clientX - rect.left - rect.width / 2
  mouse.y = e.clientY - rect.top - rect.height / 2
  mouse.px = ((e.clientX - rect.left) / rect.width) * 100
  mouse.py = ((e.clientY - rect.top) / rect.height) * 100
}

function resetHeroMouse() {
  mouse.x = 0
  mouse.y = 0
  mouse.px = 50
  mouse.py = 50
}

function onCardTilt(e, index) {
  const card = e.currentTarget
  const rect = card.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top
  const rotateX = ((y - rect.height / 2) / rect.height) * -12
  const rotateY = ((x - rect.width / 2) / rect.width) * 12
  cardTransforms.value[index] = {
    transform: `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`,
  }
}

function resetCardTilt(index) {
  cardTransforms.value[index] = {
    transform: 'perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)',
  }
}

function typeLoop() {
  const current = phrases[phraseIndex.value]

  if (!isDeleting.value) {
    typedText.value = current.slice(0, charIndex.value + 1)
    charIndex.value++
    if (charIndex.value === current.length) {
      isDeleting.value = true
      typeTimer = setTimeout(typeLoop, 2000)
      return
    }
  } else {
    typedText.value = current.slice(0, charIndex.value - 1)
    charIndex.value--
    if (charIndex.value === 0) {
      isDeleting.value = false
      phraseIndex.value = (phraseIndex.value + 1) % phrases.length
    }
  }

  typeTimer = setTimeout(typeLoop, isDeleting.value ? 40 : 80)
}

function animateStat(index, target) {
  const duration = 1800
  const start = performance.now()
  const stat = stats[index]

  function tick(now) {
    const progress = Math.min((now - start) / duration, 1)
    const eased = 1 - Math.pow(1 - progress, 3)
    animatedStats.value[index] = {
      value: Math.round(target * eased),
      prefix: stat.prefix,
      suffix: stat.suffix,
    }
    if (progress < 1) requestAnimationFrame(tick)
  }

  requestAnimationFrame(tick)
}

let observers = []

function setupReveal() {
  const sections = [
    { id: 'features', key: 'features' },
    { id: null, key: 'stats', selector: '.section--stats' },
    { id: 'how-it-works', key: 'steps' },
    { id: null, key: 'testimonials', selector: '.section--testimonials' },
  ]

  sections.forEach(({ id, key, selector }) => {
    const el = id ? document.getElementById(id) : document.querySelector(selector)
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          revealed[key] = true
          if (key === 'stats' && animatedStats.value[0].value === 0) {
            stats.forEach((s, i) => animateStat(i, s.target))
          }
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )
    observer.observe(el)
    observers.push(observer)
  })
}

onMounted(() => {
  typeLoop()
  setupReveal()
})

onUnmounted(() => {
  clearTimeout(typeTimer)
  observers.forEach(o => o.disconnect())
})
</script>

<style scoped>
.landing {
  overflow-x: hidden;
}

/* Hero */
.hero {
  position: relative;
  min-height: calc(100vh - 72px);
  display: flex;
  align-items: center;
  overflow: hidden;
  background: #0a0118;
  color: white;
}

.hero__bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.hero__orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.55;
  transition: transform 0.15s ease-out;
}

.hero__orb--1 {
  width: 500px;
  height: 500px;
  background: #6200ee;
  top: -10%;
  right: -5%;
}

.hero__orb--2 {
  width: 400px;
  height: 400px;
  background: #03dac6;
  bottom: -5%;
  left: -5%;
  opacity: 0.35;
}

.hero__spotlight {
  position: absolute;
  width: 600px;
  height: 600px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(98, 0, 238, 0.15) 0%, transparent 70%);
  transform: translate(-50%, -50%);
  transition: left 0.2s ease-out, top 0.2s ease-out;
}

.hero__grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
  background-size: 60px 60px;
  mask-image: radial-gradient(ellipse at center, black 30%, transparent 80%);
}

.hero__content {
  position: relative;
  z-index: 1;
  padding-top: 48px;
  padding-bottom: 80px;
}

.hero__badge {
  font-weight: 600;
  letter-spacing: 0.02em;
}

.hero__title {
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -0.03em;
  margin-bottom: 24px;
}

.hero__title-accent {
  background: linear-gradient(135deg, #03dac6, #7c4dff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero__cursor {
  animation: blink 1s step-end infinite;
  color: #03dac6;
  font-weight: 300;
}

@keyframes blink {
  50% { opacity: 0; }
}

.hero__subtitle {
  font-size: 1.15rem;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.65);
  max-width: 560px;
  margin: 0 auto 40px;
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: center;
  margin-bottom: 56px;
}

.hero__cta {
  font-weight: 700;
  letter-spacing: 0.01em;
  box-shadow: 0 8px 32px rgba(98, 0, 238, 0.45);
}

.hero__cta-secondary {
  border-color: rgba(255, 255, 255, 0.3) !important;
  color: white !important;
}

.hero__stats {
  display: flex;
  gap: 48px;
  justify-content: center;
  flex-wrap: wrap;
}

.hero__stat-value {
  font-size: 1.75rem;
  font-weight: 800;
  letter-spacing: -0.02em;
}

.hero__stat-label {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.5);
  margin-top: 4px;
}

.hero__scroll-hint {
  position: absolute;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  cursor: pointer;
  color: rgba(255, 255, 255, 0.4);
  animation: bounce 2s ease-in-out infinite;
  z-index: 1;
}

@keyframes bounce {
  0%, 100% { transform: translateX(-50%) translateY(0); }
  50% { transform: translateX(-50%) translateY(8px); }
}

/* Sections */
.section {
  padding: 96px 0;
}

.section__header {
  text-align: center;
  max-width: 600px;
  margin: 0 auto 56px;
}

.section__eyebrow {
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-size: 0.75rem;
  font-weight: 700;
  color: #6200ee;
  margin-bottom: 12px;
}

.section__title {
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  font-weight: 800;
  letter-spacing: -0.02em;
  margin-bottom: 16px;
}

.section__desc {
  color: rgba(0, 0, 0, 0.55);
  line-height: 1.7;
}

.section--features {
  background: #fafafa;
}

.section--stats {
  background: white;
  padding: 64px 0;
}

.section--steps {
  background: #fafafa;
}

.section--testimonials {
  background: white;
}

/* Feature cards */
.feature-card {
  height: 100%;
  perspective: 800px;
}

.feature-card__inner {
  height: 100%;
  padding: 32px;
  background: white;
  border-radius: 20px;
  border: 1px solid rgba(98, 0, 238, 0.08);
  transition: transform 0.15s ease-out, box-shadow 0.3s ease;
  box-shadow: 0 4px 24px rgba(98, 0, 238, 0.06);
}

.feature-card:hover .feature-card__inner {
  box-shadow: 0 16px 48px rgba(98, 0, 238, 0.14);
}

.feature-card__icon {
  width: 56px;
  height: 56px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}

.feature-card__title {
  font-size: 1.15rem;
  font-weight: 700;
  margin-bottom: 10px;
}

.feature-card__desc {
  color: rgba(0, 0, 0, 0.55);
  line-height: 1.65;
  font-size: 0.95rem;
}

/* Stats */
.stat-block__value {
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 800;
  background: linear-gradient(135deg, #6200ee, #03dac6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.02em;
}

.stat-block__label {
  color: rgba(0, 0, 0, 0.5);
  font-size: 0.9rem;
  margin-top: 8px;
}

/* Steps */
.steps-nav {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.steps-nav__item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px 24px;
  border: 2px solid transparent;
  border-radius: 16px;
  background: white;
  cursor: pointer;
  text-align: left;
  transition: all 0.25s ease;
  width: 100%;
}

.steps-nav__item:hover {
  border-color: rgba(98, 0, 238, 0.15);
}

.steps-nav__item--active {
  border-color: #6200ee;
  background: rgba(98, 0, 238, 0.04);
  box-shadow: 0 4px 20px rgba(98, 0, 238, 0.1);
}

.steps-nav__num {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #6200ee, #7c4dff);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  flex-shrink: 0;
}

.steps-nav__text {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.steps-nav__text small {
  color: rgba(0, 0, 0, 0.45);
  font-size: 0.8rem;
}

.steps-panel {
  background: white;
  border: 1px solid rgba(98, 0, 238, 0.08);
  min-height: 320px;
  padding: 40px;
}

.steps-panel__icon {
  width: 80px;
  height: 80px;
  border-radius: 20px;
  background: rgba(98, 0, 238, 0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
}

.steps-panel__content h3 {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 12px;
}

.steps-panel__content p {
  color: rgba(0, 0, 0, 0.55);
  line-height: 1.7;
}

.step-fade-enter-active,
.step-fade-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.step-fade-enter-from {
  opacity: 0;
  transform: translateY(12px);
}

.step-fade-leave-to {
  opacity: 0;
  transform: translateY(-12px);
}

/* Testimonials */
.testimonial-carousel {
  max-width: 720px;
  margin: 0 auto;
}

.testimonial-card {
  background: #fafafa;
  border: 1px solid rgba(98, 0, 238, 0.06);
}

.testimonial-card__quote {
  font-size: 1.1rem;
  line-height: 1.75;
  color: rgba(0, 0, 0, 0.7);
  font-style: italic;
  margin-bottom: 24px;
}

.testimonial-card__author {
  display: flex;
  align-items: center;
  justify-content: center;
}

/* CTA */
.section--cta {
  padding-bottom: 96px;
}

.cta-card {
  background: linear-gradient(135deg, #4b0082 0%, #6200ee 50%, #7c4dff 100%);
  color: white;
}

.cta-card__title {
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  font-weight: 800;
  letter-spacing: -0.02em;
}

.cta-card__desc {
  color: rgba(255, 255, 255, 0.75);
  font-size: 1.1rem;
  max-width: 480px;
  margin-left: auto;
  margin-right: auto;
}

/* Footer */
.footer {
  background: #0a0118;
  color: white;
  padding: 48px 0 32px;
}

.footer__brand {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 700;
  font-size: 1.25rem;
}

.footer__logo {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: linear-gradient(135deg, #6200ee, #03dac6);
  font-size: 0.85rem;
  font-weight: 800;
}

.footer__tagline {
  color: rgba(255, 255, 255, 0.45);
  margin-top: 8px;
  font-size: 0.9rem;
}

/* Scroll reveal */
.reveal {
  opacity: 0;
  transform: translateY(32px);
  transition: opacity 0.7s ease, transform 0.7s ease;
}

.reveal--visible {
  opacity: 1;
  transform: translateY(0);
}
</style>

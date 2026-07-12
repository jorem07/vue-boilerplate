<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import { authenticateMockUser } from '~/data/mockUsers'
import { useRouter } from 'vue-router'

definePageMeta({ layout: 'empty' })

const router = useRouter()

const form = ref()
const email = ref('')
const password = ref('')
const rememberMe = ref(false)
const showPassword = ref(false)

const snackbar = ref(false)
const snackbarMessage = ref('')
const snackbarColor = ref('error')
const errors = ref({})
const loading = ref(false)

const mouse = reactive({ x: 0, y: 0, px: 50, py: 50 })
const activeHighlight = ref(0)
let highlightTimer = null

const highlights = [
  {
    icon: 'mdi-shield-check',
    title: 'Enterprise-grade security',
    text: 'SOC 2 compliant with end-to-end encryption on every request.',
  },
  {
    icon: 'mdi-lightning-bolt',
    title: 'Instant access',
    text: 'Sign in once and pick up right where you left off — on any device.',
  },
  {
    icon: 'mdi-account-group',
    title: 'Built for teams',
    text: 'Collaborate in real time with shared workspaces and live cursors.',
  },
]

const isRequired = (label, modelRef) => v => !!v || !!modelRef.value || `${label} is required`

const emailRule = v => {
  const val = v || email.value
  if (!val) return true
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) || 'Enter a valid email address'
}

function goTo(path) {
  router.push(path)
}

function onPanelMouseMove(e) {
  const rect = e.currentTarget.getBoundingClientRect()
  mouse.x = e.clientX - rect.left - rect.width / 2
  mouse.y = e.clientY - rect.top - rect.height / 2
  mouse.px = ((e.clientX - rect.left) / rect.width) * 100
  mouse.py = ((e.clientY - rect.top) / rect.height) * 100
}

function resetPanelMouse() {
  mouse.x = 0
  mouse.y = 0
  mouse.px = 50
  mouse.py = 50
}

function showNotice(message, color = 'info') {
  snackbarMessage.value = message
  snackbarColor.value = color
  snackbar.value = true
}

async function submit() {
  errors.value = {}
  loading.value = true

  try {
    // Temporary: authenticate against local mock users instead of API
    await new Promise(resolve => setTimeout(resolve, 600))

    const data = authenticateMockUser(email.value, password.value)

    if (!data) {
      snackbarMessage.value = 'Invalid email or password'
      snackbarColor.value = 'error'
      snackbar.value = true
      return
    }

    localStorage.setItem('api_token', data.token)
    localStorage.setItem('user', JSON.stringify(data.user))

    if (rememberMe.value) {
      localStorage.setItem('remember_email', email.value)
    } else {
      localStorage.removeItem('remember_email')
    }

    snackbarMessage.value = `Welcome back, ${data.user.first_name}!`
    snackbarColor.value = 'success'
    snackbar.value = true

    goTo('/admin/dashboard')
  } catch (err) {
    snackbarMessage.value = err?.message || 'Login failed'
    snackbarColor.value = 'error'
    snackbar.value = true
  } finally {
    loading.value = false
  }
}

async function validate() {
  const valid = await form.value.validate()
  if (valid.valid) submit()
}

function onSocialLogin(provider) {
  showNotice(`${provider} sign-in coming soon`)
}

onMounted(() => {
  const saved = localStorage.getItem('remember_email')
  if (saved) {
    email.value = saved
    rememberMe.value = true
  }

  highlightTimer = setInterval(() => {
    activeHighlight.value = (activeHighlight.value + 1) % highlights.length
  }, 4000)
})

onUnmounted(() => {
  clearInterval(highlightTimer)
})
</script>

<template>
  <v-main class="login fill-height">
    <v-container fluid class="fill-height pa-0">
      <v-row class="fill-height" no-gutters>
        <!-- Left panel -->
        <v-col cols="12" lg="7" class="pa-0 d-none d-lg-flex">
          <div
            class="login-panel fill-height"
            @mousemove="onPanelMouseMove"
            @mouseleave="resetPanelMouse"
          >
            <div class="login-panel__bg">
              <div
                class="login-panel__orb login-panel__orb--1"
                :style="{ transform: `translate(${mouse.x * 0.03}px, ${mouse.y * 0.03}px)` }"
              />
              <div
                class="login-panel__orb login-panel__orb--2"
                :style="{ transform: `translate(${mouse.x * -0.02}px, ${mouse.y * -0.04}px)` }"
              />
              <div
                class="login-panel__spotlight"
                :style="{ left: `${mouse.px}%`, top: `${mouse.py}%` }"
              />
              <div class="login-panel__grid" />
            </div>

            <div class="login-panel__content">
              <button class="login-panel__back" @click="goTo('/home')">
                <v-icon icon="mdi-arrow-left" size="18" />
                Back to home
              </button>

              <div class="login-panel__brand">
                <span class="login-panel__logo">M</span>
                MTech
              </div>

              <h1 class="login-panel__title">
                Welcome back.<br />
                <span class="login-panel__title-accent">Let's build.</span>
              </h1>

              <p class="login-panel__desc">
                Sign in to access your workspace, manage projects, and collaborate with your team.
              </p>

              <div class="login-panel__highlights">
                <Transition name="highlight-fade" mode="out-in">
                  <div :key="activeHighlight" class="login-panel__highlight">
                    <div class="login-panel__highlight-icon">
                      <v-icon :icon="highlights[activeHighlight].icon" size="24" color="white" />
                    </div>
                    <div>
                      <strong>{{ highlights[activeHighlight].title }}</strong>
                      <p>{{ highlights[activeHighlight].text }}</p>
                    </div>
                  </div>
                </Transition>

                <div class="login-panel__dots">
                  <button
                    v-for="(_, i) in highlights"
                    :key="i"
                    class="login-panel__dot"
                    :class="{ 'login-panel__dot--active': activeHighlight === i }"
                    @click="activeHighlight = i"
                  />
                </div>
              </div>

              <div class="login-panel__stats">
                <div class="login-panel__stat">
                  <span>10k+</span>
                  <small>Active users</small>
                </div>
                <div class="login-panel__stat">
                  <span>99.9%</span>
                  <small>Uptime</small>
                </div>
                <div class="login-panel__stat">
                  <span>4.9★</span>
                  <small>Rating</small>
                </div>
              </div>
            </div>
          </div>
        </v-col>

        <!-- Right panel -->
        <v-col cols="12" lg="5" class="login-form-col fill-height">
          <div class="login-form-wrapper">
            <v-btn
              variant="text"
              color="primary"
              class="login-form__back-mobile d-lg-none"
              prepend-icon="mdi-arrow-left"
              :disabled="loading"
              @click="goTo('/home')"
            >
              Back to home
            </v-btn>

            <div class="login-form__header">
              <div class="login-form__logo-mobile d-lg-none">
                <span>M</span>
              </div>
              <h2>Sign in</h2>
              <p>Enter your credentials to access your account</p>
            </div>

            <v-card class="login-form__card" elevation="0" rounded="xl">
              <v-alert
                type="info"
                variant="tonal"
                density="compact"
                class="login-form__demo mx-6 mt-6 mb-0"
                icon="mdi-information-outline"
              >
                <strong>Demo accounts</strong>
                <div class="text-caption mt-1">
                  admin@mtech.com / admin123<br />
                  demo@mtech.com / demo123<br />
                  jane@mtech.com / password
                </div>
              </v-alert>

              <v-card-text class="pa-6 pa-sm-8">
                <v-form ref="form" @submit.prevent="validate">
                  <v-text-field
                    v-model="email"
                    label="Email address"
                    type="email"
                    autocomplete="email"
                    prepend-inner-icon="mdi-email-outline"
                    variant="outlined"
                    rounded="lg"
                    class="mb-2"
                    :rules="[isRequired('Email', email), emailRule]"
                    :error-messages="errors.email"
                    :disabled="loading"
                    @input="errors.email = []"
                  />

                  <v-text-field
                    v-model="password"
                    label="Password"
                    :type="showPassword ? 'text' : 'password'"
                    autocomplete="current-password"
                    prepend-inner-icon="mdi-lock-outline"
                    :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                    variant="outlined"
                    rounded="lg"
                    class="mb-1"
                    :rules="[isRequired('Password', password)]"
                    :error-messages="errors.password"
                    :disabled="loading"
                    @click:append-inner="showPassword = !showPassword"
                    @input="errors.password = []"
                  />

                  <div class="login-form__options">
                    <v-checkbox
                      v-model="rememberMe"
                      label="Remember me"
                      density="compact"
                      hide-details
                      color="primary"
                      :disabled="loading"
                    />
                    <button
                      type="button"
                      class="login-form__forgot"
                      :disabled="loading"
                      @click="showNotice('Password reset coming soon')"
                    >
                      Forgot password?
                    </button>
                  </div>

                  <v-btn
                    type="submit"
                    block
                    size="large"
                    rounded="pill"
                    color="primary"
                    class="login-form__submit mt-4 mb-6"
                    :loading="loading"
                    :disabled="loading"
                  >
                    Sign in
                  </v-btn>

                  <div class="login-form__divider">
                    <span>or continue with</span>
                  </div>

                  <div class="login-form__social">
                    <v-btn
                      variant="outlined"
                      rounded="lg"
                      class="login-form__social-btn"
                      :disabled="loading"
                      @click="onSocialLogin('Google')"
                    >
                      <v-icon icon="mdi-google" start />
                      Google
                    </v-btn>
                    <v-btn
                      variant="outlined"
                      rounded="lg"
                      class="login-form__social-btn"
                      :disabled="loading"
                      @click="onSocialLogin('Facebook')"
                    >
                      <v-icon icon="mdi-facebook" start />
                      Facebook
                    </v-btn>
                  </div>
                </v-form>
              </v-card-text>
            </v-card>

            <p class="login-form__signup">
              Don't have an account?
              <button type="button" :disabled="loading" @click="showNotice('Sign up coming soon')">
                Create one free
              </button>
            </p>
          </div>
        </v-col>
      </v-row>
    </v-container>

    <v-snackbar
      v-model="snackbar"
      :color="snackbarColor"
      timeout="3000"
      location="top right"
      rounded="lg"
    >
      {{ snackbarMessage }}
    </v-snackbar>
  </v-main>
</template>

<style scoped>
.login {
  background: #fafafa;
}

/* Left panel */
.login-panel {
  position: relative;
  width: 100%;
  overflow: hidden;
  background: #0a0118;
  color: white;
}

.login-panel__bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.login-panel__orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.5;
  transition: transform 0.15s ease-out;
}

.login-panel__orb--1 {
  width: 420px;
  height: 420px;
  background: #6200ee;
  top: -8%;
  right: -5%;
}

.login-panel__orb--2 {
  width: 320px;
  height: 320px;
  background: #03dac6;
  bottom: 10%;
  left: -5%;
  opacity: 0.3;
}

.login-panel__spotlight {
  position: absolute;
  width: 500px;
  height: 500px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(98, 0, 238, 0.12) 0%, transparent 70%);
  transform: translate(-50%, -50%);
  transition: left 0.2s ease-out, top 0.2s ease-out;
}

.login-panel__grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
  background-size: 60px 60px;
  mask-image: radial-gradient(ellipse at center, black 30%, transparent 80%);
}

.login-panel__content {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  padding: 48px 64px;
  max-width: 560px;
}

.login-panel__back {
  position: absolute;
  top: 32px;
  left: 48px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: rgba(255, 255, 255, 0.85);
  padding: 10px 18px;
  border-radius: 999px;
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s ease, border-color 0.2s ease;
}

.login-panel__back:hover {
  background: rgba(255, 255, 255, 0.14);
  border-color: rgba(255, 255, 255, 0.2);
}

.login-panel__brand {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 700;
  font-size: 1.25rem;
  margin-bottom: 40px;
}

.login-panel__logo {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: linear-gradient(135deg, #6200ee, #03dac6);
  font-size: 1rem;
  font-weight: 800;
}

.login-panel__title {
  font-size: clamp(2rem, 4vw, 2.75rem);
  font-weight: 800;
  line-height: 1.15;
  letter-spacing: -0.03em;
  margin-bottom: 16px;
}

.login-panel__title-accent {
  background: linear-gradient(135deg, #03dac6, #7c4dff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.login-panel__desc {
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.7;
  font-size: 1.05rem;
  margin-bottom: 40px;
}

.login-panel__highlights {
  margin-bottom: 48px;
}

.login-panel__highlight {
  display: flex;
  gap: 16px;
  align-items: flex-start;
  padding: 24px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  backdrop-filter: blur(8px);
}

.login-panel__highlight-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: linear-gradient(135deg, #6200ee, #7c4dff);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.login-panel__highlight strong {
  display: block;
  font-size: 1rem;
  margin-bottom: 6px;
}

.login-panel__highlight p {
  color: rgba(255, 255, 255, 0.55);
  font-size: 0.9rem;
  line-height: 1.6;
  margin: 0;
}

.login-panel__dots {
  display: flex;
  gap: 8px;
  margin-top: 16px;
}

.login-panel__dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.25);
  cursor: pointer;
  padding: 0;
  transition: background 0.2s ease, transform 0.2s ease;
}

.login-panel__dot--active {
  background: #03dac6;
  transform: scale(1.25);
}

.login-panel__stats {
  display: flex;
  gap: 40px;
}

.login-panel__stat span {
  display: block;
  font-size: 1.5rem;
  font-weight: 800;
  letter-spacing: -0.02em;
}

.login-panel__stat small {
  color: rgba(255, 255, 255, 0.45);
  font-size: 0.8rem;
}

.highlight-fade-enter-active,
.highlight-fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.highlight-fade-enter-from {
  opacity: 0;
  transform: translateY(8px);
}

.highlight-fade-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

/* Right panel */
.login-form-col {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fafafa;
  padding: 24px;
}

.login-form-wrapper {
  width: 100%;
  max-width: 440px;
}

.login-form__back-mobile {
  margin-bottom: 8px;
}

.login-form__header {
  text-align: center;
  margin-bottom: 32px;
}

.login-form__logo-mobile span {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: linear-gradient(135deg, #6200ee, #03dac6);
  color: white;
  font-weight: 800;
  font-size: 1.1rem;
  margin-bottom: 16px;
}

.login-form__header h2 {
  font-size: 1.75rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  margin-bottom: 8px;
}

.login-form__header p {
  color: rgba(0, 0, 0, 0.5);
  font-size: 0.95rem;
}

.login-form__card {
  border: 1px solid rgba(98, 0, 238, 0.08);
  box-shadow: 0 8px 40px rgba(98, 0, 238, 0.08);
  background: white;
}

.login-form__options {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 4px;
}

.login-form__forgot {
  background: none;
  border: none;
  color: #6200ee;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  padding: 4px 0;
}

.login-form__forgot:hover:not(:disabled) {
  text-decoration: underline;
}

.login-form__forgot:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.login-form__submit {
  font-weight: 700;
  letter-spacing: 0.01em;
  box-shadow: 0 6px 24px rgba(98, 0, 238, 0.3);
}

.login-form__divider {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
  color: rgba(0, 0, 0, 0.4);
  font-size: 0.85rem;
}

.login-form__divider::before,
.login-form__divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background: rgba(0, 0, 0, 0.08);
}

.login-form__social {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.login-form__social-btn {
  text-transform: none;
  font-weight: 600;
  letter-spacing: 0;
  border-color: rgba(0, 0, 0, 0.12) !important;
}

.login-form__signup {
  text-align: center;
  margin-top: 28px;
  color: rgba(0, 0, 0, 0.55);
  font-size: 0.9rem;
}

.login-form__signup button {
  background: none;
  border: none;
  color: #6200ee;
  font-weight: 700;
  cursor: pointer;
  padding: 0;
  margin-left: 4px;
}

.login-form__signup button:hover:not(:disabled) {
  text-decoration: underline;
}

.login-form__signup button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>

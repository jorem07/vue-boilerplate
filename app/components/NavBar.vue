<template>
  <v-app-bar
    :elevation="scrolled ? 4 : 0"
    :class="['navbar', { 'navbar--scrolled': scrolled }]"
    height="72"
  >
    <v-toolbar-title class="navbar__brand" @click="goTo('/home')">
      <span class="navbar__logo">M</span>
      MTech
    </v-toolbar-title>

    <v-spacer />

    <div class="d-none d-md-flex align-center ga-1">
      <v-btn
        v-for="link in navLinks"
        :key="link.label"
        variant="text"
        class="navbar__link"
        @click="handleNav(link)"
      >
        {{ link.label }}
      </v-btn>
      <v-btn
        variant="outlined"
        rounded="pill"
        class="ms-3 navbar__login"
        @click="goTo('/login')"
      >
        Login
      </v-btn>
      <v-btn
        rounded="pill"
        color="primary"
        class="ms-2"
        @click="scrollToSection('cta')"
      >
        Get Started
      </v-btn>
    </div>

    <v-app-bar-nav-icon class="d-md-none" @click="drawer = true" />
  </v-app-bar>

  <v-navigation-drawer v-model="drawer" location="right" temporary width="280">
    <v-list nav>
      <v-list-item
        v-for="link in navLinks"
        :key="link.label"
        :title="link.label"
        @click="handleNav(link); drawer = false"
      />
      <v-divider class="my-3" />
      <v-list-item title="Login" @click="goTo('/login'); drawer = false" />
      <v-list-item title="Get Started" @click="scrollToSection('cta'); drawer = false" />
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const scrolled = ref(false)
const drawer = ref(false)

const navLinks = [
  { label: 'Features', section: 'features' },
  { label: 'How it works', section: 'how-it-works' },
  { label: 'About', path: '/about' },
  { label: 'Services', path: '/services' },
  { label: 'Contact', path: '/contact' },
]

function goTo(path) {
  router.push(path)
}

function scrollToSection(id) {
  if (route.path !== '/home') {
    router.push('/home').then(() => {
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 100)
    })
    return
  }
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

function handleNav(link) {
  if (link.section) {
    scrollToSection(link.section)
  } else if (link.path) {
    goTo(link.path)
  }
}

function onScroll() {
  scrolled.value = window.scrollY > 24
}

onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<style scoped>
.navbar {
  background: rgba(255, 255, 255, 0.72) !important;
  backdrop-filter: blur(16px);
  border-bottom: 1px solid transparent;
  transition: background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
}

.navbar--scrolled {
  background: rgba(255, 255, 255, 0.92) !important;
  border-bottom-color: rgba(98, 0, 238, 0.08);
}

.navbar__brand {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 700;
  font-size: 1.25rem;
  letter-spacing: -0.02em;
  cursor: pointer;
  user-select: none;
}

.navbar__logo {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: linear-gradient(135deg, #6200ee, #03dac6);
  color: white;
  font-size: 1rem;
  font-weight: 800;
}

.navbar__link {
  font-weight: 500;
  letter-spacing: 0.01em;
}

.navbar__login {
  border-color: rgba(98, 0, 238, 0.35) !important;
}
</style>

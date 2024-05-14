/* eslint-disable import/order */
import '@/@iconify/icons-bundle'
import App from '@/App.vue'
import vuetify from '@/plugins/vuetify'
import { loadFonts } from '@/plugins/webfontloader'
import router from '@/router'
import '@core/scss/template/index.scss'
import '@layouts/styles/index.scss'
import '@styles/styles.scss'
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { createPinia } from 'pinia'
import { createApp } from 'vue'

loadFonts()

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAq0eziYd1X47X7yVApoVUUqLjILU4AnS4",
    authDomain: "fir-auth-cd162.firebaseapp.com",
    projectId: "fir-auth-cd162",
    storageBucket: "fir-auth-cd162.appspot.com",
    messagingSenderId: "788019079215",
    appId: "1:788019079215:web:ee0b5aeb3b92df199e7eda",
    measurementId: "G-M4R3VPN4GC"
  };

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);

// Create vue app
const app = createApp(App)

// Use plugins
app.use(vuetify)
app.use(createPinia())
app.use(router)

// Make Firebase services accessible to components
app.config.globalProperties.$auth = auth
app.config.globalProperties.$firestore = firestore

// Mount vue app
app.mount('#app')

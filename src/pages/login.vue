<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { message } from "ant-design-vue";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {auth,firestore} from "../firebase";

const username = ref("");
const password = ref("");
const router = useRouter();

// Your Firebase config
// const firebaseConfig = {
//   apiKey: "AIzaSyAq0eziYd1X47X7yVApoVUUqLjILU4AnS4",
//   authDomain: "fir-auth-cd162.firebaseapp.com",
//   projectId: "fir-auth-cd162",
//   storageBucket: "fir-auth-cd162.appspot.com",
//   messagingSenderId: "788019079215",
//   appId: "1:788019079215:web:ee0b5aeb3b92df199e7eda",
//   measurementId: "G-M4R3VPN4GC"
// };

// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);

const login = async () => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      username.value,
      password.value
    );

    // Clear the input fields after successful login
    username.value = "";
    password.value = "";

    // Optionally, you can display a success message
    message.success("Login successful!");

    // Redirect to dashboard or desired route
    router.push("/dashboard");
  } catch (error) {
    // Handle login errors
    message.error(error.message);
  }
};
</script>

<template>
  <div class="container">
    <div class="left">
      <!-- Login Form -->
      <form @submit.prevent="login" class="login-form">
        <a-alert
          message="Error"
          v-if="errorMessage"
          :description="errorMessage"
          type="error"
          show-icon
        />
        <h2>Login</h2>
        <div class="form-group">
          <label for="username">Username:</label>
          <input type="text" id="username" v-model="username" required />
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="password" required />
        </div>
        <button type="submit">Login</button>
        <router-link to="/register"
          >Don't have an account? Register here</router-link
        >
      </form>
      <!-- Router Link to Register Page -->
    </div>
    <div class="right">
      <!-- Photo -->
      <img
        src="https://i.pinimg.com/originals/02/fc/da/02fcda11cbfb2a84537f9d059b4c81b2.gif"
        alt="Photo"
      />
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.left {
  flex: 1;
  padding: 20px;
}

.right {
  flex: 1;
  padding: 20px;
  margin-right: -100px;
}

.login-form {
  max-width: 300px;
  margin: 0 auto;
}

h2 {
  font-size: 24px;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 20px;
}

label {
  font-size: 16px;
  font-weight: bold;
}

input[type="text"],
input[type="password"] {
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 16px;
}

button {
  display: block;
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #0056b3;
}

/* Adjustments for mobile responsiveness */
@media (max-width: 768px) {
  .container {
    flex-direction: column;
    height: auto;
  }
  .left,
  .right {
    width: 100%;
    margin-right: 0;
    padding: 0;
    text-align: center;
  }
}
</style>

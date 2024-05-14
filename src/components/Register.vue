<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { message } from "ant-design-vue";
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, getDoc } from 'firebase/firestore';
import { setDoc, doc } from "firebase/firestore";
import {auth,firestore} from "../firebase";

const username = ref("");
const password = ref("");
const name = ref(""); 
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

const register = async () => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      username.value,
      password.value
    );

    await setDoc(doc(firestore, "users", userCredential.user.uid), {
      name: name.value,
      email: userCredential.user.email,
    });

    // Clear the input fields after successful registration
    username.value = "";
    password.value = "";

    // Optionally, you can display a success message
    message.success("Registration successful! Please login.");

    // Redirect to login page
    router.push("/");
  } catch (error) {
    // Handle registration errors
    message.error(error.message);
  }
};
</script>



<template>
  <div class="container">
    <div class="left">
      <!-- Registration Form -->
      <form @submit.prevent="register" class="register-form">
        <h2>Registration</h2>
        <div class="form-group">
          <label for="name">Name:</label>
          <input type="text" id="name" v-model="name" required>
        </div>
        <div class="form-group">
          <label for="username">Mail:</label>
          <input type="text" id="username" v-model="username" required>
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="password" required>
        </div>
        <button type="submit">Register</button>
      <router-link to="/">Already have an account? Login here</router-link>
      </form>
      <!-- Router Link to Login Page -->
    </div>
    <div class="right">
      <!-- Photo -->
      <img src="https://www.3lancing.co.uk/images/slider1.gif" alt="Photo" />
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

.register-form {
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
  .left, .right {
    width: 100%;
    margin-right: 0;
    padding: 0;
    text-align: center;
  }
}
</style>

<script setup lang="ts">
import { useTheme } from 'vuetify'
import { defineComponent, ref, onMounted } from 'vue';
import illustrationJohnDark from '@images/cards/illustration-john-dark.png'
import illustrationJohnLight from '@images/cards/illustration-john-light.png'
import { useRouter } from 'vue-router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

const { global } = useTheme()
const illustrationJohn = computed(() => global.name.value === 'dark' ? illustrationJohnDark : illustrationJohnLight)
    const router = useRouter();
    const userName = ref<string | null>(null);
    const auth = getAuth();
    const firestore = getFirestore();

    onMounted(async () => {
      // Check if user is authenticated
      onAuthStateChanged(auth, async (currentUser) => {
        if (currentUser) {
          // Fetch user data from Firestore
          const userDoc = await getDoc(doc(firestore, 'users', currentUser.uid));
          if (userDoc.exists()) {
            // Set user's name
            userName.value = userDoc.data().name;
          }
        } else {
          // Redirect to login page if user is not authenticated
          router.push('/login');
        }
      });
    });
</script>

<template>
  <VCard class="text-center text-sm-start">
    <VRow no-gutters>
      <VCol
        cols="12"
        sm="8"
        order="2"
        order-sm="1"
      >
        <VCardItem>
          <VCardTitle class="text-md-h5 text-primary">
            Congratulations {{ userName }}! 🎉
          </VCardTitle>
        </VCardItem>

        <VCardText>
          <span>
            You have done 72% 🤩 more sales today.
            <br>
            Check your new raising badge in your profile.
          </span>
          <br>
          <VBtn
            variant="tonal"
            class="mt-4"
            size="small"
          >
            View Badges
          </VBtn>
        </VCardText>
      </VCol>

      <VCol
        cols="12"
        sm="4"
        order="1"
        order-sm="2"
        class="text-center"
      >
        <img
          :src="illustrationJohn"
          :height="$vuetify.display.xs ? '150' : '175'"
          :class="$vuetify.display.xs ? 'mt-6 mb-n2' : 'position-absolute'"
          class="john-illustration flip-in-rtl"
        >
      </VCol>
    </VRow>
  </VCard>
</template>

<style lang="scss" scoped>
.john-illustration {
  inset-block-end: -0.0625rem;
  inset-inline-end: 3rem;
}
</style>

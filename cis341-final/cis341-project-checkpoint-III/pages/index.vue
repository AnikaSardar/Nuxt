<template>
    <div class="homepage-container">
      <div class="header">
        <h1 class="title">Welcome to Event Planner</h1>
        <p class="subtitle">Your one-stop solution for managing events effortlessly.</p>
      </div>
      <!-- Dynamic greeting if the user is authenticated -->
      <p v-if="isAuthenticated()" class="greeting">
        Hello {{ getUserName() }}! Ready to manage your events today?
      </p>
      <!-- Call-to-action buttons -->
      <div class="cta-buttons">
        <button v-if="isAdminOrEventOwner" @click="navigateTo('dashboard')" class="btn primary">
          Go to Dashboard
        </button>
        <em v-if="isRegisteredUser">
          Excited for attending new events? Let's go!
        </em>
        <button v-else @click="navigateTo('login')" class="btn secondary">
          Login to Get Started
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
  useHead({
    title: 'Event Planner - Home'
  });
  
  const { isAuthenticated, getUserName, getRole } = useAuth(); // Use authentication state
// Reactive variable to hold the user's role
const userRole = ref(null);

  // Computed property to check if the user is an admin
const isAdminOrEventOwner = computed(() => userRole.value === "admin" || userRole.value === "event_owner");
const isRegisteredUser = computed(() => userRole.value === "registered_user");

// Retrieve the user role when the component is mounted
onMounted(() => {
  userRole.value = getRole(); // Fetch the role dynamically
});

  const navigateTo = (route) => {
    useRouter().push(`/${route}`);
  };
  </script>
  
  <style scoped>
  .homepage-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    background-color: #f9f9f9;
    padding: 20px;
    text-align: center;
  }
  
  .header {
    margin-bottom: 20px;
  }
  
  .title {
    font-size: 2.5rem;
    font-weight: bold;
    color: #333;
  }
  
  .subtitle {
    font-size: 1.2rem;
    color: #666;
  }
  
  .greeting {
    margin-top: 20px;
    font-size: 1.2rem;
    color: #007bff;
  }
  
  .cta-buttons {
    margin-top: 30px;
  }
  
  .btn {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .btn.primary {
    background-color: #007bff;
    color: #fff;
  }
  
  .btn.primary:hover {
    background-color: #0056b3;
  }
  
  .btn.secondary {
    background-color: #6c757d;
    color: #fff;
  }
  
  .btn.secondary:hover {
    background-color: #5a6268;
  }
  </style>
  
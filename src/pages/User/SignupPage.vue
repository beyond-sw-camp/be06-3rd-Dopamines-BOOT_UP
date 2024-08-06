<script>
import MainHeader from "@/components/layout/MainHeader.vue";
import { mapStores } from "pinia";
import { useUserStore } from './stores/useUserStore';
import UserInfoComponent from "@/pages/User/component/UserInfoComponent.vue";

export default {
  name: "SignupPage",
  components:{
    UserInfoComponent,
    MainHeader
  },
  computed: {
    ...mapStores(useUserStore)
  },
  methods:{

  }
}
</script>

<template>
  <div class="body-container">
    <MainHeader></MainHeader>
    <main>
      <div class="main-container">
        <UserInfoComponent></UserInfoComponent>
      </div>
    </main>
  </div>
</template>

<style scoped>
.main-container{
  max-width: 800px;
}
</style>
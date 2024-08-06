<script setup>
import MainHeader from "@/components/layout/MainHeader.vue";
import UserInfoComponent from '../components/signup/UserInfoComponent.vue'
import HeaderComponent from '../components/common/HeaderComponent.vue'
import { mapStores } from "pinia";
import { useUserStore } from '@/stores/useUserStore';

export default {
  name: "SignupPage",
  components:{
    UserInfoComponent,
    HeaderComponent
  },
  computed: {
    ...mapStores(useUserStore)
  },
  methods:{

  }
}
</script>

<template>
  <div class="content-container">
    <MainHeader></MainHeader>
    <main>
      <div class="content-area">
        <UserInfoComponent></UserInfoComponent>
      </div>
    </main>
  </div>
</template>

<style scoped>

</style>
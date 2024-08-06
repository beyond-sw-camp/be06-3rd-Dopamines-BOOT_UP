<script setup>
import PostList from "@/pages/component/List/PostList.vue";
import MainHeader from "@/components/layout/MainHeader.vue";
import MainFooter from "@/components/layout/MainFooter.vue";
</script>

<template>
  <div class="body-container">
    <MainHeader></MainHeader>
    <main>
      <div class="main-container">
        <div class="banner-area">
          <div class="banner">
            <img src="../../assets/img/pepecolor.jpeg" height="100%">
          </div>
        </div>
        <div class="content-area">
          <PostList title="자유 게시판"></PostList>
          <PostList title="공개 게시판"></PostList>
        </div>
      </div>
    </main>
    <MainFooter></MainFooter>
  </div>
</template>

<style scoped>
.banner-area{
  position: relative;
  /* max-width: 1200px; */
  width: 100%;
  margin: 0px auto;
  height: 300px;
  box-shadow: 2px 2px 10px 0px rgb(0 0 0 / 10%);
  background-color: #e06039e0;
  .banner{
    width: 100%;
    height: 100%;
    border-radius: 10px;
    display: flex;
    justify-content: center;
  }
}

.content-area{
  display: flex;
  column-gap: 2.5rem;
  margin-top: 2rem;
  margin-bottom: 2rem;
}
</style>
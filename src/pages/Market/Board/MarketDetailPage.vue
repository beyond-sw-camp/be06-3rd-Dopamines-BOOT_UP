<template>
  <div class="detail-container">
    <Carousel>
      <Slide v-for="image in this.marketStore.product.images" :key="image">
        <div class="detail-images-wrapper">
          <img class="carousel__item" :src="image" />
        </div>
      </Slide>

      <template #addons>
        <Navigation />
        <Pagination />
      </template>
    </Carousel>

    <section class="author-detail-wrapper">
      <div class="space-between">
        <div style="display: flex">
          <div id="detail-left-area">
            <div id="nickname">{{ marketStore.product.author }}</div>
          </div>
          <div id="detail-right-area">
            <div class="marked">
              <label for=":r1:" class="relative">
                <img
                  :src="require(`@/assets/icon/${marked_status}_marked.svg`)"
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  @click="changeImg"
                />
              </label>
              <input id=":r1:" type="checkbox" class="a11yHidden" />
            </div>
            <button id="chat-btn">채팅하기</button>
          </div>
        </div>
      </div>
    </section>

    <section class="content-description-wrapper">
      <h1 class="description-title">{{ marketStore.product.title }}</h1>
      <p class="description-post-time">{{ marketStore.product.createdAt }}</p>
      <p id="description-price">{{ marketStore.product.price }}원</p>
      <div id="description-detail">
        <p>
          {{ marketStore.product.content }}
        </p>
      </div>
    </section>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { Carousel, Navigation, Pagination, Slide } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";

import { mapStores } from "pinia";
import { useMarketStore } from "@/pages/Market/stores/UseMarketStore";

export default defineComponent({
  name: "MarketDetailPage",
  computed: {
    ...mapStores(useMarketStore),
  },
  created() {
    console.log(this.$route.params.idx);
    this.marketStore.getProduct(this.$route.params.idx);
  },
  data() {
    return {
      marked_status: "empty",
    };
  },
  methods: {
    changeImg() {
      if (this.marked_status === "empty") {
        this.marked_status = "fill";
      } else {
        this.marked_status = "empty";
      }
    },
  },
  components: {
    Carousel,
    Slide,
    Pagination,
    Navigation,
  },
});
</script>

<style scoped>
section,
article {
  display: block;
}

.detail-container {
  max-width: 1200px;
  margin: 0 auto;
  margin-top: 180px;
}

.detail-images-wrapper {
  position: relative;
  width: 677px;
  margin: 0 auto;
  height: 500px;
  border-radius: 8px;
  overflow: hidden;
}

.carousel__item {
  border-radius: 8px;
  position: relative;
  min-width: 100%;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  color: transparent;
  width: 100%;
  height: auto;
}

.carousel__slide {
  padding: 10px;
}

.carousel__prev {
  box-sizing: content-box;
  left: 180px;
}

.carousel__next {
  box-sizing: content-box;
  right: 180px;
}

#chat-btn {
  margin-top: 0;
  width: 110px;
  --tw-bg-opacity: 1;
  background-color: #19191a;
  padding-top: 10px;
  padding-bottom: 10px;
  margin: 0;
  border-radius: 0.25rem;
  font-size: 16px;
  line-height: 1.25rem;
  font-weight: 500;
  --tw-text-opacity: 1;
  color: rgb(255 255 255 / var(--tw-text-opacity));
}

.author-detail-wrapper {
  width: 677px;
  margin: 0 auto;
  text-decoration: none;
  display: block;
  margin-top: 50px;
  padding-bottom: 23px;
  position: relative;
  border-bottom: 1px solid #e9ecef;
}

.space-between {
  align-items: center;
  justify-content: space-between;
}

#detail-left-area {
  display: inline-block;
  margin-left: 10px;
}

#nickname {
  font-size: 18px;
  font-weight: 600;
  line-height: 1.5;
  letter-spacing: -0.6px;
  color: #212529;
}

#detail-right-area {
  position: absolute;
  right: 0;
  padding-right: 10px;
}

.content-description-wrapper {
  padding: 32px 0;
  width: 677px;
  margin: 0 auto;
  border-bottom: 1px solid #e9ecef;
}

.description-title {
  font-size: 20px;
  font-weight: 600;
  line-height: 1.5;
  letter-spacing: -0.6px;
  margin-top: 0px;
}

.description-post-time {
  margin-top: 4px;
  font-size: 13px;
  line-height: 1.46;
  letter-spacing: -0.6px;
  color: #868e96;
}

.description-price {
  margin-top: 4px;
  line-height: 1.76;
  letter-spacing: -0.6px;
  font-size: 18px;
  font-weight: bold;
}

#description-detail {
  margin-bottom: 16px;
  margin-top: 8px;
}
#description-detail p {
  font-size: 17px;
  line-height: 1.6;
  letter-spacing: -0.6px;
  margin: 16px 0;
  word-break: break-all;
}

.masking-url {
  color: #dee2e6;
}

#article-counts {
  font-size: 13px;
  line-height: 1.46;
  letter-spacing: -0.6px;
  color: #868e96;
}

.marked img {
  position: absolute;
  right: 20px;
}

.relative {
  position: relative;
}

.a11yHidden {
  overflow: hidden;
  position: absolute;
  clip: rect(0, 0, 0, 0);
  -webkit-clip-path: circle(0);
  clip-path: circle(0);
  width: 1px;
  height: 1px;
  margin: -1px;
  border: 0;
  padding: 0;
  white-space: nowrap;
}
</style>
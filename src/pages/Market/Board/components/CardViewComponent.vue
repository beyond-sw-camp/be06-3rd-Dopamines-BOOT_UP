<template>
  <div>
    <a :href="`detail/${product.idx}`" class="card-container">
      <div class="card-wrapper group">
        <img
          alt=""
          :src="product.mainImage"
          class="card-image group-hover:scale-105 transition duration-200"
        />
      </div>
      <div class="product-info">
        <h2 class="product-title">{{ product.title }}</h2>
        <div class="product-price">{{ product.price }}원</div>
        <div class="product-owner">
          <span class="text-sm text-gray-400">{{ product.author }}</span>
        </div>
      </div>
    </a>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      marked_status: "empty",
    };
  },
  props: ["product"],
  methods: {
    changeImg() {
      if (this.marked_status === "empty") {
        this.marked_status = "fill";
      } else {
        this.marked_status = "empty";
      }
    },
  },
  components: {},
};
</script>

<style scoped>
*,
:after,
:before {
  --tw-translate-x: 0;
  --tw-translate-y: 0;
  --tw-rotate: 0;
  --tw-skew-x: 0;
  --tw-skew-y: 0;
}

h2,
p {
  margin: 0;
}

a {
  color: inherit;
  text-decoration: inherit;
  cursor: pointer;
  text-decoration: inherit;
}

img {
  max-width: 100%;
  height: auto;
}

img,
svg {
  display: block;
  vertical-align: middle;
}

.card-container {
  position: relative;
  display: flex;
  -webkit-padding-end: 0;
  padding-inline-end: 0;
  padding-bottom: 0.75rem;
  flex-direction: column;
  align-items: flex-start;
  --tw-bg-opacity: 1;
  background-color: rgb(255 255 255 / var(--tw-bg-opacity));
}

.card-wrapper {
  box-sizing: border-box;
  position: relative;
  width: 100%;
  border-radius: 0.375rem;
  overflow: hidden;
  padding-top: 100%;
  margin-bottom: 0.875rem;
}

.product-info {
  width: 100%;
  overflow: hidden;
}

.card-image {
  position: absolute;
  height: 100%;
  width: 100%;
  inset: 0px;
  color: transparent;
  --tw-bg-opacity: 1;
  background-color: rgb(230 230 230 / var(--tw-bg-opacity));
  -o-object-fit: cover;
  object-fit: cover;
  transition-timing-function: cubic-bezier(0.4, 0, 1, 1);
  border-radius: 0.375rem;
}

.product-title {
  -webkit-line-clamp: 2;
  min-height: 2lh;
  font-size: 0.9rem;
  line-height: 1.25rem;
}

.product-price {
  font-weight: 600;
  --tw-text-opacity: 1;
  color: rgb(33 33 33 / var(--tw-text-opacity));
  font-size: 1.125rem;
  line-height: 1.75rem;
  margin-top: 0.125rem;
}

.product-owner {
  margin-top: 0.25rem;
  margin-bottom: 0.25rem;
  height: 1.5rem;
}

.marked {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  width: 1.5rem;
  height: 1.5rem;
}

.relative {
  position: relative;
}

.text-sm {
  font-size: 0.875rem;
  line-height: 1.25rem;
}

.group:hover .group-hover\:visible {
  visibility: visible;
}

.group:hover .group-hover\:block {
  display: block;
}

.group:hover .group-hover\:rotate-6 {
  --tw-rotate: 6deg;
}

.group:hover .group-hover\:-rotate-180,
.group:hover .group-hover\:rotate-6 {
  transform: translate(var(--tw-translate-x), var(--tw-translate-y))
    rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y))
    scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}

.group:hover .group-hover\:-rotate-180 {
  --tw-rotate: -180deg;
}

.group:hover .group-hover\:scale-100 {
  --tw-scale-x: 1;
  --tw-scale-y: 1;
}

.group:hover .group-hover\:scale-100,
.group:hover .group-hover\:scale-125 {
  transform: translate(var(--tw-translate-x), var(--tw-translate-y))
    rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y))
    scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}

.group:hover .group-hover\:scale-125 {
  --tw-scale-x: 1.25;
  --tw-scale-y: 1.25;
}

.group:hover .group-hover\:scale-105 {
  --tw-scale-x: 1.05;
  --tw-scale-y: 1.05;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y))
    rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y))
    scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}

.group:hover .group-hover\:text-black {
  --tw-text-opacity: 1;
  color: rgb(0 0 0 / var(--tw-text-opacity));
}

.group:hover .group-hover\:opacity-30 {
  opacity: 0.3;
}

.group:hover .group-hover\:opacity-100 {
  opacity: 1;
}

.group:hover .group-hover\:opacity-40 {
  opacity: 0.4;
}

.group:hover .group-hover\:opacity-80 {
  opacity: 0.8;
}

.transition {
  transition-property: color, background-color, border-color,
    text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter,
    -webkit-backdrop-filter;
  transition-property: color, background-color, border-color,
    text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter,
    backdrop-filter;
  transition-property: color, background-color, border-color,
    text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter,
    backdrop-filter, -webkit-backdrop-filter;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 0.15s;
}

.duration-200 {
  transition-duration: 0.2s;
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

.text-gray-400 {
  --tw-text-opacity: 1;
  color: rgb(153 153 153 / var(--tw-text-opacity));
}
</style>

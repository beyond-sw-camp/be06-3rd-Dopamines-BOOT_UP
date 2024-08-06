<script setup>

</script>

<template>
  <footer>
    <div class="footer-wrap">
      <div class="footer-logo">
        <div class="flex-1">
          <a href="https://okky.kr/">
            <div class="hidden md:block">
              <img class="footer-logo" src="../../assets/img/pepe.png" alt="OKKY Logo">
            </div>
          </a>
        </div>
        <b>DOPMINES</b>
      </div>
      <div class="footer-info">
        <div class="dopamines-introducing">
          <div class="intro-text">
            <span>HanHwa System Beyond Software</span>
          </div>
          <div class="border-line"></div>
          <div class="intro-text">
            <span>6th team Dopamines</span>
          </div>
        </div>
        <div class="participations">
          <div>유송연</div>
          <div>서시현</div>
          <div>최승은</div>
          <div>곽동현</div>
          <div>최수빈</div>
        </div>
      </div>
      <div class="footer-wrap">
        sponsored by JB Sim
      </div>
    </div>
  </footer>
</template>

<style scoped>
footer{
  margin-top: 5rem;
  padding: 1.75rem 0;
  border-color: hsla(220, 9%, 46%, .3);
  border-top-width: 1px;
  z-index: 10;
  background-color: #f4f4f4;
  width: 100%;
}
  .footer-wrap{
    max-width: 1000px;
    margin: 0 auto;
    display: flex;
    .footer-logo{
      width: 150px;
      display: flex;
      align-items: center;
      flex-direction: column;
      b{
        font-size: 1.5rem;
        font-weight: 800;
      }
    }
    .footer-info{
      padding: 0 1.25rem;
      flex: 1 1 0%;
      .dopamines-introducing{
        gap: 1rem;
        display: flex;
        flex: 1 1 0%;
        .intro-text{
          font-weight: 600;
        }
      }
      .participations{
        margin-top: 1.75em;
        display: flex;
        gap: 1rem;
      }
    }
    .footer-right{
      display: flex;
      align-items: flex-end;
      flex-direction: column;
    }
  }

.border-line{
  border-color: #82827F;
  border-left-width: 1px;
  height: .75rem;
}
</style>
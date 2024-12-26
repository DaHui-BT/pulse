<script setup lang="ts">
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const hero_info = reactive<{title: string, sub_title: string, button_text: string}>({
  title: 'Welcome to My Blog',
  sub_title: 'A place where thoughts meet simplicity',
  button_text: 'Explore the Blog'
})

const recommand_article_list = reactive([
  { id: 1, title: "Understanding Vue 3 Composition API", excerpt: "A deep dive into Vue 3's composition API..." },
  { id: 2, title: "10 Tips for Writing Better CSS", excerpt: "Level up your CSS game with these tips..." },
  { id: 3, title: "The Future of JavaScript", excerpt: "What's next for the most popular programming language?" },
])

const link_list = reactive<Array<String>>(['Github', 'Facebook', 'Outlook'])

function jump() {
  router.push('article')
}
</script>

<template>
  <div class="home">
    <a-flex class="home-hero" justify="center" align="center" vertical>
      <h1 class="home-hero-title">{{ hero_info.title }}</h1>
      <h2 class="home-hero-sub_title">{{ hero_info.sub_title }}</h2>
      <a-button class="home-hero-button" type="primary" size="large" @click=jump>{{ hero_info.button_text }}</a-button>
    </a-flex>

    <div class="wave"></div>

    <!-- <section class="home-feature">
      <h2 class="home-feature-title">Feature Articles</h2>
      <a-flex class="home-feature-aritlce-container" wrap="wrap" justify="center" gap="20">
        <div class="home-feature-article-item" v-for="article in recommand_article_list" :key="article.id">
          <h3 class="home-feature-article-item-title">{{ article.title }}</h3>
          <p class="home-feature-article-item-content">{{ article.excerpt }}</p>
          <router-link to="/article" class="home-feature-article-item-read_more">Read More</router-link>
        </div>
      </a-flex>
    </section> -->

    <!-- <section class="home-footer">
      <p class="home-footer-about">&copy; 2024 My Blog | <router-link to="/about">About Me</router-link></p>
      <a-flex class="home-footer-link" justify="center" gap="20">
        <a href="#" class="home-footer-link--item" v-for="link in link_list" :key="link">{{ link }}</a>
      </a-flex>
    </section> -->
  </div>
</template>

<style lang="scss" scoped>
.home {
  background-color: var(--content-color);
  text-align: center;

  .home-hero {
    padding: 20px;
    height: calc(100vh - 50px);

    .home-hero-title {
      font-size: 3rem;
      font-weight: bold;
    }

    .home-hero-sub_title {
      font-size: 1.5rem;
      margin-bottom: 30px;
      color: var(--text-color);
    }
  }

  .home-feature {
    padding: 50px 20px;
    text-align: center;
    background-color: #fff;

    .home-feature-title {
      margin-bottom: 1.5em;
    }

    .home-feature-aritlce-container {

      .home-feature-article-item {
        width: 300px;
        padding: 20px;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      }

      .home-feature-article-item-title {
        font-size: 1.25rem;
        margin-bottom: 10px;
      }

      .home-feature-article-item-content {
        font-size: 1rem;
        color: var(--text-color);
        margin-bottom: 1em;
      }
    }
  }

  .home-footer {
    padding: 20px;
    color: var(--background-color);
    background-color: var(--primary-color);
  }
}

.wave {
  height: 350px;
  margin-top: -350px;
  --c: var(--primary-color);
  --w1: radial-gradient(100% 57% at top, #0000 100%, var(--c) 100.5%) no-repeat;
  --w2: radial-gradient(100% 57% at bottom, var(--c) 100%, #0000 100.5%) no-repeat;
  --t: 2s;
  background: var(--w1), var(--w2), var(--w1), var(--w2);
  background-position-x: -200%, -100%, 0%, 100%;
  background-position-y: 100%;
  background-size: 50.5% 100%;
  animation: m var(--t) infinite linear;
}

@keyframes m {
  0%  {background-position-x:-200%, -100%, 0%, 100%}
  100%{background-position-x:  0%, 100%, 200%, 300%}
}
</style>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const ellipsis = ref(true);
import Movable from '../components/Movable.vue'

const hero_info = reactive<{title: string, sub_title: string, button_text: string}>({
  title: 'Welcome to My Blog',
  sub_title: 'A place where thoughts meet simplicity',
  button_text: 'Explore the Blog'
})

const recommand_article_list = reactive([
  { id: 1, title: "Understanding Vue 3 Composition API", content: "Ant Design, a design language for background applications, is refined by Ant UED Team. AntDesign, a design language for background applications, is refined by Ant UED Team. AntDesign, a design language for background applications, is refined by Ant UED Team. AntDesign, a design language for background applications, is refined by Ant UED Team. AntDesign, a design language for background applications, is refined by Ant UED Team. AntDesign, a design language for background applications, is refined by Ant UED Team." },
  { id: 2, title: "10 Tips for Writing Better CSS", content: "Level up your CSS game with these tips..." },
  { id: 3, title: "The Future of JavaScript", content: "What's next for the most popular programming language?" },
])

const link_list = reactive<Array<String>>(['Github', 'Facebook', 'Outlook'])

function jump() {
  router.push('article')
}
</script>

<template>
  <div class="home">
    <section >
      <a-flex :gap="30" class="home-profile">
        <a-flex vertical>
          <a-avatar :size="200" class="home-profile-avatar" src="https://qcanog5pn8uvzraw.public.blob.vercel-storage.com/static/1737987790963-2-GUfq1xsOuhu2O5upalO6uXwEDikA78.jpg">
          </a-avatar>
          <h2>DH</h2>
          <a-row class="home-profile-stats">
            <a-col :span="11">
              <a-statistic title="Articles" :value="112893" />
            </a-col>
            <a-col class="divider"></a-col>
            <a-col :span="11">
              <a-statistic title="Watchers" :value="112893" />
            </a-col>
          </a-row>
        </a-flex>

        <a-flex :gap="10" wrap="wrap" class="home-profile-container">
          <a-card title="Card title" class="home-profile-card-item"
                  v-for="article in recommand_article_list" :key="article.id">
            <template #extra>
              <i class="iconfont draggable">&#xe6ff;</i>
            </template>
            <a-typography-paragraph class="home-profile-card-content-describe"
              :ellipsis="ellipsis ? { rows: 3, expandable: false } : false"
              :content="article.content"
            />
            <a-flex :gap="10" class="home-profile-card-item-footer">
              <span>tag</span>
              <span>like</span>
              <span>watcher</span>
            </a-flex>
          </a-card>
        </a-flex>
      </a-flex>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.home {

  .home-profile {

    .home-profile-avatar {
      margin-top: 50px;
      flex-shrink: 0;
    }

    .home-profile-stats {
      text-align: center;
      
      .divider {
        width: 1px;
        background-color: #eee;
      }
    }
    
    .recommand-container {
      position: relative;
    }

    .home-profile-container {

      .home-profile-card-item {
        min-width: 300px;
        flex-basis: 0;
      }
    }

  }
}

@media screen and (max-width: 900px) {
  .home {

    .home-profile {
      flex-direction: column;
  
      .home-profile-container {
        flex-direction: column;
        flex-wrap: nowrap;

        .home-profile-card-item {
          min-width: 100%;
          /* flex-basis: 0; */
        }
      }
    }
  }
}
</style>

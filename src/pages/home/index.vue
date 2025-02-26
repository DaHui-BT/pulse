<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { InteractionService } from '../../api/InteractionService';
import { useAuthStore } from '../../store';
import { ArticleService } from '../../api/ArticleService';
import { ArticleDocument } from '../../entities/article';
import { TagService } from '../../api/TagService';

import TimeLine from '../../components/TimeLine.vue';
import DragSort from './components/drag-sort/index.vue';
import Pins from './components/pins/index.vue'

const store = useAuthStore()
const ellipsis = ref(true);
const interaction_service = InteractionService.getInstance()
const article_service = ArticleService.getInstance()
const tag_service = TagService.getInstance()
const contributions = reactive<{date: Date, value: number}[]>([])
const recommand_article_list = reactive<ArticleDocument[]>([])
const contributionsCount = computed(() => {
  return contributions.reduce((total, curr) => total + curr.value, 0)
})

article_service.findArticles({createdBy: store.user._id}).then(res => {
  let articleList = res.data?.articles || []
  recommand_article_list.splice(0, recommand_article_list.length)

  recommand_article_list.push(...(articleList || []))
})

tag_service.findAllTags().then(res => {
  store.setTagList(res.data || [])
})

interaction_service.findAllInteractionsByUserId(store.user._id).then(res => {
  let interactions = res.data || []
  
  for (let intera of interactions) {
    let flag = false
    for (let c of contributions) {
      const date = new Date(intera.createdAt)
      if (c.date.getFullYear() === date.getFullYear() &&
          c.date.getMonth() === date.getMonth() && 
          c.date.getDay() === date.getDay()) {
        c.value += 1
        flag = true
        break
      }
    }
    if (flag === false) {
      contributions.push({date: new Date(intera.createdAt), value: 1})
    }
  }
})

function dragUpdate(values: any) {
  recommand_article_list.splice(0, recommand_article_list.length)
  recommand_article_list.push(...values)
}

</script>

<template>
  <div class="home">
    <section >
      <a-flex :gap="30" class="home-profile">
        <a-flex vertical>
          <a-typography-title :level="2">Overview</a-typography-title>
          <a-avatar class="home-profile-avatar" src="https://qcanog5pn8uvzraw.public.blob.vercel-storage.com/static/1737987790963-2-GUfq1xsOuhu2O5upalO6uXwEDikA78.jpg">
          </a-avatar>
          <a-typography-title :level="3">DaHui</a-typography-title>
          <a-row class="home-profile-stats">
            <a-col :span="11">
              <a-statistic title="Articles" :value="112893" />
            </a-col>
            <a-col class="divider"></a-col>
            <a-col :span="11">
              <a-statistic title="Watchers" :value="112893" />
            </a-col>
          </a-row>
          
          <a-flex :gap="10" justify="space-between" class="home-profile-links">
            <a-typography-link href="https://github.com/DaHui-BT#main-content" target="_blank">
              Github
            </a-typography-link>
            <a-typography-link href="https://blog.csdn.net/weixin_47179998" target="_blank">
              CSDN
            </a-typography-link>
            <a-typography-link href="https://stackoverflow.com/users/24543992/hui-xiao" target="_blank">
              StackOverflow
            </a-typography-link>
          </a-flex>
        </a-flex>

        <a-flex :gap="10" wrap="wrap" class="home-profile-container">
          <a-flex justify="space-between" class="home-profile-title">
            <a-typography-title :level="5">Pined</a-typography-title>
            <Pins />
          </a-flex>
          <DragSort :data="recommand_article_list" :key="recommand_article_list.length" v-on:update:data="dragUpdate">
            <template v-slot="article">
              <a-card class="home-profile-card-item" draggable="true">
                <template #title>
                  <a-typography-link :href="`#article-detail?_id=${article.item._id}`">{{ article.item.title }}</a-typography-link>
                </template>
                <template #extra>
                  <i class="iconfont draggable-cursor">&#xe6ff;</i>
                </template>
                <a-typography-paragraph class="home-profile-card-content-describe"
                  :ellipsis="ellipsis ? { rows: 3, expandable: false } : false"
                  :content="article.item.content"
                />
                <a-flex :gap="10" class="home-profile-card-item-footer">
                  <a-tag v-for="tag in article.item.tags" :key="tag" color="blue">{{ store.tags.filter(t => t._id == tag)[0].name }}</a-tag>
                </a-flex>
              </a-card>
            </template>
          </DragSort>
        </a-flex>
      </a-flex>
    </section>
    <section class="home-contribution">
      <a-typography-title class="home-contribution-title" :level="4">Contributions</a-typography-title>
      <a-typography-text>{{ contributionsCount }} contributions in the last year</a-typography-text>
      <Contribution :data="contributions" :key="contributions.length"/>
      <a-typography-title class="home-contribution-title" :level="4">Contribution Activate</a-typography-title>
      <TimeLine />
    </section>
  </div>
</template>

<style lang="scss" scoped>
.home {

  .home-profile {

    .home-profile-avatar {
      width: 200px;
      height: 200px;
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

    .home-profile-links {
      border-top: 1px solid #eee;
      border-bottom: 1px solid #eee;
    }

    .home-profile-container {

      .home-profile-title {
        width: 100%;

        .home-profile-title-func {
          font-size: 13px;
        }
      }

      .home-profile-card-item {

        .draggable-cursor {
          cursor: pointer;
        }

        .home-profile-card-content-describe {
          height: 70px;
        }
      }
    }

  }

  .home-contribution {

    .home-contribution-title {
      margin-top: 30px;
    }
  }
}

@media screen and (max-width: 900px) {
  .home {

    .home-profile {
      flex-direction: column;
      
      .home-profile-avatar {
        width: 100px;
        height: 100px;
        margin-top: 20px;
      }
    }
  }
}
</style>

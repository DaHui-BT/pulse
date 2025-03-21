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
import { message } from 'ant-design-vue';
import { UserService } from '../../api/UserService';
import { useI18n } from 'vue-i18n';

const { t } = useI18n()
const store = useAuthStore()
const ellipsis = ref(true)
const interaction_service = InteractionService.getInstance()
const article_service = ArticleService.getInstance()
const userService = UserService.getInstance()
const tag_service = TagService.getInstance()
const contributions = reactive<{date: Date, value: number}[]>([])
const recommand_article_list = reactive<ArticleDocument[]>([])
const spinning = ref<boolean>(true)
const contributionsCount = computed(() => {
  return contributions.reduce((total, curr) => total + curr.value, 0)
})

userService.findUserById(store.user._id).then(res => {
  if (res.success) {
    res.data && store.setUser(res.data)
  } else {
    message.error(res.error)
  }
}).catch((err) => message.error(err.message))

article_service.findArticleInfoByIds(store.user.recommands).then(res => {
  if (res.success) {
    let articleList = res.data || []
    recommand_article_list.splice(0, recommand_article_list.length)
    articleList.sort((a1, a2) => store.user.recommands.indexOf(a1._id as string) - store.user.recommands.indexOf(a2._id as string))
    recommand_article_list.push(...(articleList || []))
  } else {
    message.error(res.error)
  }
}).catch(err => message.error(err.message))
.finally(() => spinning.value = false)

tag_service.findAllTags().then(res => {
  store.setTagList(res.data || [])
}).catch(err => message.error(err.message))

interaction_service.findAllInteractionsByUserId(store.user._id).then(res => {
  if (res.success) {
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
  } else {
    message.error(res.error)
  }
}).catch(err => message.error(err.message))

function dragUpdate(values: ArticleDocument[]) {
  recommand_article_list.splice(0, recommand_article_list.length)
  recommand_article_list.push(...values)
  userService.updateUser(store.user._id, { recommands: values.map(a => a._id) as string[] }).then(res => {
    if (res.success) {
      message.success(res.message)
    } else {
      message.error(res.error)
    }
  }).catch(err => message.error(err.message))
}

</script>

<template>
  <div class="home">
    <section >
      <a-flex :gap="30" class="home-profile">
        <a-flex vertical>
          <!-- <a-typography-title :level="2">Overview</a-typography-title> -->
          <a-typography-title :level="2">{{ t('overview') }}</a-typography-title>

          <a-flex class="home-profile-container" vertical>
            <a-avatar class="home-profile-avatar" :src="store.user.avatar">
            </a-avatar>
            <a-flex vertical class="home-profile-detail">
              <a-typography-title :level="3">{{ store.user.username }}</a-typography-title>
              <a-row class="home-profile-stats">
                <a-col :span="11">
                  <!-- <a-statistic title="Articles" :value="store.user.statistics.articlesCount" /> -->
                  <a-statistic :title="t('article')" :value="store.user.statistics.articlesCount" />
                </a-col>
                <a-col class="divider"></a-col>
                <a-col :span="11">
                  <!-- <a-statistic title="Watchers" :value="store.user.statistics.subscribersCount" /> -->
                  <a-statistic :title="t('watchers')" :value="store.user.statistics.subscribersCount" />
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
                  Stack Overflow
                </a-typography-link>
              </a-flex>
            </a-flex>
          </a-flex>
        </a-flex>

        <a-flex :gap="10" vertical class="home-profile-content">
          <a-flex justify="space-between" class="home-profile-title">
            <!-- <a-typography-title :level="5">Pined</a-typography-title> -->
            <a-typography-title :level="5">{{ t('recommand') }}</a-typography-title>
            <Pins :checked-id-list="store.user.recommands"/>
          </a-flex>

          <a-spin :spinning="spinning">
            <DragSort :data="recommand_article_list" :key="recommand_article_list.length"
                      v-on:update:data="dragUpdate" v-if="recommand_article_list.length > 0">
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
                    :content="article.item.description"
                  />
                  <a-flex :gap="10" class="home-profile-card-item-footer">
                    <a-tag v-for="tag in article.item.tags" :key="tag" color="blue">{{ store.tags.filter(t => t._id == tag)?.at(0)?.name }}</a-tag>
                  </a-flex>
                </a-card>
              </template>
            </DragSort>
            
            <!-- <a-empty description="No recommand article!" v-else style="width: 100%"/> -->
            <a-empty :description="t('no_recommand_article!')" v-else style="width: 100%"/>
          </a-spin>
        </a-flex>
      </a-flex>
    </section>
    <section class="home-contribution">
      <!-- <a-typography-title class="home-contribution-title" :level="4">Contributions</a-typography-title> -->
      <a-typography-title class="home-contribution-title" :level="4">{{ t('contributions') }}</a-typography-title>
      <!-- <a-typography-text>{{ contributionsCount }} contributions in the last year</a-typography-text> -->
      <a-typography-text>{{ contributionsCount }} 贡献，去年</a-typography-text>
      <Contribution :data="contributions" :key="contributions.length"/>
      <!-- <a-typography-title class="home-contribution-title" :level="4">Contribution Activate</a-typography-title> -->
      <a-typography-title class="home-contribution-title" :level="4">贡献活跃</a-typography-title>
      <TimeLine />
    </section>
  </div>
</template>

<style lang="scss" scoped>
.home {

  .home-profile {

    .home-profile-detail {
      width: 100%;
    }

    .home-profile-avatar {
      transition: width 0.5s ease-in-out, height 0.5s ease-in-out;
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
      padding: 20px 0;
      border-top: 1px solid #eee;
      border-bottom: 1px solid #eee;
    }

    .home-profile-content {
      width: 100%;

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

@media screen and (max-width: 800px) {
  .home {

    .home-profile {
      flex-direction: column;

      .home-profile-container {
        flex-direction: row;
      }
      
      .home-profile-avatar {
        width: 100px;
        height: 100px;
        margin-top: 20px;
      }
    }
  }
}
</style>

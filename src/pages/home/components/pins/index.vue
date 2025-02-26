<script lang="ts" setup>
import { reactive, ref, watch } from 'vue';
import { ArticleService } from '../../../../api/ArticleService';
import { useAuthStore } from '../../../../store';
import PaginationType from '../../../../types/pagination';
import { ArticleDocument } from '../../../../entities/article';

const store = useAuthStore()
const article_service = ArticleService.getInstance()
const open = ref<boolean>(false);
const article_list = reactive<ArticleDocument[]>([])
const checkList = reactive<{article_id: string, checked: boolean}[]>([])
const checkAll = ref<boolean>(false)
const initLoading = ref(true);
const loading = ref(false);
const pagination = reactive<PaginationType>({
  current: 1,
  size: 10,
  total: 0
})

watch(checkList, (newCheckList) => {
  let flag = true
  for (let check of newCheckList) {
    if (!check.checked) {
      flag = false
      break
    }
  }
  checkAll.value = flag
})

const onCheckAllChange = (e: any) => {
  checkList.forEach(check => check.checked = checkAll.value)
}

const loadData = async (clear: boolean = false) => {
  if (clear) {
    article_list.splice(0, article_list.length)
    checkList.splice(0, checkList.length)
  }
  
  await article_service.findArticles({ createdBy: store.user._id },
    { current: pagination.current, size: pagination.size }).then(res => {
    article_list.push(...(res.data?.articles || []))
    checkList.push(...(res.data?.articles || []).map(item => ({ article_id: item._id + '', checked: false })))
    if (res.data?.pagination) {
      pagination.current = res.data.pagination.current
      pagination.size = res.data.pagination.size
      pagination.total = res.data.pagination.total
    }
    if (article_list.length === res.data?.pagination.total) {
      loading.value = true
    } else {
      loading.value = false
    }
  })
}

const showModal = async () => {
  open.value = true;
  await loadData(true)
  initLoading.value = false
};

const onLoadMore = async () => {
  loading.value = true
  pagination.current += 1
  loadData()
}

const handleOk = (e: MouseEvent) => {
  open.value = false;
  console.log(checkList)
};
</script>

<template>
  <div class="pins">
    <a-button type="link" @click="showModal">Customize your pins</a-button>
    <a-modal v-model:open="open" title="Customize Pins" @ok="handleOk">
      <div>
        <a-checkbox
          v-model:checked="checkAll"
          @change="onCheckAllChange">
          Check all
        </a-checkbox>
      </div>
      <a-list
        class="demo-loadmore-list"
        :loading="initLoading"
        item-layout="horizontal"
        :data-source="article_list"
      >
        <template #loadMore>
          <div
            v-if="!initLoading && !loading"
            :style="{ textAlign: 'center', marginTop: '12px', height: '32px', lineHeight: '32px' }"
          >
            <a-button @click="onLoadMore">loading more</a-button>
          </div>
        </template>
        <template #renderItem="{ item, index }">
          <a-list-item>
            <template #actions>
              <a-checkbox v-model:checked="checkList[index].checked"></a-checkbox>
            </template>
            <a-skeleton avatar :title="false" :loading="!!item.loading" active>
              <a-list-item-meta>
                <template #description>
                  <a-typography-paragraph :ellipsis="true" :content="item.description"></a-typography-paragraph>
                  
                </template>
                <template #title>
                  <a-typography-text :strong="true">{{ item.title }}</a-typography-text>
                </template>
              </a-list-item-meta>
            </a-skeleton>
          </a-list-item>
        </template>
      </a-list>
    </a-modal>
  </div>
</template>

<style scoped lang="scss">
.pins {
  
}
</style>
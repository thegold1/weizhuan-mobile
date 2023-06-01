<template>
  <div class="app-container">
    <van-tabs style="height: 100%;display: flex;flex-direction: column;" v-model:active="active" :shrink="true">
      <van-tab v-for="(tab, tabIndex) of tabList" :key="tab.name">
        <template #title>
          <van-icon v-if="tab.icon" :style="{ color: active === tabIndex ? tab.activeIconColor : '#646566' }"
            :name="active === tabIndex ? tab.activeIcon : tab.icon" />
          {{ tab.title }}
        </template>
        <van-list style="height: 100%" v-model:loading="loading" :finished="finished" finished-text="没有更多了～"
          @load="onLoad">
          <van-cell v-for="item of list" :key="item.id" :title="item.title" :label="item.purchaseTime"
            @click="handleItemClick(item)">
            <template #right-icon>
              <van-icon @click.stop="handleIconClick(item)" style="font-size: 0.4rem" name="ellipsis" />
            </template>
          </van-cell>
        </van-list>
      </van-tab>

    </van-tabs>
    <van-dialog v-model:show="showRename" title="重命名" show-cancel-button @confirm="confirmRename">
      <van-field v-model="reNameValue" placeholder="请输入标题" />
    </van-dialog>

    <van-action-sheet v-model:show="showActions" :actions="actions" cancel-text="取消" close-on-click-action
      @cancel="onCancel" />

  </div>
</template>

<script setup name="Document">
import { computed, reactive, toRefs, getCurrentInstance, watch } from "vue";
import { getDocumentList, addFavorite, cancelFavorites, getFavoriteList, deleteSelectedList } from "@/api/document.js";
import useUserStore from "@/store/modules/user.js";

const { proxy } = getCurrentInstance();

const { userInfo } = useUserStore();

const tabList = [
  { title: '全部', name: 0, icon: '' },
  { title: '收藏', name: 1, icon: 'star-o', activeIcon: 'star', activeIconColor: '#f3b260' },
];

const state = reactive({
  queryParams: {
    page: 1,
    pageSize: 1000,
    uid: userInfo.uid
  },
  loading: false,
  finished: false,
  showActions: false,
  showRename: false,
  reNameValue: '',
  currentPaperId: '',
  active: 0,
  allList: [],
  actions: [],
  list: []
});

const {
  loading,
  finished,
  active,
  allList,
  actions,
  showActions,
  queryParams,
  showRename,
  reNameValue,
  currentPaperId,
  list
} = toRefs(state);

// const list = computed(async () => {
//   if (active.value === 0) {
//     return allList.value;
//   }
//   const { data } = await getFavoriteList(queryParams.value)
//   return allList.value.filter(item => item.favouriteFlag === active.value)
// })



const getAllList = async () => {
  try {
    const { data: { records }, code } = await getDocumentList(queryParams.value);
    if (code === 1) {
      list.value = records
    }
    return code
  } catch (e) {
    return 0
  }

};

const getFavoriteAllList = async () => {
  try {
    const { data: { records }, code } = await getFavoriteList(queryParams.value);
    if (code === 1) {
      list.value = records
    }
    return code
  } catch (e) {
    return 0
  }

}

const onLoad = () => {
  // 异步更新数据
  setTimeout(async () => {
    // 加载状态结束
    loading.value = false;
    let code;
    if (active.value === 0) {
      code = await getAllList();
    } else if (active.value === 1) {
      code = await getFavoriteAllList();
    }
    // getAllList()

    // console.log(list.value.length)

    // 数据全部加载完成
    if (code === 1) {
      if (list.value.length) {
        finished.value = true;
      }
    } else if (code === 0) {
      finished.value = true;
    }

  }, 1000);
};

const handleItemClick = ({ paperId }) => {
  proxy.$router.push({
    name: 'Document-Info',
    query: {
      paperId
    }
  })
};

const handleIconClick = (item) => {
  showActions.value = true;
  if (active.value === 0) {
    actions.value = [
      { name: '添加收藏', callback: () => handleAddFavourite(item) },
      // { name: '重命名', callback: () => handleRename(item) },
      { name: '删除', callback: () => handleDelete(item) },
    ];
  } else if (active.value === 1) {
    actions.value = [
      { name: '取消收藏', callback: () => handleCancelFavourite(item) },
      // { name: '重命名', callback: () => handleRename(item) },
      { name: '删除', callback: () => handleDelete(item) },
    ];
  }
};

function onCancel() {

}

async function handleAddFavourite({ paperId }) {
  const { code, data } = await addFavorite(paperId);
  if (code === 1) {
    proxy.$modal.msgSuccess(data)
    await getAllList();
  }
  // const document = allList.value.find(doc => doc.paperId === paperId);
  // if (document) {
  //   document.favouriteFlag = 1;
  //   proxy.$modal.msgSuccess('收藏成功！')
  // }
}

async function handleCancelFavourite({ paperId }) {
  const { code, data } = await cancelFavorites(paperId);
  if (code === 1) {
    proxy.$modal.msgSuccess(data)
    getFavoriteAllList();
  }
  // const document = allList.value.find(doc => doc.paperId === paperId);
  // if (document) {
  //   document.favouriteFlag = 0;
  //   proxy.$modal.msgSuccess('取消成功！')
  // }
}

function handleRename({ paperId, title }) {
  const document = allList.value.find(doc => doc.paperId === paperId);
  currentPaperId.value = paperId
  if (document) {
    reNameValue.value = title;
    showRename.value = true;
  }
}
function handleDelete({ paperId }) {
  // allList.value = allList.value.filter(doc => doc.paperId !== paperId);
  deleteSelectedList({
    paperIds: paperId,
    realDelete: "0",
  })
  getAllList()
  proxy.$modal.msgSuccess('删除成功！')
}

function confirmRename() {
  const document = allList.value.find(doc => doc.paperId === currentPaperId.value);
  if (document) {
    document.title = reNameValue.value;
    proxy.$modal.msgSuccess('重命名成功！')
    showRename.value = false;
  }
}

watch(() => active.value, (value) => {
  if (value === 0) {
    getAllList()
  } else if (value === 1) {
    getFavoriteAllList()
  }
})
</script>

<style lang="scss" scoped>
.app-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  :deep(.van-tabs__wrap) {
    min-height: 1rem;
  }

  :deep(.van-tabs__content) {
    overflow-y: scroll;
    height: calc(100% - 1rem);
  }
}
</style>

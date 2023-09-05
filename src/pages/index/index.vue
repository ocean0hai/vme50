<script setup lang="ts" name="index">
import { onMounted } from 'vue';
import { computed } from 'vue';
import { ref } from 'vue';
import { Api } from '@/utils/request';
import { UserInfo } from '@/state';
const { getUser } = UserInfo();

const menuArr = computed(() => {
    const arr: Array<string> = [];
    data.value.map((item: any) => {
        arr.push(item.name);
    });
    return arr;
});

//初始化函数
function scrollInit() {
    let query = uni.createSelectorQuery();
    query
        .selectAll('.category-right')
        .boundingClientRect((rects: any) => {
            rects.map((rect: any) => {
                rights.value.push(rect.top);
            });
        })
        .exec(function () {});
    query
        .selectAll('.category-left')
        .boundingClientRect((rects: any) => {
            rects.map((rect: any) => {
                lefts.value.push(rect.top);
            });
        })
        .exec(function () {});
}

function changeNum(n: number) {
    activeKey.value = n;
    scrollTop.value = Number(rights.value[n]) - 80;
}

function changeTop(e: any) {
    rights.value.map((item: string, i: number) => {
        if (item < '' + (e.detail.scrollTop + 60)) {
            activeKey.value = i - data.value.length;
        }
    });
}

const { get } = Api();
const data: any = ref([]);
const activeKey = ref(0);
const scrollTop = ref(0);
const lefts: any = ref([]);
const rights: any = ref([]);
onMounted(async () => {
    getUser();
    await get('/meals/getAllByType')
        .then((res) => {
            data.value = res;
        })
        .catch((err) => {
            console.log(err);
        });
    scrollInit();
});
//测试数据
const test = ref();
const test1 = ref();
console.log(test, test1);
</script>

<template>
    <view class="w-full h-full bg-gray-100">
        <i-header></i-header>
        <view class="flex">
            <van-sidebar
                :active-key="activeKey"
                class="box side-bar w-20 overflow-x-hidden overflow-y-auto"
            >
                <van-sidebar-item
                    v-for="(item, i) in menuArr"
                    :key="i"
                    :title="item"
                    class="category-left"
                    @click="changeNum(i)"
                ></van-sidebar-item>
                <view class="w-full h-16"></view>
            </van-sidebar>
            <scroll-view
                scroll-y="true"
                show-scrollbar="false"
                class="w-full box side-bar"
                :scroll-top="scrollTop"
                @scroll="changeTop"
            >
                <view
                    v-for="({ meals, name }, i) in data"
                    :key="i"
                    class="category-right"
                >
                    <view class="ml-3 text-gray-400">{{ name }}</view>
                    <i-box :data="meals"></i-box>
                </view>
                <view class="w-full h-16"></view>
            </scroll-view>
        </view>
        <i-shoppingcart></i-shoppingcart>
    </view>
</template>

<style scoped>
.box {
    height: calc(100vh - 77px);
}

/* 隐藏滚动条 */
.side-bar::-webkit-scrollbar {
    display: none;
    z-index: 80;
}
</style>

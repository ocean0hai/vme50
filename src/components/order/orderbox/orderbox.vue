<script lang="ts" setup>
import { Api } from '@/utils/request';
const { rendImageSrc } = Api();
const { data } = defineProps<{
    data: Array<any>;
}>();

function rendArr(charges: Array<any>) {
    const arr: Array<string> = [];
    let str = '';
    charges.map((item) => {
        item.tags.map((it: any) => {
            if (it.checked) {
                if (item.isMultipleChoice === 0) {
                    str += it.name + '|';
                } else {
                    arr.push(it.name);
                }
            }
        });
    });
    arr[arr.length - 1] = arr[arr.length - 1] + `(${str.slice(0, -1)})`;
    return arr;
}
</script>

<template>
    <view class="bg-white rounded-md pt-2">
        <view class="text-xl pl-3">餐品详情</view>
        <van-divider class="-my-1" />
        <view class="box side-bar overflow-x-hidden overflow-y-auto">
            <view
                v-for="(
                    { name, picture, totalPrice, charges, number }, i
                ) in data"
                :key="i"
                class="flex px-3 py-2 justify-between"
            >
                <view class="flex">
                    <image
                        class="w-16 h-16"
                        :src="rendImageSrc(picture)"
                    ></image>
                    <view class="px-2">
                        <view>
                            <view
                                class="text-black mb-2 text-lg whitespace-pre-wrap"
                            >
                                <text class="">{{ name }}</text>
                            </view>
                            <!-- 遍历 -->
                            <view
                                v-for="(item, k) in rendArr(charges)"
                                :key="k"
                                class="text-sm text-gray-400"
                            >
                                <text>x1</text>
                                {{ item }}
                            </view>
                        </view>
                        <view class="flex justify-between py-2">
                            <view>x{{ number }}</view>
                        </view>
                    </view>
                </view>

                <view class="text-black">
                    ￥<text class="text-2xl">{{ totalPrice }}</text>
                </view>
            </view>
        </view>
    </view>
</template>

<style scoped>
.box {
    height: calc(100vh - 250px);
}

/* 隐藏滚动条 */
.side-bar::-webkit-scrollbar {
    display: none;
    z-index: 80;
}
</style>

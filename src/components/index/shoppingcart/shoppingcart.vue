<script lang="ts" setup>
import { computed } from 'vue';
import { ref } from 'vue';
import { UserInfo } from '@/state';
import { Api } from '@/utils/request';
const { rendImageSrc } = Api();
const { shops, deleteData, changeNumber } = UserInfo();

const show = ref(false);
const totals = computed(() => {
    let num = 0;
    shops.map((item) => {
        num += item.totalPrice;
    });
    return num;
});
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
function toOrder() {
    uni.navigateTo({
        url: '/pages/order/index',
    });
}

const test = ref();
console.log(test);
</script>

<template>
    <view class="absolute top-[90%] left-0 w-full">
        <view
            class="flex justify-between items-center text-white bg-red-600 rounded-xl mx-4 py-1 px-4"
        >
            <view class="flex flex-1" @click="show = true">
                <van-icon name="bill" size="40" :badge="shops.length" />
                <view class="text-2xl leading-loose"> ￥{{ totals }} </view>
            </view>
            <view class="" @click="toOrder">
                <text class="text-xl">选好了</text>
                <view class="text-center">Order</view>
            </view>
        </view>
        <!-- 弹窗购物车 -->
        <van-action-sheet v-model:show="show">
            <view class="flex justify-between items-center px-5 text-xl py-2">
                <view
                    class="text-gray-400 text-base"
                    @click="deleteData('empty')"
                >
                    <van-icon name="delete-o" />清空购物车
                </view>
                <view class="text-center flex-1">购物车</view>
                <view class="text-red-500" @click="show = false">X</view>
            </view>
            <template v-if="shops.length !== 0">
                <view
                    v-for="(
                        { id, name, picture, totalPrice, charges, number }, i
                    ) in shops"
                    :key="i"
                    class="flex px-3 py-2"
                >
                    <view>
                        <image
                            class="w-16 h-16"
                            :src="rendImageSrc(picture)"
                        ></image>
                    </view>
                    <view class="pl-2 flex-1">
                        <view>
                            <view class="text-black flex">
                                <text class="">{{ name }}</text>
                                <text
                                    class="rounded-full text-red-500 ml-1 px-2 text-sm border-solid border-2 border-red-500"
                                >
                                    更改
                                </text>
                            </view>
                            <!-- 遍历 -->
                            <view
                                v-for="(item, k) in rendArr(charges)"
                                :key="k"
                                class="text-xs text-gray-400"
                            >
                                <text>x1</text>
                                {{ item }}
                            </view>
                        </view>
                        <view class="flex justify-between py-2">
                            <view class="text-red-500">
                                ￥<text class="text-2xl">
                                    {{ totalPrice * number }}
                                </text>
                            </view>
                            <view class="text-2xl">
                                <van-icon
                                    class="rounded-full border-solid border-1 border-red-500 text-red-500"
                                    name="minus"
                                    @click="changeNumber(id, 'sub')"
                                />
                                <text class="mx-3">{{ number }}</text>
                                <van-icon
                                    class="text-white bg-red-500 rounded-full addp"
                                    name="plus"
                                    @click="changeNumber(id, 'add')"
                                />
                            </view>
                        </view>
                    </view>
                </view>
            </template>
            <view v-else class="text-gray-500">没有数据</view>
            <view class="py-3 px-3" @click="show = false">
                <button class="bg-red-500 text-white" @click="toOrder">
                    下单
                </button>
            </view>
        </van-action-sheet>
    </view>
</template>

<style scoped>
.addp {
    padding: 3px;
}
</style>

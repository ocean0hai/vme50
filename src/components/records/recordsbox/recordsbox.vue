<script lang="ts" setup>
import { Api } from '@/utils/request';
const { rendImageSrc } = Api();
const emit = defineEmits(['delete']);
const { data } = defineProps<{
    data: any;
}>();
function deleteData() {
    emit('delete', data.id);
}
</script>

<template>
    <view class="py-2 mb-2">
        <view class="px-3 py-2">
            订单号:{{ data.id }}
            <text class="float-right">{{
                data.status === 0 ? '交易成功' : '未完成交易'
            }}</text>
        </view>
        <view>
            <view v-for="(it, i) in data.records" :key="i" class="mb-2 px-4">
                <view class="flex justify-between">
                    <view class="flex">
                        <image
                            class="h-16 w-16 rounded-xl"
                            :src="rendImageSrc(it.meals.picture)"
                        ></image>
                        <view class="w-60 ml-2">
                            <view class="h-auto text-xl text-black">
                                {{ it.meals.name }}
                            </view>
                            <view>x{{ it.number }}</view>
                        </view>
                    </view>
                    <view>
                        <view>￥{{ it.totalPrice }}</view>
                    </view>
                </view>
            </view>
        </view>
        <view class="px-4 py-2">
            地址:
            <text class="float-right">{{ data.address }}</text>
        </view>
        <view class="px-3 py-2">
            备注:
            <text class="float-right">{{ data.descr }}</text>
        </view>
        <view class="px-3 py-2">
            合计:
            <text class="float-right"
                >￥{{ (data.totalPrice / 100).toFixed(2) }}</text
            >
        </view>
        <view class="w-auto mx-10 h-5 mb-2">
            <button class="rounded-full text-xl" @click="deleteData">
                删除订单
            </button>
        </view>
    </view>
</template>

<style scoped></style>

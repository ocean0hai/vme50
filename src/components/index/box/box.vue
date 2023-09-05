<script lang="ts" setup>
import { Api } from '@/utils/request';
const { rendImageSrc } = Api();
const { data } = defineProps<{
    data: Array<any>;
}>();
</script>

<template>
    <view
        v-for="(item, k) in data"
        :key="k"
        class="flex justify-between mb-3 rounded-xl py-2 px-2 bg-white"
    >
        <image class="w-32 h-28 ml-2" :src="rendImageSrc(item.picture)">
        </image>
        <view class="w-32">
            <view class="text-right text-sm">
                <view class="whitespace-normal text-sm">
                    {{ item.name }}
                </view>
                <view class="text-red-600 text-sm">
                    ￥
                    <text class="text-2xl leading-0 -mx-1 z-20">
                        {{ (item.itemPrice / 100) * 1.0 }}
                    </text>
                    起
                </view>
            </view>
            <view class="w-full mt-1">
                <i-dialog :shop="item"></i-dialog>
            </view>
        </view>
    </view>
</template>

<style scoped></style>

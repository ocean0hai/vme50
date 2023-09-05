<script lang="ts" setup>
const { eattype } = defineProps<{
    eattype: string;
}>();

function toOrder() {
    uni.navigateTo({
        url: '/pages/records/index',
    });
}
function toAddress() {
    uni.navigateTo({
        url: '/pages/address/index',
    });
}
</script>

<template>
    <view class="flex justify-between px-4 py-2">
        <view class="flex">
            <view>
                <view class="text-white bg-black text-sm text-center">
                    到店
                </view>
                <view><van-icon size="30" name="shop-o" /></view>
            </view>
            <view class="pl-3">
                <view class="text-black text-xl">如皋78622177</view>
                <view v-if="eattype == ''" class="text-gray-500">
                    尽快取餐>
                </view>
                <view v-else
                    ><van-icon
                        class="text-red-500"
                        name="location-o"
                    />送餐地址：{{ eattype }}
                    <text
                        class="bg-red-500 rounded-full px-1"
                        @click="toAddress"
                        >修改</text
                    ></view
                >
            </view>
        </view>
        <view @click="toOrder"
            ><van-icon class="leading-loose" size="30" name="records"
        /></view>
    </view>
</template>

<style scoped></style>

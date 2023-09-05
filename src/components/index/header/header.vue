<script lang="ts" setup>
function toStr(str: string) {
    uni.navigateTo({
        url: `/pages/${str}/index`,
    });
}
</script>

<template>
    <view class="w-full flex justify-between py-2 px-3 bg-white">
        <view class="flex">
            <view class="text-5xl text-red-600" @click="toStr('login')">
                <van-icon name="shop-collect" />
            </view>
            <view>
                <view class="text-2xl">vme50订餐店</view>
                <view class="w-28 truncate text-gray-400 mt-2">
                    <van-icon
                        class="text-blue-500"
                        name="location"
                    />如皋市惠政路5号如皋fdasfsadfas
                </view>
            </view>
        </view>
        <view class="text-center pr-3" @click="toStr('address')">
            <van-icon size="40" name="location-o" />
            <view>地址管理</view>
        </view>
    </view>
</template>

<style scoped></style>

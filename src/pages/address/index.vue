<script lang="ts" setup>
import { AddressInfo } from '@/state';
const { addressArr, deleteData, chechBox } = AddressInfo();
</script>

<template>
    <view class="w-full bg-gray-100 h-screen">
        <view
            v-for="({ id, name, number, address, checked }, i) in addressArr"
            :key="i"
            class="px-3 mb-3 bg-white py-3 text-black"
        >
            <view class="flex justify-between">
                <view class="text-base">
                    {{ name }},<text class="ml-2">{{ number }}</text>
                </view>
                <view @click="deleteData(id)">
                    <van-icon size="20" name="delete-o" />
                </view>
            </view>
            <view class="my-2 break-words">{{ address }}</view>
            <van-divider />
            <view @click="chechBox(id)">
                <van-checkbox :value="checked">
                    {{ checked ? '已设默认地址' : '默认' }}
                </van-checkbox>
            </view>
        </view>
        <view class="w-auto mx-4">
            <a-form></a-form>
        </view>
    </view>
</template>

<style scoped></style>

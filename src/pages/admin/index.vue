<script lang="ts" setup>
import { ref } from 'vue';

const active = ref(0);
const menus = ref(['订单管理', '餐品分类', '餐品管理']);
</script>

<template>
    <view>
        <van-tabs v-model:active="active" swipeable>
            <van-tab v-for="(it, i) in menus" :key="i" :title="it">
                <view v-if="i === 1" class="bg-gray-50">
                    <ad-manageorders></ad-manageorders>
                </view>
                <view v-else-if="i === 0">
                    <ad-managetype></ad-managetype>
                </view>
                <view v-else>
                    <ad-mangemeals></ad-mangemeals>
                </view>
            </van-tab>
        </van-tabs>
    </view>
</template>

<style scoped></style>

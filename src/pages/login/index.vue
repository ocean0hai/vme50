<script lang="ts" setup>
import { UserInfo } from '@/state';
import { onMounted } from 'vue';
import { ref } from 'vue';
const { user, getUser } = UserInfo();
const passwd = ref('');
onMounted(async () => {
    await getUser();
});
function toManage() {
    if (user === 'oX7to5feaxGfmcmgZtSTfndEGCvk' && passwd.value === '123') {
        uni.navigateTo({
            url: '/pages/admin/index',
        });
        passwd.value = '';
    }
}
const test = ref('');
</script>

<template>
    <view class="mt-20 w-auto mx-10 py-4 drop-shadow-lg rounded-xl">
        <view class="text-3xl font-bold ml-2">登录</view>
        {{ test }}
        <view class="flex text-xl my-6">
            密码:<input
                v-model="passwd"
                class="ml-2 border-solid border-2 border-gray-300"
                type="text"
        /></view>
        <view class="w-auto mx-10">
            <button class="w-full" @click="toManage">登录</button>
        </view>
    </view>
</template>

<style scoped></style>

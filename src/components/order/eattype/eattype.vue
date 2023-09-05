<script lang="ts" setup>
import { ref } from 'vue';

const emit = defineEmits(['eatType']);
function onClick(str: number) {
    active.value = str;
    emit('eatType', str);
}
const active = ref(1);
const data = ref([
    {
        id: 1,
        title: '堂食',
        desc: '到店就餐',
        img: 'location-o',
    },
    {
        id: 0,
        title: '外卖',
        desc: '少接触\t更安心',
        img: 'logistics',
    },
]);
</script>

<template>
    <view class="grid grid-cols-2">
        <view
            v-for="({ id, title, desc, img }, i) in data"
            :key="i"
            :class="[active === id ? 'bg-gray-100' : '']"
            class="flex rounded-md mx-2 px-2 py-2 border-solid border-2 border-gray-400"
            @click="onClick(id)"
        >
            <view class="text-4xl mr-2"> <van-icon :name="img" /></view>
            <view>
                <view>{{ title }}</view>
                <view class="text-red-500">{{ desc }}</view>
            </view>
        </view>
    </view>
</template>

<style scoped></style>

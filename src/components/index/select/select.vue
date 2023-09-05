<script lang="ts" setup>
const { data } = defineProps<{
    data: any;
}>();
const emit = defineEmits(['changeCheck']);

function onClickCheck(name: string) {
    emit('changeCheck', {
        nameT: data.typeName,
        name: name,
        type: data.isMultipleChoice,
    });
}
</script>

<template>
    <view class="mb-3 pointer-events-auto">
        <view class="text-gray-500" @click="onClickCheck('---')">
            {{ data.typeName }}
        </view>
        <view class="container">
            <button
                v-for="({ name, price, checked }, i) in data.tags"
                :key="i"
                class="text-lg mx-2 mt-2"
                :class="[checked === true ? 'active' : 'noactive']"
                @click="onClickCheck(name)"
            >
                {{ name }}
                {{ price === 0 ? '' : '-' + price / 100 }}
            </button>
        </view>
    </view>
</template>

<style scoped>
.container {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
}
/* .container:last-child {
    margin-right: auto;
} */
/* 使用伪元素辅助左对齐 */
.container::after {
    content: '';
    flex: auto; /* 或者flex: 1 */
}
.active {
    background-color: white;
    border-style: solid;
    border-width: 2px;
    border-color: rgb(236 72 153);
    color: rgb(236 72 153);
}
.noactive {
    background-color: white;
    border-style: solid;
    border-width: 2px;
    border-color: rgb(217, 213, 215);
    color: rgb(159, 154, 157);
}
</style>

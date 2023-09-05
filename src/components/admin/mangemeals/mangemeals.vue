<script lang="ts" setup>
import { useGetdata } from '@/utils/userGetdata';
import { ref } from 'vue';
const { data } = useGetdata('/meals/getAll');
const num = ref(-1);
function onChange(i: number) {
    num.value = i;
}
</script>

<template>
    <view>
        <view class="grid grid-cols-5 text-center">
            <view class="w-16 px-3">选中</view>
            <view>名称</view>
            <view>类型</view>
            <view>是否多选</view>
            <view>价格</view>
        </view>
        <view class="box side-bar overflow-x-hidden overflow-y-auto">
            <view
                v-for="(it, i) in data"
                :key="i"
                class="grid grid-cols-5 text-center divide-y gap-0"
            >
                <view class="px-4">
                    <van-checkbox
                        class=""
                        :value="num === i"
                        @change="onChange(i)"
                    />
                </view>
                <view>{{ it.name }}</view>
                <view>{{ it.picture }}</view>
                <view>{{ it.itemPrice }}</view>
                <view>{{ it.price }}</view>
            </view>
        </view>
    </view>
</template>

<style scoped></style>

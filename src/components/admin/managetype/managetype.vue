<script lang="ts" setup>
import { useGetdata } from '@/utils/userGetdata';
import { ref } from 'vue';
const { data, deleteFun } = useGetdata('/mealsTag/getAll', '/mealsTag/delete');
const num = ref(3);
const show = ref(false);
const typeObj = ref({
    name: '',
    typeName: '',
    isMultipleChoice: '',
    price: 0,
});
function onChange(i: number) {
    if (i === num.value) {
        num.value = -1;
        typeObj.value = {
            name: '',
            typeName: '',
            isMultipleChoice: '',
            price: 0,
        };
    } else num.value = i;
}
//点击编辑时，执行赋值函数，
//当点击增加时，
</script>

<template>
    <view>
        <view class="flex justify-between">
            <view> </view>
            <view class="flex">
                <button size="mini" @click="deleteFun(data[num].id)">
                    删除
                </button>
                <ad-form v-model="show">
                    <view class="flex">名称:<input type="" /> </view>
                    <view class="flex">类型:<input type="" /> </view>
                    <view class="flex">选择类型:<input type="" /> </view>
                    <view class="flex">价格:<input type="number" /> </view>
                    <button
                        class="w-auto mx-12 mt-4 rounded-full"
                        size="mini"
                        @click="show = false"
                    >
                        确定
                    </button>
                </ad-form>
            </view>
        </view>

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
                <view>{{ it.typeName }}</view>
                <view>{{ it.isMultipleChoice }}</view>
                <view>{{ it.price }}</view>
            </view>
        </view>
    </view>
</template>

<style scoped>
.box {
    height: calc(100vh - 100px);
}

/* 隐藏滚动条 */
.side-bar::-webkit-scrollbar {
    display: none;
    z-index: 80;
}
</style>

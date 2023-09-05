<script lang="ts" setup>
import { useGetdata } from '@/utils/userGetdata';
import { ref } from 'vue';
const { data, deleteFun } = useGetdata(
    '/orderRecords/getAll',
    '/orderRecords/delete/',
);
const objArr: any = ref({
    id: '订单id',
    mealsId: '餐品id',
    orderId: '订单id',
    userId: '用户id',
    mealsTypeIds: '标签',
    number: '数量',
    itemPrice: '价格',
    totalPrice: '订单总价',
    descr: '备注',
});
</script>

<template>
    <view>
        <view
            class="box side-bar overflow-x-hidden overflow-y-auto bg-gray-100"
        >
            <view
                v-for="(it, i) in data"
                :key="i"
                class="px-3 py-2 mb-3 bg-white"
            >
                <view v-for="(item, k) in it" :key="k" class="grid grid-cols-2">
                    <view>{{ objArr[k] }}</view>
                    <view class="text-right">{{ item }}</view>
                </view>
                <view class="flex justify-between py-2">
                    <van-button
                        type="danger"
                        class="px-2"
                        size="20"
                        @click="deleteFun(it.id)"
                    >
                        取消订单
                    </van-button>
                    <van-button type="primary" class="ml-2 px-2" size="20">
                        完成订单
                    </van-button>
                </view>
            </view>
        </view>

        <!-- <van-cardj
            num="2"
            price="10.00"
            desc="描述信息"
            title="商品标题"
            thumb="fasdf"
        >
        </van-cardj> -->
    </view>
</template>

<style scoped>
.box {
    height: calc(100vh - 50px);
}
.side-bar::-webkit-scrollbar {
    display: none;
    z-index: 80;
}
</style>

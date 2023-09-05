<script lang="ts" setup>
import { computed } from 'vue';
import { ref } from 'vue';
import { UserInfo, AddressInfo } from '@/state';
const { addressArr } = AddressInfo();
import { Api } from '@/utils/request';
const { shops, user } = UserInfo();
const { post } = Api();
console.log(post, user);
function onSubmit() {
    const orderObj = {
        userId: user,
        totalPrice: totals.value,
        status: 0,
        type: eattype.value,
        address: addressStr(),
        descr: notes.value,
        records: GenerateOrder(),
    };
    if (shops.length == 0) {
        test.value = '54234523';
        return;
    }
    post('/order/insertByRecords', orderObj)
        .then((res) => {
            shops.length = 0;
            uni.navigateTo({
                url: '/pages/records/index',
            });
            console.log(res);
        })
        .catch((err) => {
            console.log(err);
        });
}
function GenerateOrder() {
    const arr: Array<any> = [];
    shops.map((item: any) => {
        arr.push({
            mealsId: item.id,
            userId: user,
            mealsTypeIds: rendStr(item.charges), //标签id集合
            number: item.number,
            itemPrice: item.itemPrice,
            totalPrice: item.totalPrice,
        });
    });

    return arr;
}
function rendStr(charges: Array<any>) {
    let str = '';
    charges.map((item) => {
        item.tags.map((it: any) => {
            if (it.checked) {
                str += it.id + ',';
            }
        });
    });
    return str.slice(0, -1);
}
function addressStr() {
    let i = 0;
    addressArr.map((item, k) => {
        if (item.checked === true) {
            i = k;
        }
    });
    return eattype.value === 0 ? addressArr[i].address : '';
}
const totals = computed(() => {
    let num = 0;
    shops.map((item) => {
        num += item.totalPrice;
    });
    return num * 100;
});

function eatTypefun(str: number) {
    eattype.value = str;
}
const eattype = ref(1);
const notes = ref('');
const test = ref();
</script>

<template>
    <view class="bg-gray-200">
        <view class="rounded-lg bg-white mb-2 pb-2">
            <o-orderhead :eattype="addressStr()"></o-orderhead>
            <o-eattype @eat-type="eatTypefun"></o-eattype>
            <view class="flex px-4 py-2">
                备注：<input v-model="notes" type="text" />
            </view>
            {{ test }}
        </view>
        <o-orderbox :data="shops"> </o-orderbox>

        <van-submit-bar
            :price="totals"
            button-text="提交订单"
            @submit="onSubmit"
        />
    </view>
</template>

<style scoped></style>

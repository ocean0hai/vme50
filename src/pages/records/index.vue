<script lang="ts" setup>
import { UserInfo } from '@/state';
import { onMounted } from 'vue';
import { Api } from '@/utils/request';
import { ref } from 'vue';
const { user } = UserInfo();
const { get, deleteOrder } = Api();
const data = ref();
onMounted(() => {
    getData();
});
async function getData() {
    await get(`/order/getByUserId/${user}`)
        .then((res) => {
            data.value = res;
        })
        .catch((err) => {
            console.log(err);
        });
}
async function deleteDta(id: string) {
    await deleteOrder(`/order/delete/${id}`).then((res) => {
        console.log(res);
    });
    await getData();
}
</script>

<template>
    <view class="w-full h-screen bg-gray-50">
        <view v-for="(item, i) in data" :key="i" class="bg-white rounded-2xl">
            <r-recordsbox :data="item" @delete="deleteDta"></r-recordsbox>
        </view>
    </view>
</template>

<style scoped></style>

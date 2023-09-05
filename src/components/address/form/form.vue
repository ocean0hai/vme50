<script lang="ts" setup>
import { ref } from 'vue';
const show = ref(false);
import { AddressInfo } from '@/state';
const { addData } = AddressInfo();

function submitData() {
    const obj = {
        id: '' + Math.floor(Math.random() * 100),
        name: name.value,
        number: number.value,
        address: address.value,
    };
    addData(obj);
    show.value = false;
}
console.log(addData);
const name = ref('');
const number = ref('');
const address = ref('');
</script>

<template>
    <view>
        <button
            class="bg-green-500 w-full"
            @click="
                () => {
                    show = true;
                }
            "
        >
            +
        </button>
        <view v-if="show" class="mask">
            <view class="modal-overlay" @click="show = false"> </view>

            <view class="centerbox">
                <view class="flex leading-loose">
                    <text class="text-xl w-32">名字:</text>
                    <input v-model="name" class="h-7 w-full" />
                </view>
                <view class="flex leading-loose">
                    <text class="text-xl w-32">号码:</text>
                    <input v-model="number" class="h-7 w-full" />
                </view>
                <view class="flex leading-loose">
                    <text class="text-xl w-32">详细地址:</text>
                    <input v-model="address" class="h-7 w-full" />
                </view>
                <button
                    class="w-auto mx-12 mt-4 rounded-full"
                    @click="submitData"
                >
                    确定
                </button>
            </view>
        </view>
    </view>
</template>

<style scoped>
.mask {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(179, 175, 175, 0.5);
    pointer-events: auto; /**值为auto：不会触发，值为none：点击后面的事件会触发事件 */
    z-index: 30;
}
.modal-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
}
.mask .centerbox {
    width: 85%;
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    padding: 20px;
    background: #ffffff;
    border-radius: 10px;
    pointer-events: auto;
    z-index: 40;
}
</style>

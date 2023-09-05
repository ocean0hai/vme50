<script lang="ts" setup>
import { computed } from 'vue';
const props = defineProps(['modelValue']);
const emit = defineEmits(['update:modelValue']);
const value = computed({
    get() {
        return props.modelValue;
    },
    set(value) {
        emit('update:modelValue', value);
    },
});
</script>

<template>
    <view>
        <button
            class="bg-blue-500 w-10 h-10 leading-loose"
            @click="
                () => {
                    value = true;
                }
            "
        >
            +
        </button>
        <view v-if="value" class="mask">
            <view class="modal-overlay" @click="value = false"> </view>
            <view class="centerbox">
                <slot></slot>
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

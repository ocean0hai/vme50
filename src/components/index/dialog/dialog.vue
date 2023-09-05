<script lang="ts" setup>
import { ref } from 'vue';
import { UserInfo } from '@/state';
import { computed } from 'vue';
import { onMounted } from 'vue';
import { Api } from '@/utils/request';
const { get } = Api();
const { addShops } = UserInfo();

const { shop } = defineProps<{
    shop: any;
}>();

async function getData(id: string) {
    await get(`/mealsTag/getByMealsId/${id}`).then((res: any) => {
        charges.value = res;
        test.value = charges.value.length;
        initData();
    });
}
onMounted(() => {
    //'1710911489'
    getData(shop.id);
});
const show = ref(false);
const charges = ref<any>([]);
function initData() {
    for (let i = 0; i < charges.value.length; i++) {
        test.value = 4;
        const { tags, isMultipleChoice } = charges.value[i];
        for (let k = 0; k < tags.length; k++) {
            if (isMultipleChoice === 0 && k === 0) {
                charges.value[i].tags[k].checked = true;
            } else {
                charges.value[i].tags[k].checked = false;
            }
        }
    }
}
const total = computed(() => {
    let num = 0;
    charges.value.map((item: any) => {
        item.tags.map((it: any) => {
            if (it.checked && it.price !== 0) num += it.price;
        });
    });
    num += typeof shop.itemPrice === 'number' ? shop.itemPrice : 0;
    return num / 100;
});

function changeChecked(obj: any) {
    const { nameT, name, type } = obj;
    const { xT, yS } = findName(nameT, name);
    if (type === 0) {
        Radio(xT);
    }
    charges.value[xT].tags[yS].checked = !charges.value[xT].tags[yS].checked;
}
function Radio(xT: number) {
    charges.value[xT].tags.forEach((item: any) => {
        item.checked = false;
    });
}
function findName(nameT: string, name: string) {
    let xT = 0;
    let yS = 0;
    for (let i = 0; i < charges.value.length; i++) {
        const { typeName, tags } = charges.value[i];
        for (let k = 0; k < tags.length; k++) {
            if (nameT === typeName && name === tags[k].name) {
                xT = i;
                yS = k;
            }
        }
    }
    return { xT, yS };
}
const test = ref();
</script>

<template>
    <view>
        <button
            class="bg-red-600 float-right text-white w-20 text-sm py-2"
            @click="show = !show"
        >
            选规格
        </button>
        <view v-if="show" class="mask">
            <view class="modal-overlay" @click="show = false"></view>
            <view class="centerbox">
                <view class="w-full text-xl font-bold text-black text-center">
                    {{ shop.name }}
                </view>
                <i-select
                    v-for="(item, i) in charges"
                    :key="i"
                    :data="item"
                    @change-check="changeChecked"
                ></i-select>
                <view class="flex justify-between mt-5">
                    <view class="h-full leading-loose text-pink-500 text-xl">
                        ￥{{ total.toFixed(2) }}
                    </view>
                    <view>
                        <button
                            class="bg-pink-500 text-white"
                            @click="
                                () => {
                                    addShops({
                                        ...shop,
                                        totalPrice: total,
                                        charges: charges,
                                    });
                                    show = false;
                                }
                            "
                        >
                            加入购物车
                        </button>
                    </view>
                </view>
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

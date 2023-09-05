import { defineStore } from 'pinia';
import { ref } from 'vue';
export const UserInfo = defineStore('UserInfo', () => {
    const shops = ref<Array<any>>([]);
    const user = ref();
    function addShops(obj: any) {
        obj.number = 1;
        shops.value.push(obj);
    }
    function deleteData(id: string) {
        let k = 0;
        if (id === 'empty') {
            shops.value.splice(0, shops.value.length);
        }
        for (let i = 0; i < shops.value.length; i++) {
            if (shops.value[i].id === id) {
                k = i;
            }
        }
        shops.value.splice(k, k + 1);
    }
    function changeNumber(id: string, operate: string) {
        shops.value.forEach((item) => {
            if (id === item.id) {
                if (operate === 'add') {
                    item.number += 1;
                } else {
                    item.number -= 1;
                    if (item.number === 0) {
                        deleteData(id);
                    }
                }
            }
        });
    }

    //获取用户信息
    function getUser() {
        // 调用登录接口获取 code
        uni.login({
            provider: 'weixin',
            success: (res) => {
                if (res.code) {
                    // 使用 code 换取 session_key 和 openid
                    getSessionKeyAndOpenid(res.code);
                }
            },
            fail: (err) => {
                console.log(err);
            },
        });
    }
    function getSessionKeyAndOpenid(code: string) {
        uni.request({
            url: 'https://api.weixin.qq.com/sns/jscode2session',
            method: 'GET',
            data: {
                appid: 'wx512506a8ddbc6068',
                secret: 'dfdd9bbd06924119a75c8246f88e9de7',
                js_code: code,
                grant_type: 'authorization_code',
            },
            success: (res: any) => {
                if (res.data.openid) {
                    // 获取到 openid
                    const openid = res.data.openid;
                    user.value = openid;
                }
            },
            fail: (err) => {
                console.log(err);
            },
        });
    }
    //   oX7to5feaxGfmcmgZtSTfndEGCvk

    return {
        shops,
        user,
        getUser,
        changeNumber,
        addShops,
        deleteData,
    };
});

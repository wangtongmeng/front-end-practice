<template>
    <div class="home-header">
        <img src="@/assets/logo.png" alt="">
        <van-dropdown-menu>
            <van-dropdown-item :modelValue="category" :options="options" @change="change"/>
        </van-dropdown-menu>
    </div>
</template>
<script lang="ts">
import { defineComponent, PropType, reactive, toRefs } from 'vue'
import { CATOGORY_TYPES } from '../../typings'

export default defineComponent({
    props: {
        category: {
            type: Number as PropType<CATOGORY_TYPES> // 提示作用
        }
    },
    emits: ['setCurrentCategory'], // 为了提示作用的
    setup(props, context) {
        let state = reactive({
            options: [
                { text: '全部课程', value: CATOGORY_TYPES.ALL },
                { text: 'react课程', value: CATOGORY_TYPES.REACT },
                { text: 'vue课程', value: CATOGORY_TYPES.VUE },
                { text: 'node课程', value: CATOGORY_TYPES.NODE }
            ]
        })
        function change(value: CATOGORY_TYPES) {
            context.emit('setCurrentCategory', value)
        }

        return {
            ...toRefs(state),
            change
        }
    }
})
</script>
<style lang="scss">
    .home-header {
        height: 65px;
        background: #2a2a2a;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 2.5%;
        position: fixed;
        top:0;
        left: 0;
        width: 95%;
        img {
            height: 50%;
        }
        .van-dropdown-menu__title {
            color: #fff;
        }
        .van-dropdown-menu__bar {
            background: #2a2a2a;
        }
    }
</style>
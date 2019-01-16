<template>
    <div class="components-dynamic-async">
        <Page>
            <template slot="page-title">components-dynamic-async</template>
            <PageItem>
                <span slot="page-item-title">多标签的界面中使用 is 特性来切换不同的组件</span>
                <div slot="page-item-content">
                    <div class="tab">
                        <button @click="tabComponent('Component1')">component1</button>
                        <button @click="tabComponent('Component2')">component2</button>
                    </div>
                    <div class="content">
                        <component :is="activeComponent"></component>
                    </div>
                </div>
            </PageItem>
            <PageItem>
                <span slot="page-item-title">多标签的界面中使用 is 特性来切换不同的组件</span>
                <div slot="page-item-content">
                    <div class="tab">
                        <button @click="tabComponent('Component1')">component1</button>
                        <button @click="tabComponent('Component2')">component2</button>
                    </div>
                    <div class="content">
                        <component :is="activeComponent"></component>
                    </div>
                </div>
            </PageItem>
        </Page>
    </div>
</template>
<script>
import Page from "common/Page";
import PageItem from "common/PageItem";
import Component1 from "./components/component1";
import Component2 from "./components/component2";
export default {
    name: "ComponentsDynamicAsync",
    components: {
        Component1,
        Component2,
        Page,
        PageItem
    },
    data() {
        return {
            activeComponent: "Component1"
        };
    },
    methods: {
        tabComponent(name) {
            this.activeComponent = name;
        }
    }
};
</script>
<style lang="less" scoped>
.components-dynamic-async {
    .tab {
        display: flex;
        button {
            margin: 0 5px;
            padding: 2px;
        }
        .content {
            width: 200px;
            height: 200px;
            border: 1px solid red;
        }
    }
}
</style>

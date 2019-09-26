<template>
<div class='about'>
    <h1>This is an about page</h1>

    <Navigation />

    <div class="module-box">
        <div class="head">
            <span class="title">资产负债情况</span>
            <div class="mode">
                <span class="span">2019年1月～7月</span>
            </div>
        </div>
        <div class="body">
            <Tips :current="{number:'986.03',times:'2018年7月-2019年7月'}" :past="{number:'686.03',times:'2017年7月-2018年7月'}" />
            <ProfitData />
        </div>
    </div>

    <Head title="营业收入" />

</div>
</template>

<style lang="less">
.module-box {
    position: relative;
    width: 375px;
    margin: auto;
    background: rgba(255, 255, 255, 1);

    .head {
        text-align: left;
        position: relative;
        padding: 18px 16px;
        display: flex;
        align-items: center;
        justify-content: space-between;

        &::before {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            margin: auto;
            content: " ";
            width: 343px;
            height: 1px;
            background: rgba(235, 235, 235, 1);
        }

        .title {
            font-size: 16px;
            font-family: PingFangSC-Semibold;
            font-weight: 600;
            color: rgba(1, 11, 23, 1);
        }

        .span {
            font-size: 12px;
            font-family: PingFangSC-Semibold;
            font-weight: 600;
            color: rgba(142, 142, 142, 1);
        }
    }

    .body {
        margin: 16px auto;
    }
}
</style>

<script lang="ts">
import {
    Component,
    Prop,
    Vue,
} from 'vue-property-decorator';

import Navigation from '../components/Navigation/Navigation.vue';
import Tips from '../components/Tips/Tips.vue';
import Head from '../components/CricleHead/Head.vue';
import ProfitData from './ProfitData.vue';

import utils from '../libs/utils';

@Component({
    components: {
        Navigation,
        Tips,
        Head,
        ProfitData,
    },
})
export default class About extends Vue {

    private msg!: string;

    public onCreate() {
        console.log(Number('1'));
    }

    protected mounted() {
        this.onCreate();
    }

}
</script>

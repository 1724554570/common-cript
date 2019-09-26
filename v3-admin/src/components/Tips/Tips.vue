<template>
<div class="tips-box">
    <div class="content">
        <div class="title">今年累计</div>
        <div class="number">{{currentYear.number}}</div>
        <div class="times">{{currentYear.times}}</div>
    </div>
    <div class="content">
        <div class="title">往年同期</div>
        <div class="number">{{pastYear.number}}</div>
        <div class="times">{{pastYear.times}}</div>
    </div>
</div>
</template>

<script>
export default {
    name: 'tips',
    props: {
        current: {
            type: Object,
            default() {
                return {};
            },
        },
        past: {
            type: Object,
            default() {
                return {};
            },
        },
    },
    data() {
        return {
            number: 1,
            currentYear: {},
            pastYear: {},
        };
    },
    methods: {},
    created() {
        this.currentYear = this.current;
        this.pastYear = this.past;
    },
};
</script>

<style lang="less" scoped>
.tips-box {
    width: 345px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 0px 5px 0px rgba(1, 11, 23, 0.1);
    border-radius: 4px;
    margin: auto;
    display: flex;
    padding: 14px 0;
    text-align: left;
    // box-sizing: border-box;

    .content {
        width: 50%;
        padding-left: 16px;
        overflow: hidden;
    }

    .title {
        font-size: 12px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(142, 142, 142, 1);
    }

    .number {
        font-size: 24px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(255, 71, 71, 1);
        margin: 10px 0;
    }

    .times {
        font-size: 12px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(1, 11, 23, 1);
    }
}
</style>

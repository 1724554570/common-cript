<template>
<div class="ProfitData-box">
    <div class="profit-view">
        <div class="profit-view-coll" v-for="(item,index) in arrayData" :key="index">
            <div class="department">{{item.name}}</div>
            <div class="totalcount">362,271.00</div>
            <div class="percent">3.00%</div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            arrayData: [{
                name: '经纪业务部',
            }, {
                name: '前海分公司',
            }, {
                name: '投资银行事业部',
            }, {
                name: '中小企业融资总部',
            }],
        };
    },
    methods: {},
};
</script>

<style lang="less" scoped>
.ProfitData-box {
    width: 343px;
    margin: auto;

    .profit-view {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        text-align: left;
    }

    .profit-view-coll {
        width: 107px;
        min-height: 72px;
        background: rgba(255, 255, 255, 1);
        border-radius: 4px;
        border: 1px solid rgba(235, 235, 235, 1);
        padding: 8px;
        box-sizing: border-box;
        margin-bottom: 10px;
    }

    .department {
        font-size: 12px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(142, 142, 142, 1);
    }

    .totalcount {
        font-size: 16px;
        font-family: PingFangSC-Semibold;
        font-weight: 600;
        color: rgba(1, 11, 23, 1);
        margin: 6px 0;
    }

    .percent {
        font-size: 12px;
        font-family: PingFangSC-Semibold;
        font-weight: 600;
        color: rgba(255, 71, 71, 1);

        &.down {
            color: rgba(1, 207, 85, 1);
        }
    }
}
</style>

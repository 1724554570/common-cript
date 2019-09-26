<template>
<div class="head-box">
    <span class="cricle" :class="styles"></span>
    <span class="title">{{title}}</span>
</div>
</template>

<script>
export default {
    props: {
        styles: {
            type: String,
            default: '',
        },

        title: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            style: '',
        };
    },
};
</script>

<style lang="less">
.head-box {
    display: flex;
    align-items: center;
    line-height: 20px;

    .cricle {
        width: 10px;
        height: 10px;
        border: 2px solid rgba(0, 123, 254, 1);
        border-radius: 50%;
        display: inline-block;

        &.business {
            border: 2px solid rgba(255, 238, 48, 1);
        }

        &.profit {
            border: 2px solid rgba(251, 137, 66, 1);
        }

        &.roe {
            border: 2px solid rgba(251, 137, 66, 1);
        }
    }

    .title {
        font-size: 14px;
        font-family: PingFangSC-Semibold;
        font-weight: 600;
        color: rgba(1, 11, 23, 1);
        padding-left: 8px;
    }
}
</style>

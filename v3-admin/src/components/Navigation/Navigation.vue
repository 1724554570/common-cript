<template>
<div class="nav-box hidden">
    <div class="content">
        <div class="nav-left">
            <template v-for="(item,index) in navListArray">
                <div :key="index" class="nav-line" :class="item.id==navCur?'active':''" @click="navChange(item.id)">{{item.name}}</div>
            </template>
        </div>
        <div class="nav-right">
            <template v-for="(item,index) in childArray">
                <div :key="index" class="nav-rline" :class="item.id==navCur2?'active':''" @click="nav2Change(item.id)">{{item.name}}</div>
            </template>
        </div>
    </div>
    <div class="mask"></div>
</div>
</template>

<style lang="less">
.nav-box {
    .content {
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 2;
        display: flex;
        justify-items: start;
        background: rgba(255, 255, 255, 1);
        font-size: 14px;
        text-align: left;
    }

    .nav-left {
        width: 50%;
    }

    .nav-line {
        cursor: pointer;
        line-height: 44px;
        height: 44px;
        padding-left: 16px;
        background: rgba(245, 247, 249, 1);

        &.active {
            background: rgba(255, 255, 255, 1);
        }
    }

    .nav-right {
        width: 50%;
    }

    .nav-rline {
        cursor: pointer;
        line-height: 44px;
        height: 44px;
        background: rgba(255, 255, 255, 1);
        position: relative;
        padding-left: 16px;

        &.active {
            color: #007bfe;
        }

        &::before {
            content: " ";
            width: 171px;
            height: 1px;
            background: rgba(235, 235, 235, 1);
            position: absolute;
            bottom: 0;
        }

        &:last-child {
            &::before {
                visibility: hidden;
            }
        }
    }

    .icon {
        visibility: hidden;
    }

    .active {
        .icon {
            visibility: visible;
        }
    }

    .mask {
        position: fixed;
        z-index: 1;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        background: rgba(0, 0, 0, 0.5);
    }
}

.hidden {
    display: none;
}
</style>

<script>
import navList from './navList';
export default {
    name: 'navigation',
    props: {
        current: {
            type: Number,
            default: 1,
        },
        secondsCur: {
            type: Number,
            default: 11,
        },
    },
    data() {
        return {
            navListArray: navList,
            childArray: [],
            navCur: 1,
            navCur2: 11,
        };
    },
    methods: {
        navChange(id) {
            this.navCur = id;
            this.childArray = this.navListArray[this.navCur] && this.navListArray[this.navCur].children;
        },
        nav2Change(id) {
            this.navCur2 = id;
        },
    },
    created() {
        if (this.current) {
            this.navCur = this.current;
        }
        if (this.secondsCur) {
            this.navCur2 = this.secondsCur;
        }
        this.childArray = this.navListArray[this.navCur] && this.navListArray[this.navCur].children;
    },
    // mounted() { },
};
</script>

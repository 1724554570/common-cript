<template>
<div class="auth-modal-box">
    <form class="auth-form">
        <div class="panfish">
            <!-- <img src="https://b-gold-cdn.xitu.io/v3/static/img/normal.0447fe9.png" class="normal" style=""> -->
            <!-- <img src="https://b-gold-cdn.xitu.io/v3/static/img/greeting.1415c1c.png" class="greeting" style="display: none;"> -->
            <!-- <img src="https://b-gold-cdn.xitu.io/v3/static/img/blindfold.58ce423.png" class="blindfold" style="display: none;"> -->
        </div>
        <i title="关闭" class="close-btn ion-close-round"></i>
        <div class="panel">
            <h1 class="title">登录</h1>
            <!---->
            <div class="input-group">
                <div class="input-box"><input name="loginPhoneOrEmail" maxlength="64" placeholder="请输入手机号或邮箱" class="input"></div>
                <div class="input-box"><input name="loginPassword" type="password" maxlength="64" placeholder="请输入密码" class="input"></div>
            </div>
            <button class="btn">登录</button>
            <div class="prompt-box">
                <span>没有账号？</span> <span class="clickable">注册</span>
            </div>
        </div>
        <div class="oauth-box">
            <div class="hint">第三方账号登录：</div>
            <div class="oauth">
                <div class="oauth-bg"><img title="微博" alt="微博" src="https://b-gold-cdn.xitu.io/v3/static/img/weibo.fa758eb.svg" class="oauth-btn"></div>
                <div class="oauth-bg"><img title="微信" alt="微信" src="https://b-gold-cdn.xitu.io/v3/static/img/wechat.e0ff124.svg" class="oauth-btn"></div>
                <div class="oauth-bg"><img title="GitHub" alt="GitHub" src="https://b-gold-cdn.xitu.io/v3/static/img/github.547dd8a.svg" class="oauth-btn"></div>
            </div>
        </div>
    </form>
</div>
</template>

<style lang="less" scoped>
@import './style.less';
</style>

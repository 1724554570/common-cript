import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
// rest = { path: '/protected' }
// 自己定义的一个Router组件,来实现路由拦截功能
// component: Component,将props中的component解构赋值出来并且实施重命名,应为下面是要作为组件使用
// ...rest 是接受剩下的元素

interface Props {
    exact?: boolean,
    path: string,
    component: any,
    [key: string]: any;
}

interface Auth {
    authentication: boolean,
}

const PrivateRoute = ({ exact, path, component: Component, }: Props) => {

    const fakeAuth = { authentication: true };

    return (
        <Route
            render={
                //这里的props是路由三prop
                props =>
                    // 登录对象集合中的登录状态
                    fakeAuth.authentication ? (
                        // 为true 就显示该组件
                        <Component {...props} />
                    ) : (
                            <Redirect
                                // 登录状态为false时重定向到登录页面
                                to={{
                                    pathname: "/login",
                                    state: { from: props.location }
                                }}
                            />
                        )
            }
        />
    )
};
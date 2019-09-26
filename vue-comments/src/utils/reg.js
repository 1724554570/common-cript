/**
 * 只能输入字母和下横线的正则表达式
 */ 
export const regExp_az = /[^_a-zA-Z;]/g;

export let aa = function(params){
    let string = Object.keys(params).sort().map(key=> `${key.toLowerCase()}=${params[key]}`).join('&');
    console.log(string);
}
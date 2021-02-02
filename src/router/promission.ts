import router from './index';
// import Axios from '@/plugins/axios'
import store from '../store';
// import properties from "@/plugins/properties";
import qs from 'qs';
import vuetify from '@/plugins/vuetify';
import Vue from 'vue';


router.beforeEach(async (to, from, next) => {
    // 监听浏览器的暗色主题
    // if (router.app.$vuetify) {
    // 	router.app.$vuetify.theme.dark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    // }
    /*if (to.path != '/login') {
        store.dispatch('PREVIOUS_PAGE', to.fullPath);
    }
    let isLogin_web = store.state.isLogin;
    let isLogin = false;
    let isOpenByWechat = properties.runWithWechat;
    // 判断用户的登录状态
    let res = await Axios.post(properties.url.isLogin);
    if (res.data.code === 0) {
        if (isLogin_web == 'Y') {
            isLogin = true;
        }
    }

    let code = to.query.code;
    let state = to.query.state;
    if (to.meta.wechat_login && !isLogin && isOpenByWechat) {
        if (code && state) {
            // 微信登录
            let res = await Axios.post(
                properties.url.login,
                qs.stringify({code: code, state: state, userType: 'user'})
            );
            if (res.data.code === 0) {
                store.dispatch('LOGIN_SUCCESS', res.data);
                console.info("登录成功");
            } else {

            }
        } else {
            console.info(`router${to.fullPath}`)
            console.info(to.fullPath);
            // 获取微信登录链接
            window.location.href = properties.url.getWechatLoginCode + 'url=' + encodeURI(to.fullPath);
            next(false);
            return;
        }
    }

    if (to.meta.pc_login && !isLogin && !isOpenByWechat) {
        next({path: '/login'});
        return;
    }

    // 渠道进入三方商品页面增加yaid和yacode
    if (to.path == '/productView') {
        let yaid = store.state.userId, yacode = properties.defaultYacode, linkUrl = to.query.linkUrl;
        if (to.query.from != 'current') {
            if (to.query.yaid) {
                yaid = to.query.yaid;
            }
            if (to.query.yacode) {
                yacode = to.query.yacode;
            }
            // 去后台查询产品外链，如果有外链 则进入外链
            let res = await Axios.post(
                properties.url.findProductById,
                qs.stringify({productId: to.query.productId})
            )
            if (res.data.code == 0) {
                linkUrl = res.data.result.linkUrl;
            }
        }
        if (linkUrl) {
            // 此处自动拼接一个yachannelcode，格式为yaid(用户唯一表示)_yacode(渠道标识)
            // 三方平台请求这个产品的时候需要携带yaid(用户唯一表示)和yacode(渠道标识)这两个参数，分别代表三方的用户id和三方的渠道编码
            // 如果没传，则默认使用当前系统登录用户的用户id和“yuanan”
            var reg = RegExp(/\?/g);
            linkUrl += reg.exec(linkUrl) ? ('&yachannelcode=' + yaid + '_' + yacode) : ('?yachannelcode=' + yaid + '_' + yacode);

            //--------------------------------------------------------
            // 这里的目的是为了判断当前请求的三方地址是不是本项目的页面，如果是则加上远安的productId。为了配置复星联合的产品。其他产品暂时没用到
            let host = window.location.host;
            let urlHost = extractHostname(linkUrl);
            if (host == urlHost) {
                linkUrl += "&yuananProductId=" + to.query.productId;
            }
            //--------------------------------------------------------
            window.location.href = linkUrl;
            next(false);
            return;
        }
    }*/
    next();
});

// 从地址中提取host和port
function extractHostname(url: string) {
    var hostname;
    if (url.indexOf("//") > -1) {
        hostname = url.split('/')[2];
    } else {
        hostname = url.split('/')[0];
    }
    // hostname = hostname.split(':')[0];
    hostname = hostname.split('?')[0];
    return hostname;

}

router.afterEach(() => {
});

const server_ip = "192.168.0.106";
// const server_ip = "101.200.207.172";
const server_port = "80";
// const server_port = "9002";
const server_contextPath = "/operate"

// /view 服务器地址


function spliceUrl(url: string) {
    return "http://" + server_ip + ":" + server_port + server_contextPath + url;
}

const properties = {
    ip: server_ip,
    port: server_port,
    url: {
        checkLogin: spliceUrl("/separation/private/login/checkLogin"),
        goSystemAjaxMenu: spliceUrl("/separation/private/login/goSystemAjaxMenu"),
        listFunctionsForManager: spliceUrl("/separation/private/login/listFunctionsForManager"),
        goFunctionList: spliceUrl("/private/system/power/goFunctionList?method=goAllAjaxList"),
        showPic: spliceUrl("/private/common/manage/showPic/"),


        listGuideWechats: spliceUrl('/private/wechat/manage/listGuideWechats?method=ajax'),
        saveGuideWechat: spliceUrl('/private/wechat/manage/saveGuideWechat?method=ajax'),
        deleteGuideWechat: spliceUrl('/private/wechat/manage/deleteGuideWechat?method=ajax'),

    },

}

export default properties;

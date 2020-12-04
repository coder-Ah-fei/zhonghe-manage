const server_ip = "127.0.0.1";
// const server_ip = "101.200.207.172";
const server_port = "80";
// const server_port = "9002";
const server_contextPath = "/operate"

// /view 服务器地址


function spliceUrl(url) {
    return "http://" + server_ip + ":" + server_port + server_contextPath + url;
}

const properties = {
    ip: server_ip,
    port: server_port,
    url: {
        checkLogin: spliceUrl("/separation/private/login/checkLogin"),
        goSystemAjaxMenu: spliceUrl("/separation/private/login/goSystemAjaxMenu"),
        showPic: spliceUrl("/private/common/manage/showPic/"),
    },

}

export default properties;

/**

 @Name：全局配置文件
 @Author 顾力华

 */

layui.define(['layer', 'element', 'util'], function (exports) {
    exports('cfg', {
        name: '羊了个羊'
        , version:'1.0.0'
        , tableName: 'sheep' //本地存储表名

        , debug: true //是否开启调试模式。如开启，接口异常时会抛出异常 URL 等信息

        , timeout : 30000
        , loopTime : 100 //循环调接口间隔(毫秒)


        , initToken : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTQ1MTkwNjYsIm5iZiI6MTY2MzQxNjg2NiwiaWF0IjoxNjYzNDE1MDY2LCJqdGkiOiJDTTpjYXRfbWF0Y2g6bHQxMjM0NTYiLCJvcGVuX2lkIjoiIiwidWlkIjoyODQzOTQzMywiZGVidWciOiIiLCJsYW5nIjoiIn0.OnS2_7pv9rKVWqRWZdR54bM3IDVWAVesi4ecTP2IU8Q"


        , userInfoUrl : "https://cat-match.easygame2021.com/sheep/v1/game/user_info"
        , loginTouristUrl : "https://cat-match.easygame2021.com/sheep/v1/user/login_tourist"
        , defaultGameUrl : "https://cat-match.easygame2021.com/sheep/v1/game/game_over"
        , topicGameUrl : "https://cat-match.easygame2021.com/sheep/v1/game/topic_game_over"

        //自定义请求字段
        , request: {
            tokenName: 'access_token' //自动携带 token 的字段名。可设置 false 不携带。
            , refreshTokenName: 'refresh_token' //自动携带 refresh token 的字段名。
            , refreshAccessTokenName: 'refresh_access_token' // 当access_token过期时，后端返回的新token名
            , loginIdSecret: 'login_id_secret' //用戶登录OID的 key(加密过后)
            , loginIdKey: 'login_id' //用戶登录ID的KEY
            , type: 'string' //string 或者 json。默认json
        }

        //自定义响应字段
        , response: {
            statusName: 'err_code' //数据状态的字段名称
            , statusCode: {
                ok: 0 //数据状态一切正常的状态码
                , authFailed: 10003 //没有权限， 一般是token错误导致
            }
            , msgName: 'err_msg' //状态信息的字段名称
            , dataName: 'data' //数据详情的字段名称
        }

    });
});

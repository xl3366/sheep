/**

 @Name: 工具js
 @Author:gulh

 */

layui.extend({
    cfg: "./static/js/config"
}).define(["form", "cfg"], function (exports) {
    var $ = layui.$
        , layer = layui.layer
        , form = layui.form
        , cfg = layui.cfg
    ;


    //成功提示
    alertSuccess = function (title = '提示', msg = '') {
        layer.msg(msg, {
            title: title
            , time: 1000
            , icon: 6
            , offset: '10%'
        });
    }
    //警告提示
    alertWarning = function (title = '警告', msg = '') {
        layer.msg(msg, {
            title: title
            , time: 1000
            , icon: 7
            , offset: '10%'
        });
    }


    //失败提示
    alertFail = function (title = '错误提示', msg = '', input_dom) {
        layer.msg(msg, {
            title: title
            , time: 1000
            , icon: 5
            , shift: 6
            , offset: '10%'
        });
        if (input_dom !== undefined) {
            setTimeout(function () {
                $(input_dom).focus();
                $(input_dom).addClass('layui-form-danger')
            }, 7)
        }

    }

    alertAsk = function (msg = '', yes, no) {
        //询问框
        layer.confirm(msg, {
            btn: ['确定', '取消'] //按钮
            , offset: '400px'
        }, function () {
            typeof yes === "function" && yes();
            layer.closeAll()

        }, function () {
            typeof no === "function" && no();
        })
    }

    isEmpty = function (field) {
        if (field === undefined || field === null || field.trim() === '') {
            return true;
        }
        return false;
    }

    scrollPosition = function (id, p_top) {

        //获取某个元素的相对偏移，此元素必须是可见的，返回值是top 和left 单位是像素 移动到固定元素上尽可能使用padding
        var offset = $(id).offset();
        $('body,html').animate({
            scrollTop: (offset.top + p_top)
        })
    }


    form.verify({
        maxLength: function (value, item) {
            var len = item.getAttribute('lay-max');
            if (len == undefined || len == null) len = 200;
            if (value.length > len) {
                return '字段长度不能大于' + len + '位';
            }
        },
        number: function (value, item) {
            if (isEmpty(value)) {
                return false;
            }
            if (!value || isNaN(value)) return '只能填写数字';
        },
        integer: function (value, item) {
            if (isEmpty(value)) {
                return false;
            }
            if (!value || isNaN(value)) return '只能填写数字';
            if (value.indexOf('.') !== -1) {
                return '只能填写整数';
            }
        },
        menuName: [/^[_#$@\d\w]*$/, '菜单文本必须是字母、数字、符号\'_#$@\'，不能包含其他特殊字符!'],
        pass: function (value, item) {
            if ($('#passw').is(":checked")) {
                var patt = /(.+){6,12}$/;
                if (!patt.test(value)) {
                    return '密码必须6到12位';
                }
            }

        },
        repass: function (value, item) {
            if ($('#passw').is(":checked") &&
                $('#passw-content').val() != value) {
                return '两次密码不一致';
            }
        },
        loginPass: function (value, item) {
            var patt = /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)])+$).{6,20}$/;
            if (!patt.test(value)) {
                return '密码必须包含数字,英文,字符中的两种以上,长度6-20!';
            }

        },
        loginRepass: function (value, item) {
            if ($('#newPassword').val() !== value) {
                return '两次密码不一致';
            }
        },
        dateFmt: function (value, item) {
            if (isEmpty(value)) {
                return false;
            }
            var patt = /^(\d{4})[-\/](\d{1}|0\d{1}|1[0-2])([-\/](\d{1}|0\d{1}|[1-2][0-9]|3[0-1]))*$/;
            if (!patt.test(value)) {
                return '日期格式不正确';
            }
        },
        dateTimeFmt: function (value, item) {
            if (isEmpty(value)) {
                return false;
            }
            var patt = /^(\d{4})[-\/](\d{1}|0\d{1}|1[0-2])([-\/](\d{1}|0\d{1}|[1-2][0-9]|3[0-1]))*\s(\d{1}|[0-1]\d{1}|2[0-3])[:]([0-5]\d{1})[:]([0-5]\d{1})$/;
            if (!patt.test(value)) {
                return '日期时间格式不正确';
            }
        },
        urlFmt: function (value, item) {
            if (isEmpty(value)) {
                return false;
            }
            var patt = /^http(s?):\/\/(([\w-]+\.)+[\w-]+|((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})(\.((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})){3})(:\d{1,5})?(\/.*)?$/;
            if (!patt.test(value)) {
                return '链接格式不正确';
            }
        },
        ipv4Fmt: function (value, item) {
            if (isEmpty(value)) {
                return false;
            }
            var patt = /^(((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})(\.((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})){3},)+$/;
            if (!patt.test(value + ",")) {
                return 'Ipv4格式不正确';
            }
        },

    })

    /**用正则表达式实现html解码（反转义）（另一种写法）*/
    escape2Html = function (str) {
        var arrEntities = {'lt': '<', 'gt': '>', 'nbsp': ' ', 'amp': '&', 'quot': '"', 'apos': '\''};
        return str.replace(/&(lt|gt|nbsp|amp|quot|apos);/ig, function (all, t) {
            return arrEntities[t];
        });
    }


    /** 用正则表达式实现html编码（转义）（另一种写法）*/
    html2Escape = function (sHtml) {
        return sHtml.replace(/[<>&"']/g, function (c) {
            return {'<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', '\'': '&apos;'}[c];
        });
    }


    guid = function () {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    getGuid = function () {
        var uuid = layui.data(cfg.tableName)["guid"];
        if (!uuid) {
            uuid = guid();
            layui.data(cfg.tableName, {
                key: "guid"
                , value: uuid
            });
        }
        return uuid;
    }


    // 表情转码
    utf16toEntities = function (str) {
        const patt = /[\ud800-\udbff][\udc00-\udfff]/g; // 检测utf16字符正则
        str = str.replace(patt, char => {
            let H;
            let L;
            let code;
            let s;
            if (char.length === 2) {
                H = char.charCodeAt(0); // 取出高位
                L = char.charCodeAt(1); // 取出低位
                code = (H - 0xd800) * 0x400 + 0x10000 + L - 0xdc00; // 转换算法
                s = `&amp;#${code};`;
            } else {
                s = char;
            }
            return s;
        });
        return str;
    }
    // 表情解码
    entitiestoUtf16 = function (strObj) {
        const patt = /&amp;#\d+;/g;
        const arr = strObj.match(patt) || [];
        let H;
        let L;
        let code;
        for (let i = 0; i < arr.length; i += 1) {
            code = arr[i];
            code = code.replace("&amp;#", "").replace(";", "");
            // 高位
            H = Math.floor((code - 0x10000) / 0x400) + 0xd800;
            // 低位
            L = ((code - 0x10000) % 0x400) + 0xdc00;
            code = `&amp;#${code};`;
            const s = String.fromCharCode(H, L);
            strObj = strObj.replace(code, s);
        }
        return strObj;
    }

    format = function (s) {
        if (!s) {
            return "";
        }
        return s.trim();
    }

    /**
     * 设置字符串format函数
     * 例子: '{0}{1}.format(5,6)'
     */
    String.prototype['format'] = function () {
        const e = arguments;
        return !!this && this.replace(/\{(\d+)\}/g, function (t, r) {
            return e[r] ? e[r] : t;
        });
    };


    req = function (param) {
        if (!param.type) {
            param.type = "get"
        }
        const request = new XMLHttpRequest()
        if (param.type === "get" && param.data) {
            param.url = param.url + "?" + formatParam(param.data);
        }
        request.open(param.type, param.url);
        request.timeout = cfg.timeout; // 超时时间，单位是毫秒
        if (param.header) {
            for (let key in param.header) {
                request.setRequestHeader(key, param.header[key])
            }
        }
        var alert = true;
        if (param.alert === false) {
            alert = false
        }
        request.onreadystatechange = () => {
            if (request.readyState === 4) {
                if (request.status >= 200 && request.status < 300) {
                    const object = JSON.parse(request.response)
                    if (cfg.debug) {
                        console.log(object)
                    }
                    if (object[cfg.response.statusName] === 0) {
                        typeof param.success === 'function' && param.success(object);

                    } else {
                        if (alert) {
                            alertFail("", object[cfg.response.msgName])
                        }
                        typeof param.failed === 'function' && param.failed(object);
                    }

                } else {
                    if (alert) {
                        alertFail("", "接口调用失败!")
                    }
                    typeof param.failed === 'function' && param.failed("接口调用失败,状态码:{1}".format(request.status));
                }

            }

        }
        request.ontimeout = function (e) {
            if (alert) {
                alertFail("", "服务器请求超时!可能是人气过高,过会再试~")
            }
            typeof param.failed === 'function' && param.failed("服务器请求超时!可能是人气过高,过会再试~");
        };
        if (param.type === "post" && param.data) {
            request.send(formatParam(param.data))
        } else {
            request.send()
        }
    }

    formatParam = function (param) {
        var s = "";
        for (let k in param) {
            s = s + k + "=" + param[k] + "&";
        }
        return s.substring(0, s.length - 1);
    }

    putCache = function (key, value) {
        layui.sessionData(cfg.tableName, {
            key: key
            , value: value
        });
    }


    getCache = function (key) {
        return layui.sessionData(cfg.tableName)[key];
    }


    removeCache = function (key) {
        layui.sessionData(cfg.tableName, {
            key: key
            , remove: true
        });
    }


    //对外暴露的接口
    exports('utils', {});
});

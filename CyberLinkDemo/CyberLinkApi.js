var walletPluginObj = (function(winodw) {
    // 设备环境集合
    var ua = navigator.userAgent,
        envMap = [{
                deviceType: /Android/i.test(ua),
                bridge: connectWebViewJavascriptBridge
            },
            {
                deviceType: /iPhone|iPod|iPad/i.test(ua),
                bridge: setupWebViewJavascriptBridge
            }]
    // 获取当前设备环境
    var currentEnv = envMap.filter(function (item) {
        return item.deviceType
    })[0]
    // 获取当前设备环境对应的bridge方法
    var currentBridge = currentEnv ? currentEnv.bridge : null

    // 唤起app方法
    function callhandler(name, query, callback) {
        currentBridge(function (bridge) {
            bridge.callHandler(name, query, callback)
        })
    }

    // 注册app唤起js方法
    function registerhandler(name, callback) {
        currentBridge(function (bridge) {
            bridge.registerHandler(name, function (data, responseCallback) {
                callback(data, responseCallback)
            })
        })
    }

    // web插件方法调用
    function callWebPlugin(name, query, callback, error) {
        switch (name) {
            // 获取账户信息
            case 'getAddressInfo':
                var res = {}
                WalletPlugins.getDefaultAccount().then(function (resp) {
                    res.result = resp
                    res.errorCode = 0
                    callback(res)
                }, function (err) {
                    res.errorMsg = err.message
                    error(res)
                })
                break;
            // 转账
            case 'walletPluginTransfer':
                var res = {}
                WalletPlugins.requestPay(query.collectionAddress, Number(query.amount), '', function (err, data) {
                    if (err === null) {
                        res.result = data
                        res.errorCode = 0
                        return callback(res)
                    }
                    res.errorMsg = err.message
                    error(res)
                }).then(function () {}, function (err) {
                    res.errorMsg = err.message
                    error(res)
                })
                break;
        }
    }

    //webview交互对象
    function webviewActive() {}

    webviewActive.prototype.walletPlugin = function (name, query, callback, error) {
        if (currentBridge) {
            // app接口调用
            return callhandler(name, query, function (res) {
                var response = Object.prototype.toString.call(res) === '[object Object]' ? res : JSON.parse(res)
                // callback(response)
                if (response.errorCode === "0") {
                    if (response.result.code) {
                        response.errorCode = response.result.code
                        response.errorMsg = response.result.msg
                    }
                    if (response.result.data) {
                        response.result = response.result.data
                    }
                    callback(response)
                } else {
                    error(response)
                }
            })
        } else {
            // web插件接口调用
            try {
                callWebPlugin(name, query, callback, error)
            } catch (err) {
                var errMsg = err.trim ? (err.trim() === 'ReferenceError: Wallet is not defined' ? 'please install wallet plugin!' : err) : err
                error({
                    errorMsg: errMsg
                })
            }
        }
    }



    // IOS桥梁
    function setupWebViewJavascriptBridge(callback) {
        if (window.WebViewJavascriptBridge) {
            return callback(window.WebViewJavascriptBridge)
        }
        if (window.WVJBCallbacks) {
            return window.WVJBCallbacks.push(callback)
        }
        window.WVJBCallbacks = [callback]
        var WVJBIframe = document.createElement('iframe')
        WVJBIframe.style.display = 'none'
        WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__'
        document.documentElement.appendChild(WVJBIframe)
        setTimeout(function() {
            document.documentElement.removeChild(WVJBIframe)
        }, 0)
    }

    // 安卓桥梁
    function connectWebViewJavascriptBridge(callback) {
        if (window.WebViewJavascriptBridge) {
            callback(WebViewJavascriptBridge)
        } else {
            document.addEventListener(
                'WebViewJavascriptBridgeReady',
                function () {
                    callback(WebViewJavascriptBridge)
                },
                false
            );
        }
    }
    return new webviewActive()
})(window)

// 初始化
if (typeof walletInitFunc == "undefined") {
    walletInitFunc = walletPluginObj;
};



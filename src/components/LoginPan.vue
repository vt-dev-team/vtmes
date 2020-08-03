<template>
    <md-dialog :md-active="isLogin">
        <md-dialog-content>
            <md-tabs md-dynamic-height>
                <md-tab md-label="登录">
                    <md-field>
                        <label>用户名</label>
                        <md-input v-model="username"></md-input>
                    </md-field>
                    <md-field>
                        <label>密码</label>
                        <md-input v-model="password" type="password"></md-input>
                    </md-field>
                    <md-button class="md-raised" @click="checkLogin()">登录</md-button>
                </md-tab>
                <md-tab md-label="注册">
                    <md-field>
                        <label>用户名</label>
                        <md-input v-model="username"></md-input>
                    </md-field>
                    <md-field>
                        <label>密码</label>
                        <md-input v-model="password" type="password"></md-input>
                    </md-field>
                    <md-button class="md-raised md-primary" @click="checkLogin()">登录</md-button>
                </md-tab>
            </md-tabs>
        </md-dialog-content>
        <md-dialog-actions>
        </md-dialog-actions>
    </md-dialog>
</template>

<script>
export default {
    data () {
        return {
            username: "",
            password: "",
            loginName: "",
            backendUrl: "ws://localhost:8088",
            socket: "",
            isLogin: true
        }
    },
    methods: {
        checkLogin () {
            let _this = this;
            let uname = _this.username;
            let pword = _this.password;
            let data = JSON.stringify({
                    method: "login",
                    username: uname,
                    password: pword
                })
            _this.socket = new WebSocket(_this.backendUrl)
            _this.socket.onopen = function(event){
                _this.socket.send(data);
                _this.socket.onmessage = function(message) {
                    let mes = JSON.parse(message.data)
                    if (mes.ret == "success") {
                        swal("成功", mes.detail, "success");
                        _this.isLogin = false;
                        _this.$emit('onLogin', uname)
                    }
                    else
                        swal("失败", mes.detail, "error");
                    _this.socket.close();
                };
            }
        }
    },
    mounted () {
        let _this = this;

    },
    destroyed () {

    }
};
</script>
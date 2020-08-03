<template>
    <md-app md-waterfall md-mode="fixed">      
      <md-app-toolbar class="md-primary">
        <md-button class="md-icon-button" @click="toggleMenu">
          <md-avatar>
            <img :src="'http://q1.qlogo.cn/g?b=qq&nk='+me.QQ+'&s=640'" alt="Avatar">
          </md-avatar>
        </md-button>
        <span class="md-title">与{{ friendName }}的聊天</span>
      </md-app-toolbar>

      <md-app-drawer :md-active.sync="menuVisible" md-persistent="full">
        <md-toolbar class="md-transparent" md-elevation="0">
          <span>
            <md-avatar class="md-small">
              <img :src="'http://q1.qlogo.cn/g?b=qq&nk='+me.QQ+'&s=640'" alt="Avatar">
            </md-avatar>
            {{ me.Name }}
          </span>

          <div class="md-toolbar-section-end">
            <md-button class="md-icon-button md-dense" @click="toggleMenu">
              <md-icon>keyboard_arrow_left</md-icon>
            </md-button>
          </div>
        </md-toolbar>

        <md-list class="md-triple-line">
          <md-list-item>
            <md-field>
              <label>搜索联系人</label>
              <md-input v-model="voice"></md-input>
            </md-field>
          </md-list-item>
          <md-list-item v-for="(friend, key) in friends" @click="changeFriend(friend.Name)" :key="key">
            <md-avatar>
              <img :src="'http://q1.qlogo.cn/g?b=qq&nk='+friend.QQ+'&s=640'" alt="People">
            </md-avatar>
            <div class="md-list-item-text">
              <span>{{ friend.Name }}</span>
              <p>Lzh AK IOI.Lzh AK IOI.Lzh AK IOI.Lzh AK IOI.Lzh AK IOI.Lzh AK IOI.</p>
            </div>
          </md-list-item>
        </md-list>
      </md-app-drawer>
      <md-app-content>
            <div class="messageBox md-elevation-3" style="float:left">
              <div class="messageList">
                <div class="lineMessage">
                  <div class="float-left">
                    <md-avatar>
                      <img :src="'http://q1.qlogo.cn/g?b=qq&nk='+me.QQ+'&s=640'" alt="Avatar">
                    </md-avatar>
                  </div>
                  <div class="messageMain">
                    {{ me.Name }}<br>
                    <div class="messageBoxMe">
                      233333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333
                    </div>
                  </div>
                  <div style="clear: both"></div>
                </div>
                <div class="lineMessage">
                  <div class="float-left">
                    <md-avatar>
                      <img :src="'http://q1.qlogo.cn/g?b=qq&nk=2213220653&s=640'" alt="Avatar">
                    </md-avatar>
                  </div>
                  <div class="messageMain">
                    liziheng<br>
                    <div class="messageBoxOther">
                      I AK IOI, I AK IOI, I AK IOI!!!!
                    </div>
                  </div>
                  <div style="clear: both"></div>
                </div>
              </div>
              <md-divider></md-divider>
              <div class="sendMessage">
                <editor>
                </editor>
                <md-button class="md-raised md-primary" style="position: absolute;top:180px;right:50px;z-index:12345">发送</md-button>
              </div>
            </div>
          </div>
          <div class="friendInfo" style="width: 300px;float:left;">
            <div style="position: relative" v-bind:style="{ top: letTop + 'px' }">
              <md-card>
                <md-list>
                  <md-subheader>联系人信息</md-subheader>
                  <md-list-item>昵称 <code>{{ friendName }}</code></md-list-item>
                  <md-list-item>性别 <code>Unknown</code></md-list-item>
                </md-list>
              </md-card>
            </div>
          </div>
      <LoginPan @onLogin="changeUser"></LoginPan>
      </md-app-content>
    </md-app>
</template>

<script>
import Editor from '@/components/Editor'
import LoginPan from '@/components/LoginPan'
  export default {
    name: 'PersistentFull',
    data: () => ({
      menuVisible: false,
      isLogin: true,
      voice: null,
      me: {
        Name: "yemaster",
        QQ:   1440169768
      },
      friends: [
        {
          Name: "liziheng",
          QQ:   2213220653,
        },
        {
          Name: "retsamey",
          QQ:   378284725,
        }
      ],
      friendName: "liziheng",
      letTop: 0
    }),
    methods: {
      toggleMenu () {
        this.menuVisible = !this.menuVisible
      },
      changeFriend (e) {
        this.friendName = e;
        document.title = "与"+e+"的聊天";
      },
      letfix () {
        var scroll_top = document.getElementsByClassName("md-app-scroller")[0].scrollTop;
        this.letTop = scroll_top;
        if (document.getElementsByClassName("md-app-scroller")[0].clientWidth < 555)
          this.letTop = 0;
      },
      changeUser (e) {
        this.me = {
          Name: e,
          QQ: 1440169768
        }
      }
    },
    components: {
      Editor, LoginPan
    },
    mounted () {
      let  _this = this
      let contentHigh = document.documentElement.clientHeight - 350;
      document.getElementsByClassName("messageList")[0].style.height = contentHigh + "px";
      document.getElementsByClassName("md-app-scroller")[0].addEventListener("scroll", _this.letfix);
    },
    destroyed () {
	    document.getElementsByClassName("md-app-scroller")[0].removeEventListener('scroll', this.scrollHander)
    }
  }
</script>

<style>
html,body,#app, .md-layout, .md-layout-item{
 height: 100%;
}
  .w-e-toolbar {
    background-color: transparent !important;
    border: none !important;
  }
  .w-e-text-container {
    height: 200px !important;
    border: none !important;
  }
  @media screen and (max-width: 1300px) {
    .friendInfo {
      display: none;
    }
  }
</style>

<style lang="css" scoped>
  .md-app {
    height: 100%;
    max-height: 100%;
    border: 1px solid rgba(#000, .12);
  }
  .md-drawer {
    width: 350px;
    max-width: calc(100vw - 125px);
  }
  .messageBox {
    max-width: 555px;
    width: 100%;
  }
  .messageList {
    padding: 20px;
  }
  .lineMessage:after {
    content: "";
    clear: both;
  }
  .lineMessage:not(:first-child) {
    margin-top: 10px;
  }
  .float-left {
    float: left;
  }
  .messageMain {
    float: left;
    margin-left: 10px;
    width: calc(100% - 50px);
  }
  .messageBoxMe {
    padding: 8px;
    border-radius: 5px;
    background-color: #448aff;
    color: #fff;
    word-wrap:break-word;
    width: 100%;
  }
  .messageBoxOther {
    padding: 8px;
    border-radius: 5px;
    background-color: #dedede;
    color: #000;
    word-wrap:break-word;
    max-width: 100%;
  }
  .sendMessage {
    position: relative;
    height: 250px;
  }
</style>
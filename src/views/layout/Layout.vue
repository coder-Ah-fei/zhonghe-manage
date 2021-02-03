<!--空白布局-->
<template>
  <v-app>
    <v-app-bar
        app
        flat
    >
      <v-app-bar-nav-icon @click="navigationDrawShow = !navigationDrawShow"></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <v-responsive max-width="260">
        <v-text-field
            dense
            flat
            hide-details
            rounded
            solo-inverted
        ></v-text-field>
      </v-responsive>

      <v-avatar
          class="ml-5"
          color="grey darken-1"
          size="32"
      ></v-avatar>
    </v-app-bar>
    <v-navigation-drawer app :value="navigationDrawShow">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            众合金管家
          </v-list-item-title>
          <v-list-item-subtitle>
            subtext
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>
      <v-list
          dense
          nav
      >
        <template v-for="funI in functionList">
          <template v-if="!funI.children || funI.children.length == 0">
            <v-list-item
                color="red"
                :to="`/${funI.url}`"
            >
              <v-list-item-icon>
                <v-icon>mdi mdi-alpha-x-box</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>{{ funI.name }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
          <v-list-group v-else color="red" >
            <template v-slot:prependIcon>
              <v-icon>mdi mdi-alpha-x-box</v-icon>
            </template>
            <template v-slot:activator>
              <v-list-item-title>{{ funI.name }}</v-list-item-title>
            </template>

            <template v-for="funII in funI.children">
              <template v-if="!funII.children || funII.children.length == 0">
                <v-list-item
                    color="red"
                    :to="`/${funII.url}`"
                >
                  <v-list-item-icon>
                    <!--                  <v-icon small>{{ funII.icon }}</v-icon>-->
                    <v-icon small></v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>{{ funII.name }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </template>

              <v-list-group
                  v-else
                  no-action
                  sub-group
                  color="red"
              >
                <template v-slot:activator>
                  <v-list-item-content>
                    <v-list-item-title>{{ funII.name }}</v-list-item-title>
                  </v-list-item-content>
                </template>

                <v-list-item
                    v-for="funIII in funII.children"
                    :to="`/${funIII.url}`"
                    color="red"
                >
                  <v-list-item-icon>
                    <v-icon small>mdi mdi-alpha-x-box</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>{{ funIII.name }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-group>
            </template>
          </v-list-group>
        </template>
      </v-list>

    </v-navigation-drawer>
    <v-main class="">
      <v-container>
        <transition :name="transitionName">
          <router-view class="view"></router-view>
        </transition>
      </v-container>
    </v-main>
  </v-app>

</template>
<script>
export default {
  name: 'Layout',
  data() {
    return {
      transitionName: '',
      navigationDrawShow: true,
      functionList: [],
      items: [
        {title: 'Dashboard', icon: 'mdi-view-dashboard'},
        {title: 'Photos', icon: 'mdi-image'},
        {title: 'About', icon: 'mdi-help-box'},
      ],
      right: null,
      links: [
        'Dashboard',
        'Messages',
        'Profile',
        'Updates',
      ],
    };
  },
  watch: {
    $route(to, from) {
      //如果to索引大于from索引,判断为前进状态,反之则为后退状态
      if (to.meta.index > from.meta.index) {
        //设置动画名称
        this.transitionName = 'slide-left';
      } else {
        this.transitionName = 'slide-right';
      }
    }
  },
  created(){
    this.listFunctionsForManagerFun();
  },
  methods:{
    listFunctionsForManagerFun(){
      let that = this;
      that.axios.post(that.$appProp.url.goFunctionList, that.$qs.stringify(that.loginForm))
          .then(res => {
              that.functionList = res.data[0].children;
            // cookie.set('servantNO', res.data.result.servantNO, {expires: 7, path: '/'});
          })
          .catch(() => {
          })
    },
  },
};
</script>
<style lang="scss">
.layout {

  .view {
    width: 100%;
    position: absolute;
  }

  .slide-right-enter-active,
  .slide-right-leave-active,
  .slide-left-enter-active,
  .slide-left-leave-active {
    will-change: transform;
    transition: all 250ms;
    position: absolute;
  }

  .slide-right-enter {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }

  .slide-right-leave-active {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }

  .slide-left-enter {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }

  .slide-left-leave-active {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }
}
</style>


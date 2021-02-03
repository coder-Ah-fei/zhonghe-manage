<!--空白布局-->
<template>
  <v-app class="aaa">
    <v-main>
      <v-container>
        <v-row>
          <v-col cols="0" md="5">asdsaf</v-col>
          <v-col cols="12" md="7" align="center">
            <v-card class="pl-10 pr-10 pt-5 pb-16" width="80%">
              <v-card-subtitle class="text-h5">欢迎登录</v-card-subtitle>
              <v-card-subtitle>登录你的账户</v-card-subtitle>
              <v-card-text>
                <v-form v-model="valid">
                  <v-text-field :rules="userNameRules" outlined autofocus required clearable label="账号"
                                v-model="loginForm.userName"></v-text-field>
                  <v-text-field :rules="passwordRules" outlined type="password" required clearable label="密码"
                                v-model="loginForm.passWord"></v-text-field>
                </v-form>
                <v-btn color="primary" height="50" width="100%" @click="toLoginFun">登录</v-btn>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>

</template>
<script>
import cookie from 'js-cookie';

export default {
  name: 'Login',
  data() {
    return {
      valid: false,
      userNameRules: [
        v => !!v || '不能为空',
        // v => v.length <= 10 || 'Name must be less than 10 characters',
      ],
      passwordRules: [
        v => !!v || '不能为空',
      ],
      loginForm: {
        userName: '',
        passWord: '',
      },
    };
  },
  watch: {},
  methods: {
    toLoginFun() {
      let that = this;
      if (that.valid) {
        that.axios.post(that.$appProp.url.checkLogin, that.$qs.stringify(that.loginForm))
            .then(res => {
              // cookie.set('servantNO', res.data.result.servantNO, {expires: 7, path: '/'});
              that.$router.push({path: '/'})
            })
            .catch(() => {
            })
      }
    },
  }
};
</script>
<style lang="scss">
</style>


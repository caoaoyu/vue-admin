<template>
  <div class="login">
    <Header></Header>
    <b-container fluid class="login-body">
      <h2>管理系统</h2>
      <br>
      <form>
        <b-row class="my-1">
          <b-col sm="3">
            <label :for="'text'">账号</label>
          </b-col>
          <b-col sm="9">
            <b-form-input
              :type="'text'"
              :value="name"
              :placeholder="'请输入账号'"
              :state="name_state"
              :aria-autocomplete="'username'"
              @change="onNameInput"
            ></b-form-input>
            <p class="valid_error" v-if="!name_state">请输入正确的手机号</p>
          </b-col>
        </b-row>
        <b-row class="my-1">
          <b-col sm="3">
            <label :for="'password'">密码</label>
          </b-col>
          <b-col sm="9">
            <b-form-input
              :value="pwd"
              :type="'password'"
              :placeholder="'请输入密码'"
              :state="pwd_state"
              :aria-autocomplete="'current-password'"
              @change="onPwdInput"
            ></b-form-input>
            <p class="valid_error" v-if="!pwd_state">请输入六位数密码</p>
          </b-col>
        </b-row>
      </form>
      <br>
      <b-row>
        <b-col sm="6">
          <b-button class="on-submit" variant="success" @click="submit">登录</b-button>
        </b-col>
        <b-col sm="6" class="router-registered">
          <router-link to="/registered">没有帐号，去注册</router-link>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Header from "@/components/header.vue";
import { mapActions } from "vuex";

export default {
  name: "home",
  components: {
    Header
  },
  data() {
    return {
      name: "18511620415",
      pwd: "111111",
      name_state: "null",
      pwd_state: "null"
    };
  },
  computed: {},
  methods: {
    //验证账号
    onNameInput(e) {
      this.$data.name_state = /^1(3|4|5|7|8)\d{9}$/.test(e);
      this.$data.name = e;
    },
    //验证密码
    onPwdInput(e) {
      this.$data.pwd_state = !(e.length < 6);
      this.$data.pwd = e;
    },
    // 登录
    submit() {
      if (this.$data.name_state && this.$data.pwd_state) {
        this.$store.dispatch("login", {
          name: this.$data.name,
          pwd: this.$data.pwd
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.login {
  display: flex;
  flex-flow: column;
  height: 100%;
  .login-body {
    border: 1px solid;
    width: 400px;
    border-radius: 5px;
    padding: 20px;
    position: relative;
    top: 20%;
    input {
      border: 1px solid #efefef;
      height: 30px;
    }
    .item {
      margin-bottom: 10px;
    }
    .btn-opt {
      display: flex;
      height: 40px;
      align-self: center;
      text-align: center;
      justify-content: space-between;
    }
    .on-submit {
      padding: 0.375rem 35px;
    }
    .router-registered {
      align-self: center;
    }
  }
  .valid_error {
    color: red;
    font-size: 12px;
    padding: 2px;
    margin: 0;
  }
}
</style>
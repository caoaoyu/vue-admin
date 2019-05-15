<template>
	<div class="login">
		<Header></Header>
		<div class="login-body">
			<h2>用户登录</h2>
			<br>
			<el-form ref="ruleForm" :rules="rules" :model="formInfo" label-width="60px">
				<el-form-item prop="name" label="账号：">
					<el-input type="text" placeholder="请输入手机号" v-model="formInfo.name" maxlength="11"></el-input>
				</el-form-item>
				<el-form-item prop="pwd" label="密码：">
					<el-input type="password" placeholder="请输入密码" v-model="formInfo.pwd"></el-input>
				</el-form-item>
				<el-form-item>
					<div class="btn-opt">
						<el-button type="primary" @click="submit">登录</el-button>
						<router-link to="/registered">没有帐号，去注册</router-link>
					</div>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
import Header from "@/components/header.vue";
import { mapActions } from "vuex";

export default {
	name: "login",
	components: {
		Header
	},
	data() {
		return {
			formInfo: {
				name: "18511620415",
				pwd: "111111"
			},
			rules: {
				name: [
					{
						pattern: /^1(3|4|5|7|8)\d{9}$/,
						message: "请输入正确的手机号",
						trigger: "blur"
					}
				],
				pwd: [
					{
						min: 6,
						message: "请输入六位数密码",
						trigger: "blur"
					}
				]
			}
		};
	},
	computed: {},
	methods: {
		// 登录
		submit(e) {
			this.$refs["ruleForm"].validate(valid => {
				if (!valid) return false;
				this.$store.dispatch("login", { ...this.$data.formInfo });
			});
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
		top: 20%;
		width: 400px;
		padding: 20px;
		border-radius: 5px;
		position: relative;
		align-self: center;
		border: 1px solid #dcdfe6;
		box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
		.btn-opt {
			display: flex;
			text-align: center;
			justify-content: space-between;
			button {
				padding: 12px 40px;
			}
		}
	}
}
</style>
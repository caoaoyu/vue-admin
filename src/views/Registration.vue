<template>
	<el-row class="search_box space-mb20" :gutter="20">
		<el-col :span="12" :offset="6">
			<el-form
				class="rehistration-box"
				status-icon
				:model="form"
				:rules="rules"
				ref="form"
				label-width="100px"
			>
				<el-form-item prop="name" label="姓名：">
					<el-input type="text" v-model="form.name" placeholder="请输入姓名"></el-input>
				</el-form-item>
				<el-form-item prop="phone" label="手机：">
					<el-input type="text" v-model="form.phone" placeholder="请输入手机号"></el-input>
				</el-form-item>
				<el-form-item prop="pwd" label="密码：">
					<el-input type="password" v-model="form.pwd" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="性别：">
					<el-radio v-model="form.sex" label="1">男</el-radio>
					<el-radio v-model="form.sex" label="2">女</el-radio>
				</el-form-item>
				<el-form-item class="space-mt20">
					<el-button type="primary" @click="onSubmit">立即创建</el-button>
					<el-button @click="onBack">取消</el-button>
				</el-form-item>
			</el-form>
		</el-col>
	</el-row>
</template>


<script>
import { truncate } from "fs";
export default {
	name: "registration",
	data() {
		return {
			form: {
				name: "test-1",
				sex: "1",
				phone: "18511620416",
				pwd: "123456"
			},
			rules: {
				name: [
					{
						required: true,
						message: "姓名不能为空",
						trigger: "blur"
					},
					{
						min: 3,
						max: 6,
						message: "长度在 3 到 5 个字符",
						trigger: "blur"
					}
				],
				phone: [
					{
						required: true,
						pattern: /^1(3|4|5|7|8)\d{9}$/,
						message: "请输入正确的手机号",
						trigger: "blur"
					}
				],
				pwd: [
					{
						min: 6,
						max: 6,
						required: true,
						message: "请输入六位数密码",
						trigger: "blur"
					}
				]
			}
		};
	},
	created() {},
	methods: {
		onBack() {
			this.$router.back();
		},
		onSubmit() {
			this.$refs["form"].validate(valid => {
				if (!valid) return false;
				this.$store
					.dispatch("add_member", {
						...this.$data.form,
						uid: this.$store.state.app.user.id
					})
					.then(result => {
						this.$router.push("/home");
					})
					.catch(err => {
						console.log(err);
						this.$alert("", err, {
							confirmButtonText: "确定",
							type: "error",
							showClose: false,
							center: true
						});
					});
			});
		}
	}
};
</script>

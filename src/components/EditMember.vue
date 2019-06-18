<template>
	<!-- <div class="edit-member-box">编辑用户组件</div> -->
	<el-dialog title="编辑用户" :visible.sync="show" width="30%">
		<el-form ref="form" label-width="80px">
			<el-form-item label="姓名" props="name">
				<el-input v-model="name"></el-input>
			</el-form-item>
			<el-form-item label="性别">
				<el-radio v-model="sex" label="1">男</el-radio>
				<el-radio v-model="sex" label="2">女</el-radio>
			</el-form-item>
		</el-form>

		<span slot="footer">
			<el-button @click="handle_hide">取 消</el-button>
			<el-button type="primary" @click="saveDetail">确 定</el-button>
		</span>
	</el-dialog>
</template>

<script>
export default {
	name: "editMember",
	props: ["id", "name", "sex", "show", "uid"],
	methods: {
		saveDetail() {
			console.log(this.$props);
			// this.$store.dispatch("edit_member", { ...this.props });
		},
		handle_hide() {
			this.$emit("handle_hide");
		}
	}
};
</script>

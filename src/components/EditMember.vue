<template>
	<!-- <div class="edit-member-box">编辑用户组件</div> -->
	<el-dialog
		width="30%"
		title="编辑用户"
		:visible.sync="show"
		:show-close="false"
		:close-on-click-modal="false"
		:close-on-press-escape="false"
	>
		<el-form ref="editForm" :model="form" label-width="80px">
			<el-form-item
				label="姓名"
				prop="ename"
				:rules="[{ required: true, min:3,max:5, message: '长度在 3 到 5 个字符', trigger: ['blur'] }]"
			>
				<el-input v-model="form.ename"></el-input>
			</el-form-item>
			<el-form-item label="性别">
				<el-radio-group :value="sex" @input="$emit('handle_checked', $event)">
					<el-radio :label="1">男</el-radio>
					<el-radio :label="2">女</el-radio>
				</el-radio-group>
			</el-form-item>
		</el-form>
		<span slot="footer">
			<el-button type="primary" @click="save_detail">确 定</el-button>
			<el-button @click="$emit('handle_hide')">取 消</el-button>
		</span>
	</el-dialog>
</template>

<script>
export default {
	name: "editMember",
	data() {
		return {
			form: {
				ename: ""
			}
		};
	},
	created() {
		this.$data.form.ename = this.$props.name;
	},
	props: ["id", "name", "sex", "show", "uid"],
	methods: {
		save_detail() {
			let payload = JSON.parse(
				JSON.stringify({ ...this.$props, name: this.$data.form.ename })
			);
			delete payload.show;

			this.$refs["editForm"].validate(valid => {
				if (!valid) return false;

				this.$emit("handle_hide");
				this.$store.dispatch("edit_member", payload);
			});
		}
	}
};
</script>

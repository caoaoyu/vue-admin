<template>
	<el-header class="header_layout">
		<el-dropdown @command="handle_dropdown">
			<span class="el-dropdown-link">
				{{show_name}}
				<i class="el-icon-arrow-down el-icon--right"></i>
			</span>
			<el-dropdown-menu slot="dropdown">
				<el-dropdown-item command="a">退出</el-dropdown-item>
			</el-dropdown-menu>
		</el-dropdown>
	</el-header>
</template>

<script>
export default {
	name: "UserHead",
	data: function() {
		return {};
	},

	computed: {
		show_name() {
			return this.$store.state.app.user.phone;
		}
	},
	methods: {
		handle_dropdown(e) {
			this.$store.dispatch("layout");
		}
	}
};
</script>

<style lang='scss' scoped>
.header_layout {
	display: flex;
	flex-direction: row-reverse;
	align-items: center;
}
</style>


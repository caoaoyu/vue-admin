<template>
	<el-menu class="el-menu-vertical-demo" mode="vertical" router :default-active="$route.path">
		<el-menu-item v-for="(item, index) in menus" :index="item.index" :key="`menu_${index}`">
			<span slot="title">{{item.title}}</span>
		</el-menu-item>
	</el-menu>
</template>

<script>
export default {
	data() {
		return {
			menus: [
				{ index: "/home", title: "用户管理" },
				{ index: "/pages", title: "文章管理" },
				{ index: "/logs", title: "系统日志" }
			]
		};
	}
};
</script>
<template>
	<div id="app">
		<el-container v-if="show">
			<el-aside>
				<Menu v-if="show"></Menu>
			</el-aside>
			<el-container>
				<UserHead v-if="show"></UserHead>
				<el-main>
					<router-view></router-view>
				</el-main>
				<el-footer>
					<Footer v-if="show"></Footer>
				</el-footer>
			</el-container>
		</el-container>
		<router-view v-if="!show"></router-view>
	</div>
	
</template>

<script>
import Menu from "@/components/menu.vue";
import Footer from "@/components/footer.vue";
import UserHead from "@/components/UserHead.vue";

export default {
	name: "app",
	data: function() {
		return {
			show: false
		};
	},
	watch: {
		$route: function() {
			this.show = this.$route.name != "login";
		}
	},
	created: function() {
		this.show = this.$route.name != "login";
	},
	components: {
		Menu,
		UserHead,
		Footer
	}
};
</script>

<style lang="scss">
html,
body,
.el-container {
	width: 100%;
	height: 100%;
	margin: 0;
	padding: 0;
}

.el-aside {
	border-right: solid 1px #e6e6e6;
}

.el-menu {
	border: none !important;
}
#app {
	font-family: "Avenir", Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	height: 100%;
}
#nav {
	padding: 30px;
	a {
		font-weight: bold;
		color: #2c3e50;
		&.router-link-exact-active {
			color: #42b983;
		}
	}
}

.space-mr20 {
	margin-right: 20px;
}
.space-mt20 {
	margin-top: 20px;
}
.space-mb20 {
	margin-bottom: 20px;
}

.space-ml20 {
	margin-left: 20px;
}

.space-pr20 {
	padding: 20px;
}
.space-pt20 {
	padding-top: 20px;
}
.space-pb20 {
	padding-bottop: 20px;
}

.space-pl20 {
	padding-left: 20px;
}
</style>

<template>
	<div class="home">
		<el-row class="search_box space-mb20" :gutter="20">
			<el-col :span="6">
				<el-input placeholder="请输入内容" v-model="s_key">
					<i slot="suffix" class="el-input__icon el-icon-search" @click="search_name"></i>
				</el-input>
			</el-col>
			<el-col :span="6" :offset="12">
				<el-button type="primary" @click="add_member">新增用户</el-button>
			</el-col>
		</el-row>
		<el-table
			:data="all_members.slice((size - 1) * 10, size * 10 + 10)"
			style="width: 100%"
			height="450"
			border
			center
		>
			<el-table-column label="ID">
				<template slot-scope="scope">{{ scope.row.id }}</template>
			</el-table-column>
			<el-table-column label="姓名">
				<template slot-scope="scope">{{ scope.row.name }}</template>
			</el-table-column>
			<el-table-column label="账号">
				<template slot-scope="scope">{{ scope.row.phone }}</template>
			</el-table-column>
			<el-table-column label="性别">
				<template slot-scope="scope">{{ scope.row.sex == 1? '男' : '女' }}</template>
			</el-table-column>
			<el-table-column label="操作">
				<template slot-scope="scope">
					<el-button size="mini" @click="handle_edit(scope.$index, scope.row)">编辑</el-button>
					<el-button size="mini" type="danger" @click="handle_delete(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-pagination
			class="space-mt20"
			v-if="total > 0"
			background
			layout="prev, pager, next, jumper"
			:total="total"
			@current-change="handle_current_change"
		></el-pagination>
		<EditMember
			v-bind:id="id"
			v-bind:show="show"
			v-bind:name="name"
			v-bind:sex="sex"
			v-bind:uid="uid"
			@handle_hide="handle_hide"
			@handel_name="handel_name"
			@handle_checked="handle_checked"
		></EditMember>
	</div>
</template>

<script>
import EditMember from "../components/EditMember";
export default {
	name: "home",
	data() {
		return {
			s_key: "1",
			name: "",
			id: 1,
			sex: 1,
			uid: false,
			show: false,
			size: 1,
			members: []
		};
	},
	created() {
		this.$store.dispatch("get_member", {
			id: this.$store.state.app.user.id
		});
		this.$set(this.$data, "uid", this.$store.state.app.user.id);
	},
	computed: {
		total() {
			return this.$store.state.member.total;
		},

		all_members() {
			return this.$store.state.member.data;
		}
	},
	methods: {
		handle_hide() {
			this.$set(this.$data, "show", false);
		},
		handle_checked(vul) {
			this.$set(this.$data, "sex", vul);
		},
		handel_name(vul) {
			this.$set(this.$data, "name", vul);
		},
		handle_current_change(val) {
			this.$set(this.$data, "size", val);
		},
		handle_edit(i, parm) {
			this.$set(this.$data, "show", true);
			this.$set(this.$data, "name", parm.name);
			this.$set(this.$data, "id", parm.id);
			this.$set(this.$data, "sex", parm.sex);
		},
		handle_delete(i, parm) {
			const payload = {
				id: parm.id,
				name: parm.name,
				uid: this.$data.uid
			};
			this.$store.dispatch("remove_member", payload);
		},
		// 根据姓名筛选
		search_name() {
			if (this.$data.s_key.length < 0) return;

			const payload = {
				key: this.$data.s_key,
				uid: this.$data.uid
			};
			this.$store.dispatch("search_member", payload).catch(err => {
				this.$alert("", err, {
					confirmButtonText: "确定",
					type: "error",
					showClose: false,
					center: true
				});
			});
		},
		// 新增用户
		add_member() {
			this.$router.push("/registration");
		}
	},
	components: {
		EditMember
	}
};
</script>


<style lang="scss" scoped>
</style>
<template>
	<div id="pageheader">
	
		<div v-if="isuser" class="header">
			<nav>
				<router-link href="/" class="brand-logo">Logo</router-link>
				<ul class="left">
					<li class="current">
						<router-link to="/dashboard"> Dashboard </router-link>
					</li>
				</ul>
				<ul class="navDrop right">
					<!-- Dropdown Trigger -->
					<li>
						<a class="dropdown-button userDP" href="javascript:void(0);" data-activates="dropdown1">
							<span class="userPic">
									<img src="../assets/images/favicon.png" />
								</span>
							<span class="username"></span>
						</a>
					</li>
				</ul>
				<!-- Dropdown Structure -->
				<ul id="dropdown1" class="dropdown-content topNav">
					<li>
						<router-link to="/profile"> Profile </router-link>
					</li>
					<li>
						<router-link to="/changepassword"> Change Password </router-link>
					</li>
					<li>
						<a v-on:click="logout" href="javascript:void(0);">Logout</a>
					</li>
				</ul>
			</nav>
		</div>
		<div v-else-if="!isuser" class="header">
			<nav>
				<router-link to="/" class="brand-logo">Logo</router-link>
				<ul class="left">
					<li class="current">
						<router-link to="/dashboard"> Dashboard </router-link>
					</li>
				</ul>
				<ul class="navDrop right">
					<!-- Dropdown Trigger -->
					<li>
						<a class="dropdown-button userDP" data-activates="dropdown1">
							<span class="userPic">
										<img src="../assets/images/favicon.png" />
									</span>
							<span class="username"></span>
						</a>
					</li>
				</ul>
				<!-- Dropdown Structure -->
				<ul id="dropdown1" class="dropdown-content topNav">
					<li>
						<router-link to="login"> Login </router-link>
					</li>
				</ul>
			</nav>
		</div>
	</div>
</template>

<script>
	export default {
	
		data() {
			return {
				isuser: false,
			}
		},
		methods: {
	
			initpage() {
	
				if (this.$session.has("userid")) {
					this.isuser = true
				}else {
						this.isuser = false		
				}
	
			},
	
			logout() {
				this.$session.destroy()
				localStorage.removeItem("login")
				location.reload()
			}
	
		},
		mounted() {
			this.initpage()
		}
	
	}
</script>


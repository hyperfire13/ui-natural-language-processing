!<template>
  <body class="hold-transition login-page bg-navy">
    <div class="login-box">
      <div class="login-logo">
        <h3 >Research Proposal Categorization</h3>
      </div>
      <!-- /.login-logo -->
      <div class="card">
        <div class="card-body login-card-body">
          <!-- <p class="login-box-msg text-danger">{{errorMessage}}</p> -->

          <form action="../../index3.html" method="post">
          
            <div class="input-group mb-3">
              <input :class="{ 'is-invalid': loginInvalid }" v-model="username" type="email" class="form-control" placeholder="Username">
              <div class="input-group-append">
                <div class="input-group-text">
                  <span class="fas fa-envelope"></span>
                </div>
              </div>
              <span class="error invalid-feedback">Invalid username</span>
            </div>
            <div class="input-group mb-3">
              <input :class="{ 'is-invalid': loginInvalid }" v-model="password" type="password" class="form-control" placeholder="Password">
              <div class="input-group-append">
                <div class="input-group-text">
                  <span class="fas fa-lock"></span>
                </div>
              </div>
              <span class="error invalid-feedback">Invalid password</span>
            </div>
          </form>

          <div class="social-auth-links text-center mb-3">
            <button v-on:click="login(username, password)" class="btn btn-block bg-olive">
              Login
            </button>
          </div>
          <!-- <p class="mb-0">
            <a href="#/register" class="text-center">Register a new membership</a>
          </p> -->
          <p class="mb-0 text-center">
            <a href="#/forgot" class="text-center">Forgot Password</a>
          </p>
        </div>
        <!-- /.login-card-body -->
        <div v-if="nowLoading" class="overlay"><i class="fas fa-2x fa-sync-alt fa-spin"></i></div>
      </div>
    </div>
  <!-- /.login-box -->
  </body>
</template>

<script>
import axios from 'axios';
export default {
  
    name: '',
    data() {
      return {
        username: "",
        password: "",
        loginInvalid: 0,
        nowLoading: false,
        errorMessage:''
      }
    },
    mounted() {

    },
    methods : {
      login(username, password) {
        if (username === '' || password === '') {
          this.loginInvalid = 1;
          this.errorMessage = "Username / Password you entered is invalid";
        } else {
          this.nowLoading = true;
          let formData = new FormData();
          formData.append('username', username);
          formData.append('password', password);
          axios.post(
            process.env.VUE_APP_ROOT_API + 'login.php',formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data', 
                }
            }
          ).then((response) => {
            var result = response.data
            if (result.status === 'success') {
              localStorage.setItem('validatorToken', result.token)
              localStorage.setItem('userId', result.userId)
              localStorage.setItem('level', result.level)
              this.$router.push({ name: 'Dashboard', params: {
                firstname: result.firstName,
                lastname: result.lastName,
                level: result.level,
                userId: result.userId
                }
              })
            } else {
              this.loginInvalid = 1;
            }
            this.nowLoading = false;
          }).catch((response) => {
            //handle error
            this.nowLoading = false;
            this.errorMessage = "Something went wrong";
            console.log(response)
          });
        }
      },
      getUploadedFile(){
        this.file = this.$refs.file.files[0];
      }
    }
  }
</script>

<style>
  @import '~admin-lte/plugins/fontawesome-free/css/all.min.css';
  @import '~admin-lte/plugins/icheck-bootstrap/icheck-bootstrap.min.css';
  @import '~admin-lte/dist/css/adminlte.min.css';
</style>
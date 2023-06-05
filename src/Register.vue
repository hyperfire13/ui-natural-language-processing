<template>
  <body class="register-page bg-navy" style="min-height: 570.781px;">
    <div class="register-box">
      <div class="register-logo">
          <h3>User Registration</h3>
      </div>

      <div class="card">
          <div class="card-body register-card-body">
            <ul :key="errorMessage" v-for="errorMessage in errorMessages">
              <li class="login-box-msg text-danger">{{errorMessage}}</li>
            </ul>
            <p class="login-box-msg text-success">{{successMessage}}</p>

            <form action="../../index.html" method="post">
                <div class="input-group mb-3">
                  <input :class="{ 'is-invalid': fnameInvalid }" v-model="firstname" type="text" class="form-control" placeholder="First name">
                  <div class="input-group-append">
                      <div class="input-group-text">
                      <span class="fas fa-user"></span>
                      </div>
                  </div>
                  <span class="error invalid-feedback">Please enter first name</span>
                </div>
                <div class="input-group mb-3">
                  <input :class="{ 'is-invalid': lnameInvalid }" v-model="lastname" type="text" class="form-control" placeholder="Last name">
                  <div class="input-group-append">
                      <div class="input-group-text">
                      <span class="fas fa-user"></span>
                      </div>
                  </div>
                  <span class="error invalid-feedback">Please enter last name</span>
                </div>
                <div class="input-group mb-3">
                  <input :class="{ 'is-invalid': unameInvalid }" v-model="username" type="text" class="form-control" placeholder="username">
                  <div class="input-group-append">
                      <div class="input-group-text">
                      <span class="fas fa-user"></span>
                      </div>
                  </div>
                  <span class="error invalid-feedback">Invalid username</span>
                </div>
                <div class="input-group mb-3">
                <input minlength="8" :class="{ 'is-invalid': passwordInvalid }" v-model="password" type="password" class="form-control" placeholder="Password">
                <div class="input-group-append">
                    <div class="input-group-text">
                    <span class="fas fa-lock"></span>
                    </div>
                </div>
                <span class="error invalid-feedback">Please enter password  (minimum of 8 characters)</span>
                </div>
                <div class="input-group mb-3">
                  <input minlength="8" :class="{ 'is-invalid': repasswordInvalid }" v-model="repassword" type="password" class="form-control" placeholder="Retype password">
                  <div class="input-group-append">
                      <div class="input-group-text">
                      <span class="fas fa-lock"></span>
                      </div>
                  </div>
                  <span class="error invalid-feedback">Password does not match, please retype</span>
                </div>
                <div class="input-group mb-3">
                   <select :class="{ 'is-invalid': levelInvalid }" v-model="selectedLevel" class="form-control" >
                    <option selected="selected" >select user level</option>
                    <option  value="1">Dean</option>
                  </select>
                  <div class="input-group-append">
                      <div class="input-group-text">
                      <span class="fas fa-user"></span>
                      </div>
                  </div>
                  <span class="error invalid-feedback">Please select user level</span>
                </div>
               
                
            </form>

            <div class="social-auth-links text-center">
                <button v-on:click="register()" class="btn btn-block btn-primary">
                  Register
                </button>
            </div>

            <a href="#/" class="text-center">I already have an account</a>
          </div>
          <!-- /.form-box -->
          <!-- /.login-card-body -->
          <div v-if="nowLoading" class="overlay"><i class="fas fa-2x fa-sync-alt fa-spin"></i></div>
      </div><!-- /.card -->
    </div>
    <!-- /.register-box -->
    </body>
</template>

<script>
import axios from 'axios';
export default {
  
    name: '',
    data() {
      return {
        username: "",
        firstname: "",
        lastname: "",
        username: "",
        password: "",
        repassword: "",
        fnameInvalid: 0,
        lnameInvalid: 0,
        unameInvalid: 0,
        passwordInvalid: 0,
        repasswordInvalid: 0,
        levelInvalid: 0,
        nowLoading: false,
        selectedLevel: "select user level",
        errorMessages: [],
        validEntry: true,
        successMessage: ''
      }
    },
    mounted() {

    },
    methods : {
      register() {
        this.nowLoading = false;
        this.errorMessages = [];
        this.fnameInvalid= 0;
        this.lnameInvalid= 0;
        this.unameInvalid= 0;
        this.levelInvalid= 0;
        this.passwordInvalid= 0;
        this.repasswordInvalid= 0;
        this.successMessage= "";
        this.validEntry = true;

        if (this.username === '') {
          this.unameInvalid = 1;
          this.validEntry = false;
        }
        if (this.password === '' || this.password.length < 8) {
          this.passwordInvalid = 1;
          this.validEntry = false;
        }
        if (this.password !== this.repassword) {
          this.repasswordInvalid = 1;
          this.validEntry = false;
        }
        if (this.firstname === '') {
          this.fnameInvalid = 1;
          this.validEntry = false;
        }
        if (this.lastname === '') {
          this.lnameInvalid = 1;
          this.validEntry = false;
        }
        if (this.selectedLevel === 'select user level') {
          this.levelInvalid = 1;
          this.validEntry = false;
        }
        if (this.validEntry === true){
          this.nowLoading = true;
          let formData = new FormData();
          formData.append('username', this.username);
          formData.append('password', this.password);
          formData.append('firstname', this.firstname);
          formData.append('lastname', this.lastname);
          formData.append('level', this.selectedLevel);
          axios.post(
            process.env.VUE_APP_ROOT_API + 'register.php',formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data', 
              }
            }
          ).then((response) => {
            this.nowLoading = true;
            this.errorMessages = [];
            var result = response.data
            if (result.status === 'success') {
              this.successMessage = "successfully registered!"
              this.username = "";
              this.firstname = "";
              this.lastname = "";
              this.username = "";
              this.password = "";
              this.repassword = "";
              this.repassword = "";
              this.validEntry = true;
              this.selectedLevel = 'select user level';

            } else if (result.status === 'duplicate') {
              this.errorMessages.push('username already taken');
              this.unameInvalid = 1;
            } else {
              this.errorMessages.push('registration failed');
            }
            this.nowLoading = false;
            // this.$router.push('/home')
          }).catch((response) => {
              //handle error
              this.nowLoading = false;
              this.errorMessages.push('registration failed');
              console.log(response)
          });
        }
      }
    }
  }
</script>

<style>
  @import '~admin-lte/plugins/fontawesome-free/css/all.min.css';
  @import '~admin-lte/plugins/icheck-bootstrap/icheck-bootstrap.min.css';
  @import '~admin-lte/dist/css/adminlte.min.css';
</style>
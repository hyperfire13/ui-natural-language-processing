<template>
  <section class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="card card-primary col-md-7">
              <div class="card-header ui-sortable-handle" style="cursor: move;">
                <h3 class="card-title">
                  Users
                </h3>
              </div>
              <!-- /.card-header -->
              <div class="card-body">
                <div class="form-group  mb-2">
                    <div class="input-group input-group-sm" style="width: 350px;">
                    <input v-model="searchedFactor" type="text" name="table_search" class="form-control float-right" placeholder="Search user">
                      <div class="input-group-append">
                        <button type="submit" class="btn btn-default">
                          <i class="fas fa-search"></i>
                        </button>
                      </div>
                    </div>
                </div>
                <ul class="todo-list ui-sortable" data-widget="todo-list">
                  <li>
                    <span v-show="index !== selectedIndex" class="text col-md-4"><b>Fullname</b></span>
                    <span v-show="index !== selectedIndex" class="text col-md-4"><b>Username</b></span>
                    <span v-show="index !== selectedIndex" class="text col-md-3"><b>Level</b></span>
                  </li>
                </ul>
                <ul v-for="(section, index) in filteredResults" v-bind:key="section.id" class="todo-list ui-sortable" data-widget="todo-list">
                  
                  <li>
                    <!-- todo text -->
                    <span v-show="index !== selectedIndex" class="text col-md-4">{{section.name}}</span>
                    <span v-show="index !== selectedIndex" class="text col-md-4">{{section.username}}</span>
                    <span v-show="index !== selectedIndex" class="text col-md-3">{{section.level == 0 ?  'admin' : 'dean'}}</span>
                    <input :class="{ 'is-invalid': sectionInvalid }" v-if="showEditText === true && index === selectedIndex" type="text" v-model="newSectionName" class="form-control" id="" placeholder="">
                    <!-- General tools such as edit or delete-->
                    <div v-show="index !== selectedIndex" class="tools">
                      <i @click="deleteSection(section.id)" class="fas fa-lg fa-trash"></i>
                    </div>
                    <div v-if="showEditText === true && index === selectedIndex" class="tools">
                      <i @click="updateSection(section.id, newSectionName)" class="fas fa-lg fa-check text-success"></i>
                      <i @click="cancelEdit()" class="fas fa-lg fa-window-close"></i>
                    </div>
                  </li>
                </ul>
                
              </div>
              <!-- /.card-body -->
              <div class="card-footer clearfix">
                <div class="form-group form-inline">
                  
                <form action="../../index.html" method="post">
                <div class="input-group mb-3 justify-content-center">
                    <ul :key="errorMessage" v-for="errorMessage in errorMessages">
                    <li class="login-box-msg text-danger">{{errorMessage}}</li>
                  </ul>
                  <p class="login-box-msg text-success">{{successMessage}}</p>
                  </div>
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
                  <input required minlength="8" :class="{ 'is-invalid': passwordInvalid }" v-model="password" type="password" class="form-control" placeholder="Password">
                  <div class="input-group-append">
                      <div class="input-group-text">
                      <span class="fas fa-lock"></span>
                      </div>
                  </div>
                  <span class="error invalid-feedback">Please enter password  (minimum of 8 characters)</span>
                  </div>
                  <div class="input-group mb-3">
                    <input required minlength="8" :class="{ 'is-invalid': repasswordInvalid }" v-model="repassword" type="password" class="form-control" placeholder="Retype password">
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
                      <option  value="1">dean</option>
                      <option  value="0">admin</option>
                    </select>
                    <div class="input-group-append">
                        <div class="input-group-text">
                        <span class="fas fa-user"></span>
                        </div>
                    </div>
                    <span class="error invalid-feedback">Please select user level</span>
                  </div>
                  <div class="input-group mb-3 justify-content-center">
                    <button @click="register()" type="button" class="btn btn-primary float-right">Register</button>
                  </div>
                </form>
                &nbsp;&nbsp;
                
                </div>
              </div>
              <div v-if="nowLoading" class="overlay"><i class="fas fa-2x fa-sync-alt fa-spin"></i></div>
            </div>
      </div>
    </div>
  </section>
</template>

<script>
  import $ from 'jquery';
  import 'admin-lte/plugins/bootstrap/js/bootstrap.bundle.min.js';
  import axios from 'axios';
  import 'admin-lte/dist/js/adminlte.js';

  export default {
    name: 'Sections',
    data() {
      return {
        sections: '',
        nowLoading: true,
        showEditText: false,
        newSectionName: '',
        selectedIndex: '',
        sectionInvalid: false,
        addSectionName: '',
        newSectionInvalid: false,
        username: "",
        firstname: "",
        lastname: "",
        username: "",
        password: "",
        repassword: "",
        fnameInvalid: 0,
        lnameInvalid: 0,
        unameInvalid: 0,
        validEntry: true,
        passwordInvalid: 0,
        repasswordInvalid: 0,
        levelInvalid: 0,
        selectedLevel: "select user level",
        successMessage: '',
        searchedFactor: '',
      }
    },
    mounted() {
      // get the sections
      let formData = new FormData();
      formData.append('userId', localStorage.getItem('userId'));
      formData.append('token', localStorage.getItem('validatorToken'));
      axios.post(
        process.env.VUE_APP_ROOT_API + 'admin/get-users.php',formData,
        {
        headers: {
        'Content-Type': 'multipart/form-data', 
        }
      }
      ).then((response) => {
      var result = response.data
      if (result.status === 'success') {
        this.sections = result.sections
      } else {
        this.sections = [];
      }
      this.nowLoading = false;
      }).catch((response) => {
        //handle error
        this.nowLoading = false;
        console.log(response)
      });
    },
    methods : {
      addSection (section) {
        if (section === '') {
          this.newSectionInvalid = true
        } else {
          this.newSectionInvalid = false
          this.nowLoading = true;
          let formData = new FormData();
          formData.append('userId', localStorage.getItem('userId'));
          formData.append('token', localStorage.getItem('validatorToken'));
          formData.append('section', section);
          axios.post(
            process.env.VUE_APP_ROOT_API + 'admin/add-section.php',formData,
            {
            headers: {
            'Content-Type': 'multipart/form-data', 
            }
          }
          ).then((response) => {
          var result = response.data
          if (result.status === 'success') {
            location.reload()
          }
          this.nowLoading = false;
          }).catch((response) => {
            //handle error
            this.nowLoading = false;
            console.log(response)
          });
        }
      },
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
              // get the sections
              let formData = new FormData();
              formData.append('userId', localStorage.getItem('userId'));
              formData.append('token', localStorage.getItem('validatorToken'));
              axios.post(
                process.env.VUE_APP_ROOT_API + 'admin/get-users.php',formData,
                {
                headers: {
                'Content-Type': 'multipart/form-data', 
                }
              }
              ).then((response) => {
              var result = response.data
              if (result.status === 'success') {
                this.sections = result.sections
              } else {
                this.sections = [];
              }
              this.nowLoading = false;
              }).catch((response) => {
                //handle error
                this.nowLoading = false;
                console.log(response)
              });

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
      },
      editSection(index, id, name) {
        this.selectedIndex = index;
        this.newSectionName = name;
        this.showEditText = true;
      },
      deleteSection (id) {
        if (confirm('Are you sure you want to delete this user?')) {
          let formData = new FormData();
          formData.append('userId', localStorage.getItem('userId'));
          formData.append('token', localStorage.getItem('validatorToken'));
          formData.append('sectionId', id);
          axios.post(
            process.env.VUE_APP_ROOT_API + 'admin/delete-user.php',formData,
            {
            headers: {
            'Content-Type': 'multipart/form-data', 
            }
          }
          ).then((response) => {
          var result = response.data
          if (result.status === 'success') {
            location.reload()
          }
          this.nowLoading = false;
          }).catch((response) => {
            //handle error
            this.nowLoading = false;
            console.log(response)
          });
        } else {
          // Do nothing!
          console.log('Thing was not saved to the database.');
        }
      },
      updateSection (id, name) {
        if (name === '') {
          this.sectionInvalid = true
        } else {
          this.nowLoading = true
          let formData = new FormData();
          formData.append('userId', localStorage.getItem('userId'));
          formData.append('token', localStorage.getItem('validatorToken'));
          formData.append('sectionId', id);
          formData.append('sectionName', name);
          axios.post(
            process.env.VUE_APP_ROOT_API + 'admin/update-section.php',formData,
            {
            headers: {
            'Content-Type': 'multipart/form-data', 
            }
          }
          ).then((response) => {
          var result = response.data
          if (result.status === 'success') {
            location.reload()
          }
          this.nowLoading = false;
          }).catch((response) => {
            //handle error
            this.nowLoading = false;
            console.log(response)
          });
        }
      },
      cancelEdit () {
        this.showEditText = false;
        this.selectedIndex = "";
      },
      getUploadedFile(){
        this.file = this.$refs.file.files[0];
      }
    },
    computed: {
      filteredResults: function () {
        let filterSection = this.searchedFactor
        if (filterSection !== "") {
          return this.sections
          .filter(
            (entry) => this.sections.length
              ? Object.keys(this.sections[0])
                  .some(key => ('' + entry[key]).toLowerCase().includes(filterSection))
              : true
          );
        }
        // let filterSection = this.searchedFactor
        // if (filterSection !== "") {
        //   return this.sections.filter(function(item) {
        //   let filtered = true
        //   filtered = filterSection.toLowerCase().split(' ').every(v => item.name.toLowerCase().includes(v))
        //   return filtered
        // })
        // }
        return this.sections
        
      },
    }
  }
</script>

<style>
  @import '~admin-lte/plugins/fontawesome-free/css/all.min.css';
  @import '~admin-lte/plugins/icheck-bootstrap/icheck-bootstrap.min.css';
  @import '~admin-lte/dist/css/adminlte.min.css';
</style>
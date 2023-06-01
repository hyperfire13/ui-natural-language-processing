<template>
  <section class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="card card-primary col-md-7">
              <div class="card-header bg-navy ui-sortable-handle" style="cursor: move;">
                <h3 class="card-title">
                  Schools
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
                    <span v-show="index !== selectedIndex" class="text col-md-4"><b>School Name:</b></span>
                  </li>
                </ul>
                <ul v-for="(section, index) in filteredResults" v-bind:key="section.id" class="todo-list ui-sortable" data-widget="todo-list">
                  
                  <li>
                    <!-- todo text -->
                    <span v-show="index !== selectedIndex" class="text col-md-6">{{section.name}}</span>
                    <input :class="{ 'is-invalid': sectionInvalid }" v-if="showEditText === true && index === selectedIndex" type="text" v-model="newSectionName" class="form-control" id="" placeholder="">
                    <!-- General tools such as edit or delete-->
                    <div v-show="index !== selectedIndex" class="tools">
                        <i @click="editSection(index, section.id, section.name)" class="fas fa-lg fa-edit"></i>
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
                    <input :class="{ 'is-invalid': fnameInvalid }" v-model="firstname" type="text" class="form-control" placeholder="School name">
                    <div class="input-group-append">
                        <div class="input-group-text">
                        <span class="fas fa-user"></span>
                        </div>
                    </div>
                    <span class="error invalid-feedback">Please enter school name</span>
                  </div>
                  <div class="input-group mb-3 justify-content-center">
                    <button @click="register()" type="button" class="btn btn-primary float-right">Add School</button>
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
      this.getSchools();
    },
    methods : {
        getSchools() {
        // get the schools
        let formData = new FormData();
        formData.append('userId', localStorage.getItem('userId'));
        formData.append('token', localStorage.getItem('validatorToken'));
        axios.post(
          process.env.VUE_APP_ROOT_API + 'admin/get-schools.php',formData,
          {
          headers: {
          'Content-Type': 'multipart/form-data', 
          }
        }
        ).then((response) => {
        var result = response.data
        if (result.status === 'success') {
          this.sections = result.schools
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
        this.successMessage= "";
        this.validEntry = true;

        if (this.firstname === '') {
          this.unameInvalid = 1;
          this.validEntry = false;
        }
        if (this.validEntry === true){
          this.nowLoading = true;
          let formData = new FormData();
          formData.append('userId', localStorage.getItem('userId'));
          formData.append('token', localStorage.getItem('validatorToken'));
          formData.append('schoolName', this.firstname);
          axios.post(
            process.env.VUE_APP_ROOT_API + 'admin/add-school.php',formData,
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
              this.firstname = "";
              this.validEntry = true;
              this.getSchools();

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
            process.env.VUE_APP_ROOT_API + 'admin/delete-school.php',formData,
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
            process.env.VUE_APP_ROOT_API + 'admin/update-school.php',formData,
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
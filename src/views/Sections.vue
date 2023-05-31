<template>
  <section class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="card card-primary col-md-6">
              <div class="card-header ui-sortable-handle" style="cursor: move;">
                <h3 class="card-title">
                  Sections
                </h3>
              </div>
              <!-- /.card-header -->
              <div class="card-body">
                <div class="form-group">
                          <label class="text-dark">School Name:</label>
                          <select v-on:change="getSections(selectedSchool)" v-model="selectedSchool" :class="{ 'is-invalid': schoolInvalid }" class="form-control">
                            <option value="">choose a school</option>
                            <option v-for="(school, index) in schools" :key="index" v-bind:value="school.id"> {{school.name}}</option>
                          </select>
                        </div>
                <ul v-for="(section, index) in sections" v-bind:key="section.id" class="todo-list ui-sortable" data-widget="todo-list">
                  <li>
                    <!-- todo text -->
                    <span v-show="index !== selectedIndex" class="text">{{section.name}}</span>
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
              <div v-if="nowLoading" class="overlay"><i class="fas fa-2x fa-sync-alt fa-spin"></i></div>
              <!-- /.card-body -->
              <div class="card-footer clearfix">
                <div class="form-group form-inline">
                <input  :class="{ 'is-invalid': newSectionInvalid }"  type="text" v-model="addSectionName" class="form-control col-md-6" id="" placeholder="">
                &nbsp;&nbsp;
                <button @click="addSection(addSectionName, selectedSchool)" type="button" class="btn btn-primary float-right"><i class="fas fa-plus"></i> Add Section</button>
                </div>
              </div>
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
        fnameInvalid: 0,
        lnameInvalid: 0,
        unameInvalid: 0,
        levelInvalid: 0,
        passwordInvalid: 0,
        repasswordInvalid: 0,
        successMessage: "",
        validEntry : true,
        selectedSchool: ""
      }
    },
    mounted() {
      this.getSchools();
    },
    methods : {
      getSections(schoolId) {
        this.nowLoading = true;
        // get the sections
        let formData = new FormData();
        formData.append('userId', localStorage.getItem('userId'));
        formData.append('token', localStorage.getItem('validatorToken'));
        formData.append('schoolId', schoolId);
        axios.post(
          process.env.VUE_APP_ROOT_API + 'admin/get-sections.php',formData,
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
      addSection (section, schoolId) {
        if (section === '' || schoolId === "") {
          this.newSectionInvalid = true
        } else {
          this.newSectionInvalid = false
          this.nowLoading = true;
          let formData = new FormData();
          formData.append('userId', localStorage.getItem('userId'));
          formData.append('token', localStorage.getItem('validatorToken'));
          formData.append('section', section);
          formData.append('schoolId', schoolId);
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
      editSection(index, id, name) {
        this.selectedIndex = index;
        this.newSectionName = name;
        this.showEditText = true;
      },
      deleteSection (id) {
        if (confirm('Are you sure you want to delete this section?')) {
          let formData = new FormData();
          formData.append('userId', localStorage.getItem('userId'));
          formData.append('token', localStorage.getItem('validatorToken'));
          formData.append('sectionId', id);
          axios.post(
            process.env.VUE_APP_ROOT_API + 'admin/delete-section.php',formData,
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
          this.schools = result.schools
        } else {
          this.schools = [];
        }
        this.nowLoading = false;
        }).catch((response) => {
          //handle error
          this.nowLoading = false;
          console.log(response)
        });
      },
      cancelEdit () {
        this.showEditText = false;
        this.selectedIndex = "";
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
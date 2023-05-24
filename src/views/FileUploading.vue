<template>
  <section class="content bg-olive">
    <div class="container-fluid">
      <div class="row justify-content-center">
        <!-- left column -->
        <div class="col-md-6">
          <div class="card card-primary text-dark">
              <div class="card-header bg-olive">
                  <h3 class="card-title">Students' Records</h3>
              </div>
              <!-- /.card-header -->
              <!-- form start -->
              <form>
                  <div class="card-body">
                    <div class="form-group">
                      <div class="form-group">
                        <input :class="{ 'is-invalid': fileInvalid }" ref="file" v-on:change="getUploadedFile()" type="file" class="form-control-file" id="exampleFormControlFile1">
                        <span class="error invalid-feedback">Please select a file with .CSV format</span>
                        <i class="text-primary">File with .CSV format only</i>
                      </div>
                    </div>
                    <div class="row justify-content-center">
                      <div class="col-sm-6">
                        <div class="form-group">
                          <label>School Year:</label>
                          <select v-model="selectedYear" :class="{ 'is-invalid': sectionInvalid }" class="form-control">
                            <option value="">choose a school year</option>
                            <option v-for="(section, index) in sections" :key="index" v-bind:value="section.id"> {{section.name}}</option>
                          </select>
                          <span class="error invalid-feedback">Please select a school year</span>
                        </div>
                      </div>
                    </div>
                    <h3 v-if="uploadedSuccess === true" class="text-success">Successfully uploaded!</h3>
                    <h3 v-if="uploadedSuccess === false" class="text-danger">{{errorMessage}}</h3>
                  </div>
                  
                  <!-- /.card-body -->
                  <div class="card-footer">
                  <button type="submit" v-on:click="startAssessment()" class="btn btn-primary float-right">Upload</button>
                  </div>
              </form>
              <div v-if="nowLoading" class="overlay"><i class="fas fa-2x fa-sync-alt fa-spin"></i></div>
          </div>
        <!-- /.card -->
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
    name: 'FileUploading',
    data() {
      return {
        selectedYear:"",
        fileInvalid:false,
        nowLoading: true,
        sectionInvalid: false,
        sections: [],
        file: '',
        uploadedSuccess: '',
        errorMessage: '',
      }
    },
    mounted() {
      this.getSchoolYear();
      
    },
    methods : {
      getSchoolYear() {
        // get the sections
        let formData = new FormData();
        formData.append('userId', localStorage.getItem('userId'));
        formData.append('token', localStorage.getItem('validatorToken'));
        axios.post(
          process.env.VUE_APP_ROOT_API + 'admin/get-year.php',formData,
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
      startAssessment() {
        // check if subject, module and a section was selected
        this.sectionInvalid = false;
        this.fileInvalid = false;
        if (this.file === "") {
          this.fileInvalid = true;
        }
        if (this.file !== "") {
          if (this.file.name.split(".").pop() !== 'csv') {
             this.fileInvalid = true;
          }
        }
        if (this.selectedYear === "") {
          this.sectionInvalid = true
        } 
        if (this.sectionInvalid !== true && this.fileInvalid !== true) {
          this.nowLoading = true;
          let formData = new FormData();
          formData.append('userId', localStorage.getItem('userId'));
          formData.append('token', localStorage.getItem('validatorToken'));
          formData.append('file', this.file);
          formData.append('selectedYear', this.selectedYear)
          axios({
            method: 'post',
            url: process.env.VUE_APP_ROOT_API + 'admin/start-assessment.php',
            data: formData,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
          })
          .then( (response) => {
            var result = response.data
            if (result.status === 'success') {
              this.uploadedSuccess = true;
              this.selectedYear = '';
              this.$refs.file.value = null;
              this.getSchoolYear();
            }
            else {
              this.uploadedSuccess = false;
              this.errorMessage = "Error in uploading! Please re-check the data in your csv file"
            }
          this.nowLoading = false;
            
          })
          .catch((response) => {
            //handle error
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
  /* @import '~admin-lte/plugins/fontawesome-free/css/all.min.css';
  @import '~admin-lte/plugins/icheck-bootstrap/icheck-bootstrap.min.css';
  @import '~admin-lte/dist/css/adminlte.min.css'; */
</style>
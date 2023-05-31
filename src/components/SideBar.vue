<template>
  <!-- Main Sidebar Container -->
  <aside class="main-sidebar sidebar-dark-primary elevation-4">
    <router-link to="" class="brand-link disabled">
        <img
            src="../assets/logo-program.png"
            alt="AdminLTE Logo"
            class="brand-image img-circle elevation-3"
            style="opacity: 0.8"/>
        <span class="brand-text font-weight-light">Program Prediction</span>
    </router-link>

    <div class="sidebar">
        <div class="user-panel mt-3 pb-3 mb-3 d-flex">
            <div v-if="nowLoading" class="overlay"><i class="fas text-white fa-2x fa-sync-alt fa-spin"></i></div>
            <div class="image">
                <img
                    src="../assets/img/default-profile.png"
                    class="img-circle elevation-2"
                    alt="User Image"
                />
            </div>
            <div class="info">
                <a href="#">
                    {{userFullName}}
                </a>
                
            </div>
            <div class="image">
                <span @click="logout()"><i class="nav-icon text-white fas fa-lg fa-sign-out-alt"></i></span>
            </div>
        </div>

        <nav class="mt-2">
            <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
              <li  class="nav-item">
                <router-link
                    to="/file-uploading"
                    class="nav-link"
                    active-class="active">
                    <i class="nav-icon fas fa-file"></i>
                    <p>Upload Proposal File</p>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link
                  to="/dashboard"
                  class="nav-link"
                  exact
                  exact-active-class="active">
                  <i class="nav-icon fas fa-tachometer-alt"></i>
                  <p>Generate Report</p>
                </router-link>
              </li>
              <li v-if="level === 0" class="nav-item ">
                <a href="javascript:void(0)" class="nav-link">
                  <i class="nav-icon fas fa-tachometer-alt"></i>
                  <p>
                    Settings
                    <i class="right fas fa-angle-right"></i>
                  </p>
                </a>
                <ul class="nav nav-treeview" style="display: none;">
                  <!-- <li class="nav-item">
                    <router-link
                      to="/factors"
                      class="nav-link"
                      active-class="active">
                      <i class="nav-icon fas fa-pen"></i>
                      <p>Factors and Intervention</p>
                    </router-link>
                  </li> -->
                   <li class="nav-item">
                    <router-link
                      to="/users"
                      class="nav-link"
                      active-class="active">
                      <i class="nav-icon fas fa-pen"></i>
                      <p>Schools</p>
                    </router-link>
                  </li>
                  <li class="nav-item">
                    <router-link
                      to="/sections"
                      class="nav-link"
                      active-class="active">
                      <i class="nav-icon fas fa-pen"></i>
                      <p>Sections</p>
                    </router-link>
                  </li>
                  <!-- <li class="nav-item">
                    <router-link
                      to="/users"
                      class="nav-link"
                      active-class="active">
                      <i class="nav-icon fas fa-pen"></i>
                      <p>Users</p>
                    </router-link>
                  </li> -->
                  <!-- <li class="nav-item">
                    <router-link
                      to="/archived-factors"
                      class="nav-link"
                      active-class="active">
                      <i class="nav-icon fas fa-pen"></i>
                      <p>Archived Factors</p>
                    </router-link>
                  </li> -->
                </ul>
              </li>
              <li class="nav-item">
              </li>
            </ul>
        </nav>
    </div>
    
  </aside>
</template>

<script>
import 'admin-lte/plugins/jquery/jquery.min.js';
// npm install @types/jquery --save
import $ from 'jquery';
// import jQuery from 'jquery';

import 'admin-lte/plugins/bootstrap/js/bootstrap.bundle.min.js';
import 'admin-lte/dist/js/adminlte.js';
import axios from 'axios';
export default {
  name: 'Sidebar',
  data() {
    return {
        userFullName: "User User",
        nowLoading: true,
        level: 0,
    }
  },
  mounted () {
    this.level = parseInt(localStorage.getItem('level'))
    this.userName = this.$route.params + ' ' + this.$route.params.lastname;
    // get the details of the current user
    let formData = new FormData();
    formData.append('userId', localStorage.getItem('userId'));
    formData.append('token', localStorage.getItem('validatorToken'));
    axios.post(
      process.env.VUE_APP_ROOT_API + 'admin/get-user-info.php',formData,
      {
      headers: {
      'Content-Type': 'multipart/form-data', 
      }
    }
    ).then((response) => {
    var result = response.data
    if (result.status === 'success') {
      this.userFullName = result.firstName + ' ' + result.lastName
      this.nowLoading = false;
    } else {
      this.$router.push({ name: 'Login'});
    }
    this.nowLoading = false;
    }).catch((response) => {
      //handle error
      this.nowLoading = false;
      console.log(response)
    });
  },
  props: {
    // userFullName: String
  },
   methods: {
    logout() {
      localStorage.removeItem('validatorToken')
      localStorage.removeItem('userId')
      localStorage.removeItem('level')
      this.$router.push({ name: 'Login'})
    },
   }
}
</script>

<style>
  @import '~admin-lte/plugins/fontawesome-free/css/all.min.css';
  @import '~admin-lte/plugins/icheck-bootstrap/icheck-bootstrap.min.css';
  @import '~admin-lte/dist/css/adminlte.min.css';
</style>

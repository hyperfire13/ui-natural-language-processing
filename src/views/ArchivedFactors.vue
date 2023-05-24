<template>
  <section class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="card card-primary col-md-12">
              <div class="card-header ui-sortable-handle" style="cursor: move;">
                <h3 class="card-title">
                  Archived Factors Management
                </h3>
              </div>
              <!-- /.card-header -->
              <div class="card-body">
                <div class="row">
                  <div class="col-md-12" style="overflow-y:scroll;;max-height: 630px;">
                    <div class="form-group mx-sm-3 mb-2">
                       <div class="input-group input-group-sm" style="width: 350px;">
                        <input v-model="searchedFactor" type="text" name="table_search" class="form-control float-right" placeholder="Search factor">
                          <div class="input-group-append">
                            <button type="submit" class="btn btn-default">
                              <i class="fas fa-search"></i>
                            </button>
                          </div>
                        </div>
                    </div>
                    <div v-if="filteredResults.length === 0" class="text-center">
                        <h5>No Arhived Factors found</h5>
                    </div>
                    <ul v-for="(factor, index) in filteredResults" v-bind:key="factor.id" class="todo-list ui-sortable" data-widget="todo-list">
                      <li @click="showIntervention(index, factor.interventions)" >
                        <!-- todo text -->
                        <div class="callout callout-info">
                            <h5> 
                              <span :class="{ 'bg-info': factorSelected === index }" v-show="index !== selectedIndex" class="text">{{factor.name}}</span>
                              <!-- General tools such as edit or delete-->
                          <div v-show="index !== selectedIndex" class="tools">
                            <i @click="deleteFactor(factor.id)" class="fas fa-lg fa-sync"></i>
                          </div>
                        
                              <input :class="{ 'is-invalid': newFactorInvalid }" v-if="showEditText === true && index === selectedIndex" type="text" v-model="newFactorName" class="form-control" id="" placeholder="Enter factor name">
                            </h5>
                          <br>
                          <ul v-show="factorSelected === index" v-for="(inv, child_index) in factor.interventions" v-bind:key="child_index">
                              <li>
                                  <div v-show="index !== selectedIndex">{{inv.name}}</div>
                                  <input :class="{ 'is-invalid': newInvInvalid }" v-if="showEditText === true && index === selectedIndex" type="text" v-model="inv.name" class="form-control" id="" placeholder="Enter intervention">
                              </li>
                          </ul>
                          
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                
                
              </div>
              <div v-if="nowLoading" class="overlay"><i class="fas fa-2x fa-sync-alt fa-spin"></i></div>
              <!-- /.card-body -->
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
        factors: [],
        nowLoading: true,
        showEditText: false,
        newFactorName: '',
        selectedIndex: '',
        sectionInvalid: false,
        newFactorInvalid: false,
        factorInvalid: false,
        newInvInvalid: false,
        interventions: [],
        oldInterventions: '',
        showpanel: true,
        factorSelected: '',
        selectedIntervention: [],
        searchedFactor: ''
      }
    },
    mounted() {
      // get the sections
      let formData = new FormData();
      formData.append('userId', localStorage.getItem('userId'));
      formData.append('token', localStorage.getItem('validatorToken'));
      axios.post(
        process.env.VUE_APP_ROOT_API + 'admin/get-archived-factors.php',formData,
        {
        headers: {
        'Content-Type': 'multipart/form-data', 
        }
      }
      ).then((response) => {
      var result = response.data
      if (result.status === 'success') {
        this.factors = result.factors
        for (let index = 0; index < this.factors.length; index++) {
          this.factors[index].interventions = JSON.parse(this.factors[index].interventions);
        }
        
      } else {
        this.factors = [];
      }
      this.nowLoading = false;
      }).catch((response) => {
        //handle error
        this.nowLoading = false;
        console.log(response)
      });
    },
    methods : {
      addFactor(name) {
        if (name === '') {
          this.newFactorInvalid = true;
        } else {
          let formData = new FormData();
          this.nowLoading = true;
          formData.append('userId', localStorage.getItem('userId'));
          formData.append('token', localStorage.getItem('validatorToken'));
          formData.append('factorName', name);
          formData.append('intervention', JSON.stringify(this.interventions));
          axios.post(
            process.env.VUE_APP_ROOT_API + 'admin/add-factor.php',formData,
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
      removeIntervention (index) {
        this.interventions.splice(index, 1);
      },
      addIntervenstion () {
        this.interventions.push({name:''});
      },
      editFactor(index, id, name) {
        this.selectedIndex = index;
        this.newFactorName = name;
        this.showEditText = true;
        this.showpanel = false;
      },
      deleteFactor (id) {
        if (confirm('Are you sure you want to restore this factor?')) {
          let formData = new FormData();
          formData.append('userId', localStorage.getItem('userId'));
          formData.append('token', localStorage.getItem('validatorToken'));
          formData.append('factorId', id);
          axios.post(
            process.env.VUE_APP_ROOT_API + 'admin/restore-factor.php',formData,
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
      updateFactor (id, name, interventions) {
        if (name === '') {
          this.newFactorInvalid = true
        } else {
          this.nowLoading = true
          let formData = new FormData();
          formData.append('userId', localStorage.getItem('userId'));
          formData.append('token', localStorage.getItem('validatorToken'));
          formData.append('factorId', id);
          formData.append('factorName', name);
          formData.append('interventions', JSON.stringify(interventions));
          axios.post(
            process.env.VUE_APP_ROOT_API + 'admin/update-factor.php',formData,
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
        this.showpanel = true;
      },
      getUploadedFile(){
        this.file = this.$refs.file.files[0];
      },
      showIntervention(index, intervention) {
        this.selectedIntervention = intervention;
        this.factorSelected = index;
      },
      addIntervention2 (index) {
        alert(JSON.stringify(this.factors[index]))
        this.filteredResults[index].interventions.push( { "name": "" })
      }
    },
    computed: {
      filteredResults: function () {
        let filterSection = this.searchedFactor
        if (filterSection !== "") {
          return this.factors.filter(function(item) {
          let filtered = true
          filtered = filterSection.toLowerCase().split(' ').every(v => item.name.toLowerCase().includes(v))
          return filtered
        })
        }
        return this.factors
        
      },
    }
  }
</script>

<style>
  /* @import '~admin-lte/plugins/fontawesome-free/css/all.min.css';
  @import '~admin-lte/plugins/icheck-bootstrap/icheck-bootstrap.min.css';
  @import '~admin-lte/dist/css/adminlte.min.css'; */
</style>
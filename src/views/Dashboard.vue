<template>
  <!-- Content Header (Page header) -->
  <!-- <div class="content-header">
      <div class="container-fluid">
          <div class="row mb-2">
              <div class="col-sm-6">
                  <h1>Module 1 - Future Tense</h1>
              </div>
          </div>
      </div>
  </div> -->
  <!-- /.content-header -->

  <!-- Main content -->
  <section class="content">
    <div class="card bg-navy card-tabs">
      <div class="card-header p-0 pt-1">
        <ul class="nav nav-tabs bg-olive" id="custom-tabs-one-tab" role="tablist">
          <li class="nav-item">
            <a v-on:click="switchTab(1)" class="nav-link active text-dark" id="custom-tabs-one-home-tab" data-toggle="pill" href="#custom-tabs-one-home" role="tab" aria-controls="custom-tabs-one-home" aria-selected="false"><b>Research Proposal Categories</b></a>
          </li>
          <li v-on:click="switchTab(4)" class="nav-item">
            <a class="nav-link text-dark" id="custom-tabs-one-messages-tab2" data-toggle="pill" href="#custom-tabs-one-messages2" role="tab" aria-controls="custom-tabs-one-messages2" aria-selected="false"><b>Graph Reports</b></a>
          </li>
        </ul>
      </div>
      <div class="card-body ">
        <div class="tab-content" id="custom-tabs-one-tabContent">
          <!-- GWA and Track tab  -->
          <div class="tab-pane fade active show" id="custom-tabs-one-home" role="tabpanel" aria-labelledby="custom-tabs-one-home-tab">
            <!-- GWA and Track table -->
            <section class="content text-dark">
              <div class="row">
                <div class="col-12">
                  <div class="card">
                    <div class="card-header">
                      <div class="row">
                        <div class="col-md-12">
                          <!-- <h3 class="card-title">Students' Profile</h3> -->
                          <h3 class="card-title"> 
                            <b>Research Proposal Categories</b>
                            
                          </h3>
                          <div class="form-inline float-right">
                            <div class="form-group mb-2">
                              <label class="" for="autoSizingCheck">
                                  SY: &nbsp;
                              </label>
                              <select id="resultsYearSelector" v-on:change="getSchools()" v-model="selectedYear" class="form-control">
                                <option value="">choose a year</option>
                                <option v-for="(sy, index) in schoolYear" :key="index" v-bind:value="sy.id"> {{sy.name}}</option>
                              </select>
                            </div>
                            <div class="form-group mx-sm-3 mb-2">
                              <label class="" for="autoSizingCheck">
                                School: &nbsp;
                              </label>
                              <select id="schoolNameSelector" v-on:change="showResearchProposals()" v-model="selectedSchool"  class="form-control">
                                <option value="">choose a school</option>
                                <!-- <option value="0">All School</option> -->
                                <option v-for="(sy, index) in schools" :key="index" v-bind:value="sy.id"> {{sy.name}}</option>
                              </select>
                            </div>
                            <div class="form-group mx-sm-3 mb-2">
                              <button :disabled="finalResults.length === 0"  @click="downloadReport(selectedYear, selectedSchool)" type="button" class="btn btn-info">
                              <i class="fas fa-download"></i>
                              </button>
                              &nbsp;
                              <button :disabled="finalResults.length === 0"  @click="printReport(selectedYear, selectedSchool)" type="button" class="btn btn-info">
                              <i class="fas fa-print"></i>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <!-- /.card-header -->
                    <div class="card-body table-responsive p-0" style="height: 800px;">
                      <div v-if="filteredResults.length === 0" class="text-center">
                        <h5>No records to show</h5>
                        <h7>(Please choose school year and school)</h7>
                      </div>
                      <div v-if="finalResults.length > 0" class="text-center">
                        <!-- <h4>College of Computer Studies</h4> -->
                        <h5 id="csvTitle" class="card-text">Research Categories {{selectedSchoolName}} School Year: {{yearName}}</h5>
                      </div>
                        <table v-if="finalResults.length > 0" class="table table-hover table-head-fixed  text-nowrap table-bordered text-center">
                          <thead>
                            <tr>
                              <th class="sticky-header">Research Title</th>
                              <th>SECTION</th>
                              <th>CATEGORY</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              
                            </tr>
                            <tr v-for="(result, index) in finalResults" :key="index">
                              <td>{{result.title}}</td>
                              <td>{{result.sectionName}}</td>
                              <td class="bg-navy">{{result.category}}</td>
                            </tr>
                          </tbody>
                        </table>
                    </div>
                    <div v-if="nowLoading" class="overlay"><i class="fas fa-2x fa-sync-alt fa-spin"></i></div>
                    <!-- /.card-body -->
                  </div>
                  <!-- /.card -->
                </div>
              </div>
            </section>
          </div>
          <!-- GRAPHS tab -->
          <div class="tab-pane fade text-dark" id="custom-tabs-one-messages2" role="tabpanel" aria-labelledby="custom-tabs-one-messages-tab">
            <section class="content">
              <div class="card" id="captureGraph">
                <div class="card-header">
                  <h3 class="card-title">
                    <b>GRAPH</b>
                  </h3>
                <div class="form-inline float-right">
                    <div class="form-group mb-2">
                      <label class="" for="autoSizingCheck">
                          SY: &nbsp;
                        </label>
                        <select id="attritionYearSelector" v-on:change="getSchools()" v-model="selectedYear"  class="form-control">
                          <option value="">choose a year</option>
                          <option v-for="(sy, index) in schoolYear" :key="index" v-bind:value="sy.id"> {{sy.name}}</option>
                        </select>
                    </div>
                    &nbsp;&nbsp;
                    <div class="form-group mb-2">
                      <label class="" for="autoSizingCheck">
                          School: &nbsp;
                        </label>
                        <select id="schoolNameSelector" v-on:change="showFinalResults(4)" v-model="selectedSchool"  class="form-control">
                          <option value="">choose a school</option>
                          <!-- <option value="0">All School</option> -->
                          <option v-for="(sy, index) in schools" :key="index" v-bind:value="sy.id"> {{sy.name}}</option>
                        </select>
                    </div>
                    
                    <div class="form-group mx-sm-3 mb-2">
                      <button :disabled="attritionResults.length === 0" @click="downloadAttrition()" type="button" class="btn btn-info btn-sm">
                        <i class="fas fa-download"></i>
                      </button>
                      &nbsp;
                      <button :disabled="attritionResults.length === 0" @click="printAttrition()" type="button" class="btn btn-info btn-sm">
                        <i class="fas fa-print"></i>
                      </button>
                    </div>
                  </div>
                </div>
                <div id="capture" class="card-body">
                  <div v-show="graphDisplay === 0" class="text-center">
                      <h5>No records to show</h5>
                      <h7>(Please choose school year)</h7>
                  </div>
                     
                  <div v-show="graphDisplay > 0" class="row">
                    <div class="col-md-5">
                      <div v-if="graphDisplay > 0" class="text-center">
                        <h6 class="card-text">Proposals submitted in {{selectedSchoolName}} SY {{yearName}}</h6>
                      </div>
                      <br>
                      <div id="chart-container" class="chart-responsive">
                        <canvas id="pieChart" height="200"></canvas>
                      </div>
                    </div>
                    <div class="col-md-7">
                      <ul class="chart-legend clearfix">
                        <li><i v-bind:style="{ color: globalPieColor[0] }" class="far fa-circle "></i> ANIB-DAMPI : <span class="badge" v-bind:style="{ color: globalPieColor[0]}" style="font-size:20px;">{{ graphLabel.anibdampi}}</span></li>
                        <li><i v-bind:style="{ color: globalPieColor[1] }" class="far fa-circle "></i> BALAT : <span class="badge" v-bind:style="{ color: globalPieColor[1]}" style="font-size:20px;">{{ graphLabel.balat}}</span></li>
                        <li><i v-bind:style="{ color: globalPieColor[2] }" class="far fa-circle "></i> YAMAN : <span class="badge" v-bind:style="{ color: globalPieColor[2]}" style="font-size:20px;">{{ graphLabel.yaman}}</span></li>
                        <li><i v-bind:style="{ color: globalPieColor[3] }" class="far fa-circle "></i> UGNAY : <span class="badge" v-bind:style="{ color: globalPieColor[3]}" style="font-size:20px;">{{ graphLabel.ugnay}}</span></li>
                        <li><i v-bind:style="{ color: globalPieColor[4] }" class="far fa-circle "></i> KAGYAT : <span class="badge" v-bind:style="{ color: globalPieColor[4]}" style="font-size:20px;">{{ graphLabel.kagyat}}</span></li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div v-if="nowLoading" class="overlay"><i class="fas fa-2x fa-sync-alt fa-spin"></i></div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- /.content -->
  <div class="modal fade" id="modal-default">
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">Adams Bob</h4>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="card">
            <div class="card-header border-0">
              <div class="d-flex justify-content-between">
                <h3 class="card-title">Competency Chart</h3>
                <!-- <a href="javascript:void(0);">View Report</a> -->
              </div>
            </div>
            <div class="card-body">
              <div class="d-flex">
                
              </div>
              <!-- /.d-flex -->
        
              <div class="position-relative mb-4"><div class="chartjs-size-monitor"><div class="chartjs-size-monitor-expand"><div class=""></div></div><div class="chartjs-size-monitor-shrink"><div class=""></div></div></div>
                <canvas id="competency-chart" height="200" style="display: block; width: 487px; height: 200px;" width="487" class="chartjs-render-monitor"></canvas>
              </div>
        
              <div class="d-flex flex-row justify-content-end">
                <span class="mr-2">
                  <i class="fas fa-square text-success"></i> Good
                </span>
        
                <span class="mr-2">
                  <i class="fas fa-square text-danger"></i> Needs Improvement
                </span>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer justify-content-between">
          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        </div>
      </div>
      <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
  </div>
  <!-- /.modal -->

</template>

<script>
  import $ from 'jquery';
  import 'admin-lte/plugins/bootstrap/js/bootstrap.bundle.min.js';
  import 'admin-lte/dist/js/adminlte.js';
  import 'admin-lte/plugins/chart.js/Chart.min.js';
  import html2canvas from 'html2canvas/dist/html2canvas.min.js'
  import axios from 'axios';
  export default {
    name: 'Dashboard',
     data() {
      return {
        selectedSchool:"",
        selectedYear:"",
        yearName: '',
        selectedSchoolName: '',
        sectionName: '',
        selectedSection:'',
        sections: [],
        schools:[],
        schoolYear: [],
        finalResults: [],
        nowLoading: false,
        factors: [],
        attritionResults: [],
        graphDisplay: 0,
        mode: '',
        graphLabel: '',
        globalPieColor: ['#00a65a', '#f56954', '#ffe3c6', '#5865f2', '#654321']
      }
    },
    mounted() {
      this.getSchoolYear();
      this.getSections();

    },
    methods: {
      getSchools() {
        // get the schools
        this.finalResults = [];
        this.schools = [];
        this.selectedSchool ='';
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
      showAttritionResults() {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        this.nowLoading = true;
        // get the sections
        let formData = new FormData();
        formData.append('userId', localStorage.getItem('userId'));
        formData.append('token', localStorage.getItem('validatorToken'));
        formData.append('selectedYear', this.selectedYear);
        axios.post(
          process.env.VUE_APP_ROOT_API + 'admin/get-attrition-results.php',formData,
          {
          headers: {
          'Content-Type': 'multipart/form-data', 
          }
        }
        ).then((response) => {
          var result = response.data
          if (result.status === 'success') {
            this.attritionResults = result.results

          } else {
            this.attritionResults = [];
          }
          this.nowLoading = false;
        }).catch((response) => {
          //handle error
          this.nowLoading = false;
          console.log(response)
        });
      },
      switchTab(tab) {
        this.selectedYear = "";
        this.selectedSection = "";
        this.yearName = '';
        this.selectedSchoolName ='';
        this.sectionName = '';
        this.finalResults = [],
        this.getSchoolYear();
        if (tab === 3) {
          this.attritionResults = [];
          
        }
        if (tab === 2) {
          this.factors = [];
        }
        if (tab === 1) {
          this.finalResults = [];
        }
        
      },
      getResults() {
        
      },
      getSchoolYear() {
        // get the sections
        let formData = new FormData();
        formData.append('userId', localStorage.getItem('userId'));
        formData.append('token', localStorage.getItem('validatorToken'));
        axios.post(
          process.env.VUE_APP_ROOT_API + 'admin/get-year-for-dashboard.php',formData,
          {
          headers: {
          'Content-Type': 'multipart/form-data', 
          }
        }
        ).then((response) => {
        var result = response.data
        if (result.status === 'success') {
          this.schoolYear = result.sections
        } else {
          this.schoolYear = [];
        }
        this.nowLoading = false;
        }).catch((response) => {
          //handle error
          this.nowLoading = false;
          console.log(response)
        });
      },
      getSections() {
        // get the sections
        let formData = new FormData();
        formData.append('userId', localStorage.getItem('userId'));
        formData.append('token', localStorage.getItem('validatorToken'));
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
      showResearchProposals() {
        this.nowLoading = true;
        // get the sections
        let formData = new FormData();
        formData.append('userId', localStorage.getItem('userId'));
        formData.append('token', localStorage.getItem('validatorToken'));
        formData.append('selectedYear', this.selectedYear);
        formData.append('selectedSchool', this.selectedSchool);
        axios.post(
          process.env.VUE_APP_ROOT_API + 'admin/show-research-proposals.php',formData,
          {
          headers: {
          'Content-Type': 'multipart/form-data', 
          }
        }
        ).then((response) => {
          var result = response.data
          if (result.status === 'success') {
            this.finalResults = result.result
            // alert(JSON.stringify(this.finalResults))
            var finalCount;
            this.yearName = $('#attritionYearSelector option:selected').text();
            this.selectedSchoolName = $('#schoolNameSelector option:selected').text();
           
            
          } else {
            this.finalResults = [];
          }
          this.nowLoading = false;
        }).catch((response) => {
          //handle error
          this.nowLoading = false;
          console.log(response)
        });
      },
      showFinalResults(mode) {
        this.nowLoading = true;
        // get the sections
        let formData = new FormData();
        formData.append('userId', localStorage.getItem('userId'));
        formData.append('token', localStorage.getItem('validatorToken'));
        formData.append('selectedYear', this.selectedYear);
        formData.append('selectedSchool', this.selectedSchool);
        axios.post(
          process.env.VUE_APP_ROOT_API + 'admin/get-final-results.php',formData,
          {
          headers: {
          'Content-Type': 'multipart/form-data', 
          }
        }
        ).then((response) => {
          var result = response.data
          this.mode = mode
          if (result.status === 'success') {
            // if mode === 4, this is for the graph
            if (this.mode === 4) {
              this.attritionResults = result
              this.graphDisplay = this.attritionResults.result !== undefined ? 1 : 0
              //  alert(JSON.stringify(this.attritionResults.result))
               var finalCount;
        var attritionSummary = {};
        var graphColor = ['#00a65a', '#f56954', '#ffe3c6', '#5865f2', '#654321'];
        // this.sectionName = $('#attritionSectionSelector option:selected').text();
        this.yearName = $('#attritionYearSelector option:selected').text();
        this.selectedSchoolName = $('#schoolNameSelector option:selected').text();
        if (this.attritionResults.result !== undefined) {
            finalCount = this.attritionResults.result
            this.graphLabel = this.attritionResults.result
            setTimeout(function () {
              //-------------
              // - PIE CHART -
              //-------------
              // Get context with jQuery - using jQuery's .get() method.
              // eslint-disable-next-line @typescript-eslint/no-empty-function
              $('#pieChart').remove(); 
              $('#chart-container').append('<canvas id="pieChart" height="150"></canvas>');
              const canvas = document.getElementById('pieChart');
              const pieChartCanvas = canvas.getContext('2d');
              const pieData = {
                labels: ['ANIB-DAMPI', 'BALAT', 'YAMAN', 'UGNAY', 'KAGYAT'],
                datasets: [
                  {
                    // data: [1, 1, 1, 1, 1],
                    data: [finalCount.anibdampi, finalCount.balat, finalCount.yaman, finalCount.ugnay, finalCount.kagyat],
                    backgroundColor: graphColor
                  }
                ]
              };
              const pieOptions = {
                legend: {
                  display: false
                }
              };
              // Create pie or douhnut chart
              // You can switch between pie and douhnut using the method below.
              // eslint-disable-next-line no-unused-vars
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              const pieChart = new Chart(pieChartCanvas, {
                type: 'doughnut',
                data: pieData,
                options: pieOptions
              });

              //-----------------
              // - END PIE CHART -
              //-----------------y
            },1000)
        }
            }
            
          } else {
            this.finalResults = [];
          }
          this.nowLoading = false;
        }).catch((response) => {
          //handle error
          this.nowLoading = false;
          console.log(response)
        });
      },
      showFactorResults() {
        this.nowLoading = true;
        // get the sections
        let formData = new FormData();
        formData.append('userId', localStorage.getItem('userId'));
        formData.append('token', localStorage.getItem('validatorToken'));
        formData.append('selectedYear', this.selectedYear);
        axios.post(
          process.env.VUE_APP_ROOT_API + 'admin/get-factor-results.php',formData,
          {
          headers: {
          'Content-Type': 'multipart/form-data', 
          }
        }
        ).then((response) => {
          var result = response.data
          if (result.status === 'success') {
            this.factors = result.results
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
      downloadReport(selectedYear, selectedSchool) {
        // get the sections
        this.nowLoading = true;
        let formData = new FormData();
        formData.append('userId', localStorage.getItem('userId'));
        formData.append('token', localStorage.getItem('validatorToken'));
        formData.append('selectedYear', selectedYear);
        formData.append('selectedSchool', selectedSchool);
        axios.post(
          process.env.VUE_APP_ROOT_API + 'admin/download-report.php',formData,
          {
            headers: {
            'Content-Type': 'multipart/form-data',
            }
          }
        ).then((response) => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', $('#csvTitle').text() + '.csv');
          document.body.appendChild(link);
          link.click();
          this.nowLoading = false;
          // var blob = new Blob([response.data]); //this make the magic
          // var blobURL = URL.createObjectURL(blob);

          // const iframe =  document.createElement('iframe'); //load content in an iframe to print later
          // document.body.appendChild(iframe);

          // iframe.style.display = 'none';
          // iframe.src = blobURL;
          // iframe.onload = function() {
          //   setTimeout(function() {
          //     iframe.focus();
          //     iframe.contentWindow.print();
          //   }, 1);
          // };
        }).catch((response) => {
          //handle error
          this.nowLoading = false;
          console.log(response)
        });
      },
      printReport(selectedYear, selectedSection) {
        // get the sections
        this.nowLoading = true;
        let formData = new FormData();
        formData.append('userId', localStorage.getItem('userId'));
        formData.append('token', localStorage.getItem('validatorToken'));
        formData.append('selectedYear', selectedYear);
        formData.append('selectedSchool', this.selectedSchool);
        formData.append('mode', this.mode);
        axios.post(
          process.env.VUE_APP_ROOT_API + 'admin/download-report.php',formData,
          {
            headers: {
            'Content-Type': 'multipart/form-data',
            }
          }
        ).then((response) => {
          var blob = new Blob([response.data]); //this make the magic
          var blobURL = URL.createObjectURL(blob);

          const iframe =  document.createElement('iframe'); //load content in an iframe to print later
          document.body.appendChild(iframe);

          iframe.style.display = 'none';
          iframe.src = blobURL;
          iframe.onload = function() {
            setTimeout(function() {
              iframe.focus();
              iframe.contentWindow.print();
            }, 1);
          };
          this.nowLoading = false;
        }).catch((response) => {
          //handle error
          this.nowLoading = false;
          console.log(response)
        });
      },
      downloadAttrition() {
        html2canvas(document.querySelector("#captureGraph")).then(canvas => {
          // document.body.appendChild(canvas)
          var uri = canvas.toDataURL();
          var link = document.createElement('a');
          if (typeof link.download === 'string') {
              link.href = uri;
              link.download = 'PROPOSAL '+ this.selectedSchoolName + ' SY ' + this.yearName + '.png';
              //Firefox requires the link to be in the body
              document.body.appendChild(link);
              //simulate click
              link.click();
              //remove the link when done
              document.body.removeChild(link);
          } else {
              window.open(uri);
          }
        });
      },
      printAttrition() {
        html2canvas(document.querySelector("#captureGraph")).then(canvas => {
          // document.body.appendChild(canvas)
          var uri = canvas.toDataURL();
          var printImage = canvas.toDataURL("image/png");
          var printWindow = window.print(printImage);
        });
      }
    },
    computed: {
      filteredResults: function () {
        let filterSection = this.selectedSection
        let selectedMode = this.mode
        let filterIndex = 0;
        setTimeout(() => {
          this.sectionName = $('#resultsSectionSelector option:selected').text();;
          this.yearName = $('#resultsYearSelector option:selected').text();
        }, 2000);
        
        if (filterSection !== "") {
          // if gwa track are selected
          if (selectedMode === 2 ) {
            filterIndex = 3;
          }
          return this.finalResults
            .filter(
              (entry) => this.finalResults.length
                ? Object.keys(this.finalResults[filterIndex])
                    .some(key => ('' + entry[key]).includes(filterSection))
                : true
            );
        }
        return this.finalResults
       
      },
      filteredFactors: function () {
        
        let filterSection = this.selectedSection
        this.yearName = $('#factorYearSelector option:selected').text()
        return this.factors.filter(function(item) {
          let filtered = true
          if(filterSection && filterSection.length > 0){
            filtered = item[1] == filterSection
          }
          return filtered
        })
      },
      filteredAttritions: function () {
        var finalCount;
        var attritionSummary = {};
        var graphColor = ['#00a65a', '#f56954', '#ffe3c6', '#5865f2', '#654321'];
        // this.sectionName = $('#attritionSectionSelector option:selected').text();
        this.yearName = $('#attritionYearSelector option:selected').text();
        this.selectedSchoolName = $('#schoolNameSelector option:selected').text();
        if (this.attritionResults.result !== undefined) {
            finalCount = this.attritionResults.result
            this.graphLabel = this.attritionResults.result
            setTimeout(function () {
              //-------------
              // - PIE CHART -
              //-------------
              // Get context with jQuery - using jQuery's .get() method.
              // eslint-disable-next-line @typescript-eslint/no-empty-function
              $('#pieChart').remove(); 
              $('#chart-container').append('<canvas id="pieChart" height="150"></canvas>');
              const canvas = document.getElementById('pieChart');
              const pieChartCanvas = canvas.getContext('2d');
              const pieData = {
                labels: ['ANIB-DAMPI', 'BALAT', 'YAMAN', 'UGNAY', 'KAGYAT'],
                datasets: [
                  {
                    // data: [1, 1, 1, 1, 1],
                    data: [finalCount.anibdampi, finalCount.balat, finalCount.yaman, finalCount.ugnay, finalCount.kagyat],
                    backgroundColor: graphColor
                  }
                ]
              };
              const pieOptions = {
                legend: {
                  display: false
                }
              };
              // Create pie or douhnut chart
              // You can switch between pie and douhnut using the method below.
              // eslint-disable-next-line no-unused-vars
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              const pieChart = new Chart(pieChartCanvas, {
                type: 'doughnut',
                data: pieData,
                options: pieOptions
              });

              //-----------------
              // - END PIE CHART -
              //-----------------y
            },1000)
        }
        return attritionSummary;
      },
    },
  }
</script>

<style>
  @import '~admin-lte/plugins/fontawesome-free/css/all.min.css';
  @import '~admin-lte/plugins/icheck-bootstrap/icheck-bootstrap.min.css';
  @import '~admin-lte/dist/css/adminlte.min.css';

  table td:first-child {
    position: sticky;
    left: 0;
    /* background-color: #1f67c5; */
    /* color: #ffffff; */
  }
  .sticky-header {
    z-index: 9 !important;
    position: sticky !important;
    left: 0;
    background-color: #ffffff;
    color: #373737;
  }
  /* table td:last-child {
    position: sticky;
    right: 0;
    background-color: #ffffff;
    color: #373737;
  } */
  table th:first-child {
    position: sticky;
    left: 0 !important;
    background-color: #ffffff !important;
    color: #373737 !important;
  }
</style>
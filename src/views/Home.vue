<template>
  <body class="hold-transition sidebar-mini bg-olive">
    <div class="wrapper">
  <!-- Navbar -->
  <nav class="main-header navbar navbar-expand navbar-white navbar-light bg-olive">
    <!-- Left navbar links -->
    <ul class="navbar-nav">
      <li class="nav-item">
        <a class="nav-link" data-widget="pushmenu" href="#" role="button"><i class="fas fa-bars"></i></a>
      </li>
      <li class="nav-item d-none d-sm-inline-block">
        <!-- <a href="index3.html" class="nav-link"><b>Home</b></a> -->
      </li>
      <!-- <li class="nav-item d-none d-sm-inline-block">
        <a href="#" class="nav-link">Contact</a>
      </li> -->
    </ul>
  </nav>
  <!-- /.navbar -->
      <Sidebar/>
      <!-- Content Wrapper. Contains page content -->
      <div class="content-wrapper bg-olive">
        <!-- Content Header (Page header) -->
        <div class="content-header">
          <div class="container-fluid">
            <div class="row mb-2">
              <div class="col-sm-6">
                <h1 class="m-0"></h1>
              </div><!-- /.col -->
              <!-- <div class="col-sm-6">
                <ol class="breadcrumb float-sm-right">
                  <li class="breadcrumb-item"><a href="#">Home</a></li>
                  <li class="breadcrumb-item active">Dashboard v3</li>
                </ol>
              </div> -->
              <!-- /.col -->
            </div><!-- /.row -->
          </div><!-- /.container-fluid -->
        </div>
          <router-view/>
      </div>
    </div>
  </body>
</template>

<script>
// @ is an alias to /src
import Sidebar from '/src/components/SideBar.vue'

export default {
  name: 'Home',
  components: {
    Sidebar
  },
  mounted() {
    

  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>

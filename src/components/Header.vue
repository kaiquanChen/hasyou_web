<template>
  <header class="header">
    <div class="row">
      <nav class="navbar navbar-light bg-light justify-content-between">
        <div class="col-sm-6">
          <a class="navbar-brand" href="#">
            <img src="../../static/image/header.png" width="30" height="30" class="d-inline-block align-top" alt="有你LOGO">
          </a>
          <a class="navbar-brand" href="#">电影</a>
          <a class="navbar-brand" href="#">书库</a>
          <a class="navbar-brand" href="#">阅读</a>
          <a class="navbar-brand" href="#">音乐</a>
          <a class="navbar-brand" href="#">同城</a>
          <a class="navbar-brand" href="#">论坛</a>
        </div>
        <div class="col-sm-2" style="">

        </div>
        <div class="col-sm-4">
          <form class="form-inline">
            <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
            <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
          </form>
        </div>
      </nav>
    </div>
  </header>
</template>

<style scoped>
  .row {
    margin: 0;
    padding: 0;
  }

  nav {
    background-color: grey;
  }

  nav a  {
    color: white;
  }

  nav a:hover {
    color: black;
  }

  form {
    margin: 7px 0 5px 25px;
  }
</style>

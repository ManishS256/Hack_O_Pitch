const store = new Vuex.Store({
  state: {
    wetwaste:false,
    drywaste:false,

  },
  mutations: {

  }
})

const homepage = {
  methods:{
    adminlogin: function(){
      console.log(1111)
      this.$router.push('/adminlogin')
    },
    userlogin: function(){
      console.log(1111)
      this.$router.push('/userlogin')
    },
    employeelogin: function(){
      console.log(1111)
      this.$router.push('/employeelogin')
    },
  },
  template:`<div> 
  <img src="./static/Kudawala.GIF">  
    <br><br></div>`
}

const adminlogin = {
  data: function() {
    return {adminusername:"",
            adminpassword:"",
          }
        },
  methods:{
    submit: async function(){
      if(this.adminusername=="" || this.adminpassword==""){
        alert("The Username and password should not be blank");
      }
      else if(this.adminusername.search('/') != -1 || this.adminpassword.search('/') != -1){
        alert("The Username and Password should not contain '/' character");
      }
      else{
        url="/api/adminlogin/"+this.adminusername+"/"+this.adminpassword;
        a= await fetch(url);
        response=await a.json();
        if(response.key){
          this.$store.state.key=response.key;
          this.$router.push('/adminpage')
        }
        else{
          console.log("NOT AVAILABLE")
        }
      }
    }
  },
  template:`<div>

    <br><br><br><br><br>
    <div class="container-sm border rounded">
      <h2>Admin Login </h2>
        <label for="exampleFormControlInput1" class="form-label">Username</label>
        <input class="form-control" id="exampleFormControlInput1" v-model="adminusername"><br>
        <label for="exampleFormControlInput2" class="form-label">Password</label>
        <input class="form-control" id="exampleFormControlInput2" v-model="adminpassword"><br>
        <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" checked>
        <label class="form-check-label" for="flexCheckChecked">Remember me</label><br><br>
        <button type="button" class="btn btn-primary" v-on:click="submit">Submit</button><br><br>
      </div>
    </div>`
}

const employeelogin = {
  data: function() {
    return {employeeid:"",
            employeepassword:"",
            societyname:"",
          }
        },
  methods:{
    submit: async function(){
      if(this.employeeid=="" || this.employeepassword==""){
        alert("The Username and password should not be blank");
      }
      else if(this.employeeid.search('/') != -1 || this.employeepassword.search('/') != -1){
        alert("The Username and Password should not contain '/' character");
      }
      else{
        url="/api/employeelogin/"+this.employeeid+"/"+this.employeepassword+"/"+this.societyname;
        a= await fetch(url);
        response=await a.json();
        if(response.key){
          this.$store.state.key=response.key;
          this.$router.push('/employeepage')
        }
        else{
          console.log("NOT AVAILABLE")
        }
      }
    }
  },
  template:`<div>
    <br><br><br><br><br>
    <div class="container-sm border rounded">
      <h2>Employee Login </h2>
        <label for="exampleFormControlInput3" class="form-label">Society Name</label>
        <input class="form-control" id="exampleFormControlInput3" v-model="societyname"><br>
        <label for="exampleFormControlInput1" class="form-label">Employee ID</label>
        <input class="form-control" id="exampleFormControlInput1" v-model="employeeid"><br>
        <label for="exampleFormControlInput2" class="form-label">Password</label>
        <input class="form-control" id="exampleFormControlInput2" v-model="employeepassword"><br>
        <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" checked>
        <label class="form-check-label" for="flexCheckChecked">Remember me</label><br><br>
        <button type="button" class="btn btn-primary" v-on:click="submit">Submit</button><br><br>
      </div>
    </div>`
}

const userlogin = {
  data: function() {
    return {userusername:"",
            userpassword:"",
            societyname:"",
          }
        },
  methods:{
    submit: async function(){
      if(this.userusername=="" || this.userpassword==""){
        alert("The Username and password should not be blank");
      }
      else if(this.userusername.search('/') != -1 || this.userpassword.search('/') != -1){
        alert("The Username and Password should not contain '/' character");
      }
      else{
        url="/api/employeelogin/"+this.userusername+"/"+this.userpassword+"/"+this.societyname;
        a= await fetch(url);
        response=await a.json();
        if(response.key){
          this.$store.state.key=response.key;
          this.$router.push('/userpage')
        }
        else{
          console.log("NOT AVAILABLE")
        }
      }
    }
  },
  template:`<div>
    <br><br><br><br><br>
    <div class="container-sm">
      <img src="./static/new.jpeg">
      <h2>User Login </h2>
        
        <label for="exampleFormControlInput3" class="form-label" >Society Name</label>
        <input class="form-control" id="exampleFormControlInput3" v-model="societyname"><br>
        <label for="exampleFormControlInput1" class="form-label">Username</label>
        <input class="form-control" id="exampleFormControlInput1" v-model="userusername"><br>
        <label for="exampleFormControlInput2" class="form-label">Password</label>
        <input class="form-control" id="exampleFormControlInput2" v-model="userpassword"><br>
        <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" checked>
        <label class="form-check-label" for="flexCheckChecked">Remember me</label><br><br>
        <button type="button" class="btn btn-primary" v-on:click="submit">Submit</button><br><br>
      </div>
    </div>`
}

const adminpage = {
  data: function() {
    return {
          }
        },
  methods:{

  },
  template:`<div>
    ADMIN PAGE
    </div>`
}

const employeepage = {
  data: function() {
    return {
          }
        },
  methods:{

  },
  template:`<div>
    EMPLOYEE PAGE
    </div>`
}

const userpage = {
  data: function() {
    return {
      dry:false,
      wet:false,
      premium:true,
    }
  },
  methods:{
    proceed: async function(){
      this.$store.state.wetwaste=this.dry;
      this.$store.state.drywaste=this.wet;
      this.$router.push('/userpage/wastetype')
    }
  },
  template:`<div>
    <br><br><br>
      <div class="container-sm border rounded"> 
          <h2>Type Of Garbage</h2><br>
              <input class="form-check-input me-1" type="checkbox" value="" aria-label="..." v-model="dry">
              Dry Waste
              <br><br>
              <input class="form-check-input me-1" type="checkbox" value="" aria-label="..." v-model="wet">
              Wet Waste   
              <br><br>
            <button type="button" class="btn btn-primary" v-on:click="proceed">Proceed</button>
              <br><br>
      </div>
    </div>`
}

const wastetype = {
  data: function(){
    return{

    }
  },
  methods:{

  },
  template:`<div class="container-sm"> 
                <h2>Select the type of dry waste you are disposing</h2><br>
                  <div style="text-align:left;">
                  <input class="form-check-input me-1" type="checkbox" value="" aria-label="...">
                  Plastic
                  <br><br>
                  <input class="form-check-input me-1" type="checkbox" value="" aria-label="...">
                  Cardboard 
                  <br><br>
                  <input class="form-check-input me-1" type="checkbox" value="" aria-label="...">
                  Polybags
                  <br><br>
                  <input class="form-check-input me-1" type="checkbox" value="" aria-label="...">
                  All the above  
                  <br><br>
                  </div>
                <h2>Do you want to subscribe for a compost bin for your wet waste?</h2><br>
                  <div style="text-align:left;">
                      <input class="form-check-input me-1" type="radio" value="" aria-label="...">
                      Yes
                      <br>
                      <input class="form-check-input me-1" type="radio" value="" aria-label="...">
                      No<br><br>
                      <input class="form-check-input me-1" type="checkbox" value="" aria-label="...">
                      Don't ask me again
                      <br><br>
                  </div>
                  <button type="button" class="btn btn-primary">Proceed</button>
            </div>`
}

const routes = [
{path :'/', name: 'home', component: homepage},
{path :'/adminlogin', name: 'adminlogin', component: adminlogin},
{path :'/userlogin', name: 'userlogin', component: userlogin},
{path :'/employeelogin', name: 'employeelogin', component: employeelogin},
{path :'/adminpage', name: 'adminpage', component: adminpage},
{path :'/employeepage', name: 'employeepage', component: employeepage},
{path :'/userpage', name: 'userpage', component: userpage},
{path :'/userpage/wastetype', name: 'wastetype', component: wastetype}
]

const router = new VueRouter({
  routes:routes,
  base: '/',
})

let app = new Vue({
    el: '#app',
    data: {
    },
    router:router,
    store:store,
    methods:{
    adminlogin: function(){
      this.$router.push('/adminlogin')
    },
    userlogin: function(){
      this.$router.push('/userlogin')
    },
    employeelogin: function(){
      this.$router.push('/employeelogin')
    },
  },
  })
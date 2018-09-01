let taskApp = new Vue({
  el: '#taskApp',
  data: {
    tasks: [
      {name: "First note", done: false},
      {name: "Second note", done: false},
      {name: "Third note", done: false},
      {name: "Fourth note", done: false}
    ]
  },
  mounted() {
    this.$http.get("http://142.93.202.10:8080/tasks")
      .then(result => {
        this.tasks = result.data;
      },
      error => {
        console.log(error);
      })
  },
  methods: {
    addTask: function(e) {
      e.preventDefault()

      if (this.tasks.name) {
        let task = {
          name: this.tasks.name,
          done: false
        }
  
        this.$http.post("http://142.93.202.10:8080/tasks", task)
          .then(result => {
            this.tasks.push(result.data);
            console.log(this.tasks);
          }, error => {
            console.log(error)
          });
          
          this.tasks.name = "";
      }
    },
    deleteTask: function(task) {
      this.$http.delete("http://142.93.202.10:8080/tasks", )
        .then(result => {
          console.log(JSON.stringify(result.data));
          this.tasks.splice(this.tasks.indexOf(task), 1);
        }, error => {
          console.log(error)
        });
    },
    updateModel: function(task) {
      this.$http.put("http://142.93.202.10:8080/tasks", task)
        .then(result => {
          console.log(JSON.stringify(result.data));
          this.tasks = result.body;
        }, error => console.log (error) );
    }
  }
});
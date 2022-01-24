<template>
  <div class="submit-form">
    <div v-if="!submitted">

      <h3> -: Product Details :- </h3>
      <br>

      <div class="form-group">
        <label for="name">Name:</label>
        <input
          type="text"
          class="form-control"
          id="name"
          required
          v-model="tutorial.name"
          name="name"
        />
      </div>
      <br>

      <div class="form-group">
        <label for="price">Price:</label>
        <input
          type="number"
          class="form-control"
          id="price"
          required
          v-model="tutorial.price"
          name="price"
        />
      </div>
      <br>

      <div class="form-group">
        <label for="quantity">Quantity:</label>
        <input
          class="form-control"
          id="quantity"
          required
          v-model="tutorial.quantity"
          name="quantity"
        />
      </div>
      <br>

    <br>
      <button @click="saveTutorial" class="btn btn-primary">Submit</button>
    </div>

    <div v-else>
      <br><br><br>
      <h5>Product added successfully :)</h5>
    </div>
  </div>
</template>

<script>
import TutorialDataService from "../services/TutorialDataService";

export default {
  name: "add-tutorial",
  data() {
    return {
      tutorial: {
        id: null,
        name: "",
        price: "",
        quantity: ""
      },
      submitted: false
    };
  },
  methods: {
    saveTutorial() {
      var data = {
        name: this.tutorial.name,
        price: this.tutorial.price,
        quantity: this.tutorial.quantity
      };

      TutorialDataService.create(data)
        .then(response => {
          this.tutorial.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    newTutorial() {
      this.submitted = false;
      this.tutorial = {};
    }
  }
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>

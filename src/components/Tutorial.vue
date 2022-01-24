<template>
  <div v-if="currentTutorial" class="edit-form">
    <h4> -: Edit Product Details :- </h4>
    <br>
    <form>

      <div class="form-group">
        <label for="title">Name:</label>
        <input type="text" class="form-control" id="title"
          v-model="currentTutorial.name"
        />
      </div><br>

      <div class="form-group">
        <label for="price">Price:</label>
        <input type="text" class="form-control" id="price"
          v-model="currentTutorial.price"
        />
      </div><br>

      <div class="form-group">
        <label for="description">Quantity:</label>
        <input type="text" class="form-control" id="quantity"
          v-model="currentTutorial.quantity"
        />
      </div><br><br>
    </form>

    <button type="submit" class="btn btn-warning" style="margin: 10px;"
      @click="updateTutorial"
    >
      Update
    </button>




    <p>{{ message }}</p>
  </div>

  <div v-else>
    <br />
    <p>Click on product's to view details..</p>
  </div>
</template>

<script>
import TutorialDataService from "../services/TutorialDataService";

export default {
  name: "tutorial",
  data() {
    return {
      currentTutorial: null,
      message: ''
    };
  },
  methods: {
    getTutorial(id) {
      TutorialDataService.get(id)
        .then(response => {
          this.currentTutorial = response.data.results[0];
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    updatePublished(status) {
      var data = {
        id: this.currentTutorial.id,
        name: this.currentTutorial.name,
        price: this.currentTutorial.price,
        quantity: this.currentTutorial.quantity,
        published: status
      };

      TutorialDataService.update(this.currentTutorial.id, data)
        .then(response => {
          this.currentTutorial.published = status;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    updateTutorial() {
      TutorialDataService.update(this.currentTutorial.id, this.currentTutorial)
        .then(response => {
          console.log(response.data);
          this.message = 'The product was updated successfully.';
        })
        .catch(e => {
          console.log(e);
        });
    },

  },
  mounted() {
    this.message = '';
    this.getTutorial(this.$route.params.id);
  }
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>

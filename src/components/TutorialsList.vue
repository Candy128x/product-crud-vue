<template>
  <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Search by name"
          v-model="title"/>
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button"
            @click="searchTitle"
          >
            Search
          </button>

      <a href="/add" class="btn btn-primary" style="margin-left: 32px;" role="button"> + Add</a>

        </div>
      </div>
    </div>
    <div class="col-md-6">
    <br>
      <h4>Products List</h4>
      <ul class="list-group">
        <li class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(tutorial, index) in tutorials"
          :key="index"
          @click="setActiveTutorial(tutorial, index)"
        >
          {{ tutorial.name }}
        </li>
      </ul>

    
    </div>
    <div class="col-md-6">
      <div v-if="currentTutorial">
      <br><br>
        <h4>Product Details:</h4>
        <div>
          <label><strong>Title:</strong></label> {{ currentTutorial.name }}
        </div>
        <div>
          <label><strong>Price:</strong></label> {{ currentTutorial.price }}
        </div>
        <div>
          <label><strong>Quantity:</strong></label> {{ currentTutorial.quantity }}
        </div>

        <br>
        <router-link :to="'/tutorials/' + currentTutorial.id" class="btn btn-info">Edit</router-link>

            <button class="btn btn-danger" style="margin: 10px;"
      @click="deleteTutorial"
    >
      Delete
    </button>

      </div>
      <div v-else>
        <br />
        <p>Click on product's to view details..</p>
      </div>

      <div v-if="isProductDeleted">
        <br />
        <p>Product deleted successfully.</p>
      </div>

    </div>
  </div>
</template>

<script>
import TutorialDataService from "../services/TutorialDataService";

export default {
  name: "tutorials-list",
  data() {
    return {
      tutorials: [],
      currentTutorial: null,
      isProductDeleted: null,
      currentIndex: -1,
      name: ""
    };
  },
  methods: {
    retrieveTutorials() {
      TutorialDataService.getAll()
        .then(response => {
          this.tutorials = response.data.results;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveTutorials();
      this.currentTutorial = null;
      this.currentIndex = -1;
      this.isProductDeleted = null;
    },

    setActiveTutorial(tutorial, index) {
      this.currentTutorial = tutorial;
      this.currentIndex = index;
      this.isProductDeleted = null;
    },

    deleteTutorial() {
      TutorialDataService.delete(this.currentTutorial.id)
        .then(response => {
          console.log(response.data);
          this.$router.push({ name: "tutorials" });
          this.retrieveTutorials();
          this.currentTutorial = null;
          this.currentIndex = -1;
          this.isProductDeleted = 1;
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    searchTitle() {
      TutorialDataService.findByTitle(this.title)
        .then(response => {
          this.tutorials = response.data.results;
          console.log(response.data);
          this.currentTutorial = null;
          this.currentIndex = -1;
          this.isProductDeleted = null;
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.retrieveTutorials();
  }
};
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>

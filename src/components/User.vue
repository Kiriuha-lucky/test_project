<template>
  <div class="wrapper">
    <div class="user" v-if="isLoad">
      <img
        class="user__photo"
        :src="this.user.avatar"
        width="75"
        height="75"
        alt=""
      />
      <h2 class="user__title">
        {{ this.user.last_name }} {{ this.user.first_name }}
      </h2>
      <p class="user__age">
        <strong>Age: </strong>{{ getAge(user.date_of_birth) }}
      </p>
      <p class="user__work"></p>
    </div>
    <div class="beer">
      <h3>Recomended Beer</h3>
      <p class="user__recommended-beer">
        {{ this.beer.name }} {{ this.beer.alcohol }}<br />
        <strong>Brand: </strong>
        {{ this.beer.brand }}
      </p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "CurrentUser",
  beer: {},
  user: {},
  isLoad: false,
  data() {
    return {
      beer: {},
      user: {},
      isLoad: false,
    };
  },
  props: {
    msg: String,
  },
  methods: {
    getAge(dateBirth) {
      const age = Math.floor((new Date() - new Date(dateBirth)) / 31536000000);
      return age;
    },
  },
  async created() {
    function getBeer() {
      return axios.get("https://random-data-api.com/api/beer/random_beer ");
    }

    function getUser() {
      return axios.get("https://random-data-api.com/api/users/random_user");
    }

    await Promise.all([getBeer(), getUser()])
      .then(
        axios.spread((d1, d2) => {
          this.beer = d1.data;
          this.user = d2.data;
          this.isLoad = true;
        })
      )
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>

<style>
.wrapper {
  border: 5px solid #ffbe0d;
  padding: 20px;
  width: 33%;
  margin: 0 auto;
  min-width: 320px;
  box-sizing: border-box;
}
.user__photo {
  border-radius: 50%;
  width: 100px;
  height: 100px;
  border: 5px solid #ffbe0d;
}

.beer h3 {
  text-decoration: underline;
  margin-bottom: 5px;
}

.user__recommended-beer {
  margin-top: 0;
}
</style>

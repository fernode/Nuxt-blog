<template>
  <div class="admin-post-page">
    <section class="update-form">
      <AdminPostForm :post="loadedPost" @submit="onSubmitted" />
    </section>
  </div>
</template>

<script>
import AdminPostForm from "@/components/Admin/AdminPostForm";

export default {
  layout: "admin",
  components: {
    AdminPostForm
  },
  async asyncData({ error, $axios, params }) {
    try {
      const postData = await $axios.$get(
        "https://nuxt-app-ebdeb-default-rtdb.firebaseio.com/posts/" +
          params.postId +
          ".json"
      );
      return {
        loadedPost: postData
      };
    } catch (err) {
      return error(err);
    }
  },
  methods: {
    async onSubmitted(editedPost) {
      try {
        await this.$axios.put(
          "https://nuxt-app-ebdeb-default-rtdb.firebaseio.com/posts/" +
            this.$route.params.postId +
            ".json",
          editedPost
        );
        this.$router.push("/admin");
      } catch (error) {
        this.$eror(error);
      }
    }
  }
};
</script>

<style scoped>
.update-form {
  width: 90%;
  margin: 20px auto;
}

@media (min-width: 768px) {
  .update-form {
    width: 500px;
  }
}
</style>

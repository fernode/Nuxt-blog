<template>
  <div class="admin-post-page">
    <section class="update-form">
      <AdminPostForm :post="loadedPost" />
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

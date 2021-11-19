<template>
  <div class="admin-new-post-page">
    <section class="new-post-form">
      <AdminPostForm @submit="onSubimetted" />
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
  methods: {
    async onSubimetted(postData) {
      try {
        const newPost = await this.$axios
        .$post("https://nuxt-app-ebdeb-default-rtdb.firebaseio.com/posts.json", {
          ...postData,
          updatedDate: new Date()
        })
      } catch (error) {
        this.$error(error)
      }
    }
  }
};
</script>

<style scoped>
.new-post-form {
  width: 90%;
  margin: 20px auto;
}

@media (min-width: 768px) {
  .new-post-form {
    width: 500px;
  }
}
</style>

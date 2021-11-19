<template>
  <div class="admin-new-post-page">
    <section class="new-post-form">
      <AdminPostForm @submit="onSubimetted"/>
    </section>
  </div>
</template>

<script>
import AdminPostForm from "@/components/Admin/AdminPostForm";
import axios from 'axios'

export default {
  layout: 'admin',
  components: {
    AdminPostForm
  },
  methods: {
    onSubimetted(postData) {
      axios.post('https://nuxt-app-ebdeb-default-rtdb.firebaseio.com/posts.json', postData)
      .then(result => {
        console.log(result)
      })
      .catch(error => {
        console.log(error)
      })
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


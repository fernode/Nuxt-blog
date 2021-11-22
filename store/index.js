import Vuex from "vuex";

const createStore = () => {
  return new Vuex.Store({
    state: {
      loadedPosts: []
    },
    mutations: {
      setPosts(state, posts) {
        state.loadedPosts = posts;
      },
      addPost(state, post) {
        state.loadedPosts.push(post);
      },
      editPost(state, editedPost) {
        const postIndex = state.loadedPosts.findIndex(
          post => post.id === editedPost.id
        );
        if (postIndex >= 0) {
          state.loadedPosts[postIndex] = editedPost;
        } else {
          return null;
        }
      }
    },
    actions: {
      async nuxtServerInit(vuexContext, context) {
        await vuexContext.dispatch("fetchAllPosts");

        // return new Promise((resolve, reject) => {
        //   setTimeout(() => {
        //     vuexContext.commit("setPosts", [
        //       {
        //         id: "1",
        //         title: "First Post",
        //         previewText: "This is our first post!",
        //         thumbnail:
        //           "https://static.pexels.com/photos/270348/pexels-photo-270348.jpeg"
        //       },
        //       {
        //         id: "2",
        //         title: "Second Post",
        //         previewText: "This is our second post!",
        //         thumbnail:
        //           "https://static.pexels.com/photos/270348/pexels-photo-270348.jpeg"
        //       }
        //     ]);
        //     resolve();
        //   }, 1000);
        // });
      },
      async fetchAllPosts(vuexContext) {
        try {
          const postData = await this.$axios.$get(
            "https://nuxt-app-ebdeb-default-rtdb.firebaseio.com/posts.json"
          );
          const postsArray = [];

          for (const key in postData) {
            if (postData.hasOwnProperty(key)) {
              postsArray.push({ ...postData[key], id: key });
            }
          }

          vuexContext.commit("setPosts", postsArray);
        } catch (error) {
          context.error(error);
        }
      },
      addPost(vuexContext, post) {
        const createdPost = {
          ...post,
          updatedDate: new Date()
        };
        return this.$axios
          .$post(
            "https://nuxt-app-ebdeb-default-rtdb.firebaseio.com/posts.json",
            createdPost
          )
          .then(result => {
            vuexContext.commit("addPost", { ...createdPost, id: result.name });
          })
          .catch(error => error);
      },
      editPost(vuexContext, editedPost) {
        const { id } = editedPost;
        const validPost = vuexContext.getters.loadedPost(id);

        if (validPost) {
          return this.$axios
            .put(
              "https://nuxt-app-ebdeb-default-rtdb.firebaseio.com/posts/" +
                validPost.id +
                ".json",
              editedPost
            )
            .then(result => {
              if (result.status >= 300) {
                throw new Error
              }
              vuexContext.commit("editPost", result.data);
            })
            .catch(err => error);
        }
      }
    },
    getters: {
      loadedPosts(state) {
        return state.loadedPosts;
      },
      loadedPost: state => id => {
        return state.loadedPosts.find(post => post.id === id);
      }
    }
  });
};

export default createStore;

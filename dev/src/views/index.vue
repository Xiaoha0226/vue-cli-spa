<template>
  <div>
    test
  </div>
</template>

<script>
export default {
  name: 'index',
  mounted() {
    this.$axios
      .get('/api/user', {
        params: {
          ID: 12345,
        },
      })
      .then(res => {
        console.log(res.data);
      })
      .catch(error => {
        console.log(error);
      });
  },
};
</script>

<style lang="scss" scoped></style>

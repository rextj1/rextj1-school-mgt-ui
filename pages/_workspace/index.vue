<script>
export default {
  middleware({ store, redirect }) {
    return redirect({ name: 'school/dashbaard' })
  },
}
</script>

<script>
export default {
  middleware({ store, redirect }) {
    return redirect({ name: 'login' })
  },
}
</script>

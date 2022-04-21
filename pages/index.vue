<template>
  <div class="margin-down">
          <!-- description -->
          <b-form
            v-if="show"
            method="POST"
            @submit.prevent="onSubmitCreate"
            @keydown="form.onKeydown($event)"
            @reset.prevent="onReset"
          >
            <!-- description -->
            <b-row no-gutters>
              <b-col md="2">
                <label
                  for="input-small"
                  class="label-padding"
                  style="font-size: 2rem"
                  >Name:</label
                >
              </b-col>

              <b-col md="8">
                <div class="d-flex">
                  <b-form-input
                    id="name"
                    v-model="form.names"
                    name="name"
                    placeholder="Enter class"
                    trim
                    type="name"
                    required
                    size="lg"
                  ></b-form-input>
                  <!-- <b-form-invalid-feedback :state="!form.errors.has('lastName')">
                      {{ form.errors.get('lastName') }}
                      </b-form-invalid-feedback> -->
                  <b-button
                    type="submit"
                    variant="primary"
                    class="mr-4"
                    size="lg"
                  >
                    <b-spinner
                      v-if="form.busy"
                      variant="light"
                      class="mr-1 mb-1"
                    />Add Class</b-button
                  >
                </div>
              </b-col>
            </b-row>
          </b-form>
        </div>
</template>

<script>
  export default {
    data() {
      return {
        selected: null
      }
    }
  }
</script>

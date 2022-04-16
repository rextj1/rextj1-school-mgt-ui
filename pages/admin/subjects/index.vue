<template>
  <div class="p-4">
    <div class="libarian__wrapper">
      <b-card no-body>
        <b-tabs card style="font-size: 1.4rem">
          <b-tab active>
            <template #title>
              <b-icon icon="plus" /><strong>Create Subjects</strong>
            </template>

            <h2 class="p-4">Create Subjects</h2>
            <hr />

            <div class="margin-down">
              <!-- description -->
              <b-row>
                <b-col md="2">
                  <label for="input-small" class="label-padding"
                    >Create Subject:</label
                  >
                </b-col>

                <b-col md="8">
                  <b-form-input
                    id="year"
                    v-model="form.subject"
                    name="subject"
                    placeholder="enter subject"
                    trim
                    type="name"
                    required
                    size="lg"
                  ></b-form-input>
                  <!-- <b-form-invalid-feedback :state="!form.errors.has('lastName')">
                    {{ form.errors.get('lastName') }}
                    </b-form-invalid-feedback> -->
                </b-col>
              </b-row>

              <b-row>
                <b-col
                  md="10"
                  class="d-flex justify-content-center p-4 mt-2 mb-4"
                  ><b-button
                    type="submit"
                    variant="primary"
                    class="mr-4"
                    size="lg"
                  >
                    <b-spinner
                      v-if="form.busy"
                      variant="light"
                      class="mr-1 mb-1"
                    />Submit</b-button
                  >
                </b-col>
              </b-row>
            </div>
          </b-tab>

          <b-tab>
            <template #title>
              <strong>Assign Teachers</strong>
            </template>
            <h2 class="p-4">Create Subjects And Assign Teacher</h2>
            <hr />

            <div class="margin-down">
              <!-- description -->
               <b-row class="mb-4">
                <b-col md="2">
                  <label for="input-small" class="label-padding">Subjects:</label>
                </b-col>
                <b-col md="8">
                  <b-form-select
                    size="lg"
                    v-model="form.subject"
                    :options="subjects"
                  ></b-form-select>
                </b-col>
              </b-row>
           

              <b-row class="mb-4">
                <b-col md="2">
                  <label for="input-small" class="label-padding">Class:</label>
                </b-col>
                <b-col md="8">
                  <b-form-select
                    size="lg"
                    v-model="form.class"
                    :options="classes"
                    multiple
                    style="height: 12rem"
                  ></b-form-select>
                </b-col>
              </b-row>

              <b-row class="py-4">
                <b-col md="2">
                  <label for="input-small" class="label-padding"
                    >Assign Teacher:</label
                  >
                </b-col>
                <b-col md="8">
                  <b-form-select
                    size="md"
                    v-model="form.teacher"
                    :options="teachers"
                  ></b-form-select>
                </b-col>
              </b-row>

              <b-row>
                <b-col
                  md="10"
                  class="d-flex justify-content-center p-4 mt-2 mb-4"
                  ><b-button
                    type="submit"
                    variant="primary"
                    class="mr-4"
                    size="lg"
                  >
                    <b-spinner
                      v-if="form.busy"
                      variant="light"
                      class="mr-1 mb-1"
                    />Submit</b-button
                  >
                </b-col>
              </b-row>
            </div>
          </b-tab>
        </b-tabs>
      </b-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        description: '',
        class: [],
        subject: '',
        busy: false,
      },
      teachers: ['Mark Cool', 'Jame Ruth', 'Evans Rain', 'Crah Loveth'],
      classes: ['JSS 1', 'JSS 2', 'JSS 3', 'SSS 1', 'SSS 2', 'SSS 3'],
      subjects: ['Mathematics','English Language','Biology','basic Science']
    }
  },
}
</script>

<style lang="scss">
.libarian__wrapper {
  padding: 2rem;
  font-size: 1.4rem;
  background-color: var(--color-white);
  border-radius: 0.5rem;
  border: none;

  option {
    padding: 0.3rem;
  }

  .margin-down {
    margin-top: 5rem;

    .label-padding {
      padding-right: 15rem;
      margin-bottom: 5rem;
    }

    .custom-select:focus,
    .form-control.focus,
    .form-control:focus {
      box-shadow: none;
    }

    .custom-select,
    .form-control,
    .mb-3 {
      height: 4rem;
      font-size: 1.4rem;
      color: #000;
      width: 40.6%;
    }
  }
  .table-down {
    padding: 4rem;

    .table {
      margin-bottom: 4rem;
    }
  }

  .custom-select-lg .nav-link.active {
    border-top: 5px solid limegreen;
  }
}
</style>
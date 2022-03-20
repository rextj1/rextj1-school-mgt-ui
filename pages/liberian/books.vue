<template>
  <div class="p-4">
    <div class="libarian__wrapper" @click.prevent="hideMenu">
      <b-card no-body @click="hideMenu">
        <b-tabs card style="font-size: 1.4rem">
          <b-tab active @click="hideMenu">
            <template #title>
              <b-icon icon="plus" /><strong>Add All</strong>
            </template>
            <b-row no-gutters>
              <b-col md="12">
                <div class="card-body">
                  <div
                    class="card-student p-3"
                  >
                    <h2 class="d-flex justify-content-center mb-4 mt-4">
                      All Books
                    </h2>
                    <hr />
                    <b-container fluid>
                      <!-- User Interface controls -->
                      <b-row>
                        <b-col lg="6" class="my-1">
                          <b-form-group
                            label="Sort"
                            label-for="sort-by-select"
                            label-cols-sm="3"
                            label-align-sm="right"
                            label-size="md"
                            class="mb-0"
                            v-slot="{ ariaDescribedby }"
                          >
                            <b-input-group size="md">
                              <b-form-select
                                id="sort-by-select"
                                v-model="sortBy"
                                :options="sortOptions"
                                :aria-describedby="ariaDescribedby"
                                class="w-75"
                                style="background-color: #f9f9f9"
                              >
                                <template #first>
                                  <option value="">-- none --</option>
                                </template>
                              </b-form-select>

                              <b-form-select
                                v-model="sortDesc"
                                :disabled="!sortBy"
                                :aria-describedby="ariaDescribedby"
                                size="md"
                                class="w-10"
                              >
                                <option :value="false">Asc</option>
                                <option :value="true">Desc</option>
                              </b-form-select>
                            </b-input-group>
                          </b-form-group>
                        </b-col>

                        <b-col lg="6" class="my-1">
                          <b-form-group
                            label="Initial sort"
                            label-for="initial-sort-select"
                            label-cols-sm="3"
                            label-align-sm="right"
                            label-size="md"
                            class="mb-0"
                          >
                            <b-form-select
                              id="initial-sort-select"
                              v-model="sortDirection"
                              :options="['asc', 'desc', 'last']"
                              size="sm"
                            ></b-form-select>
                          </b-form-group>
                        </b-col>

                        <b-col lg="6" class="my-1">
                          <b-form-group
                            label="Filter"
                            label-for="filter-input"
                            label-cols-sm="3"
                            label-align-sm="right"
                            label-size="md"
                            class="mb-0"
                          >
                            <b-input-group size="md">
                              <b-form-input
                                id="filter-input"
                                v-model="filter"
                                type="search"
                                placeholder="Type to Search"
                                style="background-color: #f9f9f9"
                              ></b-form-input>

                              <b-input-group-append>
                                <b-button
                                  :disabled="!filter"
                                  @click="filter = ''"
                                  >Clear</b-button
                                >
                              </b-input-group-append>
                            </b-input-group>
                          </b-form-group>
                        </b-col>

                        <b-col lg="6" class="my-1">
                          <b-form-group
                            v-model="sortDirection"
                            label="Filter On"
                            description="Leave all unchecked to filter on all data"
                            label-cols-sm="3"
                            label-align-sm="right"
                            label-size="sm"
                            class="mb-0"
                            v-slot="{ ariaDescribedby }"
                          >
                            <b-form-checkbox-group
                              v-model="filterOn"
                              :aria-describedby="ariaDescribedby"
                              class="mt-1"
                            >
                              <b-form-checkbox value="name"
                                >Name</b-form-checkbox
                              >
                              <b-form-checkbox value="photo"
                                >Photo</b-form-checkbox
                              >
                              <b-form-checkbox value="paid"
                                >Paid Fee</b-form-checkbox
                              >
                              <b-form-checkbox value="gender"
                                >Gender</b-form-checkbox
                              >
                            </b-form-checkbox-group>
                          </b-form-group>
                        </b-col>

                        <b-col sm="5" md="6" class="my-1">
                          <b-form-group
                            label="Per page"
                            label-for="per-page-select"
                            label-cols-sm="6"
                            label-cols-md="4"
                            label-cols-lg="3"
                            label-align-sm="right"
                            label-size="md"
                            class="mb-0"
                          >
                            <b-form-select
                              id="per-page-select"
                              v-model="perPage"
                              :options="pageOptions"
                              size="md"
                              style="background-color: #f9f9f9"
                            ></b-form-select>
                          </b-form-group>
                        </b-col>
                      </b-row>

                      <br /><br />
                      <!-- Main table element -->
                      <b-table
                        :items="items"
                        :fields="fields"
                        :current-page="currentPage"
                        :per-page="perPage"
                        :filter="filter"
                        :filter-included-fields="filterOn"
                        :sort-by.sync="sortBy"
                        :sort-desc.sync="sortDesc"
                        :sort-direction="sortDirection"
                        stacked="md"
                        show-empty
                        small
                        @filtered="onFiltered"
                        striped
                        hover
                        style="font-size: 1.3rem"
                        :responsive="true"
                      >
                        <template #cell(name)="row">
                          {{ row.value.first }} {{ row.value.last }}
                        </template>

                        <template #cell(photo)="row">
                          <b-avatar
                            variant="primary"
                            src="@/assets/svg/student-svg.svg"
                          >
                          </b-avatar
                          >{{ row.i }}
                        </template>

                        <template #cell(paid)="row">
                          <div v-if="row.item.paid">
                            <b-badge variant="warning">{{ row.value }}</b-badge>
                          </div>
                          <div v-else>
                            <b-badge variant="danger">{{ row.value }}</b-badge>
                          </div>
                        </template>

                        <!-- view modal -->
                        <template #cell(actions)="row">
                          <b-button
                            size="smd"
                            variant="info"
                            @click="info(row.item, row.index, $event.target)"
                            class="mr-1"
                          >
                            <b-icon icon="eye-fill"></b-icon>
                          </b-button>

                          <b-button
                            size="smd"
                            variant="primary"
                            @click="row.toggleDetails"
                          >
                            <b-icon icon="pencil-square"></b-icon>
                            <!-- {{ row.detailsShowing ? 'Hide' : 'Show' }} Details -->
                          </b-button>
                          <b-button
                            size="smd"
                            variant="danger"
                            @click="deleteItem"
                          >
                            <b-icon icon="trash"></b-icon>
                          </b-button>
                        </template>

                        <template #row-details="row">
                          <b-card>
                            <ul>
                              <li v-for="(value, key) in row.item" :key="key">
                                {{ key }}: {{ value }}
                              </li>
                            </ul>
                          </b-card>
                        </template>
                      </b-table>

                      <!-- Info modal -->
                      <b-modal
                        :id="infoModal.id"
                        :title="infoModal.title"
                        ok-only
                        @hide="resetInfoModal"
                      >
                        <pre>{{ infoModal.content }}</pre>
                      </b-modal>
                    </b-container>
                  </div>
                </div>
              </b-col>
            </b-row>
          </b-tab>

          <b-tab @click.prevent="registrationMenu" lazy>
            <template #title>
              <strong>Add Books</strong>
              <b-icon scale="0.8" icon="caret-down-fill" />
            </template>
            <div class="p-4 student__wrapper">
              <h2 class="d-flex justify-content-center mb-4 mt-4">
                Register Student
              </h2>
              <hr />
              <div class="d-flex flex-column align-items-center mb-4">
                <div class="profile-avatar mb-2">
                  <div class="photo-preview" v-if="preview_url == null">
                    <img
                      src="@/assets/svg/graduate-student.svg"
                      alt=""
                      style="border-radius: 50%"
                    />
                  </div>
                  <div
                    v-else
                    class="photo-preview"
                    :style="{
                      backgroundImage: `url(${preview_url})`,
                    }"
                  ></div>

                  <b-form-group>
                    <div class="file-upload">
                      <b-button
                        variant="white"
                        class="shadow-sm"
                        size="sm"
                        pill
                        @click="selectImage"
                      >
                        <b-icon icon="camera-fill" />
                      </b-button>
                      <input
                        id="avatar"
                        ref="Avatar"
                        type="file"
                        accept="image"
                        class="file-upload__input"
                        hidden
                        @change="handleFileUpload()"
                      />
                    </div>

                    <!-- <b-form-invalid-feedback :state="!form.errors.has('photo')">
                  {{ form.errors.get('photo') }}
                </b-form-invalid-feedback> -->
                  </b-form-group>
                </div>

                <div class="text-center">
                  <p class="small mb-2">
                    Recommended size: Less than 2MB (150 x 150)
                  </p>
                  <b-button
                    variant="outline-primary"
                    size="md"
                    class="px-3"
                    pill
                    @click="selectImage"
                  >
                    Upload photo
                  </b-button>
                </div>
              </div>

              <!--  -->
              <b-row class="p-4">
                <b-col md="4" class="p-4">
                  <b-form-group label="First Name">
                    <b-form-input
                      debounce="500"
                      id="firstName"
                      v-model="form.firstName"
                      name="firstName"
                      size="lg"
                      placeholder="Enter First name"
                      required
                      trim
                    ></b-form-input>
                    <!-- <b-form-invalid-feedback :state="!form.errors.has('firstName')">
              {{ form.errors.get('firstName') }}
            </b-form-invalid-feedback> -->
                  </b-form-group>
                </b-col>
                <b-col md="4" class="p-4">
                  <b-form-group label="Last Name">
                    <b-form-input
                      debounce="500"
                      id="lastName"
                      v-model="form.lastName"
                      name="lastName"
                      size="lg"
                      placeholder="Enter Last name"
                      required
                      trim
                    ></b-form-input>
                    <!-- <b-form-invalid-feedback :state="!form.errors.has('firstName')">
              {{ form.errors.get('firstName') }}
            </b-form-invalid-feedback> -->
                  </b-form-group>
                </b-col>

                <b-col md="4" class="p-4">
                  <b-form-group label="Middle Name (optional)">
                    <b-form-input
                      debounce="500"
                      id="middleName"
                      v-model="form.middleName"
                      name="middleName"
                      size="lg"
                      placeholder="Enter Middle name"
                      required
                      trim
                    ></b-form-input>
                    <!-- <b-form-invalid-feedback :state="!form.errors.has('firstName')">
              {{ form.errors.get('firstName') }}
            </b-form-invalid-feedback> -->
                  </b-form-group>
                </b-col>

                <b-col md="3" class="p-4">
                  <b-form-group label="Email">
                    <b-form-input
                      debounce="500"
                      id="email"
                      v-model="form.middleName"
                      name="email"
                      size="lg"
                      type="email"
                      placeholder="Enter email"
                      required
                      trim
                    ></b-form-input>
                    <!-- <b-form-invalid-feedback :state="!form.errors.has('firstName')">
              {{ form.errors.get('firstName') }}
                </b-form-invalid-feedback> -->
                  </b-form-group>
                </b-col>
                <b-col md="3" class="p-4">
                  <b-form-group label="Phone No.">
                    <b-form-input
                      id="code"
                      v-model="form.phone"
                      name="phone"
                      placeholder="Enter phone no."
                      trim
                      type="number"
                      required
                      size="lg"
                    ></b-form-input>
                    <!-- <b-form-invalid-feedback :state="!form.errors.has('lastName')">
              {{ form.errors.get('lastName') }}
            </b-form-invalid-feedback> -->
                  </b-form-group>
                </b-col>

                <b-col md="3" class="p-4">
                  <b-form-group label="Parent Phone No.">
                    <b-form-input
                      id="code"
                      v-model="form.parentPhone"
                      name="phone"
                      placeholder="Enter parent phone no."
                      trim
                      type="number"
                      required
                      size="lg"
                    ></b-form-input>
                    <!-- <b-form-invalid-feedback :state="!form.errors.has('lastName')">
              {{ form.errors.get('lastName') }}
            </b-form-invalid-feedback> -->
                  </b-form-group>
                </b-col>

                <b-col md="3" class="p-4">
                  <b-form-group label="Gender">
                    <b-form-select
                      v-model="form.gender"
                      :options="genders"
                      class="mb-3"
                      size="lg"
                      required
                    >
                      <!-- This slot appears above the options from 'options' prop -->
                      <template #first>
                        <b-form-select-option :value="null" disabled
                          >-- Please select gender --</b-form-select-option
                        >
                      </template>

                      <!-- These options will appear after the ones from 'options' prop -->
                    </b-form-select>
                  </b-form-group>
                </b-col>

                <b-col md="3" class="p-4">
                  <b-form-group label="Date of birth">
                    <b-form-datepicker
                      id="datepicker-buttons"
                      v-model="form.birthday"
                      today-button
                      reset-button
                      close-button
                      locale="en"
                      size="lg"
                      required
                    ></b-form-datepicker>
                  </b-form-group>
                </b-col>

                <b-col md="3" class="p-4">
                  <b-form-group label="Country">
                    <b-form-select
                      v-model="form.country"
                      :options="countries"
                      class="mb-3"
                      size="lg"
                      required
                    >
                      <!-- This slot appears above the options from 'options' prop -->
                      <template #first>
                        <b-form-select-option :value="null" disabled
                          >-- Please select country --</b-form-select-option
                        >
                      </template>

                      <!-- These options will appear after the ones from 'options' prop -->
                    </b-form-select>
                  </b-form-group>
                </b-col>

                <b-col md="3" class="p-4">
                  <b-form-group label="State">
                    <b-form-select
                      v-model="form.state"
                      :options="states"
                      class="mb-3"
                      size="lg"
                      required
                    >
                      <!-- This slot appears above the options from 'options' prop -->
                      <template #first>
                        <b-form-select-option :value="null" disabled
                          >-- Please select state --</b-form-select-option
                        >
                      </template>

                      <!-- These options will appear after the ones from 'options' prop -->
                    </b-form-select>
                  </b-form-group>
                </b-col>

                <b-col md="3" class="p-4">
                  <b-form-group label="L.G.A">
                    <b-form-select
                      v-model="form.lga"
                      :options="lgas"
                      class="mb-3"
                      size="lg"
                      required
                    >
                      <!-- This slot appears above the options from 'options' prop -->
                      <template #first>
                        <b-form-select-option :value="null" disabled
                          >-- Please select L.G.A --</b-form-select-option
                        >
                      </template>

                      <!-- These options will appear after the ones from 'options' prop -->
                    </b-form-select>
                  </b-form-group>
                </b-col>

                <b-col md="3" class="p-4">
                  <b-form-group label="Bllod Group">
                    <b-form-select
                      v-model="form.bloodGroup"
                      :options="bloodGroups"
                      class="mb-3"
                      size="lg"
                      required
                    >
                      <!-- This slot appears above the options from 'options' prop -->
                      <template #first>
                        <b-form-select-option :value="null" disabled
                          >-- Please select blood Group--</b-form-select-option
                        >
                      </template>

                      <!-- These options will appear after the ones from 'options' prop -->
                    </b-form-select>
                  </b-form-group>
                </b-col>

                <b-col md="3" class="p-4">
                  <b-form-group label="Class">
                    <b-form-select
                      v-model="form.class"
                      :options="classes"
                      class="mb-3"
                      size="lg"
                      required
                    >
                      <!-- This slot appears above the options from 'options' prop -->
                      <template #first>
                        <b-form-select-option :value="null" disabled
                          >-- Please select student class
                          --</b-form-select-option
                        >
                      </template>

                      <!-- These options will appear after the ones from 'options' prop -->
                    </b-form-select>
                  </b-form-group>
                </b-col>

                <b-col md="3" class="p-4">
                  <b-form-group label="Section">
                    <b-form-select
                      v-model="form.section"
                      :options="sections"
                      class="mb-3"
                      size="lg"
                      required
                    >
                      <!-- This slot appears above the options from 'options' prop -->
                      <template #first>
                        <b-form-select-option :value="null" disabled
                          >-- Please select section --</b-form-select-option
                        >
                      </template>

                      <!-- These options will appear after the ones from 'options' prop -->
                    </b-form-select>
                  </b-form-group>
                </b-col>
                <b-col md="3" class="p-4">
                  <b-form-group label="Parent Name">
                    <b-form-input
                      debounce="500"
                      id="address"
                      v-model="form.parentName"
                      name="parentName"
                      size="lg"
                      placeholder="Enter parent name"
                      required
                      trim
                    ></b-form-input>
                    <!-- <b-form-invalid-feedback :state="!form.errors.has('firstName')">
              {{ form.errors.get('firstName') }}
            </b-form-invalid-feedback> -->
                  </b-form-group>
                </b-col>

                <b-col
                  md="12"
                  class="d-flex justify-content-center p-4 mt-2 mb-4"
                  ><b-button
                    type="submit"
                    pill
                    variant="primary"
                    class="mr-4"
                    size="lg"
                  >
                    <b-spinner
                      v-if="form.busy"
                      variant="light"
                      small
                      class="mr-1 mb-1"
                    />Register</b-button
                  >
                  <b-button
                    pill
                    class="ml-4"
                    style="font-size: 1.4rem"
                    size="lg"
                    type="reset"
                    variant="danger"
                    >Reset</b-button
                  ></b-col
                >
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
        image: null,
        fullName: '',
        amount: null,
        date: null,
        state: null,
        lga: null,
        class: null,
        section: null,
        bloodGroup: null,
        phone: '',
        country: null,
        gender: null,
        class: null,
        busy: false,
      },
      registerMenu: false,
      registrationMenuClass: '',
      preview_url: null,
      genders: ['MAle', 'Female'],
      countries: ['Nigeria', 'Ghana'],
      states: ['Port Harcourt', 'Delta'],
      lgas: ['Obio-Akpor', 'Warri North'],
      bloodGroups: ['A', 'A-', 'B+', 'B-', 'AB', 'O+', 'O-'],
      classes: ['jss1', 'jss2', 'jss3', 'ss1', 'ss2', 'ss3'],
      sections: ['A', 'B', 'C', 'D', 'E', 'F'],

      items: [
        {
          paid: true,
          '#': 1,
          code: 12345,
          photo: 40,
          name: { first: 'Dickerson', last: 'Macdonald' },
          gender: true,
          subject_assigned: 5,
          phone: 810000112,
          // _cellVariants: { paid: 'success' },
        },

        {
          paid: false,
          '#': 2,
          code: 12346,
          photo: 21,
          name: { first: 'Larsen', last: 'Shaw' },
          gender: false,
          subject_assigned: 5,
          phone: 810000112,
          // _cellVariants: { paid: 'success' },
        },
      ],

      fields: [
        {
          key: '#',
          label: '#',
          sortable: true,
          sortDirection: 'desc',
        },
        {
          key: 'name',
          label: 'Teacher Name',
          sortable: true,
          sortDirection: 'desc',
        },
        {
          key: 'code',
          label: 'Code',
          sortable: true,
          sortDirection: 'desc',
        },

        {
          key: 'photo',
          label: 'Photo',
          sortable: true,
          //   class: 'text-center',
        },
        {
          key: 'gender',
          label: 'Gender',
          formatter: (value, key, item) => {
            return value ? 'male' : 'female'
          },
          sortable: true,
          sortByFormatted: false,
          filterByFormatted: true,
        },

        {
          key: 'paid',
          label: 'Salary',
          formatter: (value, key, item) => {
            return value ? 'paid' : 'Due'
          },
          sortable: true,
          sortByFormatted: true,
          filterByFormatted: true,
        },
        {
          key: 'subject_assigned',
          label: 'Subjects Assigned',
          sortable: true,
          sortDirection: 'desc',
        },
        {
          key: 'phone',
          label: 'Phone',
          sortable: true,
          sortDirection: 'desc',
        },
        { key: 'actions', label: 'Actions' },
      ],
      totalRows: 1,
      currentPage: 1,
      perPage: 5,
      pageOptions: [5, 10, 15, { value: 100, text: 'Show a lot' }],
      sortBy: '',
      sortDesc: false,
      sortDirection: 'asc',
      filter: null,
      filterOn: [],
      infoModal: {
        id: 'info-modal',
        title: '',
        content: '',
      },
    }
  },
  computed: {
    sortOptions() {
      // Create an options list from our fields
      return this.fields
        .filter((f) => f.sortable)
        .map((f) => {
          return { text: f.label, value: f.key }
        })
    },
  },
  mounted() {
    // Set the initial number of items
    this.totalRows = this.items.length
  },

  methods: {
    info(item, index, button) {
      this.infoModal.title = `Row index: ${index}`
      this.infoModal.content = JSON.stringify(item, null, 2)
      this.$root.$emit('bv::show::modal', this.infoModal.id, button)
    },
    resetInfoModal() {
      this.infoModal.title = ''
      this.infoModal.content = ''
    },
    deleteItem() {
      console.log('yes')
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
    selectImage() {
      this.$refs.Avatar.click()
    },
    handleFileUpload() {
      const input = this.$refs.Avatar
      const file = input.files[0]
      if (file) {
        const reader = new FileReader()

        reader.onload = (e) => {
          this.preview_url = e.target.result
        }
        reader.readAsDataURL(file)
        this.form.image = file

        // this.$emit('input', file[0])
      }
    },
    registrationMenu(e) {
      if (this.registrationMenuClass === '') {
        this.registerMenu = true
        this.registrationMenuClass = 'off'
        e.stopPropagation()
      } else {
        this.registerMenu = false
        this.registrationMenuClass = ''
      }
    },
    hideMenu() {
      if (this.registerMenu === true) {
        this.registerMenu = false
        this.registrationMenuClass = ''
      }
    },
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

  .nav-link.active {
    border-top: 5px solid limegreen;
  }
  .add-student {
    font-size: 1.6rem;
    box-shadow: 0 5px 5px 0 #1f64b367;
  }
  .form-control,
  .mb-3 {
    background-color: var(--color-input);
    height: 3.1rem;
    font-size: 1.4rem;
  }
  .profile-avatar {
    position: relative;
    text-align: center;
    width: 10rem;
    height: 10rem;

    .photo-preview {
      width: 100px;
      height: 100px;
      background-size: cover;
      background-repeat: no-repeat;
      border-radius: 50%;
    }

    .file-upload {
      position: absolute;
      display: block;
      cursor: pointer;
      bottom: 0;
      right: -5px;
      padding: 4px;
      background: white;
      border-radius: 50%;

      .btn {
        background-color: white;
        border: 1px solid $gray-200;
      }
    }

    .file-upload__input {
      display: none;
    }
    .img-round {
      border-radius: 50%;
    }
  }
  .card-body {
    padding: 0;
    .card-student {
      border: none;
      border-radius: 0.5rem;
      height: auto;

      .input-group > .input-group-append > .btn,
      .input-group > .input-group-append > .input-group-text {
        background: var(--color-primary);
        color: #fff;
        font-size: 1rem;
      }
      .input-group:not(.has-validation) > .custom-select:not(:last-child),
      .input-group > .form-control:not(:first-child),
      .input-group > .custom-select:not(:first-child),
      .custom-select {
        height: 3.2rem;
        font-size: 1.2rem;
      }
    }
  }

  .menu {
    ul {
      position: absolute;
      border: none;
      top: -8.5rem;
      left: 14.3rem;
      background-color: #fff;
    }

    li:not(:last-child) {
      background-color: #fff;
      padding: 1.2rem 5.8rem;
      border-bottom: 1px solid gray;
      cursor: pointer;

      &:hover {
        background-color: var(--color-input);
      }
    }
  }
}
</style>
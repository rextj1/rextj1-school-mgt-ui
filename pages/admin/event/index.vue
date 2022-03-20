<template>
  <div class="p-4 event">
    <div class="libarian__wrapper" @click.prevent="hideMenu">
      <b-card no-body @click="hideMenu">
        <b-tabs card style="font-size: 1.4rem">
          <b-tab active @click="hideMenu">
            <template #title>
              <b-icon icon="plus" /><strong>Add Events</strong>
            </template>
            <b-row class="p-4">
              <b-col md="10" class="p-4">
                <b-form-group label="School Events">
                  <b-form-textarea
                    id="textarea"
                    v-model="form.text"
                    placeholder="Enter something..."
                    rows="10"
                  ></b-form-textarea>
                </b-form-group>
              </b-col>

              <b-col md="3" class="p-4">
                <b-form-group label="Schoo Events">
                  <b-form-datepicker
                    id="datepicker-buttons"
                    v-model="form.schoolEvent"
                    today-button
                    reset-button
                    close-button
                    locale="en"
                    size="lg"
                  ></b-form-datepicker>
                </b-form-group>
              </b-col>
              <b-col md="12" class="p-4">
                <b-button
                  type="submit"
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
              </b-col>
            </b-row>
          </b-tab>

          <b-tab @click.prevent="registrationMenu" lazy>
            <template #title>
              <strong>School Event</strong>
              <b-icon scale="0.8" icon="caret-down-fill" />
            </template>
            <b-col md="12">
              <b-table striped responsive hover :items="items" :fields="fields">
                <template #cell(date)="date">
                  <b-badge class="d-inline-block" variant="danger">{{
                    date.value
                  }}</b-badge>
                </template>
                <template #cell(actions)="row" class="d-flex">
                  <div class="d-flex">
                    <b-button size="smd" variant="primary" class="mr-1">
                      Unpublished
                    </b-button>
                    <b-button size="smd" variant="info" class="mr-1">
                      <b-icon icon="pencil-square"></b-icon>
                    </b-button>

                    <b-button
                      size="smd"
                      variant="danger"
                      @click="row.toggleDetails"
                    >
                      <b-icon icon="trash"></b-icon>
                    </b-button>
                  </div>
                </template>
              </b-table>
            </b-col>
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
      activeTab: '',
      registerMenu: false,
      registrationMenuClass: '',
      form: {
        text: '',
        schoolEvent: '',
        busy: false,
      },
      items: [
        {
          date: '12-6-11',
          event:
            'perspiciatis laudantium modi aliquam accusantium ratione consequatur! Animi, consectetur?',
          _cellVariants: { paid: 'success' },
        },
        {
          date: '12-6-11',
          event:
            'perspiciatis laudantium modi aliquam accusantium ratione consequatur! Animi, consectetur perspiciatis laudantium modialiquam accusantium ratione consequatur! Animi, consectetur?',
        },
        {
          date: '12-6-11',
          event:
            'perspiciatis laudantium modi aliquam accusantium ratione consequatur! Animi, consectetur?',
        },
      ],

      fields: [
        {
          key: 'date',
          label: 'Date',
        },
        {
          key: 'event',
          label: 'Event',
        },

        { key: 'actions', label: 'Actions' },
      ],
    }
  },
  methods: {
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
.event {
  .libarian__wrapper {
    padding: 2rem;
    font-size: 1.4rem;
    background-color: var(--color-white);
    border-radius: 0.5rem;
    border: none;

    .nav-link.active {
      border-top: 5px solid limegreen;
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
}
</style>
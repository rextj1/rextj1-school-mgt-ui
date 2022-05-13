<template>
  <div v-if="!user"></div>
  <div
    v-else
    class="shadow aside"
    style="font-size: 1.6rem"
    :class="`${is_expanded ? 'is-expanded' : 'not_expanded'}`"
  >
    <div class="logo">
      <img src="@/assets/svg/ronazon-logo.svg" alt="" />
    </div>

    <div class="menu-toggle-wrap">
      <div class="menu-toggle" @click="ToggleMenu">
        <b-icon icon="chevron-double-right" class="material-icons" />
      </div>
    </div>
    <div v-for="role in user.roles" :key="role.id">
      <!-- Accountant -->
      <span v-if="role.name == 'accountant'">
        <h3 class="h3-memu">Accountant</h3>

        <div class="menu">
          <nuxt-link to="/dashboard" class="button">
            <b-icon
              @click="ToggleMenus"
              icon="columns-gap"
              class="material-icons"
            />
            <span @click="ToggleMenus" class="text">Dashboard</span>
          </nuxt-link>

          <nuxt-link to="/accountant/profile" class="button">
            <b-icon
              @click="ToggleMenus"
              icon="person-fill"
              class="material-icons"
            />
            <span @click="ToggleMenus" class="text">Profile</span>
          </nuxt-link>
          <nuxt-link to="#" v-b-toggle.collapse-1 class="button">
            <b-icon
              @click="
                caretDown()
                ToggleMenus()
              "
              icon="person-fill"
              class="material-icons"
            />
            <span
              @click="
                caretDown()
                ToggleMenus()
              "
              class="text"
              >Payment
              <b-icon
                style="margin-left: 4rem"
                :class="rotate"
                class="caret-down"
                scale="0.8"
                icon="caret-right"
            /></span>
          </nuxt-link>

          <b-collapse id="collapse-1" class="mt-2 dropMenuClose">
            <b-card bg-variant="light">
              <nuxt-link to="/accountant/create-payment" class="button">
                <span class="text">Create</span>
              </nuxt-link>

              <nuxt-link to="/accountant/student-payment" class="button">
                <span class="text">Payment</span>
              </nuxt-link>
              <nuxt-link to="/accountant/view-payments" class="button">
                <span class="text">View</span>
              </nuxt-link>
            </b-card>
          </b-collapse>
        </div>
      </span>

      <!-- Liberian -->
      <span v-if="role.name == 'libarian'">
        <h3 class="h3-memu">Liberian</h3>

        <div class="menu">
          <nuxt-link to="/dashboard" class="button">
            <b-icon
              @click="ToggleMenus"
              icon="columns-gap"
              class="material-icons"
            />
            <span @click="ToggleMenus" class="text">Dashboard</span>
          </nuxt-link>

          <nuxt-link to="/liberian/profile" class="button">
            <b-icon
              @click="ToggleMenus"
              icon="person-fill"
              class="material-icons"
            />
            <span @click="ToggleMenus" class="text">Profile</span>
          </nuxt-link>

          <nuxt-link to="/liberian/books" class="button">
            <b-icon @click="ToggleMenus" icon="book" class="material-icons" />
            <span @click="ToggleMenus" class="text">Books</span>
          </nuxt-link>
        </div>
      </span>

      <!-- Teacher -->
      <span v-if="role.name == 'teacher'">
        <h3 class="h3-memu">Teacher</h3>

        <div class="menu">
          <nuxt-link to="/dashboard" class="button">
            <b-icon
              @click="ToggleMenus"
              icon="columns-gap"
              class="material-icons"
            />
            <span @click="ToggleMenus" class="text">Dashboard</span>
          </nuxt-link>

          <nuxt-link to="/teacher/profile" class="button">
            <b-icon
              @click="ToggleMenus"
              icon="person-fill"
              class="material-icons"
            />
            <span @click="ToggleMenus" class="text">Profile</span>
          </nuxt-link>

          <nuxt-link to="/teacher/timetable" class="button">
            <b-icon @click="ToggleMenus" icon="alarm" class="material-icons" />
            <span @click="ToggleMenus" class="text">Timetable</span>
          </nuxt-link>

          <nuxt-link to="/teacher/exam" class="button">
            <b-icon
              @click="ToggleMenus"
              icon="vector-pen"
              class="material-icons"
            />
            <span @click="ToggleMenus" class="text">Examination</span>
          </nuxt-link>
        </div>
      </span>

      <!-- Student -->
      <span v-if="role.name == 'student'">
        <h3 class="h3-memu">Student</h3>

        <div class="menu">
          <nuxt-link to="/dashboard" class="button">
            <b-icon
              @click="ToggleMenus"
              icon="columns-gap"
              class="material-icons"
            />
            <span @click="ToggleMenus" class="text">Dashboard</span>
          </nuxt-link>

          <nuxt-link to="/student/profile" class="button">
            <b-icon
              @click="ToggleMenus"
              icon="person-fill"
              class="material-icons"
            />
            <span @click="ToggleMenus" class="text">Profile</span>
          </nuxt-link>

          <nuxt-link to="/student/timetable" class="button">
            <b-icon @click="ToggleMenus" icon="alarm" class="material-icons" />
            <span @click="ToggleMenus" class="text">Timetable</span>
          </nuxt-link>

          <nuxt-link to="/student/exam" class="button">
            <b-icon
              @click="ToggleMenus"
              icon="vector-pen"
              class="material-icons"
            />
            <span @click="ToggleMenus" class="text">Examination</span>
          </nuxt-link>

          <nuxt-link to="/student/result" class="button">
            <b-icon
              @click="ToggleMenus"
              icon="file-text"
              class="material-icons"
            />
            <span @click="ToggleMenus" class="text">Result</span>
          </nuxt-link>
        </div>
      </span>
      <!-- admin -->

      <span v-if="role.name == 'main admin'">
        <h3 class="h3-memu">Admin</h3>

        <div class="menu">
          <nuxt-link to="/dashboard" class="button">
            <b-icon
              @click="ToggleMenus"
              icon="columns-gap"
              class="material-icons"
            />
            <span @click="ToggleMenus" class="text">Dashboard</span>
          </nuxt-link>
          <nuxt-link to="/admin/roles" class="button">
            <b-icon
              @click="ToggleMenus"
              icon="person-fill"
              class="material-icons"
            />
            <span @click="ToggleMenus" class="text">User Roles</span>
          </nuxt-link>
          <nuxt-link to="/admin/teacher" class="button">
            <b-icon
              @click="ToggleMenus"
              icon="person-fill"
              class="material-icons"
            />
            <span @click="ToggleMenus" class="text">Teacher</span>
          </nuxt-link>

          <nuxt-link to="/admin/student" class="button">
            <b-icon
              @click="ToggleMenus"
              icon="people-fill"
              class="material-icons"
            />
            <span @click="ToggleMenus" class="text">Student</span>
          </nuxt-link>
          <nuxt-link to="/admin/accountant" class="button">
            <b-icon
              @click="ToggleMenus"
              icon="people-fill"
              class="material-icons"
            />
            <span @click="ToggleMenus" class="text">Accountant</span>
          </nuxt-link>

          <nuxt-link to="/admin/libarian" class="button">
            <b-icon
              @click="ToggleMenus"
              icon="people-fill"
              class="material-icons"
            />
            <span @click="ToggleMenus" class="text">Libarian</span>
          </nuxt-link>

          <nuxt-link to="/admin/event" class="button">
            <b-icon
              @click="ToggleMenus"
              icon="calendar2-date"
              class="material-icons"
            />
            <span @click="ToggleMenus" class="text">Events</span>
          </nuxt-link>

          <nuxt-link to="/admin/notice" class="button">
            <b-icon
              @click="ToggleMenus"
              icon="calendar2-date"
              class="material-icons"
            />
            <span @click="ToggleMenus" class="text">Notices</span>
          </nuxt-link>

          <nuxt-link to="/admin/timetable" class="button">
            <b-icon @click="ToggleMenus" icon="alarm" class="material-icons" />
            <span @click="ToggleMenus" class="text">Timetable</span>
          </nuxt-link>

          <!-- toggle menu -->
          <nuxt-link to="#" v-b-toggle.collapse-2 class="button">
            <b-icon
              @click="
                caretDown()
                ToggleMenus()
              "
              icon="vector-pen"
              class="material-icons"
            />
            <span
              @click="
                caretDown()
                ToggleMenus()
              "
              class="text"
              >Exam
              <b-icon
                style="margin-left: 4rem"
                scale="0.8"
                :class="rotate"
                class="caret-down"
                icon="caret-right"
            /></span>
          </nuxt-link>

          <b-collapse id="collapse-2" class="mt-2 dropMenuClose">
            <b-card bg-variant="light">
              <nuxt-link to="/admin/exam/timetable" class="button">
                <span class="text">Timetable</span>
              </nuxt-link>

              <nuxt-link to="/admin/exam/add-scores" class="button">
                <span class="text">Scores</span>
              </nuxt-link>
              <nuxt-link to="/admin/exam/tabulation" class="button">
                <span class="text">Tabulation Sheet</span>
              </nuxt-link>
              <nuxt-link to="/admin/exam/marksheet" class="button">
                <span class="text">Marksheet</span>
              </nuxt-link>
              <nuxt-link to="/admin/exam/student-result" class="button">
                <span class="text">Results</span>
              </nuxt-link>
            </b-card>
          </b-collapse>
          <!-- end -->

          <nuxt-link to="/admin/driver" class="button">
            <b-icon @click="ToggleMenus" icon="truck" class="material-icons" />
            <span @click="ToggleMenus" class="text">Drivers</span>
          </nuxt-link>

          <nuxt-link to="/admin/result" class="button">
            <b-icon
              @click="ToggleMenus"
              icon="file-text"
              class="material-icons"
            />
            <span @click="ToggleMenus" class="text">Result</span>
          </nuxt-link>
          <nuxt-link to="/admin/classes" class="button">
            <b-icon
              @click="ToggleMenus"
              icon="envelope"
              class="material-icons"
            />
            <span @click="ToggleMenus" class="text">Classes</span>
          </nuxt-link>
          <nuxt-link to="/admin/subjects" class="button">
            <b-icon
              @click="ToggleMenus"
              icon="envelope"
              class="material-icons"
            />
            <span @click="ToggleMenus" class="text">Subjects</span>
          </nuxt-link>
        </div>
      </span>
    </div>

    <div class="flex"></div>

    <div class="menu">
      <nuxt-link to="/settings" class="button">
        <b-icon icon="gear-fill" class="material-icons" />
        <span class="text">Settings</span>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import { ROLEX_QUERIEX } from '~/graphql/users/queries'
export default {
  mounted() {
    this.is_expanded = localStorage.getItem('is_expanded') === 'true'
  },
  data() {
    return {
      is_expanded: 'is_expanded',
      rotate: '',
    }
  },
  apollo: {
    user: {
      query: ROLEX_QUERIEX,
      variables() {
        return { id: parseInt(this.$auth.user.id) }
      },
    },
  },
  methods: {
    ToggleMenu() {
      this.is_expanded = !this.is_expanded
      localStorage.setItem('is_expanded', this.is_expanded)
    },
    ToggleMenus() {
      this.is_expanded = 'is_expanded'
    },
    caretDown() {
      if (this.rotate === '') {
        this.rotate = 'upDown'
      } else {
        this.rotate = ''
      }
    },
  },
}
</script>

<style lang="scss">
.aside {
  display: flex;
  flex-direction: column;
  background-color: var(--color-white);
  width: calc(2rem + 32px);
  min-height: 100vh;
  padding: 1rem;
  transition: 0.3s ease-out;

  .flex {
    flex: 1 1 0%;
  }

  .logo {
    margin-bottom: 1rem;

    img {
      width: 10rem;
    }
  }

  // .....toggle------ //
  .menu-toggle-wrap {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 1rem;
    position: relative;
    top: 0;
    transition: 0.3s ease-out;
    cursor: pointer;

    .menu-toggle {
      transition: 0.3s ease-out;
      .material-icons {
        font-size: 3rem;
        transition: 0.2s ease-out;
      }

      &:hover {
        .material-icons {
          color: rgba(0, 0, 0, 0.473);
          transform: translateX(0.5rem);
        }
      }
    }
  }

  .dropMenuClose {
    display: block;

    .button {
      &.nuxt-link-exact-active {
        border-radius: 0 !important;
        border-left: 0px solid red !important;
        width: 108%;
        // margin-left: -1.4rem !important;
      }
      &:hover {
        border-left: 0px solid red !important;
        border-radius: 0 !important;
        width: 108%;
      }
    }
  }

  h3 {
    opacity: 0;
    transition: opacity 0.1s ease-out;
    color: var(--color-primary);
    font-size: 2rem;
    margin-bottom: 0.5rem;
    text-transform: uppercase;
  }

  .menu {
    margin: 0 -1rem;

    .button {
      display: flex;
      align-items: center;
      text-decoration: none;
      transition: 0.1s ease-out;
      padding: 0.5rem 1rem;
      margin-bottom: 0.8rem;

      .material-icons {
        font-size: 2rem;
        padding-right: 3rem;
        color: var(--color-body);
        transition: 0.1s ease-out;
        margin-top: 0.3rem;
      }
      &.nuxt-link-exact-active {
        border-radius: 0 2rem 2rem 0;
        border-left: 5px solid limegreen;

        .material-icons {
          transition: 0.2s ease-out;
        }

        .text {
          color: var(--color-body);
        }
      }
      .text {
        color: var(--color-body);
        transition: 0.2s ease-out;
        // height: 2rem;
        display: none;
      }
    }
  }

  // .footer {
  //   opacity: 0;
  //   transition: opacity 0.3s ease-in-out;

  //   p {
  //     font-size: 0.875rem;
  //     color: var(--color-body);
  //   }
  // }

  &.is-expanded {
    width: 23rem;

    .menu-toggle-wrap {
      top: -3rem;
      .menu-toggle {
        transform: rotate(-180deg);
        margin-top: -1rem;
        margin-bottom: 2rem;
      }
    }
    .caret-down {
      transition: 0.2s ease-out;
    }
    .caret-down.upDown {
      transform: rotate(90deg);
      transition: 0.2s ease-out;
    }

    .h3-memu {
      margin-left: 2rem;
      margin-bottom: 1rem;
      font-weight: 600;
    }

    h3 {
      opacity: 1;
    }
    .button .text {
      display: block;
    }

    .menu {
      .button {
        .material-icons {
          margin-right: 1rem;
        }

        &:hover {
          background-color: var(--color-primary);
          border-radius: 0 2rem 2rem 0;
          .material-icons,
          .text {
            color: var(--color-white);
          }
        }
      }

      .nuxt-link-exact-active {
        background-color: var(--color-primary);
        border-radius: 0 2rem 2rem 0;
        border-left: 5px solid limegreen;

        .material-icons,
        .text {
          color: var(--color-white);
        }
      }
    }

    // .footer {
    //   opacity: 0;
    // }
  }

  &.not_expanded {
    .button {
      height: 4rem;
      .text {
        display: none;
        text-align: center;
        min-width: 15rem;
      }

      &:hover .text {
        padding: 0.7rem 1rem;
        display: inline-block;
        z-index: 99;
        background-color: var(--color-white);
        color: var(--color-body);
      }
    }
    .dropMenuClose {
      display: none;
    }
  }

  @media (max-width: 1024px) {
    position: absolute;
    z-index: 99;
  }
}
</style>
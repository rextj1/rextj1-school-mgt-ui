<template>
  <div class="font">
    <aside
      class="shadow"
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

      <h3 class="h3-memu">Admin</h3>

      <div class="menu">
        <nuxt-link to="/" class="button">
          <b-icon
            @click="ToggleMenu"
            icon="columns-gap"
            class="material-icons"
          />
          <span @click="ToggleMenu" class="text">Dashboard</span>
        </nuxt-link>
        <nuxt-link to="/admin/teacher" class="button">
          <b-icon
            @click="ToggleMenu"
            icon="person-fill"
            class="material-icons"
          />
          <span @click="ToggleMenu" class="text">Teacher</span>
        </nuxt-link>

        <nuxt-link to="/admin/student" class="button">
          <b-icon
            @click="ToggleMenu"
            icon="people-fill"
            class="material-icons"
          />
          <span @click="ToggleMenu" class="text">Student</span>
        </nuxt-link>

        <nuxt-link to="/admin/result" class="button">
          <b-icon
            @click="ToggleMenu"
            icon="file-earmark-ruled-fill"
            class="material-icons"
          />
          <span @click="ToggleMenu" class="text">Result</span>
        </nuxt-link>
        <nuxt-link to="/admin/timetable" class="button">
          <b-icon @click="ToggleMenu" icon="alarm" class="material-icons" />
          <span @click="ToggleMenu" class="text">Timetable</span>
        </nuxt-link>

        <nuxt-link to="/admin/exam" class="button">
          <b-icon
            @click="ToggleMenu"
            icon="vector-pen"
            class="material-icons"
          />
          <span @click="ToggleMenu" class="text">Exam</span>
        </nuxt-link>

        <nuxt-link to="/admin/result" class="button">
          <b-icon @click="ToggleMenu" icon="file-text" class="material-icons" />
          <span @click="ToggleMenu" class="text">Result</span>
        </nuxt-link>
        <nuxt-link to="/team" class="button">
          <b-icon @click="ToggleMenu" icon="envelope" class="material-icons" />
          <span @click="ToggleMenu" class="text">Contact</span>
        </nuxt-link>
        <nuxt-link to="/admievent" class="button">
          <b-icon
            @click="ToggleMenu"
            icon="calendar2-date"
            class="material-icons"
          />
          <span @click="ToggleMenu" class="text">Event</span>
        </nuxt-link>
      </div>

      <div class="flex"></div>

      <div class="menu">
        <nuxt-link to="/settings" class="button">
          <b-icon icon="gear-fill" class="material-icons" />
          <span class="text">Settings</span>
        </nuxt-link>
      </div>
    </aside>
  </div>
</template>

<script>
export default {
  mounted() {
    this.is_expanded = localStorage.getItem('is_expanded') === 'true'
  },
  data() {
    return {
      is_expanded: '',
    }
  },
  methods: {
    ToggleMenu() {
      this.is_expanded = !this.is_expanded
      localStorage.setItem('is_expanded', this.is_expanded)
    },
  },
}
</script>

<style lang="scss">
.font {
  font-size: 1.6rem;
  aside {
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
      transition: 0.3s ease-in-out;
      cursor: pointer;

      .menu-toggle {
        transition: 0.3s ease-in-out;
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
        margin-bottom: 0.5rem;

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

          // .text {
          //   color: var(--color-body);
          // }
        }
        .text {
          color: var(--color-body);
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
      width: 20rem;

      .menu-toggle-wrap {
        top: -3rem;
        .menu-toggle {
          transform: rotate(-180deg);
          margin-top: -1rem;
          margin-bottom: 2rem;
        }
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
    }

    @media (max-width: 1024px) {
      position: absolute;
      z-index: 99;
    }
  }
}
</style>
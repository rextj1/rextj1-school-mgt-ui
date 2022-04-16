<template>
  <nav class="" @click="hideTopNav">
    <ul class="d-flex align-items-center">
      <li><b-icon class="h2 bell" variant="light" icon="bell-fill" /></li>
      <li>
        <span class="profile-image" @click="profileImage" v-if="$auth.loggedIn">
          <div class="nav-image">
            <img src="@/assets/images/background.jpg" alt="" />
            <h5>
              {{ $auth.user.first_name
              }}<b-icon icon="caret-down-fill" style="color: #fff"></b-icon>
            </h5>
          </div>
          <transition class="leave-cancelled">
            <div v-show="profileBody" class="profile" :class="topNavClass">
              <div class="align-content">
                <img src="@/assets/images/background.jpg" alt="" />
                <p>{{ $auth.user.first_name }}</p>
                <p>{{ $auth.user.email }}</p>
              </div>

              <ul>
                <li>
                  <nuxt-link to="/user/profile">
                    <span class="nav-profile"><b-icon icon="person" /></span
                    >Profile
                  </nuxt-link>
                </li>
                <li @click="logout">
                  <span class="nav-profile"><b-icon icon="power" /></span>Logout
                </li>
              </ul>
            </div>
          </transition>
        </span>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      profileBody: false,
      topNavClass: '',
    }
  },
  methods: {
    profileImage(e) {
      if (this.topNavClass === '') {
        this.profileBody = true
        this.topNavClass = 'off'
        e.stopPropagation()
      } else {
        this.profileBody = false
        this.topNavClass = ''
      }
    },
    hideTopNav() {
      this.profileBody = false
      this.topNavClass = ''
    },
    async logout() {
      this.$nuxt.$loading.start()
      await this.$auth.logout()
    },
  },
}
</script>

<style lang="scss" scoped>
nav {
  font-size: 1.6rem;
  display: flex;
  background-color: var(--color-primary);
  height: 6.8rem;
  justify-content: flex-end;
  flex: 1;

  .bell {
    margin-top: 1.4rem;
    margin-right: 2rem;
    cursor: pointer;
  }

  .profile-image {
    z-index: 99;
    .nav-image {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      margin-right: 4rem;
      h5 {
        color: #fff;
        margin-left: 0.5rem;
        cursor: pointer;
      }
    }
    img {
      cursor: pointer;
      width: 3.5rem;
      height: 3.5rem;
      border-radius: 50%;
    }
    .profile {
      z-index: 999;
      position: absolute;
      background-color: #fff;
      top: 7.8rem;
      right: 3rem;
      border-radius: 5px;
      box-shadow: 0 3px 21px 0 rgba(0, 0, 0, 0.219);
      font-size: 1.5rem;

      .align-content {
        display: flex;
        flex-direction: column;
        align-items: center;

        p:nth-child(even) {
          font-size: 1.3rem !important;
        }

        img {
          margin: 1rem 0 2rem 0;
        }
      }
      a {
        color: var(--color-body);
      }
      & li {
        padding: 0.8rem 7rem;
        border-bottom: 1px solid #d8e0c0;
        cursor: pointer;

        .nav-profile {
          position: absolute;
          right: 13rem;
        }
      }
    }
  }
}
</style>
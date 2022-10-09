<template>
  <div class="top">
    <nav class="" @click="hideTopNav">
      <b-icon
        class="h1 toggle-menu"
        variant="light"
        icon="border-width"
        @click="toggleThisMenu"
      />
      <ul class="d-flex align-items-center">
        <li>
          <span class="mainNotification">
            <b-icon
              class="h1 bell"
              scale="1.1"
              variant="light"
              icon="bell-fill"
            />

            <div v-if="user.notifications.length === 0"></div>

            <div v-else class="userNotification" @click="notificationModal">
              {{ user.notifications.length }}
            </div>
          </span>
        </li>
        <li>
          <span
            v-if="$auth.loggedIn"
            class="profile-image"
            @click="profileImage"
          >
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
                </div>
                <hr />
                <ul>
                  <li @click="logout">
                    <span class="nav-profile"><b-icon icon="power" /></span
                    >Logout
                  </li>
                </ul>
              </div>
            </transition>
          </span>
        </li>
      </ul>

      <!-- notification -->
      <b-modal
        :id="notice"
        class="modal"
        body-bg-variant="light"
        :hide-backdrop="false"
        scrollable
        size="md"
        :hide-footer="true"
      >
        <Notification :notify-now="[$auth.user.id, notice]" />
      </b-modal>
    </nav>
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import { useWorkspaceStore } from '@/stores/wokspace'
import { useToggleMenu } from '@/stores/toggle'
import { USER_NOTIFICATION_QUERIES } from '~/graphql/notifications/queries'
export default {
  data() {
    return {
      profileBody: false,
      topNavClass: '',
      notice: 'info',
      user: {
        notifications: [],
      },
    }
  },
  computed: {
    ...mapState(useWorkspaceStore, ['currentWorkspace']),
    mainWorkspace() {
      return this.currentWorkspace
    },
  },
  apollo: {
    user: {
      query: USER_NOTIFICATION_QUERIES,
      variables() {
        return { id: parseInt(this.$auth.user.id) }
      },
      // fetchPolicy: 'no-cache',
      // pollInterval: 15000,
    },
  },

  methods: {
    ...mapActions(useToggleMenu, ['toggleMenu']),
    toggleThisMenu() {
      this.toggleMenu()
    },
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
    notificationModal() {
      this.$bvModal.show(this.notice)
    },
  },
}
</script>

<style lang="scss" scoped>
.top {
  // position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  width: 100%;
  position: sticky;
  z-index: 6;
  background: linear-gradient(to right, #5142f5, #047edf 99%);
  height: 6.8rem;
  nav {
    font-size: 1.6rem;
    display: flex;
    height: 100%;
    justify-content: space-between;
    align-items: center !important;
    flex: 1;
    z-index: 5;

    .toggle-menu {
      margin-left: 1rem;
      margin-top: 2rem;
      cursor: pointer;
    }

    .bell {
      margin-top: 1.4rem;
      margin-right: 2rem;
      cursor: pointer;
    }

    .mainNotification {
      position: relative;
      .userNotification {
        background-color: #ff0e0e;
        text-align: center;
        color: #fff;
        min-width: 43%;
        min-height: 100%;
        font-size: 1.1rem;
        position: absolute;
        border-radius: 50%;
        right: 1.2rem;
        top: -1.9rem;
        cursor: pointer;
      }
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
}
</style>

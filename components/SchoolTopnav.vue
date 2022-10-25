<template>
  <div class="top">
    <nav class="" @click="hideTopNav">
      <b-icon class="h1 toggle-menu" variant="light" icon="" />
      <ul class="d-flex align-items-center">
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
  height: 68px;
  nav {
    display: flex;
    height: 100%;
    justify-content: space-between;
    align-items: center !important;
    flex: 1;
    z-index: 5;

    .toggle-menu {
      margin-left: 10px;
      margin-top: 20px;
      cursor: pointer;
    }

    .bell {
      margin-top: 14px;
      margin-right: 20px;
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
        font-size: 1.10px;
        position: absolute;
        border-radius: 50%;
        right: 1.20px;
        top: -19px;
        cursor: pointer;
      }
    }

    .profile-image {
      z-index: 99;

      .nav-image {
        display: flex;
        justify-content: flex-end;
        align-items: center;

        margin-right: 40px;
        h5 {
          color: #fff;
          margin-left: 5px;
          cursor: pointer;
        }
      }
      img {
        cursor: pointer;
        width: 35px;
        height: 35px;
        border-radius: 50%;
      }
      .profile {
        z-index: 999;
        position: absolute;
        background-color: #fff;
        top: 78px;
        right: 30px;
        border-radius: 5px;
        box-shadow: 0 3px 21px 0 rgba(0, 0, 0, 0.219);
        font-size: 15px;

        .align-content {
          display: flex;
          flex-direction: column;
          align-items: center;

          p:nth-child(even) {
            font-size: 13px !important;
          }

          img {
            margin: 10px 0 20px 0;
          }
        }
        a {
          color: var(--color-body);
        }
        & li {
          padding: 8px 70px;
          border-bottom: 1px solid #d8e0c0;
          cursor: pointer;

          .nav-profile {
            position: absolute;
            right: 130px;
          }
        }
      }
    }
  }
}
</style>

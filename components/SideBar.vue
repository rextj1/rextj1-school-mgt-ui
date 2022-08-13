<template>
  <div>
    <template>
      <div class="fixed">
        <div
          class="aside"
          style="font-size: 1.6rem"
          :class="`${is_expanded ? 'is-expanded' : 'not_expanded'}`"
        >
          <div class="logo">
            <img src="@/assets/svg/ronazon-logo.svg" alt="" />
          </div>

          <div class="menu-toggle-wrap">
            <div class="menu-toggle">
              <b-icon icon="" class="material-icons" />
            </div>
          </div>
          <div v-for="role in user.roles" :key="role.id">
            <!-- super user -->
            <span v-if="role.name == 'super admin'">
              <h3 class="h3-memu">Schools</h3>

              <div class="menu">
                <nuxt-link
                  :to="{
                    name: 'workspace-school',
                    params: { workspace: mainWorkspace.slug },
                  }"
                  class="button"
                >
                  <b-icon icon="columns-gap" class="material-icons" />
                  <span class="text" @click="ToggleMenus">Schools</span>
                </nuxt-link>

                <nuxt-link
                  :to="{
                    name: 'workspace-school-create',
                    params: { workspace: mainWorkspace.slug },
                  }"
                  class="button"
                >
                  <b-icon icon="columns-gap" class="material-icons" />
                  <span class="text" @click="ToggleMenus">Create School</span>
                </nuxt-link>

                <nuxt-link
                  :to="{
                    name: 'workspace-school-packages',
                    params: { workspace: mainWorkspace.slug },
                  }"
                  class="button"
                >
                  <b-icon icon="columns-gap" class="material-icons" />
                  <span class="text" @click="ToggleMenus">Packages</span>
                </nuxt-link>
              </div>
            </span>

            <!-- Accountant -->
            <span v-if="role.name == 'accountant'">
              <h3 class="h3-memu">Accountant</h3>

              <div class="menu">
                <nuxt-link
                  :to="{
                    name: 'workspace-dashboard',
                    params: { workspace: mainWorkspace.slug },
                  }"
                  class="button"
                >
                  <b-icon icon="columns-gap" class="material-icons" />
                  <span class="text" @click="ToggleMenus">Dashboard</span>
                </nuxt-link>

                <nuxt-link
                  :to="{
                    name: 'workspace-accountant-profile',
                    params: { workspace: mainWorkspace.slug },
                  }"
                  class="button"
                >
                  <b-icon
                    icon="person-fill"
                    class="material-icons"
                    @click="ToggleMenus"
                  />
                  <span class="text" @click="ToggleMenus">Profile</span>
                </nuxt-link>
                <nuxt-link v-b-toggle.collapse-1 to="#" class="button">
                  <b-icon
                    icon="person-fill"
                    class="material-icons"
                    @click="
                      caretDown()
                      ToggleMenus()
                    "
                  />
                  <span class="text" @click="ToggleMenus()"
                    >Payment
                    <b-icon
                      style="margin-left: 4rem"
                      class="caret-down"
                      scale="0.8"
                      icon="caret-down"
                  /></span>
                </nuxt-link>

                <b-collapse
                  id="collapse-1"
                  accordion="my-accordion"
                  role="tabpanel"
                  class="mt-2 dropMenuClose"
                >
                  <b-card bg-variant="light">
                    <nuxt-link
                      :to="{
                        name: 'workspace-accountant-createPayment',
                        params: { workspace: mainWorkspace.slug },
                      }"
                      class="button"
                    >
                      <span class="text">Create</span>
                    </nuxt-link>

                    <nuxt-link
                      :to="{
                        name: 'workspace-accountant-studentPayment',
                        params: { workspace: mainWorkspace.slug },
                      }"
                      class="button"
                    >
                      <span class="text">Payment</span>
                    </nuxt-link>
                    <nuxt-link
                      :to="{
                        name: 'workspace-accountant-viewPayments',
                        params: { workspace: mainWorkspace.slug },
                      }"
                      class="button"
                    >
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
                  <b-icon icon="columns-gap" class="material-icons" />
                  <span class="text" @click="ToggleMenus">Dashboard</span>
                </nuxt-link>

                <nuxt-link to="/liberian/profile" class="button">
                  <b-icon
                    icon="person-fill"
                    class="material-icons"
                    @click="ToggleMenus"
                  />
                  <span class="text" @click="ToggleMenus">Profile</span>
                </nuxt-link>

                <nuxt-link to="/liberian/books" class="button">
                  <b-icon
                    icon="book"
                    class="material-icons"
                    @click="ToggleMenus"
                  />
                  <span class="text" @click="ToggleMenus">Books</span>
                </nuxt-link>
              </div>
            </span>

            <!-- Teacher -->
            <span v-if="role.name == 'teacher'">
              <h3 class="h3-memu">Teacher</h3>

              <div class="menu">
                <nuxt-link
                  :to="{
                    name: 'workspace-dashboard',
                    params: { workspace: mainWorkspace.slug },
                  }"
                  class="button"
                >
                  <b-icon icon="columns-gap" class="material-icons" />
                  <span class="text" @click="ToggleMenus">Dashboard</span>
                </nuxt-link>

                <nuxt-link
                  :to="{
                    name: 'workspace-teacher-profile',
                    params: { workspace: mainWorkspace.slug },
                  }"
                  class="button"
                >
                  <b-icon
                    icon="person-fill"
                    class="material-icons"
                    @click="ToggleMenus"
                  />
                  <span class="text" @click="ToggleMenus">Profile</span>
                </nuxt-link>

                <nuxt-link
                  :to="{
                    name: 'workspace-teacher-timetable',
                    params: { workspace: mainWorkspace.slug },
                  }"
                  class="button"
                >
                  <b-icon
                    icon="alarm"
                    class="material-icons"
                    @click="ToggleMenus"
                  />
                  <span class="text" @click="ToggleMenus">Timetable</span>
                </nuxt-link>

                <nuxt-link
                  :to="{
                    name: 'workspace-teacher-examTimetable',
                    params: { workspace: mainWorkspace.slug },
                  }"
                  class="button"
                >
                  <b-icon
                    icon="vector-pen"
                    class="material-icons"
                    @click="ToggleMenus"
                  />
                  <span class="text" @click="ToggleMenus">Exam Timetable</span>
                </nuxt-link>
                <nuxt-link
                  :to="{
                    name: 'workspace-teacher-marksheet',
                    params: { workspace: mainWorkspace.slug },
                  }"
                  class="button"
                >
                  <b-icon
                    icon="vector-pen"
                    class="material-icons"
                    @click="ToggleMenus"
                  />
                  <span class="text">Marksheet</span>
                </nuxt-link>
              </div>
            </span>

            <!-- Student -->
            <span v-if="role.name == 'student'">
              <h3 class="h3-memu">Student</h3>

              <div class="menu">
                <nuxt-link
                  :to="{
                    name: 'workspace-dashboard',
                    params: { workspace: mainWorkspace.slug },
                  }"
                  class="button"
                >
                  <b-icon icon="columns-gap" class="material-icons" />
                  <span class="text" @click="ToggleMenus">Dashboard</span>
                </nuxt-link>
                <nuxt-link
                  :to="{
                    name: 'workspace-student-profile',
                    params: { workspace: mainWorkspace.slug },
                  }"
                  class="button"
                >
                  <b-icon
                    icon="person-fill"
                    class="material-icons"
                    @click="ToggleMenus"
                  />
                  <span class="text" @click="ToggleMenus">Profile</span>
                </nuxt-link>

                <nuxt-link
                  :to="{
                    name: 'workspace-student-timetable',
                    params: { workspace: mainWorkspace.slug },
                  }"
                  class="button"
                >
                  <b-icon
                    icon="alarm"
                    class="material-icons"
                    @click="ToggleMenus"
                  />
                  <span class="text" @click="ToggleMenus">Timetable</span>
                </nuxt-link>

                <nuxt-link
                  :to="{
                    name: 'workspace-student-examTimetable',
                    params: { workspace: mainWorkspace.slug },
                  }"
                  class="button"
                >
                  <b-icon
                    icon="alarm"
                    class="material-icons"
                    @click="ToggleMenus"
                  />
                  <span class="text" @click="ToggleMenus">Exam Timetable</span>
                </nuxt-link>

                <nuxt-link
                  :to="{
                    name: 'workspace-student-result',
                    params: { workspace: mainWorkspace.slug },
                  }"
                  class="button"
                >
                  <b-icon
                    icon="file-text"
                    class="material-icons"
                    @click="ToggleMenus"
                  />
                  <span class="text" @click="ToggleMenus">Result</span>
                </nuxt-link>

                <!-- collapse -->
                <nuxt-link
                  v-b-toggle.accordion-4
                  block
                  event=""
                  to="admin"
                  class="button"
                >
                  <b-icon
                    icon="vector-pen"
                    class="material-icons"
                    @click="ToggleMenus()"
                  />
                  <span class="text" @click="ToggleMenus()"
                    >Payment
                    <b-icon
                      style="margin-left: 6rem"
                      scale="0.8"
                      class="caret-down"
                      icon="caret-down"
                  /></span>
                </nuxt-link>

                <b-collapse
                  id="accordion-4"
                  accordion="my-accordion"
                  role="tabpanel"
                  class="mt-2 dropMenuClose"
                >
                  <b-card bg-variant="light">
                    <nuxt-link
                      t
                      :to="{
                        name: 'workspace-student-payment',
                        params: { workspace: mainWorkspace.slug },
                      }"
                      class="button"
                    >
                      <b-icon
                        icon="person-fill"
                        class="material-icon"
                        @click="ToggleMenus"
                      />
                      <span class="text" @click="ToggleMenus">Pay Fee</span>
                    </nuxt-link>
                  </b-card>
                </b-collapse>
              </div>
            </span>

            <!-- guardian -->
            <span v-if="role.name == 'guardian'">
              <h3 class="h3-memu">Guardian</h3>

              <div class="menu">
                <nuxt-link
                  :to="{
                    name: 'workspace-dashboard',
                    params: { workspace: mainWorkspace.slug },
                  }"
                  class="button"
                >
                  <b-icon icon="columns-gap" class="material-icons" />
                  <span class="text" @click="ToggleMenus">Dashboard</span>
                </nuxt-link>

                <nuxt-link
                  :to="{
                    name: 'workspace-guardian-profile',
                    params: { workspace: mainWorkspace.slug },
                  }"
                  class="button"
                >
                  <b-icon
                    icon="person-fill"
                    class="material-icons"
                    @click="ToggleMenus"
                  />
                  <span class="text" @click="ToggleMenus">Profile</span>
                </nuxt-link>

                <nuxt-link
                  :to="{
                    name: 'workspace-guardian-timetable',
                    params: { workspace: mainWorkspace.slug },
                  }"
                  class="button"
                >
                  <b-icon
                    icon="alarm"
                    class="material-icons"
                    @click="ToggleMenus"
                  />
                  <span class="text" @click="ToggleMenus">Timetable</span>
                </nuxt-link>

                <nuxt-link
                  :to="{
                    name: 'workspace-guardian-examTimetable',
                    params: { workspace: mainWorkspace.slug },
                  }"
                  class="button"
                >
                  <b-icon
                    icon="vector-pen"
                    class="material-icons"
                    @click="ToggleMenus"
                  />
                  <span class="text" @click="ToggleMenus">Exam Timetable</span>
                </nuxt-link>

                <nuxt-link
                  :to="{
                    name: 'workspace-guardian-result',
                    params: { workspace: mainWorkspace.slug },
                  }"
                  class="button"
                >
                  <b-icon
                    icon="file-text"
                    class="material-icons"
                    @click="ToggleMenus"
                  />
                  <span class="text" @click="ToggleMenus">Result</span>
                </nuxt-link>

                <nuxt-link
                  :to="{
                    name: 'workspace-guardian-feePayment',
                    params: { workspace: mainWorkspace.slug },
                  }"
                  class="button"
                >
                  <b-icon
                    icon="file-text"
                    class="material-icons"
                    @click="ToggleMenus"
                  />
                  <span class="text" @click="ToggleMenus">Fee Payment</span>
                </nuxt-link>
              </div>
            </span>
            <!-- admin -->

            <span v-if="role.name == 'main admin'">
              <h3 class="h3-memu">Admin</h3>

              <div class="menu">
                <nuxt-link
                  :to="{
                    name: 'workspace-dashboard',
                    params: { workspace: mainWorkspace.slug },
                  }"
                  class="button"
                >
                  <b-icon icon="columns-gap" class="material-icons" />
                  <span class="text" @click="ToggleMenus">Dashboard</span>
                </nuxt-link>
                <nuxt-link to="/admin/roles" class="button">
                  <b-icon
                    icon="person-plus"
                    class="material-icons"
                    @click="ToggleMenus"
                  />
                  <span class="text" @click="ToggleMenus">User Roles</span>
                </nuxt-link>

                <!-- collapse -->
                <nuxt-link
                  v-b-toggle.accordion-1
                  block
                  event=""
                  to="admin"
                  class="button"
                >
                  <b-icon
                    icon="vector-pen"
                    class="material-icons"
                    @click="ToggleMenus()"
                  />
                  <span class="text" @click="ToggleMenus()"
                    >Users
                    <b-icon
                      style="margin-left: 6rem"
                      scale="0.8"
                      class="caret-down"
                      icon="caret-down"
                  /></span>
                </nuxt-link>

                <b-collapse
                  id="accordion-1"
                  accordion="my-accordion"
                  role="tabpanel"
                  class="mt-2 dropMenuClose"
                >
                  <b-card bg-variant="light">
                    <nuxt-link
                      :to="{
                        name: 'workspace-admin-teacher',
                        params: { workspace: mainWorkspace.slug },
                      }"
                      class="button"
                    >
                      <b-icon
                        icon="person-fill"
                        class="material-icon"
                        @click="ToggleMenus"
                      />
                      <span class="text" @click="ToggleMenus">Teacher</span>
                    </nuxt-link>

                    <nuxt-link
                      :to="{
                        name: 'workspace-admin-student',
                        params: { workspace: mainWorkspace.slug },
                      }"
                      class="button"
                    >
                      <b-icon
                        icon="people-fill"
                        class="material-icon"
                        @click="ToggleMenus"
                      />
                      <span class="text" @click="ToggleMenus">Student</span>
                    </nuxt-link>
                    <nuxt-link
                      :to="{
                        name: 'workspace-admin-accountant',
                        params: { workspace: mainWorkspace.slug },
                      }"
                      class="button"
                    >
                      <b-icon
                        icon="people-fill"
                        class="material-icon"
                        @click="ToggleMenus"
                      />
                      <span class="text" @click="ToggleMenus">Accountant</span>
                    </nuxt-link>

                    <nuxt-link
                      :to="{
                        name: 'workspace-admin-libarian',
                        params: { workspace: mainWorkspace.slug },
                      }"
                      class="button"
                    >
                      <b-icon
                        icon="people-fill"
                        class="material-icon"
                        @click="ToggleMenus"
                      />
                      <span class="text" @click="ToggleMenus">Libarian</span>
                    </nuxt-link>
                  </b-card>
                </b-collapse>

                <!-- toggle menu -->
                <nuxt-link
                  v-b-toggle.accordion-2
                  event=""
                  to="admin/school"
                  block
                  class="button"
                >
                  <b-icon
                    icon="pen"
                    class="material-icons"
                    @click="ToggleMenus()"
                  />
                  <span class="text" @click="ToggleMenus()"
                    >Exam
                    <b-icon
                      style="margin-left: 6rem"
                      scale="0.8"
                      class="caret-down"
                      icon="caret-down"
                  /></span>
                </nuxt-link>

                <b-collapse
                  id="accordion-2"
                  accordion="my-accordion"
                  role="tabpanel"
                  class="mt-2 dropMenuClose"
                >
                  <b-card bg-variant="light">
                    <nuxt-link
                      :to="{
                        name: 'workspace-admin-exam-timetable',
                        params: { workspace: mainWorkspace.slug },
                      }"
                      class="button"
                    >
                      <b-icon
                        icon="alarm"
                        scale="0.85"
                        class="material-icon"
                        @click="ToggleMenus"
                      />
                      <span class="text">Timetable</span>
                    </nuxt-link>

                    <nuxt-link
                      :to="{
                        name: 'workspace-admin-exam-marksheet',
                        params: { workspace: mainWorkspace.slug },
                      }"
                      class="button"
                    >
                      <b-icon
                        icon="file-earmark-ruled"
                        scale="0.85"
                        class="material-icon"
                        @click="ToggleMenus"
                      />
                      <span class="text">Marksheet</span>
                    </nuxt-link>
                    <nuxt-link
                      :to="{
                        name: 'workspace-admin-exam-result',
                        params: { workspace: mainWorkspace.slug },
                      }"
                      class="button"
                    >
                      <b-icon
                        icon="file-text"
                        scale="0.85"
                        class="material-icon"
                        @click="ToggleMenus"
                      />
                      <span class="text">Results</span>
                    </nuxt-link>

                    <nuxt-link
                      :to="{
                        name: 'workspace-admin-exam-grades',
                        params: { workspace: mainWorkspace.slug },
                      }"
                      class="button"
                    >
                      <b-icon
                        icon="file-text"
                        scale="0.85"
                        class="material-icon"
                        @click="ToggleMenus"
                      />
                      <span class="text">Grades</span>
                    </nuxt-link>

                    <nuxt-link
                      :to="{
                        name: 'workspace-admin-exam-tabulation',
                        params: { workspace: mainWorkspace.slug },
                      }"
                      class="button"
                    >
                      <b-icon
                        icon="newspaper"
                        scale="0.85"
                        class="material-icon"
                        @click="ToggleMenus"
                      />
                      <span class="text">Tabulation Sheet</span>
                    </nuxt-link>

                    <nuxt-link
                      :to="{
                        name: 'workspace-admin-exam-promotion',
                        params: { workspace: mainWorkspace.slug },
                      }"
                      class="button"
                    >
                      <b-icon
                        icon="arrow-right-circle"
                        scale="0.85"
                        class="material-icon"
                        @click="ToggleMenus"
                      />
                      <span class="text">promotion</span>
                    </nuxt-link>

                    <nuxt-link
                      :to="{
                        name: 'workspace-admin-exam-reset',
                        params: { workspace: mainWorkspace.slug },
                      }"
                      class="button"
                    >
                      <b-icon
                        icon="arrow-left-circle"
                        scale="0.85"
                        class="material-icon"
                        @click="ToggleMenus"
                      />
                      <span class="text">Reset Promotion</span>
                    </nuxt-link>
                    <!-- <nuxt-link to="/admin/exam/publish" class="button">
                  <span class="text">publish Result</span>
                </nuxt-link> -->
                  </b-card>
                </b-collapse>
                <!-- end -->

                <!-- collapse -->
                <nuxt-link
                  v-b-toggle.accordion-3
                  block
                  event=""
                  to="admin/school"
                  class="button"
                >
                  <b-icon
                    icon="vector-pen"
                    class="material-icons"
                    @click="ToggleMenus()"
                  />
                  <span class="text" @click="ToggleMenus()"
                    >School
                    <b-icon
                      style="margin-left: 6rem"
                      scale="0.8"
                      class="caret-down"
                      icon="caret-down"
                  /></span>
                </nuxt-link>

                <b-collapse
                  id="accordion-3"
                  accordion="my-accordion"
                  role="tabpanel"
                  class="mt-2 dropMenuClose"
                >
                  <b-card bg-variant="light">
                    <nuxt-link
                      :to="{
                        name: 'workspace-admin-timetable',
                        params: { workspace: mainWorkspace.slug },
                      }"
                      class="button"
                    >
                      <b-icon
                        icon="alarm"
                        class="material-icons"
                        @click="ToggleMenus"
                      />
                      <span class="text" @click="ToggleMenus">Timetable</span>
                    </nuxt-link>

                    <nuxt-link
                      :to="{
                        name: 'workspace-admin-session',
                        params: { workspace: mainWorkspace.slug },
                      }"
                      class="button"
                    >
                      <b-icon
                        icon="layers"
                        class="material-icons"
                        @click="ToggleMenus"
                      />
                      <span class="text" @click="ToggleMenus">Sessions</span>
                    </nuxt-link>

                    <nuxt-link
                      :to="{
                        name: 'workspace-admin-section',
                        params: { workspace: mainWorkspace.slug },
                      }"
                      class="button"
                    >
                      <b-icon
                        icon="layers"
                        class="material-icons"
                        @click="ToggleMenus"
                      />
                      <span class="text" @click="ToggleMenus">Section</span>
                    </nuxt-link>

                    <nuxt-link
                      :to="{
                        name: 'workspace-admin-classes',
                        params: { workspace: mainWorkspace.slug },
                      }"
                      class="button"
                    >
                      <b-icon
                        icon="layers"
                        class="material-icons"
                        @click="ToggleMenus"
                      />
                      <span class="text" @click="ToggleMenus">Classes</span>
                    </nuxt-link>
                    <nuxt-link
                      :to="{
                        name: 'workspace-admin-subjects',
                        params: { workspace: mainWorkspace.slug },
                      }"
                      class="button"
                    >
                      <b-icon
                        icon="text-indent-left"
                        class="material-icons"
                        @click="ToggleMenus"
                      />
                      <span class="text" @click="ToggleMenus">Subjects</span>
                    </nuxt-link>
                  </b-card>
                </b-collapse>

                <nuxt-link
                  class="button"
                  :to="{
                    name: 'workspace-admin-event',
                    params: { workspace: mainWorkspace.slug },
                  }"
                >
                  <b-icon
                    icon="calendar2-date"
                    class="material-icons"
                    @click="ToggleMenus"
                  />
                  <span class="text" @click="ToggleMenus">Event</span>
                </nuxt-link>

                <nuxt-link
                  class="button"
                  :to="{
                    name: 'workspace-admin-notice',
                    params: { workspace: mainWorkspace.slug },
                  }"
                >
                  <b-icon
                    icon="calendar2-date"
                    class="material-icons"
                    @click="ToggleMenus"
                  />
                  <span class="text" @click="ToggleMenus">Notices</span>
                </nuxt-link>

                <nuxt-link
                  :to="{
                    name: 'workspace-admin-driver',
                    params: { workspace: mainWorkspace.slug },
                  }"
                  class="button"
                >
                  <b-icon
                    icon="truck"
                    class="material-icons"
                    @click="ToggleMenus"
                  />
                  <span class="text" @click="ToggleMenus">Drivers</span>
                </nuxt-link>

                <div class="d-flex"></div>

                <div class="menu">
                  <nuxt-link
                    :to="{
                      name: 'workspace-admin-settings',
                      params: { workspace: mainWorkspace.slug },
                    }"
                    class="button"
                  >
                    <b-icon icon="gear-fill" class="material-icons" />
                    <span class="text">Settings</span>
                  </nuxt-link>
                </div>
              </div>
            </span>
          </div>
        </div>
      </div></template
    >
  </div>
</template>

<script>
import { mapState } from 'pinia'
import { useWorkspaceStore } from '@/stores/wokspace'
import { ROLEX_QUERIEX } from '~/graphql/users/queries'
export default {
  // mounted() {
  //   this.is_expanded = localStorage.getItem('is_expanded') === 'true'
  // },
  data() {
    return {
      is_expanded: 'is_expanded',
      rotate: '',
      user: [],
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
      query: ROLEX_QUERIEX,
      variables() {
        return { id: parseInt(this.$auth.user.id) }
      },
    },
  },
  methods: {
    // ToggleMenu() {
    //   this.is_expanded = !this.is_expanded
    //   // localStorage.setItem('is_expanded', this.is_expanded)
    // },
    ToggleMenus() {
      this.is_expanded = 'is_expanded'
    },
    // caretDown() {
    //   if (this.rotate === '') {
    //     this.rotate = 'upDown'
    //   } else {
    //     this.rotate = ''
    //   }
    // },
  },
}
</script>

<style lang="scss">
.fixed {
  position: fixed;
  overflow-y: auto;
  width: 20.5rem;
  top: 0;
  background-color: #fff;
  z-index: 3;

  .aside {
    // position: sticky !important;
    display: flex;
    flex-direction: column;
    background-color: var(--color-white);
    width: calc(2rem + 32px);
    height: 100vh;
    padding: 1rem;
    transition: 0.3s ease-out;

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
        .material-icons,
        .material-icon {
          font-size: 3rem;
          transition: 0.2s ease-out;
        }

        &:hover {
          .material-icons,
          .material-icon {
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
        .material-icon {
          padding-right: 2.5rem;
          color: var(--color-body);
          transition: 0.1s ease-out;
          margin-top: -0.3rem;
        }
        &.nuxt-link-exact-active {
          border-radius: 0 2rem 2rem 0;
          border-left: 5px solid limegreen;

          .material-icons,
          .material-icon {
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

    &.is-expanded {
      width: 100%;

      .menu-toggle-wrap {
        top: -3rem;
        .menu-toggle {
          transform: rotate(-180deg);
          margin-top: -1rem;
          margin-bottom: 2rem;
        }
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
          .material-icon {
            margin-right: 0;
          }

          &:hover {
            background-color: var(--color-primary);
            border-radius: 0 2rem 2rem 0;
            .material-icon,
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
          .material-icon,
          .text {
            color: var(--color-white);
          }
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

  <template>
  <div class="fonts">
    <b-row no-gutters>
      <b-col md="12">
        <div class="card-body">
          <div class="card-student p-3" style="background-color: #fff">
            <h2 class="d-flex justify-content-center mb-4 mt-4">
              Confirm Student Fee
            </h2>
            <hr />

            <table class="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Full Name</th>
                  <th scope="col">Photo</th>
                  <th scope="col">Gender</th>
                  <th scope="col">Class</th>
                  <th scope="col">Year</th>
                  <th scope="col">Status</th>
                  <th scope="col">Due Amount (&#x20A6;)</th>
                  <th scope="col">Paid Amount (&#x20A6;)</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>Mark James</td>
                  <td>
                    <b-avatar
                      variant="primary"
                      src="@/assets/svg/student-svg.svg"
                    />
                  </td>
                  <td>Male</td>
                  <td>{{ CurrentClass }}</td>
                  <td>2022</td>
                  <td><b-badge variant="danger">Due</b-badge></td>
                  <td>80,000</td>
                  <td>
                    <input
                      v-model="form.amount"
                      type="number"
                      style="width: 50%"
                    />
                  </td>

                  <td>
                    <b-button variant="danger" size="lg" type="submit"
                      >Pay</b-button
                    >
                    <!-- <b-dropdown
                      id="dropdown-1"
                      text="Manage Payment"
                      class="m-2"
                      variant="warning"
                      menu-class="w-100"
                      size="lg"
                    >
                      <b-dropdown-item
                        style="
                          font-size: 1.5rem;
                          padding: 0.7rem 0.6rem;
                          text-align: center;
                        "
                        ><nuxt-link to="/accountant/unique-payment"
                          >All Payments</nuxt-link
                        ></b-dropdown-item
                      >
                      <b-dropdown-item
                        style="
                          font-size: 1.5rem;
                          padding: 0.5rem 0.5rem;
                          text-align: center;
                        "
                        >2022</b-dropdown-item
                      >
                    </b-dropdown> -->
                  </td>
                </tr>
              </tbody>
            </table>
          
            <!-- table -->
          </div>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  props: {
    CurrentClass: String,
  },
  data() {
    return {
      form:{
        amount: null
      }
    }
  },
}
</script>

<style lang="scss">
.fonts {
  font-size: 1.4rem !important;
  padding: 2rem;

  .add-student {
    font-size: 1.6rem;
    box-shadow: 0 5px 5px 0 #1f64b367;
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
      .form-control,
      .mb-3 {
        height: 3.2rem;
        font-size: 1.2rem;
      }
    }
  }
}
</style>



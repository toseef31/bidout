<template>
  <section class="fill-height payment-module white">
    <NavbarBeforeLogin></NavbarBeforeLogin>
      <div class="get-topHeader d-flex">
        <v-row
          align="center"
          justify="center"
          no-gutters
        >
          <v-col
            class="text-left pl-16"
            cols="12"
          >
            <h1 class="font-weight-bolder white--text">
              Get Started
            </h1>
          </v-col>
        </v-row>
      </div>
      <v-container>
        <v-main>
          <v-row justify="center">
            <v-col cols="12" md="9">
              <div class="title-head text-left">
                <h3 class="mb-4">New Account Setup:</h3>
                <h1 class="mb-8">Tetra Technologies</h1>
                <h4 class="font-weight-bold">Billing Frequency</h4>
                <div class="d-flex">
                  <v-radio-group
                    v-model="frequency"
                    mandatory
                    row
                  >
                    <v-radio
                      label="Monthly"
                      color="#0D9647"
                      value="monthly"
                    ></v-radio>
                    <v-radio
                      label="Yearly"
                      color="#0D9647"
                      value="yearly"
                    ></v-radio>
                  </v-radio-group>
                </div>
              </div>
              <div class="form-section">
                <v-row>
                  <v-col cols="12" sm="12" text="left">
                    <label class="d-block text-left input-label mb-2 font-weight-bold">Payment Type</label>
                    <v-select outlined placeholder="Select" :item-value="paymentTypes.value" :items="paymentTypes" @change="payment(type)" v-model="type"></v-select>
                  </v-col>
                </v-row>
              </div>
              <div class="card-form" v-if="showCard == true">
                  <v-form>
                    <v-row class="mt-12">
                      <v-col cols="12" sm="12" text="left">
                        <label class="d-block text-left input-label mb-2 font-weight-bold">Card Number</label>
                        <input
                          type="tel"
                          :id="fields.cardNumber"
                          @input="changeNumber"
                          @focus="focusCardNumber"
                          @blur="blurCardNumber"
                          class="card-input__input"
                          :value="formData.cardNumber"
                          :maxlength="cardNumberMaxLength"
                          data-card-field
                          autocomplete="off"
                        />
                      </v-col>
                      <v-col cols="12" sm="6" text="left">
                        <label class="d-block text-left input-label mb-2 font-weight-bold">Expiration</label>
                        <v-text-field placeholder="MM/YY" maxlength="5" single-line outlined type="text"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" text="left">
                        <label class="d-block text-left input-label mb-2 font-weight-bold">CVV</label>
                        <v-text-field placeholder="CVV" single-line outlined type="tel"
                            v-number-only
                            :id="fields.cardCvv"
                            maxlength="4"
                            :value="formData.cardCvv"
                            @input="changeCvv"
                            data-card-field
                            autocomplete="off"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" text="left">
                        <label class="d-block text-left input-label mb-2 font-weight-bold">Country</label>
                        <v-select :items="countries" outlined v-model="country"></v-select>
                      </v-col>
                      <v-col cols="12" sm="6" text="left">
                        <label class="d-block text-left input-label mb-2 font-weight-bold">ZIP Code</label>
                        <v-text-field placeholder="ZIP Code" single-line outlined type="text"></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row justify="space-between" align="center">
                      <v-col cols="12" md="8" class="text-left">
                        <h1 class="mb-0 font-weight-bold">Amount being charged today</h1>
                      </v-col>
                      <v-col cols="12" md="4" class="text-right">
                        <h1 class="price-text">$ 79.99</h1>
                      </v-col>
                    </v-row>
                    <v-row justify="space-between" align="center">
                      <v-col cols="12" md="8" class="text-left">
                        <h1 class="mb-0 font-weight-bold">Next Renewal</h1>
                      </v-col>
                      <v-col cols="12" md="4" class="text-right">
                        <h1>08/11/2022</h1>
                      </v-col>
                    </v-row>
                    <v-row justify="center" align="center" class="mt-5">
                      <v-col cols="12" md="4">
                        <v-btn color="#0D9647" large dense width="100%" height="56" class="font-weight-bold white--text text-capitalize">Complete Signup <v-icon class="pl-2" color="#fff">mdi-arrow-right-circle</v-icon></v-btn>
                      </v-col>
                    </v-row>
                  </v-form>
                  <!-- <div class="card-form__inner">
                    <div class="card-input">
                      <label for="cardNumber" class="card-input__label">Card Number</label>
                      <input
                        type="tel"
                        :id="fields.cardNumber"
                        @input="changeNumber"
                        @focus="focusCardNumber"
                        @blur="blurCardNumber"
                        class="card-input__input"
                        :value="formData.cardNumber"
                        :maxlength="cardNumberMaxLength"
                        data-card-field
                        autocomplete="off"
                      />
                      <button
                        class="card-input__eye"
                        :class="{ '-active' : !isCardNumberMasked }"
                        title="Show/Hide card number"
                        tabindex="-1"
                        :disabled="formData.cardNumber === ''"
                        @click="toggleMask"
                      ></button>
                    </div>
                    <div class="card-form__row">
                      <div class="card-form__col">
                        <div class="card-form__group">
                          <label for="cardMonth" class="card-input__label">expirationDate</label>
                          <select
                            class="card-input__input -select"
                            :id="fields.cardMonth"
                            v-model="formData.cardMonth"
                            @change="changeMonth"
                            data-card-field
                          >
                            <option value disabled selected>month</option>
                            <option
                              v-bind:value="n < 10 ? '0' + n : n"
                              v-for="n in 12"
                              v-bind:disabled="n < minCardMonth"
                              v-bind:key="n"
                            >{{generateMonthValue(n)}}</option>
                          </select>
                          <select
                            class="card-input__input -select"
                            :id="fields.cardYear"
                            v-model="formData.cardYear"
                            @change="changeYear"
                            data-card-field
                          >
                            <option value disabled selected>year</option>
                            <option
                              v-bind:value="$index + minCardYear"
                              v-for="(n, $index) in 12"
                              v-bind:key="n"
                            >{{$index + minCardYear}}</option>
                          </select>
                        </div>
                      </div>
                      <div class="card-form__col -cvv">
                        <div class="card-input">
                          <label for="cardCvv" class="card-input__label">CVV</label>
                          <input
                            type="tel"
                            class="card-input__input"
                            v-number-only
                            :id="fields.cardCvv"
                            maxlength="4"
                            :value="formData.cardCvv"
                            @input="changeCvv"
                            data-card-field
                            autocomplete="off"
                          />
                        </div>
                      </div>
                    </div>

                    <button class="card-form__button" v-on:click="invaildCard">submit</button>
                  </div> -->
                </div>
                <div v-else>
                  <v-form class="net30-form">
                    <v-row class="mt-12">
                      <v-col cols="12" sm="12" text="left">
                        <label class="d-block text-left input-label mb-2 font-weight-bold">Billing Contact Name</label>
                        <v-text-field label="Billing Contact Name" single-line outlined type="text" color="#ffffff"></v-text-field>
                        <v-checkbox
                          v-model="billingNameCheck"
                          label="Same as you"
                          color="#0D9648"
                          class="mt-0"
                        ></v-checkbox>
                      </v-col>
                      <v-col cols="12" sm="12" text="left">
                        <label class="d-block text-left input-label mb-2 font-weight-bold">Billing Contact Phone</label>
                        <v-text-field label="Billing Contact Phone" single-line outlined type="text"></v-text-field>
                        <v-checkbox
                          v-model="billingPhoneCheck"
                          label="Same as you"
                          color="#0D9648"
                          class="mt-0"
                        ></v-checkbox>
                      </v-col>
                      <v-col cols="12" sm="12" text="left">
                        <label class="d-block text-left input-label mb-2 font-weight-bold">Billing Contact Email</label>
                        <v-text-field label="Billing Contact Email" single-line outlined type="email"></v-text-field>
                        <v-checkbox
                          v-model="billingEmailCheck"
                          label="Same as you"
                          color="#0D9648"
                          class="mt-0"
                        ></v-checkbox>
                      </v-col>
                    </v-row>
                    <v-row justify="center" align="center">
                      <v-col cols="12" md="4">
                        <v-btn color="#0D9647" large dense width="100%" height="56" class="font-weight-bold white--text text-capitalize">Complete Signup <v-icon class="pl-2" color="#fff">mdi-arrow-right-circle</v-icon></v-btn>
                      </v-col>
                    </v-row>
                  </v-form>
                </div>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col cols="12" md="8">
              <div class="getStart-box pa-6 text-left">
                <h1 class="mb-3 font-weight-bold">Questions? Interested in an Enterpise Agreement?</h1>
                <div class="d-flex align-start">
                  <v-icon class="pr-4 mt-1" color="#0D9647">mdi-phone-outline</v-icon>
                  <p>Call BidOut <br><strong>832-786-2400</strong></p>
                </div>
              </div>
            </v-col>
          </v-row>
        </v-main>
      </v-container>
      <Footer></Footer>
   </section>
</template>
<script>
  import NavbarBeforeLogin from '../Layout/NavbarBeforeLogin.vue'
  import Footer from '../Layout/Footer.vue'
  export default {
    name: 'Payment',
    directives: {
      'number-only': {
        bind (el) {
          function checkValue (event) {
            event.target.value = event.target.value.replace(/[^0-9]/g, '')
            if (event.charCode >= 48 && event.charCode <= 57) {
              return true
            }
            event.preventDefault()
          }
          el.addEventListener('keypress', checkValue)
        }
      },
      'letter-only': {
        bind (el) {
          function checkValue (event) {
            if (event.charCode >= 48 && event.charCode <= 57) {
              event.preventDefault()
            }
            return true
          }
          el.addEventListener('keypress', checkValue)
        }
      }
    },
    props: {
      formData: {
        type: Object,
        default: () => {
          return {
            cardName: '',
            cardNumber: '',
            cardNumberNotMask: '',
            cardMonth: '',
            cardYear: '',
            cardCvv: ''
          }
        }
      },
      backgroundImage: [String, Object],
      randomBackgrounds: {
        type: Boolean,
        default: true
      }
    },
    components: {
      NavbarBeforeLogin,
      Footer
    },
    data () {
      return {
        fields: {
          cardNumber: 'v-card-number',
          cardName: 'v-card-name',
          cardMonth: 'v-card-month',
          cardYear: 'v-card-year',
          cardCvv: 'v-card-cvv'
        },
        minCardYear: new Date().getFullYear(),
        isCardNumberMasked: true,
        mainCardNumber: this.cardNumber,
        cardNumberMaxLength: 19,
        frequency: 'monthly',
        paymentTypes: [
          'Credit Card',
          'Check - Net 30 Terms',
        ],
        type: 'Credit Card',
        showCard: true,
        billingEmailCheck: true,
        billingNameCheck: true,
        billingPhoneCheck: true,
        countries: [
          'Uninted States',
          'United Kingdom',
          'China',
          'Russia',
          'Germany',
          'Pakistan',
          'India',
          'Brazil',
          'Australia',
        ],
        country: 'Uninted States'
      }
    },
    computed: {
      minCardMonth () {
        if (this.formData.cardYear === this.minCardYear) return new Date().getMonth() + 1
        return 1
      }
    },
    watch: {
      cardYear () {
        if (this.formData.cardMonth < this.minCardMonth) {
          this.formData.cardMonth = ''
        }
      }
    },
    mounted () {
      this.maskCardNumber()
    },
    methods: {
      generateMonthValue (n) {
        return n < 10 ? `0${n}` : n
      },
      changeName (e) {
        this.formData.cardName = e.target.value
      },
      changeNumber (e) {
        this.formData.cardNumber = e.target.value
        let value = this.formData.cardNumber.replace(/\D/g, '')
        // american express, 15 digits
        if ((/^3[47]\d{0,13}$/).test(value)) {
          this.formData.cardNumber = value.replace(/(\d{4})/, '$1 ').replace(/(\d{4}) (\d{6})/, '$1 $2 ')
          this.cardNumberMaxLength = 17
        } else if ((/^3(?:0[0-5]|[68]\d)\d{0,11}$/).test(value)) { // diner's club, 14 digits
          this.formData.cardNumber = value.replace(/(\d{4})/, '$1 ').replace(/(\d{4}) (\d{6})/, '$1 $2 ')
          this.cardNumberMaxLength = 16
        } else if ((/^\d{0,16}$/).test(value)) { // regular cc number, 16 digits
          this.formData.cardNumber = value.replace(/(\d{4})/, '$1 ').replace(/(\d{4}) (\d{4})/, '$1 $2 ').replace(/(\d{4}) (\d{4}) (\d{4})/, '$1 $2 $3 ')
          this.cardNumberMaxLength = 19
        }
        // eslint-disable-next-line eqeqeq
        if (e.inputType == 'deleteContentBackward') {
          let lastChar = this.formData.cardNumber.substring(this.formData.cardNumber.length, this.formData.cardNumber.length - 1)
          // eslint-disable-next-line eqeqeq
          if (lastChar == ' ') { this.formData.cardNumber = this.formData.cardNumber.substring(0, this.formData.cardNumber.length - 1) }
        }
        this.$emit('input-card-number', this.formData.cardNumber)
      },
      changeMonth () {
        this.$emit('input-card-month', this.formData.cardMonth)
      },
      changeYear () {
        this.$emit('input-card-year', this.formData.cardYear)
      },
      changeCvv (e) {
        this.formData.cardCvv = e.target.value
        this.$emit('input-card-cvv', this.formData.cardCvv)
      },
      invaildCard () {
        let number = this.formData.cardNumberNotMask.replace(/ /g, '')
        var sum = 0
        for (var i = 0; i < number.length; i++) {
          var intVal = parseInt(number.substr(i, 1))
          if (i % 2 === 0) {
            intVal *= 2
            if (intVal > 9) {
              intVal = 1 + (intVal % 10)
            }
          }
          sum += intVal
        }
        if (sum % 10 !== 0) {
          alert(this.$t('cardForm.invalidCardNumber'))
        }
      },
      blurCardNumber () {
        if (this.isCardNumberMasked) {
          this.maskCardNumber()
        }
      },
      maskCardNumber () {
        this.formData.cardNumberNotMask = this.formData.cardNumber
        this.mainCardNumber = this.formData.cardNumber
        let arr = this.formData.cardNumber.split('')
        arr.forEach((element, index) => {
          if (index > 4 && index < 14 && element.trim() !== '') {
            arr[index] = '*'
          }
        })
        this.formData.cardNumber = arr.join('')
      },
      unMaskCardNumber () {
        this.formData.cardNumber = this.mainCardNumber
      },
      focusCardNumber () {
        this.unMaskCardNumber()
      },
      toggleMask () {
        this.isCardNumberMasked = !this.isCardNumberMasked
        if (this.isCardNumberMasked) {
          this.maskCardNumber()
        } else {
          this.unMaskCardNumber()
        }
      },
      payment(type){
        if(type == 'Credit Card'){
          this.showCard = true;
        }else{
          this.showCard = false;
        }
      }
    }
  }
</script>
<style scoped lang="scss">

</style>

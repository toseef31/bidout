<template>
  <section class="fill-height payment-module white">
    <NavbarBeforeLogin></NavbarBeforeLogin>
      <div class="get-topHeader d-flex">
        <v-container fill-height>
          <v-row
            align="center"
            justify="center"
            no-gutters
          >
            <v-col
              class="text-left"
              cols="12"
            >
              <h1 class="font-weight-bolder white--text">
                Get Started
              </h1>
            </v-col>
          </v-row>
        </v-container>
      </div>
      <v-container>
        <v-main>
          <v-row justify="center">
            <v-col cols="12" md="9">
              <div class="title-head text-left">
                <h3 class="mb-4">New Account Setup:</h3>
                <h1 class="mb-8">{{companyName}}</h1>
              </div>
              <div class="form-section">
                <v-row>
                  <v-col cols="12" sm="12" text="left">
                    <label class="d-block text-left input-label mb-2 font-weight-bold">Payment Type</label>
                    <v-select outlined placeholder="Select" :item-value="paymentTypes.value" :items="paymentTypes" @change="payment(type)" v-model="type" class="text-left"></v-select>
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
                          v-model="formData.cardNumber"
                          :maxlength="cardNumberMaxLength"
                          data-card-field
                          autocomplete="off"
                        />
                      </v-col>
                      <v-col cols="12" sm="6" text="left">
                        <label class="d-block text-left input-label mb-2 font-weight-bold">Expiration Month</label>
                        <v-text-field placeholder="MM" v-model="expiryMonth" maxlength="2" single-line outlined type="text"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" text="left">
                        <label class="d-block text-left input-label mb-2 font-weight-bold">Expiration Year</label>
                        <v-text-field placeholder="YY" v-model="expiryYear" maxlength="2" single-line outlined type="text"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" text="left">
                        <label class="d-block text-left input-label mb-2 font-weight-bold">CVV</label>
                        <v-text-field placeholder="CVV" single-line outlined type="tel"
                            v-number-only
                            :id="fields.cardCvv"
                            maxlength="4"
                            v-model="formData.cardCvv"
                            @input="changeCvv"
                            data-card-field 
                            autocomplete="off"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" text="left">
                        <label class="d-block text-left input-label mb-2 font-weight-bold">Country</label>
                        <country-select v-model="country" :country="country" topCountry="US" className="countrySelect" placeholder="Select Country" />
                      </v-col>
                      <v-col cols="12" sm="12" text="left">
                        <label class="d-block text-left input-label mb-2 font-weight-bold">ZIP Code</label>
                        <v-text-field placeholder="ZIP Code" v-model="zipCode" single-line outlined type="text"></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row justify="space-between" align="center">
                      <v-col cols="12" md="8" class="text-left">
                        <h1 class="mb-0 font-weight-bold">Amount being charged today</h1>
                      </v-col>
                      <v-col cols="12" md="4" class="text-right">
                        <h1 class="price-text">$ {{price}}</h1>
                      </v-col>
                    </v-row>
                    <v-row justify="space-between" align="center">
                      <v-col cols="12" md="8" class="text-left">
                        <h1 class="mb-0 font-weight-bold">Next Renewal</h1>
                      </v-col>
                      <v-col cols="12" md="4" class="text-right">
                        <h1>{{contractData[0].renewsOn  | moment("MM/D/YYYY")}}</h1>
                      </v-col>
                    </v-row>
                    <v-row justify="center" align="center" class="mt-5">
                      <v-col cols="12" md="4">
                        <v-btn color="#0D9647" large dense width="100%" height="56" class="font-weight-bold white--text text-capitalize" @click="savePayment" :loading="loading"
                    :disabled="disable">Complete Signup <v-icon class="pl-2" color="#fff">mdi-arrow-right-circle</v-icon></v-btn>
                      </v-col>
                    </v-row>
                  </v-form>
                  
                </div>
                <div v-else>
                  <v-form class="net30-form">
                    <v-row class="mt-12">
                      <v-col cols="12" sm="12" text="left">
                        <v-checkbox
                          v-model="sameAsYou"
                          label="Same as you"
                          color="#0D9648"
                          class="mt-0" @change="sameAsAction"
                        ></v-checkbox>
                        <label class="d-block text-left input-label mb-2 font-weight-bold">Billing Contact First Name</label>
                        <v-text-field placeholder="Billing Contact Name" v-model="first_name" single-line outlined type="text"></v-text-field>
                        
                      </v-col>
                      <v-col cols="12" sm="12" text="left">
                        <label class="d-block text-left input-label mb-2 font-weight-bold">Billing Contact Last Name</label>
                        <v-text-field placeholder="Billing Contact Name" v-model="last_name" single-line outlined type="text"></v-text-field>
                        
                      </v-col>
                      <v-col cols="12" sm="12" text="left">
                        <label class="d-block text-left input-label mb-2 font-weight-bold">Billing Contact Phone</label>
                        <VuePhoneNumberInput :border-radius="4" size="lg" v-model="phone"
                        :translations="translations"
                        :loader="hasLoaderActive"
                        :error="hasErrorActive"
                        class="mb-2"
                        @update="onUpdate"
                        />
                      </v-col>
                      <v-col cols="12" sm="12" text="left">
                        <label class="d-block text-left input-label mb-2 font-weight-bold">Billing Contact Email</label>
                        <v-text-field placeholder="Billing Contact Email" v-model="email" single-line outlined type="email" :rules="emailRules"></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row justify="center" align="center">
                      <v-col cols="12" md="4">
                        <v-btn color="#0D9647" large dense width="100%" height="56" class="font-weight-bold white--text text-capitalize" :loading="loading"
                        :disabled="disable" @click="saveNet30">Complete Signup <v-icon class="pl-2" color="#fff">mdi-arrow-right-circle</v-icon></v-btn>
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
  import NavbarBeforeLogin from '../../components/Layout/NavbarBeforeLogin.vue'
  import Footer from '../../components/Layout/Footer.vue'
  import VuePhoneNumberInput from 'vue-phone-number-input';
  import 'vue-phone-number-input/dist/vue-phone-number-input.css';
  import { mapActions } from "vuex";
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
    },
    components: {
      NavbarBeforeLogin,
      Footer,
      VuePhoneNumberInput
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
        sameAsYou: true,
        country: "US",
        zipCode: '',
        expiryMonth: '',
        expiryYear: '',
        loading: false,
        disable: false,
        first_name: this.$store.getters.credentials.firstName,
        last_name: this.$store.getters.credentials.lastName,
        phone: this.$store.getters.credentials.phoneNumber,
        email: this.$store.getters.credentials.email,
        defaultCountry: 'US',
        translations: {
          countrySelectorLabel: 'Country Code',
          countrySelectorError: 'Choose country',
          phoneNumberLabel: 'Phone Number',
          example: 'Example'
        },
        hasLoaderActive: false,
        hasErrorActive: false,
        results: {},
        emailRules: [
          v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        ],
      }
    },
    computed: {
      minCardMonth () {
        if (this.formData.cardYear === this.minCardYear) return new Date().getMonth() + 1
        return 1
      },
      companyName(){
       return this.$store.getters.companyName;
      },
      price(){
       return this.$store.getters.price;
      },
      contractData(){
       if(this.$store.getters.contractData){
         return this.$store.getters.contractData.company.contracts;
       }
      },
    },
    watch: {
      cardYear () {
        if (this.formData.cardMonth < this.minCardMonth) {
          this.formData.cardMonth = ''
        }
      }
    },
    methods: {
      ...mapActions(["savePaymentsDetails","savePaymentsNet30"]),
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
      },
      savePayment(){
        var data = {
          userId: this.$store.getters.id,
          customer_id: this.$store.getters.customerId,
          cardNumber: this.formData.cardNumberNotMask,
          CVV: this.formData.cardCvv,
          expiryMonth: this.expiryMonth,
          expiryYear: this.expiryYear,
          billing_zip: this.zipCode,
          billing_country: this.country,
          amount: this.$store.getters.price,
        }
        this.savePaymentsDetails(data);
        this.loading = 'loading';
        this.disable = true;
      },
      onUpdate (payload) {
        this.results = payload.formattedNumber
      },
      sameAsAction(){
        if(this.sameAsYou == false){
          this.sameAsYou = '',
          this.first_name = '',
          this.last_name = '',
          this.email = '';
          this.phone = '';
        }
      },
      saveNet30(){
        var data = {
          customer_id: this.$store.getters.customerId,
          sameAsYou: this.sameAsYou,
          firstName: this.first_name,
          lastName: this.last_name,
          email: this.email,
          phone: this.results,
        }
        console.log(data);
        this.savePaymentsNet30(data);
        this.loading = 'loading';
        this.disable = true;
      }
    },
    mounted () {
       document.title = "Payment - BidOut"
      this.maskCardNumber()
    },
  }
</script>
<style scoped lang="scss">

</style>

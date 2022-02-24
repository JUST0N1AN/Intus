<template>
    <h1>Business Registration</h1>

    <!-- <div class="col-auto q-gutter-ml" style="max-width: 300px">
         <q-input rounded filled v-model="text" label="Regostered Business Name" id="businessName" />
         
    </div>
    
    <div class="column q-gutter-ml" style="max-width: 300px">
         <q-input rounded filled v-model="text" label="Business #" id="businessName" />
    </div>-->

    <!-- Stack the columns on mobile by making one full-width and the other half-width -->
    <div class="row">
        <div class="col col-md-8 q-gutter-ml" style=" max-width: 300px">
            <q-input
                rounded
                filled
                v-model="text"
                label="Registered Business Name"
                id="businessName"
            />
        </div>
        <div class="col-6 col-md-4" style="max-width: 300px">
            <q-input
                rounded
                filled
                v-model="text"
                maxlength="7"
                minlength="7"
                type
                label="Business #"
                id="businessNO"
            />
        </div>
    </div>

    <div class="row">
        <div class="col col-md-8 q-gutter-ml" style=" max-width: 300px">
            <q-input rounded filled v-model="text" label="Business Address" id="businessAddress" />
        </div>
        <div class="col-6 col-md-4" style="max-width: 300px">
            <q-select
                rounded
                filled
                v-model="text"
                maxlength="7"
                minlength="7"
                :options ="options"
                 @filter="filterFn"
                type
                label="Type of Business"
                id="businessNO"
            />
        </div>

        <p><button @click="regiterBusiness">Submit Application</button></p>
    </div>
</template>

<script>

const businessTypeOptions = [
    'Sole Proprietorship', 'Partnership', 'Limited Liability Company', 'NGO'
]
export default {
    methods: {
        regiterBusiness: function () {
            var businessName = document.getElementById("businessName").value
            var businessNo = document.getElementById("businessNO").value

            const data = {
                bName: businessName,
                bNo: businessNo
            };
        },

        setup() {
            const options = ref(businessTypeOptions)

            return {
                model: ref(null),
                options,

                filterFn(val, update, abort) {
                    update(() => {
                        const needle = val.toLowerCase()
                        options.value = stringOptions.filter(v => v.toLowerCase().indexOf(needle) > -1)
                    })
                    console.log(otpions); 
                }
            }
            
        }
       

    }


}

</script>
<style>
</style>
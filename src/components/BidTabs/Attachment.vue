<template>
  <div>
    <div class="attachment-list">
      <v-simple-table fixed-header height="300px">
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left"></th>
              <th class="text-left">File Name</th>
              <th class="text-left">Comment</th>
              <th class="text-left">File Size</th>
              <th class="text-left">Uploaded By</th>
              <th class="text-left">Uploaded Date</th>
              <th class="text-left"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(doc, index) in docsList">
              <td class="text-left">
                <img :src="require('@/assets/images/bids/FilePdf.png')" />
              </td>
              <td class="text-left">{{ doc.fileName }}</td>
              <td class="text-left">
                <div
                  v-if="edit === index && isEdit"
                  class="d-flex edit-comment align-center"
                >
                  <input type="hidden" :value="validat">
                  <v-text-field
                    outlined
                    height="30px"
                    width="150px"
                    hide-details
                    v-model="docsList[index]['comment']"
                  ></v-text-field
                  ><v-checkbox
                    color="#0D9648"
                    @change="saveComment(doc)"
                  ></v-checkbox>
                </div>
                <span v-else>{{ doc.comment }}</span>
              </td>
              <td class="text-left">{{ size(doc.fileSize) }}</td>
              <td class="text-left">{{ doc.uploadedBy }}</td>
              <td class="text-left">
                {{ doc.uploadedAt | moment("MM/DD/YYYY hh:mm a") }}
              </td>
              <td>
                <div class="d-flex">
                  <img
                    :src="require('@/assets/images/bids/chatdots.png')"
                    class="mr-3 v-card--link"
                    @click="openComment(index)"
                  />
                  <v-icon color="#F32349" @click="deleteAttach(index)"
                    >mdi-trash-can-outline</v-icon
                  >
                </div>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </div>

    <v-row no-gutters align="center" class="px-6 mt-16">
      <v-col cols="12" sm="12" md="12">
        <div class="upload-attach">
          <v-progress-circular
            v-if="isAttachingDoc"
            :width="3"
            color="green"
            indeterminate
          ></v-progress-circular>
          <label
            v-else
            for="uploadFile"
            class="upload-file pa-8 d-block font-weight-medium"
          >
            <input
              type="file"
              ref="documentUploader"
              class="d-none"
              id="uploadFile"
              @change="handleDocumentUpload($event)"
            />

            <span>Upload Attachments Here</span>
          </label>
        </div>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      edit: "",
      isEdit: false,
      file: "",
      fileName: "",
      fileExt: "",
      fileSize: "",
      documents: [],
      isAttaching: false,
      valid: false,
      attachStatus: false,
    };
  },
  computed: {
    uploadedBy() {
      return `${this.$store.getters.userInfo.firstName} ${this.$store.getters.userInfo.lastName}`;
    },
    docsList() {
      if(this.$store.state.bid.attachments != null){
        // if(this.$store.state.bid.attachments != ""){
          this.$store.commit('setAttachement',this.$store.state.bid.attachments);
          return this.$store.state.bid.attachments;
        // }
      }else{
        this.$store.commit('setAttachement',this.$store.getters.attachData);
        return this.$store.getters.attachData;
      }
    },
    isAttachingDoc() {
      return this.isAttaching;
    },
    validat(){
      if(this.$store.getters.attachData){
        this.$emit('validation',{'valid': true,'attach': '5'});
        return this.valid;
      }else{
        this.$emit('validation',{'valid': false,'attach': '5'});
        return this.valid;
      }
    },
  },
  methods: {
    ...mapActions(["uploadBidAttach", "updateDraftBid"]),
    changeTab() {
      this.$emit("changetab", "tab-6");
    },
    uploadDocument() {
      this.isSelecting = true;
      window.addEventListener(
        "focus",
        () => {
          this.isSelecting = false;
        },
        { once: true }
      );

      this.$refs.documentUploader.click();
    },
    async handleDocumentUpload(event) {
      this.isAttaching = true;
      this.file = event.target.files[0];
      this.fileName = this.file.name;
      this.fileExt = this.fileName.split(".").pop();
      this.fileSize = (this.file.size / (1024 * 1024)).toFixed(2);
      console.log(this.fileSize);
      // this.previewDoc();
      this.documents.push(this.file);
      const head = Date.now().toString();
      const tail = Math.random().toString().substr(2);
      const data = {
        uploadedBy: `${this.$store.getters.userInfo.firstName} ${this.$store.getters.userInfo.lastName}`,
        attachement: this.documents,
      };
      // this.documents.push(this.file);
      await this.uploadBidAttach(data);
      this.isAttaching = false;
      this.attachStatus = true;
    },
    size(size) {
      const sizeInMB = (size / (1024 * 1024)).toFixed(2);
      return `${sizeInMB}mb`;
    },
    deleteAttach(index) {
      this.documents.splice(index, 1);
      this.$store.getters.attachData.splice(index, 1);
      this.$store.commit('setDocuments',this.documents);
      this.attachStatus = true;
    },
    openComment(index) {
      this.edit = index;
      this.isEdit = true;
    },
    saveComment(doc) {
      this.isEdit = false;
      this.updateDraftBid({ attachement: this.docsList });
    },
    savedraftOnInterval(){
      const timer = setInterval(() => {
        if(this.attachStatus == true){
          this.updateDraftBid({ attachement: this.docsList });
          this.attachStatus = false;
        }
      }, 60000);

      this.$once("hook:beforeDestroy", () => {
        clearInterval(timer);
      });
    },
  },
  mounted() {
    if (this.$store.getters.attachData) {
      this.documents = this.$store.getters.attachData;
    }
    this.savedraftOnInterval();
  },
};
</script>

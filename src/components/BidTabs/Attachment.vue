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
            <tr v-for="(doc, index) in docsList" :key="index">

              <input type="hidden" :value="validat" />
              <td class="text-left">
                <img :src="require('@/assets/images/bids/FilePdf.png')" v-if="checkFileType(doc.fileName) === 'pdf'" />
                <img :src="require('@/assets/images/bids/FileDoc.png')"
                  v-else-if="checkFileType(doc.fileName) === 'docx'" />
                <v-icon color="#0D1139" v-else>mdi-file-document</v-icon>
              </td>
              <td class="text-left d-block text-truncate pt-4" style="width: 200px">
                {{ doc.fileName }}
              </td>
              <td class="text-left">
                <div v-if="edit === index && isEdit" class="d-flex edit-comment align-center">
                  <v-text-field outlined height="30px" width="150px" hide-details
                    v-model="docsList[index]['comment']"></v-text-field><v-checkbox color="#0D9648"
                    @change="saveComment(doc)"></v-checkbox>
                </div>
                <span v-else>{{ doc.comment !== 'undefined' ? doc.comment : '' }}</span>
              </td>
              <td class="text-left">{{ size(doc.fileSize) }}</td>
              <td class="text-left">{{ doc.uploadedBy }}</td>
              <td class="text-left">
                {{ doc.uploadedAt | moment("MM/DD/YYYY hh:mm a") }}
              </td>
              <td>
                <div class="d-flex">
                  <img :src="require('@/assets/images/bids/chatdots.png')" class="mr-3 v-card--link"
                    @click="openComment(index)" />
                  <v-icon color="#F32349" @click="deleteAttach(index, doc.id)">mdi-trash-can-outline</v-icon>
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
          <v-progress-circular v-if="isAttachingDoc" :width="3" color="green" indeterminate></v-progress-circular>
          <label v-else for="uploadFile" class="upload-file pa-8 d-block font-weight-medium">
            <input type="file" ref="documentUploader" class="d-none" id="uploadFile"
              @change="handleDocumentUpload($event)" />

            <span>Upload Attachments Here</span>
          </label>
        </div>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  data() {
    return {
      edit: '',
      isEdit: false,
      file: '',
      fileName: '',
      fileExt: '',
      fileSize: '',
      documents: [],
      isAttaching: false,
      valid: false,
      attachStatus: false,
      docs: '',
      uploadDoc: [],
    };
  },
  computed: {
    ...mapGetters(['isEditBidChanges']),
    uploadedBy() {
      return `${this.$store.getters.userInfo.firstName} ${this.$store.getters.userInfo.lastName}`;
    },
    docsList() {
      if (this.$store.getters.bidData != null) {
        if (this.$store.getters.bidData.statusType === 'template') {
          if (
            this.$store.getters.bidData.attachment?.length > 0 || this.$store.state.bid.attachement?.length > 0
          ) {
            if (this.$store.getters.attachData) {
              const attch = [
                ...new Map(
                  this.$store.getters.attachData.map((m) => [m.size, m]),
                ).values(),
              ];
              const totalDay = this.$store.state.bid.attachement?.concat(attch);
              // eslint-disable-next-line vue/no-side-effects-in-computed-properties
              this.documents = [
                ...new Map(totalDay?.map((m) => [m.id, m])).values(),
              ];
            } else {
              // eslint-disable-next-line vue/no-side-effects-in-computed-properties
              this.documents = this.$store.state.bid.attachement;
            }
            this.$store.commit('setAttachement', null);
            this.$store.commit('setAttachement', this.documents);

            this.documents && this.documents.forEach((el) => {
              el.comment === 'undefined' ? el.comment = '' : '';
            });
            return this.documents;
          }
          return this.$store.getters.attachData;
        }
        if (
          this.$store.getters.bidData.attachments?.length > 0 || this.$store.state.bid.attachement?.length > 0
        ) {
          if (this.$store.getters.attachData) {
            const attch = [
              ...new Map(
                this.$store.getters.attachData.map((m) => [m.size, m]),
              ).values(),
            ];
            const totalDay = this.$store.state.bid.attachement.concat(attch);
            this.documents = [
              ...new Map(totalDay.map((m) => [m.id, m])).values(),
            ];
          } else {
            this.documents = this.$store.state.bid.attachement;
          }
          this.$store.commit('setAttachement', null);
          this.$store.commit('setAttachement', this.documents);

          this.documents&& this.documents.forEach((el) => {
            el.comment === 'undefined' ? el.comment = '' : '';
          });

          return this.documents;
        }
        return this.$store.getters.attachData;
      }
      this.$store.commit('setAttachement', this.$store.getters.attachData);
      return this.$store.getters.attachData;
    },
    isAttachingDoc() {
      return this.isAttaching;
    },
    validat() {
      if (this.$store.getters.attachData) {
        this.$emit('validation', { valid: true, attach: '5' });
        return this.valid;
      }
      this.$emit('validation', { valid: false, attach: '5' });
      return this.valid;
    },
  },
  methods: {
    ...mapActions([
      'uploadBidAttach',
      'updateDraftBid',
      'updateTemplate',
      'updateBid',
    ]),
    changeTab() {
      this.$emit('changetab', 'tab-6');
    },
    checkFileType(file) {
      return file.substring(file.lastIndexOf('.') + 1);
    },
    uploadDocument() {
      this.isSelecting = true;
      window.addEventListener(
        'focus',
        () => {
          this.isSelecting = false;
        },
        { once: true },
      );

      this.$refs.documentUploader.click();
    },
    async handleDocumentUpload(event) {
      this.isAttaching = true;
      this.file = event.target.files[0];
      this.fileName = this.file.name;
      this.fileExt = this.fileName.split('.').pop();
      this.fileSize = (this.file.size / (1024 * 1024)).toFixed(2);
      this.uploadDoc.push(this.file);

      const data = {
        uploadedBy: `${this.$store.getters.userInfo.firstName} ${this.$store.getters.userInfo.lastName}`,
        attachement: this.uploadDoc,
      };
      await this.uploadBidAttach(data);
      this.isAttaching = false;
      this.$store.commit('setIsEditBidChanges', true);
      this.attachStatus = true;
      if (this.$route.name === 'EditBid') {
        this.$store.commit('setAttachement', this.docsList);
        this.updateBid({ attachement: this.docsList });
      } else if (this.$route.name === 'EditTemplate') {
        this.$store.commit('setAttachement', this.docsList);
        this.updateTemplate({ attachement: this.docsList });
        this.uploadDoc = [];
      } else {
        this.$store.commit('setAttachement', this.docsList);
        this.updateDraftBid({ attachement: this.docsList });
        this.uploadDoc = [];
      }
    },
    size(size) {
      const sizeInMB = (size / (1024 * 1024)).toFixed(2);
      return `${sizeInMB}mb`;
    },
    deleteAttach(index, id) {
      const indexToRemove = this.documents.findIndex((obj) => obj.id === id);

      if (indexToRemove !== -1) {
        this.documents.splice(indexToRemove, 1);
      }
      if (this.$store.getters.attachData) {
        this.$store.commit('spliceAttachData', id);
      }
      this.$store.commit('setAttachement', this.documents);
      this.$store.commit('setIsEditBidChanges', true);
      this.attachStatus = true;
    },
    openComment(index) {
      this.edit = index;
      this.isEdit = true;
    },
    saveComment(doc) {
      this.isEdit = false;
      if (this.$route.name === 'EditBid') {
        this.$store.commit('setAttachement', this.docsList);
        this.updateBid({ attachement: this.docsList });
      } else if (this.$route.name === 'EditTemplate') {
        this.$store.commit('setAttachement', this.docsList);
        this.updateTemplate({ attachement: this.docsList });
        this.uploadDoc = [];
      } else {
        this.$store.commit('setAttachement', this.docsList);
        this.updateDraftBid({ attachement: this.docsList });
        this.uploadDoc = [];
      }
    },
    savedraftOnInterval() {
      const timer = setInterval(() => {
        if (this.attachStatus === true) {
          if (this.$route.name === 'EditBid') {
            if (this.isEditBidChanges === true) {
              this.updateBid({ attachement: this.docsList });
            }
          } else if (this.$route.name === 'EditTemplate') {
            this.updateTemplate({ attachement: this.docsList });
          } else {
            this.updateDraftBid({ attachement: this.docsList });
          }
          this.attachStatus = false;
        }
      }, 60000);

      this.$once('hook:beforeDestroy', () => {
        clearInterval(timer);
      });
    },
  },
  mounted() {
    if (this.$store.getters.attachData) {
      this.documents = this.$store.getters.attachData;
    }
    if (this.$store.getters.bidData != null) {
      if (this.$store.getters.bidData.attachments?.length > 0) {
        if (this.$store.getters.bidData.statusType === 'draftBid') {
          this.$store.commit('setAttachement', null);
          this.$store.commit(
            'setAttachement',
            this.$store.getters.bidData.attachments,
          );
          this.documents = this.$store.getters.bidData.attachments;
        } else if (this.$store.getters.bidData.statusType === 'template') {
          this.$store.commit(
            'setAttachement',
            this.$store.getters.bidData.attachment,
          );
          this.documents = this.$store.getters.bidData.attachment;
        } else {
          this.$store.commit(
            'setAttachement',
            this.$store.getters.bidData.attachments,
          );
          this.documents = this.$store.getters.bidData.attachments;
        }
      }
    }
    this.savedraftOnInterval();
  },
};
</script>

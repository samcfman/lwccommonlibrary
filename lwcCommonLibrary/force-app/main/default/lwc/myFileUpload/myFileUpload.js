import { LightningElement, api,track } from 'lwc';
import userId from '@salesforce/user/Id';
import TICK_LOGO from '@salesforce/resourceUrl/greentick';


export default class MyFileUpload extends LightningElement {

    ticklogourl = TICK_LOGO;
    
    @api relatedrecordid=userId;   
   // @api myRecordId = userId;
    @api fileId;
    @api fileName;
    @api description; 
    @api uploadedFiles = [];
    @track hasFiles = false;
    @api downloadLinks = [];
    get acceptedFormats() {
        return ['.pdf', '.png','.jpg'];
    }


    baseURL = '';

    get fileurl () {

        return this.baseURL + '/sfc/servlet.shepherd/document/download/' + this.fileId;

    }            

    handleUploadFinished(event) {

        // Get the list of uploaded files
        this.uploadedFiles = event.detail.files;
        this.fileName = this.uploadedFiles[0].name;
        this.fileId = this.uploadedFiles[0].documentId;

        this.hasFiles = true;

    }

}
import { LightningElement, api, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { loadScript } from 'lightning/platformResourceLoader';
import signaturePadURL from '@salesforce/resourceUrl/signature_pad';
import saveSignature from '@salesforce/apex/SignaturePadHelper.saveSignature';

export default class SignaturePad extends LightningElement {
    sigPadInitialized = false;
    canvasWidth = 400;
    canvasHeight = 200;
    @api recordId;
    @api documentid;
    @api title;
    @api filename;
    @track signed=undefined;

    connectedCallback() {
 
        if (this.sigPadInitialized) {
            return;
        }
        this.sigPadInitialized = true;

        Promise.all([
            loadScript(this, signaturePadURL)
        ])
            .then(() => {
                this.initialize();
            })
            .catch(error => {

                alert (error.body.message + ' \nStatus: ' + error.statusText);
                console.log(error);

                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error initialize',
                        message: error.body.message + ' \nStatus: ' + error.statusText,
                        variant: 'error'
                    })
                );                         
            });
    }

    initialize() {
        const canvas = this.template.querySelector('canvas.signature-pad');

        this.signaturePad = new window.SignaturePad(canvas);

    }

    handleClick() {
        
        var base64 = this.signaturePad.toDataURL()
        const base64Mark = 'base64,';
        const dataStart = base64.indexOf(base64Mark) + base64Mark.length;
        
        base64 = base64.substring(dataStart);

        saveSignature({ recordId: this.recordId, base64Image:base64 })
        .then(result => {

            this.documentid = result;

            this.signaturePad.off();
            this.signed = true;


        })
        .catch(error => {
         this.dispatchEvent(
            new ShowToastEvent({
                title: 'Error in saving signature',
                message: error.body.message + ' \nStatus: ' + error.statusText,
                variant: 'error'
            })
        );         
        });    

    }

    handleClear () {
        this.signaturePad.clear();
        this.documentid = undefined;
        this.signed = undefined;
        this.signaturePad.on();
    }
}
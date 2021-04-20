import { LightningElement, api } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

export default class GoToHome extends NavigationMixin(LightningElement) {

    @api partySelectedStore;
    @api partyStartDateTime;


    handleButtonClick () {
   //     window.location.reload();
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
            pageName: 'home'
            },
            state: {
            }    
        },
        true // Replaces the current page in your browser history with the URL
        );

    }
}

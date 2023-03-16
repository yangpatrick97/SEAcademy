import { LightningElement, api } from 'lwc';

export default class AppeaserMovies extends LightningElement {
    @api valueFromParentComponent;
    activeSectionMessage = '';

handleToggleSection(event) {
    this.activeSectionMessage =
        'Movie Suggestion Category:  ' + event.detail.openSections;
}
}
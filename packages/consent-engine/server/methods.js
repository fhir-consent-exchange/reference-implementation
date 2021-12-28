import { get, has } from 'lodash';
import { DynamicSpacer, Consents, Communications, Patients, Persons, Organizations, Medications, CareTeams, ValueSets } from 'meteor/clinical:hl7-fhir-data-infrastructure';
import { Meteor } from 'meteor/meteor';

Meteor.methods({
  saveConsent: function(updatedConsent){
    console.log('Meteor.methods.saveConsent', updatedConsent)
    if(updatedConsent){
      Consents.insert(updatedConsent)
    }
  },
  revokeConsent: function(consentId){
    console.log('Meteor.methods.revokeConsent', consentId)
    if(consentId){
      Consents.remove({_id: consentId})
    }
  }
});

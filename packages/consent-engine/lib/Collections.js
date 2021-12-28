import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { Tracker } from 'meteor/tracker';

import { FhirUtilities } from 'fhir-starter';
import { get, set, has } from 'lodash';

import { AuditEvents, Bundles, Consents, Devices, Goals, Lists, Observations, Organizations, Provenances, Practitioners, Patients, RelatedPersons } from 'meteor/clinical:hl7-fhir-data-infrastructure';

ProviderRolesValueSet = new Mongo.Collection('ProviderRolesValueSet');

Consents.allow({
  insert() { return true; },
  update() { return true; },
  remove() { return true; }
});
Devices.allow({
    insert() { return true; },
    update() { return true; },
    remove() { return true; }
});
Goals.allow({
  insert() { return true; },
  update() { return true; },
  remove() { return true; }
});
Lists.allow({
  insert() { return true; },
  update() { return true; },
  remove() { return true; }
});
Observations.allow({
  insert() { return true; },
  update() { return true; },
  remove() { return true; }
});
Organizations.allow({
    insert() { return true; },
    update() { return true; },
    remove() { return true; }
  });
Patients.allow({
  insert() { return true; },
  update() { return true; },
  remove() { return true; }
});
RelatedPersons.allow({
    insert() { return true; },
    update() { return true; },
    remove() { return true; }
});
  
function getClinicianId(currentUser){
  if(get(currentUser, 'isClinician') === true){
    return get(currentUser, 'id')
  }
}

if(Meteor.isClient){
  Tracker.autorun((computation) => {
    let clinicianId = getClinicianId(Session.get('currentUser'));
    let clientSecretOrBearerToken = Session.get('clientSecretOrBearerToken');
    let selectedPatientId = Session.get('selectedPatientId');
    console.log('AuditEvents cursor subscription', selectedPatientId, clinicianId, clientSecretOrBearerToken)
    Meteor.subscribe('AuditEvents', selectedPatientId, clinicianId, clientSecretOrBearerToken);
  });
  Tracker.autorun((computation) => {
    let clinicianId = getClinicianId(Session.get('currentUser'));
    let clientSecretOrBearerToken = Session.get('clientSecretOrBearerToken');
    let selectedPatientId = Session.get('selectedPatientId');
    console.log('Bundles cursor subscription', selectedPatientId, clinicianId, clientSecretOrBearerToken)
    Meteor.subscribe('Bundles', selectedPatientId, clinicianId, clientSecretOrBearerToken);
  });
  Tracker.autorun((computation) => {
    let clinicianId = getClinicianId(Session.get('currentUser'));
    let clientSecretOrBearerToken = Session.get('clientSecretOrBearerToken');
    let selectedPatientId = Session.get('selectedPatientId');
    console.log('Consents cursor subscription', selectedPatientId, clinicianId, clientSecretOrBearerToken)
    Meteor.subscribe('Consents', selectedPatientId, clinicianId, clientSecretOrBearerToken);
  });
  // Tracker.autorun((computation) => {
  //   let clinicianId = getClinicianId(Session.get('currentUser'));
  //   let clientSecretOrBearerToken = Session.get('clientSecretOrBearerToken');
  //   let selectedPatientId = Session.get('selectedPatientId');
  //   console.log('Contracts cursor subscription', selectedPatientId, clinicianId, clientSecretOrBearerToken)
  //   Meteor.subscribe('Contracts', selectedPatientId, clinicianId, clientSecretOrBearerToken);
  // });
  Tracker.autorun((computation) => {
    let clinicianId = getClinicianId(Session.get('currentUser'));
    let clientSecretOrBearerToken = Session.get('clientSecretOrBearerToken');
    let selectedPatientId = Session.get('selectedPatientId');
    console.log('Devices cursor subscription', selectedPatientId, clinicianId, clientSecretOrBearerToken)
    Meteor.subscribe('Devices', selectedPatientId, clinicianId, clientSecretOrBearerToken);
  });
  Tracker.autorun((computation) => {
    let clinicianId = getClinicianId(Session.get('currentUser'));
    let clientSecretOrBearerToken = Session.get('clientSecretOrBearerToken');
    let selectedPatientId = Session.get('selectedPatientId');
    console.log('Goals cursor subscription', selectedPatientId, clinicianId, clientSecretOrBearerToken)
    Meteor.subscribe('Goals', selectedPatientId, clinicianId, clientSecretOrBearerToken);
  });
  Tracker.autorun((computation) => {
    let clinicianId = getClinicianId(Session.get('currentUser'));
    let clientSecretOrBearerToken = Session.get('clientSecretOrBearerToken');
    let selectedPatientId = Session.get('selectedPatientId');
    console.log('Lists cursor subscription', selectedPatientId, clinicianId, clientSecretOrBearerToken)
    Meteor.subscribe('Lists', selectedPatientId, clinicianId, clientSecretOrBearerToken);
  });
  Tracker.autorun((computation) => {
    let clinicianId = getClinicianId(Session.get('currentUser'));
    let clientSecretOrBearerToken = Session.get('clientSecretOrBearerToken');
    let selectedPatientId = Session.get('selectedPatientId');
    console.log('Provenances cursor subscription', selectedPatientId, clinicianId, clientSecretOrBearerToken)
    Meteor.subscribe('Provenances', selectedPatientId, clinicianId, clientSecretOrBearerToken);
  });

  Tracker.autorun((computation) => {
    let clinicianId = getClinicianId(Session.get('currentUser'));
    let clientSecretOrBearerToken = Session.get('clientSecretOrBearerToken');
    let selectedPatientId = Session.get('selectedPatientId');
    console.log('Observations cursor subscription', selectedPatientId, clinicianId, clientSecretOrBearerToken)
    Meteor.subscribe('Observations', selectedPatientId, clinicianId, clientSecretOrBearerToken);
  });
  Tracker.autorun((computation) => {
    let clinicianId = getClinicianId(Session.get('currentUser'));
    let clientSecretOrBearerToken = Session.get('clientSecretOrBearerToken');
    let selectedPatientId = Session.get('selectedPatientId');
    console.log('Patients cursor subscription', selectedPatientId, clinicianId, clientSecretOrBearerToken)
    Meteor.subscribe('Patients', selectedPatientId, clinicianId, clientSecretOrBearerToken);
  });
  Meteor.subscribe('Organizations');
  Meteor.subscribe('Practitioners');
  Meteor.subscribe('RelatedPersons');
  Meteor.subscribe('Questionnaires');
  Meteor.subscribe('ValueSets');
}


if(Meteor.isServer){
  Meteor.publish('AuditEvents', function(patientId, clinicianId, clientSecretOrBearerToken){
    let auditQuery = FhirUtilities.addPatientFilterToQuery(patientId, null, clinicianId)
    process.env.TRACE && console.log('Collections.AuditEvents.auditQuery', auditQuery)
    return AuditEvents.find(auditQuery);
  });    
  Meteor.publish('Bundles', function(patientId, clinicianId, clientSecretOrBearerToken){
    let bundleQuery = FhirUtilities.addPatientFilterToQuery(patientId, null, clinicianId)
    process.env.TRACE && console.log('Collections.Bundles.bundleQuery', bundleQuery)
    return Bundles.find(bundleQuery);
  });    
  Meteor.publish('Consents', function(patientId, clinicianId, clientSecretOrBearerToken){
    let consentQuery = FhirUtilities.addPatientFilterToQuery(patientId, null, clinicianId)
    process.env.TRACE && console.log('Collections.Consents.consentQuery', consentQuery)
    return Consents.find(consentQuery);
  });    
  // Meteor.publish('Contracts', function(patientId, clinicianId, clientSecretOrBearerToken){
  //   let contractsQuery = FhirUtilities.addPatientFilterToQuery(patientId, null, clinicianId)
  //   process.env.TRACE && console.log('Collections.Contracts.contractsQuery', contractsQuery)
  //   return Contracts.find(contractsQuery);
  // });    
  Meteor.publish('Devices', function(patientId, clinicianId, clientSecretOrBearerToken){
    let basicQuery = FhirUtilities.addPatientFilterToQuery(patientId, null, clinicianId)
    process.env.TRACE && console.log('Collections.Devices.basicQuery', basicQuery)
    return Devices.find(basicQuery);
  });    
  Meteor.publish('Goals', function(patientId, clinicianId, clientSecretOrBearerToken){
    let goalsQuery = FhirUtilities.addPatientFilterToQuery(patientId, null, clinicianId)
    process.env.TRACE && console.log('Collections.Goals.goalsQuery', goalsQuery)
    return Goals.find(goalsQuery);
  });  
  Meteor.publish('Lists', function(patientId, clinicianId, clientSecretOrBearerToken){
    let listsQuery = FhirUtilities.addPatientFilterToQuery(patientId, null, clinicianId)
    process.env.TRACE && console.log('Collections.Lists.listsQuery', listsQuery)
    return Lists.find(listsQuery);
  });    
  Meteor.publish('Observations', function(patientId, clinicianId, clientSecretOrBearerToken){
    let observationsQuery = FhirUtilities.addPatientFilterToQuery(patientId, null, clinicianId)
    process.env.TRACE && console.log('Collections.Observations.observationsQuery', observationsQuery)
    return Observations.find(observationsQuery);
  });  
  Meteor.publish('Organizations', function(){
    return Organizations.find();
  });    
  Meteor.publish('Patients', function(patientId, clinicianId, clientSecretOrBearerToken){
    let patientsQuery = {$or: [
      {"_id": patientId},
      {"id": patientId},
      {"id": "Patient/" + patientId},
      {"id": "urn:uuid:Patient/" + patientId},
      {"id": { $regex: ".*Patient/" + patientId}}
    ]}
    if(clinicianId){
      patientsQuery = {};
    }
    process.env.TRACE && console.log('Collections.Observations.patientsQuery', patientsQuery)
    return Patients.find(patientsQuery);
  });    
  Meteor.publish('Provenances', function(patientId, clinicianId, clientSecretOrBearerToken){
    let provenancesQuery = FhirUtilities.addPatientFilterToQuery(patientId, null, clinicianId)
    process.env.TRACE && console.log('Collections.Provenances.provenancesQuery', provenancesQuery)
    return Provenances.find(provenancesQuery);
  });  
  Meteor.publish('Practitioners', function(){
    return Practitioners.find();
  });    
  Meteor.publish('RelatedPersons', function(){
    return RelatedPersons.find();
  });    
  Meteor.publish('Questionnaires', function(){
    return Questionnaires.find();
  });    
  Meteor.publish('QuestionnaireResponses', function(patientId, clinicianId, clientSecretOrBearerToken){
    let questionnaireResponseQuery = FhirUtilities.addPatientFilterToQuery(patientId, null, clinicianId)
    process.env.TRACE && console.log('Collections.QuestionnaQuestionnaireResponsesireResponses.questionnaireResponseQuery', questionnaireResponseQuery)
    return QuestionnaireResponses.find(questionnaireResponseQuery);
  });    
  Meteor.publish('ValueSets', function(){
    return ValueSets.find();
  });   

  Meteor.publish('ProviderRolesValueSet', function(){
    return ProviderRolesValueSet.find();
  });   
}
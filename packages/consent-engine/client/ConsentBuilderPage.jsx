
import { 
    Grid,
    Card,
    Button,
    CardHeader,
    CardContent,
    CardActions
  } from '@material-ui/core';
  import { StyledCard, PageCanvas } from 'fhir-starter';
  
  import { Meteor } from 'meteor/meteor';
  import { Session } from 'meteor/session';
  
  import React, {Component} from 'react'
  import { get, has, sortBy } from 'lodash';
  
  import { useTracker } from 'meteor/react-meteor-data';
  
  import moment from 'moment';
  
  import { FhirUtilities } from 'fhir-starter';
  import { Patients, ConsentForm } from 'meteor/clinical:hl7-fhir-data-infrastructure';
  
  
  function ConsentBuilderPage(props){
  

    let consents = useTracker(function(){
      return Consents.find().fetch()
    })
  
    let currentUser = useTracker(function(){
      return Session.get('currentUser')
    })
    let selectedPatient = useTracker(function(){
      return Session.get('selectedPatient')
    })
    let selectedPatientId = useTracker(function(){
      return Session.get('selectedPatientId')
    })


    let consentText = get(Meteor, 'settings.public.defaults.consents.textMessage', 'lorem ipsum...')
  
  
    return(
    <PageCanvas id="ConsentBuilderPage" paddingLeft={20} paddingRight={20} style={{marginTop: '148px', marginBottom: '84px'}}>
        <CardHeader title="Consent Builder" />
        <Grid container>
          <Grid item md={6}>
            <ConsentForm 
              hidePeriodStart={true}
              hidePeriodEnd={true}
              hideOrganization={TrafficOutlined}            
              textMessage={consentText} 
              patientId={selectedPatientId}
              onSave={function(consent){
                console.log('ConsentDialog.onSave()', consent);
                Meteor.call('saveConsent', consent, function(error, result){
                    if(error){ console.log('error', error)}
                    if(result){ 
                      console.log('result', result)
                    }
                    Session.set('mainAppDialogOpen', false)
                })
                if(Package["clinical:hipaa-logger"]){
                  let newCareTeamEvent = { 
                    "resourceType" : "AuditEvent",
                    "type" : { 
                      'code': 'ConsentGranted',
                      'display': 'Consent Granted'
                      }, 
                    "action" : 'Consent Granted',
                    "recorded" : new Date(), 
                    "outcome" : "Success",
                    "outcomeDesc" : 'Patient granted consent.',
                    "agent" : [{ 
                      "name" : FhirUtilities.pluckName(selectedPatient),
                      "who": {
                        "display": FhirUtilities.pluckName(selectedPatient),
                        "reference": "Patient/" + get(selectedPatient, 'id')
                      },
                      "requestor" : false
                    }],
                    "source" : { 
                      "site" : Meteor.absoluteUrl(),
                      "identifier": {
                        "value": Meteor.absoluteUrl()
                      }
                    },
                    "entity": [{
                      "reference": {
                        "reference": ''
                      }
                    }]
                  };

                  console.log('Logging a hipaa event...', newCareTeamEvent)
                  let hipaaEventId = HipaaLogger.logAuditEvent(newCareTeamEvent);
                }
                
              }}
              style={{width: '100%'}}
              />
          </Grid>
        </Grid>
        
    </PageCanvas>
    );
}
  
  
  export default ConsentBuilderPage;
  
  
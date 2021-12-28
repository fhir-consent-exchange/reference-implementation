
import { 
    Grid,
    Card,
    Button,
    CardHeader,
    CardContent,
    CardActions
  } from '@material-ui/core';
  import { StyledCard, PageCanvas, DynamicSpacer } from 'fhir-starter';
  
  import { Meteor } from 'meteor/meteor';
  import { Session } from 'meteor/session';
  
  import React, {Component} from 'react'
  import { get, has, sortBy } from 'lodash';
  
  import { useTracker } from 'meteor/react-meteor-data';
  
  import moment from 'moment';
  
  import { FhirUtilities } from 'fhir-starter';

  import { Consents, ConsentsTable, ConsentForm } from 'meteor/clinical:hl7-fhir-data-infrastructure';
  
  
  function ConsentEnginePage(props){
  
    let data = {
      currentUser: null,
      consents: [],
      selectedConsent: false
    }
    
    data.currentUser = useTracker(function(){
      return Session.get('currentUser');
    })
  
    data.consents = useTracker(function(){
      return Consents.find().fetch()
    })
    data.selectedConsent = useTracker(function(){
      return Consents.findOne();
    })
  
    return(
    <PageCanvas id="ConsentEnginePage" paddingLeft={20} paddingRight={20} style={{marginTop: '148px', marginBottom: '84px'}}>
        <Grid container spacing={3}>
          <Grid item md={6}>
            <CardHeader title="Consent Engine" />            
            <StyledCard>
              <CardContent>                
                <ConsentForm 
                  consentId={get(data.selectedConsent, 'id')}
                  consent={data.selectedConsent}
                  style={{width: '100%'}}
                />
              </CardContent>
            </StyledCard>            

          </Grid>
          <Grid item md={6}>
            <CardHeader title="OAuth Scopes" />
            <StyledCard>
              <CardContent>
                
              </CardContent>
            </StyledCard>            
          </Grid>
        </Grid>
    </PageCanvas>
    );
}
  
export default ConsentEnginePage;
  
  
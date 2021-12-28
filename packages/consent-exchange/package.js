Package.describe({
  name: 'mitre:fhir-consent-exchange',
  version: '0.1.0',
  summary: 'Consent Exchange',
  git: 'http://github.com/fhir-consent-exchange/mehi-consent-exchange',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.4');

  api.use('meteor-base@1.4.0');
  api.use('ecmascript@0.13.0');

  api.use('react-meteor-data@2.1.2');
  api.use('session');

  api.use('clinical:vault-server');
  api.use('clinical:vault-server');

  api.addFiles('lib/Collections.js');
  api.addFiles('server/methods.js', ['server']);
  
  api.mainModule('index.jsx', 'client');
});



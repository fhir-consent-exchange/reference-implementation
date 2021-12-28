
import ConsentEnginePage from './client/ConsentEnginePage';
import ConsentBuilderPage from './client/ConsentBuilderPage';
import BasicConsentPage from './client/BasicConsentPage';



var DynamicRoutes = [{
  'name': 'ConsentEnginePage',
  'path': '/consent-engine',
  'component': ConsentEnginePage
  // 'privacyEnabled': true,
  // 'requireAuth': true
}, {
  'name': 'ConsentBuilderPage',
  'path': '/consent-builder',
  'component': ConsentBuilderPage
}, {
  'name': 'BasicConsentPage',
  'path': '/basic-consent',
  'component': BasicConsentPage
}];



var AdminSidebarElements = [{
primaryText: 'Consent Engine',
to: '/consent-engine',
iconName: 'fire'
}];

var SidebarWorkflows = [{
  primaryText: 'Consent Engine',
  to: '/consent-engine',
  iconName: 'fire'
}, {
  primaryText: 'Consent Builder',
  to: '/consent-builder',
  iconName: 'fire'
}, {
  primaryText: 'Basic Consent Page',
  to: '/basic-consent',
  iconName: 'fire'
}];

let MainPage = ConsentEnginePage;

export { 
  DynamicRoutes, 
  AdminSidebarElements,
  SidebarWorkflows,

  ConsentEnginePage,
  ConsentBuilderPage,
  BasicConsentPage,
  
  MainPage
};


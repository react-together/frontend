import Keycloak from 'keycloak-js'

const keycloak = new Keycloak({
  url: 'https://sso.moontai0724.tw',
  realm: 'dev',
  clientId: 'react-together',
})

export default keycloak
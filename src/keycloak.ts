import Keycloak from 'keycloak-js'

const keycloak = new Keycloak({
  url: 'http://sso.moontai0724.tw/auth',
  realm: 'dev',
  clientId: 'react-together',
})

export default keycloak
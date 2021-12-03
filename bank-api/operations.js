const axios = require('axios')

class BankConnector {
  constructor(
    apiHost,
    consumerKey
  ) {
    this.apiHost = apiHost
    this.consumerKey = consumerKey
  }

  async login(username, password) {
    const config = {
      method: 'post',
      url: `${this.apiHost}/my/logins/direct`,
      headers: {
        'Content-Type': ' application/json',
        'DirectLogin': `username=${username}, password=${password}, consumer_key=${this.consumerKey}`
      }
    };
    const { token } = (await axios(config)).data
    this.token = token
    return { success: !!token }
  }

  async getAccounts() {
    const config = {
      method: 'get',
      url: `${this.apiHost}/obp/v4.0.0/banks/${this.bankId}//accounts`,
      headers: {
        'Content-Type': ' application/json',
        'DirectLogin': `username=${username}, password=${password}, consumer_key=${this.consumerKey}`
      }
    }
  }

}

module.exports = BankConnector
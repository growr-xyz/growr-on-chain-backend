# Peseta Backend
2021, developed by the Growr On-chain team for the Bitcoin Bankathon

## Installation

1. Clone this repo
`$ git clone git@github.com:growr-xyz/growr-on-chain-backend.git`
2. Build docker image
`$ docker build --no-cache -t <docker-username>/<image-name>:<image-version> .`
3. Run docker-compose build script
`$ docker compose build`
4. Run docker-compose up script
`$ docker compose up -d`
5. Open GraphQL playground with browser at `http://localhost:4000`

## GrapqhQL

### Mutations

```graphql
mutation createWallet {
  createWallet(newWallet:{address:"123wallet", vendor:"RSK", network:"testnet"}){
    address
  }
}

mutation createUser{
  updateUser(userData:{fullName:"IvanAsen", dateOfBirth:"2121123"}, address:"123wallet"){
    _id
  }
}

mutation updateUser{
  updateUser(
    userData:{
      location:"ElSalvador",
      education:"High School",
      maritalStatus:SINGLE,
      officialPersonalIncome:"1000.00"
    }, address:"123wallet"){
    fullName,
    location,
    wallet{address},
    education,
    maritalStatus,
    officialPersonalIncome
  }  
}

mutation updateGoal{
  updateGoal(goalData:{
    name:"Vacation",
    duration:"12M",
    availableAmount:"1000.00",
    amountToBorrow:"1100.00"
  }, userId:"61a8e221ce80076efb1b6345"){
    name
  }
}

mutation updateLoan{
  updateLoan(loanData:{
    duration:"9",
    amount:"1100.00",
    apr:"12.34%",
    nextInstalmentDue:"12.12.2021",
    lastInstalmentDue:"12.10.2022",
    totalToRepay:"1234.22",
    totalInterest:"134.22",
    instalment:"12.22%"
  }, goalId:"61a8e32bce80076efb1b6397" ){
    _id
  }
}

mutation achieveGoal{
  achieveGoal(id:"61a8e32bce80076efb1b6397"){
    name,
    isAchieved
  }
}

mutation connectBank {
  connectBank(, username:"Camila.Busd.01", password:"X!02006fd1", wallet:"123wallet"){success}
}
```

### Queries

```graphql
query getWallet {
  wallet(address:"123wallet"){address, user{fullName, _id}}
}

query getUser {
  user(id:"61a8e221ce80076efb1b6345"){fullName, wallet{address}}
}

query getUserWithGoals{
  user(id:"61a8e221ce80076efb1b6345"){
    fullName,
    goals{
      name,
      duration,
      _id
    }
  }
}

query getUserWithLoans{
  user(id:"61a8e221ce80076efb1b6345"){
    fullName,
    goals{
      name,
      loan{totalToRepay}
    }
  }
}
```

### Subscriptions

```graphql
subscription bank{
  bank{operation, payload, bankId, success}
}

subscription user{
  user{_id, location, education, dependants, fullName}
}
```


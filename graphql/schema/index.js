module.exports = `
enum MaritalStatusEnum {
  MARRIED,
  SINGLE,
  WIDOWED,
  DIVORCED,
  NOT_SAYING
}

enum BankOperationsEnum {
  LOGIN,
  EVALUATION
}

type User {
  _id: ID!,
  fullName: String!,
  dateOfBirth: String!,
  wallet: Wallet!,
  location: String,
  education: String,
  maritalStatus: MaritalStatusEnum,
  officialPersonalIncome: String,
  officialHouseholdIncome: String,
  unofficialHouseholdIncome: String,
  householdExpenses: String,
  dependants: String,
  score: Int,
  goals: [Goal],
  courses: [Course]
}

input UserInput {
  fullName: String,
  dateOfBirth: String,
  location: String,
  education: String,
  maritalStatus: MaritalStatusEnum,     
  officialPersonalIncome: String,
  officialHouseholdIncome: String,
  unofficialHouseholdIncome: String,
  householdExpenses: String,
  dependants: String,
  score: Int,
  goals: [ID],
  courses: [ID]
}

type Loan {
  _id: ID!,
  amount: String!,
  apr: String!,
  duration: String!,
  instalment: String!,
  nextInstalmentDue: String!,
  lastInstalmentDue: String!,
  totalToRepay: String!,
  totalInterest: String!  
}

input LoanInput {
  id: ID,
  amount: String!,
  apr: String!,
  duration: String!,
  instalment: String!,
  nextInstalmentDue: String!,
  lastInstalmentDue: String!,
  totalToRepay: String!,
  totalInterest: String!  
}

type Goal {
  _id: String!
  name: String!,
  availableAmount: String,
  amountToBorrow: String,
  duration: String,
  isAchieved: Boolean,
  loan: Loan
}

input GoalInput {
  id: ID,
  name: String!,
  availableAmount: String,
  amountToBorrow: String,
  duration: String
}


type Course {
  title: String!,
  about: String
}

input CourseInput {
  title: String!,
  about: String
}

input WalletInput {
  address: String!,
  vendor: String,
  network: String
}

type Wallet {
  address: String!,
  vendor: String!,
  network: String!,
  user: User,
}

type BankMessage {
  bankId: String!,
  operation: BankOperationsEnum!,
  success: Boolean!,
  payload: String,
  error: [String],
}

type Pool {
  poolId: Int,
  minScore: Int,
  maxScore: Int,
  apr: Int,
  maxAmount: Int,
  riskType: Int
}

type Status {
  success: Boolean!
}

type RootQuery {
  wallet(address: String!): Wallet!
  user(id: ID!): User!
  goal(id: ID!): Goal!
  loan(id: ID!): Loan!
  pool(wallet: String!): Pool!
}

type RootMutation {
  createWallet(newWallet: WalletInput!): Wallet!
  updateUser(userData: UserInput!, address: String!): User!
  updateGoal(goalData: GoalInput, userId: ID!): Goal!
  achieveGoal(id: ID!): Goal!
  updateLoan(loanData: LoanInput!, goalId: ID!): Loan!
  connectBank(username: String!, password: String!, wallet: String!): Status!
}

type Subscription {
  bank: BankMessage!,
  user: User!
}

schema {
  query: RootQuery,
  mutation: RootMutation,
  subscription: Subscription
}
`
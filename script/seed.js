'use strict'

const db = require('../server/db')
const {User, Transaction} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123', name: 'Cody'}),
    User.create({email: 'murphy@email.com', password: '123', name: 'Murphy'}),
    User.create({email: 'chris@email.com', password: '123', name: 'Chris'})
  ])

  const transactions = await Promise.all([
    Transaction.create({
      userId: 1,
      symbol: 'AAPL',
      price: 300,
      quantity: 4,
      total: 1200
    }),
    Transaction.create({
      userId: 1,
      symbol: 'GOOGL',
      price: 1500,
      quantity: 2,
      total: 3000
    }),
    Transaction.create({
      userId: 1,
      symbol: 'FB',
      price: 200,
      quantity: 10,
      total: 2000
    }),
    Transaction.create({
      userId: 1,
      symbol: 'NFLX',
      price: 300,
      quantity: 1,
      total: 300
    }),
    Transaction.create({
      userId: 1,
      symbol: 'AMZN',
      price: 2000,
      quantity: 3,
      total: 6000
    }),
    Transaction.create({
      userId: 1,
      symbol: 'AAPL',
      price: 200,
      quantity: 10,
      total: 2000
    })
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${transactions.length} transactions`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed

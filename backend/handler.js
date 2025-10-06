const express = require('express')
const serverless = require('serverless-http')

const app = express()
app.use(express.json())

app.get('/health', (req, res) => {
  res.json({ status: 'ok', env: process.env.NODE_ENV || 'development' })
})

app.get('/hello', (req, res) => {
  res.json({ message: 'Hello from repox backend' })
})

module.exports.handler = serverless(app)

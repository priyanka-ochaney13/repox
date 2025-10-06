const express = require('express')

const app = express()
app.use(express.json())

app.get('/health', (req, res) => {
  res.json({ status: 'ok', env: process.env.NODE_ENV || 'development' })
})

app.get('/hello', (req, res) => {
  res.json({ message: 'Hello from repox backend (local)'} )
})

const port = process.env.PORT || 4000
app.listen(port, () => console.log(`Backend listening on http://localhost:${port}`))

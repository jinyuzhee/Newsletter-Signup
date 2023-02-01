const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const https = require('https')

const app = express()
const port = process.env.PORT || 3000

app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: true}))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/signup.html')
})

app.post('/', (req,res) => {
  const fName = req.body.fName
  const lName = req.body.lName
  const email = req.body.email
  const code = req.statuscode


  const data = {
    members: [
      {
        email_address: email,
        status: 'subscribed',
        merge_fields: {
          FNAME: fName,
          LNAME: lName
        }
      }
    ]
  }

  const jsonData = JSON.stringify(data)
  const url = 'https://us21.api.mailchimp.com/3.0/lists/88fb5eb9e5'

  const options = {
    method: 'POST',
    auth: 'kim1:a61d9f38820bc56802147e519b669ea60-us21'
  }

  const request = https.request(url, options, (response) => {
    if (response.statusCode === 200) {
      res.sendFile(__dirname + '/success.html')
    }else{
      res.sendFile(__dirname + '/failure.html')
    }
    response.on('data', (data) => {
      console.log(JSON.parse(data));
    })
  })

  request.write(jsonData)
  request.end()

})

app.post('/failure', (req, res) => {
  res.redirect('/')
})

app.listen(port, () => {

  console.log(`server started on port ${port}`);
});

//API KEY
// 61d9f38820bc56802147e519b669ea60-us21

//audience List ID
//88fb5eb9e5

const express = require('express');
const app = express();
const port = 8000;
const crypto = require('crypto')
const path = require('path')

app.use(express.json())
app.use(express.static(__dirname))

const urls =new Map()

function checkValidUrl(value){
   try {
    const url = new Url(value)
    return url.protocol === 'http' ||url.protocol === 'https' 
    
   } catch (error) {
     false
   }
}

function genrateCode(){
let code 
do {
      code = crypto.randomBytes(4).toString('hex')
}while(urls.has(code))
 return code

}



app.post('/api/url', (req, res) => {

  
  console.log('apiiiiiiiiiiii hitt', req.body?.orignalUrl)
  const orignalUrls = req.body?.orignalUrl

  console.log(orignalUrls, 'urlssssssssssss')
  if(!orignalUrls){
      return res.status(400).json({error : 'url is required'})
  }

  if(checkValidUrl(orignalUrls)){
    return res.status(422).json({
      error : 'please enter valid url'
    })

  }
    const code = genrateCode()
  const record = {
    code,
    orignalUrls,
    shortUrl: `${req.protocol}://${req.get('host')}/${code}`
  }

  urls.set(code, record)
  return res.status(201).json(record)

   
});

// app.use((err , req, res)=>{
//   if(err)
// })

app.get('/:code', (req,res)=>{
  const code = req.params.code
  const record = urls.get(code)

  if(!record){
    return res.json(400).send("short url not found")
  }
  res.redirect(record.orignalUrls)
})


app.listen(port, () => {
  console.log(`Server app listening on port ${port}`);
});
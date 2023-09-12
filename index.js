const express = require('express');
const cors = require('cors');
require('dotenv').config()

const app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

const multer = require('multer')
const upload = multer({dest : './uploads/'})

app.post('/api/fileanalyse', upload.single('upfile'), (req, res) =>{

  try {
    console.log(req.file)
    const {originalname, mimetype, size} = req.file
    res.json({"name": originalname, "type": mimetype, "size": size})
  } catch (error) {
    res.status(500).json({"success": false, "msg": "file upload failed"})
  }
  
})

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});

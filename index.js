const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();

// default options
app.use(fileUpload({
  limits: { fileSize: 10 * 1024 * 1024 },
  abortOnLimit: true,
}));

app.post('/', function(req, res) {
  if (!req.files)
    return res.status(400).send('No files were uploaded.');

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  for(file in req.files){

    let disFile = req.files[file]
    let fileName = req.files[file].name
    console.log(file) // This is equivalent to the input form name, or POST **key** value

    // Use the mv() method to place the file somewhere on your server
    disFile.mv( __dirname+'/uploads/'+fileName, function(err) {
      if (err)
        return res.status(500).send(err);

      res.send('File uploaded!');
    });
  }


});

var server = app.listen(8667, function() {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});

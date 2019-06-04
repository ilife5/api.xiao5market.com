var fs = require('fs');
var cloudconvert = new (require('cloudconvert'))('6faevd4DCnl3LW37H08ImJjOEeVFfFVPrZ0bzfRlRuptwn93euj8PEnhjrHtNZ0j');

function uploadEmf(readable, path) {
    return new Promise((resolve, reject) => {
        // create the process. see https://cloudconvert.com/apidoc#create
        cloudconvert.createProcess({inputformat: 'emf', outputformat: 'png'}, function(err, conversionProcess) {

            if(err) {
                console.error('CloudConvert Process creation failed: ' + err);
            } else {

                // start the process. see https://cloudconvert.com/apidoc#create
                conversionProcess.start({
                    outputformat: 'png',
                    converteroptions: {
                        quality : 75,
                    },
                    input: 'upload'
                }, function (err, conversionProcess) {

                    if (err) {
                        console.error('CloudConvert Process start failed: ' + err);
                    } else {

                        // upload the input file. see https://cloudconvert.com/apidoc#upload
                        conversionProcess.upload(readable, null, function (err, conversionProcess) {

                            if (err) {
                                console.error('CloudConvert Process upload failed: ' + err);
                            } else {
                                // wait until the process is finished (or completed with an error)
                                conversionProcess.wait(function (err, conversionProcess) {
                                    if (err) {
                                        console.error('CloudConvert Process failed: ' + err);
                                    } else {
                                        console.log('Done: ' + conversionProcess.data.message);

                                        // download it
                                        conversionProcess.download(fs.createWriteStream(path), null, function (err, conversionProcess) {
                                            if (err) {
                                                console.error('CloudConvert Process download failed: ' + err);
                                                reject(err);
                                            } else {
                                                console.log('Downloaded to out.png');
                                                resolve(path);
                                            }
                                        });
                                    }

                                });
                            }
                        });
                    }
                });
            }

        });
    });
}

exports.uploadEmf = uploadEmf;
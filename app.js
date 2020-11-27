var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.get('/web-initiator.xml', function (req, res) {
    var config_url = 'https://static.cloud.altbalaji.com/config/web/prod-config.json'
    var non_drm = (validateQueryParameter(req, res, 'non_drm') === "true");
    var content = validateQueryParameter(req, res, 'content');

    if(!non_drm) {
        var device_uuid = validateQueryParameter(req, res, 'device_uuid');
        var stream_id = validateQueryParameter(req, res, 'stream_id');
        var xssession =  validateQueryParameter(req, res, 'xssession');
        var domain =  validateQueryParameter(req, res, 'domain');
    } else {
        console.log("non drm", non_drm);
        var result = [
            '<?xml version="1.0" encoding="utf-8"?>',
            '<PlayReadyInitiator xmlns="http://schemas.microsoft.com/DRM/2007/03/protocols/">',
            '<LicenseAcquisition>',
            '<Content>{content_url}</Content>'.replace('{content_url}', content + '/Manifest'),
            '</LicenseAcquisition>',
            '</PlayReadyInitiator>'
        ];
        // Send XML Response
        console.log("non drm", result);
        res.set('Content-Type', 'text/xml');
        return res.send(result.join(''));
    }

    // GET APP Config
    axios.get(config_url).then(function(config_res) {
        var api_base_url = config_res.data.environment.mmURL;

        axios.get(content + '/Manifest')
            .then(function (response) {
                var manifest = response.data;
                parseString(manifest, function (err, result) {

                    if(err) {
                        return res.status('500').json({
                            status: 'error',
                            message: 'Unable to parse XML'
                        });
                    }

                    var protection = result.SmoothStreamingMedia.Protection;
                    var base64Data = protection[0].ProtectionHeader[0]['_'];

                    var bytes = Base64.decode(base64Data);
                    var decodedText = bytes.replace(/(\u0003|\u0001|\u0000)/ig, '').match(/<WRMHEADER.*<\/WRMHEADER>/)[0];

                    parseString(decodedText, function (err, protection_json) {

                        if(err) {
                            return res.status('500').json({
                                status: 'error',
                                message: 'Unable to parse XML'
                            });
                        }

                        var KID = protection_json.WRMHEADER.DATA[0].KID[0];
                        var CHECKSUM = protection_json.WRMHEADER.DATA[0].CHECKSUM[0];
                        var IIS_DRM_VERSION = protection_json.WRMHEADER.DATA[0].CUSTOMATTRIBUTES[0].IIS_DRM_VERSION[0];

                        console.log('Fetch ticket');
                        // Fetch new Ticket
                        axios({
                            method: 'POST',
                            url: api_base_url + '/player/drm/ticket?domain=' + domain,
                            headers: {
                                XSSESSION: xssession
                            },
                            data: {
                                id: stream_id,
                                device_uuid: device_uuid
                            }
                        }).then(function (ticket_res) {
                            console.log('Got ticket');

                            var result = [
                                '<?xml version="1.0" encoding="utf-8"?>',
                                '<PlayReadyInitiator xmlns="http://schemas.microsoft.com/DRM/2007/03/protocols/">',
                                '<LicenseAcquisition>',
                                '<Content>{content_url}</Content>'.replace('{content_url}', content + '/Manifest'),
                                '<Header>',
                                '<WRMHEADER xmlns="http://schemas.microsoft.com/DRM/2007/03/PlayReadyHeader" version="4.0.0.0">',
                                '<DATA>',
                                '<PROTECTINFO>',
                                '<KEYLEN>16</KEYLEN>',
                                '<ALGID>AESCTR</ALGID>',
                                '</PROTECTINFO>',
                                '<KID>',KID,'</KID>',
                                '<CHECKSUM>',CHECKSUM,'</CHECKSUM>',
                                '<CUSTOMATTRIBUTES>',
                                '<IIS_DRM_VERSION>',IIS_DRM_VERSION,'</IIS_DRM_VERSION>',
                                '</CUSTOMATTRIBUTES>',
                                '<LA_URL>',
                                '{license_server_url}?api=http://api.cloud.altbalaji.com/&amp;XSSESSION={xssession}&amp;ticket={ticket}'.replace('{license_server_url}', ticket_res.data.license_server_url).replace('{ticket}', ticket_res.data.ticket).replace('{xssession}', xssession),
                                '</LA_URL>',
                                '<DS_ID>AAAAAAAAAAAAAAAAAAAAAA==</DS_ID>',
                                '</DATA>',
                                '</WRMHEADER>',
                                '</Header>',
                                '</LicenseAcquisition>',
                                '</PlayReadyInitiator>'
                            ];

                            // Send XML Response
                            res.set('Content-Type', 'text/xml');
                            return res.send(result.join(''));

                        }).catch(function (err) {
                            console.log(err);
                            return res.status('500').json({
                                status: 'error',
                                message: 'Ticket Call Failed'
                            });
                        });

                    });

                });
            })
            .catch(function (err) {
                console.log(err);
                return res.status('500').json({
                    status: 'error',
                    message: 'Unable to download content'
                });
            });
    }).catch(function (err) {
        console.log(err);
        return res.status('500').json({
            status: 'error',
            message: 'Unable to get config'
        });
    });

});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

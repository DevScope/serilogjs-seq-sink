# serilogjs-seq-sink
A SerilogJS sink that POSTs events to Seq Server.

Designed to work with [Seq Logging Server](http://docs.getseq.net/v2/docs) and [SerilogJS](https://github.com/structured-log/structured-log)

# Installing
```
bower install serilogjs-seq-sink
```

# Init
```
var log = serilog.configuration()
    .writeTo(serilog.sink.seq({url:"http://localhost:5341"}))
    .createLogger();
```
PS: Change the url to point to you production Seq endpoint

# Using
```
log.error('Cool semantic log error for {App}', {App:'myCoolJsApp'});
```
Check for more examples [here](https://github.com/structured-log/structured-log/blob/dev/README.md)

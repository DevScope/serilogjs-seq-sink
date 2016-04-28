'use strict';

// Copyright 2014 Serilog Contributors
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

// UMD bolierplate based on https://github.com/umdjs/umd/blob/master/returnExports.js
// Supports node.js, AMD and the browser.
//
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        root.serilog.sink.seq = factory();
    }
}(this, function () {

    var SeqSink = function (options) {
        var self = this;

        self.toString = function () { return 'SeqSink'; };

        options = options || {};

        // proper case string prptotype (JScript 5.5+)
        String.prototype.toProperCase = function () {
            return this.toLowerCase().replace(/^(.)|\s(.)/g,
                function ($1) { return $1.toUpperCase(); });
        }

        var level = {
            ERROR: "Error",
            WARN: "Warning",
            INFO: "Information",
            DEBUG: "Debug",
            VERBOSE: "Verbose"
        };

        self.emit = function (evt) {

            var body = {
                events: []
            };

            if (evt.constructor === Array) {
                for (var i = 0; i < evt.length; i++) {
                    var renderedMsg = evt[i].messageTemplate.render(evt[i].properties);

                    body.events.push({
                        Timestamp: evt[i].timestamp,
                        Level: level[evt[i].level],
                        MessageTemplate: evt[i].messageTemplate.raw,
                        RenderedMessage: renderedMsg,
                        Properties: evt[i].properties
                    });
                }
            }
            else {
                renderedMsg = evt.messageTemplate.render(evt.properties);

                body.events.push({
                    Timestamp: evt.timestamp,
                    Level: level[evt[i].level],
                    MessageTemplate: evt.messageTemplate.raw,
                    RenderedMessage: renderedMsg,
                    Properties: evt.properties
                });
            }

            var xmlHttp = new XMLHttpRequest();
            xmlHttp.open("POST", options.url + "/api/events/raw", true);
            xmlHttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            xmlHttp.send(JSON.stringify(body));
        };
    }

    return function (options) {
        return new SeqSink(options);
    };
}));

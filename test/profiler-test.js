"use strict";
var assert = require('assert');
const amqp = require("amqplib");
const WorkerQueue = require("./../libs/message-broker");
const LogProfiler = require("./../libs/log-profiler");
process.constantVar = {
  emmitCode: {
    fetchConfig: "fetch-config",
    info: "info",
    log: "log",
    mailer: "mailer",
    notification: "notification"
  }
}

describe('Test profiler', function() {
  it('Test connection to broker', function(done) {
    this.enableTimeouts(false);
    amqp.connect('amqp://localhost')
    .then(conn => {
      process.workerQueue = new WorkerQueue(conn);
      done();
    }).catch(err => {
      console.log("Error", err);
      done(err)
    });
  });
  it('Test only profiling', function(done) {
    this.enableTimeouts(false);
    process.env.NODE_ENV = "development";
    LogProfiler.profile("Test profiling", null, __filename, (new Error(1).stack).split("at ")[1].split(":")[2]);
    done();
  });
  it('Test profiling with log', function(done) {
    this.enableTimeouts(false);
    process.env.NODE_ENV = "development";
    LogProfiler.profile("Test profiling with log", null, __filename, (new Error(1).stack).split("at ")[1].split(":")[2], true, "INFO", {}, null, "system");
    done();
  });
});
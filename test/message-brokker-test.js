"use strict";
const amqp = require("amqplib");
const WorkerQueue = require("./../libs/message-broker");
process.constantVar = {
  emmitCode: {
    fetchConfig: "fetch-config",
    info: "info",
    log: "log",
    mailer: "mailer",
    notification: "notification"
  }
}

describe('Test Message Brokker', function() {
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
  it('Test send info', function(done) {
    this.enableTimeouts(false);
    process.workerQueue.sendInfo("TEST", function(err, res){
      if(err){
        console.log("Error", err);
        done(err);
      }else{
        done();
      }
    })
  });
  it('Test send log', function(done) {
    this.enableTimeouts(false);
    process.workerQueue.doLog({scene: "tester", status: "INFO", userId: null, userType: "system", title: "Test Title", message: "Test Message", filePath: __filename, lineNumber: (new Error(1).stack).split("at ")[1].split(":")[2]}, function(err, res){
      if(err){
        console.log("Error", err);
        done(err);
      }else{
        done();
      }
    })
  });
  it('Test send mail', function(done) {
    this.enableTimeouts(false);
    process.workerQueue.sendMail("tester", {}, function(err, res){
      if(err){
        console.log("Error", err);
        done(err);
      }else{
        done();
      }
    })
  });
  it('Test send notification', function(done) {
    this.enableTimeouts(false);
    process.workerQueue.sendNotification("tester", function(err, res){
      if(err){
        console.log("Error", err);
        done(err);
      }else{
        done();
      }
    })
  });
  it('Test send fetch config', function(done) {
    this.enableTimeouts(false);
    process.workerQueue.fetchConfig(function(err, res){
      if(err){
        console.log("Error", err);
        done(err);
      }else{
        done();
      }
    })
  });
});
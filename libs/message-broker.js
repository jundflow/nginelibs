class MsgBroker{
  constructor(broker){
    this.broker = broker;
  }

  getBroker(){
    return this.broker;
  }

  async pushEvent(channel, data, cb){
    this.broker.then(function(conn) {
      console.log("channel create");
      return conn.createChannel();
    }).then(function(ch) {
      console.log("start asset queue");
      return ch.assertQueue(channel, { durable: false }).then(function(ok) {
        console.log("start send queue");
        return ch.sendToQueue(channel, Buffer.from(JSON.stringify({data})));
      });
    }).then(function(ch){
      console.log("Ch result", ch);
      if(typeof cb !== "undefined"){
        cb(null, ch.close());
      }else{
        ch.close();
      }
    }).catch(err => {
      console.log("Error", err);
      if(typeof cb !== "undefined"){
        cb(err, null);
      }else{
        console.log(err);
      }
    });



    // this.broker.createChannel().then(ch => {
    //   const ok = ch.assertQueue(channel, { durable: false });
    //   ok.then(() => {
    //     ch.sendToQueue(channel, Buffer.from(JSON.stringify({data})));
        
    //     if(typeof cb !== "undefined"){
    //       cb(null, ch.close());
    //     }
    //   }).catch(err => {
    //     if(typeof cb !== "undefined"){
    //       cb(err, null);
    //     }else{
    //       console.log(err);
    //     }
    //   })
    // }).catch(err => {
    //   if(typeof cb !== "undefined"){
    //     cb(err, null);
    //   }else{
    //     console.log(err);
    //   }
    // })
  }

  async sendInfo(data, cb){
    this.pushEvent(process.constantVar.emmitCode.info,data, cb);
  }
  async sendMail(template, content, cb){
    this.pushEvent(process.constantVar.emmitCode.mailer,{template, content}, cb);
  }
  async doLog(content, cb){
    this.pushEvent(process.constantVar.emmitCode.log,{content}, cb);
  }
  async sendNotification(content, cb){
    this.pushEvent(process.constantVar.emmitCode.notification, {content}, cb);
  }
  async fetchConfig(cb){
    this.pushEvent(process.constantVar.emmitCode.fetchConfig, null, cb);
  }
}

module.exports = MsgBroker;
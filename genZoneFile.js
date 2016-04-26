//ask for server ip
const readline = require('readline');
var ip = "";
var tlt = "";
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('What is the servers IP?', (answer) => {
  // TODO: Log the answer in a database
  ip = answer;
  //rl.close();
  rl.question('What is the tld?', (answer) => {
    tld = answer;


    //write file header
    var fileHeader = ';\n; BIND reverse data file for local loopback interface\n;\n$TTL    604800\n@       IN      SOA     ' + tld + '. mail.' + tld + '. (\n                              1         ; Serial\n                         604800         ; Refresh\n                          86400         ; Retry\n                        2419200         ; Expire\n                         604800 )       ; Negative Cache TTL\n\n        IN NS ns\n;\nns IN A ' + ip+"\n";
    var dnsEntrys = "";
    //write dns entrys
    for (var k = 0; k < 25; k++) {

      for (var j = 0; j < 255; j++) {
        for (var i = 0; i < 255; i++) {
          dnsEntrys += k + "" + j + "" + i + "	IN	A	192." + k + "." + j + "." + i+"\n";
        }

      }
    }

    var fs = require('fs');
    fs.writeFile(tld+".zone", fileHeader+dnsEntrys, function(err) {
        if(err) {
            return console.log(err);
        }

        console.log("The file was saved!");
        fs.writeFile("named.conf.options", 'options {\n	directory "/var/cache/bind";\n	allow-transfer { any; };\n	listen-on-v6 { any; };\n};', function(err) {
          if(err) {
            return console.log(err);
          }

          console.log("The file was saved!");
          //rl.close();
        });


        fs.writeFile("named.conf.local", 'zone "'+tld+'" IN {\n	type master;\n	file "/etc/bind/'+tld+'.zone";\n	allow-transfer {any;};\n};', function(err) {
          if(err) {
            return console.log(err);
          }

          console.log("The file was saved!");
          //rl.close();
        });
        rl.close();
    });

  });
});

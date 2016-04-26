# DNS_Zonefile_gen
A generator for huge dns zone files that also produces bind9 config files

##How to use?

###Install dependencies
#### install nodejs
Under debian and ubuntu:
```
curl -sL https://deb.nodesource.com/setup_5.x | sudo -E bash -
sudo apt-get install -y nodejs
```

for other distros visit: https://nodejs.org/en/download/package-manager/

####install bind9

```
apt-get install bind9
```

###Use generator
Clone this repo to '/etc/bind'
Now run
```
node genZoneFile.js
```

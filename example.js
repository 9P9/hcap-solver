const { bypass } = require(`./solver.js`);
const fs = require(`fs`);
const proxies = fs.readFileSync('proxies.txt', 'utf-8').replace(/\r/gi, '').split('\n');
const ProxyAgent = require('proxy-agent');
const request = require(`request`);

//Example Proxied Solving

for (i = 0; i < 500; i++) {
    var proxy = proxies[~~(Math.random() * proxies.length)];
    var agent = new ProxyAgent('http://' + proxy);
    bypass("51829642-2cda-4b09-896c-594f89d700cc", "democaptcha.com", agent).then(r => {
        if (r && r[`generated_pass_UUID`]) {
            var token = r[`generated_pass_UUID`];
            
            //Checking Token With Site
            request.post(`http://democaptcha.com/demo-form-eng/hcaptcha.html`, {
                headers: {
                    'Connection': 'keep-alive',
                    'Pragma': 'no-cache',
                    'Cache-Control': 'no-cache',
                    'Upgrade-Insecure-Requests': '1',
                    'Origin': 'http://democaptcha.com',
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.81 Safari/537.36',
                    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
                    'Referer': 'http://democaptcha.com/demo-form-eng/hcaptcha.html',
                    'Accept-Language': 'en-US,en;q=0.9,en-GB;q=0.8',
                },
                body: `demo_text=123123&g-recaptcha-response=${token}&h-captcha-response=${token}`
            }, (err, res, body) => {
                console.log(body);
            })
        } else {
            //Failed HCAP
            console.log("Failed to Retrieve Code");
        }
    })
}

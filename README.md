# hcap-solver
### Simple hcap solver
### Uses Request Library unlike other variations of this solver
## Example Usage

```js
const { bypass } = require(`./solver.js`);

//Site Key | Host | Agent (Remove "agent" if you aren't using proxies)
bypass("51829642-2cda-4b09-896c-594f89d700cc", "democaptcha.com", agent).then(r => {
    if (r && r[`generated_pass_UUID`]) {
        //Output: P0_eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...
        var token = r[`generated_pass_UUID`];
    } else {
        //Failed HCAP
        console.log("Error or sumn");
    }
})
``` 

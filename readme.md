# Illusion-API

## Whitelist

<details> <summary><span style="color:#70a183">Post</span> /getkey</summary>
<p>

<p>Params</p>

```javascript
{
  "user_id": "870045594813620245",  //  String value
  "passwordKey": ""
}
```

<p> Success: 202

```javascript
{
    "success": true, //Was the request successly processed
    "response": {
        "ip": "", //User IP Address
        "blackList": false, //User Blacklisted
        "blackListWarningNum": 0, //User Amout of Warnings
        "_id": "",
        "key": "", //Whitelist Key
        "discordID": "", //Discord ID
        "fingerPrint": 
        [
            {
                "exploitName": "Synapse",
                "fingerPrint": ""
            }
        ],
        "blackList_reason": [],
        "execution": [
            {
                "exploitName": "Synapse"
            }
        ],
        "__v": 1
    }
}
```

`<br>` Wrong params: 400

<br> None existent key: 401 </p>

</p>
</details>

<details> <summary><span style="color:#70a183">Post</span> /createkey</summary>

<p>

<p>Params</p>

```javascript
{
    "success": true, //Was the request successly processed
    "response": {
        "Key": "" //New Key
    }
}
```

<p> Success: 202

```javascript
{
    "key": "", //Whitelist Key
    "base_id": "", //Discord ID
}
```

`<br>` Wrong params: 400

<br> Key already exists: 401 </p>

</p>
</details>

<details> <summary><span style="color:#70a183">Post</span> /blacklist</summary>

<p>

<p>Params</p>

```javascript
{
  "user_id": "870045594813620245",  //  String value
  "blacklist": "true",  // Bool value
  "passwordKey": ""
}
```

<p> Success: 202

```javascript
{
    "success": true, //Was the request successly processed
    "response": {
        "blackList": true, //new blacklist value
        "blackList_reason": []
    }
}
```

`<br>` Wrong params: 400

<br> None existent key: 401 </p>

</p>
</details>

<details> <summary><span style="color:#70a183">Post</span> /deletekey</summary>

<p>

<p>Params</p>

```javascript
{
    "user_id": "", //Discord ID
    "passwordKey": "" //privateKey
}
```

<p> Success: 202

```javascript
{
    "success": true, //Was the request successly processed
}
```

`<br>` Wrong params: 400

<br> None existent key: 401 </p>

</p>
</details>

<details> <summary><span style="color:#70a183">Post</span> /clear</summary>

<p>

<p>Params</p>

```javascript
{
  "user_id": "870045594813620245",  //  String value
  "passwordKey": ""
}
```

<p> Success: 202

```javascript
{
    "success": true, //Was the request successly processed
}
```

`<br>` Wrong params: 400

<br> None existent key: 401 </p>

</p>
</details>

<details> <summary><span style="color:#70a183">Post</span> /checkkey</summary>

<p>

<p>Params</p>

```javascript
{
  "key": "xKitotbvHT8a49MSGwwQ4Zm7",  //  String value
}
```

<p> Success: 202

```javascript
{
    "success": true, //Was the request successly processed
    "response": {
        "whitelisted": true/false,
        "fingerprint": "",
        "processTime": time //UTC TIME
    }
}
```

`<br>` Wrong params: 400
`<br>` None existent key: 401

<br> User is blacklisted: 401 </p>

```javascript
{
    "success": false,
    "error": 401,
    "message": "blacklistwarning"
}
```

</p>
</details>

## Bloxburg

<details> <summary><span style="color:#70a183">Post</span> /bloxburg/getbase</summary>

<p>Params</p>

```javascript
{
    "base_id": "", //Discord ID
}
```

<p> Success: 202

```javascript
{
    "success": true, //Was the request successly processed
    "response": { 
        "baseJson": "{}" //Json Body
    }
}
```

`<br>` Wrong params: 400

<br> Base dosen't exist: 404 </p>

</p>
</details>

<details> <summary><span style="color:#70a183">Post</span> /bloxburg/createbase</summary>

<p>

<p>Params</p>

```javascript
{
    "base_json": "{}", //Discord ID
}
```

<p> Success: 202

```javascript
{
    "success": true,
    "response": {
        "BaseID": "" //Saved Base ID
    }
}
```

`<br>` Wrong params: 400

</p>
</details>

## Linkvertise

<details> <summary><span style="color:#70a183">Get</span> /linkvertise/{ NAME OF GAME }</summary>

<p> Will only return success if request is sent with exploit heder or referer for linkvertise sites. </p>
<p> Success: 202

```javascript
{
    "success": true, //Was the request successly processed
    "response": { 
        "key": "LOLS" //Key for script
    }
}
```

<br> Bad or Incorrect Request: 400 </p>

</p>
</details>

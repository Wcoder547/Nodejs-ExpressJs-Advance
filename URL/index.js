import express from "express";
import { URL } from "url";

const app = express();
const port = 3000;

const siteURL = new URL(
  "https://example.com:8080/path/page?name=waseem#section1"
);
// console.log(siteURL);
//Object
// URL {
//   href: 'https://example.com:8080/path/page?name=waseem#section1',
//   origin: 'https://example.com:8080',
//   protocol: 'https:',
//   username: '',
//   password: '',
//   host: 'example.com:8080',
//   hostname: 'example.com',
//   port: '8080',
//   pathname: '/path/page',
//   search: '?name=waseem',
//   searchParams: URLSearchParams { 'name' => 'waseem' },
//   hash: '#section1'
// }

console.log(siteURL.href);
//https://example.com:8080/path/page?name=waseem#section1
console.log(siteURL.origin);
//https://example.com:8080
console.log(siteURL.protocol);
//https:
console.log(siteURL.hostname); // example.com
console.log(siteURL.port); // 8080

console.log(siteURL.pathname); // /path/page
console.log(siteURL.search); // ?name=waseem
console.log(siteURL.searchParams.get("name")); // waseem
console.log(siteURL.hash); // #section1
console.log(siteURL.searchParams.has("name")); // true
console.log(siteURL.searchParams.has("age")); // false

siteURL.searchParams.append("age", "25");
console.log(siteURL.toString()); // https://example.com:8080/path/page?name=waseem&age=25

console.log(siteURL.hash);
// Output: #section1

siteURL.pathname = "/new/path";
siteURL.searchParams.set("name", "ali");
console.log(siteURL.toString());
app.listen(port, () => {
  console.log(`App is listening on http://localhost:${port}`);
});

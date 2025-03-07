<h2 align="center"> TIKTOK DOWNLOADER API </h2></br>
<div id="logo" align= "center">
            
<a href="#">
<img src="/result/logo.jpg" alt="tiktik-api" height="60" width="120">
</a>
</div></br>

<p align = "center"> An unofficial tiktok downloader scraper for download video, audio and images using tiktok link.</p>
</br>


- [example for tiktok video link](#video)
- [example for tiktok image](#image)


## install

```bash
 npm install @mrnima/tiktok-downloader
```
or
```bash
 yarn add @mrnima/tiktok-downloader
```



## Require

```javascript
const { downloadTiktok } = require(" @mrnima/tiktok-downloader");
```

<a name="video">
 
## Example 1
*Download tiktok video link.*
```javascript
async function TEST_TIKTOK_DL(){
    var link = "https://vt.tiktok.com/ZS2vSs5fL/"
    var result = await downloadTiktok(link);
    console.log(result)
}
TEST_TIKTOK_DL()
```

## Results 
```json
{
  "creator": "MR NIMA",
  "status": true,
  "result": {
    "image": "https://p16-sign-sg.tiktokcdn.com/tos-alisg-p-0037/483135c8dba04400be00619d09450b4f_1727721867~tplv-tiktokx-360p.jpeg?dr=14555&nonce=19058&refresh_token=51e5b75069b729b8761e742e6916f347&x-expires=1728464400&x-signature=w4PCs3KrRWyXnfaOMpMKm0kwaUo%3D&ftpl=1&idc=maliva&ps=13740610&s=AWEME_DETAIL&shcp=34ff8df6&shp=d05b14bd&t=4d5b0474",
    "title": "💚 #firefly #anime #foru  #Love  #felt  #mrnima",
    "dl_link": {
      "images": false,
      "download_mp4_1": "https://dl.snapcdn.app/get?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJodHRwczovL3YxNm0tZGVmYXVsdC5ha2FtYWl6ZWQubmV0LzhhNTA1NGMyOTBjNzgxMzQyNTRkNzU5YzJkOWU0NzFmLzY3MDU1NTZkL3ZpZGVvL3Rvcy9hbGlzZy90b3MtYWxpc2ctcHZlLTAwMzdjMDAxL29vekVUODFaSVlnSW9uOUN3NlBEZkRmalplQUZRTGRBRDZBTkVGLz9hPTAmYnRpPU9UZzdRR281UUhNNk9qWkFMVEF6WUNNdmNDTXhORE5nJmNoPTAmY3I9MCZkcj0wJmVyPTAmbHI9YWxsJm5ldD0wJmNkPTAlN0MwJTdDMCU3QzAmYnI9NzY2JmJ0PTM4MyZjcz0wJmRzPTYmZnQ9WEU1YkNxVDBtN2pQRDEyT1RxYUozd1VhQ0l5S01lRn5PNSZtaW1lX3R5cGU9dmlkZW9fbXA0JnFzPTQmcmM9TkRsbU9XZHBOMlZrTmpjNE9UZG1aa0JwYW5JNk0ybzVjbWxvZFRNek9EY3pORUExWHk0eVhqUmdYMk14TWpZME1qUXlZU05qYVdrek1tUnJhbkZnTFMxa01URnpjdyUzRCUzRCZ2dnBsPTEmbD0yMDI0MTAwODA5NTIwODkxNjlBRDU1N0VBMUU5MEU5QkUzJmJ0YWc9ZTAwMDkwMDAwIiwiZmlsZW5hbWUiOiJUaWtWaWRlby5BcHBfNzQyMDUwODgwNDg3NTI5MTkxMS5tcDQiLCJuYmYiOjE3MjgzODExMzAsImV4cCI6MTcyODM4NDczMCwiaWF0IjoxNzI4MzgxMTMwfQ.AdaGzYomrdPxtET1YqZ5diwbOMOV_CNpQUTalc9xNOo",
      "download_mp4_2": "https://v16m-default.akamaized.net/8a5054c290c78134254d759c2d9e471f/6705556d/video/tos/alisg/tos-alisg-pve-0037c001/oozET81ZIYgIon9Cw6PDfDfjZeAFQLdAD6ANEF/?a=0&bti=OTg7QGo5QHM6OjZALTAzYCMvcCMxNDNg&ch=0&cr=0&dr=0&er=0&lr=all&net=0&cd=0%7C0%7C0%7C0&br=766&bt=383&cs=0&ds=6&ft=XE5bCqT0m7jPD12OTqaJ3wUaCIyKMeF~O5&mime_type=video_mp4&qs=4&rc=NDlmOWdpN2VkNjc4OTdmZkBpanI6M2o5cmlodTMzODczNEA1Xy4yXjRgX2MxMjY0MjQyYSNjaWkzMmRranFgLS1kMTFzcw%3D%3D&vvpl=1&l=202410080952089169AD557EA1E90E9BE3&btag=e00090000",
      "download_mp4_hd": "https://dl.snapcdn.app/get?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJodHRwczovL3YxNm0tZGVmYXVsdC5ha2FtYWl6ZWQubmV0L2U2YjQwYWM5YWQ3ZmEwYTY4MDZkNDZmNWM0NjY3MTkwLzY3MDU1NTZkL3ZpZGVvL3Rvcy9hbGlzZy90b3MtYWxpc2ctcHYtMDAzN2MwMDEvb000RkRUZkRvRWdqajFOSVk2Z2ZEOXdkNkN6QUNFWkFGQUFlRUEvP2E9MCZidGk9YkdSdVpIeHZNWEl4Y201M1ptMWNZRjllYldGemFIRm1PZyUzRCUzRCZjaD0wJmNyPTAmZHI9MCZlcj0wJmNkPTAlN0MwJTdDMCU3QzAmYnI9MTgwMTYmYnQ9OTAwOCZjcz0wJmRzPTMmZnQ9YUVLcENxVDBtN2pQRDEyT1RxYUozd1VhQ0l5S01lRn5PNSZtaW1lX3R5cGU9dmlkZW9fbXA0JnFzPTEzJnJjPWFuSTZNMm81Y21sb2RUTXpPRGN6TkVCcGFuSTZNMm81Y21sb2RUTXpPRGN6TkVCamFXa3pNbVJyYW5GZ0xTMWtNVEZ6WVNOamFXa3pNbVJyYW5GZ0xTMWtNVEZ6Y3clM0QlM0QmdnZwbD0xJmw9MjAyNDEwMDgwOTUyMDg1QzAyNDRBQjhCQUI0NTBFMUJBRiZidGFnPWUwMDA1MDAwMCZjYz0zIiwiZmlsZW5hbWUiOiJUaWtWaWRlby5BcHBfNzQyMDUwODgwNDg3NTI5MTkxMS1oZC5tcDQiLCJuYmYiOjE3MjgzODExMzAsImV4cCI6MTcyODM4NDczMCwiaWF0IjoxNzI4MzgxMTMwfQ.xopqziLz4f2JB1zflQPQwu1LWpF-vhcmntOZ8eixTtY",
      "download_mp3": "https://dl.snapcdn.app/get?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJodHRwczovL3NmMTYtaWVzLW11c2ljLXNnLnRpa3Rva2Nkbi5jb20vb2JqL3Rpa3Rvay1vYmovNzQyMDUwOTA4NTAyNTU1MzE2OC5tcDMiLCJmaWxlbmFtZSI6IlRpa1ZpZGVvLkFwcF83NDIwNTA4ODA0ODc1MjkxOTExLm1wMyIsIm5iZiI6MTcyODM4MTEzMCwiZXhwIjoxNzI4Mzg0NzMwLCJpYXQiOjE3MjgzODExMzB9.8yIL2G54RIULzSc0vXQ7r9zqU6xXwFfQFJE2tkPcAy4"
    }
  }
}
```
</a>

<a name="image">
 
## Example 2
*Download tiktok image link.*
```javascript
async function TEST_TIKTOK_DL(){
    var link = "https://vt.tiktok.com/ZS27KJCEG/" 
    var result = await downloadTiktok(link);
    console.log(result)
}
TEST_TIKTOK_DL()
```

## Results 
```json
{
  "creator": "MR NIMA",
  "status": true,
  "result": {
    "image": "https://p16-sign-sg.tiktokcdn.com/tos-alisg-i-photomode-sg/839f27be3145419387141f85fc7c746d~tplv-photomode-2k-shrink-v1:1200:0:q70.webp?dr=14555&from=photomode.AWEME_DETAIL&ftpl=1&idc=maliva&nonce=76986&ps=13740610&refresh_token=ac3789f0b4250306507c480af511ec4d&s=AWEME_DETAIL&shcp=34ff8df6&shp=d05b14bd&t=4d5b0474&x-expires=1729674000&x-signature=MFmFDhoWTuVnxgRBgZuLaApmHHc%3D",
    "title": "#wallpaper #wallpapers #wallpaperlive #yourname",
    "dl_link": {
      "images": [
        "https://p16-sign-sg.tiktokcdn.com/tos-alisg-i-photomode-sg/839f27be3145419387141f85fc7c746d~tplv-photomode-2k-shrink-v1:1200:0:q70.jpeg?dr=14555&from=photomode.AWEME_DETAIL&ftpl=1&idc=maliva&nonce=15351&ps=13740610&refresh_token=c2e76de47663130a1d1d26ad0f426cc5&s=AWEME_DETAIL&shcp=34ff8df6&shp=d05b14bd&t=4d5b0474&x-expires=1729674000&x-signature=BUFEDtnVglc0dY9qOh2o1mVKpTM%3D",
        "https://p16-sign-sg.tiktokcdn.com/tos-alisg-i-photomode-sg/2e512990b33c4c9683c4c08be4e3a1a3~tplv-photomode-2k-shrink-v1:1200:0:q70.jpeg?dr=14555&from=photomode.AWEME_DETAIL&ftpl=1&idc=maliva&nonce=4667&ps=13740610&refresh_token=65e3c08433d9614b1f3ba1cedd71dfbd&s=AWEME_DETAIL&shcp=34ff8df6&shp=d05b14bd&t=4d5b0474&x-expires=1729674000&x-signature=5eUyLe3JFzIRKVzgN4g8dqV8o9E%3D",
        "https://p16-sign-sg.tiktokcdn.com/tos-alisg-i-photomode-sg/d0597c9ffe6b4857b2e12ebfa0b4565b~tplv-photomode-2k-shrink-v1:1200:0:q70.jpeg?dr=14555&from=photomode.AWEME_DETAIL&ftpl=1&idc=maliva&nonce=54487&ps=13740610&refresh_token=48b08cf5d8c579b11e45186a6cf5bf34&s=AWEME_DETAIL&shcp=34ff8df6&shp=d05b14bd&t=4d5b0474&x-expires=1729674000&x-signature=otDfl2zzxYPfQfIDsCtQqPIEB%2BM%3D",
        "https://p16-sign-sg.tiktokcdn.com/tos-alisg-i-photomode-sg/9966f9d130d04d05a414ccb7ff1eb06a~tplv-photomode-2k-shrink-v1:1200:0:q70.jpeg?dr=14555&from=photomode.AWEME_DETAIL&ftpl=1&idc=maliva&nonce=21079&ps=13740610&refresh_token=da8cd2daa244640bef982285952f74c6&s=AWEME_DETAIL&shcp=34ff8df6&shp=d05b14bd&t=4d5b0474&x-expires=1729674000&x-signature=nom3z31fdYfpf%2F9UWNUsSC0qXyo%3D",
        "https://p16-sign-sg.tiktokcdn.com/tos-alisg-i-photomode-sg/7ffa78a85fde4525a205b2d53effb97a~tplv-photomode-2k-shrink-v1:1200:0:q70.jpeg?dr=14555&from=photomode.AWEME_DETAIL&ftpl=1&idc=maliva&nonce=30278&ps=13740610&refresh_token=e9a14e86c48c4cfe84e66fdb47e9b25b&s=AWEME_DETAIL&shcp=34ff8df6&shp=d05b14bd&t=4d5b0474&x-expires=1729674000&x-signature=3Raxt%2FC8BDsmCbGyqSpB51H1%2B%2Fc%3D",
        "https://p16-sign-sg.tiktokcdn.com/tos-alisg-i-photomode-sg/0a68cf718a594a7eb58fbfe015ff1b96~tplv-photomode-2k-shrink-v1:1200:0:q70.jpeg?dr=14555&from=photomode.AWEME_DETAIL&ftpl=1&idc=maliva&nonce=14703&ps=13740610&refresh_token=91c28178de12a15b26d3263c20ea424c&s=AWEME_DETAIL&shcp=34ff8df6&shp=d05b14bd&t=4d5b0474&x-expires=1729674000&x-signature=o7YyAGRg3F8Rnl2BXGbl1po2uw4%3D",
        "https://p16-sign-sg.tiktokcdn.com/tos-alisg-i-photomode-sg/b7c4c73197c84a0da5f722cbe780da4d~tplv-photomode-2k-shrink-v1:1200:0:q70.jpeg?dr=14555&from=photomode.AWEME_DETAIL&ftpl=1&idc=maliva&nonce=54540&ps=13740610&refresh_token=f9db83a06ed6414988f5bcc8e66776c4&s=AWEME_DETAIL&shcp=34ff8df6&shp=d05b14bd&t=4d5b0474&x-expires=1729674000&x-signature=eP%2BF5ivJIrtk1oWORSaqdPmsXRc%3D",
        "https://p16-sign-sg.tiktokcdn.com/tos-alisg-i-photomode-sg/9653ec3bbdda4e4a9c33987cc9043abc~tplv-photomode-2k-shrink-v1:1200:0:q70.jpeg?dr=14555&from=photomode.AWEME_DETAIL&ftpl=1&idc=maliva&nonce=2278&ps=13740610&refresh_token=ce97e722b5ba20c2e338e754921e995f&s=AWEME_DETAIL&shcp=34ff8df6&shp=d05b14bd&t=4d5b0474&x-expires=1729674000&x-signature=vn4TMw1%2BpKTqzVp9TP8JpTGIy7s%3D",
        "https://p16-sign-sg.tiktokcdn.com/tos-alisg-i-photomode-sg/70aec0263fbb4b56a69769e822ff7e5d~tplv-photomode-2k-shrink-v1:1200:0:q70.jpeg?dr=14555&from=photomode.AWEME_DETAIL&ftpl=1&idc=maliva&nonce=89187&ps=13740610&refresh_token=ca3f34b59223f4553f9e7c00fed4f44b&s=AWEME_DETAIL&shcp=34ff8df6&shp=d05b14bd&t=4d5b0474&x-expires=1729674000&x-signature=I5IGX06PBUG8PWSP2hYd4wIClh4%3D",
        "https://p16-sign-sg.tiktokcdn.com/tos-alisg-i-photomode-sg/f85f27c444e8461b8523ed7944dbb3cc~tplv-photomode-2k-shrink-v1:1200:0:q70.jpeg?dr=14555&from=photomode.AWEME_DETAIL&ftpl=1&idc=maliva&nonce=76924&ps=13740610&refresh_token=f726b1431e7448fc0294bd85a287d482&s=AWEME_DETAIL&shcp=34ff8df6&shp=d05b14bd&t=4d5b0474&x-expires=1729674000&x-signature=V4N3%2BDTEbbrJBHnagZ%2B38C7CnCQ%3D",
        "https://p16-sign-sg.tiktokcdn.com/tos-alisg-i-photomode-sg/e593845fdf36465e8d6689d55ebd0731~tplv-photomode-2k-shrink-v1:1200:0:q70.jpeg?dr=14555&from=photomode.AWEME_DETAIL&ftpl=1&idc=maliva&nonce=97090&ps=13740610&refresh_token=1ed3f7a06e6b04038c416862aafcab04&s=AWEME_DETAIL&shcp=34ff8df6&shp=d05b14bd&t=4d5b0474&x-expires=1729674000&x-signature=RkXxYG89uRXPUw93UQXmSjPTIzU%3D"
      ],
      "download_video": false,
      "download_mp3": "https://dl.snapcdn.app/get?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJodHRwczovL3NmMTYtaWVzLW11c2ljLXNnLnRpa3Rva2Nkbi5jb20vb2JqL3Rpa3Rvay1vYmovNzMwNjQ0NjI4MTE4OTE5ODU5NC5tcDMiLCJmaWxlbmFtZSI6IlRpa1ZpZGVvLkFwcF83NDAwOTM1ODc3ODQyNjY4ODE4Lm1wMyIsIm5iZiI6MTcyODM4MTM4MSwiZXhwIjoxNzI4Mzg0OTgxLCJpYXQiOjE3MjgzODEzODF9.JL9bpaaAiFaV7zpKRu_XkrsdAvxY_OLhdHM7Y1JzOxo"
    }
  }
}
```
</a>


[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)

## Feedback

If you have any feedback, please reach out to us at queenelisa.bot@gmail.com


## Authors

- [@darkmakerofc](https://www.github.com/darkmakerofc)
- [@mrnima](https://www.github.com/mr-nima-x)

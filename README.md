# Amplify Passwordless Auth
# Get Started
AWSリソース作成
```bash
npx ampx sandbox
```

アプリ起動 → http://localhost:3000/ へアクセス
```bash
npm run dev
```
# Lambda関数
- CustomS3AutoDeleteObjectsCust-eDXjTHkR4qXi
  - 
- CreateAuthChallen
  - create auth challenge
  - 認証用のチャレンジを生成してフロントエンドに送信
- DefineAuthChallen
  - define auth challenge
- Fido2ChallengePas
  - fido2 challenge password
- Fido2Notification
- Fido2Passwordless
- PreSignupPassword
- PreTokenPasswordl
- VerifyAuthChallen
  - verify auth challenge
  - フロントから送信された署名を検証する
  - ここの検証がOKならサインインに成功する
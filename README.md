# UnionPay Wallet UI Shell

This is a local UI-only shell rebuilt from the decompiled UnionPay wallet structure and resources.

Reference points used from `D:\Ax\code\unionpay-wallet-v2_decompiled`:

- `resources/res/layout/activity_main_new.xml`: main `ViewPager` + bottom `TabLayout` shell.
- `sources/com/unionpay/activity/UPActivityMain.java`: five tab behavior and selected color `#E81C23`.
- `resources/res/values/strings.xml`: visible app labels such as `收付款`, `扫一扫`, `转账`, `信用卡还款`.
- `resources/res/drawable-*`: bottom tab icons and selected payment/action assets.

The app does not call any backend service. Buttons only switch local views or show local UI feedback.

## Run

```powershell
npm install
npm run dev
```

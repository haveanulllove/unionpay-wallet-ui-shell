# 界面 :id=020302

## 导航栏 :id=02030201

设置导航栏样式的 API (包括背景色、胶囊控件的样式、返回按钮的显示控制、是否隐藏导航栏、渐变色)。

```js
upsdk.setTitleStyle({
  // 可选，导航栏(含状态栏)背景色及透明度。16进制，前2位(8F-ff不透明)透明度，后六位(FFFFFF)颜色，仅对当前页有效，其余页还是申请配置的导航默认颜色
  navBackgroundColor:'0x8FFFFFFF',
  appletStyle: 'black', //可选，black-黑色主题，white-白色主题
  backBtnVisible: '0', // 可选，左侧返回按钮是否显示。'0'不显示，'1'显示，不传或空则默认显示
  appletTitleBarVisible: '1',// 可选，标题栏是否显示。'0'不显示，'1'显示，默认显示
  appletTitleGradientOrient: 'top', // 可选，渐变色方向，支持top、bottom、left、right
  appletTitleGradientStartColor:'0x8FFFFFFF',//渐变起始颜色
  appletTitleGradientEndColor: '0x88888888' //渐变结束颜色
});
```



> 注：
> 1. 主题 appletStyle 包含：胶囊控件的颜色、标题的颜色、返回按钮的颜色、状态栏 icon 及字体颜色(仅限 ios )，设置为 black 则均为黑色，设置为 white 则均为白色。目前不支持设置其它颜色，设为其它则该参数无效。
> 2. 导航栏的渐变由 appletTitleGradientOrient 、 appletTitleGradientStartColor 、 appletTitleGradientEndColor 三个参数共同决定，必须三个参数均设置渐变效果才会生效。
> 3. 该插件涉及5个功能：
>    - navBackgroundColor 负责设置导航栏背景色和透明度；
>    - appletStyle 负责设置主题；
>    - backBtnVisible 负责设置左侧返回按钮是否显示；
>    - appletTitleBarVisible 负责设置标题栏是否显示，不包括返回按钮及胶囊；
>    - appletTitleGradientOrient 、 appletTitleGradientStartColor 、 appletTitleGradientEndColor 三个参数共同负责设置标题栏渐变效果。以上 5 个功能的设置是独立的，效果是累积的。即每次调用可只设置某一种或多种功能，只有对应功能参数发生改变才会修改该功能的上一次的设置，但是不会影响其它功能的上一次的设置。
>
> 4. 当渐变效果和导航栏背景色同时设置时，渐变效果优先级更高。



## 标题 :id=02030202

设置导航栏标题，居中显示。

```js
upsdk.setNavigationBarTitle({
	title: '设置云闪付标题'
});
```
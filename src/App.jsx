import {
  Bell,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CirclePlus,
  CreditCard,
  FileText,
  Gift,
  Home,
  Landmark,
  MapPin,
  MessageCircle,
  Search,
  ShieldCheck,
  Sparkles,
  WalletCards
} from "lucide-react";
import React from "react";
import { useMemo, useState } from "react";

const asset = (name) => `/assets/${name}`;

const tabs = [
  {
    key: "home",
    label: "首页",
    selected: "btn_tab_selection_selected.png",
    normal: "btn_tab_selection_normal.png"
  },
  {
    key: "discount",
    label: "优惠",
    selected: "btn_tab_coupon_selected.png",
    normal: "btn_tab_coupon_normal.png"
  },
  {
    key: "cards",
    label: "卡管理",
    selected: "btn_tab_cards_selected.png",
    normal: "btn_tab_cards_normal.png"
  },
  {
    key: "fortune",
    label: "财富",
    selected: "btn_tab_life_selected.png",
    normal: "btn_tab_life_normal.png"
  },
  {
    key: "mine",
    label: "我的",
    selected: "btn_tab_mine_selected.png",
    normal: "btn_tab_mine_normal.png"
  }
];

const topActions = [
  { label: "收付款", icon: "receiving_white_new.png" },
  { label: "出行", icon: "travel_white.png" },
  { label: "扫一扫", icon: "scan_white_selection_new.png" },
  { label: "转账", icon: "transfer_white_new.png" }
];

const services = [
  { label: "乘公交", icon: "service-icons-icon-crops-direct/bus.png" },
  { label: "转账", icon: "service-icons-icon-crops-direct/transfer.png" },
  { label: "政府促消费", icon: "service-icons-icon-crops-direct/gov-consume.png", wide: true },
  { label: "信用卡还款", icon: "service-icons-icon-crops-direct/credit-repay.png" },
  { label: "玩赚中心", icon: "service-icons-icon-crops-direct/earn.png", wide: true },
  { label: "查银行卡", icon: "service-icons-icon-crops-direct/bank-card.png" },
  { label: "手机充值", icon: "service-icons-icon-crops-direct/mobile-recharge.png" },
  { label: "借款", icon: "service-icons-icon-crops-direct/loan.png" },
  { label: "申请信用卡", icon: "service-icons-icon-crops-direct/apply-card.png" },
  { label: "生活缴费", icon: "service-icons-icon-crops-direct/life-payment.png" },
  { label: "政务民生", icon: "service-icons-icon-crops-direct/public-service.png" },
  { label: "支付守护", icon: "service-icons-icon-crops-direct/payment-guard.png" },
  { label: "权益精选", icon: "service-icons-icon-crops-direct/benefits.png" },
  { label: "我的小程序", icon: "service-icons-icon-crops-direct/mini-programs.png" },
  { label: "更多", icon: "service-icons-icon-crops-direct/more.png" }
];

function App() {
  const [activeTab, setActiveTab] = useState("home");
  const [page, setPage] = useState(() => {
    const query = new URLSearchParams(window.location.search);
    const pageParam = query.get("page");
    return pageParam === "mini-programs" || pageParam === "credit-report" || pageParam === "credit-report-view"
      ? pageParam
      : "home";
  });
  const [creditReportReady, setCreditReportReady] = useState(false);
  const [notice, setNotice] = useState("");
  const activeIndex = tabs.findIndex((tab) => tab.key === activeTab);

  const title = useMemo(() => tabs[activeIndex]?.label ?? "首页", [activeIndex]);

  const ping = (label) => {
    setNotice(`${label} 为空壳演示入口`);
    window.clearTimeout(window.__upNoticeTimer);
    window.__upNoticeTimer = window.setTimeout(() => setNotice(""), 1800);
  };

  const handleHomeTap = (label) => {
    if (label === "我的小程序") {
      setPage("mini-programs");
      return;
    }
    ping(label);
  };

  const handleTabChange = (tab) => {
    setPage("home");
    setActiveTab(tab);
  };

  return (
    <main className="viewport">
      <section className="phone-shell" aria-label="云闪付 UI 空壳">
        {activeTab === "home" && page === "mini-programs" ? (
          <MiniProgramScreen onBack={() => setPage("home")} onTap={ping} onOpenReport={() => setPage("credit-report")} />
        ) : activeTab === "home" && page === "credit-report" ? (
          <CreditReportScreen
            ready={creditReportReady}
            onBack={() => setPage("mini-programs")}
            onQuery={() => setCreditReportReady(true)}
            onView={() => setPage("credit-report-view")}
          />
        ) : activeTab === "home" && page === "credit-report-view" ? (
          <CreditReportViewer onBack={() => setPage("credit-report")} />
        ) : activeTab === "home" ? (
          <HomeScreen onTap={handleHomeTap} />
        ) : (
          <StaticTab title={title} tabKey={activeTab} onTap={ping} />
        )}
        {page === "home" && <BottomTabs activeTab={activeTab} onChange={handleTabChange} />}
        {notice && <div className="toast">{notice}</div>}
      </section>
    </main>
  );
}

function HomeScreen({ onTap }) {
  return (
    <div className="screen home-screen">
      <header className="hero">
        <div className="search-row">
          <button className="city-button" onClick={() => onTap("城市切换")}>
            上海市 <ChevronDown size={17} strokeWidth={2.6} />
          </button>
          <button className="search-pill" onClick={() => onTap("搜索")}>
            <Search size={19} />
            <span>贷款财政贴息</span>
            <strong>搜索</strong>
          </button>
          <button className="icon-circle" aria-label="消息" onClick={() => onTap("消息")}>
            <MessageCircle size={22} />
          </button>
          <button className="icon-circle" aria-label="添加" onClick={() => onTap("添加")}>
            <CirclePlus size={25} />
          </button>
        </div>
        <div className="quick-actions">
          {topActions.map((item) => (
            <button key={item.label} className="quick-action" onClick={() => onTap(item.label)}>
              <span className="quick-icon">
                <img src={asset(item.icon)} alt="" />
              </span>
              <span>{item.label}</span>
            </button>
          ))}
        </div>
        <button className="subsidy-banner" onClick={() => onTap("购新补贴")}>
          <span className="appliance-illo" aria-hidden="true">
            <span className="fridge" />
            <span className="stove" />
            <span className="camera-dot" />
          </span>
          <span className="subsidy-copy">
            <span>2026年家电、数码</span>
            <strong>及自主品类 <b>购新补贴</b></strong>
          </span>
          <span className="banner-cta">查看</span>
        </button>
      </header>

      <section className="content-panel">
        <div className="service-grid">
          {services.map((item) => (
            <button key={item.label} className="service-item" onClick={() => onTap(item.label)}>
              <ServiceIcon icon={item.icon} label={item.label} wide={item.wide} />
              {item.badge && <span className="mini-badge">{item.badge}</span>}
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        <button className="message-card" onClick={() => onTap("消息提醒")}>
          <span>
            <strong>信用报告查询：</strong>信用报告生成提醒
            <em>昨天</em>
          </span>
          <span>
            <strong>优惠助手：</strong>优惠通知
            <em>4月30日</em>
          </span>
          <span className="red-dot" />
          <ChevronRight className="message-arrow" size={24} />
        </button>

        <button className="travel-card" onClick={() => onTap("五一出境")}>
          <span>
            <strong>五一出境 <b>带上银联卡</b></strong>
            <em>汇率补贴至高超1000元</em>
          </span>
          <span className="travel-illo" aria-hidden="true">
            <span className="globe" />
            <span className="ticket-seal">抽大奖<br />签到</span>
          </span>
        </button>

        <div className="recommend-grid">
          <button className="recommend-card" onClick={() => onTap("专属推荐")}>
            <strong>专属推荐</strong>
            <span className="recommend-strip">
              <img src={asset("coupon_logo.png")} alt="" />
              <span>玩赚中心<br /><em>点我抽奖</em></span>
            </span>
          </button>
          <button className="recommend-card" onClick={() => onTap("本地精彩")}>
            <strong>本地精彩</strong>
            <span className="local-row">
              <Gift size={31} />
              <span>点亮商户<br /><em>赢立减券</em></span>
              <ChevronRight size={21} />
            </span>
          </button>
        </div>
      </section>
    </div>
  );
}

function ServiceIcon({ icon, label, wide }) {
  const iconName = icon.split("/").pop().replace(".png", "");

  return (
    <span className={`service-icon-slot service-icon-${iconName}${wide ? " wide" : ""}`} aria-hidden="true">
      <img src={asset(icon)} alt={label} />
    </span>
  );
}

function StaticTab({ title, tabKey, onTap }) {
  const data = {
    discount: {
      kicker: "附近优惠",
      headline: "立减券、商圈活动、热门权益",
      icon: Gift,
      cards: ["餐饮满减", "商超随机立减", "信用卡专享", "城市消费券"]
    },
    cards: {
      kicker: "卡管理",
      headline: "银行卡、还款、账单与快捷服务",
      icon: CreditCard,
      cards: ["我的银行卡", "信用卡还款", "查银行卡", "申请信用卡"]
    },
    fortune: {
      kicker: "财富",
      headline: "账户总览、理财精选与资产助手",
      icon: Landmark,
      cards: ["资产总览", "稳健专区", "借款服务", "权益提醒"]
    },
    mine: {
      kicker: "我的",
      headline: "个人资料、安全中心与消息设置",
      icon: WalletCards,
      cards: ["个人信息", "支付设置", "安全中心", "帮助与反馈"]
    }
  }[tabKey];
  const Icon = data.icon;

  return (
    <div className="screen simple-screen">
      <header className="simple-header">
        <div className="simple-title">
          <span>{data.kicker}</span>
          <strong>{title}</strong>
        </div>
        <button className="icon-circle light" onClick={() => onTap("通知")}>
          <Bell size={22} />
        </button>
      </header>
      <section className="simple-hero">
        <Icon size={44} strokeWidth={1.8} />
        <h1>{data.headline}</h1>
        <p>当前为 UI 空壳，本地静态数据展示。</p>
      </section>
      <section className="simple-list">
        {data.cards.map((card, index) => (
          <button key={card} className="simple-row" onClick={() => onTap(card)}>
            <span className="row-icon">{index + 1}</span>
            <strong>{card}</strong>
            <ChevronRight size={22} />
          </button>
        ))}
      </section>
    </div>
  );
}

const miniPrograms = [
  { label: "信用报告...", kind: "report" },
  { label: "招商银行...", kind: "image", icon: "mini-programs/cmb.png" },
  { label: "银联大连", kind: "image", icon: "mini-programs/unionpay-dalian.jpg" }
];

function MiniProgramScreen({ onBack, onTap, onOpenReport }) {
  return (
    <div className="screen mini-program-screen">
      <nav className="mini-nav" aria-label="小程序导航">
        <button className="mini-back" aria-label="返回" onClick={onBack}>
          <ChevronLeft size={38} strokeWidth={2.6} />
        </button>
        <h1>我的小程序</h1>
        <button className="mini-discover" onClick={() => onTap("发现")}>发现</button>
      </nav>

      <button className="mini-search" onClick={() => onTap("搜索小程序")}>
        <Search size={24} strokeWidth={2.3} />
        <span>搜索小程序</span>
      </button>

      <section className="mini-section mini-recent">
        <h2>最近使用</h2>
        <div className="mini-grid one">
          <MiniProgramItem item={miniPrograms[0]} onTap={onTap} onOpenReport={onOpenReport} />
        </div>
      </section>

      <section className="mini-section">
        <h2>我的关注</h2>
        <div className="mini-grid">
          {miniPrograms.map((item) => (
            <MiniProgramItem key={`${item.kind}-${item.label}`} item={item} onTap={onTap} onOpenReport={onOpenReport} />
          ))}
        </div>
      </section>

      <span className="mini-scroll-thumb" aria-hidden="true" />
      <span className="mini-corner" aria-hidden="true" />
      <span className="mini-home-indicator" aria-hidden="true" />
    </div>
  );
}

function MiniProgramItem({ item, onTap, onOpenReport }) {
  return (
    <button className="mini-program-item" onClick={() => (item.kind === "report" ? onOpenReport() : onTap(item.label))}>
      <span className={`mini-app-icon mini-app-${item.kind}`} aria-hidden="true">
        {item.kind === "image" && <img src={asset(item.icon)} alt="" />}
        {item.kind === "report" && (
          <>
            <span className="report-book" />
            <span className="report-user" />
          </>
        )}
      </span>
      <span>{item.label}</span>
    </button>
  );
}

function CreditReportScreen({ ready, onBack, onQuery, onView }) {
  return (
    <div className="screen credit-report-screen">
      <PageNav title="信用报告查询" rightText="说明" onBack={onBack} />
      <section className="credit-hero-card">
        <span className="credit-hero-icon">
          <FileText size={34} strokeWidth={2.2} />
        </span>
        <strong>个人信用报告</strong>
        <span>本地空壳演示，模拟查询与报告生成流程。</span>
      </section>

      <section className="credit-status-card">
        <div className="credit-status-title">
          <strong>{ready ? "报告已生成" : "可申请查询"}</strong>
          <span>{ready ? "2026-05-05 20:32" : "预计几分钟内生成"}</span>
        </div>
        <div className="credit-step-list">
          <span className="done">身份校验</span>
          <span className={ready ? "done" : ""}>查询提交</span>
          <span className={ready ? "done" : ""}>查看报告</span>
        </div>
      </section>

      <section className="credit-info-card">
        <h2>查询须知</h2>
        <p>当前页面不连接真实征信系统，只保留演示流程和报告样式。</p>
        <p>查询完成后可查看一份本地生成的示例报告。</p>
      </section>

      <button className="credit-primary" onClick={ready ? onView : onQuery}>
        {ready ? "查看信用报告" : "申请查询"}
      </button>
      {ready && (
        <button className="credit-secondary" onClick={onQuery}>
          重新查询
        </button>
      )}
    </div>
  );
}

function CreditReportViewer({ onBack }) {
  return (
    <div className="screen credit-report-screen report-view-screen">
      <PageNav title="信用报告" rightText="下载" onBack={onBack} />
      <section className="report-paper">
        <div className="report-cover">
          <span className="report-seal">示例</span>
          <h1>个人信用报告</h1>
          <p>报告编号：UP202605052032</p>
          <p>生成时间：2026-05-05 20:32</p>
        </div>
        <div className="report-summary-grid">
          <span><strong>0</strong><em>逾期记录</em></span>
          <span><strong>3</strong><em>账户概览</em></span>
          <span><strong>2</strong><em>查询记录</em></span>
        </div>
        <div className="report-block">
          <h2>基本信息</h2>
          <p><b>姓名</b><span>张三</span></p>
          <p><b>证件号码</b><span>310***********1234</span></p>
          <p><b>报告状态</b><span>已生成</span></p>
        </div>
        <div className="report-block">
          <h2>信贷概要</h2>
          <p><b>信用卡账户</b><span>2 个，状态正常</span></p>
          <p><b>贷款账户</b><span>1 个，状态正常</span></p>
          <p><b>当前逾期</b><span>无</span></p>
        </div>
        <div className="report-block">
          <h2>查询记录</h2>
          <p><b>2026-05-05</b><span>本人查询</span></p>
          <p><b>2026-04-30</b><span>贷后管理</span></p>
        </div>
      </section>
    </div>
  );
}

function PageNav({ title, rightText, onBack }) {
  return (
    <nav className="page-nav">
      <button className="page-back" aria-label="返回" onClick={onBack}>
        <ChevronLeft size={34} strokeWidth={2.4} />
      </button>
      <h1>{title}</h1>
      <button className="page-nav-right">{rightText}</button>
    </nav>
  );
}

function BottomTabs({ activeTab, onChange }) {
  return (
    <nav className="bottom-tabs" aria-label="主导航">
      {tabs.map((tab) => {
        const selected = tab.key === activeTab;
        return (
          <button key={tab.key} className={selected ? "active" : ""} onClick={() => onChange(tab.key)}>
            <img src={asset(selected ? tab.selected : tab.normal)} alt="" />
            <span>{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
}

export default App;

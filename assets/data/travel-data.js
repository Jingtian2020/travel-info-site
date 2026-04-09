window.TRAVEL_DATA = {
  site: {
    name: "去玩实验室",
    description: "每周更新的旅行玩乐情报站",
    lastUpdated: "2026-04-09",
    refreshCadence: "每周自动刷新一次",
    metrics: [
      { value: "每周更新", label: "上新资讯、随机推荐、玩法策展同步刷新" },
      { value: "三大板块", label: "近期上新 + 随机发现 + 玩法策展" },
      { value: "轻决策", label: "帮用户更快做下一次出游选择" }
    ]
  },
  recentLaunches: [
    {
      id: "natgeo-museum",
      title: "华盛顿 National Geographic Museum of Exploration 公布开放时间",
      location: "美国 · 华盛顿特区",
      freshness: "即将开放",
      summary: "国家地理新馆围绕沉浸探索叙事设计，成为城市文化旅行新理由。",
      whyItMatters: "不是普通翻新，而是新形态体验场馆，适合做旅行新体验主线。",
      tags: ["城市文化", "沉浸体验", "新馆开放"],
      sourceName: "National Geographic",
      sourceUrl: "https://news.nationalgeographic.org/museum-of-exploration-opening-date-announcement/"
    },
    {
      id: "mandai-exploria",
      title: "新加坡 Mandai Wildlife Reserve 上线 Exploria 多感官体验",
      location: "新加坡",
      freshness: "新上线",
      summary: "自然科普、互动装置和剧场体验结合，适合城市短途游补充新鲜感。",
      whyItMatters: "将传统自然景区升级为更适合年轻人与家庭共游的体验场。",
      tags: ["自然户外", "亲子友好", "沉浸体验"],
      sourceName: "blooloop",
      sourceUrl: "https://blooloop.com/exploria-attraction-mandai-wildlife/"
    },
    {
      id: "new-museum-reopen",
      title: "纽约 New Museum 扩建后重新开放",
      location: "美国 · 纽约",
      freshness: "焕新开放",
      summary: "新增展览与公共空间，馆内停留体验更加完整。",
      whyItMatters: "城市文化游用户可将其作为半天到一天主行程。",
      tags: ["城市文化", "焕新升级", "艺术空间"],
      sourceName: "Time Out New York",
      sourceUrl: "https://www.timeout.com/newyork/news/the-new-museums-huge-new-building-officially-opens-this-spring-011326"
    },
    {
      id: "voco-sandpiper",
      title: "佛州 Voco Sandpiper 全包式度假村开业",
      location: "美国 · 佛罗里达",
      freshness: "新上线",
      summary: "主打轻决策和家庭友好，适合周末或短线度假。",
      whyItMatters: "本土短途度假选择增多，提升说走就走可行性。",
      tags: ["酒店上新", "海滨度假", "家庭友好"],
      sourceName: "Travel + Leisure",
      sourceUrl: "https://www.travelandleisure.com/voco-sandpiper-florida-resort-ihg-first-all-inclusive-property-in-the-u-s-11888569"
    },
    {
      id: "vanderpump-hotel",
      title: "拉斯维加斯 Vanderpump Hotel 开放预订",
      location: "美国 · 拉斯维加斯",
      freshness: "即将开放",
      summary: "将住宿体验升级为旅行内容本身，强化社交与风格表达。",
      whyItMatters: "目的地酒店趋势持续增长，年轻用户更愿为体验型住宿买单。",
      tags: ["酒店上新", "城市娱乐", "目的地酒店"],
      sourceName: "Travel + Leisure",
      sourceUrl: "https://www.travelandleisure.com/vanderpump-hotel-opening-in-las-vegas-sneak-peek-11930108"
    },
    {
      id: "citypickle-ny",
      title: "纽约时代广场 CityPickle 新开大型匹克球空间",
      location: "美国 · 纽约",
      freshness: "新上线",
      summary: "运动 + 社交 + 城市场景消费结合，成为新城市玩乐样本。",
      whyItMatters: "游玩不只靠景点，活动型体验也能成为旅行主线。",
      tags: ["运动社交", "城市娱乐", "新体验"],
      sourceName: "Time Out New York",
      sourceUrl: "https://www.timeout.com/newyork/news/a-massive-37-000-square-foot-pickleball-complex-is-coming-to-times-square-021926"
    }
  ],
  classicLibrary: [
    {
      name: "京都岚山与嵯峨野",
      location: "日本 · 京都",
      season: "春秋最佳",
      summary: "清晨竹林、河岸与老街的慢节奏体验非常完整。",
      bestFor: "第一次去京都但不想赶景点",
      budget: "中等",
      duration: "2-3 天",
      tags: ["城市文化", "散步型", "轻度疗愈"]
    },
    {
      name: "香港西贡海岸线",
      location: "中国香港 · 西贡",
      season: "秋冬舒适",
      summary: "海岸、村落与咖啡店组合适合周末快闪。",
      bestFor: "想短途换气但不想准备复杂",
      budget: "中等偏低",
      duration: "1-2 天",
      tags: ["海边", "周末快闪", "自然户外"]
    },
    {
      name: "新加坡滨海湾到甘榜格南",
      location: "新加坡",
      season: "全年可去",
      summary: "现代建筑、夜景与街区生活感在短途中高度兼容。",
      bestFor: "第一次去东南亚城市",
      budget: "中高",
      duration: "3 天",
      tags: ["城市文化", "夜游", "美食"]
    },
    {
      name: "大理洱海西岸",
      location: "中国 · 云南大理",
      season: "春秋最佳",
      summary: "慢节奏与风景结合，适合恢复状态型旅行。",
      bestFor: "需要降速放松的人",
      budget: "中等",
      duration: "3 天",
      tags: ["自然户外", "轻度疗愈", "慢旅行"]
    },
    {
      name: "巴塞罗那旧城与海边线",
      location: "西班牙 · 巴塞罗那",
      season: "春夏最佳",
      summary: "建筑、海风和夜生活同时在线。",
      bestFor: "情侣或第一次欧洲城市度假",
      budget: "中高",
      duration: "4 天",
      tags: ["海边", "城市文化", "夜游"]
    },
    {
      name: "清迈古城与山边咖啡路线",
      location: "泰国 · 清迈",
      season: "11 月到次年 2 月",
      summary: "寺庙、手作、咖啡与自然景串联轻松。",
      bestFor: "独自旅行或疗愈型出游",
      budget: "中等偏低",
      duration: "3 天",
      tags: ["手作", "轻度疗愈", "慢旅行"]
    }
  ],
  classicPicks: [],
  playbookLibrary: [
    {
      title: "夜游城市副本",
      destination: "新加坡 / 香港 / 东京",
      pace: "高记忆点",
      summary: "白天轻量主线，夜晚作为体验高光时段。",
      route: "观景点 -> 夜间展演 -> 夜宵散步",
      bestFor: "朋友组队、情侣快闪",
      moods: ["夜游", "朋友组队", "城市娱乐"]
    },
    {
      title: "市场寻味路线",
      destination: "台北 / 曼谷 / 里斯本",
      pace: "轻松具体",
      summary: "从市场和超市进入城市味觉地图，而不只打卡餐厅。",
      route: "早市 -> 食品店 -> 体验课 -> 晚餐",
      bestFor: "把吃当主线的用户",
      moods: ["美食", "城市文化", "慢旅行"]
    },
    {
      title: "目的地酒店玩法",
      destination: "拉斯维加斯 / 海滨度假区",
      pace: "轻决策高舒适",
      summary: "把酒店升级为行程主角，外出只补少量重点点位。",
      route: "入住体验型酒店 -> 在地停留 -> 1-2 个外出点",
      bestFor: "短假、庆祝型出游",
      moods: ["目的地酒店", "情侣约会", "周末快闪"]
    },
    {
      title: "观赛或演出带着走",
      destination: "大阪 / 新加坡 / 纽约",
      pace: "高情绪价值",
      summary: "以赛事或演出为锚点，周边行程轻量串联。",
      route: "进场前街区 -> 赛事演出 -> 散场夜宵",
      bestFor: "兴趣事件驱动型用户",
      moods: ["朋友组队", "城市娱乐", "周末快闪"]
    },
    {
      title: "自然景区 + 沉浸展演",
      destination: "新加坡 / 北海道 / 温哥华",
      pace: "层次感强",
      summary: "白天自然线，夜间沉浸体验线，形成节奏反差。",
      route: "户外主线 -> 晚间沉浸展 -> 夜间散步",
      bestFor: "亲子、情侣、轻探险用户",
      moods: ["自然户外", "沉浸体验", "亲子友好"]
    },
    {
      title: "晨型人能量路线",
      destination: "京都 / 大理 / 清迈",
      pace: "松弛恢复型",
      summary: "把最好的时段前置在早晨，回避人潮提升舒适度。",
      route: "晨间出发 -> 空景时段 -> 午后休整",
      bestFor: "怕拥挤、想慢一点",
      moods: ["轻度疗愈", "一个人出走", "自然户外"]
    }
  ],
  playModes: [],
  trendSignals: [
    { name: "Made-for-me Travel", summary: "旅行越来越强调个性表达与生活方式契合。" },
    { name: "Shelf Discovery", summary: "市场与超市型体验成为城市旅行新入口。" },
    { name: "Destination Check-in", summary: "住宿空间本身成为旅行内容的一部分。" },
    { name: "Glowmads", summary: "Wellness 与放松体验正在被当作独立出游理由。" }
  ],
  sources: [
    { name: "National Geographic", note: "新馆与探索类项目", url: "https://www.nationalgeographic.org/" },
    { name: "Travel + Leisure", note: "酒店与目的地上新", url: "https://www.travelandleisure.com/" },
    { name: "Time Out", note: "城市新体验动态", url: "https://www.timeout.com/" },
    { name: "blooloop", note: "沉浸与游乐资讯", url: "https://blooloop.com/" }
  ]
};

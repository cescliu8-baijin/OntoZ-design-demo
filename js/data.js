// OntoZ root source module.

const strategies = {
  news: [
    {
      id: 'eu-carbon-compliance-window',
      title: '欧盟碳关税新规落地，出口企业迎来合规服务窗口期',
      description: '你的客户池中有 18 家制造企业受新规影响，建议以“碳足迹快速诊断”为切入点。',
      source: '欧盟 · 政策类'
    },
    {
      id: 'core-parts-price-increase',
      title: '头部厂商宣布核心部件涨价，下游客户正在寻找替代供应',
      description: '监测到 37 家目标企业近期密集搜索替代方案，其中 6 家与你的优势产品高度匹配。',
      source: '产业链'
    },
    {
      id: 'southeast-asia-storage-projects',
      title: '东南亚储能项目加速，工商储渠道进入集中招募期',
      description: '越南与泰国新增 12 个备案项目，可优先接触当地 EPC 与区域代理商。',
      source: '东南亚 · 市场'
    }
  ],
  new: [
    {
      id: 'new-procurement-roles',
      title: '7 家目标企业近期新增采购岗位，可能正在扩建供应链',
      description: '其中 3 家与你的核心客户画像高度一致，建议在采购方案确定前建立联系。',
      source: '招聘 · 组织变化'
    },
    {
      id: 'lookalike-potential-buyers',
      title: '发现 26 家与近期成交客户高度相似的潜在买家',
      description: '基于行业、规模、产品结构和技术栈综合匹配，平均相似度达到 87%。',
      source: 'AI匹配 · 企业图谱'
    },
    {
      id: 'east-china-supplier-certification',
      title: '华东 9 家新能源企业进入新一轮供应商认证周期',
      description: '认证窗口预计持续 30 天，你的 2 项资质可显著缩短其准入评估流程。',
      source: '华东 · 招采'
    }
  ],
  existing: [
    {
      id: 'renewal-risk-low-interaction',
      title: '5 家重点客户将在 60 天内到期，但近期互动明显减少',
      description: '建议提前开展价值复盘，其中 2 家客户存在被竞品替代的风险信号。',
      source: 'CRM · 续约预警'
    },
    {
      id: 'yuanhang-energy-expansion',
      title: '客户「远航能源」业务量增长 42%，具备扩容增购条件',
      description: '其新增产线与你的 Pro 系列适配，可在本月经营复盘中主动提出升级建议。',
      source: '客户动态'
    },
    {
      id: 'key-contact-job-changes',
      title: '12 位关键联系人本月发生岗位变动，建议及时重建关系',
      description: '包含 4 位决策者与 8 位项目负责人，部分新任职公司也符合目标画像。',
      source: '人脉 · 联系人动态'
    }
  ]
};

const keyCustomers = [
  {
    id: 'yuanhang-energy',
    company: '远航能源科技',
    contact: '张敏 · 采购负责人',
    lastContactTime: '今天 10:24',
    lastContactInfo: '询问 Pro 系列样品交期，并希望补充一页并网交付案例。',
    recommendedAction: '今天补发案例摘要和样品交期说明，顺势预约本周技术沟通。',
    badge: '高意向'
  },
  {
    id: 'northstar-storage',
    company: 'Northstar Storage',
    contact: 'Emily Carter · Project Director',
    lastContactTime: '昨天 16:40',
    lastContactInfo: '打开报价页 3 次，重点停留在质保响应和备件供应部分。',
    recommendedAction: '发送 15 分钟方案评估邀约，并突出本地备件支持与项目交付窗口。',
    badge: '需跟进'
  },
  {
    id: 'hengtong-new-materials',
    company: '恒通新材料',
    contact: '李睿 · 供应链总监',
    lastContactTime: '2 天前',
    lastContactInfo: '回复称下月启动供应商复评，要求确认认证资料是否已更新。',
    recommendedAction: '立即发送资质更新包，并附上近期同类客户交付记录。',
    badge: '复评窗口'
  }
];

const generatedStrategies = [
  {
    id: 'new-product-launch',
    marketingPlanId: 'sleeping-high-value',
    title: '新品发布策略',
    badge: '首轮冷启动',
    summary: '本策略目标是为了推广新品，针对高价值核心客户推送新品营销信，推动客户试用。通过分析客户池数据和企业知识库的数据结合全网搜索到的行业动态or节假日商机，我们为您推荐以下策略。',
    sections: [
      {
        title: '覆盖客户',
        expanded: true,
        body: '本策略当前覆盖了 123 家客户和 512 位联系人，以下是客户的筛选标签，后续新进高质量客户池且满足此条件的客户也会被当前策略触达',
        tags: ['亚洲', '阿拉伯国家', '动力电池客户', '储能电池客户', '消费电池客户'],
        actionLabel: '查看客户'
      },
      { title: '核心卖点', body: '围绕新品试用价值、适配场景和交付支持展开，突出核心客户最关心的性能提升和落地成本。' },
      { title: '推荐动作', body: '建议先发送新品营销信，再根据客户试用意向安排样品、资料包或 15 分钟演示沟通。' }
    ]
  },
  {
    id: 'us-storage-installer-cold-start',
    marketingPlanId: 'us-storage-installer',
    title: '美国储能安装商冷启动策略',
    badge: '首轮冷启动',
    summary: '面向美国住宅储能安装商，以并网交付、质保响应和供应稳定性作为首轮沟通切入点。通过客户池行为数据、历史高绩效策略和近期市场动态，为当前冷启动触达推荐以下策略。',
    sections: [
      {
        title: '覆盖客户',
        expanded: true,
        body: '本策略当前覆盖了 43 家客户和 126 位联系人，以下是客户的筛选标签，后续新进高质量客户池且满足此条件的客户也会被当前策略触达',
        tags: ['北美', '美国', '住宅储能', '安装商', 'EPC 客户'],
        actionLabel: '查看客户'
      },
      { title: '核心卖点', body: '用并网交付稳定性、质保响应和供应确定性建立信任，优先解决安装商首轮沟通的顾虑。' },
      { title: '推荐动作', body: '先发送 1 页方案摘要，引导对方确认项目窗口，再预约技术交流或样品方案沟通。' }
    ]
  },
  {
    id: 'read-no-reply-followup',
    marketingPlanId: 'read-no-reply',
    title: '已读未回客户二次触达策略',
    badge: '二次触达',
    summary: '针对已打开资料或停留报价页但未回复的客户，用更具体的价值主张推动下一步反馈。结合客户互动记录、报价页停留行为和项目窗口信号，为二次触达推荐以下策略。',
    sections: [
      {
        title: '覆盖客户',
        expanded: true,
        body: '本策略当前覆盖了 18 家客户和 54 位联系人，以下是客户的筛选标签，后续新进高质量客户池且满足此条件的客户也会被当前策略触达',
        tags: ['已读未回', '报价页停留', 'ROI 关注', '项目负责人', '二次跟进'],
        actionLabel: '查看客户'
      },
      { title: '核心卖点', body: '避开重复推销，改用案例、ROI 估算或交期节点提醒，让客户更容易给出明确反馈。' },
      { title: '推荐动作', body: '补充更具体的收益测算和项目窗口提醒，再用轻量问题引导客户确认下一步沟通意向。' }
    ]
  }
];

const dashboardMetrics = {
  7: { reach: '12,480', delivered: '11,806', engaged: '3,284', opportunities: '426' },
  30: { reach: '42,760', delivered: '40,134', engaged: '11,082', opportunities: '1,368' },
  90: { reach: '118,920', delivered: '111,406', engaged: '30,621', opportunities: '3,842' }
};

const leads = [
  {
    company: 'Sustainable Power Solutions',
    country: '加拿大',
    type: '买家业务',
    contacts: '32 人',
    owner: '卢卓辰',
    site: 'http://www.narang.com',
    score: '10.0',
    products: ['Forklift', 'Scissor Lift', 'Electric Scissor Lift', 'Rough Terrain Scissor Lift', 'Indoor Scissor Lift', 'Outdoor Scissor Lift', '+12'],
    custom: ['新能源']
  },
  {
    company: 'Sustainable Power Solutions',
    country: '加拿大',
    type: '买家业务',
    contacts: '32 人',
    owner: '卢卓辰',
    site: 'http://www.narang.com',
    score: '10.0',
    products: ['Forklift', 'Scissor Lift', 'Electric Scissor Lift', 'Rough Terrain Scissor Lift', 'Indoor Scissor Lift', 'Outdoor Scissor Lift', '+12'],
    custom: ['新能源']
  },
  {
    company: 'Sustainable Power Solutions',
    country: '加拿大',
    type: '买家业务',
    contacts: '32 人',
    owner: '卢卓辰',
    site: 'http://www.narang.com',
    score: '10.0',
    products: ['Forklift', 'Scissor Lift', 'Electric Scissor Lift', 'Rough Terrain Scissor Lift', 'Indoor Scissor Lift', 'Outdoor Scissor Lift', '+12'],
    custom: ['新能源']
  },
  {
    company: 'Sustainable Power Solutions',
    country: '加拿大',
    type: '买家业务',
    contacts: '32 人',
    owner: '卢卓辰',
    site: 'http://www.narang.com',
    score: '10.0',
    products: ['Forklift', 'Scissor Lift', 'Electric Scissor Lift', 'Rough Terrain Scissor Lift', 'Indoor Scissor Lift', 'Outdoor Scissor Lift', '+12'],
    custom: ['新能源']
  },
  {
    company: 'Sustainable Power Solutions',
    country: '加拿大',
    type: '买家业务',
    contacts: '32 人',
    owner: '卢卓辰',
    site: 'http://www.narang.com',
    score: '10.0',
    products: ['Forklift', 'Scissor Lift', 'Electric Scissor Lift', 'Outdoor Scissor Lift', '+12'],
    custom: ['新能源']
  }
];

const thinkingScript = [
  { type: 'line', text: '正在读取你的客户池…看 Lily 拿到了什么' },
  { type: 'line', text: '正在分析客户分布，寻找值得触达的客户群…看 Lily 拿到了什么' },
  { type: 'line', text: 'Lily 已扫描全部 372 家客户' },
  { type: 'line', text: '已确认补充信息，正在继续生成可执行触达策略…' },
  { type: 'layer', text: '第 1 层 · 有询盘未报价的高价值客户 — 4 家公司' },
  { type: 'line', text: '正在核对询盘内容与你的产品参数、交期、认证…' },
  { type: 'line', text: '判断：报价前窗口优先级最高，建议生成确认邮件、人工确认后发送' },
  { type: 'layer', text: '第 2 层 · 美国储能安装商 — 43 家公司' },
  { type: 'line', text: '正在搜索该市场近期动态…看 Lily 拿到了什么' },
  { type: 'line', text: '找到：住宅储能并网交付成为采购关注点' },
  { type: 'line', text: '正在匹配你的产品卖点…建议用项目稳定性切入' },
  { type: 'line', text: '发现可参考的历史高绩效策略：美国储能首轮（询盘率 18%）' },
  { type: 'layer', text: '第 3 层 · 已读未回客户 — 18 家公司' },
  { type: 'line', text: '正在分析他们看过什么、停在哪一步…' },
  { type: 'line', text: '判断：认知已建立，建议换一个更具体的价值主张二次触达' },
  { type: 'layer', text: '第 4 层 · 德国技术角色 — 21 家公司' },
  { type: 'line', text: '正在搜索欧洲储能合规动态…看 Lily 拿到了什么' },
  { type: 'line', text: '已为 4 个客户层生成 3 条完整触达策略，正在整理…' }
];

const marketingPlans = {
  'sleeping-high-value': {
    fit: '匹配度 96%',
    subject: '关于储能项目交付与认证资料的快速确认',
    body: `Hi {{联系人姓名}}，\n\n看到贵司近期在关注储能项目交付、认证与售后稳定性，我们整理了一份适用于 {{公司名称}} 当前采购评估阶段的资料。\n\n结合你们此前的询盘信息，我们建议先确认三个关键点：\n1. 目标交期与可接受的备货窗口\n2. 项目所需认证与测试报告\n3. 后续技术对接与样品验证方式\n\n如果方便，我可以把完整参数表和交付排期发你，并约 15 分钟同步一下是否匹配贵司当前项目节奏。\n\n祝好，\nJohn`,
    summary: '4 家公司 · 27 位联系人',
    audience: [
      { company: 'NorthPeak Energy Solutions', signal: '有询盘未报价 · 预计采购额 ¥86万', contactCount: 8, contacts: ['Mia Carter · Procurement Director', 'Ethan Brooks · Technical Manager', 'Olivia Hill · Project Buyer'] },
      { company: 'BlueRiver Storage Inc.', signal: '近 7 天打开资料 3 次', contactCount: 7, contacts: ['Ava Wilson · VP Operations', 'Noah White · Sourcing Lead'] },
      { company: 'SolarGrid Partners', signal: '关注认证与交期', contactCount: 6, contacts: ['Liam Smith · Supply Chain Manager', 'Emma Johnson · Engineering Lead'] },
      { company: 'EverVolt Systems', signal: '高价值沉睡 42 天', contactCount: 6, contacts: ['Lucas Brown · Purchasing Manager', 'Sophia Davis · Product Engineer'] }
    ]
  },
  'us-storage-installer': {
    fit: '匹配度 92%',
    subject: '提升住宅储能项目并网交付稳定性的方案建议',
    body: `Hi {{联系人姓名}}，\n\n我们注意到 {{公司名称}} 正在扩展住宅储能安装项目。近期安装商普遍关注并网交付、质保响应和供应稳定性，因此 Lily 建议用“项目稳定性”作为首轮沟通切入。\n\n我们可以提供：\n- 面向安装商的标准化储能组件包\n- 明确的交付排期与备件支持\n- 适用于项目投标的认证与参数资料\n\n如果你正好在评估新的供应合作方，我可以先发一版 1 页方案摘要，供你判断是否值得进一步交流。\n\nBest,\nJohn`,
    summary: '43 家公司 · 126 位联系人',
    audience: [
      { company: 'SunHarbor Installers', signal: '新增安装团队招聘 · 美国西部', contactCount: 35, contacts: ['Daniel Miller · Founder', 'Grace Lee · Operations Manager', 'Henry Clark · Procurement'] },
      { company: 'BrightHome Energy', signal: '网站新增并网服务页', contactCount: 32, contacts: ['Charlotte Lewis · Business Development', 'James Walker · Technical Director'] },
      { company: 'PeakRoof Solar', signal: '近期扩展储能产品线', contactCount: 30, contacts: ['Amelia Young · General Manager', 'Benjamin Hall · Project Lead'] },
      { company: 'WattBridge Residential', signal: '与历史高绩效客户相似度 88%', contactCount: 29, contacts: ['Harper Allen · Partner Manager', 'Mason King · Installation Lead'] }
    ]
  },
  'read-no-reply': {
    fit: '匹配度 89%',
    subject: '补充一个更具体的项目收益测算给你参考',
    body: `Hi {{联系人姓名}}，\n\n上次发给你的资料可能还偏概览。我根据 {{公司名称}} 所在区域和项目类型，补充了一版更具体的收益与交期测算，方便你快速判断是否值得推进。\n\n这次建议你重点看三件事：\n1. 当前项目窗口期内可缩短的确认流程\n2. 预计节省的采购与沟通成本\n3. 相似客户的落地案例与风险点\n\n如果你愿意，我可以直接把测算表发你；也可以按你们当前项目参数再调整一版。\n\n祝好，\nJohn`,
    summary: '18 家公司 · 54 位联系人',
    audience: [
      { company: 'GreenNova Manufacturing', signal: '已读未回 · 停留报价页 2 分钟', contactCount: 14, contacts: ['Ella Moore · Procurement Lead', 'Logan Scott · Plant Manager'] },
      { company: 'Aster Power Components', signal: '打开案例资料 4 次', contactCount: 13, contacts: ['Victoria Adams · Category Manager', 'Jack Turner · Engineer'] },
      { company: 'HelioWorks Europe', signal: '关注 ROI 测算', contactCount: 15, contacts: ['Luna Baker · Commercial Manager', 'Owen Mitchell · Technical Buyer'] },
      { company: 'VectorCell Systems', signal: '上次互动 9 天前', contactCount: 12, contacts: ['Chloe Perez · Operations', 'William Carter · Sourcing'] }
    ]
  }
};

const wendyPreviewPlatforms = {
  LinkedIn: {
    account: '@John Smith',
    badge: 'in',
    avatarClass: 'linkedin',
    mediaClass: 'linkedin',
    icon: 'factory',
    mediaLabel: 'Product launch',
    timeLabel: '立即发布',
    caption: '围绕新品上市生成一条面向海外买家的社媒 Post，突出产品价值、应用场景和访问独立站的行动入口。'
  },
  Instagram: {
    account: '@ontoz.global',
    badge: 'ig',
    avatarClass: 'instagram',
    mediaClass: 'instagram',
    icon: 'image',
    mediaLabel: 'Carousel cover',
    timeLabel: '立即发布',
    caption: '用更强视觉冲击呈现新品细节、应用场景和品牌可信度，引导海外买家收藏并访问独立站了解完整资料。'
  },
  TikTok: {
    account: '@ontoz_lab',
    badge: 'tt',
    avatarClass: 'tiktok',
    mediaClass: 'tiktok',
    icon: 'play',
    mediaLabel: 'Video cover',
    timeLabel: '立即发布',
    caption: '用短视频封面和直接钩子介绍新品亮点，突出测试流程、实际应用场景和快速了解产品资料的入口。'
  },
  YouTube: {
    account: '@OntoZ Shorts',
    badge: 'yt',
    avatarClass: 'youtube',
    mediaClass: 'youtube',
    icon: 'youtube',
    mediaLabel: 'Shorts cover',
    timeLabel: '立即发布',
    caption: '围绕新品应用场景生成一条 Shorts 预告内容，强调核心卖点、画面节奏和引导访问独立站的行动入口。'
  }
};

const wendySocialAccounts = [
  {
    id: 'linkedin',
    platform: 'LinkedIn',
    icon: 'linkedin',
    bound: true,
    account: '@OntoZ Power',
    detail: '用于 B2B 客户案例、行业观点和独立站资料导流。'
  },
  {
    id: 'instagram',
    platform: 'Instagram',
    icon: 'instagram',
    bound: false,
    account: '未绑定账号',
    detail: '用于产品视觉、轮播图和海外项目现场内容。'
  },
  {
    id: 'tiktok',
    platform: 'TikTok',
    icon: 'music-2',
    bound: false,
    account: '未绑定账号',
    detail: '用于短视频、测试流程和工厂场景素材。'
  },
  {
    id: 'x',
    platform: 'X',
    icon: 'x',
    bound: true,
    account: '@ontoz_power',
    detail: '用于新品动态、行业观点和运营公告快速发布。'
  },
  {
    id: 'facebook',
    platform: 'Facebook',
    icon: 'facebook',
    bound: false,
    account: '未绑定账号',
    detail: '绑定后可同步管理品牌主页和海外社群内容。'
  },
  {
    id: 'youtube',
    platform: 'YouTube',
    icon: 'youtube',
    bound: false,
    account: '未绑定账号',
    detail: '绑定后可同步管理 Shorts 内容和视频预告。'
  }
];

const wendyStatusMeta = {
  published: {
    label: '已发布',
    tone: 'published',
    icon: 'circle-check-big',
    action: '查看',
    hint: '内容已发布，历史记录不可修改。'
  },
  scheduled: {
    label: '待发布',
    tone: 'scheduled',
    icon: 'clock-3',
    action: '编辑',
    hint: '已设置发布时间，当前还未到发布时刻。'
  },
  draft: {
    label: '草稿',
    tone: 'draft',
    icon: 'file-pen-line',
    action: '编辑',
    hint: '内容已准备好，但还没有安排发布时间。'
  },
  failed: {
    label: '发布失败',
    tone: 'failed',
    icon: 'circle-alert',
    action: '重新发布',
    hint: '发布未成功，可查看原因并重新发布。'
  }
};

const wendyToday = new Date('2026-07-14T12:00:00+08:00');
const wendyCalendarPosts = [
  {
    id: 'wendy-post-0713-linkedin',
    platform: 'LinkedIn',
    title: '欧洲安装商案例图文',
    time: '2026-07-13T10:00:00',
    copy: '发布欧洲储能安装商案例图文，强调交付稳定性和认证资料完整度。',
    status: 'published'
  },
  {
    id: 'wendy-post-0714-instagram',
    platform: 'Instagram',
    title: '产品细节轮播',
    time: '2026-07-14T09:00:00',
    copy: '展示新一代并网组件的产品细节，附带官网资料下载链接。',
    status: 'published'
  },
  {
    id: 'wendy-post-0714-tiktok-failed',
    platform: 'TikTok',
    title: '工厂测试流程短视频',
    time: '2026-07-14T11:00:00',
    copy: '15 秒工厂测试流程短视频，开头展示高压测试台和质检标签。',
    status: 'failed',
    failureReason: '内容被拒'
  },
  {
    id: 'wendy-post-0715-linkedin',
    platform: 'LinkedIn',
    title: '交付时间线长图',
    time: '2026-07-15T10:30:00',
    copy: '分享项目交付时间线，突出海外安装商能快速获取技术资料。',
    status: 'scheduled'
  },
  {
    id: 'wendy-post-0716-youtube',
    platform: 'YouTube Shorts',
    title: '包装测试 Shorts',
    time: '2026-07-16T16:00:00',
    copy: '发布 30 秒 YouTube Shorts，展示产品包装、测试和出货节点。',
    status: 'scheduled'
  },
  {
    id: 'wendy-post-0717-instagram-failed',
    platform: 'Instagram',
    title: '海外项目现场图',
    time: '2026-07-17T15:00:00',
    copy: '发布海外项目安装现场图，配合热门标签获取自然流量。',
    status: 'failed',
    failureReason: '平台账号失效'
  },
  {
    id: 'wendy-post-0718-instagram',
    platform: 'Instagram',
    title: '安装商合作清单',
    time: '2026-07-18T14:00:00',
    copy: '发布安装商合作清单，说明交付前、中、后的支持动作。',
    status: 'scheduled'
  },
  {
    id: 'wendy-post-draft-linkedin',
    platform: 'LinkedIn',
    title: '采购负责人交付承诺帖',
    time: '',
    copy: '发布一条面向采购负责人的交付承诺帖，附带联系入口。',
    status: 'draft'
  },
  {
    id: 'wendy-post-draft-instagram',
    platform: 'Instagram',
    title: '下周预告图文',
    time: '',
    copy: '发布下周预告图文，展示新素材拍摄计划。',
    status: 'draft'
  },
  {
    id: 'wendy-post-0721-linkedin',
    platform: 'LinkedIn',
    title: '认证资料下载导流',
    time: '2026-07-21T13:30:00',
    copy: '午后发布 LinkedIn 投票，询问海外买家最关注的并网组件指标。',
    status: 'scheduled'
  }
];

const wendyThinkingScript = [
  { type: 'line', text: '正在读取你的社媒诉求和上传素材…' },
  { type: 'line', text: '已确认发布平台和视觉方案，正在锁定生成约束…' },
  { type: 'line', text: '正在识别适合发布的平台、语气和内容长度…' },
  { type: 'layer', text: '第 1 层 · 内容目标' },
  { type: 'line', text: '判断：这条内容适合用新品价值点切入，并导流到独立站资料页' },
  { type: 'layer', text: '第 2 层 · 发布时间' },
  { type: 'line', text: '正在结合本周日历里的最佳发布时间，避开同平台密集发布时段…' },
  { type: 'layer', text: '第 3 层 · 素材与格式' },
  { type: 'line', text: '已生成 LinkedIn 长文、Instagram 轮播和 TikTok 短视频三个方向，正在整理…' }
];

const johnCampaignData = {
  performance: {
    label: '广告1 · 性能卖点',
    metrics: {
      impressions: '37,106',
      clicks: '2,290',
      cost: '$4,842',
      conversions: '229',
      ctr: '6.17%',
      cpa: '$21.14'
    },
    deltas: { impressions: '12%', clicks: '8%', cost: '5%', conversions: '15%' },
    segments: {
      country: [
        { label: 'US', value: '$329.24', color: '#3f7bdd' },
        { label: 'GB', value: '$2,515.67', color: '#5f8ff0' },
        { label: 'DE', value: '$1,359.20', color: '#8fb4f8' },
        { label: 'JP', value: '$637.83', color: '#b9d1fb' }
      ],
      channel: [
        { label: 'Google Search', value: '$2,126.40', color: '#3f7bdd' },
        { label: 'Meta Ads', value: '$1,194.68', color: '#5f8ff0' },
        { label: 'LinkedIn', value: '$986.32', color: '#8fb4f8' },
        { label: 'YouTube', value: '$534.60', color: '#b9d1fb' }
      ],
      audience: [
        { label: '安装商', value: '$1,822.48', color: '#3f7bdd' },
        { label: '批发商', value: '$1,384.21', color: '#5f8ff0' },
        { label: '工程采购', value: '$1,096.17', color: '#8fb4f8' },
        { label: '品牌商', value: '$539.14', color: '#b9d1fb' }
      ]
    }
  },
  retargeting: {
    label: '广告2 · 再营销唤醒',
    metrics: {
      impressions: '18,924',
      clicks: '1,482',
      cost: '$2,618',
      conversions: '164',
      ctr: '7.83%',
      cpa: '$15.96'
    },
    deltas: { impressions: '9%', clicks: '11%', cost: '3%', conversions: '19%' },
    segments: {
      country: [
        { label: 'US', value: '$1,042.80', color: '#3f7bdd' },
        { label: 'GB', value: '$724.16', color: '#5f8ff0' },
        { label: 'DE', value: '$516.92', color: '#8fb4f8' },
        { label: 'AU', value: '$334.12', color: '#b9d1fb' }
      ],
      channel: [
        { label: 'Meta Ads', value: '$1,098.32', color: '#3f7bdd' },
        { label: 'Google Display', value: '$782.44', color: '#5f8ff0' },
        { label: 'YouTube', value: '$472.10', color: '#8fb4f8' },
        { label: 'LinkedIn', value: '$265.14', color: '#b9d1fb' }
      ],
      audience: [
        { label: '访问过报价页', value: '$1,084.62', color: '#3f7bdd' },
        { label: '下载过手册', value: '$746.90', color: '#5f8ff0' },
        { label: '加入过询盘', value: '$512.28', color: '#8fb4f8' },
        { label: '看过案例页', value: '$274.20', color: '#b9d1fb' }
      ]
    }
  },
  launch: {
    label: '广告3 · 新品测试',
    metrics: {
      impressions: '12,760',
      clicks: '824',
      cost: '$1,936',
      conversions: '78',
      ctr: '6.46%',
      cpa: '$24.82'
    },
    deltas: { impressions: '16%', clicks: '6%', cost: '14%', conversions: '7%' },
    segments: {
      country: [
        { label: 'DE', value: '$628.90', color: '#3f7bdd' },
        { label: 'US', value: '$516.26', color: '#5f8ff0' },
        { label: 'NL', value: '$421.74', color: '#8fb4f8' },
        { label: 'JP', value: '$369.10', color: '#b9d1fb' }
      ],
      channel: [
        { label: 'Google Search', value: '$916.64', color: '#3f7bdd' },
        { label: 'LinkedIn', value: '$488.18', color: '#5f8ff0' },
        { label: 'Meta Ads', value: '$314.92', color: '#8fb4f8' },
        { label: 'YouTube', value: '$216.26', color: '#b9d1fb' }
      ],
      audience: [
        { label: '新品兴趣人群', value: '$746.12', color: '#3f7bdd' },
        { label: '竞品关注者', value: '$532.88', color: '#5f8ff0' },
        { label: '储能项目采购', value: '$418.36', color: '#8fb4f8' },
        { label: '行业内容读者', value: '$238.64', color: '#b9d1fb' }
      ]
    }
  }
};

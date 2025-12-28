// 知识库数据

export const knowledgeBase = [
  {
    id: 'wuxing-cycle',
    category: '五行基础',
    title: '五行相生相克',
    content: {
      overview: '五行相生相克是八字分析的基础理论。',
      generation: {
        title: '五行相生',
        order: ['木生火', '火生土', '土生金', '金生水', '水生木'],
        cycle: '木 → 火 → 土 → 金 → 水 → 木（循环）',
        explanation: '相生关系：前一个元素可以产生或促进后一个元素',
        details: [
          '木生火：木干暖生火',
          '火生土：火焚木生土',
          '土生金：土藏矿生金',
          '金生水：金凝结生水',
          '水生木：水润泽生木'
        ],
        coreLogic: '万物循环滋生，生生不息'
      },
      restriction: {
        title: '五行相克',
        order: ['金克木', '木克土', '土克水', '水克火', '火克金'],
        cycle: '金 → 木 → 土 → 水 → 火 → 金（循环）',
        explanation: '相克关系：前一个元素可以克制或削弱后一个元素',
        details: [
          '金克木：刚胜柔',
          '木克土：专胜散',
          '土克水：实胜虚',
          '水克火：众胜寡',
          '火克金：精胜坚'
        ],
        coreLogic: '防止某一元素过盛而失序'
      }
    }
  },
  {
    id: 'tiangan-dizhi-basic',
    category: '基础概念',
    title: '天干地支基础认知',
    content: {
      overview: '天干地支是八字的基本组成元素，掌握它们是学习八字的基础。',
      tiangan: {
        title: '十天干',
        list: ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'],
        yinyang: {
          yang: ['甲', '丙', '戊', '庚', '壬'],
          yin: ['乙', '丁', '己', '辛', '癸']
        },
        wuxing: {
          wood: ['甲', '乙'],
          fire: ['丙', '丁'],
          earth: ['戊', '己'],
          metal: ['庚', '辛'],
          water: ['壬', '癸']
        }
      },
      dizhi: {
        title: '十二地支',
        list: ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'],
        yinyang: {
          yang: ['子', '寅', '辰', '午', '申', '戌'],
          yin: ['丑', '卯', '巳', '未', '酉', '亥']
        },
        wuxing: {
          water: ['子', '亥'],
          earth: ['丑', '辰', '未', '戌'],
          wood: ['寅', '卯'],
          fire: ['巳', '午'],
          metal: ['申', '酉']
        }
      },
      seasonDirection: {
        title: '方位与季节速记',
        items: [
          { season: '春', tiangan: '甲乙', dizhi: '寅卯', direction: '东方', element: '木' },
          { season: '夏', tiangan: '丙丁', dizhi: '巳午', direction: '南方', element: '火' },
          { season: '秋', tiangan: '庚辛', dizhi: '申酉', direction: '西方', element: '金' },
          { season: '冬', tiangan: '壬癸', dizhi: '亥子', direction: '北方', element: '水' },
          { season: '四季', tiangan: '戊己', dizhi: '辰戌丑未', direction: '中央', element: '土' }
        ],
        mnemonic: '甲乙寅卯春东木\n丙丁巳午夏南火\n庚辛申酉秋西金\n壬癸亥子冬北水\n戊己辰戌丑未土\n中央定坤四季藏'
      }
    }
  },
  {
    id: 'tiangan-classification',
    category: '基础概念',
    title: '十天干类象（核心速查）',
    content: {
      overview: '十天干各有其独特的类象，掌握这些类象有助于理解八字含义。',
      items: [
        {
          name: '甲木（阳木｜雷木）',
          wuxing: '木',
          yinyang: '阳',
          images: {
            object: ['大树', '桥梁', '高楼'],
            event: ['房地产', '教育', '建筑'],
            person: ['领导', '师长'],
            body: ['头', '胆', '神经系统']
          }
        },
        {
          name: '乙木（阴木｜风木）',
          wuxing: '木',
          yinyang: '阴',
          images: {
            object: ['花草', '园艺', '门窗'],
            event: ['中介', '印刷', '艺术'],
            person: ['文人', '艺术家'],
            body: ['肝', '四肢']
          }
        },
        {
          name: '丙火（阳火｜太阳）',
          wuxing: '火',
          yinyang: '阳',
          images: {
            object: ['太阳', '舞台', '冶炼'],
            event: ['娱乐', '文书', '航空'],
            person: ['领导', '医生'],
            body: ['眼', '小肠', '心血系统']
          }
        },
        {
          name: '丁火（阴火｜灯烛）',
          wuxing: '火',
          yinyang: '阴',
          images: {
            object: ['灯火', '蜡烛', '厨房'],
            event: ['餐饮', 'IT', '手艺'],
            person: ['女性', '媒人'],
            body: ['心', '眼']
          }
        },
        {
          name: '戊土（阳土｜城墙）',
          wuxing: '土',
          yinyang: '阳',
          images: {
            object: ['山岭', '仓库'],
            event: ['金融', '地产'],
            person: ['财务', '管理者'],
            body: ['胃', '皮肤']
          }
        },
        {
          name: '己土（阴土｜田园）',
          wuxing: '土',
          yinyang: '阴',
          images: {
            object: ['田地', '日用品'],
            event: ['护理', '教育'],
            person: ['服务者'],
            body: ['脾', '腹部']
          }
        },
        {
          name: '庚金（阳金｜斧钺）',
          wuxing: '金',
          yinyang: '阳',
          images: {
            object: ['刀具', '矿山'],
            event: ['军警', '交通'],
            person: ['执法者'],
            body: ['骨', '大肠']
          }
        },
        {
          name: '辛金（阴金｜首饰）',
          wuxing: '金',
          yinyang: '阴',
          images: {
            object: ['珠宝', '针具'],
            event: ['中介', '命理'],
            person: ['女性', '匠人'],
            body: ['肺', '牙齿']
          }
        },
        {
          name: '壬水（阳水｜江河）',
          wuxing: '水',
          yinyang: '阳',
          images: {
            object: ['江河', '港口'],
            event: ['运输', '水务'],
            person: ['母亲', '厨师'],
            body: ['膀胱', '肾']
          }
        },
        {
          name: '癸水（阴水｜雨露）',
          wuxing: '水',
          yinyang: '阴',
          images: {
            object: ['雨水', '泉水'],
            event: ['策划', '调度'],
            person: ['参谋'],
            body: ['肾', '足']
          }
        }
      ]
    }
  },
  {
    id: 'dizhi-classification',
    category: '基础概念',
    title: '十二地支类象（速查）',
    content: {
      overview: '十二地支各有其独特的类象和身体对应。',
      items: [
        { dizhi: '子', element: '水', image: '江河', body: '膀胱' },
        { dizhi: '丑', element: '土', image: '湿土', body: '脾' },
        { dizhi: '寅', element: '木', image: '大树', body: '胆' },
        { dizhi: '卯', element: '木', image: '花草', body: '肝' },
        { dizhi: '辰', element: '土', image: '湿土', body: '胃' },
        { dizhi: '巳', element: '火', image: '烟火', body: '咽喉' },
        { dizhi: '午', element: '火', image: '烈火', body: '眼' },
        { dizhi: '未', element: '土', image: '田园', body: '脾胃' },
        { dizhi: '申', element: '金', image: '矿石', body: '肺' },
        { dizhi: '酉', element: '金', image: '金器', body: '肺' },
        { dizhi: '戌', element: '土', image: '燥土', body: '腿' },
        { dizhi: '亥', element: '水', image: '大水', body: '肾' }
      ]
    }
  },
  {
    id: 'bazi-structure',
    category: '八字基础',
    title: '八字结构核心',
    content: {
      overview: '八字由四柱组成，日柱天干是判断的核心。',
      structure: {
        title: '八字 = 四柱',
        columns: [
          { name: '年柱', description: '出生年份的天干地支' },
          { name: '月柱', description: '出生月份的天干地支' },
          { name: '日柱', description: '出生日期的天干地支，日柱天干为"日元（我）"', highlight: true },
          { name: '时柱', description: '出生时辰的天干地支' }
        ],
        core: '所有判断，以日柱天干为中心'
      }
    }
  },
  {
    id: 'tiangan-dizhi-relations',
    category: '八字基础',
    title: '天干地支关系',
    content: {
      overview: '天干地支之间存在多种关系，这些关系影响八字的分析。',
      tianganHe: {
        title: '天干五合',
        items: [
          { combination: '甲 + 己', result: '土' },
          { combination: '乙 + 庚', result: '金' },
          { combination: '丙 + 辛', result: '水' },
          { combination: '丁 + 壬', result: '木' },
          { combination: '戊 + 癸', result: '火' }
        ],
        mnemonic: '甲己化土乙庚金\n丙辛化水记在心\n丁壬合木同相应\n戊癸合火定乾坤'
      },
      tianganChong: {
        title: '天干相冲',
        items: ['甲 ↔ 庚', '乙 ↔ 辛', '丙 ↔ 壬', '丁 ↔ 癸']
      },
      dizhiHe: {
        title: '地支六合',
        items: [
          { combination: '子丑', result: '合土' },
          { combination: '寅亥', result: '合木' },
          { combination: '卯戌', result: '合火' },
          { combination: '辰酉', result: '合金' },
          { combination: '巳申', result: '合水' },
          { combination: '午未', result: '合土' }
        ]
      },
      dizhiSanHe: {
        title: '地支三合',
        items: [
          { combination: '申子辰', result: '水局' },
          { combination: '巳酉丑', result: '金局' },
          { combination: '寅午戌', result: '火局' },
          { combination: '亥卯未', result: '木局' }
        ]
      },
      dizhiChong: {
        title: '地支相冲',
        items: ['子午', '丑未', '寅申', '卯酉', '辰戌', '巳亥']
      },
      dizhiHai: {
        title: '地支相害',
        items: ['子未', '丑午', '寅巳', '卯辰', '申亥', '酉戌']
      },
      dizhiXing: {
        title: '地支相刑',
        items: [
          { type: '无恩之刑', combination: '寅巳申' },
          { type: '持势之刑', combination: '丑未戌' },
          { type: '无礼之刑', combination: '子卯' },
          { type: '自刑', combination: '辰午酉亥' }
        ]
      }
    }
  },
  {
    id: 'strength-judgment',
    category: '八字基础',
    title: '旺弱判断（最重要）',
    content: {
      overview: '判断日主旺弱是八字分析的核心，采用四步走法。',
      steps: [
        {
          step: 1,
          title: '看月令（≈50%）',
          weight: '50%',
          description: '月柱地支的重要性最高',
          details: [
            '生我 → 得令 → 偏强',
            '克我 → 失令 → 偏弱'
          ]
        },
        {
          step: 2,
          title: '看地支根基（≈30%）',
          weight: '30%',
          description: '日支及其地支的五行支持',
          details: [
            '有根 → 强',
            '无根 → 弱'
          ]
        },
        {
          step: 3,
          title: '看天干帮扶（≈15%）',
          weight: '15%',
          description: '其他天干对日主的支持',
          details: [
            '有生我 / 同我 → 强',
            '多克我 / 泄我 → 弱'
          ]
        },
        {
          step: 4,
          title: '综合判断',
          weight: '5%',
          description: '综合前三步的结果',
          results: [
            '身旺',
            '身弱',
            '专旺',
            '从弱'
          ]
        }
      ]
    }
  },
  {
    id: 'favorable-gods-logic',
    category: '八字基础',
    title: '喜用神逻辑',
    content: {
      overview: '喜用神的核心目标是平衡命局。',
      corePrinciple: '平衡命局',
      principles: [
        {
          condition: '身旺',
          description: '喜用神应该克制、泄耗日主',
          examples: [
            '喜克我（克制日主的五行）',
            '喜泄我（被日主生的五行）',
            '喜耗我（消耗日主能量的五行）'
          ]
        },
        {
          condition: '身弱',
          description: '喜用神应该生助、扶助日主',
          examples: [
            '喜生我（生助日主的五行）',
            '喜同我（与日主同五行的天干）'
          ]
        },
        {
          condition: '专旺 / 从弱',
          description: '需要顺势而为',
          examples: [
            '专旺：继续加强日主',
            '从弱：继续削弱日主'
          ]
        }
      ],
      seasonPriority: {
        title: '季节优先',
        items: [
          { season: '冬', favorable: '喜火' },
          { season: '夏', favorable: '喜金水' },
          { season: '春', favorable: '喜土火金' },
          { season: '秋', favorable: '喜水木' }
        ]
      }
    }
  },
  {
    id: 'app-positioning',
    category: '实用技巧',
    title: 'App的正确定位',
    content: {
      overview: '这个App不是算命工具，而是玄学结构化学习和判断逻辑训练工具。',
      positioning: {
        title: '核心定位',
        description: '玄学结构化学习 + 判断逻辑训练工具',
        features: [
          '系统化学习五行、天干地支基础知识',
          '掌握八字旺弱判断方法',
          '理解喜用神选取逻辑',
          '通过练习提升判断能力',
          '培养结构化思维'
        ],
        notThis: [
          '不是算命App',
          '不是预测工具',
          '不是占卜软件'
        ]
      }
    }
  },
  {
    id: 'bazi-strength',
    category: '八字基础',
    title: '八字旺弱判断方法',
    author: '王彦棠',
    date: '2025/12/21',
    content: {
      overview: '判断日主（出生日天干的五行）的旺弱，是八字分析的基础。日主旺弱决定了喜用神的选取原则。',
      steps: [
        {
          step: 1,
          title: '第一步：月令得失',
          description: '月柱地支的重要性约占50%',
          details: [
            '得令：日主五行与月支五行相同或相生',
            '失令：日主五行与月支五行相克或相冲',
            '例如：日主为木，出生在春季（寅、卯月）为得令；出生在秋季（申、酉月）为失令'
          ]
        },
        {
          step: 2,
          title: '第二步：地支根基',
          description: '日支（日元本身）及其地支的五行支持',
          details: [
            '强根：日支与日主同五行，或有多个同五行地支',
            '弱根/无根：日支与日主不同五行，且缺少同五行地支支持',
            '例如：日主为木，日支为寅或卯，或有多个寅、卯、亥、未等地支为强根'
          ]
        },
        {
          step: 3,
          title: '第三步：天干帮扶',
          description: '其他天干对日主的支持',
          details: [
            '有帮扶：年、月、时干中有与日主同五行或生助日主的天干',
            '无帮扶：年、月、时干中没有与日主同五行或生助日主的天干',
            '例如：日主为木，年干或时干为甲、乙、壬、癸为有帮扶'
          ]
        }
      ],
      specialCases: [
        {
          type: '专旺',
          description: '日主极强，需要顺气（使用生助日主的五行）',
          example: '日主为木，地支全为木，天干也多为木，形成专旺格'
        },
        {
          type: '从弱',
          description: '日主极弱，需要从弱（使用克制日主的五行）',
          example: '日主为木，地支全为金，天干也多为金，形成从弱格'
        }
      ]
    }
  },
  {
    id: 'favorable-gods',
    category: '八字基础',
    title: '喜用神的选取原则',
    author: '王彦棠',
    date: '2025/12/21',
    content: {
      overview: '喜用神的核心目标是平衡八字命盘。根据日主的旺弱，选择不同的喜用神。',
      principles: [
        {
          condition: '身旺（日主强）时',
          description: '喜用神应该克制、泄耗或消耗日主的五行',
          examples: [
            '日主为木（强）：喜用神为金（克我）、火（泄我）、土（耗我）',
            '日主为火（强）：喜用神为水（克我）、土（泄我）、金（耗我）',
            '日主为土（强）：喜用神为木（克我）、金（泄我）、水（耗我）',
            '日主为金（强）：喜用神为火（克我）、水（泄我）、木（耗我）',
            '日主为水（强）：喜用神为土（克我）、木（泄我）、火（耗我）'
          ]
        },
        {
          condition: '身弱（日主弱）时',
          description: '喜用神应该生助或扶助日主的五行',
          examples: [
            '日主为木（弱）：喜用神为水（生我）、木（扶我）',
            '日主为火（弱）：喜用神为木（生我）、火（扶我）',
            '日主为土（弱）：喜用神为火（生我）、土（扶我）',
            '日主为金（弱）：喜用神为土（生我）、金（扶我）',
            '日主为水（弱）：喜用神为金（生我）、水（扶我）'
          ]
        }
      ]
    }
  },
  {
    id: 'supplementary-methods',
    category: '实用技巧',
    title: '补充技巧与方法',
    author: '王彦棠',
    date: '2025/12/21',
    content: {
      overview: '在实际应用中，可以使用以下方法辅助判断和分析。',
      methods: [
        {
          name: 'AI辅助法',
          description: '对于难以判断的复杂情况，可以使用AI工具进行初步分析，然后进行人工验证',
          tips: [
            '输入完整的八字信息（年、月、日、时）',
            '让AI分析日主旺弱',
            '人工验证AI的分析结果',
            '结合实际情况进行调整'
          ]
        },
        {
          name: '季节优先法',
          description: '优先考虑出生季节的气候特点',
          tips: [
            '冬季（亥、子、丑月）出生：火的作用更强，需要调节寒冷',
            '夏季（巳、午、未月）出生：水的作用更强，需要调节炎热',
            '春季（寅、卯、辰月）出生：金的作用可能较弱',
            '秋季（申、酉、戌月）出生：木的作用可能较弱'
          ],
          example: '例如：在寒冷的冬季，即使日主为火，如果整体偏寒，火的作用（调节）会更强'
        }
      ]
    }
  },
  {
    id: 'wuxing-cycle',
    category: '五行基础',
    title: '五行相生相克',
    content: {
      overview: '五行相生相克是八字分析的基础理论。',
      generation: {
        title: '五行相生',
        order: ['木生火', '火生土', '土生金', '金生水', '水生木'],
        cycle: '木 → 火 → 土 → 金 → 水 → 木（循环）',
        explanation: '相生关系：前一个元素可以产生或促进后一个元素'
      },
      restriction: {
        title: '五行相克',
        order: ['金克木', '木克土', '土克水', '水克火', '火克金'],
        cycle: '金 → 木 → 土 → 水 → 火 → 金（循环）',
        explanation: '相克关系：前一个元素可以克制或削弱后一个元素'
      }
    }
  },
  {
    id: 'tiangan-dizhi',
    category: '基础概念',
    title: '天干地支基础',
    content: {
      overview: '天干地支是八字的基本组成元素。',
      tiangan: {
        title: '十天干',
        list: ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'],
        yinyang: {
          yang: ['甲', '丙', '戊', '庚', '壬'],
          yin: ['乙', '丁', '己', '辛', '癸']
        },
        wuxing: {
          wood: ['甲', '乙'],
          fire: ['丙', '丁'],
          earth: ['戊', '己'],
          metal: ['庚', '辛'],
          water: ['壬', '癸']
        }
      },
      dizhi: {
        title: '十二地支',
        list: ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'],
        yinyang: {
          yang: ['子', '寅', '辰', '午', '申', '戌'],
          yin: ['丑', '卯', '巳', '未', '酉', '亥']
        },
        wuxing: {
          water: ['子', '亥'],
          earth: ['丑', '辰', '未', '戌'],
          wood: ['寅', '卯'],
          fire: ['巳', '午'],
          metal: ['申', '酉']
        }
      }
    }
  }
];

// 知识库分类
export const knowledgeCategories = [
  { id: 'all', name: '全部', icon: '📚' },
  { id: '八字基础', name: '八字基础', icon: '🔮' },
  { id: '五行基础', name: '五行基础', icon: '⚡' },
  { id: '基础概念', name: '基础概念', icon: '📖' },
  { id: '实用技巧', name: '实用技巧', icon: '💡' }
];


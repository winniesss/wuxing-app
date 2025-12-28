// 所有关卡和题目数据

export const lessons = [
  {
    id: 1,
    title: "五行相生相克基础",
    description: "记住五行的生克顺序和基本逻辑",
    questions: [
      {
        id: 1,
        type: "single_choice",
        question: "五行中，哪个元素生火？",
        options: ["木", "水", "土", "金"],
        correctAnswer: "木",
        explanation: "木生火，因为木头可以燃烧产生火。"
      },
      {
        id: 2,
        type: "single_choice",
        question: "五行中，火生什么？",
        options: ["木", "水", "土", "金"],
        correctAnswer: "土",
        explanation: "火生土，因为火燃烧后留下灰烬，形成土。"
      },
      {
        id: 3,
        type: "single_choice",
        question: "五行中，哪个元素克木？",
        options: ["火", "水", "土", "金"],
        correctAnswer: "金",
        explanation: "金克木，因为金属工具可以砍伐树木。"
      },
      {
        id: 4,
        type: "single_choice",
        question: "五行中，木克什么？",
        options: ["火", "水", "土", "金"],
        correctAnswer: "土",
        explanation: "木克土，因为树木的根系可以穿透和固定土壤。"
      },
      {
        id: 5,
        type: "fill_in_blank",
        question: "五行相生顺序：木生__，火生__，土生__，金生__，水生__。",
        correctAnswer: "火,土,金,水,木",
        explanation: "五行相生顺序：木→火→土→金→水→木（循环）"
      }
    ]
  },
  {
    id: 2,
    title: "十天干阴阳属性",
    description: "掌握十天干的阴阳分类",
    questions: [
      {
        id: 1,
        type: "single_choice",
        question: "十天干中，哪个是阳干？",
        options: ["甲", "乙", "丁", "己"],
        correctAnswer: "甲",
        explanation: "十天干中，甲、丙、戊、庚、壬为阳干；乙、丁、己、辛、癸为阴干。"
      },
      {
        id: 2,
        type: "single_choice",
        question: "十天干中，哪个是阴干？",
        options: ["甲", "丙", "戊", "己"],
        correctAnswer: "己",
        explanation: "十天干中，甲、丙、戊、庚、壬为阳干；乙、丁、己、辛、癸为阴干。"
      },
      {
        id: 3,
        type: "fill_in_blank",
        question: "十天干中的五个阳干是：__、__、__、__、__。",
        correctAnswer: "甲,丙,戊,庚,壬",
        explanation: "五个阳干：甲、丙、戊、庚、壬"
      },
      {
        id: 4,
        type: "fill_in_blank",
        question: "十天干中的五个阴干是：__、__、__、__、__。",
        correctAnswer: "乙,丁,己,辛,癸",
        explanation: "五个阴干：乙、丁、己、辛、癸"
      },
      {
        id: 5,
        type: "single_choice",
        question: "庚的阴阳属性是？",
        options: ["阳", "阴"],
        correctAnswer: "阳",
        explanation: "庚是阳干，属于甲、丙、戊、庚、壬这五个阳干之一。"
      }
    ]
  },
  {
    id: 3,
    title: "十天干五行属性",
    description: "掌握十天干对应的五行",
    questions: [
      {
        id: 1,
        type: "single_choice",
        question: "甲和乙的五行属性是？",
        options: ["火", "土", "金", "木"],
        correctAnswer: "木",
        explanation: "甲乙属木，甲为阳木，乙为阴木。"
      },
      {
        id: 2,
        type: "single_choice",
        question: "丙和丁的五行属性是？",
        options: ["火", "土", "金", "水"],
        correctAnswer: "火",
        explanation: "丙丁属火，丙为阳火，丁为阴火。"
      },
      {
        id: 3,
        type: "single_choice",
        question: "戊和己的五行属性是？",
        options: ["火", "土", "金", "水"],
        correctAnswer: "土",
        explanation: "戊己属土，戊为阳土，己为阴土。"
      },
      {
        id: 4,
        type: "single_choice",
        question: "庚和辛的五行属性是？",
        options: ["火", "土", "金", "水"],
        correctAnswer: "金",
        explanation: "庚辛属金，庚为阳金，辛为阴金。"
      },
      {
        id: 5,
        type: "single_choice",
        question: "壬和癸的五行属性是？",
        options: ["火", "土", "金", "水"],
        correctAnswer: "水",
        explanation: "壬癸属水，壬为阳水，癸为阴水。"
      },
      {
        id: 6,
        type: "fill_in_blank",
        question: "十天干五行配对：甲乙属__，丙丁属__，戊己属__，庚辛属__，壬癸属__。",
        correctAnswer: "木,火,土,金,水",
        explanation: "甲乙木，丙丁火，戊己土，庚辛金，壬癸水。"
      }
    ]
  },
  {
    id: 4,
    title: "十二地支阴阳属性",
    description: "掌握十二地支的阴阳分类",
    questions: [
      {
        id: 1,
        type: "single_choice",
        question: "十二地支中，哪个是阳支？",
        options: ["子", "丑", "卯", "巳"],
        correctAnswer: "子",
        explanation: "十二地支中，子、寅、辰、午、申、戌为阳支；丑、卯、巳、未、酉、亥为阴支。"
      },
      {
        id: 2,
        type: "single_choice",
        question: "十二地支中，哪个是阴支？",
        options: ["子", "寅", "辰", "丑"],
        correctAnswer: "丑",
        explanation: "十二地支中，子、寅、辰、午、申、戌为阳支；丑、卯、巳、未、酉、亥为阴支。"
      },
      {
        id: 3,
        type: "fill_in_blank",
        question: "十二地支中的六个阳支是：__、__、__、__、__、__。",
        correctAnswer: "子,寅,辰,午,申,戌",
        explanation: "六个阳支：子、寅、辰、午、申、戌"
      },
      {
        id: 4,
        type: "fill_in_blank",
        question: "十二地支中的六个阴支是：__、__、__、__、__、__。",
        correctAnswer: "丑,卯,巳,未,酉,亥",
        explanation: "六个阴支：丑、卯、巳、未、酉、亥"
      },
      {
        id: 5,
        type: "single_choice",
        question: "午的阴阳属性是？",
        options: ["阳", "阴"],
        correctAnswer: "阳",
        explanation: "午是阳支，属于子、寅、辰、午、申、戌这六个阳支之一。"
      }
    ]
  },
  {
    id: 5,
    title: "十二地支五行属性",
    description: "掌握十二地支对应的五行",
    questions: [
      {
        id: 1,
        type: "single_choice",
        question: "寅和卯的五行属性是？",
        options: ["火", "土", "金", "木"],
        correctAnswer: "木",
        explanation: "寅卯属木，寅为阳木，卯为阴木。"
      },
      {
        id: 2,
        type: "single_choice",
        question: "巳和午的五行属性是？",
        options: ["火", "土", "金", "水"],
        correctAnswer: "火",
        explanation: "巳午属火，巳为阴火，午为阳火。"
      },
      {
        id: 3,
        type: "single_choice",
        question: "辰、戌、丑、未的五行属性是？",
        options: ["火", "土", "金", "水"],
        correctAnswer: "土",
        explanation: "辰、戌、丑、未都属土，其中辰戌为阳土，丑未为阴土。"
      },
      {
        id: 4,
        type: "single_choice",
        question: "申和酉的五行属性是？",
        options: ["火", "土", "金", "水"],
        correctAnswer: "金",
        explanation: "申酉属金，申为阳金，酉为阴金。"
      },
      {
        id: 5,
        type: "single_choice",
        question: "子和亥的五行属性是？",
        options: ["火", "土", "金", "水"],
        correctAnswer: "水",
        explanation: "子亥属水，子为阳水，亥为阴水。"
      },
      {
        id: 6,
        type: "fill_in_blank",
        question: "十二地支五行配对：寅卯属__，巳午属__，辰戌丑未属__，申酉属__，子亥属__。",
        correctAnswer: "木,火,土,金,水",
        explanation: "寅卯木，巳午火，辰戌丑未土，申酉金，子亥水。"
      }
    ]
  },
  {
    id: 6,
    title: "综合练习",
    description: "综合运用五行、天干、地支知识",
    questions: [
      {
        id: 1,
        type: "single_choice",
        question: "甲属于什么五行？",
        options: ["木", "火", "土", "金", "水"],
        correctAnswer: "木",
        explanation: "甲属木，且为阳木。"
      },
      {
        id: 2,
        type: "single_choice",
        question: "丁属于什么五行？",
        options: ["木", "火", "土", "金", "水"],
        correctAnswer: "火",
        explanation: "丁属火，且为阴火。"
      },
      {
        id: 3,
        type: "single_choice",
        question: "庚属于什么五行？",
        options: ["木", "火", "土", "金", "水"],
        correctAnswer: "金",
        explanation: "庚属金，且为阳金。"
      },
      {
        id: 4,
        type: "single_choice",
        question: "卯属于什么五行？",
        options: ["木", "火", "土", "金", "水"],
        correctAnswer: "木",
        explanation: "卯属木，且为阴木。"
      },
      {
        id: 5,
        type: "single_choice",
        question: "午属于什么五行？",
        options: ["木", "火", "土", "金", "水"],
        correctAnswer: "火",
        explanation: "午属火，且为阳火。"
      },
      {
        id: 6,
        type: "single_choice",
        question: "根据五行相生，木生什么？",
        options: ["水", "火", "土", "金"],
        correctAnswer: "火",
        explanation: "木生火，这是五行相生的基本规律。"
      },
      {
        id: 7,
        type: "single_choice",
        question: "根据五行相克，金克什么？",
        options: ["木", "火", "土", "水"],
        correctAnswer: "木",
        explanation: "金克木，这是五行相克的基本规律。"
      }
    ]
  },
  {
    id: 7,
    title: "五行相生相克细节",
    description: "掌握五行相生相克的具体原理和逻辑",
    questions: [
      {
        id: 1,
        type: "single_choice",
        question: "木生火的原理是什么？",
        options: ["木干暖生火", "木能燃烧", "木能助火", "木火同源"],
        correctAnswer: "木干暖生火",
        explanation: "木生火：木干暖生火，这是五行相生的基本原理。"
      },
      {
        id: 2,
        type: "single_choice",
        question: "火生土的原理是什么？",
        options: ["火能烧土", "火焚木生土", "火能炼土", "火土相融"],
        correctAnswer: "火焚木生土",
        explanation: "火生土：火焚木生土，火燃烧后留下灰烬，形成土。"
      },
      {
        id: 3,
        type: "single_choice",
        question: "土生金的原理是什么？",
        options: ["土能炼金", "土藏矿生金", "土能产金", "土金同源"],
        correctAnswer: "土藏矿生金",
        explanation: "土生金：土藏矿生金，金属矿物埋藏在土中。"
      },
      {
        id: 4,
        type: "single_choice",
        question: "金生水的原理是什么？",
        options: ["金能化水", "金凝结生水", "金能产水", "金水相融"],
        correctAnswer: "金凝结生水",
        explanation: "金生水：金凝结生水，金属表面会凝结水珠。"
      },
      {
        id: 5,
        type: "single_choice",
        question: "水生木的原理是什么？",
        options: ["水能养木", "水润泽生木", "水能生木", "水木同源"],
        correctAnswer: "水润泽生木",
        explanation: "水生木：水润泽生木，水滋润植物使其生长。"
      },
      {
        id: 6,
        type: "single_choice",
        question: "金克木的原理是什么？",
        options: ["金能砍木", "刚胜柔", "金能断木", "金木相克"],
        correctAnswer: "刚胜柔",
        explanation: "金克木：刚胜柔，金属的刚硬可以克制木材的柔软。"
      },
      {
        id: 7,
        type: "single_choice",
        question: "木克土的原理是什么？",
        options: ["木能破土", "专胜散", "木能穿土", "木土相克"],
        correctAnswer: "专胜散",
        explanation: "木克土：专胜散，树木的根系可以穿透和固定散乱的土壤。"
      },
      {
        id: 8,
        type: "single_choice",
        question: "五行相生的核心逻辑是什么？",
        options: ["相互制约", "万物循环滋生，生生不息", "相互转化", "相互平衡"],
        correctAnswer: "万物循环滋生，生生不息",
        explanation: "五行相生的核心逻辑：万物循环滋生，生生不息。"
      },
      {
        id: 9,
        type: "single_choice",
        question: "五行相克的核心逻辑是什么？",
        options: ["相互促进", "相互转化", "防止某一元素过盛而失序", "相互平衡"],
        correctAnswer: "防止某一元素过盛而失序",
        explanation: "五行相克的核心逻辑：防止某一元素过盛而失序。"
      }
    ]
  },
  {
    id: 8,
    title: "天干地支关系",
    description: "掌握天干五合、相冲，地支六合、三合、相冲、相害、相刑",
    questions: [
      {
        id: 1,
        type: "single_choice",
        question: "甲和己合化为什么？",
        options: ["木", "火", "土", "金"],
        correctAnswer: "土",
        explanation: "甲己化土，这是天干五合之一。"
      },
      {
        id: 2,
        type: "single_choice",
        question: "乙和庚合化为什么？",
        options: ["木", "火", "土", "金"],
        correctAnswer: "金",
        explanation: "乙庚化金，这是天干五合之一。"
      },
      {
        id: 3,
        type: "single_choice",
        question: "丙和辛合化为什么？",
        options: ["木", "火", "土", "水"],
        correctAnswer: "水",
        explanation: "丙辛化水，这是天干五合之一。"
      },
      {
        id: 4,
        type: "single_choice",
        question: "丁和壬合化为什么？",
        options: ["木", "火", "土", "水"],
        correctAnswer: "木",
        explanation: "丁壬合木，这是天干五合之一。"
      },
      {
        id: 5,
        type: "single_choice",
        question: "戊和癸合化为什么？",
        options: ["木", "火", "土", "水"],
        correctAnswer: "火",
        explanation: "戊癸合火，这是天干五合之一。"
      },
      {
        id: 6,
        type: "single_choice",
        question: "天干相冲中，甲和哪个天干相冲？",
        options: ["己", "庚", "辛", "壬"],
        correctAnswer: "庚",
        explanation: "甲庚相冲，这是天干相冲之一。"
      },
      {
        id: 7,
        type: "single_choice",
        question: "子丑合化为什么？",
        options: ["木", "火", "土", "金"],
        correctAnswer: "土",
        explanation: "子丑合土，这是地支六合之一。"
      },
      {
        id: 8,
        type: "single_choice",
        question: "申子辰三合为什么局？",
        options: ["木局", "火局", "金局", "水局"],
        correctAnswer: "水局",
        explanation: "申子辰三合水局，这是地支三合之一。"
      },
      {
        id: 9,
        type: "single_choice",
        question: "巳酉丑三合为什么局？",
        options: ["木局", "火局", "金局", "水局"],
        correctAnswer: "金局",
        explanation: "巳酉丑三合金局，这是地支三合之一。"
      },
      {
        id: 10,
        type: "single_choice",
        question: "寅午戌三合为什么局？",
        options: ["木局", "火局", "金局", "水局"],
        correctAnswer: "火局",
        explanation: "寅午戌三合火局，这是地支三合之一。"
      },
      {
        id: 11,
        type: "single_choice",
        question: "亥卯未三合为什么局？",
        options: ["木局", "火局", "金局", "水局"],
        correctAnswer: "木局",
        explanation: "亥卯未三合木局，这是地支三合之一。"
      },
      {
        id: 12,
        type: "single_choice",
        question: "地支相冲中，子午是什么关系？",
        options: ["相合", "相冲", "相害", "相刑"],
        correctAnswer: "相冲",
        explanation: "子午相冲，这是地支相冲之一。"
      },
      {
        id: 13,
        type: "single_choice",
        question: "无恩之刑是哪三个地支？",
        options: ["子卯", "寅巳申", "丑未戌", "辰午酉亥"],
        correctAnswer: "寅巳申",
        explanation: "无恩之刑：寅巳申，这是地支相刑之一。"
      },
      {
        id: 14,
        type: "fill_in_blank",
        question: "天干五合口诀：甲己化__，乙庚__，丙辛化__，丁壬合__，戊癸合__。",
        correctAnswer: "土,金,水,木,火",
        explanation: "天干五合：甲己化土，乙庚化金，丙辛化水，丁壬合木，戊癸合火。"
      }
    ]
  },
  {
    id: 9,
    title: "方位与季节",
    description: "掌握天干地支与方位、季节的对应关系",
    questions: [
      {
        id: 1,
        type: "single_choice",
        question: "春季对应的天干是？",
        options: ["甲乙", "丙丁", "庚辛", "壬癸"],
        correctAnswer: "甲乙",
        explanation: "春季对应甲乙，方位为东方，五行为木。"
      },
      {
        id: 2,
        type: "single_choice",
        question: "夏季对应的地支是？",
        options: ["寅卯", "巳午", "申酉", "亥子"],
        correctAnswer: "巳午",
        explanation: "夏季对应巳午，方位为南方，五行为火。"
      },
      {
        id: 3,
        type: "single_choice",
        question: "秋季对应的天干是？",
        options: ["甲乙", "丙丁", "庚辛", "壬癸"],
        correctAnswer: "庚辛",
        explanation: "秋季对应庚辛，方位为西方，五行为金。"
      },
      {
        id: 4,
        type: "single_choice",
        question: "冬季对应的地支是？",
        options: ["寅卯", "巳午", "申酉", "亥子"],
        correctAnswer: "亥子",
        explanation: "冬季对应亥子，方位为北方，五行为水。"
      },
      {
        id: 5,
        type: "single_choice",
        question: "中央土对应的天干是？",
        options: ["甲乙", "丙丁", "戊己", "庚辛"],
        correctAnswer: "戊己",
        explanation: "中央土对应戊己，地支为辰戌丑未，四季皆可。"
      },
      {
        id: 6,
        type: "single_choice",
        question: "东方对应的五行是？",
        options: ["木", "火", "土", "金"],
        correctAnswer: "木",
        explanation: "东方对应木，天干为甲乙，地支为寅卯，季节为春。"
      },
      {
        id: 7,
        type: "single_choice",
        question: "南方对应的五行是？",
        options: ["木", "火", "土", "金"],
        correctAnswer: "火",
        explanation: "南方对应火，天干为丙丁，地支为巳午，季节为夏。"
      },
      {
        id: 8,
        type: "fill_in_blank",
        question: "方位季节口诀：甲乙寅卯__东__，丙丁巳午__南__，庚辛申酉__西__，壬癸亥子__北__。",
        correctAnswer: "春,木,夏,火,秋,金,冬,水",
        explanation: "甲乙寅卯春东木，丙丁巳午夏南火，庚辛申酉秋西金，壬癸亥子冬北水。"
      }
    ]
  },
  {
    id: 10,
    title: "十天干类象",
    description: "掌握十天干的物象、事象、人象和身体对应",
    questions: [
      {
        id: 1,
        type: "single_choice",
        question: "甲木的物象不包括？",
        options: ["大树", "桥梁", "高楼", "花草"],
        correctAnswer: "花草",
        explanation: "甲木的物象：大树、桥梁、高楼。花草是乙木的物象。"
      },
      {
        id: 2,
        type: "single_choice",
        question: "乙木的人象主要是？",
        options: ["领导", "文人、艺术家", "医生", "财务"],
        correctAnswer: "文人、艺术家",
        explanation: "乙木的人象：文人、艺术家。"
      },
      {
        id: 3,
        type: "single_choice",
        question: "丙火的身体对应不包括？",
        options: ["眼", "小肠", "心血系统", "肝"],
        correctAnswer: "肝",
        explanation: "丙火的身体对应：眼、小肠、心血系统。肝是乙木的身体对应。"
      },
      {
        id: 4,
        type: "single_choice",
        question: "丁火的事象主要是？",
        options: ["娱乐", "餐饮、IT、手艺", "房地产", "运输"],
        correctAnswer: "餐饮、IT、手艺",
        explanation: "丁火的事象：餐饮、IT、手艺。"
      },
      {
        id: 5,
        type: "single_choice",
        question: "戊土的人象主要是？",
        options: ["文人", "财务、管理者", "艺术家", "参谋"],
        correctAnswer: "财务、管理者",
        explanation: "戊土的人象：财务、管理者。"
      },
      {
        id: 6,
        type: "single_choice",
        question: "己土的身体对应是？",
        options: ["头", "心", "脾、腹部", "骨"],
        correctAnswer: "脾、腹部",
        explanation: "己土的身体对应：脾、腹部。"
      },
      {
        id: 7,
        type: "single_choice",
        question: "庚金的事象主要是？",
        options: ["娱乐", "餐饮", "军警、交通", "策划"],
        correctAnswer: "军警、交通",
        explanation: "庚金的事象：军警、交通。"
      },
      {
        id: 8,
        type: "single_choice",
        question: "辛金的身体对应是？",
        options: ["头", "心", "脾", "肺、牙齿"],
        correctAnswer: "肺、牙齿",
        explanation: "辛金的身体对应：肺、牙齿。"
      },
      {
        id: 9,
        type: "single_choice",
        question: "壬水的人象主要是？",
        options: ["领导", "母亲、厨师", "文人", "财务"],
        correctAnswer: "母亲、厨师",
        explanation: "壬水的人象：母亲、厨师。"
      },
      {
        id: 10,
        type: "single_choice",
        question: "癸水的事象主要是？",
        options: ["娱乐", "餐饮", "运输", "策划、调度"],
        correctAnswer: "策划、调度",
        explanation: "癸水的事象：策划、调度。"
      }
    ]
  },
  {
    id: 11,
    title: "十二地支类象",
    description: "掌握十二地支的类象和身体对应",
    questions: [
      {
        id: 1,
        type: "single_choice",
        question: "子的类象和身体对应是？",
        options: ["江河｜膀胱", "湿土｜脾", "大树｜胆", "花草｜肝"],
        correctAnswer: "江河｜膀胱",
        explanation: "子水：江河｜膀胱。"
      },
      {
        id: 2,
        type: "single_choice",
        question: "寅的类象和身体对应是？",
        options: ["江河｜膀胱", "湿土｜脾", "大树｜胆", "花草｜肝"],
        correctAnswer: "大树｜胆",
        explanation: "寅木：大树｜胆。"
      },
      {
        id: 3,
        type: "single_choice",
        question: "卯的类象和身体对应是？",
        options: ["江河｜膀胱", "湿土｜脾", "大树｜胆", "花草｜肝"],
        correctAnswer: "花草｜肝",
        explanation: "卯木：花草｜肝。"
      },
      {
        id: 4,
        type: "single_choice",
        question: "午的类象和身体对应是？",
        options: ["烟火｜咽喉", "烈火｜眼", "田园｜脾胃", "矿石｜肺"],
        correctAnswer: "烈火｜眼",
        explanation: "午火：烈火｜眼。"
      },
      {
        id: 5,
        type: "single_choice",
        question: "申的类象和身体对应是？",
        options: ["烟火｜咽喉", "烈火｜眼", "田园｜脾胃", "矿石｜肺"],
        correctAnswer: "矿石｜肺",
        explanation: "申金：矿石｜肺。"
      },
      {
        id: 6,
        type: "single_choice",
        question: "酉的类象和身体对应是？",
        options: ["矿石｜肺", "金器｜肺", "燥土｜腿", "大水｜肾"],
        correctAnswer: "金器｜肺",
        explanation: "酉金：金器｜肺。"
      },
      {
        id: 7,
        type: "single_choice",
        question: "亥的类象和身体对应是？",
        options: ["矿石｜肺", "金器｜肺", "燥土｜腿", "大水｜肾"],
        correctAnswer: "大水｜肾",
        explanation: "亥水：大水｜肾。"
      },
      {
        id: 8,
        type: "fill_in_blank",
        question: "十二地支类象速记：子__｜__，丑__｜__，寅__｜__，卯__｜__。",
        correctAnswer: "水,膀胱,土,脾,木,胆,木,肝",
        explanation: "子水｜膀胱，丑土｜脾，寅木｜胆，卯木｜肝。"
      }
    ]
  },
  {
    id: 12,
    title: "八字结构核心",
    description: "掌握八字四柱结构和日柱天干的重要性",
    questions: [
      {
        id: 1,
        type: "single_choice",
        question: "八字由几柱组成？",
        options: ["两柱", "三柱", "四柱", "五柱"],
        correctAnswer: "四柱",
        explanation: "八字由四柱组成：年柱、月柱、日柱、时柱。"
      },
      {
        id: 2,
        type: "single_choice",
        question: "八字判断的核心是什么？",
        options: ["年柱天干", "月柱天干", "日柱天干", "时柱天干"],
        correctAnswer: "日柱天干",
        explanation: "所有判断，以日柱天干为中心，日柱天干为\"日元（我）\"。"
      },
      {
        id: 3,
        type: "single_choice",
        question: "日柱天干在八字中被称为？",
        options: ["年元", "月元", "日元", "时元"],
        correctAnswer: "日元",
        explanation: "日柱天干被称为\"日元（我）\"，是八字分析的核心。"
      },
      {
        id: 4,
        type: "fill_in_blank",
        question: "八字四柱：__柱、__柱、__柱、__柱。",
        correctAnswer: "年,月,日,时",
        explanation: "八字四柱：年柱、月柱、日柱、时柱。"
      }
    ]
  },
  {
    id: 13,
    title: "旺弱判断方法",
    description: "掌握判断日主旺弱的四步走法",
    questions: [
      {
        id: 1,
        type: "single_choice",
        question: "判断日主旺弱的第一步是什么？",
        options: ["看月令", "看地支根基", "看天干帮扶", "综合判断"],
        correctAnswer: "看月令",
        explanation: "第一步：看月令（≈50%），月柱地支的重要性最高。"
      },
      {
        id: 2,
        type: "single_choice",
        question: "月令在旺弱判断中的重要性约占多少？",
        options: ["30%", "50%", "15%", "5%"],
        correctAnswer: "50%",
        explanation: "月令的重要性约占50%，是判断日主旺弱最重要的因素。"
      },
      {
        id: 3,
        type: "single_choice",
        question: "地支根基在旺弱判断中的重要性约占多少？",
        options: ["30%", "50%", "15%", "5%"],
        correctAnswer: "30%",
        explanation: "地支根基的重要性约占30%，是判断日主旺弱的第二步。"
      },
      {
        id: 4,
        type: "single_choice",
        question: "天干帮扶在旺弱判断中的重要性约占多少？",
        options: ["30%", "50%", "15%", "5%"],
        correctAnswer: "15%",
        explanation: "天干帮扶的重要性约占15%，是判断日主旺弱的第三步。"
      },
      {
        id: 5,
        type: "single_choice",
        question: "月令得令意味着什么？",
        options: ["日主偏强", "日主偏弱", "日主平衡", "无法判断"],
        correctAnswer: "日主偏强",
        explanation: "生我 → 得令 → 偏强；克我 → 失令 → 偏弱。"
      },
      {
        id: 6,
        type: "single_choice",
        question: "有根意味着什么？",
        options: ["日主强", "日主弱", "日主平衡", "无法判断"],
        correctAnswer: "日主强",
        explanation: "有根 → 强；无根 → 弱。"
      },
      {
        id: 7,
        type: "single_choice",
        question: "综合判断的结果不包括？",
        options: ["身旺", "身弱", "专旺", "平衡"],
        correctAnswer: "平衡",
        explanation: "综合判断的结果：身旺、身弱、专旺、从弱。"
      },
      {
        id: 8,
        type: "fill_in_blank",
        question: "旺弱判断四步：1.看__（≈50%），2.看__（≈30%），3.看__（≈15%），4.综合判断。",
        correctAnswer: "月令,地支根基,天干帮扶",
        explanation: "四步走法：看月令、看地支根基、看天干帮扶、综合判断。"
      }
    ]
  },
  {
    id: 14,
    title: "喜用神逻辑",
    description: "掌握喜用神的选取原则和季节优先法",
    questions: [
      {
        id: 1,
        type: "single_choice",
        question: "喜用神的核心目标是什么？",
        options: ["增强日主", "削弱日主", "平衡命局", "改变命局"],
        correctAnswer: "平衡命局",
        explanation: "喜用神的核心目标是平衡命局。"
      },
      {
        id: 2,
        type: "single_choice",
        question: "身旺时，喜用神应该？",
        options: ["生我、同我", "克我、泄我、耗我", "顺气", "从弱"],
        correctAnswer: "克我、泄我、耗我",
        explanation: "身旺时，喜用神应该克制、泄耗日主。"
      },
      {
        id: 3,
        type: "single_choice",
        question: "身弱时，喜用神应该？",
        options: ["生我、同我", "克我、泄我、耗我", "顺气", "从弱"],
        correctAnswer: "生我、同我",
        explanation: "身弱时，喜用神应该生助、扶助日主。"
      },
      {
        id: 4,
        type: "single_choice",
        question: "专旺或从弱时，喜用神应该？",
        options: ["生我、同我", "克我、泄我、耗我", "顺势", "平衡"],
        correctAnswer: "顺势",
        explanation: "专旺或从弱时，需要顺势而为。"
      },
      {
        id: 5,
        type: "single_choice",
        question: "冬季出生的人，通常喜什么？",
        options: ["火", "金水", "土火金", "水木"],
        correctAnswer: "火",
        explanation: "冬季：喜火，因为需要调节寒冷。"
      },
      {
        id: 6,
        type: "single_choice",
        question: "夏季出生的人，通常喜什么？",
        options: ["火", "金水", "土火金", "水木"],
        correctAnswer: "金水",
        explanation: "夏季：喜金水，因为需要调节炎热。"
      },
      {
        id: 7,
        type: "single_choice",
        question: "春季出生的人，通常喜什么？",
        options: ["火", "金水", "土火金", "水木"],
        correctAnswer: "土火金",
        explanation: "春季：喜土火金。"
      },
      {
        id: 8,
        type: "single_choice",
        question: "秋季出生的人，通常喜什么？",
        options: ["火", "金水", "土火金", "水木"],
        correctAnswer: "水木",
        explanation: "秋季：喜水木。"
      }
    ]
  }
];


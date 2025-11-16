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
        options: ["丑", "卯", "巳", "未"],
        correctAnswer: "卯",
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
  }
];


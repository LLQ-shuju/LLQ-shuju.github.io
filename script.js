/*
  星语塔罗馆
  - 78 张经典韦特塔罗牌（含真实牌面图片与牌面意象描述）
  - 可视化洗牌动画 + 逐张推牌动画
  - 由使用者自己逐张点击抽牌，全部抽完后统一翻开
  - 解读包含：每张牌的位置解读 + 结合使用者问题的总体解读
  - 四种牌阵：一张牌 / 三张牌时间之流 / 五芒星 / 凯尔特十字
*/

const majorImageMap = {
  "00": "00-TheFool", "I": "01-TheMagician", "II": "02-TheHighPriestess", "III": "03-TheEmpress",
  "IV": "04-TheEmperor", "V": "05-TheHierophant", "VI": "06-TheLovers", "VII": "07-TheChariot",
  "VIII": "08-Strength", "IX": "09-TheHermit", "X": "10-WheelOfFortune", "XI": "11-Justice",
  "XII": "12-TheHangedMan", "XIII": "13-Death", "XIV": "14-Temperance", "XV": "15-TheDevil",
  "XVI": "16-TheTower", "XVII": "17-TheStar", "XVIII": "18-TheMoon", "XIX": "19-TheSun",
  "XX": "20-Judgement", "XXI": "21-TheWorld"
};

const majorArcana = [
  ["00", "愚者", "THE FOOL", "☾", "新开始 · 信任 · 自由", "站在未知的门槛上。允许自己带着好奇迈出第一步，不必等到所有答案都齐备。", "害怕开始、鲁莽行事，或把该承担的责任交给了侥幸。先确认脚下的现实，再保留你的勇气。", "轻装出发；相信过程；保持好奇", "悬崖边迈步的旅人，行囊挂在杖上，白玫瑰在手，小狗在身边跳跃。天空明亮，脚下是未知——这是「出发」本身的画面。"],
  ["I", "魔术师", "THE MAGICIAN", "✦", "意志 · 技能 · 创造", "你已经具备启动这件事所需的资源。聚焦意图，调动手上的能力，让想法从概念落到行动。", "能量分散、言行不一，或用技巧掩盖真实意图。把注意力收回到一个清晰的承诺。", "主动创造；整合资源；清晰表达", "头顶∞符号，桌上摆齐权杖、圣杯、宝剑、星币四元素，一手指天、一手指地——「上下一如」，资源已经齐备。"],
  ["II", "女祭司", "THE HIGH PRIESTESS", "☽", "直觉 · 秘密 · 内在知晓", "答案尚在安静处酝酿。放慢判断，听见直觉和未说出口的信息，让事情自然显形。", "忽视直觉、隐瞒过多，或被模糊讯号牵着走。需要区分内在声音与焦虑的想象。", "暂停观察；相信直觉；保留空间", "端坐于黑白双柱之间，手持卷轴，身后是帷幔与石榴纹样，弯月静卧足边——知识与直觉之间的那片静默。"],
  ["III", "皇后", "THE EMPRESS", "❀", "丰盛 · 滋养 · 感受", "这是让关系、创意或生活渐渐丰饶的时机。照料你珍视的人事物，也允许自己被好好照料。", "过度付出、依赖外界肯定，或舒适感变成停滞。重新设定滋养与界限的平衡。", "接纳丰盛；创造美好；照顾身体", "丰饶原野上戴着星冠的皇后，靠枕绣着金星符号，麦田与流水环绕——大地般丰盛的滋养之力。"],
  ["IV", "皇帝", "THE EMPEROR", "♜", "结构 · 责任 · 稳定", "清晰的边界与稳定的框架正在保护你。以成熟、务实的方式承担责任，建立可持续的秩序。", "控制过严、固执己见，或逃避该担的责任。规则应当服务于生命，而不是使人窒息。", "建立秩序；承担责任；稳住边界", "石座上手持权杖的皇帝，公羊头饰，身后是干燥的赭色山峦——秩序、领土与责任的化身。"],
  ["V", "教皇", "THE HIEROPHANT", "✠", "传统 · 学习 · 信念", "从可靠的知识、师长或共同价值中获得支持。遵循经过验证的方法，也看见它背后的意义。", "教条限制、盲从权威，或价值观正在与群体脱节。允许自己诚实地更新信念。", "寻求指引；尊重经验；校准价值", "双柱之间戴着三重冠的教皇举手赐福，两名学徒跪于阶前——传统与传承之间的桥梁。"],
  ["VI", "恋人", "THE LOVERS", "♡", "选择 · 连结 · 一致", "一段重要的连结或选择来到面前。真正的答案来自价值观是否一致，而不只是眼前的吸引力。", "关系失衡、内外不一，或在选择中回避真实心意。先对自己坦诚，再讨论承诺。", "真诚连结；价值选择；彼此看见", "天使在头顶祝福，亚当与夏娃分立两侧，身后是生命树与智慧树——选择与结合的瞬间。"],
  ["VII", "战车", "THE CHARIOT", "✧", "意志 · 方向 · 前进", "你可以带着不同的力量继续前行。确认方向、握稳缰绳，以自律让热情成为实质进展。", "失去方向、用力过猛，或两股力量彼此拉扯。暂停校正路线，而非一味加速。", "坚定目标；管理冲突；主动前进", "战士立于战车之上，两只斯芬克斯拉着方向相反的车辇，身后是城与水——以意志驾驭分歧。"],
  ["VIII", "力量", "STRENGTH", "♌", "温柔 · 勇气 · 内在力量", "真正的力量不必大声证明。用耐心、善意和稳定的内在面对本能与不安，你会发现自己比想象中更坚韧。", "自我怀疑、压抑情绪，或以强硬替代勇气。给脆弱一点温柔，它会成为力量的一部分。", "温柔坚定；相信自己；安抚本能", "女子温柔地合上狮子的嘴，头顶∞符号，白花与藤蔓缠绕——驯服本能，而不是压制它。"],
  ["IX", "隐者", "THE HERMIT", "☿", "省思 · 寻找 · 独处", "暂时远离噪音，回到自己的灯火旁。独处不是逃避，而是为了听清真正想走的方向。", "孤立自己、过度分析，或把答案推迟在永无止境的寻找中。适时带着所得回到人群。", "向内寻找；沉淀智慧；放慢脚步", "老人提着灯笼站在雪山之巅，灯火中是一颗六角星——独处中寻找内在之光。"],
  ["X", "命运之轮", "WHEEL OF FORTUNE", "◌", "转机 · 循环 · 时机", "局面正在转动，意料之外的变化也带着新的入口。顺势调整，把握眼前出现的时机。", "抗拒变化、重复旧循环，或把一切交给运气。辨认你能选择的那一部分并付诸行动。", "顺应变化；把握时机；看见循环", "轮盘上刻着四个字母，狮、鹰、牛、天使环绕轮周，中央是人面狮身像——变化与循环的法则。"],
  ["XI", "正义", "JUSTICE", "⚖", "真相 · 平衡 · 选择", "以事实、责任与长期影响衡量此事。清楚的选择会带来相应结果，诚实是你最稳的支点。", "逃避后果、判断失衡，或忽略了重要事实。重新审视证据与自己应负的责任。", "如实面对；公平衡量；承担结果", "一手持剑、一手持天平，端坐于紫色帷幔与双柱之间——以真相与责任权衡轻重。"],
  ["XII", "倒吊人", "THE HANGED MAN", "▽", "暂停 · 换位 · 放下", "暂缓推进未必是停滞。换一个视角，放下对立刻结果的执着，新的理解会慢慢出现。", "无谓牺牲、拖延不动，或抗拒必要的放手。区分值得等待与只是害怕改变。", "转换视角；静待明朗；主动放下", "一人被倒吊于T形架上，头上有光环，神情平静——自愿暂停，换一个角度看世界。"],
  ["XIII", "死神", "DEATH", "☠", "结束 · 蜕变 · 更新", "一个阶段已经完成。告别不再适合的模式，腾出空间，让新的生命力能够真正进入。", "抓住过去、不愿结束，或改变被一再延后。温柔地承认失去，更新才会开始。", "完成告别；允许改变；重新生长", "白马上的骑士举着白玫瑰黑旗，国王倒于马前，远方是升起的太阳——结束与新生并存。"],
  ["XIV", "节制", "TEMPERANCE", "⚗", "调和 · 耐心 · 流动", "不同元素正在找到恰当比例。保持节奏、耐心调和，你不必走极端也能走得很远。", "失去节制、步调失衡，或急于求成。回到规律与适量，让身心重新协调。", "保持平衡；循序渐进；整合差异", "天使一脚在水边、一脚在岸上，把水在两个圣杯之间倒换，小径通向远山——调和与流动。"],
  ["XV", "恶魔", "THE DEVIL", "♑", "执着 · 诱惑 · 阴影", "看见使你受困的欲望、恐惧或关系模式。锁链并非不可松开，觉察是重获选择的开始。", "开始松动束缚、识别操控，或仍在否认问题。用具体行动支持你想要的自由。", "识别执着；取回选择；面对阴影", "恶魔站在高台上，锁链松松挂在两个被缚者的颈上——看似困住了你，其实锁可以自己打开。"],
  ["XVI", "高塔", "THE TOWER", "ϟ", "震荡 · 真相 · 重建", "旧有结构正在裂开，可能令人不安，却也让被掩盖的真相重见光亮。先确保安全，再从真实处重建。", "害怕改变而强撑、灾后余震未被处理，或转变正在内部发生。允许必要的调整。", "接受真相；清理旧结构；稳步重建", "闪电击中高塔，王冠坠落，人们从塔上跌落——旧结构崩塌，真相显形。"],
  ["XVII", "星星", "THE STAR", "✧", "希望 · 疗愈 · 信任", "在经历风雨后，温和的希望重新出现。保持真诚与开放，让疗愈、灵感和支持慢慢回流。", "失去信心、疗愈尚未完成，或把愿望停留在空想。照顾微小的希望，并给它行动。", "重拾希望；坦然表达；相信疗愈", "星光下女子跪在池边，把水倒入池中与大地，头顶八颗星——风雨之后的疗愈与希望。"],
  ["XVIII", "月亮", "THE MOON", "☾", "潜意识 · 迷雾 · 感受", "事情并非完全清晰，情绪和潜意识正在发出讯号。不要仓促下结论，带着温柔穿过这段迷雾。", "焦虑放大、误读讯号，或秘密逐渐浮出水面。回到事实与身体感受，别让想象主导。", "容纳未知；辨别感觉；等待清晰", "月光下狗与狼对月而吠，龙虾从水中爬出，两座塔之间是蜿蜒小径——迷雾与潜意识的领域。"],
  ["XIX", "太阳", "THE SUN", "☀", "喜悦 · 清晰 · 生命力", "光照亮了真实。享受成就、坦率表达热情，并让你的生命力感染周围的人。", "短暂阴霾、过度乐观，或快乐需要被重新允许。别否认光，也别忽略该处理的细节。", "拥抱喜悦；坦诚发光；庆祝成果", "孩童骑在白马上，向日葵环绕四周，太阳光芒四射——纯粹的喜悦与生命力。"],
  ["XX", "审判", "JUDGEMENT", "♔", "觉醒 · 回应 · 释怀", "一个召唤正等待你的回应。回顾过去不是为了自责，而是带着清醒与宽恕走向更完整的自己。", "过度自责、害怕被评判，或迟迟不回应内心召唤。放下旧标签，给自己一次更新。", "听见召唤；宽恕过去；做出回应", "天使吹响号角，人们从棺中站起，远方是山与海——觉醒、回应与宽恕的召唤。"],
  ["XXI", "世界", "THE WORLD", "◉", "完成 · 整合 · 圆满", "一个重要循环来到圆满。整合一路所得，庆祝完成，并以更完整的自己走向下一个章节。", "未竟之事、缺少收尾，或害怕跨进下一阶段。补上最后一小步，让循环真正完成。", "庆祝完成；整合经验；开启新章", "舞者被月桂花环环绕，四角是象征四元素的四活物——一个循环抵达完整。"],
].map(([number, name, english, symbol, essence, upright, reversed, keywords, imagery]) => ({
  id: `major-${number}`,
  group: "major",
  number,
  name,
  english,
  symbol,
  essence,
  upright,
  reversed,
  keywords,
  imagery,
  image: `${majorImageMap[number]}.png`
}));

// 小阿尔克那的数字牌义会结合花色主题，形成每一张牌的具体解释。
const ranks = [
  ["ACE", "王牌", "一颗种子正在萌芽", "新的可能被点亮。把最初的冲动当作邀请，给它一个真实的开始。", "机会尚未被接住，或热情还停在想象中。先给愿望一点实际空间。", "开端 · 潜能 · 种子"],
  ["TWO", "二", "在两种力量之间寻找平衡", "你正在衡量选择与关系。保持弹性，在变动中找到适合自己的节奏。", "犹豫、拉扯或失去平衡。别同时扛下所有事，先决定最优先的一项。", "选择 · 平衡 · 协调"],
  ["THREE", "三", "连接带来成长与展开", "协作、交流或共同庆祝会让事情更丰盛。让他人看见你的过程。", "合作不顺、心意难通，或快乐被压抑。诚实沟通，重新确认彼此的期待。", "成长 · 合作 · 展开"],
  ["FOUR", "四", "稳定感需要被珍惜与审视", "先稳住已有的基础。休息、守护或巩固都能为下一步储备力量。", "僵化、防卫过度，或稳定感正在松动。松开不必要的控制，保持流动。", "稳定 · 休整 · 守护"],
  ["FIVE", "五", "一次考验正在改变原有秩序", "不适感揭示了需要调整的地方。承认困难，并主动寻找能获得的支持。", "冲突余波、逃避失落，或开始走出困境。让修复发生，不必独自承受。", "挑战 · 变化 · 调整"],
  ["SIX", "六", "给予与接收正在重新流动", "过去的努力正在带来回应。以感恩看待支持，也让善意在关系中平衡流动。", "付出失衡、停留在过去，或难以接受帮助。检查交换是否仍然公平。", "流动 · 支持 · 回馈"],
  ["SEVEN", "七", "暂停评估，选择更聪明的策略", "别只凭惯性前进。观察成果与环境，调整策略后再投入真正重要的战场。", "方向混乱、过度防备，或回报延迟令人动摇。厘清优先级，减少无效消耗。", "评估 · 策略 · 耐心"],
  ["EIGHT", "八", "持续前进需要专注与练习", "把注意力放回眼前的路。专注、练习或一个果断决定，会使能量再次流动。", "卡在原地、害怕前行，或练习失去方法。拆小下一步，让行动重新启动。", "专注 · 推进 · 熟练"],
  ["NINE", "九", "成果临近，也提醒你回望内在", "你已走过大半路程。享受所拥有的成果，同时照顾好边界与内在满足。", "疲惫、孤立或期待落空。不要把坚持等同硬撑，允许自己补充能量。", "收获 · 韧性 · 自省"],
  ["TEN", "十", "一个循环来到压力或圆满的顶点", "事情发展到了完整的阶段。看见承担与收获，并决定哪些该交接、哪些值得庆祝。", "负担过重、结局延迟，或圆满背后有未说的压力。释放不属于你的责任。", "完成 · 顶点 · 交接"],
  ["PAGE", "侍从", "新的讯息带着好奇而来", "保持学习者的心态。一个消息、灵感或尝试正在邀请你以轻盈的方式探索。", "讯息不清、缺乏行动，或敏感变成不安。回到好奇与简单的第一步。", "消息 · 学习 · 好奇"],
  ["KNIGHT", "骑士", "一股行动能量正在靠近", "适合推进、表达或追随召唤。带着热情行动，同时让方向比速度更重要。", "冲动失控、迟迟不动，或行动缺少承诺。校准动机，再把力气用在正确方向。", "行动 · 追寻 · 动力"],
  ["QUEEN", "王后", "成熟的感受与能力正在滋养环境", "以从容、理解与自信回应局面。相信你的经验，也让关怀有清晰边界。", "过度照顾、情绪内耗，或压低自己的价值。先照顾好自己，再谈给予。", "成熟 · 滋养 · 自信"],
  ["KING", "国王", "你正在以成熟的方式掌握局面", "运用判断、经验和责任感，为事情定下可靠的方向。稳定不等于冷漠。", "控制欲、僵化，或责任被搁置。以公正而非权力感来带领自己与他人。", "领导 · 责任 · 掌握"]
];

const suits = [
  { key: "wands", file: "Wands", name: "权杖", english: "WANDS", symbol: "♨", theme: "行动、热情与创造力", introduction: "在行动与热情的领域，", reversal: "当行动能量受阻时，", keywords: "热情 · 行动 · 创造" },
  { key: "cups", file: "Cups", name: "圣杯", english: "CUPS", symbol: "♧", theme: "情感、关系与直觉", introduction: "在情感与关系的领域，", reversal: "当情绪与关系失衡时，", keywords: "情感 · 关系 · 直觉" },
  { key: "swords", file: "Swords", name: "宝剑", english: "SWORDS", symbol: "†", theme: "思考、沟通与真相", introduction: "在思考与沟通的领域，", reversal: "当心智与沟通卡住时，", keywords: "思考 · 真相 · 决断" },
  { key: "pentacles", file: "Pentacles", name: "星币", english: "PENTACLES", symbol: "✶", theme: "资源、身体与现实成果", introduction: "在现实资源与成果的领域，", reversal: "当现实层面的安全感波动时", keywords: "资源 · 身体 · 成果" }
];

// 每张小阿尔克那牌对应的经典韦特牌面意象
const minorImagery = {
  "wands-ace": "云中伸出一只手，执着一株刚发芽的权杖，星火飘落，远山在望——创造的种子已被点燃。",
  "wands-two": "红衣人站在城垛上，手握地球仪，望向远方的海——在安稳与远方之间做出选择。",
  "wands-three": "人立于高处，望着归航的船，两根权杖立在身边——远望中的等待与扩张。",
  "wands-four": "四根权杖搭成拱门，花环缠绕其上，人们在下方欢庆——稳固的家园与庆祝。",
  "wands-five": "五个年轻人挥动权杖混战——竞争、摩擦与混乱的能量。",
  "wands-six": "骑士头戴桂冠、手持权杖凯旋，人群向他欢呼——胜利与被认可。",
  "wands-seven": "人挥动权杖，抵挡下方袭来的六根权杖——以一敌众的坚守与反击。",
  "wands-eight": "八根权杖在天空中飞驰，河流与田野在下方延伸——消息与行动正迅速到来。",
  "wands-nine": "受伤的人拄杖而立，身后九根权杖如栅栏——警惕与坚持。",
  "wands-ten": "人抱着一大捆权杖艰难前行，远方是村庄——负担过重与责任的重量。",
  "wands-page": "少年手握权杖站在沙地上，望着远方——带着热情去探索世界。",
  "wands-knight": "骑士策马举杖，荒漠扬起沙尘，权杖顶端的嫩芽在风中——带着热情冲锋。",
  "wands-queen": "王后手持权杖坐于狮座，向日葵环绕，黑猫伏在脚边——热情而自信的成熟。",
  "wands-king": "国王手持开花的权杖坐于狮座，蜥蜴在脚边——有远见、有胆识的领导者。",
  "cups-ace": "云中手托圣杯，杯中涌出五道水流，白鸽衔着圆饼降下——情感与灵感的源头。",
  "cups-two": "两人面对面举杯相碰，头顶是双翼狮与墨丘利之杖——平等而真诚的情感连结。",
  "cups-three": "三位女子举杯共舞，果实与花朵环绕——庆祝、友谊与分享。",
  "cups-four": "树下的人对眼前三只圣杯无动于衷，云中递来第四只——对身边的机会视而不见。",
  "cups-five": "披黑斗篷的人低头看着三只翻倒的圣杯，身后两只仍立着——在失落中忽略了尚存的。",
  "cups-six": "孩童在花园中把盛满白花的圣杯递给他人——纯真的给予与怀旧的温暖。",
  "cups-seven": "云中七只圣杯盛着不同的幻象——选择太多，或沉溺于想象。",
  "cups-eight": "人转身离开叠好的八只圣杯，走向远山与河流——放下既有，追寻更深的意义。",
  "cups-nine": "人坐在桌后，面前排成拱形的九只圣杯——满足、享受与愿望的达成。",
  "cups-ten": "彩虹下十只圣杯排列，一家人在原野上张开双臂——情感圆满与家庭的幸福。",
  "cups-page": "少年双手捧杯，凝视杯中跃出的小鱼——聆听内心的灵感与讯息。",
  "cups-knight": "骑士策马缓行，双手捧杯，河流蜿蜒而过——带着情感的追寻与邀请。",
  "cups-queen": "王后坐在海边石凳上，凝视手中华丽的圣杯——深情、直觉而富有感受力的成熟。",
  "cups-king": "国王坐于海中的王座，手持圣杯，鱼跃于浪间——情感成熟、有同情心的掌控者。",
  "swords-ace": "云中双手持剑，剑尖穿过王冠与橄榄枝——真相劈开迷雾，带来清晰的决断。",
  "swords-two": "蒙眼女子双剑交叉于胸前，身后是海与月——自我防卫式的静止与僵持。",
  "swords-three": "三把剑刺穿一颗红心，背景是风雨——心痛、真相与必要的割舍。",
  "swords-four": "骑士雕像般躺在教堂石棺上，三剑在旁、一剑悬空——休整、静养与暂停。",
  "swords-five": "胜利者抱走三把剑，败者垂首退去——赢了争执，却输了关系。",
  "swords-six": "船夫载人渡向平静的彼岸，水中六剑直立——离开动荡，驶向疗愈。",
  "swords-seven": "人蹑手蹑脚抱走五把剑，身后是营地——策略、偷取或悄悄撤离。",
  "swords-eight": "蒙眼女子被八把剑围绕，却并未被真正捆绑——困局里其实有出口。",
  "swords-nine": "人深夜坐在床沿双手掩面，背后九把剑——焦虑、失眠与内心的煎熬。",
  "swords-ten": "一人俯卧于地，背后插着十把剑，远方天光渐亮——痛苦的尽头，也是新的一天。",
  "swords-page": "少年举剑，风中云涌——机敏的观察、新的消息与警觉。",
  "swords-knight": "骑士举剑疾驰，云翻风急——迅捷果决，但需要留意鲁莽。",
  "swords-queen": "王后一手持剑、一手前伸，端坐于云上——清醒、独立而直率的判断。",
  "swords-king": "国王持剑端坐，蓝袍紫帷，神情威严——以理性与规则公正裁决。",
  "pentacles-ace": "云中手托星币，下方是花园与拱门——一份实实在在的机会落地。",
  "pentacles-two": "舞者双足轻快地平衡两枚星币，身后海浪起伏——在变化中保持平衡。",
  "pentacles-three": "教堂中工匠与修士、建筑师共同研看图纸——专业协作，技艺成型。",
  "pentacles-four": "人紧紧抱住一枚星币，另两枚踩在脚下——固守、占有与安全感。",
  "pentacles-five": "风雪中两人跛行经过教堂的彩窗——匮乏、困顿与来自外界的帮助。",
  "pentacles-six": "商人手持天平施予，两个乞丐跪在脚边——给予与接受之间的平衡。",
  "pentacles-seven": "农夫倚杖凝望藤上成熟的星币——等待收成时的评估与耐心。",
  "pentacles-eight": "工匠伏案专心雕刻第八枚星币——专注投入，磨炼技艺。",
  "pentacles-nine": "华服女子独立于葡萄园，手腕停着一只鹰——自足、优雅与丰盛的成果。",
  "pentacles-ten": "拱门下老人与狗，夫妇相伴，孩童嬉戏——家族基业与代际传承。",
  "pentacles-page": "少年双手捧着星币，立于花田之中——认真对待一份新机会。",
  "pentacles-knight": "骑士勒马立于田间，凝视手中的星币——稳健、务实的推进。",
  "pentacles-queen": "王后坐于花园，脚边是星币，兔子伏在裙旁——务实而丰盛的滋养。",
  "pentacles-king": "国王坐于葡萄园石座，手持权杖与星币，公牛在旁——富足而稳固的掌控。"
};

const minorArcana = suits.flatMap(suit => ranks.map(([rank, rankName, essence, upright, reversed, keywords], rankIndex) => {
  const id = `${suit.key}-${rank.toLowerCase()}`;
  const number = String(rankIndex + 1).padStart(2, "0");
  return {
    id,
    group: suit.key,
    number: rank,
    name: `${suit.name}${rankName}`,
    english: `${rank} OF ${suit.english}`,
    symbol: suit.symbol,
    essence: `${suit.theme}中的${essence}`,
    upright: `${suit.introduction}${upright}`,
    reversed: `${suit.reversal}${reversed}`,
    keywords: `${keywords} · ${suit.keywords}`,
    imagery: minorImagery[id],
    image: `${suit.file}${number}.png`
  };
}));

const tarotCards = [...majorArcana, ...minorArcana];

const spreads = {
  single: {
    name: "一张牌 · 当下指引",
    count: 1,
    positions: ["当下指引"],
    positionDescs: ["你此刻的能量、课题或值得留意之处"],
    instruction: "选择牌阵、写下问题，然后洗牌并抽取一张指引。"
  },
  three: {
    name: "三张牌 · 时间之流",
    count: 3,
    positions: ["过去", "现在", "未来倾向"],
    positionDescs: ["形成现况的经验、惯性或起点", "正发生的核心状态与可用资源", "若沿着当前路径前行，可能显现的发展"],
    instruction: "洗牌后依序点击牌面抽牌，翻牌后看看过去、现在与未来倾向的线索。"
  },
  cross: {
    name: "五芒星 · 深度探索",
    count: 5,
    positions: ["核心", "阻力", "根源", "资源", "行动"],
    positionDescs: ["议题真正的重心", "当前的挑战或盲点", "事情深层的动因", "能支持你的力量", "下一步最有益的方向"],
    instruction: "洗牌后依序点击牌面抽牌，从五个角度看见这件事的完整轮廓。"
  },
  celtic: {
    name: "凯尔特十字 · 全局脉络",
    count: 10,
    positions: ["现状", "挑战", "根基", "过去", "目标", "未来走向", "自我认知", "环境影响", "希望与恐惧", "最终结果"],
    positionDescs: ["问题此刻的核心状态", "横在你面前的挑战或阻力", "问题的深层根基与由来", "形成现状的过去经验", "你意识中的目标与期待", "短期内可能出现的走向", "你如何看待自己", "周围环境与他人带来的影响", "你隐藏的希望与恐惧", "沿着当下路径的最终结果"],
    instruction: "洗牌后依序点击牌面抽牌，从十字到纵列，梳理这件事的完整脉络。"
  }
};

// 交互状态机：idle → shuffling → dealing → drawing → revealing → revealed
let activeSpread = "single";
let activeReading = [];
let flowState = "idle";
let drawnCount = 0;

const drawButton = document.querySelector("#drawButton");
const resetButton = document.querySelector("#resetButton");
const drawInstruction = document.querySelector("#drawInstruction");
const drawProgress = document.querySelector("#drawProgress");
const questionInput = document.querySelector("#questionInput");
const emptyReading = document.querySelector("#emptyReading");
const cardsStage = document.querySelector("#cardsStage");
const celticStage = document.querySelector("#celticStage");
const interpretation = document.querySelector("#interpretation");
const cardLibrary = document.querySelector("#cardLibrary");
const deckStack = document.querySelector("#deckStack");
const shuffleFan = document.querySelector("#shuffleFan");

// Fisher–Yates 洗牌保证每张牌在一次抽取中出现的机会相同。
function shuffledCards(cards) {
  const deck = [...cards];
  for (let index = deck.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [deck[index], deck[randomIndex]] = [deck[randomIndex], deck[index]];
  }
  return deck;
}

// 三面结构：外层透视、中层旋转、前后两个面（牌背设计 / 牌面图案）
// 注意：牌面图案使用 background-image 而非 <img>，以规避 Chrome 在
// backface-visibility 3D 面内不绘制 img 的渲染缺陷。
function createCard3D(card, flipped = false) {
  return `
    <span class="card-3d ${flipped ? "is-flipped" : ""}">
      <span class="card-inner">
        <span class="card-face card-face-back"><span>✦</span><b>ARCANA</b><span>✦</span></span>
        <span class="card-face card-face-front">
          <span class="card-art" role="img" aria-label="${card.name}" style="background-image:url('images/${card.image}')"></span>
          <span class="fallback-symbol">${card.symbol}</span>
        </span>
      </span>
    </span>`;
}

// 图片加载失败时，回退显示该牌的花色符号
document.addEventListener("error", event => {
  const target = event.target;
  if (target.tagName === "IMG" && (target.closest(".card-face-front") || target.closest(".interpretation-art") || target.closest(".library-img"))) {
    target.style.display = "none";
  }
}, true);

// 推牌动画参数：每张牌从牌堆方向滑向自己的牌位
function dealVars(index, count) {
  const wide = count > 5;
  return {
    x: -(wide ? 200 : 260) - Math.random() * 150,
    y: 90 + Math.random() * 110,
    rot: Math.round(Math.random() * 26 - 13),
    delay: index * (wide ? 0.22 : 0.36)
  };
}

function createDealWrap(card3d, index, count) {
  const vars = dealVars(index, count);
  return `<span class="deal-wrap" style="--deal-x:${vars.x}px;--deal-y:${vars.y}px;--deal-rot:${vars.rot}deg;animation-delay:${vars.delay}s">${card3d}</span>`;
}

function renderDrawnCards() {
  cardsStage.className = activeReading.length === 5 ? "cards-stage is-five" : "cards-stage";
  cardsStage.innerHTML = activeReading.map((entry, index) => `
    <div class="drawn-card ${entry.reversed ? "will-reverse" : ""}" data-reading-index="${index}">
      <button type="button" data-reading-index="${index}" aria-label="抽取第 ${index + 1} 张牌：${spreads[activeSpread].positions[index]}">
        ${createDealWrap(createCard3D(entry.card), index, activeReading.length)}
        <label>${spreads[activeSpread].positions[index]}</label>
        <small class="card-state">尚未翻开</small>
      </button>
      <span class="draw-badge" aria-hidden="true">已取</span>
    </div>`).join("");
  cardsStage.hidden = false;
}

function renderCelticStage() {
  celticStage.innerHTML = `
    <div class="celtic-layout">
      ${activeReading.map((entry, index) => `
        <div class="celtic-card p${index + 1} ${entry.reversed ? "will-reverse" : ""}" data-reading-index="${index}">
          <button type="button" data-reading-index="${index}" aria-label="抽取第 ${index + 1} 张牌：${spreads[activeSpread].positions[index]}">
            <span class="celtic-badge">${index + 1}</span>
            ${createDealWrap(createCard3D(entry.card), index, activeReading.length)}
            <small class="card-state">${spreads[activeSpread].positions[index]}</small>
          </button>
          <span class="draw-badge" aria-hidden="true">已取</span>
        </div>`).join("")}
    </div>`;
  celticStage.hidden = false;
}

const suitTips = {
  wands: "权杖牌强调行动与热情：它在提醒你主动迈出一步，把想法变成行动。",
  cups: "圣杯牌强调情感与关系：它在邀请你诚实面对自己的感受。",
  swords: "宝剑牌强调思考与真相：它在提醒你看清事实、把话说清楚。",
  pentacles: "星币牌强调现实与成果：它在提示你把注意力放回身体、金钱与具体行动。",
  major: "大阿尔克那描绘人生的大课题：它常常标志着一个重要的阶段与转变。"
};

function tipFor(card, position) {
  return `${suitTips[card.group]}在「${position}」这个位置，试着问自己：它和当下处境最呼应的，是哪一点？`;
}

function escapeHtml(text) {
  return text.replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));
}

function cardReadingHtml(entry, index, positionOverride) {
  const card = entry.card;
  const position = positionOverride || spreads[activeSpread].positions[index];
  const positionDesc = positionOverride ? "" : spreads[activeSpread].positionDescs[index];
  const topicKey = detectTopic(questionInput.value.trim());
  const application = topicKey ? topicApplication[topicKey] : topicApplication._generic;
  const lens = application.lens[card.group] || application.lens.major;
  const askSentence = (entry.reversed ? application.askReversed : application.askUpright).replace("{essence}", card.essence);
  const framing = positionOverride
    ? `${lens}`
    : `在「${position}」位置（${positionDesc}），${lens}`;
  return `
    <article class="card-reading" id="card-reading-${index}" data-reading-index="${index}">
      <div class="interpretation-art ${entry.reversed ? "is-reversed" : ""}">
        <img src="images/${card.image}" alt="${card.name}">
        <span class="fallback-symbol">${card.symbol}</span>
      </div>
      <div class="interpretation-text">
        <span class="reading-label">${String(index + 1).padStart(2, "0")} · ${position}</span>
        <h3>${card.name} <small>${card.english}</small></h3>
        <span class="orientation">${entry.reversed ? "逆位 · 需要回看的讯息" : "正位 · 正在流动的能量"}</span>
        <p class="keywords">${card.keywords}</p>
        <div class="card-question">
          <strong>结合你的问题 · ${topicKey ? topicProfiles[topicKey].label : "当下处境"}</strong>
          <p>${framing}。${askSentence}</p>
          <p class="card-reflect">${application.reflect}</p>
        </div>
        <p><strong>牌面意象：</strong>${card.imagery}</p>
        <p><strong>牌面主题：</strong>${card.essence}。</p>
        <p><strong>${entry.reversed ? "逆位提示" : "正位提示"}：</strong>${entry.reversed ? card.reversed : card.upright}</p>
      </div>
    </article>`;
}

function readingColumns(count) {
  if (count === 1) return "is-single";
  return "is-two";
}

function renderInterpretations() {
  const spread = spreads[activeSpread];
  interpretation.innerHTML = `
    <section class="interpretation-head">
      <p class="eyebrow">YOUR READING · ${spread.name}</p>
      <h2>你的解读</h2>
    </section>
    ${buildOverallReading()}
    <section class="per-card-section">
      <h3>每一张牌 · 位置解读</h3>
      <div class="per-card-readings ${readingColumns(activeReading.length)}">
        ${activeReading.map((entry, index) => cardReadingHtml(entry, index)).join("")}
      </div>
    </section>`;
  interpretation.hidden = false;
  setTimeout(() => interpretation.scrollIntoView({ behavior: "smooth", block: "start" }), 420);
}

function highlightInterpretation(index) {
  const block = document.querySelector(`#card-reading-${index}`);
  if (!block) return;
  block.scrollIntoView({ behavior: "smooth", block: "center" });
  block.classList.remove("is-highlighted");
  void block.offsetWidth;
  block.classList.add("is-highlighted");
}

/* ===== 总体解读：结合使用者问题的综合解读 ===== */
const suitElement = { wands: "火", cups: "水", swords: "风", pentacles: "土" };

const elementProfiles = {
  "火": {
    on: "火元素（权杖）占了主导：这件事由行动力与热情驱动，推动它的关键，是把想法变成看得见的行动。",
    present: "火元素（权杖）带来行动与创造的能量，提醒你别停在想法里，要让热情找到实际的出口。",
    absent: "牌阵中几乎没有火元素（权杖）：行动能量可能偏弱，先从小小的行动开始，让热情重新流动起来。"
  },
  "水": {
    on: "水元素（圣杯）占了主导：情感与直觉是理解这件事的钥匙，你的感受里藏着重要的信息。",
    present: "水元素（圣杯）带来情感与直觉的深度，留意关系里未被说出的感受。",
    absent: "牌阵中几乎没有水元素（圣杯）：你或许正过度用头脑处理这件事，忽略了情绪发出的信号。"
  },
  "风": {
    on: "风元素（宝剑）占了主导：思考与沟通正在塑造这件事的走向，把话说清楚、把事想透彻是关键。",
    present: "风元素（宝剑）带来清醒与沟通的能量，真相与对话会推动事情前进。",
    absent: "牌阵中几乎没有风元素（宝剑）：这件事可能缺少清晰的沟通与理性梳理，试着把问题写下来、讲明白。"
  },
  "土": {
    on: "土元素（星币）占了主导：现实基础、资源与身体是这件事的支点，务实与耐心比一时热情更重要。",
    present: "土元素（星币）带来踏实与成果的能量，把注意力放回可衡量的现实步骤。",
    absent: "牌阵中几乎没有土元素（星币）：这件事需要更落到实处的规划，检查资源、时间与身体能否支撑。"
  }
};

const topicProfiles = {
  career: {
    label: "事业与行动",
    keys: ["事业", "工作", "职业", "职场", "创业", "跳槽", "升职", "加薪", "老板", "同事", "公司", "项目", "生意", "转行", "面试", "offer"],
    intro: "这是一次关于事业与行动方向的探索：牌面更关心你「如何推进、如何选择下一步」，而不是给你一个定死的结论。",
    advice: "把收获落回一个可执行的小行动：先明确优先级，再用稳定的节奏建立看得见的成果。涉及重大职业决定时，请结合现实信息再做最终判断。"
  },
  study: {
    label: "学业与成长",
    keys: ["学业", "学习", "考试", "考研", "留学", "成绩", "论文", "毕业", "读书", "升学", "复习"],
    intro: "这是一次关于学业与成长的询问：牌面更关注你的状态与准备方式，提醒你把心力放在过程与方法上。",
    advice: "把解读转化为学习节奏的调整：设定可完成的阶段性目标，用复盘代替焦虑。专业建议请以导师与官方信息为准。"
  },
  love: {
    label: "情感与关系",
    keys: ["爱情", "感情", "恋爱", "婚姻", "伴侣", "前任", "复合", "分手", "暧昧", "对象", "结婚", "喜欢", "心动", "离婚", "表白", "追求"],
    intro: "这是一次关于情感与关系的询问：牌面映照的是你在关系中的感受、需要与盲点，帮助你更诚实地面对自己。",
    advice: "把讯息带回现实沟通：先确认自己的真实感受与期待，再用真诚的对话代替猜测。关系中的重要决定，请尊重双方的现实节奏。"
  },
  family: {
    label: "家庭与亲缘",
    keys: ["家庭", "家人", "父母", "亲子", "孩子", "婆媳", "亲戚"],
    intro: "这是一次关于家庭与亲缘的询问：牌面更多呈现你在家庭角色中的位置、责任，以及需要被照料的感受。",
    advice: "把收获用于改善相处方式：先安顿自己的情绪边界，再以温和的沟通处理家庭议题。重大家庭决策请与家人充分商量。"
  },
  money: {
    label: "资源与财务",
    keys: ["钱", "财运", "收入", "投资", "理财", "金钱", "财务", "负债", "买房", "储蓄", "股票", "基金"],
    intro: "这是一次关于资源与财务的询问：牌面关注你与金钱、安全感的关系，以及当下最该调整的财务习惯。",
    advice: "把解读落到具体的财务行动：梳理收支、控制风险、先保障再增值。投资与借贷请以合规渠道和专业意见为准。"
  },
  health: {
    label: "身心状态",
    keys: ["健康", "身体", "睡眠", "情绪", "压力", "焦虑", "体检", "疲劳", "疾病", "病"],
    intro: "这是一次关于身心状态的询问：牌面提醒你关注长期被忽略的感受与节奏，把照顾自己放在优先位置。",
    advice: "把讯息化为自我关照的行动：规律作息、允许休息、主动寻求支持。健康问题请以专业医疗意见为准，塔罗不能替代就医。"
  },
  decision: {
    label: "方向与选择",
    keys: ["选择", "决定", "要不要", "应不应该", "能不能", "方向", "计划", "未来", "迷茫", "怎么办", "是否", "犹豫", "纠结", "出路"],
    intro: "这是一次关于方向与选择的询问：牌面不替你决定，而是帮你看见选项背后各自的代价、资源与内心倾向。",
    advice: "把牌面带回现实比较：列出每个选项的利弊与可承担的风险，结合你的价值观做决定，并为选择留出调整的空间。"
  },
  self: {
    label: "自我成长",
    keys: ["自己", "成长", "改变", "状态", "目标", "梦想", "兴趣", "提升", "性格", "内心"],
    intro: "这是一次关于自我与成长的询问：牌面更像一面镜子，照见你当下的内在状态与需要被看见的部分。",
    advice: "把收获用在日常觉察上：记录情绪与选择的模式，给自己一个具体的改善小目标，并允许过程缓慢发生。"
  }
};

function detectTopic(question) {
  if (!question) return null;
  const q = question.toLowerCase();
  let bestKey = null;
  let bestScore = 0;
  Object.entries(topicProfiles).forEach(([key, profile]) => {
    const score = profile.keys.reduce((sum, keyword) => sum + (q.includes(keyword) ? 1 : 0), 0);
    if (score > bestScore) { bestScore = score; bestKey = key; }
  });
  return bestScore > 0 ? bestKey : null;
}

// 结合问题的解读：把「牌面 × 位置 × 领域」翻译成使用者问题的语言
const topicApplication = {
  career: {
    lens: {
      major: "一个影响你职业方向的重要阶段课题",
      wands: "你在工作中的行动力与热情",
      cups: "工作中的人际、感受与直觉",
      swords: "职业议题里的思考与沟通",
      pentacles: "业绩、资源与看得见的回报"
    },
    askUpright: "它以正位出现：这份能量正在流动，适合把「{essence}」落实为下一步可执行的工作行动。",
    askReversed: "它以逆位出现：在职业推进上，这份能量正受阻或需要回看——先看清「{essence}」对应的卡点，再决定如何调整。",
    reflect: "想一想：这件事最需要你主动迈出的那一步是什么？"
  },
  study: {
    lens: {
      major: "一个影响你学习方向的重要阶段",
      wands: "学习的热情与行动节奏",
      cups: "学习过程中的感受与兴趣",
      swords: "学习方法、思维与心态",
      pentacles: "学习成果、时间与精力管理"
    },
    askUpright: "它以正位出现：顺着「{essence}」的节奏推进，把精力放在可完成的阶段性目标上。",
    askReversed: "它以逆位出现：学习上有些环节被卡住或打乱了节奏，回看「{essence}」对应的方法与心态，调整后再继续。",
    reflect: "想一想：目前最消耗你学习状态的那件事是什么？"
  },
  love: {
    lens: {
      major: "这段关系中的一个重要转折课题",
      wands: "你们之间的热情与行动",
      cups: "彼此的感受、情感与直觉",
      swords: "关系中的沟通、想法与真相",
      pentacles: "关系的现实基础与稳定感"
    },
    askUpright: "它以正位出现：「{essence}」的能量正在这段关系里流动，值得你正视并善用。",
    askReversed: "它以逆位出现：在关系里，「{essence}」的能量正受阻或失衡——这正是需要坦诚沟通与回看的地方。",
    reflect: "想一想：如果抛开猜测，你在这段关系里真正想要的是什么？"
  },
  family: {
    lens: {
      major: "家庭关系中的一个重要课题",
      wands: "家人间的热情与共同行动",
      cups: "家人间的情感与感受",
      swords: "家庭中的沟通与观念分歧",
      pentacles: "家庭的经济基础与日常安稳"
    },
    askUpright: "它以正位出现：用「{essence}」的方式去经营家人间的关系，会比强求改变更有效。",
    askReversed: "它以逆位出现：家庭议题中有需要重新平衡的地方，回看「{essence}」对应的那部分。",
    reflect: "想一想：在家庭议题里，你最希望被家人理解的是什么？"
  },
  money: {
    lens: {
      major: "财务上一个重要的阶段课题",
      wands: "赚钱的行动与热情",
      cups: "对金钱的感受与安全感",
      swords: "财务决策中的理性与信息",
      pentacles: "现金流、储蓄与看得见的资产"
    },
    askUpright: "它以正位出现：把「{essence}」落实为具体的财务行动，能让资源流动得更顺畅。",
    askReversed: "它以逆位出现：财务上有需要回看的地方——「{essence}」的能量受阻时，先检查收支与风险。",
    reflect: "想一想：当下哪一笔收入或支出，最值得你重新审视？"
  },
  health: {
    lens: {
      major: "身心状态的一个重要调整课题",
      wands: "身体的活动量与活力",
      cups: "情绪与内在感受",
      swords: "压力、思虑与睡眠",
      pentacles: "作息、身体与日常习惯"
    },
    askUpright: "它以正位出现：顺着「{essence}」的方向照顾自己，恢复会更容易发生。",
    askReversed: "它以逆位出现：提醒你身心有需要回看的信号——「{essence}」受阻时，先允许自己慢下来。",
    reflect: "想一想：最近你忽略了身体的哪个信号？"
  },
  decision: {
    lens: {
      major: "这个选择背后的重要课题",
      wands: "选择中偏向行动与热情的部分",
      cups: "选择中偏向感受与直觉的部分",
      swords: "选择中需要想清楚与说清楚的部分",
      pentacles: "选择中关乎现实与资源的部分"
    },
    askUpright: "它以正位出现：这个方向的能量是顺畅的，可以把「{essence}」作为决策的参考之一。",
    askReversed: "它以逆位出现：这个方向的能量有卡点——「{essence}」提醒你别忽略被卡住或代价过高的部分。",
    reflect: "想一想：如果两个选项都不会失败，你的心更倾向哪一个？"
  },
  self: {
    lens: {
      major: "自我成长中的一个重要课题",
      wands: "行动力与自我表达",
      cups: "内在感受与情绪",
      swords: "自我认知与思维模式",
      pentacles: "身体状态与日常习惯"
    },
    askUpright: "它以正位出现：这是你当下可以信任的内在资源——「{essence}」。",
    askReversed: "它以逆位出现：它照见你内在需要回看的部分——「{essence}」受阻时，往往藏着未被处理的感受。",
    reflect: "想一想：你最近最忽略自己的是哪一面？"
  },
  _generic: {
    lens: {
      major: "一个重要的阶段课题",
      wands: "行动力与热情",
      cups: "情感与直觉",
      swords: "思考与沟通",
      pentacles: "现实与资源"
    },
    askUpright: "它以正位出现：这份「{essence}」的能量正在流动，可以借力推进。",
    askReversed: "它以逆位出现：「{essence}」的能量正受阻——先看清哪里被卡住，再决定如何调整。",
    reflect: "想一想：这张牌最戳中你当下处境的，是哪一点？"
  }
};

function buildOverallReading() {
  const question = questionInput.value.trim();
  const topicKey = detectTopic(question);
  const topic = topicKey ? topicProfiles[topicKey] : null;
  const count = activeReading.length;
  const positions = spreads[activeSpread].positions;
  const entries = activeReading;

  const elementCounts = { "火": 0, "水": 0, "风": 0, "土": 0 };
  let majors = 0;
  entries.forEach(entry => {
    if (entry.card.group === "major") { majors += 1; return; }
    elementCounts[suitElement[entry.card.group]] += 1;
  });
  const reversedCount = entries.filter(entry => entry.reversed).length;
  const presentElements = Object.keys(elementCounts).filter(key => elementCounts[key] > 0);
  const maxElementCount = Math.max(...Object.values(elementCounts));
  const dominantElements = Object.keys(elementCounts).filter(key => elementCounts[key] === maxElementCount && maxElementCount > 0);

  // —— 能量总览 ——
  const paragraphs = [];
  paragraphs.push(topic ? topic.intro : "这是一次开放性的探索：牌面映照的是你当下整体的能量状态，而不是一个固定的结论。");

  if (count === 1) {
    paragraphs.push(majors === 1
      ? "这是一张大阿卡那：它标志着你正站在一个重要的阶段课题面前，值得认真对待。"
      : "这是一张小阿卡那：它落在日常情境与具体行动层面，答案往往藏在细节与可执行的步骤里。");
  } else if (majors === 0) {
    paragraphs.push("牌阵全部来自小阿卡那：这件事更多落在日常情境与具体行动层面，答案往往藏在细节、习惯与可执行的步骤里。");
  } else if (majors >= Math.ceil(count / 2)) {
    paragraphs.push(`牌阵中有 ${majors} 张大阿卡那、超过半数：这件事对你而言不只是日常小事，而是带有阶段意义的重要课题，值得你认真对待。`);
  } else {
    paragraphs.push(`牌阵中有 ${majors} 张大阿卡那与 ${count - majors} 张小阿卡那：大阿卡那标记出其中的关键转折，小阿卡那则给出日常层面的具体提示。`);
  }

  const elementSentences = [];
  if (dominantElements.length === 1) {
    elementSentences.push(count === 1 ? elementProfiles[dominantElements[0]].present : elementProfiles[dominantElements[0]].on);
  }
  if (count >= 3) {
    ["火", "水", "风", "土"].forEach(key => {
      if (elementCounts[key] === 0) elementSentences.push(elementProfiles[key].absent);
    });
  }
  if (elementSentences.length === 0 && presentElements.length === 4) {
    elementSentences.push("四元素在牌阵中分布均衡：行动、情感、思考与现实四个维度都在参与这件事，提醒你保持整体视角，而非偏执一端。");
  }
  elementSentences.forEach(sentence => paragraphs.push(sentence));

  if (reversedCount === 0) {
    paragraphs.push("牌面全部为正位，能量顺畅流动：你现在更容易看见资源与方向，适合顺势推进。");
  } else if (reversedCount === count) {
    paragraphs.push("牌面全部呈现逆位：能量正在内转或受阻。这并非坏事——它常常意味着一次深入的自我调整正在进行，先慢下来看清哪里卡住了。");
  } else {
    paragraphs.push(`${count - reversedCount} 张正位、${reversedCount} 张逆位：正位牌显示顺畅可用的能量，逆位牌则提示你有几处需要回看——被卡住的、被忽视的、需要重新平衡的部分。`);
  }

  // —— 牌面脉络 ——
  let chainSentence;
  if (count === 1) {
    const entry = entries[0];
    chainSentence = `这一张「${positions[0]}」的 ${entry.card.name}，核心是「${entry.card.essence}」。它像一句针对你问题的短答：${entry.reversed ? entry.card.reversed : entry.card.upright}`;
  } else {
    chainSentence = `把牌按位置连起来读：${entries.map((entry, index) => `「${positions[index]}」的${entry.card.name}（${entry.card.essence}）`).join("，")}。事情正由「${entries[0].card.essence}」的力量带动，向「${entries[count - 1].card.essence}」的方向发展。`;
  }

  // —— 给你的建议 ——
  const adviceParagraphs = [];
  adviceParagraphs.push(topic
    ? topic.advice
    : "把牌面讯息带回现实：挑一句最有共鸣的关键词，把它变成今天或本周可以执行的一个小行动，其余的让时间给出答案。");
  if (reversedCount > 0) {
    adviceParagraphs.push("留意逆位牌的提示：它们不是坏消息，而是告诉你哪里被卡住了、哪里需要重新平衡——往往那里正是转变的入口。");
  }

  return `
    <section class="overall-reading">
      <p class="eyebrow">OVERALL READING · 总体解读</p>
      <h3>结合你的问题</h3>
      ${question
        ? `<p class="overall-question">你问的是：「${escapeHtml(question)}」</p>`
        : `<p class="overall-question">本次没有输入具体问题，以下解读以「当下最需要被看见的部分」为切入点。</p>`}
      <div class="overall-block">
        <h4>能量总览</h4>
        ${paragraphs.map(p => `<p>${p}</p>`).join("")}
      </div>
      <div class="overall-block">
        <h4>牌面脉络</h4>
        <p>${chainSentence}</p>
      </div>
      <div class="overall-block">
        <h4>给你的建议</h4>
        ${adviceParagraphs.map(p => `<p>${p}</p>`).join("")}
      </div>
      <p class="overall-closing">牌面是一面镜子，最终的判断与选择，始终在你手中。若解读触及需要专业协助的领域（医疗、法律、财务），请以专业意见为准。</p>
    </section>`;
}

// 可视化洗牌：牌从牌堆飞出、旋转、聚拢
function startShuffle(done) {
  shuffleFan.innerHTML = Array.from({ length: 10 }, (_, index) => {
    const dx = `${Math.round(Math.random() * 320 - 160)}px`;
    const dy = `${Math.round(Math.random() * 170 - 85)}px`;
    const rot = `${Math.round(Math.random() * 70 - 35)}deg`;
    const delay = `${(Math.random() * 0.9).toFixed(2)}s`;
    const duration = `${(1.5 + Math.random() * 0.9).toFixed(2)}s`;
    return `<span class="fan-card" style="--dx:${dx};--dy:${dy};--rot:${rot};animation-delay:${delay};animation-duration:${duration}" aria-hidden="true">✦</span>`;
  }).join("");
  shuffleFan.hidden = false;
  deckStack.classList.add("is-shuffling");
  setTimeout(() => {
    shuffleFan.hidden = true;
    shuffleFan.innerHTML = "";
    deckStack.classList.remove("is-shuffling");
    done();
  }, 2600);
}

function updateDrawProgress(visible) {
  if (!visible) { drawProgress.hidden = true; return; }
  drawProgress.hidden = false;
  drawProgress.textContent = `已抽 ${drawnCount} / ${activeReading.length} 张`;
}

function drawReading() {
  if (flowState === "shuffling" || flowState === "dealing" || flowState === "revealing") return;
  const spread = spreads[activeSpread];
  activeReading = shuffledCards(tarotCards).slice(0, spread.count).map(card => ({
    card,
    // 逆位以约三分之一的概率出现，既保留层次，也避免一组牌全为逆位造成干扰。
    reversed: Math.random() < 0.33
  }));
  drawnCount = 0;
  flowState = "shuffling";
  drawButton.disabled = true;
  drawButton.textContent = "正在洗牌…";
  updateDrawProgress(false);
  startShuffle(() => {
    emptyReading.hidden = true;
    interpretation.hidden = true;
    if (activeSpread === "celtic") {
      cardsStage.hidden = true;
      renderCelticStage();
    } else {
      celticStage.hidden = true;
      renderDrawnCards();
    }
    flowState = "dealing";
    drawButton.textContent = "正在铺开牌面…";
    startDeal();
  });
}

// 推牌：牌从牌堆方向逐张滑向牌位，全部落位后进入「由使用者自己抽牌」阶段
function startDeal() {
  const container = activeSpread === "celtic" ? celticStage : cardsStage;
  const cards = container.querySelectorAll(".drawn-card, .celtic-card");
  const count = cards.length;
  const stagger = count > 5 ? 0.22 : 0.36;
  setTimeout(() => {
    container.querySelectorAll(".drawn-card, .celtic-card").forEach(element => element.classList.add("is-drawable"));
    flowState = "drawing";
    drawButton.textContent = "抽牌进行中…";
    drawButton.disabled = true;
    drawInstruction.textContent = `牌已铺开 · 请点击牌面一张一张抽牌（共 ${count} 张），全部抽完后再一起翻开`;
    updateDrawProgress(true);
  }, (count - 1) * stagger * 1000 + 900);
}

// 使用者点击抽取一张牌
function drawOne(index) {
  if (flowState !== "drawing") return;
  const container = activeSpread === "celtic" ? celticStage : cardsStage;
  const cardElement = container.querySelector(`[data-reading-index="${index}"]`);
  if (!cardElement || cardElement.classList.contains("is-drawn")) return;
  cardElement.classList.add("is-drawn");
  drawnCount += 1;
  const stateElement = cardElement.querySelector(".card-state");
  if (stateElement && activeSpread !== "celtic") stateElement.textContent = "已取 · 等待翻牌";
  updateDrawProgress(true);
  if (drawnCount === activeReading.length) {
    flowState = "revealing";
    drawInstruction.textContent = "所有牌已取 · 即将翻开…";
    setTimeout(revealAll, 750);
  }
}

// 全部抽完后：逐张翻开牌面的动画
function revealAll() {
  const container = activeSpread === "celtic" ? celticStage : cardsStage;
  const cards = container.querySelectorAll(".drawn-card, .celtic-card");
  const count = cards.length;
  cards.forEach((element, index) => {
    const inner = element.querySelector(".card-inner");
    if (inner) inner.style.transitionDelay = `${index * 0.13}s`;
    const entry = activeReading[index];
    element.classList.add("is-flipped");
    element.classList.remove("is-drawable");
    const stateElement = element.querySelector(".card-state");
    if (stateElement) {
      stateElement.textContent = activeSpread === "celtic"
        ? `${spreads[activeSpread].positions[index]} · ${entry.card.name}`
        : `${entry.card.name} · ${entry.reversed ? "逆位" : "正位"}`;
    }
  });
  setTimeout(() => {
    cards.forEach(element => {
      const inner = element.querySelector(".card-inner");
      if (inner) inner.style.transitionDelay = "";
    });
    flowState = "revealed";
    drawButton.textContent = "再次洗牌并抽取";
    drawButton.disabled = false;
    drawInstruction.textContent = "牌面已翻开 · 点击任意牌可回看它的位置解读";
    updateDrawProgress(false);
    renderInterpretations();
  }, count * 0.13 * 1000 + 1000);
}

function resetReading() {
  flowState = "idle";
  drawnCount = 0;
  activeReading = [];
  cardsStage.className = "cards-stage";
  cardsStage.hidden = true;
  cardsStage.innerHTML = "";
  celticStage.hidden = true;
  celticStage.innerHTML = "";
  interpretation.hidden = true;
  interpretation.innerHTML = "";
  emptyReading.hidden = false;
  drawProgress.hidden = true;
  drawInstruction.textContent = spreads[activeSpread].instruction;
  drawButton.innerHTML = "洗牌并抽牌 <span>✦</span>";
  drawButton.disabled = false;
}

function renderLibrary(filter = "all") {
  const visibleCards = filter === "all" ? tarotCards : tarotCards.filter(card => card.group === filter);
  cardLibrary.innerHTML = visibleCards.map(card => `
    <button class="library-card ${card.group === "major" ? "" : "is-minor"}" type="button" data-card-id="${card.id}">
      <span class="library-img">
        <img src="images/${card.image}" alt="${card.name}" loading="lazy">
        <span class="fallback-symbol">${card.symbol}</span>
      </span>
      <span class="library-number">${card.number} · ${card.english}</span>
      <b>${card.name}</b>
      <small>${card.essence}</small>
    </button>`).join("");
}

function showLibraryCard(card) {
  // 图鉴把正、逆位并列显示，抽牌结果则只呈现本次出现的朝向。
  activeReading = [{ card, reversed: false }];
  cardsStage.className = "cards-stage";
  cardsStage.innerHTML = `
    <div class="drawn-card is-flipped">
      <button type="button" aria-label="${card.name}牌面">
        ${createCard3D(card, true)}
        <label>图鉴浏览</label>
        <small>${card.name} · 完整牌义</small>
      </button>
    </div>`;
  interpretation.innerHTML = `
    <section class="interpretation-head">
      <p class="eyebrow">CARD LIBRARY · 78 CARDS</p>
      <h2>${card.name} · 完整牌义</h2>
    </section>
    <section class="per-card-section">
      <div class="per-card-readings is-single">
        <article class="card-reading">
          <div class="interpretation-art">
            <img src="images/${card.image}" alt="${card.name}">
            <span class="fallback-symbol">${card.symbol}</span>
          </div>
          <div class="interpretation-text">
            <span class="reading-label">牌义图鉴 · ${card.english}</span>
            <h3>${card.name}</h3>
            <p class="keywords">${card.keywords}</p>
            <p><strong>牌面意象：</strong>${card.imagery}</p>
            <p><strong>牌面主题：</strong>${card.essence}。</p>
            <p><strong>正位：</strong>${card.upright}</p>
            <p><strong>逆位：</strong>${card.reversed}</p>
            <p class="card-tip">阅读时先感受哪一段讯息最有共鸣，再回到你的真实处境思考行动。</p>
          </div>
        </article>
      </div>
    </section>`;
  emptyReading.hidden = true;
  celticStage.hidden = true;
  cardsStage.hidden = false;
  interpretation.hidden = false;
  document.querySelector("#draw").scrollIntoView({ behavior: "smooth", block: "start" });
}

document.querySelectorAll(".spread-option").forEach(button => {
  button.addEventListener("click", () => {
    activeSpread = button.dataset.spread;
    document.querySelectorAll(".spread-option").forEach(option => option.classList.toggle("is-active", option === button));
    drawInstruction.textContent = spreads[activeSpread].instruction;
    resetReading();
  });
});

drawButton.addEventListener("click", drawReading);
resetButton.addEventListener("click", resetReading);

function onStageCardClick(event) {
  const button = event.target.closest("[data-reading-index]");
  if (!button) return;
  const index = Number(button.dataset.readingIndex);
  if (flowState === "drawing") {
    drawOne(index);
  } else if (flowState === "revealed") {
    highlightInterpretation(index);
  }
}

cardsStage.addEventListener("click", onStageCardClick);
celticStage.addEventListener("click", onStageCardClick);

document.querySelectorAll(".filter-button").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".filter-button").forEach(filterButton => filterButton.classList.toggle("is-active", filterButton === button));
    renderLibrary(button.dataset.filter);
  });
});

cardLibrary.addEventListener("click", event => {
  const button = event.target.closest("[data-card-id]");
  if (!button) return;
  const card = tarotCards.find(item => item.id === button.dataset.cardId);
  showLibraryCard(card);
});

renderLibrary();

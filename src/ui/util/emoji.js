import anchorme from "anchorme";
import twemoji from 'twemoji'
import Config from "../../config";

const EmojiList = ['笑脸', '生病', '破涕为笑', '吐舌', '脸红', '恐惧', '失望', '无语', '嘿哈', '捂脸', '奸笑', '机智', '皱眉', '耶', '鬼魂', '合十', '强壮', '庆祝', '礼物', '红包', '鸡', '开心', '大笑', '热情', '眨眼', '色', '接吻', '亲吻', '露齿笑', '满意', '戏弄', '得意', '汗', '低落', '呸', '焦虑', '担心', '震惊', '悔恨', '眼泪', '哭', '晕', '心烦', '生气', '睡觉', '恶魔', '外星人', '心', '心碎', '丘比特', '闪烁', '星星', '叹号', '问号', '睡着', '水滴', '音乐', '火', '便便', '弱', '拳头', '胜利', '上', '下', '右', '左', '第一', '吻', '热恋', '男孩', '女孩', '女士', '男士', '天使', '骷髅', '红唇', '太阳', '下雨', '多云', '雪人', '月亮', '闪电', '海浪', '猫', '小狗', '老鼠', '仓鼠', '兔子', '狗', '青蛙', '老虎', '考拉', '熊', '猪', '牛', '野猪', '猴子', '马', '蛇', '鸽子', '鸡', '企鹅', '毛虫', '章鱼', '鱼', '鲸鱼', '海豚', '玫瑰', '花', '棕榈树', '仙人掌', '礼盒', '南瓜灯', '圣诞老人', '圣诞树', '礼物', '铃', '气球', 'CD', '相机', '录像机', '电脑', '电视', '电话', '解锁', '锁', '钥匙', '成交', '灯泡', '邮箱', '浴缸', '钱', '炸弹', '手枪', '药丸', '橄榄球', '篮球', '足球', '棒球', '高尔夫', '奖杯', '入侵者', '唱歌', '吉他', '比基尼', '皇冠', '雨伞', '手提包', '口红', '戒指', '钻石', '咖啡', '啤酒', '干杯', '鸡尾酒', '汉堡', '薯条', '意面', '寿司', '面条', '煎蛋', '冰激凌', '蛋糕', '苹果', '飞机', '火箭', '自行车', '高铁', '警告', '旗', '男人', '女人', 'O', 'X', '版权', '注册商标', '商标'];
const QQFaceMap = {
    '微笑': '0',
    '撇嘴': '1',
    '色': '2',
    '发呆': '3',
    '得意': '4',
    '流泪': '5',
    '害羞': '6',
    '闭嘴': '7',
    '睡': '8',
    '大哭': '9',
    '尴尬': '10',
    '发怒': '11',
    '调皮': '12',
    '呲牙': '13',
    '惊讶': '14',
    '难过': '15',
    '酷': '16',
    '冷汗': '17',
    '抓狂': '18',
    '吐': '19',
    '偷笑': '20',
    '可爱': '21',
    '愉快': '21',
    '白眼': '22',
    '傲慢': '23',
    '饥饿': '24',
    '困': '25',
    '惊恐': '26',
    '流汗': '27',
    '憨笑': '28',
    '悠闲': '29',
    '大兵': '29',
    '奋斗': '30',
    '咒骂': '31',
    '疑问': '32',
    '嘘': '33',
    '晕': '34',
    '疯了': '35',
    '折磨': '35',
    '衰': '36',
    '骷髅': '37',
    '敲打': '38',
    '再见': '39',
    '擦汗': '40',
    '抠鼻': '41',
    '鼓掌': '42',
    '糗大了': '43',
    '坏笑': '44',
    '左哼哼': '45',
    '右哼哼': '46',
    '哈欠': '47',
    '鄙视': '48',
    '委屈': '49',
    '快哭了': '50',
    '阴险': '51',
    '亲亲': '52',
    '吓': '53',
    '可怜': '54',
    '菜刀': '55',
    '西瓜': '56',
    '啤酒': '57',
    '篮球': '58',
    '乒乓': '59',
    '咖啡': '60',
    '饭': '61',
    '猪头': '62',
    '玫瑰': '63',
    '凋谢': '64',
    '嘴唇': '65',
    '示爱': '65',
    '爱心': '66',
    '心碎': '67',
    '蛋糕': '68',
    '闪电': '69',
    '炸弹': '70',
    '刀': '71',
    '足球': '72',
    '瓢虫': '73',
    '便便': '74',
    '月亮': '75',
    '太阳': '76',
    '礼物': '77',
    '拥抱': '78',
    '强': '79',
    '弱': '80',
    '握手': '81',
    '胜利': '82',
    '抱拳': '83',
    '勾引': '84',
    '拳头': '85',
    '差劲': '86',
    '爱你': '87',
    NO: '88',
    OK: '89',
    '爱情': '90',
    '飞吻': '91',
    '跳跳': '92',
    '发抖': '93',
    '怄火': '94',
    '转圈': '95',
    '磕头': '96',
    '回头': '97',
    '跳绳': '98',
    '投降': '99',
    '激动': '100',
    '乱舞': '101',
    '献吻': '102',
    '左太极': '103',
    '右太极': '104',
    '嘿哈': '105',
    '捂脸': '106',
    '奸笑': '107',
    '机智': '108',
    '皱眉': '109',
    '耶': '110',
    '鸡': '111',
    '红包': '112',
    Smile: '0',
    Grimace: '1',
    Drool: '2',
    Scowl: '3',
    Chill: '4',
    CoolGuy: '4',
    Sob: '5',
    Shy: '6',
    Shutup: '7',
    Silent: '7',
    Sleep: '8',
    Cry: '9',
    Awkward: '10',
    Pout: '11',
    Angry: '11',
    Wink: '12',
    Tongue: '12',
    Grin: '13',
    Surprised: '14',
    Surprise: '14',
    Frown: '15',
    Cool: '16',
    Ruthless: '16',
    Tension: '17',
    Blush: '17',
    Scream: '18',
    Crazy: '18',
    Puke: '19',
    Chuckle: '20',
    Joyful: '21',
    Slight: '22',
    Smug: '23',
    Hungry: '24',
    Drowsy: '25',
    Panic: '26',
    Sweat: '27',
    Laugh: '28',
    Loafer: '29',
    Commando: '29',
    Strive: '30',
    Determined: '30',
    Scold: '31',
    Doubt: '32',
    Shocked: '32',
    Shhh: '33',
    Dizzy: '34',
    Tormented: '35',
    BadLuck: '36',
    Toasted: '36',
    Skull: '37',
    Hammer: '38',
    Wave: '39',
    Relief: '40',
    Speechless: '40',
    DigNose: '41',
    NosePick: '41',
    Clap: '42',
    Shame: '43',
    Trick: '44',
    'Bah! L': '45',
    'Bah! R': '46',
    Yawn: '47',
    Lookdown: '48',
    'Pooh-pooh': '48',
    Wronged: '49',
    Shrunken: '49',
    Puling: '50',
    TearingUp: '50',
    Sly: '51',
    Kiss: '52',
    'Uh-oh': '53',
    Wrath: '53',
    Whimper: '54',
    Cleaver: '55',
    Melon: '56',
    Watermelon: '56',
    Beer: '57',
    Basketball: '58',
    PingPong: '59',
    Coffee: '60',
    Rice: '61',
    Pig: '62',
    Rose: '63',
    Wilt: '64',
    Lip: '65',
    Lips: '65',
    Heart: '66',
    BrokenHeart: '67',
    Cake: '68',
    Lightning: '69',
    Bomb: '70',
    Dagger: '71',
    Soccer: '72',
    Ladybug: '73',
    Poop: '74',
    Moon: '75',
    Sun: '76',
    Gift: '77',
    Hug: '78',
    Strong: '79',
    ThumbsUp: '79',
    Weak: '80',
    ThumbsDown: '80',
    Shake: '81',
    Victory: '82',
    Peace: '82',
    Admire: '83',
    Fight: '83',
    Salute: '83',
    Beckon: '84',
    Fist: '85',
    Pinky: '86',
    Love: '2',
    RockOn: '87',
    No: '88',
    'Nuh-uh': '88',
    InLove: '90',
    Blowkiss: '91',
    Waddle: '92',
    Tremble: '93',
    'Aaagh!': '94',
    Twirl: '95',
    Kotow: '96',
    Lookback: '97',
    Dramatic: '97',
    Jump: '98',
    JumpRope: '98',
    'Give-in': '99',
    Surrender: '99',
    Hooray: '100',
    HeyHey: '101',
    Meditate: '101',
    Smooch: '102',
    'TaiJi L': '103',
    'TaiChi L': '103',
    'TaiJi R': '104',
    'TaiChi R': '104',
    Hey: '105',
    Facepalm: '106',
    Smirk: '107',
    Smart: '108',
    Concerned: '109',
    'Yeah!': '110',
    Chicken: '111',
    Packet: '112',
    '發呆': '3',
    '流淚': '5',
    '閉嘴': '7',
    '尷尬': '10',
    '發怒': '11',
    '調皮': '12',
    '驚訝': '14',
    '難過': '15',
    '饑餓': '24',
    '累': '25',
    '驚恐': '26',
    '悠閑': '29',
    '奮鬥': '30',
    '咒罵': '31',
    '疑問': '32',
    '噓': '33',
    '暈': '34',
    '瘋了': '35',
    '骷髏頭': '37',
    '再見': '39',
    '摳鼻': '41',
    '羞辱': '43',
    '壞笑': '44',
    '鄙視': '48',
    '陰險': '51',
    '親親': '52',
    '嚇': '53',
    '可憐': '54',
    '籃球': '58',
    '飯': '61',
    '豬頭': '62',
    '枯萎': '64',
    '愛心': '66',
    '閃電': '69',
    '炸彈': '70',
    '甲蟲': '73',
    '太陽': '76',
    '禮物': '77',
    '擁抱': '78',
    '強': '79',
    '勝利': '82',
    '拳頭': '85',
    '差勁': '86',
    '愛你': '88',
    '愛情': '90',
    '飛吻': '91',
    '發抖': '93',
    '噴火': '94',
    '轉圈': '95',
    '磕頭': '96',
    '回頭': '97',
    '跳繩': '98',
    '激動': '100',
    '亂舞': '101',
    '獻吻': '102',
    '左太極': '103',
    '右太極': '104',
    '吼嘿': '105',
    '掩面': '106',
    '機智': '108',
    '皺眉': '109',
    '歐耶': '110',
    '雞': '111',
    '紅包': '112',
};

const emoji = [];

Object.keys(QQFaceMap).slice(0, 105).map(e => {
    var id = QQFaceMap[e];

    emoji.push({
        key: e,
        value: QQFaceMap[e],
        className: `qqemoji qqemoji${id}`
    });
});

function getEmojiClassName(name) {
    name = name.substring(1, name.length - 1);

    var keys = Object.keys(QQFaceMap);
    var key = keys.find(e => e === name);

    if (key) {
        let id = QQFaceMap[key];
        let emojiCN = keys.find(e => QQFaceMap[e] === id);

        if (+id < 200) {
            return `qqemoji qqemoji${id}`;
        }

        if (EmojiList.includes(emojiCN)) {
            return `emoji emoji${id}`;
        }
    }

    return false;
}

function parser(text) {
    var decodeText = anchorme({
        input: text,
        options: {
            attributes: {
                target: "_blank",
            }

        }
    });

    // (text.match(/\[[\w\s\u4E00-\u9FCC\u3400-\u4DB5\uFA0E\uFA0F\uFA11\uFA13\uFA14\uFA1F\uFA21\uFA23\uFA24\uFA27-\uFA29\ud840-\ud868\udc00-\udfff\ud869[\udc00-\uded6\udf00-\udfff\ud86a-\ud86c\udc00-\udfff\ud86d[\udc00-\udf34\udf40-\udfff\ud86e\udc00-\udc1d]+\]/g) || []).map(e => {
    //     var className = getEmojiClassName(e);
    //
    //     if (!className) {
    //         // Invalid emoji
    //         return;
    //     }
    //     text = decodeText = text.split(`${e}`).join(`<a target="_blank" class="${className}"></a>`);
    // });

    let emoji = twemoji.parse(decodeText);
    emoji = emoji.replace(/src="https:\/\/twemoji\.maxcdn\.com\/v\/[0-9.]+\//g, 'src="' + Config.emojiBaseUrl())
    return emoji;
}

function normalize(text = '') {
    var matchs = text.match(/<span class="emoji emoji[0-9a-fA-F]+"><\/span>/g) || [];
    var decodeText = text;

    try {
        matchs.map(e => {
            // Decode utf16 to emoji
            var emojiCode = e.match(/emoji([0-9a-fA-F]+)/)[1].substr(0, 5);
            var emoji = String.fromCodePoint(parseInt(emojiCode, 16));
            text = decodeText = text.split(e).join(emoji);
        });
    } catch (ex) {
        console.error('Failed decode %s: %o', text, ex);
    }
    return decodeText;
}

export {emoji, parser, normalize};

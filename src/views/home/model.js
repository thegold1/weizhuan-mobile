import { getImageUrl } from '@/utils/index';

const images = [
  getImageUrl('swiper3.jpg'),
  getImageUrl('swiper1.jpg'),
  getImageUrl('swiper2.jpg')
]
const fieldList = {
  '全部': '0', '社媒写作': '1', '视频创作': '2', '推广营销': '3'
}
const tabList = [{
  name: '全部',
  value: '0'
}, {
  name: '社媒写作',
  value: '1'
}, {
  name: '视频创作',
  value: '2'
}, {
  name: '推广营销',
  value: '3'
},]
const allList = [
  // {
  //   title: "ai聊天(Beta)",
  //   field: fieldList['社媒写作'],
  //   type: '0',
  //   message: "随便说什么都行、问的越好，回答越棒~~",
  //   url: getImageUrl("new-media/ai_chat.png"),
  // },
  {
    title: "标题生成文章",
    field: fieldList['社媒写作'],
    type: '1',
    message: "输入标题，一键生成高质量文章内容",
    url: getImageUrl("new-media/title_produce_paper.png"),
    formList: [{
      elementType: 'input_op',
      label: '标题',
      value: "title",
      placeholder: '请输入标题'
    }],
    example: '如何用抖音实现推广引流？',
    fill: {
      title: '如何用抖音实现推广引流？'
    }
  },
  {
    title: "新媒体全文写作",
    field: fieldList['社媒写作'],
    type: '2',
    message: "输入标题+关键词，一键准确生成所需文章（约15秒）",
    // tag: "免费",
    url: getImageUrl("new-media/new_media_writing.png"),
    formList: [{
      elementType: 'input_op',
      label: '标题',
      value: "title",
      placeholder: '请输入标题'
    },
    {
      elementType: 'keys_op',
      label: '关键词',
      value: 'keys',
      placeholder: "请输入关键词，用'、'分隔"
    },
    {
      elementType: 'attempt_op',
      label: '试试',
      attempt: [
        '了解自我',
        '自我管理',
        '自我激励'
      ],
    }],
    example: '高情商的人有什么表现？',
    fill: {
      title: '高情商的人有什么表现？',
      keys: '了解自我,自我管理,自我激励'
    }
  },
  {
    title: "热点评论",
    message: "蹭热点必备：粘贴实时热点内容，生成多角度评论",
    // tag: "免费",
    field: fieldList['社媒写作'],
    type: '3',
    url: getImageUrl("new-media/hot_comment.png"),
    formList: [{
      elementType: 'select_op',
      label: '语气选择',
      value: "upDropBox1",
      attempt: [
        '严肃', '幽默', '专业', '吃瓜', '有说服力'
      ],
    }, {
      elementType: 'select_op',
      label: '请选择您的角度',
      value: "upDropBox2",
      attempt: [
        '多方面', '律师', '个人'
      ]
    }, {
      elementType: 'area_op',
      label: '请输入热点内容',
      value: "title3",
      placeholder: '请输入热点内容'
    }],
    example: '实时热点',
    fill: {
      upDropBox1: '严肃',
      upDropBox2: '多方面',
      title3: '3月27日，在广东佛山，有网友在社交平台上发文称，因自己提离职，男友被老板一并开除，引起广泛关注。当事人卢女士表示，自己二月中旬入职一便利店，老板称实习期工资每月3500元，转正后每月4500元，月休两天，自己与男友均未签订劳动合同。“我大概是在半个月前跟他提过离职。”其男友熊先生称，他曾提出过离职，但老板并未同意，还口头加薪让自己留下,现被开除，老板却表示只按实习工资算。“我女朋友那天提出离职，他直接让我走。”熊先生说：“他给我按实习工资算，那我肯定不服啊，我给他上了一个月的夜班，每天12个小时，他给我按3500元算，" "当时说的是4500元，一个月两天休息，休息一天起码扣400元，上个月和这个月各休了一天，我们该做的工作全部都有。”熊先生表示，自己与女友已申请劳动仲裁，而老板则表示让他们自便，并认为去仲裁是逼他不发工资。 "我的诉求就是该赔偿的赔偿嘛。”随后，该便利店老板回应称，熊先生此前就提过离职，其他情况暂不方便透露。“他男朋友不是不做了吗？他自己不想做了啊。”对此，网友们纷纷表示，“老板吃相太难看！”“太过分了！”“纯纯是压榨剥削廉价劳动力！'
    }
  },
  {
    title: "生成文章大纲",
    message: "输入标题，为你提供文章主体的灵感，并为其创建推文提纲",
    field: fieldList['社媒写作'],
    type: '4',
    url: getImageUrl("new-media/article_outline.png"),
    formList: [{
      elementType: 'input_op',
      label: '标题',
      value: "title",
      placeholder: '请输入标题'
    }],
    example: '高情商的人有什么表现？',
    fill: {
      title: '高情商的人有什么表现？'
    }
  },
  {
    title: "文章开头导语",
    message: "为你生成抓眼球的文章开头",
    field: fieldList['社媒写作'],
    type: '5',
    url: getImageUrl("new-media/article_intro.png"),
    formList: [{
      elementType: 'input_op',
      label: '标题',
      value: "title",
      placeholder: '请输入标题'
    },
    {
      elementType: 'input_op',
      label: '受众',
      value: "subTitle",
      placeholder: '请输入副标题'
    }],
    example: '如何一夜暴富',
    fill: {
      title: '如何一夜暴富',
      subTitle: '打工族'
    }
  },
  {
    title: "英文写作",
    message: "输入标题和关键词，一键生成英文文章(测试版)",
    field: fieldList['社媒写作'],
    type: '6',
    url: getImageUrl("new-media/English_writing.png"),
    formList: [{
      elementType: 'input_op',
      label: '标题',
      value: "title",
      placeholder: '请输入标题'
    }, {
      elementType: 'keys_op',
      label: '关键词',
      placeholder: "请输入关键词，用'、'分隔",
      value: 'keys',
    },
    {
      elementType: 'attempt_op',
      label: '试试',
      attempt: [
        '了解自我',
        '自我管理',
        '自我激励'
      ],
    }],
    example: '高情商的人有什么表现？',
    fill: {
      title: '高情商的人有什么表现？',
      keys: '了解自我,自我管理,自我激励'
    }
  },
  {
    title: "小红书文案",
    message: "生成【小红书】风格的各类文案，目前已覆盖小红书平台的24个内容场景",
    field: fieldList['社媒写作'],
    type: '7',
    url: getImageUrl("new-media/xiaohongshu_copywriting.png"),
    formList: [{
      elementType: 'input_op',
      label: '营销产品',
      value: "title",
      placeholder: '请输入营销产品'
    }, {
      elementType: 'input_op',
      label: '使用场景/人群',
      value: "subTitle",
      placeholder: '请输入使用场景/人群'
    }, {
      elementType: 'select_op',
      label: '文案类型',
      value: "downDropBox1",
      attempt: [
        '种草文案', '测评文案', '教程文案', '清单文案'
      ]
    }, {
      elementType: 'select_op',
      label: '文案语气',
      value: "downDropBox2",
      attempt: [
        '活泼', '友好', '接地气', '文艺', '专业', '严肃', '幽默'
      ]
    },
    {
      elementType: 'keys_op',
      label: '关键词',
      placeholder: "请输入关键词，用'、'分隔",
      value: 'keys',
    },
    {
      elementType: 'attempt_op',
      label: '试试',
      attempt: [
        '小天才电话手表',
        '电话手表',
        '手表'
      ],
    }],
    example: '小天才电话手表',
    fill: {
      title: '小天才电话手表',
      subTitle: '学生',
      downDropBox1: '种草文案',
      downDropBox2: '活泼',
      keys: '小天才电话手表,电话手表,手表'
    }
  },
  {
    title: "知乎文案",
    message: "生成各类【知乎】体文章，有效完成软植入种草文案",
    field: fieldList['社媒写作'],
    type: '8',
    url: getImageUrl("new-media/zhihu_copywriting.png"),
    formList: [{
      elementType: 'input_op',
      label: '营销产品',
      value: "title",
      placeholder: '请输入营销产品'
    }, {
      elementType: 'input_op',
      label: '使用场景/人群',
      value: "subTitle",
      placeholder: '请输入使用场景/人群'
    }, {
      elementType: 'input_op',
      label: '问题描述',
      value: "title4",
      placeholder: '请输入问题描述'
    }, {
      elementType: 'select_op',
      label: '文案类型',
      value: "downDropBox1",
      attempt: [
        '经历型回答',
        '盘点型回答',
        '故事型回答',
        '干货型回答',
        '见解型回答'
      ],
    },
    ],
    example: '微撰教育',
    fill: {
      title: '微撰教育',
      subTitle: '打工族',
      downDropBox1: '经历型回答',
      title4: '底层人民应该如何翻身？'
    }
  },
  {
    title: "微博文案",
    message: "生成【微博】风格的各类文案",
    field: fieldList['社媒写作'],
    type: '9',
    url: getImageUrl("new-media/weibo_copywriting.png"),
    formList: [{
      elementType: 'input_op',
      label: '品牌',
      value: "title",
      placeholder: '请输入品牌'
    },
    {
      elementType: 'input_op',
      label: '热点话题',
      value: "subTitle",
      placeholder: '请输入热点话题'
    },
    {
      elementType: 'input_op',
      label: '人群/场景',
      value: "title4",
      placeholder: '请输入人群/场景'
    },
    {
      elementType: 'select_op',
      label: '博文类型',
      value: "downDropBox1",
      attempt: [
        '微博',
        '微博文章'
      ]
    },
    {
      elementType: 'select_op',
      label: '博文口吻',
      value: "downDropBox2",
      attempt: [
        '品牌方',
        '博主',

      ]
    }],
    example: '耐克',
    fill: {
      title: '耐克',
      subTitle: '微博不眠夜',
      downDropBox1: '微博',
      title4: '体育',
      downDropBox2: '品牌方'
    }
  },
  {
    title: "短视频吸睛开头",
    message:
      "用视频开头的黄金5秒，锁定观众注意力",
    field: fieldList['视频创作'],
    type: '1',
    url: getImageUrl("video-authoring/short_video_highlights.png"),
    formList: [{
      elementType: 'select_op',
      label: '语气选择',
      value: "upDropBox1",
      attempt: [
        '有说服力',
        '正式得体',
        '专业',
        '幽默',
        '热情',
      ]
    }, {
      elementType: 'input_op',
      label: '标题',
      value: "title",
      placeholder: '请输入标题'
    },
    ],
    example: '高情商的人有什么表现',
    fill: {
      title: '高情商的人有什么表现',
      downDropBox1: '有说服力',

    }
  },
  {
    title: "短视频脚本大纲",
    message:
      "生成vlog口播等短视频拍摄大纲",
    field: fieldList['视频创作'],
    type: '2',
    url: getImageUrl("video-authoring/short_video_script_outline.png"),
    formList: [{
      elementType: 'input_op',
      label: '拍摄主题',
      value: "title",
      placeholder: '请输入拍摄主题'
    }, {
      elementType: 'keys_op',
      label: '关键词',
      placeholder: "请输入关键词，用'、'分隔",
      value: 'keys',
    },
    {
      elementType: 'attempt_op',
      label: '试试',
      attempt: [
        '创业',
        '家庭',
        '商场'
      ],
    }],
    example: '创业成功，男生回忆起点点滴滴',
    fill: {
      title: '创业成功，男生回忆起点点滴滴',
      keys: '创业，家庭，商场',

    }
  },
  {
    title: "视频内容灵感",
    message:
      "蹭热点拍视频？让微撰来提供灵感",
    field: fieldList['视频创作'],
    type: '3',
    url: getImageUrl("video-authoring/video_content_inspiration.png"),
    formList: [{
      elementType: 'input_op',
      label: '话题',
      value: "title",
      placeholder: '请输入话题'
    }, {
      elementType: 'keys_op',
      label: '关键词',
      placeholder: "请输入关键词，用'、'分隔",
      value: 'keys',
    },
    {
      elementType: 'attempt_op',
      label: '试试',
      attempt: [
        'AI',
        'GPT'
      ],
    }],
    example: '人工智能写作',
    fill: {
      title: '人工智能写作',
      keys: 'AI,GPT',

    }
  },
  {
    title: "吸睛标题",
    message:
      "快速帮你生成特有吸引力的标题",
    field: fieldList['视频创作'],
    type: '4',
    url: getImageUrl("video-authoring/eye-catching_opening.png"),
    formList: [{
      elementType: 'input_op',
      label: '话题',
      value: "title",
      placeholder: '请输入话题'
    }, {
      elementType: 'keys_op',
      label: '关键词',
      placeholder: "请输入关键词，用'、'分隔",
      value: 'keys',
    },
    {
      elementType: 'attempt_op',
      label: '试试',
      attempt: [
        'AI',
        'GPT'
      ],
    }],
    example: '人工智能写作',
    fill: {
      title: '人工智能写作',
      keys: 'AI,GPT',

    }
  },
  {
    title: "短视频口播稿",
    message:
      "基于你的话题快速生成口播稿件",
    field: fieldList['视频创作'],
    type: '5',
    url: getImageUrl("video-authoring/short_video_oral_script.png"),
    formList: [{
      elementType: 'input_op',
      label: '话题',
      value: "title",
      placeholder: '请输入话题'
    }, {
      elementType: 'keys_op',
      label: '关键词',
      placeholder: "请输入关键词，用'、'分隔",
      value: 'keys',
    },
    {
      elementType: 'attempt_op',
      label: '试试',
      attempt: [
        'AI',
        'GPT'
      ],
    }],
    example: '人工智能写作',
    fill: {
      title: '人工智能写作',
      keys: 'AI,GPT',

    }
  },
  {
    title: "带货视频口播稿",
    message:
      "生成带货视频口播稿",
    field: fieldList['视频创作'],
    type: '6',
    url: getImageUrl("video-authoring/delivery_video_oral_script.png"),
    formList: [{
      elementType: 'keys_op',
      label: '关键词',
      placeholder: "请输入关键词，用'、'分隔",
      value: 'keys',
    },
    {
      elementType: 'attempt_op',
      label: '试试',
      attempt: [
        '羊毛衫',
        '保暖',
        '透气',
        '舒适'
      ],
    }],
    example: '带货关键词',
    fill: {
      keys: '羊毛衫,保暖,透气,舒适',

    }
  },
  {
    title: "通用行业",
    message: "垂直类大模型，可针对全行业进行营销写作",
    field: fieldList['推广营销'],
    type: '1',
    url: getImageUrl("promotion-marketing/general_industry.png"),
    formList: [{
      elementType: 'input_op',
      label: '品牌/主体',
      value: "title",
      placeholder: '请输入品牌/主体'
    }, {
      elementType: 'input_op',
      label: '商品描述',
      value: "subTitle",
      placeholder: '请输入商品描述'
    }, {
      elementType: 'input_op',
      label: '用户场景/人群',
      value: "title4",
      placeholder: '请输入用户场景/人群'
    }, {
      elementType: 'keys_op',
      label: '关键词',
      placeholder: "请输入关键词，用'、'分隔",
      value: 'keys',
    },
    {
      elementType: 'attempt_op',
      label: '试试',
      attempt: [
        '充电快',
        '容量大',
        '体积小',
        '携带方便'
      ],
    }],
    example: '微撰',
    fill: {
      title: '微撰',
      subTitle: '充电宝',
      title4: '上班族',
      keys: '充电快,容量大,体积小,携带方便',

    }
  },
  {
    title: "营销标题",
    message: "基于关键词快速帮你自动生成营销标题",
    field: fieldList['推广营销'],
    type: '2',
    url: getImageUrl("promotion-marketing/marketing_title.png"),
    formList: [{
      elementType: 'keys_op',
      label: '关键词',
      placeholder: "请输入关键词，用'、'分隔",
      value: 'keys',
    },
    {
      elementType: 'attempt_op',
      label: '试试',
      attempt: [
        '短视频',
        '自媒体',
        '推广',
        '引流'
      ],
    }],
    example: '营销关键词',
    fill: {

      keys: '短视频,自媒体,推广,引流',

    }
  },
  {
    title: "宠物生活",
    message: "针对不同品牌下的宠物商品生成符合该商品卖点信息",
    field: fieldList['推广营销'],
    type: '3',
    url: getImageUrl("promotion-marketing/pet_life.png"),
    formList: [{
      elementType: 'input_op',
      label: '品牌',
      value: "title",
      placeholder: '请输入品牌'
    }, {
      elementType: 'input_op',
      label: '商品描述',
      value: "subTitle",
      placeholder: '请输入商品描述'
    }, {
      elementType: 'keys_op',
      label: '关键词',
      placeholder: "请输入关键词，用'、'分隔",
      value: 'keys',
    },
    {
      elementType: 'attempt_op',
      label: '试试',
      attempt: [
        '全阶段',
        '宠物营养',
        '营养均衡'
      ],
    }],
    example: '微撰',
    fill: {
      title: '微撰',
      subTitle: '全鸡肉狗粮',
      keys: '全阶段,宠物营养,营养均衡',

    }
  },
  {
    title: "科技数码",
    message: "针对不同品牌下的科技商品生成符合该商品卖点信息",
    field: fieldList['推广营销'],
    type: '4',
    url: getImageUrl("promotion-marketing/tech_digital.png"),
    formList: [{
      elementType: 'input_op',
      label: '品牌',
      value: "title",
      placeholder: '请输入品牌'
    }, {
      elementType: 'input_op',
      label: '商品描述',
      value: "subTitle",
      placeholder: '请输入商品描述'
    }, {
      elementType: 'select_op',
      label: '文案风格',
      value: "downDropBox1",
      attempt: [
        '测评',
        '专业详实',
        '生动形象',
        '精准概况',
        '全面细致',
        '合理推荐',
        '客观公正'
      ]
    }, {
      elementType: 'keys_op',
      label: '关键词',
      placeholder: "请输入关键词，用'、'分隔",
      value: 'keys',
    },
    {
      elementType: 'attempt_op',
      label: '试试',
      attempt: [
        '轻薄',
        '长续航',
        'IPS屏',
        ' 3070显卡'
      ],
    }],
    example: '微撰',
    fill: {
      title: '微撰',
      subTitle: '笔记本',
      downDropBox1: '测评',
      keys: '轻薄,长续航,IPS屏,3070显卡',

    }
  },
  {
    title: "自定义输入项",
    message: "如聊天般，自定义输入内容，获得回答",
    field: fieldList['推广营销'],
    type: '5',
    url: getImageUrl("new-media/title_produce_paper.png"),
    formList: [{
      elementType: 'input_op',
      label: '标题',
      value: "title",
      placeholder: '请输入标题'
    }],
    example: '如何用抖音实现推广引流？',
    fill: {
      title: '如何用抖音实现推广引流？'

    }
  }
]
export {
  images,
  allList,
  tabList,
  fieldList
}
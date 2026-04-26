export type Language = 'fr' | 'en' | 'es' | 'ar' | 'nl' | 'zh';


export const DICTIONARY: Record<Language, any> = {
    zh: {
        common: {
            getStarted: "开始使用",
            login: "登录",
            signup: "注册",
            tryFree: "免费试用",
            popular: "最受欢迎",
            month: "/月",
            loading: "加载中...",
            choose: "选择",
            viewGuide: "查看完整指南",
            more: "查看更多",
            checkin: "入住",
            qrCodeWall: "扫码测试",
            checkout: "退房",
            location: "位置",
            viewOnMap: "在地图上查看",
            wifi: "无线网络",
        },
        socialProof: {
            trustpilot: "4.9/5 由 500+ 主持人评价",
            usedBy: "由顶级礼宾服务使用",
            autoTranslate: {
                title: "自动翻译",
                desc: "您的指南使用访客的语言。"
            },
            googleMaps: {
                title: "集成谷歌地图",
                desc: "直接在指南中查看谷歌地图。"
            }
        },
        hero: {
            tag: "适用于房东和礼宾服务",
            title: "再也不用重复 WiFi 密码。",
            subtitle: "数字化您的欢迎手册。提供五星级体验，减少 50% 的消息，并增加正面评价。",
            cta: "创建我的免费指南",
            demo: "查看示例",
            noCreditCard: "无需信用卡",
            setupTime: "2 分钟内配置完成",
        },
        features: {
            title: "您所需的一切。",
            subtitle: "没有多余。",
            description: "强大的工具可自动化您的接待并让您的旅客放心，没有技术复杂性。",
            items: {
                mobileFirst: {
                    title: "100% 移动优先",
                    desc: "无需下载应用程序。您的指南可在任何移动浏览器中即时打开。"
                },
                secure: {
                    title: "安全代码",
                    desc: "保护对 WiFi 和钥匙箱的访问。通过电子邮件或唯一代码解锁。"
                },
                map: {
                    title: "交互式地图",
                    desc: "集成您最喜欢的餐厅、酒吧和活动，点击即可获取谷歌地图路线。"
                },
                live: {
                    title: "实时修改",
                    desc: "更改 WiFi 代码或建议，所有手机上都会立即更新。"
                },
                translate: {
                    title: "自动翻译",
                    desc: "自动检测访问者手机的语言并翻译您的指南。"
                },
                checklist: {
                    title: "清单",
                    desc: "清晰的入住和退房说明。减少 80% 的重复问题。"
                }
            }
        },
        pricing: {
            title: "透明定价",
            subtitle: "免费开始。随时升级。",
            bestOffer: "世界上最好的优惠：",
            addon: "+20 DH / 额外指南",
            enterprise: {
                title: "需要企业解决方案？",
                desc: "对于管理超过 50 个物业的管理者，我们提供阶梯定价和 PMS 集成。",
                cta: "联系销售团队"
            },
            plans: {
                demo: {
                    name: "探索",
                    price: "免费",
                    desc: "无需信用卡即可测试 Maplyo 的强大功能。",
                    button: "创建指南（免费）",
                    features: [
                        '完全访问创建器',
                        '移动预览',
                        '无发布'
                    ]
                },
                basic: {
                    name: "基础",
                    price: "19 DH",
                    desc: "适合单个物业的房东。",
                    button: "选择基础版",
                    features: [
                        '1 个活跃指南',
                        '实时修改',
                        '无限访客',
                        '自动翻译'
                    ]
                },
                pro: {
                    name: "专业",
                    price: "49 DH",
                    desc: "适合专业房东和小型礼宾服务。",
                    button: "选择专业版",
                    features: [
                        '5 个活跃指南',
                        '包含基础版所有功能',
                        '去除 Maplyo 品牌（即将推出）',
                        '优先支持'
                    ]
                }
            }
        },
        dashboard: {
            title: "我的指南",
            createButton: "创建指南",
            emptyState: "您还没有指南。创建一个开始吧！",
            stats: {
                activeGuides: "活跃指南",
                totalViews: "总浏览量",
                storageUsed: "已用存储"
            },
            guideCard: {
                edit: "编辑",
                view: "查看",
                delete: "删除",
                confirmDelete: "您确定要删除此指南吗？此操作无法撤销。",
                lastUpdated: "最后更新",
                published: "已发布",
                draft: "草稿"
            },
            aiModal: {
                title: "AI 指南生成器",
                subtitle: "Maplyo AI 将为您生成完整的欢迎指南内容。",
                cityLabel: "城市名称",
                cityPlaceholder: "例如：巴黎",
                styleLabel: "接待风格",
                generateButton: "生成指南",
                generating: "正在生成中...",
                styles: {
                    professional: "专业",
                    warm: "温馨",
                    minimalist: "简约"
                }
            }
        },
        builder: {
            library: "组件库",
            canvas: "您的指南",
            settings: "设置",
            themeLabel: "主题",
            qrLabel: "二维码",
            publish: "发布",
            online: "在线",
            unpublish: "取消发布",
            confirmUnpublish: "您确定要取消发布此指南吗？它将不再向访客公开。",
            publishSuccess: "指南已成功发布！",
            publishError: "发布指南时出错。",
            backHome: "返回主页",
            backDashboard: "返回仪表板",
            editorMode: "编辑器模式",
            createAccount: "创建我的帐户并保存",
            saveCreateAccount: "保存并创建帐户",
            mobileMode: "您在移动设备上。请使用电脑以获得最佳编辑体验。",
            catEssentials: "基本",
            catTravel: "旅行",
            catBusiness: "业务",
            themeModal: {
                title: "选择主题",
                subtitle: "自定义指南的外观。"
            },
            themes: {
                "minimal-white": { name: "简约白", desc: "纯净简洁" },
                "soft-gray": { name: "柔和灰", desc: "优雅中性" },
                "ocean": { name: "海洋", desc: "宁静清新" },
                "nature": { name: "自然", desc: "恬静天然" },
                "sunset": { name: "日落", desc: "温馨宜人" },
                "paris": { name: "巴黎", desc: "埃菲尔铁塔背景" },
                "beach": { name: "沙滩", desc: "碧海金沙" },
                "mountains": { name: "山脉", desc: "高山风光" },
                "luxury": { name: "奢华金", desc: "极致优雅" },
                "zen": { name: "禅意", desc: "宁静致远" },
                "abstract": { name: "现代艺术", desc: "创意大胆" },
                "industrial": { name: "工业风", desc: "水泥质感" },
                "coastal": { name: "海岸别墅", desc: "明亮视野" },
                "mountain-chalet": { name: "木屋", desc: "温馨木质" },
                "urban-night": { name: "都市之夜", desc: "城市灯火" },
                "kyoto": { name: "京都园林", desc: "和谐自然" },
                "marrakech": { name: "马拉喀什", desc: "赭石暖色" },
                "chefchaouen": { name: "舍夫沙万", desc: "蓝色珍珠" },
                "casablanca": { name: "卡萨布兰卡", desc: "现代洁白" },
                "tanger": { name: "丹吉尔", desc: "地中海风情" },
                "fes": { name: "菲斯", desc: "历史韵味" },
                "agadir": { name: "阿加迪尔", desc: "阳光沙滩" },
                "boho": { name: "波西米亚", desc: "自然艺术" },
                "scandi": { name: "北欧风", desc: "极简主义" },
                "tropical": { name: "热带", desc: "丛林绿意" },
                "dark-luxe": { name: "黑金", desc: "暗夜奢华" },
                "greek": { name: "圣托里尼", desc: "蓝白经典" }
            }
        },
        showcase: {
            tag: "具体示例",
            title: "适应每处物业",
            description: "无论您管理的是单间公寓还是酒店，Maplyo 都能适应您的风格。",
            messageFrom: "消息来自",
            viewFull: "查看完整指南",
            example1: {
                type: "公寓",
                stat1: "WiFi 代码",
                stat2: "地铁",
                stat3: "咖啡馆",
                review: "谢谢指南，入住非常简单！"
            },
            example2: {
                type: "度假屋",
                stat1: "游泳池",
                stat2: "私人厨师",
                stat3: "远足",
                review: "我们很喜欢餐厅推荐！"
            },
            example3: {
                type: "旅馆",
                stat1: "土耳其浴室",
                stat2: "茶",
                stat3: "集市",
                review: "WiFi 二维码救了我们的命。"
            }
        },
        editor: {
            labels: {
                hero: "欢迎",
                wifi: "WiFi",
                access_codes: "访问代码",
                checkin: "入住",
                checkout: "退房",
                location: "位置",
                rules: "守则",
                contact: "联系",
                amenities: "设施",
                places: "建议",
                events: "活动",
                documents: "文件",
                upsells: "额外服务",
                trash: "垃圾",
                parking: "停车",
                breakfast: "早餐",
                transport: "交通",
                faq: "常见问题",
                embed: "链接"
            },
            common: {
                title: "标题",
                description: "描述",
                time: "时间",
                hours: "时间",
                location: "位置",
                address: "地址",
                instructions: "说明",
                videoUrl: "视频 (MP4) 或 YouTube 链接",
                mapUrl: "谷歌地图链接",
                phone: "电话",
                whatsapp: "WhatsApp",
                email: "电子邮件",
                price: "价格",
                tags: "标签",
                uploadImage: "上传图片",
                other: "其他",
                month: "月份",
                day: "日期",
                linkUrl: "网站链接",
                cost: "费用",
                priceCheap: "平价",
                priceModerate: "中等",
                priceExpensive: "高档",
                placeholderUrl: "https://...",
                placeholderWelcome: "我们很高兴欢迎您...",
                placeholderMonth: "1月",
                placeholderDay: "01",
                placeholderTime: "20:00",
                placeholderPrice: "25¥",
                placeholderReserve: "预订",
                placeholderAddress: "示例路123号, 上海",
                placeholderMap: "https://goo.gl/maps/...",
                placeholderPhone: "+86 138 0000 0000",
                placeholderWhatsapp: "8613800000000",
                placeholderEmail: "contact@example.com",
                placeholderTags: "浪漫, 海景, 意大利菜..."
            },
            wifi: {
                networkName: "网络名称",
                password: "密码",
                notes: "备注"
            },
            checkin: {
                timePlaceholder: "例如：15:00",
                instrPlaceholder: "访问说明..."
            },
            contact: {
                nameLabel: "显示名称",
                namePlaceholder: "您的姓名"
            },
            rules: {
                title: "守则",
                placeholder: "例如：晚上 10 点后保持安静",
                add: "添加守则"
            },
            amenities: {
                title: "设施",
                placeholder: "例如：咖啡机",
                add: "添加设施"
            },
            faq: {
                question: "问题",
                answer: "回答",
                qPlaceholder: "例如：有 WiFi 吗？",
                aPlaceholder: "有，代码是...",
                add: "添加问题"
            },
            trash: {
                dayTrash: "垃圾收集日",
                dayRecycling: "回收收集日",
                location: "箱子位置",
                photoLocal: "垃圾房照片"
            },
            parking: {
                costPlaceholder: "例如：免费 / 每小时 2 欧元",
                photo: "停车照片"
            },
            breakfast: {
                menu: "菜单 / 详细信息",
                menuPlaceholder: "欧陆式自助餐，当地产品..."
            },
            transport: {
                bus: "巴士",
                train: "火车 / 地铁",
                taxi: "出租车",
                bike: "自行车",
                stop: "说明 / 站点",
                add: "添加交通"
            },
            places: {
                aiButton: "AI 推荐",
                name: "地点名称",
                add: "添加地点"
            },
            events: {
                aiButton: "寻找活动",
                add: "添加活动"
            },
            documents: {
                name: "文件名称",
                url: "文件链接 (PDF...)",
                add: "添加文件"
            },
            upsells: {
                buttonText: "按钮文字",
                buttonLink: "按钮链接",
                add: "添加优惠",
                image: "优惠图片"
            },
            access_codes: {
                security: "安全",
                mode: "模式",
                alwaysVisible: "始终可见",
                unlockByCode: "代码解锁",
                unlockCode: "解锁代码",
                unlockCodeDesc: "例如：您发送给旅客的代码。",
                aptCode: "房门代码",
                buildingCode: "大门代码",
                gateCode: "门禁代码",
                notes: "备注"
            },
            embed: {
                url: "要集成的链接 (Iframe)",
                warning: "确保该网站允许集成 (X-Frame-Options)。"
            }
        },
        renderer: {
            searchPlaceholder: "搜索信息、代码...",
            wifi: "无线网络",
            access: "访问密码",
            checkin: "入住",
            checkout: "退房",
            location: "位置",
            rules: "房屋守则",
            contact: "联系方式",
            amenities: "设施",
            places: "附近地点",
            events: "活动",
            documents: "文件",
            upsells: "额外服务",
            embed: "内容",
            welcome: "欢迎",
            trash: "垃圾",
            parking: "停车",
            breakfast: "早餐",
            transport: "交通",
            days: "天",
            hours: "小时",
            minutes: "分钟",
            network: "网络",
            password: "密码",
            copy: "复制",
            copied: "已复制！",
            getDirections: "获取路线",
            openMaps: "打开地图",
            call: "呼叫",
            message: "消息",
            empty: "未找到结果",
            seeAll: "查看全部",
            less: "收起",
            scanQr: "扫码下载",
            share: "分享",
            download: "下载",
            tipOfTheDay: "今日小贴士",
            sunday: "星期日",
            monday: "星期一",
            tuesday: "星期二",
            wednesday: "星期三",
            thursday: "星期四",
            friday: "星期五",
            saturday: "星期六",
            lazy: "慵懒",
            mood: "心情",
            discovery: "探索",
            tasty: "美食",
            adventure: "冒险",
            festive: "节庆",
            outing: "郊游",
            brunch: "早午餐",
            explore: "探索市中心",
            museums: "参观博物馆",
            taste: "品尝特产",
            excursion: "去郊游",
            nightlife: "夜生活",
            walk: "散步",
            items: "项目",
            viewMap: "查看地图",
            secureAccess: "安全访问",
            addBlock: "添加区块",
            blockProperties: "区块属性",
            selectToEdit: "选择要编辑的区块",
            startHere: "从这里开始",
            selectBlocks: "从左侧菜单选择区块来构建您的指南。",
            mobilePreview: "手机预览",
            chooseTheme: "选择主题",
            reset: "重置",
            viewGuide: "查看指南 ↗",
            defaultGuideTitle: "旅客",
            themeModal: {
                title: "选择主题",
                subtitle: "个性化您的指南外观。"
            }
        },
        ai: {
            assistant: "AI 助手",
            online: "在线",
            empty: "您可以问我关于住宿的任何问题！",
            thinking: "思考中...",
            placeholder: "提问...",
            error: "抱歉，出错了。"
        }
    },
    fr: {
        common: {
            getStarted: "Commencer",
            login: "Connexion",
            signup: "S'inscrire",
            tryFree: "Essayer Gratuitement",
            popular: "Le plus populaire",
            month: "/mois",
            loading: "Chargement...",
            choose: "Choisir",
            viewGuide: "Voir le guide complet",
            more: "Voir plus",
            checkin: "Arrivée",
            qrCodeWall: "Scannez pour tester",
            checkout: "Départ",
            location: "Localisation",
            viewOnMap: "Voir sur la carte",
            wifi: "WiFi",
        },
        socialProof: {
            trustpilot: "4.9/5 par 500+ Hôtes",
            usedBy: "Utilisé par les meilleures conciergeries",
            autoTranslate: {
                title: "Auto-Traduit",
                desc: "Vos guides parlent la langue de vos invités."
            },
            googleMaps: {
                title: "Google Maps Intégré",
                desc: "Google Maps directement dans le guide."
            }
        },
        hero: {
            tag: "POUR LES HÔTES ET CONCIERGERIES",
            title: "Ne répétez plus jamais le code WiFi.",
            subtitle: "Digitalisez votre livret d'accueil. Offrez une expérience 5 étoiles, réduisez les messages de 50%, et augmentez vos avis positifs.",
            cta: "Créer mon guide gratuit",
            demo: "Voir un exemple",
            noCreditCard: "Pas de carte requise",
            setupTime: "Configuré en 2 min",
        },
        features: {
            title: "Tout ce dont vous avez besoin.",
            subtitle: "Rien de superflu.",
            description: "Des outils puissants pour automatiser votre accueil et rassurer vos voyageurs, sans la complexité technique.",
            items: {
                mobileFirst: {
                    title: "100% Mobile First",
                    desc: "Pas d'application à télécharger. Vos guides s'ouvrent instantanément dans n'importe quel navigateur mobile."
                },
                secure: {
                    title: "Codes Sécurisés",
                    desc: "Protégez l'accès au WiFi et aux boîtes à clés. Déverrouillage par email ou code unique."
                },
                map: {
                    title: "Carte Interactive",
                    desc: "Intégrez vos restaurants, bars et activités préférés avec itinéraires Google Maps en un clic."
                },
                live: {
                    title: "Modifications Live",
                    desc: "Changez le code WiFi ou une recommandation, c'est mis à jour instantanément sur tous les téléphones."
                },
                translate: {
                    title: "Traduction Auto",
                    desc: "Détecte automatiquement la langue du téléphone du visiteur et traduit votre guide."
                },
                checklist: {
                    title: "Check-lists",
                    desc: "Instructions claires pour l'arrivée et le départ. Réduisez les questions répétitives de 80%."
                }
            }
        },
        pricing: {
            title: "Tarification Transparente",
            subtitle: "Commencez gratuitement. Évoluez quand vous voulez.",
            bestOffer: "La meilleure offre du monde :",
            addon: "+20 DH / guide supplémentaire",
            enterprise: {
                title: "Besoin d'une solution Enterprise ?",
                desc: "Pour les gestionnaires de plus de 50 propriétés, nous proposons des tarifs dégressifs et une intégration PMS.",
                cta: "Contacter l'équipe commerciale"
            },
            plans: {
                demo: {
                    name: "Découverte",
                    price: "Gratuit",
                    desc: "Testez la puissance de Maplyo sans carte bancaire.",
                    button: "Créer un guide (Gratuit)",
                    features: [
                        'Accès complet au Créateur',
                        'Prévisualisation Mobile',
                        'Sans publication'
                    ]
                },
                basic: {
                    name: "Essentiel", // Was Basic
                    desc: "Pour lancer votre première propriété.",
                    button: "Démarrer",
                    features: [
                        'Livret Digital Complet',
                        'QR Code WiFi Instantané',
                        'Carte Interactive (Google Maps)',
                        'Thèmes Gratuits (Pack Premium +15 DH)',
                        '1 Guide Unique'
                    ]
                },
                pro: {
                    name: "Croissance", // Was Pro
                    desc: "Pour maximiser vos revenus & avis.",
                    button: "Passer en Croissance",
                    features: [
                        'Guides Illimités (+20 DH/supp.)',
                        'Thèmes Premium INCLUS',
                        'Traduction Automatique (IA)',
                        'Assistant Voyageur 24/7 (IA)',
                        'Support Prioritaire WhatsApp'
                    ]
                },
                business: {
                    name: "Agence",
                    desc: "Pour les portfolios de 10+ biens.",
                    button: "Parler à un Expert",
                    price: "Sur mesure",
                    features: [
                        'Guides Illimités',
                        'Tableau de Bord Multi-Propriétés',
                        'Marque Blanche (Sans logo Maplyo)',
                        'Intégration PMS & Channel Mgr',
                        'Facturation Centralisée'
                    ]
                }
            },
            trust: "Garantie Satisfait ou Remboursé (30 jours) • Paiement Sécurisé SSL"
        },
        testimonials: {
            title: "Approuvé par les Pros",
            subtitle: "Rejoignez plus de 500 hôtes qui ont automatisé leur accueil.",
            items: [
                {
                    name: "Jean-Philippe R.",
                    role: "Superhost Airbnb (Marrakech)",
                    text: "Mes voyageurs arrêtaient pas de demander le code Wifi ou comment allumer la clim. Avec Maplyo, ils ont tout sur leur téléphone. J'ai gagné facile 2h par semaine.",
                    result: "-60% de messages",
                },
                {
                    name: "Sofia B.",
                    role: "Gérante Conciergerie (Casablanca)",
                    text: "Le game changer pour nous, c'est l'upsell. On propose des services de ménage ou de transport directement dans le guide. Ça a boosté notre chiffre d'affaires.",
                    result: "+15% revenus",
                },
                {
                    name: "Karim M.",
                    role: "Propriétaire Riad (Fès)",
                    text: "Très pro. L'aspect multilingue est bluffant, mes clients américains et espagnols sont ravis d'avoir les infos dans leur langue sans que je fasse rien.",
                    result: "5★ Avis",
                }
            ]
        },
        faq: {
            title: "Questions Fréquentes",
            subtitle: "Tout ce que vous devez savoir pour démarrer.",
            questions: [
                {
                    q: "Faut-il des compétences techniques ?",
                    a: "Aucune. C'est aussi simple que de remplir un profil Facebook. Vous ajoutez vos infos, on génère le design."
                },
                {
                    q: "Comment mes voyageurs accèdent au guide ?",
                    a: "Via un simple QR Code que vous placez dans le logement, ou un lien que vous envoyez par message avant leur arrivée."
                },
                {
                    q: "Puis-je modifier le guide après impression du QR Code ?",
                    a: "Oui ! C'est la magie du numérique. Mettez à jour vos infos (code wifi, restos...) et le QR Code reste le même."
                },
                {
                    q: "Y a-t-il un engagement ?",
                    a: "Non, c'est sans engagement. Vous pouvez arrêter quand vous voulez."
                }
            ]
        },
        footer: {
            product: "Produit",
            support: "Support",
            legal: "Légal",
            desc: "Maplyo aide les hôtes et les conciergeries à offrir une expérience 5 étoiles grâce à des guides digitaux intelligents.",
            links: {
                features: "Fonctionnalités",
                pricing: "Tarifs",
                testimonials: "Témoignages",
                roadmap: "Roadmap",
                help: "Aide",
                contact: "Contact",
                privacy: "Confidentialité",
                terms: "Conditions",
                legal: "Mentions légales"
            },
            securePayment: "Paiement Sécurisé",
            rights: "Tous droits réservés."
        },
        cta: {
            title: "Prêt à impressionner ?",
            subtitle: "Rejoignez la nouvelle génération d'hôtes qui offrent une expérience exceptionnelle.",
            button: "Créer mon premier guide",
            subtext: "Aucune carte de crédit requise • Annulable à tout moment"
        },
        showcase: {
            tag: "Exemples Concrets",
            title: "Adapté à chaque propriété",
            subtitle: "Que vous gériez un studio ou un hôtel, Maplyo s'adapte à votre style.",
            viewFull: "Voir le guide complet",
            messageFrom: "Message de",
            types: {
                apartment: "Appartement",
                vacationHome: "Maison de Vacances",
                guesthouse: "Maison d'Hôtes"
            },
            features: {
                wifi: "Code WiFi",
                metro: "Métro",
                coffee: "Cafés",
                pool: "Piscine",
                chef: "Chef à dom.",
                tours: "Excursions",
                hammam: "Hammam",
                tea: "Thé",
                souks: "Souks"
            },
            reviews: {
                sarah: "Merci pour le guide, l'arrivée était super simple !",
                marcJulie: "On a adoré les recos de restos !",
                thomas: "Le QR code WiFi a sauvé notre arrivée."
            }
        },
        // Daily Tips
        tipOfTheDay: "Conseil du Jour",
        sunday: "Dimanche",
        monday: "Lundi",
        tuesday: "Mardi",
        wednesday: "Mercredi",
        thursday: "Jeudi",
        friday: "Vendredi",
        saturday: "Samedi",
        lazy: "Détente",
        mood: "Motivé",
        discovery: "Découverte",
        tasty: "Gourmand",
        adventure: "Aventure",
        festive: "Festif",
        outing: "Sortie",
        brunch: "Un brunch à",
        explore: "Explorez le centre de",
        museums: "Visitez les musées de",
        taste: "Goutez aux spécialités de",
        excursion: "Partez en excursion.",
        nightlife: "La vie nocturne de",
        walk: "Baladez-vous à",
        guide: {
            accessCode: "Codes d'accès",
            locked: "Ce bloc est protégé par un code.",
            enterCode: "Code d'accès",
            apartmentDoor: "Porte logement :",
            buildingDoor: "Porte immeuble :",
            gate: "Portail :",
            notes: "Notes",
            confirm: "Valider"
        },

        qrCodeWall: {
            titlePart1: "Partagez votre guide",
            titlePart2: "partout",
            description: "Un simple scan suffit pour vos voyageurs.",
            items: {
                wifi: { title: "Connexion Wi-Fi", desc: "Le code est pré-complété" },
                perpetual: { title: "Accès Permanent", desc: "Le lien reste valide" },
                remote: { title: "Mises à jour en direct", desc: "Toujours à jour" }
            },
            visual: {
                welcome: "Bienvenue",
                scan: "Scannez-moi",
                detected: "Code QR Détecté",
                notification: {
                    app: "Maplyo",
                    title: "Ouvrir le guide"
                }
            }
        },
        upsells: "Extras",
        legalPage: {
            titlePrivacy: "Politique de Confidentialité",
            titleTerms: "Conditions Générales d'Utilisation (CGU)",
            lastUpdated: "Dernière mise à jour :",
            effectiveDate: "En vigueur au :",
            privacy: {
                intro: "La présente politique de confidentialité décrit comment Maplyo ('nous', 'notre') collecte, utilise et protège vos données personnelles, conformément à la loi marocaine n° 09-08 relative à la protection des personnes physiques à l'égard du traitement des données à caractère personnel.",
                section1: {
                    title: "1. Collecte des Données",
                    items: [
                        "Données d'identification : Nom, prénom, adresse email.",
                        "Données de transaction : Historique de paiements (traités de manière sécurisée par Stripe, nous ne stockons pas vos données bancaires complètes).",
                        "Données d'utilisation : Informations sur la création et la consultation des guides numériques."
                    ]
                },
                section2: {
                    title: "2. Finalités du Traitement",
                    intro: "Vos données sont collectées pour :",
                    items: [
                        "Fournir et gérer le service de guide numérique.",
                        "Gérer votre abonnement et la facturation.",
                        "Vous communiquer les mises à jour importantes du service.",
                        "Améliorer nos fonctionnalités grâce à des statistiques anonymisées."
                    ]
                },
                section3: {
                    title: "3. Partage des Données",
                    content: "Nous ne vendons jamais vos données. Elles peuvent être partagées uniquement avec nos prestataires techniques essentiels (ex: Stripe pour les paiements, Supabase pour l'hébergement, Resend pour les emails) qui sont tenus à une stricte confidentialité."
                },
                section4: {
                    title: "4. Sécurité",
                    content: "Nous mettons en œuvre des mesures de sécurité techniques (chiffrement SSL, protocoles sécurisés) pour protéger vos données contre tout accès non autorisé."
                },
                section5: {
                    title: "5. Vos Droits",
                    content: "Conformément à la loi 09-08, vous disposez d'un droit d'accès, de rectification et d'opposition concernant vos données.",
                    contact: "Pour exercer ce droit, contactez-nous à : contact@maplyo.com"
                }
            },
            terms: {
                intro: "Bienvenue sur Maplyo. En accédant à notre plateforme ou en utilisant nos services, vous acceptez d'être lié par les présentes Conditions Générales d'Utilisation.",
                section1: {
                    title: "1. Description du Service",
                    content: "Maplyo est une plateforme SaaS (Software as a Service) permettant aux hôtes et gestionnaires immobiliers de créer, héberger et partager des livrets d'accueil numériques pour leurs voyageurs."
                },
                section2: {
                    title: "2. Abonnements et Paiements",
                    items: [
                        "Facturation : Les services sont facturés mensuellement ou annuellement, d'avance.",
                        "Annulation : Vous pouvez annuler votre abonnement à tout moment via votre tableau de bord. L'accès aux fonctionnalités Premium reste actif jusqu'à la fin de la période facturée.",
                        "Remboursement : Nous offrons une garantie 'Satisfait ou Remboursé' de 30 jours pour tout nouvel abonnement."
                    ]
                },
                section3: {
                    title: "3. Responsabilités de l'Utilisateur",
                    intro: "Vous vous engagez à :",
                    items: [
                        "Fournir des informations exactes lors de votre inscription.",
                        "Ne pas publier de contenu illicite, diffamatoire ou contraire aux bonnes mœurs dans vos guides.",
                        "Être seul responsable des informations (codes wifi, adresses) partagées avec vos voyageurs."
                    ]
                },
                section4: {
                    title: "4. Propriété Intellectuelle",
                    content: "Maplyo reste propriétaire de la plateforme, du code, et de la marque. Vous restez propriétaire du contenu (textes, photos) que vous ajoutez dans vos guides."
                },
                section5: {
                    title: "5. Limitation de Responsabilité",
                    content: "Maplyo ne saurait être tenu responsable des dommages indirects, pertes de revenus ou problèmes survenus suite à l'utilisation d'informations contenues dans les guides créés par les utilisateurs."
                },
                section6: {
                    title: "6. Droit Applicable",
                    content: "Ces conditions sont régies par le droit marocain. Tout litige relatif à leur interprétation et/ou à leur exécution relève des tribunaux compétents de Casablanca."
                }
            }
        },
        auth: {
            login: {
                title: "Bon retour 👋",
                subtitle: "Connectez-vous pour gérer vos guides",
                email: "Email",
                password: "Mot de passe",
                forgot: "Oublié ?",
                submit: "Se connecter",
                noAccount: "Pas encore de compte ?",
                createFree: "Créer un compte gratuitement",
                resetLink: "Problème de connexion ? Réinitialiser",
                error: "Une erreur inattendue est survenue."
            },
            signup: {
                title: "Rejoignez Maplyo",
                subtitle: "Créez des guides d'exception en quelques minutes.",
                firstName: "Prénom",
                lastName: "Nom",
                businessEmail: "Email professionnel",
                businessName: "Nom de l'établissement",
                phone: "Téléphone",
                passwordLabel: "Mot de passe",
                passwordHint: "Minimum 6 caractères",
                submit: "Commencer gratuitement",
                hasAccount: "Déjà un compte ?",
                signIn: "Se connecter",
                successTitle: "Compte créé !",
                successMsg: "Un email de confirmation vient d'être envoyé à",
                successDesc: "Veuillez cliquer sur le lien pour activer votre compte.",
                backToLogin: "Retour à la connexion"
            }
        },
        dashboard: {
            title: "Mes Guides",
            subtitle: "Gérez vos expériences voyageurs.",
            newGuide: "Nouveau Guide",
            emptyTitle: "Aucun guide pour le moment",
            emptyDesc: "Créez votre premier guide pour offrir une expérience exceptionnelle à vos voyageurs.",
            tryAi: "✨ Essayer l'IA",
            createManual: "Créer manuellement",
            published: "En ligne",
            draft: "Brouillon",
            edit: "Éditer",
            sortRecent: "Récents",
            sortName: "Nom",
            logout: "Se déconnecter",
            viewPublic: "Voir le guide public",
            passProToShare: "Passer Pro pour partager",
            delete: "Supprimer",
            confirmDelete: "Êtes-vous sûr de vouloir supprimer ce guide ? Ce sera définitif.",
            deleteError: "Erreur lors de la suppression.",
            aiModal: {
                title: "Création Magique ✨",
                city: "Ville ou Lieu",
                cityPlaceholder: "Ex: Marrakech, Quartier Guéliz",
                type: "Type",
                typeAirbnb: "Airbnb / Appartement",
                typeHotel: "Hôtel / Riad",
                typeGuesthouse: "Maison d'hôtes",
                audience: "Voyageurs",
                audienceFamilies: "Familles",
                audienceCouples: "Couples",
                audienceRemote: "Télétravailleurs",
                audienceGroups: "Groupes",
                generate: "Générer mon guide",
                generating: "L'IA rédige votre guide...",
                generatingDesc: "Création des recommandations pour"
            },
            createModal: {
                title: "Nouveau Voyage",
                nameLabel: "Nom du guide",
                namePlaceholder: "Ex: Riad des Lumières",
                cancel: "Annuler",
                create: "Créer le guide"
            },
            limitModal: {
                title: "Limite de guides atteinte 🏠",
                desc: "Vous avez atteint la limite de guides autorisés par votre abonnement actuel.",
                upgrade: "🚀 Passer à l'illimité (Pro)",
                or: "Ou",
                addon: "➕ Rajouter juste 1 guide",
                loading: "Chargement..."
            },
            addonSuccessModal: {
                title: "Guide ajouté ! ✨",
                heading: "C'est prêt !",
                desc: "Votre limite a été augmentée de 1 guide. Vous pouvez désormais créer votre nouveau guide dès maintenant.",
                cta: "Super, merci !"
            },
            proModal: {
                heading: "Vous êtes Pro !",
                desc: "Votre abonnement Pro est actif. Profitez de guides illimités et de toutes les fonctionnalités premium.",
                cta: "Commencer à créer"
            }
        },
        pricingPage: {
            hero: {
                badge: "Investissez dans l'excellence",
                title1: "Un guide pro,",
                title2: "au prix d'un café.",
                subtitle: "Augmentez vos revenus directs, réduisez les questions répétitives et offrez une expérience 5 étoiles. Rentabilisé dès la première réservation."
            },
            popular: "Populaire",
            header: { login: "Connexion", signup: "S'inscrire" },
            compare: {
                title: "Comparatif Détaillé",
                subtitle: "Tout ce dont vous avez besoin pour réussir.",
                features: {
                    unlimited: "Guides Illimités",
                    maps: "Intégration Google Maps",
                    translation: "Traduction IA (toutes langues)",
                    domain: "Nom de domaine personnalisé",
                    support: "Support Prioritaire",
                    whiteLabel: "Marque Blanche (Sans logo Maplyo)",
                    analytics: "Analytiques Avancées"
                },
                values: { oneLang: "1 langue", unlimited: "Illimité", emailSupport: "Email", whatsappSupport: "WhatsApp 24/7" }
            },
            faqSection: {
                title: "Questions Fréquentes",
                subtitle: "Nous sommes transparents. Voici les réponses.",
                items: [
                    { q: "Puis-je changer de plan à tout moment ?", a: "Oui, absolument. Vous pouvez passer du plan Basic au plan Pro depuis votre dashboard. Le changement est immédiat et le prorata est calculé automatiquement." },
                    { q: "Y a-t-il un engagement ?", a: "Non, aucune période d'engagement. Nos abonnements sont mensuels et vous pouvez annuler à tout moment en un clic. Pas de frais cachés." },
                    { q: "Comment fonctionne le paiement ?", a: "Nous utilisons Stripe, le leader mondial du paiement en ligne sécurisé. Vos coordonnées bancaires ne sont jamais stockées sur nos serveurs." },
                    { q: "Le support est-il inclus ?", a: "Oui ! Le support par email est inclus dans tous les plans payants. Le plan Pro bénéficie d'une ligne prioritaire et d'un contact WhatsApp pour une assistance ultra-rapide." }
                ]
            },
            trust: "Ils nous font confiance",
            addonLabel: "/ guide supp."
        },
        guideLock: {
            title: "Accès sécurisé",
            desc: "Veuillez déverrouiller ce guide pour accéder aux codes d'accès et informations sensibles.",
            demoCode: "Code de démonstration"
        },
        builder: {
            editorMode: "Mode Éditeur",
            library: "Bibliothèque",
            catEssentials: "Essentiels",
            catTravel: "Voyage",
            catBusiness: "Business",
            guideStructure: "Structure du guide",
            emptyGuide: "Ton guide est vide",
            mobileMode: "Mode Consultation",
            blockTitle: "Titre du bloc",
            editing: "Édition en cours",
            close: "Fermer",
            selectBlock: "Sélectionne un bloc pour le modifier",
            paramsHere: "Les paramètres apparaîtront ici",
            designTheme: "Design & Thème",
            upgradePro: "Passer en PRO pour débloquer tous les thèmes premium.",
            unlock: "Débloquer",
            unlockPublish: "Débloquez la publication",
            publishDesc: "La publication de guides est réservée aux membres Pro. Abonnez-vous pour partager vos guides avec vos invités !",
            seeOffers: "Voir les offres",
            createAccount: "Créer mon compte",
            saveCreateAccount: "Sauvegarder (Créer compte)",
            online: "En Ligne",
            unpublish: "Dépublier",
            confirmUnpublish: "Voulez-vous vraiment retirer ce guide du public ?",
            publish: "Publier",
            publishSuccess: "Guide publié avec succès ! 🚀",
            publishError: "Erreur lors de la publication.",
            backHome: "Retour à l'accueil",
            backDashboard: "Retour au Dashboard",
            themeLabel: "Thème",
            qrLabel: "QR",
            blocks: "blocs",
            addBlock: "Ajouter un bloc",
            blockProperties: "Propriétés du bloc",
            selectToEdit: "Sélectionne un bloc pour le modifier",
            startHere: "Commencez ici",
            selectBlocks: "Sélectionnez des blocs dans le menu de gauche pour construire votre guide.",
            mobilePreview: "Aperçu mobile",
            chooseTheme: "Choisir un thème",
            reset: "Réinitialiser",
            viewGuide: "Voir le guide ↗",
            defaultGuideTitle: "Voyageur",
            themeModal: {
                title: "Choisir un thème",
                subtitle: "Personnalisez le look de votre guide."
            },
            themes: {
                "minimal-white": { name: "Blanc Minimaliste", desc: "Épuré et simple" },
                "soft-gray": { name: "Gris Doux", desc: "Élégant et neutre" },
                "ocean": { name: "Océan", desc: "Apaisant et frais" },
                "nature": { name: "Nature", desc: "Calme et naturel" },
                "sunset": { name: "Sunset", desc: "Chaleureux et accueillant" },
                "paris": { name: "Paris", desc: "Tour Eiffel en fond" },
                "beach": { name: "Plage", desc: "Mer et sable" },
                "mountains": { name: "Montagnes", desc: "Paysage alpin" },
                "luxury": { name: "Luxe Doré", desc: "Élégance ultime" },
                "zen": { name: "Zen & Bambou", desc: "Calme et sérénité" },
                "abstract": { name: "Art Moderne", desc: "Créatif et audacieux" },
                "industrial": { name: "Loft Industriel", desc: "Béton et caractère" },
                "coastal": { name: "Villa Côtière", desc: "Lumière et horizon" },
                "mountain-chalet": { name: "Chalet Alpin", desc: "Bois et chaleur" },
                "urban-night": { name: "Nuit Urbaine", desc: "Lumières de la ville" },
                "kyoto": { name: "Jardin Kyoto", desc: "Harmonie et nature" },
                "marrakech": { name: "Marrakech", desc: "Ocre et chaleur" },
                "chefchaouen": { name: "Chefchaouen", desc: "La Perle Bleue" },
                "casablanca": { name: "Casablanca", desc: "Moderne et blanc" },
                "tanger": { name: "Tanger", desc: "Méditerranée" },
                "fes": { name: "Fès", desc: "Histoire et authenticité" },
                "agadir": { name: "Agadir", desc: "Soleil et Océan" },
                "boho": { name: "Bohemian Chic", desc: "Naturel et artistique" },
                "scandi": { name: "Scandinave", desc: "Minimalisme nordique" },
                "tropical": { name: "Tropiques", desc: "Jungle et vert" },
                "dark-luxe": { name: "Noir & Or", desc: "Luxe nocturne" },
                "greek": { name: "Santorini", desc: "Bleu et Blanc" }
            }
        },
        editor: {
            common: {
                title: "Titre",
                description: "Description",
                instructions: "Instructions",
                placeholder: "Ex: ...",
                add: "Ajouter",
                remove: "Supprimer",
                save: "Enregistrer",
                cancel: "Annuler",
                uploadImage: "Image de couverture",
                uploadFile: "Charger un fichier",
                videoUrl: "Vidéo (MP4) ou URL YouTube",
                mapUrl: "Lien Google Maps (Optionnel)",
                address: "Adresse complète",
                phone: "Téléphone",
                email: "Email",
                whatsapp: "WhatsApp (Numéro international)",
                price: "Prix",
                cost: "Coût",
                time: "Heure",
                hours: "Horaires",
                location: "Lieu",
                tags: "Tags (séparés par virgule)",
                linkText: "Texte du bouton",
                linkUrl: "Lien du bouton",
                other: "Autre",
                priceCheap: "Abordable",
                priceModerate: "Moyen",
                priceExpensive: "Luxe",
                placeholderUrl: "https://...",
                placeholderWelcome: "Nous sommes ravis de vous accueillir...",
                placeholderMonth: "JAN",
                placeholderDay: "01",
                placeholderTime: "20:00",
                placeholderPrice: "25€",
                placeholderReserve: "Réserver",
                placeholderTags: "Romantique, Vue mer, Italien..."
            },
            wifi: {
                networkName: "Nom du réseau",
                password: "Mot de passe",
                notes: "Note (optionnel)"
            },
            labels: {
                hero: "Hero",
                wifi: "Wi‑Fi",
                access_codes: "Codes d’accès",
                checkin: "Arrivée",
                checkout: "Départ",
                location: "Localisation",
                contact: "Contact",
                rules: "Règles",
                trash: "Déchets & Tri",
                parking: "Parking",
                breakfast: "Petit Déjeuner",
                transport: "Transports",
                welcome: "Bienvenue",
                amenities: "Équipements",
                faq: "FAQ",
                places: "Lieux recommandés",
                events: "Événements",
                documents: "Documents",
                upsells: "Upsells & extras",
                embed: "Intégration Web"
            },
            checkin: {
                timePlaceholder: "ex: 15:00",
                instrPlaceholder: "Instructions d'accès..."
            },
            contact: {
                nameLabel: "Nom affiché",
                namePlaceholder: "Votre Nom"
            },
            rules: {
                title: "Règle",
                add: "Ajouter une règle",
                placeholder: "ex: Pas de bruit après 22h"
            },
            amenities: {
                title: "Équipement",
                add: "Ajouter un équipement",
                placeholder: "ex: Machine à café"
            },
            faq: {
                question: "Question",
                answer: "Réponse",
                add: "Ajouter une question",
                qPlaceholder: "ex: Y a-t-il le wifi ?",
                aPlaceholder: "Oui, le code est..."
            },
            trash: {
                dayTrash: "Jour des Poubelles (Ordures)",
                dayRecycling: "Jour du Recyclage (Jaune)",
                location: "Emplacement des bacs",
                photoLocal: "Photo du local"
            },
            parking: {
                photo: "Photo du parking",
                costPlaceholder: "ex: Gratuit / 2€ par heure"
            },
            breakfast: {
                menu: "Au Menu / Détails",
                menuPlaceholder: "Buffet continental, produits locaux..."
            },
            transport: {
                add: "Ajouter un transport",
                stop: "Description / Arrêt",
                bus: "Bus",
                train: "Train / Métro",
                taxi: "Taxi / VTC",
                bike: "Vélo"
            },
            places: {
                name: "Nom du lieu",
                add: "Ajouter un lieu",
                aiButton: "Recommandation IA"
            },
            events: {
                add: "Ajouter un événement",
                month: "Mois (3 lettres)",
                day: "Jour",
                aiButton: "Trouver des événements"
            },
            documents: {
                add: "Ajouter un document",
                name: "Nom du document",
                url: "URL du fichier (PDF...)"
            },
            upsells: {
                add: "Ajouter une offre",
                image: "Image de l'offre",
                buttonText: "Texte du bouton",
                buttonLink: "Lien du bouton"
            },
            access_codes: {
                security: "Sécurité",
                mode: "Mode",
                alwaysVisible: "Toujours visible",
                unlockByCode: "Déverrouillage par code",
                unlockCode: "Code de déverrouillage",
                unlockCodeDesc: "Ex: le code que tu envoies au voyageur.",
                aptCode: "Code porte logement",
                buildingCode: "Code porte immeuble",
                gateCode: "Code portail",
                notes: "Notes"
            },
            embed: {
                url: "URL à intégrer (Iframe)",
                warning: "Assurez-vous que le site autorise l'intégration (X-Frame-Options)."
            }
        },
        settings: {
            title: "Paramètres & Compte",
            tabProfile: "Profil",
            tabPlan: "Abonnement",
            tabShop: "Boutique (Upsells)",
            personalInfo: "Informations Personnelles",
            fullName: "Nom Complet",
            email: "Email",
            saveProfile: "Enregistrer le Profil",
            yourPlan: "Votre Abonnement",
            currentPlan: "Plan Actuel",
            manageSubscription: "Gérer l'abonnement",
            success: "Succès",
            error: "Erreur"
        },
        guideBlocks: {
            wifi: { network: "Réseau", password: "Mot de passe", scan: "Scanner pour rejoindre" },
            accessCodes: { code: "Codes d'accès", location: "Emplacement", instruction: "Instructions" },
            location: { viewOnMap: "Voir sur la carte", address: "Adresse", copyAddress: "Copier l'adresse", openInMaps: "Ouvrir dans Google Maps", notSet: "Adresse non renseignée" },
            transport: { getThere: "S'y rendre", parking: "Parking", noInfo: "Aucune info transport", call: "Appeler" },
            checkIn: { title: "Arrivée" },
            checkOut: { title: "Départ" },
            contact: { host: "Hôte", yourHost: "Votre hôte", phone: "Téléphone", openConversation: "Ouvrir la conversation" },
            rules: { noRules: "Aucune règle spécifiée" },
            amenities: { noAmenities: "Aucun équipement spécifié" },
            faq: { noFaq: "Aucune question FAQ", question: "Question", answer: "Réponse" },
            trash: { title: "Gestion des Déchets", items: "Ordures", recycling: "Recyclage" },
            breakfast: { title: "Petit Déjeuner", menu: "Au Menu" }
        },
        renderer: {
            searchPlaceholder: "Rechercher une info, un code...",
            wifi: "Wi-Fi",
            access: "Codes d'accès",
            checkin: "Arrivée",
            checkout: "Départ",
            location: "Localisation",
            rules: "Règles",
            contact: "Contact",
            amenities: "Équipements",
            places: "Lieux",
            events: "Événements",
            documents: "Documents",
            upsells: "Extras",
            viewMap: "Voir la carte",
            empty: "Aucun résultat trouvé",
            secureAccess: "Accès sécurisé",
            network: "Réseau",
            password: "Mot de passe",
            trash: "Déchets",
            parking: "Parking",
            breakfast: "Petit Déjeuner",
            transport: "Transports",
            welcome: "Bienvenue",
            faq: "FAQ",
            embed: "Lien",
            sunday: "Dimanche",
            monday: "Lundi",
            tuesday: "Mardi",
            wednesday: "Mercredi",
            thursday: "Jeudi",
            friday: "Vendredi",
            saturday: "Samedi",
            lazy: "Détente",
            mood: "Motivé",
            discovery: "Découverte",
            tasty: "Gourmand",
            adventure: "Aventure",
            festive: "Festif",
            outing: "Sortie",
            brunch: "Un brunch à",
            explore: "Explorez le centre de",
            museums: "Visitez les musées de",
            taste: "Goutez aux spécialités de",
            excursion: "Partez en excursion à",
            nightlife: "Sortez le soir à",
            walk: "Baladez-vous à",
            items: "éléments",
            seeAll: "Voir tout",
            less: "Voir moins",
            scanQr: "Scanner pour télécharger",
            share: "Partager",
            download: "Télécharger",
            tipOfTheDay: "Conseil du Jour",
            copy: "Copier",
            copied: "Copié !",
            getDirections: "Itinéraire",
            openMaps: "Ouvrir Maps",
            call: "Appeler",
            message: "Message"
        },
        ai: {
            assistant: "Assistant IA",
            online: "En ligne",
            empty: "Posez-moi vos questions sur le séjour !",
            thinking: "Réflexion...",
            placeholder: "Posez une question...",
            error: "Désolé, une erreur est survenue."
        }
    },



    en: {
        common: {
            getStarted: "Get Started",
            login: "Login",
            signup: "Sign up",
            tryFree: "Try for Free",
            popular: "Most Popular",
            month: "/month",
            loading: "Loading...",
            choose: "Choose",
            viewGuide: "View full guide",
            more: "See more",
            checkin: "Check-in",
            qrCodeWall: "Scan to test",
            checkout: "Check-out",
            location: "Location",
            viewOnMap: "View on map",
            wifi: "WiFi",
        },
        socialProof: {
            trustpilot: "4.9/5 by 500+ Hosts",
            usedBy: "Used by top property managers",
            autoTranslate: {
                title: "Auto-Translated",
                desc: "Your guides speak your guests' language."
            },
            googleMaps: {
                title: "Integrated Google Maps",
                desc: "Google Maps directly inside the guide."
            }
        },
        hero: {
            tag: "FOR HOSTS & PROPERTY MANAGERS",
            title: "Never repeat the WiFi code again.",
            subtitle: "Digitalize your welcome book. Offer a 5-star experience, reduce messages by 50%, and boost your positive reviews.",
            cta: "Create my free guide",
            demo: "See an example",
            noCreditCard: "No credit card required",
            setupTime: "Set up in 2 min",
        },
        features: {
            title: "Everything you need.",
            subtitle: "Nothing you don't.",
            description: "Powerful tools to automate your guest welcome and reassure your travelers, without technical complexity.",
            items: {
                mobileFirst: {
                    title: "100% Mobile First",
                    desc: "No app to download. Your guides open instantly in any mobile browser."
                },
                secure: {
                    title: "Secure Codes",
                    desc: "Protect access to WiFi and key boxes. Unlock via email or unique code."
                },
                map: {
                    title: "Interactive Map",
                    desc: "Embed your favorite restaurants, bars, and activities with one-click Google Maps directions."
                },
                live: {
                    title: "Live Updates",
                    desc: "Change a WiFi code or a recommendation, it updates instantly on all phones."
                },
                translate: {
                    title: "Auto-Translation",
                    desc: "Automatically detects guest's phone language and translates your guide."
                },
                checklist: {
                    title: "Checklists",
                    desc: "Clear check-in and check-out instructions. Reduce repetitive questions by 80%."
                }
            }
        },
        pricing: {
            title: "Transparent Pricing",
            subtitle: "Start for free. Scale when you want.",
            bestOffer: "The best offer in the world:",
            addon: "+20 DH / additional guide",
            enterprise: {
                title: "Need an Enterprise solution?",
                desc: "For managers with 50+ properties, we offer volume discounts and PMS integration.",
                cta: "Contact Sales Team"
            },
            plans: {
                demo: {
                    name: "Discovery",
                    price: "Free",
                    desc: "Test the power of Maplyo without a credit card.",
                    button: "Create a guide (Free)",
                    features: [
                        'Full access to Creator',
                        'Mobile Preview',
                        'No publishing'
                    ]
                },
                basic: {
                    name: "Essential",
                    desc: "To launch your first property.",
                    button: "Start Now",
                    features: [
                        'Complete Digital Guidebook',
                        'Instant WiFi QR Code',
                        'Interactive Map (Google Maps)',
                        'Free Themes (Premium Pack +15 DH)',
                        '1 Unique Guide'
                    ]
                },
                pro: {
                    name: "Growth",
                    desc: "To maximize your revenue & reviews.",
                    button: "Upgrade to Growth",
                    features: [
                        'Unlimited Guides (+20 DH/ea.)',
                        'INCLUDED Premium Themes',
                        'Automatic Translation (AI)',
                        '24/7 Guest Assistant (AI)',
                        'Priority WhatsApp Support'
                    ]
                },
                business: {
                    name: "Agency",
                    desc: "For portfolios of 10+ properties.",
                    button: "Talk to an Expert",
                    price: "Custom",
                    features: [
                        'Unlimited Guides',
                        'Multi-Property Dashboard',
                        'White Label (No Maplyo logo)',
                        'PMS & Channel Mgr Integration',
                        'Centralized Billing'
                    ]
                }
            },
            trust: "30-Day Money Back Guarantee • Secure SSL Payment"
        },
        testimonials: {
            title: "Approved by Pros",
            subtitle: "Join over 500 hosts who automated their welcome.",
            items: [
                {
                    name: "Jean-Philippe R.",
                    role: "Superhost Airbnb (Marrakech)",
                    text: "My guests kept asking for the Wifi code or how to turn on the AC. With Maplyo, they have everything on their phone. I easily saved 2 hours a week.",
                    result: "-60% messages",
                },
                {
                    name: "Sofia B.",
                    role: "Concierge Manager (Casablanca)",
                    text: "The game changer for us is the upsell. We offer cleaning or transport services directly in the guide. It boosted our revenue.",
                    result: "+15% revenue",
                },
                {
                    name: "Karim M.",
                    role: "Riad Owner (Fes)",
                    text: "Very professional. The multilingual aspect is stunning, my American and Spanish clients are delighted to have info in their language without me doing anything.",
                    result: "5★ Reviews",
                }
            ]
        },
        faq: {
            title: "Frequently Asked Questions",
            subtitle: "Everything you need to know to get started.",
            questions: [
                {
                    q: "Do I need technical skills?",
                    a: "None at all. It's as easy as filling out a social media profile. You add info, we handle the design."
                },
                {
                    q: "How do guests access the guide?",
                    a: "Via a simple QR Code you place in the rental, or a link you send via message before arrival."
                },
                {
                    q: "Can I update the guide after printing the QR Code?",
                    a: "Yes! That's the magic. Update your info (wifi, restaurants...) and the QR Code stays exactly the same."
                },
                {
                    q: "Is there a contract?",
                    a: "No, cancel anytime."
                }
            ]
        },
        footer: {
            product: "Product",
            support: "Support",
            legal: "Legal",
            desc: "Maplyo helps hosts and property managers offer a 5-star experience with smart digital guides.",
            links: {
                features: "Features",
                pricing: "Pricing",
                testimonials: "Testimonials",
                roadmap: "Roadmap",
                help: "Help",
                contact: "Contact",
                privacy: "Privacy",
                terms: "Terms",
                legal: "Legal Notice"
            },
            securePayment: "Secure Payment",
            rights: "All rights reserved."
        },
        cta: {
            title: "Ready to impress?",
            subtitle: "Join the new generation of hosts offering an exceptional experience.",
            button: "Create my first guide",
            subtext: "No credit card required • Cancel anytime"
        },
        showcase: {
            tag: "Real Examples",
            title: "Tailored to every property",
            subtitle: "Whether you manage a studio or a hotel, Maplyo adapts to your style.",
            viewFull: "View full guide",
            messageFrom: "Message from",
            types: {
                apartment: "Apartment",
                vacationHome: "Vacation Home",
                guesthouse: "Guesthouse"
            },
            features: {
                wifi: "WiFi Code",
                metro: "Subway",
                coffee: "Coffee",
                pool: "Pool",
                chef: "Private Chef",
                tours: "Tours",
                hammam: "Hammam",
                tea: "Tea",
                souks: "Souks"
            },
            reviews: {
                sarah: "Thanks for the guide, check-in was super easy!",
                marcJulie: "We loved the restaurant recs!",
                thomas: "The WiFi QR code saved our arrival."
            }
        },
        tipOfTheDay: "Tip of the Day",
        sunday: "Sunday",
        monday: "Monday",
        tuesday: "Tuesday",
        wednesday: "Wednesday",
        thursday: "Thursday",
        friday: "Friday",
        saturday: "Saturday",
        lazy: "Relax",
        mood: "Motivated",
        discovery: "Discovery",
        tasty: "Tasty",
        adventure: "Adventure",
        festive: "Festive",
        outing: "Outing",
        brunch: "A brunch at",
        explore: "Explore the center of",
        museums: "Visit the museums of",
        taste: "Taste the specialties of",
        excursion: "Go on an excursion.",
        nightlife: "Nightlife in",
        walk: "Take a walk in",
        guide: {
            accessCode: "Access Codes",
            locked: "This block is protected by a code.",
            enterCode: "Access code",
            apartmentDoor: "Apartment door:",
            buildingDoor: "Building door:",
            gate: "Gate:",
            notes: "Notes",
            confirm: "Confirm"
        },

        qrCodeWall: {
            titlePart1: "Share your guide",
            titlePart2: "everywhere",
            description: "A simple scan is all it takes for your guests.",
            items: {
                wifi: { title: "Wi-Fi Connection", desc: "Password pre-filled" },
                perpetual: { title: "Permanent Access", desc: "The link remains valid" },
                remote: { title: "Live Updates", desc: "Always up to date" }
            },
            visual: {
                welcome: "Welcome",
                scan: "Scan me",
                detected: "QR Code Detected",
                notification: {
                    app: "Maplyo",
                    title: "Open guide"
                }
            }
        },
        upsells: "Extras",
        legalPage: {
            titlePrivacy: "Privacy Policy",
            titleTerms: "Terms of Use",
            lastUpdated: "Last updated:",
            effectiveDate: "Effective as of:",
            privacy: {
                intro: "This privacy policy describes how Maplyo ('we', 'us', 'our') collects, uses, and protects your personal data, in accordance with Moroccan Law No. 09-08 regarding the protection of individuals with respect to the processing of personal data.",
                section1: {
                    title: "1. Data Collection",
                    items: [
                        "Identification data: Last name, first name, email address.",
                        "Transaction data: Payment history (processed securely by Stripe, we do not store your full bank details).",
                        "Usage data: Information on the creation and consultation of digital guides."
                    ]
                },
                section2: {
                    title: "2. Purpose of Processing",
                    intro: "Your data is collected to:",
                    items: [
                        "Provide and manage the digital guide service.",
                        "Manage your subscription and billing.",
                        "Communicate important service updates.",
                        "Improve our features through anonymized statistics."
                    ]
                },
                section3: {
                    title: "3. Data Sharing",
                    content: "We never sell your data. It may be shared only with our essential technical providers (e.g., Stripe for payments, Supabase for hosting, Resend for emails) who are bound by strict confidentiality."
                },
                section4: {
                    title: "4. Security",
                    content: "We implement technical security measures (SSL encryption, secure protocols) to protect your data from unauthorized access."
                },
                section5: {
                    title: "5. Your Rights",
                    content: "In accordance with Law 09-08, you have the right to access, rectify, and oppose your data.",
                    contact: "To exercise this right, contact us at: contact@maplyo.com"
                }
            },
            terms: {
                intro: "Welcome to Maplyo. By accessing our platform or using our services, you agree to be bound by these Terms of Use.",
                section1: {
                    title: "1. Description of Service",
                    content: "Maplyo is a SaaS (Software as a Service) platform allowing hosts and property managers to create, host, and share digital welcome books with their guests."
                },
                section2: {
                    title: "2. Subscriptions and Payments",
                    items: [
                        "Billing: Services are billed monthly or annually, in advance.",
                        "Cancellation: You can cancel your subscription at any time via your dashboard. Access to Premium features remains active until the end of the billed period.",
                        "Refund: We offer a 30-day 'Money Back Guarantee' for all new subscriptions."
                    ]
                },
                section3: {
                    title: "3. User Responsibilities",
                    intro: "You agree to:",
                    items: [
                        "Provide accurate information during registration.",
                        "Not publish illegal, defamatory, or immoral content in your guides.",
                        "Be solely responsible for the information (WiFi codes, addresses) shared with your guests."
                    ]
                },
                section4: {
                    title: "4. Intellectual Property",
                    content: "Maplyo remains the owner of the platform, the code, and the brand. You remain the owner of the content (texts, photos) you add to your guides."
                },
                section5: {
                    title: "5. Limitation of Liability",
                    content: "Maplyo shall not be held liable for indirect damages, loss of revenue, or issues arising from the use of information contained in guides created by users."
                },
                section6: {
                    title: "6. Governing Law",
                    content: "These terms are governed by Moroccan law. Any dispute relating to their interpretation and/or execution shall be subject to the competent courts of Casablanca."
                }
            }
        },
        auth: {
            login: {
                title: "Welcome back 👋",
                subtitle: "Sign in to manage your guides",
                email: "Email",
                password: "Password",
                forgot: "Forgot?",
                submit: "Sign In",
                noAccount: "No account yet?",
                createFree: "Create a free account",
                resetLink: "Login issue? Reset",
                error: "An unexpected error occurred."
            },
            signup: {
                title: "Join Maplyo",
                subtitle: "Create exceptional guides in minutes.",
                firstName: "First Name",
                lastName: "Last Name",
                businessEmail: "Business Email",
                businessName: "Business Name",
                phone: "Phone",
                passwordLabel: "Password",
                passwordHint: "Minimum 6 characters",
                submit: "Start for free",
                hasAccount: "Already have an account?",
                signIn: "Sign in",
                successTitle: "Account created!",
                successMsg: "A confirmation email was sent to",
                successDesc: "Please click the link to activate your account.",
                backToLogin: "Back to login"
            }
        },
        dashboard: {
            title: "My Guides",
            subtitle: "Manage your guest experiences.",
            newGuide: "New Guide",
            emptyTitle: "No guides yet",
            emptyDesc: "Create your first guide to offer an exceptional experience to your guests.",
            tryAi: "✨ Try AI",
            createManual: "Create manually",
            published: "Online",
            draft: "Draft",
            edit: "Edit",
            sortRecent: "Recent",
            sortName: "Name",
            logout: "Logout",
            viewPublic: "View public guide",
            passProToShare: "Go Pro to share",
            delete: "Delete",
            confirmDelete: "Are you sure you want to delete this guide? This is permanent.",
            deleteError: "Error during deletion.",
            aiModal: {
                title: "Magic Create ✨",
                city: "City or Place",
                cityPlaceholder: "Ex: Marrakech, Guéliz",
                type: "Type",
                typeAirbnb: "Airbnb / Apartment",
                typeHotel: "Hotel / Riad",
                typeGuesthouse: "Guest House",
                audience: "Guests",
                audienceFamilies: "Families",
                audienceCouples: "Couples",
                audienceRemote: "Remote Workers",
                audienceGroups: "Groups",
                generate: "Generate my guide",
                generating: "AI is writing your guide...",
                generatingDesc: "Creating recommendations for"
            },
            createModal: {
                title: "New Guide",
                nameLabel: "Guide name",
                namePlaceholder: "Ex: Riad des Lumières",
                cancel: "Cancel",
                create: "Create guide"
            },
            limitModal: {
                title: "Guide limit reached 🏠",
                desc: "You've reached the maximum number of guides for your current plan.",
                upgrade: "🚀 Upgrade to Unlimited (Pro)",
                or: "Or",
                addon: "➕ Add just 1 guide",
                loading: "Loading..."
            },
            addonSuccessModal: {
                title: "Guide added! ✨",
                heading: "Ready!",
                desc: "Your limit has been increased by 1 guide. You can now create your new guide.",
                cta: "Great, thanks!"
            },
            proModal: {
                heading: "You're Pro!",
                desc: "Your Pro subscription is active. Enjoy unlimited guides and all premium features.",
                cta: "Start creating"
            }
        },
        pricingPage: {
            hero: {
                badge: "Invest in excellence",
                title1: "A pro guide,",
                title2: "at the price of a coffee.",
                subtitle: "Increase your direct revenue, reduce repetitive questions and offer a 5-star experience. Profitable from the very first booking."
            },
            popular: "Popular",
            header: { login: "Login", signup: "Sign Up" },
            compare: {
                title: "Detailed Comparison",
                subtitle: "Everything you need to succeed.",
                features: {
                    unlimited: "Unlimited Guides",
                    maps: "Google Maps Integration",
                    translation: "AI Translation (all languages)",
                    domain: "Custom Domain Name",
                    support: "Priority Support",
                    whiteLabel: "White Label (No Branding)",
                    analytics: "Advanced Analytics"
                },
                values: { oneLang: "1 language", unlimited: "Unlimited", emailSupport: "Email", whatsappSupport: "WhatsApp 24/7" }
            },
            faqSection: {
                title: "FAQ",
                subtitle: "We're transparent. Here are the answers.",
                items: [
                    { q: "Can I change plans at any time?", a: "Yes, absolutely. You can switch between Basic and Pro from your dashboard. Changes take effect immediately and prorated automatically." },
                    { q: "Is there a commitment?", a: "No commitment at all. Our subscriptions are monthly and you can cancel at any time with one click. No hidden fees." },
                    { q: "How does payment work?", a: "We use Stripe, the world leader in secure online payments. Your banking details are never stored on our servers." },
                    { q: "Is support included?", a: "Yes! Email support is included in all paid plans. The Pro plan gets priority access and a WhatsApp contact for ultra-fast assistance." }
                ]
            },
            trust: "Trusted by",
            addonLabel: "/ extra guide"
        },
        guideLock: {
            title: "Secure Access",
            desc: "Please unlock this guide to access the access codes and sensitive information.",
            demoCode: "Demo code"
        },
        builder: {
            editorMode: "Editor Mode",
            library: "Library",
            catEssentials: "Essentials",
            catTravel: "Travel",
            catBusiness: "Business",
            guideStructure: "Guide Structure",
            emptyGuide: "Your guide is empty",
            mobileMode: "Mobile Mode",
            blockTitle: "Block Title",
            editing: "Editing",
            close: "Close",
            selectBlock: "Select a block to edit",
            paramsHere: "Parameters will appear here",
            designTheme: "Design & Theme",
            upgradePro: "Upgrade to PRO to unlock all premium themes.",
            unlock: "Unlock",
            unlockPublish: "Unlock Publishing",
            publishDesc: "Publishing is for Pro members. Subscribe to share your guides!",
            seeOffers: "See offers",
            createAccount: "Create account",
            saveCreateAccount: "Save (Create account)",
            online: "Online",
            unpublish: "Unpublish",
            confirmUnpublish: "Are you sure you want to unpublish this guide?",
            publish: "Publish",
            publishSuccess: "Guide published successfully! 🚀",
            publishError: "Publish error.",
            backHome: "Back to Home",
            backDashboard: "Back to Dashboard",
            themeLabel: "Theme",
            qrLabel: "QR",
            blocks: "blocks",
            addBlock: "Add a block",
            blockProperties: "Block properties",
            selectToEdit: "Select a block to edit",
            startHere: "Start here",
            selectBlocks: "Select blocks from the left menu to build your guide.",
            mobilePreview: "Mobile preview",
            chooseTheme: "Choose a theme",
            reset: "Reset",
            viewGuide: "View guide ↗",
            defaultGuideTitle: "Traveler",
            themeModal: {
                title: "Choose a theme",
                subtitle: "Customize your guide's look."
            },
            themes: {
                "minimal-white": { name: "Minimal White", desc: "Clean and simple" },
                "soft-gray": { name: "Soft Gray", desc: "Elegant and neutral" },
                "ocean": { name: "Ocean", desc: "Calm and fresh" },
                "nature": { name: "Nature", desc: "Calm and natural" },
                "sunset": { name: "Sunset", desc: "Warm and welcoming" },
                "paris": { name: "Paris", desc: "Eiffel Tower background" },
                "beach": { name: "Beach", desc: "Sea and sand" },
                "mountains": { name: "Mountains", desc: "Alpine landscape" },
                "luxury": { name: "Golden Luxury", desc: "Ultimate elegance" },
                "zen": { name: "Zen & Bamboo", desc: "Calm and serenity" },
                "abstract": { name: "Modern Art", desc: "Creative and bold" },
                "industrial": { name: "Industrial Loft", desc: "Concrete and character" },
                "coastal": { name: "Coastal Villa", desc: "Light and horizon" },
                "mountain-chalet": { name: "Alpine Chalet", desc: "Wood and warmth" },
                "urban-night": { name: "Urban Night", desc: "City lights" },
                "kyoto": { name: "Kyoto Garden", desc: "Harmony and nature" },
                "marrakech": { name: "Marrakech", desc: "Ochre and warmth" },
                "chefchaouen": { name: "Chefchaouen", desc: "The Blue Pearl" },
                "casablanca": { name: "Casablanca", desc: "Modern and white" },
                "tanger": { name: "Tangier", desc: "Mediterranean" },
                "fes": { name: "Fes", desc: "History and authenticity" },
                "agadir": { name: "Agadir", desc: "Sun and Ocean" },
                "boho": { name: "Bohemian Chic", desc: "Natural and artistic" },
                "scandi": { name: "Scandinavian", desc: "Nordic minimalism" },
                "tropical": { name: "Tropical", desc: "Jungle and green" },
                "dark-luxe": { name: "Black & Gold", desc: "Night luxury" },
                "greek": { name: "Santorini", desc: "Blue and White" }
            }
        },
        editor: {
            common: {
                title: "Title",
                description: "Description",
                instructions: "Instructions",
                placeholder: "Ex: ...",
                add: "Add",
                remove: "Remove",
                save: "Save",
                cancel: "Cancel",
                uploadImage: "Cover Image",
                uploadFile: "Upload File",
                videoUrl: "Video (MP4) or YouTube URL",
                mapUrl: "Google Maps Link (Optional)",
                address: "Full Address",
                phone: "Phone",
                email: "Email",
                whatsapp: "WhatsApp (International Number)",
                price: "Price",
                cost: "Cost",
                time: "Time",
                hours: "Hours",
                location: "Location",
                tags: "Tags (comma separated)",
                linkText: "Button text",
                linkUrl: "Button link",
                other: "Other",
                priceCheap: "Affordable",
                priceModerate: "Moderate",
                priceExpensive: "Luxury",
                placeholderUrl: "https://...",
                placeholderWelcome: "We are delighted to welcome you...",
                placeholderMonth: "JAN",
                placeholderDay: "01",
                placeholderTime: "20:00",
                placeholderPrice: "25€",
                placeholderReserve: "Reserve",
                placeholderAddress: "123 Example Street, London",
                placeholderMap: "https://goo.gl/maps/...",
                placeholderPhone: "+44 7000 000 000",
                placeholderWhatsapp: "447000000000",
                placeholderEmail: "contact@example.com",
                placeholderTags: "Romantic, Sea view, Italian..."
            },
            wifi: {
                networkName: "Network Name",
                password: "Password",
                notes: "Note (optional)"
            },
            labels: {
                hero: "Hero",
                wifi: "Wi‑Fi",
                access_codes: "Access Codes",
                checkin: "Check-in",
                checkout: "Check-out",
                location: "Location",
                contact: "Contact",
                rules: "Rules",
                trash: "Trash & Recycling",
                parking: "Parking",
                breakfast: "Breakfast",
                transport: "Transport",
                welcome: "Welcome",
                amenities: "Amenities",
                faq: "FAQ",
                places: "Recommended Places",
                events: "Events",
                documents: "Documents",
                upsells: "Upsells & extras",
                embed: "Web Embed"
            },
            checkin: {
                timePlaceholder: "ex: 3:00 PM",
                instrPlaceholder: "Access instructions..."
            },
            contact: {
                nameLabel: "Display Name",
                namePlaceholder: "Your Name"
            },
            rules: {
                title: "Rule",
                add: "Add a rule",
                placeholder: "ex: No noise after 10 PM"
            },
            amenities: {
                title: "Amenity",
                add: "Add an amenity",
                placeholder: "ex: Coffee maker"
            },
            faq: {
                question: "Question",
                answer: "Answer",
                add: "Add a question",
                qPlaceholder: "ex: Is there WiFi?",
                aPlaceholder: "Yes, the code is..."
            },
            trash: {
                dayTrash: "Trash Day (Garbage)",
                dayRecycling: "Recycling Day (Yellow)",
                location: "Bin Location",
                photoLocal: "Room Photo"
            },
            parking: {
                photo: "Parking Photo",
                costPlaceholder: "ex: Free / $2 per hour"
            },
            breakfast: {
                menu: "On the Menu / Details",
                menuPlaceholder: "Continental buffet, local products..."
            },
            transport: {
                add: "Add a transport",
                stop: "Description / Stop",
                bus: "Bus",
                train: "Train / Subway",
                taxi: "Taxi / Uber",
                bike: "Bike"
            },
            places: {
                name: "Place Name",
                add: "Add a place",
                aiButton: "AI Recommendation"
            },
            events: {
                add: "Add an event",
                month: "Month (3 letters)",
                day: "Day",
                aiButton: "Find events"
            },
            documents: {
                add: "Add a document",
                name: "Document name",
                url: "File URL (PDF...)"
            },
            upsells: {
                add: "Add an offer",
                image: "Offer image",
                buttonText: "Button text",
                buttonLink: "Button link"
            },
            access_codes: {
                security: "Security",
                mode: "Mode",
                alwaysVisible: "Always visible",
                unlockByCode: "Unlock with code",
                unlockCode: "Unlock code",
                unlockCodeDesc: "Ex: the code you send to the guest.",
                aptCode: "Apartment door code",
                buildingCode: "Building door code",
                gateCode: "Gate code",
                notes: "Notes"
            },
            embed: {
                url: "URL to embed (Iframe)",
                warning: "Ensure the site allows embedding (X-Frame-Options)."
            }
        },
        settings: {
            title: "Settings & Account",
            tabProfile: "Profile",
            tabPlan: "Subscription",
            tabShop: "Shop (Add-ons)",
            personalInfo: "Personal Info",
            fullName: "Full Name",
            email: "Email",
            saveProfile: "Save Profile",
            yourPlan: "Your Plan",
            currentPlan: "Current Plan",
            manageSubscription: "Manage subscription",
            success: "Success",
            error: "Error"
        },
        guideBlocks: {
            wifi: { network: "Network", password: "Password", scan: "Scan to join" },
            accessCodes: { code: "Access code", location: "Location", instruction: "Instructions" },
            location: { viewOnMap: "View on map", address: "Address", copyAddress: "Copy address", openInMaps: "Open in Google Maps", notSet: "Address not provided" },
            transport: { getThere: "Get there", parking: "Parking", noInfo: "No transport info", call: "Call" },
            checkIn: { title: "Check-in" },
            checkOut: { title: "Check-out" },
            contact: { host: "Host", yourHost: "Your host", phone: "Phone", openConversation: "Open conversation" },
            rules: { noRules: "No rules specified" },
            amenities: { noAmenities: "No amenities specified" },
            faq: { noFaq: "No FAQ questions", question: "Question", answer: "Answer" },
            trash: { title: "Waste Management", items: "Trash", recycling: "Recycling" },
            breakfast: { title: "Breakfast", menu: "On Menu" }
        },
        renderer: {
            searchPlaceholder: "Search info, codes...",
            wifi: "Wi-Fi",
            access: "Access Codes",
            checkin: "Check-in",
            checkout: "Check-out",
            location: "Location",
            rules: "Rules",
            contact: "Contact",
            amenities: "Amenities",
            places: "Places",
            events: "Events",
            documents: "Documents",
            upsells: "Extras",
            viewMap: "View Map",
            empty: "No results found",
            secureAccess: "Secure Access",
            network: "Network",
            password: "Password",
            trash: "Trash & Recycling",
            parking: "Parking",
            breakfast: "Breakfast",
            transport: "Transport",
            welcome: "Welcome",
            faq: "FAQ",
            embed: "Link",
            sunday: "Sunday",
            monday: "Monday",
            tuesday: "Tuesday",
            wednesday: "Wednesday",
            thursday: "Thursday",
            friday: "Friday",
            saturday: "Saturday",
            lazy: "Lazy",
            mood: "Mood",
            discovery: "Discovery",
            tasty: "Tasty",
            adventure: "Adventure",
            festive: "Festive",
            outing: "Outing",
            brunch: "Brunch in",
            explore: "Explore center of",
            museums: "Visit museums in",
            taste: "Taste specialties of",
            excursion: "Go on an excursion",
            nightlife: "Nightlife in",
            walk: "Walk around",
            items: "items",
            seeAll: "See All",
            less: "See Less",
            scanQr: "Scan to download",
            share: "Share",
            download: "Download",
            tipOfTheDay: "Daily Tip",
            copy: "Copy",
            copied: "Copied!",
            getDirections: "Get Directions",
            openMaps: "Open Maps",
            call: "Call",
            message: "Message"
        },
        ai: {
            assistant: "AI Assistant",
            online: "Online",
            empty: "Ask me anything about your stay!",
            thinking: "Thinking...",
            placeholder: "Ask a question...",
            error: "Sorry, there was an error."
        }
    },
    es: {
        common: {
            getStarted: "Empezar",
            login: "Iniciar sesión",
            signup: "Regístrate",
            tryFree: "Prueba gratis",
            popular: "Más popular",
            month: "/mes",
            loading: "Cargando...",
            choose: "Elegir",
            viewGuide: "Ver guía completa",
            more: "Ver más",
            checkin: "Llegada",
            qrCodeWall: "Escanea para probar",
            checkout: "Salida",
            location: "Ubicación",
            viewOnMap: "Ver en el mapa",
            wifi: "WiFi",
        },
        socialProof: {
            trustpilot: "4.9/5 por 500+ Anfitriones",
            usedBy: "Usado por los mejores gestores",
            autoTranslate: { title: "Auto-Traducido", desc: "Tus guías hablan su idioma." },
            googleMaps: { title: "Google Maps Integrado", desc: "Maps directamente en la guía." }
        },
        hero: {
            tag: "PARA ANFITRIONES",
            title: "Nunca repitas el código WiFi.",
            subtitle: "Digitaliza tu guía de bienvenida. Mayor valoración, menos mensajes.",
            cta: "Crear mi guía",
            demo: "Ver ejemplo",
            noCreditCard: "Sin tarjeta",
            setupTime: "Configura en 2 min",
        },
        features: {
            title: "Todo lo que necesitas.", subtitle: "Nada más.", description: "Herramientas poderosas.",
            items: {
                mobileFirst: { title: "100% Móvil", desc: "Abre instantáneo." },
                secure: { title: "Códigos Seguros", desc: "Protege acceso WiFi." },
                map: { title: "Mapa Interactivo", desc: "Recomendaciones un clic." },
                live: { title: "Cambios en Vivo", desc: "Se actualiza ahora." },
                translate: { title: "Auto Traducción", desc: "Detecta idioma del huésped." },
                checklist: { title: "Check-lists", desc: "Instrucciones claras." }
            }
        },
        pricing: {
            title: "Precios Transparentes",
            subtitle: "Inicia gratis, escala después.",
            bestOffer: "Mejor oferta:",
            addon: "+ Extra",
            enterprise: { title: "Enterprise?", desc: "Plan a medida.", cta: "Contactar" },
            plans: {
                demo: { name: "Descubrir", price: "Gratis", desc: "Pruébalo", button: "Crear guía", features: ['Acceso total', 'Vista móvil', 'Sin publicar'] },
                basic: { name: "Esencial", desc: "Lanza tu primera", button: "Iniciar", features: ['Guía Digital', 'QR WiFi', 'Mapa', '1 Guía'] },
                pro: { name: "Crecimiento", desc: "Maximiza ingresos", button: "Mejorar", features: ['Guías ilimitadas', 'Traductor automático', 'Soporte prioritario'] },
                business: { name: "Agencia", desc: "Para portfolios", button: "Hablar", price: "Por medida", features: ['Ilimitado', 'Dashboard multi', 'Marca blanca'] }
            },
            trust: "Pago seguro"
        },
        testimonials: {
            title: "Aprobado por Profesionales",
            subtitle: "Únase a más de 500 anfitriones que han automatizado su bienvenida.",
            items: [
                {
                    name: "Jean-Philippe R.",
                    role: "Superhost Airbnb (Marrakech)",
                    text: "Mis huéspedes no paraban de pedir la clave del Wifi o cómo encender el aire acondicionado. Con Maplyo, lo tienen todo en su teléfono. Ahorré fácilmente 2 horas a la semana.",
                    result: "-60% mensajes",
                },
                {
                    name: "Sofia B.",
                    role: "Gerente de Conserjería (Casablanca)",
                    text: "El cambio de juego para nosotros es la venta adicional. Ofrecemos servicios de limpieza o transporte directamente en la guía. Aumentó nuestros ingresos.",
                    result: "+15% ingresos",
                },
                {
                    name: "Karim M.",
                    role: "Propietario de Riad (Fez)",
                    text: "Muy profesional. El aspecto multilingüe es impresionante, mis clientes americanos y españoles están encantados de tener la información en su idioma sin que yo haga nada.",
                    result: "5★ Reseñas",
                }
            ]
        },
        faq: {
            title: "Preguntas Frecuentes",
            subtitle: "Todo lo que necesitas saber para empezar.",
            questions: [
                {
                    q: "¿Necesito habilidades técnicas?",
                    a: "Ninguna en absoluto. Es tan fácil como completar un perfil de red social. Tú añades la info, nosotros nos encargamos del diseño."
                },
                {
                    q: "¿Cómo acceden los huéspedes a la guía?",
                    a: "A través de un simple código QR que colocas en el alojamiento, o un enlace que envías por mensaje antes de su llegada."
                },
                {
                    q: "¿Puedo actualizar la guía después de imprimir el código QR?",
                    a: "¡Sí! Esa es la magia. Actualiza tu información (wifi, restaurantes...) y el código QR sigue siendo el mismo."
                },
                {
                    q: "¿Hay algún compromiso o contrato?",
                    a: "No, cancela cuando quieras."
                }
            ]
        },
        footer: {
            product: "Producto", support: "Soporte", legal: "Legal", desc: "Maplyo para anfitriones.",
            links: { features: "Características", pricing: "Precios", testimonials: "Testimonios", roadmap: "Roadmap", help: "Ayuda", contact: "Contacto", privacy: "Privacidad", terms: "Términos", legal: "Aviso Legal" },
            securePayment: "Pago Seguro", rights: "Derechos reservados."
        },
        cta: { title: "¿Listo para impresionar?", subtitle: "Únete a la nueva generación.", button: "Crear mi guía", subtext: "Cancelación flexible" },
        tipOfTheDay: "Consejo del Día", sunday: "Dom", monday: "Lun", tuesday: "Mar", wednesday: "Mié", thursday: "Jue", friday: "Vie", saturday: "Sáb",
        lazy: "Relajado", mood: "Motivado", discovery: "Descubrimiento", tasty: "Sabroso", adventure: "Aventura", festive: "Fiesta", outing: "Salida",
        brunch: "Brunch", explore: "Explorar", museums: "Museos", taste: "Saborear", excursion: "Excursión", nightlife: "Noche", walk: "Paseo",
        guide: { accessCode: "Códigos", locked: "Protegido por código.", enterCode: "Código de acceso", apartmentDoor: "Puerta", buildingDoor: "Edificio", gate: "Portón", notes: "Notas", confirm: "Validar" },

        qrCodeWall: {
            titlePart1: "Comparte", titlePart2: "donde sea", description: "Un scan basta.",
            items: { wifi: { title: "Wi-Fi", desc: "Pre-llenado" }, perpetual: { title: "Permanente", desc: "Válido siempre" }, remote: { title: "En Vivo", desc: "Actualizado" } },
            visual: { welcome: "Bienvenido", scan: "Escanéame", detected: "Detectado", notification: { app: "Maplyo", title: "Abrir guía" } }
        },
        upsells: "Extras",
        legalPage: {
            titlePrivacy: "Privacidad", titleTerms: "Términos", lastUpdated: "Actualizado", effectiveDate: "En vigor",
            privacy: { intro: "Política.", section1: { title: "Datos", items: ["Nombre"] }, section2: { title: "Fines", intro: "Para:", items: ["Proveer el servicio"] }, section3: { title: "Compartir", content: "No vendemos datos." }, section4: { title: "Seguridad", content: "Seguro." }, section5: { title: "Derechos", content: "Puedes pedir acceder.", contact: "contact@maplyo.com" } },
            terms: { intro: "Términos.", section1: { title: "Servicio", content: "SaaS" }, section2: { title: "Pagos", items: ["Facturación"] }, section3: { title: "Responsabilidad", intro: "Deberes:", items: ["Veracidad"] }, section4: { title: "IP", content: "Propiedad" }, section5: { title: "Límites", content: "Sin daños indirectos" }, section6: { title: "Ley", content: "Marruecos" } }
        },
        auth: {
            login: {
                title: "Bienvenido 👋",
                subtitle: "Inicia sesión para gestionar tus guías",
                email: "Correo electrónico",
                password: "Contraseña",
                forgot: "¿Olvidaste?",
                submit: "Iniciar sesión",
                noAccount: "¿No tienes cuenta?",
                createFree: "Crear una cuenta gratis",
                resetLink: "¿Problema de conexión? Restablecer",
                error: "Se produjo un error inesperado."
            },
            signup: {
                title: "Únete a Maplyo",
                subtitle: "Crea guías excepcionales en minutos.",
                firstName: "Nombre",
                lastName: "Apellido",
                businessEmail: "Correo profesional",
                businessName: "Nombre del negocio",
                phone: "Teléfono",
                passwordLabel: "Contraseña",
                passwordHint: "Mínimo 6 caracteres",
                submit: "Comenzar gratis",
                hasAccount: "¿Ya tienes cuenta?",
                signIn: "Iniciar sesión",
                successTitle: "¡Cuenta creada!",
                successMsg: "Se envió un correo de confirmación a",
                successDesc: "Haz clic en el enlace para activar tu cuenta.",
                backToLogin: "Volver al inicio de sesión"
            }
        },
        dashboard: {
            title: "Mis Guías",
            subtitle: "Gestiona las experiencias de tus huéspedes.",
            newGuide: "Nueva Guía",
            emptyTitle: "Sin guías todavía",
            emptyDesc: "Crea tu primera guía para ofrecer una experiencia excepcional a tus huéspedes.",
            tryAi: "✨ Probar IA",
            createManual: "Crear manualmente",
            published: "En línea",
            draft: "Borrador",
            edit: "Editar",
            sortRecent: "Recientes",
            sortName: "Nombre",
            logout: "Cerrar sesión",
            viewPublic: "Ver guía pública",
            passProToShare: "Pasa a Pro para compartir",
            delete: "Eliminar",
            confirmDelete: "¿Seguro que quieres eliminar esta guía? Esto es permanente.",
            deleteError: "Error al eliminar.",
            aiModal: {
                title: "Creación Mágica ✨",
                city: "Ciudad o Lugar",
                cityPlaceholder: "Ej: Marrakech, Guéliz",
                type: "Tipo",
                typeAirbnb: "Airbnb / Apartamento",
                typeHotel: "Hotel / Riad",
                typeGuesthouse: "Casa de huéspedes",
                audience: "Huéspedes",
                audienceFamilies: "Familias",
                audienceCouples: "Parejas",
                audienceRemote: "Teletrabajadores",
                audienceGroups: "Grupos",
                generate: "Generar mi guía",
                generating: "La IA está creando tu guía...",
                generatingDesc: "Creando recomendaciones para"
            },
            createModal: {
                title: "Nueva Guía",
                nameLabel: "Nombre de la guía",
                namePlaceholder: "Ej: Riad de las Luces",
                cancel: "Cancelar",
                create: "Crear guía"
            },
            limitModal: {
                title: "Límite de guías alcanzado 🏠",
                desc: "Has alcanzado el límite de guías de tu plan actual.",
                upgrade: "🚀 Actualizar a ilimitado (Pro)",
                or: "O",
                addon: "➕ Agregar solo 1 guía",
                loading: "Cargando..."
            },
            addonSuccessModal: {
                title: "¡Guía añadida! ✨",
                heading: "¡Listo!",
                desc: "Tu límite ha aumentado en 1 guía. Ya puedes crear tu nueva guía.",
                cta: "¡Genial, gracias!"
            },
            proModal: {
                heading: "¡Eres Pro!",
                desc: "Tu suscripción Pro está activa. Disfruta guías ilimitadas y todas las funciones premium.",
                cta: "Empezar a crear"
            }
        },
        showcase: {
            tag: "Ejemplos Reales",
            title: "Adaptado a cada propiedad",
            subtitle: "Ya sea que gestiones un estudio o un hotel, Maplyo se adapta a tu estilo.",
            viewFull: "Ver guía completa",
            messageFrom: "Mensaje de",
            types: {
                apartment: "Apartamento",
                vacationHome: "Casa de Vacaciones",
                guesthouse: "Casa de Huéspedes"
            },
            features: {
                wifi: "Código WiFi",
                metro: "Metro",
                coffee: "Café",
                pool: "Piscina",
                chef: "Chef privado",
                tours: "Excursiones",
                hammam: "Hammam",
                tea: "Té",
                souks: "Zocos"
            },
            reviews: {
                sarah: "¡Gracias por la guía, la llegada fue muy fácil!",
                marcJulie: "¡Nos encantaron las recomendaciones de restaurantes!",
                thomas: "El código QR del WiFi salvó nuestra llegada."
            }
        },
        pricingPage: {
            hero: {
                badge: "Invierte en la excelencia",
                title1: "Una guía pro,",
                title2: "al precio de un café.",
                subtitle: "Aumenta tus ingresos directos, reduce las preguntas repetitivas y ofrece una experiencia 5 estrellas. Rentable desde la primera reserva."
            },
            popular: "Popular",
            header: { login: "Iniciar sesión", signup: "Regístrate" },
            compare: {
                title: "Comparativa Detallada",
                subtitle: "Todo lo que necesitas para tener éxito.",
                features: {
                    unlimited: "Guías Ilimitadas",
                    maps: "Integración Google Maps",
                    translation: "Traducción IA (todos los idiomas)",
                    domain: "Dominio personalizado",
                    support: "Soporte Prioritario",
                    whiteLabel: "Marca Blanca (Sin Branding)",
                    analytics: "Analíticas Avanzadas"
                },
                values: { oneLang: "1 idioma", unlimited: "Ilimitado", emailSupport: "Email", whatsappSupport: "WhatsApp 24/7" }
            },
            faqSection: {
                title: "Preguntas Frecuentes",
                subtitle: "Somos transparentes. Aquí las respuestas.",
                items: [
                    { q: "¿Puedo cambiar de plan en cualquier momento?", a: "Sí, absolutamente. Puedes cambiar entre Basic y Pro desde tu dashboard. El cambio es inmediato y el prorrateo es automático." },
                    { q: "¿Hay algún compromiso?", a: "No hay compromiso. Nuestras suscripciones son mensuales y puedes cancelar en cualquier momento con un clic. Sin cargos ocultos." },
                    { q: "¿Cómo funciona el pago?", a: "Usamos Stripe, el líder mundial en pagos seguros online. Tus datos bancarios nunca se almacenan en nuestros servidores." },
                    { q: "¿El soporte está incluido?", a: "¡Sí! El soporte por email está incluido en todos los planes de pago. El plan Pro tiene acceso prioritario y contacto por WhatsApp." }
                ]
            },
            trust: "Con la confianza de",
            addonLabel: "/ guía extra"
        },
        guideLock: {
            title: "Acceso Seguro",
            desc: "Por favor desbloquea esta guía para acceder a los códigos de acceso e información sensible.",
            demoCode: "Código de demostración"
        },
        builder: {
            editorMode: "Modo Editor",
            library: "Biblioteca",
            catEssentials: "Esenciales",
            catTravel: "Viaje",
            catBusiness: "Negocios",
            guideStructure: "Estructura de la guía",
            emptyGuide: "Tu guía está vacía",
            mobileMode: "Modo Móvil",
            blockTitle: "Título del bloque",
            editing: "Editando",
            close: "Cerrar",
            selectBlock: "Selecciona un bloque para editar",
            paramsHere: "Los parámetros aparecerán aquí",
            designTheme: "Diseño y Tema",
            upgradePro: "Pasa a PRO para desbloquear todos los temas premium.",
            unlock: "Desbloquear",
            unlockPublish: "Desbloquear publicación",
            publishDesc: "La publicación es para miembros Pro. ¡Suscríbete para compartir tus guías!",
            seeOffers: "Ver ofertas",
            createAccount: "Crear cuenta",
            saveCreateAccount: "Guardar (Crear cuenta)",
            online: "En línea",
            unpublish: "Despublicar",
            confirmUnpublish: "¿Seguro que quieres retirar esta guía del público?",
            publish: "Publicar",
            publishSuccess: "¡Guía publicada con éxito! 🚀",
            publishError: "Error al publicar.",
            backHome: "Volver al inicio",
            backDashboard: "Volver al Dashboard",
            themeLabel: "Tema",
            qrLabel: "QR",
            blocks: "bloques",
            addBlock: "Añadir un bloque",
            blockProperties: "Propiedades del bloque",
            selectToEdit: "Selecciona un bloque para editar",
            startHere: "Empieza aquí",
            selectBlocks: "Selecciona bloques del menú izquierdo para construir tu guía.",
            mobilePreview: "Vista previa móvil",
            chooseTheme: "Elegir un tema",
            reset: "Restablecer",
            viewGuide: "Ver guía ↗",
            defaultGuideTitle: "Viajero",
            themeModal: {
                title: "Elegir un tema",
                subtitle: "Personaliza el aspecto de tu guía."
            },
        },
        editor: {
            common: {
                title: "Título",
                description: "Descripción",
                instructions: "Instrucciones",
                placeholder: "Ej: ...",
                add: "Añadir",
                remove: "Eliminar",
                save: "Guardar",
                cancel: "Cancelar",
                uploadImage: "Imagen de portada",
                uploadFile: "Cargar archivo",
                videoUrl: "Video (MP4) ou URL de YouTube",
                mapUrl: "Enlace de Google Maps (Opcional)",
                address: "Dirección completa",
                phone: "Teléfono",
                email: "Correo electrónico",
                whatsapp: "WhatsApp (Número internacional)",
                price: "Precio",
                cost: "Coste",
                time: "Hora",
                hours: "Horarios",
                location: "Ubicación",
                tags: "Etiquetas (separadas por comas)",
                linkText: "Texto del botón",
                linkUrl: "Enlace del botón",
                other: "Otro",
                priceCheap: "Económico",
                priceModerate: "Moderado",
                priceExpensive: "Lujoso",
                placeholderUrl: "https://...",
                placeholderWelcome: "Estamos encantados de darle la bienvenida...",
                placeholderMonth: "ENE",
                placeholderDay: "01",
                placeholderTime: "20:00",
                placeholderPrice: "25€",
                placeholderReserve: "Reservar",
                placeholderAddress: "Calle Ejemplo 123, Madrid",
                placeholderMap: "https://goo.gl/maps/...",
                placeholderPhone: "+34 600 000 000",
                placeholderWhatsapp: "34600000000",
                placeholderEmail: "contacto@ejemplo.com",
                placeholderTags: "Romántico, Vista al mar, Italiano..."
            },
            wifi: {
                networkName: "Nombre de la red",
                password: "Contraseña",
                notes: "Nota (opcional)"
            },
            checkin: {
                timePlaceholder: "ej: 15:00",
                instrPlaceholder: "Instrucciones de acceso..."
            },
            contact: {
                nameLabel: "Nombre mostrado",
                namePlaceholder: "Tu nombre"
            },
            rules: {
                title: "Regla",
                add: "Añadir una regla",
                placeholder: "ej: No hacer ruido después de las 22:00"
            },
            amenities: {
                title: "Servicio",
                add: "Añadir un servicio",
                placeholder: "ej: Cafetera"
            },
            faq: {
                question: "Pregunta",
                answer: "Respuesta",
                add: "Añadir una pregunta",
                qPlaceholder: "ej: ¿Hay WiFi?",
                aPlaceholder: "Sí, el código es..."
            },
            trash: {
                dayTrash: "Día de basura",
                dayRecycling: "Día de reciclaje",
                location: "Ubicación de los cubos",
                photoLocal: "Foto del local"
            },
            parking: {
                photo: "Foto del parking",
                costPlaceholder: "ej: Gratis / 2€ por hora"
            },
            breakfast: {
                menu: "En el menú / Detalles",
                menuPlaceholder: "Buffet continental, productos locales..."
            },
            transport: {
                add: "Añadir un transporte",
                stop: "Descripción / Parada",
                bus: "Autobús",
                train: "Tren / Metro",
                taxi: "Taxi / Uber",
                bike: "Bicicleta"
            },
            places: {
                name: "Nombre del lugar",
                 checkin: "Llegada",
            checkout: "Salida",
            location: "Ubicación",
            rules: "Reglas de la casa",
            contact: "Contacto",
            amenities: "Servicios",
            places: "Lugares cercanos",
            events: "Eventos",
            documents: "Documentos",
            upsells: "Servicios extra",
            embed: "Contenido",
            welcome: "Bienvenido",
            trash: "Basura",
            parking: "Aparcamiento",
            breakfast: "Desayuno",
            transport: "Transporte",
            days: "días",
            hours: "horas",
            minutes: "minutos",
            network: "Red",
            password: "Clave",
            copy: "Copiar",
            copied: "¡Copiado!",
            getDirections: "Cómo llegar",
            openMaps: "Abrir Maps",
            call: "Llamar",
            message: "Mensaje",
            empty: "No se encontraron resultados",
            seeAll: "Ver todo",
            less: "Ver menos",
            scanQr: "Escanear para descargar",
            share: "Compartir",
            download: "Descargar",
            tipOfTheDay: "Consejo del día",
            sunday: "Domingo",
            monday: "Lunes",
            tuesday: "Martes",
            wednesday: "Miércoles",
            thursday: "Jueves",
            friday: "Viernes",
            saturday: "Sábado",
            lazy: "Relajado",
            mood: "Ánimo",
            discovery: "Descubrimiento",
            tasty: "Sabroso",
            adventure: "Aventura",
            festive: "Festivo",
            outing: "Salida",
            brunch: "Brunch",
            explore: "Explorar el centro",
            museums: "Visitar museos",
            taste: "Probar especialidades",
            excursion: "Ir de excursión",
            nightlife: "Vida nocturna",
            walk: "Pasear",
            items: "artículos",
            viewMap: "Ver el mapa",
            secureAccess: "Acceso seguro"
        },
        ai: {
            assistant: "Asistente IA",
            online: "En línea",
            empty: "¡Pregúntame cualquier cosa sobre tu estancia!",
            thinking: "Pensando...",
            placeholder: "Haz una pregunta...",
            error: "Lo siento, hubo un error."
        }
    },
    nl: {
        common: {
            getStarted: "Beginnen",
            login: "Inloggen",
            signup: "Registreren",
            tryFree: "Gratis Proberen",
            popular: "Meest Populair",
            month: "/maand",
            loading: "Laden...",
            choose: "Kiezen",
            viewGuide: "Bekijk volledige gids",
            more: "Bekijk meer",
            checkin: "Inchecken",
            qrCodeWall: "Scannen om te testen",
            checkout: "Uitchecken",
            location: "Locatie",
            viewOnMap: "Bekijk op kaart",
            wifi: "WiFi",
        },
        socialProof: {
            trustpilot: "4.9/5 door 500+ Hosts",
            usedBy: "Gebruikt door top vastgoedbeheerders",
            autoTranslate: {
                title: "Automatisch Vertaald",
                desc: "Uw gidsen spreken de taal van uw gasten."
            },
            googleMaps: {
                title: "Geïntegreerde Google Maps",
                desc: "Google Maps direct in de gids."
            }
        },
        hero: {
            tag: "VOOR HOSTS & VASTGOEDBEHEERDERS",
            title: "Herhaal nooit meer de WiFi-code.",
            subtitle: "Digitaliseer uw welkomstboek. Bied een 5-sterrenervaring, verminder berichten met 50% en geef uw positieve beoordelingen een boost.",
            cta: "Maak mijn gratis gids",
            demo: "Bekijk een voorbeeld",
            noCreditCard: "Geen creditcard nodig",
            setupTime: "Ingesteld in 2 min",
        },
        features: {
            title: "Alles wat u nodig heeft.",
            subtitle: "Niets wat u niet nodig heeft.",
            description: "Krachtige tools om uw gastenwelkomst te automatiseren en uw reizigers gerust te stellen, zonder technische complexiteit.",
            items: {
                mobileFirst: {
                    title: "100% Mobile First",
                    desc: "Geen app te downloaden. Uw gidsen openen direct in elke mobiele browser."
                },
                secure: {
                    title: "Beveiligde Codes",
                    desc: "Bescherm de toegang tot WiFi en sleutelkluisjes. Ontgrendel via e-mail of unieke code."
                },
                map: {
                    title: "Interactieve Kaart",
                    desc: "Integreer uw favoriete restaurants, bars en activiteiten met Google Maps-routebeschrijvingen in één klik."
                },
                live: {
                    title: "Live Updates",
                    desc: "Wijzig een WiFi-code of een aanbeveling, het wordt direct bijgewerkt op alle telefoons."
                },
                translate: {
                    title: "Automatische Vertaling",
                    desc: "Detecteert automatisch de taal van de telefoon van de gast en vertaalt uw gids."
                },
                checklist: {
                    title: "Checklists",
                    desc: "Duidelijke in- en uitcheckinstructies. Verminder repetitieve vragen met 80%."
                }
            }
        },
        pricing: {
            title: "Transparante Prijzen",
            subtitle: "Begin gratis. Schaal wanneer u wilt.",
            bestOffer: "Het beste aanbod ter wereld:",
            addon: "+20 DH / extra gids",
            enterprise: {
                title: "Een Enterprise-oplossing nodig?",
                desc: "Voor beheerders met 50+ eigendommen bieden we volumekortingen en PMS-integratie.",
                cta: "Contacteer Sales Team"
            },
            plans: {
                demo: {
                    name: "Ontdekking",
                    price: "Gratis",
                    desc: "Test de kracht van Maplyo zonder creditcard.",
                    button: "Maak een gids (Gratis)",
                    features: [
                        'Volledige toegang tot Creator',
                        'Mobiele Preview',
                        'Geen publicatie'
                    ]
                },
                basic: {
                    name: "Essentieel",
                    desc: "Om uw eerste woning te lanceren.",
                    button: "Begin Nu",
                    features: [
                        'Compleet Digitaal Welkomstboek',
                        'Directe WiFi QR-code',
                        'Interactieve Kaart (Google Maps)',
                        'Gratis Thema\'s (Premium Pack +15 DH)',
                        '1 Unieke Gids'
                    ]
                },
                pro: {
                    name: "Groei",
                    desc: "Om uw omzet en beoordelingen te maximaliseren.",
                    button: "Upgrade naar Groei",
                    features: [
                        'Onbeperkte Gidsen (+20 DH/st.)',
                        'INCLUSIEF Premium Thema\'s',
                        'Automatische Vertaling (IA)',
                        '24/7 Gastassistent (AI)',
                        'Prioritaire WhatsApp-ondersteuning'
                    ]
                },
                business: {
                    name: "Agentschap",
                    desc: "Voor portfolio's van 10+ woningen.",
                    button: "Praat met een Expert",
                    price: "Op maat",
                    features: [
                        'Onbeperkte Gidsen',
                        'Multi-Property Dashboard',
                        'White Label (Geen Maplyo-logo)',
                        'PMS & Channel Mgr Integratie',
                        'Gecentraliseerde Facturatie'
                    ]
                }
            },
            trust: "30-dagen niet-goed-geld-terug-garantie • Veilige SSL-betaling"
        },
        testimonials: {
            title: "Goedgekeurd door Professionals",
            subtitle: "Sluit u aan bij meer dan 500 hosts die hun welkomstproces hebben geautomatiseerd.",
            items: [
                {
                    name: "Jean-Philippe R.",
                    role: "Superhost Airbnb (Marrakech)",
                    text: "Mijn gasten bleven maar vragen naar de wifi-code of hoe de airco aan moest. Met Maplyo hebben ze alles op hun telefoon. Ik heb gemakkelijk 2 uur per week bespaard.",
                    result: "-60% berichten",
                },
                {
                    name: "Sofia B.",
                    role: "Concierge Manager (Casablanca)",
                    text: "De game changer voor ons is de upsell. We bieden schoonmaak- of transportdiensten rechtstreeks in de gids aan. Het heeft onze omzet verhoogd.",
                    result: "+15% omzet",
                },
                {
                    name: "Karim M.",
                    role: "Riad Eigenaar (Fes)",
                    text: "Zeer professioneel. Het meertalige aspect is verbluffend, mijn Amerikaanse en Spaanse klanten zijn blij om informatie in hun eigen taal te hebben zonder dat ik iets hoef te doen.",
                    result: "5★ Beoordelingen",
                }
            ]
        },
        faq: {
            title: "Veelgestelde Vragen",
            subtitle: "Alles wat u moet weten om aan de slag te gaan.",
            questions: [
                {
                    q: "Heb ik technische vaardigheden nodig?",
                    a: "Helemaal niet. Het is net zo eenvoudig als het invullen van een social media profiel. U voegt informatie toe, wij regelen het ontwerp."
                },
                {
                    q: "Hoe krijgen gasten toegang tot de gids?",
                    a: "Via een eenvoudige QR-code die u in de verhuur plaatst, of een link die u voor aankomst via een bericht verstuurt."
                },
                {
                    q: "Kan ik de gids bijwerken na het printen van de QR-code?",
                    a: "Ja! Dat is de magie. Werk uw informatie bij (wifi, restaurants...) en de QR-code blijft precies hetzelfde."
                },
                {
                    q: "Is there a contract?",
                    a: "No, cancel anytime."
                }
            ]
        },
        footer: {
            product: "Product",
            support: "Ondersteuning",
            legal: "Juridisch",
            desc: "Maplyo helpt hosts en vastgoedbeheerders een 5-sterrenervaring te bieden met slimme digitale gidsen.",
            links: {
                features: "Kenmerken",
                pricing: "Prijzen",
                testimonials: "Getuigenissen",
                roadmap: "Roadmap",
                help: "Help",
                contact: "Contact",
                privacy: "Privacy",
                terms: "Voorwaarden",
                legal: "Juridische kennisgeving"
            },
            securePayment: "Veilige Betaling",
            rights: "Alle rechten voorbehouden."
        },
        cta: {
            title: "Klaar om indruk te maken?",
            subtitle: "Sluit u aan bij de nieuwe generatie hosts die een uitzonderlijke ervaring bieden.",
            button: "Maak mijn eerste gids",
            subtext: "Geen creditcard nodig • Op elk moment opzegbaar"
        },
        showcase: {
            tag: "Echte Voorbeelden",
            title: "Op maat gemaakt voor elk type woning",
            subtitle: "Of je nu een studio of een hotel beheert, Maplyo past zich aan jouw stijl aan.",
            viewFull: "Bekijk volledige gids",
            messageFrom: "Bericht van",
            types: {
                apartment: "Appartement",
                vacationHome: "Vakantiehuis",
                guesthouse: "Gastenverblijf"
            },
            features: {
                wifi: "WiFi Code",
                metro: "Metro",
                coffee: "Koffie",
                pool: "Zwembad",
                chef: "Privé-kok",
                tours: "Excursies",
                hammam: "Hammam",
                tea: "Thee",
                souks: "Souks"
            },
            reviews: {
                sarah: "Bedankt voor de gids, het inchecken was super eenvoudig!",
                marcJulie: "We vonden de restaurantaanbevelingen geweldig!",
                thomas: "De WiFi QR-code heeft onze aankomst gered."
            }
        },
        tipOfTheDay: "Tip van de dag",
        sunday: "Zondag",
        monday: "Maandag",
        tuesday: "Dinsdag",
        wednesday: "Woensdag",
        thursday: "Donderdag",
        friday: "Vrijdag",
        saturday: "Zaterdag",
        lazy: "Ontspannen",
        mood: "Gemotiveerd",
        discovery: "Ontdekking",
        tasty: "Lekker",
        adventure: "Avontuur",
        festive: "Feestelijk",
        outing: "Uitstapje",
        brunch: "Een brunch bij",
        explore: "Verken het centrum van",
        museums: "Bezoek de musea van",
        taste: "Proef de specialiteiten van",
        excursion: "Ga op excursie.",
        nightlife: "Nachtleven in",
        walk: "Maak een wandeling in",
        guide: {
            accessCode: "Toegangscodes",
            locked: "Dit blok is beveiligd met een code.",
            enterCode: "Toegangscode",
            apartmentDoor: "Appartementsdeur:",
            buildingDoor: "Gebouwdeur:",
            gate: "Poort:",
            notes: "Notities",
            confirm: "Bevestigen"
        },

        qrCodeWall: {
            titlePart1: "Deel uw gids",
            titlePart2: "overal",
            description: "Een eenvoudige scan is alles wat uw gasten nodig hebben.",
            items: {
                wifi: { title: "Wi-Fi Verbinding", desc: "Wachtwoord vooraf ingevuld" },
                perpetual: { title: "Permanente Toegang", desc: "De link blijft geldig" },
                remote: { title: "Live Updates", desc: "Altijd up-to-date" }
            },
            visual: {
                welcome: "Welkom",
                scan: "Scan mij",
                detected: "QR-code gedetecteerd",
                notification: {
                    app: "Maplyo",
                    title: "Open gids"
                }
            }
        },
        upsells: "Extras",
        legalPage: {
            titlePrivacy: "Privacy Policy",
            titleTerms: "Terms of Use",
            lastUpdated: "Last updated:",
            effectiveDate: "Effective as of:",
            privacy: {
                intro: "This privacy policy describes how Maplyo ('we', 'us', 'our') collects, uses, and protects your personal data, in accordance with Moroccan Law No. 09-08 regarding the protection of individuals with respect to the processing of personal data.",
                section1: {
                    title: "1. Data Collection",
                    items: [
                        "Identification data: Last name, first name, email address.",
                        "Transaction data: Payment history (processed securely by Stripe, we do not store your full bank details).",
                        "Usage data: Information on the creation and consultation of digital guides."
                    ]
                },
                section2: {
                    title: "2. Purpose of Processing",
                    intro: "Your data is collected to:",
                    items: [
                        "Provide and manage the digital guide service.",
                        "Manage your subscription and billing.",
                        "Communicate important service updates.",
                        "Improve our features through anonymized statistics."
                    ]
                },
                section3: {
                    title: "3. Data Sharing",
                    content: "We never sell your data. It may be shared only with our essential technical providers (e.g., Stripe for payments, Supabase for hosting, Resend for emails) who are bound by strict confidentiality."
                },
                section4: {
                    title: "4. Security",
                    content: "We implement technical security measures (SSL encryption, secure protocols) to protect your data from unauthorized access."
                },
                section5: {
                    title: "5. Your Rights",
                    content: "In accordance with Law 09-08, you have the right to access, rectify, and oppose your data.",
                    contact: "To exercise this right, contact us at: contact@maplyo.com"
                }
            },
            terms: {
                intro: "Welcome to Maplyo. By accessing our platform or using our services, you agree to be bound by these Terms of Use.",
                section1: {
                    title: "1. Description of Service",
                    content: "Maplyo is a SaaS (Software as a Service) platform allowing hosts and property managers to create, host, and share digital welcome books with their guests."
                },
                section2: {
                    title: "2. Subscriptions and Payments",
                    items: [
                        "Billing: Services are billed monthly or annually, in advance.",
                        "Cancellation: You can cancel your subscription at any time via your dashboard. Access to Premium features remains active until the end of the billed period.",
                        "Refund: We offer a 30-day 'Money Back Guarantee' for all new subscriptions."
                    ]
                },
                section3: {
                    title: "3. User Responsibilities",
                    intro: "You agree to:",
                    items: [
                        "Provide accurate information during registration.",
                        "Not publish illegal, defamatory, or immoral content in your guides.",
                        "Be solely responsible for the information (WiFi codes, addresses) shared with your guests."
                    ]
                },
                section4: {
                    title: "4. Intellectual Property",
                    content: "Maplyo remains the owner of the platform, the code, and the brand. You remain the owner of the content (texts, photos) you add to your guides."
                },
                section5: {
                    title: "5. Limitation of Liability",
                    content: "Maplyo shall not be held liable for indirect damages, loss of revenue, or issues arising from the use of information contained in guides created by users."
                },
                section6: {
                    title: "6. Governing Law",
                    content: "These terms are governed by Moroccan law. Any dispute relating to their interpretation and/or execution shall be subject to the competent courts of Casablanca."
                }
            }
        },
        auth: {
            login: {
                title: "Welkom terug 👋",
                subtitle: "Meld u aan om uw gidsen te beheren",
                email: "E-mail",
                password: "Wachtwoord",
                forgot: "Vergeten?",
                submit: "Aanmelden",
                noAccount: "Nog geen account?",
                createFree: "Maak een gratis account aan",
                resetLink: "Inlogprobleem? Reset",
                error: "Er is een onverwachte fout opgetreden."
            },
            signup: {
                title: "Word lid van Maplyo",
                subtitle: "Maak uitzonderlijke gidsen in enkele minuten.",
                firstName: "Voornaam",
                lastName: "Achternaam",
                businessEmail: "Zakelijk e-mailadres",
                businessName: "Bedrijfsnaam",
                phone: "Telefoonnummer",
                passwordLabel: "Wachtwoord",
                passwordHint: "Minimaal 6 tekens",
                submit: "Gratis aan de slag",
                hasAccount: "Heeft u al een account?",
                signIn: "Aanmelden",
                successTitle: "Account aangemaakt!",
                successMsg: "Er is een bevestigingsmail verzonden naar",
                successDesc: "Klik op de link om uw account te activeren.",
                backToLogin: "Terug naar inloggen"
            }
        },
        dashboard: {
            title: "Mijn Gidsen",
            subtitle: "Beheer uw gastervaringen.",
            newGuide: "Nieuwe Gids",
            emptyTitle: "Nog geen gidsen",
            emptyDesc: "Maak je eerste gids aan om een uitzonderlijke ervaring aan je gasten te bieden.",
            tryAi: "✨ Probeer AI",
            createManual: "Handmatig maken",
            published: "Online",
            draft: "Concept",
            edit: "Bewerken",
            sortRecent: "Recent",
            sortName: "Naam",
            logout: "Uitloggen",
            viewPublic: "Bekijk publieke gids",
            passProToShare: "Ga Pro om te delen",
            delete: "Verwijderen",
            confirmDelete: "Weet je zeker dat je deze gids wilt verwijderen? Dit is permanent.",
            deleteError: "Fout bij verwijderen.",
            aiModal: {
                title: "Magisch Aanmaken ✨",
                city: "Stad of Plaats",
                cityPlaceholder: "Bijv: Marrakech, Guéliz",
                type: "Type",
                typeAirbnb: "Airbnb / Appartement",
                typeHotel: "Hotel / Riad",
                typeGuesthouse: "Gastverblijf",
                audience: "Gasten",
                audienceFamilies: "Gezinnen",
                audienceCouples: "Stellen",
                audienceRemote: "Thuiswerkers",
                audienceGroups: "Groepen",
                generate: "Genereer mijn gids",
                generating: "AI schrijft uw gids...",
                generatingDesc: "Aanbevelingen maken voor"
            },
            createModal: {
                title: "Nieuwe Gids",
                nameLabel: "Naam van de gids",
                namePlaceholder: "Bijv: Riad des Lumières",
                cancel: "Annuleren",
                create: "Gids aanmaken"
            },
            limitModal: {
                title: "Gidslimiet bereikt 🏠",
                desc: "U heeft het maximale aantal gidsen voor uw huidige pakket bereikt.",
                upgrade: "🚀 Upgrade naar Onbeperkt (Pro)",
                or: "Of",
                addon: "➕ Voeg slechts 1 gids toe",
                loading: "Laden..."
            },
            addonSuccessModal: {
                title: "Gids toegevoegd! ✨",
                heading: "Klaar!",
                desc: "Uw limiet is verhoogd met 1 gids. U kunt nu uw nieuwe gids aanmaken.",
                cta: "Geweldig, bedankt!"
            },
            proModal: {
                heading: "U bent Pro!",
                desc: "Uw Pro-abonnement is actief. Geniet van onbeperkte gidsen en alle premium functies.",
                cta: "Begin met maken"
            }
        },
        pricingPage: {
            hero: {
                badge: "Investeer in uitmuntendheid",
                title1: "Een pro-gids,",
                title2: "voor de prijs van een koffie.",
                subtitle: "Verhoog uw directe inkomsten, verminder herhalende vragen en bied een 5-sterrenervaring. Rendabel vanaf de allereerste boeking."
            },
            popular: "Populair",
            header: { login: "Inloggen", signup: "Aanmelden" },
            compare: {
                title: "Gedetailleerde Vergelijking",
                subtitle: "Alles wat u nodig heeft om te slagen.",
                features: {
                    unlimited: "Onbeperkt aantal Gidsen",
                    maps: "Google Maps Integratie",
                    translation: "AI-vertaling (alle talen)",
                    domain: "Eigen Domeinnaam",
                    support: "Prioritaire Ondersteuning",
                    whiteLabel: "White Label (Geen Branding)",
                    analytics: "Geavanceerde Statistieken"
                },
                values: { oneLang: "1 taal", unlimited: "Onbeperkt", emailSupport: "E-mail", whatsappSupport: "WhatsApp 24/7" }
            },
            faqSection: {
                title: "Veelgestelde Vragen",
                subtitle: "We zijn transparant. Hier zijn de antwoorden.",
                items: [
                    { q: "Kan ik op elk moment van pakket wisselen?", a: "Ja, absoluut. U kunt vanuit uw dashboard wisselen tussen Basis en Pro. Wijzigingen worden onmiddellijk van kracht en worden automatisch pro rata berekend." },
                    { q: "Is er een commitment?", a: "Totaal geen commitment. Onze abonnementen zijn maandelijks en u kunt op elk moment met één klik opzeggen. Geen verborgen kosten." },
                    { q: "Hoe werkt de betaling?", a: "We gebruiken Stripe, de wereldleider in beveiligde online betalingen. Uw bankgegevens worden nooit op onze servers opgeslagen." },
                    { q: "Is ondersteuning inbegrepen?", a: "Ja! E-mailondersteuning is inbegrepen in alle betaalde pakketten. Het Pro-pakket krijgt prioritaire toegang en een WhatsApp-contact voor ultrasnelle assistentie." }
                ]
            },
            trust: "Vertrouwd door",
            addonLabel: "/ extra gids"
        },
        guideLock: {
            title: "Beveiligde Toegang",
            desc: "Deze gids is beveiligd met een code. Voer de code in om toegang te krijgen tot gevoelige informatie.",
            demoCode: "Demo code"
        },
        builder: {
            editorMode: "Editor Modus",
            library: "Bibliotheek",
            catEssentials: "Essentiële zaken",
            catTravel: "Reis",
            catBusiness: "Zakelijk",
            guideStructure: "Gidstructuur",
            emptyGuide: "Je gids is leeg",
            mobileMode: "Mobiele Modus",
            blockTitle: "Bloktitel",
            editing: "Bewerken...",
            close: "Sluiten",
            selectBlock: "Selecteer een blok om te bewerken",
            paramsHere: "Parameters verschijnen hier",
            designTheme: "Ontwerp & Thema",
            upgradePro: "Upgrade naar PRO voor alle premium thema's.",
            unlock: "Ontgrendelen",
            unlockPublish: "Ontgrendel publicatie",
            publishDesc: "Publiceren is voor Pro-leden. Abonneer je om je gidsen te delen!",
            seeOffers: "Bekijk aanbiedingen",
            createAccount: "Account aanmaken",
            saveCreateAccount: "Opslaan (Account aanmaken)",
            online: "Online",
            unpublish: "Publicatie ongedaan maken",
            confirmUnpublish: "Weet je zeker dat je deze gids offline wilt halen?",
            publish: "Publiceren",
            publishSuccess: "Gids succesvol gepubliceerd! 🚀",
            publishError: "Fout bij publiceren.",
            backHome: "Terug naar start",
            backDashboard: "Terug naar Dashboard",
            themeLabel: "Thema",
            qrLabel: "QR",
            blocks: "blokken",
            addBlock: "Blok toevoegen",
            blockProperties: "Blokeigenschappen",
            selectToEdit: "Selecteer een blok om te bewerken",
            startHere: "Begin hier",
            selectBlocks: "Selecteer blokken uit het linkermenu om je gids op te bouwen.",
            mobilePreview: "Mobiele preview",
            chooseTheme: "Kies een thema",
            reset: "Resetten",
            viewGuide: "Bekijk gids ↗",
            defaultGuideTitle: "Reiziger",
            themeModal: {
                title: "Kies een thema",
                subtitle: "Pas het uiterlijk van je gids aan."
            }
        },
        editor: {
            common: {
                title: "Titel",
                description: "Beschrijving",
                instructions: "Instructies",
                placeholder: "Bijv: ...",
                add: "Toevoegen",
                remove: "Verwijderen",
                save: "Opslaan",
                cancel: "Annuleren",
                uploadImage: "Omslagfoto",
                uploadFile: "Bestand uploaden",
                videoUrl: "Video (MP4) of YouTube URL",
                mapUrl: "Google Maps Link (Optioneel)",
                address: "Volledig adres",
                phone: "Telefoon",
                email: "E-mail",
                whatsapp: "WhatsApp (Internationaal nummer)",
                price: "Prijs",
                cost: "Kosten",
                time: "Tijd",
                hours: "Openingstijden",
                location: "Locatie",
                tags: "Tags (gescheiden door komma's)",
                linkText: "Knoptekst",
                linkUrl: "Knoplink",
                other: "Andere",
                priceCheap: "Betaalbaar",
                priceModerate: "Gemiddeld",
                priceExpensive: "Luxe",
                placeholderUrl: "https://...",
                placeholderWelcome: "We zijn blij u te mogen verwelkomen...",
                placeholderMonth: "JAN",
                placeholderDay: "01",
                placeholderTime: "20:00",
                placeholderPrice: "25€",
                placeholderReserve: "Reserveren",
                placeholderAddress: "Voorbeeldstraat 123, Amsterdam",
                placeholderMap: "https://goo.gl/maps/...",
                placeholderPhone: "+31 6 00000000",
                placeholderWhatsapp: "31600000000",
                placeholderEmail: "contact@voorbeeld.nl",
                placeholderTags: "Romantisch, Zeezicht, Italiaans..."
            },
            wifi: {
                networkName: "Netwerknaam",
                password: "Wachtwoord",
                notes: "Opmerking (optioneel)"
            },
            checkin: {
                timePlaceholder: "bijv: 15:00",
                instrPlaceholder: "Toegangsinstructies..."
            },
            contact: {
                nameLabel: "Weergavenaam",
                namePlaceholder: "Jouw naam"
            },
            rules: {
                title: "Regel",
                add: "Regel toevoegen",
                placeholder: "bijv: Geen lawaai na 22:00"
            },
            amenities: {
                title: "Voorziening",
                add: "Voorziening toevoegen",
                placeholder: "bijv: Koffiezetapparaat"
            },
            faq: {
                question: "Vraag",
                answer: "Antwoord",
                add: "Vraag toevoegen",
                qPlaceholder: "bijv: Is er WiFi?",
                aPlaceholder: "Ja, de code is..."
            },
            trash: {
                dayTrash: "Vuilnisdag",
                dayRecycling: "Recyclingdag",
                location: "Locatie van de bakken",
                photoLocal: "Foto van de ruimte"
            },
            parking: {
                photo: "Foto van de parkeerplaats",
                costPlaceholder: "bijv: Gratis / €2 per uur"
            },
            breakfast: {
                menu: "Op het menu / Details",
                menuPlaceholder: "Continentaal ontbijt, lokale producten..."
            },
            transport: {
                add: "Transport toevoegen",
                stop: "Beschrijving / Halte",
                bus: "Bus",
                train: "Trein / Metro",
                taxi: "Taxi / Uber",
                bike: "Fiets"
            },
            places: {
                name: "Naam van de plek",
                add: "Plek toevoegen",
                aiButton: "AI Aanbeveling"
            },
            events: {
                add: "Evenement toevoegen",
                month: "Maand (3 letters)",
                day: "Dag",
                aiButton: "Vind evenementen"
            },
            documents: {
                add: "Document toevoegen",
                name: "Documentnaam",
                url: "Bestands-URL (PDF...)"
            },
            upsells: {
                add: "Aanbieding toevoegen",
                image: "Afbeelding van de aanbieding",
                buttonText: "Knoptekst",
                buttonLink: "Knoplink"
            },
            embed: {
                url: "In te sluiten URL (Iframe)",
                warning: "Zorg ervoor dat de site insluiting toestaat (X-Frame-Options)."
            }
        },
        settings: {
            title: "Instellingen & Account",
            tabProfile: "Profiel",
            tabPlan: "Abonnement",
            tabShop: "Boutique (Upsells)",
            personalInfo: "Persoonlijke informatie",
            fullName: "Volledige naam",
            email: "E-mail",
            saveProfile: "Profiel opslaan",
            yourPlan: "Jouw abonnement",
            currentPlan: "Huidig plan",
            manageSubscription: "Abonnement beheren",
            success: "Succes",
            error: "Fout"
        },
        renderer: {
            searchPlaceholder: "Zoek informatie, een code...",
            wifi: "Wi-Fi",
            access: "Toegangscodes",
            checkin: "Aankomst",
            checkout: "Vertrek",
            location: "Locatie",
            rules: "Huisregels",
            contact: "Contact",
            amenities: "Voorzieningen",
            places: "In de buurt",
            events: "Evenementen",
            documents: "Documenten",
            upsells: "Extra diensten",
            embed: "Inhoud",
            welcome: "Welkom",
            trash: "Vuilnis",
            parking: "Parkeren",
            breakfast: "Ontbijt",
            transport: "Vervoer",
            days: "dagen",
            hours: "uur",
            minutes: "minuten",
            network: "Netwerk",
            password: "Wachtwoord",
            copy: "Kopiëren",
            copied: "Gekopieerd!",
            getDirections: "Routebeschrijving",
            openMaps: "Maps openen",
            call: "Bellen",
            message: "Bericht",
            ai: {
                assistant: "AI Assistent",
                online: "Online",
                empty: "Stel me gerust vragen over je verblijf!",
                thinking: "Nadenken...",
                placeholder: "Stel een vraag...",
                error: "Sorry, er is een fout opgetreden."
            },
            empty: "Geen resultaten gevonden",
            seeAll: "Alles tonen",
            less: "Minder tonen",
            scanQr: "Scan om te downloaden",
            share: "Delen",
            download: "Downloaden",
            tipOfTheDay: "Tip van de dag",
            sunday: "Zondag",
            monday: "Maandag",
            tuesday: "Dinsdag",
            wednesday: "Woensdag",
            thursday: "Donderdag",
            friday: "Vrijdag",
            saturday: "Zaterdag",
            lazy: "Lui",
            mood: "Stemming",
            discovery: "Ontdekking",
            tasty: "Lekker",
            adventure: "Avontuur",
            festive: "Feestelijk",
            outing: "Uitstapje",
            brunch: "Brunch",
            explore: "Centrum verkennen",
            museums: "Musea bezoeken",
            taste: "Specialiteiten proeven",
            excursion: "Op excursie gaan",
            nightlife: "Nachtleven",
            walk: "Wandelen",
            items: "items",
            viewMap: "Kaart bekijken",
            secureAccess: "Beveiligde toegang"
        }
    },
    zh_duplicated: {
        common: {
            getStarted: "立即开始",
            login: "登录",
            signup: "注册",
            tryFree: "免费试用",
            popular: "最受欢迎",
            month: "/月",
            loading: "加载中...",
            choose: "选择",
            viewGuide: "查看完整指南",
            more: "查看更多",
            checkin: "入住",
            qrCodeWall: "扫码测试",
            checkout: "退房",
            location: "位置",
            viewOnMap: "在地图上查看",
            wifi: "WiFi",
        },
        socialProof: {
            trustpilot: "4.9/5 由 500+ 位房东好评",
            usedBy: "由顶级物业管理公司使用",
            autoTranslate: {
                title: "自动翻译",
                desc: "您的指南会自动翻译成客人的语言。"
            },
            googleMaps: {
                title: "内置谷歌地图",
                desc: "在指南中直接使用谷歌地图。"
            }
        },
        hero: {
            tag: "专为房东和物业管理者打造",
            title: "再也不用重复告知 WiFi 密码。",
            subtitle: "数字化您的欢迎手册。提供五星级体验，减少 50% 的咨询，并提升您的好评率。",
            cta: "创建我的免费指南",
            demo: "查看示例",
            noCreditCard: "无需信用卡",
            setupTime: "2 分钟即可完成设置",
        },
        features: {
            title: "您所需的一切功能。",
            subtitle: "大道至简，功能纯粹。",
            description: "强大的工具，自动化您的客人接待，让您的旅客倍感安心，无需任何技术门槛。",
            items: {
                mobileFirst: {
                    title: "100% 移动端优先",
                    desc: "无需下载 App。您的指南可以在任何移动端浏览器中立即打开。"
                },
                secure: {
                    title: "安全代码",
                    desc: "保护 WiFi 和钥匙箱的访问。通过电子邮件或唯一代码解锁。"
                },
                map: {
                    title: "交互式地图",
                    desc: "嵌入您最喜欢的餐厅、酒吧和活动，点击即可使用谷歌地图导航。"
                },
                live: {
                    title: "实时更新",
                    desc: "更改 WiFi 密码或推荐内容，所有手机端都会立即同步更新。"
                },
                translate: {
                    title: "自动翻译",
                    desc: "自动检测客人手机的语言并翻译您的指南。"
                },
                checklist: {
                    title: "检查清单",
                    desc: "清晰的入驻和离店指令。减少 80% 的重复性问题。"
                }
            }
        },
        pricing: {
            title: "Transparent Pricing",
            subtitle: "Start for free. Scale when you want.",
            bestOffer: "The best offer in the world:",
            addon: "+20 DH / additional guide",
            enterprise: {
                title: "Need an Enterprise solution?",
                desc: "For managers with 50+ properties, we offer volume discounts and PMS integration.",
                cta: "Contact Sales Team"
            },
            plans: {
                demo: {
                    name: "Discovery",
                    price: "Free",
                    desc: "Test the power of Maplyo without a credit card.",
                    button: "Create a guide (Free)",
                    features: [
                        'Full access to Creator',
                        'Mobile Preview',
                        'No publishing'
                    ]
                },
                basic: {
                    name: "Essential",
                    desc: "To launch your first property.",
                    button: "Start Now",
                    features: [
                        'Complete Digital Guidebook',
                        'Instant WiFi QR Code',
                        'Interactive Map (Google Maps)',
                        'Free Themes (Premium Pack +15 DH)',
                        '1 Unique Guide'
                    ]
                },
                pro: {
                    name: "Growth",
                    desc: "To maximize your revenue & reviews.",
                    button: "Upgrade to Growth",
                    features: [
                        'Unlimited Guides (+20 DH/ea.)',
                        'INCLUDED Premium Themes',
                        'Automatic Translation (AI)',
                        '24/7 Guest Assistant (AI)',
                        'Priority WhatsApp Support'
                    ]
                },
                business: {
                    name: "Agency",
                    desc: "For portfolios of 10+ properties.",
                    button: "Talk to an Expert",
                    price: "Custom",
                    features: [
                        'Unlimited Guides',
                        'Multi-Property Dashboard',
                        'White Label (No Maplyo logo)',
                        'PMS & Channel Mgr Integration',
                        'Centralized Billing'
                    ]
                }
            },
            trust: "30-Day Money Back Guarantee • Secure SSL Payment"
        },
        testimonials: {
            title: "专业人士的选择",
            subtitle: "加入 500 多位已实现接待自动化的房东行列。",
            items: [
                {
                    name: "Jean-Philippe R.",
                    role: "Airbnb 超级房东 (马拉喀什)",
                    text: "我的客人总是不停地询问 WiFi 密码或如何开启空调。有了 Maplyo，他们手机里就有了一切。我每周轻松节省了 2 小时时间。",
                    result: "-60% 的消息咨询",
                },
                {
                    name: "Sofia B.",
                    role: "物业管理经理 (卡萨布兰卡)",
                    text: "对我们来说，最大的改变是增值服务。我们直接在指南中提供清洁或交通服务，这显著提高了我们的收入。",
                    result: "+15% 的收入",
                },
                {
                    name: "Karim M.",
                    role: "里亚德房主 (菲斯)",
                    text: "非常专业。多语言功能太棒了，我的美国和西班牙客人很高兴能用他们的母语看到信息，而我什么都不用做。",
                    result: "5★ 好评",
                }
            ]
        },
        faq: {
            title: "常见问题",
            subtitle: "透明公开，解您所惑。",
            questions: [
                {
                    q: "我需要技术背景吗？",
                    a: "完全不需要。就像填写社交媒体资料一样简单。您添加信息，我们负责设计。"
                },
                {
                    q: "客人如何访问指南？",
                    a: "通过您放置在房屋内的简单二维码，或在入住前通过消息发送的链接。"
                },
                {
                    q: "打印二维码后，我还能更新指南吗？",
                    a: "当然可以！这就是数字化指南的魔力。您可以随时更新信息（WiFi、餐厅等），二维码保持不变。"
                },
                {
                    q: "有合同限制吗？",
                    a: "没有任何限制。我们的订阅是按月的，您可以随时一键取消。"
                }
            ]
        },
        footer: {
            product: "产品",
            support: "支持",
            legal: "法律信息",
            desc: "Maplyo 帮助房东和物业管理人员通过智能数字化指南提供 5 星级体验。",
            links: {
                features: "功能",
                pricing: "价格",
                testimonials: "用户评价",
                roadmap: "路线图",
                help: "帮助中心",
                contact: "联系我们",
                privacy: "隐私政策",
                terms: "服务条款",
                legal: "法律声明"
            },
            securePayment: "安全支付",
            rights: "保留所有权利。"
        },
        cta: {
            title: "准备好给人留下深刻印象了吗？",
            subtitle: "加入新一代房东，提供卓越的住宿体验。",
            button: "创建我的第一本指南",
            subtext: "无需信用卡 • 随时取消"
        },
        tipOfTheDay: "每日小贴士",
        sunday: "星期日",
        monday: "星期一",
        tuesday: "星期二",
        wednesday: "星期三",
        thursday: "星期四",
        friday: "星期五",
        saturday: "星期六",
        lazy: "轻松",
        mood: "充满活力",
        discovery: "探索",
        tasty: "美味",
        adventure: "冒险",
        festive: "欢乐",
        outing: "郊游",
        brunch: "早午餐在",
        explore: "探索中心",
        museums: "参观博物馆",
        taste: "品尝特色美食",
        excursion: "去远足",
        nightlife: "夜生活在",
        walk: "散步在",
        guide: {
            accessCode: "门禁代码",
            locked: "此内容受密码保护。",
            enterCode: "输入代码",
            apartmentDoor: "公寓房门:",
            buildingDoor: "大楼单元门:",
            gate: "大门/闸机:",
            notes: "备注",
            confirm: "确认"
        },

        qrCodeWall: {
            titlePart1: "随时随地",
            titlePart2: "共享您的指南",
            description: "客人只需简单扫码即可访问。",
            items: {
                wifi: { title: "Wi-Fi 连接", desc: "密码已预填" },
                perpetual: { title: "永久访问", desc: "链接长期有效" },
                remote: { title: "实时更新", desc: "信息始终保持同步" }
            },
            visual: {
                welcome: "欢迎光临",
                scan: "扫码访问",
                detected: "已识别二维码",
                notification: {
                    app: "Maplyo",
                    title: "打开指南"
                }
            }
        },
        upsells: "增值服务",
        legalPage: {
            titlePrivacy: "Privacy Policy",
            titleTerms: "Terms of Use",
            lastUpdated: "Last updated:",
            effectiveDate: "Effective as of:",
            privacy: {
                intro: "This privacy policy describes how Maplyo ('we', 'us', 'our') collects, uses, and protects your personal data, in accordance with Moroccan Law No. 09-08 regarding the protection of individuals with respect to the processing of personal data.",
                section1: {
                    title: "1. Data Collection",
                    items: [
                        "Identification data: Last name, first name, email address.",
                        "Transaction data: Payment history (processed securely by Stripe, we do not store your full bank details).",
                        "Usage data: Information on the creation and consultation of digital guides."
                    ]
                },
                section2: {
                    title: "2. Purpose of Processing",
                    intro: "Your data is collected to:",
                    items: [
                        "Provide and manage the digital guide service.",
                        "Manage your subscription and billing.",
                        "Communicate important service updates.",
                        "Improve our features through anonymized statistics."
                    ]
                },
                section3: {
                    title: "3. Data Sharing",
                    content: "We never sell your data. It may be shared only with our essential technical providers (e.g., Stripe for payments, Supabase for hosting, Resend for emails) who are bound by strict confidentiality."
                },
                section4: {
                    title: "4. Security",
                    content: "We implement technical security measures (SSL encryption, secure protocols) to protect your data from unauthorized access."
                },
                section5: {
                    title: "5. Your Rights",
                    content: "In accordance with Law 09-08, you have the right to access, rectify, and oppose your data.",
                    contact: "To exercise this right, contact us at: contact@maplyo.com"
                }
            },
            terms: {
                intro: "Welcome to Maplyo. By accessing our platform or using our services, you agree to be bound by these Terms of Use.",
                section1: {
                    title: "1. Description of Service",
                    content: "Maplyo is a SaaS (Software as a Service) platform allowing hosts and property managers to create, host, and share digital welcome books with their guests."
                },
                section2: {
                    title: "2. Subscriptions and Payments",
                    items: [
                        "Billing: Services are billed monthly or annually, in advance.",
                        "Cancellation: You can cancel your subscription at any time via your dashboard. Access to Premium features remains active until the end of the billed period.",
                        "Refund: We offer a 30-day 'Money Back Guarantee' for all new subscriptions."
                    ]
                },
                section3: {
                    title: "3. User Responsibilities",
                    intro: "You agree to:",
                    items: [
                        "Provide accurate information during registration.",
                        "Not publish illegal, defamatory, or immoral content in your guides.",
                        "Be solely responsible for the information (WiFi codes, addresses) shared with your guests."
                    ]
                },
                section4: {
                    title: "4. Intellectual Property",
                    content: "Maplyo remains the owner of the platform, the code, and the brand. You remain the owner of the content (texts, photos) you add to your guides."
                },
                section5: {
                    title: "5. Limitation of Liability",
                    content: "Maplyo shall not be held liable for indirect damages, loss of revenue, or issues arising from the use of information contained in guides created by users."
                },
                section6: {
                    title: "6. Governing Law",
                    content: "These terms are governed by Moroccan law. Any dispute relating to their interpretation and/or execution shall be subject to the competent courts of Casablanca."
                }
            }
        },
        auth: {
            login: {
                title: "Welcome back 👋",
                subtitle: "Sign in to manage your guides",
                email: "Email",
                password: "Password",
                forgot: "Forgot?",
                submit: "Sign In",
                noAccount: "No account yet?",
                createFree: "Create a free account",
                resetLink: "Login issue? Reset",
                error: "An unexpected error occurred."
            },
            signup: {
                title: "Join Maplyo",
                subtitle: "Create exceptional guides in minutes.",
                firstName: "First Name",
                lastName: "Last Name",
                businessEmail: "Business Email",
                businessName: "Business Name",
                phone: "Phone",
                passwordLabel: "Password",
                passwordHint: "Minimum 6 characters",
                submit: "Start for free",
                hasAccount: "Already have an account?",
                signIn: "Sign in",
                successTitle: "Account created!",
                successMsg: "A confirmation email was sent to",
                successDesc: "Please click the link to activate your account.",
                backToLogin: "Back to login"
            }
        },
        dashboard: {
            title: "我的指南",
            subtitle: "管理您的宾客体验。",
            newGuide: "新指南",
            emptyTitle: "尚无指南",
            emptyDesc: "创建您的第一个指南，为您的客人提供卓越的体验。",
            tryAi: "✨ 尝试 AI",
            createManual: "手动创建",
            published: "在线",
            draft: "草稿",
            edit: "编辑",
            sortRecent: "最近",
            sortName: "名称",
            logout: "注销",
            viewPublic: "查看公开指南",
            passProToShare: "升级 Pro 以共享",
            delete: "删除",
            confirmDelete: "您确定要删除此指南吗？此操作不可撤销。",
            deleteError: "删除时出错。",
            aiModal: {
                title: "魔法创建 ✨",
                city: "城市或地点",
                cityPlaceholder: "例如：马拉喀什, 盖利兹",
                type: "类型",
                typeAirbnb: "Airbnb / 公寓",
                typeHotel: "酒店 / 摩洛哥庭院旅馆",
                typeGuesthouse: "民宿",
                audience: "宾客",
                audienceFamilies: "家庭",
                audienceCouples: "情侣",
                audienceRemote: "远程办公者",
                audienceGroups: "团体",
                generate: "生成我的指南",
                generating: "AI 正在编写您的指南...",
                generatingDesc: "正在创建建议："
            },
            createModal: {
                title: "新指南",
                nameLabel: "指南名称",
                namePlaceholder: "例如：Riad des Lumières",
                cancel: "取消",
                create: "创建指南"
            },
            limitModal: {
                title: "已达到指南上限 🏠",
                desc: "您已达到当前方案的最大指南数量。",
                upgrade: "🚀 升级到无限 (Pro)",
                or: "或",
                addon: "➕ 仅添加 1 个指南",
                loading: "正在加载..."
            },
            addonSuccessModal: {
                title: "指南已添加！✨",
                heading: "准备就绪！",
                desc: "您的上限已增加 1 个指南。您现在可以创建新指南了。",
                cta: "太棒了，谢谢！"
            },
            proModal: {
                heading: "您已成为 Pro 用户！",
                desc: "您的 Pro 订阅已激活。享受无限指南和所有高级功能。",
                cta: "开始创建"
            }
        },
        pricingPage: {
            hero: {
                badge: "Invest in excellence",
                title1: "A pro guide,",
                title2: "at the price of a coffee.",
                subtitle: "Increase your direct revenue, reduce repetitive questions and offer a 5-star experience. Profitable from the very first booking."
            },
            popular: "Popular",
            header: { login: "Login", signup: "Sign Up" },
            compare: {
                title: "Detailed Comparison",
                subtitle: "Everything you need to succeed.",
                features: {
                    unlimited: "Unlimited Guides",
                    maps: "Google Maps Integration",
                    translation: "AI Translation (all languages)",
                    domain: "Custom Domain Name",
                    support: "Priority Support",
                    whiteLabel: "White Label (No Branding)",
                    analytics: "Advanced Analytics"
                },
                values: { oneLang: "1 language", unlimited: "Unlimited", emailSupport: "Email", whatsappSupport: "WhatsApp 24/7" }
            },
            faqSection: {
                title: "FAQ",
                subtitle: "We're transparent. Here are the answers.",
                items: [
                    { q: "Can I change plans at any time?", a: "Yes, absolutely. You can switch between Basic and Pro from your dashboard. Changes take effect immediately and prorated automatically." },
                    { q: "Is there a commitment?", a: "No commitment at all. Our subscriptions are monthly and you can cancel at any time with one click. No hidden fees." },
                    { q: "How does payment work?", a: "We use Stripe, the world leader in secure online payments. Your banking details are never stored on our servers." },
                    { q: "Is support included?", a: "Yes! Email support is included in all paid plans. The Pro plan gets priority access and a WhatsApp contact for ultra-fast assistance." }
                ]
            },
            trust: "Trusted by",
            addonLabel: "/ extra guide"
        },
        guideLock: {
            title: "安全访问",
            desc: "请解锁此指南以访问访问代码和敏感信息。",
            demoCode: "演示代码"
        },
        builder: {
            editorMode: "编辑模式",
            library: "库",
            catEssentials: "必备",
            catTravel: "旅行",
            catBusiness: "商务",
            guideStructure: "指南结构",
            emptyGuide: "您的指南是空的",
            mobileMode: "移动模式",
            blockTitle: "区块标题",
            editing: "正在编辑",
            close: "关闭",
            selectBlock: "选择要编辑的区块",
            paramsHere: "参数将在此处显示",
            designTheme: "设计与主题",
            upgradePro: "升级到 PRO 以解锁所有高级主题。",
            unlock: "解锁",
            unlockPublish: "解锁发布",
            publishDesc: "发布指南仅限 Pro 会员。订阅以分享您的指南！",
            seeOffers: "查看优惠",
            createAccount: "创建帐户",
            saveCreateAccount: "保存（创建帐户）",
            online: "在线",
            unpublish: "取消发布",
            confirmUnpublish: "您确定要取消发布此指南吗？",
            publish: "发布",
            publishSuccess: "指南发布成功！🚀",
            publishError: "发布错误。",
            backHome: "返回首页",
            backDashboard: "返回控制面板",
            themeLabel: "主题",
            qrLabel: "二维码",
            blocks: "区块"
        },
        settings: {
            title: "设置与帐户",
            tabProfile: "个人资料",
            tabPlan: "订阅",
            tabShop: "商店 (增值服务)",
            personalInfo: "个人信息",
            fullName: "全名",
            email: "电子邮件",
            saveProfile: "保存资料",
            yourPlan: "您的订阅",
            currentPlan: "当前方案",
            manageSubscription: "管理订阅",
            success: "成功",
            error: "错误"
        },
        guideBlocks: {
            wifi: { network: "网络", password: "密码", scan: "扫码加入" },
            accessCodes: { code: "访问码", location: "位置", instruction: "说明" },
            location: { viewOnMap: "在地图上查看", address: "地址", copyAddress: "复制地址", openInMaps: "在 Google 地图上打开", notSet: "未提供地址" },
            transport: { getThere: "如何到达", parking: "停车场", noInfo: "无交通信息", call: "拨打" },
            checkIn: { title: "入住" },
            checkOut: { title: "退房" },
            contact: { host: "房东", yourHost: "您的房东", phone: "电话", openConversation: "打开对话" },
            rules: { noRules: "未指定规则" },
            amenities: { noAmenities: "未指定设施" },
            faq: { noFaq: "无常见问题", question: "问题", answer: "回答" },
            trash: { title: "垃圾管理", items: "垃圾", recycling: "回收" },
            breakfast: { title: "早餐", menu: "菜单上" }
        }
    },
    ar: {
        common: {
            getStarted: "ابدأ الآن",
            tryFree: "جرب مجاناً",
            noCreditCard: "لا يلزم بطاقة ائتمان",
            dashboard: "لوحة التحكم",
            pricing: "الأسعار",
            features: "المميزات",
            login: "تسجيل الدخول",
            signup: "إنشاء حساب",
            logout: "تسجيل الخروج",
            back: "رجوع",
            save: "حفظ",
            cancel: "إلغاء",
            delete: "حذف",
            edit: "تعديل",
            create: "إنشاء",
            loading: "جاري التحميل...",
            success: "نجاح",
            error: "خطأ"
        },
        socialProof: {
            trustedBy: "موثوق من قبل أكثر من 500 مضيف حول العالم",
            rating: "4.9/5 بناءً على تقييمات المستخدمين"
        },
        hero: {
            badge: "جديد: مساعد الذكاء الاصطناعي متاح الآن 🚀",
            title: "دليل رقمي",
            titleAccent: "احترافي",
            titleEnd: "لضيوفك",
            subtitle: "أبهر ضيوفك بدليل تفاعلي. قلل من الأسئلة المتكررة ووفر ساعات من وقتك كل أسبوع.",
            cta: "أنشئ دليلي الأول",
            secondaryCta: "مشاهدة مثال",
            trustedBy: "موثوق من قبل أفضل المضيفين في"
        },
        features: {
            title: "كل ما تحتاجه للتميز",
            subtitle: "أدوات قوية مصممة للمضيفين المشغولين.",
            items: [
                {
                    title: "إنشاء سحري بالذكاء الاصطناعي",
                    description: "أدخل عنوانك، وسيقوم الذكاء الاصطناعي لدينا بإنشاء أفضل التوصيات المحلية (مطاعم، أنشطة) في ثوانٍ."
                },
                {
                    title: "ترجمة تلقائية",
                    description: "دليلك متاح بـ 6 لغات. سيتعرف النظام تلقائياً على لغة ضيفك."
                },
                {
                    title: "تحديثات فورية",
                    description: "تغيير في كود الواي فاي؟ تحديث في المطعم؟ عدل دليلك، وسيتم تحديثه فوراً دون الحاجة لإعادة الطباعة."
                },
                {
                    title: "دخول بدون تطبيق",
                    description: "لا حاجة لتحميل أي شيء. يقوم ضيوفك بمسح كود QR والوصول إلى المعلومات فوراً من متصفحهم."
                }
            ]
        },
        pricing: {
            title: "أسعار بسيطة، بدون مفاجآت",
            subtitle: "اختر الخطة التي تناسب احتياجاتك.",
            plans: {
                free: {
                    name: "مجاني",
                    price: "0",
                    features: [
                        "دليل واحد",
                        "محرر أساسي",
                        "لغة واحدة (الفرنسية)",
                        "كود QR قياسي"
                    ]
                },
                basic: {
                    name: "أساسي",
                    price: "9",
                    features: [
                        "دليل واحد",
                        "محرر كامل",
                        "جميع اللغات",
                        "تخصيص الألوان",
                        "مساعد الذكاء الاصطناعي (محدود)"
                    ]
                },
                pro: {
                    name: "احترافي",
                    price: "19",
                    features: [
                        "أدلة غير محدودة",
                        "دومين مخصص",
                        "بدون علامة Maplyo التجارية",
                        "مساعد الذكاء الاصطناعي (غير محدود)",
                        "إحصائيات متقدمة"
                    ]
                }
            },
            trust: "ضمان استرداد الأموال لمدة 30 يوماً • دفع آمن عبر SSL"
        },
        testimonials: {
            title: "معتمد من قبل المحترفين",
            subtitle: "انضم إلى أكثر من 500 مضيف قاموا بأتمتة استقبالهم.",
            items: [
                {
                    name: "جان فيليب ر.",
                    role: "مضيف متميز في Airbnb (مراكش)",
                    text: "كان ضيوفي يستمرون في السؤال عن كود الواي فاي أو كيفية تشغيل المكيف. مع Maplyo، أصبح لديهم كل شيء على هواتفهم. وفرت بسهولة ساعتين في الأسبوع.",
                    result: "-60% رسائل"
                },
                {
                    name: "صوفيا ب.",
                    role: "مديرة كونسيرج (الدار البيضاء)",
                    text: "نقطة التحول بالنسبة لنا كانت البيع الإضافي. نحن نقدم خدمات التنظيف أو النقل مباشرة في الدليل. لقد عزز ذلك إيراداتنا.",
                    result: "+15% إيرادات"
                },
                {
                    name: "كريم م.",
                    role: "صاحب رياض (فاس)",
                    text: "احترافي للغاية. الجانب متعدد اللغات مذهل، زبائني الأمريكيون والإسبان سعداء بالحصول على المعلومات بلغتهم دون أن أفعل أي شيء.",
                    result: "5★ تقييمات"
                }
            ]
        },
        faq: {
            title: "الأسئلة الشائعة",
            subtitle: "كل ما تحتاج لمعرفته للبدء.",
            questions: [
                {
                    q: "هل أحتاج إلى مهارات تقنية؟",
                    a: "على الإطلاق. الأمر سهل مثل ملء ملف تعريف على وسائل التواصل الاجتماعي. أنت تضيف المعلومات، ونحن نتولى التصميم."
                },
                {
                    q: "كيف يصل الضيوف إلى الدليل؟",
                    a: "عبر كود QR بسيط تضعه في المسكن، أو رابط ترسله عبر الرسائل قبل الوصول."
                },
                {
                    q: "هل يمكنني تحديث الدليل بعد طباعة كود QR؟",
                    a: "نعم! هذا هو السحر. قم بتحديث معلوماتك (الواي فاي، المطاعم...) وسيظل كود QR كما هو تماماً."
                },
                {
                    q: "هل هناك عقد؟",
                    a: "لا، يمكنك الإلغاء في أي وقت."
                }
            ]
        },
        footer: {
            product: "المنتج",
            support: "الدعم",
            legal: "قانوني",
            desc: "تساعد Maplyo المضيفين ومديري العقارات على تقديم تجربة 5 نجوم من خلال أدلة رقمية ذكية.",
            links: {
                features: "المميزات",
                pricing: "الأسعار",
                testimonials: "الشهادات",
                roadmap: "خارطة الطريق",
                help: "المساعدة",
                contact: "اتصل بنا",
                privacy: "الخصوصية",
                terms: "الشروط",
                legal: "إشعار قانوني"
            },
            securePayment: "دفع آمن",
            rights: "جميع الحقوق محفوظة."
        },
        cta: {
            title: "هل أنت مستعد للإبهار؟",
            subtitle: "انضم إلى الجيل الجديد من المضيفين الذين يقدمون تجربة استثنائية.",
            button: "أنشئ دليلي الأول",
            subtext: "لا يلزم بطاقة ائتمان • إلغاء في أي وقت"
        },
        tipOfTheDay: "نصيحة اليوم",
        sunday: "الأحد",
        monday: "الأثنين",
        tuesday: "الثلاثاء",
        wednesday: "الأربعاء",
        thursday: "الخميس",
        friday: "الجمعة",
        saturday: "السبت",
        lazy: "استرخاء",
        mood: "متحمس",
        discovery: "اكتشاف",
        tasty: "لذيذ",
        adventure: "مغامرة",
        festive: "احتفالي",
        outing: "نزهة",
        brunch: "فطور متأخر في",
        explore: "استكشف وسط",
        museums: "قم بزيارة متاحف",
        taste: "تذوق تخصصات",
        excursion: "اذهب في رحلة",
        nightlife: "الحياة الليلية في",
        walk: "قم بنزهة في",
        guide: {
            accessCode: "أكواد الدخول",
            locked: "هذا القسم محمي بكود.",
            enterCode: "كود الدخول",
            apartmentDoor: "باب الشقة:",
            buildingDoor: "باب المبنى:",
            gate: "البوابة:",
            notes: "ملاحظات"
        },

        qrCodeWall: {
            titlePart1: "شارك دليلك",
            titlePart2: "في كل مكان",
            description: "مسح ضوئي بسيط هو كل ما يحتاجه ضيوفك.",
            items: {
                wifi: { title: "اتصال واي فاي", desc: "كلمة المرور معبأة مسبقاً" },
                perpetual: { title: "وصول دائم", desc: "يظل الرابط صالحاً" },
                remote: { title: "تحديثات مباشرة", desc: "محدث دائماً" }
            },
            visual: {
                welcome: "أهلاً بك",
                scan: "امسحني ضوئياً",
                detected: "تم اكتشاف كود QR",
                notification: {
                    app: "Maplyo",
                    title: "افتح الدليل"
                }
            }
        },
        upsells: "إضافات",
        auth: {
            login: {
                title: "مرحباً بعودتك 👋",
                subtitle: "سجل الدخول لإدارة أدلتك",
                email: "البريد الإلكتروني",
                password: "كلمة المرور",
                forgot: "نسيت؟",
                submit: "تسجيل الدخول",
                noAccount: "ليس لديك حساب بعد؟",
                createFree: "أنشئ حساباً مجانياً",
                resetLink: "مشكلة في الدخول؟ إعادة تعيين",
                error: "حدث خطأ غير متوقع."
            },
            signup: {
                title: "انضم إلى Maplyo",
                subtitle: "أنشئ أدلة استثنائية في دقائق.",
                firstName: "الاسم الأول",
                lastName: "الاسم الأخير",
                businessEmail: "بريد العمل",
                businessName: "اسم العمل",
                phone: "الهاتف",
                passwordLabel: "كلمة المرور",
                passwordHint: "6 أحرف كحد أدنى",
                submit: "ابدأ مجاناً",
                hasAccount: "لديك حساب بالفعل؟",
                signIn: "تسجيل الدخول",
                successTitle: "تم إنشاء الحساب!",
                successMsg: "تم إرسال بريد تأكيد إلى",
                successDesc: "يرجى الضغط على الرابط لتفعيل حسابك.",
                backToLogin: "العودة لتسجيل الدخول"
            }
        },
        dashboard: {
            title: "أدلتك",
            subtitle: "إدارة تجربة ضيوفك.",
            newGuide: "دليل جديد",
            emptyTitle: "لا توجد أدلة بعد",
            emptyDesc: "أنشئ دليلك الأول لتقديم تجربة استثنائية لضيوفك.",
            tryAi: "✨ جرب الذكاء الاصطناعي",
            createManual: "إنشاء يدوي",
            published: "منشور",
            draft: "مسودة",
            edit: "تعديل",
            sortRecent: "الأحدث",
            sortName: "الاسم",
            logout: "تسجيل الخروج",
            viewPublic: "عرض الدليل العام",
            passProToShare: "ترقية لـ Pro للمشاركة",
            delete: "حذف",
            confirmDelete: "هل أنت متأكد أنك تريد حذف هذا الدليل؟ هذا الإجراء لا يمكن التراجع عنه.",
            deleteError: "خطأ أثناء الحذف.",
            aiModal: {
                title: "إنشاء سحري ✨",
                city: "المدينة أو الموقع",
                cityPlaceholder: "مثال: مراكش، كليز",
                type: "النوع",
                typeAirbnb: "Airbnb / شقة",
                typeHotel: "فندق / رياض",
                typeGuesthouse: "دار ضيافة",
                audience: "الضيوف",
                audienceFamilies: "عائلات",
                audienceCouples: "أزواج",
                audienceRemote: "عن بعد",
                audienceGroups: "مجموعات",
                generate: "إنشاء دليلي",
                generating: "الذكاء الاصطناعي يكتب دليلك...",
                generatingDesc: "جاري إنشاء الاقتراحات:"
            },
            createModal: {
                title: "دليل جديد",
                nameLabel: "اسم الدليل",
                namePlaceholder: "مثال: رياض الأنوار",
                cancel: "إلغاء",
                create: "إنشاء الدليل"
            },
            limitModal: {
                title: "تم الوصول للحد الأقصى 🏠",
                desc: "لقد وصلت للحد الأقصى من الأدلة لخطتك الحالية.",
                upgrade: "🚀 ترقية لللا محدود (Pro)",
                or: "أو",
                addon: "➕ أضف دليلاً واحداً فقط",
                loading: "جاري التحميل..."
            },
            addonSuccessModal: {
                title: "تمت إضافة الدليل! ✨",
                heading: "جاهز!",
                desc: "تمت زيادة حدك بدليل واحد إضافي. يمكنك الآن إنشاء دليل جديد.",
                cta: "رائع، شكراً!"
            },
            proModal: {
                heading: "أنت الآن Pro!",
                desc: "تم تفعيل اشتراك Pro الخاص بك. استمتع بأدلة غير محدودة وجميع الميزات المتقدمة.",
                cta: "ابدأ الإنشاء"
            }
        },
        pricingPage: {
            hero: {
                badge: "استثمر في التميز",
                title1: "دليل احترافي،",
                title2: "بسعر فنجان قهوة.",
                subtitle: "زد من إيراداتك المباشرة، وقلل من الأسئلة المتكررة وقدم تجربة 5 نجوم. مربح من أول حجز."
            },
            popular: "الأكثر شيوعاً",
            header: { login: "دخول", signup: "اشتراك" },
            compare: {
                title: "مقارنة مفصلة",
                subtitle: "كل ما تحتاجه للنجاح.",
                features: {
                    unlimited: "أدلة غير محدودة",
                    maps: "تكامل مع خرائط جوجل",
                    translation: "ترجمة بالذكاء الاصطناعي (جميع اللغات)",
                    domain: "اسم دومين مخصص",
                    support: "دعم ذو أولوية",
                    whiteLabel: "بدون علامة تجارية (White Label)",
                    analytics: "إحصائيات متقدمة"
                },
                values: { oneLang: "لغة واحدة", unlimited: "غير محدود", emailSupport: "بريد إلكتروني", whatsappSupport: "واتساب 24/7" }
            },
            faqSection: {
                title: "الأسئلة الشائعة",
                subtitle: "نحن شفافون. إليك الإجابات.",
                items: [
                    { q: "هل يمكنني تغيير الخطة في أي وقت؟", a: "نعم، بالتأكيد. يمكنك التبديل بين Basic و Pro من لوحة التحكم الخاصة بك. تسري التغييرات فوراً ويتم احتساب الفرق تلقائياً." },
                    { q: "هل هناك التزام؟", a: "لا يوجد التزام على الإطلاق. اشتراكاتنا شهرية ويمكنك الإلغاء في أي وقت بضغطة واحدة. لا توجد رسوم خفية." },
                    { q: "كيف يعمل الدفع؟", a: "نحن نستخدم Stripe، الرائد العالمي في الدفع الآمن عبر الإنترنت. تفاصيلك المصرفية لا تُخزن أبداً على خوادمنا." },
                    { q: "هل الدعم مشمول؟", a: "نعم! الدعم عبر البريد الإلكتروني مشمول في جميع الخطط المدفوعة. تحصل خطة Pro على وصول ذو أولوية وجهة اتصال واتساب للمساعدة السريعة جداً." }
                ]
            },
            trust: "موثوق من قبل",
            addonLabel: "/ دليل إضافي"
        },
        guideLock: {
            title: "وصول آمن",
            desc: "يرجى فتح هذا الدليل للوصول إلى أكواد الدخول والمعلومات الحساسة.",
            demoCode: "كود تجريبي"
        },
        builder: {
            editorMode: "وضع المحرر",
            library: "المكتبة",
            catEssentials: "أساسيات",
            catTravel: "سفر",
            catBusiness: "أعمال",
            guideStructure: "هيكل الدليل",
            emptyGuide: "دليلك فارغ",
            mobileMode: "وضع الجوال",
            blockTitle: "عنوان القسم",
            editing: "جاري التعديل",
            close: "إغلاق",
            selectBlock: "اختر قسماً لتعديله",
            paramsHere: "ستظهر الإعدادات هنا",
            designTheme: "التصميم والمظهر",
            upgradePro: "ترقية لـ PRO لفتح جميع المظهرات الاحترافية.",
            unlock: "فتح",
            unlockPublish: "فتح النشر",
            publishDesc: "نشر الأدلة مخصص لأعضاء Pro فقط. اشترك لمشاركة دليلك!",
            seeOffers: "عرض العروض",
            createAccount: "إنشاء حساب",
            saveCreateAccount: "حفظ (إنشاء حساب)",
            online: "متصل",
            unpublish: "إلغاء النشر",
            confirmUnpublish: "هل أنت متأكد أنك تريد إلغاء نشر هذا الدليل؟",
            publish: "نشر",
            publishSuccess: "تم نشر الدليل بنجاح! 🚀",
            publishError: "خطأ في النشر.",
            backHome: "العودة للرئيسية",
            backDashboard: "العودة للوحة التحكم",
            themeLabel: "المظهر",
            qrLabel: "كود QR",
            blocks: "الأقسام",
            addBlock: "إضافة قسم",
            blockProperties: "خصائص القسم",
            selectToEdit: "اختر قسماً لتعديله",
            startHere: "ابدأ من هنا",
            selectBlocks: "اختر أقساماً من القائمة اليسرى لبناء دليلك.",
            mobilePreview: "معاينة الجوال",
            chooseTheme: "اختر المظهر",
            reset: "إعادة تعيين",
            viewGuide: "عرض الدليل ↗",
            defaultGuideTitle: "مسافر",
            themeModal: {
                title: "اختر المظهر",
                subtitle: "خصص مظهر دليلك."
            }
        },
        editor: {
            common: {
                title: "العنوان",
                description: "الوصف",
                instructions: "التعليمات",
                placeholder: "مثال: ...",
                add: "إضافة",
                remove: "حذف",
                save: "حفظ",
                cancel: "إلغاء",
                uploadImage: "صورة الغلاف",
                uploadFile: "تحميل ملف",
                videoUrl: "فيديو (MP4) أو رابط يوتيوب",
                mapUrl: "رابط خرائط جوجل (اختياري)",
                address: "العنوان الكامل",
                phone: "الهاتف",
                email: "البريد الإلكتروني",
                whatsapp: "واتساب (رقم دولي)",
                price: "السعر",
                cost: "التكلفة",
                time: "الوقت",
                hours: "المواعيد",
                location: "الموقع",
                tags: "الوسوم (مفصولة بفاصلة)",
                linkText: "نص الزر",
                linkUrl: "رابط الزر",
                other: "آخر",
                priceCheap: "اقتصادي",
                priceModerate: "متوسط",
                priceExpensive: "فاخر",
                placeholderUrl: "https://...",
                placeholderWelcome: "نحن سعداء بالترحيب بكم...",
                placeholderMonth: "يناير",
                placeholderDay: "01",
                placeholderTime: "20:00",
                placeholderPrice: "25€",
                placeholderReserve: "حجز",
                placeholderTags: "رومانسي، إطلالة على البحر، إيطالي..."
            },
            wifi: {
                networkName: "اسم الشبكة",
                password: "كلمة المرور",
                notes: "ملاحظة (اختياري)"
            },
            labels: {
                hero: "ترحيب",
                wifi: "واي فاي",
                access_codes: "أكواد الدخول",
                checkin: "تسجيل الوصول",
                checkout: "تسجيل المغادرة",
                location: "الموقع",
                contact: "اتصال",
                rules: "القواعد",
                trash: "النفايات",
                parking: "المواقف",
                breakfast: "الإفطار",
                transport: "المواصلات",
                welcome: "مرحباً",
                amenities: "المرافق",
                faq: "الأسئلة الشائعة",
                places: "أماكن موصى بها",
                events: "فعاليات",
                documents: "مستندات",
                upsells: "خدمات إضافية",
                embed: "محتوى مدمج"
            },
            upsells: {
                add: "إضافة عرض",
                image: "صورة العرض",
                buttonText: "نص الزر",
                buttonLink: "رابط الزر"
            },
            access_codes: {
                security: "الأمان",
                mode: "الوضع",
                alwaysVisible: "مرئي دائماً",
                unlockByCode: "إلغاء القفل بالكود",
                unlockCode: "كود إلغاء القفل",
                unlockCodeDesc: "مثال: الكود الذي ترسله للضيف.",
                aptCode: "كود باب الشقة",
                buildingCode: "كود باب المبنى",
                gateCode: "كود البوابة",
                notes: "ملاحظات"
            }
        },
        settings: {
            title: "الإعدادات والحساب",
            tabProfile: "الملف الشخصي",
            tabPlan: "الاشتراك",
            tabShop: "المتجر (إضافات)",
            personalInfo: "المعلومات الشخصية",
            fullName: "الاسم الكامل",
            email: "البريد الإلكتروني",
            saveProfile: "حفظ الملف",
            yourPlan: "اشتراكك",
            currentPlan: "الخطة الحالية",
            manageSubscription: "إدارة الاشتراك",
            success: "نجاح",
            error: "خطأ"
        },
        guideBlocks: {
            wifi: { network: "الشبكة", password: "كلمة المرور", scan: "امسح للانضمام" },
            accessCodes: { code: "الكود", location: "الموقع", instruction: "التعليمات" },
            location: { viewOnMap: "عرض على الخريطة", address: "العنوان", copyAddress: "نسخ العنوان", openInMaps: "فتح في خرائط جوجل", notSet: "العنوان غير محدد" },
            transport: { getThere: "كيفية الوصول", parking: "المواقف", noInfo: "لا توجد معلومات عن النقل", call: "اتصال" },
            checkIn: { title: "تسجيل الوصول" },
            checkOut: { title: "تسجيل المغادرة" },
            contact: { host: "المضيف", yourHost: "مضيفك", phone: "الهاتف", openConversation: "فتح المحادثة" },
            rules: { noRules: "لم يتم تحديد قوانين" },
            amenities: { noAmenities: "لم يتم تحديد مرافق" },
            faq: { noFaq: "لا توجد أسئلة شائعة", question: "سؤال", answer: "جواب" },
            trash: { title: "إدارة النفايات", items: "النفايات", recycling: "إعادة التدوير" },
            breakfast: { title: "الفطور", menu: "في القائمة" }
        },
        renderer: {
            searchPlaceholder: "البحث في الدليل...",
            wifi: "واي فاي",
            access: "رموز الدخول",
            checkin: "تسجيل الوصول",
            checkout: "تسجيل المغادرة",
            location: "الموقع",
            rules: "قواعد المنزل",
            contact: "اتصل بنا",
            amenities: "المرافق",
            places: "أماكن قريبة",
            events: "فعاليات",
            documents: "مستندات",
            upsells: "خدمات إضافية",
            embed: "محتوى مدمج",
            welcome: "أهلاً بك",
            trash: "النفايات",
            parking: "المواقف",
            breakfast: "الإفطار",
            transport: "المواصلات",
            days: "أيام",
            hours: "ساعات",
            minutes: " دقائق",
            network: "الشبكة",
            password: "كلمة المرور",
            copy: "نسخ",
            copied: "تم النسخ!",
            getDirections: "الحصول على الاتجاهات",
            openMaps: "فتح الخرائط",
            call: "اتصال",
            message: "رسالة",
            empty: "لا توجد نتائج مطابقة لبحثك",
            seeAll: "عرض الكل",
            less: "عرض أقل",
            scanQr: "امسح للتنزيل",
            share: "مشاركة",
            download: "تحميل",
            tipOfTheDay: "نصيحة اليوم",
            sunday: "الأحد",
            monday: "الإثنين",
            tuesday: "الثلاثاء",
            wednesday: "الأربعاء",
            thursday: "الخميس",
            friday: "الجمعة",
            saturday: "السبت",
            lazy: "مسترخي",
            mood: "متحمس",
            discovery: "اكتشاف",
            tasty: "لذيذ",
            adventure: "مغامرة",
            festive: "احتفالي",
            outing: "نزهة",
            brunch: "فطور متأخر في",
            explore: "استكشف وسط",
            museums: "قم بزيارة متاحف",
            taste: "تذوق تخصصات",
            excursion: "اذهب في رحلة",
            nightlife: "الحياة الليلية في",
            walk: "قم بنزهة في",
            items: "عناصر",
            viewMap: "عرض الخريطة",
            secureAccess: "وصول آمن"
        },
        ai: {
            assistant: "مساعد الذكاء الاصطناعي",
            online: "متصل",
            empty: "اسألني أي شيء عن إقامتك!",
            thinking: "يفكر...",
            placeholder: "اسأل سؤالاً...",
            error: "عذراً، حدث خطأ."
        }
    },
};

export type DictionaryShape = typeof DICTIONARY['fr'] & {
    ai: {
        assistant: string;
        online: string;
        empty: string;
        thinking: string;
        placeholder: string;
        error: string;
    }
};





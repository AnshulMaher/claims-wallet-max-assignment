import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      languages: {
        en: 'English',
        zh: '中文',
        pt: 'Português',
        es: 'Español',
        fr: 'Français',
        ja: '日本語',
      },
      home: {
        subsidiaries: {
          cica: {
            name: 'CICA Life',
            title: 'Life Insurance Solutions',
            description: 'Comprehensive life insurance products and services',
          },
          citizens: {
            name: 'Citizens National',
            title: 'Banking Services',
            description: 'Full-service banking and financial solutions',
          },
          security: {
            name: 'Security Plan Life',
            title: 'Security Solutions',
            description: 'Advanced security and protection services',
          },
        },
      },
      header: {
        insurance: {
          link: {
            title: 'Pay Link',
          },
          partners: {
            title: 'Pay Partners',
          },
          claim: {
            title: 'Pay Claims',
          },
        },
      },
    },
  },
  zh: {
    translation: {
      languages: {
        en: 'English',
        zh: '中文',
        pt: 'Português',
        es: 'Español',
        fr: 'Français',
        ja: '日本語',
      },
      home: {
        subsidiaries: {
          cica: {
            name: 'CICA Life',
            title: '人寿保险解决方案',
            description: '全面的人寿保险产品和服务',
          },
          citizens: {
            name: 'Citizens National',
            title: '银行服务',
            description: '全方位银行和金融解决方案',
          },
          security: {
            name: 'Security Plan Life',
            title: '安全解决方案',
            description: '先进的安全和保护服务',
          },
        },
      },
      header: {
        insurance: {
          link: {
            title: '支付链接',
          },
          partners: {
            title: '合作伙伴支付',
          },
          claim: {
            title: '理赔支付',
          },
        },
      },
    },
  },
  pt: {
    translation: {
      languages: {
        en: 'English',
        zh: '中文',
        pt: 'Português',
        es: 'Español',
        fr: 'Français',
        ja: '日本語',
      },
      home: {
        subsidiaries: {
          cica: {
            name: 'CICA Life',
            title: 'Soluções de Seguro de Vida',
            description: 'Produtos e serviços abrangentes de seguro de vida',
          },
          citizens: {
            name: 'Citizens National',
            title: 'Serviços Bancários',
            description: 'Soluções bancárias e financeiras completas',
          },
          security: {
            name: 'Security Plan Life',
            title: 'Soluções de Segurança',
            description: 'Serviços avançados de segurança e proteção',
          },
        },
      },
      header: {
        insurance: {
          link: {
            title: 'Link de Pagamento',
          },
          partners: {
            title: 'Pagamento de Parceiros',
          },
          claim: {
            title: 'Pagamento de Sinistros',
          },
        },
      },
    },
  },
  es: {
    translation: {
      languages: {
        en: 'English',
        zh: '中文',
        pt: 'Português',
        es: 'Español',
        fr: 'Français',
        ja: '日本語',
      },
      home: {
        subsidiaries: {
          cica: {
            name: 'CICA Life',
            title: 'Soluciones de Seguro de Vida',
            description: 'Productos y servicios integrales de seguro de vida',
          },
          citizens: {
            name: 'Citizens National',
            title: 'Servicios Bancarios',
            description: 'Soluciones bancarias y financieras completas',
          },
          security: {
            name: 'Security Plan Life',
            title: 'Soluciones de Seguridad',
            description: 'Servicios avanzados de seguridad y protección',
          },
        },
      },
      header: {
        insurance: {
          link: {
            title: 'Enlace de Pago',
          },
          partners: {
            title: 'Pago de Socios',
          },
          claim: {
            title: 'Pago de Reclamos',
          },
        },
      },
    },
  },
  fr: {
    translation: {
      languages: {
        en: 'English',
        zh: '中文',
        pt: 'Português',
        es: 'Español',
        fr: 'Français',
        ja: '日本語',
      },
      home: {
        subsidiaries: {
          cica: {
            name: 'CICA Life',
            title: "Solutions d'Assurance Vie",
            description: "Produits et services complets d'assurance vie",
          },
          citizens: {
            name: 'Citizens National',
            title: 'Services Bancaires',
            description: 'Solutions bancaires et financières complètes',
          },
          security: {
            name: 'Security Plan Life',
            title: 'Solutions de Sécurité',
            description: 'Services avancés de sécurité et de protection',
          },
        },
      },
      header: {
        insurance: {
          link: {
            title: 'Lien de Paiement',
          },
          partners: {
            title: 'Paiement des Partenaires',
          },
          claim: {
            title: 'Paiement des Réclamations',
          },
        },
      },
    },
  },
  ja: {
    translation: {
      languages: {
        en: 'English',
        zh: '中文',
        pt: 'Português',
        es: 'Español',
        fr: 'Français',
        ja: '日本語',
      },
      home: {
        subsidiaries: {
          cica: {
            name: 'CICA Life',
            title: '生命保険ソリューション',
            description: '包括的な生命保険商品とサービス',
          },
          citizens: {
            name: 'Citizens National',
            title: '銀行サービス',
            description: 'フルサービスの銀行と金融ソリューション',
          },
          security: {
            name: 'Security Plan Life',
            title: 'セキュリティソリューション',
            description: '高度なセキュリティと保護サービス',
          },
        },
      },
      header: {
        insurance: {
          link: {
            title: '支払いリンク',
          },
          partners: {
            title: 'パートナー支払い',
          },
          claim: {
            title: 'クレーム支払い',
          },
        },
      },
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },
  });

export default i18n;

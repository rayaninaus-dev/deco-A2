import React, { createContext, useContext, useMemo, useState } from "react";

export type Language = "zh" | "en";

interface LanguageContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export const useLanguage = (): LanguageContextValue => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within a LanguageProvider");
  return ctx;
};

const LANGUAGE_KEY = "language";

function loadLanguage(): Language {
  const stored = localStorage.getItem(LANGUAGE_KEY);
  if (stored === "en" || stored === "zh") {
    return stored;
  }
  // 强制默认使用英文，清除任何其他语言设置
  localStorage.setItem(LANGUAGE_KEY, "en");
  return "en";
}

// 翻译文本
const translations = {
  zh: {
    // 通用
    "app.title": "学生心理健康支持",
    "app.home": "首页",
    "app.dashboard": "仪表板",
    "app.back": "返回",
    "app.continue": "继续",
    "app.submit": "提交",
    "app.cancel": "取消",
    "app.confirm": "确认",
    "app.loading": "加载中...",
    "app.error": "错误",
    "app.success": "成功",
    
    // 语言切换
    "language.switch": "语言切换",
    "language.chinese": "中文",
    "language.english": "English",
    
    // 首页
    "landing.title": "学生心理健康支持",
    "landing.subtitle": "无论您遇到什么困难，我们都在这里为您提供安全、保密的支持",
    "landing.anonymous": "完全匿名",
    "landing.anonymousDesc": "保护隐私",
    "landing.secure": "安全保密",
    "landing.secureDesc": "安全可靠",
    "landing.professional": "专业支持",
    "landing.professionalDesc": "专业服务",
    "landing.start": "开始寻求帮助",
    "landing.startDescription": "点击开始，您将进入匿名支持流程",
    "landing.shareSystem": "分享系统",
    "landing.systemQRCode": "系统入口二维码",
    "landing.customQRCode": "自定义二维码",
    "landing.sdgReminder": "本项目对标联合国可持续发展目标3：健康与福祉",
    "landing.sdgFocus": "我们专注于为高中生提供可靠的心理健康支持",
    
    // 信息收集页面
    "intake.title": "需要帮助？",
    "intake.subtitle": "我们在这里倾听，随时为您提供支持",
    "intake.messageLabel": "告诉我们您的情况",
    "intake.messagePlaceholder": "请描述您遇到的问题或感受，我们会根据您的描述为您提供最合适的帮助...",
    "intake.issueTypeLabel": "问题类型",
    "intake.issueType.emotions": "情绪/感受",
    "intake.issueType.emotionsDesc": "焦虑、抑郁、压力等情绪问题",
    "intake.issueType.academic": "学业问题",
    "intake.issueType.academicDesc": "学习压力、考试焦虑、成绩问题",
    "intake.issueType.family": "家庭问题",
    "intake.issueType.familyDesc": "家庭关系、父母沟通、家庭冲突",
    "intake.issueType.relationships": "人际关系",
    "intake.issueType.relationshipsDesc": "朋友关系、恋爱问题、社交困难",
    "intake.issueTypeError": "请选择问题类型",
    "intake.urgencyLabel": "紧急程度",
    "intake.urgency.low": "不紧急",
    "intake.urgency.lowDesc": "可以等待几天回复",
    "intake.urgency.medium": "比较紧急",
    "intake.urgency.mediumDesc": "希望尽快得到回复",
    "intake.urgency.high": "非常紧急",
    "intake.urgency.highDesc": "需要立即帮助",
    "intake.urgencyError": "请选择紧急程度",
    
    // 隐私设置页面
    "consent.title": "隐私设置",
    "consent.subtitle": "请选择您希望如何处理您的信息",
    "consent.legend": "选择您的偏好",
    "consent.none": "保持完全匿名（推荐）",
    "consent.noneDesc": "我们不会通知任何人，直接为您提供支持",
    "consent.crisisOnly": "仅在紧急情况下通知家长",
    "consent.crisisOnlyDesc": "只有在安全担忧或危机情况下才会联系家长",
    "consent.immediate": "立即通知家长",
    "consent.immediateDesc": "我们会立即联系您的家长/监护人",
    "consent.preview": "预览说明",
    "consent.preview.none": "我们不会通知家长，将直接与您联系。",
    "consent.preview.crisisOnly": "只有在安全担忧或危机情况下，我们才会通知家长。",
    "consent.preview.immediate": "我们会立即通知您的家长/监护人，并提供简要情况和后续步骤。",
    "consent.error": "请选择一个选项",
    
    // 确认页面
    "confirm.title": "确认提交",
    "confirm.subtitle": "请确认您的信息并选择获取帮助的方式",
    "confirm.helpOptions": "请选择您希望如何获得帮助：",
    "confirm.chat": "即时聊天",
    "confirm.chatDesc": "立即与咨询师对话",
    "confirm.appointment": "预约面谈",
    "confirm.appointmentDesc": "安排面对面咨询",
    "confirm.resources": "查看资源",
    "confirm.resourcesDesc": "浏览自助资源",
    "confirm.submitRequest": "提交请求",
    "confirm.viewStatus": "查看状态",
    "confirm.submitted": "您的请求已提交。",
    "confirm.selectHelpType": "请先选择帮助类型",
    "confirm.demoNote": "演示模式：您可以重新选择不同的帮助类型",
    
    // 聊天页面
    "chat.counselor": "心理咨询师",
    "chat.online": "在线",
    "chat.welcome": "您好！我是您的心理咨询师。请告诉我您今天感觉如何，有什么我可以帮助您的吗？",
    "chat.placeholder": "输入您的消息...",
    "chat.response1": "我理解您的感受。让我们一起来探讨这个问题。",
    "chat.response2": "您能详细描述一下当时的情况吗？",
    "chat.response3": "这听起来确实很有挑战性。您之前是如何应对类似情况的？",
    "chat.response4": "感谢您与我分享这些。您做得很好，寻求帮助是很勇敢的行为。",
    
    // 预约页面
    "appointment.title": "预约面谈",
    "appointment.selectDate": "选择日期",
    "appointment.selectTime": "选择时间",
    "appointment.selectType": "选择咨询类型",
    "appointment.individual": "个人咨询",
    "appointment.group": "团体咨询",
    "appointment.family": "家庭咨询",
    "appointment.crisis": "危机干预",
    "appointment.additionalNotes": "补充说明",
    "appointment.notesPlaceholder": "请描述您希望讨论的主要问题或特殊需求...",
    "appointment.schedule": "预约咨询",
    "appointment.confirmed": "预约成功！",
    "appointment.confirmationMessage": "您的咨询预约已确认。我们会在预约时间前24小时发送提醒。",
    "appointment.date": "日期",
    "appointment.time": "时间",
    "appointment.type": "类型",
    "appointment.backToHome": "返回首页",
    
    // 资源页面
    "resources.title": "心理健康资源",
    "resources.filterByCategory": "按类别筛选",
    "resources.all": "全部",
    "resources.anxiety": "焦虑",
    "resources.depression": "抑郁",
    "resources.stress": "压力",
    "resources.relationships": "人际关系",
    "resources.academic": "学业压力",
    "resources.resource1.title": "应对焦虑的5个技巧",
    "resources.resource1.description": "学习实用的焦虑管理策略",
    "resources.resource2.title": "理解抑郁症的早期信号",
    "resources.resource2.description": "了解抑郁症的常见症状和应对方法",
    "resources.resource3.title": "正念冥想指导",
    "resources.resource3.description": "通过冥想练习缓解压力和焦虑",
    "resources.resource4.title": "建立健康的人际关系",
    "resources.resource4.description": "改善沟通技巧，建立更深的连接",
    "resources.resource5.title": "学业压力管理指南",
    "resources.resource5.description": "平衡学习与心理健康的方法",
    "resources.resource6.title": "深呼吸练习",
    "resources.resource6.description": "简单有效的放松技巧",
    "resources.noResources": "该类别暂无资源",
    
    // 仪表板
    "dashboard.title": "咨询师仪表板",
    "dashboard.urgency": "紧急程度",
    "dashboard.urgency.all": "全部",
    "dashboard.urgency.low": "低",
    "dashboard.urgency.medium": "中",
    "dashboard.urgency.high": "高",
    "dashboard.consent": "同意级别",
    "dashboard.consent.all": "全部",
    "dashboard.consent.immediate": "立即",
    "dashboard.consent.crisisOnly": "仅危机",
    "dashboard.consent.none": "不通知",
    "dashboard.sort": "排序",
    "dashboard.sort.newest": "最新",
    "dashboard.sort.oldest": "最旧",
    "dashboard.sort.urgency": "紧急程度",
    "dashboard.search": "搜索",
    "dashboard.searchPlaceholder": "ID, 问题, 消息...",
    "dashboard.exportJSON": "导出 JSON",
    "dashboard.exportCSV": "导出 CSV",
    "dashboard.seedDemo": "生成演示数据",
    "dashboard.clearData": "清除数据",
    "dashboard.noSubmissions": "暂无提交。尝试生成演示数据。",
    "dashboard.table.id": "ID",
    "dashboard.table.issue": "问题",
    "dashboard.table.urgency": "紧急程度",
    "dashboard.table.consent": "同意级别",
    "dashboard.table.timestamp": "时间戳",
    "dashboard.table.status": "状态",
    "dashboard.table.actions": "操作",
    "dashboard.flag": "标记",
    "dashboard.respond": "回复",
    "dashboard.flagged": "案例已标记",
    "dashboard.responded": "案例已回复",
    "dashboard.cleared": "所有本地数据已清除。",
    "dashboard.seeded": "已生成3个示例提交。",
    "dashboard.clearConfirm": "这将清除所有存储的数据。继续吗？",
    
    // 分享页面
    "share.title": "二维码分享",
    "share.description": "生成二维码，让用户扫描后直接进入系统",
    "share.target": "目标页面",
    "share.home": "首页",
    "share.intake": "信息收集",
    "share.confirm": "确认页面",
    "share.appointment": "预约面谈",
    "share.resources": "资源中心",
    "share.copyLink": "复制链接",
    "share.downloadPNG": "下载PNG",
    "share.scanDescription": "使用手机扫描二维码即可直接访问系统",
    
    // 二维码页面
    "qrCode.title": "系统入口二维码",
    "qrCode.description": "扫描二维码直接进入学生心理健康支持系统",
    "qrCode.instructions": "使用说明",
    "qrCode.step1": "使用手机扫描上方二维码",
    "qrCode.step2": "自动跳转到系统首页",
    "qrCode.step3": "开始使用心理健康支持服务",
    "qrCode.systemUrl": "系统访问地址",
    "qrCode.copyLink": "复制链接",
    "qrCode.downloadQR": "下载二维码",
    "qrCode.linkCopied": "链接已复制到剪贴板！",
    "qrCode.guideTitle": "📱 二维码使用指南",
    "qrCode.useCases": "适用场景：",
    "qrCode.campusPoster": "校园宣传海报",
    "qrCode.flyers": "传单和宣传册",
    "qrCode.socialMedia": "网站和社交媒体分享",
    "qrCode.offlineEvents": "线下活动推广",
    "qrCode.advantages": "优势：",
    "qrCode.oneClickAccess": "一键访问，无需输入网址",
    "qrCode.smartphoneSupport": "支持所有智能手机",
    "qrCode.autoRedirect": "自动跳转到系统首页",
    "qrCode.easySharing": "方便分享和传播"
  },
  en: {
    // Common
    "app.title": "Student Mental Health Support",
    "app.home": "Home",
    "app.dashboard": "Dashboard",
    "app.back": "Back",
    "app.continue": "Continue",
    "app.submit": "Submit",
    "app.cancel": "Cancel",
    "app.confirm": "Confirm",
    "app.loading": "Loading...",
    "app.error": "Error",
    "app.success": "Success",
    
    // Language switching
    "language.switch": "Language",
    "language.chinese": "中文",
    "language.english": "English",
    
    // Landing page
    "landing.title": "Student Mental Health Support",
    "landing.subtitle": "No matter what challenges you're facing, we're here to provide safe, confidential support",
    "landing.anonymous": "Completely Anonymous",
    "landing.anonymousDesc": "Privacy Protected",
    "landing.secure": "Safe & Secure",
    "landing.secureDesc": "Secure & Reliable",
    "landing.professional": "Professional Support",
    "landing.professionalDesc": "Professional Service",
    "landing.start": "Start Seeking Help",
    "landing.startDescription": "Click to begin your anonymous support journey",
    "landing.shareSystem": "Share System",
    "landing.systemQRCode": "System Entry QR Code",
    "landing.customQRCode": "Custom QR Code",
    "landing.sdgReminder": "Aligned with UN Sustainable Development Goal 3: Good Health and Well-being",
    "landing.sdgFocus": "Focused on supporting high school students' mental health",
    
    // Intake page
    "intake.title": "Need Help?",
    "intake.subtitle": "We're here to listen and provide support whenever you need it",
    "intake.messageLabel": "Tell us about your situation",
    "intake.messagePlaceholder": "Please describe the issues or feelings you're experiencing, and we'll provide the most appropriate help based on your description...",
    "intake.issueTypeLabel": "Issue Type",
    "intake.issueType.emotions": "Emotions/Feelings",
    "intake.issueType.emotionsDesc": "Anxiety, depression, stress and other emotional issues",
    "intake.issueType.academic": "Academic Issues",
    "intake.issueType.academicDesc": "Study pressure, exam anxiety, academic performance",
    "intake.issueType.family": "Family Issues",
    "intake.issueType.familyDesc": "Family relationships, parent communication, family conflicts",
    "intake.issueType.relationships": "Relationships",
    "intake.issueType.relationshipsDesc": "Friendships, romantic relationships, social difficulties",
    "intake.issueTypeError": "Please select an issue type",
    "intake.urgencyLabel": "Urgency Level",
    "intake.urgency.low": "Not Urgent",
    "intake.urgency.lowDesc": "Can wait a few days for response",
    "intake.urgency.medium": "Somewhat Urgent",
    "intake.urgency.mediumDesc": "Hope to get a response soon",
    "intake.urgency.high": "Very Urgent",
    "intake.urgency.highDesc": "Need immediate help",
    "intake.urgencyError": "Please select urgency level",
    
    // Consent page
    "consent.title": "Privacy Settings",
    "consent.subtitle": "Please choose how you'd like us to handle your information",
    "consent.legend": "Choose your preference",
    "consent.none": "Stay Completely Anonymous (Recommended)",
    "consent.noneDesc": "We won't notify anyone and will provide support directly to you",
    "consent.crisisOnly": "Notify Parents Only in Emergency",
    "consent.crisisOnlyDesc": "We'll only contact parents in case of safety concerns or crisis",
    "consent.immediate": "Notify Parents Immediately",
    "consent.immediateDesc": "We'll contact your parents/guardians immediately",
    "consent.preview": "Preview",
    "consent.preview.none": "We will not notify parents and will contact you directly.",
    "consent.preview.crisisOnly": "We will only notify parents in case of safety concerns or crisis.",
    "consent.preview.immediate": "We will immediately notify your parents/guardians and provide a brief situation summary and next steps.",
    "consent.error": "Please select an option",
    
    // Confirm page
    "confirm.title": "Confirm Submission",
    "confirm.subtitle": "Please confirm your information and choose how you'd like to receive help",
    "confirm.helpOptions": "Please choose how you'd like to receive help:",
    "confirm.chat": "Live Chat",
    "confirm.chatDesc": "Chat with a counselor immediately",
    "confirm.appointment": "Schedule Appointment",
    "confirm.appointmentDesc": "Arrange face-to-face consultation",
    "confirm.resources": "View Resources",
    "confirm.resourcesDesc": "Browse self-help resources",
    "confirm.submitRequest": "Submit Request",
    "confirm.viewStatus": "View Status",
    "confirm.submitted": "Your request has been submitted.",
    "confirm.selectHelpType": "Please select a help type first",
    "confirm.demoNote": "Demo Mode: You can select different help types again",
    
    // Chat page
    "chat.counselor": "Mental Health Counselor",
    "chat.online": "Online",
    "chat.welcome": "Hello! I'm your mental health counselor. How are you feeling today? What can I help you with?",
    "chat.placeholder": "Type your message...",
    "chat.response1": "I understand how you're feeling. Let's explore this together.",
    "chat.response2": "Can you tell me more about what happened in that situation?",
    "chat.response3": "That sounds really challenging. How have you coped with similar situations before?",
    "chat.response4": "Thank you for sharing that with me. You're doing great by reaching out for help - that takes courage.",
    
    // Appointment page
    "appointment.title": "Schedule Appointment",
    "appointment.selectDate": "Select Date",
    "appointment.selectTime": "Select Time",
    "appointment.selectType": "Select Consultation Type",
    "appointment.individual": "Individual Counseling",
    "appointment.group": "Group Counseling",
    "appointment.family": "Family Counseling",
    "appointment.crisis": "Crisis Intervention",
    "appointment.additionalNotes": "Additional Notes",
    "appointment.notesPlaceholder": "Please describe the main issues you'd like to discuss or any special needs...",
    "appointment.schedule": "Schedule Consultation",
    "appointment.confirmed": "Appointment Confirmed!",
    "appointment.confirmationMessage": "Your consultation appointment has been confirmed. We'll send you a reminder 24 hours before your scheduled time.",
    "appointment.date": "Date",
    "appointment.time": "Time",
    "appointment.type": "Type",
    "appointment.backToHome": "Back to Home",
    
    // Resources page
    "resources.title": "Mental Health Resources",
    "resources.filterByCategory": "Filter by Category",
    "resources.all": "All",
    "resources.anxiety": "Anxiety",
    "resources.depression": "Depression",
    "resources.stress": "Stress",
    "resources.relationships": "Relationships",
    "resources.academic": "Academic",
    "resources.resource1.title": "5 Tips for Managing Anxiety",
    "resources.resource1.description": "Learn practical anxiety management strategies",
    "resources.resource2.title": "Understanding Early Signs of Depression",
    "resources.resource2.description": "Learn about common symptoms and coping methods",
    "resources.resource3.title": "Mindfulness Meditation Guide",
    "resources.resource3.description": "Relieve stress and anxiety through meditation practice",
    "resources.resource4.title": "Building Healthy Relationships",
    "resources.resource4.description": "Improve communication skills and build deeper connections",
    "resources.resource5.title": "Academic Stress Management Guide",
    "resources.resource5.description": "Methods to balance studies and mental health",
    "resources.resource6.title": "Deep Breathing Exercises",
    "resources.resource6.description": "Simple and effective relaxation techniques",
    "resources.noResources": "No resources available in this category",
    
    // Dashboard
    "dashboard.title": "Counselor Dashboard",
    "dashboard.urgency": "Urgency",
    "dashboard.urgency.all": "All",
    "dashboard.urgency.low": "Low",
    "dashboard.urgency.medium": "Medium",
    "dashboard.urgency.high": "High",
    "dashboard.consent": "Consent",
    "dashboard.consent.all": "All",
    "dashboard.consent.immediate": "Immediate",
    "dashboard.consent.crisisOnly": "Crisis Only",
    "dashboard.consent.none": "Do Not Notify",
    "dashboard.sort": "Sort",
    "dashboard.sort.newest": "Newest",
    "dashboard.sort.oldest": "Oldest",
    "dashboard.sort.urgency": "Urgency",
    "dashboard.search": "Search",
    "dashboard.searchPlaceholder": "ID, issue, message...",
    "dashboard.exportJSON": "Export JSON",
    "dashboard.exportCSV": "Export CSV",
    "dashboard.seedDemo": "Seed Demo Data",
    "dashboard.clearData": "Clear Data",
    "dashboard.noSubmissions": "No submissions yet. Try seeding demo data.",
    "dashboard.table.id": "ID",
    "dashboard.table.issue": "Issue",
    "dashboard.table.urgency": "Urgency",
    "dashboard.table.consent": "Consent Level",
    "dashboard.table.timestamp": "Timestamp",
    "dashboard.table.status": "Status",
    "dashboard.table.actions": "Actions",
    "dashboard.flag": "Flag",
    "dashboard.respond": "Respond",
    "dashboard.flagged": "Case flagged.",
    "dashboard.responded": "Case marked responded.",
    "dashboard.cleared": "All local data cleared.",
    "dashboard.seeded": "Seeded 3 example submissions.",
    "dashboard.clearConfirm": "This will clear all stored data. Continue?",
    
    // Share page
    "share.title": "QR Code Share",
    "share.description": "Generate QR codes for users to scan and access the system directly",
    "share.target": "Target Page",
    "share.home": "Home",
    "share.intake": "Intake",
    "share.confirm": "Confirm",
    "share.appointment": "Appointment",
    "share.resources": "Resources",
    "share.copyLink": "Copy Link",
    "share.downloadPNG": "Download PNG",
    "share.scanDescription": "Scan with your phone to access the system directly",
    
    // QR Code page
    "qrCode.title": "System Entry QR Code",
    "qrCode.description": "Scan QR code to directly access the student mental health support system",
    "qrCode.instructions": "Instructions",
    "qrCode.step1": "Use your phone to scan the QR code above",
    "qrCode.step2": "Automatically redirect to system homepage",
    "qrCode.step3": "Start using mental health support services",
    "qrCode.systemUrl": "System Access URL",
    "qrCode.copyLink": "Copy Link",
    "qrCode.downloadQR": "Download QR Code",
    "qrCode.linkCopied": "Link copied to clipboard!",
    "qrCode.guideTitle": "📱 QR Code Usage Guide",
    "qrCode.useCases": "Use Cases:",
    "qrCode.campusPoster": "Campus promotional posters",
    "qrCode.flyers": "Flyers and brochures",
    "qrCode.socialMedia": "Website and social media sharing",
    "qrCode.offlineEvents": "Offline event promotion",
    "qrCode.advantages": "Advantages:",
    "qrCode.oneClickAccess": "One-click access, no need to enter URL",
    "qrCode.smartphoneSupport": "Supports all smartphones",
    "qrCode.autoRedirect": "Automatically redirects to system homepage",
    "qrCode.easySharing": "Easy to share and spread"
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(loadLanguage);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem(LANGUAGE_KEY, lang);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  const value = useMemo(
    () => ({ language, setLanguage, t }),
    [language]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

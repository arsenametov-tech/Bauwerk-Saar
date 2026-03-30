/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  MessageCircle,
  CheckCircle2,
  Clock,
  ShieldCheck,
  ArrowRight,
  ChevronRight,
  ChevronLeft,
  Upload,
  X,
  HardHat,
  Hammer,
  Ruler,
  Paintbrush,
  Users,
  Send,
  Globe,
  ChevronDown,
  Instagram,
  HelpCircle,
} from 'lucide-react';

// --- Types ---
type Language = 'de' | 'ru' | 'en' | 'tr' | 'uk';
type QuizStep = 1 | 2 | 3 | 4 | 5;
type RenovationType = 'Bad' | 'Küche' | 'Wohnung' | 'Haus';
type DesignStyle = 'Modern' | 'Klassisch' | 'Skandinavisch' | 'Loft';

interface QuizData {
  type: RenovationType | '';
  area: number;
  style: DesignStyle | '';
  photo: File | null;
  name: string;
  email: string;
  whatsapp: string;
  agreedToTerms: boolean;
}

// --- Translations ---
const T = {
  de: {
    nav_contact: 'Kontakt',
    write_us: 'Schreiben Sie uns',
    hero_title1: 'Wir gestalten',
    hero_title2: 'die Zukunft',
    hero_title3: 'im Saarland',
    hero_sub: 'Professionelles Team mit über 10 Jahren Erfahrung. Wir verwandeln Baustellen in moderne Wohnräume.',
    hero_cta: 'Projekt berechnen',
    hero_portfolio: 'Portfolio',
    hero_stat: 'Jahre Erfahrung',
    hiw_title: 'Ihr Traumhaus in 3 einfachen Schritten',
    hiw_s1_title: 'Schritt 1: Fragen beantworten',
    hiw_s1_desc: 'Beantworten Sie 5 kurze Fragen zu Ihrem Objekt. Das dauert nur 2 Minuten.',
    hiw_s2_title: 'Schritt 2: Foto hochladen',
    hiw_s2_desc: 'Laden Sie ein Foto des aktuellen Zustands des Raums hoch – direkt vom Handy für eine KI-Visualisierung.',
    hiw_s3_title: 'Schritt 3: Konzept erhalten',
    hiw_s3_desc: 'Erhalten Sie ein PDF mit einer Kostenschätzung und einem KI-Design per WhatsApp oder E-Mail.',
    quiz_step: 'Schritt',
    quiz_of: 'von',
    quiz_s1_title: 'Was möchten Sie renovieren?',
    quiz_s1_bad: 'Badezimmer',
    quiz_s1_kueche: 'Küche',
    quiz_s1_wohnung: 'Wohnung',
    quiz_s1_haus: 'Haus',
    quiz_s2_title: 'Wie groß ist die Fläche?',
    quiz_s3_title: 'Welchen Stil bevorzugen Sie?',
    quiz_s3_modern: 'Modern',
    quiz_s3_klassisch: 'Klassisch',
    quiz_s3_skandi: 'Skandinavisch',
    quiz_s3_loft: 'Loft',
    quiz_s4_title: 'Foto des Raumes hochladen',
    quiz_s4_btn: 'Foto auswählen',
    quiz_s4_drag: 'Oder hierher ziehen',
    quiz_s5_title: 'Fast fertig!',
    quiz_s5_sub: 'Wohin sollen wir die Ergebnisse senden?',
    quiz_label_name: 'Vor- und Nachname *',
    quiz_ph_name: 'Ihr Name',
    quiz_label_email: 'E-Mail *',
    quiz_ph_email: 'beispiel@mail.de',
    quiz_label_wa: 'WhatsApp-Nummer (optional)',
    quiz_ph_wa: '+49 151 000 000',
    quiz_terms: 'Ich stimme der Verarbeitung meiner Daten gemäß der',
    quiz_terms_link: 'Datenschutzerklärung',
    quiz_terms2: 'zu. *',
    quiz_submit: 'Ergebnisse anfragen',
    quiz_back: 'Zurück',
    quiz_next: 'Weiter',
    trust_title: 'Unsere Projekte',
    trust_f1_title: 'Termintreue',
    trust_f1_desc: 'Wir legen die Termine vertraglich fest und garantieren deren Einhaltung.',
    trust_f2_title: 'Qualitätsstandards',
    trust_f2_desc: 'Alle Arbeiten werden strikt nach deutschen Bauvorschriften und Normen ausgeführt.',
    trust_f3_title: 'Transparente Kalkulation',
    trust_f3_desc: 'Wir erstellen eine detaillierte Kostenschätzung, die verbindlich bleibt.',
    about_title: 'Wer sind wir?',
    about_p1: 'Wir sind ein professionelles Team mit langjähriger Erfahrung und arbeiten im gesamten Saarland. Unsere Mission ist es, Renovierungen für jeden Kunden transparent und planbar zu machen.',
    about_p2: 'Mit modernen Technologien und über 10 Jahren Erfahrung im Bauwesen helfen wir Ihnen, Ihre kühnsten Projekte hochwertig und termingerecht umzusetzen.',
    about_stat1: 'Jahre Erfahrung',
    about_stat2: 'Qualität',
    faq_title: 'Häufig gestellte Fragen',
    faq_q1: 'Wie genau ist die Kostenschätzung?',
    faq_a1: 'Unser Algorithmus liefert eine Schätzung mit einer Genauigkeit von 85–90 % auf Basis Ihrer Angaben. Die endgültige Kalkulation wird nach einem kostenlosen Vor-Ort-Termin erstellt.',
    faq_q2: 'Ist das wirklich kostenlos?',
    faq_a2: 'Ja, die Kostenschätzung und die KI-Visualisierung sind völlig kostenlos und unverbindlich.',
    faq_q3: 'Wie funktioniert das KI-Design?',
    faq_a3: 'Wir nutzen neuronale Netze, die auf Tausenden moderner Interieurs trainiert wurden, um auf Basis Ihres Fotos ein realistisches Konzept in Ihrem Wunschstil zu erstellen.',
    footer_sub: 'Ihr Partner für professionellen Bau und Renovierung im Saarland.',
    footer_contact: 'Kontakt',
    footer_legal: 'Rechtliches',
    footer_rights: '© 2026 Bauwerk_Saar. Alle Rechte vorbehalten.',
    cookie_text: 'Wir verwenden Cookies, um Ihre Erfahrung zu verbessern. Mit der weiteren Nutzung stimmen Sie unserer',
    cookie_link: 'Datenschutzerklärung',
    cookie_text2: 'zu.',
    cookie_decline: 'Ablehnen',
    cookie_accept: 'Alle akzeptieren',
    thanks_title: 'Vielen Dank! Ihre Anfrage wird bearbeitet.',
    thanks_sub: 'Unser KI-Assistent und unsere Experten haben bereits mit der Arbeit an Ihrem Projekt begonnen. Ihren PDF-Bericht erhalten Sie innerhalb von 24 Stunden.',
    thanks_ig: 'Folgen Sie uns auf Instagram',
    project_label: 'Projekt',
  },
  ru: {
    nav_contact: 'Контакт',
    write_us: 'Напишите нам',
    hero_title1: 'Создаём',
    hero_title2: 'будущее',
    hero_title3: 'в Сааре',
    hero_sub: 'Профессиональная команда с 10-летним опытом. Мы превращаем строительные площадки в современные жилые пространства.',
    hero_cta: 'Рассчитать проект',
    hero_portfolio: 'Портфолио',
    hero_stat: 'Лет опыта',
    hiw_title: 'Ваш дом мечты в 3 простых шага',
    hiw_s1_title: 'Шаг 1: Ответьте на вопросы',
    hiw_s1_desc: 'Ответьте на 5 коротких вопросов о вашем объекте. Это займет всего 2 минуты.',
    hiw_s2_title: 'Шаг 2: Загрузите фото',
    hiw_s2_desc: 'Загрузите фото текущего состояния — прямо с телефона для ИИ-визуализации.',
    hiw_s3_title: 'Шаг 3: Получите концепцию',
    hiw_s3_desc: 'Получите PDF с ориентировочным расчетом бюджета и ИИ-дизайном на WhatsApp или Email.',
    quiz_step: 'Шаг',
    quiz_of: 'из',
    quiz_s1_title: 'Что вы хотите отремонтировать?',
    quiz_s1_bad: 'Ванная',
    quiz_s1_kueche: 'Кухня',
    quiz_s1_wohnung: 'Квартира',
    quiz_s1_haus: 'Дом',
    quiz_s2_title: 'Какая примерная площадь?',
    quiz_s3_title: 'В каком стиле должен быть дизайн?',
    quiz_s3_modern: 'Модерн',
    quiz_s3_klassisch: 'Классика',
    quiz_s3_skandi: 'Скандинавский',
    quiz_s3_loft: 'Лофт',
    quiz_s4_title: 'Загрузите фото помещения',
    quiz_s4_btn: 'Выбрать фото',
    quiz_s4_drag: 'Или перетащите сюда',
    quiz_s5_title: 'Почти готово!',
    quiz_s5_sub: 'Куда нам отправить результаты?',
    quiz_label_name: 'Имя / Фамилия *',
    quiz_ph_name: 'Ваше имя',
    quiz_label_email: 'E-Mail *',
    quiz_ph_email: 'example@mail.ru',
    quiz_label_wa: 'Номер WhatsApp (необязательно)',
    quiz_ph_wa: '+7 900 000 00 00',
    quiz_terms: 'Я согласен с обработкой данных согласно',
    quiz_terms_link: 'Политике конфиденциальности',
    quiz_terms2: '. *',
    quiz_submit: 'Запросить результаты',
    quiz_back: 'Назад',
    quiz_next: 'Далее',
    trust_title: 'Наши объекты',
    trust_f1_title: 'Соблюдение сроков',
    trust_f1_desc: 'Мы фиксируем сроки в договоре и гарантируем их соблюдение.',
    trust_f2_title: 'Стандарты качества',
    trust_f2_desc: 'Все работы выполняются строго по строительным нормам и стандартам.',
    trust_f3_title: 'Прозрачная смета',
    trust_f3_desc: 'Мы предоставляем детальный расчет, который остается неизменным.',
    about_title: 'Кто мы такие?',
    about_p1: 'Мы — профессиональная команда с опытом работы по всей земле Саарланд. Наша миссия — сделать процесс ремонта прозрачным и предсказуемым.',
    about_p2: 'Используя современные технологии и более чем 10-летний опыт, мы помогаем вам реализовать самые смелые проекты качественно и в срок.',
    about_stat1: 'Лет опыта',
    about_stat2: 'Качество',
    faq_title: 'Часто задаваемые вопросы',
    faq_q1: 'Насколько точен расчет стоимости?',
    faq_a1: 'Наш алгоритм дает ориентировочную стоимость с точностью до 85–90%. Финальная смета составляется после бесплатного выезда специалиста.',
    faq_q2: 'Это действительно бесплатно?',
    faq_a2: 'Да, расчет стоимости и ИИ-визуализация предоставляются абсолютно бесплатно и без обязательств.',
    faq_q3: 'Как работает ИИ-дизайн?',
    faq_a3: 'Мы используем нейросети, обученные на тысячах интерьеров, чтобы создать реалистичный концепт в выбранном вами стиле.',
    footer_sub: 'Ваш партнер по профессиональному строительству и ремонту в Саарланде.',
    footer_contact: 'Контакт',
    footer_legal: 'Юридическая информация',
    footer_rights: '© 2026 Bauwerk_Saar. Все права защищены.',
    cookie_text: 'Мы используем файлы cookie. Используя наш сайт, вы соглашаетесь с нашей',
    cookie_link: 'Политикой конфиденциальности',
    cookie_text2: '.',
    cookie_decline: 'Отклонить',
    cookie_accept: 'Принять все',
    thanks_title: 'Спасибо! Ваш запрос обрабатывается.',
    thanks_sub: 'Наш ИИ-ассистент и специалисты уже начали работу над вашим проектом. Ожидайте PDF-отчет в течение 24 часов.',
    thanks_ig: 'Подписаться на Instagram',
    project_label: 'Объект',
  },
  en: {
    nav_contact: 'Contact',
    write_us: 'Write to us',
    hero_title1: 'We shape',
    hero_title2: 'the future',
    hero_title3: 'in Saarland',
    hero_sub: 'Professional team with over 10 years of experience. We transform construction sites into modern living spaces.',
    hero_cta: 'Calculate project',
    hero_portfolio: 'Portfolio',
    hero_stat: 'Years of experience',
    hiw_title: 'Your dream home in 3 simple steps',
    hiw_s1_title: 'Step 1: Answer questions',
    hiw_s1_desc: 'Answer 5 short questions about your property. It takes only 2 minutes.',
    hiw_s2_title: 'Step 2: Upload photo',
    hiw_s2_desc: 'Upload a photo of the current state of the room for AI visualization.',
    hiw_s3_title: 'Step 3: Get concept',
    hiw_s3_desc: 'Receive a PDF with a budget estimate and AI design via WhatsApp or Email.',
    quiz_step: 'Step',
    quiz_of: 'of',
    quiz_s1_title: 'What would you like to renovate?',
    quiz_s1_bad: 'Bathroom',
    quiz_s1_kueche: 'Kitchen',
    quiz_s1_wohnung: 'Apartment',
    quiz_s1_haus: 'House',
    quiz_s2_title: 'What is the approximate area?',
    quiz_s3_title: 'What style do you prefer?',
    quiz_s3_modern: 'Modern',
    quiz_s3_klassisch: 'Classic',
    quiz_s3_skandi: 'Scandinavian',
    quiz_s3_loft: 'Loft',
    quiz_s4_title: 'Upload a photo of the room',
    quiz_s4_btn: 'Choose photo',
    quiz_s4_drag: 'Or drag it here',
    quiz_s5_title: 'Almost done!',
    quiz_s5_sub: 'Where should we send the results?',
    quiz_label_name: 'First & Last name *',
    quiz_ph_name: 'Your name',
    quiz_label_email: 'E-Mail *',
    quiz_ph_email: 'example@mail.com',
    quiz_label_wa: 'WhatsApp number (optional)',
    quiz_ph_wa: '+49 151 000 000',
    quiz_terms: 'I agree to the processing of my data in accordance with the',
    quiz_terms_link: 'Privacy Policy',
    quiz_terms2: '. *',
    quiz_submit: 'Request results',
    quiz_back: 'Back',
    quiz_next: 'Next',
    trust_title: 'Our Projects',
    trust_f1_title: 'On-time delivery',
    trust_f1_desc: 'We set deadlines in the contract and guarantee compliance.',
    trust_f2_title: 'Quality standards',
    trust_f2_desc: 'All work is carried out strictly according to building codes and standards.',
    trust_f3_title: 'Transparent quote',
    trust_f3_desc: 'We provide a detailed estimate that remains unchanged.',
    about_title: 'Who are we?',
    about_p1: 'We are a professional team operating throughout Saarland. Our mission is to make renovation transparent and predictable for every client.',
    about_p2: 'Using modern technologies and over 10 years of construction experience, we help you realize your most ambitious projects on time.',
    about_stat1: 'Years of experience',
    about_stat2: 'Quality',
    faq_title: 'Frequently Asked Questions',
    faq_q1: 'How accurate is the cost estimate?',
    faq_a1: 'Our algorithm provides an estimate with 85–90% accuracy. The final quote is prepared after a free on-site visit.',
    faq_q2: 'Is it really free?',
    faq_a2: 'Yes, the cost estimate and AI visualization are completely free and non-binding.',
    faq_q3: 'How does the AI design work?',
    faq_a3: 'We use neural networks trained on thousands of modern interiors to create a realistic concept in your chosen style.',
    footer_sub: 'Your partner for professional construction and renovation in Saarland.',
    footer_contact: 'Contact',
    footer_legal: 'Legal',
    footer_rights: '© 2026 Bauwerk_Saar. All rights reserved.',
    cookie_text: 'We use cookies to improve your experience. By using our site, you agree to our',
    cookie_link: 'Privacy Policy',
    cookie_text2: '.',
    cookie_decline: 'Decline',
    cookie_accept: 'Accept all',
    thanks_title: 'Thank you! Your request is being processed.',
    thanks_sub: 'Our AI assistant and specialists have already started working on your project. Expect your PDF report within 24 hours.',
    thanks_ig: 'Follow us on Instagram',
    project_label: 'Project',
  },
  tr: {
    nav_contact: 'İletişim',
    write_us: 'Bize yazın',
    hero_title1: 'Geleceği',
    hero_title2: 'şekillendiriyoruz',
    hero_title3: "Saarland'da",
    hero_sub: "10 yılı aşkın deneyime sahip profesyonel ekip. İnşaat alanlarını modern yaşam alanlarına dönüştürüyoruz.",
    hero_cta: 'Proje hesapla',
    hero_portfolio: 'Portföy',
    hero_stat: 'Yıllık deneyim',
    hiw_title: '3 kolay adımda hayalinizdeki ev',
    hiw_s1_title: 'Adım 1: Soruları yanıtlayın',
    hiw_s1_desc: 'Mülkünüz hakkında 5 kısa soruyu yanıtlayın. Sadece 2 dakika sürer.',
    hiw_s2_title: 'Adım 2: Fotoğraf yükleyin',
    hiw_s2_desc: 'AI görselleştirmesi için odanın mevcut durumunun fotoğrafını yükleyin.',
    hiw_s3_title: 'Adım 3: Konsept alın',
    hiw_s3_desc: "WhatsApp veya e-posta yoluyla bütçe tahmini ve AI tasarımı içeren bir PDF alın.",
    quiz_step: 'Adım',
    quiz_of: '/',
    quiz_s1_title: 'Ne yenilemek istersiniz?',
    quiz_s1_bad: 'Banyo',
    quiz_s1_kueche: 'Mutfak',
    quiz_s1_wohnung: 'Daire',
    quiz_s1_haus: 'Ev',
    quiz_s2_title: 'Yaklaşık alan nedir?',
    quiz_s3_title: 'Hangi stili tercih edersiniz?',
    quiz_s3_modern: 'Modern',
    quiz_s3_klassisch: 'Klasik',
    quiz_s3_skandi: 'İskandinav',
    quiz_s3_loft: 'Loft',
    quiz_s4_title: 'Odanın fotoğrafını yükleyin',
    quiz_s4_btn: 'Fotoğraf seç',
    quiz_s4_drag: 'Veya buraya sürükleyin',
    quiz_s5_title: 'Neredeyse bitti!',
    quiz_s5_sub: 'Sonuçları nereye gönderelim?',
    quiz_label_name: 'Ad / Soyad *',
    quiz_ph_name: 'Adınız',
    quiz_label_email: 'E-Posta *',
    quiz_ph_email: 'ornek@mail.com',
    quiz_label_wa: 'WhatsApp numarası (isteğe bağlı)',
    quiz_ph_wa: '+49 151 000 000',
    quiz_terms: 'Verilerimin',
    quiz_terms_link: 'Gizlilik Politikası',
    quiz_terms2: "uyarınca işlenmesini kabul ediyorum. *",
    quiz_submit: 'Sonuçları talep et',
    quiz_back: 'Geri',
    quiz_next: 'İleri',
    trust_title: 'Projelerimiz',
    trust_f1_title: 'Zamanında teslimat',
    trust_f1_desc: 'Tarihleri sözleşmede belirliyor ve bunlara uymayı garanti ediyoruz.',
    trust_f2_title: 'Kalite standartları',
    trust_f2_desc: 'Tüm işler, inşaat yönetmeliklerine uygun olarak yapılır.',
    trust_f3_title: 'Şeffaf teklif',
    trust_f3_desc: 'Değişmeyen ayrıntılı bir maliyet tahmini sunuyoruz.',
    about_title: 'Biz kimiz?',
    about_p1: "Saarland genelinde faaliyet gösteren profesyonel bir ekibiz. Misyonumuz, tadilat sürecini şeffaf ve öngörülebilir kılmak.",
    about_p2: "Modern teknolojiler ve 10 yılı aşkın deneyimle en iddialı projelerinizi zamanında hayata geçiriyoruz.",
    about_stat1: 'Yıllık deneyim',
    about_stat2: 'Kalite',
    faq_title: 'Sıkça Sorulan Sorular',
    faq_q1: 'Maliyet tahmini ne kadar doğru?',
    faq_a1: 'Algoritmamız, %85–90 doğrulukla tahmini bir maliyet sunar.',
    faq_q2: 'Gerçekten ücretsiz mi?',
    faq_a2: 'Evet, maliyet tahmini ve AI görselleştirmesi tamamen ücretsiz.',
    faq_q3: 'AI tasarımı nasıl çalışır?',
    faq_a3: 'Binlerce iç mekan üzerinde eğitilmiş sinir ağları kullanarak seçilen stilde konsept oluşturuyoruz.',
    footer_sub: "Saarland'da profesyonel inşaat ve tadilat ortağınız.",
    footer_contact: 'İletişim',
    footer_legal: 'Hukuki Bilgiler',
    footer_rights: '© 2026 Bauwerk_Saar. Tüm hakları saklıdır.',
    cookie_text: 'Deneyiminizi iyileştirmek için çerezler kullanıyoruz.',
    cookie_link: 'Gizlilik Politikamızı',
    cookie_text2: 'kabul etmiş sayılırsınız.',
    cookie_decline: 'Reddet',
    cookie_accept: 'Tümünü kabul et',
    thanks_title: 'Teşekkürler! Talebiniz işleniyor.',
    thanks_sub: 'AI asistanımız projeniz üzerinde çalışmaya başladı. PDF raporunuzu 24 saat içinde alacaksınız.',
    thanks_ig: "Instagram'da bizi takip edin",
    project_label: 'Proje',
  },
  uk: {
    nav_contact: 'Контакт',
    write_us: 'Напишіть нам',
    hero_title1: 'Будуємо',
    hero_title2: 'майбутнє',
    hero_title3: 'у Саарланді',
    hero_sub: 'Професійна команда з понад 10-річним досвідом. Ми перетворюємо будівельні майданчики на сучасні житлові простори.',
    hero_cta: 'Розрахувати проєкт',
    hero_portfolio: 'Портфоліо',
    hero_stat: 'Років досвіду',
    hiw_title: 'Ваш будинок мрії за 3 простих кроки',
    hiw_s1_title: 'Крок 1: Дайте відповіді',
    hiw_s1_desc: 'Дайте відповідь на 5 коротких питань. Це займе лише 2 хвилини.',
    hiw_s2_title: 'Крок 2: Завантажте фото',
    hiw_s2_desc: 'Завантажте фото поточного стану — прямо з телефону для ІІ-візуалізації.',
    hiw_s3_title: 'Крок 3: Отримайте концепцію',
    hiw_s3_desc: 'Отримайте PDF із кошторисом та ІІ-дизайном на WhatsApp або Email.',
    quiz_step: 'Крок',
    quiz_of: 'з',
    quiz_s1_title: 'Що ви хочете відремонтувати?',
    quiz_s1_bad: 'Ванна',
    quiz_s1_kueche: 'Кухня',
    quiz_s1_wohnung: 'Квартира',
    quiz_s1_haus: 'Будинок',
    quiz_s2_title: 'Яка приблизна площа?',
    quiz_s3_title: 'У якому стилі повинен бути дизайн?',
    quiz_s3_modern: 'Модерн',
    quiz_s3_klassisch: 'Класика',
    quiz_s3_skandi: 'Скандинавський',
    quiz_s3_loft: 'Лофт',
    quiz_s4_title: 'Завантажте фото приміщення',
    quiz_s4_btn: 'Обрати фото',
    quiz_s4_drag: 'Або перетягніть сюди',
    quiz_s5_title: 'Майже готово!',
    quiz_s5_sub: 'Куди надіслати результати?',
    quiz_label_name: 'Ім\'я / Прізвище *',
    quiz_ph_name: 'Ваше ім\'я',
    quiz_label_email: 'E-Mail *',
    quiz_ph_email: 'example@mail.ua',
    quiz_label_wa: 'Номер WhatsApp (необов\'язково)',
    quiz_ph_wa: '+49 151 000 000',
    quiz_terms: 'Я погоджуюсь на обробку даних відповідно до',
    quiz_terms_link: 'Політики конфіденційності',
    quiz_terms2: '. *',
    quiz_submit: 'Запросити результати',
    quiz_back: 'Назад',
    quiz_next: 'Далі',
    trust_title: 'Наші об\'єкти',
    trust_f1_title: 'Дотримання строків',
    trust_f1_desc: 'Ми фіксуємо терміни у договорі та гарантуємо їх виконання.',
    trust_f2_title: 'Стандарти якості',
    trust_f2_desc: 'Усі роботи виконуються суворо за будівельними нормами.',
    trust_f3_title: 'Прозрачна кошторис',
    trust_f3_desc: 'Ми надаємо детальний розрахунок, який залишається незмінним.',
    about_title: 'Хто ми?',
    about_p1: 'Ми — професійна команда, що працює по всій землі Саарланд. Наша місія — зробити ремонт прозорим і передбачуваним.',
    about_p2: 'Використовуючи сучасні технології та понад 10-річний досвід, ми допомагаємо вам реалізувати найсміливіші проєкти вчасно.',
    about_stat1: 'Років досвіду',
    about_stat2: 'Якість',
    faq_title: 'Часті питання',
    faq_q1: 'Наскільки точний розрахунок вартості?',
    faq_a1: 'Наш алгоритм дає орієнтовну вартість з точністю 85–90%. Фінальний кошторис після безкоштовного виїзду.',
    faq_q2: 'Це дійсно безкоштовно?',
    faq_a2: 'Так, розрахунок і ІІ-візуалізація абсолютно безкоштовні.',
    faq_q3: 'Як працює ІІ-дизайн?',
    faq_a3: 'Нейромережі на основі фото створюють реалістичний концепт у вибраному стилі.',
    footer_sub: 'Ваш партнер з будівництва та ремонту у Саарланді.',
    footer_contact: 'Контакт',
    footer_legal: 'Юридична інформація',
    footer_rights: '© 2026 Bauwerk_Saar. Усі права захищено.',
    cookie_text: 'Ми використовуємо cookie, погоджуючись з нашою',
    cookie_link: 'Політикою конфіденційності',
    cookie_text2: '.',
    cookie_decline: 'Відхилити',
    cookie_accept: 'Прийняти всі',
    thanks_title: 'Дякуємо! Ваш запит обробляється.',
    thanks_sub: 'Наш ІІ-асистент вже почав роботу над вашим проєктом. Очікуйте PDF-звіт протягом 24 годин.',
    thanks_ig: 'Підписатися на Instagram',
    project_label: 'Об\'єкт',
  },
};

type TKey = keyof typeof T['de'];
function useT(lang: Language) {
  return (key: TKey): string => T[lang][key] ?? T['de'][key];
}

// --- Rotating slogan data ---
const SLOGANS = [
  { text: 'Construction & Design Studio', color: '#1a1a1a', lineColor: '#1a1a1a' },
  { text: 'Ihr Partner im Saarland', color: '#2563eb', lineColor: '#2563eb' },
  { text: 'Qualität seit 10 Jahren', color: '#16a34a', lineColor: '#16a34a' },
  { text: 'Modern. Präzise. Zuverlässig.', color: '#9333ea', lineColor: '#9333ea' },
  { text: 'KI-gestütztes Design', color: '#ea580c', lineColor: '#ea580c' },
];

const sloganVariants = [
  { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -10 } },
  { initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -20 } },
  { initial: { opacity: 0, scale: 0.85 }, animate: { opacity: 1, scale: 1 }, exit: { opacity: 0, scale: 1.1 } },
  { initial: { opacity: 0, y: -10 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: 10 } },
  { initial: { opacity: 0, x: -20 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: 20 } },
];

const RotatingSlogan = () => {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setIdx((i) => (i + 1) % SLOGANS.length), 3000);
    return () => clearInterval(timer);
  }, []);

  const slogan = SLOGANS[idx];
  const variant = sloganVariants[idx % sloganVariants.length];

  return (
    <div className="inline-flex items-center gap-4 mb-8 h-6 overflow-visible">
      <AnimatePresence mode="wait">
        <motion.div
          key={`line-${idx}`}
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 48, opacity: 1 }}
          exit={{ width: 0, opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          style={{ backgroundColor: slogan.lineColor, height: '1px', flexShrink: 0 }}
        />
      </AnimatePresence>
      <AnimatePresence mode="wait">
        <motion.div
          key={`slogan-${idx}`}
          initial={variant.initial}
          animate={variant.animate}
          exit={variant.exit}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          className="text-[10px] font-bold uppercase tracking-[0.4em] whitespace-nowrap"
          style={{ color: slogan.color }}
        >
          {slogan.text}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

// --- Components ---

const CookieBanner = ({ lang }: { lang: Language }) => {
  const t = useT(lang);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) setIsVisible(true);
  }, []);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed bottom-4 left-4 right-4 md:left-8 md:right-8 bg-white/90 backdrop-blur-xl border border-gray-200/60 rounded-2xl p-5 z-50 shadow-2xl"
    >
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-gray-600 text-center md:text-left">
          {t('cookie_text')}{' '}
          <a href="#privacy" className="underline font-medium text-[#1a1a1a]">{t('cookie_link')}</a>
          {' '}{t('cookie_text2')}
        </p>
        <div className="flex gap-3 flex-shrink-0">
          <button
            onClick={() => { localStorage.setItem('cookie-consent', 'declined'); setIsVisible(false); }}
            className="px-5 py-2 text-sm font-medium text-gray-500 hover:text-gray-900 rounded-xl hover:bg-gray-100 transition-all"
          >
            {t('cookie_decline')}
          </button>
          <button
            onClick={() => { localStorage.setItem('cookie-consent', 'accepted'); setIsVisible(false); }}
            className="px-6 py-2 bg-[#1a1a1a] text-white text-sm font-semibold rounded-xl hover:bg-black transition-all"
          >
            {t('cookie_accept')}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const Header = ({
  onStartQuiz,
  currentLang,
  onLangChange,
}: {
  onStartQuiz: () => void;
  currentLang: Language;
  onLangChange: (lang: Language) => void;
}) => {
  const t = useT(currentLang);
  const [isLangOpen, setIsLangOpen] = useState(false);

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
    { code: 'ru', label: 'Русский', flag: '🇷🇺' },
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'tr', label: 'Türkçe', flag: '🇹🇷' },
    { code: 'uk', label: 'Українська', flag: '🇺🇦' },
  ];

  const activeLang = languages.find((l) => l.code === currentLang);

  return (
    <header className="sticky top-0 w-full bg-white/80 backdrop-blur-xl border-b border-gray-100/80 z-40">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between py-3">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 bg-[#1a1a1a] rounded-2xl flex items-center justify-center shadow-md">
            <HardHat className="text-white w-5 h-5" />
          </div>
          <span className="text-lg font-bold tracking-tight text-[#1a1a1a]">Bauwerk_Saar</span>
        </div>

        <div className="hidden md:flex items-center gap-4">
          {/* Write-to-us + messenger icons */}
          <div className="flex items-center gap-3 border-r border-gray-100 pr-4">
            <div className="flex flex-col items-center gap-1 mr-1">
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}
                className="text-gray-400"
              >
                <ArrowRight size={13} />
              </motion.span>
              <span className="text-[8px] font-bold uppercase tracking-widest text-gray-400 whitespace-nowrap leading-none">
                {t('write_us')}
              </span>
            </div>
            <a
              href="https://wa.me/49123456789"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-xl bg-gray-50 hover:bg-green-50 flex items-center justify-center text-gray-400 hover:text-[#25D366] transition-all"
            >
              <MessageCircle size={18} />
            </a>
            <a
              href="https://t.me/saarbauteam"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-xl bg-gray-50 hover:bg-blue-50 flex items-center justify-center text-gray-400 hover:text-[#0088cc] transition-all"
            >
              <Send size={18} />
            </a>
          </div>

          {/* Language switcher */}
          <div className="relative">
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl hover:bg-gray-50 text-sm font-semibold text-[#1a1a1a] transition-all"
            >
              <Globe size={15} />
              <span className="text-base">{activeLang?.flag}</span>
              <ChevronDown size={13} className={`transition-transform duration-200 ${isLangOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {isLangOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 6, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.97 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full right-0 mt-2 bg-white/95 backdrop-blur-xl border border-gray-100 shadow-2xl rounded-2xl py-2 min-w-[170px] overflow-hidden"
                >
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => { onLangChange(lang.code); setIsLangOpen(false); }}
                      className={`w-full px-4 py-2.5 text-left text-sm font-medium hover:bg-gray-50 flex items-center justify-between transition-all ${currentLang === lang.code ? 'text-[#1a1a1a] font-bold' : 'text-gray-500'}`}
                    >
                      <span>{lang.label}</span>
                      <span className="text-base">{lang.flag}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button
            onClick={onStartQuiz}
            className="px-5 py-2.5 bg-[#1a1a1a] text-white font-semibold rounded-xl hover:bg-black transition-all shadow-md text-sm"
          >
            {t('nav_contact')}
          </button>
        </div>
      </div>
    </header>
  );
};

const Hero = ({ onStartQuiz, lang }: { onStartQuiz: () => void; lang: Language }) => {
  const t = useT(lang);

  return (
    <section className="relative min-h-[95vh] flex items-center pt-10 pb-20 overflow-hidden bg-[#fcfcfc]">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[25vw] font-bold text-gray-100/50 select-none pointer-events-none uppercase tracking-tighter leading-none z-0">
        Saarland
      </div>

      <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-12 gap-0 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -40, scale: 0.97 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="lg:col-span-7"
        >
          <RotatingSlogan />

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: 'easeOut' }}
            className="text-6xl md:text-[90px] font-bold text-[#1a1a1a] leading-[0.9] mb-10 tracking-tighter"
          >
            {t('hero_title1')} <br />
            <span className="text-gray-300">{t('hero_title2')}</span> <br />
            {t('hero_title3')}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
            className="text-xl text-gray-500 mb-12 max-w-lg leading-relaxed"
          >
            {t('hero_sub')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45, ease: 'easeOut' }}
            className="flex flex-col sm:flex-row gap-4"
          >
            {/* Subtle breathing pulse button */}
            <div className="relative inline-flex">
              <motion.span
                animate={{ scale: [1, 1.12, 1], opacity: [0, 0.18, 0] }}
                transition={{ repeat: Infinity, duration: 2.8, ease: 'easeInOut', repeatDelay: 0.4 }}
                className="absolute inset-0 rounded-2xl bg-[#1a1a1a] pointer-events-none"
              />
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={onStartQuiz}
                className="relative px-10 py-5 bg-[#1a1a1a] text-white text-sm font-bold rounded-2xl hover:bg-black transition-colors flex items-center justify-center gap-3 shadow-xl z-10"
              >
                {t('hero_cta')}
                <ArrowRight size={16} />
              </motion.button>
            </div>
            <button className="px-10 py-5 border border-gray-200 text-[#1a1a1a] text-sm font-semibold rounded-2xl hover:border-[#1a1a1a] hover:bg-gray-50 transition-all">
              {t('hero_portfolio')}
            </button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, ease: 'easeOut' }}
          className="lg:col-span-5 relative mt-20 lg:mt-0"
        >
          <div className="relative aspect-[3/4] overflow-hidden rounded-3xl shadow-[30px_30px_0px_0px_rgba(26,26,26,1)]">
            <motion.img
              initial={{ scale: 1.12 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.6, ease: 'easeOut' }}
              src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=1200"
              alt="Modern Luxury Villa"
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
              referrerPolicy="no-referrer"
            />
          </div>

          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="absolute -bottom-10 -left-10 bg-white/90 backdrop-blur-xl p-8 shadow-2xl border border-gray-100 rounded-2xl"
          >
            <div className="text-5xl font-bold text-[#1a1a1a] mb-1 tracking-tighter">10+</div>
            <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">{t('hero_stat')}</div>
          </motion.div>

          <div className="absolute -top-6 -right-6 w-24 h-24 border-t-2 border-r-2 border-[#1a1a1a] rounded-tr-3xl" />
        </motion.div>
      </div>
    </section>
  );
};

const HowItWorks = ({ lang }: { lang: Language }) => {
  const t = useT(lang);
  const steps = [
    { icon: <Ruler className="w-7 h-7 text-[#1a1a1a]" />, title: t('hiw_s1_title'), desc: t('hiw_s1_desc') },
    { icon: <Paintbrush className="w-7 h-7 text-[#1a1a1a]" />, title: t('hiw_s2_title'), desc: t('hiw_s2_desc') },
    { icon: <Hammer className="w-7 h-7 text-[#1a1a1a]" />, title: t('hiw_s3_title'), desc: t('hiw_s3_desc') },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-[#1a1a1a] mb-16 tracking-tighter">
          {t('hiw_title')}
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="p-8 rounded-3xl bg-[#f8f9fa] hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gray-100 group"
            >
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-md group-hover:scale-110 transition-transform">
                {step.icon}
              </div>
              <h3 className="text-lg font-bold text-[#1a1a1a] mb-3">{step.title}</h3>
              <p className="text-gray-500 leading-relaxed text-sm">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Quiz = ({
  onComplete,
  onCancel,
  lang,
}: {
  onComplete: (data: QuizData) => void;
  onCancel: () => void;
  lang: Language;
}) => {
  const t = useT(lang);
  const [step, setStep] = useState<QuizStep>(1);
  const [data, setData] = useState<QuizData>({
    type: '',
    area: 50,
    style: '',
    photo: null,
    name: '',
    email: '',
    whatsapp: '',
    agreedToTerms: false,
  });

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 5) as QuizStep);
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1) as QuizStep);

  const handleTypeSelect = (type: RenovationType) => { setData({ ...data, type }); nextStep(); };
  const handleStyleSelect = (style: DesignStyle) => { setData({ ...data, style }); nextStep(); };

  const progress = (step / 5) * 100;

  const renovationTypes = [
    { id: 'Bad', label: t('quiz_s1_bad'), img: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&q=80&w=400' },
    { id: 'Küche', label: t('quiz_s1_kueche'), img: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=400' },
    { id: 'Wohnung', label: t('quiz_s1_wohnung'), img: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&q=80&w=400' },
    { id: 'Haus', label: t('quiz_s1_haus'), img: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&q=80&w=400' },
  ];

  const designStyles = [
    { id: 'Modern', label: t('quiz_s3_modern'), img: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&q=80&w=400' },
    { id: 'Klassisch', label: t('quiz_s3_klassisch'), img: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=400' },
    { id: 'Skandinavisch', label: t('quiz_s3_skandi'), img: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&q=80&w=400' },
    { id: 'Loft', label: t('quiz_s3_loft'), img: 'https://images.unsplash.com/photo-1505691938895-1758d7eaa511?auto=format&fit=crop&q=80&w=400' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-start justify-center overflow-y-auto py-8 px-4"
    >
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 30, scale: 0.97 }}
        transition={{ duration: 0.25 }}
        className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden"
      >
        <div className="px-8 pt-8 pb-6 border-b border-gray-100">
          <div className="flex justify-between items-center mb-5">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
              {t('quiz_step')} {step} {t('quiz_of')} 5
            </p>
            <button
              onClick={onCancel}
              className="w-9 h-9 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-all"
            >
              <X size={18} className="text-gray-500" />
            </button>
          </div>
          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4 }}
              className="h-full bg-[#1a1a1a] rounded-full"
            />
          </div>
        </div>

        <div className="px-8 py-8">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }}>
                <h2 className="text-2xl font-bold text-[#1a1a1a] mb-6 tracking-tight">{t('quiz_s1_title')}</h2>
                <div className="grid grid-cols-2 gap-3">
                  {renovationTypes.map((item) => (
                    <button key={item.id} onClick={() => handleTypeSelect(item.id as RenovationType)}
                      className={`p-4 rounded-2xl border-2 transition-all text-left group ${data.type === item.id ? 'border-[#1a1a1a] bg-[#1a1a1a]/5' : 'border-gray-100 hover:border-gray-300'}`}>
                      <div className="aspect-video rounded-xl bg-gray-100 mb-3 overflow-hidden">
                        <img src={item.img} alt={item.label} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                      </div>
                      <span className="font-semibold text-sm text-[#1a1a1a]">{item.label}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }}>
                <h2 className="text-2xl font-bold text-[#1a1a1a] mb-6 tracking-tight">{t('quiz_s2_title')}</h2>
                <div className="bg-[#f8f9fa] p-10 rounded-3xl text-center">
                  <div className="text-6xl font-bold text-[#1a1a1a] mb-8 tracking-tighter">{data.area} m²</div>
                  <input type="range" min="0" max="200" value={data.area}
                    onChange={(e) => setData({ ...data, area: parseInt(e.target.value) })}
                    className="w-full h-1.5 bg-gray-200 rounded-full appearance-none cursor-pointer accent-[#1a1a1a]" />
                  <div className="flex justify-between mt-4 text-xs font-semibold text-gray-400">
                    <span>0 m²</span><span>200+ m²</span>
                  </div>
                </div>
                <div className="flex justify-between mt-8">
                  <button onClick={prevStep} className="flex items-center gap-2 text-gray-400 font-semibold text-sm hover:text-gray-600 transition-colors">
                    <ChevronLeft size={16} /> {t('quiz_back')}
                  </button>
                  <button onClick={nextStep} className="px-8 py-3 bg-[#1a1a1a] text-white font-semibold text-sm rounded-xl hover:bg-black transition-all flex items-center gap-2">
                    {t('quiz_next')} <ChevronRight size={16} />
                  </button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }}>
                <h2 className="text-2xl font-bold text-[#1a1a1a] mb-6 tracking-tight">{t('quiz_s3_title')}</h2>
                <div className="grid grid-cols-2 gap-3">
                  {designStyles.map((item) => (
                    <button key={item.id} onClick={() => handleStyleSelect(item.id as DesignStyle)}
                      className={`p-4 rounded-2xl border-2 transition-all text-left group ${data.style === item.id ? 'border-[#1a1a1a] bg-[#1a1a1a]/5' : 'border-gray-100 hover:border-gray-300'}`}>
                      <div className="aspect-video rounded-xl bg-gray-100 mb-3 overflow-hidden">
                        <img src={item.img} alt={item.label} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                      </div>
                      <span className="font-semibold text-sm text-[#1a1a1a]">{item.label}</span>
                    </button>
                  ))}
                </div>
                <div className="flex justify-between mt-8">
                  <button onClick={prevStep} className="flex items-center gap-2 text-gray-400 font-semibold text-sm hover:text-gray-600 transition-colors">
                    <ChevronLeft size={16} /> {t('quiz_back')}
                  </button>
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }}>
                <h2 className="text-2xl font-bold text-[#1a1a1a] mb-6 tracking-tight">{t('quiz_s4_title')}</h2>
                <div className="border-2 border-dashed border-gray-200 rounded-3xl p-12 text-center hover:border-[#1a1a1a] transition-colors group">
                  <input type="file" className="hidden" id="photo-upload" onChange={(e) => setData({ ...data, photo: e.target.files?.[0] || null })} />
                  <label htmlFor="photo-upload" className="cursor-pointer">
                    <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:bg-[#1a1a1a] group-hover:text-white transition-all">
                      <Upload size={28} />
                    </div>
                    <p className="text-sm font-semibold text-[#1a1a1a] mb-1">{t('quiz_s4_btn')}</p>
                    <p className="text-xs text-gray-400">{t('quiz_s4_drag')}</p>
                    {data.photo && <p className="mt-4 text-green-600 font-semibold text-sm">✓ {data.photo.name}</p>}
                  </label>
                </div>
                <div className="flex justify-between mt-8">
                  <button onClick={prevStep} className="flex items-center gap-2 text-gray-400 font-semibold text-sm hover:text-gray-600 transition-colors">
                    <ChevronLeft size={16} /> {t('quiz_back')}
                  </button>
                  <button onClick={nextStep} className="px-8 py-3 bg-[#1a1a1a] text-white font-semibold text-sm rounded-xl hover:bg-black transition-all flex items-center gap-2">
                    {t('quiz_next')} <ChevronRight size={16} />
                  </button>
                </div>
              </motion.div>
            )}

            {step === 5 && (
              <motion.div key="step5" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }}>
                <h2 className="text-2xl font-bold text-[#1a1a1a] mb-1 tracking-tight">{t('quiz_s5_title')}</h2>
                <p className="text-gray-400 text-sm mb-6">{t('quiz_s5_sub')}</p>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#1a1a1a] mb-1.5 uppercase tracking-wider">{t('quiz_label_name')}</label>
                    <input type="text" required value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#1a1a1a] outline-none transition-all text-sm bg-gray-50 focus:bg-white"
                      placeholder={t('quiz_ph_name')} />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#1a1a1a] mb-1.5 uppercase tracking-wider">{t('quiz_label_email')}</label>
                    <input type="email" required value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#1a1a1a] outline-none transition-all text-sm bg-gray-50 focus:bg-white"
                      placeholder={t('quiz_ph_email')} />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#1a1a1a] mb-1.5 uppercase tracking-wider">{t('quiz_label_wa')}</label>
                    <input type="tel" value={data.whatsapp} onChange={(e) => setData({ ...data, whatsapp: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#1a1a1a] outline-none transition-all text-sm bg-gray-50 focus:bg-white"
                      placeholder={t('quiz_ph_wa')} />
                  </div>
                  <div className="flex items-start gap-3 pt-2">
                    <input type="checkbox" id="terms" checked={data.agreedToTerms} onChange={(e) => setData({ ...data, agreedToTerms: e.target.checked })}
                      className="mt-0.5 w-4 h-4 rounded border-gray-300 text-[#1a1a1a] focus:ring-[#1a1a1a]" />
                    <label htmlFor="terms" className="text-xs text-gray-500 leading-relaxed">
                      {t('quiz_terms')}{' '}
                      <a href="#privacy" className="underline font-semibold text-[#1a1a1a]">{t('quiz_terms_link')}</a>
                      {' '}{t('quiz_terms2')}
                    </label>
                  </div>
                  <button disabled={!data.name || !data.email || !data.agreedToTerms} onClick={() => onComplete(data)}
                    className="w-full py-4 bg-[#1a1a1a] text-white text-sm font-bold rounded-2xl hover:bg-black transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-xl active:scale-[0.98]">
                    {t('quiz_submit')}
                  </button>
                </div>
                <button onClick={prevStep} className="flex items-center gap-2 text-gray-400 font-semibold text-sm hover:text-gray-600 transition-colors mt-6 mx-auto">
                  <ChevronLeft size={16} /> {t('quiz_back')}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Trust = ({ lang }: { lang: Language }) => {
  const t = useT(lang);
  const features = [
    { icon: <Clock className="w-5 h-5" />, title: t('trust_f1_title'), desc: t('trust_f1_desc') },
    { icon: <HardHat className="w-5 h-5" />, title: t('trust_f2_title'), desc: t('trust_f2_desc') },
    { icon: <ShieldCheck className="w-5 h-5" />, title: t('trust_f3_title'), desc: t('trust_f3_desc') },
  ];

  const projectImages = [
    'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1631679706909-1844bbd07221?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&q=80&w=800',
  ];

  return (
    <section className="py-24 bg-[#f8f9fa]">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-5xl font-bold text-[#1a1a1a] mb-16 text-center tracking-tighter">
          {t('trust_title')}
        </h2>
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {features.map((f, idx) => (
            <motion.div key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}
              className="flex flex-col gap-4 p-8 bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
              <div className="w-11 h-11 bg-[#1a1a1a] text-white flex items-center justify-center rounded-2xl">{f.icon}</div>
              <div>
                <h3 className="text-lg font-bold text-[#1a1a1a] mb-2">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projectImages.map((url, i) => (
            <div key={i} className="aspect-[4/5] overflow-hidden group relative rounded-2xl">
              <img src={url} alt={`${t('project_label')} ${i + 1}`}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-5 rounded-2xl">
                <p className="text-white font-bold text-xs uppercase tracking-widest">{t('project_label')} #{i + 1}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const AboutUs = ({ lang }: { lang: Language }) => {
  const t = useT(lang);
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-16 items-center">
        <div className="relative aspect-[3/4] overflow-hidden shadow-2xl rounded-3xl">
          <img
            src="https://scontent-fra3-2.xx.fbcdn.net/v/t39.30808-6/619251008_25957312983892753_2068975750634700272_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=13d280&_nc_ohc=Mmaoto8PhOwQ7kNvwF84uy6&_nc_oc=AdqwLTBjJms1TjNswHIHuZCjSgratJoKvLfdL4-Qzsb0TmMBgTpJ97yf3Gd3-l95LW8&_nc_zt=23&_nc_ht=scontent-fra3-2.xx&_nc_gid=f96pfn4zcdbBIVyVrXW77Q&_nc_ss=7a3a8&oh=00_AfzYsBxCAfYrhPkvmWNhqiw9eDeSOfjNWbIaNgiIheXZVw&oe=69D05BB7"
            alt="Founder"
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
            referrerPolicy="no-referrer"
          />
          <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-xl p-5 rounded-2xl">
            <p className="text-lg font-bold text-[#1a1a1a]">Arsen Ametov</p>
            <p className="text-xs text-gray-400 font-medium mt-0.5">Gründer · Bauwerk_Saar</p>
          </div>
        </div>
        <div>
          <div className="w-12 h-12 bg-[#1a1a1a] flex items-center justify-center text-white mb-8 rounded-2xl">
            <Users size={22} />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-[#1a1a1a] mb-8 tracking-tighter">{t('about_title')}</h2>
          <p className="text-lg text-gray-500 mb-6 leading-relaxed">{t('about_p1')}</p>
          <p className="text-lg text-gray-500 mb-10 leading-relaxed">{t('about_p2')}</p>
          <div className="grid grid-cols-2 gap-0 border border-gray-100 rounded-2xl overflow-hidden">
            <div className="p-8 border-r border-gray-100">
              <p className="text-4xl font-bold text-[#1a1a1a] mb-1 tracking-tighter">10+</p>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">{t('about_stat1')}</p>
            </div>
            <div className="p-8">
              <p className="text-4xl font-bold text-[#1a1a1a] mb-1 tracking-tighter">100%</p>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">{t('about_stat2')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const FAQ = ({ lang }: { lang: Language }) => {
  const t = useT(lang);
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const faqs = [
    { q: t('faq_q1'), a: t('faq_a1') },
    { q: t('faq_q2'), a: t('faq_a2') },
    { q: t('faq_q3'), a: t('faq_a3') },
  ];

  return (
    <section className="py-24 bg-[#f8f9fa]">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-12 text-center tracking-tighter">{t('faq_title')}</h2>
        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <motion.div key={idx} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <button onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                className="w-full px-6 py-5 flex items-center justify-between text-left">
                <div className="flex gap-3 items-center">
                  <HelpCircle className="text-[#1a1a1a] flex-shrink-0 w-5 h-5" />
                  <span className="text-base font-semibold text-[#1a1a1a]">{faq.q}</span>
                </div>
                <ChevronDown size={18} className={`text-gray-400 transition-transform flex-shrink-0 ml-2 ${openIdx === idx ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {openIdx === idx && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
                    <p className="px-6 pb-5 text-sm text-gray-500 leading-relaxed pl-14">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = ({ onShowImpressum, onShowPrivacy, lang }: { onShowImpressum: () => void; onShowPrivacy: () => void; lang: Language }) => {
  const t = useT(lang);
  return (
    <footer className="bg-[#0a0a0a] text-white py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-2">
            <div className="flex items-center gap-2.5 mb-6">
              <div className="w-9 h-9 bg-white rounded-xl flex items-center justify-center">
                <HardHat className="text-[#0a0a0a] w-5 h-5" />
              </div>
              <span className="text-xl font-bold tracking-tight">Bauwerk_Saar</span>
            </div>
            <p className="text-gray-500 max-w-sm leading-relaxed text-sm">{t('footer_sub')}</p>
            <div className="flex gap-4 mt-6">
              <a href="https://wa.me/49123456789" target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/5 hover:bg-[#25D366]/20 flex items-center justify-center text-gray-500 hover:text-[#25D366] transition-all">
                <MessageCircle size={20} />
              </a>
              <a href="https://t.me/saarbauteam" target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/5 hover:bg-[#0088cc]/20 flex items-center justify-center text-gray-500 hover:text-[#0088cc] transition-all">
                <Send size={20} />
              </a>
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-6 text-xs uppercase tracking-[0.2em] text-gray-400">{t('footer_contact')}</h4>
            <ul className="space-y-3 text-gray-500 text-sm">
              <li>Saarland, Deutschland</li>
              <li>info@bauwerk-saar.de</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6 text-xs uppercase tracking-[0.2em] text-gray-400">{t('footer_legal')}</h4>
            <ul className="space-y-3 text-gray-500 text-sm">
              <li><button onClick={onShowImpressum} className="hover:text-white transition-colors">Impressum</button></li>
              <li><button onClick={onShowPrivacy} className="hover:text-white transition-colors">Datenschutzerklärung</button></li>
            </ul>
          </div>
        </div>
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-gray-600 font-medium">
          <p>{t('footer_rights')}</p>
          <a href="#" className="hover:text-white transition-colors flex items-center gap-2">
            <Instagram size={16} /><span>Instagram</span>
          </a>
        </div>
      </div>
    </footer>
  );
};

const LegalModal = ({ title, content, onClose }: { title: string; content: React.ReactNode; onClose: () => void }) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
    <motion.div initial={{ y: 30, opacity: 0, scale: 0.97 }} animate={{ y: 0, opacity: 1, scale: 1 }}
      exit={{ y: 30, opacity: 0, scale: 0.97 }} transition={{ duration: 0.2 }}
      className="bg-white w-full max-w-4xl max-h-[80vh] overflow-hidden flex flex-col shadow-2xl rounded-3xl">
      <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/80">
        <h2 className="text-lg font-bold text-[#1a1a1a]">{title}</h2>
        <button onClick={onClose} className="w-9 h-9 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-all">
          <X size={18} className="text-gray-500" />
        </button>
      </div>
      <div className="p-8 overflow-y-auto text-gray-600 leading-relaxed text-sm">{content}</div>
    </motion.div>
  </motion.div>
);

const ImpressumContent = () => (
  <div className="space-y-6 text-left">
    <section>
      <h3 className="font-bold text-[#1a1a1a] mb-2 uppercase tracking-wider text-xs">Angaben gemäß § 5 TMG</h3>
      <p>Bauwerk_Saar<br />Musterstraße 123<br />66111 Saarbrücken</p>
    </section>
    <section>
      <h3 className="font-bold text-[#1a1a1a] mb-2 uppercase tracking-wider text-xs">Vertreten durch</h3>
      <p>Arsen Ametov</p>
    </section>
    <section>
      <h3 className="font-bold text-[#1a1a1a] mb-2 uppercase tracking-wider text-xs">Kontakt</h3>
      <p>E-Mail: info@bauwerk-saar.de</p>
    </section>
    <section>
      <h3 className="font-bold text-[#1a1a1a] mb-2 uppercase tracking-wider text-xs">Umsatzsteuer-ID</h3>
      <p>DE 123456789</p>
    </section>
    <section>
      <h3 className="font-bold text-[#1a1a1a] mb-2 uppercase tracking-wider text-xs">Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h3>
      <p>Arsen Ametov<br />Musterstraße 123<br />66111 Saarbrücken</p>
    </section>
  </div>
);

const PrivacyContent = () => (
  <div className="space-y-6 text-left">
    <h3 className="font-bold text-[#1a1a1a] mb-2 uppercase tracking-wider text-xs">1. Datenschutz auf einen Blick</h3>
    <p>Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen.</p>
    <h3 className="font-bold text-[#1a1a1a] mb-2 uppercase tracking-wider text-xs">2. Datenerfassung auf unserer Website</h3>
    <p>Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber.</p>
    <h3 className="font-bold text-[#1a1a1a] mb-2 uppercase tracking-wider text-xs">3. Analyse-Tools und Tools von Drittanbietern</h3>
    <p>Beim Besuch dieser Website kann Ihr Surf-Verhalten statistisch ausgewertet werden.</p>
    <h3 className="font-bold text-[#1a1a1a] mb-2 uppercase tracking-wider text-xs">4. Ihre Rechte</h3>
    <p>Sie haben jederzeit das Recht unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten.</p>
  </div>
);

const ThankYou = ({ lang }: { lang: Language }) => {
  const t = useT(lang);
  return (
    <div className="min-h-screen bg-[#f8f9fa] flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
        className="max-w-xl w-full text-center bg-white rounded-3xl p-12 shadow-2xl">
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
          <CheckCircle2 size={44} />
        </div>
        <h1 className="text-3xl font-bold text-[#1a1a1a] mb-5 tracking-tight">{t('thanks_title')}</h1>
        <p className="text-gray-500 mb-10 leading-relaxed">{t('thanks_sub')}</p>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all active:scale-95">
          <Instagram size={22} />
          <span>{t('thanks_ig')}</span>
        </a>
      </motion.div>
    </div>
  );
};

// --- Main App ---
export default function App() {
  const [showQuiz, setShowQuiz] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [lang, setLang] = useState<Language>('de');
  const [showImpressum, setShowImpressum] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);

  const handleQuizComplete = (data: QuizData) => {
    console.log('Quiz Data:', data);
    setShowQuiz(false);
    setIsSubmitted(true);
    window.scrollTo(0, 0);
  };

  if (isSubmitted) return <ThankYou lang={lang} />;

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 selection:bg-[#1a1a1a] selection:text-white">
      <Header onStartQuiz={() => setShowQuiz(true)} currentLang={lang} onLangChange={setLang} />
      <main>
        <Hero onStartQuiz={() => setShowQuiz(true)} lang={lang} />
        <HowItWorks lang={lang} />
        <AboutUs lang={lang} />
        <Trust lang={lang} />
        <FAQ lang={lang} />
      </main>
      <Footer onShowImpressum={() => setShowImpressum(true)} onShowPrivacy={() => setShowPrivacy(true)} lang={lang} />
      <AnimatePresence>
        {showQuiz && <Quiz onCancel={() => setShowQuiz(false)} onComplete={handleQuizComplete} lang={lang} />}
        {showImpressum && <LegalModal title="Impressum" content={<ImpressumContent />} onClose={() => setShowImpressum(false)} />}
        {showPrivacy && <LegalModal title="Datenschutzerklärung" content={<PrivacyContent />} onClose={() => setShowPrivacy(false)} />}
      </AnimatePresence>
      <CookieBanner lang={lang} />
    </div>
  );
}

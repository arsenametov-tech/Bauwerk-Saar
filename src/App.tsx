/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Phone, 
  MessageCircle, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  ArrowRight, 
  ChevronRight, 
  ChevronLeft, 
  Upload,
  X,
  Menu,
  Instagram,
  HardHat,
  Hammer,
  Ruler,
  Paintbrush,
  Home,
  Info,
  HelpCircle,
  Users,
  Send,
  Globe,
  ChevronDown
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

// --- Components ---
const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <motion.div 
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-50 shadow-2xl"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-gray-600 text-center md:text-left">
          Мы используем файлы cookie для улучшения вашего опыта. Используя наш сайт, вы соглашаетесь с нашей <a href="#privacy" className="underline">Политикой конфиденциальности</a>.
        </p>
        <div className="flex gap-4">
          <button 
            onClick={handleDecline}
            className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900"
          >
            Отклонить
          </button>
          <button 
            onClick={handleAccept}
            className="px-6 py-2 bg-[#003366] text-white text-sm font-bold rounded-full hover:bg-[#002244] transition-colors"
          >
            Принять все
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const Header = ({ onStartQuiz, currentLang, onLangChange }: { onStartQuiz: () => void, currentLang: Language, onLangChange: (lang: Language) => void }) => {
  const [isLangOpen, setIsLangOpen] = useState(false);
  
  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
    { code: 'ru', label: 'Русский', flag: '🇷🇺' },
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'tr', label: 'Türkçe', flag: '🇹🇷' },
    { code: 'uk', label: 'Українська', flag: '🇺🇦' },
  ];

  const activeLang = languages.find(l => l.code === currentLang);

  return (
    <header className="sticky top-0 w-full bg-white/90 backdrop-blur-md border-b border-gray-100 z-40">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-[#1a1a1a] rounded-lg flex items-center justify-center">
            <HardHat className="text-white w-6 h-6" />
          </div>
          <span className="text-xl font-bold tracking-tighter text-[#1a1a1a] uppercase">Saar-Bau Team</span>
        </div>
        
        <div className="hidden md:flex items-center gap-6">
          <div className="flex items-center gap-4 border-r border-gray-100 pr-6">
            <a href="https://wa.me/49123456789" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#25D366] transition-colors" title="WhatsApp">
              <MessageCircle size={20} />
            </a>
            <a href="https://t.me/saarbauteam" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#0088cc] transition-colors" title="Telegram">
              <Send size={20} />
            </a>
          </div>

          <div className="relative">
            <button 
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#1a1a1a] hover:opacity-70 transition-opacity"
            >
              <Globe size={16} />
              <span>{activeLang?.code}</span>
              <ChevronDown size={14} className={`transition-transform ${isLangOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {isLangOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full right-0 mt-2 bg-white border border-gray-100 shadow-xl py-2 min-w-[160px]"
                >
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        onLangChange(lang.code);
                        setIsLangOpen(false);
                      }}
                      className={`w-full px-4 py-2 text-left text-xs font-bold uppercase tracking-widest hover:bg-gray-50 flex items-center justify-between ${currentLang === lang.code ? 'text-[#1a1a1a]' : 'text-gray-400'}`}
                    >
                      <span>{lang.label}</span>
                      <span>{lang.flag}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button 
            onClick={onStartQuiz}
            className="px-6 py-2.5 bg-[#1a1a1a] text-white font-bold rounded-none hover:bg-black transition-all shadow-lg hover:shadow-xl active:scale-95 uppercase text-sm tracking-widest"
          >
            Контакт
          </button>
        </div>
        
        <button className="md:hidden p-2 text-gray-600">
          <Menu size={24} />
        </button>
      </div>
    </header>
  );
};

const Hero = ({ onStartQuiz }: { onStartQuiz: () => void }) => {
  return (
    <section className="relative min-h-[95vh] flex items-center pt-10 pb-20 overflow-hidden bg-[#fcfcfc]">
      {/* Background large text for style */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[25vw] font-bold text-gray-100/50 select-none pointer-events-none uppercase tracking-tighter leading-none z-0">
        Saarland
      </div>

      <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-12 gap-0 items-center relative z-10">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="lg:col-span-7"
        >
          <div className="inline-flex items-center gap-4 mb-8">
            <div className="h-[1px] w-12 bg-[#1a1a1a]" />
            <div className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#1a1a1a]">
              Construction & Design Studio
            </div>
          </div>
          
          <h1 className="text-6xl md:text-[110px] font-bold text-[#1a1a1a] leading-[0.85] mb-10 tracking-tighter uppercase">
            Создаем <br />
            <span className="text-gray-300">будущее</span> <br />
            в Саарланде
          </h1>
          
          <p className="text-xl text-gray-500 mb-12 max-w-lg leading-relaxed">
            Профессиональная команда с 10-летним опытом. Мы превращаем строительные площадки в современные жилые пространства.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onStartQuiz}
              className="px-12 py-6 bg-[#1a1a1a] text-white text-xs font-bold uppercase tracking-[0.2em] hover:bg-black transition-all flex items-center justify-center gap-4 shadow-2xl"
            >
              Рассчитать проект
              <ArrowRight size={16} />
            </motion.button>
            <button className="px-12 py-6 border border-gray-200 text-[#1a1a1a] text-xs font-bold uppercase tracking-[0.2em] hover:border-[#1a1a1a] transition-all">
              Портфолио
            </button>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="lg:col-span-5 relative mt-20 lg:mt-0"
        >
          <div className="relative aspect-[3/4] overflow-hidden shadow-[30px_30px_0px_0px_rgba(26,26,26,1)]">
            <img 
              src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=1200" 
              alt="Modern Luxury Villa" 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-black/5" />
          </div>
          
          {/* Floating stat card */}
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="absolute -bottom-10 -left-10 bg-white p-10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] border border-gray-50"
          >
            <div className="text-5xl font-bold text-[#1a1a1a] mb-2 tracking-tighter">10+</div>
            <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">Лет безупречного опыта</div>
          </motion.div>
          
          {/* Decorative element */}
          <div className="absolute -top-6 -right-6 w-24 h-24 border-t-2 border-r-2 border-[#1a1a1a]" />
        </motion.div>
      </div>
    </section>
  );
};

const HowItWorks = () => {
  const steps = [
    {
      icon: <Ruler className="w-8 h-8 text-[#003366]" />,
      title: "Шаг 1: Ответьте на вопросы",
      desc: "Ответьте на 5 коротких вопросов о вашем объекте. Это займет всего 2 минуты."
    },
    {
      icon: <Paintbrush className="w-8 h-8 text-[#003366]" />,
      title: "Шаг 2: Загрузите фото",
      desc: "Загрузите фото текущего состояния помещения — прямо с телефона для ИИ-визуализации."
    },
    {
      icon: <Hammer className="w-8 h-8 text-[#003366]" />,
      title: "Шаг 3: Получите концепцию",
      desc: "Получите PDF с ориентировочным расчетом бюджета и ИИ-дизайном на WhatsApp или Email."
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-[#003366] mb-16">
          Ваш дом мечты в 3 простых шага
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, idx) => (
            <div key={idx} className="p-8 rounded-3xl bg-[#f8f9fa] hover:bg-white hover:shadow-xl transition-all border border-transparent hover:border-gray-100 group">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                {step.icon}
              </div>
              <h3 className="text-xl font-bold text-[#003366] mb-4">{step.title}</h3>
              <p className="text-gray-600 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Quiz = ({ onComplete, onCancel }: { onComplete: (data: QuizData) => void, onCancel: () => void }) => {
  const [step, setStep] = useState<QuizStep>(1);
  const [data, setData] = useState<QuizData>({
    type: '',
    area: 50,
    style: '',
    photo: null,
    name: '',
    email: '',
    whatsapp: '',
    agreedToTerms: false
  });

  const nextStep = () => setStep(prev => Math.min(prev + 1, 5) as QuizStep);
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1) as QuizStep);

  const handleTypeSelect = (type: RenovationType) => {
    setData({ ...data, type });
    nextStep();
  };

  const handleStyleSelect = (style: DesignStyle) => {
    setData({ ...data, style });
    nextStep();
  };

  const progress = (step / 5) * 100;

  return (
    <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-12">
          <button onClick={onCancel} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X size={24} className="text-gray-400" />
          </button>
          <div className="flex-1 mx-8">
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                className="h-full bg-[#003366]"
              />
            </div>
            <p className="text-xs font-bold text-[#003366] mt-2 uppercase tracking-widest text-center">
              Шаг {step} из 5
            </p>
          </div>
          <div className="w-10" />
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div 
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <h2 className="text-3xl font-bold text-[#1a1a1a] mb-8 text-center uppercase tracking-tighter">Что вы хотите отремонтировать?</h2>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { id: 'Bad', label: 'Ванная', img: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&q=80&w=400' },
                  { id: 'Küche', label: 'Кухня', img: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=400' },
                  { id: 'Wohnung', label: 'Квартира', img: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&q=80&w=400' },
                  { id: 'Haus', label: 'Дом', img: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&q=80&w=400' }
                ].map((t) => (
                  <button 
                    key={t.id}
                    onClick={() => handleTypeSelect(t.id as RenovationType)}
                    className={`p-6 rounded-none border-2 transition-all text-left group ${
                      data.type === t.id ? 'border-[#1a1a1a] bg-[#1a1a1a]/5' : 'border-gray-100 hover:border-gray-200'
                    }`}
                  >
                    <div className="aspect-video rounded-none bg-gray-100 mb-4 overflow-hidden">
                      <img src={t.img} alt={t.label} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                    </div>
                    <span className="font-bold text-sm uppercase tracking-widest text-[#1a1a1a]">{t.label}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div 
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <h2 className="text-3xl font-bold text-[#1a1a1a] mb-8 text-center uppercase tracking-tighter">Какая примерная площадь?</h2>
              <div className="bg-[#f8f9fa] p-12 rounded-none text-center">
                <div className="text-6xl font-bold text-[#1a1a1a] mb-8 tracking-tighter">{data.area} m²</div>
                <input 
                  type="range" 
                  min="0" 
                  max="200" 
                  value={data.area}
                  onChange={(e) => setData({ ...data, area: parseInt(e.target.value) })}
                  className="w-full h-1 bg-gray-200 rounded-none appearance-none cursor-pointer accent-[#1a1a1a]"
                />
                <div className="flex justify-between mt-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  <span>0 m²</span>
                  <span>200+ m²</span>
                </div>
              </div>
              <div className="flex justify-between mt-12">
                <button onClick={prevStep} className="flex items-center gap-2 text-gray-400 font-bold uppercase text-[10px] tracking-widest hover:text-gray-600 transition-colors">
                  <ChevronLeft size={16} /> Назад
                </button>
                <button onClick={nextStep} className="px-10 py-4 bg-[#1a1a1a] text-white font-bold uppercase text-[10px] tracking-widest hover:bg-black transition-all flex items-center gap-2">
                  Далее <ChevronRight size={16} />
                </button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div 
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <h2 className="text-3xl font-bold text-[#1a1a1a] mb-8 text-center uppercase tracking-tighter">В каком стиле должен быть дизайн?</h2>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { id: 'Modern', label: 'Модерн', img: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&q=80&w=400' },
                  { id: 'Klassisch', label: 'Классика', img: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=400' },
                  { id: 'Skandinavisch', label: 'Скандинавский', img: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&q=80&w=400' },
                  { id: 'Loft', label: 'Лофт', img: 'https://images.unsplash.com/photo-1505691938895-1758d7eaa511?auto=format&fit=crop&q=80&w=400' }
                ].map((s) => (
                  <button 
                    key={s.id}
                    onClick={() => handleStyleSelect(s.id as DesignStyle)}
                    className={`p-6 rounded-none border-2 transition-all text-left group ${
                      data.style === s.id ? 'border-[#1a1a1a] bg-[#1a1a1a]/5' : 'border-gray-100 hover:border-gray-200'
                    }`}
                  >
                    <div className="aspect-video rounded-none bg-gray-100 mb-4 overflow-hidden">
                      <img src={s.img} alt={s.label} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                    </div>
                    <span className="font-bold text-sm uppercase tracking-widest text-[#1a1a1a]">{s.label}</span>
                  </button>
                ))}
              </div>
              <div className="flex justify-between mt-12">
                <button onClick={prevStep} className="flex items-center gap-2 text-gray-400 font-bold uppercase text-[10px] tracking-widest hover:text-gray-600 transition-colors">
                  <ChevronLeft size={16} /> Назад
                </button>
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div 
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <h2 className="text-3xl font-bold text-[#1a1a1a] mb-8 text-center uppercase tracking-tighter">Загрузите фото помещения</h2>
              <div className="border-2 border-dashed border-gray-200 rounded-none p-12 text-center hover:border-[#1a1a1a] transition-colors cursor-pointer group">
                <input 
                  type="file" 
                  className="hidden" 
                  id="photo-upload" 
                  onChange={(e) => setData({ ...data, photo: e.target.files?.[0] || null })}
                />
                <label htmlFor="photo-upload" className="cursor-pointer">
                  <div className="w-20 h-20 bg-[#f8f9fa] rounded-none flex items-center justify-center mx-auto mb-6 group-hover:bg-[#1a1a1a] group-hover:text-white transition-all">
                    <Upload size={32} />
                  </div>
                  <p className="text-sm font-bold text-[#1a1a1a] mb-2 uppercase tracking-widest">Выбрать фото</p>
                  <p className="text-[10px] text-gray-400 uppercase tracking-[0.2em]">Или перетащите сюда</p>
                  {data.photo && <p className="mt-4 text-green-600 font-bold text-xs uppercase tracking-widest">✓ {data.photo.name}</p>}
                </label>
              </div>
              <div className="flex justify-between mt-12">
                <button onClick={prevStep} className="flex items-center gap-2 text-gray-400 font-bold uppercase text-[10px] tracking-widest hover:text-gray-600 transition-colors">
                  <ChevronLeft size={16} /> Назад
                </button>
                <button onClick={nextStep} className="px-10 py-4 bg-[#1a1a1a] text-white font-bold uppercase text-[10px] tracking-widest hover:bg-black transition-all flex items-center gap-2">
                  Далее <ChevronRight size={16} />
                </button>
              </div>
            </motion.div>
          )}

          {step === 5 && (
            <motion.div 
              key="step5"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <h2 className="text-3xl font-bold text-[#1a1a1a] mb-4 text-center uppercase tracking-tighter">Почти готово!</h2>
              <p className="text-gray-500 text-center mb-8 text-sm uppercase tracking-widest">Куда нам отправить результаты?</p>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-[10px] font-bold text-[#1a1a1a] mb-2 uppercase tracking-[0.2em]">Имя / Фамилия *</label>
                  <input 
                    type="text" 
                    required
                    value={data.name}
                    onChange={(e) => setData({ ...data, name: e.target.value })}
                    className="w-full px-6 py-4 rounded-none border border-gray-100 focus:border-[#1a1a1a] outline-none transition-all text-sm"
                    placeholder="Ваше имя"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-[#1a1a1a] mb-2 uppercase tracking-[0.2em]">E-Mail *</label>
                  <input 
                    type="email" 
                    required
                    value={data.email}
                    onChange={(e) => setData({ ...data, email: e.target.value })}
                    className="w-full px-6 py-4 rounded-none border border-gray-100 focus:border-[#1a1a1a] outline-none transition-all text-sm"
                    placeholder="example@mail.ru"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-[#1a1a1a] mb-2 uppercase tracking-[0.2em]">Номер WhatsApp (необязательно)</label>
                  <input 
                    type="tel" 
                    value={data.whatsapp}
                    onChange={(e) => setData({ ...data, whatsapp: e.target.value })}
                    className="w-full px-6 py-4 rounded-none border border-gray-100 focus:border-[#1a1a1a] outline-none transition-all text-sm"
                    placeholder="+7 900 000 00 00"
                  />
                </div>
                
                <div className="flex items-start gap-3 pt-4">
                  <input 
                    type="checkbox" 
                    id="terms" 
                    checked={data.agreedToTerms}
                    onChange={(e) => setData({ ...data, agreedToTerms: e.target.checked })}
                    className="mt-1 w-4 h-4 rounded-none border-gray-300 text-[#1a1a1a] focus:ring-[#1a1a1a]"
                  />
                  <label htmlFor="terms" className="text-[10px] text-gray-500 leading-relaxed uppercase tracking-widest">
                    Я согласен с обработкой данных согласно <a href="#privacy" className="underline font-bold text-[#1a1a1a]">Политике конфиденциальности</a>. *
                  </label>
                </div>

                <button 
                  disabled={!data.name || !data.email || !data.agreedToTerms}
                  onClick={() => onComplete(data)}
                  className="w-full py-5 bg-[#1a1a1a] text-white text-xs font-bold uppercase tracking-[0.2em] hover:bg-black transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-xl active:scale-[0.98]"
                >
                  Запросить результаты
                </button>
              </div>

              <button onClick={prevStep} className="flex items-center gap-2 text-gray-400 font-bold uppercase text-[10px] tracking-widest hover:text-gray-600 transition-colors mt-8 mx-auto">
                <ChevronLeft size={16} /> Назад
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const Trust = () => {
  const features = [
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Соблюдение сроков",
      desc: "Мы фиксируем сроки в договоре и гарантируем их соблюдение."
    },
    {
      icon: <HardHat className="w-6 h-6" />,
      title: "Стандарты качества",
      desc: "Все работы выполняются строго по строительным нормам и стандартам."
    },
    {
      icon: <ShieldCheck className="w-6 h-6" />,
      title: "Прозрачная смета",
      desc: "Мы предоставляем детальный расчет, который остается неизменным."
    }
  ];

  return (
    <section className="py-24 bg-[#f8f9fa]">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-5xl font-bold text-[#1a1a1a] mb-16 text-center tracking-tighter uppercase">
          Наши объекты
        </h2>
        <div className="grid md:grid-cols-3 gap-12 mb-20">
          {features.map((f, idx) => (
            <div key={idx} className="flex flex-col gap-6 p-8 bg-white border border-gray-100">
              <div className="w-12 h-12 bg-[#1a1a1a] text-white flex items-center justify-center">
                {f.icon}
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#1a1a1a] mb-2 uppercase tracking-tight">{f.title}</h3>
                <p className="text-gray-600 leading-relaxed text-sm">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&q=80&w=800",
              "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=800",
              "https://images.unsplash.com/photo-1600585154526-990dcea4db0d?auto=format&fit=crop&q=80&w=800",
              "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=800",
              "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&q=80&w=800",
              "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&q=80&w=800"
            ].map((url, i) => (
              <div key={i} className="aspect-[4/5] overflow-hidden group relative">
                <img 
                  src={url} 
                  alt={`Project ${i}`} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                  <p className="text-white font-bold uppercase tracking-widest text-xs">Объект #{i + 1}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = ({ onShowImpressum, onShowPrivacy }: { onShowImpressum: () => void, onShowPrivacy: () => void }) => {
  return (
    <footer className="bg-[#0a0a0a] text-white py-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-16 mb-20">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-8">
              <div className="w-8 h-8 bg-white flex items-center justify-center">
                <HardHat className="text-[#0a0a0a] w-5 h-5" />
              </div>
              <span className="text-2xl font-bold tracking-tighter uppercase">Saar-Bau Team</span>
            </div>
            <p className="text-gray-500 max-w-sm leading-relaxed text-sm uppercase tracking-widest">
              Ваш партнер по профессиональному строительству и ремонту в Саарланде.
            </p>
            <div className="flex gap-6 mt-8">
              <a href="https://wa.me/49123456789" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-[#25D366] transition-colors">
                <MessageCircle size={24} />
              </a>
              <a href="https://t.me/saarbauteam" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-[#0088cc] transition-colors">
                <Send size={24} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold mb-8 uppercase tracking-[0.3em] text-[10px] text-gray-400">Контакт</h4>
            <ul className="space-y-4 text-gray-500 text-sm">
              <li>Saarland, Deutschland</li>
              <li>info@saar-bau-team.de</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-8 uppercase tracking-[0.3em] text-[10px] text-gray-400">Юридическая информация</h4>
            <ul className="space-y-4 text-gray-500 text-sm">
              <li><button onClick={onShowImpressum} className="hover:text-white transition-colors">Impressum</button></li>
              <li><button onClick={onShowPrivacy} className="hover:text-white transition-colors">Datenschutzerklärung</button></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] text-gray-600 uppercase tracking-[0.2em] font-bold">
          <p>© 2026 Saar-Bau Team. Все права защищены.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors flex items-center gap-2">
              <Instagram size={16} />
              <span>Instagram</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const LegalModal = ({ title, content, onClose }: { title: string, content: React.ReactNode, onClose: () => void }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
    >
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white w-full max-w-4xl max-h-[80vh] overflow-hidden flex flex-col shadow-2xl"
      >
        <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <h2 className="text-xl font-bold uppercase tracking-widest text-[#1a1a1a]">{title}</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-200 transition-colors">
            <X size={24} />
          </button>
        </div>
        <div className="p-8 overflow-y-auto text-gray-600 leading-relaxed text-sm">
          {content}
        </div>
      </motion.div>
    </motion.div>
  );
};

const ImpressumContent = () => (
  <div className="space-y-6 text-left">
    <section>
      <h3 className="font-bold text-[#1a1a1a] mb-2 uppercase tracking-wider">Angaben gemäß § 5 TMG</h3>
      <p>Saar-Bau Team<br />Musterstraße 123<br />66111 Saarbrücken</p>
    </section>
    <section>
      <h3 className="font-bold text-[#1a1a1a] mb-2 uppercase tracking-wider">Vertreten durch</h3>
      <p>Arsen Ametov</p>
    </section>
    <section>
      <h3 className="font-bold text-[#1a1a1a] mb-2 uppercase tracking-wider">Kontakt</h3>
      <p>E-Mail: info@saar-bau-team.de</p>
    </section>
    <section>
      <h3 className="font-bold text-[#1a1a1a] mb-2 uppercase tracking-wider">Umsatzsteuer-ID</h3>
      <p>Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:<br />DE 123456789</p>
    </section>
    <section>
      <h3 className="font-bold text-[#1a1a1a] mb-2 uppercase tracking-wider">Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h3>
      <p>Arsen Ametov<br />Musterstraße 123<br />66111 Saarbrücken</p>
    </section>
  </div>
);

const PrivacyContent = () => (
  <div className="space-y-6 text-left">
    <h3 className="font-bold text-[#1a1a1a] mb-2 uppercase tracking-wider">1. Datenschutz auf einen Blick</h3>
    <p>Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen.</p>
    
    <h3 className="font-bold text-[#1a1a1a] mb-2 uppercase tracking-wider">2. Datenerfassung auf unserer Website</h3>
    <p>Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Impressum dieser Website entnehmen.</p>
    
    <h3 className="font-bold text-[#1a1a1a] mb-2 uppercase tracking-wider">3. Analyse-Tools und Tools von Drittanbietern</h3>
    <p>Beim Besuch dieser Website kann Ihr Surf-Verhalten statistisch ausgewertet werden. Das geschieht vor allem mit Cookies und mit sogenannten Analyseprogrammen.</p>
    
    <h3 className="font-bold text-[#1a1a1a] mb-2 uppercase tracking-wider">4. Ihre Rechte</h3>
    <p>Sie haben jederzeit das Recht unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten.</p>
  </div>
);

const ThankYou = () => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-xl w-full text-center"
      >
        <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
          <CheckCircle2 size={48} />
        </div>
        <h1 className="text-4xl font-bold text-[#003366] mb-6">Спасибо! Ваш запрос обрабатывается.</h1>
        <p className="text-xl text-gray-600 mb-10 leading-relaxed">
          Наш ИИ-ассистент и специалисты уже начали работу над вашим проектом. 
          Ожидайте PDF-отчет в течение 24 часов. А пока подпишитесь на наш Instagram, 
          чтобы посмотреть наши последние работы!
        </p>
        <a 
          href="https://instagram.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-full shadow-xl hover:shadow-2xl transition-all active:scale-95"
        >
          <Instagram size={24} />
          <span>Подпишитесь на наш Instagram</span>
        </a>
      </motion.div>
    </div>
  );
};

const AboutUs = () => {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-16 items-center">
        <div className="relative aspect-[3/4] overflow-hidden shadow-2xl">
          <img 
            src="https://scontent-fra3-2.xx.fbcdn.net/v/t39.30808-6/619251008_25957312983892753_2068975750634700272_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=13d280&_nc_ohc=Mmaoto8PhOwQ7kNvwF84uy6&_nc_oc=AdqwLTBjJms1TjNswHIHuZCjSgratJoKvLfdL4-Qzsb0TmMBgTpJ97yf3Gd3-l95LW8&_nc_zt=23&_nc_ht=scontent-fra3-2.xx&_nc_gid=f96pfn4zcdbBIVyVrXW77Q&_nc_ss=7a3a8&oh=00_AfzYsBxCAfYrhPkvmWNhqiw9eDeSOfjNWbIaNgiIheXZVw&oe=69D05BB7" 
            alt="Founder" 
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 border-[20px] border-white/10 pointer-events-none" />
          <div className="absolute bottom-8 left-8 bg-[#1a1a1a] p-6 text-white">
            <p className="text-xl font-bold uppercase tracking-widest">Арсен Аметов</p>
            <p className="text-xs opacity-60 uppercase tracking-widest mt-1">Основатель Saar-Bau Team</p>
          </div>
        </div>
        <div>
          <div className="w-12 h-12 bg-[#1a1a1a] flex items-center justify-center text-white mb-8">
            <Users size={24} />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-[#1a1a1a] mb-8 tracking-tighter uppercase">Кто мы такие?</h2>
          <p className="text-lg text-gray-600 mb-6 leading-relaxed">
            Мы — профессиональная команда с опытом работы, работаем по всей земле Саарланд. Наша миссия — сделать процесс ремонта прозрачным и предсказуемым для каждого клиента.
          </p>
          <p className="text-lg text-gray-600 mb-10 leading-relaxed">
            Используя современные технологии и более чем 10-летний опыт в строительстве, мы помогаем вам реализовать самые смелые проекты качественно и в срок.
          </p>
          <div className="grid grid-cols-2 gap-0 border border-gray-100">
            <div className="p-8 border-r border-gray-100">
              <p className="text-4xl font-bold text-[#1a1a1a] mb-1 tracking-tighter">10+</p>
              <p className="text-[10px] text-gray-400 uppercase font-bold tracking-[0.2em]">Лет опыта</p>
            </div>
            <div className="p-8">
              <p className="text-4xl font-bold text-[#1a1a1a] mb-1 tracking-tighter">100%</p>
              <p className="text-[10px] text-gray-400 uppercase font-bold tracking-[0.2em]">Качество</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const FAQ = () => {
  const faqs = [
    {
      q: "Насколько точен расчет стоимости?",
      a: "Наш алгоритм дает ориентировочную стоимость с точностью до 85-90% на основе ваших ответов. Финальная смета составляется после бесплатного выезда нашего специалиста на замер."
    },
    {
      q: "Это действительно бесплатно?",
      a: "Да, расчет стоимости и ИИ-визуализация предоставляются абсолютно бесплатно и без обязательств с вашей стороны."
    },
    {
      q: "Как работает ИИ-дизайн?",
      a: "Мы используем нейросети, обученные на тысячах современных интерьеров, чтобы на основе вашего фото создать реалистичный концепт в выбранном вами стиле."
    }
  ];

  return (
    <section className="py-24 bg-[#f8f9fa]">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-[#003366] mb-16 text-center">Часто задаваемые вопросы</h2>
        <div className="space-y-6">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <div className="flex gap-4 items-start">
                <HelpCircle className="text-[#003366] flex-shrink-0 mt-1" size={24} />
                <div>
                  <h4 className="text-lg font-bold text-[#003366] mb-3">{faq.q}</h4>
                  <p className="text-gray-600 leading-relaxed">{faq.a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default function App() {
  const [showQuiz, setShowQuiz] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [lang, setLang] = useState<Language>('ru');
  const [showImpressum, setShowImpressum] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);

  const handleQuizComplete = (data: QuizData) => {
    console.log('Quiz Data:', data);
    // Here you would typically send data to your CRM/API
    setShowQuiz(false);
    setIsSubmitted(true);
    window.scrollTo(0, 0);
  };

  if (isSubmitted) {
    return <ThankYou />;
  }

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 selection:bg-[#003366] selection:text-white">
      <Header 
        onStartQuiz={() => setShowQuiz(true)} 
        currentLang={lang}
        onLangChange={setLang}
      />
      
      <main>
        <Hero onStartQuiz={() => setShowQuiz(true)} />
        <HowItWorks />
        <AboutUs />
        <Trust />
        <FAQ />
      </main>
      
      <Footer 
        onShowImpressum={() => setShowImpressum(true)}
        onShowPrivacy={() => setShowPrivacy(true)}
      />
      
      <AnimatePresence>
        {showQuiz && (
          <Quiz 
            onCancel={() => setShowQuiz(false)} 
            onComplete={handleQuizComplete} 
          />
        )}
        {showImpressum && (
          <LegalModal 
            title="Impressum" 
            content={<ImpressumContent />} 
            onClose={() => setShowImpressum(false)} 
          />
        )}
        {showPrivacy && (
          <LegalModal 
            title="Datenschutzerklärung" 
            content={<PrivacyContent />} 
            onClose={() => setShowPrivacy(false)} 
          />
        )}
      </AnimatePresence>
      
      <CookieBanner />
    </div>
  );
}

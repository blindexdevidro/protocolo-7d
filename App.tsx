import React, { useState, useEffect } from 'react';
import { Counter } from './components/Counter';
import { NotificationToast } from './components/NotificationToast';

const CountdownTimer: React.FC = () => {
  const [seconds, setSeconds] = useState(15 * 60);

  useEffect(() => {
    if (seconds <= 0) return;
    const timer = setInterval(() => {
      setSeconds(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [seconds]);

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-pink-100 text-pink-700 font-black px-4 py-2 rounded-xl inline-flex items-center space-x-2 text-sm md:text-base border border-pink-200">
      <svg className="w-5 h-5 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span>EXPIRA EM: {formatTime(seconds)}</span>
    </div>
  );
};

const FAQItem: React.FC<{ question: string; answer: React.ReactNode }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-slate-200 last:border-0">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex justify-between items-center text-left focus:outline-none group"
      >
        <span className="text-lg md:text-xl font-bold text-slate-800 group-hover:text-pink-600 transition-colors">{question}</span>
        <span className={`text-pink-500 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-[800px] pb-6' : 'max-h-0'}`}>
        <div className="text-slate-600 leading-relaxed md:text-lg">
          {answer}
        </div>
      </div>
    </div>
  );
};

const UpsellModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/90 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white rounded-[2.5rem] max-w-lg w-full overflow-hidden shadow-2xl border-4 border-pink-500 animate-in zoom-in-95 duration-300">
        <div className="bg-pink-600 text-white py-4 px-6 text-center">
          <h4 className="text-xl md:text-2xl font-black uppercase tracking-tighter italic">😱 ESPERA! NÃO VÁ AINDA...</h4>
        </div>
        <div className="p-8 text-center">
          <p className="text-slate-800 text-lg md:text-xl font-bold mb-6">
            Você escolheu o plano essencial, mas temos uma <span className="text-pink-600">oportunidade única</span> para você agora!
          </p>
          <div className="bg-pink-50 rounded-2xl p-6 border-2 border-dashed border-pink-200 mb-8">
            <p className="text-slate-600 text-sm font-medium mb-2 uppercase tracking-widest">Leve o Pacote Completo + Todos os Bônus</p>
            <div className="flex items-center justify-center space-x-2">
              <span className="text-slate-400 line-through text-lg font-bold">R$ 197</span>
              <span className="text-slate-900 font-black text-4xl">R$ 19,90</span>
            </div>
            <p className="text-pink-600 font-bold text-xs mt-2 italic animate-pulse">✨ Economia de mais de R$ 170 reais ✨</p>
          </div>
          
          <div className="space-y-4">
            <a 
              href="https://go.tribopay.com.br/iaf95"
              className="block w-full bg-pink-600 text-white font-black py-5 rounded-2xl hover:bg-pink-700 transition-all shadow-xl shadow-pink-200 text-lg uppercase tracking-tight transform hover:scale-[1.02] active:scale-95"
            >
              SIM! QUERO O PACOTE COMPLETO POR 19,90
            </a>
            <a 
              href="https://go.tribopay.com.br/npr6yerlcl"
              className="block w-full text-slate-400 font-bold py-2 text-sm hover:text-slate-600 transition-colors"
            >
              Não, quero somente o protocolo de 9,90 mesmo
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [todayDate, setTodayDate] = useState('');
  const [isUpsellOpen, setIsUpsellOpen] = useState(false);

  useEffect(() => {
    const date = new Date();
    const formatted = date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
    setTodayDate(formatted);
  }, []);

  const scrollToPricing = () => {
    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen selection:bg-pink-200 antialiased bg-white">
      <UpsellModal isOpen={isUpsellOpen} onClose={() => setIsUpsellOpen(false)} />
      
      {/* Top Promo Bar */}
      <div className="bg-slate-900 text-white text-[10px] md:text-xs py-2.5 px-4 text-center font-bold tracking-widest uppercase sticky top-0 z-[60]">
        🔥 Promoção válida somente hoje, {todayDate}
      </div>

      <NotificationToast />

      {/* Hero Section */}
      <header className="gradient-bg pt-10 md:pt-16 pb-16 md:pb-24 px-5 overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative">
          <div className="inline-block bg-pink-100 text-pink-600 px-4 py-1.5 rounded-full text-[10px] md:text-xs font-bold tracking-widest uppercase mb-6 animate-pulse border border-pink-200">
            🚨 A transformação que você precisa
          </div>
          
          <h1 className="text-3xl md:text-6xl font-extrabold text-slate-900 leading-tight mb-6 text-balance">
            Em apenas 7 dias, você vai organizar sua rotina, recuperar seu dinheiro e <span className="text-pink-600 italic underline decoration-pink-200">mudar o resto do seu ano</span>
          </h1>

          <div className="relative inline-block mb-10 group">
            <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 to-rose-400 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative bg-white border-2 border-pink-100 px-6 py-4 md:px-12 md:py-6 rounded-2xl shadow-xl">
              <h2 className="text-2xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter md:tracking-tight leading-none text-balance">
                <span className="text-pink-600">Protocolo</span> <span className="text-slate-900">Vida Próspera 7D</span>
              </h2>
            </div>
          </div>
          
          <p className="text-lg md:text-xl text-slate-700 font-medium mb-8 max-w-2xl mx-auto leading-relaxed">
            O método prático para mulheres que trabalham muito, mas sentem que o dinheiro some no caos do dia a dia.
          </p>
          
          <div className="bg-white/90 backdrop-blur shadow-sm inline-block px-5 py-4 rounded-xl border border-pink-100 mb-10 max-w-sm md:max-w-none">
            <p className="text-slate-600 text-sm md:text-base italic">
              💡 Prosperidade não é sobre quanto você ganha, é sobre como você organiza o que já tem.
            </p>
          </div>
          
          <button 
            onClick={scrollToPricing}
            className="block w-full md:w-auto md:mx-auto bg-pink-600 hover:bg-pink-700 text-white font-extrabold text-lg md:text-xl px-12 py-5 rounded-2xl md:rounded-full shadow-xl transition-all transform hover:scale-105 active:scale-95 mb-4"
          >
            QUERO MUDAR MINHA VIDA AGORA
          </button>
          <p className="text-xs md:text-sm text-slate-400 font-medium">Acesso imediato • Pagamento Único • Garantia de 7 dias</p>
        </div>
      </header>

      {/* Stats Section */}
      <section className="bg-slate-900 py-5 px-4">
        <div className="max-w-4xl mx-auto text-center text-white">
          <p className="text-base md:text-xl font-medium tracking-wide">
            ✨ <span className="text-pink-400 font-bold text-xl md:text-2xl"><Counter target={10000} duration={3000} />+</span> mulheres já mudaram de vida com este método
          </p>
        </div>
      </section>

      {/* Identification Section */}
      <section className="py-16 md:py-24 px-5 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 md:mb-14 text-slate-900 leading-tight uppercase">❓ Isso aqui tem a ver com você?</h2>
          <div className="space-y-4 md:space-y-6">
            {[
              "Você sente que trabalha, se esforça, mas o dinheiro nunca sobra?",
              "Tem a sensação de que faz muito e não sai do lugar?",
              "Chega no fim do dia esgotada e sem tempo pra você?",
              "Vive gastando por impulso ou conveniência porque está sempre correndo?",
              "Quer começar novos projetos, mas a procrastinação vence sempre?"
            ].map((q, i) => (
              <div key={i} className="flex items-start space-x-3 md:space-x-4 p-4 md:p-5 border border-slate-100 rounded-2xl hover:bg-pink-50 transition-colors shadow-sm md:shadow-none">
                <div className="bg-pink-100 text-pink-600 p-1.5 rounded-full shrink-0">
                  <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                </div>
                <p className="text-base md:text-lg text-slate-700 leading-tight font-medium">{q}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 md:mt-16 text-center px-4">
            <p className="text-xl md:text-2xl font-bold text-slate-900 mb-2 text-balance">👉 O problema não é falta de capacidade.</p>
            <p className="text-lg md:text-xl text-pink-600 font-semibold italic">É falta de um protocolo simples de organização.</p>
          </div>
        </div>
      </section>

      {/* Protocol Breakdown Section */}
      <section className="py-20 px-5 bg-white overflow-hidden border-t border-slate-100">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-black mb-6 text-slate-900 leading-tight uppercase tracking-tight">✅ O que é o PROTOCOLO VIDA PRÓSPERA 7D?</h2>
            <div className="flex flex-wrap justify-center gap-4 mb-10">
              <span className="bg-red-50 text-red-600 border border-red-100 px-4 py-2 rounded-full font-bold text-sm">✕ Não é um planner</span>
              <span className="bg-red-50 text-red-600 border border-red-100 px-4 py-2 rounded-full font-bold text-sm">✕ Não é um curso longo</span>
              <span className="bg-red-50 text-red-600 border border-red-100 px-4 py-2 rounded-full font-bold text-sm">✕ Não é motivação</span>
            </div>
            
            <div className="space-y-4 text-left max-w-2xl mx-auto bg-slate-50 p-8 rounded-3xl border border-slate-100 mb-16 shadow-inner">
              <p className="text-lg md:text-xl text-slate-800 font-bold flex items-start">
                <span className="text-green-500 mr-3 text-2xl">✔️</span> <span>É um <span className="text-pink-600 underline decoration-pink-200">PROTOCOLO DE EXECUÇÃO</span>, com começo, meio e fim.</span>
              </p>
              <p className="text-lg md:text-xl text-slate-800 font-bold flex items-start">
                <span className="text-green-500 mr-3 text-2xl">✔️</span> <span>Criado para mulheres reais, com rotina cheia.</span>
              </p>
              <p className="text-lg md:text-xl text-slate-800 font-bold flex items-start">
                <span className="text-green-500 mr-3 text-2xl">✔️</span> <span>Resultados visíveis em 7 dias de aplicação prática.</span>
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-1 bg-pink-100 hidden md:block"></div>
            <h3 className="text-2xl md:text-4xl font-black text-slate-900 mb-12 text-center uppercase tracking-tighter">🗓️ COMO FUNCIONA O PROTOCOLO (7 DIAS)</h3>
            
            <div className="space-y-12 relative">
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 md:pr-12 md:text-right mb-4 md:mb-0">
                  <h4 className="text-2xl font-black text-pink-600">Dia 1</h4>
                  <p className="text-xl font-bold text-slate-900 uppercase tracking-tight">Limpeza do Caos</p>
                </div>
                <div className="z-10 bg-pink-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-black shadow-lg">1</div>
                <div className="md:w-1/2 md:pl-12">
                  <p className="text-slate-600 leading-relaxed font-medium">Organização mental + centralização de tudo em um único lugar.</p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 md:pr-12 md:text-right mb-4 md:mb-0">
                  <h4 className="text-2xl font-black text-pink-600">Dias 2 e 3</h4>
                  <p className="text-xl font-bold text-slate-900 uppercase tracking-tight">Rotina em Ordem</p>
                </div>
                <div className="z-10 bg-pink-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-black shadow-lg">2</div>
                <div className="md:w-1/2 md:pl-12">
                  <p className="text-slate-600 leading-relaxed font-medium">Planejamento semanal, prioridades claras e fim do improviso.</p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 md:pr-12 md:text-right mb-4 md:mb-0">
                  <h4 className="text-2xl font-black text-pink-600">Dias 4 e 5</h4>
                  <p className="text-xl font-bold text-slate-900 uppercase tracking-tight">Dinheiro Sob Controle</p>
                </div>
                <div className="z-10 bg-pink-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-black shadow-lg">3</div>
                <div className="md:w-1/2 md:pl-12">
                  <p className="text-slate-600 leading-relaxed font-medium">Mapeamento de gastos, controle simples e eliminação de vazamentos.</p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 md:pr-12 md:text-right mb-4 md:mb-0">
                  <h4 className="text-2xl font-black text-pink-600">Dias 6 e 7</h4>
                  <p className="text-xl font-bold text-slate-900 uppercase tracking-tight">Manutenção Prática</p>
                </div>
                <div className="z-10 bg-pink-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-black shadow-lg">4</div>
                <div className="md:w-1/2 md:pl-12">
                  <p className="text-slate-600 leading-relaxed font-medium">Como manter tudo funcionando sem recomeçar do zero.</p>
                </div>
              </div>
            </div>

            <div className="mt-16 p-8 bg-pink-600 text-white rounded-3xl text-center shadow-xl transform rotate-1">
              <p className="text-2xl md:text-3xl font-black leading-tight uppercase">
                🔥 Em 7 dias, você passa a ter tudo isso usando um único sistema simples.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Uso Digital ou Impresso Categories */}
      <section className="py-20 px-5 bg-white border-y border-slate-100 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black mb-4 leading-tight uppercase tracking-tight text-slate-900">Uso digital ou impresso</h2>
            <p className="text-slate-500 max-w-2xl mx-auto font-medium md:text-lg">As ferramentas fundamentais que você vai ter em mãos:</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100 flex flex-col shadow-sm">
              <h4 className="font-black text-slate-900 mb-6 flex items-center space-x-3">
                <span className="text-2xl text-pink-600">🔹</span> <span className="leading-tight uppercase text-sm md:text-base">Organização pessoal e autocuidado</span>
              </h4>
              <ul className="space-y-3 text-slate-600 text-sm font-bold flex-grow">
                <li>• Controle de hábitos</li>
                <li>• Autoconhecimento e espiritualidade</li>
                <li>• Skincare</li>
                <li>• Controle de menstruação</li>
                <li>• Metas de relacionamento</li>
              </ul>
            </div>

            <div className="bg-pink-50/30 p-8 rounded-[2rem] border border-pink-100 flex flex-col shadow-sm">
              <h4 className="font-black text-slate-900 mb-6 flex items-center space-x-3">
                <span className="text-2xl text-pink-600">🔹</span> <span className="leading-tight uppercase text-sm md:text-base">Planejamento de vida e projetos</span>
              </h4>
              <ul className="space-y-3 text-slate-600 text-sm font-bold flex-grow">
                <li>• Roda da Vida</li>
                <li>• Metas estratégicas</li>
                <li>• Plano de ação</li>
                <li>• Planejamento semanal</li>
                <li>• Organização profissional</li>
                <li>• Controle financeiro mensal</li>
              </ul>
            </div>

            <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100 flex flex-col shadow-sm">
              <h4 className="font-black text-slate-900 mb-6 flex items-center space-x-3">
                <span className="text-2xl text-pink-600">🔹</span> <span className="leading-tight uppercase text-sm md:text-base">Organização da casa</span>
              </h4>
              <ul className="space-y-3 text-slate-600 text-sm font-bold flex-grow">
                <li>• Lista de compras</li>
                <li>• Cardápio semanal</li>
                <li>• Controle de limpeza</li>
              </ul>
            </div>

            <div className="bg-pink-50/30 p-8 rounded-[2rem] border border-pink-100 flex flex-col shadow-sm">
              <h4 className="font-black text-slate-900 mb-6 flex items-center space-x-3">
                <span className="text-2xl text-pink-600">🔹</span> <span className="leading-tight uppercase text-sm md:text-base">Planejamento de viagem</span>
              </h4>
              <p className="text-slate-500 text-sm font-bold leading-relaxed">Planejamento completo e detalhado para suas próximas férias sem sustos financeiros.</p>
            </div>
          </div>
        </div>
      </section>

      {/* MEGA PACOTE DE BÔNUS EXCLUSIVOS */}
      <section className="py-24 px-5 bg-slate-50 border-y border-slate-100 overflow-hidden relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-7xl font-black mb-4 leading-tight uppercase tracking-tighter text-slate-900">
              🎁 MEGA PACOTE <br/>
              <span className="text-pink-600">DE BÔNUS EXCLUSIVOS</span>
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto font-medium md:text-xl italic">
              Estes materiais premium e ferramentas extras estão inclusos no seu acesso sem custo adicional se você garantir sua vaga hoje.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            <div className="group bg-slate-900 p-8 rounded-[2.5rem] border border-slate-800 hover:border-pink-500/50 transition-all duration-300 shadow-2xl">
              <div className="flex items-start justify-between mb-4">
                <h4 className="text-2xl font-black text-white uppercase tracking-tight leading-tight">Planner Meus Sentimentos</h4>
                <div className="bg-pink-600 text-white text-[10px] px-3 py-1 rounded-full font-bold shadow-lg shadow-pink-900/50 uppercase">GRÁTIS HOJE</div>
              </div>
              <p className="text-slate-400 mb-8 font-medium">Acompanhe emoções, energia, água e exercícios diariamente de forma intuitiva.</p>
              <div className="flex items-center space-x-3">
                <span className="text-slate-600 line-through font-bold text-lg">R$ 37</span>
                <span className="text-pink-500 font-black text-2xl tracking-tighter uppercase">por GRÁTIS</span>
              </div>
            </div>

            <div className="group bg-slate-900 p-8 rounded-[2.5rem] border border-slate-800 hover:border-pink-500/50 transition-all duration-300 shadow-2xl">
              <div className="flex items-start justify-between mb-4">
                <h4 className="text-2xl font-black text-white uppercase tracking-tight leading-tight">Guia Planejamento de Rotina</h4>
                <div className="bg-pink-600 text-white text-[10px] px-3 py-1 rounded-full font-bold shadow-lg shadow-pink-900/50 uppercase">GRÁTIS HOJE</div>
              </div>
              <p className="text-slate-400 mb-8 font-medium">Organize seu tempo diário e semanal sem sacrificar sua saúde mental.</p>
              <div className="flex items-center space-x-3">
                <span className="text-slate-600 line-through font-bold text-lg">R$ 27</span>
                <span className="text-pink-500 font-black text-2xl tracking-tighter uppercase">por GRÁTIS</span>
              </div>
            </div>

            <div className="group bg-slate-900 p-8 rounded-[2.5rem] border border-slate-800 hover:border-pink-500/50 transition-all duration-300 shadow-2xl">
              <div className="flex items-start justify-between mb-4">
                <h4 className="text-2xl font-black text-white uppercase tracking-tight leading-tight">Guia Ritual Matinal e Noturno</h4>
                <div className="bg-pink-600 text-white text-[10px] px-3 py-1 rounded-full font-bold shadow-lg shadow-pink-900/50 uppercase">GRÁTIS HOJE</div>
              </div>
              <p className="text-slate-400 mb-8 font-medium">Crie rituais simples que sustentam sua rotina e foco o dia todo.</p>
              <div className="flex items-center space-x-3">
                <span className="text-slate-600 line-through font-bold text-lg">R$ 47</span>
                <span className="text-pink-500 font-black text-2xl tracking-tighter uppercase">por GRÁTIS</span>
              </div>
            </div>

            <div className="group bg-slate-900 p-8 rounded-[2.5rem] border border-slate-800 hover:border-pink-500/50 transition-all duration-300 shadow-2xl">
              <div className="flex items-start justify-between mb-4">
                <h4 className="text-2xl font-black text-white uppercase tracking-tight leading-tight">Rotinas de Autocuidado</h4>
                <div className="bg-pink-600 text-white text-[10px] px-3 py-1 rounded-full font-bold shadow-lg shadow-pink-900/50 uppercase">GRÁTIS HOJE</div>
              </div>
              <p className="text-slate-400 mb-8 font-medium">Estratégias poderosas de cuidado pessoal para mulheres com pouco tempo.</p>
              <div className="flex items-center space-x-3">
                <span className="text-slate-600 line-through font-bold text-lg">R$ 47</span>
                <span className="text-pink-500 font-black text-2xl tracking-tighter uppercase">por GRÁTIS</span>
              </div>
            </div>
          </div>

          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-4xl font-black uppercase tracking-tight text-slate-800">
              ⚡ +20 FERRAMENTAS EXTRAS <span className="text-pink-600">(EM 6 CATEGORIAS)</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Category 1 */}
            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-200 hover:shadow-md transition-all">
              <h4 className="flex items-center space-x-2 font-black text-pink-600 mb-6 uppercase tracking-tighter text-lg">
                <span>🧠</span> <span>Clareza & Decisão</span>
              </h4>
              <ul className="space-y-5">
                <li className="flex flex-col">
                  <span className="text-slate-900 font-bold text-sm leading-tight">Checklist “Semana Sob Controle”</span>
                  <span className="text-slate-500 text-[11px] leading-tight">(PDF prático – 1 página) → Para não esquecer nada</span>
                </li>
                <li className="flex flex-col">
                  <span className="text-slate-900 font-bold text-sm leading-tight">Mapa Visual da Vida Próspera</span>
                  <span className="text-slate-500 text-[11px] leading-tight">(Imagem + guia) → Tudo o que importa em uma folha</span>
                </li>
                <li className="flex flex-col">
                  <span className="text-slate-900 font-bold text-sm leading-tight">Lista Antiprocrastinação</span>
                  <span className="text-slate-500 text-[11px] leading-tight">(Printável) → Quando bater preguiça ou cansaço</span>
                </li>
                <li className="flex flex-col">
                  <span className="text-slate-900 font-bold text-sm leading-tight">Roteiro de Decisão Rápida</span>
                  <span className="text-slate-500 text-[11px] leading-tight">(Framework) → Evita indecisão e gastos por impulso</span>
                </li>
              </ul>
            </div>

            {/* Category 2 */}
            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-200 hover:shadow-md transition-all">
              <h4 className="flex items-center space-x-2 font-black text-pink-600 mb-6 uppercase tracking-tighter text-lg">
                <span>⏰</span> <span>Tempo & Produtividade</span>
              </h4>
              <ul className="space-y-5">
                <li className="flex flex-col">
                  <span className="text-slate-900 font-bold text-sm leading-tight">Ladrões de Tempo</span>
                  <span className="text-slate-500 text-[11px] leading-tight">(Checklist) → Para eliminar distrações sem culpa</span>
                </li>
                <li className="flex flex-col">
                  <span className="text-slate-900 font-bold text-sm leading-tight">Tabela “Vale a Pena ou Não?”</span>
                  <span className="text-slate-500 text-[11px] leading-tight">(Tempo x Dinheiro) → Antes de gastar com conveniência</span>
                </li>
                <li className="flex flex-col">
                  <span className="text-slate-900 font-bold text-sm leading-tight">Organização do Domingo à Noite</span>
                  <span className="text-slate-500 text-[11px] leading-tight">(Passo a passo) → Mantenha a semana organizada</span>
                </li>
                <li className="flex flex-col">
                  <span className="text-slate-900 font-bold text-sm leading-tight">Template Prioridades (Método 3×3)</span>
                  <span className="text-slate-500 text-[11px] leading-tight">→ Só 3 prioridades reais por área</span>
                </li>
              </ul>
            </div>

            {/* Category 3 */}
            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-200 hover:shadow-md transition-all">
              <h4 className="flex items-center space-x-2 font-black text-pink-600 mb-6 uppercase tracking-tighter text-lg">
                <span>💸</span> <span>Controle Financeiro</span>
              </h4>
              <ul className="space-y-5">
                <li className="flex flex-col">
                  <span className="text-slate-900 font-bold text-sm leading-tight">Gastos Invisíveis Femininos</span>
                  <span className="text-slate-500 text-[11px] leading-tight">(Checklist) → Beleza, delivery, apps, etc</span>
                </li>
                <li className="flex flex-col">
                  <span className="text-slate-900 font-bold text-sm leading-tight">Planilha “Dinheiro Consciente”</span>
                  <span className="text-slate-500 text-[11px] leading-tight">(Minimalista) → Sem categorias complexas</span>
                </li>
                <li className="flex flex-col">
                  <span className="text-slate-900 font-bold text-sm leading-tight">Revisão Financeira de 15 min</span>
                  <span className="text-slate-500 text-[11px] leading-tight">(Roteiro) → Manter controle sem sofrimento</span>
                </li>
                <li className="flex flex-col">
                  <span className="text-slate-900 font-bold text-sm leading-tight">Desafio 7 Dias Sem Vazamento</span>
                  <span className="text-slate-500 text-[11px] leading-tight">(Mini-desafio) → Acelera resultados imediatos</span>
                </li>
              </ul>
            </div>

            {/* Category 4 */}
            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-200 hover:shadow-md transition-all">
              <h4 className="flex items-center space-x-2 font-black text-pink-600 mb-6 uppercase tracking-tighter text-lg">
                <span>🧘‍♀️</span> <span>Energia & Emocional</span>
              </h4>
              <ul className="space-y-5">
                <li className="flex flex-col">
                  <span className="text-slate-900 font-bold text-sm leading-tight">Áudio: Organização Mental</span>
                  <span className="text-slate-500 text-[11px] leading-tight">(10 min) → Para usar antes de planejar o dia</span>
                </li>
                <li className="flex flex-col">
                  <span className="text-slate-900 font-bold text-sm leading-tight">Áudio: Reset Emocional</span>
                  <span className="text-slate-500 text-[11px] leading-tight Para dias caóticos → Evita decisões impulsivas</span>
                </li>
                <li className="flex flex-col">
                  <span className="text-slate-900 font-bold text-sm leading-tight">Lista de Autocuidado Essencial</span>
                  <span className="text-slate-500 text-[11px] leading-tight">Sem luxo, sem culpa → O mínimo para funcionar bem</span>
                </li>
              </ul>
            </div>

            {/* Category 5 */}
            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-200 hover:shadow-md transition-all">
              <h4 className="flex items-center space-x-2 font-black text-pink-600 mb-6 uppercase tracking-tighter text-lg">
                <span>🏠</span> <span>Rotina Doméstica</span>
              </h4>
              <ul className="space-y-5">
                <li className="flex flex-col">
                  <span className="text-slate-900 font-bold text-sm leading-tight">Casa em Ordem (30 min/dia)</span>
                  <span className="text-slate-500 text-[11px] leading-tight">(Roteiro) → Sem faxina pesada</span>
                </li>
                <li className="flex flex-col">
                  <span className="text-slate-900 font-bold text-sm leading-tight">Lista Mestre de Compras</span>
                  <span className="text-slate-500 text-[11px] leading-tight">(Econômica) → Reduz desperdício drasticamente</span>
                </li>
              </ul>
            </div>

            {/* Category 6 */}
            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-200 hover:shadow-md transition-all">
              <h4 className="flex items-center space-x-2 font-black text-pink-600 mb-6 uppercase tracking-tighter text-lg">
                <span>🎯</span> <span>Consistência</span>
              </h4>
              <ul className="space-y-5">
                <li className="flex flex-col">
                  <span className="text-slate-900 font-bold text-sm leading-tight">Calendário de Manutenção Mensal</span>
                  <span className="text-slate-500 text-[11px] leading-tight">Não deixa a rotina desandar</span>
                </li>
                <li className="flex flex-col">
                  <span className="text-slate-900 font-bold text-sm leading-tight">Guia “Como Voltar em 1 Dia”</span>
                  <span className="text-slate-500 text-[11px] leading-tight">Se você sair do protocolo → Elimina a culpa</span>
                </li>
                <li className="flex flex-col">
                  <span className="text-slate-900 font-bold text-sm leading-tight">Contrato Pessoal de Compromisso</span>
                  <span className="text-slate-500 text-[11px] leading-tight">(Printável) → Aumenta taxa de execução absurda</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* For Whom Section */}
      <section className="py-20 px-5 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
            <div className="bg-green-50/50 p-8 rounded-3xl border border-green-100 shadow-sm">
              <h3 className="text-2xl font-black text-green-700 mb-8 flex items-center space-x-3 text-balance uppercase">
                <span className="text-3xl">🎯</span>
                <span>Este Protocolo É PARA VOCÊ:</span>
              </h3>
              <ul className="space-y-5">
                {[
                  "Mulheres sobrecarregadas com rotinas cheias",
                  "Quem sente que o dinheiro escapa sem explicação",
                  "Quem quer controle prático, não apenas motivação",
                  "Quem está pronta para executar e ter resultados reais"
                ].map((item, i) => (
                  <li key={i} className="flex items-start space-x-3">
                    <span className="text-green-600 font-bold text-xl leading-none">✔️</span>
                    <span className="text-slate-700 font-medium leading-tight">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-red-50/50 p-8 rounded-3xl border border-red-100 shadow-sm">
              <h3 className="text-2xl font-black text-red-700 mb-8 flex items-center space-x-3 text-balance uppercase">
                <span className="text-3xl">❌</span>
                <span>NÃO É PARA QUEM:</span>
              </h3>
              <ul className="space-y-5">
                {[
                  "Quem busca um milagre sem nenhum esforço",
                  "Quem compra apenas para acumular conteúdo",
                  "Quem não pretende aplicar o método no dia a dia",
                  "Quem não assume responsabilidade pelas próprias decisões"
                ].map((item, i) => (
                  <li key={i} className="flex items-start space-x-3">
                    <span className="text-red-500 font-bold text-xl leading-none">✖️</span>
                    <span className="text-slate-700 font-medium leading-tight">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="bg-pink-50/30 py-16 md:py-24 px-5 border-y border-pink-100">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-bold text-center mb-4 leading-tight uppercase">💬 O que elas estão dizendo...</h2>
          <p className="text-center text-slate-500 mb-12 md:mb-16 text-sm md:text-lg">Resultados reais de quem parou de improvisar a própria rotina.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Mariana Costa", handle: "@marianac_m", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop", text: "Eu achei que precisava ganhar mais pra sobrar dinheiro, mas vi que estava jogando quase 400 reais no lixo com bobeira." },
              { name: "Fernanda Lima", handle: "@fe_lima", img: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=150&h=150&fit=crop", text: "O Protocolo salvou meu casamento. A gente não brigou mais por conta de casa bagunçada e falta de tempo." },
              { name: "Juliana Silva", handle: "@jusilva_org", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop", text: "Pela primeira vez em anos eu sei exatamente para onde meu dinheiro está indo. Sensação de liberdade total!" },
              { name: "Beatriz Alves", handle: "@bia_alves", img: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=150&h=150&fit=crop", text: "Esses 7 dias mudaram meu ano. Já recuperei o valor do protocolo 20 vezes só em gastos que cortei." }
            ].map((t, i) => (
              <div key={i} className="bg-white p-6 rounded-[1.5rem] border border-slate-100 flex flex-col shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center mb-4">
                  <img src={t.img} className="w-10 h-10 rounded-full mr-3 border border-pink-200" alt={t.name} />
                  <div>
                    <p className="font-bold text-xs text-slate-900 leading-tight">{t.name}</p>
                    <p className="text-[10px] text-slate-400">{t.handle}</p>
                  </div>
                </div>
                <p className="text-slate-600 italic text-xs leading-relaxed">"{t.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Warning Section */}
      <section className="py-20 px-5 bg-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-10 uppercase tracking-tighter">🚨 AVISO FINAL</h2>
          <p className="text-xl font-bold text-slate-800 mb-8">Se você continuar vivendo no improviso:</p>
          <ul className="space-y-4 mb-10 inline-block text-left">
            <li className="flex items-center space-x-3 text-lg md:text-xl font-medium text-slate-700">
              <span className="text-red-500 font-black">✕</span> <span>Vai continuar cansada</span>
            </li>
            <li className="flex items-center space-x-3 text-lg md:text-xl font-medium text-slate-700">
              <span className="text-red-500 font-black">✕</span> <span>Vai continuar ocupada</span>
            </li>
            <li className="flex items-center space-x-3 text-lg md:text-xl font-medium text-slate-700">
              <span className="text-red-500 font-black">✕</span> <span>E o dinheiro vai continuar escapando</span>
            </li>
          </ul>
          <div className="bg-pink-50 p-6 rounded-2xl border-2 border-dashed border-pink-200">
            <p className="text-xl md:text-2xl font-black text-pink-600 leading-tight text-balance uppercase">
              👉 Prosperidade não começa no bolso. <br />
              Começa na rotina.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 md:py-24 px-5 gradient-bg overflow-hidden">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-extrabold text-center mb-4 leading-tight uppercase text-balance">💥 ESCOLHA SUA OFERTA</h2>
          <p className="text-center text-slate-600 mb-12 md:mb-16 font-medium text-sm md:text-lg">Acesso imediato após confirmação do pagamento.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-8 items-stretch">
            <div className="bg-white p-8 md:p-10 rounded-[2rem] shadow-lg border border-slate-100 flex flex-col order-2 md:order-1 opacity-90 hover:opacity-100 transition-opacity">
              <h3 className="text-lg md:text-xl font-black mb-4 text-slate-800 tracking-tight uppercase">PROTOCOLO ESSENCIAL</h3>
              <p className="text-slate-500 text-sm md:text-base mb-8 leading-relaxed">O protocolo prático de 7 dias e as ferramentas base de organização.</p>
              <div className="mb-10">
                <p className="text-slate-400 line-through text-xs md:text-sm font-medium mb-1 uppercase tracking-wider">De R$ 47,00</p>
                <div className="flex items-baseline">
                  <span className="text-xl md:text-2xl font-bold text-slate-800">R$</span>
                  <span className="text-4xl md:text-5xl font-black ml-1 text-slate-800">9,90</span>
                </div>
                <p className="text-[10px] md:text-xs text-slate-400 font-bold uppercase tracking-widest mt-2">Pagamento único</p>
              </div>
              <ul className="text-sm md:text-base space-y-4 mb-10 flex-grow">
                <li className="flex items-center space-x-3 text-slate-600"><span className="text-pink-500 font-bold">✓</span> <span>Protocolo 7 Dias (PDF)</span></li>
                <li className="flex items-center space-x-3 text-slate-600"><span className="text-pink-500 font-bold">✓</span> <span>Ferramentas Mês a Mês</span></li>
                <li className="flex items-center space-x-3 text-slate-400 italic"><span>✕ Sem os Bônus Exclusivos</span></li>
              </ul>
              <button 
                onClick={() => setIsUpsellOpen(true)}
                className="w-full bg-slate-800 text-white font-black py-4 md:py-5 rounded-2xl hover:bg-slate-900 transition-all text-sm md:text-base shadow-lg shadow-slate-200 active:scale-95 uppercase"
              >
                COMPRAR ESSENCIAL
              </button>
            </div>

            <div className="premium-card bg-white p-8 md:p-10 rounded-[2.5rem] shadow-2xl flex flex-col relative overflow-hidden transform md:scale-105 z-10 order-1 md:order-2 ring-4 ring-pink-50">
              <div className="absolute top-6 right-[-35px] bg-pink-600 text-white text-[9px] md:text-[10px] font-black px-10 py-1.5 rotate-45 uppercase tracking-widest shadow-md">
                MAIS VENDIDO
              </div>
              <h3 className="text-xl md:text-2xl font-black mb-4 text-pink-600 tracking-tight text-balance uppercase">PROTOCOLO 7D + MEGA BÔNUS</h3>
              
              <div className="mb-6">
                <CountdownTimer />
                <p className="text-pink-500 text-[10px] font-bold mt-2 uppercase tracking-widest">Oferta expira em 15 minutos!</p>
              </div>

              <div className="mb-8">
                <p className="text-slate-400 line-through text-xs md:text-sm font-medium mb-1 uppercase tracking-wider">De R$ 197,00</p>
                <div className="flex items-baseline">
                  <span className="text-xl md:text-3xl font-bold text-pink-600">R$</span>
                  <span className="text-5xl md:text-6xl font-black text-pink-600 ml-1">24,90</span>
                </div>
                <p className="text-[10px] md:text-xs text-pink-500 font-black uppercase tracking-widest mt-2">MELHOR CUSTO-BENEFÍCIO (PAGAMENTO ÚNICO)</p>
              </div>

              <ul className="text-sm md:text-base space-y-4 mb-12 flex-grow">
                <li className="font-bold flex items-center space-x-3 text-slate-800">
                  <span className="text-green-500 text-xl leading-none">✓</span> 
                  <span>Tudo do Protocolo Essencial</span>
                </li>
                <li className="font-bold flex items-center space-x-3 text-pink-600">
                  <span className="text-pink-600 text-xl leading-none">✓</span> 
                  <span>MEGA PACOTE: 20 Bônus Exclusivos</span>
                </li>
                <li className="font-bold flex items-center space-x-3 text-slate-800">
                  <span className="text-pink-500 text-xl leading-none">✓</span> 
                  <span>4 GUIAS PREMIUM (Sentimentos, Rotina, Rituais e Autocuidado)</span>
                </li>
                <li className="font-bold flex items-center space-x-3 text-slate-800">
                  <span className="text-green-500 text-xl leading-none">✓</span> 
                  <span>Acesso Vitalício e Suporte Prioritário</span>
                </li>
              </ul>
              
              <a 
                href="https://go.tribopay.com.br/jauv3ds3cw"
                className="w-full bg-pink-600 text-white text-center font-black py-5 md:py-6 rounded-2xl hover:bg-pink-700 shadow-xl shadow-pink-200 transition-all transform hover:scale-[1.02] active:scale-95 text-base md:text-lg uppercase"
              >
                QUERO O PACOTE COMPLETO
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Guarantee Section */}
      <section className="py-16 md:py-24 px-5 bg-white border-t border-slate-100">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-14 text-center md:text-left">
          <div className="shrink-0">
            <img src="https://cdn-icons-png.flaticon.com/512/3699/3699516.png" className="w-32 md:w-44 opacity-25 grayscale" alt="Garantia" />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-slate-900 leading-tight uppercase text-balance text-slate-900">🔐 GARANTIA INCONDICIONAL</h2>
            <p className="text-slate-600 leading-relaxed text-sm md:text-lg text-balance">
              Teste por 7 dias. Aplique o protocolo, use as ferramentas. Se você não sentir que sua rotina está mais organizada e que identificou desperdícios, seu acesso chegará via whatsapp alguns minutos após a compra de forma automática para facilitar seu suporte, e caso queira o reembolso devolvemos 100% do seu dinheiro. Nosso atendimento é humanizado e funciona 24 horas por dia. Sem perguntas, sem burocracia.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 px-5 bg-white border-t border-slate-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-center mb-12 text-slate-900 uppercase tracking-tight">Dúvidas Frequentes</h2>
          <div className="divide-y divide-slate-100 border-t border-slate-100">
            <FAQItem 
              question="Como recebo meu acesso após a compra?" 
              answer={<p>seu acesso chegara via whatsapp alguns minutos após a compra de forma automática. Nossa equipe entrará em contato com você diretamente através do WhatsApp. O atendimento é humanizado e funciona 24 horas por dia para garantir que você receba tudo corretamente.</p>} 
            />
            <FAQItem 
              question="Terei suporte para eventuais dúvidas?" 
              answer={<p>Sim! Você terá suporte total através do nosso <strong>WhatsApp</strong>. Contamos com uma equipe de atendimento humanizado disponível 24 horas por dia para te auxiliar em qualquer etapa da sua jornada.</p>} 
            />
            <FAQItem 
              question="Por quanto tempo terei acesso?" 
              answer={<p>Acesso vitalício a todo conteúdo.</p>} 
            />
            <FAQItem 
              question="Posso usar as ferramentas de forma digital?" 
              answer={<p>Terá acesso a versão em PDF das ferramentas. Caso possua tablet com editor de PDF conseguirá usar.</p>} 
            />
            <FAQItem 
              question="Terei acesso a versão para impressão?" 
              answer={<p>Sim, receberá as ferramentas em PDF para impressão em tamanho A4 ou A5.</p>} 
            />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-slate-900 py-16 md:py-24 px-5 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 via-pink-400 to-pink-500"></div>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-5xl font-black text-white mb-8 md:mb-12 leading-tight uppercase">Não deixe sua vida no improviso por mais nenhum dia.</h2>
          <p className="text-slate-400 text-base md:text-xl mb-12 md:mb-16 font-medium">O caos custa caro. Comece sua Vida Próspera agora.</p>
          <button 
            onClick={scrollToPricing}
            className="inline-block w-full md:w-auto bg-pink-600 text-white font-black text-xl md:text-2xl px-16 py-6 rounded-2xl md:rounded-full hover:bg-pink-700 shadow-2xl shadow-pink-900/40 transition-all transform hover:scale-105 active:scale-95 uppercase"
          >
            QUERO COMEÇAR AGORA
          </button>
          <div className="mt-16 flex justify-center items-center space-x-6 md:space-x-8 opacity-40 grayscale contrast-125">
            <img src="https://cdn-icons-png.flaticon.com/512/196/196578.png" className="h-6 md:h-8" alt="Visa" />
            <img src="https://cdn-icons-png.flaticon.com/512/196/196561.png" className="h-6 md:h-8" alt="Mastercard" />
            <img src="https://logodownload.org/wp-content/uploads/2020/02/pix-logo-1.png" className="h-6 md:h-8 brightness-0 invert" alt="Pix" />
          </div>
        </div>
      </section>

      <footer className="py-12 bg-slate-950 text-slate-500 text-center text-[10px] md:text-xs">
        <div className="max-w-4xl mx-auto px-6 space-y-6">
          <div className="flex justify-center space-x-6 font-bold uppercase tracking-widest opacity-50">
            <a href="#" className="hover:text-pink-500 transition-colors">Políticas</a>
            <a href="#" className="hover:text-pink-500 transition-colors">Termos</a>
            <a href="#" className="hover:text-pink-500 transition-colors">Contato</a>
          </div>
          <p className="leading-relaxed">© 2024 Protocolo Vida Próspera 7D • Todos os direitos reservados.</p>
          <p className="leading-relaxed max-w-2xl mx-auto px-4 text-balance">Os resultados podem variar de pessoa para pessoa. O protocolo é uma ferramenta de auxílio e não substitui consultoria financeira profissional personalizada.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
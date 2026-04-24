import React, { useState, useRef, useEffect } from 'react';
import { Heart, MapPin, Calendar, Gift, Camera, Check, X, Menu, Loader, Music, Copy, Lock, User, Shirt } from 'lucide-react';

// --- CONFIGURAÇÃO DE CORES (PALETA DO CASAL) ---
const colors = {
  cream: '#FEFEF2',
  gold: '#F1CF95',
  palePink: '#EBDDD3',
  softRed: '#E1A0A0',
  sage: '#AAB18C',
  deepGreen: '#6E7C5A',
  terracotta: '#D4865C',
  paleSage: '#CCCDB6',
};

// --- SIMULAÇÃO DE BANCO DE DADOS DE CONVIDADOS ---
const GUEST_DATABASE = [
  { id: 1, fullName: "João Silva", allowedGuests: 1 },
  { id: 2, fullName: "Maria Oliveira", allowedGuests: 2 },
  { id: 3, fullName: "Carlos e Ana Souza", allowedGuests: 2 },
  { id: 4, fullName: "Família Pereira", allowedGuests: 4 },
];

const App = () => {
  // --- ESTADOS DE SEGURANÇA E NAVEGAÇÃO ---
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Começa bloqueado
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState(false);
  
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // --- ESTADOS DO RSVP ---
  const [rsvpStep, setRsvpStep] = useState('search');
  const [searchName, setSearchName] = useState('');
  const [foundGuest, setFoundGuest] = useState(null);
  const [rsvpForm, setRsvpForm] = useState({ attending: 'yes', message: '' });

  // --- ESTADO DA MÚSICA ---
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  // --- FUNÇÃO DE LOGIN ---
  const handleLogin = (e) => {
    e.preventDefault();
    // Senha simples para o frontend (idealmente validado no backend)
    if (passwordInput.toLowerCase() === 'amor2026') {
      setIsAuthenticated(true);
    } else {
      setLoginError(true);
    }
  };

  // --- CONTROLE DE MÚSICA ---
  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  // --- LÓGICA RSVP ---
  const handleSearchGuest = (e) => {
    e.preventDefault();
    const normalize = (str) => str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const guest = GUEST_DATABASE.find(g => 
      normalize(g.fullName).includes(normalize(searchName)) && searchName.length > 3
    );
    if (guest) {
      setFoundGuest(guest);
      setRsvpStep('form');
    } else {
      setRsvpStep('notFound');
    }
  };

  const handleSubmitRSVP = (e) => {
    e.preventDefault();
    setTimeout(() => {
      setRsvpStep('success');
    }, 1000);
  };

  // --- TELA DE BLOQUEIO (SENHA) ---
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: colors.cream }}>
        <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-2xl text-center border-t-4" style={{ borderColor: colors.deepGreen }}>
          <Lock className="w-12 h-12 mx-auto mb-4" style={{ color: colors.sage }} />
          <h1 className="text-3xl font-serif mb-2" style={{ color: colors.deepGreen }}>Rodrigo & Milla</h1>
          <p className="text-gray-500 mb-8">Área restrita aos convidados. Por favor, digite a senha do convite.</p>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <input 
              type="password" 
              placeholder="Senha de acesso"
              className="w-full p-4 border rounded-lg text-center text-lg tracking-widest focus:ring-2 outline-none"
              style={{ borderColor: loginError ? colors.softRed : colors.sage }}
              value={passwordInput}
              onChange={(e) => { setPasswordInput(e.target.value); setLoginError(false); }}
            />
            {loginError && <p className="text-sm" style={{ color: colors.softRed }}>Senha incorreta. Tente "amor2026".</p>}
            <button 
              type="submit"
              className="w-full py-3 rounded-lg text-white font-bold hover:opacity-90 transition-opacity"
              style={{ backgroundColor: colors.deepGreen }}
            >
              Entrar
            </button>
          </form>
        </div>
      </div>
    );
  }

  // --- SITE PRINCIPAL ---
  return (
    <div className="min-h-screen font-sans selection:bg-[#D4865C] selection:text-white" style={{ backgroundColor: colors.cream }}>
      
      {/* MUSIC PLAYER FLOATING BUTTON */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-4">
        {isPlaying && (
          <div className="bg-white px-4 py-2 rounded-full shadow-lg border border-[#D4865C] animate-fadeIn">
             <span className="text-xs font-bold uppercase tracking-wider text-[#6E7C5A]">♫ Just the Two of Us</span>
          </div>
        )}
        <button 
          onClick={toggleMusic}
          className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg animate-pulse hover:animate-none transition-transform hover:scale-110"
          style={{ backgroundColor: colors.terracotta, color: 'white' }}
        >
          {isPlaying ? <Music size={24} /> : <div className="relative"><Music size={24} /><div className="absolute top-0 right-0 w-2 h-2 bg-white rounded-full"></div></div>}
        </button>
        {/* MÚSICA: Para a versão final, substitua o src abaixo pelo arquivo 'just-the-two-of-us.mp3' na pasta public */}
        <audio ref={audioRef} loop src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" />
      </div>

      {/* --- HEADER / NAV --- */}
      <nav className="fixed w-full z-40 bg-opacity-90 backdrop-blur-md shadow-sm transition-all duration-300" style={{ backgroundColor: colors.cream }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer" onClick={() => scrollTo('home')}>
              <span className="text-2xl font-serif tracking-widest text-[#6E7C5A]">R & M</span>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8 items-center">
              {['A História', 'O Dia', 'Traje', 'Presentes', 'RSVP'].map((item, idx) => (
                <button 
                  key={idx}
                  onClick={() => scrollTo(item === 'A História' ? 'story' : item === 'O Dia' ? 'details' : item === 'Traje' ? 'dresscode' : item === 'Presentes' ? 'registry' : 'rsvp')}
                  className="text-sm uppercase tracking-wider hover:text-[#D4865C] transition-colors"
                  style={{ color: colors.deepGreen }}
                >
                  {item}
                </button>
              ))}
              <button 
                onClick={() => scrollTo('rsvp')}
                className="px-6 py-2 rounded-full text-white transition-transform transform hover:scale-105 shadow-lg"
                style={{ backgroundColor: colors.terracotta }}
              >
                Confirmar
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} style={{ color: colors.deepGreen }}>
                <Menu size={28} />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden absolute w-full bg-[#FEFEF2] shadow-xl border-t border-[#AAB18C]">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col items-center">
              {['A História', 'O Dia', 'Traje', 'Presentes', 'RSVP'].map((item, idx) => (
                <button 
                  key={idx}
                  onClick={() => scrollTo(item === 'A História' ? 'story' : item === 'O Dia' ? 'details' : item === 'Traje' ? 'dresscode' : item === 'Presentes' ? 'registry' : 'rsvp')}
                  className="block px-3 py-2 text-base font-medium w-full text-center hover:bg-[#F1CF95] hover:bg-opacity-20 rounded-md"
                  style={{ color: colors.deepGreen }}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* --- HERO SECTION --- */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Decorative Circles */}
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob" style={{ backgroundColor: colors.sage }}></div>
        <div className="absolute top-20 right-10 w-64 h-64 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000" style={{ backgroundColor: colors.gold }}></div>
        <div className="absolute -bottom-8 left-20 w-64 h-64 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000" style={{ backgroundColor: colors.softRed }}></div>

        <div className="relative z-10 text-center px-4">
          <p className="text-lg md:text-xl uppercase tracking-[0.2em] mb-4" style={{ color: colors.terracotta }}>Vamos nos casar</p>
          <h1 className="text-5xl md:text-8xl font-serif mb-6" style={{ color: colors.deepGreen }}>
            Rodrigo & Milla
          </h1>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 text-lg md:text-2xl font-light" style={{ color: colors.deepGreen }}>
            <span className="flex items-center gap-2"><Calendar size={20} /> 18 de Outubro de 2026</span>
            <span className="hidden md:inline">|</span>
            <span className="flex items-center gap-2"><MapPin size={20} /> 15:00h • São Paulo</span>
          </div>
          
          <div className="mt-12">
            <button 
              onClick={() => scrollTo('details')}
              className="animate-bounce"
              style={{ color: colors.terracotta }}
            >
              <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
            </button>
          </div>
        </div>
      </section>

      {/* --- STORY / INTRO --- */}
      <section id="story" className="py-20 md:py-32 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Heart className="w-10 h-10 mx-auto mb-6" style={{ color: colors.terracotta }} />
          <h2 className="text-3xl md:text-5xl font-serif mb-8" style={{ color: colors.deepGreen }}>Nossa História</h2>
          <p className="text-lg md:text-xl leading-relaxed opacity-80" style={{ color: colors.deepGreen }}>
            Rodrigo Pereira Toniolo & Milla Cordeiro Amarante.<br/>
            Construindo nossos sonhos, tijolo por tijolo, e agora celebrando a fundação mais importante de todas: nossa família. 
            O Botânico Quintal reflete a leveza que queremos para nossa vida a dois.
          </p>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
             {[1, 2, 3].map((i) => (
               <div key={i} className="aspect-[3/4] rounded-t-full bg-[#EBDDD3] relative overflow-hidden group">
                 <div className="absolute inset-0 flex items-center justify-center text-[#6E7C5A] opacity-30">
                   <Camera size={32} />
                 </div>
                 <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-500"></div>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* --- EVENT DETAILS --- */}
      <section id="details" className="py-20 px-4 relative">
        <div className="absolute inset-0 opacity-10 pattern-dots" style={{ backgroundImage: `radial-gradient(${colors.sage} 1px, transparent 1px)`, backgroundSize: '20px 20px' }}></div>
        
        <div className="max-w-6xl mx-auto bg-white bg-opacity-80 backdrop-blur-sm rounded-xl p-8 md:p-12 shadow-xl border border-[#AAB18C]">
          <div className="grid md:grid-cols-2 gap-12">
            
            {/* Informações */}
            <div>
              <h2 className="text-3xl md:text-5xl font-serif mb-8" style={{ color: colors.deepGreen }}>O Grande Dia</h2>
              
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="mt-1"><Calendar className="w-6 h-6" style={{ color: colors.terracotta }} /></div>
                  <div>
                    <h3 className="font-bold text-xl text-gray-800">18 de Outubro de 2026</h3>
                    <p className="text-gray-600">Domingo, às 15:00 horas</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="mt-1"><MapPin className="w-6 h-6" style={{ color: colors.terracotta }} /></div>
                  <div>
                    <h3 className="font-bold text-xl text-gray-800">Botânico Quintal</h3>
                    <p className="text-gray-600">Av. Imperatriz Leopoldina, 681</p>
                    <p className="text-gray-600">Alto de Pinheiros – São Paulo/SP</p>
                    <a 
                      href="https://maps.app.goo.gl/zNWQFPv1v6r8nQEPA" 
                      target="_blank" 
                      rel="noreferrer" 
                      className="inline-flex items-center gap-2 mt-3 px-4 py-2 rounded-lg text-sm font-bold border transition-colors hover:bg-[#D4865C] hover:text-white"
                      style={{ borderColor: colors.terracotta, color: colors.terracotta }}
                    >
                      Ver no Google Maps
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Mapa Embedado (Simulação visual) */}
            <div className="h-64 md:h-full bg-gray-200 rounded-lg overflow-hidden border border-gray-300 relative">
               <iframe 
                 src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.433293675684!2d-46.73292492383256!3d-23.542901361276226!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94cef8e1e1e1e1e1%3A0x1e1e1e1e1e1e1e1e!2sAv.%20Imperatriz%20Leopoldina%2C%20681%20-%20Vila%20Leopoldina%2C%20S%C3%A3o%20Paulo%20-%20SP%2C%2005305-011!5e0!3m2!1spt-BR!2sbr!4v1700000000000!5m2!1spt-BR!2sbr" 
                 width="100%" 
                 height="100%" 
                 style={{ border: 0 }} 
                 allowFullScreen="" 
                 loading="lazy" 
                 title="Mapa Botânico Quintal"
               ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* --- DRESS CODE / TRAJE --- */}
      <section id="dresscode" className="py-16 px-4 bg-[#F9F9F4]">
        <div className="max-w-4xl mx-auto text-center">
          <Shirt className="w-10 h-10 mx-auto mb-4" style={{ color: colors.deepGreen }} />
          <h2 className="text-3xl md:text-4xl font-serif mb-6" style={{ color: colors.deepGreen }}>Dress Code</h2>
          <p className="text-lg text-gray-700 mb-8">
            Para celebrarmos com elegância e conforto, o traje sugerido é <strong className="uppercase">Social Completo</strong>.
          </p>

          <div className="flex flex-col md:flex-row gap-8 justify-center items-stretch">
             {/* Card Mulheres */}
             <div className="flex-1 bg-white p-6 rounded-lg shadow-sm border border-[#EBDDD3]">
               <h3 className="font-serif text-xl mb-4" style={{ color: colors.terracotta }}>Para Elas</h3>
               <p className="text-gray-600 text-sm mb-4">Vestidos longos ou midi em tecidos fluidos. Apostem em tons pastéis ou vibrantes. Evitem o branco e off-white.</p>
               <div className="h-48 bg-[#FEFEF2] rounded border border-dashed border-[#AAB18C] flex items-center justify-center">
                 <span className="text-xs text-gray-400 italic">Croqui / Inspiração Vestido</span>
               </div>
             </div>
             
             {/* Card Homens */}
             <div className="flex-1 bg-white p-6 rounded-lg shadow-sm border border-[#EBDDD3]">
               <h3 className="font-serif text-xl mb-4" style={{ color: colors.deepGreen }}>Para Eles</h3>
               <p className="text-gray-600 text-sm mb-4">Terno completo e gravata. Cores como azul marinho, cinza grafite ou preto são perfeitas para a ocasião.</p>
               <div className="h-48 bg-[#FEFEF2] rounded border border-dashed border-[#AAB18C] flex items-center justify-center">
                  <span className="text-xs text-gray-400 italic">Croqui / Inspiração Terno</span>
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* --- REGISTRY / LISTA DE PRESENTES --- */}
      <section id="registry" className="py-20 px-4" style={{ backgroundColor: colors.palePink }}>
        <div className="max-w-4xl mx-auto text-center">
          <Gift className="w-10 h-10 mx-auto mb-4" style={{ color: colors.deepGreen }} />
          <h2 className="text-3xl md:text-5xl font-serif mb-6" style={{ color: colors.deepGreen }}>Lista de Presentes</h2>
          
          <div className="bg-white p-8 rounded-xl shadow-lg mb-10 mx-auto max-w-3xl">
            <p className="text-lg md:text-xl leading-relaxed text-gray-700 italic font-serif">
              "Estamos muito felizes em compartilhar esse momento com vocês! 
              Como já estamos montando nosso primeiro lar juntos, optamos por uma lista de presentes 'à moda antiga' e também opções virtuais.
              Seus presentes chegarão em um momento perfeito para nos ajudar a construir nosso cantinho."
            </p>
          </div>

          {/* LOJAS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              { name: 'Camicado', url: '#', color: '#fff' },
              { name: 'Mickey Presentes', url: '#', color: '#fff' },
              { name: 'Fast Shop', url: '#', color: '#fff' }
            ].map((store, i) => (
              <a 
                key={i} 
                href={store.url}
                target="_blank"
                rel="noreferrer"
                className="group p-6 bg-white rounded-lg shadow hover:shadow-lg transition-all flex flex-col items-center justify-center gap-2"
              >
                <Gift size={24} style={{ color: colors.terracotta }} />
                <h3 className="font-bold uppercase text-gray-700">{store.name}</h3>
                <span className="text-xs text-[#D4865C]">Ver lista</span>
              </a>
            ))}
          </div>

          {/* ÁREA PIX */}
          <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl border-2 border-dashed relative overflow-hidden" style={{ borderColor: colors.gold }}>
            <div className="absolute top-0 left-0 bg-[#F1CF95] text-[#6E7C5A] text-xs font-bold px-3 py-1 rounded-br-lg">
              OPÇÃO PRÁTICA
            </div>
            <h3 className="text-2xl font-serif mb-4" style={{ color: colors.deepGreen }}>Presente via PIX</h3>
            <p className="text-gray-600 mb-6 text-sm">
              Se preferir contribuir de forma prática para a nossa lua de mel e montagem da casa, 
              você pode usar a chave PIX abaixo ou ler o QR Code.
            </p>
            
            <div className="flex flex-col md:flex-row items-center gap-8 justify-center">
              {/* QR Code Placeholder */}
              <div className="w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center border">
                <span className="text-xs text-gray-400">QR Code PIX</span>
              </div>
              
              <div className="text-left w-full md:w-auto">
                <p className="text-xs uppercase text-gray-400 font-bold mb-1">Chave Pix (E-mail ou CPF)</p>
                <div className="flex items-center gap-2 bg-gray-50 p-3 rounded border border-gray-200">
                  <code className="text-[#6E7C5A] font-mono select-all">rodrigoemilla@casamento.com</code>
                  <button 
                    onClick={() => navigator.clipboard.writeText('rodrigoemilla@casamento.com')}
                    className="p-2 hover:bg-gray-200 rounded transition-colors"
                    title="Copiar chave"
                  >
                    <Copy size={16} className="text-gray-600" />
                  </button>
                </div>
                <p className="text-xs text-gray-400 mt-2">Banco: Nubank | Titular: Rodrigo Toniolo</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- RSVP SECTION --- */}
      <section id="rsvp" className="py-20 px-4 relative overflow-hidden">
        <div className="max-w-2xl mx-auto text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-serif mb-4" style={{ color: colors.deepGreen }}>RSVP</h2>
          <p className="mb-8" style={{ color: colors.deepGreen }}>Por favor, confirme sua presença até 18 de Setembro de 2026.</p>

          <div className="bg-white p-8 rounded-xl shadow-2xl border-t-4" style={{ borderColor: colors.terracotta }}>
            
            {/* STEP 1: SEARCH */}
            {rsvpStep === 'search' && (
              <form onSubmit={handleSearchGuest} className="space-y-6">
                <div>
                  <label className="block text-left text-sm font-semibold mb-2" style={{ color: colors.deepGreen }}>
                    Digite seu nome completo
                  </label>
                  <input 
                    type="text" 
                    required
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)}
                    placeholder="Ex: João Silva"
                    className="w-full p-4 border rounded-lg focus:ring-2 outline-none transition-all"
                    style={{ borderColor: colors.sage, color: colors.deepGreen }}
                  />
                </div>
                <button 
                  type="submit"
                  className="w-full py-4 rounded-lg text-white font-bold text-lg hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: colors.deepGreen }}
                >
                  Buscar Convite
                </button>
              </form>
            )}

            {/* ERROR: NOT FOUND */}
            {rsvpStep === 'notFound' && (
              <div className="text-center animate-fadeIn">
                <div className="text-[#D4865C] mb-4 text-5xl">?</div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">Nome não encontrado</h3>
                <p className="text-gray-600 mb-6">
                  Não encontramos este nome na lista. Tente digitar o nome completo ou o sobrenome.
                </p>
                <button 
                  onClick={() => setRsvpStep('search')}
                  className="text-sm underline font-bold"
                  style={{ color: colors.deepGreen }}
                >
                  Tentar novamente
                </button>
              </div>
            )}

            {/* STEP 2: FORM */}
            {rsvpStep === 'form' && foundGuest && (
              <form onSubmit={handleSubmitRSVP} className="space-y-6 text-left animate-fadeIn">
                <div className="bg-[#FEFEF2] p-4 rounded-lg border border-[#AAB18C]">
                  <p className="text-sm text-gray-500">Convite para:</p>
                  <h3 className="text-xl font-serif font-bold" style={{ color: colors.deepGreen }}>{foundGuest.fullName}</h3>
                  <p className="text-xs text-gray-400 mt-1">Válido para até {foundGuest.allowedGuests} pessoa(s)</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">Você poderá comparecer?</label>
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setRsvpForm({...rsvpForm, attending: 'yes'})}
                      className={`flex-1 py-3 rounded-lg border-2 font-bold transition-all ${rsvpForm.attending === 'yes' ? 'border-[#6E7C5A] bg-[#6E7C5A] text-white' : 'border-gray-200 text-gray-400'}`}
                    >
                      Sim, eu vou!
                    </button>
                    <button
                      type="button"
                      onClick={() => setRsvpForm({...rsvpForm, attending: 'no'})}
                      className={`flex-1 py-3 rounded-lg border-2 font-bold transition-all ${rsvpForm.attending === 'no' ? 'border-[#D4865C] bg-[#D4865C] text-white' : 'border-gray-200 text-gray-400'}`}
                    >
                      Não poderei ir
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">Deixe uma mensagem para os noivos</label>
                  <textarea 
                    rows={3}
                    value={rsvpForm.message}
                    onChange={(e) => setRsvpForm({...rsvpForm, message: e.target.value})}
                    className="w-full p-3 border rounded-lg focus:ring-1 focus:ring-[#AAB18C] outline-none"
                    placeholder="Escreva algo especial..."
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  className="w-full py-4 rounded-lg text-white font-bold text-lg hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: colors.deepGreen }}
                >
                  Confirmar Resposta
                </button>
              </form>
            )}

            {/* STEP 3: SUCCESS */}
            {rsvpStep === 'success' && (
              <div className="text-center py-8 animate-fadeIn">
                <div className="w-16 h-16 bg-[#AAB18C] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="text-white w-8 h-8" />
                </div>
                <h3 className="text-2xl font-serif font-bold mb-2" style={{ color: colors.deepGreen }}>Obrigado!</h3>
                <p className="text-gray-600">
                  {rsvpForm.attending === 'yes' 
                    ? 'Sua presença foi confirmada.' 
                    : 'Que pena que não poderá ir.'}
                </p>
              </div>
            )}

          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-12 text-center text-white" style={{ backgroundColor: colors.deepGreen }}>
        <h2 className="text-3xl font-serif mb-4">Rodrigo & Milla</h2>
        <p className="mb-8 opacity-80">18 . 10 . 2026</p>
        <div className="text-sm opacity-60">
          <p>Feito com amor • São Paulo, Brasil</p>
        </div>
      </footer>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Lato:wght@300;400;700&display=swap');
        
        body { font-family: 'Lato', sans-serif; }
        h1, h2, h3, .font-serif { font-family: 'Playfair Display', serif; }
        
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob { animation: blob 7s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
        .animate-fadeIn { animation: fadeIn 0.5s ease-out forwards; }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default App;
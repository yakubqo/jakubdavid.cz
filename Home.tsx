/**
 * Hlavní stránka pro finančního poradce Jakuba Davida
 * Obsahuje hero sekci, navigaci, služby, o nás, rezervace a reference
 */

import { useState, useEffect, useRef } from 'react'
import { 
  ArrowRight, 
  TrendingUp, 
  Shield, 
  Calculator, 
  Phone, 
  Mail, 
  MapPin, 
  CheckCircle, 
  Star, 
  Upload,
  PiggyBank,
  Target,
  Users,
  Award,
  Clock,
  Euro
} from 'lucide-react'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Input } from '../components/ui/input'
import { Textarea } from '../components/ui/textarea'

export default function Home() {
  // CSS pro animaci světelného bodu a log
  const orbitalAnimation = `
    @keyframes orbit-border {
      0% {
        transform: translate(-12px, -12px);
      }
      25% {
        transform: translate(calc(100vw - 88px), -12px);
      }
      50% {
        transform: translate(calc(100vw - 88px), calc(100vh - 88px));
      }
      75% {
        transform: translate(-12px, calc(100vh - 88px));
      }
      100% {
        transform: translate(-12px, -12px);
      }
    }
    
    @keyframes scroll {
      0% {
        transform: translateX(0);
      }
      100% {
        transform: translateX(-50%);
      }
    }
    
    .animate-scroll {
      animation: scroll 30s linear infinite;
    }
    
    .animate-scroll:hover {
      animation-play-state: paused;
    }
  `;
  const [isVisible, setIsVisible] = useState(false)
  const [activeService, setActiveService] = useState(0)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [isEditingImage, setIsEditingImage] = useState(false)
  const [profileImage, setProfileImage] = useState("https://pub-cdn.sider.ai/u/U005HEEAXVE/web-coder/68639a3d0385cdf980509121/resource/b37575bf-6235-4393-b750-dda503c77538.jpeg")
  const [imageUrl, setImageUrl] = useState("")
  const [currentReview, setCurrentReview] = useState(0)
  const [visibleSteps, setVisibleSteps] = useState<number[]>([])
  const stepsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  // Auto-scroll reviews
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentReview((prev) => (prev + 1) % testimonials.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  // Scroll animation for steps
  useEffect(() => {
    const handleScroll = () => {
      if (!stepsRef.current) return
      
      const rect = stepsRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const sectionTop = rect.top
      const sectionHeight = rect.height
      
      // Calculate how much of the section is visible
      const visiblePercent = Math.max(0, Math.min(1, (windowHeight - sectionTop) / (windowHeight + sectionHeight)))
      
      // Show steps progressively based on scroll
      const newVisibleSteps: number[] = []
      if (visiblePercent > 0.05) newVisibleSteps.push(1)
      if (visiblePercent > 0.2) newVisibleSteps.push(2)
      if (visiblePercent > 0.35) newVisibleSteps.push(3)
      if (visiblePercent > 0.45) newVisibleSteps.push(4)
      
      setVisibleSteps(newVisibleSteps)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Check initial position
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const services = [
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Správa majetku a investice",
      description: "Pro ty, kteří se chtějí k majetku dostat a potřebují sestavit efektivní plán. Ale i investory, kteří majetek mají a chtějí ho ochránit před znehodnocením.",
      features: ["Analýza portfolia", "Správa investic", "Pravidelné reporty"]
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Financování bydlení",
      description: "Od jednoduchých úvěrových případů, kde je cílem vyjednání ideálních podmínek po složité úvěrové poradenství, kde jde o hledání skulinek v metodikách bank na českém trhu.",
      features: ["Předschválení hypotéky", "Vyjednání podmínek", "Kompletní vyřízení"]
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Optimalizace pojištění",
      description: "Analýza pojistných potřeb a optimalizace stávajících smluv pro maximální ochranu za rozumné ceny.",
      features: ["Návrh optimalizace", "Jednání s pojišťovnami", "Správa škod"]
    }
  ]

  const testimonials = [
    {
      name: "Anna Svobodová",
      text: "Jakub mi pomohl optimalizovat mé investice. Za rok jsem dosáhla 12% zhodnocení!",
      rating: 5,
      position: "Podnikatelka"
    },
    {
      name: "Pavel Novák",
      text: "Díky Jakubovi jsem získal hypotéku s o 0,5% nižší sazbou. Ušetřím stovky tisíc.",
      rating: 5,
      position: "IT specialista"
    },
    {
      name: "Marie Černá",
      text: "Profesionální přístup a skvělé výsledky. Konečně mám pořádek ve financích.",
      rating: 5,
      position: "Manažerka"
    }
  ]

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setUploadedFile(file)
    }
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setProfileImage(e.target?.result as string)
        setIsEditingImage(false)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleImageUrlChange = () => {
    if (imageUrl.trim()) {
      setProfileImage(imageUrl)
      setImageUrl("")
      setIsEditingImage(false)
    }
  }

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50">
      {/* CSS animace pro světelný bod */}
      <style>{orbitalAnimation}</style>
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md shadow-lg z-50 transition-all duration-300">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
              Jakub David
            </div>
            <div className="hidden md:flex space-x-8">
              <button 
                onClick={() => scrollToSection('o-nas')}
                className="text-gray-700 hover:text-purple-600 font-medium transition-colors duration-300 hover:scale-105 transform"
              >
                O mně
              </button>
              <button 
                onClick={() => scrollToSection('sluzby')}
                className="text-gray-700 hover:text-purple-600 font-medium transition-colors duration-300 hover:scale-105 transform"
              >
                Služby
              </button>
              <button 
                onClick={() => scrollToSection('kontakt')}
                className="text-gray-700 hover:text-purple-600 font-medium transition-colors duration-300 hover:scale-105 transform"
              >
                Kontakt
              </button>
            </div>
            <Button 
              onClick={() => scrollToSection('rezervace')}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-full transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Rezervace
            </Button>
          </div>
        </div>
      </nav>



      {/* Hero Section */}
      <section className="relative bg-white pt-20 overflow-hidden">
        <div className="container mx-auto px-6 py-16 lg:py-24">
          <div className={`max-w-6xl mx-auto transform transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left Content */}
              <div className="text-center lg:text-left">
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                  Vaše finance pod
                  <span className="block bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
                    odbornou péčí
                  </span>
                </h1>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  Dosáhněte svých finančních cílů rychleji a bezpečněji. 
                  Profesionální poradenství šité na míru vašim potřebám.
                </p>
                
                {/* Service highlights */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div className="text-center p-4 bg-purple-50 rounded-xl">
                    <TrendingUp className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                    <span className="text-sm font-medium text-gray-700">Investice</span>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-xl">
                    <Target className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                    <span className="text-sm font-medium text-gray-700">Hypotéky a úvěry</span>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-xl">
                    <Shield className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                    <span className="text-sm font-medium text-gray-700">Pojištění</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white px-8 py-4 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 font-semibold"
                    onClick={() => scrollToSection('rezervace')}
                  >
                    Rezervujte si konzultaci
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white px-8 py-4 rounded-full transition-all duration-300 font-semibold"
                    onClick={() => scrollToSection('sluzby')}
                  >
                    Více informací
                  </Button>
                </div>
              </div>

              {/* Right Visual */}
              <div className="relative">
                <div className="relative z-10 bg-gradient-to-br from-purple-100 to-purple-50 rounded-3xl p-8 shadow-2xl">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="bg-white rounded-2xl p-6 shadow-lg">
                      <div className="flex items-center mb-4">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                          <TrendingUp className="w-5 h-5 text-green-600" />
                        </div>
                        <span className="ml-3 font-semibold text-gray-900">Portfolio</span>
                      </div>
                      <div className="text-2xl font-bold text-green-600">+8%</div>
                      <div className="text-sm text-gray-500">Roční výnos</div>
                    </div>
                    
                    <div className="bg-white rounded-2xl p-6 shadow-lg">
                      <div className="flex items-center mb-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <Euro className="w-5 h-5 text-blue-600" />
                        </div>
                        <span className="ml-3 font-semibold text-gray-900">Majetek</span>
                      </div>
                      <div className="text-2xl font-bold text-blue-600">3M+</div>
                      <div className="text-sm text-gray-500">Spravováno</div>
                    </div>
                    
                    <div className="bg-white rounded-2xl p-6 shadow-lg col-span-2">
                      <div className="flex items-center justify-between mb-4">
                        <span className="font-semibold text-gray-900">Finanční cíle</span>
                        <span className="text-sm text-green-600 font-medium">Na dobré cestě</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                        <div className="bg-gradient-to-r from-purple-600 to-purple-800 h-3 rounded-full" style={{width: '75%'}}></div>
                      </div>
                      <div className="text-sm text-gray-500">75% splněno</div>
                    </div>
                  </div>
                </div>
                
                {/* Background decorations */}
                <div className="absolute -top-8 -right-8 w-24 h-24 bg-purple-200 rounded-full opacity-50 animate-pulse"></div>
                <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-purple-100 rounded-full opacity-30 animate-bounce"></div>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* O nás Section */}
      <section id="o-nas" className="py-20 lg:py-32">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="order-2 lg:order-1">
                <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-8">
                  Váš partner ve světě financí
                </h2>
                <div className="space-y-6 text-lg text-gray-600">
                  <p className="leading-relaxed">
                    Poradenství v oblasti financí se stalo součástí mého života již při studiu na vysoké škole v roce 2023. Od té doby dělám maximum pro to, aby moji klienti měli přístup k nejlepším podmínkám a nejefektivnějším strategiím pro dosažení svých finančních cílů a potřeb.
                  </p>
                  <p className="leading-relaxed">
                    Mojí filozofií je budovat dlouhodobé vztahy založené na důvěře a transparentnosti. Každé setkání je pro mě příležitostí naslouchat vašim potřebám.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-6 mt-8">
                    <div className="text-center p-6 bg-purple-50 rounded-xl">
                      <div className="text-3xl font-bold text-purple-600 mb-2">80+</div>
                      <div className="text-gray-600">Spokojených klientů</div>
                    </div>
                    <div className="text-center p-6 bg-purple-50 rounded-xl">
                      <div className="text-3xl font-bold text-purple-600 mb-2">2+</div>
                      <div className="text-gray-600">Let zkušeností</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="order-1 lg:order-2 text-center">
                <div className="relative inline-block">
                  <img 
                    src={profileImage}
                    alt="Jakub David - Finanční poradce"
                    className="w-80 h-80 rounded-2xl object-cover object-center shadow-2xl mx-auto"
                    style={{ objectPosition: 'center 15%' }}
                  />
                  <div className="absolute -bottom-6 -right-6 bg-purple-600 text-white p-4 rounded-xl shadow-lg">
                    <Award className="w-8 h-8" />
                  </div>
                  
                  {/* Edit button */}
                  <button
                    onClick={() => setIsEditingImage(true)}
                    className="absolute top-4 right-4 bg-white/90 hover:bg-white text-purple-600 p-2 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
                    title="Editovat obrázek"
                  >
                    <Upload className="w-5 h-5" />
                  </button>
                </div>

                {/* Image editing modal */}
                {isEditingImage && (
                  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
                      <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                        Změnit profilový obrázek
                      </h3>
                      
                      <div className="space-y-6">
                        {/* Upload file */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Nahrát obrázek ze zařízení
                          </label>
                          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-purple-400 transition-colors">
                            <input
                              type="file"
                              onChange={handleImageUpload}
                              className="hidden"
                              id="profile-image-upload"
                              accept="image/*"
                            />
                            <label 
                              htmlFor="profile-image-upload" 
                              className="cursor-pointer flex flex-col items-center"
                            >
                              <Upload className="w-8 h-8 text-gray-400 mb-2" />
                              <span className="text-gray-600">Klikněte pro výběr souboru</span>
                              <span className="text-sm text-gray-400 mt-1">JPG, PNG (max 5MB)</span>
                            </label>
                          </div>
                        </div>

                        {/* URL input */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Nebo vložte URL obrázku
                          </label>
                          <div className="flex gap-2">
                            <Input
                              value={imageUrl}
                              onChange={(e) => setImageUrl(e.target.value)}
                              placeholder="https://example.com/obrazek.jpg"
                              className="flex-1"
                            />
                            <Button
                              onClick={handleImageUrlChange}
                              disabled={!imageUrl.trim()}
                              className="bg-purple-600 hover:bg-purple-700"
                            >
                              OK
                            </Button>
                          </div>
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-3 pt-4">
                          <Button
                            variant="outline"
                            onClick={() => {
                              setIsEditingImage(false)
                              setImageUrl("")
                            }}
                            className="flex-1"
                          >
                            Zrušit
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Průběh spolupráce - Čistý vertikální layout */}
      <section ref={stepsRef} className="py-20 lg:py-32 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Jak probíhá naše spolupráce
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Jednoduchý a transparentní proces, který vás provede k vašim finančním cílům
            </p>
          </div>

          <div className="max-w-2xl mx-auto relative">
            {/* Animovaná spojovací čára */}
            <svg 
              className="absolute left-0 top-0 w-full pointer-events-none z-0" 
              style={{ height: '100%' }}
              viewBox="0 0 400 600"
            >
              <defs>
                <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#a855f7" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="#ec4899" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.8" />
                </linearGradient>
              </defs>
              
              {/* Čára z kroku 1 do 2 (doprava) */}
              <path
                d="M 40 75 Q 120 110 40 225"
                stroke="url(#pathGradient)"
                strokeWidth="4"
                fill="none"
                strokeLinecap="round"
                className={`transition-all duration-1000 ${
                  visibleSteps.includes(2) 
                    ? 'opacity-100' 
                    : 'opacity-0'
                }`}
                style={{
                  strokeDasharray: '300',
                  strokeDashoffset: visibleSteps.includes(2) ? '0' : '300',
                  transition: 'stroke-dashoffset 1.2s ease-in-out 0.5s'
                }}
              />
              
              {/* Čára z kroku 2 do 3 (doleva) */}
              <path
                d="M 40 225 Q -40 260 40 375"
                stroke="url(#pathGradient)"
                strokeWidth="4"
                fill="none"
                strokeLinecap="round"
                className={`transition-all duration-1000 ${
                  visibleSteps.includes(3) 
                    ? 'opacity-100' 
                    : 'opacity-0'
                }`}
                style={{
                  strokeDasharray: '300',
                  strokeDashoffset: visibleSteps.includes(3) ? '0' : '300',
                  transition: 'stroke-dashoffset 1.2s ease-in-out 0.8s'
                }}
              />
              
              {/* Čára z kroku 3 do 4 (doprava) */}
              <path
                d="M 40 375 Q 120 410 40 525"
                stroke="url(#pathGradient)"
                strokeWidth="4"
                fill="none"
                strokeLinecap="round"
                className={`transition-all duration-1000 ${
                  visibleSteps.includes(4) 
                    ? 'opacity-100' 
                    : 'opacity-0'
                }`}
                style={{
                  strokeDasharray: '300',
                  strokeDashoffset: visibleSteps.includes(4) ? '0' : '300',
                  transition: 'stroke-dashoffset 1.2s ease-in-out 1.1s'
                }}
              />
              
              {/* Animované body na čárách */}
              {visibleSteps.includes(2) && (
                <circle r="6" fill="#a855f7" opacity="0.9">
                  <animateMotion dur="3s" repeatCount="indefinite">
                    <path d="M 40 75 Q 120 110 40 225"/>
                  </animateMotion>
                  <animate attributeName="opacity" values="0.5;1;0.5" dur="3s" repeatCount="indefinite"/>
                </circle>
              )}
              
              {visibleSteps.includes(3) && (
                <circle r="6" fill="#ec4899" opacity="0.9">
                  <animateMotion dur="3s" repeatCount="indefinite" begin="1s">
                    <path d="M 40 225 Q -40 260 40 375"/>
                  </animateMotion>
                  <animate attributeName="opacity" values="0.5;1;0.5" dur="3s" repeatCount="indefinite" begin="1s"/>
                </circle>
              )}
              
              {visibleSteps.includes(4) && (
                <circle r="6" fill="#8b5cf6" opacity="0.9">
                  <animateMotion dur="3s" repeatCount="indefinite" begin="2s">
                    <path d="M 40 375 Q 120 410 40 525"/>
                  </animateMotion>
                  <animate attributeName="opacity" values="0.5;1;0.5" dur="3s" repeatCount="indefinite" begin="2s"/>
                </circle>
              )}
            </svg>

            {/* Kroky spolupráce - čistý vertikální layout */}
            <div className="space-y-12 relative z-10">
              {[
                {
                  number: 1,
                  title: "Nezávazná konzultace",
                  description: "Poznáme se a probereme vaši finanční situaci zdarma",
                  icon: <Users className="w-6 h-6" />
                },
                {
                  number: 2,
                  title: "Návrh finančního plánu",
                  description: "Připravím personalizovanou strategii přesně pro vás",
                  icon: <Calculator className="w-6 h-6" />
                },
                {
                  number: 3,
                  title: "Realizace plánu",
                  description: "Společně realizujeme doporučení a nastavíme produkty",
                  icon: <Target className="w-6 h-6" />
                },
                {
                  number: 4,
                  title: "Dlouhodobý servis",
                  description: "Pravidelně sledujeme pokrok a optimalizujeme strategii",
                  icon: <TrendingUp className="w-6 h-6" />
                }
              ].map((step, index) => (
                <div 
                  key={index}
                  className={`relative flex items-center gap-6 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-700 transform hover:scale-105 hover:-translate-y-2 ${
                    step.number === 4 
                      ? 'bg-white border border-purple-200' 
                      : 'bg-gradient-to-r from-purple-50 to-white'
                  } ${
                    visibleSteps.includes(step.number) 
                      ? `translate-y-0 opacity-100 scale-100 ${index % 2 === 0 ? 'translate-x-0' : 'translate-x-0'}` 
                      : `${index % 2 === 0 ? '-translate-x-12' : 'translate-x-12'} translate-y-8 opacity-0 scale-95`
                  }`}
                  style={{ 
                    transitionDelay: `${index * 150}ms`,
                    transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                >

                  {/* Číslo kroku - minimalistický styl */}
                  <div className="flex-shrink-0 relative">
                    {/* Hlavní číslo - čistý styl jako banner */}
                    <div className={`relative w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg transform transition-all duration-500 hover:scale-105 hover:shadow-xl border border-gray-100 ${
                      visibleSteps.includes(step.number) 
                        ? 'shadow-purple-500/20' 
                        : ''
                    }`}>
                      <span className={`font-bold text-2xl transition-colors duration-500 ${
                        visibleSteps.includes(step.number) 
                          ? 'text-purple-600' 
                          : 'text-gray-400'
                      }`}>
                        {step.number}
                      </span>
                      
                      {/* Jemný gradient pozadí při aktivaci */}
                      {visibleSteps.includes(step.number) && (
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100 opacity-60 -z-10"></div>
                      )}
                    </div>
                    
                    {/* Jeden jemný pulzující kroužek */}
                    {visibleSteps.includes(step.number) && (
                      <div className="absolute -inset-1 w-18 h-18 rounded-2xl border-2 border-purple-300 opacity-50 animate-ping" style={{ animationDuration: '2s' }}></div>
                    )}
                    

                  </div>

                  {/* Obsah kroku */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600">
                        {step.icon}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-gray-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>


                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="sluzby" className="py-20 lg:py-32 bg-gradient-to-br from-gray-50 to-purple-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Moje služby
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Komplexní finanční poradenství přizpůsobené vašim individuálním potřebám a cílům
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {services.map((service, index) => (
              <Card 
                key={index}
                className={`h-full flex flex-col group cursor-pointer transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 ${
                  activeService === index ? 'shadow-2xl border-purple-500 bg-gradient-to-br from-white to-purple-50' : 'hover:shadow-xl'
                }`}
                onMouseEnter={() => setActiveService(index)}
              >
                <CardHeader className="text-center pb-4">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center transition-all duration-300 ${
                    activeService === index ? 'bg-purple-600 text-white scale-110' : 'bg-purple-100 text-purple-600 group-hover:bg-purple-600 group-hover:text-white'
                  }`}>
                    {service.icon}
                  </div>
                  <CardTitle className="text-xl text-gray-900">{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center flex-1 flex flex-col">
                  <CardDescription className="text-gray-600 mb-6 text-base">
                    {service.description}
                  </CardDescription>
                  <ul className="space-y-3 flex-1">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-gray-700">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className="w-full mt-6 bg-purple-600 hover:bg-purple-700 text-white transform hover:scale-105 transition-all duration-300"
                    onClick={() => scrollToSection('rezervace')}
                  >
                    Rezervovat konzultaci
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Reservation Section */}
      <section id="rezervace" className="py-20 lg:py-32">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Rezervujte si konzultaci
              </h2>
              <p className="text-xl text-gray-600">
                Získejte nezávaznou konzultaci zdarma a začněte svou cestu k finanční svobodě
              </p>
            </div>

            <Card className="shadow-2xl border-purple-200">
              <CardHeader className="bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-t-lg">
                <CardTitle className="text-2xl text-center">Rezervační formulář</CardTitle>
                <CardDescription className="text-center text-purple-100">
                  Vyplňte formulář a ozvu se vám do 24 hodin
                </CardDescription>
              </CardHeader>
              <CardContent className="p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Jméno *</label>
                    <Input placeholder="Vaše jméno" className="h-12" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Příjmení *</label>
                    <Input placeholder="Vaše příjmení" className="h-12" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">E-mail *</label>
                  <Input placeholder="vas.email@example.com" type="email" className="h-12" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Telefon *</label>
                  <Input placeholder="+420 XXX XXX XXX" type="tel" className="h-12" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Typ služby</label>
                  <select className="w-full h-12 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500">
                    <option>Vyberte službu...</option>
                    <option>Investiční strategie</option>
                    <option>Pojistné poradenství</option>
                    <option>Spořící produkty</option>
                    <option>Hypoteční poradenství</option>
                    <option>Důchodové plánování</option>
                    <option>Finanční plánování</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Váš dotaz nebo požadavek</label>
                  <Textarea 
                    placeholder="Popište mi prosím vaši současnou finanční situaci a co byste chtěli řešit..."
                    className="min-h-32"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Přiložit dokument (volitelné)</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-purple-400 transition-colors">
                    <input
                      type="file"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="file-upload"
                      accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                    />
                    <label 
                      htmlFor="file-upload" 
                      className="cursor-pointer flex flex-col items-center"
                    >
                      <Upload className="w-12 h-12 text-gray-400 mb-2" />
                      <span className="text-gray-600">
                        {uploadedFile ? uploadedFile.name : 'Klikněte pro nahrání souboru'}
                      </span>
                      <span className="text-sm text-gray-400 mt-1">
                        PDF, JPG, PNG, DOC (max 10MB)
                      </span>
                    </label>
                  </div>
                </div>
                <Button 
                  className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 h-12 text-lg font-semibold transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Odeslat rezervaci
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <p className="text-sm text-gray-500 text-center">
                  * Povinná pole. Vaše data jsou v bezpečí a nebudou sdílena s třetími stranami.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-purple-50 to-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Reference klientů
            </h2>
            <p className="text-xl text-gray-600">
              Přečtěte si, co říkají moji spokojení klienti
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="text-center hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-white">
                <CardContent className="pt-8 pb-8">
                  <div className="flex justify-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-6 italic text-lg leading-relaxed">
                    "{testimonial.text}"
                  </p>
                  <div className="border-t pt-4">
                    <h4 className="font-semibold text-gray-900 text-lg">{testimonial.name}</h4>
                    <p className="text-purple-600 text-sm">{testimonial.position}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="kontakt" className="py-20 lg:py-32 bg-gradient-to-br from-purple-900 to-indigo-900 text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl lg:text-5xl font-bold mb-8">
              Kontaktujte mě
            </h2>
            <p className="text-xl text-purple-100 mb-12">
              Jsem tu pro vás. Ozvěte se mi kdykoliv s vašimi dotazy.
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              <a 
                href="tel:+420774993538"
                className="flex flex-col items-center p-6 bg-white/10 rounded-xl backdrop-blur-sm hover:bg-white/20 transition-all duration-300 cursor-pointer hover:scale-105 transform"
              >
                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mb-4">
                  <Phone className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Telefon</h3>
                <p className="text-purple-100">+420 774 993 538</p>
                <p className="text-purple-200 text-sm mt-1">Kliknutím zavolat</p>
              </a>

              <a 
                href="mailto:jakub.david@edofinance.cz"
                className="flex flex-col items-center p-6 bg-white/10 rounded-xl backdrop-blur-sm hover:bg-white/20 transition-all duration-300 cursor-pointer hover:scale-105 transform"
              >
                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mb-4">
                  <Mail className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-lg mb-2">E-mail</h3>
                <p className="text-purple-100">jakub.david@edofinance.cz</p>
                <p className="text-purple-200 text-sm mt-1">Kliknutím napsat email</p>
              </a>

              <a 
                href="https://www.google.com/maps/place/eDO+finance,+a.s./@50.0269823,14.4955267,649m/data=!3m2!1e3!4b1!4m6!3m5!1"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center p-6 bg-white/10 rounded-xl backdrop-blur-sm hover:bg-white/20 transition-all duration-300 cursor-pointer hover:scale-105 transform"
              >
                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mb-4">
                  <MapPin className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Adresa</h3>
                <p className="text-purple-100">V Parku 2335/20, Praha 11</p>
                <p className="text-purple-200 text-sm mt-1">Kliknutím otevřít mapu</p>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6 text-center">
          <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
            Jakub David
          </h3>
          <p className="text-gray-400 mb-6">Finanční poradenství • Váš partner k finanční svobodě</p>
          <div className="border-t border-gray-700 pt-6">
            <p className="text-gray-500">&copy; 2024 Jakub David. Všechna práva vyhrazena.</p>
            <p className="text-sm text-gray-600 mt-2">
              Webová stránka je zabezpečena SSL certifikátem • Vaše data jsou v bezpečí
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

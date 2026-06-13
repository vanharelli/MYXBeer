import './App.css'
import { useState, useEffect } from 'react'
import { Instagram, MapPin, ShoppingCart, X, ChevronDown, Smartphone, Navigation } from 'lucide-react'
import { Background } from './components/Background'
import {
  combosEspeciais,
  bebidasAlcoolicas,
  refrigerantes,
  sucosAguas,
  tabacaria,
  snacks,
  type Combo,
  type Produto,
} from './combos'

const isEstablishmentOpenNow = () => {
  const parseTimeToMinutes = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number)
    return hours * 60 + minutes
  }
  const now = new Date()
  const day = now.getDay()
  const openTime = '08:00'
  const closeTime = day === 5 || day === 6 ? '01:00' : '00:00'
  const nowMinutes = now.getHours() * 60 + now.getMinutes()
  const openMinutes = parseTimeToMinutes(openTime)
  const closeMinutes = parseTimeToMinutes(closeTime)
  if (closeMinutes > openMinutes) {
    return nowMinutes >= openMinutes && nowMinutes < closeMinutes
  }
  return nowMinutes >= openMinutes || nowMinutes < closeMinutes
}

type CartItem = {
  title: string
  description: string
  quantity: number
}

type PanelMode =
  | { type: 'none' }
  | { type: 'combo' }
  | { type: 'products'; catId: number }

const STORES = [
  {
    id: 1,
    name: 'MYX BEER 3ª AVENIDA',
    emoji: '🍺',
    lat: -15.8688465,
    lng: -47.9642211,
    maps: 'https://www.google.com/maps/place/MYX+BEER+3%C2%B0+AVENIDA/@-15.8400434,-47.9821825,13z/data=!4m10!1m2!2m1!1smyxbeer!3m6!1s0x935a2f48c928c7f5:0x1a0de44b42809402!8m2!3d-15.8688465!4d-47.9642211',
  },
  {
    id: 2,
    name: 'MYX BEER METROPOLITANA',
    emoji: '🏪',
    lat: -15.8800288,
    lng: -47.97425,
    maps: 'https://www.google.com/maps/place/MYX+BEER+METROPOLITANA/@-15.8688465,-48.0363189,13z/data=!4m10!1m2!2m1!1smyxbeer!3m6!1s0x935a2fc3311751c3:0x6d6f59115514c3be!8m2!3d-15.8800288!4d-47.97425',
  },
  {
    id: 3,
    name: 'MYX TABACARIA',
    emoji: '🚬',
    lat: -15.8719128,
    lng: -47.9710089,
    maps: 'https://www.google.com/maps/place/MYX+TABACARIA/@-15.871913,-47.971679,19z/data=!4m9!1m2!2m1!1smyxbeer!3m5!1s0x935a2e575987c78f:0x28fcc31d3370e9f0!8m2!3d-15.8719128!4d-47.9710089',
  },
]

function haversineKm(lat1: number, lng1: number, lat2: number, lng2: number) {
  const R = 6371
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLng = ((lng2 - lng1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) ** 2
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

const COMBO_CATEGORIAS = ['Todos', 'Clássicos', 'Churrasco', 'Domingo', 'Emergência', 'Romance', 'Balada', 'Premium']

const CATEGORIAS = [
  {
    id: 6,
    title: 'COMBO',
    profile: 'Nomes criativos, combinações perfeitas. A solução pra qualquer rolê.',
    img: '/combo.png',
  },
  {
    id: 1,
    title: 'Bebidas Alcoólicas',
    profile: 'Cervejas, vinhos, destilados e muito mais. A seleção completa.',
    img: '/bebidas.png.jpg',
  },
  {
    id: 2,
    title: 'Refrigerantes',
    profile: 'Clássicos gelados pra acompanhar qualquer momento.',
    img: '/refrigerante.png',
  },
  {
    id: 3,
    title: 'Sucos/Águas',
    profile: 'Hidratação e refrescância: sucos, águas, energéticos e mixers.',
    img: '/sucos.png',
  },
  {
    id: 4,
    title: 'Tabacaria',
    profile: 'Cigarros, charutos, narguilê e acessórios premium.',
    img: '/tabacaria.png',
  },
  {
    id: 5,
    title: 'Snacks/Tira Gosto',
    profile: 'Petiscos e acompanhamentos pra todas as ocasiões.',
    img: '/snacks.png',
  },
]

function getProdutosByCat(catId: number): Produto[] {
  if (catId === 1) return bebidasAlcoolicas
  if (catId === 2) return refrigerantes
  if (catId === 3) return sucosAguas
  if (catId === 4) return tabacaria
  if (catId === 5) return snacks
  return []
}

export default function MyxBeerDashboard() {
  const [panel, setPanel] = useState<PanelMode>({ type: 'none' })
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [showSchedule, setShowSchedule] = useState(false)
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [checkoutStatus, setCheckoutStatus] = useState<'idle' | 'success'>('idle')
  const [comboTab, setComboTab] = useState('Todos')
  const [scrolled, setScrolled] = useState(false)
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const [showLocation, setShowLocation] = useState(false)
  const [nearestStore, setNearestStore] = useState<number | null>(null)
  const [geoStatus, setGeoStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')

  const closePanel = () => setPanel({ type: 'none' })

  const handleFindNearest = () => {
    if (!navigator.geolocation) { setGeoStatus('error'); return }
    setGeoStatus('loading')
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords
        let minDist = Infinity
        let nearest = STORES[0].id
        STORES.forEach((s) => {
          const d = haversineKm(latitude, longitude, s.lat, s.lng)
          if (d < minDist) { minDist = d; nearest = s.id }
        })
        setNearestStore(nearest)
        setGeoStatus('done')
      },
      () => setGeoStatus('error'),
    )
  }

  // Header becomes visible on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleCategoryClick = (catId: number) => {
    if (catId === 6) setPanel({ type: 'combo' })
    else setPanel({ type: 'products', catId })
  }

  const handleAddComboToCart = (combo: Combo) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.title === combo.title)
      if (existing) {
        return prev.map((item) =>
          item.title === combo.title ? { ...item, quantity: item.quantity + 1 } : item,
        )
      }
      return [...prev, { title: combo.title, description: combo.items.join(' + '), quantity: 1 }]
    })
    setIsCartOpen(true)
    setCheckoutStatus('idle')
  }

  const handleAddProdutoToCart = (produto: Produto) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.title === produto.title)
      if (existing) {
        return prev.map((item) =>
          item.title === produto.title ? { ...item, quantity: item.quantity + 1 } : item,
        )
      }
      return [...prev, { title: produto.title, description: produto.profile, quantity: 1 }]
    })
    setIsCartOpen(true)
    setCheckoutStatus('idle')
  }

  const handleRemoveFromCart = (title: string) => {
    setCartItems((prev) => prev.filter((item) => item.title !== title))
  }

  const handleCheckout = () => {
    if (!cartItems.length) return
    setCheckoutStatus('success')
    setCartItems([])
  }

  const isOpenNow = isEstablishmentOpenNow()
  const filteredCombos =
    comboTab === 'Todos' ? combosEspeciais : combosEspeciais.filter((c) => c.categoria === comboTab)
  const cartTotal = cartItems.reduce((acc, item) => acc + item.quantity, 0)

  const currentCat = panel.type === 'products' ? CATEGORIAS.find((c) => c.id === panel.catId) : null
  const currentProdutos = panel.type === 'products' ? getProdutosByCat(panel.catId) : []

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase()
      if (
        event.key === 'F12' ||
        ((event.ctrlKey || event.metaKey) && event.shiftKey && (key === 'i' || key === 'j')) ||
        ((event.ctrlKey || event.metaKey) && key === 'u')
      ) {
        event.preventDefault()
        event.stopPropagation()
      }
      if (event.key === 'Escape') closePanel()
    }
    const handleContextMenu = (event: MouseEvent) => event.preventDefault()
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('contextmenu', handleContextMenu)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('contextmenu', handleContextMenu)
    }
  }, [])

  return (
    <div className="myx-root">
      <Background opacity={0.8} />

      {/* ── HEADER — transparent at top, solid on scroll ── */}
      <header className={`myx-header ${scrolled ? 'myx-header-scrolled' : 'myx-header-top'}`}>
        <div className="myx-cert">
          <a aria-label="Instagram MYX BEER" className="myx-icon" href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <Instagram size={24} />
          </a>
        </div>
      </header>

      {/* ── HERO ── */}
      <section className="myx-hero-pro">

        {/* Status badge — below header, above logo */}
        <div className="myx-status-wrap">
          <button
            type="button"
            className={`myx-status-badge ${isOpenNow ? 'myx-status-open' : 'myx-status-closed'}`}
            onClick={() => setShowSchedule((prev) => !prev)}
          >
            <span className="myx-status-dot" />
            <span className="myx-status-label">
              {isOpenNow ? 'Aberto agora' : 'Fechado no momento'}
            </span>
          </button>
          {showSchedule && (
            <div className="myx-status-panel">
              <div className="myx-status-panel-row">Domingo: 08:00–00:00</div>
              <div className="myx-status-panel-row">Seg–Qui: 08:00–00:00</div>
              <div className="myx-status-panel-row">Sex–Sáb: 08:00–01:00</div>
              <div className="myx-status-panel-note">Horários podem variar em feriados</div>
            </div>
          )}
        </div>

        <img
          src="/LOGOMYX.PNG"
          alt="MYX BEER"
          className="myx-hero-logo"
          onError={(e) => { e.currentTarget.src = '/LOGOMYX.PNG.png' }}
        />
        <p className="myx-hero-tagline">DISTRIBUIDORA E TABACARIA</p>
        <p className="myx-hero-sub-pro">
          Bebidas geladas, destilados premium e linha completa de tabacaria.<br />
          Peça agora e receba onde estiver.
        </p>
        <div className="myx-hero-indicator" />
        <div className="myx-scroll-arrow" aria-hidden>
          <ChevronDown size={22} strokeWidth={2.5} />
        </div>

        {/* ── DOIS MÓDULOS: APP + LOCALIZAÇÃO ── */}
        <div className="myx-hero-modules">
          {/* Módulo: Baixar App */}
          <a
            className="myx-hero-module myx-module-app"
            href="#"
            onClick={(e) => e.preventDefault()}
          >
            <span className="myx-hmod-icon"><Smartphone size={22} /></span>
            <span className="myx-hmod-title">Baixar o App</span>
            <span className="myx-hmod-sub">Peça direto pelo app</span>
          </a>

          {/* Módulo: Localização */}
          <button
            type="button"
            className="myx-hero-module myx-module-loc"
            onClick={() => { setShowLocation(true); setGeoStatus('idle'); setNearestStore(null) }}
          >
            <span className="myx-hmod-icon"><MapPin size={22} /></span>
            <span className="myx-hmod-title">Localização</span>
            <span className="myx-hmod-sub">Encontre a loja mais próxima</span>
          </button>
        </div>
      </section>

      {/* ── PAINEL DE LOCALIZAÇÃO ── */}
      {showLocation && (
        <>
          <div className="myx-cart-backdrop" onClick={() => setShowLocation(false)} />
          <aside className="myx-combo-panel myx-loc-panel">
            <header className="myx-combo-header">
              <div>
                <span className="myx-panel-title">📍 Nossas Lojas</span>
                <p className="myx-panel-subtitle">Qual MYX BEER fica mais perto de você?</p>
              </div>
              <button className="myx-cart-close" onClick={() => setShowLocation(false)}><X size={18} /></button>
            </header>
            <div className="myx-combo-body">
              <button
                type="button"
                className="myx-button myx-geo-btn"
                onClick={handleFindNearest}
                disabled={geoStatus === 'loading'}
              >
                <Navigation size={14} />
                {geoStatus === 'loading' ? 'Localizando...' : 'Encontrar a mais próxima de mim'}
              </button>
              {geoStatus === 'error' && (
                <p className="myx-geo-error">Não foi possível obter sua localização. Selecione manualmente abaixo.</p>
              )}
              <ul className="myx-store-list">
                {STORES.map((store) => (
                  <li
                    key={store.id}
                    className={`myx-store-item ${nearestStore === store.id ? 'myx-store-nearest' : ''}`}
                  >
                    <div className="myx-store-info">
                      <span className="myx-store-emoji">{store.emoji}</span>
                      <div>
                        <h3 className="myx-store-name">{store.name}</h3>
                        {nearestStore === store.id && (
                          <span className="myx-store-badge">✅ Mais próxima de você</span>
                        )}
                      </div>
                    </div>
                    <a
                      href={store.maps}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="myx-button pill-button myx-store-btn"
                    >
                      Ver no mapa
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </>
      )}

      {/* ── VERTICAL CARD LIST ── */}
      <div className="myx-module">
        <div className="myx-vertical-list">
          {CATEGORIAS.map((c) => {
            const isHovered = hoveredCard === c.id
            const anyHovered = hoveredCard !== null
            return (
              <div
                key={c.id}
                className={`myx-card myx-vcard ${anyHovered && !isHovered ? 'myx-vcard-blurred' : ''} ${isHovered ? 'myx-vcard-focused' : ''}`}
                onMouseEnter={() => setHoveredCard(c.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {c.img && (
                  <>
                    <img src={c.img} alt={c.title} className="myx-card-bg" />
                    <div className="myx-card-bg-overlay" />
                  </>
                )}
                <div className="myx-vcard-content">
                  <div className="myx-card-quality">
                    <span className="myx-card-quality-bar" />
                    <h3 className="myx-card-title">{c.title}</h3>
                  </div>
                  <p className="myx-card-profile">{c.profile}</p>
                  <div className="myx-vcard-footer">
                    <button
                      className="myx-button pill-button"
                      onClick={() => handleCategoryClick(c.id)}
                    >
                      Ver opções 🛒
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* ── FLOATING CART — only visible when cart has items ── */}
      {cartTotal > 0 && (
        <button
          className="myx-floating-cart"
          aria-label={`Abrir carrinho — ${cartTotal} ${cartTotal === 1 ? 'item' : 'itens'}`}
          onClick={() => { setIsCartOpen(true); setCheckoutStatus('idle') }}
        >
          <ShoppingCart size={20} />
          <span>Carrinho</span>
          <span className="myx-cart-badge" aria-label={`${cartTotal} itens`}>
            {cartTotal}
          </span>
        </button>
      )}

      {/* ── CART DRAWER ── */}
      {isCartOpen && (
        <>
          <div className="myx-cart-backdrop" onClick={() => setIsCartOpen(false)} />
          <aside className="myx-cart-drawer">
            <header className="myx-cart-header">
              <span>Carrinho</span>
              <button className="myx-cart-close" onClick={() => setIsCartOpen(false)}><X size={18} /></button>
            </header>
            <div className="myx-cart-body">
              {!cartItems.length && checkoutStatus === 'idle' && (
                <p className="myx-cart-empty">Seu carrinho está vazio.<br />Adicione itens clicando em "Ver opções".</p>
              )}
              {!cartItems.length && checkoutStatus === 'success' && (
                <p className="myx-cart-success">✅ Pedido registrado!<br />Em breve entraremos em contato.</p>
              )}
              {cartItems.length > 0 && (
                <>
                  <ul className="myx-cart-items">
                    {cartItems.map((item) => (
                      <li key={item.title} className="myx-cart-item">
                        <div className="myx-cart-item-main">
                          <span className="myx-cart-item-title">{item.quantity}x {item.title}</span>
                          <p className="myx-cart-item-description">{item.description}</p>
                        </div>
                        <button className="myx-cart-remove" onClick={() => handleRemoveFromCart(item.title)} aria-label={`Remover ${item.title}`}>
                          <X size={14} />
                        </button>
                      </li>
                    ))}
                  </ul>
                  <button type="button" className="myx-button myx-cart-checkout" onClick={handleCheckout}>
                    Finalizar pedido via WhatsApp 📲
                  </button>
                </>
              )}
            </div>
          </aside>
        </>
      )}

      {/* ── COMBO PANEL ── */}
      {panel.type === 'combo' && (
        <>
          <div className="myx-cart-backdrop" onClick={closePanel} />
          <aside className="myx-combo-panel">
            <header className="myx-combo-header">
              <div>
                <span className="myx-panel-title">🍻 Combos Exclusivos</span>
                <p className="myx-panel-subtitle">Nomes criativos, combinações perfeitas</p>
              </div>
              <button className="myx-cart-close" onClick={closePanel}><X size={18} /></button>
            </header>
            <div className="myx-combo-tabs">
              {COMBO_CATEGORIAS.map((cat) => (
                <button key={cat} className={`myx-combo-tab ${comboTab === cat ? 'active' : ''}`} onClick={() => setComboTab(cat)}>
                  {cat}
                </button>
              ))}
            </div>
            <div className="myx-combo-body">
              <ul className="myx-combo-list">
                {filteredCombos.map((combo) => (
                  <li key={combo.id} className="myx-combo-item">
                    <div className="myx-combo-item-header">
                      {combo.emoji && <span className="myx-combo-emoji">{combo.emoji}</span>}
                      <div>
                        <h3 className="myx-combo-title">{combo.title}</h3>
                        <span className="myx-combo-cat-pill">{combo.categoria}</span>
                      </div>
                    </div>
                    <p className="myx-combo-description">{combo.profile}</p>
                    <ul className="myx-combo-items-list">
                      {combo.items.map((item) => <li key={item}>• {item}</li>)}
                    </ul>
                    <button type="button" className="myx-button pill-button myx-combo-add" onClick={() => handleAddComboToCart(combo)}>
                      Adicionar ao carrinho 🛒
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </>
      )}

      {/* ── PRODUCT PANEL ── */}
      {panel.type === 'products' && currentCat && (
        <>
          <div className="myx-cart-backdrop" onClick={closePanel} />
          <aside className="myx-combo-panel">
            <header className="myx-combo-header">
              <div>
                <span className="myx-panel-title">{currentCat.title}</span>
                <p className="myx-panel-subtitle">{currentCat.profile}</p>
              </div>
              <button className="myx-cart-close" onClick={closePanel}><X size={18} /></button>
            </header>
            <div className="myx-combo-body">
              {currentProdutos.length === 0 ? (
                <p style={{ color: '#9ca3af', textAlign: 'center', padding: '24px' }}>
                  Consulte disponibilidade via WhatsApp.
                </p>
              ) : (
                <ul className="myx-produto-list">
                  {currentProdutos.map((produto) => (
                    <li key={produto.id} className="myx-produto-item">
                      <div className="myx-produto-info">
                        <span className="myx-produto-emoji">{produto.emoji}</span>
                        <div>
                          <h3 className="myx-produto-title">{produto.title}</h3>
                          <p className="myx-produto-profile">{produto.profile}</p>
                          <span className="myx-combo-cat-pill">{produto.categoria}</span>
                        </div>
                      </div>
                      <button type="button" className="myx-button pill-button myx-produto-add" onClick={() => handleAddProdutoToCart(produto)}>
                        + Adicionar
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </aside>
        </>
      )}

      <footer className="myx-footer">
        <p className="myx-footer-brand">MYX BEER © 2026 — Distribuidora e Tabacaria · Bebidas geladas na sua porta</p>
        <a href="#" className="myx-footer-terms" onClick={(e) => e.preventDefault()}>
          Termos de Uso e Privacidade
        </a>
        <div className="myx-footer-dev">
          <span className="myx-footer-dev-label">Desenvolvida por</span>
          <a href="https://www.marketelli.com" target="_blank" rel="noopener noreferrer" className="myx-footer-dev-link">
            🌐 WWW.MARKETELLI.COM
          </a>
        </div>
      </footer>
    </div>
  )
}

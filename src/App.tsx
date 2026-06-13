import './App.css'
import { useState, useEffect } from 'react'
import { Instagram, MapPin, ShoppingCart, X } from 'lucide-react'
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

  const closePanel = () => setPanel({ type: 'none' })

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
        <div className="myx-download">
          <span className="myx-download-emoji" aria-hidden>📱</span>
          <span className="myx-download-text">Baixar o app</span>
        </div>
        <div className="myx-cert">
          <a aria-label="Instagram" className="myx-icon" href="#">
            <Instagram size={24} />
          </a>
          <a aria-label="Localização" className="myx-icon" href="#">
            <MapPin size={24} />
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
      </section>

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

      {/* ── FLOATING CART ── */}
      <button
        className="myx-floating-cart"
        aria-label="Abrir carrinho"
        onClick={() => { setIsCartOpen(true); setCheckoutStatus('idle') }}
      >
        <ShoppingCart size={20} />
        <span>Carrinho</span>
        {cartTotal > 0 && <span className="myx-cart-badge">{cartTotal}</span>}
      </button>

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

      <footer className="myx-footer">MYX BEER © 2026 — Distribuidora e Tabacaria · Bebidas geladas na sua porta</footer>
    </div>
  )
}

"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  Flame,
  HeartHandshake,
  MessageCircle,
  Minus,
  PackageCheck,
  PackageSearch,
  PhoneCall,
  Plus,
  ShieldCheck,
  ShoppingCart,
  Trash2,
  UserRound,
} from "lucide-react";
import styles from "./ChadCommerceShell.module.css";

export type ChadProduct = {
  id: string;
  name: string;
  badge: string;
  priceLabel: string;
  detail: string;
  note?: string;
  status?: "order" | "inquiry" | "coming-soon";
};

export type ChadSiteConfig = {
  slug: "peptides" | "soap";
  brand: string;
  eyebrow: string;
  headline: string;
  deck: string;
  signature: string;
  phone: string;
  phoneDisplay: string;
  theme: "patriot" | "firehouse";
  modeLabel: string;
  safetyNote: string;
  primaryCta: string;
  secondaryCta: string;
  sections: {
    proof: string[];
    process: string[];
    culture: string[];
  };
  products: ChadProduct[];
};

type CartLine = {
  id: string;
  quantity: number;
};

type Account = {
  name: string;
  email: string;
  phone: string;
};

type SavedOrder = {
  id: string;
  createdAt: string;
  site: string;
  status: string;
  lines: CartLine[];
  account: Account;
};

const blankAccount: Account = {
  name: "",
  email: "",
  phone: "",
};

function storageKey(slug: string, key: string) {
  return `chad-${slug}-${key}`;
}

function encodeOrder(config: ChadSiteConfig, account: Account, lines: CartLine[], products: ChadProduct[]) {
  const productLines = lines
    .map((line) => {
      const product = products.find((item) => item.id === line.id);
      return product ? `${line.quantity} × ${product.name} — ${product.priceLabel}` : "";
    })
    .filter(Boolean)
    .join("\n");

  return [
    `${config.brand} beta order / inquiry`,
    "",
    `Name: ${account.name || "Not entered"}`,
    `Email: ${account.email || "Not entered"}`,
    `Phone: ${account.phone || "Not entered"}`,
    "",
    "Selected items:",
    productLines || "No items selected yet.",
    "",
    "Notes:",
    config.slug === "peptides"
      ? "Peptide page is configured as consultation / compliance-gated inquiry, not direct medical advice or unsupervised checkout."
      : "Soap page is ready for product pricing, photos, shipping rules, and payment-link connection.",
  ].join("\n");
}

export default function ChadCommerceShell({ config }: { config: ChadSiteConfig }) {
  const [account, setAccount] = useState<Account>(blankAccount);
  const [cart, setCart] = useState<CartLine[]>([]);
  const [orders, setOrders] = useState<SavedOrder[]>([]);
  const [copied, setCopied] = useState(false);
  const [accountSaved, setAccountSaved] = useState(false);

  useEffect(() => {
    try {
      const savedAccount = localStorage.getItem(storageKey(config.slug, "account"));
      const savedCart = localStorage.getItem(storageKey(config.slug, "cart"));
      const savedOrders = localStorage.getItem(storageKey(config.slug, "orders"));

      if (savedAccount) setAccount(JSON.parse(savedAccount) as Account);
      if (savedCart) setCart(JSON.parse(savedCart) as CartLine[]);
      if (savedOrders) setOrders(JSON.parse(savedOrders) as SavedOrder[]);
    } catch {
      // Local beta storage should fail closed without breaking the page.
    }
  }, [config.slug]);

  useEffect(() => {
    try {
      localStorage.setItem(storageKey(config.slug, "cart"), JSON.stringify(cart));
    } catch {
      // Ignore unavailable local storage.
    }
  }, [cart, config.slug]);

  const orderSummary = useMemo(
    () => encodeOrder(config, account, cart, config.products),
    [account, cart, config],
  );

  const selectedCount = cart.reduce((sum, line) => sum + line.quantity, 0);
  const smsHref = `sms:${config.phone}?&body=${encodeURIComponent(orderSummary)}`;
  const mailHref = `mailto:?subject=${encodeURIComponent(`${config.brand} beta order / inquiry`)}&body=${encodeURIComponent(orderSummary)}`;

  function saveAccount(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      localStorage.setItem(storageKey(config.slug, "account"), JSON.stringify(account));
      setAccountSaved(true);
      window.setTimeout(() => setAccountSaved(false), 2200);
    } catch {
      setAccountSaved(false);
    }
  }

  function addProduct(product: ChadProduct) {
    if (product.status === "coming-soon") return;
    setCart((current) => {
      const existing = current.find((line) => line.id === product.id);
      if (existing) {
        return current.map((line) =>
          line.id === product.id ? { ...line, quantity: line.quantity + 1 } : line,
        );
      }

      return [...current, { id: product.id, quantity: 1 }];
    });
  }

  function updateQuantity(productId: string, delta: number) {
    setCart((current) =>
      current
        .map((line) =>
          line.id === productId ? { ...line, quantity: Math.max(0, line.quantity + delta) } : line,
        )
        .filter((line) => line.quantity > 0),
    );
  }

  function saveDraftOrder() {
    const draft: SavedOrder = {
      id: `${config.slug.toUpperCase()}-${Date.now().toString(36).toUpperCase()}`,
      createdAt: new Date().toLocaleString(),
      site: config.brand,
      status: config.slug === "peptides" ? "Inquiry drafted — human review required" : "Order drafted — payment link pending",
      lines: cart,
      account,
    };

    const nextOrders = [draft, ...orders].slice(0, 8);
    setOrders(nextOrders);
    try {
      localStorage.setItem(storageKey(config.slug, "orders"), JSON.stringify(nextOrders));
    } catch {
      // Ignore unavailable local storage.
    }
  }

  async function copySummary() {
    try {
      await navigator.clipboard.writeText(orderSummary);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  }

  return (
    <main className={`${styles.page} ${styles[config.theme]}`}>
      <div className={styles.shell}>
        <header className={styles.header}>
          <a className={styles.brandLockup} href="/chad" aria-label="Chad project hub">
            <span className={styles.brandMark}>{config.slug === "peptides" ? "PP" : "FH"}</span>
            <span>
              <strong>{config.brand}</strong>
              <small>brother-built beta commerce frame</small>
            </span>
          </a>

          <nav className={styles.nav} aria-label={`${config.brand} navigation`}>
            <a href="#products">Products</a>
            <a href="#account">Account</a>
            <a href="#orders">Track</a>
            <a className={styles.navCall} href={`tel:${config.phone}`}>
              <PhoneCall size={15} />
              {config.phoneDisplay}
            </a>
          </nav>
        </header>

        <section className={styles.hero}>
          <div className={styles.heroCopy}>
            <div className={styles.eyebrow}>
              <ShieldCheck size={15} />
              {config.eyebrow}
            </div>
            <h1>{config.headline}</h1>
            <p className={styles.deck}>{config.deck}</p>
            <p className={styles.signature}>{config.signature}</p>

            <div className={styles.actions}>
              <a href="#products" className={styles.primary}>
                {config.primaryCta}
                <ArrowRight size={17} />
              </a>
              <a href="#account" className={styles.secondary}>
                {config.secondaryCta}
              </a>
            </div>

            <div className={styles.statusLine}>
              <span><BadgeCheck size={14} /> Beta storefront</span>
              <span><PackageCheck size={14} /> Order framework</span>
              <span><UserRound size={14} /> Local account tracking</span>
            </div>
          </div>

          <aside className={styles.heroPanel}>
            <div className={styles.panelTop}>
              <span>{config.modeLabel}</span>
              <strong>{selectedCount}</strong>
              <small>items selected</small>
            </div>

            <div className={styles.visualBadge}>
              {config.slug === "peptides" ? (
                <>
                  <div className={styles.dna}>
                    <span />
                    <span />
                    <span />
                    <span />
                  </div>
                  <strong>Patriot Peptides</strong>
                  <p>classification inquiry // human follow-up</p>
                </>
              ) : (
                <>
                  <Flame size={48} />
                  <strong>Foreman Soap Co.</strong>
                  <p>vegan bars // firehouse grit // clean finish</p>
                </>
              )}
            </div>

            <div className={styles.safetyBox}>
              <ShieldCheck size={18} />
              <p>{config.safetyNote}</p>
            </div>
          </aside>
        </section>

        <section className={styles.cultureGrid}>
          <article>
            <HeartHandshake size={22} />
            <h2>Built for Chad’s lane</h2>
            <p>
              Fire-service backbone, family-man credibility, old-school work ethic, hockey-room humor,
              and a respectful customer path that does not pretend the beta is finished.
            </p>
          </article>
          <article>
            <PackageSearch size={22} />
            <h2>Same operating frame</h2>
            <p>
              Landing page, product cards, account capture, cart/inquiry draft, order-history shell,
              and handoff buttons are shared across both sites so the system can scale cleanly.
            </p>
          </article>
          <article>
            <ShoppingCart size={22} />
            <h2>Payment-ready structure</h2>
            <p>
              The checkout area is prepared for Stripe payment links, Shopify buy buttons, Square,
              or simple text-to-order while pricing, photos, inventory, tax, and shipping rules are finalized.
            </p>
          </article>
        </section>

        <section className={styles.splitSection}>
          <div>
            <div className={styles.sectionLabel}>How customers understand it</div>
            <h2>No mystery. Pick the lane, leave the receipt, and let Chad follow up.</h2>
          </div>
          <div className={styles.threeLists}>
            <div>
              <h3>Proof points</h3>
              {config.sections.proof.map((item) => <p key={item}><CheckCircle2 size={14} /> {item}</p>)}
            </div>
            <div>
              <h3>Order flow</h3>
              {config.sections.process.map((item) => <p key={item}><CheckCircle2 size={14} /> {item}</p>)}
            </div>
            <div>
              <h3>Voice</h3>
              {config.sections.culture.map((item) => <p key={item}><CheckCircle2 size={14} /> {item}</p>)}
            </div>
          </div>
        </section>

        <section id="products" className={styles.productSection}>
          <div className={styles.sectionHeader}>
            <div>
              <div className={styles.sectionLabel}>Product framework</div>
              <h2>{config.slug === "peptides" ? "Peptide classification inquiry cards" : "Firehouse vegan soap lineup"}</h2>
            </div>
            <p>
              Replace copy, photos, prices, and compliance language as Chad confirms the catalog.
              The buttons already feed the order/inquiry tracker below.
            </p>
          </div>

          <div className={styles.productGrid}>
            {config.products.map((product) => {
              const line = cart.find((item) => item.id === product.id);

              return (
                <article key={product.id} className={styles.productCard}>
                  <div className={styles.productTop}>
                    <span>{product.badge}</span>
                    <strong>{product.priceLabel}</strong>
                  </div>
                  <h3>{product.name}</h3>
                  <p>{product.detail}</p>
                  {product.note ? <small>{product.note}</small> : null}
                  <div className={styles.productActions}>
                    {line ? (
                      <div className={styles.quantity}>
                        <button aria-label={`Remove one ${product.name}`} onClick={() => updateQuantity(product.id, -1)}><Minus size={14} /></button>
                        <span>{line.quantity}</span>
                        <button aria-label={`Add one ${product.name}`} onClick={() => updateQuantity(product.id, 1)}><Plus size={14} /></button>
                      </div>
                    ) : (
                      <button onClick={() => addProduct(product)} disabled={product.status === "coming-soon"}>
                        {product.status === "inquiry" ? "Add to inquiry" : product.status === "coming-soon" ? "Coming soon" : "Add to order"}
                      </button>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section id="account" className={styles.orderDesk}>
          <div className={styles.accountCard}>
            <div className={styles.sectionLabel}>Customer account beta</div>
            <h2>Create a local customer profile</h2>
            <p>
              This beta stores account and order history in this browser so Chad can test the customer path.
              Production auth can be connected later through Shopify, Supabase, Clerk, or a custom backend.
            </p>

            <form onSubmit={saveAccount} className={styles.form}>
              <label>
                Name
                <input value={account.name} onChange={(event) => setAccount({ ...account, name: event.target.value })} placeholder="Customer name" />
              </label>
              <label>
                Email
                <input value={account.email} onChange={(event) => setAccount({ ...account, email: event.target.value })} placeholder="customer@example.com" type="email" />
              </label>
              <label>
                Phone
                <input value={account.phone} onChange={(event) => setAccount({ ...account, phone: event.target.value })} placeholder="Best call/text number" />
              </label>
              <button type="submit">{accountSaved ? "Saved" : "Save customer profile"}</button>
            </form>
          </div>

          <div className={styles.cartCard}>
            <div className={styles.sectionLabel}>Checkout / handoff</div>
            <h2>{selectedCount ? `${selectedCount} selected` : "No items selected yet"}</h2>

            <div className={styles.cartList}>
              {cart.length ? cart.map((line) => {
                const product = config.products.find((item) => item.id === line.id);
                if (!product) return null;

                return (
                  <div key={line.id} className={styles.cartLine}>
                    <span>{line.quantity} × {product.name}</span>
                    <button aria-label={`Remove ${product.name}`} onClick={() => updateQuantity(line.id, -line.quantity)}><Trash2 size={14} /></button>
                  </div>
                );
              }) : (
                <p className={styles.empty}>Add cards above to generate a clean text/email order summary.</p>
              )}
            </div>

            <div className={styles.checkoutButtons}>
              <button onClick={saveDraftOrder} disabled={!cart.length}>
                Save draft to tracker
              </button>
              <a href={smsHref} onClick={() => saveDraftOrder()}>
                <MessageCircle size={15} />
                Text Chad
              </a>
              <a href={mailHref} onClick={() => saveDraftOrder()}>
                Email order
              </a>
              <button type="button" onClick={copySummary}>
                {copied ? "Copied" : "Copy summary"}
              </button>
            </div>

            <pre className={styles.summary}>{orderSummary}</pre>
          </div>
        </section>

        <section id="orders" className={styles.tracker}>
          <div className={styles.sectionHeader}>
            <div>
              <div className={styles.sectionLabel}>Order tracking framework</div>
              <h2>Customer-visible order history shell</h2>
            </div>
            <p>
              This is the preview version of the customer account dashboard. Backend sync, admin fulfillment,
              shipment tracking, and payment status are the next connection layer.
            </p>
          </div>

          <div className={styles.orderGrid}>
            {orders.length ? orders.map((order) => (
              <article key={order.id} className={styles.orderCard}>
                <strong>{order.id}</strong>
                <span>{order.createdAt}</span>
                <p>{order.status}</p>
                <small>{order.lines.reduce((sum, line) => sum + line.quantity, 0)} selected item(s)</small>
              </article>
            )) : (
              <article className={styles.orderCard}>
                <strong>No draft orders yet</strong>
                <span>Use the checkout area above</span>
                <p>Draft orders will appear here for beta testing on this device.</p>
              </article>
            )}
          </div>
        </section>

        <footer className={styles.footer}>
          <a href="/chad">Chad project hub</a>
          <a href={`tel:${config.phone}`}><PhoneCall size={14} /> {config.phoneDisplay}</a>
          <a href="#account">Customer account beta</a>
        </footer>
      </div>
    </main>
  );
}

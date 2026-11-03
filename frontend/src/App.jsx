import { useState, useEffect } from "react";
import stationeryHero from "./assets/stationery-hero.png";
import productNotebook from "./assets/product-notebook.png";
import productPens from "./assets/product-pens.png";
import productStickyNotes from "./assets/product-sticky-notes.png";
import productHighlighters from "./assets/product-highlighters.png";
import productOrganizer from "./assets/product-organizer.png";
import productJournal from "./assets/product-journal.png";
import "./App.css";

function App() {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [products, setProducts] = useState([]);
  const [checkoutForm, setCheckoutForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    pinCode: "",
  });

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const [signupForm, setSignupForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [registeredUser, setRegisteredUser] = useState(null);
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    fetch("http://127.0.0.1:8000/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);
  console.log(products);

  const addToCart = (name, price) => {
    setOrderPlaced(false);
    const existingItem = cart.find((item) => item.name === name);

    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.name === name ? { ...item, quantity: item.quantity + 1 } : item,
        ),
      );
    } else {
      setCart([...cart, { name: name, price: price, quantity: 1 }]);
    }
  };
  return (
    <>
      <header className="navbar">
        <div className="logo">PaperNest</div>

        <nav>
          <a href="#home">Home</a>
          <a href="#products">Products</a>
          <a href="#categories">Categories</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>

        <div className="nav-actions">
          {isLoggedIn ? (
            <button
              className="login-btn"
              onClick={() => {
                setIsLoggedIn(false);
                alert("Logged out successfully!");
              }}
            >
              Logout
            </button>
          ) : (
            <button
              className="login-btn"
              onClick={() => {
                setShowLogin(true);
                setShowCheckout(false);
                setShowSignup(false);
                setShowCart(false);
                setOrderPlaced(false);
              }}
            >
              Login
            </button>
          )}
          <button
            className="cart-btn"
            onClick={() => {
              setShowCart(!showCart);
              setShowLogin(false);
              setShowSignup(false);
              setShowCheckout(false);
              setOrderPlaced(false);
            }}
          >
            Cart ({cart.reduce((total, item) => total + item.quantity, 0)})
          </button>
        </div>
      </header>

      {showLogin && (
        <div className="login-panel">
          <h2 className="login-title">Login</h2>

          <form
            onSubmit={async (e) => {
              e.preventDefault();

              if (!loginForm.email || !loginForm.password) {
                alert("Please enter email and password.");
                return;
              }
              try {
                const response = await fetch("http://127.0.0.1:8000/login", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    email: loginForm.email,
                    password: loginForm.password,
                  }),
                });

                const data = await response.json();

                if (!response.ok) {
                  alert(data.detail || "Login failed");
                  return;
                }

                alert("Login successful!");
                setIsLoggedIn(true);
                setShowLogin(false);
              } catch (error) {
                alert("Cannot connect to server.");
              }
            }}
          >
            <input
              type="email"
              placeholder="Email"
              value={loginForm.email}
              onChange={(e) =>
                setLoginForm({ ...loginForm, email: e.target.value })
              }
            />
            <input
              type="password"
              placeholder="Password"
              value={loginForm.password}
              onChange={(e) =>
                setLoginForm({ ...loginForm, password: e.target.value })
              }
            />
            <button type="submit" className="login-submit-btn">
              Login
            </button>
            <p className="signup-text">
              Don&apos;t have an account?{" "}
              <span
                onClick={() => {
                  setShowSignup(true);
                  setShowLogin(false);
                  setShowCart(false);
                  setOrderPlaced(false);
                }}
              >
                Create Account
              </span>
            </p>
          </form>
        </div>
      )}

      {showSignup && (
        <div className="login-panel">
          <h2 className="login-title">Create Account</h2>
          <input
            type="text"
            placeholder="Full Name"
            value={signupForm.fullName}
            onChange={(e) =>
              setSignupForm({ ...signupForm, fullName: e.target.value })
            }
          />
          <input
            type="email"
            placeholder="Email"
            value={signupForm.email}
            onChange={(e) =>
              setSignupForm({ ...signupForm, email: e.target.value })
            }
          />
          <input
            type="password"
            placeholder="Password"
            value={signupForm.password}
            onChange={(e) =>
              setSignupForm({ ...signupForm, password: e.target.value })
            }
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={signupForm.confirmPassword}
            onChange={(e) =>
              setSignupForm({ ...signupForm, confirmPassword: e.target.value })
            }
          />
          <button
            className="login-submit-btn"
            onClick={() => {
              if (
                !signupForm.fullName ||
                !signupForm.email ||
                !signupForm.password ||
                !signupForm.confirmPassword
              ) {
                alert("Please fill in all fields.");
                return;
              }
              if (signupForm.password !== signupForm.confirmPassword) {
                alert("Passwords do not match.");
                return;
              }
              fetch("http://127.0.0.1:8000/signup", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  name: signupForm.fullName,
                  email: signupForm.email,
                  password: signupForm.password,
                }),
              })
                .then(async (response) => {
                  const data = await response.json();

                  if (!response.ok) {
                    throw new Error(data.detail || "Signup failed");
                  }

                  return data;
                })
                .then((data) => {
                  alert("Account created successfully!");
                  setShowSignup(false);
                  setShowLogin(true);
                })
                .catch((error) => {
                  alert(error.message);
                });
            }}
          >
            Sign Up
          </button>
        </div>
      )}

      {showCart && (
        <div className="cart-panel">
          <h2 className="cart-title">Your Cart</h2>

          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <>
              <ul>
                {cart.map((item, index) => (
                  <li key={index} className="cart-item">
                    {item.name} - ₹{item.price} × {item.quantity} = ₹
                    {item.price * item.quantity}
                    <button
                      className="quantity-btn"
                      onClick={() =>
                        setCart(
                          cart
                            .map((cartItem) =>
                              cartItem.name === item.name
                                ? {
                                    ...cartItem,
                                    quantity: cartItem.quantity - 1,
                                  }
                                : cartItem,
                            )
                            .filter((cartItem) => cartItem.quantity > 0),
                        )
                      }
                    >
                      -
                    </button>
                    <button
                      className="quantity-btn"
                      onClick={() =>
                        setCart(
                          cart.map((cartItem) =>
                            cartItem.name === item.name
                              ? { ...cartItem, quantity: cartItem.quantity + 1 }
                              : cartItem,
                          ),
                        )
                      }
                    >
                      +
                    </button>
                    <button
                      className="remove-btn"
                      onClick={() =>
                        setCart(
                          cart.filter(
                            (cartItem) => cartItem.name !== item.name,
                          ),
                        )
                      }
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
              <h3 className="cart-total">
                Total: ₹
                {cart.reduce(
                  (total, item) => total + item.price * item.quantity,
                  0,
                )}
              </h3>

              <button className="clear-cart-btn" onClick={() => setCart([])}>
                Clear Cart
              </button>

              <button
                className="checkout-btn"
                onClick={() => {
                  setShowCheckout(true);
                  setShowCart(false);
                }}
              >
                Checkout
              </button>
            </>
          )}
        </div>
      )}
      {showCheckout && (
        <div className="checkout-panel">
          <h2>Checkout</h2>
          <p>Please enter your delivery details.</p>

          <input
            type="text"
            placeholder="Full Name"
            value={checkoutForm.fullName}
            onChange={(e) =>
              setCheckoutForm({ ...checkoutForm, fullName: e.target.value })
            }
          />
          <input
            type="email"
            placeholder="Email Address"
            value={checkoutForm.email}
            onChange={(e) =>
              setCheckoutForm({ ...checkoutForm, email: e.target.value })
            }
          />
          <input
            type="tel"
            placeholder="Phone Number"
            value={checkoutForm.phone}
            onChange={(e) =>
              setCheckoutForm({ ...checkoutForm, phone: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Delivery Address"
            value={checkoutForm.address}
            onChange={(e) =>
              setCheckoutForm({ ...checkoutForm, address: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="City"
            value={checkoutForm.city}
            onChange={(e) =>
              setCheckoutForm({ ...checkoutForm, city: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="PIN Code"
            value={checkoutForm.pinCode}
            onChange={(e) =>
              setCheckoutForm({ ...checkoutForm, pinCode: e.target.value })
            }
          />
          <button
            className="place-order-btn"
            onClick={async () => {
              if (
                !checkoutForm.fullName ||
                !checkoutForm.email ||
                !checkoutForm.phone ||
                !checkoutForm.address ||
                !checkoutForm.city ||
                !checkoutForm.pinCode
              ) {
                alert("Please fill in all fields.");
                return;
              }
              const response = await fetch("http://127.0.0.1:8000/orders", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  customer_name: checkoutForm.fullName,
                  email: checkoutForm.email,
                  phone: checkoutForm.phone,
                  address: checkoutForm.address,
                  city: checkoutForm.city,
                  pin_code: checkoutForm.pinCode,
                  items: JSON.stringify(cart),
                  total: cart.reduce(
                    (sum, item) => sum + item.price * item.quantity,
                    0,
                  ),
                }),
              });

              if (!response.ok) {
                alert("Order failed. Please try again.");
                return;
              }

              setOrderPlaced(true);
              setCart([]);
              setShowCheckout(false);
            }}
          >
            Place Order
          </button>
        </div>
      )}
      {orderPlaced && (
        <div className="order-success">
          <h2>🎉 Order Placed Successfully!</h2>
          <p>Thank you for shopping with PaperNest.</p>
          <p>Your order has been received and will be processed soon.</p>
        </div>
      )}

      <main>
        <section className="hero-section" id="home">
          <div className="hero-content">
            <p className="hero-tag">Premium Stationery Collection</p>

            <h1>
              Make Every Idea
              <span> Worth Writing</span>
            </h1>

            <p className="hero-text">
              Discover notebooks, pens, art supplies and everyday stationery
              designed for study, work and creativity.
            </p>

            <div className="hero-buttons">
              <button
                className="primary-btn"
                onClick={() => {
                  document
                    .getElementById("products")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Shop Now
              </button>
              <button
                className="secondary-btn"
                onClick={() => {
                  document
                    .getElementById("products")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Explore Products
              </button>
            </div>

            <div className="hero-features">
              <div className="feature">
                <span className="feature-icon">🚚</span>
                <strong>Fast Delivery</strong>
                <p>Across India</p>
              </div>

              <div className="feature">
                <span className="feature-icon">🛡️</span>
                <strong>Secure Payment</strong>
                <p>100% Safe</p>
              </div>

              <div className="feature">
                <span className="feature-icon">🌱</span>
                <strong>Eco-Friendly</strong>
                <p>Sustainable Choices</p>
              </div>

              <div className="feature">
                <span className="feature-icon">♡</span>
                <strong>Loved by Students</strong>
                <p>& Professionals</p>
              </div>
            </div>
          </div>
          <div className="hero-image">
            <img src={stationeryHero} alt="Stationery collection" />
          </div>
        </section>
        <section className="products-section" id="products">
          <div className="section-heading">
            <p>Our Collection</p>
            <h2>Featured Products</h2>
            <span>Everything you need to study, create and organize.</span>
          </div>
          <div className="products-grid">
            {products.map((product) => (
              <div className="product-card" key={product.id}>
                <div className="product-image">
                  <img
                    src={`/src/assets/${product.image}`}
                    alt={product.name}
                  />
                </div>

                <h3>{product.name}</h3>
                <p className="product-category">{product.category}</p>
                <p className="product-price">₹{product.price}</p>

                <button
                  className="add-cart-btn"
                  onClick={() => addToCart(product.name, product.price)}
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </section>
        <section className="categories-section" id="categories">
          <div className="section-heading">
            <p>Shop by Category</p>
            <h2>Find What You Need</h2>
            <span>Explore stationery made for every purpose.</span>
          </div>

          <div className="categories-grid">
            <div
              className="category-card"
              onClick={() =>
                document
                  .getElementById("products")
                  .scrollIntoView({ behavior: "smooth" })
              }
            >
              <span>📓</span>
              <h3>Notebooks</h3>
            </div>

            <div
              className="category-card"
              onClick={() =>
                document
                  .getElementById("products")
                  .scrollIntoView({ behavior: "smooth" })
              }
            >
              <span>🖊️</span>
              <h3>Pens</h3>
            </div>

            <div
              className="category-card"
              onClick={() =>
                document
                  .getElementById("products")
                  .scrollIntoView({ behavior: "smooth" })
              }
            >
              <span>🎨</span>
              <h3>Art Supplies</h3>
            </div>

            <div
              className="category-card"
              onClick={() =>
                document
                  .getElementById("products")
                  .scrollIntoView({ behavior: "smooth" })
              }
            >
              <span>🗂️</span>
              <h3>Desk Essentials</h3>
            </div>
          </div>
        </section>
        <section className="about-section" id="about">
          <div className="section-heading">
            <p>About PaperNest</p>
            <h2>Stationery Made for Your Ideas</h2>
            <span>
              PaperNest brings together stylish and useful stationery for
              students, creators, and everyday work.
            </span>
          </div>
        </section>
        <section className="contact-section" id="contact">
          <div className="section-heading">
            <p>Contact Us</p>
            <h2>We'd Love to Hear From You</h2>
            <span>
              Have a question about PaperNest? Send us a message and we'll get
              back to you.
            </span>
          </div>
          <form
            className="contact-form"
            onSubmit={async (e) => {
              e.preventDefault();

              if (
                !contactForm.name ||
                !contactForm.email ||
                !contactForm.message
              ) {
                alert("Please fill in all fields.");
                return;
              }

              const response = await fetch("http://127.0.0.1:8000/contact", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  name: contactForm.name,
                  email: contactForm.email,
                  message: contactForm.message,
                }),
              });

              if (!response.ok) {
                alert("Failed to send message. Please try again.");
                return;
              }

              alert("Message sent successfully!");

              setContactForm({
                name: "",
                email: "",
                message: "",
              });
            }}
          >
            <input
              type="text"
              placeholder="Your Name"
              value={contactForm.name}
              onChange={(e) =>
                setContactForm({ ...contactForm, name: e.target.value })
              }
            />
            <input
              type="email"
              placeholder="Your Email"
              value={contactForm.email}
              onChange={(e) =>
                setContactForm({ ...contactForm, email: e.target.value })
              }
            />
            <textarea
              placeholder="Your Message"
              value={contactForm.message}
              onChange={(e) =>
                setContactForm({ ...contactForm, message: e.target.value })
              }
            ></textarea>

            <button type="submit">Send Message</button>
          </form>
        </section>
      </main>
    </>
  );
}

export default App;

const products = [
  {
    id: 1,
    name: "Mystique Smartwatch X1",
    description: "Track fitness, heart rate, and stay connected on the go.",
    price: 199.99,
    category: "Smartwatch",
    image: "images/smartwatch-8300238_1280.jpg",
    specs: [
      "1.4\" AMOLED touch display",
      "Heart rate & blood oxygen monitoring",
      "Water resistant (5ATM)",
      "7-day battery life",
      "GPS + GLONASS tracking",
      "200+ watch faces",
      "Smart notifications"
    ]
  },
  {
    id: 2,
    name: "Mystique Buds Pro",
    description: "Wireless earphones with noise cancellation and deep bass.",
    price: 79.99,
    category: "Earphones",
    image: "images/airpods-7976095_1280.jpg",
    specs: [
      "Active Noise Cancellation",
      "6mm dynamic drivers",
      "IPX4 water resistance",
      "24-hour total battery life",
      "Bluetooth 5.2",
      "Touch controls",
      "Built-in microphone"
    ]
  },
  {
    id: 3,
    name: "Mystique Phone Z5",
    description: "Powerful Android smartphone with 64MP camera.",
    price: 399.99,
    category: "Phone",
    image: "images/smartphone-7063771_1280.jpg",
    specs: [
      "6.5\" FHD+ AMOLED display",
      "64MP triple camera system",
      "128GB storage + microSD slot",
      "5000mAh battery",
      "MediaTek Dimensity 900",
      "8GB RAM",
      "5G connectivity"
    ]
  },
  {
    id: 4,
    name: "Mystique FitBand 2",
    description: "Slim fitness tracker with sleep and step tracking.",
    price: 49.99,
    category: "Smartwatch",
    image: "images/smartwatch-6500150_1280.jpg",
    specs: [
      "1.1\" color touch display",
      "24/7 heart rate monitoring",
      "14-day battery life",
      "IP68 water resistant",
      "15+ sports modes",
      "Sleep tracking",
      "Smartphone notifications"
    ]
  },
  {
    id: 5,
    name: "Mystique EarMax",
    description: "Over-ear headphones with premium sound and comfort.",
    price: 129.99,
    category: "Earphones",
    image: "images/airpods-7226558_1280.jpg",
    specs: [
      "40mm dynamic drivers",
      "Active Noise Cancellation",
      "30-hour battery life",
      "Foldable design",
      "Bluetooth 5.0",
      "3.5mm audio jack",
      "Built-in microphone"
    ]
  },
  {
    id: 6,
    name: "Mystique UltraTab",
    description: "10.5-inch tablet perfect for work and play.",
    price: 299.99,
    category: "Tablet",
    image: "images/tablet-462950_1280.png",
    specs: [
      "10.5\" 2K display",
      "128GB storage (expandable)",
      "8MP rear + 5MP front camera",
      "8000mAh battery",
      "Octa-core processor",
      "4GB RAM",
      "Dual speakers"
    ]
  },
  {
    id: 7,
    name: "Mystique Phone M10",
    description: "Mid-range phone with 5000mAh battery and dual SIM.",
    price: 249.99,
    category: "Phone",
    image: "images/apple-1867762_1280.jpg",
    specs: [
      "6.4\" HD+ display",
      "48MP dual camera",
      "5000mAh battery",
      "128GB storage",
      "MediaTek Helio G85",
      "6GB RAM",
      "Dual SIM support"
    ]
  },
  {
    id: 8,
    name: "Mystique Smartwatch Kids",
    description: "Safe and fun smartwatch for kids with GPS tracking.",
    price: 59.99,
    category: "Smartwatch",
    image: "images/smartphone-7063771_1280.jpg",
    specs: [
      "1.3\" color touch display",
      "GPS location tracking",
      "Parental controls",
      "5-day battery life",
      "IP67 water resistant",
      "2-way calling",
      "Step counter"
    ]
  },
  {
    id: 9,
    name: "Mystique Pods Lite",
    description: "Budget-friendly wireless earbuds with clear sound.",
    price: 39.99,
    category: "Earphones",
    image: "images/headphones-5282687_1280.jpg",
    specs: [
      "6mm dynamic drivers",
      "Bluetooth 5.0",
      "IPX4 sweat resistance",
      "18-hour total battery life",
      "Touch controls",
      "Built-in microphone",
      "Lightweight design"
    ]
  },
  {
    id: 10,
    name: "Mystique ZoomCam",
    description: "HD webcam perfect for video calls and streaming.",
    price: 59.99,
    category: "Accessory",
    image: "images/camera-541213_1280.jpg",
    specs: [
      "1080p Full HD resolution",
      "Autofocus",
      "Built-in microphone",
      "Privacy shutter",
      "Adjustable clip",
      "Plug-and-play USB",
      "60fps streaming"
    ]
  },
  {
    id: 11,
    name: "Mystique Watch Luxe",
    description: "Premium smartwatch with leather strap and AMOLED display.",
    price: 229.99,
    category: "Smartwatch",
    image: "images/smartwatch-8300238_1280.jpg",
    specs: [
      "1.5\" AMOLED display",
      "Genuine leather strap",
      "Blood oxygen monitoring",
      "10ATM water resistance",
      "Wireless charging",
      "NFC payments",
      "30+ workout modes"
    ]
  },
  {
    id: 12,
    name: "Mystique Phone ZL Max",
    description: "Flagship phone with 8GB RAM and fast charging.",
    price: 499.99,
    category: "Phone",
    image: "images/samsung-4721542_1280.jpg",
    specs: [
      "6.7\" QHD+ 120Hz display",
      "108MP triple camera system",
      "256GB storage",
      "65W fast charging",
      "Snapdragon 8 Gen 1",
      "8GB RAM",
      "5G + WiFi 6"
    ]
  },
  {
    id: 13,
    name: "Mystique Tab Mini",
    description: "Compact 8-inch tablet for reading and streaming.",
    price: 179.99,
    category: "Tablet",
    image: "images/laptop-1846277_1280.jpg",
    specs: [
      "8\" HD display",
      "64GB storage (expandable)",
      "5000mAh battery",
      "Quad-core processor",
      "3GB RAM",
      "Dual speakers",
      "Slim metal design"
    ]
  },
  {
    id: 14,
    name: "Mystique BassBoom",
    description: "Portable Bluetooth speaker with deep bass and long battery.",
    price: 69.99,
    category: "Accessory",
    image: "images/audio-7276511_1280.jpg",
    specs: [
      "20W RMS output",
      "Passive bass radiator",
      "IPX7 waterproof",
      "24-hour battery life",
      "Bluetooth 5.0",
      "Built-in microphone",
      "AUX input"
    ]
  },
  {
    id: 15,
    name: "Mystique EarShield",
    description: "Noise-isolating wired earphones for budget-conscious users.",
    price: 19.99,
    category: "Earphones",
    image: "images/headphones-5282687_1280.jpg",
    specs: [
      "9mm dynamic drivers",
      "In-ear noise isolation",
      "Tangle-free cable",
      "Inline microphone",
      "3.5mm jack",
      "Lightweight design",
      "Multiple ear tip sizes"
    ]
  }
];
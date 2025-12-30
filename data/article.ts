const article = {
  title: `What Naira Decoupling Means 
for Nigeria’s Economy`,
  image: {
    url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bmF0dXJlfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    caption: "Naira Currency Notes",
  },
  category: { name: "Culture", slug: "culture" },
  publishedAt: "Aug 23, 2023",
  exerpt: `For decades, oil has dictated the fate of the naira. When crude prices soared, the currency strengthened; when they collapsed, the naira buckled. This cycle, so familiar to Nigerians, once seemed unbreakable. Yet in 2025, something unusual happened: oil prices fell sharply, but the naira held its ground. What changed?`,
  author: {
    name: "Jane Doe",
    slug: "jane-doe",
  },
};

const articles = [
  {
    title: "What Naira Decoupling Means for Nigeria’s Economy",
    publishedAt: "Sep 10, 2023",
    category: { name: "Economy", slug: "economy" },
    author: { name: "John Smith" },
    image: {
      url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bmF0dXJlfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
      caption: "Naira Currency Notes",
    },
  },
  {
    title: "The Future of Cryptocurrency",
    publishedAt: "Sep 5, 2023",
    author: { name: "John Smith" },
    category: {
      name: "Technology",
      slug: "technology",
    },
    image: {
      url: "https://images.unsplash.com/photo-1455849318743-b2233052fcff?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      caption: "Cryptocurrency Coins",
    },
  },
];

export { article, articles };

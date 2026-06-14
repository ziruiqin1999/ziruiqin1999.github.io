const posts = [
  {
    title: "多模态鲁棒性：从数据偏移到评价协议",
    date: "2026-06-13",
    category: "Research",
    tags: ["multimodal", "robustness", "evaluation"],
    summary: "梳理多模态模型在真实场景中失效的常见原因，以及为什么评价协议比单个指标更关键。",
    body: [
      "多模态鲁棒性不能只看干净测试集上的平均分。真实系统会遇到图像质量变化、文本歧义、模态缺失、跨设备偏差和领域迁移。",
      "我会优先关注三类问题：扰动下性能是否稳定、模型是否过度依赖单一模态、错误是否能被校准或发现。",
      "后续阅读清单可以围绕分布偏移、OOD 检测、跨模态对齐和安全评价协议展开。"
    ]
  },
  {
    title: "医疗 AI 可靠性笔记：泛化、校准与临床风险",
    date: "2026-06-10",
    category: "Medical AI",
    tags: ["medical-ai", "calibration", "deployment"],
    summary: "医疗 AI 的核心不是更高的榜单分数，而是在不同医院、设备和人群上仍然可解释、可校准、可追责。",
    body: [
      "医疗场景的模型泛化风险通常来自数据采集流程、设备差异、标签噪声和人群结构变化。",
      "可靠性评估应同时覆盖性能、校准、不确定性、失败案例和临床工作流影响。",
      "写研究计划时，可以把技术问题和临床部署风险连起来，而不是只描述模型结构。"
    ]
  },
  {
    title: "博士申请研究计划的宽窄平衡",
    date: "2026-06-06",
    category: "PhD",
    tags: ["phd", "research-plan", "fit"],
    summary: "研究计划需要足够聚焦以显示能力，也要足够宽，能覆盖未来几年真实可能推进的问题。",
    body: [
      "一个可用的研究计划不应该像单篇论文提案，也不应该像空泛方向介绍。它需要说明长期问题、已有基础和可执行切入点。",
      "较稳的表述是围绕可靠 AI 展开，并自然连接鲁棒性、多模态表征、医疗 AI 和机器人感知。",
      "联系导师时，重点应放在研究问题的重合度和方法互补性，而不是堆关键词。"
    ]
  },
  {
    title: "论文阅读模板：方法、实验和限制",
    date: "2026-06-01",
    category: "Workflow",
    tags: ["paper-reading", "workflow", "notes"],
    summary: "一篇论文是否值得细读，取决于问题设定、方法可迁移性、实验是否说明了真实贡献，以及限制是否影响你的方向。",
    body: [
      "读论文时我会先写四件事：它解决什么问题、核心方法是什么、实验真正证明了什么、限制在哪里。",
      "不要只复述摘要。摘要往往给的是作者想让你相信的故事，实验和消融才说明方法的边界。",
      "最后单独写一行和自己方向的关系：值得精读、可作为相关工作、只需知道结论，或暂时跳过。"
    ]
  }
];

const essays = [
  {
    title: "深夜论文桌",
    date: "Life Frames",
    image: "assets/hero-research-desk.png",
    summary: "一页笔记、一杯咖啡和还没关闭的实验窗口。",
    body: "有些问题不是一晚上能想清楚的，但把问题写下来，第二天就会更容易继续。"
  },
  {
    title: "申请季清单",
    date: "Planning",
    image: "assets/hero-research-desk.png",
    summary: "导师、方向、材料和时间线，逐项拆开会轻松很多。",
    body: "申请不是只准备一个完美版本，而是在每次反馈后变得更具体、更真实。"
  },
  {
    title: "读完一篇值得细读的论文",
    date: "Reading",
    image: "assets/hero-research-desk.png",
    summary: "好论文会留下一个可以继续追问的问题。",
    body: "如果一篇论文能改变我对问题边界的判断，它就不只是相关工作，而是值得放进长期阅读地图。"
  }
];

const postGrid = document.querySelector("#postGrid");
const filters = document.querySelector("#filters");
const searchInput = document.querySelector("#searchInput");
const reader = document.querySelector("#reader");
const readerClose = document.querySelector("#readerClose");
const readerTitle = document.querySelector("#readerTitle");
const readerMeta = document.querySelector("#readerMeta");
const readerBody = document.querySelector("#readerBody");
const essayStrip = document.querySelector("#essayStrip");
const essayModal = document.querySelector("#essayModal");
const essayClose = document.querySelector("#essayClose");
const essayTitle = document.querySelector("#essayTitle");
const essayMeta = document.querySelector("#essayMeta");
const essayBody = document.querySelector("#essayBody");
const resumeModal = document.querySelector("#resumeModal");
const resumeButton = document.querySelector("#resumeButton");
const resumeClose = document.querySelector("#resumeClose");

let activeCategory = "全部";

const categories = ["全部", ...new Set(posts.map((post) => post.category))];

function renderFilters() {
  filters.innerHTML = categories
    .map(
      (category) => `
        <button class="filter-button ${category === activeCategory ? "active" : ""}" type="button" data-category="${category}">
          ${category}
        </button>
      `
    )
    .join("");
}

function renderPosts() {
  const query = searchInput.value.trim().toLowerCase();
  const visiblePosts = posts.filter((post) => {
    const matchesCategory = activeCategory === "全部" || post.category === activeCategory;
    const searchable = `${post.title} ${post.summary} ${post.category} ${post.tags.join(" ")}`.toLowerCase();
    return matchesCategory && searchable.includes(query);
  });

  postGrid.innerHTML = visiblePosts.length
    ? visiblePosts.map(postTemplate).join("")
    : `<p class="empty">没有找到匹配的文章。</p>`;
}

function postTemplate(post) {
  const index = posts.indexOf(post);
  return `
    <article class="post-card">
      <p class="post-meta">${post.date} / ${post.category}</p>
      <h3>${post.title}</h3>
      <p>${post.summary}</p>
      <div class="post-tags">
        ${post.tags.map((tag) => `<span>${tag}</span>`).join("")}
      </div>
      <button type="button" data-post="${index}">阅读全文</button>
    </article>
  `;
}

function renderEssays() {
  essayStrip.innerHTML = essays
    .map(
      (essay, index) => `
        <article class="essay-card" tabindex="0" role="button" data-essay="${index}" aria-label="查看随笔 ${essay.title}">
          <figure>
            <img src="${essay.image}" alt="${essay.title}" />
            <figcaption>
              <p class="post-meta">${essay.date}</p>
              <h3>${essay.title}</h3>
              <p>${essay.summary}</p>
            </figcaption>
          </figure>
        </article>
      `
    )
    .join("");
}

function openModal(modal, focusTarget) {
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  focusTarget?.focus();
}

function closeModal(modal) {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
}

function openPost(index) {
  const post = posts[index];
  readerTitle.textContent = post.title;
  readerMeta.textContent = `${post.date} / ${post.category}`;
  readerBody.innerHTML = `
    ${post.body.map((paragraph) => `<p>${paragraph}</p>`).join("")}
    <ul>
      ${post.tags.map((tag) => `<li>#${tag}</li>`).join("")}
    </ul>
  `;
  openModal(reader, readerClose);
}

function openEssay(index) {
  const essay = essays[index];
  essayTitle.textContent = essay.title;
  essayMeta.textContent = essay.date;
  essayBody.textContent = essay.body;
  openModal(essayModal, essayClose);
}

filters.addEventListener("click", (event) => {
  const button = event.target.closest("[data-category]");
  if (!button) return;
  activeCategory = button.dataset.category;
  renderFilters();
  renderPosts();
});

postGrid.addEventListener("click", (event) => {
  const button = event.target.closest("[data-post]");
  if (!button) return;
  openPost(Number(button.dataset.post));
});

essayStrip.addEventListener("click", (event) => {
  const card = event.target.closest("[data-essay]");
  if (!card) return;
  openEssay(Number(card.dataset.essay));
});

essayStrip.addEventListener("keydown", (event) => {
  if (event.key !== "Enter" && event.key !== " ") return;
  const card = event.target.closest("[data-essay]");
  if (!card) return;
  event.preventDefault();
  openEssay(Number(card.dataset.essay));
});

searchInput.addEventListener("input", renderPosts);
readerClose.addEventListener("click", () => closeModal(reader));
essayClose.addEventListener("click", () => closeModal(essayModal));
resumeButton.addEventListener("click", () => openModal(resumeModal, resumeClose));
resumeClose.addEventListener("click", () => closeModal(resumeModal));

[reader, essayModal, resumeModal].forEach((modal) => {
  modal.addEventListener("click", (event) => {
    if (event.target === modal) closeModal(modal);
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  [reader, essayModal, resumeModal].forEach(closeModal);
});

renderFilters();
renderPosts();
renderEssays();

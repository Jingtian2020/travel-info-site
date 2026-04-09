(function () {
  const data = window.TRAVEL_DATA;
  if (!data) {
    return;
  }

  const state = {
    recentFilter: "全部",
    playFilter: "全部",
    classics: [],
    plays: [],
  };

  const els = {
    heroMeta: document.getElementById("heroMeta"),
    recentUpdate: document.getElementById("recentUpdate"),
    recentFilters: document.getElementById("recentFilters"),
    recentList: document.getElementById("recentList"),
    classicList: document.getElementById("classicList"),
    playFilters: document.getElementById("playFilters"),
    playList: document.getElementById("playList"),
    sourceList: document.getElementById("sourceList"),
    footerMeta: document.getElementById("footerMeta"),
    classicShuffle: document.getElementById("classicShuffle"),
    playShuffle: document.getElementById("playShuffle"),
  };

  function sample(items, count) {
    const pool = [...items];
    const result = [];
    while (pool.length && result.length < count) {
      const i = Math.floor(Math.random() * pool.length);
      result.push(pool.splice(i, 1)[0]);
    }
    return result;
  }

  function tagsFrom(items, key) {
    const set = new Set(["全部"]);
    items.forEach((item) => (item[key] || []).forEach((tag) => set.add(tag)));
    return [...set];
  }

  function renderHero() {
    els.heroMeta.innerHTML = (data.site.metrics || [])
      .map((m) => `<div class="card"><h3>${m.value}</h3><p>${m.label}</p></div>`)
      .join("");
  }

  function renderRecentFilters() {
    const filters = tagsFrom(data.recentLaunches || [], "tags");
    els.recentFilters.innerHTML = filters
      .map(
        (tag) =>
          `<button class="chip ${tag === state.recentFilter ? "active" : ""}" type="button" data-recent="${tag}">${tag}</button>`
      )
      .join("");
  }

  function renderRecent() {
    const list = (data.recentLaunches || []).filter((item) =>
      state.recentFilter === "全部" ? true : (item.tags || []).includes(state.recentFilter)
    );

    els.recentUpdate.textContent = `最近更新：${data.site.lastUpdated} · ${data.site.refreshCadence}`;

    els.recentList.innerHTML = list
      .map(
        (item) => `
          <article class="card">
            <div class="meta"><span>${item.location}</span><span>${item.freshness}</span></div>
            <h3>${item.title}</h3>
            <p>${item.summary}</p>
            <p>${item.whyItMatters}</p>
            <div class="tags">${(item.tags || []).map((t) => `<span class="tag">${t}</span>`).join("")}</div>
            <p><a href="${item.sourceUrl}" target="_blank" rel="noreferrer">来源：${item.sourceName}</a></p>
          </article>
        `
      )
      .join("");
  }

  function renderClassics() {
    if (!state.classics.length) {
      state.classics = data.classicPicks && data.classicPicks.length ? data.classicPicks : sample(data.classicLibrary || [], 4);
    }

    els.classicList.innerHTML = state.classics
      .map(
        (item) => `
          <article class="card">
            <div class="meta"><span>${item.location}</span><span>${item.season}</span></div>
            <h3>${item.name}</h3>
            <p>${item.summary}</p>
            <p>适合：${item.bestFor}</p>
            <p>预算：${item.budget} · 节奏：${item.duration}</p>
            <div class="tags">${(item.tags || []).map((t) => `<span class="tag">${t}</span>`).join("")}</div>
          </article>
        `
      )
      .join("");
  }

  function renderPlayFilters() {
    const filters = tagsFrom(data.playbookLibrary || [], "moods");
    els.playFilters.innerHTML = filters
      .map(
        (tag) =>
          `<button class="chip ${tag === state.playFilter ? "active" : ""}" type="button" data-play="${tag}">${tag}</button>`
      )
      .join("");
  }

  function ensurePlaySelection() {
    const pool =
      state.playFilter === "全部"
        ? data.playbookLibrary || []
        : (data.playbookLibrary || []).filter((item) => (item.moods || []).includes(state.playFilter));

    if (!state.plays.length || state.playFilter !== "全部") {
      state.plays = sample(pool, Math.min(6, pool.length));
    }
  }

  function renderPlays() {
    ensurePlaySelection();
    els.playList.innerHTML = state.plays
      .map(
        (item) => `
          <article class="card">
            <div class="meta"><span>${item.destination}</span><span>${item.pace}</span></div>
            <h3>${item.title}</h3>
            <p>${item.summary}</p>
            <p>推荐路线：${item.route}</p>
            <p>适合：${item.bestFor}</p>
            <div class="tags">${(item.moods || []).map((t) => `<span class="tag">${t}</span>`).join("")}</div>
          </article>
        `
      )
      .join("");
  }

  function renderSources() {
    els.sourceList.innerHTML = (data.sources || [])
      .map((s) => `<a href="${s.url}" target="_blank" rel="noreferrer"><strong>${s.name}</strong><br/>${s.note}</a>`)
      .join("");
  }

  function bindEvents() {
    document.addEventListener("click", (event) => {
      const recent = event.target.closest("[data-recent]");
      const play = event.target.closest("[data-play]");

      if (recent) {
        state.recentFilter = recent.dataset.recent;
        renderRecentFilters();
        renderRecent();
      }

      if (play) {
        state.playFilter = play.dataset.play;
        state.plays = [];
        renderPlayFilters();
        renderPlays();
      }
    });

    els.classicShuffle.addEventListener("click", () => {
      state.classics = sample(data.classicLibrary || [], 4);
      renderClassics();
    });

    els.playShuffle.addEventListener("click", () => {
      state.plays = [];
      renderPlays();
    });
  }

  function renderFooter() {
    els.footerMeta.textContent = `最近一次内容整理：${data.site.lastUpdated}`;
  }

  renderHero();
  renderRecentFilters();
  renderRecent();
  renderClassics();
  renderPlayFilters();
  renderPlays();
  renderSources();
  renderFooter();
  bindEvents();
})();

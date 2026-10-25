"use strict";

const $ = (id) => document.getElementById(id);
const isChinese = document.documentElement.lang.startsWith("zh");
const locale = isChinese ? "zh-CN" : "en-US";
const number = (value) => value.toLocaleString(locale);
const activate = (selector, chosen) => document.querySelectorAll(selector).forEach((button) => {
  const selected = button === chosen;
  button.classList.toggle("active", selected);
  button.setAttribute("aria-pressed", String(selected));
});

// Both languages are static pages; the switch also works without JavaScript.
document.querySelector(".language-toggle").addEventListener("click", (event) => {
  const headerBottom = document.querySelector(".site-header").getBoundingClientRect().bottom;
  const sections = [...document.querySelectorAll("main section[id]")];
  const target = sections.find((section) => `#${section.id}` === window.location.hash);
  const targetRect = target?.getBoundingClientRect();
  // Honor a just-used navigation anchor while its section is in view.
  const current = targetRect && targetRect.top < window.innerHeight && targetRect.bottom > headerBottom
    ? target
    : sections.filter((section) => section.getBoundingClientRect().top <= headerBottom + 80).pop();
  event.currentTarget.hash = current ? current.id : "overview";
});

document.querySelectorAll("[data-state]").forEach((button) => button.addEventListener("click", () => {
  const state = button.dataset.state;
  const percent = state.replace("p", ".");
  const label = isChinese
    ? (state === "100" ? "完整模型中的参数" : `在 ${percent}% 预算下优化后的参数`)
    : (state === "100" ? "parameters from the full model" : `parameters optimized at a ${percent}% budget`);
  $("state-image").src = `assets/insight/fixed-${state}.jpg`;
  $("state-image").alt = isChinese ? `同一组 2.4 万个高斯，使用${label}` : `The same 24,000 Gaussians, using ${label}`;
  $("state-caption").textContent = isChinese
    ? `画面始终只显示这 2.4 万个高斯；当前使用${label}。`
    : `Every image renders the same 24,000 Gaussians; currently using ${label}.`;
  activate("[data-state]", button);
}));

$("copy-citation").addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText($("bibtex").textContent);
    $("copy-status").textContent = isChinese ? "已复制 BibTeX。" : "BibTeX copied.";
  } catch {
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents($("bibtex"));
    selection.removeAllRanges(); selection.addRange(range);
    $("copy-status").textContent = isChinese ? "已选中 BibTeX，请按 Ctrl+C 或 Command+C 复制。" : "BibTeX selected. Press Ctrl+C or Command+C to copy.";
  }
});

document.querySelectorAll("button[data-state]").forEach((button) => {
  button.setAttribute("aria-pressed", String(button.classList.contains("active")));
});

// Labels follow the actual rendered frame schedule, including endpoint holds.
const demoData = JSON.parse($("demo-data").textContent);
const demoVideo = $("budget-video");
const sceneLabel = (select) => select.selectedOptions[0].textContent;
function updateVideoReadout(time = demoVideo.currentTime) {
  const scene = demoData[$("demo-scene").value];
  const frame = Math.min(scene.budgets.length - 1, Math.max(0, Math.floor(time * scene.fps + 0.0001)));
  const count = scene.budgets[frame];
  const percent = (100 * count / scene.full).toFixed(2);
  $("budget-caption").textContent = isChinese ? `保留 ${percent}%` : `Retain ${percent}%`;
  $("budget-count").textContent = isChinese ? `${number(count)} 个高斯` : `${number(count)} Gaussians`;
}
function updateDemoInfo() {
  const scene = demoData[$("demo-scene").value];
  const label = sceneLabel($("demo-scene"));
  $("demo-view").textContent = isChinese
    ? `${label} · 测试视角 ${scene.view} · 完整模型含 ${number(scene.full)} 个高斯`
    : `${label} · Test view ${scene.view} · Full model: ${number(scene.full)} Gaussians`;
}
$("demo-scene").addEventListener("change", () => {
  const scene = demoData[$("demo-scene").value];
  const playing = !demoVideo.paused;
  demoVideo.poster = scene.poster;
  demoVideo.src = scene.src;
  updateDemoInfo();
  updateVideoReadout(0);
  if (playing) demoVideo.play().catch(() => {});
});
for (const name of ["timeupdate", "seeked", "loadedmetadata"]) demoVideo.addEventListener(name, () => updateVideoReadout());
if ("requestVideoFrameCallback" in demoVideo) {
  const onFrame = (_, frame) => { updateVideoReadout(frame.mediaTime); demoVideo.requestVideoFrameCallback(onFrame); };
  demoVideo.requestVideoFrameCallback(onFrame);
}
if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const observer = new IntersectionObserver((entries) => {
    if (entries.some(entry => entry.isIntersecting)) {
      demoVideo.play().catch(() => {});
      observer.disconnect();
    }
  }, { threshold: 0.35 });
  observer.observe(demoVideo);
}
updateDemoInfo();
updateVideoReadout();

$("result-scene").addEventListener("change", (event) => {
  const scene = event.target.value;
  $("result-image").src = `assets/results/${scene}-comparison.jpg`;
  const label = sceneLabel(event.target);
  $("result-image").alt = isChinese
    ? `${label} 五种方法在 30%、10%、5%、1%、0.1% 预算下的完整比较图`
    : `${label}: five methods at 30%, 10%, 5%, 1%, and 0.1% budgets`;
});

const curveScene = $("curve-scene");
function updateQualityCurve() {
  const option = curveScene.selectedOptions[0];
  $("quality-curve").src = option.dataset.figure;
  $("quality-curve").alt = isChinese
    ? `${option.textContent} 场景 0.1%–50% 高斯预算下，ParetoGS 与独立优化 GNS 的 SSIM 和 LPIPS 曲线`
    : `${option.textContent}: SSIM and LPIPS for ParetoGS and independently optimized GNS at 0.1%–50% Gaussian budgets`;
  $("curve-context").textContent = isChinese
    ? `${option.textContent} · ${option.dataset.views} 个测试视角均值 · 完整模型含 ${number(Number(option.dataset.full))} 个高斯。`
    : `${option.textContent} · Mean over ${option.dataset.views} test views · Full model: ${number(Number(option.dataset.full))} Gaussians.`;
}
curveScene.addEventListener("change", updateQualityCurve);
updateQualityCurve();

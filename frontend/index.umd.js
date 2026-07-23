var React = window.__RISE_SDK__.React;
(() => {
  // packages/plugin-build/jsx-dev-shim.ts
  var R = window.__RISE_SDK__?.React;
  if (!R) throw new Error("[rise-plugin-build] React not found in window.__RISE_SDK__ (jsx-dev-shim)");
  var Fragment = R.Fragment;
  var PLUGIN_DIR = true ? "plugins/demo-widget" : "";
  function normPath(p) {
    if (!p) return "";
    const i = p.indexOf("plugins/");
    if (i >= 0) return p.slice(i);
    if (PLUGIN_DIR && !p.startsWith("/")) return `${PLUGIN_DIR}/${p}`;
    return p;
  }
  function jsxDEV(type, props, _key, _isStaticChildren, source, _self) {
    if (typeof type === "string" && source && source.fileName) {
      const loc = `${normPath(source.fileName)}:${source.lineNumber}:${source.columnNumber}`;
      return R.createElement(type, { ...props, "data-loc": loc });
    }
    return R.createElement(type, props);
  }

  // plugins/demo-widget/src/pages/HomePage.tsx
  function HomePage() {
    return /* @__PURE__ */ jsxDEV("div", { className: "h-full flex flex-col", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "bg-card border-b border-border px-6 py-4", children: /* @__PURE__ */ jsxDEV("h1", { className: "text-lg font-medium text-foreground", children: "\u6F14\u793A\u9996\u9875" }, void 0, false, {
        fileName: "plugins/demo-widget/src/pages/HomePage.tsx",
        lineNumber: 6,
        columnNumber: 9
      }, this) }, void 0, false, {
        fileName: "plugins/demo-widget/src/pages/HomePage.tsx",
        lineNumber: 5,
        columnNumber: 7
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "flex-1 p-4 bg-surface-page", children: /* @__PURE__ */ jsxDEV("div", { className: "bg-card border rounded p-8 text-center text-muted-foreground", children: [
        /* @__PURE__ */ jsxDEV("div", { children: "\u8FD9\u662F\u6F14\u793A\u63D2\u4EF6\u7684\u9996\u9875\u5185\u5BB9\u3002" }, void 0, false, {
          fileName: "plugins/demo-widget/src/pages/HomePage.tsx",
          lineNumber: 10,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "mt-2 text-xs", children: "v0.1.0" }, void 0, false, {
          fileName: "plugins/demo-widget/src/pages/HomePage.tsx",
          lineNumber: 11,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "plugins/demo-widget/src/pages/HomePage.tsx",
        lineNumber: 9,
        columnNumber: 9
      }, this) }, void 0, false, {
        fileName: "plugins/demo-widget/src/pages/HomePage.tsx",
        lineNumber: 8,
        columnNumber: 7
      }, this)
    ] }, void 0, true, {
      fileName: "plugins/demo-widget/src/pages/HomePage.tsx",
      lineNumber: 4,
      columnNumber: 5
    }, this);
  }

  // plugins/demo-widget/src/index.tsx
  var SDK = window.__RISE_SDK__;
  if (SDK) SDK.createPlugin({
    name: "demo-widget",
    version: "0.1.0",
    displayName: "\u6F14\u793A\u7EC4\u4EF6",
    icon: "box",
    scopes: [{ scope: "platform", viewport: "console", title: "\u6F14\u793A\u7EC4\u4EF6", icon: "box" }],
    menus: [{ name: "home", title: "\u9996\u9875", path: "/rise.io/v1/demo-widget/home", icon: "home", scope: "platform", group: "\u6F14\u793A", order: 100 }],
    components: { Home: HomePage }
  });
})();

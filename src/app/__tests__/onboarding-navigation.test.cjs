const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const babel = require("@babel/core");

const appDirectory = path.dirname(require.resolve("../index.tsx"));

function createElement(type, props, key) {
  return { type, key: key ?? null, props: props ?? {} };
}

const jsxRuntime = {
  Fragment: "Fragment",
  jsx: createElement,
  jsxs: createElement,
};

const nativeComponents = {
  Image: "Image",
  ScrollView: "ScrollView",
  StyleSheet: { create: (styles) => styles },
  Text: "Text",
  TouchableOpacity: "TouchableOpacity",
  View: "View",
};

function loadScreen(filename, router) {
  const sourcePath = path.join(appDirectory, filename);
  const source = fs.readFileSync(sourcePath, "utf8");
  const transformed = babel.transformSync(source, {
    filename: sourcePath,
    babelrc: false,
    configFile: false,
    plugins: [
      [require.resolve("@babel/plugin-transform-typescript"), { isTSX: true }],
      [require.resolve("@babel/plugin-transform-react-jsx"), { runtime: "automatic" }],
      require.resolve("@babel/plugin-transform-modules-commonjs"),
    ],
  });

  assert.ok(transformed?.code, `Expected Babel to compile ${filename}`);

  const images = {
    mascotLogo: { uri: "mascot-logo" },
    mascotWelcome: { uri: "mascot-welcome" },
  };
  const mocks = {
    "@/constants/images": { images },
    "expo-router": {
      Link: "Link",
      useRouter: () => router,
    },
    react: { __esModule: true, default: {} },
    "react/jsx-runtime": jsxRuntime,
    "react-native": nativeComponents,
    "react-native-safe-area-context": { SafeAreaView: "SafeAreaView" },
  };
  const module = { exports: {} };
  const localRequire = (request) => {
    assert.ok(request in mocks, `Unexpected import in ${filename}: ${request}`);
    return mocks[request];
  };

  const evaluate = new Function("require", "module", "exports", transformed.code);
  evaluate(localRequire, module, module.exports);

  return { Screen: module.exports.default, images };
}

function childrenOf(node) {
  if (!node || typeof node !== "object") return [];
  const { children } = node.props ?? {};
  if (children === undefined) return [];
  return Array.isArray(children) ? children : [children];
}

function descendants(node) {
  if (!node || typeof node !== "object") return [];
  return [node, ...childrenOf(node).flatMap(descendants)];
}

function nodesOfType(tree, type) {
  return descendants(tree).filter((node) => node.type === type);
}

function textContent(node) {
  if (typeof node === "string" || typeof node === "number") return String(node);
  return childrenOf(node).map(textContent).join("");
}

test("onboarding presents the complete welcome message and multilingual greetings", () => {
  const router = { replace: () => assert.fail("rendering must not navigate") };
  const { Screen } = loadScreen("(auth)/onboarding.tsx", router);
  const tree = Screen();
  const renderedText = nodesOfType(tree, "Text").map(textContent);

  assert.ok(renderedText.includes("lingua"));
  assert.ok(renderedText.includes("Your AI language"));
  assert.ok(renderedText.includes("teacher."));
  assert.ok(
    renderedText.includes(
      "Real conversations, personalized\nlessons, anytime, anywhere.",
    ),
  );
  assert.ok(renderedText.includes("Hello!"));
  assert.ok(renderedText.includes("¡Hola!"));
  assert.ok(renderedText.includes("你好!"));
  assert.ok(renderedText.includes("Get Started"));
});

test("onboarding uses the intended brand and welcome illustrations", () => {
  const { Screen, images } = loadScreen("(auth)/onboarding.tsx", {
    replace: () => {},
  });
  const imageNodes = nodesOfType(Screen(), "Image");

  assert.deepEqual(
    imageNodes.map(({ props }) => [props.source, props.resizeMode]),
    [
      [images.mascotLogo, "contain"],
      [images.mascotWelcome, "contain"],
    ],
  );
});

test("Get Started returns to the root route only when pressed", () => {
  const destinations = [];
  const router = { replace: (destination) => destinations.push(destination) };
  const { Screen } = loadScreen("(auth)/onboarding.tsx", router);
  const buttons = nodesOfType(Screen(), "TouchableOpacity");
  const getStartedButton = buttons.find(
    (button) => textContent(button) === "Get Started",
  );

  assert.ok(getStartedButton, "Expected a Get Started button");
  assert.deepEqual(destinations, [], "Rendering should not trigger navigation");

  getStartedButton.props.onPress();

  assert.deepEqual(destinations, ["/"]);
});

test("home exposes onboarding as a child-enabled link with a pressable card", () => {
  const { Screen, images } = loadScreen("index.tsx", { replace: () => {} });
  const tree = Screen();
  const onboardingLink = nodesOfType(tree, "Link").find((link) =>
    textContent(link).includes("Onboarding Screen"),
  );

  assert.ok(onboardingLink, "Expected the onboarding navigation card");
  assert.equal(onboardingLink.props.href, "/onboarding");
  assert.equal(onboardingLink.props.asChild, true);

  const linkChildren = childrenOf(onboardingLink);
  assert.equal(linkChildren.length, 1);
  assert.equal(linkChildren[0].type, "TouchableOpacity");
  assert.equal(linkChildren[0].props.activeOpacity, 0.85);
  assert.match(textContent(linkChildren[0]), /Onboarding Screen/);
  assert.match(textContent(linkChildren[0]), /Tap to view onboarding flow/);

  const cardImages = nodesOfType(linkChildren[0], "Image");
  assert.equal(cardImages.length, 1);
  assert.equal(cardImages[0].props.source, images.mascotLogo);
  assert.equal(cardImages[0].props.resizeMode, "contain");
});

import fs from "fs";
import { KarabinerRules } from "./types";
import { createHyperSubLayers, app, open, rectangle, setHyperLayer } from "./utils";

const rules: KarabinerRules[] = [
  // Define the Hyper key itself
  {
    description: "Hyper Key OFF (⌃⌥⇧⌘)",
    manipulators: [
      {
        description: "Right Shift -> Hyper Key",
        from: {
          key_code: "right_shift",
          modifiers: {
            optional: ["any"],
          },
        },
        to: [
          ...setHyperLayer()
        ],
        conditions: [
          {
            type: "variable_if",
            name: "hyper",
            value: 1
          }
        ],
        type: "basic"
      },
    ],
  },
  {
    description: "Hyper Key ON (⌃⌥⇧⌘)",
    manipulators: [
      {
        description: "Right Shift -> Hyper Key",
        from: {
          key_code: "right_shift",
          modifiers: {
            optional: ["any"],
          },
        },
        to: [
          ...setHyperLayer(true)
        ],
        type: "basic",
      },
    ],
  },

  {
    description: "ESC, CTRL and CAPSLOCK",
    manipulators: [
      {
        from: {
          key_code: "caps_lock",
          modifiers: {
            optional: ["any"]
          }
        },
        to: [
          {
            key_code: "left_control",
          }
        ],
        to_if_alone: [
          {
            key_code: "escape",
          }
        ],
        type: "basic"
      }
    ],
  },
  ...createHyperSubLayers({
    // spacebar: open(
    //   "raycast://extensions/stellate/mxstbr-commands/create-notion-todo"
    // ),
    // b = "B"rowse
    // b: {
    // t: open("https://twitter.com"),
    // Quarterly "P"lan
    // p: open("https://qrtr.ly/plan"),
    // y: open("https://news.ycombinator.com"),
    // f: open("https://facebook.com"),
    // r: open("https://reddit.com"),
    // },
    // o = "Open" applications
    o: {
      1: app("Bitwarden"),
      a: app("Arc"),
      s: app("Slack"),
      b: app("Obsidian"),
      t: app("Alacritty"),
      z: app("zoom.us"),
      f: app("Finder"),
      // "i"Message
    },

    // w = "Window" via rectangle.app
    w: {
      semicolon: {
        description: "Window: Hide",
        to: [
          {
            key_code: "h",
            modifiers: ["right_command"],
          },
        ],
      },
      y: rectangle("previous-display"),
      o: rectangle("next-display"),
      k: rectangle("top-half"),
      j: rectangle("bottom-half"),
      h: rectangle("left-half"),
      l: rectangle("right-half"),
      f: rectangle("maximize"),
      u: {
        description: "Window: Previous Tab",
        to: [
          {
            key_code: "tab",
            modifiers: ["right_control", "right_shift"],
          },
        ],
      },
      i: {
        description: "Window: Next Tab",
        to: [
          {
            key_code: "tab",
            modifiers: ["right_control"],
          },
        ],
      },
      n: {
        description: "Window: Next Window",
        to: [
          {
            key_code: "grave_accent_and_tilde",
            modifiers: ["right_command"],
          },
        ],
      },
      b: {
        description: "Window: Back",
        to: [
          {
            key_code: "open_bracket",
            modifiers: ["right_command"],
          },
        ],
      },
      // Note: No literal connection. Both f and n are already taken.
      m: {
        description: "Window: Forward",
        to: [
          {
            key_code: "close_bracket",
            modifiers: ["right_command"],
          },
        ],
      },
      d: {
        description: "Window: Next display",
        to: [
          {
            key_code: "right_arrow",
            modifiers: ["right_control", "right_option", "right_command"],
          },
        ],
      },
    },

    // s = "System"
    s: {
      u: {
        to: [
          {
            key_code: "volume_increment",
          },
        ],
      },
      j: {
        to: [
          {
            key_code: "volume_decrement",
          },
        ],
      },
      i: {
        to: [
          {
            key_code: "display_brightness_increment",
          },
        ],
      },
      k: {
        to: [
          {
            key_code: "display_brightness_decrement",
          },
        ],
      },
      l: {
        to: [
          {
            key_code: "q",
            modifiers: ["right_control", "right_command"],
          },
        ],
      },
      p: {
        to: [
          {
            key_code: "play_or_pause",
          },
        ],
      },
      semicolon: {
        to: [
          {
            key_code: "fastforward",
          },
        ],
      },
      e: {
        to: [
          {
            // Emoji picker
            key_code: "spacebar",
            modifiers: ["right_control", "right_command"],
          },
          ...setHyperLayer()
        ],
      },
      // Turn on Elgato KeyLight
      y: {
        to: [
          {
            shell_command: `curl -H 'Content-Type: application/json' --request PUT --data '{ "numberOfLights": 1, "lights": [ { "on": 1, "brightness": 100, "temperature": 215 } ] }' http://192.168.8.84:9123/elgato/lights`,
          },
        ],
      },
    },

    // r = "Raycast"
    r: {
      n: open("raycast://script-commands/dismiss-notifications"),
      e: open(
        "raycast://extensions/raycast/emoji-symbols/search-emoji-symbols"
      ),
      p: open("raycast://extensions/raycast/raycast/confetti"),
      h: open(
        "raycast://extensions/raycast/clipboard-history/clipboard-history"
      ),
      j: open("raycast://extensions/gdsmith/jetbrains/recent"),
      1: open(
        "raycast://extensions/VladCuciureanu/toothpick/connect-favorite-device-1"
      ),
      2: open(
        "raycast://extensions/VladCuciureanu/toothpick/connect-favorite-device-2"
      ),
    },

    // t = "TMUX"
    t: {
      s: open("raycast://extensions/louishuyng/tmux-sessioner/index"),
      n: open("raycast://extensions/louishuyng/tmux-sessioner/create_new_session")
    },
  }),
];

fs.writeFileSync(
  "karabiner.json",
  JSON.stringify(
    {
      global: {
        show_in_menu_bar: false,
      },
      profiles: [
        {
          name: "Default",
          complex_modifications: {
            rules,
          },
        },
      ],
    },
    null,
    2
  )
);

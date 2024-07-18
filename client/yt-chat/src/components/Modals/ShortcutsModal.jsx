import React from "react";

function ShortcutIcon({ platform, shortcut }) {
  const icon = platform === "mac" ? shortcut.macIcon : shortcut.winIcon;
  const iconParts = icon.split(" ");

  return (
    <>
      <div className="shortcut">
        <span className="shortcut-title">{shortcut.name}</span>
        <div className="shortcut-keys">
          {iconParts.map((part, index) => (
            <span className="keys" key={index}>
              {part}
            </span>
          ))}
        </div>
      </div>
    </>
  );
}

function ShortcutsModal() {
  const shortcuts = [
    { name: "Open new chat", macIcon: "⌘ Shift O", winIcon: "Ctrl Shift O" },
    {
      name: "Focus chat input",
      macIcon: "⌘ Shift Esc",
      winIcon: "Ctrl Shift Esc",
    },
    {
      name: "Open Settings",
      macIcon: "⌘ Shift ,",
      winIcon: "Ctrl Shift ,",
    },
    {
      name: "Show Shortcuts",
      macIcon: "⌘ /",
      winIcon: "Ctrl /",
    },
  ];

  const platform =
    navigator.platform.toUpperCase().indexOf("MAC") >= 0 ? "mac" : "win";

  return (
    <div className="shortcuts-modal">
      <h2>Keyboard Shortcuts</h2>
      <div className="divider"></div>
      <div>
        {shortcuts.map((shortcut, index) => (
          <ShortcutIcon platform={platform} shortcut={shortcut} />
        ))}
      </div>
    </div>
  );
}

export default ShortcutsModal;
